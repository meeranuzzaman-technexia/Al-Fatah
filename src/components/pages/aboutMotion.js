/* ==========================================================================
   About page motion — GSAP + ScrollTrigger + SplitText + Lenis.
   Install once:  npm i lenis
   Same rule as the rest of the site: copy is never hidden by a scroll-driven
   opacity tween. The quote scrubs COLOR (always legible), reveals use transform
   or clip-path only.
   ========================================================================== */
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Buttery inertia scroll, wired into ScrollTrigger's ticker. */
export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return undefined;
    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
}

/* Hero: photo card unveils + floats, gold paths fade in, pointer parallax. */
export function useHeroFx(host) {
  useEffect(() => {
    if (!host || reduced()) return undefined;

    const q = gsap.utils.selector(host);
    const wrap = q(".ab-hero-card-wrap")[0];
    const card = q(".ab-hero-card")[0];
    const img = q(".ab-hero-card img")[0];
    const paths = q(".ab-paths")[0];

    const ctx = gsap.context(() => {
      if (card) {
        gsap.fromTo(
          card,
          { clipPath: "inset(0% 0% 100% 0% round 1.4rem)" },
          { clipPath: "inset(0% 0% 0% 0% round 1.4rem)", duration: 1.5, ease: "expo.inOut", delay: 0.35 }
        );
        gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 2.2, ease: "expo.out", delay: 0.35 });
        gsap.to(card, { y: -10, duration: 4.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.2 });
      }
      if (paths) gsap.from(paths, { opacity: 0, duration: 2.4, ease: "power2.out" });
    }, host);

    /* pointer parallax: paths drift one way, the photo card the other */
    let onMove;
    if (window.matchMedia("(hover: hover)").matches && paths && wrap) {
      const pathX = gsap.quickTo(paths, "x", { duration: 1.4, ease: "power3.out" });
      const pathY = gsap.quickTo(paths, "y", { duration: 1.4, ease: "power3.out" });
      const cardX = gsap.quickTo(wrap, "x", { duration: 1.2, ease: "power3.out" });
      const cardY = gsap.quickTo(wrap, "y", { duration: 1.2, ease: "power3.out" });
      onMove = (e) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        pathX(nx * 28);
        pathY(ny * 18);
        cardX(nx * -16);
        cardY(ny * -10);
      };
      host.addEventListener("pointermove", onMove);
    }

    return () => {
      if (onMove) host.removeEventListener("pointermove", onMove);
      ctx.revert();
    };
  }, [host]);
}

/* Services: each pinned card shrinks + dims as the next one slides over it;
   a gold spotlight follows the cursor inside the card. */
export function useServicesMotion(ref) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope || reduced()) return undefined;

    const cards = Array.from(scope.querySelectorAll(".sv-card"));

    const onMove = (e) => {
      const card = e.target.closest && e.target.closest(".sv-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    scope.addEventListener("pointermove", onMove);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 721px)", () => {
      const topOf = (el) => parseFloat(getComputedStyle(el).top) || 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94,
          "--dim": 0.38,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: () => "top " + topOf(next),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      scope.removeEventListener("pointermove", onMove);
      mm.revert();
    };
  }, [ref]);
}

/* Projects: the rail's panels unveil upward, one after another, once. */
export function useProjectsMotion(ref) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope || reduced()) return undefined;
    const rail = scope.querySelector(".pj-rail");
    if (!rail) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rail.querySelectorAll(".pj-panel"),
        { clipPath: "inset(100% 0% 0% 0% round 1.4rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.4rem)",
          duration: 1.3,
          ease: "expo.inOut",
          stagger: 0.09,
          clearProps: "clipPath",
          scrollTrigger: { trigger: rail, start: "top 88%", once: true },
        }
      );
    }, scope);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [ref]);
}

/* News: the dark feature card unveils upward once. */
export function useNewsMotion(ref) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope || reduced()) return undefined;
    const card = scope.querySelector(".nw-feature .news-card-link");
    if (!card) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0% round 1.6rem)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.6rem)",
          duration: 1.4,
          ease: "expo.inOut",
          clearProps: "clipPath",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );
    }, scope);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [ref]);
}

/* Contact: info rows rise one by one, the form card unveils. */
export function useContactMotion(ref) {
  useEffect(() => {
    const scope = ref.current;
    if (!scope || reduced()) return undefined;

    const ctx = gsap.context(() => {
      gsap.from(scope.querySelectorAll(".ct-row"), {
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        clearProps: "transform",
        scrollTrigger: { trigger: scope.querySelector(".ct-rows"), start: "top 85%", once: true },
      });
      const card = scope.querySelector(".ct-card");
      if (card) {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0% round 1.6rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.6rem)",
            duration: 1.4,
            ease: "expo.inOut",
            clearProps: "clipPath",
            scrollTrigger: { trigger: card, start: "top 88%", once: true },
          }
        );
      }
    }, scope);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [ref]);
}

export function useAboutMotion(root) {
  useEffect(() => {
    const scope = root.current;
    if (!scope || reduced()) return undefined;

    const q = gsap.utils.selector(scope);
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      /* 1. Director photo: unveils upward, then drifts inside its frame */
      const media = q(".ab-ceo-media")[0];
      if (media) {
        gsap.fromTo(
          media,
          { clipPath: "inset(100% 0% 0% 0% round 1.4rem)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 1.4rem)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: { trigger: media, start: "top 85%", once: true },
          }
        );
        gsap.fromTo(
          media.querySelector("img"),
          { yPercent: -6, scale: 1.15 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      }

      /* 2. Quote: words light up as you scroll through it */
      const quote = q(".ab-quote")[0];
      if (quote) {
        const split = new SplitText(quote, { type: "words" });
        gsap.fromTo(
          split.words,
          { color: "rgba(10,10,10,0.16)" },
          {
            color: "rgba(10,10,10,1)",
            stagger: 0.12,
            duration: 0.4,
            ease: "none",
            scrollTrigger: { trigger: quote, start: "top 82%", end: "bottom 48%", scrub: true },
          }
        );
      }

      /* 3. Pinned-section title: masked line rise */
      const title = q(".ab-title")[0];
      if (title) {
        const split = new SplitText(title, { type: "lines", mask: "lines", linesClass: "m-line" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.09,
          scrollTrigger: { trigger: title, start: "top 85%", once: true },
        });
      }
    }, scope);

    /* 4. Desktop: pin the section and scroll the panels sideways */
    mm.add("(min-width: 1024px)", () => {
      const wrap = q(".ab-pin")[0];
      const track = q(".ab-track")[0];
      const bar = q(".ab-progress span")[0];
      if (!wrap || !track) return;

      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const slide = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
        },
      });

      /* each photo slides against its card as the card travels */
      q(".ab-panel").forEach((panel) => {
        const img = panel.querySelector(".ab-panel-media img");
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: 7 },
          {
            xPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });

    /* 5. Mobile / tablet: panels simply rise in once */
    mm.add("(max-width: 1023px)", () => {
      q(".ab-panel").forEach((panel) => {
        gsap.from(panel, {
          y: 56,
          duration: 1,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: { trigger: panel, start: "top 90%", once: true },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      mm.revert();
      ctx.revert();
    };
  }, [root]);
}