import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * areaRef  -> static element (mouse yahan track hota hai)
 * moverRef -> andar ka element jo cursor ki taraf khinchta hai
 */
export function useMagnetic({ strength = 0.4 } = {}) {
  const areaRef = useRef(null);
  const moverRef = useRef(null);

  useEffect(() => {
    const area = areaRef.current;
    const mover = moverRef.current;
    if (!area || !mover) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const xTo = gsap.quickTo(mover, "x", { duration: 1, ease: "elastic.out(1, 0.35)" });
        const yTo = gsap.quickTo(mover, "y", { duration: 1, ease: "elastic.out(1, 0.35)" });

        const onMove = (e) => {
          const r = area.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        area.addEventListener("mousemove", onMove);
        area.addEventListener("mouseleave", onLeave);

        return () => {
          area.removeEventListener("mousemove", onMove);
          area.removeEventListener("mouseleave", onLeave);
          gsap.set(mover, { x: 0, y: 0 });
        };
      }
    );

    return () => mm.revert();
  }, [strength]);

  return { areaRef, moverRef };
}