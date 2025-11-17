import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, CheckCircle, Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const SchoolAdmissions = () => {
  const admissionProcess = [
    {
      step: 1,
      title: "Inquiry & Application",
      description: "Visit the school or contact the admission office to obtain the application form. Fill in all required details accurately.",
    },
    {
      step: 2,
      title: "Document Submission",
      description: "Submit the completed application form along with required documents including birth certificate, previous school records, and photographs.",
    },
    {
      step: 3,
      title: "Interaction/Assessment",
      description: "For certain classes, an interaction session or assessment may be conducted to understand the student's readiness and needs.",
    },
    {
      step: 4,
      title: "Admission Confirmation",
      description: "Upon selection, complete the admission formalities including fee payment and document verification to secure the admission.",
    },
  ];

  const requiredDocuments = [
    "Birth Certificate (original and photocopy)",
    "Previous school leaving certificate/transfer certificate",
    "Mark sheets of previous classes",
    "Aadhaar Card (photocopy)",
    "Passport size photographs (4-6 copies)",
    "Medical certificate (if applicable)",
    "Caste certificate (if applicable)",
    "Income certificate (for scholarship, if applicable)",
  ];

  const eligibilityCriteria = [
    {
      level: "Kindergarten",
      criteria: "Child should be 3-4 years old as on 1st June of the academic year",
    },
    {
      level: "Class 1",
      criteria: "Child should be 5-6 years old and should have completed Kindergarten",
    },
    {
      level: "Class 6-10",
      criteria: "Pass certificate from previous class with minimum required percentage",
    },
    {
      level: "Class 11 (Junior College)",
      criteria: "Pass certificate of Class 10 with minimum required percentage. Subject-specific eligibility for different streams.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Begin your educational journey with us. We welcome students from Kindergarten to Class 12.
          </p>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Admission Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionProcess.map((process, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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

      {/* Eligibility Criteria */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eligibilityCriteria.map((item, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-1">{item.level}</h3>
                    <p className="text-muted-foreground">{item.criteria}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Required Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-muted-foreground">{doc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Important Dates */}
      <section className="py-16 px-4 bg-muted/30">
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
                  <p className="text-muted-foreground">The academic year typically starts in June. Admission process begins in March-April.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4">
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
                    <a href="tel:02532373547" className="hover:text-primary transition-colors">0253-237-3547</a><br />
                    <a href="tel:7768004585" className="hover:text-primary transition-colors">7768004585</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:ggsps.nsk@ggsf.edu.in" className="hover:text-primary transition-colors break-all">
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

export default SchoolAdmissions;

