import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, BookOpen, UtensilsCrossed, GraduationCap, Microscope, Cpu, Wifi } from "lucide-react";

const CampusInfrastructure = () => {
  const facilities = [
    {
      title: "State-of-the-Art Laboratories",
      description: "Well-equipped labs for all engineering departments with latest technology and equipment",
      icon: Microscope,
      features: [
        "Computer Engineering Labs with latest hardware",
        "Electronics & Communication Labs",
        "Mechanical Engineering Workshops",
        "Civil Engineering Material Testing Labs",
        "Electrical Engineering Power Labs",
        "AI & Data Science Labs",
        "Robotics and Automation Labs",
      ],
      color: "from-info to-primary",
    },
    {
      title: "Central Library",
      description: "Extensive collection of books, journals, and digital resources",
      icon: BookOpen,
      features: [
        "50,000+ books and reference materials",
        "Online journals and e-books access",
        "Digital library with computer terminals",
        "Reading halls with comfortable seating",
        "Research and reference section",
        "24/7 online database access",
      ],
      color: "from-primary to-primary-light",
    },
    {
      title: "Canteen & Cafeteria",
      description: "Hygienic and nutritious food options for students and staff",
      icon: UtensilsCrossed,
      features: [
        "Multi-cuisine food options",
        "Vegetarian and non-vegetarian meals",
        "Snacks and beverages counter",
        "Hygienic kitchen facilities",
        "Affordable pricing",
        "Comfortable seating area",
      ],
      color: "from-warning to-secondary",
    },
    {
      title: "Modern Classrooms",
      description: "Spacious and well-equipped classrooms with modern teaching aids",
      icon: GraduationCap,
      features: [
        "Smart boards and projectors",
        "Audio-visual equipment",
        "Air-conditioned classrooms",
        "Comfortable seating arrangements",
        "Wi-Fi enabled classrooms",
        "Seminar halls for presentations",
      ],
      color: "from-success to-primary",
    },
    {
      title: "Computer Labs",
      description: "High-performance computing facilities with latest software",
      icon: Cpu,
      features: [
        "Latest computer systems",
        "High-speed internet connectivity",
        "Software development tools",
        "CAD/CAM software",
        "Programming environments",
        "Network security labs",
      ],
      color: "from-secondary to-info",
    },
    {
      title: "Campus Infrastructure",
      description: "Complete campus facilities for holistic development",
      icon: Building2,
      features: [
        "Wi-Fi enabled campus",
        "Auditorium with 400+ seating capacity",
        "Sports complex and playground",
        "Hostel facilities for boys and girls",
        "Medical facilities",
        "Bank and ATM on campus",
      ],
      color: "from-primary-dark to-warning",
    },
  ];

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Campus Infrastructure</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            World-class facilities designed to enhance learning and provide a comfortable campus experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${facility.color}`} />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${facility.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{facility.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{facility.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {facility.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Wifi className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CampusInfrastructure;

