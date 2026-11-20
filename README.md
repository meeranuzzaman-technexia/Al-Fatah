# Al-Fatah Builders & Developers — Homepage (merged build)

Plain **React (JSX)** site. This is the `Al-Fatah` repo (base) with selected
sections ported in from the `Al-Fatah-new` variant, all copy replaced with the
Al-Fatah homepage content, the missing Al-Fatah sections added, and the extra
FIND-only sections removed.

See **[MAPPING.md](./MAPPING.md)** for the full section-by-section map and all
content decisions.

## Run

```bash
npm install       # or npm ci
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/ (single-file output)
npm run preview
```

## Stack

- React 19 + Vite 7 (JSX, no TypeScript)
- Modular plain CSS under `src/styles/` (one file per section + `tokens.css` / `base.css` / `ui.css`)
- GSAP + ScrollTrigger, Lenis smooth scroll, Swiper slider

## Structure

```
index.html
vite.config.js
src/
  main.jsx                     # React entry
  App.jsx                      # page composition only
  index.css                    # imports Tailwind + tokens.css + base.css + ui.css
  data.js                      # ALL Al-Fatah homepage content (single source)
  styles/
    tokens.css                 # fonts, colours, unified typography & spacing tokens
    base.css                   # reset, body/heading defaults, .container & .section
    ui.css                     # .eyebrow, .section-title, .body-text, .btn, .pill-button
    header.css                 # Header (over-hero / sticky, mega menu, mobile drawer)
    hero.css                   # Hero parallax tower, clouds, outline wordmark, scroll cue
    welcome.css                # Director's Welcome 2-column section
    video.css                  # Dedicated video section
    projects.css               # Our Projects dark hover-row section
    steps.css                  # Why Choose Us sticky + numbered steps
    news.css                   # News Feed rows
    instagram.css              # Instagram Feed Swiper carousel
    approvals.css              # Membership & Approvals
    contact.css                # Contact block + inquiry form
    final-cta.css              # Final CTA banner
    footer.css                 # Site footer
    sticky-actions.css         # Floating WhatsApp & Call Now pills
  components/
    Brand.jsx                  # text-based Al-Fatah SVG wordmark + icons
    Header.jsx                 # two-state header + projects mega menu
    Hero.jsx                   # parallax hero, Al-Fatah copy
    Pill.jsx                   # Pill button + PillLink (link variant)
    Footer.jsx                 # footer WITHOUT .footer-top
    FinalCTASection.jsx        # .final-cta
    BlogSection.jsx            # News Feed
    StickyActions.jsx          # Floating WhatsApp / Call Now
    ported/ui.jsx              # Shared Container, Line, Button, ArrowRight
    sections/
      WelcomeSection.jsx       # 2-column Director's Welcome
      WhyVideoSection.jsx      # Dedicated scroll-expanding video section
      ProjectsSection.jsx      # "Our Projects" hover rows
      StepsSection.jsx         # "Why Choose Us" + GSAP animation
      InstagramSection.jsx     # Instagram Swiper slider
      ApprovalsSection.jsx     # Membership & Approvals
      ContactSection.jsx       # Contact block + message form
  hooks/
    useSmoothScroll.js         # Lenis + GSAP hero / reveal
    useWordWipe.js             # scroll-driven word wipe
    useGsapScope.js            # GSAP context hook
  utils/                       # cn + anchor scroll helpers
public/
  fonts/                       # OptimaLTPro-Roman.woff2 & Graphik-Regular.woff2
  images/                      # image assets
```

## Ported sections (from Al-Fatah-new)

`WhyUs` (video), `Rewired` (Steps), `Services`, and `Testimonials` were copied
1:1 — TSX → JSX, type annotations removed — including their goober CSS and all
GSAP animations. A `:root` block at the end of `index.css` supplies the exact
design tokens those components expect, so their colours and fonts are
unchanged. The original `--ink` / `--soft` / `--blue` tokens are untouched for
the sections that stayed on the base design.

## Media / fonts / colours

- **No image, video, logo or font was taken from the live alfatahbuilders.com
  site.** All images are the ones already in `public/images/`.
- The video in `WhyVideoSection` is the placeholder from the `Al-Fatah-new`
  variant (Pexels) — `VIDEO` in `src/data.js`. Replace it later.
- ABAD / Malir Board / NOC are text placeholders (no logos were downloaded).
- Fonts: unchanged (`Instrument Sans` / `Lora` families). As in the original
  repo, the local `instrument-sans.woff2` / `lora.woff2` files are not included,
  so the browser falls back to system fonts until you add them.
- Colours: unchanged in both design systems (`#151717`, `#fff`, `#d92424`
  accent, `--soft` grey).

## Notes

- `#welcome` + `#video` split (`WelcomeSection.jsx` + `WhyVideoSection.jsx`):
  `id="welcome"` now renders the 2-column Director's Welcome layout (Director
  visual card on the left with `AHMED MAZHAR` / `DIRECTOR, AL FATAH BUILDERS
  & DEVELOPERS`; `WELCOME TO`, heading, body copy, `About us` button, and
  question phone block on the right). Right after `#welcome`, `#video` renders
  the dedicated full-width video section with the original scroll-driven
  `clipPath` inset-to-full animation and GSAP reveals preserved.
- Fonts & consistent sizing (`public/fonts/` + `index.css`): `OptimaLTPro Roman`
  (`OptimaLTPro-Roman.woff2`) is used for all headings (`h1`–`h6`) and
  `Graphik` Regular (`Graphik-Regular.woff2`) for all body/UI text. Section
  main headings (`--text-h2`), subheadings (`--text-h3`), body copy
  (`--text-body`), eyebrows (`--text-eyebrow`), container width
  (`--container-max: 144rem`), gutters (`--gutter`), and vertical section
  padding (`--section-y`) are unified across the site (Hero `h1` and
  hover-expand `ProjectsSection` titles keep their display scale).
- Hero tuning (`index.css` + `hooks/useSmoothScroll.js`): the attached
  `Brishna Heights   .png` is the `.hero-house` tower and is visible from the
  first frame (`top: 34vh`, `height: 116rem`). The `.hero-smoke` layer was
  removed — its PNG painted a hard grey horizontal band over the building
  during the scroll animation. The white `.hero-overlay` is now only a soft
  16rem bottom fade. The outlined "Al-Fatah" reveal and its descriptor are
  **black** (`#151717`) with a white halo for legibility.
- Scroll / animation feel: Lenis `duration: 1.9`, `wheelMultiplier: 0.8`;
  GSAP hero timeline uses `scrub: 1.4` + `sine.inOut` eases, no hard cuts;
  anchor scrolls last 1.6s and the SCROLL cue pulses every 3s. Adjust these
  in `hooks/useSmoothScroll.js`, `utils/scroll.js` and `.scroll-cue i`.
- Header wordmark: `Brand.jsx` renders a tight single-line "Al-Fatah" SVG; size
  is controlled by `.brand-logo` in `index.css` (10.5rem over the hero, 9.5rem
  sticky, 8.5rem on small screens). The adjacent descriptor is
  `.brand-wordmark`. Increase/decrease those two values to resize the lockup.
- `dist/index.html` is a single-file build (vite-plugin-singlefile).
- `vite.config.js` keeps `server.allowedHosts: [".e2b.app"]` for sandbox
  previews; it has no effect on localhost.
- Internal page links (`/about-us/`, `/al-fatah-icon/`, …) keep the exact paths
  from the source site. Main nav items use working in-page anchors for this
  single-page preview; `navGroups[].path` holds the original destination.
- The contact form is front-end only — no backend is wired.
