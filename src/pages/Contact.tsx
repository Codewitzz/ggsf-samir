import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <ContactForm />
      <LocationMap />
      <Footer />
      <AIChatBot />
    </div>
  );
};

export default Contact;
