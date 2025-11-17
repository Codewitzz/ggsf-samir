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

const Engineering = () => {
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
      name: "Computer Engineering",
      description: "Software engineering, algorithms, and computer systems",
      slug: "computer-engineering",
    },
    {
      name: "Electronics & Communication Engineering",
      description: "Communication systems, signal processing, and electronics",
      slug: "electronics-communication",
    },
    {
      name: "Mechanical Engineering",
      description: "Design, manufacturing, and thermal systems",
      slug: "mechanical",
    },
    {
      name: "Civil Engineering",
      description: "Infrastructure, construction, and structural engineering",
      slug: "civil",
    },
    {
      name: "Electrical Engineering",
      description: "Power systems, control systems, and electrical machines",
      slug: "electrical",
    },
    {
      name: "Information Technology",
      description: "IT systems, networking, and information management",
      slug: "information-technology",
    },
    {
      name: "Artificial Intelligence & Data Science",
      description: "AI, ML, data analytics, and intelligent systems",
      slug: "artificial-intelligence-data-science",
    },
    {
      name: "Automation & Robotics",
      description: "Industry 4.0 automation, robotics, and mechatronics",
      slug: "automation-robotics",
    },
    {
      name: "Basic Engineering Science",
      description: "Mathematics, physics, chemistry, and foundational engineering",
      slug: "basic-engineering-science",
    },
    {
      name: "Management Studies (MBA, BBA)",
      description: "Business management, analytics, finance, HR and operations",
      slug: "management-studies",
    },
    {
      name: "Post Graduate Program (M.E.)",
      description: "Advanced engineering specialisations and research",
      slug: "post-graduate",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info to-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-6 inline-block">
            <img src={engineeringIcon} alt="Engineering" className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Engineering College</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Building tomorrow's engineers with cutting-edge technology and innovative learning
          </p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Departments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <Link
                key={index}
                to={`/engineering/departments/${dept.slug}`}
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer hover:border-primary">
                  <CardContent className="p-6 text-center">
                    <p className="font-medium text-foreground">{dept.name}</p>
                    <p className="text-sm text-muted-foreground mt-2">{dept.description}</p>
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
