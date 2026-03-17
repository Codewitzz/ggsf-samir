import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Building2, Laptop, Presentation, Users } from "lucide-react";

const BBAFacilities = () => {
  const facilities = [
    {
      title: "Smart Classrooms",
      description: "Modern classrooms equipped for presentations, group discussions, and interactive learning.",
      icon: Presentation,
    },
    {
      title: "Business & Analytics Resources",
      description: "Access to tools and learning resources to build fundamentals in analytics and business decision-making.",
      icon: Laptop,
    },
    {
      title: "Library & Digital Resources",
      description: "Textbooks, reference books, journals, and digital resources aligned to the curriculum.",
      icon: BookOpen,
    },
    {
      title: "Seminar & GD Rooms",
      description: "Spaces designed for presentations, mock interviews, group discussions, and workshops.",
      icon: Users,
    },
    {
      title: "Campus Infrastructure",
      description: "A well-connected campus environment supporting academics, student activities, and events.",
      icon: Building2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">B.B.A. Facilities</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Learning spaces and student resources that support management education and professional development.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <Card key={facility.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{facility.title}</CardTitle>
                    </div>
                    <CardDescription>{facility.description}</CardDescription>
                  </CardHeader>
                  <CardContent />
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BBAFacilities;

