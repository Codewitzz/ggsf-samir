import { adminSignIn, adminSignOut, isAdminSessionActive } from "@/lib/notices/adminNoticesStore";

export type AdminImageOverrides = Record<string, string>;
export type AdminGalleryImage = {
  id: string;
  title: string;
  category: string;
  /** When set, photo belongs to a named gallery section (e.g. campus-overview). */
  sectionKey?: string;
  /** When set, photo belongs to a custom folder (see galleryFoldersStore). */
  folderId?: string;
  imageDataUrl: string;
  createdAt: number;
};

const STORAGE_KEYS = {
  overrides: "ggsf_admin_images_overrides_v1",
  gallery: "ggsf_admin_gallery_images_v1",
  // We keep settings as a future extension point (e.g. max size policy, enable/disable slots).
  settings: "ggsf_admin_images_settings_v1",
} as const;

const DEFAULT_SETTINGS = {};

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
  return `img_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function isQuotaExceededError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  return err.name === "QuotaExceededError" || /quota/i.test(err.message);
}

// Cache for fast reads (site components will call this often).
let overridesCache: AdminImageOverrides | null = null;
let overridesCacheLoaded = false;

function clearCache() {
  overridesCache = null;
  overridesCacheLoaded = false;
}

function loadOverridesFromStorage(): AdminImageOverrides {
  const storage = getStorage();
  if (!storage) return {};
  const parsed = safeJsonParse<AdminImageOverrides>(storage.getItem(STORAGE_KEYS.overrides));
  return (parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {}) as AdminImageOverrides;
}

function ensureOverridesLoaded() {
  if (overridesCacheLoaded) return overridesCache ?? {};
  overridesCache = loadOverridesFromStorage();
  overridesCacheLoaded = true;
  return overridesCache ?? {};
}

if (typeof window !== "undefined") {
  window.addEventListener("ggsf_admin_images_changed", () => {
    clearCache();
  });
}

export function getAdminImagesSettings() {
  // For now there is no exposed settings shape; this matches the pattern used for notices.
  const storage = getStorage();
  if (!storage) return DEFAULT_SETTINGS;
  const parsed = safeJsonParse<Record<string, unknown>>(storage.getItem(STORAGE_KEYS.settings));
  return parsed ?? DEFAULT_SETTINGS;
}

export function getAdminImageOverrides(): AdminImageOverrides {
  return ensureOverridesLoaded();
}

export function getAdminImageOverride(slotKey: string): string | undefined {
  const overrides = ensureOverridesLoaded();
  return overrides[slotKey];
}

// Keep validation aligned with the notice image size guard.
// (The same base64-in-localStorage approach is used.)
export function validateAndNormalizeImageDataUrl(imageDataUrl?: string): string | undefined {
  if (!imageDataUrl) return undefined;
  // Importing dynamically from notices store would create circular deps if we re-export;
  // so we enforce the same pragmatic checks here:
  if (imageDataUrl.length > 2_000_000) {
    throw new Error("Image is too large for browser storage. Please upload a smaller image.");
  }
  if (!imageDataUrl.startsWith("data:image/")) {
    throw new Error("Invalid image data.");
  }
  return imageDataUrl;
}

export function setAdminImageOverride(slotKey: string, imageDataUrl?: string) {
  const storage = getStorage();
  if (!storage) return;
  if (!slotKey.trim()) throw new Error("Slot key is required.");

  const normalized = validateAndNormalizeImageDataUrl(imageDataUrl);

  const overrides = ensureOverridesLoaded();
  const next: AdminImageOverrides = { ...overrides };

  if (!normalized) {
    delete next[slotKey];
  } else {
    next[slotKey] = normalized;
  }

  storage.setItem(STORAGE_KEYS.overrides, JSON.stringify(next));
  overridesCache = next;
  overridesCacheLoaded = true;
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_images_changed"));
}

export function deleteAdminImageOverride(slotKey: string) {
  setAdminImageOverride(slotKey, undefined);
}

export function resetAdminImageOverrides() {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.overrides, JSON.stringify({}));
  clearCache();
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_images_changed"));
}

export function getAdminGalleryImages(): AdminGalleryImage[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<AdminGalleryImage[]>(storage.getItem(STORAGE_KEYS.gallery));
  return Array.isArray(parsed) ? parsed : [];
}

export function setAdminGalleryImages(items: AdminGalleryImage[]) {
  const storage = getStorage();
  if (!storage) return;
  let next = [...items];
  while (next.length > 0) {
    try {
      storage.setItem(STORAGE_KEYS.gallery, JSON.stringify(next));
      break;
    } catch (err) {
      if (!isQuotaExceededError(err)) throw err;
      // Keep newest items first; drop oldest one-by-one until it fits.
      next = next.slice(0, -1);
    }
  }
  if (next.length === 0) {
    throw new Error("Storage quota exceeded. Delete older gallery photos or upload smaller images.");
  }
  if (next.length < items.length && typeof window !== "undefined") {
    console.warn(`[ggsf-admin-images] Dropped ${items.length - next.length} oldest photos due to browser storage limit.`);
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event("ggsf_admin_images_changed"));
}

/** Replace slot overrides + gallery list (e.g. remote sync). */
export function replaceAdminImageBundle(overrides: AdminImageOverrides, gallery: AdminGalleryImage[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEYS.overrides, JSON.stringify(overrides));
  clearCache();
  setAdminGalleryImages(gallery);
}

export function addAdminGalleryImages(
  inputs: Array<{
    title: string;
    category?: string;
    sectionKey?: string;
    folderId?: string;
    imageDataUrl: string;
  }>,
) {
  if (!inputs.length) return;
  const current = getAdminGalleryImages();
  const now = Date.now();
  const nextItems: AdminGalleryImage[] = inputs.map((input, idx) => ({
    id: makeId(),
    title: input.title.trim() || `Gallery Image ${current.length + idx + 1}`,
    category: (input.category ?? "Campus").trim() || "Campus",
    sectionKey: input.sectionKey?.trim() || undefined,
    folderId: input.folderId?.trim() || undefined,
    imageDataUrl: validateAndNormalizeImageDataUrl(input.imageDataUrl) ?? input.imageDataUrl,
    createdAt: now + idx,
  }));
  setAdminGalleryImages([...nextItems, ...current]);
}

export function deleteAdminGalleryImage(id: string) {
  const current = getAdminGalleryImages();
  setAdminGalleryImages(current.filter((item) => item.id !== id));
}

export function isAdminImagesSessionActive(): boolean {
  // Reuse the same admin session guard used by notices.
  return isAdminSessionActive();
}

export async function adminImagesSignIn(username: string, password: string): Promise<Awaited<ReturnType<typeof adminSignIn>>> {
  return adminSignIn(username, password);
}

export function adminImagesSignOut() {
  adminSignOut();
}

