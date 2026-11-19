import { Pill } from "./Pill.jsx";

export function FinalCTASection({ onStartSearch }) {
  return (
    <section className="final-cta" id="cta">
      <div className="final-bg" aria-hidden="true">
        <img src="/images/2.41633fa6.webp" alt="" loading="lazy" />
      </div>
      <div className="final-inner">
        <h2 className="final-title reveal">
          Find You. <span>We’ll Help You Get There.</span>
        </h2>
        <div className="reveal">
          <Pill text="Let’s Get Started" variant="light" onClick={onStartSearch} />
        </div>
      </div>
    </section>
  );
}
