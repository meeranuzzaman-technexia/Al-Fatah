/* Membership & Approvals section. */
import { APPROVALS } from "../../data.js";
import { Container } from "../ported/ui.jsx";
import "../../styles/approvals.css";

export function ApprovalsSection() {
  return (
    <section className="section section-alt approvals-section" data-header-theme="light">
      <Container>
        <div className="approvals-grid">
          <div>
            <span className="eyebrow">{APPROVALS.intro}</span>
            <h2 className="section-title">Member of &amp; Approvals</h2>
            <p className="approvals-claim">{APPROVALS.claim}</p>
          </div>

          <div>
            <h3 className="approvals-label">{APPROVALS.memberHeading}</h3>
            <a
              className="approvals-badge"
              href={APPROVALS.memberHref}
              target="_blank"
              rel="noreferrer"
              aria-label={APPROVALS.member}
            >
              <img
                src={APPROVALS.memberLogo}
                alt="ABAD — Association of Builders And Developers of Pakistan"
                className="approvals-logo"
                loading="lazy"
                decoding="async"
              />
            </a>
            <p className="approvals-note">{APPROVALS.membershipNumber}</p>

            <h3 className="approvals-label approvals-label-spaced">{APPROVALS.approvalsHeading}</h3>
            <div className="approvals-badges">
              {APPROVALS.approvals.map((item) => (
                <div key={item.label} className="approvals-badge">
                  <img
                    src={item.logo}
                    alt={item.label}
                    className="approvals-logo approvals-logo--compact"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
