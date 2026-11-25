# Al-Fatah Homepage — Run & Visual Analysis

Repo: `meeranuzzaman-technexia/Al-Fatah` · branch `main` (88a3010 "Font changes!")
Run: `npm install` → `npm run dev` (Vite 7.3.7, React 19) · http://localhost:5173
Tested at 1440×900, 1280×800, 768×1024, 390×844. Screenshots in `shots/`, `shots2/`, `shots3/`, `shots4/`.

**Verdict: 7.5/10.** It looks genuinely premium — editorial serif/optima typography, gold-on-charcoal palette, confident whitespace, good scroll choreography. Console is clean (0 errors, 0 failed requests, 0 images missing `alt`, exactly one `h1`). The gap to "9" is content nitpicks + performance + a11y, listed at the end.

---

## 1. What the page actually is (order & height)

| # | Section | Height (px) | First impression |
|---|---------|------------:|------------------|
| 0 | Hero `#top` — pinned, 2.5 screens | 2,520 | Strong. Ken-burns building, "Modern Architecture" over it, word-wipe → "Al-Fatah" wordmark |
| 1 | Welcome `#welcome` — Director's message | 971 | Clean 2-col: portrait card + long body copy + "Have any question? 03112276442" |
| 2 | Video — pinned, expands to full-bleed | 1,980 | Cinematic; Mux/Cloudinary teaser, clip-path reveal on scroll |
| 3 | Projects `#projects` — 5 sticky slides | 4,892 | The best section. Full-bleed art direction, gold progress rail, price/status per slide |
| 4 | Why Choose Us (Steps) | 1,280 | Sticky heading left, numbered 01–04 list right |
| 5 | News Feed `#news` — swipeable card deck | 3,420 | Layered card stack, 6 articles, Newer/Older + drag/arrow keys |
| 6 | Instagram / reels strip | 1,236 | 3 quote cards "click to expand", location + booking bar |
| 7 | Approvals | 817 | abad member / Cantonment Board Malir / NOC approved cards |
| 8 | Contact `#contact` — offer + form | 827 | Dark forest backdrop, gold submit pill |
| 9 | Footer | 1,516 | Contact columns → giant gold "Al-Fatah" wordmark → legal row |

Total page height ≈ **19,460px** on desktop — long, but it never feels like filler because three sections (hero, video, projects) are scroll-pinned.

## 2. Design quality — what works

- **Typography is the star.** Optima-class display for headings + Graphik for body is a much better pairing than the usual Tailwind-site look. Tracking on eyebrows (`PROJECTS`, `OUR NEWS`) and the `BUILDERS & DEVELOPERS` footer line is exactly right.
- **Palette discipline.** Charcoal `#0a0a0a`, warm cream, single gold accent — carried consistently from header to footer. No stray blues except in imagery.
- **Projects section is portfolio-grade.** Progress rail, "01 / 05 · COMING SOON" meta, per-project price/status (2.17 Crore, "Past Project · Delivered"), Explore/Register dual CTA. This is what sells a developer.
- **Trust work is present and well placed** — abad membership FM 1731, Cantonment Board Malir, NOC/SBCA line — right above the conversion form.
- **Micro-interactions** (magnetic buttons, tilt cards, word-wipe, Lenis smooth scroll) feel intentional rather than decorative.
- **White sticky header morph** — logo slides from center to left when you pass 40px. Nice touch, no layout jump.

## 3. Problems found (ranked)

### High

1. **Hero subtitle sits on a low-contrast patch of photo.** At 1440×900 the two-line subcopy ("We are dedicated to bringing your dreams…") crosses a bright window frame / plant on the right half and mid-grey glass in the middle. It's legible-but-anxious at best; on a bright phone screen it will fail. Fix: a subtle radial/scrim behind the text block, or a text-shadow, or nudge the building crop right. Same issue affects the mobile hero (reads OK there because the crop is brighter at top, but no margin for error).
2. **Every internal link is a dead end in this build.** `Header`, `Footer`, `data.js`, blog cards and project CTAs point to `href="/about-us/"`, `/our-projects/`, `/al-fatah-icon/`, `/apartments-with-elevators…/` etc., but there is **no router** in the bundle. From the homepage every nav item 404s. Either these are meant to be WordPress routes (then the build is a drop-in for WP and this is fine — confirm) or a router/pages need to be added before this ships standalone.
3. **Contact form is a no-op.** `onSubmit` only sets `sent = true` and resets — nothing is posted anywhere. It shows "Thank you — your message has been received", which is a **false confirmation** to a lead. Since `supabase` is connected in this session, wiring the form to a Supabase table + notifying the team is the obvious next step; until then the copy should be honest or the button should be a `wa.me`/`tel:` link.
4. **Image weight.** `public/images` is **23 MB**, and 7 images are being displayed far smaller than their natural size:
   - `Bhrishna Heights   .png` **3.4 MB**, `building.jpg` **3.3 MB**, `Ahmed Mazhar.webp` **2.0 MB** (1880×2272 rendered at 790px, and again at 40px in three places → the same 2 MB file three extra times), `luxury-mixed-use-building-cutout.png` 2.0 MB, `cloud.png` 2248×954 rendered at 936–1124px.
   - `Ahmed Mazhar.webp` is served for 40px thumbnails. Serve a separate small avatar.
   - Convert the PNGs/JPGs to WebP/AVIF, add `srcset` + `sizes`, and use `loading="lazy"` + explicit `width/height` (only some images have it → CLS risk).
   - Note the filename `Bhrishna Heights   .png` has **trailing spaces** — it works locally but is a URL-encoding landmine on some CDNs/servers.
5. **Single-file build is 593 kB HTML (196 kB gzip)** — GSAP + ScrollTrigger + Swiper + framer-motion + lenis + all CSS inlined. Fine for a WP drop-in, heavy for Core Web Vitals on 3G/4G in Pakistan. Tree-shake: `framer-motion` appears alongside GSAP and may be redundant.

### Medium

6. **Mobile hero vertical rhythm.** Logo is cramped against the header edge (52px logo in a 73px bar, 10px top padding) and the building only appears in the bottom third — nearly 900px of sky before anything happens. On a 390px phone the first screen is ~60% empty sky. Recommend a shorter hero on mobile (or a tighter crop) so the building is visible on first paint.
7. **Mobile: "SCROLL" cue and building crop get cut awkwardly** at the section transition to Welcome; the Welcome image leads with a very long paragraph before any heading when you land mid-section (m-heading is above the fold from the previous scroll). Minor, but the paragraph is 12 lines on mobile — consider trimming to 4–5 lines + "Read more" or moving the phone CTA up.
8. **Mobile hero title size.** "Modern Architecture" at ~46px wraps to one line but touches both gutters (20px each side). Add a clamp cap so it can't kiss the edges at 360px.
9. **Blog deck drag affordance.** Card stack + "Newer/Older + ↑/↓" is nice, but there is no visible drag handle and no swipe hint on desktop; the "1 of 6 · scroll, drag, or use Arrow Up / Down" hint is the only clue and it's 12px grey. Also `Older` requires the pointer to hit a `<span>` inside the pill — my automated click missed it twice (top element at center was `SPAN.`); a human will hit it, but the hit target should be the whole pill (it partly is — just thin).
10. **Instagram/reels cards** use the same quote-card treatment as the rest of the site and look almost black-on-black — the middle card's "AMENITIES" overlay competes with the quote text. Also the "Al Fatah Icon" logo + POST badge overlaps the trainer's head in card 1.
11. **Dead/duplicated content in code** — `ElevationSection.jsx`, `components/` legacy files (`AgentsSection`, `WhySection`, `NeighborhoodsSection`, `IdentitySection`, `TimeMachineStack`, `ExpandableCards`…) are not imported in `App.jsx`. Two large commented-out blocks sit inside `ContactSection.jsx` (gallery + label). Fine for a WIP, but it drags the repo's mental model down.
12. **iOS Safari risks** — pinned GSAP scroll sections + Lenis + `100vh` hero need `100dvh` and a `ScrollTrigger.normalizeScroll`/touch check; the video autoplay requires `playsInline` (present ✅) but the Cloudinary MP4 is a single 100%-quality file — no poster frame, so you get a black box until it loads (visible in my 02-section-video-top shot).

### Low / polish

13. Eyebrow copy on "Why Choose Us" says `PROJECTS` — should be something like `WHY US` (it's directly under the Projects section, so it reads as a duplicate label).
14. Footer address column: phone numbers, email, address and the Google Maps link are all stacked in "OUR ADDRESS" while a separate "PHONE NUMBER" column repeats 4 more numbers — confusing hierarchy, and the first column has no label-consistent alignment.
15. Footer legal row mixes "Copyright © 2026" in two places (`Al-Fatah — Builders & Developers Copyright © 2026` + `© Copyrights 2026`), plus `technoxia.` lowercase with a trailing period.
16. `FAIR HOUSING NOTICE` / `REASONABLE ACCOMMODATION NOTICE` / `PRESS` links in a Pakistani developer's footer look copy-pasted from a US real-estate template — either localise or drop.
17. Header: at 1280px the nav sits close to the centered logo and the "Our Projects" caret; nothing broken, just tight. At 768px it correctly collapses to the hamburger.
18. Numbers use a mix of `03112276441-3`, `0311-2276441-3`, `021-35899471-5` — pick one format site-wide.

## 4. Performance snapshot (dev server, 1440×900, headless Chromium)

| Metric | Value |
|---|---|
| FCP | 532 ms |
| DOMContentLoaded / load | 305 / 307 ms |
| Long tasks | 88, 172, 60 ms (GSAP init + WebGL background) |
| Idle FPS | 60 (steady) |
| DOM nodes | 778 (lean) |
| Console errors / failed requests | **0 / 0** |
| Production bundle | `dist/index.html` 593 kB → 196 kB gzip + lazy images |

Runtime is healthy; the cost is all in media (23 MB of source images, one 100%-quality hero video) and in the all-inlined single-file JS. A Lighthouse run on deployed hosting with compressed images should land ~85–92 performance / 95+ accessibility once the contrast and contrast-related items above are fixed.

## 5. If I were shipping this next week

1. Wire the contact form (Supabase table + email/WhatsApp notify) or convert it to `wa.me`/`tel:`. *(highest revenue impact)*
2. Add a scrim behind hero subcopy; re-crop hero for mobile so the building shows on first screen.
3. Image pipeline: WebP/AVIF + `srcset` + small avatar variant for the 40px director thumbnails; target < 1.5 MB above the fold.
4. Decide router vs. WordPress: either add `react-router` routes/pages or document that this is a WP template and the `/about-us/` paths are intentional.
5. Add a poster image for the video section and `preload="metadata"` instead of `auto`.
6. Content pass: "PROJECTS" eyebrow under Projects → "WHY US"; unify phone formats; fix duplicate copyright; drop US-housing legal links.
7. A11y: verify gold-on-cream ratio (`#c9a227`-ish on `#faf7f2` is ~2.4:1) for small text like eyebrows — bump the gold for text use and keep the light gold for large display only.
