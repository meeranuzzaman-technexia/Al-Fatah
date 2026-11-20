/* Contact Block section — phones, email, booking address & message form. */
import { useState } from "react";
import { CONTACT } from "../../data.js";
import { Container } from "../ported/ui.jsx";
import { Pill } from "../Pill.jsx";
import "../../styles/contact.css";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="section contact-section" data-header-theme="light">
      <Container>
        <span className="eyebrow">{CONTACT.formHeading}</span>
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-grid">
          <div className="contact-info-grid">
            <div>
              <h3 className="contact-subhead">{CONTACT.contactHeading}</h3>
              <ul className="contact-list">
                {CONTACT.phones.map((phone) => (
                  <li key={phone.label}>
                    <a href={phone.href}>{phone.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="contact-subhead">{CONTACT.emailHeading}</h3>
              <ul className="contact-list">
                <li>
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
              </ul>
            </div>

            <div className="contact-address-span">
              <h3 className="contact-subhead">{CONTACT.addressHeading}</h3>
              <p className="contact-address">
                {CONTACT.address}
                <br />
                <a href={CONTACT.mapHref} target="_blank" rel="noreferrer">
                  View on Google Maps
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="contact-subhead">{CONTACT.formHeading}</h3>
            <form className="contact-form" onSubmit={onSubmit}>
              <input className="contact-field" type="text" name="name" placeholder="Name" aria-label="Name" required />
              <input className="contact-field" type="email" name="email" placeholder="Email" aria-label="Email" required />
              <input className="contact-field" type="tel" name="phone" placeholder="Phone" aria-label="Phone" />
              <textarea
                className="contact-field contact-textarea"
                name="message"
                placeholder="Message"
                aria-label="Message"
                required
              />
              <div>
                <Pill text={CONTACT.submit} type="submit" />
              </div>
              {sent && <p className="contact-note">Thank you — your message has been received.</p>}
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
