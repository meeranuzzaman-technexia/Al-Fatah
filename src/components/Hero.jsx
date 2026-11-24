import { Logo } from "./Brand.jsx";
import { PillLink } from "./Pill.jsx";
import { HERO } from "../data.js";
import "../styles/hero.css";

export function Hero({ heroRef }) {
  return (
    <section className="hero-scroll" id="top" ref={heroRef}>
      <div className="hero-sticky">
        <div className="hero-bg">
          <div className="hero-back">
            <img src="/images/back.f53e9773.webp" alt="" />
          </div>
          <div className="hero-house">
            <img src="/images/Brishna Heights   .png" alt="" />
          </div>
          <div className="hero-clouds">
            <div className="hero-cloud left">
              <img src="/images/cloud.c8800fa9.png" alt="" />
            </div>
            <div className="hero-cloud right">
              <img src="/images/cloud.c8800fa9.png" alt="" />
            </div>
          </div>
          {/* .hero-smoke removed — its PNG painted a hard grey horizontal band
              across the building during the scroll animation. */}
          <div className="hero-overlay" />
        </div>
        <div className="hero-logo-reveal" aria-hidden="true">
          <div className="hero-logo-stack">
            <Logo className="hero-logo-outline" />
            <Logo className="hero-logo-fill" />
          </div>
          <span>Builders &amp; Developers</span>
        </div>
        <div className="hero-content">
          <div className="hero-title">
            <h1>{HERO.heading}</h1>
          </div>
          <p className="hero-text">{HERO.sub}</p>
          <div className="hero-actions">
            <PillLink text={HERO.cta} href={HERO.ctaHref} />
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  );
}
