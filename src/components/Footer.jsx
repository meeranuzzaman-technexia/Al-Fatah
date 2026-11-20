import { Logo } from "./Brand.jsx";
import { FOOTER, MEDIA } from "../data.js";
import "../styles/footer.css";

export function Footer({ handleAnchor }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-intro reveal">{FOOTER.intro}</p>

        <div className="footer-contacts reveal">
          <div>
            <div className="footer-contact-label">{FOOTER.addressHeading}</div>
            <div className="footer-contact-value">
              <a href={FOOTER.addressPhoneHref}>{FOOTER.addressPhone}</a>
              <br />
              <a href={`mailto:${FOOTER.email}`}>{FOOTER.email}</a>
              <br />
              {FOOTER.address}
            </div>
          </div>
          <div>
            <div className="footer-contact-label">{FOOTER.phoneHeading}</div>
            <div className="footer-contact-value footer-phone-list">
              {FOOTER.phones.map((phone) => (
                <a href={phone.href} key={phone.label}>
                  {phone.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-contact-label">{FOOTER.bookingHeading}</div>
            <div className="footer-contact-value">
              {FOOTER.bookingAddress}
              <br />
              <a href={FOOTER.bookingMapHref} target="_blank" rel="noreferrer">
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="footer-gallery reveal">
          <h3>{FOOTER.galleryHeading}</h3>
          <div className="footer-gallery-grid">
            {MEDIA.gallery.map((src) => (
              <img src={src} alt="" loading="lazy" key={src} />
            ))}
          </div>
        </div>

        <div className="footer-nav reveal">
          <nav className="footer-links" aria-label="Extra Links">
            {FOOTER.extraLinks.map((link) => (
              <a href={link.href} key={link.label}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="footer-socials">
            {FOOTER.socials.map((social) => (
              <a href={social.href} target="_blank" rel="noreferrer" key={social.label}>
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="reveal">
          <Logo className="footer-logo" />
          <div className="footer-logo-caption">Builders &amp; Developers</div>
        </div>

        <div className="footer-bottom">
          <div>
            {FOOTER.lockup}
            <br />
            Copyright © 2026
          </div>
          <div className="legal-links">
            {FOOTER.legal.map((link) => (
              <a href={link.href} key={link.label} onClick={(event) => handleAnchor(event, link.href)}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            {FOOTER.copyright.replace("Created by technexia.", "")}
            <a href={FOOTER.creditHref} target="_blank" rel="noreferrer">
              {FOOTER.creditLabel}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
