import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";

const MBAAbout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold">About MBA Program</h1>
          <p className="text-muted-foreground text-lg">
            The MBA program blends rigorous academics with experiential learning. Students engage with industry mentors,
            live consulting projects, and global business simulations to build leadership and strategic thinking skills.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Program Highlights</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>AICTE approved, Savitribai Phule Pune University affiliated</li>
                <li>Trimester pattern with dual specialization flexibility</li>
                <li>Mentorship from corporate leaders and entrepreneurs</li>
              </ul>
            </div>
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Specializations Offered</h2>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Finance, Marketing, Human Resource Management</li>
                <li>Operations, International Business, Business Analytics</li>
                <li>Entrepreneurship development cells and incubation support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MBAAbout;


