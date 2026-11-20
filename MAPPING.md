# Section & content mapping

Base: **`Al-Fatah` (JSX)** · Sections ported from: **`Al-Fatah-new` (TSX)** ·
Content source: homepage extraction dated **19 Nov 2026**.

## Final section order

| # | Section in build | Component | Origin | Al-Fatah content used |
|---|---|---|---|---|
| 1 | Header (2-state + mega menu) | `Header.jsx` | base | Logo lockup, Home / About Us / Services / Our Projects / Our News / Contact Us, projects mega menu (Coming Soon / Ongoing / Past), **Call Now** |
| 2 | Hero | `Hero.jsx` | base | **Modern Architecture**, sub-text, **Call Now** → `tel:+923112276442`. Now a real `<h1>` (SEO fix) |
| 3 | Director's Welcome | `WelcomeSection.jsx` (`#welcome`) | **NEW (split)** | 2-column layout: Director card left (AHMED MAZHAR / DIRECTOR…), Welcome To · **Al Fatah Builders & Developers** · full bio · **About us** · "Have any question? 03112276442" right |
| 4 | Project Film (**video**) | `WhyVideoSection.jsx` (`#video`) | **ported — `WhyUs`** | Dedicated full-width video section right below `#welcome`, preserving the scroll-driven `clipPath` expansion & GSAP reveals |
| 4 | Our Projects | `ProjectsSection.jsx` | **ported — `Services`** | eyebrow **Projects** · **Our Projects** · intro · 4 numbered rows (AL Fatah Icon, Brishna Heights, AL Fatah Pride, AL Fatah Arcade) with Discover Now · **View All** · Prev / Next / Drag / Map controls |
| 5 | Why Choose Us | `StepsSection.jsx` | **ported — `Rewired` (Steps)** | eyebrow **Projects** · **Why Choose Us** · 4 numbered items BEST QUALITY / STRATEGY / INTEGRITY / SUSTAINABILITY with their exact descriptions · **About us** |
| 6 | News Feed | `BlogSection.jsx` | **base (old blog)** | **News Feed** · all 6 posts (19 Nov … 02 Nov) with dates, titles, descriptions, **Learn More** · **View All** |
| 7 | Instagram Feed | `InstagramSection.jsx` | **ported — `Testimonials`** | **alfatahgroupofficial** · profile bio (5 lines) · 3 embedded posts (captions, links) · **Follow on Instagram** · shared contact block (location / map / phone / email / website / linktree) |
| 8 | Membership & Approvals | `ApprovalsSection.jsx` | **NEW** | **Member of** · **ABAD** → abad.com.pk · **Membership Number: FM 1731** · **All Projects Are SBCA Approved.** · **Approvals** · Malir Board · NOC |
| 9 | Contact Block | `ContactSection.jsx` | **NEW** | **Contact Us** (4 numbers) · **Email** · **Booking Address** (+ map link) · **Send us a message** form · **Submit Now** |
| 10 | Final CTA | `FinalCTASection.jsx` | **base `.final-cta`** | "A complete lifestyle, now at an exceptional value." · PKR 2.41 → 2.17 Crore offer line · **Call Now** |
| 11 | Footer (no `footer-top`) | `Footer.jsx` | base | Logo, intro, **Our Address**, **Extra Links**, **Gallery**, 5 socials, **Phone Number**, **BOOKING ADDRESS**, copyright + technexia credit |
| 12 | Floating buttons | `StickyActions.jsx` | **NEW** | **WhatsApp us** · **Call Now** |

## `go4269305053 go2486072181`

These are goober-generated classes in `Al-Fatah-new`. `go4269305053` is the
generic `sectionCls` (on every section) and `go2486072181` is the grey
`background: var(--color-alt)` rule. Two sections carry the pair: the
**Testimonials slider** and the **Blog / Resources** section.

Per your instruction — *"Testimonials new wala rakhna blogs old wale"* — the
**new variant's Testimonials** was ported (it now renders the Instagram Feed)
and the **base repo's old BlogSection** was kept (it now renders the News Feed).
The ported slider still outputs exactly `go4269305053 go2486072181`.

## Added / removed

**Added (present in Al-Fatah content, absent from the design):** Director's
caption inside the video Why section, Our Projects rows, Why Choose Us numbered
items, Membership & Approvals, Contact block + form, projects mega menu, Gallery
(with local placeholder images), floating WhatsApp / Call Now, Prev/Next/Drag/Map
controls.

**Removed (FIND-only extras with no Al-Fatah content):** `IdentitySection`,
`AgentsSection`, `NeighborhoodsSection`, `SupportSection`, `WhySection`,
`RewiredSection`, `TestimonialsSection`, `ServicesSection`, `SearchModal` —
deleted from `src/components/` and removed from `App.jsx`.
**`.footer-top`** (newsletter + "Let's find what moves you" CTA) was removed
from the footer markup **and** from `index.css`.

## Content decisions (from the "Content Issues Noticed" list)

| Issue | Done |
|---|---|
| No H1 on homepage | Hero headline **Modern Architecture** is now `<h1>` |
| WHY CHOOSE US duplicate INTEGRITY, broken /1,/3,/2,/3,/4 | Duplicate removed → 4 items, numbering **/1 … /4** |
| Grammar ("50 years experience of in service", "biggest asset, who is backed", "expanding at the rapid phase") | Fixed in the Director's Welcome paragraph and STRATEGY card |
| Malformed tel links (`tel:031122764413`, `tel:+9231122764413`) | Corrected to `tel:03112276442` / `tel:03112276441` |
| "Projects" eyebrow reused above WHY CHOOSE US | Kept verbatim (it is the source copy) |
| Empty "Gallery" heading | Populated with 3 existing local images |
| Mega-menu parent items linking to `#` | Rendered as non-clickable group labels |

Everything else (titles, descriptions, phone numbers, dates, blog titles,
Instagram captions, addresses, social URLs, copyright) is verbatim from the
extracted content.

## Links

- Main nav uses **working in-page anchors** (`#top`, `#welcome`, `#projects`,
  `#news`, `#contact`) so the single-page preview is usable. Each entry keeps
  its original destination in `data.js → navGroups[].path`.
- Project / news / legal links keep the **exact paths** from the source site
  (`/al-fatah-icon/`, `/our-news/`, …). They are real-page placeholders; wire
  them up when those pages exist.
- External URLs (ABAD, Facebook, LinkedIn, Instagram, YouTube, TikTok,
  linktr.ee, Google Maps, technexia) are exactly as provided.
- Email links use `mailto:info@alfatahbuilders.com`; phone links use the
  `tel:` values from the extraction (with the two malformed ones fixed).

## Media

No asset from the live site was used. `src/data.js → MEDIA` points to files
already in `public/images/`. `VIDEO` still points to the Pexels placeholder from
`Al-Fatah-new` — replace it when you change the media. Fonts and colours were
not changed; the ported sections use their own exact design tokens (appended to
`:root` in `index.css`), the base sections keep theirs.

## Verification

Hero regression check (Chromium, 1440×900 + 390×800, scroll 0 / 1000 / 1500):
building visible from the first frame, no grey band, outlined "Al-Fatah" in
black, smooth cross-fade, 0 page errors.

`npm ci` → `npm run build` passes. A DOM render check confirms: 9 sections,
H1 "Modern Architecture", 6 news posts, 3 Instagram slides, 4 project rows,
4 why-choose-us steps, 3 mega-menu groups, no `footer-top`, `.final-cta`
present, goober styles injected, and zero remaining "FIND" copy.
