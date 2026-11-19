import { useState } from "react";
import { Logo } from "./Brand.jsx";
import { Pill } from "./Pill.jsx";

export function Footer({ handleAnchor, onStartSearch }) {
  const [email, setEmail] = useState("");
  const [newsletterNote, setNewsletterNote] = useState("");

  function handleNewsletter(event) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setNewsletterNote("Please enter a valid email address.");
      return;
    }
    setNewsletterNote("Thanks — you’re on the list.");
    setEmail("");
  }

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="reveal">
            <h2>Subscribe to our Newsletter!</h2>
            <form className="newsletter-form" onSubmit={handleNewsletter}>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Your email address"
              />
              <button type="submit" aria-label="Subscribe">
                →
              </button>
            </form>
            <div className="newsletter-note">{newsletterNote}</div>
          </div>
          <div className="reveal">
            <h2>Let’s find what moves you.</h2>
            <Pill text="Start Your Search" variant="light" onClick={onStartSearch} />
          </div>
        </div>

        <div className="footer-contacts reveal">
          <div>
            <div className="footer-contact-label">Head Office</div>
            <div className="footer-contact-value">
              5 West 37th Street, 12th Floor,
              <br />
              New York, NY 10018
            </div>
          </div>
          <div>
            <div className="footer-contact-label">Email Us</div>
            <div className="footer-contact-value">
              <a href="mailto:hello@findrealestate.com">hello@findrealestate.com</a>
            </div>
          </div>
          <div>
            <div className="footer-contact-label">Call Us</div>
            <div className="footer-contact-value">
              <a href="tel:+12129949965">+1 212 994 9965</a>
            </div>
          </div>
        </div>

        <div className="footer-nav reveal">
          <div className="footer-links">
            <a href="#search" onClick={(event) => handleAnchor(event, "#search")}>
              Search
            </a>
            <a href="#agents" onClick={(event) => handleAnchor(event, "#agents")}>
              Agents
            </a>
            <a href="#agents" onClick={(event) => handleAnchor(event, "#agents")}>
              Join
            </a>
            <a href="#why" onClick={(event) => handleAnchor(event, "#why")}>
              About Us
            </a>
            <a href="https://app.findrealestate.com/login" target="_blank" rel="noreferrer">
              Agent Portal
            </a>
          </div>
          <div className="footer-socials">
            <a href="https://facebook.com/findrealestate.hq" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://www.instagram.com/findrealestate.hq" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.youtube.com/@findrealestate_hq" target="_blank" rel="noreferrer">
              Youtube
            </a>
            <a href="https://www.linkedin.com/company/findrealestate-hq" target="_blank" rel="noreferrer">
              Linkedin
            </a>
          </div>
        </div>

        <div className="reveal">
          <Logo className="footer-logo" />
          <div className="footer-logo-caption">Real Estate</div>
        </div>

        <div className="footer-bottom">
          <div>
            FIND Real Estate
            <br />
            Copyright © 2026
          </div>
          <div className="legal-links">
            <a href="#terms" onClick={(event) => event.preventDefault()}>
              Terms
            </a>
            <a href="#privacy" onClick={(event) => event.preventDefault()}>
              Privacy policy
            </a>
            <a href="#fair-housing" onClick={(event) => event.preventDefault()}>
              Fair Housing Notice
            </a>
            <a href="#accommodation" onClick={(event) => event.preventDefault()}>
              Reasonable Accommodation Notice
            </a>
            <a href="#procedure" onClick={(event) => event.preventDefault()}>
              Operating Procedure
            </a>
            <a href="#press" onClick={(event) => event.preventDefault()}>
              Press
            </a>
            <a href="#vouchers" onClick={(event) => event.preventDefault()}>
              Housing Choice Vouchers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
