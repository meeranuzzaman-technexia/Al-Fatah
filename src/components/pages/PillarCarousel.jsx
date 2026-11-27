/* ==========================================================================
   Pillar carousel — the About "Vision / Mission / Skills" cards exactly as they
   looked in the grid (same markup, same copy, same photos), but laid out as a
   cover-flow deck: the active card sits upright and centred, the neighbours
   step back and tilt. Cover-flow is the "eye of Saba" illusion: two cards max
   per side, sized to the container so nothing is ever cut off.
   ========================================================================== */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function PillarCarousel({ items = [] }) {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [deckH, setDeckH] = useState(0);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);
  const n = items.length;

  /* measure once, then on resize */
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    const read = () => {
      const r = wrap.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
      // the deck is as tall as its tallest card, so nothing is ever clipped
      const tallest = cardRefs.current.reduce((m, el) => Math.max(m, el ? el.offsetHeight : 0), 0);
      if (tallest) setDeckH(tallest);
    };
    read();
    const ro = new ResizeObserver(read);
    ro.observe(wrap);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [items.length]);

  const go = useCallback((dir) => setActive((i) => (i + dir + n) % n), [n]);

  /* keyboard + swipe */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    let x0 = null;
    const down = (e) => {
      x0 = e.clientX;
    };
    const up = (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    };
    wrap.addEventListener("pointerdown", down);
    wrap.addEventListener("pointerup", up);
    return () => {
      wrap.removeEventListener("pointerdown", down);
      wrap.removeEventListener("pointerup", up);
    };
  }, [go]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    }
  };

  /* geometry: card width from the container, neighbours overlap ~34 % */
  const cardW = box.w < 620 ? clamp(box.w * 0.74, 200, 320) : clamp(box.w * 0.3, 260, 430);
  const gap = cardW * (box.w < 620 ? 0.66 : 0.68);

  return (
    <div
      className="pc"
      ref={wrapRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Vision, mission and skills"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="pc-track" ref={trackRef} style={deckH ? { height: `${deckH}px` } : undefined}>
        {items.map((item, i) => {
          const off = ((i - active + n + n / 2) % n) - n / 2; // -1.5 … +1.5
          const abs = Math.abs(off);
          const visible = abs <= 1.6;
          const side = off === 0 ? 0 : Math.sign(off);
          return (
            <article
              className={`pc-card pillar${off === 0 ? " is-active" : ""}`}
              key={item.label}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              aria-hidden={off === 0 ? undefined : "true"}
              onClick={() => (off === 0 ? null : setActive(i))}
              style={{
                width: `${cardW}px`,
                transform: `translate3d(calc(-50% + ${off * gap}px), ${
                  off === 0 ? 0 : 1.6
                }rem, 0) scale(${off === 0 ? 1 : 0.88}) rotateY(${side * -6}deg)`,
                opacity: visible ? 1 : 0,
                zIndex: 10 - Math.round(abs * 2),
                pointerEvents: visible ? "auto" : "none",
                cursor: off === 0 ? "default" : "pointer",
              }}
            >
              <div className="pillar-media">
                <img src={item.image} alt={item.label} loading="lazy" draggable="false" />
              </div>
              <span className="pillar-label">{item.label}</span>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>

      <div className="pc-nav">
        <button type="button" className="pc-btn" onClick={() => go(-1)} aria-label="Previous" type="button">
          <span aria-hidden="true">←</span>
        </button>
        <div className="pc-dots">
          {items.map((item, i) => (
            <button
              type="button"
              key={item.label}
              className={`pc-dot${i === active ? " is-on" : ""}`}
              onClick={() => setActive(i)}
              aria-label={item.label}
            />
          ))}
        </div>
        <button type="button" className="pc-btn" onClick={() => go(1)} aria-label="Next" type="button">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}

export default PillarCarousel;
