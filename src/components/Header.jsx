import { useEffect, useState } from "react";
import { Logo, ChevronDown } from "./Brand.jsx";
import { navGroups } from "../data.js";

// `sticky` drives the image-1 → image-2 transition:
//  - false (over hero): full-width transparent bar, links spread left/right of a
//    centred logo, white text — image-1
//  - true  (after scrolling): compact white bar with the logo moved to the left
//    and grey text — image-2
export function Header({ goTo, heroRef, sticky }) {
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

  const navigate = (href) => {
    closeMenu();
    goTo(href);
  };

  const onAnchor = (event, href) => {
    event.preventDefault();
    closeMenu();
    goTo(href);
  };

  return (
    <>
      <header className={`site-header ${sticky ? "sticky" : "over-hero"}`}>
        <div className="header-inner">
          {/* Renders every link. Over the hero CSS hides items 4-7 here and shows
              them on the right of the wordmark; in the sticky state all seven
              sit in this one centred row. */}
          <nav className="header-nav header-nav-left" aria-label="Primary">
            {navGroups.map((group, index) => (
              <div
                className={`nav-item ${index >= 3 ? "nav-item-right-half" : ""} ${
                  openDropdown === group.label ? "open" : ""
                }`}
                key={group.label}
                onMouseEnter={() => group.items.length && setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a className="nav-link" href={group.href} onClick={(event) => onAnchor(event, group.href)}>
                  <span data-text={group.label}>{group.label}</span>
                  {group.items.length > 0 && <ChevronDown className="chevron" />}
                </a>
                {group.items.length > 0 && (
                  <div className="nav-dropdown">
                    {group.items.map((item) => (
                      <a
                        href={group.href}
                        key={item}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(group.href);
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CENTRE: logo (moves to the left when sticky) */}
          <a
            className="brand-link"
            href="#top"
            onClick={(event) => onAnchor(event, "#top")}
            aria-label="FIND home"
          >
            <Logo className="brand-logo" />
            <span className="brand-wordmark">Real Estate</span>
          </a>

          {/* image-1 only: mirrors items 4-7 to the right of the wordmark */}
          <nav className="header-nav header-nav-right" aria-hidden="true">
            {navGroups.slice(3).map((group) => (
              <div
                className={`nav-item ${openDropdown === group.label ? "open" : ""}`}
                key={group.label}
                onMouseEnter={() => group.items.length && setOpenDropdown(group.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <a className="nav-link" href={group.href} onClick={(event) => onAnchor(event, group.href)}>
                  <span data-text={group.label}>{group.label}</span>
                  {group.items.length > 0 && <ChevronDown className="chevron" />}
                </a>
                {group.items.length > 0 && (
                  <div className="nav-dropdown nav-dropdown-right">
                    {group.items.map((item) => (
                      <a
                        href={group.href}
                        key={item}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(group.href);
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header-actions">
            <a className="sign-in" href="https://app.findrealestate.com/login" target="_blank" rel="noreferrer">
              <span data-text="Sign In">Sign In</span>
            </a>
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
                {group.items.map((item) => (
                  <a
                    href={group.href}
                    key={item}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(group.href);
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )
        )}
        <a className="mobile-signin" href="https://app.findrealestate.com/login" target="_blank" rel="noreferrer">
          Sign In
        </a>
      </div>
    </>
  );
}
