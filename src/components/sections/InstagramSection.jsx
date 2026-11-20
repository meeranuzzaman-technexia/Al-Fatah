/* Instagram Feed section — Swiper carousel, prev/next controls & GSAP reveals. */
import { useRef, useState } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { INSTAGRAM } from "../../data.js";
import { useGsapScope } from "../../hooks/useGsapScope.js";
import { ArrowRight, Container, Line } from "../ported/ui.jsx";
import { PillLink } from "../Pill.jsx";
import "../../styles/instagram.css";

export function InstagramSection() {
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

  const swiperRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = INSTAGRAM.posts.length;

  return (
    <section ref={ref} className="section instagram-section" data-header-theme="light">
      <Container>
        <div className="instagram-head">
          <h2 className="section-title">
            {INSTAGRAM.titleLines.map((line, index) => (
              <Line key={line}>{index === 1 ? <em>{line}</em> : line}</Line>
            ))}
          </h2>

          <div className="instagram-controls" data-fade="">
            <button
              type="button"
              className="instagram-nav-btn"
              aria-label="Previous post"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <span className="instagram-nav-prev">
                <ArrowRight size={18} />
              </span>
            </button>
            <button
              type="button"
              className="instagram-nav-btn"
              aria-label="Next post"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ArrowRight size={18} />
            </button>
            <span className="instagram-count">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="instagram-bio" data-fade="">
          {INSTAGRAM.bio.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          speed={900}
          grabCursor
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(instance) => setActive(instance.activeIndex)}
        >
          {INSTAGRAM.posts.map((post) => (
            <SwiperSlide key={post.href} className="instagram-slide">
              <div>
                <blockquote className="instagram-quote">&ldquo;{post.caption}&rdquo;</blockquote>
                <p className="instagram-detail">{post.detail}</p>
              </div>
              <p className="instagram-author">
                <span>{post.tag}</span>
                <span aria-hidden="true" className="instagram-author-sep">
                  /
                </span>
                <a href={post.href} target="_blank" rel="noreferrer">
                  View Post
                </a>
              </p>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="instagram-footer" data-fade="">
          <p className="instagram-contact">
            <span>📍 Location: {INSTAGRAM.contact.location}</span>
            <a href={INSTAGRAM.contact.mapHref} target="_blank" rel="noreferrer">
              Google Map
            </a>
            <span>
              📞 <a href={INSTAGRAM.contact.phoneHref}>{INSTAGRAM.contact.phone}</a> · ✉{" "}
              <a href={`mailto:${INSTAGRAM.contact.email}`}>{INSTAGRAM.contact.email}</a> · 🌐{" "}
              <a href={INSTAGRAM.contact.website}>alfatahbuilders.com</a>
            </span>
            <a href={INSTAGRAM.contact.linktree} target="_blank" rel="noreferrer">
              Follow us: linktr.ee/alfatahgroup
            </a>
          </p>
          <PillLink text={INSTAGRAM.cta} href={INSTAGRAM.ctaHref} target="_blank" rel="noreferrer" />
        </div>
      </Container>
    </section>
  );
}
