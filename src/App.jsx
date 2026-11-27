import { useEffect, useRef, useState } from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { AboutCopySection } from "./components/sections/AboutCopySection.jsx";
import { WhyVideoSection } from "./components/sections/WhyVideoSection.jsx";
import { ProjectsSection } from "./components/sections/ProjectsSection.jsx";
import { StepsSection } from "./components/sections/StepsSection.jsx";
import { BlogSection } from "./components/BlogSection.jsx";
import { InstagramSection } from "./components/sections/InstagramSection.jsx";
import { ApprovalsSection } from "./components/sections/ApprovalsSection.jsx";
import { ContactSection } from "./components/sections/ContactSection.jsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "./components/Footer.jsx";
import { StickyActions } from "./components/StickyActions.jsx";
import { FatahAI } from "./components/FatahAI.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";
import { useFooterHidden } from "./hooks/useFooterHidden.js";
import { useWordWipe } from "./hooks/useWordWipe.js";
import { createScrollHelpers } from "./utils/scroll.js";
import { useRoute } from "./utils/router.js";
import {
  AboutPage,
  ServicesPage,
  ProjectsPage,
  ProjectPage,
  NewsPage,
  ContactPage,
  TermsPage,
  NotFoundPage,
} from "./components/pages/Pages.jsx";

const PROJECT_SLUGS = ["al-fatah-business-avenue", "al-fatah-icon", "brishna-heights", "al-fatah-pride", "al-fatah-arcade"];

function HomePage({ heroRef, goTo, lenisRef }) {
  return (
    <main>
      <Hero heroRef={heroRef} />
      {/* <AboutCopySection /> */}
      <WhyVideoSection />
      <ProjectsSection goTo={goTo} />
      <StepsSection />
      <BlogSection lenisRef={lenisRef} />
      <InstagramSection />
      <ContactSection />
      <ApprovalsSection />
    </main>
  );
}

function App() {
  const route = useRoute();
  const [headerSticky, setHeaderSticky] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lenisRef = useRef(null);
  const heroRef = useRef(null);

  // Black header:
  // - 0..40px: over-hero (icon centred)
  // - > 40px: morphs to compact sticky bar & icon swipes smoothly to the left
  // - > 10% of hero height: hides on downward scroll, reveals on upward scroll
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      const heroHeight = heroRef.current ? heroRef.current.offsetHeight : window.innerHeight * 2.8;
      const hideThreshold = heroHeight * 0.1;

      setHeaderSticky(y > 40);

      if (y <= hideThreshold) {
        setHeaderHidden(false);
      } else if (delta > 1) {
        setHeaderHidden(true);
      } else if (delta < -3) {
        setHeaderHidden(false);
      } else if (delta === 0) {
        setHeaderHidden(true);
      }

      lastY = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useSmoothScroll(lenisRef, heroRef);
  useFooterHidden();

  // Pinned sections change the document height AFTER first paint, so every
  // ScrollTrigger start/end below them must be re-measured. Without this the
  // video section's timeline ran out before the section reached the viewport.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
    };
  }, []);
  useWordWipe();
  const { goTo, handleAnchor } = createScrollHelpers(lenisRef);

  return (
    <>
      <Header goTo={goTo} sticky={route !== "/" || headerSticky} hidden={route === "/" && headerHidden} />

      {route === "/" ? (
        <HomePage heroRef={heroRef} goTo={goTo} lenisRef={lenisRef} />
      ) : route === "/about-us" ? (
        <AboutPage />
      ) : route === "/services" ? (
        <ServicesPage />
      ) : route === "/our-projects" ? (
        <ProjectsPage />
      ) : route === "/our-news" ? (
        <NewsPage />
      ) : route === "/contact-us" ? (
        <ContactPage />
      ) : route === "/terms-and-conditions" ? (
        <TermsPage />
      ) : PROJECT_SLUGS.includes(route.replace(/^\//, "")) ? (
        <ProjectPage slug={route.replace(/^\//, "")} />
      ) : (
        <NotFoundPage />
      )}

      <Footer handleAnchor={handleAnchor} />
      <StickyActions />
      <FatahAI />
    </>
  );
}

export default App;
