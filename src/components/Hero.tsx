import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-campus.jpg";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 6000;

const Hero = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "engineering",
        title: "Engineering excellence that builds futures",
        description:
          "Discover interdisciplinary programs, AI-powered labs, and industry mentors that transform ideas into impact.",
        badge: "Admissions 2025 Open",
        image: heroImage,
        stats: [
          { label: "Industry partners", value: "160+" },
          { label: "Innovation labs", value: "18" },
        ],
      },
      {
        id: "innovation",
        title: "Innovation & entrepreneurship in every stream",
        description:
          "From MBA labs to Polytechnic workshops, every learner gets access to start-up studios, hackathons, and co-create spaces.",
        badge: "Start-up Studio",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80",
        stats: [
          { label: "Student ventures", value: "45" },
          { label: "Incubated ideas", value: "120+" },
        ],
      },
      {
        id: "campus-life",
        title: "A campus that inspires learning for life",
        description:
          "Experience lush grounds, digital classrooms, and vibrant student clubs that nurture leadership and community.",
        badge: "360° Campus Tour",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
        stats: [
          { label: "Student clubs", value: "32" },
          { label: "Scholarships", value: "₹2 Cr" },
        ],
      },
      {
        id: "global-connect",
        title: "Global partnerships that open doors worldwide",
        description:
          "Benefit from international MoUs, semester abroad programs, and dual certifications curated with leading universities.",
        badge: "Global Immersion 2025",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
        stats: [
          { label: "International MoUs", value: "25" },
          { label: "Exchange seats", value: "140+" },
        ],
      },
      {
        id: "research",
        title: "Research culture powering patents and prototypes",
        description:
          "Join multidisciplinary labs focused on EV, green energy, AI, and med-tech with seed funding and patent mentorship.",
        badge: "Innovation Grants",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
        stats: [
          { label: "Patents filed", value: "60+" },
          { label: "Funded projects", value: "₹5 Cr" },
        ],
      },
    ],
    [],
  );

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, SLIDE_DURATION);

    return () => {
      window.clearInterval(interval);
    };
  }, [heroSlides.length]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative h-[640px] flex items-center justify-center overflow-hidden bg-black text-primary-foreground">
      {/* Background slider */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${activeSlide * 100}%)`,
          }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.id} className="relative h-full w-full flex-shrink-0">
              <img src={slide.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional overlay tint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary-dark/60 to-transparent mix-blend-multiply"
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          {currentSlide.badge}
        </div>
        <div className="mt-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">{currentSlide.title}</h1>
          <p className="mt-6 text-lg md:text-xl text-primary-foreground/90">{currentSlide.description}</p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <Link to="/contact">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 bg-white/10 text-white hover:bg-white hover:text-primary"
          >
            <Link to="/departments">Explore Departments</Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 text-left max-w-md">
          {currentSlide.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail controls */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-4">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={cn(
              "group relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all duration-300",
              index === activeSlide ? "border-secondary shadow-xl scale-105" : "border-white/30 opacity-70 hover:opacity-100",
            )}
          >
            <img src={slide.image} alt="" className="h-full w-full object-cover" loading="lazy" />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
