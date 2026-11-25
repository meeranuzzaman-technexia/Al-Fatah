/* Text wordmark replaces the FIND SVG lockup.
   Still an SVG so every existing .brand-logo / .footer-logo rule keeps working.
   Tight viewBox = no empty space around the word, so the logo reads clearly
   even at header size. */
export function Logo({ tight = false, ...props }) {
  /* The glyph run of "Al-Fatah" measures ≈318 × 97 units at this font size,
     while the old viewBox was 350 × 96 — 32 units of dead space on the right
     pushed the wordmark visually off-centre. `tight` shrinks the viewBox to the
     real ink bounds so the text is optically centred. */
  const viewBox = tight ? "0 3.86 318.34 97.22" : "0 0 350 96";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      aria-label="Al-Fatah — Builders & Developers"
      role="img"
      {...props}
    >
      <text
        x="0"
        y="76"
        fontFamily="OptimaLTPro Roman, Optima LT Pro, Optima, Georgia, serif"
        fontSize="94"
        fontWeight="400"
        letterSpacing="-2"
        fill="currentColor"
      >
        Al-Fatah
      </text>
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m20.78 12.531-6.75 6.75a.75.75 0 1 1-1.06-1.061l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.469a.75.75 0 1 1 1.06-1.061l6.75 6.75a.75.75 0 0 1 0 1.061"
      />
    </svg>
  );
}

export function ChevronDown(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M17.566 9.431a.8.8 0 0 1 .005 1.131l-1.78 1.797c-.669.674-1.218 1.229-1.708 1.622-.51.41-1.034.712-1.665.792a3.3 3.3 0 0 1-.83 0c-.63-.08-1.154-.382-1.665-.792-.49-.393-1.04-.948-1.707-1.622l-1.781-1.797A.8.8 0 0 1 7.57 9.436L9.32 11.2c.71.716 1.195 1.205 1.606 1.535.398.32.648.424.866.452q.211.027.424 0c.219-.028.468-.133.866-.452.41-.33.897-.819 1.607-1.535l1.747-1.763a.8.8 0 0 1 1.131-.005"
        clipRule="evenodd"
      />
    </svg>
  );
}
