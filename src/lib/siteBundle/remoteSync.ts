import { isAdminSessionActive } from "@/lib/notices/adminNoticesStore";
import {
  applySiteAdminBundle,
  collectSiteAdminBundle,
  parseSiteAdminBundle,
  type SiteAdminBundleV1,
} from "@/lib/siteBundle/siteAdminBundle";

const STORAGE_LAST_TS = "ggsf_remote_bundle_server_ts_v2";

let applyingRemote = false;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let pollTimer: ReturnType<typeof setInterval> | null = null;

function getSupabaseUrl(): string | undefined {
  return import.meta.env.VITE_SUPABASE_URL?.trim()?.replace(/\/$/, "");
}

function getSupabasePublicKey(): string | undefined {
  return import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
}

export function isRemoteReadConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabasePublicKey());
}

export function isRemoteWriteConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SITE_SYNC_SECRET?.trim());
}

// Optional: Netlify (or any) HTTP endpoint that accepts `{ secret, bundle }` and returns `{ ok: true }`.
function getOptionalHttpSyncUrl(): string | undefined {
  return import.meta.env.VITE_SITE_SYNC_URL?.trim() || undefined;
}

function lastAppliedTs(): number {
  try {
    return Number(sessionStorage.getItem(STORAGE_LAST_TS) || "0") || 0;
  } catch {
    return 0;
  }
}

function setLastAppliedTs(ts: number) {
  try {
    sessionStorage.setItem(STORAGE_LAST_TS, String(ts));
  } catch {
    // ignore
  }
}

type RestRow = { data: unknown; updated_at?: string | null };

async function fetchRemoteBundleFromRest(): Promise<{ bundle: SiteAdminBundleV1 | null; serverMs: number }> {
  const baseUrl = getSupabaseUrl();
  const key = getSupabasePublicKey();
  if (!baseUrl || !key) return { bundle: null, serverMs: 0 };

  const qs = new URLSearchParams({
    select: "data,updated_at",
    id: "eq.default",
  });
  const url = `${baseUrl}/rest/v1/site_admin_bundle?${qs.toString()}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Accept: "application/json",
        "Accept-Profile": "public",
      },
    });
  } catch (e) {
    console.warn("[ggsf-sync] network error:", e);
    return { bundle: null, serverMs: 0 };
  }

  const text = await res.text();
  if (!res.ok) {
    console.warn("[ggsf-sync] REST error:", res.status, text.slice(0, 400));
    return { bundle: null, serverMs: 0 };
  }

  let rows: RestRow[];
  try {
    rows = JSON.parse(text) as RestRow[];
  } catch {
    return { bundle: null, serverMs: 0 };
  }

  const row = Array.isArray(rows) ? rows[0] : undefined;
  if (!row || row.data == null) return { bundle: null, serverMs: 0 };

  let payload: unknown = row.data;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload) as unknown;
    } catch {
      return { bundle: null, serverMs: 0 };
    }
  }

  const parsed = parseSiteAdminBundle(payload);
  if (!parsed) return { bundle: null, serverMs: 0 };

  const serverMs = row.updated_at ? new Date(row.updated_at).getTime() : parsed.updatedAt;
  return { bundle: parsed, serverMs };
}

function applyRemote(bundle: SiteAdminBundleV1, serverMs: number) {
  applyingRemote = true;
  try {
    applySiteAdminBundle(bundle);
    setLastAppliedTs(serverMs);
  } finally {
    applyingRemote = false;
  }
}

async function pullIfNewer(): Promise<void> {
  if (!isRemoteReadConfigured()) return;
  const { bundle, serverMs } = await fetchRemoteBundleFromRest();
  if (!bundle) return;
  if (serverMs <= lastAppliedTs()) return;
  applyRemote(bundle, serverMs);
}

async function pushBundleViaHttp(url: string, secret: string, bundle: SiteAdminBundleV1): Promise<boolean> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, bundle }),
  });
  const bodyText = await res.text().catch(() => "");
  if (!res.ok) {
    console.warn("[ggsf-sync] HTTP push failed:", res.status, bodyText.slice(0, 300));
    return false;
  }
  let payload: unknown = null;
  try {
    payload = bodyText ? (JSON.parse(bodyText) as unknown) : null;
  } catch {
    payload = null;
  }
  if (!payload || typeof payload !== "object" || (payload as { ok?: unknown }).ok !== true) {
    console.warn(
      "[ggsf-sync] HTTP push did not return { ok: true } (wrong URL or not a sync handler?).",
      bodyText.slice(0, 120),
    );
    return false;
  }
  return true;
}

// Default: Supabase RPC (no Netlify). Run sql/site_admin_bundle_write_rpc.sql once.
async function pushBundleViaSupabaseRpc(secret: string, bundle: SiteAdminBundleV1): Promise<boolean> {
  const baseUrl = getSupabaseUrl();
  const key = getSupabasePublicKey();
  if (!baseUrl || !key) return false;

  const url = `${baseUrl}/rest/v1/rpc/upsert_site_bundle`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ p_secret: secret, p_bundle: bundle }),
    });
    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.warn("[ggsf-sync] Supabase save failed:", res.status, text.slice(0, 400));
      console.warn(
        "[ggsf-sync] If you see 404/P0001: run sql/site_admin_bundle_write_rpc.sql in Supabase and set private.site_sync_secret to match VITE_SITE_SYNC_SECRET.",
      );
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[ggsf-sync] Supabase RPC error:", e);
    return false;
  }
}

async function pushBundle(): Promise<void> {
  if (!isRemoteWriteConfigured()) return;
  if (!isAdminSessionActive()) return;
  if (applyingRemote) return;

  const secret = import.meta.env.VITE_SITE_SYNC_SECRET?.trim();
  if (!secret) return;

  const bundle = collectSiteAdminBundle();
  const httpUrl = getOptionalHttpSyncUrl();

  try {
    const ok = httpUrl ? await pushBundleViaHttp(httpUrl, secret, bundle) : await pushBundleViaSupabaseRpc(secret, bundle);
    if (ok) setLastAppliedTs(bundle.updatedAt);
  } catch (e) {
    console.warn("[ggsf-sync] push error:", e);
  }
}

function schedulePush() {
  if (applyingRemote) return;
  if (!isRemoteWriteConfigured()) return;
  if (!isAdminSessionActive()) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushTimer = null;
    void pushBundle();
  }, 2500);
}

const SYNC_EVENTS = [
  "ggsf_admin_notices_changed",
  "ggsf_admin_images_changed",
  "ggsf_admin_gallery_folders_changed",
  "ggsf_admin_gallery_sections_changed",
  "ggsf_admin_downloads_changed",
] as const;

export async function initSiteRemoteSync(): Promise<void> {
  if (typeof window === "undefined") return;

  if (isRemoteReadConfigured()) {
    await pullIfNewer();
  }

  const onAdminDataChange = () => schedulePush();
  for (const ev of SYNC_EVENTS) {
    window.addEventListener(ev, onAdminDataChange);
  }

  if (isRemoteReadConfigured() && !pollTimer) {
    pollTimer = setInterval(() => {
      void pullIfNewer();
    }, 120_000);
  }
}
