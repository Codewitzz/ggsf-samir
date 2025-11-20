import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Award, TrendingUp } from "lucide-react";
import mbaIcon from "@/assets/mba-icon.png";

const MBA = () => {
  const features = [
    {
      icon: BookOpen,
      title: "World-Class Curriculum",
      description: "Industry-aligned curriculum with latest business trends and practices",
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Learn from experienced professors and industry practitioners",
    },
    {
      icon: Award,
      title: "Top Placements",
      description: "90%+ placement rate with leading companies across sectors",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Focus on leadership development and entrepreneurial skills",
    },
  ];

  const specializations = [
    "Finance & Accounting",
    "Marketing Management",
    "Human Resource Management",
    "Operations Management",
    "International Business",
    "Business Analytics",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6 inline-block">
            <img src={mbaIcon} alt="MBA" className="w-32 h-32 mx-auto" loading="lazy" decoding="async" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Master of Business Administration</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Transform your career with our comprehensive MBA program designed to create future business leaders
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
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-primary" />
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

      {/* Specializations */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Specializations Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {specializations.map((spec, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-medium text-foreground">{spec}</p>
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
                <p className="text-muted-foreground">2 Years (4 Semesters)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  Bachelor's degree in any discipline with minimum 50% marks. Valid CAT/MAT/CMAT scores required.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Highlights</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Industry internships and live projects</li>
                  <li>Guest lectures from business leaders</li>
                  <li>International exposure programs</li>
                  <li>Entrepreneurship development cell</li>
                  <li>State-of-the-art learning facilities</li>
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

export default MBA;
