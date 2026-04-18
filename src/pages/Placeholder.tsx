import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowRight, CalendarDays, FileText, GraduationCap, Info } from "lucide-react";

type PlaceholderProps = {
  title?: string;
  message?: string;
};

const SECTION_CONFIG: Record<string, { title: string; summary: string; highlights: string[] }> = {
  research: {
    title: "Research & Innovation",
    summary: "Explore active research initiatives, publications, projects, and innovation outcomes.",
    highlights: ["Faculty-led funded projects", "Patents and publications", "Research events and conferences"],
  },
  "campus-cells": {
    title: "Campus Cells",
    summary: "Specialized campus cells that support innovation, outreach, and student development.",
    highlights: ["Activity highlights and team structure", "Cell objectives and outcomes", "Events and participation data"],
  },
  facilities: {
    title: "Campus Facilities",
    summary: "Infrastructure and facilities designed for hands-on learning and student life.",
    highlights: ["Lab and learning spaces", "Sports and wellness facilities", "Student support amenities"],
  },
  "public-disclosure": {
    title: "Public Disclosures",
    summary: "Institutional compliance and regulatory documents published for transparency.",
    highlights: ["Approval and affiliation records", "Safety and statutory certificates", "Fee and governance documents"],
  },
  enrollment: {
    title: "Enrollment Insights",
    summary: "Department-wise enrollment trends and key student statistics.",
    highlights: ["Current intake snapshot", "Year-over-year trends", "Transfer and progression metrics"],
  },
  notices: {
    title: "Notices & Circulars",
    summary: "Latest academic and administrative notices for students and staff.",
    highlights: ["Examination and schedule notices", "Scholarships and circulars", "Academic process updates"],
  },
  achievements: {
    title: "Institutional Achievements",
    summary: "Recognitions, rankings, and milestones achieved by students and faculty.",
    highlights: ["National and university rankings", "Student competition highlights", "Faculty accomplishments"],
  },
  placement: {
    title: "Placement Cell",
    summary: "Career support initiatives, recruiter engagement, and student outcomes.",
    highlights: ["Recruiter and training highlights", "Placement records", "Success stories and mentoring"],
  },
  me: {
    title: "M.E. Specializations",
    summary: "Specialization information, curriculum details, and intake highlights for M.E. programs.",
    highlights: ["Program structure", "Subject tracks", "Career outcomes"],
  },
};

function humanizeSlug(value: string) {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

const Placeholder = ({ title, message }: PlaceholderProps) => {
  const location = useLocation();
  const params = useParams();

  const pathParts = location.pathname.split("/").filter(Boolean);
  const sectionKey = pathParts[0] ?? "notices";
  const section = SECTION_CONFIG[sectionKey] ?? {
    title: title ?? "Information Center",
    summary: message ?? "Browse updated information and resources for this section.",
    highlights: ["Updated resources", "Structured content blocks", "Quick access links"],
  };

  const detailSlug =
    params.specName ??
    params.topic ??
    params.cell ??
    params.facility ??
    params.doc ??
    params.metric ??
    params.noticeId ??
    params.rank;

  const detailTitle = detailSlug ? humanizeSlug(detailSlug) : "Overview";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-6xl space-y-8">
          <div className="rounded-3xl border border-border/70 bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="gap-1">
                <Info className="h-3.5 w-3.5" />
                Updated Section
              </Badge>
              {detailSlug && <Badge variant="outline">{detailTitle}</Badge>}
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">{title ?? section.title}</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground md:text-lg">{message ?? section.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/downloads">
                  Open Downloads
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Department</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {section.highlights.map((item) => (
              <Card key={item} className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-lg">{item}</CardTitle>
                  <CardDescription>Information has been organized for easier browsing and updates.</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Key Resources
                </CardTitle>
                <CardDescription>Primary references and documents relevant to this section.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>- Department handbooks, notices, and policy documents</p>
                <p>- Event updates and archived announcements</p>
                <p>- Contact points for queries and clarifications</p>
              </CardContent>
            </Card>

            <Card className="border-border/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  Timeline & Updates
                </CardTitle>
                <CardDescription>Latest timeline-oriented updates for this category.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>- Quarterly updates and recent highlights</p>
                <p>- Upcoming milestones and action items</p>
                <p>- Progress snapshots for admins and visitors</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Need More Details?
              </CardTitle>
              <CardDescription>
                This page now serves as an active content destination for this route. For page-specific updates, contact the department
                admin team.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/student-corner">Student Corner</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/notices">Staff Content Panel</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Placeholder;


