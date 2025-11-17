import { useEffect } from "react";

export const useGsapAnimations = () => {
  useEffect(() => {
    let gsap: any;
    let ScrollTrigger: any;
    (async () => {
      const mod = await import("gsap");
      const st = await import("gsap/ScrollTrigger");
      gsap = mod.gsap || mod.default;
      ScrollTrigger = st.ScrollTrigger || st.default;
      if (gsap && ScrollTrigger && !gsap.core.globals().ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }

      const elements = document.querySelectorAll<HTMLElement>(".gsap-fade");
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 24 },
          {
            duration: 0.8,
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    })();

    return () => {
      try {
        const st = (window as any).ScrollTrigger;
        if (st && typeof st.getAll === "function") {
          st.getAll().forEach((t: any) => t.kill());
        }
      } catch {
        // ignore cleanup errors
      }
    };
  }, []);
};

