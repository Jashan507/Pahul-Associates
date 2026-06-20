import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/images/logo_full.png";
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
          <a
            href="#home"
            className="header-logo"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            aria-label="Pahul Associates Home"
          >
            <img src={logo} alt="Pahul Associates Logo" className="header-logo-img" />
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
          <button className="btn btn-primary w-full" onClick={() => { scrollTo("#contact"); setMobileOpen(false); }}>
            Get Quote
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
