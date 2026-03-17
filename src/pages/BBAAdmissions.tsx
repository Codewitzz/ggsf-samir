import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import FeeStructure from "@/components/FeeStructure";

const BBAAdmissions = () => {
  const admissionProcess = [
    {
      step: 1,
      title: "Application",
      description: "Fill out the admission inquiry / application and submit basic academic details.",
    },
    {
      step: 2,
      title: "Document Verification",
      description: "Submit required documents for verification as per institute guidelines.",
    },
    {
      step: 3,
      title: "Merit / Eligibility Check",
      description: "Admission is based on eligibility and merit as per applicable norms.",
    },
    {
      step: 4,
      title: "Admission Confirmation",
      description: "Complete fee payment and confirm admission as per timelines.",
    },
  ];

  const requiredDocuments = [
    "10th Marksheet (original and photocopy)",
    "12th Marksheet (original and photocopy)",
    "Leaving / Transfer Certificate",
    "Aadhaar Card (photocopy)",
    "Passport size photographs (4-6 copies)",
    "Caste certificate (if applicable)",
    "Income / EWS certificate (if applicable)",
  ];

  const eligibilityCriteria = {
    academic: "Passed 10+2 (HSC) or equivalent from a recognized board",
    percentage: "Minimum marks as per applicable norms (relaxation as per category rules)",
    stream: "Open to students from Commerce / Arts / Science (as per university/institute norms)",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">B.B.A. Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Start your management journey with an undergraduate program focused on skills, fundamentals, and career
            readiness.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionProcess.map((process) => (
              <Card key={process.step} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{process.step}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <FeeStructure
            title="BBA Fee Structure (Indicative)"
            subtitle="First year fees and recurring charges"
            accent="secondary"
            rows={[
              { item: "Tuition Fee (per year)", amount: "75,000" },
              { item: "University/Exam Fees", amount: "8,000" },
              { item: "Library & Digital Resources", amount: "5,000" },
              { item: "Development Fee", amount: "7,500" },
              { item: "Caution Deposit (Refundable)", amount: "5,000", note: "One-time" },
            ]}
            footerNote="Fees shown are indicative and subject to periodic revision as per institutional norms."
          />
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg mb-1">Academic Qualification</h3>
                <p className="text-muted-foreground">{eligibilityCriteria.academic}</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg mb-1">Minimum Percentage</h3>
                <p className="text-muted-foreground">{eligibilityCriteria.percentage}</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <h3 className="font-semibold text-lg mb-1">Stream</h3>
                <p className="text-muted-foreground">{eligibilityCriteria.stream}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requiredDocuments.map((doc) => (
                  <div key={doc} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{doc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Academic Year</h3>
                  <p className="text-muted-foreground">Academic year typically starts in July (as per university schedule).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Contact for Admissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:02532372766" className="hover:text-primary transition-colors">0253-237-2766</a><br />
                    <a href="tel:7768004581" className="hover:text-primary transition-colors">7768004581</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:gcoerc.nashik@ggsf.edu.in" className="hover:text-primary transition-colors break-all">
                      gcoerc.nashik@ggsf.edu.in
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Button asChild size="lg">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BBAAdmissions;

