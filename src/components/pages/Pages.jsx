/* ==========================================================================
   Inner page layouts
   ========================================================================== */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  PageShell,
  Reveal,
  ProjectCard,
  NewsCard,
  Gallery,
  PageCta,
  FactList,
  BulletGrid,
  Marquee,
} from "./PageParts.jsx";
import { Container } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import {
  ABOUT_PAGE,
  SERVICES_PAGE,
  PROJECTS_PAGE,
  PROJECT_DETAILS,
  NEWS_PAGE,
  CONTACT_PAGE,
  TERMS_PAGE,
} from "../../data/pages.js";
import { navigate } from "../../utils/router.js";
import {
  useAboutMotion,
  useContactMotion,
  useHeroFx,
  useNewsMotion,
  useProjectsMotion,
  useServicesMotion,
  useSmoothScroll,
} from "./aboutMotion.js";

/* ------------------------------------------------- PAGE HERO FX (About, Services) -- */
/* Flowing gold paths + soft aurora + a crisp framed photo, injected into the
   existing .page-hero (PageShell stays untouched). The photo is shown at card
   size instead of full-bleed, so a low-res source can't look blurry. */
const heroPaths = (dir) =>
  Array.from({ length: 22 }, (_, i) => {
    const k = i * 5 * dir;
    return {
      key: `${dir}-${i}`,
      d: `M-${380 - k} -${189 + i * 6}C-${380 - k} -${189 + i * 6} -${312 - k} ${216 - i * 6} ${152 - k} ${343 - i * 6}C${616 - k} ${470 - i * 6} ${684 - k} ${875 - i * 6} ${684 - k} ${875 - i * 6}`,
      width: 0.5 + i * 0.03,
      opacity: 0.18 + i * 0.012,
      dur: 22 + ((i * 7) % 11),
      delay: -((i * 1.9) % 22),
    };
  });
const HERO_PATHS = [...heroPaths(1), ...heroPaths(-1)];

function PageHeroFx({ image, alt }) {
  const [host, setHost] = useState(null);

  useEffect(() => {
    const hero = document.querySelector(".page-hero");
    if (!hero) return undefined;
    hero.classList.add("has-fx");
    setHost(hero);
    return () => hero.classList.remove("has-fx");
  }, []);

  useHeroFx(host);
  if (!host) return null;

  return createPortal(
    <div className="ab-hero-fx" aria-hidden="true">
      <span className="ab-aurora ab-aurora-a" />
      <span className="ab-aurora ab-aurora-b" />
      <svg className="ab-paths" viewBox="0 0 696 316" preserveAspectRatio="xMidYMid slice">
        <g className="ab-paths-base">
          {HERO_PATHS.map((p) => (
            <path key={p.key} d={p.d} strokeWidth={p.width * 0.8} />
          ))}
        </g>
        <g className="ab-paths-flow">
          {HERO_PATHS.map((p) => (
            <path
              key={p.key}
              className="ab-path"
              d={p.d}
              pathLength="1"
              strokeWidth={p.width}
              strokeOpacity={p.opacity}
              style={{ "--d": `${p.dur}s`, "--delay": `${p.delay}s` }}
            />
          ))}
        </g>
      </svg>
      <div className="ab-hero-card-wrap">
        <div className="ab-hero-card">
          <img src={image} alt={alt} loading="eager" />
        </div>
      </div>
    </div>,
    host
  );
}

/* ------------------------------------------------------------------ ABOUT -- */
export function AboutPage() {
  const d = ABOUT_PAGE;
  const root = useRef(null);

  useSmoothScroll(); // remove this line if your site already runs Lenis globally
  useAboutMotion(root);

  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <div ref={root} className="about-root">
        <PageHeroFx image={d.pillars[0].image} alt={d.title} />
        {/* ---- Director: image unveil + quote that "reads itself" on scroll ---- */}
        <section className="ab-ceo">
          <Container>
            <div className="ab-ceo-grid">
              <div className="ab-ceo-media">
                <img src={d.ceo.image} alt={d.ceo.name} loading="eager" />
              </div>
              <div>
                <span className="eyebrow">{d.ceo.heading}</span>
                <p className="ab-quote">{d.ceo.quote}</p>
                <div className="prose">
                  {d.ceo.body.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                <div className="signature">
                  <strong>{d.ceo.name}</strong>
                  <span>{d.ceo.role}</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ---- Pinned horizontal story: the one big moment on this page ---- */}
        <section className="ab-pin" aria-label="Vision, mission and team">
          <div className="ab-pin-head">
            <h2 className="ab-title">Vision, mission and the team behind it</h2>
            <div className="ab-progress" aria-hidden="true">
              <span />
            </div>
          </div>
          <div className="ab-track">
            {d.pillars.map((p) => (
              <article className="ab-panel" key={p.label}>
                <div className="ab-panel-media">
                  <img src={p.image} alt={p.label} loading="eager" />
                </div>
                <div className="ab-panel-body">
                  <h3 className="ab-panel-label">{p.label}</h3>
                  <p>{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Project emblems ---- */}
        <section className="ab-logos">
          <Container>
            <div className="logo-row" aria-label="Our projects">
              {d.logos.items.map((logo) => (
                <a
                  className="logo-tile"
                  key={logo.name}
                  href={logo.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(logo.href);
                  }}
                  aria-label={logo.name}
                >
                  <img src={logo.image} alt={logo.name} loading="lazy" />
                </a>
              ))}
            </div>
          </Container>
        </section>
      </div>

      <Marquee text="Since 1960 — Built on Trust" />
      <PageCta title="Have any question?" button="Contact Us" href="/contact-us/" />
    </PageShell>
  );
}

/* --------------------------------------------------------------- SERVICES -- */
export function ServicesPage() {
  const d = SERVICES_PAGE;
  const stack = useRef(null);

  useSmoothScroll(); // remove this line if your site already runs Lenis globally
  useServicesMotion(stack);

  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <PageHeroFx image={d.hero} alt={d.title} />

      <section className="page-section">
        <Container>
          <div className="split">
            <div>
              <span className="eyebrow">Our Services</span>
              <h2 className="page-section-title">We are the leaders in the construction industry</h2>
            </div>
            <Reveal>
              <p className="prose">{d.intro}</p>
              <div style={{ marginTop: "2.8rem" }}>
                <PillLink
                  text="Contact Us"
                  href="/contact-us/"
                  variant="dark"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact-us/");
                  }}
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Scroll-stacked services: each card pins, then shrinks as the next slides over */}
      <section className="sv-stack" ref={stack}>
        <Container>
          <div className="sv-list">
            {d.items.map((s, i) => (
              <article className="sv-card" key={s.title} style={{ "--i": i }}>
                <div className="sv-card-body">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <div className="sv-card-media">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Marquee text="Construction · Design · Interior · Management" />
      <PageCta title={d.cta.title} button={d.cta.button} href={d.cta.href} />
    </PageShell>
  );
}

/* --------------------------------------------------------------- PROJECTS -- */
export function ProjectsPage() {
  const d = PROJECTS_PAGE;
  const [filter, setFilter] = useState(d.filters[0]);
  const [active, setActive] = useState(0);
  const wrap = useRef(null);

  useSmoothScroll(); // remove this line if your site already runs Lenis globally
  useProjectsMotion(wrap);

  const items = filter === d.filters[0] ? d.items : d.items.filter((i) => i.tag === filter);
  const current = Math.min(active, Math.max(items.length - 1, 0));
  // "All" is the only state when every card is the same category — don't show
  // a filter row that can never change anything.
  const showFilters = new Set(d.items.map((i) => i.tag)).size > 1;

  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <PageHeroFx image={d.items[0].image} alt={d.title} />

      <section className="page-section" ref={wrap}>
        <Container>
          {showFilters && (
            <div className="chip-row">
              {d.filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`chip ${filter === f ? "is-active" : ""}`}
                  onClick={() => {
                    setFilter(f);
                    setActive(0);
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* Hover-expand rail: the hovered / focused project opens, the rest fold into spines */}
          <div className="pj-rail">
            {items.map((item, i) => {
              // if your project data names the link differently, adjust this one line
              const href = item.href || item.link || item.url || "#";
              return (
                <a
                  key={item.title}
                  className={`pj-panel ${i === current ? "is-active" : ""}`}
                  href={href}
                  aria-label={item.title}
                  onClick={(e) => {
                    if (href === "#") return;
                    e.preventDefault();
                    navigate(href);
                  }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <img src={item.image} alt="" loading="lazy" />
                  <span className="pj-shade" />
                  {item.tag && <span className="pj-tag">{item.tag}</span>}
                  <span className="pj-spine">{item.title}</span>
                  <span className="pj-info">
                    <strong>{item.title}</strong>
                    <em>View project</em>
                  </span>
                </a>
              );
            })}
          </div>
        </Container>
      </section>
      <Marquee text="DHA · Scheme 33 · Gulistan-e-Johar" />
      <PageCta title="Reach out to us" button="Contact Us" href="/contact-us/" />
    </PageShell>
  );
}

/* --------------------------------------------------------- PROJECT DETAIL -- */
export function ProjectPage({ slug }) {
  const d = PROJECT_DETAILS[slug];
  if (!d) return <NotFoundPage />;

  return (
    <PageShell eyebrow={d.kicker} title={d.title} lead={d.lead} image={d.hero} breadcrumb={false}>
      <div className="page-hero project-hero" style={{ padding: 0, background: "none", minHeight: 0 }}>
        <Container>
          <div className="project-chips">
            {d.chips.map((c) => (
              <span className="project-chip" key={c}>
                {c}
              </span>
            ))}
          </div>
          <span className="project-status">{d.status}</span>
        </Container>
      </div>

      <section className="page-section" style={{ paddingTop: "5rem" }}>
        <Container>
          <div className="split">
            <div>
              <span className="eyebrow">Project Details</span>
              <div className="prose">
                {d.body.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
            <Reveal>
              {d.facts ? (
                <FactList facts={d.facts} />
              ) : (
                <FactList facts={d.details ? d.details.slice(0, 4) : []} />
              )}
              {d.map && (
                <div style={{ marginTop: "2.4rem" }}>
                  <PillLink
                    text="View on Google Maps"
                    href={d.map}
                    variant="outline-dark"
                    target="_blank"
                    rel="noreferrer"
                    icon={null}
                  />
                </div>
              )}
            </Reveal>
          </div>

          {d.details && d.details.length > 4 && (
            <BulletGrid title="Facilities & specification" items={d.details.slice(4).map((r) => r[0] + ": " + r[1])} columns={2} />
          )}
          {d.highlights && <BulletGrid title="Highlights" items={d.highlights} columns={2} />}
          {d.facilities && <BulletGrid title="Facilities" items={d.facilities} columns={2} />}
          {d.apartmentTypes && <BulletGrid title="Apartment types" items={d.apartmentTypes} columns={4} />}
        </Container>
      </section>

      <Gallery images={d.gallery} />
      <Marquee text={d.title} />
      <PageCta title={`Book your visit to ${d.title}`} button="Contact Us" href="/contact-us/" />
    </PageShell>
  );
}

/* ------------------------------------------------------------------- NEWS -- */
export function NewsPage() {
  const d = NEWS_PAGE;
  const [filter, setFilter] = useState(d.filters[0]);
  const wrap = useRef(null);

  useSmoothScroll(); // remove this line if your site already runs Lenis globally
  useNewsMotion(wrap);

  const items = filter === d.filters[0] ? d.items : d.items.filter((i) => i.cat === filter);
  const [featured, ...rest] = items;

  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <PageHeroFx image={d.items[0].image} alt={d.title} />

      <section className="page-section" ref={wrap}>
        <Container>
          <div className="chip-row">
            {d.filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`chip ${filter === f ? "is-active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Editorial layout: newest story as a dark feature card, the rest in a grid */}
          {featured && (
            <div className="nw-feature" key={featured.title}>
              <NewsCard item={featured} index={0} />
            </div>
          )}
          {rest.length > 0 && (
            <div className="news-grid">
              {rest.map((item, i) => (
                <NewsCard item={item} index={i + 1} key={item.title} />
              ))}
            </div>
          )}
        </Container>
      </section>
      <Marquee text="Market Insight · Buyer Guides" />
      <PageCta title="Reach out to us" button="Contact Us" href="/contact-us/" />
    </PageShell>
  );
}

/* ---------------------------------------------------------------- CONTACT -- */
export function ContactPage() {
  const d = CONTACT_PAGE;
  const [sent, setSent] = useState(false);
  const wrap = useRef(null);

  useSmoothScroll(); // remove this line if your site already runs Lenis globally
  useContactMotion(wrap);

  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.lead}>
      <PageHeroFx image="/images/contact-elevation-8.webp" alt={d.title} />

      <section className="ct-section" ref={wrap}>
        <Container>
          <div className="ct-grid">
            <div className="ct-rows">
              <div className="ct-row">
                <span className="ct-label">Email</span>
                <div className="ct-value">
                  <a href={`mailto:${d.email}`}>{d.email}</a>
                </div>
              </div>
              <div className="ct-row">
                <span className="ct-label">Phone number</span>
                <div className="ct-value">
                  {d.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/[^0-9+]/g, "")}`}>
                      {p}
                    </a>
                  ))}
                </div>
              </div>
              <div className="ct-row">
                <span className="ct-label">Booking Address</span>
                <div className="ct-value">
                  <a href={d.mapHref} target="_blank" rel="noreferrer">
                    {d.address}
                  </a>
                </div>
              </div>
              <div className="ct-row">
                <span className="ct-label">Opening time</span>
                <div className="ct-value">
                  <p>{d.hours}</p>
                  <p className="ct-sub">{d.hoursDays}</p>
                </div>
              </div>
            </div>

            <div className="ct-card">
              {sent ? (
                <div className="ct-done" role="status">
                  <svg className="ct-check" viewBox="0 0 52 52" aria-hidden="true">
                    <circle cx="26" cy="26" r="24" />
                    <path d="M14 27l8 8 16-17" />
                  </svg>
                  <h2 className="ct-title">Shukriya!</h2>
                  <p>
                    This is a static demo form — please call 0311-2276442 or WhatsApp us and our team will respond
                    right away.
                  </p>
                  <button type="button" className="ct-link" onClick={() => setSent(false)}>
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="ct-title">To discuss working with us, get in touch.</h2>
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSent(true);
                    }}
                  >
                    <label className="ct-field">
                      <input type="text" name="name" placeholder=" " autoComplete="name" required />
                      <span>Your name</span>
                      <i />
                    </label>
                    <label className="ct-field">
                      <input type="email" name="email" placeholder=" " autoComplete="email" required />
                      <span>Email</span>
                      <i />
                    </label>
                    <label className="ct-field">
                      <input type="tel" name="phone" placeholder=" " autoComplete="tel" />
                      <span>Phone (03xx-xxxxxxx)</span>
                      <i />
                    </label>
                    <label className="ct-field">
                      <textarea name="message" placeholder=" " />
                      <span>Tell us what you are looking for</span>
                      <i />
                    </label>
                    <button type="submit" className="ct-submit">
                      Send message
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

/* ------------------------------------------------------------------ TERMS -- */
export function TermsPage() {
  const d = TERMS_PAGE;
  return (
    <PageShell eyebrow={d.eyebrow} title={d.title} lead={d.intro}>
      <section className="page-section">
        <Container>
          <div className="terms-list">
            <Reveal className="terms-item">
              <span className="eyebrow">{d.effective}</span>
            </Reveal>
            {d.sections.map((s) => (
              <Reveal className="terms-item" key={s.heading}>
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

/* ------------------------------------------------------------------- 404 -- */
export function NotFoundPage() {
  return (
    <PageShell
      eyebrow="404"
      title="Page not found"
      lead="The page you are looking for has moved or never existed. Try the menu above, or head back home."
    >
      <section className="page-section">
        <Container>
          <PillLink
            text="Back to Home"
            href="/"
            variant="dark"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          />
        </Container>
      </section>
    </PageShell>
  );
}