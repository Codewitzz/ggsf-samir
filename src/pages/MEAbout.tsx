import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MEAbout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">About M.E. Programs</h1>
          <p className="text-muted-foreground text-lg">
            The Masters in Engineering programs offer advanced specialisations in design, thermal, electronics, and
            computer engineering domains with strong research orientation and industry collaboration.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Program Strengths</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AICTE approved with curriculum aligned to emerging technologies</li>
                <li>Research mentorship from PhD faculty and adjunct industry experts</li>
                <li>Access to advanced laboratories and simulation tools</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Research Domains</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Automotive electronics, EV technology, and control systems</li>
                <li>Thermal and energy systems using CFD simulations</li>
                <li>Data science, AI, and cybersecurity for engineering applications</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MEAbout;


