import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { WelcomeSection } from "./components/sections/WelcomeSection.jsx";
import { WhyVideoSection } from "./components/sections/WhyVideoSection.jsx";
import { ProjectsSection } from "./components/sections/ProjectsSection.jsx";
import { ElevationSection } from "./components/sections/ElevationSection.jsx";
import { StepsSection } from "./components/sections/StepsSection.jsx";
import { BlogSection } from "./components/BlogSection.jsx";
import { InstagramSection } from "./components/sections/InstagramSection.jsx";
import { ApprovalsSection } from "./components/sections/ApprovalsSection.jsx";
import { ContactSection } from "./components/sections/ContactSection.jsx";
import { FinalCTASection } from "./components/FinalCTASection.jsx";
import { Footer } from "./components/Footer.jsx";
import { StickyActions } from "./components/StickyActions.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import { useWordWipe } from "./hooks/useWordWipe.js";
import { createScrollHelpers } from "./utils/scroll.js";

function App() {
  const [headerSticky, setHeaderSticky] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);

  // Reverse-sticky header:
  // - 0..40px: over-hero (logo centred, transparent gradient)
  // - > 40px: morphs to sticky white bar & logo swipes smoothly to the left
  // - > 180px: hides on downward scroll, immediately reveals on upward scroll
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;

      setHeaderSticky(y > 40);

      if (y <= 180) {
        setHeaderHidden(false);
      } else if (delta > 3) {
        setHeaderHidden(true);
      } else if (delta < -3) {
        setHeaderHidden(false);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useSmoothScroll(lenisRef, heroRef);
  useWordWipe();
  const { goTo, handleAnchor } = createScrollHelpers(lenisRef);

  return (
    <>
      <Header goTo={goTo} sticky={headerSticky} hidden={headerHidden} />

      <main>
        <Hero heroRef={heroRef} />
        <WelcomeSection />
        <WhyVideoSection />
        <ProjectsSection />
        <ElevationSection />
        <StepsSection />
        <BlogSection lenisRef={lenisRef} />
        <InstagramSection />
        <ApprovalsSection />
        <ContactSection />
        <FinalCTASection />
      </main>

      <Footer handleAnchor={handleAnchor} />
      <StickyActions />
    </>
  );
}

export default App;
