import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";

const PolytechnicAcademics = () => {
  const courses = [
    {
      name: "Civil Engineering",
      description: "Infrastructure development and construction technology",
      link: "/polytechnic/courses/civil-engineering",
    },
    {
      name: "Computer Engineering",
      description: "Software development and computer systems",
      link: "/polytechnic/courses/computer-engineering",
    },
    {
      name: "Electrical Engineering",
      description: "Power systems and electrical technology",
      link: "/polytechnic/courses/electrical-engineering",
    },
    {
      name: "Electronics and Telecommunication Engineering",
      description: "Communication systems and electronics",
      link: "/polytechnic/courses/electronics-telecommunication-engineering",
    },
    {
      name: "Mechanical Engineering",
      description: "Manufacturing and mechanical systems",
      link: "/polytechnic/courses/mechanical-engineering",
    },
    {
      name: "Mechatronics Engineering",
      description: "Integration of mechanical, electrical, and computer engineering",
      link: "/polytechnic/courses/mechatronics-engineering",
    },
    {
      name: "Artificial Intelligence",
      description: "AI and machine learning applications",
      link: "/polytechnic/courses/artificial-intelligence",
    },
  ];

  const academicFeatures = [
    "Industry-oriented curriculum aligned with MSBTE syllabus",
    "Hands-on training in workshops and laboratories",
    "Regular industry visits and industrial training",
    "Internship opportunities with technical companies",
    "Project-based learning and mini projects",
    "Modern workshops with latest machinery",
    "Digital learning resources and e-learning platforms",
    "Continuous assessment and evaluation system",
    "Remedial classes for slow learners",
    "Skill development programs and certifications",
  ];

  const programStructure = [
    {
      year: "First Year",
      description: "Foundation courses in basic engineering and mathematics",
      courses: ["Engineering Mathematics", "Engineering Physics", "Engineering Chemistry", "Basic Engineering", "Workshop Practice"],
    },
    {
      year: "Second Year",
      description: "Core technical subjects and department-specific courses",
      courses: ["Core Technical Subjects", "Department-specific Courses", "Laboratory Work", "Industrial Training"],
    },
    {
      year: "Third Year",
      description: "Advanced courses, major project, and placement preparation",
      courses: ["Advanced Technical Courses", "Major Project", "Industrial Training", "Placement Training"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warning to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Polytechnic Academics</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Comprehensive diploma programs designed to prepare students for technical careers
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Diploma Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <Link key={index} to={course.link} className="block">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-xl mb-2">{course.name}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Program Structure */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Program Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programStructure.map((year, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-warning">{index + 1}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{year.year}</CardTitle>
                  <CardDescription>{year.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {year.courses.map((course, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Academic Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {academicFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4 bg-muted/30">
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
                <h3 className="font-semibold text-lg mb-2">Affiliation & Approvals</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Affiliated to MSBTE Mumbai</li>
                  <li>Approved by AICTE New Delhi</li>
                  <li>DTE Mumbai Approved</li>
                  <li>NBA Accredited Programs</li>
                  <li>Four Star rating by Ministry of Education (MOE)</li>
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

export default PolytechnicAcademics;

