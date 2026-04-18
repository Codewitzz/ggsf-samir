import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { studentCornerNotices } from "@/data/studentCornerNotices";

const OFFICIAL_NOTICES = "https://engg.ggsf.edu.in/studentcorner_notice.php";
const OFFICIAL_TESTIMONIALS = "https://engg.ggsf.edu.in/studentcorner_testinomial.php";

const StudentCorner = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <main className="container mx-auto max-w-5xl px-4 py-10 md:py-14">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Student Corner</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Important notices and circulars for students, aligned with the official GCOERC student corner.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={OFFICIAL_NOTICES} target="_blank" rel="noopener noreferrer">
              Official notices archive
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="sm" className="gap-2">
            <a href={OFFICIAL_TESTIMONIALS} target="_blank" rel="noopener noreferrer">
              Testimonials (official)
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <Card className="mt-10 border-border/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl">Important Notice / Circular for Student</CardTitle>
            <CardDescription>Date of published, subject, and document link (same layout as the legacy site).</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-left">
                  <th className="p-3 font-semibold whitespace-nowrap">Date of Published</th>
                  <th className="p-3 font-semibold">Subject</th>
                  <th className="p-3 font-semibold whitespace-nowrap w-24">Link</th>
                </tr>
              </thead>
              <tbody>
                {studentCornerNotices.map((row, i) => (
                  <tr key={`${row.published}-${i}`} className="border-b border-border/60 hover:bg-muted/30">
                    <td className="p-3 align-top whitespace-nowrap text-muted-foreground">{row.published}</td>
                    <td className="p-3 align-top">{row.subject}</td>
                    <td className="p-3 align-top">
                      <a
                        href={row.href}
                        className="text-primary underline-offset-4 hover:underline font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted-foreground">
              For the complete historical list, open the{" "}
              <a href={OFFICIAL_NOTICES} className="text-primary underline-offset-4 hover:underline" target="_blank" rel="noopener noreferrer">
                official notices page
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default StudentCorner;
