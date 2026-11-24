/* Our Projects section — Centralized intro header + full-screen sticky showcase. */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PROJECTS } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { ArrowRight, Container, Line } from "../ported/ui.jsx";
import "../../styles/projects.css";

export function ProjectsSection({ goTo }) {
  const [active, setActive] = useState(0);
  const [inShowcase, setInShowcase] = useState(false);
  const showcaseRef = useRef(null);
  const panelRefs = useRef([]);

  const ref = useGsapScope((scope) => {
    gsap.from(scope.querySelectorAll("[data-line]"), {
      yPercent: 110,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 75%" },
    });
    gsap.from(scope.querySelectorAll("[data-fade]"), {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope, start: "top 70%" },
    });
  });

  useEffect(() => {
    const onScroll = () => {
      const showcase = showcaseRef.current;
      if (!showcase) return;
      const sr = showcase.getBoundingClientRect();
      const vh = window.innerHeight;
      setInShowcase(sr.top < vh * 0.65 && sr.bottom > vh * 0.35);

      let currentIdx = 0;
      panelRefs.current.forEach((panel, idx) => {
        if (!panel) return;
        const rect = panel.getBoundingClientRect();
        if (rect.top <= vh * 0.45) {
          currentIdx = idx;
        }
      });
      setActive(currentIdx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpToPanel = (idx) => {
    const showcase = showcaseRef.current;
    if (!showcase) return;
    const baseTop = showcase.getBoundingClientRect().top + window.scrollY;
    const targetY = baseTop + idx * window.innerHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="section section-dark projects-section"
      data-header-theme="dark"
    >
      {/* Centralized Top Heading Band */}
      <div className="projects-intro-band">
        <Container>
          <div className="projects-head-centered">
            <span className="eyebrow" data-fade="">
              {PROJECTS.eyebrow}
            </span>
            <h2 className="section-title">
              <Line>
                {PROJECTS.titleLines[0]} <em>{PROJECTS.titleLines[1]}</em>
              </Line>
            </h2>
            <p className="projects-intro" data-fade="">
              {PROJECTS.intro}
            </p>
          </div>
        </Container>
      </div>

      {/* Full-Screen Sticky Stacking Showcase */}
      <div ref={showcaseRef} className="projects-showcase">
        {PROJECTS.rows.map((project, index) => (
          <article
            key={project.num}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="project-panel"
            style={{ zIndex: index + 1 }}
          >
            <img
              src={project.image}
              alt={project.label}
              loading="eager"
              decoding="async"
              className="project-panel-bg"
            />

            <div className="project-panel-scrim" aria-hidden="true" />

            <div className="container project-panel-inner">
              <div className="project-panel-content">
                <div className="project-panel-num">
                  {project.num} / {String(PROJECTS.rows.length).padStart(2, "0")} · {project.status}
                </div>
                <h3 className="project-panel-title">{project.label}</h3>
                <div className="project-panel-location">{project.location}</div>
                <p className="project-panel-spec">{project.spec}</p>

                <div className="project-panel-price-block">
                  <span className="project-panel-price-label">{project.priceLabel}</span>
                  <span className="project-panel-price-value">{project.price}</span>
                </div>

                <div className="project-panel-actions">
                  <a href={project.href} className="project-btn-explore">
                    <span>Explore</span>
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#contact"
                    className="project-btn-register"
                    onClick={(e) => {
                      if (goTo) {
                        e.preventDefault();
                        goTo("#contact");
                      }
                    }}
                  >
                    Register
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Right-edge progress indicator pill */}
        <nav
          className={`projects-rail ${inShowcase ? "is-visible" : ""}`}
          aria-label="Projects navigation"
        >
          {PROJECTS.rows.map((project, index) => (
            <button
              key={project.num}
              type="button"
              aria-label={`Jump to ${project.label}`}
              aria-current={active === index ? "true" : undefined}
              className={`projects-rail-dot ${active === index ? "is-active" : ""}`}
              onClick={() => jumpToPanel(index)}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
