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
  Building,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";
import mbaIcon from "@/assets/mba-icon.png";
import { cn } from "@/lib/utils";
import { getAdminImageUrl } from "@/lib/adminImages/getAdminImageUrl";
import DepartmentImagesSection from "@/components/DepartmentImagesSection";

const SLIDE_DURATION = 5000;

const MBAAbout = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "mba-academic",
        title: "Rigorous Academic Excellence",
        description: "Industry-aligned curriculum with latest business trends and best practices",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-experiential",
        title: "Experiential Learning",
        description: "Live projects, case studies, and internships with leading corporations",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-mentorship",
        title: "Industry Mentorship",
        description: "Learn from corporate leaders, entrepreneurs, and industry practitioners",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "mba-networking",
        title: "Strong Professional Network",
        description: "Connect with alumni, industry leaders, and build lifelong relationships",
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
                <img
                  src={getAdminImageUrl(`mba_about_${slide.id}`, slide.image)}
                  data-admin-slot={`mba_about_${slide.id}`}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">About MBA Program</h1>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About MBA Program</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The MBA program blends rigorous academics with experiential learning. Students engage with industry
              mentors, live consulting projects, and global business simulations to build leadership and strategic
              thinking skills. Our program is designed to create future business leaders who can drive innovation and
              transformation in the corporate world.
            </p>
          </div>
        </div>
      </section>

      {/* Program Highlights & Specializations */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Program Highlights</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>AICTE approved, Savitribai Phule Pune University affiliated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Trimester pattern with dual specialization flexibility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Mentorship from corporate leaders and entrepreneurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Industry internships and live consulting projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>State-of-the-art business simulation labs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>International exchange programs and global immersion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Entrepreneurship development cell and incubation support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>90%+ placement record with leading MNCs and corporates</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <CardTitle className="text-2xl">Specializations Offered</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Finance & Accounting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Marketing Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Human Resource Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Operations Management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>International Business</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Business Analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Entrepreneurship development cells and incubation support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Program Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>World-Class Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Industry-aligned curriculum with latest business trends and practices</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Learn from experienced professors and industry practitioners</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Industry Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Live projects, internships, and mentorship from corporate leaders</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Top Placements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>90%+ placement rate with leading companies across sectors</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <DepartmentImagesSection
        title="MBA — Images"
        subtitle="A quick glimpse of classroom learning, teamwork and professional development"
        images={[
          {
            title: "Case Discussions",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Teamwork & Presentations",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Industry Interaction",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80",
          },
        ]}
      />

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <Link to="/mba/facilities">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer hover:border-primary text-center h-full">
                <CardHeader>
                  <Building className="h-10 w-10 mx-auto mb-2 text-primary" />
                  <CardTitle>Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Campus and infrastructure</CardDescription>
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
                  <CardDescription>Eligibility and process</CardDescription>
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

export default MBAAbout;


