import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MBAAcademics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">MBA Academics</h1>
          <p className="text-muted-foreground text-lg">
            A practice-oriented curriculum with case pedagogy, analytics labs, and industry internships ensures graduates are future ready.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Academic Structure</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Six trimesters with 30+ core and elective courses</li>
                <li>Summer internship and winter project components</li>
                <li>Harvard & Ivey case studies integrated into coursework</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Value Added Modules</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Financial modelling, SAP FICO, Tableau and Power BI</li>
                <li>Design thinking workshops with industry mentors</li>
                <li>Global immersion and study tour opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MBAAcademics;


