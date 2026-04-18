import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, FolderOpen, Home, Plus, Search, Trash2 } from "lucide-react";
import { fileToOptimizedImageDataUrl } from "@/lib/images/optimizeImage";
import {
  addAdminGalleryImages,
  deleteAdminGalleryImage,
  getAdminGalleryImages,
  type AdminGalleryImage,
} from "@/lib/adminImages/adminImagesStore";
import { isAdminSessionActive, validateAndNormalizeImageDataUrl } from "@/lib/notices/adminNoticesStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DEFAULT_GALLERY_SECTIONS, type GalleryMainCategory } from "@/lib/gallery/gallerySections";
import { getMergedGallerySection } from "@/lib/gallery/gallerySectionOverridesStore";
import {
  addGalleryFolderRecord,
  deleteGalleryFolderRecord,
  ensureDefaultSectionFolders,
  getChildFolderRecords,
  getFolderRecordById,
  getGalleryFolderRecords,
  getSystemSectionFolderId,
  getRootFolderRecordsForCategory,
  migrateSectionKeyImagesToSystemFolders,
  type GalleryFolderRecord,
} from "@/lib/gallery/galleryFoldersStore";

function normalizeMainCategory(category: string): GalleryMainCategory {
  const c = category.trim().toLowerCase();
  if (c.includes("campus")) return "Campus";
  if (c.includes("facilit")) return "Facilities";
  if (c.includes("event") || c.includes("fest") || c.includes("seminar")) return "Events";
  if (c.includes("academic") || c.includes("lab") || c.includes("workshop")) return "Academics";
  return "Others";
}

async function fileToGalleryDataUrl(file: File): Promise<string> {
  const dataUrl = await fileToOptimizedImageDataUrl(file, { maxDimension: 1600, quality: 0.82, preferWebp: true });
  return validateAndNormalizeImageDataUrl(dataUrl) ?? dataUrl;
}

type FolderPhoto = {
  key: string;
  src: string;
  title: string;
  adminId?: string;
};

type GalleryFolder = {
  id: string;
  title: string;
  badge: string;
  mainCategory: GalleryMainCategory;
  cover: string;
  span: string;
  photos: FolderPhoto[];
  sectionKey?: string;
  /** Custom folder from admin (nested albums, e.g. events). */
  dynamicFolderId?: string;
};

const PLACEHOLDER_COVER =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#e2e8f0" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="14">Folder</text></svg>`,
  );

function buildDynamicFolderCards(
  adminList: AdminGalleryImage[],
  activeCategory: "All" | GalleryMainCategory,
): GalleryFolder[] {
  const roots =
    activeCategory === "All"
      ? getGalleryFolderRecords().filter((f) => f.parentId === null)
      : getRootFolderRecordsForCategory(activeCategory);
  return roots.map((rec) => {
    const sectionKey = rec.id.startsWith("sys-sec:") ? rec.id.slice("sys-sec:".length) : null;
    const meta = sectionKey ? getMergedGallerySection(sectionKey) : undefined;
    const photos: FolderPhoto[] = adminList
      .filter((i) => i.folderId === rec.id)
      .map((i) => ({
        key: i.id,
        src: i.imageDataUrl,
        title: i.title,
        adminId: i.id,
      }));
    const cover = photos[0]?.src ?? meta?.image ?? PLACEHOLDER_COVER;
    return {
      id: `dyn-${rec.id}`,
      title: meta?.title ?? rec.name,
      badge: meta?.displayCategory ?? rec.mainCategory,
      mainCategory: meta?.mainCategory ?? rec.mainCategory,
      cover,
      span: meta?.span ?? "col-span-1 row-span-1",
      photos,
      dynamicFolderId: rec.id,
    };
  });
}

function buildGalleryFolders(adminList: AdminGalleryImage[]): GalleryFolder[] {
  const bySection = new Map<string, AdminGalleryImage[]>();
  const loose: AdminGalleryImage[] = [];
  for (const item of adminList) {
    if (item.folderId) {
      continue;
    }
    if (item.sectionKey) {
      const arr = bySection.get(item.sectionKey) ?? [];
      arr.push(item);
      bySection.set(item.sectionKey, arr);
    } else {
      loose.push(item);
    }
  }

  const folders: GalleryFolder[] = [];
  const seminarTitle = getMergedGallerySection("seminar-events")?.title ?? "Seminar & Events";

  for (const s of DEFAULT_GALLERY_SECTIONS) {
    const merged = getMergedGallerySection(s.sectionKey) ?? s;
    const extras = bySection.get(s.sectionKey) ?? [];
    const photos: FolderPhoto[] = [
      { key: `cover-${merged.sectionKey}`, src: merged.image, title: merged.title },
      ...extras.map((i) => ({
        key: i.id,
        src: i.imageDataUrl,
        title: i.title,
        adminId: i.id,
      })),
    ];
    folders.push({
      id: `sec-${merged.sectionKey}`,
      title: merged.title,
      badge: merged.displayCategory,
      mainCategory: merged.mainCategory,
      cover: photos[0].src,
      span: merged.span,
      photos,
      sectionKey: merged.sectionKey,
    });
  }

  const looseEvents = loose.filter((i) => normalizeMainCategory(i.category) === "Events");
  const eventGroups = new Map<string, AdminGalleryImage[]>();
  looseEvents.forEach((item) => {
    const name = item.title.replace(/\s+\d+$/, "").trim() || "Event";
    const arr = eventGroups.get(name) ?? [];
    arr.push(item);
    eventGroups.set(name, arr);
  });

  for (const [eventName, items] of eventGroups) {
    const photos: FolderPhoto[] = items.map((i) => ({
      key: i.id,
      src: i.imageDataUrl,
      title: i.title,
      adminId: i.id,
    }));
    if (eventName === seminarTitle) {
      const seminarFolder = folders.find((f) => f.sectionKey === "seminar-events");
      if (seminarFolder) {
        seminarFolder.photos.push(...photos);
        continue;
      }
    }
    folders.push({
      id: `evt-${eventName}`,
      title: eventName,
      badge: "Events",
      mainCategory: "Events",
      cover: photos[0].src,
      span: "col-span-1 row-span-1",
      photos,
    });
  }

  const looseOther = loose.filter((i) => normalizeMainCategory(i.category) !== "Events");
  const byMc = new Map<GalleryMainCategory, AdminGalleryImage[]>();
  looseOther.forEach((item) => {
    const mc = normalizeMainCategory(item.category);
    const arr = byMc.get(mc) ?? [];
    arr.push(item);
    byMc.set(mc, arr);
  });
  for (const [mc, items] of byMc) {
    const photos: FolderPhoto[] = items.map((i) => ({
      key: i.id,
      src: i.imageDataUrl,
      title: i.title,
      adminId: i.id,
    }));
    folders.push({
      id: `loose-${mc}`,
      title: `${mc} (other uploads)`,
      badge: mc,
      mainCategory: mc,
      cover: photos[0].src,
      span: "col-span-1 row-span-1",
      photos,
    });
  }

  return folders;
}

const NEW_EVENT_VALUE = "__new_event__";

async function addImagesToGalleryFolder(folder: GalleryFolder, files: File[], titlePrefix?: string): Promise<void> {
  if (!files.length) return;
  const dataUrls = await Promise.all(files.map((f) => fileToGalleryDataUrl(f)));

  if (folder.dynamicFolderId) {
    const base = (titlePrefix?.trim() || folder.title).replace(/\s+\d+$/, "");
    addAdminGalleryImages(
      dataUrls.map((imageDataUrl, idx) => ({
        title: `${base} ${idx + 1}`,
        category: folder.mainCategory,
        folderId: folder.dynamicFolderId,
        imageDataUrl,
      })),
    );
    return;
  }

  // SectionKey-based folders are deprecated (default sections are now real folders via `folderId`).

  if (folder.id.startsWith("evt-")) {
    const base = (titlePrefix?.trim() || folder.title).replace(/\s+\d+$/, "");
    addAdminGalleryImages(
      dataUrls.map((imageDataUrl, idx) => ({
        title: `${base} ${idx + 1}`,
        category: "Events",
        imageDataUrl,
      })),
    );
    return;
  }

  if (folder.id.startsWith("loose-")) {
    const base = (titlePrefix?.trim() || folder.title).replace(/\s+\d+$/, "");
    addAdminGalleryImages(
      dataUrls.map((imageDataUrl, idx) => ({
        title: `${base} ${idx + 1}`,
        category: folder.mainCategory,
        imageDataUrl,
      })),
    );
  }
}

const GallerySection = () => {
  const categories = useMemo(() => ["All", "Campus", "Facilities", "Events", "Academics", "Others"] as const, []);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [adminTick, setAdminTick] = useState(0);
  const [dynamicStack, setDynamicStack] = useState<string[]>([]);
  const [openFolder, setOpenFolder] = useState<GalleryFolder | null>(null);
  const [previewLightbox, setPreviewLightbox] = useState<{ photos: FolderPhoto[]; index: number } | null>(null);
  const [isAdmin, setIsAdmin] = useState(isAdminSessionActive());
  const pendingFolderRef = useRef<GalleryFolder | null>(null);
  const quickAddInputRef = useRef<HTMLInputElement>(null);
  const [newSubfolderName, setNewSubfolderName] = useState("");
  const [drillError, setDrillError] = useState<string | null>(null);

  useEffect(() => {
    const onChanged = () => setAdminTick((x) => x + 1);
    window.addEventListener("ggsf_admin_images_changed", onChanged);
    window.addEventListener("ggsf_admin_gallery_sections_changed", onChanged);
    window.addEventListener("ggsf_admin_gallery_folders_changed", onChanged);
    return () => {
      window.removeEventListener("ggsf_admin_images_changed", onChanged);
      window.removeEventListener("ggsf_admin_gallery_sections_changed", onChanged);
      window.removeEventListener("ggsf_admin_gallery_folders_changed", onChanged);
    };
  }, []);

  useEffect(() => {
    // Make default cards behave like folders, and migrate older uploads.
    ensureDefaultSectionFolders();
    migrateSectionKeyImagesToSystemFolders();
  }, []);

  useEffect(() => {
    const syncAdmin = () => setIsAdmin(isAdminSessionActive());
    syncAdmin();
    window.addEventListener("storage", syncAdmin);
    window.addEventListener("ggsf_admin_notices_changed", syncAdmin);
    return () => {
      window.removeEventListener("storage", syncAdmin);
      window.removeEventListener("ggsf_admin_notices_changed", syncAdmin);
    };
  }, []);

  const allFolders = useMemo(() => {
    const adminList = getAdminGalleryImages();
    const dynamicRoots = buildDynamicFolderCards(adminList, activeCategory);
    const staticFolders = buildGalleryFolders(adminList);
    // Hide default section cards (now represented as system folders).
    const filteredStatic = staticFolders.filter((f) => !f.sectionKey);
    return [...dynamicRoots, ...filteredStatic];
  }, [adminTick, activeCategory]);

  const openFolderId = openFolder?.id;
  useEffect(() => {
    if (!openFolderId) return;
    const next = buildGalleryFolders(getAdminGalleryImages()).find((f) => f.id === openFolderId);
    if (next) setOpenFolder(next);
    else setOpenFolder(null);
  }, [adminTick, openFolderId]);

  useEffect(() => {
    if (openFolder) {
      // no-op; kept for future dialog state
    }
  }, [openFolder?.id]);

  const filteredFolders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allFolders.filter((folder) => {
      const matchCategory = activeCategory === "All" || folder.mainCategory === activeCategory;
      const matchQuery =
        !q ||
        folder.title.toLowerCase().includes(q) ||
        folder.badge.toLowerCase().includes(q) ||
        folder.photos.some((p) => p.title.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [activeCategory, allFolders, query]);

  const currentDynamicId = dynamicStack.length ? dynamicStack[dynamicStack.length - 1]! : null;
  const currentDynamicRecord = currentDynamicId ? getFolderRecordById(currentDynamicId) : undefined;
  const childFolderRecords = currentDynamicId ? getChildFolderRecords(currentDynamicId) : [];
  const photosInCurrentDynamic = useMemo(() => {
    if (!currentDynamicId) return [];
    return getAdminGalleryImages()
      .filter((i) => i.folderId === currentDynamicId)
      .map((i) => ({
        key: i.id,
        src: i.imageDataUrl,
        title: i.title,
        adminId: i.id,
      }));
  }, [adminTick, currentDynamicId]);

  const openFolderCard = (folder: GalleryFolder) => {
    if (folder.dynamicFolderId) {
      setDynamicStack([folder.dynamicFolderId]);
      setOpenFolder(null);
      return;
    }
    setOpenFolder(folder);
  };

  const openPhotoLightbox = (photos: FolderPhoto[], index: number) => {
    if (!photos.length) return;
    setPreviewLightbox({ photos, index });
  };

  useEffect(() => {
    if (!previewLightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPreviewLightbox((p) => (p && p.index > 0 ? { ...p, index: p.index - 1 } : p));
      }
      if (e.key === "ArrowRight") {
        setPreviewLightbox((p) =>
          p && p.index < p.photos.length - 1 ? { ...p, index: p.index + 1 } : p,
        );
      }
      if (e.key === "Escape") setPreviewLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewLightbox]);

  const recordToGalleryFolder = (rec: GalleryFolderRecord, adminList: AdminGalleryImage[]): GalleryFolder => {
    const photos: FolderPhoto[] = adminList
      .filter((i) => i.folderId === rec.id)
      .map((i) => ({
        key: i.id,
        src: i.imageDataUrl,
        title: i.title,
        adminId: i.id,
      }));
    const cover = photos[0]?.src ?? PLACEHOLDER_COVER;
    return {
      id: `dyn-${rec.id}`,
      title: rec.name,
      badge: rec.mainCategory,
      mainCategory: rec.mainCategory,
      cover,
      span: "col-span-1 row-span-1",
      photos,
      dynamicFolderId: rec.id,
    };
  };

  const handleAddSubfolder = () => {
    if (!currentDynamicRecord || !currentDynamicId) return;
    const name = newSubfolderName.trim();
    if (!name) return;
    try {
      addGalleryFolderRecord({
        name,
        parentId: currentDynamicId,
        mainCategory: currentDynamicRecord.mainCategory,
      });
      setNewSubfolderName("");
      setAdminTick((x) => x + 1);
    } catch (err) {
      setDrillError(err instanceof Error ? err.message : "Could not create folder.");
    }
  };

  const handleQuickAddFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files).filter((f) => f.type.startsWith("image/")) : [];
    e.target.value = "";
    const target = pendingFolderRef.current;
    pendingFolderRef.current = null;
    if (!target || !files.length) return;
    try {
      await addImagesToGalleryFolder(target, files);
      setAdminTick((x) => x + 1);
    } catch (err) {
      setDrillError(err instanceof Error ? err.message : "Upload failed.");
    }
  };

  const requestAddToFolderCard = (folder: GalleryFolder, e?: React.MouseEvent) => {
    e?.stopPropagation();
    pendingFolderRef.current = folder;
    quickAddInputRef.current?.click();
  };

  const requestAddToCurrentDrillFolder = () => {
    if (!currentDynamicRecord) return;
    const folder = recordToGalleryFolder(currentDynamicRecord, getAdminGalleryImages());
    pendingFolderRef.current = folder;
    quickAddInputRef.current?.click();
  };

  return (
    <section className="px-4 bg-background py-6 sm:py-8 md:py-12">
      <input
        ref={quickAddInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleQuickAddFiles}
      />
      <div className="container mx-auto">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-primary/10 text-primary border-primary/20" variant="secondary">
                Gallery
              </Badge>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Campus moments, facilities & student life
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Choose a category, then open a folder to browse its photos.
              </p>
            </div>

            <div className="w-full md:w-[360px]">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search folders or photos…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Search gallery"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={activeCategory === cat ? "default" : "secondary"}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "h-8 sm:h-9 rounded-full px-3 sm:px-4 text-xs sm:text-sm transition-all",
                  activeCategory === cat
                    ? "shadow-md hover:shadow-lg scale-105"
                    : "bg-muted/60 hover:bg-muted text-foreground hover:scale-105",
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {dynamicStack.length > 0 && currentDynamicRecord ? (
          <div className="mt-6 sm:mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => setDynamicStack([])}>
                <Home className="h-4 w-4" />
                All folders
              </Button>
              {dynamicStack.length > 1 && (
                <Button type="button" variant="outline" size="sm" onClick={() => setDynamicStack((s) => s.slice(0, -1))}>
                  Back
                </Button>
              )}
              <span className="text-sm text-muted-foreground">
                {dynamicStack.map((id) => getFolderRecordById(id)?.name).join(" / ")}
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">{currentDynamicRecord.name}</h3>
                {isAdmin && (
                  <Button type="button" size="sm" variant="secondary" className="gap-2" onClick={requestAddToCurrentDrillFolder}>
                    <Plus className="h-4 w-4" />
                    Add photos
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {childFolderRecords.length > 0
                  ? "Open a subfolder or browse photos below."
                  : photosInCurrentDynamic.length > 0
                    ? "Photos in this folder."
                    : "Empty folder — add photos or a subfolder."}
              </p>
            </div>

            {isAdmin && (
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-3">
                <p className="text-sm font-medium">Manage this folder</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-end">
                  <div className="flex-1 min-w-[160px] space-y-1">
                    <label className="text-xs text-muted-foreground">New subfolder name</label>
                    <Input
                      value={newSubfolderName}
                      onChange={(e) => setNewSubfolderName(e.target.value)}
                      placeholder="e.g. Day 1"
                    />
                  </div>
                  <Button type="button" size="sm" onClick={handleAddSubfolder}>
                    Add subfolder
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      if (!currentDynamicId) return;
                      if (!window.confirm("Delete this folder and all subfolders and photos inside?")) return;
                      deleteGalleryFolderRecord(currentDynamicId);
                      setDynamicStack((s) => s.slice(0, -1));
                      setAdminTick((x) => x + 1);
                    }}
                  >
                    Delete folder
                  </Button>
                </div>
                {drillError && <p className="text-xs text-destructive">{drillError}</p>}
              </div>
            )}

            {childFolderRecords.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-3">Subfolders</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {childFolderRecords.map((rec) => {
                    const sub = recordToGalleryFolder(rec, getAdminGalleryImages());
                    return (
                      <Card
                        key={rec.id}
                        onClick={() => setDynamicStack((s) => [...s, rec.id])}
                        className="group relative overflow-hidden rounded-xl border-border bg-card/60 hover:bg-card transition-all cursor-pointer min-h-[140px]"
                      >
                        <img
                          src={sub.cover}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <p className="text-white font-semibold text-sm truncate">{rec.name}</p>
                          <p className="text-white/80 text-xs">{sub.photos.length} photos</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {photosInCurrentDynamic.length > 0 && (
              <div>
                {childFolderRecords.length > 0 && <h4 className="text-sm font-semibold mb-3">Photos</h4>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {photosInCurrentDynamic.map((photo, idx) => (
                    <button
                      key={photo.key}
                      type="button"
                      className="relative overflow-hidden rounded-lg border border-border text-left"
                      onClick={() => openPhotoLightbox(photosInCurrentDynamic, idx)}
                    >
                      <img src={photo.src} alt={photo.title} className="h-36 w-full object-cover" loading="lazy" />
                      {isAdmin && photo.adminId && (
                        <button
                          type="button"
                          className="absolute top-2 left-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAdminGalleryImage(photo.adminId!);
                            setAdminTick((x) => x + 1);
                          }}
                          aria-label="Delete photo"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <div className="bg-muted/80 px-2 py-1">
                        <p className="text-xs line-clamp-2">{photo.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[140px] md:auto-rows-[160px] gap-3 sm:gap-4 md:gap-5 grid-flow-dense">
          {filteredFolders.map((folder) => (
            <Card
              key={folder.id}
              onClick={() => openFolderCard(folder)}
              className={cn(
                "group relative overflow-hidden rounded-xl sm:rounded-2xl border-border bg-card/60 hover:bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
                folder.span,
              )}
            >
              {isAdmin && (
                <button
                  type="button"
                  onClick={(e) => requestAddToFolderCard(folder, e)}
                  className="absolute top-2 right-2 z-20 inline-flex items-center gap-1 rounded-full bg-secondary/95 px-2 py-1 text-[10px] sm:text-xs font-semibold text-secondary-foreground shadow-md hover:bg-secondary"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Add photos</span>
                </button>
              )}
              <img
                src={folder.cover}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 transition-all duration-300" />
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 backdrop-blur-md shadow-lg text-[10px] sm:text-xs shrink-0"
                  >
                    <FolderOpen className="h-3 w-3 sm:mr-1 inline sm:inline-block" />
                    <span className="hidden sm:inline"> Folder</span>
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-white/30 backdrop-blur-md shadow-lg group-hover:bg-white/30 transition-all text-xs"
                  >
                    {folder.badge}
                  </Badge>
                </div>
                <div className="transform group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
                  <p className="text-white font-bold text-sm sm:text-base md:text-lg leading-snug drop-shadow-lg">
                    {folder.title}
                  </p>
                  <p className="text-white/90 text-xs mt-1 sm:mt-1.5 font-medium">
                    {folder.photos.length} photo{folder.photos.length === 1 ? "" : "s"} · Open folder
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFolders.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">No folders match your search.</p>
            <Button
              type="button"
              variant="secondary"
              className="mt-3 rounded-full"
              onClick={() => {
                setActiveCategory("All");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
          </>
        )}
      </div>

      <Dialog
        open={Boolean(openFolder)}
        onOpenChange={(open) => {
          if (!open) setOpenFolder(null);
        }}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <DialogTitle className="pr-2">{openFolder?.title}</DialogTitle>
              {isAdmin && openFolder && (
                <Button type="button" size="sm" variant="secondary" className="gap-2 w-full sm:w-auto" onClick={() => requestAddToFolderCard(openFolder)}>
                  <Plus className="h-4 w-4" />
                  Add photos
                </Button>
              )}
            </div>
          </DialogHeader>

          {!openFolder || openFolder.photos.length === 0 ? (
            <div className="text-sm text-muted-foreground">
              {openFolder && isAdmin
                ? "No photos yet — use Add to folder above."
                : "This folder has no photos yet."}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto pr-1">
              {openFolder.photos.map((photo, idx) => (
                <button
                  key={photo.key}
                  type="button"
                  className="relative overflow-hidden rounded-lg border border-border text-left"
                  onClick={() => openPhotoLightbox(openFolder.photos, idx)}
                >
                  <img src={photo.src} alt={photo.title} className="h-36 w-full object-cover" loading="lazy" />
                  {isAdmin && photo.adminId && (
                    <button
                      type="button"
                      className="absolute top-2 left-2 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white hover:bg-black/75"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAdminGalleryImage(photo.adminId!);
                        setAdminTick((x) => x + 1);
                      }}
                      aria-label="Delete photo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <div className="bg-muted/80 px-2 py-1">
                    <p className="text-xs line-clamp-2">{photo.title}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(previewLightbox)} onOpenChange={(open) => !open && setPreviewLightbox(null)}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>
              {previewLightbox ? previewLightbox.photos[previewLightbox.index]?.title : ""}
            </DialogTitle>
          </DialogHeader>
          {previewLightbox && previewLightbox.photos[previewLightbox.index] && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg border border-border bg-black/5">
                <img
                  src={previewLightbox.photos[previewLightbox.index].src}
                  alt={previewLightbox.photos[previewLightbox.index].title}
                  className="w-full max-h-[75vh] object-contain mx-auto"
                />
              </div>
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={previewLightbox.index <= 0}
                  onClick={() =>
                    setPreviewLightbox((p) => (p && p.index > 0 ? { ...p, index: p.index - 1 } : p))
                  }
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </Button>
                <span className="text-xs sm:text-sm text-muted-foreground tabular-nums">
                  {previewLightbox.index + 1} / {previewLightbox.photos.length}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={previewLightbox.index >= previewLightbox.photos.length - 1}
                  onClick={() =>
                    setPreviewLightbox((p) =>
                      p && p.index < p.photos.length - 1 ? { ...p, index: p.index + 1 } : p,
                    )
                  }
                  className="gap-1"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
