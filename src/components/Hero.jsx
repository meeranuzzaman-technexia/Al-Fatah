import { Logo } from "./Brand.jsx";
import { Pill } from "./Pill.jsx";

export function Hero({ heroRef, onFindProperties }) {
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
          <div className="hero-smoke">
            <img src="/images/smoke.9f683cb4.png" alt="" />
          </div>
          <div className="hero-overlay" />
        </div>
        <div className="hero-logo-reveal" aria-hidden="true">
          <Logo />
          <span>Real Estate</span>
        </div>
        <div className="hero-content">
          <div className="hero-title">
            <h1>Find What Moves You</h1>
          </div>
          <p className="hero-text">
            Expert agents. Real guidance. <span className="em">A clear path to find what’s next.</span>
          </p>
          <div className="hero-actions">
            <Pill text="Find Properties" onClick={onFindProperties} />
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
