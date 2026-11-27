/* Interactive 3D perspective tilt + parallax photo viewer (pure React + modular CSS). */
import { useRef } from "react";

const MAX_TILT = 4; // degrees of tilt at the edges
const MAX_SHIFT = 14; // px the photo drifts against the frame
const KEY_STEP = 0.35; // how far one arrow key press moves (range is -1 to 1)

export function BuildingViewer({
  src = "/images/elevation.webp",
  alt = "Night render of the Al Fatah Business Avenue tower",
  className = "",
}) {
  const frameRef = useRef(null);
  const photoRef = useRef(null);
  const pose = useRef({ x: 0, y: 0 });

  // x and y run from -1 to 1. Nothing moves until the user interacts.
  function setPose(x, y) {
    const frame = frameRef.current;
    const photo = photoRef.current;
    if (!frame || !photo) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    pose.current = { x, y };
    frame.style.transform = `rotateY(${x * MAX_TILT}deg) rotateX(${-y * MAX_TILT}deg)`;
    photo.style.transform = `translate3d(${-x * MAX_SHIFT}px, ${-y * MAX_SHIFT}px, 0) scale(1.08)`;
  }

  function handlePointerMove(e) {
    if (e.pointerType === "touch") return; // keep touch scrolling untouched
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPose(x, y);
  }

  function handleKeyDown(e) {
    const { x, y } = pose.current;
    const clamp = (v) => Math.max(-1, Math.min(1, v));
    switch (e.key) {
      case "ArrowLeft":
        setPose(clamp(x - KEY_STEP), y);
        break;
      case "ArrowRight":
        setPose(clamp(x + KEY_STEP), y);
        break;
      case "ArrowUp":
        setPose(x, clamp(y - KEY_STEP));
        break;
      case "ArrowDown":
        setPose(x, clamp(y + KEY_STEP));
        break;
      case "Escape":
        setPose(0, 0);
        break;
      default:
        return;
    }
    e.preventDefault();
  }

  return (
    <div
      tabIndex={0}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setPose(0, 0)}
      onKeyDown={handleKeyDown}
      role="img"
      aria-label={`${alt}. Use arrow keys to tilt the view, Escape to reset.`}
      className={`building-viewer ${className}`.trim()}
    >
      <div ref={frameRef} className="building-viewer-frame">
        <div ref={photoRef} className="building-viewer-photo">
          <img src={src} alt="" loading="eager" decoding="async" />
        </div>
        {/* Soft edge falloff so the tilt never shows a hard photo edge */}
        <div className="building-viewer-vignette" aria-hidden="true" />
      </div>
    </div>
  );
}

export default BuildingViewer;
