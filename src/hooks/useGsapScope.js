/* Ported from Al-Fatah-new/src/lib/useGsapScope.ts.
   Creates a GSAP context scoped to a DOM element so every tween /
   ScrollTrigger is reverted on unmount (safe with StrictMode). */
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export function useGsapScope(init) {
  const ref = useRef(null);
  const initRef = useRef(init);
  initRef.current = init;

  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;
    const ctx = gsap.context(() => initRef.current(scope), scope);
    return () => ctx.revert();
  }, []);

  return ref;
}
