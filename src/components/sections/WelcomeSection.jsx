/* Director's Welcome section (2-column layout). */
import gsap from "gsap";
import { MEDIA, WELCOME } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import "../../styles/welcome.css";

export function WelcomeSection() {
  const ref = useGsapScope((scope) => {
    const lines = scope.querySelectorAll("[data-line]");
    if (lines.length) {
      gsap.from(lines, {
        yPercent: 110,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: { trigger: scope, start: "top 75%" },
      });
    }
    const fades = scope.querySelectorAll("[data-fade]");
    if (fades.length) {
      gsap.from(fades, {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: scope, start: "top 70%" },
      });
    }
  });

  return (
    <section ref={ref} id="welcome" className="section welcome-section" data-header-theme="light">
      <Container>
        <div className="welcome-grid">
          <div className="welcome-card" data-fade="">
            <img src={MEDIA.director} alt={WELCOME.name} loading="lazy" />
            <div className="welcome-card-caption">
              <h3 className="welcome-director-name">{WELCOME.name}</h3>
              <p className="welcome-director-role">{WELCOME.role}</p>
            </div>
          </div>

          <div className="welcome-content">
            <span className="eyebrow" data-fade="">
              {WELCOME.eyebrow}
            </span>
            <h2 className="section-title welcome-title">
              <Line>{WELCOME.statement}</Line>
            </h2>
            <p className="body-text" data-fade="">
              {WELCOME.body}
            </p>
            <div className="welcome-actions" data-fade="">
              <PillLink text={WELCOME.cta} href={WELCOME.ctaHref} />
              <div className="welcome-phone-block">
                <span className="welcome-phone-icon" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="welcome-question">
                  <span>{WELCOME.question}</span>
                  <a href={WELCOME.phoneHref}>{WELCOME.phone}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
