import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CampusInfrastructure from "@/components/CampusInfrastructure";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Users, Building2 } from "lucide-react";

const EngineeringCampus = () => {
  const campusInfo = [
    {
      icon: MapPin,
      title: "Location",
      description: "Khalsa Educational Complex, Guru Gobind Singh Marg, Wadala- Pathardi Road, Indira Nagar Annexe, Nashik-422009",
    },
    {
      icon: Building2,
      title: "Campus Area",
      description: "Sprawling campus with modern infrastructure, green spaces, and state-of-the-art facilities",
    },
    {
      icon: Users,
      title: "Student Capacity",
      description: "Accommodating thousands of students across Engineering, MBA, and other programs",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      description: "Monday - Friday: 9:00 AM - 5:00 PM | Saturday: 9:00 AM - 1:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info to-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Engineering Campus</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            A modern, well-equipped campus designed to provide an exceptional learning environment for engineering students
          </p>
        </div>
      </section>

      {/* Campus Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {campusInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{info.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">About Our Campus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Guru Gobind Singh College of Engineering and Research Center boasts a modern, well-planned campus 
                spread across acres of land. Our campus is designed to provide students with a holistic learning 
                experience that combines academic excellence with practical skills development.
              </p>
              <p className="text-muted-foreground">
                The campus features state-of-the-art laboratories, a well-stocked library, modern classrooms, 
                comfortable hostels, recreational facilities, and much more. We believe in creating an 
                environment that nurtures innovation, creativity, and academic growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Campus Infrastructure */}
      <CampusInfrastructure />

      {/* Contact Information */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Campus Visit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We welcome prospective students and parents to visit our campus. To schedule a campus tour, 
                please contact our admissions office.
              </p>
              <div className="space-y-2">
                <p><strong>Phone:</strong> +91-7768004581/82</p>
                <p><strong>Email:</strong> gcoerc.nashik@ggsf.edu.in</p>
                <p><strong>Address:</strong> Khalsa Educational Complex, Guru Gobind Singh Marg, Wadala- Pathardi Road, Indira Nagar Annexe, Nashik-422009</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngineeringCampus;


