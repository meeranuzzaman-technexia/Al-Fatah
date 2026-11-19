import { Pill } from "./Pill.jsx";
import { supportCards } from "../data.js";

export function SupportSection({ goTo, handleAnchor }) {
  return (
    <section className="section support" id="support">
      <div className="container">
        <div className="support-head reveal">
          <h2 className="support-title" data-word-wipe data-wipe-color="#ffffff" data-wipe-soft="rgba(255, 255, 255, 0.4)">
            Support
            <br />
            Beyond <span>Buying</span>
            <br />
            <span>and Selling</span>
          </h2>
          <div>
            <p data-word-wipe data-wipe-color="#ffffff" data-wipe-soft="rgba(255, 255, 255, 0.4)">
              The real estate market never stands still — and neither do we.{" "}
              <span>Our experts offer continued support beyond the sale, helping you maximize your investment.</span>
            </p>
            <Pill text="Discover Our Services" variant="light" onClick={() => goTo("#cta")} />
          </div>
        </div>
        <div className="support-cards">
          {supportCards.map((card) => (
            <article className="support-card reveal" key={card.title}>
              <div className="support-image">
                <img src={card.image} alt={card.title} loading="lazy" />
              </div>
              <div className="support-card-shade" aria-hidden="true" />
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <a className="text-link support-card-more" href="#cta" onClick={(event) => handleAnchor(event, "#cta")}>
                <span>Learn More</span>
                <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
