import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAdminNotices } from "@/hooks/useAdminNotices";
import type { AdminNoticeAccent, AdminNoticeItem, AdminNoticeKind, AdminNoticeTemplate } from "@/lib/notices/adminNoticesStore";
import {
  adminSignIn,
  adminSignOut,
  createAdminNoticeItemInput,
  deleteAdminNoticeItem,
  getAdminSessionInfo,
  isAdminSessionActive,
  setAdminNoticesSettings,
  upsertAdminNoticeItem,
  validateAndNormalizeImageDataUrl,
  validateAndNormalizePdfDataUrl,
} from "@/lib/notices/adminNoticesStore";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Download,
  ExternalLink,
  Eye,
  FileText,
  ImageIcon,
  KeyRound,
  LogOut,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read the image file."));
    reader.readAsDataURL(file);
  });
}

function isPdfFile(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

const ADMIN_HINT = "Admin changes are saved in browser + synced to Supabase when configured.";

const AdminNotices = () => {
  const { settings, items } = useAdminNotices();
  const [isLoggedIn, setIsLoggedIn] = useState(isAdminSessionActive());

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [kind, setKind] = useState<AdminNoticeKind>("notice");
  const [template, setTemplate] = useState<AdminNoticeTemplate>("card");
  const [accent, setAccent] = useState<AdminNoticeAccent>("primary");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [text, setText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [enabledOnHomepage, setEnabledOnHomepage] = useState(true);
  const [imageDataUrl, setImageDataUrl] = useState<string | undefined>(undefined);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(undefined);
  const [imageError, setImageError] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | undefined>(undefined);
  const [pdfFileName, setPdfFileName] = useState<string | undefined>(undefined);
  const [pdfError, setPdfError] = useState<string | null>(null);

  const deleteTarget = useMemo(() => items.find((i) => i.id === deleteTargetId) ?? null, [items, deleteTargetId]);

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
    setKind("notice");
    setTemplate("card");
    setAccent("primary");
    setTitle("");
    setDate("");
    setText("");
    setLinkUrl("");
    setEnabledOnHomepage(true);
    setImageDataUrl(undefined);
    setImagePreviewUrl(undefined);
    setImageError(null);
    setPdfDataUrl(undefined);
    setPdfFileName(undefined);
    setPdfError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const result = await adminSignIn(username.trim(), password);
    if (result.ok) {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      setLoginError(null);
      toast({ title: "Logged in", description: "You can now manage notices and announcements." });
    } else {
      setLoginError((result as { ok: false; reason: string }).reason);
    }
  };

  const handleLogout = () => {
    adminSignOut();
    setIsLoggedIn(false);
    toast({ title: "Signed out" });
  };

  const handlePickImage = async (file: File | null) => {
    setImageError(null);
    setImageDataUrl(undefined);
    setImagePreviewUrl(undefined);

    if (!file) return;

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const normalized = validateAndNormalizeImageDataUrl(dataUrl);
      setImageDataUrl(normalized);
      setImagePreviewUrl(normalized);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid image.";
      setImageError(message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImageError(null);
    setPdfError(null);

    if (!title.trim()) {
      toast({ title: "Missing title", description: "Please enter a title.", variant: "destructive" });
      return;
    }

    const itemInput = {
      kind,
      template,
      title: title.trim(),
      date: date.trim() ? date.trim() : undefined,
      text: text.trim() ? text.trim() : undefined,
      linkUrl: linkUrl.trim() ? linkUrl.trim() : undefined,
      imageDataUrl,
      pdfDataUrl,
      pdfFileName,
      accent: kind === "announcement" ? accent : undefined,
      enabledOnHomepage,
    } satisfies Omit<AdminNoticeItem, "id" | "createdAt" | "updatedAt">;

    try {
      const item = createAdminNoticeItemInput(itemInput);
      upsertAdminNoticeItem(item);
      toast({ title: "Saved", description: "Your notice/announcement is now updated on the homepage." });
      resetForm();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save item.";
      toast({ title: "Could not save", description: message, variant: "destructive" });
    }
  };

  const handlePickPdf = async (file: File | null) => {
    setPdfError(null);
    setPdfDataUrl(undefined);
    setPdfFileName(undefined);

    if (!file) return;
    if (!isPdfFile(file)) {
      setPdfError("Please choose a valid PDF file.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      const normalized = validateAndNormalizePdfDataUrl(dataUrl);
      setPdfDataUrl(normalized);
      setPdfFileName(file.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Invalid PDF file.";
      setPdfError(message);
    }
  };

  const handleDeleteConfirmed = () => {
    if (!deleteTargetId) return;
    deleteAdminNoticeItem(deleteTargetId);
    setDeleteTargetId(null);
    toast({ title: "Deleted", description: "The item was removed from the homepage feed." });
  };

  const toggleEnabled = (item: AdminNoticeItem, next: boolean) => {
    upsertAdminNoticeItem({
      ...item,
      enabledOnHomepage: next,
    });
  };

  const vibrantPrimaryButtonClass =
    "border border-blue-700 bg-blue-700 text-white shadow-sm transition-colors duration-200 hover:bg-blue-600";

  const vibrantOutlineButtonClass =
    "border-slate-600 bg-slate-800 text-slate-100 shadow-sm transition-colors duration-200 hover:bg-slate-700";

  const vibrantSuccessButtonClass =
    "border border-emerald-700 bg-emerald-700 text-white shadow-sm transition-colors duration-200 hover:bg-emerald-600";

  const vibrantDangerButtonClass =
    "border border-rose-700 bg-rose-700 text-white shadow-sm transition-colors duration-200 hover:bg-rose-600";

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#09081a]">
        <div className="pointer-events-none absolute inset-0 bg-[url('#')] bg-cover bg-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1a1744]/90 via-[#4a145f]/55 to-[#112561]/90" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="relative z-10">
          <Header />
          <main className="px-4 py-10 md:py-16">
            <div className="container mx-auto max-w-5xl">
              <Card className="border-violet-200/30 bg-slate-950/65 text-slate-100 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-200/30 bg-violet-300/20 shadow-lg shadow-violet-900/35">
                      <ShieldCheck className="h-6 w-6 text-violet-100" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                      Staff/Admin Login
                      <Sparkles className="h-5 w-5 text-fuchsia-300" />
                    </CardTitle>
                    <CardDescription className="text-slate-300/90">Secure access to the notices management dashboard.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-2xl border border-slate-200/10 bg-slate-900/70 p-4 text-sm text-slate-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 text-violet-300" />
                    <div className="space-y-1">
                      <p className="font-medium text-slate-100">Admin notice editor</p>
                      <p>
                        {ADMIN_HINT}
                        <br />
                        Only staff can log in here. Students are not allowed.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                  <form className="space-y-4 rounded-2xl border border-violet-200/15 bg-gradient-to-br from-slate-900/85 via-[#1a1d3a]/75 to-slate-950/90 p-5" onSubmit={handleLogin} autoComplete="off">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200">Username</label>
                      <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        placeholder="Enter admin username"
                        className="h-11 border-violet-300/20 bg-slate-950/85 text-slate-100 placeholder:text-slate-400 focus-visible:ring-fuchsia-400/70"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-200">Password</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        placeholder="Enter password"
                        className="h-11 border-violet-300/20 bg-slate-950/85 text-slate-100 placeholder:text-slate-400 focus-visible:ring-fuchsia-400/70"
                      />
                    </div>

                    {loginError && (
                      <div className="flex items-start gap-2 rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                        <KeyRound className="mt-0.5 h-4 w-4" />
                        {loginError}
                      </div>
                    )}

                    <Button type="submit" className={`h-11 w-full rounded-xl ${vibrantPrimaryButtonClass}`}>
                      Sign in to Admin Panel
                    </Button>
                    <div className="rounded-xl border border-cyan-300/35 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-100">
                      Account creation is available after staff/admin login.
                    </div>
                  </form>

                  <div className="space-y-4 rounded-2xl border border-slate-100/10 bg-slate-900/70 p-5 text-sm text-slate-200">
                    <div className="rounded-xl border border-cyan-300/35 bg-cyan-500/10 p-3 text-cyan-100">
                      <div className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4" />
                        <p>Only staff and admin accounts can access this panel. Student login is disabled.</p>
                      </div>
                    </div>
                    <div className="rounded-xl border border-slate-200/10 bg-slate-950/50 p-3 text-slate-300">
                      Tip: If the homepage widget is hidden, open this page directly at{" "}
                      <Link className="underline decoration-slate-400 hover:text-white" to="/admin/notices">
                        /admin/notices
                      </Link>
                      .
                    </div>
                  </div>
                </div>
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background opacity-80" />
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative z-10">
        <Header />
        <main className="py-8 sm:py-12 md:py-16 px-3 sm:px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-2">
                Admin: Notices & Announcements
                <Sparkles className="h-5 w-5 text-primary" />
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">{ADMIN_HINT}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild size="sm" className={`gap-2 text-black ${vibrantOutlineButtonClass}`}>
                  <Link to="/" target="_blank" rel="noreferrer">
                    <Eye className="h-4 w-4 color-red text-color" />
                    Preview Homepage
                  </Link>
                </Button>
                <Button asChild size="sm" className={`gap-2 ${vibrantOutlineButtonClass}`}>
                  <Link to="/admin/notices">
                    <ExternalLink className="h-4 w-4" />
                    Refresh Panel
                  </Link>
                </Button>
                <Button asChild size="sm" className={`gap-2 ${vibrantOutlineButtonClass}`}>
                  <Link to="/admin/downloads">
                    <Download className="h-4 w-4" />
                    Downloads admin
                  </Link>
                </Button>
                <Button asChild size="sm" className={`gap-2 ${vibrantOutlineButtonClass}`}>
                  <Link to="/admin/gallery">
                    <ImageIcon className="h-4 w-4" />
                    Gallery admin
                  </Link>
                </Button>
                <Button asChild size="sm" className={`gap-2 ${vibrantPrimaryButtonClass}`}>
                  <Link to="/admin/notices/signup">
                    <UserPlus className="h-4 w-4" />
                    Create Account
                  </Link>
                </Button>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="flex w-full shrink-0 items-center justify-center gap-2 border border-slate-600 bg-slate-800 text-slate-100 shadow-sm transition-colors duration-200 hover:bg-slate-700 sm:w-auto"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/10 bg-gradient-to-br from-background via-background to-primary/5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Homepage Widget</CardTitle>
                <CardDescription>Control whether visitors can access staff login from the homepage.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={settings.homepageAdminWidgetEnabled}
                    onCheckedChange={(v) => setAdminNoticesSettings({ homepageAdminWidgetEnabled: Boolean(v) })}
                    id="homepageAdminWidgetEnabled"
                  />
                  <label htmlFor="homepageAdminWidgetEnabled" className="text-sm">
                    Show “Staff Login” widget on the homepage
                  </label>
                </div>
                <div className="text-xs text-muted-foreground">
                  Even if disabled, admins can still open this page directly: <code>/admin/notices</code>.
                </div>
              </CardContent>
            </Card>

              <Card className="border-primary/10 bg-gradient-to-br from-background via-background to-secondary/10 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              <CardHeader>
                <CardTitle>Add / Publish</CardTitle>
                <CardDescription>Create a new notice or announcement item.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type</label>
                      <Select value={kind} onValueChange={(v) => setKind(v as AdminNoticeKind)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="notice">Notice</SelectItem>
                          <SelectItem value="announcement">Announcement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Template</label>
                      <Select value={template} onValueChange={(v) => setTemplate(v as AdminNoticeTemplate)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Card</SelectItem>
                          <SelectItem value="imageCard">Image Card</SelectItem>
                          <SelectItem value="bar">Badge / Bar</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Scholarship 2026" />
                  </div>

                  {kind === "notice" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="e.g. 08 Aug 2025" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Link URL (optional)</label>
                        <Input
                          value={linkUrl}
                          onChange={(e) => setLinkUrl(e.target.value)}
                          placeholder="e.g. https://...pdf or /notices/..."
                        />
                      </div>
                    </div>
                  )}

                  {kind === "announcement" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Accent</label>
                        <Select value={accent} onValueChange={(v) => setAccent(v as AdminNoticeAccent)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Accent" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="primary">Primary</SelectItem>
                            <SelectItem value="secondary">Secondary</SelectItem>
                            <SelectItem value="info">Info</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="success">Success</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Link URL (optional)</label>
                        <Input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} placeholder="/admissions or https://..." />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Text (optional)</label>
                    <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Short description shown in some templates..." />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Image (optional)</label>
                    <Input type="file" accept="image/*" onChange={(e) => handlePickImage(e.target.files?.[0] ?? null)} />
                    {imageError && <div className="text-sm text-destructive">{imageError}</div>}
                    {imagePreviewUrl && (
                      <div className="mt-2">
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="h-24 w-auto rounded-md border border-border/60 object-contain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="mt-2"
                          onClick={() => {
                            setImageDataUrl(undefined);
                            setImagePreviewUrl(undefined);
                          }}
                        >
                          Remove image
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PDF File (optional)</label>
                    <Input type="file" accept="application/pdf,.pdf" onChange={(e) => handlePickPdf(e.target.files?.[0] ?? null)} />
                    {pdfError && <div className="text-sm text-destructive">{pdfError}</div>}
                    {pdfDataUrl && (
                      <div className="rounded-md border border-border/60 bg-muted/20 p-3 text-sm flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 shrink-0" />
                          <span className="truncate">{pdfFileName ?? "Attached PDF"}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => {
                            setPdfDataUrl(undefined);
                            setPdfFileName(undefined);
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={enabledOnHomepage}
                      onCheckedChange={(v) => setEnabledOnHomepage(Boolean(v))}
                      id="enabledOnHomepage"
                    />
                    <label htmlFor="enabledOnHomepage" className="text-sm">
                      Enable on homepage
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button type="submit" className={`w-full flex items-center justify-center gap-2 ${vibrantSuccessButtonClass}`}>
                      <Plus className="h-4 w-4" />
                      Save & Publish
                    </Button>
                    <Button
                      type="button"
                      className={`w-full flex items-center justify-center gap-2 ${vibrantOutlineButtonClass}`}
                      onClick={resetForm}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            </div>

            <Card className="border-primary/10 bg-gradient-to-br from-background via-background to-muted/40 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Published Items</CardTitle>
                <CardDescription>Delete unwanted items or toggle visibility.</CardDescription>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-muted-foreground text-sm">No items found.</div>
                ) : (
                  <div className="space-y-3">
                    {items
                      .slice()
                      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 border border-border/60 rounded-xl p-4 bg-white/50 dark:bg-muted/20 transition-all hover:-translate-y-0.5 hover:bg-muted/30 hover:border-primary/20"
                        >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold">{item.title}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                                {item.kind} / {item.template}
                              </span>
                              {item.date && <span className="text-xs text-muted-foreground">{item.date}</span>}
                            </div>
                            {item.text && <p className="text-sm text-muted-foreground max-w-[70ch]">{item.text}</p>}
                          </div>

                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 shrink-0">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={item.enabledOnHomepage}
                                onCheckedChange={(v) => toggleEnabled(item, Boolean(v))}
                                id={`enabled_${item.id}`}
                              />
                              <label htmlFor={`enabled_${item.id}`} className="text-sm">
                                Visible
                              </label>
                            </div>
                            <Button
                              onClick={() => setDeleteTargetId(item.id)}
                              className={`flex w-full items-center justify-center gap-2 sm:w-auto ${vibrantDangerButtonClass}`}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>

                        {(item.imageDataUrl || item.pdfDataUrl || item.linkUrl) && (
                          <div className="flex flex-wrap items-center gap-4">
                            {item.imageDataUrl && (
                              <img
                                src={item.imageDataUrl}
                                alt={`${item.title} image`}
                                className="h-20 w-20 rounded-md border border-border/60 object-cover"
                              />
                            )}
                            {item.pdfDataUrl && (
                              <a
                                href={item.pdfDataUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs rounded-md border border-border/60 px-2 py-1 hover:bg-muted"
                              >
                                PDF: {item.pdfFileName ?? "Open file"}
                              </a>
                            )}
                            {item.linkUrl && <div className="text-xs text-muted-foreground break-all">Link: {item.linkUrl}</div>}
                          </div>
                        )}
                      </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>

        <Dialog
          open={Boolean(deleteTargetId)}
          onOpenChange={(open) => {
            if (!open) setDeleteTargetId(null);
          }}
        >
          <DialogContent className="border-primary/20">
            <DialogHeader>
              <DialogTitle>Delete item?</DialogTitle>
              <DialogDescription>
                {deleteTarget ? (
                  <>
                    You’re about to delete <span className="font-semibold">{deleteTarget.title}</span>. This will remove it from the homepage feed.
                  </>
                ) : (
                  "This action can’t be undone."
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteTargetId(null)}>
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirmed} className={`flex items-center gap-2 ${vibrantDangerButtonClass}`}>
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </div>
  );
};

export default AdminNotices;

