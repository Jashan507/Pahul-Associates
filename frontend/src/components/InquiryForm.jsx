import React, { useState, useRef } from "react";
import { company, services, budgetRanges } from "../data/config";
import "./InquiryForm.css";

const INITIAL = {
  fullName: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

const validate = (fields) => {
  const errors = {};
  if (!fields.fullName.trim() || fields.fullName.trim().length < 3)
    errors.fullName = "Name must be at least 3 characters";
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
    errors.email = "Please enter a valid email address";
  if (!fields.phone.trim() || !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(fields.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid Indian phone number";
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
};

const InquiryForm = () => {
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const charCount = fields.message.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] || "" }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate({ ...fields, [name]: e.target.value });
    setErrors((prev) => ({ ...prev, [name]: errs[name] || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(INITIAL).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.values(errs).some(Boolean)) return;

    setStatus("loading");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3001"}/api/inquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fields.fullName,
          email: fields.email,
          phoneNumber: fields.phone,
          serviceOfInterest: fields.service,
          projectBudget: fields.budget,
          message: fields.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFields(INITIAL);
        setTouched({});
        setErrors({});
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setStatus("error");
    }
  };

  const openWhatsApp = () => {
    const msg = encodeURIComponent(company.whatsappMessage);
    window.open(`https://wa.me/${company.phoneRaw}?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title" style={{ color: "var(--white)" }}>Start Your Project</h2>
          <p className="section-subtitle">
            Share your vision with us. Our team will respond within 24 hours.
          </p>
          <div className="gold-line" />
        </div>

        <div className="inquiry-grid">
          {/* Contact Info */}
          <div className="inquiry-info">
            <h3 className="inquiry-info-title">Let's Create Something Extraordinary</h3>
            <p className="inquiry-info-text">
              With 25+ years of experience and 1500+ completed projects, Pahul Associates
              is ready to bring your architectural vision to life.
            </p>

            <div className="inquiry-contacts">
              <a href={`tel:${company.phone}`} className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.63 4.35 2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.09 6.09l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <span className="inquiry-contact-label">Phone</span>
                  <span className="inquiry-contact-value">{company.phone}</span>
                </div>
              </a>

              <a href={`mailto:${company.email}`} className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <span className="inquiry-contact-label">Email</span>
                  <span className="inquiry-contact-value">{company.email}</span>
                </div>
              </a>

              <div className="inquiry-contact-item">
                <div className="inquiry-contact-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <span className="inquiry-contact-label">Location</span>
                  <span className="inquiry-contact-value">{company.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="inquiry-form-wrap">
            {status === "success" ? (
              <div className="inquiry-success">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>We've received your inquiry and will contact you within 24 hours via WhatsApp or phone.</p>
                <button className="btn btn-primary" onClick={() => setStatus("idle")}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="inquiry-form" aria-label="Project Inquiry Form">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="fullName" className="form-label">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className={`form-input ${errors.fullName && touched.fullName ? "error" : touched.fullName && !errors.fullName ? "valid" : ""}`}
                      placeholder="Your full name"
                      value={fields.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && touched.fullName && <span className="form-error" role="alert">{errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email && touched.email ? "error" : touched.email && !errors.email ? "valid" : ""}`}
                      placeholder="your.email@example.com"
                      value={fields.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                    />
                    {errors.email && touched.email && <span className="form-error" role="alert">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={`form-input ${errors.phone && touched.phone ? "error" : touched.phone && !errors.phone ? "valid" : ""}`}
                      placeholder="+91 9876543210"
                      value={fields.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-required="true"
                    />
                    {errors.phone && touched.phone && <span className="form-error" role="alert">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service of Interest</label>
                    <select
                      id="service"
                      name="service"
                      className="form-input form-select"
                      value={fields.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service...</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group span-2">
                    <label htmlFor="budget" className="form-label">Project Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      className="form-input form-select"
                      value={fields.budget}
                      onChange={handleChange}
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group span-2">
                    <label htmlFor="message" className="form-label">
                      Message *
                      <span className="form-char-count">{charCount}/500</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-input form-textarea ${errors.message && touched.message ? "error" : touched.message && !errors.message ? "valid" : ""}`}
                      placeholder="Tell us about your project, vision, and requirements..."
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      maxLength={500}
                      rows={4}
                      aria-required="true"
                    />
                    {errors.message && touched.message && <span className="form-error" role="alert">{errors.message}</span>}
                  </div>
                </div>

                {status === "error" && (
                  <div className="form-server-error" role="alert">
                    Something went wrong. Please try again or call us at {company.phone}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary form-submit"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="form-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Inquiry
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
