import type { AdminGalleryImage, AdminImageOverrides } from "@/lib/adminImages/adminImagesStore";
import {
  getAdminGalleryImages,
  getAdminImageOverrides,
  replaceAdminImageBundle,
} from "@/lib/adminImages/adminImagesStore";
import {
  getAdminNoticesItems,
  getAdminNoticesSettings,
  replaceAdminNoticesState,
  type AdminNoticeItem,
  type AdminNoticesSettings,
} from "@/lib/notices/adminNoticesStore";
import {
  getAdminDownloadItems,
  getDefaultDownloadOverrides,
  replaceAllAdminDownloadItems,
  replaceAllDefaultDownloadOverrides,
  type AdminDownloadItem,
  type DefaultDownloadOverride,
} from "@/lib/downloads/adminDownloadsStore";
import { getGalleryFolderRecords, replaceGalleryFolderRecords, type GalleryFolderRecord } from "@/lib/gallery/galleryFoldersStore";
import {
  getGallerySectionOverrides,
  replaceAllGallerySectionOverrides,
  type GallerySectionOverride,
} from "@/lib/gallery/gallerySectionOverridesStore";

export type SiteAdminBundleV1 = {
  version: 1;
  updatedAt: number;
  notices: AdminNoticeItem[];
  noticesSettings: AdminNoticesSettings;
  imageOverrides: AdminImageOverrides;
  galleryImages: AdminGalleryImage[];
  gallerySectionOverrides: Record<string, GallerySectionOverride>;
  galleryFolders: GalleryFolderRecord[];
  downloadItems: AdminDownloadItem[];
  defaultDownloadOverrides: Record<string, DefaultDownloadOverride>;
};

export function collectSiteAdminBundle(): SiteAdminBundleV1 {
  return {
    version: 1,
    updatedAt: Date.now(),
    notices: getAdminNoticesItems(),
    noticesSettings: getAdminNoticesSettings(),
    imageOverrides: getAdminImageOverrides(),
    galleryImages: getAdminGalleryImages(),
    gallerySectionOverrides: getGallerySectionOverrides(),
    galleryFolders: getGalleryFolderRecords(),
    downloadItems: getAdminDownloadItems(),
    defaultDownloadOverrides: getDefaultDownloadOverrides(),
  };
}

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

export function parseSiteAdminBundle(raw: unknown): SiteAdminBundleV1 | null {
  if (!isRecord(raw)) return null;
  if (raw.version !== 1) return null;
  if (!Array.isArray(raw.notices)) return null;
  if (!isRecord(raw.noticesSettings)) return null;
  if (!isRecord(raw.imageOverrides)) return null;
  if (!Array.isArray(raw.galleryImages)) return null;
  if (!isRecord(raw.gallerySectionOverrides)) return null;
  if (!Array.isArray(raw.galleryFolders)) return null;
  if (!Array.isArray(raw.downloadItems)) return null;
  if (!isRecord(raw.defaultDownloadOverrides)) return null;
  return raw as unknown as SiteAdminBundleV1;
}

export function applySiteAdminBundle(bundle: SiteAdminBundleV1): void {
  replaceGalleryFolderRecords(bundle.galleryFolders);
  replaceAdminImageBundle(bundle.imageOverrides, bundle.galleryImages);
  replaceAllGallerySectionOverrides(bundle.gallerySectionOverrides);
  replaceAdminNoticesState(bundle.notices, bundle.noticesSettings);
  replaceAllAdminDownloadItems(bundle.downloadItems);
  replaceAllDefaultDownloadOverrides(bundle.defaultDownloadOverrides);
}
