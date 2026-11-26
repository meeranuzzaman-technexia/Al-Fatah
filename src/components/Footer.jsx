import { Logo } from "./Brand.jsx";
import { FOOTER } from "../data.js";
import "../styles/footer.css";

/* Font Awesome 5 free solid brand glyphs (viewBox 0 0 512 512), used with
   fill="currentColor" so they render as solid white marks on the gold circle. */
const FA_PATH = {
  Facebook:
    "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
  LinkedIn:
    "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
  Instagram:
    "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
  YouTube:
    "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
  TikTok:
    "M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17,122.94,122.94,0,0,0,35.09,59.27,121.14,121.14,0,0,0,64.8,33.13v88.13A237.75,237.75,0,0,1,448,209.91Z",
};

const FA_VIEWBOX = {
  Facebook: "0 0 512 512",
  LinkedIn: "0 0 448 512",
  Instagram: "0 0 448 512",
  YouTube: "0 0 576 512",
  TikTok: "0 0 448 512",
};

function SocialIcon({ label }) {
  return (
    <svg
      viewBox={FA_VIEWBOX[label] ?? "0 0 512 512"}
      width="20"
      height="20"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d={FA_PATH[label] ?? FA_PATH.Instagram} />
    </svg>
  );
}


/* ---- small line icons (inline SVG — no external icon font) ---------------- */
const ICONS = {
  /* fa-solid fa-phone */
  phone:
    "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z",
  /* fa-solid fa-envelope */
  mail:
    "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
  /* fa-sharp fa-solid fa-location-dot */
  map:
    "M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z",
};

/* A landline / rotary desk phone (the silhouette of fa-phone-rotary, which is
   a Pro glyph — this is a hand-built stand-in with the same read). */
function RotaryIcon() {
  /* Desk / rotary phone: handset above, tapered base below, dial punched out.
     Built from plain shapes so it still reads at 14px next to the text. */
  return (
    <svg viewBox="0 0 512 512" className="footer-rotary" aria-hidden="true" focusable="false">
      {/* handset */}
      <rect x="58" y="54" width="396" height="66" rx="33" />
      <circle cx="92" cy="88" r="46" />
      <circle cx="420" cy="88" r="46" />
      {/* tapered base with the dial punched out (evenodd) */}
      <path
        fillRule="evenodd"
        d="M186 196h140c16 0 30 7 40 19l62 78c11 14 17 32 17 50v72c0 27-22 49-49 49H116c-27 0-49-22-49-49v-72c0-18 6-36 17-50l62-78c10-12 24-19 40-19Zm70 110a56 56 0 1 0 0 112 56 56 0 1 0 0-112Z"
      />
    </svg>
  );
}

function LineIcon({ kind }) {
  if (kind === "rotary") return <RotaryIcon />;
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={ICONS[kind] ?? ICONS.phone} />
    </svg>
  );
}

/* one icon + one line of text, aligned to the first text line */
function Line({ icon, children, multi = false }) {
  return (
    <span className={`footer-contact-line${multi ? " footer-contact-line--multi" : ""}`}>
      <LineIcon kind={icon} />
      <span className="footer-contact-line-text">{children}</span>
    </span>
  );
}

export function Footer({ handleAnchor }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        {/* <p className="footer-intro reveal">{FOOTER.intro}</p> */}

        <div className="footer-contacts reveal">
          <div>
            <div className="footer-contact-label">{FOOTER.addressHeading}</div>
            <div className="footer-contact-value">
              <Line icon="phone">
                <a href={FOOTER.addressPhoneHref}>{FOOTER.addressPhone}</a>
              </Line>
              <Line icon="mail">
                <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a>
              </Line>
              <Line icon="map" multi>
                <a
                  className="footer-address-link"
                  href={FOOTER.bookingMapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {FOOTER.address}
                </a>
              </Line>
            </div>
          </div>
          <div>
            <div className="footer-contact-label">{FOOTER.phoneHeading}</div>
            <div className="footer-contact-value footer-phone-list">
              {FOOTER.phones.map((phone) => (
                <Line icon={phone.type === "telephone" ? "rotary" : "phone"} key={phone.label}>
                  <a href={phone.href}>{phone.label}</a>
                </Line>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-contact-label">{FOOTER.bookingHeading}</div>
            <div className="footer-contact-value">
              <Line icon="map" multi>
                <a
                  className="footer-address-link"
                  href={FOOTER.bookingMapHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {FOOTER.bookingAddress}
                </a>
              </Line>
            </div>
          </div>
        </div>

        <div className="reveal">
          <Logo className="footer-logo" tight />
          <div className="footer-logo-caption">Builders &amp; Developers</div>

          {/* Social icons live directly under the wordmark caption, styled as
              gold-gradient circles (same gold ramp as the projects section). */}
          <nav className="footer-social-icons" aria-label="Social media">
            {FOOTER.socials.map((social) => (
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                key={social.label}
                className="footer-social-icon"
                aria-label={social.label}
                title={social.label}
              >
                <SocialIcon label={social.label} />
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {/* Desktop keeps the full wording; on phones the legal links need the
                same single line, so the copy drops to a compact form. */}
            <span className="copyright-full">
              © Copyrights {new Date().getFullYear()} – Al Fatah Builders &amp; Developers
            </span>
            <span className="copyright-compact">
              © <span className="copyright-cc">Copyrights</span> {new Date().getFullYear()}{" "}
              Al Fatah <span className="copyright-bd">Builders &amp; Developers</span>
            </span>
          </p>

          <p className="footer-credit-line">
            <span className="credit-created">Created by</span>{" "}
            <a className="footer-technexia" href={FOOTER.creditHref} target="_blank" rel="noreferrer">
              technexia.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
