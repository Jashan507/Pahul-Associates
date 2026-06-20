import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo.svg";
import "./Header.css";
import { company } from "../data/config";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#calculator", label: "Cost Estimate" },
  { href: "#contact", label: "Contact" },
];

const Header = ({ visible }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(company.whatsappMessage);
    window.open(`https://wa.me/${company.phoneRaw}?text=${msg}`, "_blank");
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""} ${visible ? "header-visible" : ""}`}>
        <div className="container header-inner">
          {/* Logo */}
          <a
            href="#home"
            className="header-logo"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            aria-label="Pahul Associates Home"
          >
            <img src={logo} alt="Pahul Associates Logo" className="header-logo-img" />
            <div className="header-logo-text">
              <span className="header-logo-name">Pahul Associates</span>
              <span className="header-logo-tagline">Architecture & Design</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="header-nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`header-nav-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="header-actions">
            <button className="btn-whatsapp-header" onClick={openWhatsApp} aria-label="Chat on WhatsApp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => scrollTo("#contact")}
            >
              Get Quote
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer ${mobileOpen ? "open" : ""}`}
        role="dialog"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-header">
          <img src={logo} alt="Pahul Associates" className="mobile-logo" />
          <button
            className="mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mobile-drawer-actions">
          <button className="btn btn-primary w-full" onClick={() => { openWhatsApp(); setMobileOpen(false); }}>
            Chat on WhatsApp
          </button>
        </div>
        <div className="mobile-drawer-contact">
          <p>{company.phone}</p>
          <p>{company.email}</p>
        </div>
      </div>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
};

export default Header;
