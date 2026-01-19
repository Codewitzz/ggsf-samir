import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const GallerySection = () => {
  const galleryItems = useMemo(
    () => [
      { id: 1, title: "Campus Overview", category: "Campus", color: "from-primary/90 to-primary-light/90" },
      { id: 2, title: "Engineering Lab", category: "Facilities", color: "from-info/90 to-primary/90" },
      { id: 3, title: "MBA Classroom", category: "Academics", color: "from-warning/90 to-secondary/90" },
      { id: 4, title: "Library", category: "Facilities", color: "from-success/90 to-primary/90" },
      { id: 5, title: "Sports Complex", category: "Campus", color: "from-secondary/90 to-warning/90" },
      { id: 6, title: "Annual Fest", category: "Events", color: "from-primary-dark/90 to-info/90" },
      { id: 7, title: "Engineering Workshop", category: "Academics", color: "from-warning/90 to-primary/90" },
      { id: 8, title: "Auditorium", category: "Facilities", color: "from-primary/90 to-secondary/90" },
      { id: 9, title: "Seminar Hall", category: "Events", color: "from-accent/70 to-info/80" },
      { id: 10, title: "Green Campus", category: "Campus", color: "from-success/80 to-accent/80" },
      { id: 11, title: "Innovation Corner", category: "Academics", color: "from-primary/80 to-accent/70" },
      { id: 12, title: "Cultural Moments", category: "Events", color: "from-secondary/80 to-primary/70" },
    ],
    []
  );

  const categories = useMemo(() => ["All", "Campus", "Facilities", "Academics", "Events"], []);
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryItems.filter((item) => {
      const matchCategory = activeCategory === "All" || item.category === activeCategory;
      const matchQuery = !q || item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [activeCategory, galleryItems, query]);

  return (
    <section className="px-4 bg-background py-6 sm:py-8 md:py-12">
      <div className="container mx-auto">
        <div className="rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Badge className="bg-primary/10 text-primary border-primary/20" variant="secondary">
                Gallery
              </Badge>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
                Campus moments, facilities & student life
              </h2>
              <p className="mt-3 text-base md:text-lg text-muted-foreground">
                Browse by category, or search to quickly find what you’re looking for.
              </p>
            </div>

            <div className="w-full md:w-[360px]">
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 sm:px-4 py-2.5 sm:py-3 shadow-md hover:shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-primary/20">
                <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search (e.g. Library, Fest)…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  aria-label="Search gallery"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button
                key={cat}
                type="button"
                variant={activeCategory === cat ? "default" : "secondary"}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "h-8 sm:h-9 rounded-full px-3 sm:px-4 text-xs sm:text-sm transition-all",
                  activeCategory === cat
                    ? "shadow-md hover:shadow-lg scale-105"
                    : "bg-muted/60 hover:bg-muted text-foreground hover:scale-105"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden rounded-xl sm:rounded-2xl border-border bg-card/60 hover:bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div
                className={cn(
                  "relative aspect-[4/3] bg-gradient-to-br overflow-hidden",
                  item.color
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 group-hover:via-black/30 transition-all duration-300" />
                <div className="absolute inset-0 p-2 sm:p-3 md:p-4 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30 backdrop-blur-md shadow-lg group-hover:bg-white/30 transition-all text-xs"
                    >
                      {item.category}
                    </Badge>
                  </div>
                  <div className="transform group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
                    <p className="text-white font-bold text-sm sm:text-base md:text-lg leading-snug drop-shadow-lg">
                      {item.title}
                    </p>
                    <p className="text-white/90 text-xs mt-1 sm:mt-1.5 font-medium">
                      Tap to view
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-muted-foreground">No items match your search.</p>
            <Button
              type="button"
              variant="secondary"
              className="mt-3 rounded-full"
              onClick={() => {
                setActiveCategory("All");
                setQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
