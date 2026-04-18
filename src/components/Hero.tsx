import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getAdminImageUrl } from "@/lib/adminImages/getAdminImageUrl";

const SLIDE_DURATION = 6000;

/** Default hero backgrounds from on-campus assets (`public/Campus-Imgs/`). */
const CAMPUS_SLIDE_IMAGES = [
  "/Campus-Imgs/ggsf.png",
  "/Campus-Imgs/ggsf1.png",
  "/Campus-Imgs/ggsf.png",
  "/Campus-Imgs/ggsf1.png",
  "/Campus-Imgs/ggsf.png",
] as const;

const Hero = () => {
  const heroSlides = useMemo(
    () => [
      {
        id: "engineering",
        imageKey: "hero_slide_engineering",
        title: "Engineering excellence that builds futures",
        description:
          "Discover interdisciplinary programs, AI-powered labs, and industry mentors that transform ideas into impact.",
        badge: "Admissions 2025 Open",
        image: CAMPUS_SLIDE_IMAGES[0],
        stats: [
          { label: "Industry partners", value: "160+" },
          { label: "Innovation labs", value: "18" },
        ],
      },
      {
        id: "innovation",
        imageKey: "hero_slide_innovation",
        title: "Innovation & entrepreneurship in every stream",
        description:
          "From MBA labs to Engineering campus workshops, every learner gets access to start-up studios, hackathons, and co-create spaces.",
        badge: "Start-up Studio",
        image: CAMPUS_SLIDE_IMAGES[1],
        stats: [
          { label: "Student ventures", value: "45" },
          { label: "Incubated ideas", value: "120+" },
        ],
      },
      {
        id: "campus-life",
        imageKey: "hero_slide_campus-life",
        title: "A campus that inspires learning for life",
        description:
          "Experience lush grounds, digital classrooms, and vibrant student clubs that nurture leadership and community.",
        badge: "360° Campus Tour",
        image: CAMPUS_SLIDE_IMAGES[2],
        stats: [
          { label: "Student clubs", value: "32" },
          { label: "Scholarships", value: "₹2 Cr" },
        ],
      },
      {
        id: "global-connect",
        imageKey: "hero_slide_global-connect",
        title: "Global partnerships that open doors worldwide",
        description:
          "Benefit from international MoUs, semester abroad programs, and dual certifications curated with leading universities.",
        badge: "Global Immersion 2025",
        image: CAMPUS_SLIDE_IMAGES[3],
        stats: [
          { label: "International MoUs", value: "25" },
          { label: "Exchange seats", value: "140+" },
        ],
      },
      {
        id: "research",
        imageKey: "hero_slide_research",
        title: "Research culture powering patents and prototypes",
        description:
          "Join multidisciplinary labs focused on EV, green energy, AI, and med-tech with seed funding and patent mentorship.",
        badge: "Innovation Grants",
        image: CAMPUS_SLIDE_IMAGES[4],
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
    <section className="relative flex min-h-[22rem] h-[min(100svh,40rem)] sm:min-h-[26rem] md:h-[640px] md:min-h-0 items-center justify-center overflow-hidden bg-black text-primary-foreground">
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
              <img
                src={getAdminImageUrl(slide.imageKey, slide.image)}
                data-admin-slot={slide.imageKey}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional overlay tint - removed bluish color */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-24 sm:pb-20 md:pb-0 text-center md:text-left">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-secondary" />
          {currentSlide.badge}
        </div>
        <div className="mt-6 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight [overflow-wrap:anywhere]">
            {currentSlide.title}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-primary-foreground/90 [overflow-wrap:anywhere]">
            {currentSlide.description}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all">
            <Link to="/admissions">
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-6 text-left max-w-md mx-auto md:mx-0">
          {currentSlide.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl sm:text-3xl font-semibold">{stat.value}</p>
              <p className="text-xs sm:text-sm text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail controls — horizontal scroll on narrow screens */}
      <div className="absolute bottom-3 left-0 right-0 z-20 px-3 sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2">
        <div className="flex justify-center gap-2 overflow-x-auto pb-1 sm:gap-4 sm:overflow-visible [-webkit-overflow-scrolling:touch]">
        {heroSlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={cn(
              "group relative h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 sm:h-16 sm:w-24 sm:rounded-lg",
              index === activeSlide ? "border-secondary shadow-xl scale-105" : "border-white/30 opacity-70 hover:opacity-100",
            )}
          >
            <img
              src={getAdminImageUrl(slide.imageKey, slide.image)}
              data-admin-slot={slide.imageKey}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
