import { useEffect, useState } from "react";
import { listings } from "../data.js";

export function SearchModal({ onClose }) {
  const [purpose, setPurpose] = useState("buy");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("any");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  const matches = listings.filter((item) => {
    if (item.type !== purpose) return false;
    if (location.trim() && !(item.title + item.location).toLowerCase().includes(location.trim().toLowerCase())) return false;
    const value = Number(item.price.replace(/[^0-9]/g, ""));
    if (budget === "value" && value > (purpose === "rent" ? 5200 : 2000000)) return false;
    if (budget === "premium" && value < (purpose === "rent" ? 5200 : 2000000)) return false;
    return true;
  });

  const visible = submitted ? matches : listings.slice(0, 3);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="search-modal" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <button className="modal-close" onClick={onClose} aria-label="Close search">
          ×
        </button>
        <div className="modal-eyebrow">Find your next address</div>
        <h2 id="search-title">Find Properties</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-field">
            <label htmlFor="purpose">I want to</label>
            <select id="purpose" value={purpose} onChange={(event) => setPurpose(event.target.value)}>
              <option value="buy">Buy a home</option>
              <option value="rent">Rent a home</option>
            </select>
          </div>
          <div className="search-field">
            <label htmlFor="location">Where</label>
            <input
              id="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Neighborhood, city, or address"
            />
          </div>
          <div className="search-field">
            <label htmlFor="budget">Price range</label>
            <select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)}>
              <option value="any">Any price</option>
              <option value="value">Lower range</option>
              <option value="premium">Premium range</option>
            </select>
          </div>
          <button className="search-submit" type="submit">
            Show matching homes
          </button>
        </form>

        <div className="results-head">
          <h3>{submitted ? "Your matches" : "Featured homes"}</h3>
          <span>{visible.length} properties</span>
        </div>
        <div className="result-list">
          {visible.map((item) => (
            <article className="result-card" key={item.title}>
              <img src={item.image} alt="" />
              <div>
                <h4>{item.title}</h4>
                <p>
                  {item.location} · {item.beds} · {item.baths} · {item.area}
                </p>
              </div>
              <strong>{item.price}</strong>
            </article>
          ))}
          {submitted && visible.length === 0 && (
            <p className="section-lead">No exact matches right now. Try another neighborhood or price range.</p>
          )}
        </div>
      </div>
    </div>
  );
}
