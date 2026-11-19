# FIND Real Estate — React JSX

Plain **React (JSX)** version of the FIND Real Estate site. No TypeScript anywhere.

## Stack

- React 19 + Vite 7
- Tailwind CSS 4 (`@tailwindcss/vite`)
- GSAP + ScrollTrigger (hero parallax, reveal animations)
- Lenis (smooth scroll)
- Swiper (testimonials slider)
- goober + clsx + tailwind-merge (styled `Pill` button + class helper)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Structure

```
index.html
vite.config.js
src/
  main.jsx                 # React entry (createRoot)
  App.jsx                  # page composition only
  index.css                # unchanged design system / all styling
  data.js                  # nav, testimonials, services, blog, listings, neighborhoods
  components/
    Brand.jsx              # Logo, ArrowIcon, ChevronDown (SVG icons)
    Pill.jsx               # goober-styled CTA pill
    Header.jsx             # two-state morphing header (over-hero → sticky)
    Hero.jsx               # parallax hero (GSAP scroll timeline)
    SearchModal.jsx        # property search dialog
    WhySection.jsx
    IdentitySection.jsx
    RewiredSection.jsx     # "Real Estate, Rewired." 3-step block
    AgentsSection.jsx
    TestimonialsSection.jsx# Swiper reviews carousel
    ServicesSection.jsx    # hover-expand Buy / Sell / Rent rows
    SupportSection.jsx
    BlogSection.jsx
    NeighborhoodsSection.jsx
    FinalCTASection.jsx
    Footer.jsx             # newsletter + contacts + socials + legal
  hooks/
    useSmoothScroll.js     # Lenis + GSAP registration & helpers
    useWordWipe.js         # scroll-driven word-by-word text colour fill
  utils/
    cn.js                  # clsx + tailwind-merge
    scroll.js              # goTo / handleAnchor scroll helpers
public/
  images/                  # all site images + video
```

## Header states

The header animates between two layouts on scroll (see the reference stills):

- **over-hero** — full-bleed translucent bar. Nav splits around a centred
  FIND wordmark (`Search · Neighborhoods · Agents` left, rest right), white text,
  outlined Sign In pill.
- **sticky** — compact solid-white bar. The wordmark slides to the far left, the
  nav merges into one centred row, text turns grey, Sign In becomes a dark pill.

Everything is CSS-transitioned off a single `sticky` prop set in `App.jsx`;
there is no layout thrash because both states share the same grid.

## Word wipe animation

Large copy fills in word-by-word as it scrolls into view (grey → full contrast),
matching the live FIND site. Opt in by adding attributes:

```jsx
<p data-word-wipe data-wipe-color="#151717">Your copy…</p>
```

- `data-wipe-color` — final colour (default `#151717`)
- `data-wipe-soft` — starting colour (default `var(--muted)`)
- Dark sections: `data-wipe-color="#ffffff" data-wipe-soft="rgba(255,255,255,0.35)"`
- Nested `<span>` / `.muted` / `.em` emphasis is skipped and keeps its own colour
- Put the attribute on a plain block element (never on a CSS grid/flex container)
- `prefers-reduced-motion` users get static, fully readable text

Active sections: Why, Identity, Agents, Services brief, Support, Blog.

## Notes

- `index.css` is carried over unchanged so the design renders 1:1 with the original design.
- All component class names match the original stylesheet.
- Fonts (`/images/instrument-sans.woff2`, `/images/lora.woff2`) are referenced by the CSS but were not part of the source repo — the site falls back to system fonts until you drop those files into `public/images/`.
- `vite.config.js` has `server.allowedHosts: [".e2b.app"]` only so the dev server can be opened inside an online sandbox preview. It has no effect on `localhost` — remove that line if you prefer.
