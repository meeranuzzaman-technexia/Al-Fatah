import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { SearchModal } from "./components/SearchModal.jsx";
import { WhySection } from "./components/WhySection.jsx";
import { IdentitySection } from "./components/IdentitySection.jsx";
import { RewiredSection } from "./components/RewiredSection.jsx";
import { AgentsSection } from "./components/AgentsSection.jsx";
import { TestimonialsSection } from "./components/TestimonialsSection.jsx";
import { ServicesSection } from "./components/ServicesSection.jsx";
import { SupportSection } from "./components/SupportSection.jsx";
import { BlogSection } from "./components/BlogSection.jsx";
import { NeighborhoodsSection } from "./components/NeighborhoodsSection.jsx";
import { FinalCTASection } from "./components/FinalCTASection.jsx";
import { Footer } from "./components/Footer.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import { useWordWipe } from "./hooks/useWordWipe.js";
import { createScrollHelpers } from "./utils/scroll.js";

function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerSticky, setHeaderSticky] = useState(false);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);

  // Header morph: over-hero (image-1) until the hero starts scrolling away,
  // then the compact sticky white bar (image-2).
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current;
      const threshold = hero
        ? hero.offsetTop + Math.min(hero.offsetHeight * 0.18, window.innerHeight * 0.35)
        : 120;
      setHeaderSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useSmoothScroll(lenisRef, heroRef);
  useWordWipe();
  const { goTo, handleAnchor } = createScrollHelpers(lenisRef);

  const openSearch = () => setSearchOpen(true);

  return (
    <>
      <Header goTo={goTo} heroRef={heroRef} sticky={headerSticky} />

      <main>
        <Hero heroRef={heroRef} onFindProperties={openSearch} />
        <WhySection />
        <IdentitySection />
        <RewiredSection onStartSearch={openSearch} />
        <AgentsSection goTo={goTo} />
        <TestimonialsSection />
        <ServicesSection onGetStarted={openSearch} />
        <SupportSection goTo={goTo} handleAnchor={handleAnchor} />
        <BlogSection goTo={goTo} />
        <NeighborhoodsSection handleAnchor={handleAnchor} />
        <FinalCTASection onStartSearch={openSearch} />
      </main>

      <Footer handleAnchor={handleAnchor} onStartSearch={openSearch} />

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

export default App;
