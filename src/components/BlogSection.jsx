import { PillLink } from "./Pill.jsx";
import { NEWS, blogPosts } from "../data.js";
import "../styles/news.css";

/* News Feed section (kept from the base BlogSection layout). */
export function BlogSection() {
  return (
    <section className="section section-alt news-section" id="news">
      <div className="container">
        <div className="news-head reveal">
          <div>
            <div className="eyebrow">{NEWS.eyebrow}</div>
            <h2 className="section-title">{NEWS.heading}</h2>
          </div>
          <div>
            <p data-word-wipe data-wipe-color="#151717">
              {NEWS.intro}
            </p>
            <PillLink text={NEWS.cta} href={NEWS.ctaHref} />
          </div>
        </div>
        <div className="news-list">
          {blogPosts.map((post) => (
            <article className="news-row reveal" key={post.title}>
              <div className="news-row-main">
                <div className="news-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.copy}</p>
                <PillLink text={NEWS.readMore} href={post.href} variant="light" className="news-read" />
              </div>
              <div className="news-row-image">
                <img src={post.image} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
