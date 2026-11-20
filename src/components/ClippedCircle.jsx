/* Pointer-tracking ClippedCircle with mix-blend-mode: difference (pure React + CSS). */
import { useEffect, useRef, useState } from "react";

export function ClippedCircle({
  className = "",
  circleClassName = "",
  circleSize = 800,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "50%" });

  useEffect(() => {
    const container = containerRef.current;
    const parent = container?.parentElement;
    if (!container || !parent) return undefined;

    const updatePos = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x: `${x}%`, y: `${y}%` });
    };

    const handleMouseEnter = (e) => {
      updatePos(e);
      setIsHovered(true);
    };

    const handleMouseMove = (e) => {
      updatePos(e);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mousemove", handleMouseMove);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mousemove", handleMouseMove);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`clipped-circle-wrap ${className}`.trim()}
    >
      <div
        className={`clipped-circle-dot ${circleClassName}`.trim()}
        style={{
          left: position.x,
          top: position.y,
          width: circleSize,
          height: circleSize,
          transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
        }}
      />
    </div>
  );
}

export default ClippedCircle;
