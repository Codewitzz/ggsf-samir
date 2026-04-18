import {
  isAdminSessionActive as noticesSessionActive,
  validateAndNormalizePdfDataUrl,
} from "@/lib/notices/adminNoticesStore";
import type { DownloadIconKey } from "@/lib/downloads/downloadIcons";

export type { DownloadIconKey };

export type AdminDownloadItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  format: string;
  size: string;
  iconKey: DownloadIconKey;
  /** PDF stored in browser (small files only). */
  fileDataUrl?: string;
  /** Optional public URL when the file is hosted elsewhere or too large for storage. */
  externalUrl?: string;
  /** Suggested filename for downloads (data URL or external). */
  fileName: string;
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEY = "ggsf_admin_downloads_items_v1";
const STORAGE_DEFAULT_OVERRIDES = "ggsf_admin_download_default_overrides_v1";

/** Partial overrides for built-in download cards (keyed by `BuiltinDownloadDefinition.key`). */
export type DefaultDownloadOverride = {
  title?: string;
  description?: string;
  category?: string;
  format?: string;
  size?: string;
  iconKey?: DownloadIconKey;
  fileDataUrl?: string;
  externalUrl?: string;
  fileName?: string;
};

function now() {
  return Date.now();
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `dl_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function isAdminSessionActive(): boolean {
  return noticesSessionActive();
}

function dispatchChanged() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_downloads_changed"));
}

export function getDefaultDownloadOverrides(): Record<string, DefaultDownloadOverride> {
  const storage = getStorage();
  if (!storage) return {};
  const parsed = safeJsonParse<Record<string, DefaultDownloadOverride>>(storage.getItem(STORAGE_DEFAULT_OVERRIDES));
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

function writeDefaultOverrides(overrides: Record<string, DefaultDownloadOverride>) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_DEFAULT_OVERRIDES, JSON.stringify(overrides));
  dispatchChanged();
}

/** Replace the stored override for a built-in card (full save from admin dialog). */
export function replaceDefaultDownloadOverride(key: string, data: DefaultDownloadOverride) {
  const all = getDefaultDownloadOverrides();
  const cleaned = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)) as DefaultDownloadOverride;
  writeDefaultOverrides({ ...all, [key]: cleaned });
}

export function clearDefaultDownloadOverride(key: string) {
  const all = getDefaultDownloadOverrides();
  if (!(key in all)) return;
  const { [key]: _, ...rest } = all;
  writeDefaultOverrides(rest);
}

export function getAdminDownloadItems(): AdminDownloadItem[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<AdminDownloadItem[]>(storage.getItem(STORAGE_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

function writeItems(items: AdminDownloadItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(items));
  dispatchChanged();
}

/** Replace all custom download cards (e.g. remote sync). */
export function replaceAllAdminDownloadItems(items: AdminDownloadItem[]) {
  writeItems(items);
}

/** Replace built-in card overrides map (e.g. remote sync). */
export function replaceAllDefaultDownloadOverrides(overrides: Record<string, DefaultDownloadOverride>) {
  writeDefaultOverrides(overrides);
}

export function deleteAdminDownloadItem(id: string) {
  const items = getAdminDownloadItems();
  writeItems(items.filter((i) => i.id !== id));
}

export function upsertAdminDownloadItem(item: AdminDownloadItem) {
  const items = getAdminDownloadItems();
  const idx = items.findIndex((i) => i.id === item.id);
  const next =
    idx === -1
      ? [{ ...item }, ...items]
      : items.map((i) => (i.id === item.id ? { ...item, updatedAt: now() } : i));
  writeItems(next);
}

export function createAdminDownloadItemInput(
  input: Omit<AdminDownloadItem, "id" | "createdAt" | "updatedAt">
): AdminDownloadItem {
  const t = now();
  return {
    ...input,
    id: makeId(),
    createdAt: t,
    updatedAt: t,
  };
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  const u = ["B", "KB", "MB", "GB"];
  let n = bytes;
  let i = 0;
  while (n >= 1024 && i < u.length - 1) {
    n /= 1024;
    i++;
  }
  return `${i === 0 ? Math.round(n) : n.toFixed(i === 1 ? 1 : 2)} ${u[i]}`;
}

export function normalizeExternalUrl(url: string): string | undefined {
  const t = url.trim();
  if (!t) return undefined;
  if (!/^https?:\/\//i.test(t)) {
    throw new Error("External link must start with http:// or https://");
  }
  return t;
}

export function validateDownloadPayload(partial: {
  fileDataUrl?: string;
  externalUrl?: string;
}): { fileDataUrl?: string; externalUrl?: string } {
  const ext = partial.externalUrl ? normalizeExternalUrl(partial.externalUrl) : undefined;
  const pdf = partial.fileDataUrl ? validateAndNormalizePdfDataUrl(partial.fileDataUrl) : undefined;
  if (!ext && !pdf) {
    throw new Error("Upload a PDF or provide an external file URL.");
  }
  if (ext && pdf) {
    throw new Error("Use either an uploaded PDF or an external URL, not both.");
  }
  return { fileDataUrl: pdf, externalUrl: ext };
}

export { validateAndNormalizePdfDataUrl } from "@/lib/notices/adminNoticesStore";
