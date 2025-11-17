import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <div className="py-12">
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
