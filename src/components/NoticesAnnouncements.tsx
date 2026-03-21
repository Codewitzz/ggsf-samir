import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { useAdminNotices } from "@/hooks/useAdminNotices";
import { isAdminSessionActive } from "@/lib/notices/adminNoticesStore";

const NoticesAnnouncements = () => {
  const { settings, items } = useAdminNotices();
  const isAdminLoggedIn = isAdminSessionActive();

  const notices = items
    .filter((i) => i.kind === "notice" && i.enabledOnHomepage)
    .slice()
    .sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));

  const showAdminWidget = settings.homepageAdminWidgetEnabled;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Notices & Announcements</h2>
            <p className="text-xs text-muted-foreground mt-1">Updated from staff templates, text and images.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <AlertCircle className="h-4 w-4" />
            <span>Beware of fake admissions links — apply only via official website.</span>
          </div>
        </div>

        {showAdminWidget && (
          <div className="mb-8 flex items-center justify-end">
            <Link to="/admin/notices">
              <Button variant="outline">{isAdminLoggedIn ? "Manage Notices" : "Staff Login"}</Button>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice) => {
            const isExternalLink = Boolean(notice.linkUrl) && !notice.linkUrl?.startsWith("/");
            const showImageCard = notice.template === "imageCard" && Boolean(notice.imageDataUrl);

            return (
              <Card
                key={notice.id}
                className="hover:-translate-y-0.5 transition-all duration-300 hover:shadow-lg border-border/60 h-full overflow-hidden"
              >
                {showImageCard && (
                  <div className="relative h-40 border-b border-border/60 bg-muted/20">
                    <img src={notice.imageDataUrl} alt={notice.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  {notice.date && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>{notice.date}</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {notice.text && <p className="text-sm text-muted-foreground mb-4">{notice.text}</p>}
                  {notice.pdfDataUrl ? (
                    <Button asChild size="sm" variant="outline" className="mt-2 border-primary/20 hover:border-primary/40">
                      <a href={notice.pdfDataUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="h-4 w-4 mr-2" />
                        View PDF
                      </a>
                    </Button>
                  ) : notice.linkUrl ? (
                    isExternalLink ? (
                      <Button asChild size="sm" variant="outline" className="mt-2 border-primary/20 hover:border-primary/40">
                        <a href={notice.linkUrl} target="_blank" rel="noopener noreferrer">
                          View notice
                        </a>
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="outline" className="mt-2 border-primary/20 hover:border-primary/40">
                        <Link to={notice.linkUrl}>View notice</Link>
                      </Button>
                    )
                  ) : (
                    <span className="text-sm text-muted-foreground">No link provided</span>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NoticesAnnouncements;


