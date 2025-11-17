import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import EventsCalendar from "@/components/EventsCalendar";
import Footer from "@/components/Footer";

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <div className="py-12">
        <EventsCalendar />
      </div>
      <Footer />
    </div>
  );
};

export default Events;
