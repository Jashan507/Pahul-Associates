import React from "react";
import logo from "../assets/images/logo_full.png";
import { company } from "../data/config";
import "./Footer.css";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#process", label: "Process" },
  { href: "#calculator", label: "Cost Estimate" },
  { href: "#contact", label: "Contact" },
];

const scrollTo = (href) => {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Footer = () => {
  const openWhatsApp = () => {
    const msg = encodeURIComponent(company.whatsappMessage);
    window.open(`https://wa.me/${company.phoneRaw}?text=${msg}`, "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Col 1 */}
          <div className="footer-brand">
            <img src={logo} alt="Pahul Associates" className="footer-logo" />
            <p className="footer-brand-desc">
              Transforming spaces and elevating lives through innovative architectural
              design for over 25 years.
            </p>
            <div className="footer-socials">
              <a href="https://www.instagram.com/pahul.associates?igsh=MTZ6OWhydGkyMW02Yg==" target="_blank" rel="noopener" aria-label="Instagram" className="footer-instagram-link">
                <span className="footer-social">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </span>
                <span>Follow us on Instagram</span>
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="footer-nav-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contacts">
              <a href={`tel:${company.phone}`} className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.63 4.35 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {company.email}
              </a>
              <div className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {company.location}
              </div>
              <div className="footer-contact-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                {company.hours}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            © 2026 {company.name}. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
