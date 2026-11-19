import { createElement } from "react";
import { setup, styled } from "goober";
import { ArrowIcon } from "./Brand.jsx";

setup(createElement);

const GooberPill = styled("button")`
  border: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;

  &:focus-visible {
    outline: 2px solid var(--blue);
    outline-offset: 3px;
  }
`;

export function Pill({ text, onClick, variant = "dark", className = "", type = "button" }) {
  return (
    <GooberPill
      type={type}
      onClick={onClick}
      className={`pill-button ${variant === "light" ? "light" : ""} ${variant === "outline" ? "outline" : ""} ${className}`}
    >
      <span className="pill-text">
        <span data-text={text}>{text}</span>
      </span>
      <ArrowIcon className="pill-arrow" />
    </GooberPill>
  );
}
