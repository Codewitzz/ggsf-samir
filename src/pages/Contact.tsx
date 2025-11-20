import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <ContactForm />
      <LocationMap />
      <Footer />
    </div>
  );
};

export default Contact;
