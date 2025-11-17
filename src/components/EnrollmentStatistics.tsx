import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap } from "lucide-react";

const stats = [
  {
    label: "Total Offers (2024-25)",
    value: "14,044",
    description: "Dream, Super Dream & Regular placements across campuses.",
    icon: GraduationCap,
  },
  {
    label: "Industry Internships",
    value: "4,051",
    description: "Students engaged with marquee industry partners.",
    icon: Users,
  },
  {
    label: "Dream Offers",
    value: "3,499",
    description: "High value roles in product, consulting, and analytics.",
    icon: BookOpen,
  },
];

const EnrollmentStatistics = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Placements & Enrollment Snapshot</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnrollmentStatistics;


