/* Instagram Feed section — SmoothUI ExpandableCards + profile summary + meta strip. */
import { useState } from "react";
import gsap from "gsap";
import { INSTAGRAM, MEDIA } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import { ExpandableCards } from "../ExpandableCards.jsx";
import "../../styles/instagram.css";

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

const cleanBioItems = INSTAGRAM.bio.map((line) => line.replace(/^[^\w\d]+/u, "").trim());

const igCards = INSTAGRAM.posts.map((post, index) => ({
  id: index + 1,
  title: post.caption,
  content: post.detail,
  image: MEDIA.project[index % MEDIA.project.length],
  href: post.href,
  isReel: post.href.includes("/reel/"),
  author: {
    image: MEDIA.director,
    name: `@${INSTAGRAM.handle}`,
    role: post.tag,
  },
}));

export function InstagramSection() {
  const [selected, setSelected] = useState(null);

  const ref = useGsapScope((scope) => {
    gsap.from(scope.querySelectorAll("[data-line]"), {
      yPercent: 110,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: { trigger: scope, start: "top 70%" },
    });
    gsap.from(scope.querySelectorAll("[data-fade]"), {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: scope, start: "top 65%" },
    });
  });

  return (
    <section ref={ref} className="section instagram-section" data-header-theme="light">
      <Container>
        <div className="instagram-head">
          <div className="instagram-heading-col">
            <span className="eyebrow instagram-eyebrow" data-fade="">
              <InstagramGlyph />
              <span>Instagram · @{INSTAGRAM.handle}</span>
            </span>
            <h2 className="section-title">
              <Line>Life at Al-Fatah</Line>
              <Line>
                <em>50 Years of Service.</em>
              </Line>
            </h2>
          </div>

          <div className="instagram-head-actions" data-fade="">
            <PillLink text={INSTAGRAM.cta} href={INSTAGRAM.ctaHref} target="_blank" rel="noreferrer" />
          </div>
        </div>

        <div className="instagram-profile-bar" data-fade="">
          <div className="instagram-bio">
            {cleanBioItems.map((line) => (
              <span key={line} className="instagram-bio-pill">
                {line}
              </span>
            ))}
          </div>
          <span className="instagram-hint-label">Select any card to expand</span>
        </div>

        <div data-fade="">
          <ExpandableCards cards={igCards} selectedCard={selected} onSelect={setSelected} />
        </div>

        <div className="instagram-meta-strip" data-fade="">
          <div className="instagram-meta-item">
            <span className="instagram-meta-label">Location</span>
            <a href={INSTAGRAM.contact.mapHref} target="_blank" rel="noreferrer">
              {INSTAGRAM.contact.location}
            </a>
          </div>
          <div className="instagram-meta-item">
            <span className="instagram-meta-label">Booking &amp; Details</span>
            <a href={INSTAGRAM.contact.phoneHref}>{INSTAGRAM.contact.phone}</a>
          </div>
          <div className="instagram-meta-item">
            <span className="instagram-meta-label">Email</span>
            <a href={`mailto:${INSTAGRAM.contact.email}`}>{INSTAGRAM.contact.email}</a>
          </div>
          <div className="instagram-meta-item">
            <span className="instagram-meta-label">Social Hub</span>
            <a href={INSTAGRAM.contact.linktree} target="_blank" rel="noreferrer">
              linktr.ee/alfatahgroup
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
