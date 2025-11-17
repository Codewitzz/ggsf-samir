import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer, Lightbulb, Target, Trophy } from "lucide-react";
import polytechnicIcon from "@/assets/polytechnic-icon.png";

const Polytechnic = () => {
  const features = [
    {
      icon: Hammer,
      title: "Hands-On Training",
      description: "Practical skills development through workshops and lab sessions",
    },
    {
      icon: Lightbulb,
      title: "Industry Ready",
      description: "Curriculum designed to meet current industry requirements",
    },
    {
      icon: Target,
      title: "Focused Learning",
      description: "Specialized training in technical and vocational skills",
    },
    {
      icon: Trophy,
      title: "Job Placement",
      description: "Strong placement support with technical companies",
    },
  ];

  const courses = [
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics & Telecommunication",
    "Computer Engineering",
    "Automobile Engineering",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warning to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6 inline-block">
            <img src={polytechnicIcon} alt="Polytechnic" className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Polytechnic College</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Empowering students with technical skills and practical knowledge for successful careers
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-warning" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Diploma Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-medium text-foreground">{course}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-muted-foreground">3 Years (6 Semesters)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  10th standard pass with Mathematics and Science subjects.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Highlights</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>AICTE approved diploma programs</li>
                  <li>Well-equipped workshops and laboratories</li>
                  <li>Industry visits and internships</li>
                  <li>Skill development programs</li>
                  <li>Direct entry to engineering (lateral entry)</li>
                  <li>Placement assistance and training</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Polytechnic;
