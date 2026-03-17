import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, CheckCircle, GraduationCap, Presentation, Users } from "lucide-react";

const BBAAcademics = () => {
  const semesterHighlights = [
    {
      semester: "Semester I",
      topics: ["Principles of Management", "Business Communication", "Business Mathematics", "Microeconomics", "Computer Fundamentals"],
    },
    {
      semester: "Semester II",
      topics: ["Organizational Behaviour", "Financial Accounting", "Business Statistics", "Macroeconomics", "Environmental Studies"],
    },
    {
      semester: "Semester III",
      topics: ["Marketing Management", "Human Resource Management", "Business Law", "Cost Accounting", "Entrepreneurship Basics"],
    },
    {
      semester: "Semester IV",
      topics: ["Operations Management", "Banking & Finance Basics", "Research Methods", "Consumer Behaviour", "Business Analytics Fundamentals"],
    },
    {
      semester: "Semester V",
      topics: ["Strategic Management", "Sales & Distribution", "Digital Marketing Basics", "Project Work / Case Studies", "Internship Preparation"],
    },
    {
      semester: "Semester VI",
      topics: ["Business Ethics & Corporate Governance", "Management Information Systems", "Summer Internship / Viva", "Capstone Project", "Placement Readiness"],
    },
  ];

  const pedagogy = [
    "Interactive lectures and concept sessions",
    "Case studies and business simulations",
    "Group discussions and presentations",
    "Industry talks, workshops, and visits",
    "Continuous internal evaluation (assignments, tests, presentations)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">B.B.A. Academics</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            A structured semester-wise learning journey focused on management fundamentals, skills, and career readiness.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Duration", value: "3 Years (6 Semesters)", icon: GraduationCap },
              { title: "Pattern", value: "Semester System", icon: BookOpen },
              { title: "Assessment", value: "CIE + End-Sem Exams", icon: Presentation },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg font-semibold">{item.value}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mb-10">
            <CardHeader>
              <CardTitle className="text-2xl">Pedagogy</CardTitle>
              <CardDescription>How learning happens across the B.B.A. program.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pedagogy.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {semesterHighlights.map((sem) => (
              <Card key={sem.semester} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{sem.semester}</CardTitle>
                      <CardDescription>Key subjects and focus areas</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {sem.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BBAAcademics;

