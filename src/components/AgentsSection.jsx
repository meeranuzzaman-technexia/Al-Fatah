import { Pill } from "./Pill.jsx";

export function AgentsSection({ goTo }) {
  return (
    <section className="section agents" id="agents">
      <div className="container agents-grid">
        <div className="agents-media reveal">
          <div className="agents-label">For Agents</div>
          <div className="agents-photo one">
            <img src="/images/1.f6e8f2e8.webp" alt="Confident FIND client" loading="lazy" />
          </div>
          <div className="agents-photo two">
            <img src="/images/2.41633fa6.webp" alt="Wooded neighborhood" loading="lazy" />
          </div>
        </div>
        <div className="agents-copy reveal">
          <h2 className="agents-title" data-word-wipe data-wipe-color="#151717">
            Don’t Rent Your Career. <span>Own It.</span>
          </h2>
          <p data-word-wipe data-wipe-color="#151717">
            At FIND, our agents don’t just work for the brand—they own a part of it.
          </p>
          <p data-word-wipe data-wipe-color="#151717">
            We give top performers real equity, so they’re invested in more than just your transaction—they’re
            invested in your outcome. Agents are certified, supported, and equipped to deliver five-star
            service—because their success is tied to yours. You’re not just here to close deals — you’re building
            a career, a life, a legacy. We help agents find the company that gives them the support, tools, and
            leadership to thrive.
          </p>
          <Pill text="Join The Movement" onClick={() => goTo("#cta")} />
        </div>
      </div>
    </section>
  );
}
