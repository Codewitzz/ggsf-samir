import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const GallerySection = () => {
  const galleryItems = useMemo(
    () => [
      {
        id: 1,
        title: "Campus Overview",
        category: "Campus",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-2 row-span-2",
      },
      {
        id: 2,
        title: "Engineering Labs",
        category: "Facilities",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-1",
      },
      {
        id: 3,
        title: "Library",
        category: "Facilities",
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-1",
      },
      {
        id: 4,
        title: "Workshops",
        category: "Academics",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-2",
      },
      {
        id: 5,
        title: "Seminar & Events",
        category: "Events",
        image:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-1",
      },
      {
        id: 6,
        title: "Student Life",
        category: "Campus",
        image:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-1",
      },
      {
        id: 7,
        title: "Innovation Corner",
        category: "Academics",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-2 row-span-1",
      },
      {
        id: 8,
        title: "Green Campus",
        category: "Campus",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&h=1200&fit=crop&q=80",
        span: "col-span-1 row-span-1",
      },
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

        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] gap-3 sm:gap-4 md:gap-5 grid-flow-dense">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "group relative overflow-hidden rounded-xl sm:rounded-2xl border-border bg-card/60 hover:bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer",
                item.span
              )}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent group-hover:from-black/80 transition-all duration-300" />
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-between">
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
