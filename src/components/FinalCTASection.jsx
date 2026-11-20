import { PillLink } from "./Pill.jsx";
import { FINAL_CTA, MEDIA } from "../data.js";
import "../styles/final-cta.css";

export function FinalCTASection() {
  return (
    <section className="final-cta">
      <div className="final-bg" aria-hidden="true">
        <img src={MEDIA.finalCta} alt="" loading="lazy" />
      </div>
      <div className="final-inner">
        <h2 className="final-title reveal">
          {FINAL_CTA.title} <span>{FINAL_CTA.titleEm}</span>
        </h2>
        <p className="final-sub reveal">{FINAL_CTA.sub}</p>
        <div className="reveal">
          <PillLink text={FINAL_CTA.cta} href={FINAL_CTA.ctaHref} variant="light" />
        </div>
      </div>
    </section>
  );
}
