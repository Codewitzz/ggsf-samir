import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MEFacilities = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">M.E. Facilities</h1>
          <p className="text-muted-foreground text-lg">
            Scholars leverage domain-specific laboratories, simulation centres, and research infrastructure to
            prototype, validate, and publish their innovations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Laboratories</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Advanced CAD/CAM & Rapid Prototyping Lab</li>
                <li>Automation & Robotics Lab with PLC/SCADA systems</li>
                <li>High Performance Computing lab for AI/ML workloads</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Research Amenities</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Dedicated research carrels and conference rooms</li>
                <li>Patent facilitation centre and technology transfer support</li>
                <li>Access to national innovation and incubation networks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MEFacilities;


