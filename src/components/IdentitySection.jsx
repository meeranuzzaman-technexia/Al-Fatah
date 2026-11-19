const chevronImages = [
  "/images/1.e7a1ff18.webp",
  "/images/2.58bf2fb8.webp",
  "/images/3.483e04ae.webp",
  "/images/4.ea5fa732.webp",
];

export function IdentitySection() {
  return (
    <section className="section identity" id="about">
      <div className="container">
        <h2 className="identity-title reveal" data-word-wipe data-wipe-color="#151717">
          This isn’t just <span className="muted">about real estate.</span>
        </h2>
        <div className="chevrons reveal">
          {chevronImages.map((image) => (
            <div className="chevron-card" key={image}>
              <img src={image} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="identity-summary reveal">
          <p data-word-wipe data-wipe-color="#151717">
            It’s about identity. Progress. Getting unstuck. You’re not just looking for a place.{" "}
            <span>You’re looking for alignment. That’s what we help you find.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
