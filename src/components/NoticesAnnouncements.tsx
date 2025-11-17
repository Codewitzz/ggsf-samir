import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const notices = [
  {
    title: "TE & BE (2019 Pattern) Exam Timetable",
    date: "08 Aug 2025",
    link: "https://engg.ggsf.edu.in/images/pdf/68958994d09080In Sem TE BE 2025-26.pdf",
  },
  {
    title: "Workshop on Women Empowerment",
    date: "19 Jul 2025",
    link: "https://engg.ggsf.edu.in/images/pdf/68888e658a24d0Women Empowerment.pdf",
  },
  {
    title: "End-Sem Exam Timetable (May 2025)",
    date: "22 Apr 2025",
    link: "https://engg.ggsf.edu.in/images/pdf/68071e05c88970Febemay2025.pdf",
  },
];

const NoticesAnnouncements = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Notices & Announcements</h2>
          <div className="flex items-center gap-2 text-sm text-primary">
            <AlertCircle className="h-4 w-4" />
            <span>Beware of fake admissions links — apply only via official website.</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow h-full">
              <CardHeader>
                <CardTitle className="text-lg">{notice.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{notice.date}</span>
                </div>
              </CardHeader>
              <CardContent>
                <Link
                  to={notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm"
                >
                  View notice
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticesAnnouncements;


