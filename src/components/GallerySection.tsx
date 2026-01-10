import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GallerySection = () => {
  // Using placeholder images - in production, these would be actual campus photos
  const galleryItems = [
    { id: 1, title: "Campus Overview", category: "Campus", color: "from-primary to-primary-light" },
    { id: 2, title: "Engineering Lab", category: "Facilities", color: "from-info to-primary" },
    { id: 3, title: "MBA Classroom", category: "Academics", color: "from-warning to-secondary" },
    { id: 4, title: "Library", category: "Facilities", color: "from-success to-primary" },
    { id: 5, title: "Sports Complex", category: "Campus", color: "from-secondary to-warning" },
    { id: 6, title: "Annual Fest", category: "Events", color: "from-primary-dark to-info" },
    { id: 7, title: "Engineering Workshop", category: "Academics", color: "from-warning to-primary" },
    { id: 8, title: "Auditorium", category: "Facilities", color: "from-primary to-secondary" },
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Campus Gallery</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our state-of-the-art facilities and vibrant campus life
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`relative h-64 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="relative z-10 text-center text-white">
                  <p className="text-2xl font-bold mb-2">{item.title}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/40">
                    {item.category}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Want to see more? <Link to="/gallery" className="text-primary hover:underline font-medium">View Full Gallery</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
