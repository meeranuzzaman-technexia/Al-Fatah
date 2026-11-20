// Smooth-scroll helpers shared by Header / sections / Footer.
// `lenisRef` is the ref object created in App.jsx and filled by useSmoothScroll.

export function createScrollHelpers(lenisRef) {
  const goTo = (href) => {
    if (!href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -78, duration: 1.6 });
    } else {
      window.scrollTo({ top: target.offsetTop - 78, behavior: "smooth" });
    }
  };

  const handleAnchor = (event, href) => {
    event.preventDefault();
    goTo(href);
  };

  return { goTo, handleAnchor };
}
