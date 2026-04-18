import type { GalleryMainCategory } from "@/lib/gallery/gallerySections";
import { getAdminGalleryImages, setAdminGalleryImages } from "@/lib/adminImages/adminImagesStore";
import { DEFAULT_GALLERY_SECTIONS } from "@/lib/gallery/gallerySections";
import { getMergedGallerySection } from "@/lib/gallery/gallerySectionOverridesStore";

const STORAGE_KEY = "ggsf_admin_gallery_folders_v1";

export type GalleryFolderRecord = {
  id: string;
  name: string;
  parentId: string | null;
  mainCategory: GalleryMainCategory;
  createdAt: number;
};

export function getSystemSectionFolderId(sectionKey: string) {
  return `sys-sec:${sectionKey}`;
}

function dispatch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ggsf_admin_gallery_folders_changed"));
    window.dispatchEvent(new Event("ggsf_admin_images_changed"));
  }
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
  return `gf_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function getGalleryFolderRecords(): GalleryFolderRecord[] {
  const storage = getStorage();
  if (!storage) return [];
  const parsed = safeJsonParse<GalleryFolderRecord[]>(storage.getItem(STORAGE_KEY));
  return Array.isArray(parsed) ? parsed : [];
}

function writeFolders(items: GalleryFolderRecord[]) {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(items));
  dispatch();
}

function upsertFolderRecord(record: GalleryFolderRecord) {
  const items = getGalleryFolderRecords();
  const idx = items.findIndex((f) => f.id === record.id);
  const next = idx === -1 ? [record, ...items] : items.map((f) => (f.id === record.id ? record : f));
  writeFolders(next);
}

/**
 * Ensure built-in gallery section cards exist as real folder albums.
 * This makes default sections editable like admin-created albums (subfolders + uploads).
 */
export function ensureDefaultSectionFolders() {
  const now = Date.now();
  const existing = getGalleryFolderRecords();
  const byId = new Map(existing.map((f) => [f.id, f] as const));
  const next: GalleryFolderRecord[] = [...existing];

  for (const def of DEFAULT_GALLERY_SECTIONS) {
    const merged = getMergedGallerySection(def.sectionKey) ?? def;
    const id = getSystemSectionFolderId(def.sectionKey);
    const prev = byId.get(id);
    const rec: GalleryFolderRecord = {
      id,
      name: merged.title,
      parentId: null,
      mainCategory: merged.mainCategory,
      createdAt: prev?.createdAt ?? now,
    };
    if (prev) {
      // Replace existing in-place if changed.
      const idx = next.findIndex((x) => x.id === id);
      if (idx !== -1) next[idx] = rec;
    } else {
      next.unshift(rec);
    }
  }

  writeFolders(next);
}

/**
 * One-time migration: move older `sectionKey` images into their corresponding system folders.
 * Keeps data local (browser storage), but unifies the gallery structure.
 */
export function migrateSectionKeyImagesToSystemFolders() {
  const items = getAdminGalleryImages();
  let changed = false;
  const next = items.map((img) => {
    if (!img.sectionKey || img.folderId) return img;
    const folderId = getSystemSectionFolderId(img.sectionKey);
    changed = true;
    return { ...img, folderId, sectionKey: undefined };
  });
  if (changed) setAdminGalleryImages(next);
}

export function getChildFolderRecords(parentId: string | null): GalleryFolderRecord[] {
  return getGalleryFolderRecords().filter((f) => f.parentId === parentId);
}

export function getRootFolderRecordsForCategory(category: GalleryMainCategory | "All"): GalleryFolderRecord[] {
  const all = getGalleryFolderRecords();
  if (category === "All") return all.filter((f) => f.parentId === null);
  return all.filter((f) => f.parentId === null && f.mainCategory === category);
}

export function getFolderRecordById(id: string): GalleryFolderRecord | undefined {
  return getGalleryFolderRecords().find((f) => f.id === id);
}

export function addGalleryFolderRecord(input: {
  name: string;
  parentId: string | null;
  mainCategory: GalleryMainCategory;
}): GalleryFolderRecord {
  const name = input.name.trim();
  if (!name) throw new Error("Folder name is required.");
  const t = Date.now();
  const rec: GalleryFolderRecord = {
    id: makeId(),
    name,
    parentId: input.parentId,
    mainCategory: input.mainCategory,
    createdAt: t,
  };
  const items = getGalleryFolderRecords();
  writeFolders([rec, ...items]);
  return rec;
}

function collectDescendantIds(rootId: string): Set<string> {
  const all = getGalleryFolderRecords();
  const byParent = new Map<string | null, GalleryFolderRecord[]>();
  for (const f of all) {
    const k = f.parentId;
    const arr = byParent.get(k) ?? [];
    arr.push(f);
    byParent.set(k, arr);
  }
  const out = new Set<string>();
  const walk = (id: string) => {
    out.add(id);
    const kids = byParent.get(id) ?? [];
    for (const c of kids) walk(c.id);
  };
  walk(rootId);
  return out;
}

export function deleteGalleryFolderRecord(id: string) {
  const ids = collectDescendantIds(id);
  const items = getGalleryFolderRecords().filter((f) => !ids.has(f.id));
  writeFolders(items);
  const imgs = getAdminGalleryImages().filter((img) => !img.folderId || !ids.has(img.folderId));
  setAdminGalleryImages(imgs);
}

/** Replace folder tree (e.g. remote sync). Does not delete orphan images — apply images after this. */
export function replaceGalleryFolderRecords(items: GalleryFolderRecord[]) {
  writeFolders([...items]);
}
