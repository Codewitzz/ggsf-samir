import { supabase } from "@/lib/supabase/client";
import {
  getAdminNoticesItems,
  getAdminNoticesSettings,
  replaceAdminNoticesState,
} from "@/lib/notices/adminNoticesStore";
import {
  getAdminDownloadItems,
  getDefaultDownloadOverrides,
  replaceAllAdminDownloadItems,
  replaceAllDefaultDownloadOverrides,
} from "@/lib/downloads/adminDownloadsStore";
import {
  getAdminGalleryImages,
  getAdminImageOverrides,
  replaceAdminImageBundle,
} from "@/lib/adminImages/adminImagesStore";
import {
  getGalleryFolderRecords,
  replaceGalleryFolderRecords,
} from "@/lib/gallery/galleryFoldersStore";
import {
  getGallerySectionOverrides,
  replaceAllGallerySectionOverrides,
} from "@/lib/gallery/gallerySectionOverridesStore";
import {
  getAlumniRegistrations,
  getAlumniStories,
  replaceAlumniState,
} from "@/lib/alumni/adminAlumniStore";

const DEFAULT_ID = "default";
const DEBOUNCE_MS = 1500;

let isApplyingRemote = false;
let timers: Partial<Record<"notices" | "downloads" | "images" | "gallery" | "alumni", ReturnType<typeof setTimeout>>> = {};

type NoticeStateRow = {
  id: string;
  items: unknown;
  settings: unknown;
};

type DownloadStateRow = {
  id: string;
  items: unknown;
  default_overrides: unknown;
};

type ImageStateRow = {
  id: string;
  overrides: unknown;
  gallery: unknown;
};

type GalleryStateRow = {
  id: string;
  folders: unknown;
  section_overrides: unknown;
};

type AlumniStateRow = {
  id: string;
  registrations: unknown;
  stories: unknown;
};

function clearTimer(key: keyof typeof timers) {
  const t = timers[key];
  if (!t) return;
  clearTimeout(t);
  timers[key] = undefined;
}

async function hydrateNoticesFromDb() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("site_notices_state")
    .select("id,items,settings")
    .eq("id", DEFAULT_ID)
    .maybeSingle<NoticeStateRow>();
  if (error || !data) return;
  replaceAdminNoticesState(
    Array.isArray(data.items) ? (data.items as never[]) : [],
    typeof data.settings === "object" && data.settings ? (data.settings as { homepageAdminWidgetEnabled?: boolean }) : { homepageAdminWidgetEnabled: true },
  );
}

async function hydrateDownloadsFromDb() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("site_downloads_state")
    .select("id,items,default_overrides")
    .eq("id", DEFAULT_ID)
    .maybeSingle<DownloadStateRow>();
  if (error || !data) return;
  replaceAllAdminDownloadItems(Array.isArray(data.items) ? (data.items as never[]) : []);
  replaceAllDefaultDownloadOverrides(
    typeof data.default_overrides === "object" && data.default_overrides && !Array.isArray(data.default_overrides)
      ? (data.default_overrides as Record<string, never>)
      : {},
  );
}

async function hydrateImagesFromDb() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("site_images_state")
    .select("id,overrides,gallery")
    .eq("id", DEFAULT_ID)
    .maybeSingle<ImageStateRow>();
  if (error || !data) return;
  replaceAdminImageBundle(
    typeof data.overrides === "object" && data.overrides && !Array.isArray(data.overrides)
      ? (data.overrides as Record<string, string>)
      : {},
    Array.isArray(data.gallery) ? (data.gallery as never[]) : [],
  );
}

async function hydrateGalleryFromDb() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("site_gallery_state")
    .select("id,folders,section_overrides")
    .eq("id", DEFAULT_ID)
    .maybeSingle<GalleryStateRow>();
  if (error || !data) return;
  replaceGalleryFolderRecords(Array.isArray(data.folders) ? (data.folders as never[]) : []);
  replaceAllGallerySectionOverrides(
    typeof data.section_overrides === "object" && data.section_overrides && !Array.isArray(data.section_overrides)
      ? (data.section_overrides as Record<string, never>)
      : {},
  );
}

async function hydrateAlumniFromDb() {
  if (!supabase) return;
  const { data, error } = await supabase
    .from("site_alumni_state")
    .select("id,registrations,stories")
    .eq("id", DEFAULT_ID)
    .maybeSingle<AlumniStateRow>();
  if (error || !data) return;
  replaceAlumniState(
    Array.isArray(data.registrations) ? (data.registrations as never[]) : [],
    Array.isArray(data.stories) ? (data.stories as never[]) : [],
  );
}

async function pushNoticesToDb() {
  if (!supabase) return;
  const { error } = await supabase.from("site_notices_state").upsert({
    id: DEFAULT_ID,
    items: getAdminNoticesItems(),
    settings: getAdminNoticesSettings(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn("[ggsf-sync] Failed to push notices:", error.message);
}

async function pushDownloadsToDb() {
  if (!supabase) return;
  const { error } = await supabase.from("site_downloads_state").upsert({
    id: DEFAULT_ID,
    items: getAdminDownloadItems(),
    default_overrides: getDefaultDownloadOverrides(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn("[ggsf-sync] Failed to push downloads:", error.message);
}

async function pushImagesToDb() {
  if (!supabase) return;
  const { error } = await supabase.from("site_images_state").upsert({
    id: DEFAULT_ID,
    overrides: getAdminImageOverrides(),
    gallery: getAdminGalleryImages(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn("[ggsf-sync] Failed to push images:", error.message);
}

async function pushGalleryToDb() {
  if (!supabase) return;
  const { error } = await supabase.from("site_gallery_state").upsert({
    id: DEFAULT_ID,
    folders: getGalleryFolderRecords(),
    section_overrides: getGallerySectionOverrides(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn("[ggsf-sync] Failed to push gallery folders/sections:", error.message);
}

async function pushAlumniToDb() {
  if (!supabase) return;
  const { error } = await supabase.from("site_alumni_state").upsert({
    id: DEFAULT_ID,
    registrations: getAlumniRegistrations(),
    stories: getAlumniStories(),
    updated_at: new Date().toISOString(),
  });
  if (error) console.warn("[ggsf-sync] Failed to push alumni:", error.message);
}

function schedulePush(key: "notices" | "downloads" | "images" | "gallery" | "alumni", fn: () => Promise<void>) {
  if (!supabase || isApplyingRemote) return;
  clearTimer(key);
  timers[key] = setTimeout(() => {
    timers[key] = undefined;
    void fn();
  }, DEBOUNCE_MS);
}

export async function initDirectDbSync(): Promise<void> {
  if (typeof window === "undefined" || !supabase) return;

  isApplyingRemote = true;
  try {
    await Promise.all([
      hydrateNoticesFromDb(),
      hydrateDownloadsFromDb(),
      hydrateImagesFromDb(),
      hydrateGalleryFromDb(),
      hydrateAlumniFromDb(),
    ]);
  } finally {
    isApplyingRemote = false;
  }

  window.addEventListener("ggsf_admin_notices_changed", () => schedulePush("notices", pushNoticesToDb));
  window.addEventListener("ggsf_admin_downloads_changed", () => schedulePush("downloads", pushDownloadsToDb));
  window.addEventListener("ggsf_admin_images_changed", () => schedulePush("images", pushImagesToDb));
  window.addEventListener("ggsf_admin_gallery_folders_changed", () => schedulePush("gallery", pushGalleryToDb));
  window.addEventListener("ggsf_admin_gallery_sections_changed", () => schedulePush("gallery", pushGalleryToDb));
  window.addEventListener("ggsf_admin_alumni_changed", () => schedulePush("alumni", pushAlumniToDb));
}
