/* Spring-damped 3D Tilt wrapper (pure React + rAF, zero external dependencies). */
import { useEffect, useRef } from "react";

export function Tilt({
  children,
  className = "",
  style,
  rotationFactor = 15,
  isReverse = false,
}) {
  const ref = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let active = true;
    const step = () => {
      if (!active) return;
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.14;
      current.current.y += dy * 0.14;

      const rx = (isReverse ? 1 : -1) * current.current.y * rotationFactor * 2;
      const ry = (isReverse ? -1 : 1) * current.current.x * rotationFactor * 2;

      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        rafId.current = requestAnimationFrame(step);
      } else {
        rafId.current = null;
      }
    };

    el._startTiltLoop = () => {
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(step);
      }
    };

    return () => {
      active = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [rotationFactor, isReverse]);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    target.current.x = (e.clientX - rect.left) / rect.width - 0.5;
    target.current.y = (e.clientY - rect.top) / rect.height - 0.5;
    el._startTiltLoop?.();
  };

  const handleMouseLeave = () => {
    target.current.x = 0;
    target.current.y = 0;
    ref.current?._startTiltLoop?.();
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default Tilt;
