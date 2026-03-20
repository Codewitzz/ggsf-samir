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

export function adminSignIn(username: string, password: string): { ok: true } | { ok: false; reason: string } {
  const expectedUsername = import.meta.env.VITE_ADMIN_USERNAME ?? "admin";
  const expectedPassword = import.meta.env.VITE_ADMIN_PASSWORD ?? "admin";

  if (!expectedUsername || !expectedPassword) return { ok: false, reason: "Admin credentials not configured." };

  if (username !== expectedUsername || password !== expectedPassword) {
    return { ok: false, reason: "Invalid username or password." };
  }

  const storage = getStorage();
  if (!storage) return { ok: false, reason: "Storage unavailable." };

  const session: AdminSession = {
    // 8 hours session (client-side only).
    expiresAt: now() + 8 * 60 * 60 * 1000,
  };

  storage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  return { ok: true };
}

export function adminSignOut() {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEYS.session);
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

