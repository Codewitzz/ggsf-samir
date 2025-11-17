import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import FeeStructure from "@/components/FeeStructure";

const MEAdmissions = () => {
  const admissionProcess = [
    {
      step: 1,
      title: "Application",
      description: "Fill out the online application form with all required details and upload necessary documents.",
    },
    {
      step: 2,
      title: "Entrance Exam",
      description: "Appear for GATE or equivalent entrance examination and submit valid scores (preferred but not mandatory).",
    },
    {
      step: 3,
      title: "Written Test & Interview",
      description: "Shortlisted candidates will be called for written test and personal interview.",
    },
    {
      step: 4,
      title: "Admission Confirmation",
      description: "Upon selection, complete the admission formalities including fee payment and document verification.",
    },
  ];

  const requiredDocuments = [
    "Bachelor's degree certificate in Engineering/Technology (original and photocopy)",
    "Mark sheets of all semesters/years (original and photocopy)",
    "GATE scorecard (if applicable)",
    "Aadhaar Card (photocopy)",
    "Passport size photographs (4-6 copies)",
    "Caste certificate (if applicable)",
    "Income certificate (for scholarship, if applicable)",
    "Migration certificate (if applicable)",
  ];

  const eligibilityCriteria = {
    academic: "Bachelor's degree in Engineering/Technology from a recognized university",
    percentage: "Minimum 50% aggregate marks (45% for reserved categories)",
    entrance: "Valid GATE score preferred but not mandatory",
    finalYear: "Candidates appearing for final year examination can also apply",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warning to-secondary text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">ME Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Begin your journey to become a research-oriented engineer. Join our ME program and advance your career.
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionProcess.map((process, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-warning">{process.step}</span>
                  </div>
                  <CardTitle className="text-lg mb-2">{process.title}</CardTitle>
                  <CardDescription>{process.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <FeeStructure
            title="ME Fee Structure (Indicative)"
            subtitle="First year fees and recurring charges"
            accent="warning"
            rows={[
              { item: "Tuition Fee (per year)", amount: "1,10,000" },
              { item: "University/Exam Fees", amount: "10,000" },
              { item: "Research & Lab Resources", amount: "10,000" },
              { item: "Library & Digital Resources", amount: "7,500" },
              { item: "Development Fee", amount: "10,000" },
              { item: "Caution Deposit (Refundable)", amount: "5,000", note: "One-time" },
            ]}
            footerNote="Fees shown are indicative and subject to periodic revision as per institutional norms."
          />
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-warning pl-4">
                  <h3 className="font-semibold text-lg mb-1">Academic Qualification</h3>
                  <p className="text-muted-foreground">{eligibilityCriteria.academic}</p>
                </div>
                <div className="border-l-4 border-warning pl-4">
                  <h3 className="font-semibold text-lg mb-1">Minimum Percentage</h3>
                  <p className="text-muted-foreground">{eligibilityCriteria.percentage}</p>
                </div>
                <div className="border-l-4 border-warning pl-4">
                  <h3 className="font-semibold text-lg mb-1">Entrance Examination</h3>
                  <p className="text-muted-foreground">{eligibilityCriteria.entrance}</p>
                </div>
                <div className="border-l-4 border-warning pl-4">
                  <h3 className="font-semibold text-lg mb-1">Final Year Students</h3>
                  <p className="text-muted-foreground">{eligibilityCriteria.finalYear}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{doc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Academic Year</h3>
                  <p className="text-muted-foreground">
                    The academic year typically starts in July. Admission process begins in March-April.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
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

      {/* Contact Information */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Contact for Admissions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:02532373547" className="hover:text-warning transition-colors">0253-237-3547</a><br />
                    <a href="tel:7768004585" className="hover:text-warning transition-colors">7768004585</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:ggsps.nsk@ggsf.edu.in" className="hover:text-warning transition-colors break-all">
                      ggsps.nsk@ggsf.edu.in
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

export default MEAdmissions;


