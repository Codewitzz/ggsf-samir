import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <div className="py-12">
        <TestimonialsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
