/* Director's Welcome section (2-column layout). */
import gsap from "gsap";
import { MEDIA, WELCOME } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { useMagnetic } from "../../hooks/useMagnetic.js";
import { Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import "../../styles/welcome.css";

export function WelcomeSection() {
  const ref = useGsapScope((scope) => {
    /* ---- Title line reveal ---- */
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

    /* ---- Fade-up (eyebrow, body, actions). Card ab isme nahi hai ---- */
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

    /* ---- Idea 1: clip-path reveal + zoom settle + inner parallax ---- */
    const card = scope.querySelector(".welcome-card");
    const img = card.querySelector("img");

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // 1) Curtain reveal (neeche se upar)
      gsap.fromTo(
        card,
        { clipPath: "inset(100% 0% 0% 0% round 6px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 6px)",
          duration: 1.6,
          ease: "power4.inOut",
          scrollTrigger: { trigger: scope, start: "top 70%" },
        }
      );

      // 2) Zoom-out settle
      gsap.fromTo(
        img,
        { scale: 1.35 },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: scope, start: "top 70%" },
        }
      );

      // 3) Scroll parallax (image card ke andar)
      gsap.fromTo(
        img,
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    /* ---- Idea 5: caption mask slide-up ---- */
    const captions = scope.querySelectorAll("[data-caption]");
    if (captions.length) {
      gsap.from(captions, {
        yPercent: 120,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.14,
        delay: 0.9, // clip-path reveal ke beech/baad aaye
        scrollTrigger: { trigger: scope, start: "top 70%" },
      });
    }
  });

  // Idea 5: magnetic phone icon + CTA
  const phone = useMagnetic({ strength: 0.45 });
  const cta = useMagnetic({ strength: 0.25 });

  return (
    <section ref={ref} id="welcome" className="section welcome-section" data-header-theme="light">
      <Container>
        <div className="welcome-grid">
          {/* data-fade yahan se hata diya (clip-path se conflict hota) */}
          <div className="welcome-card">
            <img src={MEDIA.director} alt={WELCOME.name} loading="lazy" />
            <div className="welcome-card-caption">
              <div className="caption-mask caption-mask--name">
                <h3 className="welcome-director-name" data-caption="">
                  {WELCOME.name}
                </h3>
              </div>
              <div className="caption-mask">
                <p className="welcome-director-role" data-caption="">
                  {WELCOME.role}
                </p>
              </div>
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
              <div className="magnetic-area" ref={cta.areaRef}>
                <div className="magnetic-mover" ref={cta.moverRef}>
                  <PillLink text={WELCOME.cta} href={WELCOME.ctaHref} />
                </div>
              </div>

              <div className="welcome-phone-block" ref={phone.areaRef}>
                <span className="welcome-phone-icon" ref={phone.moverRef} aria-hidden="true">
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