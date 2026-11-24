import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll + GSAP hero / reveal animations.
// Kept in its own hook so App.jsx stays lean.
export function useSmoothScroll(lenisRef, heroRef) {
  useLayoutEffect(() => {
    // Slower, calmer scroll: longer easing + a gentler wheel multiplier.
    const lenis = new Lenis({
      duration: 1.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      if (heroRef.current) {
        // One continuous, gently eased timeline. scrub > 1 lets GSAP catch up
        // smoothly with Lenis instead of snapping to every wheel tick.
        gsap
          .timeline({
            defaults: { ease: "sine.inOut" },
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.4,
              invalidateOnRefresh: true,
            },
          })
          .to(".hero-content", { y: -110, opacity: 0, scale: 0.975, duration: 1 }, 0)
          .to(".hero-house", { y: -150, scale: 1.07, duration: 1.85 }, 0)
          .to(".hero-cloud.left", { x: -120, y: 34, duration: 1.85 }, 0)
          .to(".hero-cloud.right", { x: 120, y: 40, duration: 1.85 }, 0)
          // Outlined wordmark enters and fills cleanly with solid white on scroll,
          // then drifts out — no hard cuts.
          .fromTo(
            ".hero-logo-reveal",
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.7 },
            0.45
          )
          .fromTo(
            ".hero-logo-fill",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.85 },
            0.6
          )
          .to(".hero-logo-reveal", { opacity: 0, scale: 1.12, duration: 0.65 }, 1.5);
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
