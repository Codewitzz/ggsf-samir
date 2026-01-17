import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cpu,
  Zap,
  Code,
  Wrench,
  Award,
  Users,
  GraduationCap,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import engineeringIcon from "@/assets/engineering-icon.png";
import ResearchHighlights from "@/components/ResearchHighlights";
import CampusCells from "@/components/CampusCells";
import TPCell from "@/components/TPCell";
import NoticesAnnouncements from "@/components/NoticesAnnouncements";
import NBAAccreditation from "@/components/NBAAccreditation";
import TestimonialsSection from "@/components/TestimonialsSection";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 5000;

const Engineering = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "engineering-innovation",
        title: "Engineering Excellence & Innovation",
        description: "Cutting-edge technology and innovative learning to build tomorrow's engineers",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "engineering-labs",
        title: "State-of-the-Art Laboratories",
        description: "Modern labs with latest equipment and technology for hands-on learning",
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "engineering-industry",
        title: "Strong Industry Connections",
        description: "Partnerships with leading companies for projects, internships, and placements",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?auto=format&fit=crop&w=1600&q=80",
      },
      {
        id: "engineering-research",
        title: "Research & Development Focus",
        description: "Active research culture with funded projects and patent mentorship",
        image: "https://images.unsplash.com/photo-1532619675605-1ede6c7edf47?auto=format&fit=crop&w=1600&q=80",
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
      icon: Cpu,
      title: "Modern Labs",
      description: "State-of-the-art laboratories with latest equipment and technology",
    },
    {
      icon: Code,
      title: "Industry Projects",
      description: "Real-world projects in collaboration with leading companies",
    },
    {
      icon: Zap,
      title: "Research Focus",
      description: "Strong emphasis on innovation and research activities",
    },
    {
      icon: Wrench,
      title: "Practical Training",
      description: "Hands-on training with industry-standard tools and practices",
    },
  ];

  const departments = [
    {
      name: "Department of Basic Engineering Science",
      description: "Foundation year program covering mathematics, physics, chemistry, and basic engineering principles to prepare students for specialized engineering streams.",
      slug: "basic-engineering-science",
      seats: "1st Year",
      details: "Comprehensive foundation in basic sciences and mathematics with hands-on experience in engineering workshops and introduction to computer programming.",
    },
    {
      name: "Department of Civil Engineering",
      description: "Building the infrastructure that shapes our cities and communities through sustainable construction practices and modern engineering solutions.",
      slug: "civil",
      seats: "60 seats",
      details: "Comprehensive civil engineering laboratories with field visits, modern surveying equipment, and focus on sustainable construction practices.",
    },
    {
      name: "Department of Computer Engineering",
      description: "Leading the digital revolution with cutting-edge programming, software development, computer systems, and industry partnerships with leading tech companies.",
      slug: "computer-engineering",
      seats: "120 seats",
      details: "State-of-the-art computer labs with latest hardware, active participation in coding competitions, internship opportunities with top IT firms, and research projects in AI and Machine Learning.",
    },
    {
      name: "Department of Electrical Engineering",
      description: "Powering the future with electrical systems, renewable energy solutions, smart grid technologies, and automation systems.",
      slug: "electrical",
      seats: "60 seats",
      details: "Advanced electrical engineering laboratories with training in renewable energy systems, industry partnerships with power companies, and focus on smart grid and automation.",
    },
    {
      name: "Department of Mechanical Engineering",
      description: "Designing and manufacturing the machines and systems that power our world with industry-standard CAD/CAM software and automation training.",
      slug: "mechanical",
      seats: "60 seats",
      details: "Well-equipped workshops and manufacturing labs, industry-standard CAD/CAM software, automation and robotics training, and strong placement record in manufacturing sector.",
    },
    {
      name: "Department of Artificial Intelligence and Data Science",
      description: "Pioneering AI, ML, data analytics, and intelligent systems with deep learning labs, NVIDIA-powered clusters, and global AI hackathons.",
      slug: "artificial-intelligence-data-science",
      seats: "120 seats",
      details: "Deep learning labs, NVIDIA-powered clusters, global AI hackathons, industry partnerships, and research projects in machine learning and data science.",
    },
    {
      name: "Department of Automation and Robotics",
      description: "Industry 4.0 automation, robotics, and mechatronics with PLC training, cobots, and Bosch-Siemens excellence centre partnerships.",
      slug: "automation-robotics",
      seats: "60 seats",
      details: "Industry 4.0 training arena with PLC, cobots, and Bosch-Siemens excellence centre. Focus on automation systems, robotics, and mechatronics for modern manufacturing.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section with Image Slider */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-info to-primary">
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
              <img
                src={engineeringIcon}
                alt="Engineering"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Engineering College</h1>
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
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-info/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-info" />
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

      {/* Departments */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Engineering Departments</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our comprehensive range of engineering departments, each offering specialized programs designed to prepare students for successful careers in their chosen fields.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Link
                key={index}
                to={`/engineering/departments/${dept.slug}`}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-primary h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg font-semibold text-foreground leading-tight text-left">
                        {dept.name}
                      </CardTitle>
                    </div>
                    {dept.seats && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {dept.seats}
                        </span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 flex-grow flex flex-col">
                    <CardDescription className="text-sm text-muted-foreground mb-3 text-left leading-relaxed">
                      {dept.description}
                    </CardDescription>
                    {dept.details && (
                      <div className="mt-auto pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground text-left leading-relaxed">
                          {dept.details}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Highlights of GCOERC</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Only Engineering College in Nashik having Industrialists and Entrepreneurs as pillars of Management",
              "Among the five Engineering Colleges in Nashik which is NAAC Accredited with B+ Grade",
              "Mechanical Engineering Program accredited by National Board of Accreditation (NBA) - 3 years validity until 2028",
              "Strong team of 100+ highly qualified, experienced, and committed faculty members",
              "State-of-the-art laboratories with latest technology equipment in all departments",
              "Very strong Industry–Institute connections",
              "Industry Institute Partnership Excellence Centre with SIEMENS, BOSCH, SATCOM",
              "Sanctioned MOUs with CISCO Networking, AWS Academy, Microchip, Blueprism, and Red Hat Academy",
              "Workshops and training in Siemens, Bosch, Robotics, Mechatronics as per Industry 4.0 and PMKVY Skill Development Centre",
              "Emphasis on 100% coverage of syllabus and 100% attendance of students",
              "Government scholarship schemes for SC / ST / NT / SBC / OBC & EBC category students as per norms",
              "Separate and well-furnished hostels for boys and girls",
              "Dedicated 100 Mbps leased line, Wi-Fi enabled internet campus",
              "Elaborate campus monitoring through strategically installed CCTV cameras",
              "Well-stocked library with books, online and printed journals",
              "Purposefully designed auditorium with 400+ seating capacity",
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                <p className="text-muted-foreground">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "NBA Accreditation",
                description:
                  "Mechanical Engineering Department successfully re-accredited by NBA for 3 years until 2028",
                icon: Award,
              },
              {
                title: "NAAC B+ Grade",
                description:
                  "Ranked 62nd across India and positioned in the GOLD Band Institution of Excellence category",
                icon: GraduationCap,
              },
              {
                title: "Skill Development Leadership",
                description: "Principal Dr. Neelkanth G Nikam received Skill Development Leadership Award",
                icon: Award,
              },
              {
                title: "Industry Partnerships",
                description: "Strong partnerships with SIEMENS, BOSCH, CISCO, AWS Academy, and more",
                icon: Briefcase,
              },
              {
                title: "Research Excellence",
                description: "Active research and development activities with industry collaborations",
                icon: Code,
              },
              {
                title: "Placement Success",
                description: "Excellent placement record with leading companies across various sectors",
                icon: Users,
              },
            ].map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-info/10 rounded-full flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-info" />
                    </div>
                    <CardTitle className="text-lg text-center">{achievement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{achievement.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Program Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Duration</h3>
                <p className="text-muted-foreground">4 Years (8 Semesters)</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Eligibility</h3>
                <p className="text-muted-foreground">
                  10+2 with Physics, Chemistry, and Mathematics. Valid JEE Main or state entrance exam scores.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Key Highlights</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>AICTE approved programs</li>
                  <li>Industry-integrated curriculum</li>
                  <li>Research and innovation centers</li>
                  <li>International collaborations</li>
                  <li>100% placement assistance</li>
                  <li>Entrepreneurship incubation support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <NoticesAnnouncements />
      <NBAAccreditation />
      <ResearchHighlights />
      <CampusCells />
      <TPCell />
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default Engineering;
