import { useEffect, useState } from "react";
import { ChevronDown } from "./Brand.jsx";
import { PillLink } from "./Pill.jsx";
import { HEADER_CTA, navGroups } from "../data.js";
import "../styles/header.css";

export function Header({ goTo, sticky, hidden }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileGroup, setMobileGroup] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setOpenDropdown(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const onAnchor = (event, href) => {
    event.preventDefault();
    closeMenu();
    goTo(href);
  };

  const renderDropdown = (group) => (
    <div className="nav-dropdown">
      {group.items.map((section) => (
        <div className="nav-dropdown-group" key={section.group}>
          <span className="nav-dropdown-title">{section.group}</span>
          {section.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </div>
  );

  const renderNavItem = (group, keyPrefix) => {
    const key = `${keyPrefix}-${group.label}`;
    return (
      <div
        className={`nav-item ${openDropdown === key ? "open" : ""}`}
        key={key}
        onMouseEnter={() => group.items.length && setOpenDropdown(key)}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <a className="nav-link" href={group.href} onClick={(event) => onAnchor(event, group.href)}>
          <span data-text={group.label}>{group.label}</span>
          {group.items.length > 0 && <ChevronDown className="chevron" />}
        </a>
        {group.items.length > 0 && renderDropdown(group)}
      </div>
    );
  };

  const isHidden = hidden && !menuOpen;

  return (
    <>
      <header
        className={`site-header ${sticky ? "sticky" : "over-hero"} ${isHidden ? "is-hidden" : ""}`.trim()}
      >
        <div className="header-inner">
          {/* Over-hero left links (1-3) */}
          <nav className="header-nav header-nav-left" aria-label="Primary left">
            {navGroups.slice(0, 3).map((group) => renderNavItem(group, "left"))}
          </nav>

          {/* Animated center-to-left brand logo */}
          <a
            className="brand-link"
            href="#top"
            onClick={(event) => onAnchor(event, "#top")}
            aria-label="Al-Fatah — Builders & Developers home"
          >
            <img
              src="/images/alfatah-header-logo.png"
              alt="Al-Fatah Builders & Developers"
              className="brand-icon"
            />
          </a>

          {/* Sticky centered links (1-6) */}
          <nav className="header-nav header-nav-merged" aria-label="Primary">
            {navGroups.map((group) => renderNavItem(group, "merged"))}
          </nav>

          {/* Right cluster: over-hero right links (4-6) + Call Now pill */}
          <div className="header-right-cluster">
            <nav className="header-nav header-nav-right" aria-label="Primary right">
              {navGroups.slice(3).map((group) => renderNavItem(group, "right"))}
            </nav>

            <div className="header-actions">
              <PillLink
                text={HEADER_CTA.label}
                href={HEADER_CTA.href}
                variant="dark"
                className="header-cta"
              />
            </div>
          </div>

          <button
            className={`burger ${menuOpen ? "active" : ""}`}
            aria-label="Menu control"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        {navGroups.map((group) =>
          group.items.length === 0 ? (
            <a href={group.href} key={group.label} onClick={(event) => onAnchor(event, group.href)}>
              {group.label}
            </a>
          ) : (
            <div className="mobile-group" key={group.label}>
              <button onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}>
                {group.label}
                <ChevronDown className="chevron" />
              </button>
              <div className={`mobile-submenu ${mobileGroup === group.label ? "open" : ""}`}>
                {group.items.map((section) => (
                  <div className="mobile-submenu-group" key={section.group}>
                    <span>{section.group}</span>
                    {section.links.map((link) => (
                      <a key={link.label} href={link.href} onClick={closeMenu}>
                        {link.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )
        )}
        <PillLink
          text={HEADER_CTA.label}
          href={HEADER_CTA.href}
          variant="dark"
          className="mobile-signin"
        />
      </div>
    </>
  );
}
