/* ==========================================================================
   Inner pages — shared shell + per-page layouts.
   Deliberately re-uses the home page's tokens, fonts, pills and scroll-reveal
   behaviour so the inner pages feel like the same site.
   ========================================================================== */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import { navigate } from "../../utils/router.js";
import "../../styles/pages.css";
import { usePageMotion, useMagnetic } from "./usePageMotion.jsx";

export { Marquee } from "./usePageMotion.jsx";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------- page shell -- */
export function PageShell({
  eyebrow,
  title,
  lead,
  image,
  figure,
  figureAlt,
  children,
  dark = false,
  breadcrumb = true,
}) {
  const ref = useRef(null);
  useMagnetic();

  // per-route document title (SPA shell keeps one index.html)
  useEffect(() => {
    const nice = title && title.length < 70 ? title : eyebrow;
    document.title = nice ? `${nice} - AlFatah Builders & Developers` : "AlFatah Builders & Developers";
    const desc = document.querySelector('meta[name="description"]');
    if (desc && lead) desc.setAttribute("content", lead.slice(0, 158));
  }, [title, eyebrow, lead]);

  // scroll choreography for the whole page (hero split, card batches,
  // parallax, skew, closing CTA) — re-runs whenever the route changes
  usePageMotion([title]);

  return (
    <div className="inner-page" ref={ref}>
      <section
        className={`page-hero ${dark ? "is-dark" : ""} ${breadcrumb ? "" : "no-crumb"} ${
          figure ? "has-figure" : ""
        }`}
      >
        {image && (
          <div className="page-hero-media" aria-hidden="true">
            <img src={image} alt="" />
          </div>
        )}
        {figure && (
          <figure className="page-hero-figure">
            <img src={figure} alt={figureAlt || ""} />
          </figure>
        )}
        <Container>
          {breadcrumb && (
            <nav className="crumb" aria-label="Breadcrumb" data-reveal="">
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/");
                }}
              >
                Home
              </a>
              <span aria-hidden="true">/</span>
              <i>{eyebrow || title}</i>
            </nav>
          )}
          <div className="page-hero-inner">
            {(!breadcrumb || !eyebrow) && (
              <span className="eyebrow" data-reveal="">
                {eyebrow}
              </span>
            )}
            <h1 className="page-hero-title" data-reveal="">
              {title}
            </h1>
            {lead && (
              <p className="page-hero-lead" data-reveal="">
                {lead}
              </p>
            )}
          </div>
        </Container>
      </section>
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- reveal --- */
/* IntersectionObserver rather than a ScrollTrigger tween: if a visitor lands
   mid-page (or jumps with an anchor) the element is already above the
   viewport, and a scroll-triggered tween would leave the copy invisible. */
export function Reveal({ as: Tag = "div", className = "", children, delay = 0, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    el.style.transitionDelay = delay ? `${delay}s` : "";
    el.classList.add("reveal-init");

    const show = () => el.classList.add("is-in");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // visible, or already scrolled past
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            show();
            io.disconnect();
          }
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------ section UI --- */
export function SectionHeading({ eyebrow, title, lead }) {
  return (
    <Reveal className="page-section-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="page-section-title">{title}</h2>
      {lead && <p className="page-section-lead">{lead}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------ project card -- */
export function ProjectCard({ item, index }) {
  return (
    <Reveal className="project-card" delay={(index % 3) * 0.06}>
      <a
        className="project-card-link"
        href={item.href}
        onClick={(event) => {
          event.preventDefault();
          navigate(item.href);
        }}
      >
        <div className="project-card-media">
          <img src={item.image} alt={item.title} loading="lazy" />
          {item.tag && <span className="project-card-tag">{item.tag}</span>}
        </div>
        <h3 className="project-card-title">{item.title}</h3>
        <span className="project-card-more">Discover Now →</span>
      </a>
    </Reveal>
  );
}

/* -------------------------------------------------------------- news card -- */
export function NewsCard({ item, index, onOpen }) {
  return (
    <Reveal className="news-card" delay={(index % 3) * 0.06}>
      <a
        className="news-card-link"
        href={item.href}
        onClick={(event) => {
          event.preventDefault();
          if (onOpen) onOpen(item);
          else navigate(item.href);
        }}
      >
        <div className="news-card-media">
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
        <div className="news-card-body">
          <span className="news-card-meta">
            <i>{item.date}</i>
            {item.cat && <em>{item.cat}</em>}
          </span>
          <h3 className="news-card-title">{item.title}</h3>
          {item.excerpt && <p className="news-card-excerpt">{item.excerpt}</p>}
          <span className="news-card-more">Learn More →</span>
        </div>
      </a>
    </Reveal>
  );
}

/* --------------------------------------------------------------- galleries -- */
export function Gallery({ images, title }) {
  return (
    <section className="page-section page-gallery">
      <Container>
        <SectionHeading eyebrow="Gallery" title={title || "Project Gallery"} />
        <div className="gallery-grid">
          {images.map((src, i) => (
            <Reveal className="gallery-item" key={src + i} delay={(i % 3) * 0.05}>
              <img src={src} alt="" loading="lazy" />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- CTA --- */
export function PageCta({
  title = "Get in touch with us for free consultation",
  button = "Contact Us",
  href = "/contact-us/",
  image,
}) {
  return (
    <section className="page-cta">
      {image && (
        <div className="page-cta-media" aria-hidden="true">
          <img src={image} alt="" loading="lazy" />
        </div>
      )}
      <Container>
        <div className="page-cta-inner">
          <h2 data-cta-lines="">{title}</h2>
          <span className="page-cta-btn">
          <PillLink
            text={button}
            href={href}
            variant="light"
            onClick={(event) => {
              event.preventDefault();
              navigate(href);
            }}
          />
          </span>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- info list -- */
export function FactList({ facts }) {
  return (
    <dl className="fact-list">
      {facts.map(([label, value]) => (
        <Reveal className="fact-row" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

export function BulletGrid({ items, title, columns = 2 }) {
  return (
    <Reveal className="bullet-block">
      {title && <h3 className="bullet-title">{title}</h3>}
      <ul className="bullet-grid" style={{ columnCount: columns }}>
        {items.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </Reveal>
  );
}
