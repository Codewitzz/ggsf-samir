import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FlaskConical, Lightbulb, Network } from "lucide-react";

const highlights = [
  {
    title: "Industry-Sponsored Projects",
    description: "Collaborations with Bosch, Siemens, and CISCO on automation and smart manufacturing.",
    icon: Network,
  },
  {
    title: "Innovation Labs",
    description: "Dedicated AI & Data Science lab enabling projects in ML, computer vision, and analytics.",
    icon: Lightbulb,
  },
  {
    title: "Research Grants",
    description: "Faculty secured funding under MSME and AICTE schemes for interdisciplinary research.",
    icon: FlaskConical,
  },
];

const ResearchHighlights = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Research Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResearchHighlights;


