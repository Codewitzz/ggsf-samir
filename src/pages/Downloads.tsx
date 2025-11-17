import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import DownloadsSection from "@/components/DownloadsSection";
import Footer from "@/components/Footer";

const Downloads = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <div className="py-12">
        <DownloadsSection />
      </div>
      <Footer />
    </div>
  );
};

export default Downloads;
