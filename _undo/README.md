# Undo / revert — About section clone

The live About section is now `src/components/sections/AboutCopySection.jsx`
(ported from stillform.homes, with Al-Fatah's own copy from `ABOUT` in `src/data.js`).

## Kisi bhi waqt wapas purane About par jaana ho to:

```bash
cd /home/user/Al-Fatah
cp _undo/App.original.jsx src/App.jsx
```

Bas. Build dobara chalao (`npm run build`) aur purana "Director's Welcome"
section wapas aa jayega. `AboutCopySection.jsx`, `about-copy.css` aur
`data.js` ka `ABOUT` block chhod dena safe hai — wo tab use hi nahi hote.

## Files jo is clone ne add kiye

| File | Kya hai |
| --- | --- |
| `src/components/sections/AboutCopySection.jsx` | Naya About section (GSAP pinned morph timeline) |
| `src/styles/about-copy.css` | Uska CSS (Instrument Serif + Familjen Grotesk @font-face) |
| `public/fonts/InstrumentSerif-*.woff2`, `public/fonts/FamiljenGrotesk-Variable.woff2` | Self-hosted fonts |
| `public/images/about/*.webp` | Cloud/tile/slide images (stillform se, replaceable) |
| `src/data.js` → `export const ABOUT` | Copy + image list |

## Poora section hi nikaal dena ho

`src/App.jsx` me `<AboutCopySection />` line delete kar dein.
