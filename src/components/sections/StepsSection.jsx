/* Why Choose Us section — sticky heading + numbered steps. */
import gsap from "gsap";
import { WHY_STEPS } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import "../../styles/steps.css";

export function StepsSection() {
  const ref = useGsapScope((scope) => {
    gsap.from(scope.querySelectorAll("[data-line]"), {
      yPercent: 110,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.12,
      scrollTrigger: { trigger: scope, start: "top 70%" },
    });

    gsap.from(scope.querySelectorAll("[data-fade]"), {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 65%" },
    });

    scope.querySelectorAll("[data-step]").forEach((step) => {
      gsap.from(step, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: step, start: "top 88%" },
      });
    });
  });

  return (
    <section ref={ref} className="section steps-section" data-header-theme="light">
      <Container>
        <div className="steps-grid">
          <div className="steps-sticky">
            <span className="eyebrow" data-fade="">
              {WHY_STEPS.eyebrow}
            </span>
            <h2 className="section-title">
              {WHY_STEPS.titleLines.map((line, index) => (
                <Line key={line}>{index === 1 ? <em>{line}</em> : line}</Line>
              ))}
            </h2>
            <div className="steps-cta" data-fade="">
              <PillLink text={WHY_STEPS.cta} href={WHY_STEPS.ctaHref} />
            </div>
          </div>

          <ol className="steps-list">
            {WHY_STEPS.items.map((step) => (
              <li key={step.title} className="steps-item" data-step="">
                <span className="steps-num">{step.num}</span>
                <h3 className="steps-title">{step.title}</h3>
                <p className="body-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
