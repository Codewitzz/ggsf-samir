import {
  DEFAULT_GALLERY_SECTIONS,
  type DefaultGallerySection,
  type GalleryMainCategory,
} from "@/lib/gallery/gallerySections";

const STORAGE_KEY = "ggsf_admin_gallery_section_overrides_v1";

export type GallerySectionOverride = {
  title?: string;
  displayCategory?: string;
  mainCategory?: GalleryMainCategory;
  /** Cover image (data URL) — replaces the default Unsplash URL for this section card. */
  imageDataUrl?: string;
  span?: string;
};

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

function dispatchChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ggsf_admin_gallery_sections_changed"));
    window.dispatchEvent(new Event("ggsf_admin_images_changed"));
  }
}

export function getGallerySectionOverrides(): Record<string, GallerySectionOverride> {
  const storage = getStorage();
  if (!storage) return {};
  const parsed = safeJsonParse<Record<string, GallerySectionOverride>>(storage.getItem(STORAGE_KEY));
  return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
}

function writeAll(overrides: Record<string, GallerySectionOverride>) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  dispatchChanged();
}

export function replaceGallerySectionOverride(sectionKey: string, data: GallerySectionOverride) {
  const all = getGallerySectionOverrides();
  const prev = all[sectionKey] ?? {};
  const merged = { ...prev, ...data };
  const cleaned = Object.fromEntries(
    Object.entries(merged).filter(([, v]) => v !== undefined && v !== "")
  ) as GallerySectionOverride;
  writeAll({ ...all, [sectionKey]: cleaned });
}

export function clearGallerySectionOverride(sectionKey: string) {
  const all = getGallerySectionOverrides();
  if (!(sectionKey in all)) return;
  const { [sectionKey]: _, ...rest } = all;
  writeAll(rest);
}

/** Replace entire overrides map (e.g. remote sync). */
export function replaceAllGallerySectionOverrides(overrides: Record<string, GallerySectionOverride>) {
  writeAll(overrides);
}

export function getMergedGallerySection(sectionKey: string): DefaultGallerySection | undefined {
  const base = DEFAULT_GALLERY_SECTIONS.find((s) => s.sectionKey === sectionKey);
  if (!base) return undefined;
  const o = getGallerySectionOverrides()[sectionKey];
  if (!o) return base;
  return {
    ...base,
    title: o.title ?? base.title,
    displayCategory: o.displayCategory ?? base.displayCategory,
    mainCategory: o.mainCategory ?? base.mainCategory,
    image: o.imageDataUrl ?? base.image,
    span: o.span ?? base.span,
  };
}
