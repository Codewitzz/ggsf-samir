import { useEffect } from "react";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import CampusInfrastructure from "@/components/CampusInfrastructure";
import CampusCells from "@/components/CampusCells";
import ImageSlider from "@/components/ImageSlider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "react-router-dom";

const Campus = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash?.replace("#", "");
    if (!hash) return;

    const el = document.getElementById(hash);
    if (!el) return;

    // allow layout to paint before scrolling
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.hash]);

  // Campus images for slider
  const campusImages = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&h=900&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&h=900&fit=crop&q=80",
  ];

  // Additional campus photos
  const campusPhotos = [
    {
      title: "Main Building",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Engineering Labs",
      image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Library",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Sports Complex",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Cafeteria",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Auditorium",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Classrooms",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Computer Lab",
      image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Campus Grounds",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Breadcrumbs />

      {/* Hero Section with Image Slider */}
      <section className="relative   overflow-hidden">
        <div className="absolute rounded-none  inset-0 z-0">
          <ImageSlider 
            images={campusImages} 
            height="h-[500px] "
            className="rounded-none  "
          />
        </div>
        <div className="relative z-10 h-[500px]  bg-black/50 py-20  px-4">
          <div className="container mt-20  mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Campus</h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Explore our vibrant campus, world-class infrastructure, and student-centric support
              systems that enable holistic development.
            </p>
          </div>
        </div>
      </section>

      {/* Campus Infrastructure */}
      <CampusInfrastructure />

      {/* Quick Campus Highlights (for menu anchors) */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-10">
          <div id="canteen-cafeteria" className="scroll-mt-28">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-64 md:min-h-[320px]">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                    alt="Canteen and Cafeteria"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-2xl">Canteen &amp; Cafeteria</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-muted-foreground space-y-2">
                    <p>
                      Hygienic food options and comfortable seating for students and staff, designed to be accessible and
                      convenient throughout the day.
                    </p>
                    <p className="text-sm">
                      Tip: Visit during breaks for quick service; the space is also used for informal group discussions.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>

          <div id="sport" className="scroll-mt-28">
            <Card className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative min-h-64 md:min-h-[320px] md:order-2">
                  <img
                    src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1200&q=80"
                    alt="Sports facilities"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                </div>
                <div className="p-6 md:p-8 md:order-1">
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-2xl">Sport</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-muted-foreground space-y-2">
                    <p>
                      Dedicated spaces and activities that encourage fitness, teamwork, and a healthy campus culture—both
                      recreational and competitive.
                    </p>
                    <p className="text-sm">
                      Regular events and tournaments are organized across the academic year.
                    </p>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Campus Photo Gallery */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Campus Gallery</h2>
            <p className="text-muted-foreground">
              A glimpse of our beautiful campus and state-of-the-art facilities
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {campusPhotos.map((photo, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-lg">{photo.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Campus Cells & Committees */}
      <CampusCells />

      <Footer />
    </div>
  );
};

export default Campus;

