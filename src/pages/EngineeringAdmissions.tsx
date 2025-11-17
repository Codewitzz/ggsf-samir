import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Clock } from "lucide-react";
import FeeStructure from "@/components/FeeStructure";

const EngineeringAdmissions = () => {
  const admissionProcess = [
    {
      step: 1,
      title: "Application",
      description:
        "Fill the online application form and upload required documents. Appear for applicable entrance exams.",
    },
    {
      step: 2,
      title: "Merit List / Counseling",
      description:
        "Merit list prepared based on entrance exam and eligibility. Counseling and branch allocation.",
    },
    {
      step: 3,
      title: "Document Verification",
      description: "Verify academic and identity documents as per the schedule.",
    },
    {
      step: 4,
      title: "Admission & Fee Payment",
      description: "Confirm admission by paying applicable fees and completing formalities.",
    },
  ];

  const requiredDocuments = [
    "10th & 12th Marksheets and Passing Certificates",
    "Entrance Exam Scorecard (JEE Main / State CET, as applicable)",
    "Transfer / Leaving Certificate",
    "Caste / Category Certificate (if applicable)",
    "Domicile / Nationality Certificate (as required)",
    "Passport size photographs",
    "Aadhaar Card",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info to-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Engineering Admissions</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Join our industry-aligned B.E. programs and build your engineering career with
            strong fundamentals and hands-on learning.
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
                  <div className="mx-auto mb-4 w-16 h-16 bg-info/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-info">{process.step}</span>
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
      <section className="py-16 px-4 bg-muted/30 gsap-fade">
        <div className="container mx-auto max-w-5xl space-y-8">
          <FeeStructure
            title="B.E. Fee Structure (Indicative) - First Year"
            accent="info"
            rows={[
              { item: "Tuition Fee (per year)", amount: "1,30,000" },
              { item: "University/Exam Fees", amount: "10,000" },
              { item: "Laboratory & Workshop", amount: "8,000" },
              { item: "Library & Digital Resources", amount: "6,500" },
              { item: "Development Fee", amount: "10,000" },
              { item: "Caution Deposit (Refundable)", amount: "5,000", note: "One-time" },
            ]}
            footerNote="Fees are indicative and subject to revision as per regulatory/institutional guidelines."
          />
        </div>
      </section>

      {/* Important Info */}
      <section className="py-16 px-4 gsap-fade">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl mb-4">Important Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Academic Year</h3>
                  <p className="text-muted-foreground">
                    Academic year generally commences in July; admissions begin around March-April.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />Saturday: 9:00 AM - 1:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Required Documents</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {requiredDocuments.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EngineeringAdmissions;


