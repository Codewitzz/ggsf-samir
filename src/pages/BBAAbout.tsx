import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Briefcase, CheckCircle, GraduationCap, Lightbulb, Target, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdminImageUrl } from "@/lib/adminImages/getAdminImageUrl";
import DepartmentImagesSection from "@/components/DepartmentImagesSection";

const SLIDE_DURATION = 5000;

const BBAAbout = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "bba-foundation",
        title: "Build a Business Foundation",
        description: "A modern undergraduate program focused on management, entrepreneurship, and professional skills.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "bba-career",
        title: "Career-Ready Learning",
        description: "Projects, presentations, internships, and industry interaction to prepare you for corporate roles.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "bba-entrepreneurship",
        title: "Entrepreneurship & Innovation",
        description: "Learn how to build and run ventures with mentorship, case studies, and practical exposure.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "bba-skills",
        title: "Skills That Matter",
        description: "Communication, analytics, teamwork, and leadership embedded into every semester.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    [],
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => window.clearInterval(interval);
  }, [heroSlides.length]);

  const highlights = [
    "Undergraduate program designed for management fundamentals and professional readiness",
    "Industry interaction through guest lectures, workshops, and mentoring sessions",
    "Project-based learning, presentations, and business case discussions",
    "Internship exposure to understand real corporate and business environments",
    "Student clubs and activities to build leadership and teamwork",
    "Strong pathway for MBA and other postgraduate studies",
  ];

  const focusAreas = [
    "Principles of Management",
    "Marketing & Sales",
    "Finance & Accounting",
    "Human Resource Management",
    "Operations & Supply Chain Basics",
    "Business Communication & Soft Skills",
    "Entrepreneurship & Startup Basics",
    "Business Analytics Fundamentals",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary to-primary-light">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                <img
                  src={getAdminImageUrl(`bba_about_${slide.id}`, slide.image)}
                  data-admin-slot={`bba_about_${slide.id}`}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-flex items-center justify-center h-28 w-28 rounded-3xl bg-white/10 ring-2 ring-white/20 backdrop-blur">
              <GraduationCap className="h-12 w-12" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About B.B.A. Program</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 mb-2">{heroSlides[activeSlide].title}</p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80">{heroSlides[activeSlide].description}</p>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === activeSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">B.B.A. at GCOERC</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The Bachelor of Business Administration (B.B.A.) program develops strong fundamentals in management, business
            communication, and analytical thinking. The program blends classroom learning with activities, presentations,
            and internship exposure so students graduate career-ready and confident.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Program Highlights</CardTitle>
              </div>
              <CardDescription>What makes the B.B.A. experience practical and career-focused.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                {highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Core Focus Areas</CardTitle>
              </div>
              <CardDescription>Core areas covered across semesters to build strong management basics.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                {focusAreas.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Program Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Modern Curriculum", description: "Management fundamentals aligned with industry expectations.", icon: BookOpen },
              { title: "Skill Development", description: "Communication, teamwork, leadership, and presentation practice.", icon: Users },
              { title: "Industry Exposure", description: "Guest lectures, visits, and internship opportunities.", icon: Briefcase },
              { title: "Student Activities", description: "Clubs, events, competitions, and entrepreneurial initiatives.", icon: Zap },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <DepartmentImagesSection
        title="B.B.A. — Images"
        subtitle="A quick glimpse of learning, activities and professional skills development"
        images={[
          {
            title: "Workshops & Activities",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Team Presentations",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Entrepreneurship & Ideas",
            image: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?auto=format&fit=crop&w=1200&q=80",
          },
        ]}
      />

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/bba/academics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Academics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Curriculum and semesters</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/bba/facilities">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <BookOpen className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Labs, library and resources</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/bba/admissions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <Users className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Eligibility and process</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/bba/activities">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <Zap className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Events and initiatives</CardDescription>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BBAAbout;

