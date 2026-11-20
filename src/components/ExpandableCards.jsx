/* SmoothUI-style interactive Expandable Cards (pure React + modular CSS). */
import { useEffect } from "react";
import { ArrowRight } from "./ported/ui.jsx";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayBadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

export function ExpandableCards({ cards, selectedCard, onSelect, className = "" }) {
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape" && selectedCard !== null) {
        onSelect(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [selectedCard, onSelect]);

  const toggleCard = (id) => {
    onSelect(selectedCard === id ? null : id);
  };

  return (
    <div className={`exp-cards-row ${className}`.trim()}>
      {cards.map((card) => {
        const isSelected = selectedCard === card.id;
        return (
          <article
            key={card.id}
            role="button"
            tabIndex={0}
            aria-expanded={isSelected}
            aria-label={`${card.title}, ${isSelected ? "expanded" : "collapsed"}`}
            className={`exp-card ${isSelected ? "is-expanded" : ""}`}
            onClick={() => toggleCard(card.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleCard(card.id);
              }
            }}
          >
            {/* Visual Media Pane */}
            <div className="exp-card-media">
              <img src={card.image} alt="" loading="lazy" decoding="async" />
              <div className="exp-card-scrim" aria-hidden="true" />

              <div className="exp-card-media-top">
                <span className="exp-card-kind">
                  {card.isReel ? (
                    <>
                      <PlayBadgeIcon />
                      <span>Reel</span>
                    </>
                  ) : (
                    <span>Post</span>
                  )}
                </span>
              </div>

              <div className="exp-card-media-bottom">
                <h3 className="exp-card-overlay-title">&ldquo;{card.title}&rdquo;</h3>
                <span className="exp-card-overlay-hint">
                  {isSelected ? "Expanded" : "Click to expand"}
                </span>
              </div>
            </div>

            {/* Expandable Detail Pane */}
            <div className="exp-card-panel" aria-hidden={!isSelected}>
              <div className="exp-card-panel-inner">
                <div className="exp-card-panel-head">
                  <div className="exp-card-author">
                    {card.author.image ? (
                      <img
                        src={card.author.image}
                        alt={card.author.name}
                        className="exp-card-avatar-img"
                      />
                    ) : (
                      <span className="exp-card-avatar-badge" aria-hidden="true">
                        AF
                      </span>
                    )}
                    <div className="exp-card-author-meta">
                      <span className="exp-card-author-name">{card.author.name}</span>
                      <span className="exp-card-author-role">{card.author.role}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="exp-card-close"
                    aria-label={`Collapse ${card.title}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(null);
                    }}
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="exp-card-panel-body">
                  <h4 className="exp-card-panel-title">&ldquo;{card.title}&rdquo;</h4>
                  <p className="exp-card-panel-copy">{card.content}</p>
                </div>

                <div className="exp-card-panel-foot">
                  <span className="exp-card-tag">{card.author.role}</span>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    className="exp-card-ext"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View on Instagram <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ExpandableCards;
