/* SmoothUI-style 3D Time Machine Stack driven smoothly by scroll progress + controls. */
import { useRef } from "react";

const VISIBLE_COUNT = 4;

export function TimeMachineStack({
  items,
  progress,
  activeIndex,
  onSelectIndex,
  className = "",
}) {
  const dragStartYRef = useRef(null);
  const lastIndex = items.length - 1;

  const handlePointerDown = (e) => {
    if (e.target.closest("a, button")) return;
    dragStartYRef.current = e.clientY;
  };

  const handlePointerUp = (e) => {
    if (dragStartYRef.current === null) return;
    const dy = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    if (Math.abs(dy) < 34) return;
    if (dy < 0) {
      onSelectIndex(Math.min(activeIndex + 1, lastIndex));
    } else {
      onSelectIndex(Math.max(activeIndex - 1, 0));
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        onSelectIndex(Math.min(activeIndex + 1, lastIndex));
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        onSelectIndex(Math.max(activeIndex - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        onSelectIndex(0);
        break;
      case "End":
        e.preventDefault();
        onSelectIndex(lastIndex);
        break;
      default:
        break;
    }
  };

  const activeItem = items[activeIndex];

  return (
    <div
      role="listbox"
      tabIndex={0}
      aria-label="Time machine stack"
      aria-activedescendant={activeItem ? `tm-item-${activeItem.id}` : undefined}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        dragStartYRef.current = null;
      }}
      className={`tm-stack ${className}`.trim()}
    >
      <span className="sr-only" aria-live="polite">
        Item {activeIndex + 1} of {items.length}
      </span>

      <div className="tm-stage">
        {items.map((item, i) => {
          const offset = i - progress;
          const isFront = i === activeIndex;
          const isBehind = offset > 0.15 && offset <= VISIBLE_COUNT;

          let transform = "translate3d(0, 0, 0) scale(1)";
          let opacity = 1;
          let zIndex = VISIBLE_COUNT + 4 - Math.max(0, Math.round(offset));
          let pointerEvents = Math.abs(offset) < 0.45 ? "auto" : "none";

          if (offset < 0) {
            // Card exiting forward past the viewer — clears swiftly so text never ghosts
            const t = Math.min(1, -offset);
            transform = `translate3d(0, ${t * 110}px, ${t * 220}px) scale(${1 + t * 0.08})`;
            opacity = Math.max(0, 1 - t * 2.8);
            zIndex = VISIBLE_COUNT + 6;
            pointerEvents = opacity > 0.2 && t < 0.2 ? "auto" : "none";
          } else if (offset > VISIBLE_COUNT) {
            transform = `translate3d(0, -${VISIBLE_COUNT * 24}px, -${VISIBLE_COUNT * 36}px) scale(${1 - VISIBLE_COUNT * 0.045})`;
            opacity = 0;
            zIndex = 0;
            pointerEvents = "none";
          } else {
            const yShift = offset * 24;
            const zShift = offset * 36;
            const scale = 1 - offset * 0.045;
            transform = `translate3d(0, -${yShift}px, -${zShift}px) scale(${scale})`;

            // Panels inside the visible window stay 100% opaque; only the far entering edge fades in
            if (offset > VISIBLE_COUNT - 1) {
              opacity = Math.max(0, 1 - (offset - (VISIBLE_COUNT - 1)));
            } else {
              opacity = 1;
            }
            if (isBehind) {
              pointerEvents = "auto";
            }
          }

          return (
            <div
              key={item.id}
              id={`tm-item-${item.id}`}
              role="option"
              aria-selected={isFront}
              aria-hidden={opacity <= 0.02}
              onClick={() => {
                if (isBehind) {
                  onSelectIndex(i);
                }
              }}
              className={`tm-panel ${isFront ? "is-front" : ""} ${isBehind ? "is-behind" : ""}`}
              style={{
                transform,
                opacity,
                zIndex,
                pointerEvents,
              }}
            >
              {item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TimeMachineStack;
