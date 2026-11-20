/* Our Projects section — dark theme, hover-expanding rows & GSAP reveals. */
import { useState } from "react";
import gsap from "gsap";
import { PROJECTS } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { ArrowRight, Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import "../../styles/projects.css";

export function ProjectsSection() {
  const [active, setActive] = useState(0);
  const total = PROJECTS.rows.length;

  const ref = useGsapScope((scope) => {
    gsap.from(scope.querySelectorAll("[data-line]"), {
      yPercent: 110,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 70%" },
    });
    gsap.from(scope.querySelectorAll("[data-fade]"), {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope, start: "top 65%" },
    });
    scope.querySelectorAll("[data-row]").forEach((row) => {
      gsap.from(row, {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 90%" },
      });
    });
  });

  return (
    <section ref={ref} id="projects" className="section section-dark projects-section" data-header-theme="dark">
      <Container>
        <div className="projects-head">
          <div>
            <span className="eyebrow" data-fade="">
              {PROJECTS.eyebrow}
            </span>
            <h2 className="section-title">
              {PROJECTS.titleLines.map((line, index) => (
                <Line key={line}>{index === 1 ? <em>{line}</em> : line}</Line>
              ))}
            </h2>
          </div>
          <p className="projects-intro" data-fade="">
            {PROJECTS.intro}
          </p>
        </div>

        <ul className="projects-list">
          {PROJECTS.rows.map((project, index) => (
            <li
              key={project.num}
              className={`projects-row ${active === index ? "active" : ""}`}
              data-row=""
              onMouseEnter={() => setActive(index)}
            >
              <a href={project.href} className="projects-row-link">
                <div className="projects-row-grid">
                  <span className="projects-num">{project.num}</span>
                  <h3 className="projects-label">{project.label}</h3>
                  <p className="projects-row-text">{project.text}</p>
                  <div className="projects-media">
                    <img src={project.image} alt="" loading="lazy" decoding="async" />
                  </div>
                  <span className="projects-arrow">
                    <ArrowRight size={36} />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="projects-foot" data-fade="">
          {/* <div className="projects-controls">
            <button type="button" onClick={() => setActive((active - 1 + total) % total)}>
              Prev
            </button>
            <button type="button" onClick={() => setActive((active + 1) % total)}>
              Next
            </button>
            <span>Drag</span>
            <a href={PROJECTS.mapHref} target="_blank" rel="noreferrer">
              Map
            </a>
          </div> */}
          <PillLink text={PROJECTS.cta} href={PROJECTS.ctaHref} variant="outline" />
        </div>
      </Container>
    </section>
  );
}
