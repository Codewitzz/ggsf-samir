import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, GraduationCap, Users, Award, Calendar, CheckCircle } from "lucide-react";

const SchoolAcademics = () => {
  const academicLevels = [
    {
      title: "Kindergarten",
      description: "Foundation years focusing on play-based learning and early development",
      features: ["Play-based learning", "Basic numeracy and literacy", "Creative activities", "Social skills development"],
    },
    {
      title: "Primary (Classes 1-5)",
      description: "Building strong fundamentals in core subjects",
      features: ["English, Hindi, Mathematics", "Environmental Studies", "Computer Basics", "Art and Craft", "Physical Education"],
    },
    {
      title: "Middle (Classes 6-8)",
      description: "Expanding knowledge base with specialized subjects",
      features: ["English, Hindi, Mathematics", "Science (Physics, Chemistry, Biology)", "Social Studies", "Computer Science", "Art, Music, Physical Education"],
    },
    {
      title: "Secondary (Classes 9-10)",
      description: "Preparing for board examinations with focused curriculum",
      features: ["English, Hindi, Mathematics", "Science (Physics, Chemistry, Biology)", "Social Science", "Computer Applications", "Physical Education"],
    },
    {
      title: "Junior College (Classes 11-12)",
      description: "Specialized streams for higher education preparation",
      features: ["Science Stream (PCM/PCB)", "Commerce Stream", "Arts Stream", "Board exam preparation", "Career guidance"],
    },
  ];

  const teachingMethodology = [
    "Student-centric learning approach",
    "Interactive classroom sessions",
    "Regular assessments and feedback",
    "Remedial classes for slow learners",
    "Enrichment programs for advanced learners",
    "Project-based learning",
    "Digital learning resources",
    "Parent-teacher collaboration",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Academics</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Comprehensive academic programs designed to nurture intellectual growth and academic excellence
          </p>
        </div>
      </section>

      {/* Academic Levels */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Academic Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicLevels.map((level, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{level.title}</CardTitle>
                  <CardDescription>{level.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {level.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl mb-4">Teaching Methodology</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teachingMethodology.map((method, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{method}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Assessment System */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Assessment & Evaluation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Continuous Assessment</h3>
                <p className="text-muted-foreground">
                  We follow a comprehensive assessment system that includes regular class tests, unit tests, 
                  periodic assessments, and annual examinations. This ensures continuous evaluation and 
                  improvement of student performance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Board Examinations</h3>
                <p className="text-muted-foreground">
                  For Classes 10 and 12, students appear for CBSE board examinations. We provide extensive 
                  preparation support including mock tests, revision sessions, and personalized guidance.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Progress Reports</h3>
                <p className="text-muted-foreground">
                  Regular progress reports are shared with parents to keep them informed about their child's 
                  academic performance and areas for improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolAcademics;

