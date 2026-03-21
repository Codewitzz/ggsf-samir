import { useMemo, useState } from "react";
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
  isAdminSessionActive,
  setAdminNoticesSettings,
  upsertAdminNoticeItem,
  validateAndNormalizeImageDataUrl,
  validateAndNormalizePdfDataUrl,
} from "@/lib/notices/adminNoticesStore";
import { AlertCircle, ExternalLink, Eye, FileText, KeyRound, LogOut, Plus, RefreshCw, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
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

const ADMIN_HINT =
  "This admin panel is client-side only (local browser storage). For real security, add a server/API auth layer.";

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const result = adminSignIn(username.trim(), password);
    if (result.ok) {
      setIsLoggedIn(true);
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

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488866022504-f2584929ca5f?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-fuchsia-900/45 to-indigo-900/80" />
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-secondary/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="relative z-10">
          <Header />
          <main className="py-10 md:py-16 px-4">
            <div className="container mx-auto max-w-3xl">
              <Card className="border-white/30 bg-white/15 backdrop-blur-md shadow-2xl shadow-black/20 text-white transition-transform duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center shadow-lg shadow-black/20">
                    <ShieldCheck className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      Admin Login
                      <Sparkles className="h-5 w-5 text-secondary" />
                    </CardTitle>
                    <CardDescription className="text-white/80">Manage notice and announcement content.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/85">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="font-medium text-white">Admin notice editor</p>
                      <p>
                        {ADMIN_HINT}
                        <br />
                        Username/Password are read from `VITE_ADMIN_USERNAME` and `VITE_ADMIN_PASSWORD` (fallbacks: `admin` / `admin`).
                      </p>
                    </div>
                  </div>
                </div>

                <form className="space-y-4" onSubmit={handleLogin}>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Username</label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      placeholder="e.g. admin"
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/70 focus-visible:ring-white/30"
                    />
                  </div>

                  {loginError && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive animate-pulse flex items-start gap-2">
                      <KeyRound className="h-4 w-4 mt-0.5" />
                      {loginError}
                    </div>
                  )}

                  <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 shadow-sm hover:shadow-white/20 transition-all rounded-full">
                    Log in
                  </Button>

                  <div className="text-xs text-white/85">
                    Tip: If you disabled the homepage “Staff Login” widget, open this page directly at{" "}
                    <Link className="underline" to="/admin/notices">
                      /admin/notices
                    </Link>
                    .
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background opacity-80" />
      <div className="pointer-events-none absolute -left-16 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-48 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative z-10">
        <Header />
        <main className="py-16 px-4">
          <div className="container mx-auto max-w-6xl space-y-6">
            <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Admin: Notices & Announcements
                <Sparkles className="h-5 w-5 text-primary" />
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">{ADMIN_HINT}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link to="/" target="_blank" rel="noreferrer">
                    <Eye className="h-4 w-4" />
                    Preview Homepage
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link to="/admin/notices">
                    <ExternalLink className="h-4 w-4" />
                    Refresh Panel
                  </Link>
                </Button>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 border-primary/20 shadow-sm hover:shadow-md transition-all"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-lg">
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

              <Card className="border-primary/10 transition-all hover:-translate-y-0.5 hover:shadow-lg">
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
                    <Button type="submit" className="w-full flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all">
                      <Plus className="h-4 w-4" />
                      Save & Publish
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
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

            <Card className="border-primary/10 transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle>Published Items</CardTitle>
                <CardDescription>Delete unwanted items or toggle visibility.</CardDescription>
              </CardHeader>
              <CardContent>
                {items.length === 0 ? (
                  <div className="text-muted-foreground text-sm">No items found.</div>
                ) : (
                  <div className="space-y-4">
                    {items
                      .slice()
                      .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col gap-3 border border-border/60 rounded-lg p-4 bg-muted/20 transition-all hover:-translate-y-0.5 hover:bg-muted/30 hover:border-primary/20"
                        >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-semibold">{item.title}</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                {item.kind} / {item.template}
                              </span>
                              {item.date && <span className="text-xs text-muted-foreground">{item.date}</span>}
                            </div>
                            {item.text && <p className="text-sm text-muted-foreground max-w-[70ch]">{item.text}</p>}
                          </div>

                          <div className="flex items-center gap-3">
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
                              variant="destructive"
                              onClick={() => setDeleteTargetId(item.id)}
                              className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all"
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
              <Button variant="destructive" onClick={handleDeleteConfirmed} className="flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
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

