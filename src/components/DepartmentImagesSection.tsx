import { Card } from "@/components/ui/card";

export type DepartmentGalleryImage = {
  title: string;
  image: string;
};

export default function DepartmentImagesSection({
  title = "Department Gallery",
  subtitle = "A quick glimpse of facilities, labs, and student activities",
  images,
}: {
  title?: string;
  subtitle?: string;
  images: DepartmentGalleryImage[];
}) {
  if (!images?.length) return null;

  return (
    <section className="relative overflow-hidden py-16 px-4 bg-muted/30">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-6 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((photo, index) => (
            <Card key={`${photo.title}-${index}`} className="group overflow-hidden border border-primary/10 bg-card/85 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary/10" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg drop-shadow-md">{photo.title}</h3>
                  <p className="text-xs text-white/85 mt-1">Labs, classrooms and activity highlights</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

