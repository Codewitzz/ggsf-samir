import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

const Gallery = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />
      <div className="py-12">
        <GallerySection />
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
