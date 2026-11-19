export function WhySection() {
  return (
    <section className="section why" id="why">
      <div className="container">
        <div className="why-grid reveal">
          <div>
            <p className="section-eyebrow">Why FIND</p>
          </div>
          <div className="why-text" data-word-wipe data-wipe-color="#151717">
            <p>
              Your life’s changing. Don’t just find a place — find what’s next. We help you move forward with
              clarity, confidence, and the right agent by your side.
            </p>
          </div>
        </div>
        <div className="why-video reveal">
          <video
            src="/images/why-us.mp4"
            poster="/images/1.f6e8f2e8.webp"
            autoPlay
            playsInline
            loop
            muted
            aria-label="Life at FIND"
          />
        </div>
      </div>
    </section>
  );
}
