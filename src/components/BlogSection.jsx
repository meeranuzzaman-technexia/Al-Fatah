import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pill, PillLink } from "./Pill.jsx";
import { TimeMachineStack } from "./TimeMachineStack.jsx";
import { NEWS, blogPosts } from "../data.js";
import "../styles/news.css";

gsap.registerPlugin(ScrollTrigger);

const SETTLE_PAD = 0.06;
const ACTIVE_SPAN = 1 - SETTLE_PAD * 2;

const stackItems = blogPosts.map((post, i) => ({
  id: i + 1,
  content: (
    <article className="tm-news-card">
      <div className="tm-news-media">
        <img src={post.image} alt={post.title} draggable={false} loading="eager" />
        <span className="tm-news-date-badge">{post.date}</span>
      </div>
      <div className="tm-news-body">
        <div className="tm-news-meta">
          <span>AL-FATAH NEWS</span>
          <span>
            {String(i + 1).padStart(2, "0")} / {String(blogPosts.length).padStart(2, "0")}
          </span>
        </div>
        <h3 className="tm-news-title">{post.title}</h3>
        <p className="tm-news-copy">{post.copy}</p>
        <div className="tm-news-foot">
          <PillLink text={NEWS.readMore} href={post.href} variant="dark" />
        </div>
      </div>
    </article>
  ),
}));

/* News Feed section — centered sticky viewport + scrubbed Time Machine card stack. */
export function BlogSection({ lenisRef }) {
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const lastIndex = stackItems.length - 1;
  const [progress, setProgress] = useState(0);

  const activeIndex = Math.max(0, Math.min(lastIndex, Math.round(progress)));

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const tweenState = { p: 0 };
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const norm = Math.max(0, Math.min(1, (self.progress - SETTLE_PAD) / ACTIVE_SPAN));
          const target = norm * lastIndex;
          gsap.to(tweenState, {
            p: target,
            duration: 0.12,
            ease: "none",
            overwrite: true,
            onUpdate: () => setProgress(tweenState.p),
          });
        },
      });
      stRef.current = st;
    }, trackRef);

    return () => {
      stRef.current = null;
      ctx.revert();
    };
  }, [lastIndex]);

  const scrollToCard = (targetIdx) => {
    const clamped = Math.max(0, Math.min(lastIndex, targetIdx));
    const st = stRef.current;
    if (!st) {
      setProgress(clamped);
      return;
    }
    const pNorm = SETTLE_PAD + (clamped / lastIndex) * ACTIVE_SPAN;
    const targetY = st.start + (st.end - st.start) * pNorm;

    if (lenisRef?.current) {
      lenisRef.current.scrollTo(targetY, { duration: 0.75 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section className="section section-alt news-section" id="news" data-header-theme="light">
      <div ref={trackRef} className="news-scroll-track">
        <div className="news-pin-frame">
          <div className="container">
            <div className="news-head">
              <div>
                <div className="eyebrow">{NEWS.eyebrow}</div>
                <h2 className="section-title">{NEWS.heading}</h2>
              </div>
              <div className="news-head-right">
                <p>{NEWS.intro}</p>
                <PillLink text={NEWS.cta} href={NEWS.ctaHref} />
              </div>
            </div>

            <div className="tm-wrapper">
              <TimeMachineStack
                className="tm-news-stack"
                items={stackItems}
                progress={progress}
                activeIndex={activeIndex}
                onSelectIndex={scrollToCard}
              />

              <div className="tm-controls">
                <Pill
                  text="Newer"
                  variant="outline-dark"
                  disabled={activeIndex === 0}
                  onClick={() => scrollToCard(activeIndex - 1)}
                />
                <Pill
                  text="Older"
                  variant="dark"
                  disabled={activeIndex === lastIndex}
                  onClick={() => scrollToCard(activeIndex + 1)}
                />
              </div>

              <p className="tm-status">
                {activeIndex + 1} of {stackItems.length} &middot; scroll, drag, or use Arrow Up / Down
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
