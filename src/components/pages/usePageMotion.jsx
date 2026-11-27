/* ==========================================================================
   Inner-page motion layer.
   GSAP + ScrollTrigger + SplitText (already in the bundle) for the choreography,
   plus a hand-rolled magnetic hover. Rule of thumb everywhere below: opacity is
   NEVER driven by a ScrollTrigger `.from()` — a fast scroll or landing mid-page
   would leave copy invisible. Reveals use IntersectionObserver + `gsap.from`
   on transform only.
   ========================================================================== */
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function usePageMotion(deps = []) {
  useEffect(() => {
    if (reduced()) return undefined;

    const observers = [];

    const ctx = gsap.context(() => {
      /* fires once: on intersect, or immediately if already scrolled past */
      const once = (el, fn, rootMargin = "0px 0px -8% 0px") => {
        if (!el) return;
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
                io.disconnect();
                fn();
              }
            });
          },
          { rootMargin, threshold: 0 }
        );
        io.observe(el);
        observers.push(io);
      };

      const splitLines = (el, cls = "m-line") => {
        const split = new SplitText(el, { type: "lines", linesClass: cls });
        gsap.set(split.lines, { overflow: "hidden" });
        return split.lines;
      };

      /* ------------------------------------------------ 1. hero word swing -- */
      const heroTitle = document.querySelector(".page-hero-title");
      if (heroTitle) {
        const split = new SplitText(heroTitle, { type: "words,chars", charsClass: "m-char", wordsClass: "m-word" });
        gsap.set(heroTitle, { perspective: 800 });
        gsap.from(split.chars, {
          yPercent: 130,
          rotateX: -85,
          opacity: 0,
          transformOrigin: "0% 100%",
          duration: 1.1,
          ease: "back.out(1.6)",
          stagger: 0.016,
          delay: 0.12,
        });
        gsap.from(".page-hero-lead, .crumb", {
          y: 26,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          delay: 0.45,
        });
        gsap.to(".page-hero-inner", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: ".page-hero", start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".page-hero-media img", {
          yPercent: 12,
          scale: 1.1,
          ease: "none",
          scrollTrigger: { trigger: ".page-hero", start: "top top", end: "bottom top", scrub: true },
        });
      }

      /* ------------------------------------------------- 2. section titles --- */
      gsap.utils.toArray(".page-section-title").forEach((el) => {
        if (el.closest(".page-cta")) return;
        const lines = splitLines(el);
        once(el, () =>
          gsap.from(lines, { yPercent: 115, rotate: 2.4, duration: 1, ease: "expo.out", stagger: 0.08 })
        );
        once(el, () => gsap.fromTo(el, { "--rule": 0 }, { "--rule": 1, duration: 1.2, ease: "power2.out" }));
      });

      /* ---------------------------------------------- 3. card batch reveals -- */
      /* the last value is the entry tilt in degrees — wide panels get 0,
         only the small tiles are allowed to swing in */
      const groups = [
        [".pillar-grid", ".pillar", 2],
        [".service-grid", ".service-card", 1.6],
        [".project-grid", ".project-card", 0],
        [".news-grid", ".news-card", 1.4],
        [".gallery-grid", ".gallery-item", 0],
        [".logo-row", ".logo-tile", 1.2],
        [".bullet-block", ".bullet-grid li", 0],
        [".fact-list", ".fact-row", 0],
        [".terms-list", ".terms-item", 0],
      ];

      groups.forEach(([wrap, item, tilt]) => {
        gsap.utils.toArray(wrap).forEach((box) => {
          const items = box.querySelectorAll(item);
          if (!items.length) return;
          once(
            box,
            () =>
              gsap.from(items, {
                y: tilt ? 70 : 48,
                rotate: tilt ? (i) => (i % 2 ? tilt : -tilt) : 0,
                scale: tilt ? 0.97 : 1,
                duration: 0.95,
                ease: "power3.out",
                stagger: 0.07,
                clearProps: "transform",
              }),
            "0px 0px -4% 0px"
          );
        });
      });

      /* --------------------------------------------- 3b. quote / prose ------ */
      const quote = document.querySelector(".quote");
      if (quote) {
        const lines = splitLines(quote);
        once(quote, () => gsap.from(lines, { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.1 }));
      }

      gsap.utils.toArray(".prose").forEach((p) => {
        once(p, () => gsap.from(p, { y: 34, duration: 1, ease: "power2.out" }));
      });

      gsap.utils.toArray(".project-chip, .chip, .news-card-meta, .project-status").forEach((el, i) => {
        once(el, () =>
          gsap.from(el, {
            y: 18,
            scale: 0.9,
            duration: 0.6,
            ease: "back.out(2.2)",
            delay: (i % 6) * 0.05,
            clearProps: "transform",
          })
        );
      });

      /* ----------------------------------- 3c. closing CTA: big slide-up ---- */
      const cta = document.querySelector(".page-cta");
      if (cta) {
        const h2 = cta.querySelector("h2");
        if (h2) {
          const lines = splitLines(h2);
          once(cta, () =>
            gsap.from(lines, { yPercent: 120, rotate: 1.5, duration: 1.15, ease: "expo.out", stagger: 0.09 })
          );
        }
        once(cta, () => gsap.from(cta.querySelector(".page-cta-btn"), { x: 60, duration: 1, ease: "back.out(1.5)" }));
        const ctaImg = cta.querySelector(".page-cta-media img");
        if (ctaImg) {
          gsap.fromTo(
            ctaImg,
            { yPercent: -10, scale: 1.12 },
            {
              yPercent: 6,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: cta, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      }

      /* ------------------------------------ 4. card media: scrub parallax --- */
      gsap.utils.toArray(
        ".project-card-media img, .service-card-media img, .news-card-media img, .pillar-media img"
      ).forEach(
        (img) => {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 0.6 },
            }
          );
        }
      );

      /* ------------------------------------------ 5. gallery: skewed scrub -- */
      gsap.utils.toArray(".gallery-item").forEach((item) => {
        const img = item.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 0.7 },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      observers.forEach((io) => io.disconnect());
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* --------------------------------------------------------------------------
   Magnetic hover — buttons lean towards the cursor, then snap back.
   -------------------------------------------------------------------------- */
export function useMagnetic(selector = ".pill-button, .chip, .project-card-more") {
  useEffect(() => {
    if (reduced()) return undefined;
    const off = [];

    document.querySelectorAll(selector).forEach((el) => {
      const strength = 0.28;
      const move = (event) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (event.clientX - (r.left + r.width / 2)) * strength,
          y: (event.clientY - (r.top + r.height / 2)) * strength * 0.7,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      const reset = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.35)" });

      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
      off.push(() => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", reset);
      });
    });

    return () => off.forEach((fn) => fn());
  }, [selector]);
}

/* --------------------------------------------------------------------------
   Text marquee — a slow gold band with a gentle skew breathing effect.
   -------------------------------------------------------------------------- */
export function Marquee({ text = "Al Fatah", repeat = 6 }) {
  useEffect(() => {
    if (reduced()) return undefined;
    const tween = gsap.to(".marquee-track", { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
    return () => tween.kill();
  }, []);

  const chunk = Array.from({ length: repeat }, (_, i) => (
    <span key={i}>
      {text}
      <i aria-hidden="true">✦</i>
    </span>
  ));

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-inner">
        <div className="marquee-track">
          {chunk}
          {chunk}
        </div>
      </div>
    </div>
  );
}
