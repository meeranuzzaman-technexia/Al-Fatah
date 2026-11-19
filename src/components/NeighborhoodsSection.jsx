import { neighborhoods } from "../data.js";

export function NeighborhoodsSection({ handleAnchor }) {
  return (
    <section className="neighborhoods" id="neighborhoods">
      <div className="container">
        <div className="neighborhoods-head reveal">
          <h2>Featured neighborhoods across the tri-state area</h2>
          <a className="neighborhood-link" href="#search" onClick={(event) => handleAnchor(event, "#search")}>
            Explore all neighborhoods →
          </a>
        </div>
        <div className="neighborhood-grid reveal">
          {neighborhoods.map((area) => (
            <div key={area.state}>
              <h3>{area.state}</h3>
              <ul>
                {area.places.map((place) => (
                  <li key={place}>
                    <a href="#search" onClick={(event) => handleAnchor(event, "#search")}>
                      {place}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
