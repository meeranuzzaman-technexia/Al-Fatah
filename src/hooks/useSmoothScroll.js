import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll + GSAP hero / reveal animations.
// Kept in its own hook so App.jsx stays lean.
export function useSmoothScroll(lenisRef, heroRef) {
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .to(".hero-content", { y: -180, opacity: 0, scale: 0.96, ease: "none" }, 0)
          .to(".hero-house", { y: -120, scale: 1.08, ease: "none" }, 0)
          .to(".hero-cloud.left", { x: -180, y: 50, ease: "none" }, 0)
          .to(".hero-cloud.right", { x: 180, y: 60, ease: "none" }, 0)
          .to(".hero-smoke", { y: -220, opacity: 0.65, ease: "none" }, 0)
          .fromTo(".hero-logo-reveal", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, ease: "none" }, 0.5)
          .to(".hero-logo-reveal", { opacity: 0, scale: 1.35, ease: "none" }, 0.88);
      }

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
}
