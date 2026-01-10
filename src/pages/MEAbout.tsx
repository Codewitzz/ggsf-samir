import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  GraduationCap,
  Award,
  Users,
  BookOpen,
  FlaskConical,
  Briefcase,
  Target,
  Zap,
  Code,
  Cpu,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import engineeringIcon from "@/assets/engineering-icon.png";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5000;

const MEAbout = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "me-research",
        title: "Advanced Research & Innovation",
        description: "Cutting-edge research in emerging technologies with industry partnerships and funded projects",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "me-labs",
        title: "State-of-the-Art Laboratories",
        description: "Access to advanced research labs, simulation centers, and industry-standard equipment",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "me-faculty",
        title: "Expert Faculty & Mentorship",
        description: "Learn from PhD faculty and industry experts with decades of research and professional experience",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "me-placement",
        title: "Excellent Career Opportunities",
        description: "Strong placement record with leading R&D organizations, MNCs, and research institutions",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
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

  const specializations = [
    {
      name: "Computer Engineering",
      description: "Advanced computing systems, distributed systems, cloud computing, and software engineering",
      icon: Cpu,
    },
    {
      name: "Mechanical Engineering (Design)",
      description: "Product design, CAD/CAM, finite element analysis, and rapid prototyping",
      icon: Zap,
    },
    {
      name: "Mechanical Engineering (Thermal)",
      description: "Thermal systems, energy engineering, CFD simulations, and renewable energy",
      icon: TrendingUp,
    },
    {
      name: "Electronics & Communication",
      description: "VLSI design, wireless communications, signal processing, and embedded systems",
      icon: Code,
    },
  ];

  const programHighlights = [
    "AICTE approved programs with curriculum aligned to industry needs",
    "Research-oriented curriculum with thesis/project work",
    "Mentorship from PhD faculty with international research exposure",
    "Access to advanced laboratories and simulation software",
    "Opportunities for publication in international journals",
    "Industry-sponsored research projects and internships",
    "Collaboration with R&D organizations (DRDO, ISRO, CSIR)",
    "Funding support for conference presentations and patent filing",
    "Dual certification opportunities with industry partners",
    "Placement assistance with leading companies and research organizations",
  ];

  const careerOpportunities = [
    {
      title: "Research & Development",
      description: "R&D roles in leading organizations like DRDO, ISRO, BARC, and private R&D centers",
    },
    {
      title: "Higher Education",
      description: "Academic positions in universities and colleges as Assistant Professors",
    },
    {
      title: "Industry Leadership",
      description: "Senior technical roles in MNCs, consulting firms, and engineering companies",
    },
    {
      title: "Entrepreneurship",
      description: "Start your own technology venture with incubation support and mentorship",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-warning to-secondary">
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-warning/80 via-secondary/80 to-warning/80 mix-blend-multiply" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-6 inline-block">
              <img
                src={engineeringIcon}
                alt="ME Programs"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Masters of Engineering (M.E.)</h1>
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

      {/* Overview Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About M.E. Programs</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The Masters in Engineering (M.E.) programs offer advanced specializations in design, thermal, electronics,
              and computer engineering domains with strong research orientation and industry collaboration. Our programs
              are designed to produce engineers who can contribute to cutting-edge research, innovation, and technology
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-warning" />
                </div>
                <CardTitle>Duration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">2 Years (4 Semesters)</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-warning" />
                </div>
                <CardTitle>Specializations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">4+ Programs Available</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-warning" />
                </div>
                <CardTitle>AICTE Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg font-semibold">Recognized Programs</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Available Specializations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-2">{spec.name}</CardTitle>
                        <CardDescription>{spec.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Program Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Strengths & Research Domains */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-warning" />
                  <CardTitle className="text-2xl">Program Strengths</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>AICTE approved with curriculum aligned to emerging technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Research mentorship from PhD faculty and adjunct industry experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Access to advanced laboratories and simulation tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Strong industry-institute partnerships for collaborative research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Opportunities for funded research projects and internships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Publication support and funding for international conferences</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="h-6 w-6 text-warning" />
                  <CardTitle className="text-2xl">Research Domains</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Automotive electronics, EV technology, and control systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Thermal and energy systems using CFD simulations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Data science, AI, and cybersecurity for engineering applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Product design, CAD/CAM, and rapid prototyping technologies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>VLSI design, embedded systems, and IoT applications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <span>Renewable energy systems and sustainable engineering solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Career Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="h-6 w-6 text-warning" />
                    <CardTitle className="text-xl">{opportunity.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{opportunity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link to="/me/academics">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-warning text-center h-full">
                <CardHeader>
                  <BookOpen className="h-10 w-10 mx-auto mb-2 text-warning" />
                  <CardTitle>Academics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Curriculum, courses, and academic structure</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/me/facilities">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-warning text-center h-full">
                <CardHeader>
                  <FlaskConical className="h-10 w-10 mx-auto mb-2 text-warning" />
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Labs, research centers, and infrastructure</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/me/admissions">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-warning text-center h-full">
                <CardHeader>
                  <Users className="h-10 w-10 mx-auto mb-2 text-warning" />
                  <CardTitle>Admissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Eligibility, process, and fee structure</CardDescription>
                </CardContent>
              </Card>
            </Link>

            <Link to="/me/activities">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-warning text-center h-full">
                <CardHeader>
                  <Zap className="h-10 w-10 mx-auto mb-2 text-warning" />
                  <CardTitle>Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Research forums, workshops, and events</CardDescription>
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

export default MEAbout;


