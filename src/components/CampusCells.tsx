import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Shield, Lightbulb, Users } from "lucide-react";

const cells = [
  {
    title: "Entrepreneurship Development Cell",
    description: "Start-up mentoring, ideation bootcamps, and incubation support for budding entrepreneurs.",
    icon: Lightbulb,
  },
  {
    title: "Internal Quality Assurance Cell (IQAC)",
    description: "Continuous improvement initiatives aligned with NAAC and NBA quality benchmarks.",
    icon: Shield,
  },
  {
    title: "Training & Placement Cell",
    description: "Career counselling, internships, and campus recruitment with 300+ partner companies.",
    icon: Building2,
  },
  {
    title: "Student Welfare Cell",
    description: "Scholarships, mentorship, and wellbeing programs ensuring holistic student development.",
    icon: Users,
  },
];

const CampusCells = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Campus Cells & Committees</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cells.map((cell, index) => {
            const IconComponent = cell.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-info" />
                  </div>
                  <CardTitle className="text-lg">{cell.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{cell.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampusCells;


