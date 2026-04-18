import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useAdminDownloads } from "@/hooks/useAdminDownloads";
import type { AdminDownloadItem, DefaultDownloadOverride } from "@/lib/downloads/adminDownloadsStore";
import {
  adminSignIn,
  adminSignOut,
  isAdminSessionActive,
} from "@/lib/notices/adminNoticesStore";
import {
  clearDefaultDownloadOverride,
  createAdminDownloadItemInput,
  deleteAdminDownloadItem,
  formatBytes,
  normalizeExternalUrl,
  replaceDefaultDownloadOverride,
  upsertAdminDownloadItem,
  validateAndNormalizePdfDataUrl,
} from "@/lib/downloads/adminDownloadsStore";
import type { DownloadIconKey } from "@/lib/downloads/downloadIcons";
import { BUILTIN_DOWNLOADS, getBuiltinDownloadByKey } from "@/lib/downloads/defaultDownloads";
import { DOWNLOAD_ICONS } from "@/lib/downloads/downloadIcons";
import {
  AlertCircle,
  Download,
  Eye,
  ExternalLink,
  KeyRound,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

const ADMIN_HINT =
  "This admin panel is client-side only (local browser storage). For production, add server-side auth and file hosting.";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read the file."));
    reader.readAsDataURL(file);
  });
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

const AdminDownloads = () => {
  const { items, defaultOverrides } = useAdminDownloads();
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminSessionActive());

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [format, setFormat] = useState("PDF");
  const [size, setSize] = useState("");
  const [iconKey, setIconKey] = useState<DownloadIconKey>("fileText");
  const [fileName, setFileName] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [pdfDataUrl, setPdfDataUrl] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<"upload" | "url">("upload");

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const deleteTarget = useMemo(() => items.find((i) => i.id === deleteTargetId) ?? null, [items, deleteTargetId]);

  const [editingBuiltinKey, setEditingBuiltinKey] = useState<string | null>(null);
  const [btTitle, setBtTitle] = useState("");
  const [btDescription, setBtDescription] = useState("");
  const [btCategory, setBtCategory] = useState("");
  const [btFormat, setBtFormat] = useState("PDF");
  const [btSize, setBtSize] = useState("");
  const [btIconKey, setBtIconKey] = useState<DownloadIconKey>("fileText");
  const [btFileName, setBtFileName] = useState("");
  const [btMode, setBtMode] = useState<"upload" | "url">("url");
  const [btExternalUrl, setBtExternalUrl] = useState("");
  const [btPdfDataUrl, setBtPdfDataUrl] = useState<string | undefined>(undefined);

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

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("General");
    setFormat("PDF");
    setSize("");
    setIconKey("fileText");
    setFileName("");
    setExternalUrl("");
    setPdfDataUrl(undefined);
    setMode("upload");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const result = await adminSignIn(username.trim(), password);
    if (result.ok) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      toast({ title: "Logged in", description: "You can manage download cards." });
    } else {
      setLoginError((result as { ok: false; reason: string }).reason);
    }
  };

  const handleLogout = () => {
    adminSignOut();
    setIsLoggedIn(false);
    toast({ title: "Signed out" });
  };

  const handlePickPdf = async (file: File | null) => {
    setPdfDataUrl(undefined);
    setExternalUrl("");
    if (!file) {
      setSize("");
      setFileName("");
      return;
    }
    if (!isPdfFile(file)) {
      toast({ title: "Invalid file", description: "Please choose a PDF.", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      validateAndNormalizePdfDataUrl(dataUrl);
      setPdfDataUrl(dataUrl);
      setFileName(file.name);
      setSize(formatBytes(file.size));
      setFormat("PDF");
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not store this PDF.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    try {
      let fileDataUrl: string | undefined;
      let extUrl: string | undefined;
      if (mode === "upload") {
        if (!pdfDataUrl) {
          toast({ title: "Upload a PDF", variant: "destructive" });
          return;
        }
        fileDataUrl = validateAndNormalizePdfDataUrl(pdfDataUrl);
        if (!fileName.trim()) {
          toast({ title: "Missing file name", variant: "destructive" });
          return;
        }
      } else {
        extUrl = normalizeExternalUrl(externalUrl);
        if (!extUrl) {
          toast({ title: "Enter a valid URL", variant: "destructive" });
          return;
        }
        if (!size.trim()) {
          toast({ title: "Enter file size (e.g. 2.4 MB)", variant: "destructive" });
          return;
        }
        if (!fileName.trim()) {
          setFileName("document.pdf");
        }
      }

      const item = createAdminDownloadItemInput({
        title: title.trim(),
        description: description.trim(),
        category: category.trim() || "General",
        format: format.trim() || "PDF",
        size: size.trim() || "—",
        iconKey,
        fileDataUrl,
        externalUrl: extUrl,
        fileName: fileName.trim() || "download.pdf",
      });
      upsertAdminDownloadItem(item);
      toast({ title: "Download added", description: "It will appear on the Downloads section and page." });
      resetForm();
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    deleteAdminDownloadItem(deleteTargetId);
    setDeleteTargetId(null);
    toast({ title: "Removed" });
  };

  const openBuiltinDialog = (key: string) => {
    const builtin = getBuiltinDownloadByKey(key);
    if (!builtin) return;
    const o = defaultOverrides[key];
    setEditingBuiltinKey(key);
    setBtTitle(o?.title ?? builtin.title);
    setBtDescription(o?.description ?? builtin.description);
    setBtCategory(o?.category ?? builtin.category);
    setBtFormat(o?.format ?? builtin.format);
    setBtSize(o?.size ?? builtin.size);
    setBtIconKey(o?.iconKey ?? builtin.iconKey);
    setBtFileName(o?.fileName ?? builtin.fileName ?? "document.pdf");
    if (o?.fileDataUrl) {
      setBtMode("upload");
      setBtPdfDataUrl(o.fileDataUrl);
      setBtExternalUrl("");
    } else {
      setBtMode("url");
      setBtPdfDataUrl(undefined);
      setBtExternalUrl(o?.externalUrl ?? builtin.url);
    }
  };

  const closeBuiltinDialog = () => {
    setEditingBuiltinKey(null);
    setBtPdfDataUrl(undefined);
  };

  const handleBuiltinPickPdf = async (file: File | null) => {
    setBtPdfDataUrl(undefined);
    setBtExternalUrl("");
    if (!file) {
      setBtSize("");
      setBtFileName("");
      return;
    }
    if (!isPdfFile(file)) {
      toast({ title: "Invalid file", description: "Please choose a PDF.", variant: "destructive" });
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      validateAndNormalizePdfDataUrl(dataUrl);
      setBtPdfDataUrl(dataUrl);
      setBtFileName(file.name);
      setBtSize(formatBytes(file.size));
      setBtFormat("PDF");
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Could not store this PDF.",
        variant: "destructive",
      });
    }
  };

  const handleBuiltinSave = () => {
    if (!editingBuiltinKey) return;
    if (!btTitle.trim()) {
      toast({ title: "Title required", variant: "destructive" });
      return;
    }
    try {
      const payload: DefaultDownloadOverride = {
        title: btTitle.trim(),
        description: btDescription.trim(),
        category: btCategory.trim() || "General",
        format: btFormat.trim() || "PDF",
        size: btSize.trim() || "—",
        iconKey: btIconKey,
        fileName: btFileName.trim() || "download.pdf",
      };
      if (btMode === "upload") {
        if (!btPdfDataUrl) {
          toast({ title: "Upload a PDF", variant: "destructive" });
          return;
        }
        payload.fileDataUrl = validateAndNormalizePdfDataUrl(btPdfDataUrl);
      } else {
        const ext = normalizeExternalUrl(btExternalUrl);
        if (!ext) {
          toast({ title: "Enter a valid file URL", variant: "destructive" });
          return;
        }
        payload.externalUrl = ext;
      }
      replaceDefaultDownloadOverride(editingBuiltinKey, payload);
      toast({ title: "Saved", description: "Built-in download card updated." });
      closeBuiltinDialog();
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleBuiltinReset = () => {
    if (!editingBuiltinKey) return;
    clearDefaultDownloadOverride(editingBuiltinKey);
    toast({ title: "Reset", description: "This card uses the original defaults again." });
    closeBuiltinDialog();
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
                      <CardDescription className="text-white/80">Manage downloadable documents.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-white">Downloads admin</p>
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
                      <Link className="underline" to="/admin/gallery">
                        Gallery admin
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
                  Admin: Downloads
                  <Download className="h-6 w-6 text-primary" />
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">{ADMIN_HINT}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/downloads" target="_blank" rel="noreferrer">
                      <Eye className="h-4 w-4" />
                      Preview Downloads Page
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <Link to="/admin/notices">
                      <ExternalLink className="h-4 w-4" />
                      Notices admin
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/admin/gallery">Gallery admin</Link>
                  </Button>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 sm:w-auto w-full">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add download card
                  </CardTitle>
                  <CardDescription>Upload a PDF (stored in this browser) or link to a file URL.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Source</label>
                        <Select value={mode} onValueChange={(v) => setMode(v as "upload" | "url")}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upload">Upload PDF</SelectItem>
                            <SelectItem value="url">External URL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Icon</label>
                        <Select value={iconKey} onValueChange={(v) => setIconKey(v as DownloadIconKey)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="graduationCap">Graduation cap</SelectItem>
                            <SelectItem value="bookOpen">Book</SelectItem>
                            <SelectItem value="fileText">Document</SelectItem>
                            <SelectItem value="briefcase">Briefcase</SelectItem>
                            <SelectItem value="building">Building</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. MBA Prospectus 2026" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="MBA, Engineering…" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Format label</label>
                        <Input value={format} onChange={(e) => setFormat(e.target.value)} placeholder="PDF" />
                      </div>
                    </div>

                    {mode === "upload" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">PDF file</label>
                        <Input type="file" accept="application/pdf,.pdf" onChange={(e) => handlePickPdf(e.target.files?.[0] ?? null)} />
                        {size && <p className="text-xs text-muted-foreground">Detected size: {size}</p>}
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">File URL</label>
                          <Input
                            value={externalUrl}
                            onChange={(e) => setExternalUrl(e.target.value)}
                            placeholder="https://example.com/file.pdf"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Size (shown to visitors)</label>
                            <Input value={size} onChange={(e) => setSize(e.target.value)} placeholder="e.g. 2.4 MB" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Download file name</label>
                            <Input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="brochure.pdf" />
                          </div>
                        </div>
                      </>
                    )}

                    {mode === "upload" && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Download file name</label>
                        <Input value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="prospectus.pdf" />
                      </div>
                    )}

                    <Button type="submit" className="w-full sm:w-auto gap-2">
                      <Plus className="h-4 w-4" />
                      Add card
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your download cards ({items.length})</CardTitle>
                  <CardDescription>Extra cards you added (shown first on the site). Built-in cards are edited below.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No custom downloads yet.</p>
                  ) : (
                    <ul className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                      {items.map((item: AdminDownloadItem) => {
                        const Icon = DOWNLOAD_ICONS[item.iconKey];
                        return (
                          <li
                            key={item.id}
                            className="flex items-start gap-3 rounded-lg border border-border p-3 text-sm"
                          >
                            <div className="p-2 rounded-md bg-primary/10">
                              <Icon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{item.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {item.category} · {item.size} · {item.format}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="shrink-0 text-destructive hover:text-destructive"
                              onClick={() => setDeleteTargetId(item.id)}
                              aria-label="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pencil className="h-5 w-5" />
                  Built-in download cards
                </CardTitle>
                <CardDescription>
                  The six default cards on the homepage and downloads page. Edit text, icon, or replace the PDF link.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                  {BUILTIN_DOWNLOADS.map((b) => {
                    const o = defaultOverrides[b.key];
                    const Icon = DOWNLOAD_ICONS[o?.iconKey ?? b.iconKey];
                    return (
                      <div
                        key={b.key}
                        className="flex items-center gap-3 rounded-lg border border-border p-3 text-sm"
                      >
                        <div className="p-2 rounded-md bg-primary/10 shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{o?.title ?? b.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{b.key}</div>
                        </div>
                        <Button type="button" size="sm" variant="outline" onClick={() => openBuiltinDialog(b.key)}>
                          Edit
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>

      <Dialog open={editingBuiltinKey !== null} onOpenChange={(o) => !o && closeBuiltinDialog()}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit built-in download</DialogTitle>
            <DialogDescription>{editingBuiltinKey}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Source</label>
                <Select value={btMode} onValueChange={(v) => setBtMode(v as "upload" | "url")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upload">Upload PDF</SelectItem>
                    <SelectItem value="url">External URL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon</label>
                <Select value={btIconKey} onValueChange={(v) => setBtIconKey(v as DownloadIconKey)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="graduationCap">Graduation cap</SelectItem>
                    <SelectItem value="bookOpen">Book</SelectItem>
                    <SelectItem value="fileText">Document</SelectItem>
                    <SelectItem value="briefcase">Briefcase</SelectItem>
                    <SelectItem value="building">Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input value={btTitle} onChange={(e) => setBtTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={btDescription} onChange={(e) => setBtDescription(e.target.value)} rows={3} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input value={btCategory} onChange={(e) => setBtCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <Input value={btFormat} onChange={(e) => setBtFormat(e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Size (shown to visitors)</label>
                <Input value={btSize} onChange={(e) => setBtSize(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">File name</label>
                <Input value={btFileName} onChange={(e) => setBtFileName(e.target.value)} />
              </div>
            </div>
            {btMode === "upload" ? (
              <div className="space-y-2">
                <label className="text-sm font-medium">PDF file</label>
                <Input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => handleBuiltinPickPdf(e.target.files?.[0] ?? null)}
                />
                {btSize && <p className="text-xs text-muted-foreground">Size: {btSize}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium">File URL</label>
                <Input
                  value={btExternalUrl}
                  onChange={(e) => setBtExternalUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            )}
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" className="gap-2" onClick={handleBuiltinReset}>
              <RotateCcw className="h-4 w-4" />
              Reset to default
            </Button>
            <Button type="button" onClick={handleBuiltinSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Delete download?</CardTitle>
              <CardDescription>{deleteTarget.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDeleteTargetId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDownloads;
