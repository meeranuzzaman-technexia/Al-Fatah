/* Adds `data-footer-visible` on <html> while the footer is on screen, so the
   floating WhatsApp pill and the Al-Fatah AI launcher can step out of the way
   instead of covering the footer's bottom row. */
import { useEffect } from "react";

export function useFooterHidden() {
  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;

    const root = document.documentElement;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) root.setAttribute("data-footer-visible", "true");
        else root.removeAttribute("data-footer-visible");
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(footer);

    /* ScrollTrigger pins and Lenis can shift the footer after the observer's
       last measurement, so double-check on scroll (rAF-throttled). */
    let queued = false;
    const sync = () => {
      queued = false;
      const rect = footer.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.9 && rect.bottom > 0;
      if (visible) root.setAttribute("data-footer-visible", "true");
      else root.removeAttribute("data-footer-visible");
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sync);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.removeAttribute("data-footer-visible");
    };
  }, []);
}
