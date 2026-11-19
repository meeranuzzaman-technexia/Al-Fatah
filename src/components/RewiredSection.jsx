import { Pill } from "./Pill.jsx";

const steps = [
  {
    num: "01",
    title: "Talk to a Real Human.",
    copy: "We match you with an expert who actually listens.",
  },
  {
    num: "02",
    title: "Get Clarity.",
    copy: "We define what you really need, not just what’s available.",
  },
  {
    num: "03",
    title: "Move Forward.",
    copy: "We find what fits — and make it happen.",
  },
];

export function RewiredSection({ onStartSearch }) {
  return (
    <section className="section rewired" id="search">
      <div className="container rewired-grid">
        <div className="rewired-left reveal">
          <h2 className="rewired-title">
            Real Estate,
            <br />
            Rewired.
          </h2>
          <Pill text="Start Your Search" onClick={onStartSearch} />
        </div>
        <div className="reveal">
          <div className="rewired-label">Steps:</div>
          <div className="step-list">
            {steps.map((step) => (
              <div className="step-item" key={step.num}>
                <span>{step.num}</span>
                <span>
                  {step.title}
                  <small>{step.copy}</small>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
