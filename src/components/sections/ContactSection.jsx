/* Image-led combined final offer + contact inquiry section. */
import { useState } from "react";
import { ArrowRight, Mail, MessageSquare, Phone, User } from "lucide-react";
import { CONTACT, FINAL_CTA, FOOTER, MEDIA } from "../../data.js";
import { Container } from "../ported/ui.jsx";
import { Pill } from "../Pill.jsx";
import { TiltCard } from "../TiltCard.jsx";
import { SmokeyBackground } from "../SmokeyBackground.jsx";
import "../../styles/contact.css";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const onSubmit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };

  return (
    <>
    <section id="contact" className="contact-section" data-header-theme="dark">
      <div className="contact-backdrop" aria-hidden="true"><img src={MEDIA.finalCta} alt="" loading="lazy" /><span /></div>
      <SmokeyBackground />
      <Container>
        <div className="contact-combined-grid">
          <div className="contact-pitch">
            <p className="contact-offer-label">A COMPLETE LIFESTYLE</p>
            <h2>{FINAL_CTA.title}<br /><em>{FINAL_CTA.titleEm}</em></h2>
            <p className="contact-offer-copy">{FINAL_CTA.sub}</p>
            <a className="contact-call-link" href={FINAL_CTA.ctaHref}><Phone size={17} strokeWidth={1.7} /> {FINAL_CTA.cta} <ArrowRight size={17} /></a>
            <div className="contact-side-note"><span>01</span><span>Have a question? Leave your details<br />and our team will get back to you.</span></div>
          </div>

          <div className="contact-form-card">
            <div className="contact-form-heading"><span>LET’S TALK</span><h3>{CONTACT.formHeading}</h3><p>Tell us a little about what you’re looking for.</p></div>
            <form className="contact-form" onSubmit={onSubmit}>
              <label className="contact-field-wrap"><User aria-hidden="true" size={17} /><input type="text" name="name" placeholder="Your name" aria-label="Your name" autoComplete="name" required /></label>
              <label className="contact-field-wrap"><Mail aria-hidden="true" size={17} /><input type="email" name="email" placeholder="Email address" aria-label="Email address" autoComplete="email" required /></label>
              <label className="contact-field-wrap"><Phone aria-hidden="true" size={17} /><input type="tel" name="phone" placeholder="Phone number" aria-label="Phone number" autoComplete="tel" required /></label>
              <label className="contact-field-wrap contact-message-wrap"><MessageSquare aria-hidden="true" size={17} /><textarea name="message" placeholder="How can we help?" aria-label="How can we help?" required /></label>
              <Pill text="Send inquiry" type="submit" className="contact-submit-pill" />
              {sent && <p className="contact-note" role="status">Thank you — your message has been received.</p>}
              <p className="contact-form-privacy">Your details are only used to respond to your inquiry.</p>
            </form>
          </div>
        </div>
      </Container>
    </section>
    <section className="contact-gallery-section">
      <Container>
        <div className="footer-gallery">
          <h3>{FOOTER.galleryHeading}</h3>
          <div className="footer-gallery-grid">
            {FOOTER.galleryItems.map((item) => (
              <TiltCard
                key={item.title}
                title={item.title}
                description={item.description}
                price={item.price}
                badgeLabel={item.badgeLabel}
                badgeVariant={item.badgeVariant}
                imageSrc={item.imageSrc}
                imageAlt={item.title}
                href={item.href}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
