import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const EngineeringAcademics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">Engineering Academics</h1>
          <p className="text-muted-foreground text-lg">
            Outcome-based curriculum aligned with Savitribai Phule Pune University guidelines, strengthened with
            industry certifications, project-based learning, and domain electives spanning AI, sustainability, and Industry 4.0.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Academic Features</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Credit-based Flexible Choice Based System (FCBS)</li>
                <li>360° assessment with continuous evaluation</li>
                <li>Capstone projects in collaboration with partner industries</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Value Added Programs</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AWS Academy Cloud Practitioner</li>
                <li>Bosch Industrial Automation certification</li>
                <li>Siemens Product Lifecycle Management modules</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EngineeringAcademics;


