import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  adminSignIn,
  adminSignOut,
  isAdminSessionActive,
  validateAndNormalizeImageDataUrl,
} from "@/lib/notices/adminNoticesStore";
import { DEFAULT_GALLERY_SECTIONS, type GalleryMainCategory } from "@/lib/gallery/gallerySections";
import {
  clearGallerySectionOverride,
  getGallerySectionOverrides,
  getMergedGallerySection,
  replaceGallerySectionOverride,
  type GallerySectionOverride,
} from "@/lib/gallery/gallerySectionOverridesStore";
import {
  addGalleryFolderRecord,
  deleteGalleryFolderRecord,
  getFolderRecordById,
  getGalleryFolderRecords,
  type GalleryFolderRecord,
} from "@/lib/gallery/galleryFoldersStore";
import { addAdminGalleryImages } from "@/lib/adminImages/adminImagesStore";
import { fileToOptimizedImageDataUrl } from "@/lib/images/optimizeImage";
import {
  AlertCircle,
  ExternalLink,
  Eye,
  ImageIcon,
  KeyRound,
  LogOut,
  Pencil,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

const ADMIN_HINT =
  "Gallery section cards are stored in this browser only. Upload a cover image or edit titles/categories.";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read the image."));
    reader.readAsDataURL(file);
  });
}

async function fileToGalleryDataUrl(file: File): Promise<string> {
  const dataUrl = await fileToOptimizedImageDataUrl(file, { maxDimension: 1600, quality: 0.82, preferWebp: true });
  return validateAndNormalizeImageDataUrl(dataUrl) ?? dataUrl;
}

const MAIN_CATEGORIES: GalleryMainCategory[] = ["Campus", "Facilities", "Events", "Academics", "Others"];

const AdminGallery = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminSessionActive());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const [dialogKey, setDialogKey] = useState<string | null>(null);
  const [gTitle, setGTitle] = useState("");
  const [gDisplayCategory, setGDisplayCategory] = useState("");
  const [gMainCategory, setGMainCategory] = useState<GalleryMainCategory>("Campus");
  const [gSpan, setGSpan] = useState("");
  const [gImageDataUrl, setGImageDataUrl] = useState<string | undefined>(undefined);

  const [folderTick, setFolderTick] = useState(0);
  const [newRootFolderName, setNewRootFolderName] = useState("");
  const [newRootFolderCategory, setNewRootFolderCategory] = useState<GalleryMainCategory>("Events");

  useEffect(() => {
    const clearCredentials = () => {
      setUsername("");
      setPassword("");
      setLoginError(null);
    };
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) clearCredentials();
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const onSync = () => setTick((x) => x + 1);
    window.addEventListener("ggsf_admin_gallery_sections_changed", onSync);
    return () => window.removeEventListener("ggsf_admin_gallery_sections_changed", onSync);
  }, []);

  useEffect(() => {
    const onFolders = () => setFolderTick((x) => x + 1);
    window.addEventListener("ggsf_admin_gallery_folders_changed", onFolders);
    return () => window.removeEventListener("ggsf_admin_gallery_folders_changed", onFolders);
  }, []);

  const rootAlbumFolders = useMemo(
    () => getGalleryFolderRecords().filter((f) => f.parentId === null),
    [folderTick],
  );

  const allFoldersSorted = useMemo(() => {
    const all = getGalleryFolderRecords();
    const label = (f: GalleryFolderRecord) => {
      const parts: string[] = [];
      let cur: GalleryFolderRecord | undefined = f;
      const byId = new Map(all.map((x) => [x.id, x] as const));
      while (cur) {
        parts.unshift(cur.name);
        cur = cur.parentId ? byId.get(cur.parentId) : undefined;
      }
      return `${parts.join(" → ")} (${f.mainCategory})`;
    };
    return [...all].sort((a, b) => label(a).localeCompare(label(b)));
  }, [folderTick]);

  const [uploadFolderId, setUploadFolderId] = useState("");
  const [uploadPrefix, setUploadPrefix] = useState("");
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadBusy, setUploadBusy] = useState(false);

  const overrides = useMemo(() => getGallerySectionOverrides(), [tick]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await adminSignIn(username.trim(), password);
    if (result.ok) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      toast({ title: "Logged in", description: "You can edit gallery section cards." });
    } else {
      setLoginError((result as { ok: false; reason: string }).reason);
    }
  };

  const handleLogout = () => {
    adminSignOut();
    setIsLoggedIn(false);
    toast({ title: "Signed out" });
  };

  const openDialog = (sectionKey: string) => {
    const merged = getMergedGallerySection(sectionKey);
    if (!merged) return;
    setDialogKey(sectionKey);
    setGTitle(merged.title);
    setGDisplayCategory(merged.displayCategory);
    setGMainCategory(merged.mainCategory);
    setGSpan(merged.span);
    const o = getGallerySectionOverrides()[sectionKey];
    setGImageDataUrl(o?.imageDataUrl);
  };

  const closeDialog = () => {
    setDialogKey(null);
    setGImageDataUrl(undefined);
  };

  const handlePickCover = async (file: File | null) => {
    if (!file) {
      setGImageDataUrl(undefined);
      return;
    }
    try {
      const dataUrl = await fileToGalleryDataUrl(file);
      setGImageDataUrl(dataUrl);
    } catch (err) {
      toast({
        title: "Invalid image",
        description: err instanceof Error ? err.message : "Could not use this image.",
        variant: "destructive",
      });
    }
  };

  const saveSection = () => {
    if (!dialogKey) return;
    try {
      const payload: GallerySectionOverride = {
        title: gTitle.trim(),
        displayCategory: gDisplayCategory.trim(),
        mainCategory: gMainCategory,
        span: gSpan.trim(),
        imageDataUrl: gImageDataUrl,
      };
      replaceGallerySectionOverride(dialogKey, payload);
      toast({ title: "Saved", description: "Gallery section updated." });
      closeDialog();
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const resetSection = () => {
    if (!dialogKey) return;
    clearGallerySectionOverride(dialogKey);
    toast({ title: "Reset", description: "This section uses the built-in defaults again." });
    closeDialog();
  };

  const handleUploadToFolder = async () => {
    if (!uploadFolderId) {
      toast({ title: "Select an album", description: "Choose a folder from the list.", variant: "destructive" });
      return;
    }
    if (!uploadFiles.length) {
      toast({ title: "Choose images", variant: "destructive" });
      return;
    }
    const rec = getFolderRecordById(uploadFolderId);
    if (!rec) {
      toast({ title: "Folder not found", variant: "destructive" });
      return;
    }
    setUploadBusy(true);
    try {
      const dataUrls = await Promise.all(uploadFiles.map((f) => fileToGalleryDataUrl(f)));
      const base = (uploadPrefix.trim() || rec.name).replace(/\s+\d+$/, "");
      addAdminGalleryImages(
        dataUrls.map((imageDataUrl, idx) => ({
          title: `${base} ${idx + 1}`,
          category: rec.mainCategory,
          folderId: rec.id,
          imageDataUrl,
        })),
      );
      setUploadFiles([]);
      toast({
        title: "Photos added",
        description: `${dataUrls.length} image(s) uploaded to “${rec.name}”. Open Gallery to view.`,
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not process images.",
        variant: "destructive",
      });
    } finally {
      setUploadBusy(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-fuchsia-900/45 to-indigo-900/80" />
        <div className="relative z-10">
          <Header />
          <main className="py-10 md:py-16 px-4">
            <div className="container mx-auto max-w-3xl">
              <Card className="border-white/30 bg-white/15 backdrop-blur-md shadow-2xl text-white">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center">
                      <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        Admin Login
                        <Sparkles className="h-5 w-5 text-secondary" />
                      </CardTitle>
                      <CardDescription className="text-white/80">Manage gallery section cards.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-white">Gallery admin</p>
                        <p>
                          {ADMIN_HINT} Use env main admin credentials or any admin account saved in Supabase.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={handleLogin} autoComplete="off">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        className="bg-white/15 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Password</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        className="bg-white/15 border-white/30 text-white placeholder:text-white/70"
                      />
                    </div>
                    {loginError && (
                      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
                        <KeyRound className="h-4 w-4 mt-0.5" />
                        {loginError}
                      </div>
                    )}
                    <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 rounded-full">
                      Log in
                    </Button>
                    <div className="text-xs text-white/85 flex flex-wrap gap-x-4 gap-y-1">
                      <Link className="underline" to="/admin/notices">
                        Notices admin
                      </Link>
                      <Link className="underline" to="/admin/downloads">
                        Downloads admin
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Header />
        <main className="py-8 sm:py-12 px-3 sm:px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-2">
                  Admin: Gallery sections
                  <ImageIcon className="h-6 w-6 text-primary" />
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">{ADMIN_HINT}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/gallery" target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                      Preview Gallery
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/admin/notices">
                      <ExternalLink className="h-4 w-4" />
                      Notices admin
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/admin/downloads">Downloads admin</Link>
                  </Button>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 sm:w-auto w-full">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Folder albums (Events & more)</CardTitle>
                <CardDescription>
                  Create top-level folders that appear as cards on the Gallery (e.g. multiple event names under the Events tab).
                  Open a folder on the site to add subfolders or upload photos. Nested structure is folder → optional subfolders → photos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 items-end">
                  <div className="flex-1 min-w-[200px] space-y-1">
                    <label className="text-sm font-medium">New album name</label>
                    <Input
                      value={newRootFolderName}
                      onChange={(e) => setNewRootFolderName(e.target.value)}
                      placeholder="e.g. Annual Day 2026"
                    />
                  </div>
                  <div className="space-y-1 min-w-[160px]">
                    <label className="text-sm font-medium">Category tab</label>
                    <Select
                      value={newRootFolderCategory}
                      onValueChange={(v) => setNewRootFolderCategory(v as GalleryMainCategory)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MAIN_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      try {
                        const name = newRootFolderName.trim();
                        if (!name) {
                          toast({ title: "Enter a name", variant: "destructive" });
                          return;
                        }
                        addGalleryFolderRecord({
                          name,
                          parentId: null,
                          mainCategory: newRootFolderCategory,
                        });
                        setNewRootFolderName("");
                        toast({ title: "Album created" });
                      } catch (e) {
                        toast({
                          title: "Could not create",
                          description: e instanceof Error ? e.message : "",
                          variant: "destructive",
                        });
                      }
                    }}
                  >
                    Create album
                  </Button>
                </div>
                {rootAlbumFolders.length > 0 && (
                  <ul className="space-y-2 text-sm border rounded-lg divide-y">
                    {rootAlbumFolders.map((f) => (
                      <li key={f.id} className="flex items-center justify-between gap-2 px-3 py-2">
                        <span>
                          <span className="font-medium">{f.name}</span>{" "}
                          <span className="text-muted-foreground">({f.mainCategory})</span>
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive"
                          onClick={() => {
                            if (!window.confirm(`Delete album “${f.name}” and everything inside?`)) return;
                            deleteGalleryFolderRecord(f.id);
                            toast({ title: "Album removed" });
                          }}
                          aria-label="Delete album"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload photos</CardTitle>
                <CardDescription>
                  Upload is now done from the <strong>Gallery page</strong> using the simple <strong>+ Add photos</strong> icon on any album/folder card.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="default">
                  <Link to="/gallery" target="_blank" rel="noreferrer">
                    Open Gallery to upload
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DEFAULT_GALLERY_SECTIONS.map((s) => {
                const merged = getMergedGallerySection(s.sectionKey) ?? s;
                const hasOverride = Boolean(overrides[s.sectionKey]);
                return (
                  <Card key={s.sectionKey} className="overflow-hidden">
                    <div className="aspect-[4/3] bg-muted relative">
                      <img
                        src={merged.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {hasOverride && (
                        <span className="absolute top-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                          Custom
                        </span>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{merged.title}</CardTitle>
                      <CardDescription className="text-xs font-mono">{merged.sectionKey}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-2 pt-0">
                      <Button type="button" size="sm" className="gap-2" onClick={() => openDialog(s.sectionKey)}>
                        <Pencil className="h-4 w-4" />
                        Edit card
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <Dialog open={dialogKey !== null} onOpenChange={(o) => !o && closeDialog()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit gallery section</DialogTitle>
            <DialogDescription>Update the card title, badge, layout span, and cover image.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={gTitle} onChange={(e) => setGTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Badge label</label>
              <Input value={gDisplayCategory} onChange={(e) => setGDisplayCategory(e.target.value)} placeholder="Campus, Events…" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Main category</label>
              <Select value={gMainCategory} onValueChange={(v) => setGMainCategory(v as GalleryMainCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MAIN_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grid span (Tailwind classes)</label>
              <Input value={gSpan} onChange={(e) => setGSpan(e.target.value)} placeholder="col-span-1 row-span-1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover image</label>
              <Input type="file" accept="image/*" onChange={(e) => handlePickCover(e.target.files?.[0] ?? null)} />
              <p className="text-xs text-muted-foreground">Upload replaces the default stock image for this card only.</p>
              {gImageDataUrl && (
                <img src={gImageDataUrl} alt="" className="mt-2 rounded-md max-h-40 object-cover border" />
              )}
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" className="gap-2" onClick={resetSection}>
              <RotateCcw className="h-4 w-4" />
              Reset to default
            </Button>
            <Button type="button" onClick={saveSection}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
