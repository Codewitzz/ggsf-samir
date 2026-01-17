import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, TrendingUp, Users, Award, Briefcase } from "lucide-react";

const Placements = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&h=900&fit=crop&q=80",
  ];
  const stats = [
    { icon: Building2, label: "Partner Companies", value: "300+" },
    { icon: TrendingUp, label: "Placement Rate", value: "85%+" },
    { icon: Users, label: "Students Placed", value: "1000+" },
    { icon: Award, label: "Highest Package", value: "₹15 LPA" },
  ];

  const topRecruiters = [
    "TCS", "Infosys", "Wipro", "Accenture", "Cognizant",
    "Capgemini", "L&T", "Mahindra", "Bosch", "Siemens",
    "Amazon", "Microsoft", "Google", "IBM", "Oracle"
  ];

  const placementProcess = [
    {
      step: "1",
      title: "Registration",
      description: "Students register with the Training & Placement Cell",
    },
    {
      step: "2",
      title: "Pre-Placement Training",
      description: "Aptitude tests, technical interviews, and soft skills workshops",
    },
    {
      step: "3",
      title: "Company Visits",
      description: "Leading companies visit campus for recruitment drives",
    },
    {
      step: "4",
      title: "Selection & Offer",
      description: "Selected students receive offer letters from companies",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      
      {/* Hero Section with Image Slider */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageSlider 
            images={sliderImages} 
            height="h-[500px]"
            className="rounded-none"
          />
        </div>
        <div className="relative h-[500px] z-10 bg-black/50 py-20 px-4">
          <div className="container mt-20 mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Placements</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Connecting talented students with leading companies for successful career launches
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Placement Process</h2>
            <p className="text-muted-foreground">
              A structured approach to ensure successful placements for all students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementProcess.map((item, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                    {item.step}
                  </div>
                  <CardTitle className="text-xl mt-4">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                Top Recruiting Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {topRecruiters.map((company, index) => (
                  <div
                    key={index}
                    className="p-4 border border-border rounded-lg text-center hover:bg-muted transition-colors"
                  >
                    <p className="font-medium">{company}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Training & Placement Cell */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Training & Placement Cell</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our dedicated Training & Placement Cell works tirelessly to ensure that every student 
                gets the best placement opportunities. We provide comprehensive training programs, 
                industry connections, and career guidance to help students achieve their career goals.
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold">Services Offered:</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Career counseling and guidance</li>
                  <li>Resume building workshops</li>
                  <li>Mock interviews and aptitude tests</li>
                  <li>Industry interaction sessions</li>
                  <li>Internship opportunities</li>
                  <li>Campus recruitment drives</li>
                </ul>
              </div>
              <div className="pt-4">
                <p className="font-semibold mb-2">Contact Training & Placement Cell:</p>
                <p className="text-muted-foreground">Phone: +91-7768004581/82</p>
                <p className="text-muted-foreground">Email: gcoerc.nashik@ggsf.edu.in</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Placements;


