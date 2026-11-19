import { Pill } from "./Pill.jsx";
import { blogPosts } from "../data.js";

export function BlogSection({ goTo }) {
  return (
    <section className="section blog" id="resources">
      <div className="container">
        <div className="blog-head reveal">
          <h2 className="section-heading">
            Blog <span className="muted">&amp;</span>
            <br />
            <span className="muted">Resources</span>
          </h2>
          <div>
            <p data-word-wipe data-wipe-color="#151717">
              See how we’ve helped clients achieve their real estate dreams, one successful move at a time.
            </p>
            <Pill text="Visit Our Blog" onClick={() => goTo("#resources")} />
          </div>
        </div>
        <div className="blog-list">
          {blogPosts.map((post) => (
            <article className="blog-row reveal" key={post.title}>
              <div className="blog-row-main">
                <div className="blog-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.copy}</p>
                <a className="pill-button light blog-read" href="#resources" onClick={(event) => event.preventDefault()}>
                  <span className="pill-text">
                    <span data-text="Read More">Read More</span>
                  </span>
                  <span className="pill-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
              <div className="blog-row-image">
                <img src={post.image} alt="" loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
