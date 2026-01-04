import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CollegeCards from "@/components/CollegeCards";
import EventsCalendar from "@/components/EventsCalendar";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import DownloadsSection from "@/components/DownloadsSection";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";
import Footer from "@/components/Footer";
import ResearchHighlights from "@/components/ResearchHighlights";
import StudentAchievements from "@/components/StudentAchievements";
import CampusCells from "@/components/CampusCells";
import AlumniSection from "@/components/AlumniSection";
import NoticesAnnouncements from "@/components/NoticesAnnouncements";
import EnrollmentStatistics from "@/components/EnrollmentStatistics";
import EnhancedFacilities from "@/components/EnhancedFacilities";
import QuickAccessLinks from "@/components/QuickAccessLinks";
import PublicDisclosure from "@/components/PublicDisclosure";
import TPCell from "@/components/TPCell";
import AnnouncementsBar from "@/components/AnnouncementsBar";
import NAACAccreditation from "@/components/NAACAccreditation";
import NBAAccreditation from "@/components/NBAAccreditation";
import ChatbotInfo from "@/components/ChatbotInfo";
import CampusInfrastructure from "@/components/CampusInfrastructure";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AnnouncementsBar />
        <div className="gsap-fade">
          <Hero />
        </div>
        <div className="gsap-fade">
          <CollegeCards />
        </div>
        <div className="gsap-fade">
          <NAACAccreditation />
        </div>
        <div className="gsap-fade">
          <NBAAccreditation />
        </div>
        <div className="gsap-fade">
          <NoticesAnnouncements />
        </div>
        <div className="gsap-fade">
          <ResearchHighlights />
        </div>
        <div className="gsap-fade">
          <StudentAchievements />
        </div>
        <div className="gsap-fade">
          <EnhancedFacilities />
        </div>
        <div className="gsap-fade">
          <CampusInfrastructure />
        </div>
        <div className="gsap-fade">
          <ChatbotInfo />
        </div>
        <div className="gsap-fade">
          <CampusCells />
        </div>
        <div className="gsap-fade">
          <TPCell />
        </div>
        <div className="gsap-fade">
          <AlumniSection />
        </div>
        <div className="gsap-fade">
          <EnrollmentStatistics />
        </div>
        <div className="gsap-fade">
          <EventsCalendar />
        </div>
        <div className="gsap-fade">
          <GallerySection />
        </div>
        <div className="gsap-fade">
          <TestimonialsSection />
        </div>
        <div className="gsap-fade">
          <QuickAccessLinks />
        </div>
        <div className="gsap-fade">
          <PublicDisclosure />
        </div>
        <div className="gsap-fade">
          <DownloadsSection />
        </div>
        <div className="gsap-fade">
          <FAQSection />
        </div>
        <div className="gsap-fade">
          <ContactForm />
        </div>
        <div className="gsap-fade">
          <LocationMap />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
