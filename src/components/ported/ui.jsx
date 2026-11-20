/* Shared UI primitives backed by src/styles/base.css & src/styles/ui.css */

export function Container({ children, className = "" }) {
  return <div className={`container ${className}`.trim()}>{children}</div>;
}

export function Line({ children, className = "" }) {
  return (
    <span className={`line-mask ${className}`.trim()}>
      <span className="line-mask-inner" data-line="">
        {children}
      </span>
    </span>
  );
}

export function ArrowRight({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9.5M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
