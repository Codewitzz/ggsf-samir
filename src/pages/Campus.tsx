import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CampusInfrastructure from "@/components/CampusInfrastructure";
import CampusCells from "@/components/CampusCells";

const Campus = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-info to-primary text-primary-foreground py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus</h1>
          <p className="text-xl max-w-3xl mx-auto text-primary-foreground/90">
            Explore our vibrant campus, world-class infrastructure, and student-centric support
            systems that enable holistic development.
          </p>
        </div>
      </section>

      {/* Campus Infrastructure */}
      <CampusInfrastructure />

      {/* Campus Cells & Committees */}
      <CampusCells />

      <Footer />
    </div>
  );
};

export default Campus;

