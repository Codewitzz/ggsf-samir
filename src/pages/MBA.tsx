import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Briefcase,
  Globe,
  Target,
  CheckCircle,
  GraduationCap,
  Zap,
  Building2,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import mbaIcon from "@/assets/mba-icon.png";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5000;

const MBA = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "mba-leadership",
        title: "Transform into Business Leaders",
        description: "Develop strategic thinking, leadership skills, and entrepreneurial mindset for corporate success",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-placement",
        title: "Excellent Placement Opportunities",
        description: "90%+ placement rate with top companies across finance, marketing, operations, and consulting",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-industry",
        title: "Industry-Integrated Learning",
        description: "Live projects, internships, and mentorship from corporate leaders and industry experts",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-global",
        title: "Global Business Exposure",
        description: "International case studies, exchange programs, and global business simulations",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1600&q=80",
      },
    ],
    [],
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [heroSlides.length]);

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

  const programHighlights = [
    "AICTE approved, Savitribai Phule Pune University affiliated",
    "Trimester pattern with dual specialization flexibility",
    "Industry internships and live consulting projects",
    "Mentorship from corporate leaders and entrepreneurs",
    "State-of-the-art business simulation labs",
    "International exchange programs and global immersion",
    "Entrepreneurship development cell and incubation support",
    "90%+ placement record with leading MNCs and corporates",
    "Guest lectures from Fortune 500 executives",
    "Active student clubs: Finance, Marketing, HR, Analytics",
  ];

  const careerOpportunities = [
    {
      title: "Corporate Management",
      description: "Roles in strategy, operations, finance, and marketing in leading corporations",
      icon: Building2,
    },
    {
      title: "Consulting",
      description: "Management consulting roles with top consulting firms",
      icon: Target,
    },
    {
      title: "Entrepreneurship",
      description: "Start your own venture with incubation support and mentorship",
      icon: Zap,
    },
    {
      title: "Analytics & Data Science",
      description: "Business analytics, data science, and decision-making roles",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary to-primary-light">
        {/* Background Slider */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${activeSlide * 100}%)`,
            }}
          >
            {heroSlides.map((slide) => (
              <div key={slide.id} className="relative h-full w-full flex-shrink-0">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Overlay - removed bluish color */}

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-block">
              <img src={mbaIcon} alt="MBA" className="w-24 h-24 md:w-32 md:h-32 mx-auto" loading="lazy" decoding="async" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Master of Business Administration</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 mb-2">
              {heroSlides[activeSlide].title}
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80">
              {heroSlides[activeSlide].description}
            </p>
          </div>
        </div>

        {/* Slider Indicators */}
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
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4">Specializations Offered</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose from six specialized tracks to align with your career goals and interests
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((spec, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <p className="font-semibold text-lg text-foreground">{spec}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Program Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Career Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerOpportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{opportunity.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">2 Years (4 Semesters)</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">Trimester System</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">AICTE Approved</CardDescription>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  Bachelor's degree in any discipline with minimum 50% aggregate marks (45% for reserved categories).
                  Valid CAT/MAT/CMAT/ATMA/XAT or equivalent entrance examination scores required. Candidates appearing
                  for final year examination can also apply.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Admission Process</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Entrance exam score (CAT/MAT/CMAT/ATMA/XAT)</li>
                  <li>Group Discussion (GD)</li>
                  <li>Personal Interview (PI)</li>
                  <li>Academic performance and work experience</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Dual specialization option</li>
                  <li>Industry internships with leading companies</li>
                  <li>Live consulting projects and case studies</li>
                  <li>Guest lectures from industry leaders</li>
                  <li>International exchange programs</li>
                  <li>Entrepreneurship development and incubation support</li>
                  <li>State-of-the-art business simulation labs</li>
                  <li>Strong alumni network</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/mba/about">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <BookOpen className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>About MBA</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Program overview and highlights</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/mba/academics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <GraduationCap className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Academics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Curriculum and courses</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/mba/admissions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <Users className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Eligibility and application</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/mba/activities">
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

export default MBA;
