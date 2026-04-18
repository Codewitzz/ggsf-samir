import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import DepartmentImagesSection from "@/components/DepartmentImagesSection";
import { getAdminImageUrl } from "@/lib/adminImages/getAdminImageUrl";

const SLIDE_DURATION = 5000;

const MEAbout = () => {
  const meDepartments = [
    {
      name: "ME - Computer Engineering (AI & DS)",
      seats: "12 seats",
      description:
        "Advanced postgraduate specialization in artificial intelligence, machine learning, and data science with a research-driven curriculum.",
      details:
        "Deep learning, big data engineering, and MLOps with NVIDIA-powered clusters, industry datasets, publication mentorship, and cloud-native pipelines.",
      highlights: ["NVIDIA GPU clusters", "MLOps & big data pipelines", "Industry projects & research papers"],
    },
    {
      name: "ME - Mechanical Engineering (Automation and Robotics)",
      seats: "12 seats",
      description:
        "Integrates mechanical systems with robotics, mechatronics, and Industry 4.0 automation for smart manufacturing leadership.",
      details:
        "Industrial robotics, cobots, PLC/SCADA, digital twins, and smart factory simulations with strong industry mentorship and lab immersion.",
      highlights: ["Industrial robots & cobots", "PLC/SCADA & digital twins", "Smart factory simulations"],
    },
  ];

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

  // Helper function to get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const normalizePublicImagePath = (image?: string) => {
    if (!image) return undefined;
    if (/^https?:\/\//i.test(image)) return image;
    const trimmed = image.trim().replace(/^public\//i, "/");
    const normalized = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return getAdminImageUrl(normalized, normalized);
  };

  const facultyMembers = [ 
    {
    name: "Dr . Nita M. Thakare (HOD) ",
    image: "/Faculty/Nita-thakare.jpg",
    qualifications: "PhD (CSE)",
    experience: "29+ years",
    areaOfInterest: "  Data Structures , OOP, Machine Learning",
  },
    {
      name: "Dr. Umakant D Butkar",
      designation: "Head of Department",
      qualifications: "Ph.D, Post Doc USA - Computer Science and Engineering",
      experience: "16 years",
      image: "/Faculty/umakant-butkar.jpg",
      areaOfInterest: "Computer Network",
    },
    {
      name: "Dr. Sweety G. Jachak",
      designation: "Assistant Professor and PG coordinator",
      qualifications: "PhD, M.Tech CSE",
      experience: "16 years",
      areaOfInterest: "Cloud computing, distributed systems, deep learning",
    },
    {
      name: "Mr. Sandeep G Shukla",
      designation: "Assistant Professor",
      qualifications: "M.Tech I.T., PhD (Pursuing)",
      experience: "17 years",
      areaOfInterest: "Cloud Computing and IoT",
    },
    
    {
      name: "Prof. Pradnya K Bachhav",
      image: "/Faculty/pradnya-bachhav.jpg",
      qualifications: "M.E. Computer , PhD (Pursuing)",
      experience: "14+ years",
      areaOfInterest: "Cloud Computing, Networking, Artificial Intelligence",
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
                <img
                  src={getAdminImageUrl(`me_about_${slide.id}`, slide.image)}
                  data-admin-slot={`me_about_${slide.id}`}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/20" />
              </div>
            ))}
          </div>
        </div>

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

      {/* ME Departments */}
      <section id="me-departments" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">M.E. Departments</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our postgraduate engineering specializations designed for research, innovation, and industry impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {meDepartments.map((dept) => (
              <Card key={dept.name} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-xl leading-tight">{dept.name}</CardTitle>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
                      {dept.seats}
                    </span>
                  </div>
                  <CardDescription className="text-muted-foreground">{dept.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">{dept.details}</p>
                  <div className="flex flex-wrap gap-2">
                    {dept.highlights.map((item) => (
                      <span key={item} className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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

      <DepartmentImagesSection
        title="M.E. — Images"
        subtitle="A quick glimpse of research, labs and industry collaboration"
        images={[
          {
            title: "Research & Innovation",
            image: "https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Advanced Laboratories",
            image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
          },
          {
            title: "Mentorship & Seminars",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
          },
        ]}
      />

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

      {/* Faculty Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Our Faculty</h2>
            <div className="h-1 w-24 bg-warning rounded-full mx-auto"></div>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Meet our experienced and dedicated faculty members who bring industry expertise and academic excellence to
              the classroom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {facultyMembers.map((member, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 border-warning/20 bg-gradient-to-br from-background via-background to-warning/5 hover:shadow-2xl hover:border-warning/50 hover:-translate-y-2 transition-all duration-500 rounded-xl"
              >
                {/* Decorative top border */}
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-warning via-warning to-warning opacity-80" />
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-warning/0 to-warning/0 group-hover:from-warning/5 group-hover:to-warning/5 transition-all duration-500 rounded-xl" />
                
                <CardHeader className="pb-4 relative z-10">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative">
                      <Avatar className="h-32 w-32 ring-4 ring-warning/20 bg-background shadow-lg group-hover:ring-warning/50 group-hover:scale-105 transition-all duration-500">
                        <AvatarImage 
                          src={normalizePublicImagePath(member.image) || "/placeholder.svg"} 
                          alt={member.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-warning/20 to-warning/20 text-warning text-2xl font-bold">
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      {/* Decorative circle behind avatar */}
                      <div className="absolute inset-0 rounded-full bg-warning/10 blur-xl group-hover:bg-warning/20 transition-all duration-500 -z-10" />
                    </div>
                    <CardTitle className="text-lg font-bold mb-0 group-hover:text-warning transition-colors duration-300 leading-tight px-2">
                      {member.name.trim()}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{member.designation}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2 space-y-3 relative z-10 pb-6">
                  <div className="rounded-lg bg-gradient-to-br from-warning/5 to-warning/5 border border-warning/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-warning/20 transition-all duration-300">
                    <p className="text-xs font-bold text-warning mb-2 uppercase tracking-wider">Qualifications</p>
                    <p className="text-sm text-foreground leading-relaxed break-words">{member.qualifications || "—"}</p>
                  </div>
                  
                  <div className="rounded-lg bg-gradient-to-br from-warning/5 to-warning/5 border border-warning/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-warning/20 transition-all duration-300">
                    <p className="text-xs font-bold text-warning mb-2 uppercase tracking-wider">Experience</p>
                    <p className="text-sm text-foreground font-medium">{member.experience || "—"}</p>
                  </div>
                  
                  {member.areaOfInterest && (
                    <div className="rounded-lg bg-gradient-to-br from-warning/5 to-warning/5 border border-warning/10 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-warning/20 transition-all duration-300">
                      <p className="text-xs font-bold text-warning mb-2 uppercase tracking-wider">Area of Interest</p>
                      <p className="text-sm text-foreground leading-relaxed break-words">{member.areaOfInterest}</p>
                    </div>
                  )}
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


