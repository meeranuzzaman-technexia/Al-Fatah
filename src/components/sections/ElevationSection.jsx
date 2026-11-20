/* Interactive 3D Elevation Showcase Section — Al Fatah Business Avenue. */
import gsap from "gsap";
import { ELEVATION } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import { BuildingViewer } from "../BuildingViewer.jsx";
import "../../styles/elevation.css";

export function ElevationSection() {
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
  });

  return (
    <section
      ref={ref}
      id="elevation"
      className="section elevation-section"
      data-header-theme="dark"
    >
      <Container>
        <div className="elevation-top-rule">
          <div className="elevation-head">
            <div>
              <span className="eyebrow elevation-eyebrow" data-fade="">
                {ELEVATION.eyebrow}
              </span>
              <h2 className="section-title">
                {ELEVATION.titleLines.map((line) => (
                  <Line key={line}>{line}</Line>
                ))}
              </h2>
            </div>

            <div className="elevation-intro" data-fade="">
              <p className="elevation-intro-text">{ELEVATION.intro}</p>
              <PillLink text={ELEVATION.cta} href={ELEVATION.ctaHref} variant="light" />
            </div>
          </div>

          <div data-fade="">
            <BuildingViewer src={ELEVATION.image} alt={ELEVATION.alt} />
          </div>

          <div className="elevation-bar" data-fade="">
            <span className="elevation-hint">
              <span className="elevation-hint-dot" aria-hidden="true" />
              <span>{ELEVATION.hint}</span>
            </span>
            <span>{ELEVATION.meta}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
