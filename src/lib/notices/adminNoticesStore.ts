import { supabase } from "@/lib/supabase/client";

export type AdminNoticeKind = "notice" | "announcement";
export type AdminNoticeTemplate = "card" | "imageCard" | "bar";
export type AdminNoticeAccent = "primary" | "secondary" | "info" | "warning" | "success";

export type AdminNoticeItem = {
  id: string;
  kind: AdminNoticeKind;
  template: AdminNoticeTemplate;
  title: string;
  date?: string;
  text?: string;
  linkUrl?: string;
  imageDataUrl?: string; // Stored as base64 (local/dev friendly).
  pdfDataUrl?: string; // Optional PDF attachment stored as base64.
  pdfFileName?: string;
  accent?: AdminNoticeAccent; // Mainly for announcements bar.
  enabledOnHomepage: boolean;
  createdAt: number;
  updatedAt: number;
};

export type AdminNoticesSettings = {
  homepageAdminWidgetEnabled: boolean;
};

type AdminSession = {
  expiresAt: number;
  username?: string;
  isMainAdmin?: boolean;
};

export type AdminAccountRecord = {
  username: string;
  isMainAdmin: boolean;
  createdAt: string;
  updatedAt: string;
};

const STORAGE_KEYS = {
  items: "ggsf_admin_notices_items_v1",
  settings: "ggsf_admin_notices_settings_v1",
  session: "ggsf_admin_notices_session_v1",
} as const;

const DEFAULT_SETTINGS: AdminNoticesSettings = {
  homepageAdminWidgetEnabled: true,
};

const STORAGE_GUARD = {
  // Base64 for images can grow quickly. This is a safety guard to avoid blowing up localStorage.
  maxImageDataUrlChars: 2_000_000,
  maxPdfDataUrlChars: 4_000_000,
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
  // crypto.randomUUID is available in modern browsers.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function isAdminSessionActive(): boolean {
  const storage = getStorage();
  if (!storage) return false;
  const session = safeJsonParse<AdminSession>(storage.getItem(STORAGE_KEYS.session));
  if (!session?.expiresAt) return false;
  return session.expiresAt > now();
}

export function getAdminSessionInfo(): { username?: string; isMainAdmin: boolean } | null {
  const storage = getStorage();
  if (!storage) return null;
  const session = safeJsonParse<AdminSession>(storage.getItem(STORAGE_KEYS.session));
  if (!session || !session.expiresAt || session.expiresAt <= now()) return null;
  return {
    username: session.username,
    isMainAdmin: Boolean(session.isMainAdmin),
  };
}

function normalizeUsername(value: string): string {
  return value.trim().toLowerCase();
}

async function hashPassword(password: string): Promise<string> {
  if (typeof window === "undefined" || !window.crypto?.subtle) return password;
  const bytes = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type DbAdminAccountRow = {
  username: string;
  password_hash: string;
  is_main_admin: boolean;
  created_at: string;
  updated_at: string;
};

async function signInWithSupabase(
  username: string,
  password: string,
): Promise<{ ok: true; isMainAdmin: boolean } | { ok: false; reason: string }> {
  if (!supabase) return { ok: false, reason: "Supabase not configured." };
  const normalizedUsername = normalizeUsername(username);
  const passwordHash = await hashPassword(password);
  const { data, error } = await supabase
    .from("site_admin_accounts")
    .select("username,password_hash,is_main_admin")
    .eq("username", normalizedUsername)
    .maybeSingle<DbAdminAccountRow>();
  if (error) return { ok: false, reason: "Could not verify admin credentials." };
  if (!data) return { ok: false, reason: "Invalid username or password." };
  if (data.password_hash !== passwordHash) return { ok: false, reason: "Invalid username or password." };
  return { ok: true, isMainAdmin: Boolean(data.is_main_admin) };
}

export async function adminSignIn(username: string, password: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME ?? "admin";
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin";
  const normalizedUsername = normalizeUsername(username);

  if (!expectedUsername || !expectedPassword) return { ok: false, reason: "Admin credentials not configured." };

  const storage = getStorage();
  if (!storage) return { ok: false, reason: "Storage unavailable." };

  let isMainAdmin = false;
  let valid = false;

  // Main admin via env credentials always remains a fallback.
  if (username === expectedUsername && password === expectedPassword) {
    valid = true;
    isMainAdmin = true;
  } else {
    const supaResult = await signInWithSupabase(username, password);
    if (!supaResult.ok) return supaResult;
    valid = true;
    isMainAdmin = supaResult.isMainAdmin;
  }

  if (!valid) return { ok: false, reason: "Invalid username or password." };

  const session: AdminSession = {
    // 8 hours session (client-side only).
    expiresAt: now() + 8 * 60 * 60 * 1000,
    username: normalizedUsername,
    isMainAdmin,
  };

  storage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { ok: true };
}

export function adminSignOut() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.session);
}

export async function getAllAdminAccounts(): Promise<AdminAccountRecord[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("site_admin_accounts")
    .select("username,is_main_admin,created_at,updated_at")
    .order("username", { ascending: true });
  if (error || !data) return [];
  return data.map((row) => ({
    username: row.username,
    isMainAdmin: Boolean(row.is_main_admin),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function createAdminAccount(
  username: string,
  password: string,
  createdBy?: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) return { ok: false, reason: "Username is required." };
  if (password.trim().length < 6) return { ok: false, reason: "Password must be at least 6 characters." };
  const passwordHash = await hashPassword(password);
  const { error } = await supabase.from("site_admin_accounts").insert({
    username: normalizedUsername,
    password_hash: passwordHash,
    is_main_admin: false,
    created_by: createdBy?.trim() || null,
  });
  if (error) {
    if (String(error.message).toLowerCase().includes("duplicate")) {
      return { ok: false, reason: "This admin username already exists." };
    }
    return { ok: false, reason: "Could not create admin account in Supabase." };
  }
  return { ok: true };
}

export async function changeAdminAccountPassword(
  username: string,
  newPassword: string,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) return { ok: false, reason: "Username is required." };
  if (newPassword.trim().length < 6) return { ok: false, reason: "Password must be at least 6 characters." };
  const passwordHash = await hashPassword(newPassword);
  const { error } = await supabase
    .from("site_admin_accounts")
    .update({
      password_hash: passwordHash,
      updated_at: new Date().toISOString(),
    })
    .eq("username", normalizedUsername);
  if (error) return { ok: false, reason: "Could not update admin password." };
  return { ok: true };
}

export async function deleteAdminAccount(username: string): Promise<{ ok: true } | { ok: false; reason: string }> {
  if (!supabase) return { ok: false, reason: "Supabase is not configured." };
  const normalizedUsername = normalizeUsername(username);
  if (!normalizedUsername) return { ok: false, reason: "Username is required." };
  const { data, error } = await supabase
    .from("site_admin_accounts")
    .select("username,is_main_admin")
    .eq("username", normalizedUsername)
    .maybeSingle<{ username: string; is_main_admin: boolean }>();
  if (error) return { ok: false, reason: "Could not verify admin user." };
  if (!data) return { ok: false, reason: "Admin user not found." };
  if (data.is_main_admin) return { ok: false, reason: "Main admin cannot be deleted." };
  const { error: deleteError } = await supabase.from("site_admin_accounts").delete().eq("username", normalizedUsername);
  if (deleteError) return { ok: false, reason: "Could not delete admin user." };
  return { ok: true };
}

function readItemsFromStorage(): AdminNoticeItem[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<AdminNoticeItem[]>(storage.getItem(STORAGE_KEYS.items));
  return Array.isArray(parsed) ? parsed : [];
}

function writeItemsToStorage(items: AdminNoticeItem[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.items, JSON.stringify(items));
}

export function getAdminNoticesSettings(): AdminNoticesSettings {
  const storage = getStorage();
  if (!storage) return DEFAULT_SETTINGS;
  const parsed = safeJsonParse<AdminNoticesSettings>(storage.getItem(STORAGE_KEYS.settings));
  return parsed ?? DEFAULT_SETTINGS;
}

export function setAdminNoticesSettings(partial: Partial<AdminNoticesSettings>) {
  const storage = getStorage();
  if (!storage) return;
  const current = getAdminNoticesSettings();
  const next: AdminNoticesSettings = { ...current, ...partial };
  storage.setItem(STORAGE_KEYS.settings, JSON.stringify(next));
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
}

export function getAdminNoticesItems(): AdminNoticeItem[] {
  return readItemsFromStorage();
}

export function setAdminNoticesItems(items: AdminNoticeItem[]) {
  writeItemsToStorage(items);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
}

/** Replace notices + settings in one shot (e.g. remote sync). Does not seed defaults. */
export function replaceAdminNoticesState(items: AdminNoticeItem[], settings: AdminNoticesSettings) {
  writeItemsToStorage(items);
  const storage = getStorage();
  if (storage) {
    storage.setItem(STORAGE_KEYS.settings, JSON.stringify({ ...DEFAULT_SETTINGS, ...settings }));
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
}

export function deleteAdminNoticeItem(id: string) {
  const items = readItemsFromStorage();
  const next = items.filter((i) => i.id !== id);
  writeItemsToStorage(next);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
}

export function upsertAdminNoticeItem(item: AdminNoticeItem) {
  const items = readItemsFromStorage();
  const idx = items.findIndex((i) => i.id === item.id);
  const next =
    idx === -1
      ? [{ ...item }, ...items]
      : items.map((i) => (i.id === item.id ? { ...item, updatedAt: now() } : i));
  writeItemsToStorage(next);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
}

export function validateAndNormalizeImageDataUrl(imageDataUrl?: string): string | undefined {
  if (!imageDataUrl) return undefined;
  if (imageDataUrl.length > STORAGE_GUARD.maxImageDataUrlChars) {
    throw new Error("Image is too large for browser storage. Please upload a smaller image.");
  }
  if (!imageDataUrl.startsWith("data:image/")) {
    throw new Error("Invalid image data.");
  }
  return imageDataUrl;
}

export function validateAndNormalizePdfDataUrl(pdfDataUrl?: string): string | undefined {
  if (!pdfDataUrl) return undefined;
  if (pdfDataUrl.length > STORAGE_GUARD.maxPdfDataUrlChars) {
    throw new Error("PDF is too large for browser storage. Please upload a smaller PDF file.");
  }
  if (!pdfDataUrl.startsWith("data:application/pdf")) {
    throw new Error("Invalid PDF data.");
  }
  return pdfDataUrl;
}

export function createAdminNoticeItemInput(input: Omit<AdminNoticeItem, "id" | "createdAt" | "updatedAt">): AdminNoticeItem {
  const storageNow = now();
  return {
    ...input,
    id: makeId(),
    createdAt: storageNow,
    updatedAt: storageNow,
  };
}

export function getDefaultNoticesAndAnnouncements(): AdminNoticeItem[] {
  // Mirrors current homepage content so the site looks good even before any admin changes.
  return [
    {
      id: "default_notice_1",
      kind: "notice",
      template: "card",
      title: "TE & BE (2019 Pattern) Exam Timetable",
      date: "08 Aug 2025",
      linkUrl: "https://engg.ggsf.edu.in/images/pdf/68958994d09080In Sem TE BE 2025-26.pdf",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_notice_2",
      kind: "notice",
      template: "card",
      title: "Workshop on Women Empowerment",
      date: "19 Jul 2025",
      linkUrl: "https://engg.ggsf.edu.in/images/pdf/68888e658a24d0Women Empowerment.pdf",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_notice_3",
      kind: "notice",
      template: "card",
      title: "End-Sem Exam Timetable (May 2025)",
      date: "22 Apr 2025",
      linkUrl: "https://engg.ggsf.edu.in/images/pdf/68071e05c88970Febemay2025.pdf",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_announcement_1",
      kind: "announcement",
      template: "bar",
      title: "Admissions Open 2025-26",
      linkUrl: "/admissions",
      accent: "primary",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_announcement_2",
      kind: "announcement",
      template: "bar",
      title: "MBA Admissions – Apply Now",
      linkUrl: "/mba/admissions",
      accent: "secondary",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_announcement_3",
      kind: "announcement",
      template: "bar",
      title: "Engineering Admissions – Apply Now",
      linkUrl: "/engineering/admissions",
      accent: "info",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_announcement_4",
      kind: "announcement",
      template: "bar",
      title: "ME Admissions – Apply Now",
      linkUrl: "/me/admissions",
      accent: "warning",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
    {
      id: "default_announcement_5",
      kind: "announcement",
      template: "bar",
      title: "Beware of fake websites – apply only via official site",
      linkUrl: "/faq",
      accent: "success",
      enabledOnHomepage: true,
      createdAt: 0,
      updatedAt: 0,
    },
  ];
}

export function getEffectiveNoticesItems(): AdminNoticeItem[] {
  const saved = getAdminNoticesItems();
  if (saved.length) return saved;

  // Seed storage with defaults so admins can delete/update them naturally.
  const defaults = getDefaultNoticesAndAnnouncements();
  writeItemsToStorage(defaults);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_notices_changed"));
  return defaults;
}

