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
    <section className="py-8 sm:py-12 md:py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 md:mb-12">Campus Cells & Committees</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {cells.map((cell, index) => {
            const IconComponent = cell.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="flex flex-row items-start gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-info/10 flex items-center justify-center flex-shrink-0">
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-info" />
                  </div>
                  <CardTitle className="text-sm sm:text-base md:text-lg">{cell.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-xs sm:text-sm text-muted-foreground">{cell.description}</p>
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


