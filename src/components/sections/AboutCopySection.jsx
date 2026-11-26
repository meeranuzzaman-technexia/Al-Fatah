/* ==========================================================================
   About section — ported from stillform.homes
   --------------------------------------------------------------------------
   The scroll choreography is a 1:1 port of the original timeline:

     Scroll (stage entered, no pin)
       • clouds drift up + fade in
       • beige background panel fades in
       • the six floating photo tiles rise + scale in (staggered)
       • the gallery box fades in

     Desktop  ≥1024px  — pinned for +=320%
       0.00  gallery box morphs from the centre slot → full width (94%/94%)
       0.00  left tiles fly out -48vw, right tiles fly out +48vw, scaled 0.9
       0.00  gallery fades out
       1.50  controls fade out
       1.50  the SAME box morphs from full width → the inline slot in the copy
       1.70  text layer fades in
       1.90  each word of the sentence slides up (yPercent 110 → 0, stagger)
       2.40  the hairline rule scales in from the left
       2.80  the supporting paragraph rises + fades in

     Mobile  <1024px  — pinned for +=160%
       0.00  gallery fades out, controls fade out
       0.00  box morphs centre → inline slot
       0.50  text layer, words, rule, paragraph (same ordering)

   Extra: ← / → buttons slide the photo box like a deck.
   Originals are restored by `revert()` when the component unmounts.
   ========================================================================== */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../../data.js";
import "../../styles/about-copy.css";

gsap.registerPlugin(ScrollTrigger);

const MASK_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.25) 15%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.9) 42%, #000 50%)";

/* Tile geometry lifted from the original build. */
const TILES = [
  { pos: { left: "-1%", top: "14%", h: "43%", w: "26%" }, side: "l", rotate: -4 },
  { pos: { left: "2%", top: "61%", h: "22%", w: "20%" }, side: "l", rotate: 3 },
  { pos: { left: "25%", top: "70%", h: "26%", w: "22%" }, side: "l", rotate: -2 },
  { pos: { left: "51%", top: "1%", h: "21%", w: "16%" }, side: "r", rotate: -6 },
  { pos: { left: "73%", top: "15%", h: "29%", w: "27%" }, side: "r", rotate: 8 },
  { pos: { left: "74%", top: "54%", h: "39%", w: "25%" }, side: "r", rotate: -4 },
];

const Arrow = ({ dir }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d={dir < 0 ? "M13 8H3M7.5 3.5 3 8l4.5 4.5" : "M3 8h10M8.5 3.5 13 8l-4.5 4.5"}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AboutCopySection() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const boxRef = useRef(null);
  const galleryIndex = useRef(0);
  const busy = useRef(false);
  const autoplayRef = useRef(null);
  const inView = useRef(false);
  const [index, setIndex] = useState(0);

  const words = ABOUT.statement.split(" ");
  const slides = ABOUT.slides;

  /* ---------------------------------------------------------------- timeline */
  /* useLayoutEffect: this section pins itself, so its pin spacer has to exist
     before the sections below (video, projects…) measure their triggers. */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const box = boxRef.current;
    if (!section || !stage || !box) return;

    const clouds = section.querySelectorAll(".about-cloud");
    const bg = section.querySelector(".about-bg");
    const tiles = section.querySelectorAll(".about-tile");
    const tileL = section.querySelectorAll(".about-tile-l");
    const tileR = section.querySelectorAll(".about-tile-r");
    const gallery = section.querySelector(".about-gallery");
    const arrows = section.querySelector(".about-arrows");
    const textLayer = section.querySelector(".about-text-layer");
    const wordEls = section.querySelectorAll(".about-word");
    const rule = section.querySelector(".about-rule");
    const supportCopy = section.querySelector(".about-supporting-copy");
    const slotCenter = section.querySelector(".about-slot-center");
    const slotInline = section.querySelector(".about-slot-inline");

    const ctx = gsap.context(() => {
      /* ---------- intro: clouds, background, tiles ---------- */
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 0,
          end: () => section.getBoundingClientRect().top + window.scrollY - 0.1 * window.innerHeight,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      intro.fromTo(clouds[1], { yPercent: 10, opacity: 0 }, { yPercent: -30, opacity: 1, ease: "none", duration: 0.3 }, 0);
      intro.fromTo(clouds[0], { yPercent: 20, opacity: 0 }, { yPercent: -20, opacity: 1, ease: "none", duration: 0.5 }, 0);
      intro.fromTo(bg, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.5);
      intro.fromTo(box, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.85);
      intro.to({}, { duration: 0.01 }, 1.55);

      /* ---------- the side tiles pop up one by one ----------
         They are visible from the start (so nothing is missing before the
         trigger fires); when the section enters, each card unfolds from a
         tilted, pushed-back state with a staggered expo pop. */
      gsap.set(tiles, { rotateX: 34, y: 34, scale: 0.9, opacity: 0 });

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.to(tiles, {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.17,
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      } else {
        gsap.set(tiles, { rotateX: 0, y: 0, scale: 1, opacity: 1 });
      }

      /* ---------- helper: element → stage coordinates ---------- */
      const rel = (el) => {
        const s = stage.getBoundingClientRect();
        const t = el.getBoundingClientRect();
        return { x: t.left - s.left, y: t.top - s.top, w: t.width, h: t.height };
      };
      const fullScreen = () => ({
        left: () => 0.03 * stage.clientWidth,
        top: () => 0.03 * stage.clientHeight,
        width: () => 0.94 * stage.clientWidth,
        height: () => 0.94 * stage.clientHeight,
        borderRadius: 24,
      });

      const mm = gsap.matchMedia();

      /* ---------- desktop: the pinned morph ---------- */
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          box,
          {
            left: () => rel(slotCenter).x,
            top: () => rel(slotCenter).y,
            width: () => rel(slotCenter).w,
            height: () => rel(slotCenter).h,
            borderRadius: 12,
          },
          { ...fullScreen(), ease: "power2.inOut", duration: 1 },
          0
        );
        tl.to(tileL, { x: "-48vw", scale: 0.9, ease: "power2.in", duration: 0.2, stagger: 0.03 }, 0);
        tl.to(tileR, { x: "48vw", scale: 0.9, ease: "power2.in", duration: 0.2, stagger: 0.03 }, 0);
        tl.to(gallery, { autoAlpha: 0, duration: 0.25 }, 0);
        tl.to(arrows, { autoAlpha: 0, duration: 0.2 }, 1.5);
        tl.fromTo(
          box,
          { ...fullScreen() },
          {
            left: () => rel(slotInline).x,
            top: () => rel(slotInline).y,
            width: () => rel(slotInline).w,
            height: () => rel(slotInline).h,
            borderRadius: 8,
            ease: "power3.inOut",
            duration: 1.2,
            immediateRender: false,
          },
          1.5
        );
        tl.fromTo(textLayer, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, 1.7);
        tl.fromTo(wordEls, { yPercent: 110 }, { yPercent: 0, ease: "power3.out", duration: 0.5, stagger: 0.03 }, 1.9);
        tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.5 }, 2.4);
        tl.fromTo(supportCopy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.4 }, 2.8);
      });

      /* ---------- mobile / tablet: shortened morph ---------- */
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(gallery, { autoAlpha: 0, duration: 0.3 }, 0);
        tl.to(arrows, { autoAlpha: 0, duration: 0.2 }, 0);
        tl.fromTo(
          box,
          {
            left: () => rel(slotCenter).x,
            top: () => rel(slotCenter).y,
            width: () => rel(slotCenter).w,
            height: () => rel(slotCenter).h,
            borderRadius: 12,
          },
          {
            left: () => rel(slotInline).x,
            top: () => rel(slotInline).y,
            width: () => rel(slotInline).w,
            height: () => rel(slotInline).h,
            borderRadius: 4,
            ease: "power3.inOut",
            duration: 1.1,
          },
          0
        );
        tl.fromTo(textLayer, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, 0.5);
        tl.fromTo(wordEls, { yPercent: 110 }, { yPercent: 0, ease: "power3.out", duration: 0.5, stagger: 0.025 }, 0.7);
        tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.4 }, 1.3);
        tl.fromTo(supportCopy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.4 }, 1.55);
      });

      /* This section pins itself, so every trigger BELOW it (the video
         section included) must be re-measured once the pin spacers exist.
         Without this the video section's timeline finished off-screen. */
      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* fonts can change the copy height → re-measure once they arrive */
  useEffect(() => {
    if (!document.fonts?.ready) return;
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  /* --------------------------------------------------------- slide the deck */
  const go = (dir) => {
    if (busy.current) return;
    const box = boxRef.current;
    if (!box) return;
    const slideEls = box.querySelectorAll(".about-slide");
    const total = slideEls.length;
    const cur = galleryIndex.current;
    const next = (cur + dir + total) % total;
    busy.current = true;

    gsap.set(slideEls[next], { xPercent: 100 * dir, zIndex: 2 });
    gsap.set(slideEls[cur], { zIndex: 1 });
    gsap.to(slideEls[cur], { xPercent: -30 * dir, duration: 1, ease: "expo.out" });
    gsap.to(slideEls[next], {
      xPercent: 0,
      duration: 1,
      ease: "expo.out",
      onComplete: () => {
        busy.current = false;
      },
    });
    galleryIndex.current = next;
    setIndex(next);
  };

  const goRef = useRef(go);
  goRef.current = go;

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (!inView.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoplayRef.current = setInterval(() => goRef.current(1), 2000);
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) startAutoplay();
        else stopAutoplay();
      },
      { threshold: 0.2 }
    );
    io.observe(stage);
    return () => {
      io.disconnect();
      stopAutoplay();
    };
  }, []);

  /* manual click restarts the auto-advance, exactly like the original */
  const onManual = (dir) => {
    go(dir);
    startAutoplay();
  };

  return (
    <section ref={sectionRef} id="about" className="sf-about" data-header-theme="light">
      {/* clouds + beige wash */}
      <div aria-hidden="true" className="sf-about-clouds">
        <img src={ABOUT.clouds[0]} alt="" className="about-cloud sf-cloud-1" />
        <img src={ABOUT.clouds[1]} alt="" className="about-cloud sf-cloud-2" />
      </div>
      <div
        aria-hidden="true"
        className="about-bg sf-about-bg"
        style={{ WebkitMaskImage: MASK_GRADIENT, maskImage: MASK_GRADIENT }}
      />

      <div ref={stageRef} className="about-stage sf-about-stage">
        {/* invisible target: centre slot */}
        <div aria-hidden="true" className="about-slot-center sf-slot-center" />

        {/* floating gallery */}
        <div className="about-gallery sf-about-gallery">
          <p className="about-tile sf-gallery-caption" data-scroll="true">
            {ABOUT.caption}
          </p>

          {TILES.map((tile, i) => (
            <div
              key={i}
              className={`about-tile about-tile-${tile.side} sf-tile sf-tile-${tile.side}`}
              style={{
                left: tile.pos.left,
                top: tile.pos.top,
                height: tile.pos.h,
                width: tile.pos.w,
                rotate: `${tile.rotate}deg`,
              }}
            >
              <img src={ABOUT.tiles[i % ABOUT.tiles.length]} alt="" />
            </div>
          ))}
        </div>

        {/* copy */}
        <div className="about-text-layer sf-text-layer">
          <div className="sf-text-grid">
            <div className="sf-eyebrow-col">
              <div className="sf-eyebrow">{ABOUT.eyebrow}</div>
              <div className="about-arrows sf-tile-actions">
                <button type="button" onClick={() => onManual(-1)} aria-label="Previous image">
                  <Arrow dir={-1} />
                </button>
                <button type="button" onClick={() => onManual(1)} aria-label="Next image">
                  <Arrow dir={1} />
                </button>
                <span className="sf-counter">
                  {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            <div className="sf-copy-col">
              <p className="sf-statement">
                <span aria-hidden="true" className="about-slot-inline sf-slot-inline" />
                {words.map((word, i) => (
                  <span className="sf-word-mask" key={`${word}-${i}`}>
                    <span className="about-word">{word}</span>
                  </span>
                ))}
              </p>
              <div className="about-rule sf-rule" />
              <p className="about-supporting-copy sf-support">{ABOUT.support}</p>
            </div>
          </div>
        </div>

        {/* the morphing photo box */}
        <div ref={boxRef} className="about-box sf-box">
          <div className="sf-slides">
            {slides.map((src, i) => (
              <img
                key={src + i}
                src={src}
                alt={`Al-Fatah project interior ${i + 1}`}
                className="about-slide sf-slide"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
