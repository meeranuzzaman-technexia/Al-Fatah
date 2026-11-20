import { ArrowIcon } from "./Brand.jsx";

export function Pill({
  text,
  onClick,
  variant = "dark",
  className = "",
  type = "button",
  icon = null,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`pill-button ${variant === "light" ? "light" : ""} ${variant === "outline" ? "outline" : ""} ${className}`.trim()}
    >
      {icon && <span className="pill-icon" aria-hidden="true">{icon}</span>}
      <span className="pill-text">
        <span data-text={text}>{text}</span>
      </span>
      <ArrowIcon className="pill-arrow" />
    </button>
  );
}

export function PillLink({
  text,
  href,
  variant = "dark",
  className = "",
  target,
  rel,
  onClick,
  icon = null,
}) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      className={`pill-button ${variant === "light" ? "light" : ""} ${variant === "outline" ? "outline" : ""} ${className}`.trim()}
    >
      {icon && <span className="pill-icon" aria-hidden="true">{icon}</span>}
      <span className="pill-text">
        <span data-text={text}>{text}</span>
      </span>
      <ArrowIcon className="pill-arrow" />
    </a>
  );
}
