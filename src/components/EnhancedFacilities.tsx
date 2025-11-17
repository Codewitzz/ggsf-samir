import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Wifi, Microscope, Dumbbell } from "lucide-react";

const facilities = [
  {
    title: "Smart Classrooms",
    description: "Digital classrooms equipped with interactive boards and lecture capture systems.",
    icon: Building,
  },
  {
    title: "High-Speed Connectivity",
    description: "Wi-Fi enabled campus with 100 Mbps leased line and secure access for students.",
    icon: Wifi,
  },
  {
    title: "Advanced Laboratories",
    description: "Siemens, Bosch, AWS Academy and AI labs supporting multidisciplinary projects.",
    icon: Microscope,
  },
  {
    title: "Sports & Wellness",
    description: "Indoor stadium, gymnasium, and sports grounds promoting holistic well-being.",
    icon: Dumbbell,
  },
];

const EnhancedFacilities = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12">Campus Infrastructure & Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((facility, index) => {
            const IconComponent = facility.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="flex flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{facility.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">{facility.description}</p>
                  </div>
                </CardHeader>
                <CardContent />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EnhancedFacilities;


