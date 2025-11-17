import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wrench, 
  Cpu, 
  BookOpen, 
  Users, 
  Building,
  Wifi,
  Camera,
  Dumbbell,
  Utensils,
  Zap
} from "lucide-react";

const PolytechnicFacilities = () => {
  const facilities = [
    {
      icon: Wrench,
      title: "Workshops",
      description: "Well-equipped workshops with modern machinery for hands-on training",
      details: ["Machine Shop", "Welding Shop", "Carpentry Shop", "Foundry", "Fitting Shop", "Sheet Metal Shop"],
    },
    {
      icon: Cpu,
      title: "Laboratories",
      description: "State-of-the-art laboratories with latest equipment for all departments",
      details: ["Computer Labs", "Electronics Labs", "Electrical Labs", "Mechanical Labs", "Civil Labs", "AI Labs"],
    },
    {
      icon: Zap,
      title: "BOSCH & Siemens Labs",
      description: "Industry-standard labs in partnership with BOSCH and Siemens",
      details: ["BOSCH Lab", "Siemens Lab", "Industry 4.0 Training", "Automation Systems", "PLC Training"],
    },
    {
      icon: BookOpen,
      title: "Library",
      description: "Extensive library with vast collection of books, journals, and digital resources",
      details: ["Books & Journals", "Digital Resources", "Reading Hall", "E-Library", "Reference Section"],
    },
    {
      icon: Users,
      title: "Classrooms & Seminar Halls",
      description: "Modern classrooms and seminar halls equipped with audio-visual facilities",
      details: ["Smart Classrooms", "Seminar Halls", "Conference Rooms", "Audio-Visual Equipment"],
    },
    {
      icon: Wifi,
      title: "IT Infrastructure",
      description: "Dedicated internet connectivity and Wi-Fi enabled campus",
      details: ["Wi-Fi Campus", "High-Speed Internet", "Network Infrastructure", "Computer Facilities"],
    },
    {
      icon: Camera,
      title: "Security & Surveillance",
      description: "Campus monitoring through CCTV cameras and security personnel",
      details: ["CCTV Surveillance", "Security Personnel", "Access Control", "Emergency Systems"],
    },
    {
      icon: Building,
      title: "Hostels",
      description: "Separate and well-furnished hostels for boys and girls",
      details: ["Separate Hostels", "Well-Furnished Rooms", "Mess Facilities", "Recreation Areas"],
    },
    {
      icon: Dumbbell,
      title: "Sports Facilities",
      description: "Comprehensive sports infrastructure for various athletic activities",
      details: ["Playground", "Indoor Games", "Gymnasium", "Sports Equipment"],
    },
    {
      icon: Utensils,
      title: "Cafeteria",
      description: "Hygienic and spacious cafeteria serving nutritious meals",
      details: ["Hygienic Kitchen", "Nutritious Meals", "Spacious Seating", "Multiple Counters"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warning to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Polytechnic Facilities</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            World-class infrastructure and facilities to support technical education and skill development
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
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-8 w-8 text-warning" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{facility.title}</CardTitle>
                        <CardDescription className="text-base">{facility.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {facility.details.map((detail, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-warning mt-1">•</span>
                          <span>{detail}</span>
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

      {/* Additional Information */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Infrastructure Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Modern Workshops</h3>
                <p className="text-muted-foreground">
                  Well-equipped workshops with modern machinery and tools for hands-on training in various 
                  trades including machining, welding, carpentry, foundry, and fitting.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Industry Partnerships</h3>
                <p className="text-muted-foreground">
                  BOSCH and Siemens Lab partnerships provide industry-standard training in automation, 
                  Industry 4.0, and modern manufacturing technologies.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Skill Development</h3>
                <p className="text-muted-foreground">
                  PMKVY Skill Development Centre offers various skill development programs and certifications 
                  to enhance employability of students.
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

export default PolytechnicFacilities;

