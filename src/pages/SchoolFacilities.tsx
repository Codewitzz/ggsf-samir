import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Palette, 
  Music, 
  Beaker, 
  Computer, 
  BookOpen, 
  Utensils,
  Dumbbell,
  Microscope,
  FlaskConical,
  Building
} from "lucide-react";
import { Link } from "react-router-dom";

const SchoolFacilities = () => {
  const facilities = [
    {
      icon: Palette,
      title: "Art Room",
      description: "Spacious and well-lit art room equipped with all necessary materials for painting, drawing, and craft work. Encourages creative expression and artistic skills.",
      category: "Arts",
      link: "/facilities/art-room",
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Dedicated music room with various musical instruments. Provides space for music practice, choir rehearsals, and musical performances.",
      category: "Arts",
      link: "/facilities/music-room",
    },
    {
      icon: Beaker,
      title: "Biology Lab",
      description: "Well-equipped biology laboratory with modern microscopes, specimens, and all necessary equipment for practical learning in life sciences.",
      category: "Laboratory",
      link: "/facilities/biology-lab",
    },
    {
      icon: FlaskConical,
      title: "Chemistry Lab",
      description: "State-of-the-art chemistry laboratory with safety equipment, modern apparatus, and chemicals for conducting experiments safely.",
      category: "Laboratory",
      link: "/facilities/chemistry-lab",
    },
    {
      icon: Microscope,
      title: "Physics Lab",
      description: "Advanced physics laboratory with modern equipment for experiments in mechanics, optics, electricity, and other physics concepts.",
      category: "Laboratory",
      link: "/facilities/physics-lab",
    },
    {
      icon: Computer,
      title: "Computer Lab",
      description: "Modern computer laboratories with latest computers, software, and internet connectivity. Supports digital learning and computer education.",
      category: "Technology",
      link: "/facilities/computer-lab",
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Extensive library with vast collection of books, reference materials, journals, and digital resources. Quiet reading spaces for students.",
      category: "Academic",
      link: "/facilities/library",
    },
    {
      icon: Utensils,
      title: "Cafeteria",
      description: "Hygienic and spacious cafeteria serving nutritious and balanced meals. Maintains high standards of cleanliness and food quality.",
      category: "Amenities",
      link: "/facilities/cafeteria",
    },
    {
      icon: Dumbbell,
      title: "Sports Facilities",
      description: "Comprehensive sports infrastructure including playground, indoor games facilities, and equipment for various sports and physical activities.",
      category: "Sports",
      link: "/facilities/sports",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">School Facilities</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            World-class infrastructure and facilities to support holistic learning and development
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <Link key={index} to={facility.link} className="block">
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">{facility.title}</CardTitle>
                          <CardDescription className="text-base">{facility.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-muted text-muted-foreground">
                        {facility.category}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Infrastructure Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Modern Classrooms</h3>
                <p className="text-muted-foreground">
                  Well-ventilated and spacious classrooms equipped with modern teaching aids, smart boards, 
                  and comfortable seating arrangements to facilitate effective learning.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Safety & Security</h3>
                <p className="text-muted-foreground">
                  The school premises are secured with CCTV surveillance, fire safety equipment, and 
                  trained security personnel to ensure a safe learning environment.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Transportation</h3>
                <p className="text-muted-foreground">
                  School bus services available for students with well-maintained vehicles and trained drivers 
                  for safe and convenient transportation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolFacilities;

