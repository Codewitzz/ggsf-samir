import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, FileText, CheckCircle } from "lucide-react";

const Admissions = () => {
  const sliderImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1600&q=80",
  ];
  const programs = [
    {
      title: "Engineering (B.E.)",
      description: "Bachelor of Engineering programs in various specializations",
      href: "/engineering/admissions",
      icon: GraduationCap,
      features: ["JEE Main / MHT-CET", "4-year program", "Multiple specializations"],
    },
    {
      title: "MBA Programs",
      description: "Master of Business Administration with industry-focused curriculum",
      href: "/mba/admissions",
      icon: BookOpen,
      features: ["CAT / MAT / CMAT", "2-year program", "Industry partnerships"],
    },
    {
      title: "M.E. Programs",
      description: "Master of Engineering for advanced specialization",
      href: "/me/admissions",
      icon: FileText,
      features: ["GATE / PGCET", "2-year program", "Research focus"],
    },
  ];

  const admissionProcess = [
    "Check eligibility criteria for your desired program",
    "Fill out the online application form",
    "Submit required documents",
    "Appear for entrance examination (if applicable)",
    "Attend counseling/interview (if required)",
    "Complete admission formalities and fee payment",
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
            height="h-[400px]"
            className="rounded-none"
          />
        </div>
        <div className="relative z-10 bg-black/50 py-20 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Begin your journey towards excellence in engineering and management education
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Programs Offered</h2>
            <p className="text-muted-foreground">
              Choose from our range of undergraduate and postgraduate programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link to={program.href}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admission Process</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {admissionProcess.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Important Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Application Start Date</span>
                  <span className="text-muted-foreground">To be announced</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Last Date for Application</span>
                  <span className="text-muted-foreground">To be announced</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Entrance Examination</span>
                  <span className="text-muted-foreground">As per university schedule</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Admission Confirmation</span>
                  <span className="text-muted-foreground">After counseling</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Need Help with Admissions?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Our admissions team is here to help you through the application process. 
                Contact us for any queries or assistance.
              </p>
              <div className="space-y-2 mb-6">
                <p><strong>Phone:</strong> +91-7768004581/82</p>
                <p><strong>Email:</strong> gcoerc.nashik@ggsf.edu.in</p>
              </div>
              <Button asChild size="lg">
                <Link to="/contact">Contact Admissions Office</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Admissions;


