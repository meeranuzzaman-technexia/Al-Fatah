import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Word-by-word scroll "wipe": copy starts dim (#b3b3b3) and fills to full
// contrast as it travels up the viewport — same behaviour as the live FIND site.
//
// Markup contract:
//   data-word-wipe            – element to split into words
//   data-wipe-color="#151717" – final (filled) colour
//   data-wipe-soft="#b3b3b3"  – starting (dim) colour
//
// Nested emphasis (<span>, .muted) is intentionally NOT animated: on the live
// site those phrases stay muted grey while the main copy fills in.
export function useWordWipe() {
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return undefined;

    const targets = gsap.utils.toArray("[data-word-wipe]");
    if (!targets.length) return undefined;

    // Emphasis phrases keep their own colour — never split or recolour them.
    const IGNORE = "span, .muted, .em";

    const ctx = gsap.context(() => {
      targets.forEach((element) => {
        const activeColor = element.dataset.wipeColor || "#151717";
        const startColor = element.dataset.wipeSoft || "#b3b3b3";

        SplitText.create(element, {
          type: "words",
          wordsClass: "word-wipe-word",
          ignore: IGNORE,
          autoSplit: true,
          aria: "auto",
          onSplit: (self) => {
            const words = self.words || [];
            if (!words.length) return undefined;

            gsap.set(words, { color: startColor });

            return gsap.to(words, {
              color: activeColor,
              stagger: 0.06,
              ease: "none",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 45%",
                scrub: 0.6,
              },
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
