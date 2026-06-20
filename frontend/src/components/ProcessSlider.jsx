import React, { useState, useRef, useEffect } from "react";
import { processSteps } from "../data/config";
import "./ProcessSlider.css";

const ProcessIcons = {
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <line x1="9" y1="9" x2="15" y2="9" />
      <line x1="9" y1="13" x2="12" y2="13" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  approve: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  handover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M9 21V7M15 21V7" />
      <path d="M12 7V3l-3 2M12 3l3 2" />
    </svg>
  ),
};

const ProcessSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(null);
  const autoRef = useRef(null);

  const goTo = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const next = () => goTo((current + 1) % processSteps.length);
  const prev = () => goTo((current - 1 + processSteps.length) % processSteps.length);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(next, 5000);
    return () => clearInterval(autoRef.current);
  }, [current]);

  // Touch handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
    clearInterval(autoRef.current);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    setIsDragging(false);
    touchStartX.current = null;
  };

  return (
    <section id="process" className="section section-dark">
      <div className="container">
        <div className="section-header">
          <span className="section-label">How We Work</span>
          <h2 className="section-title" style={{ color: "var(--white)" }}>Our Design Process</h2>
          <p className="section-subtitle">
            A transparent, collaborative journey from your initial idea to the final
            handover — every step guided by our experts.
          </p>
          <div className="gold-line" />
        </div>

        {/* Steps track */}
        <div className="process-track-bar">
          {processSteps.map((step, i) => (
            <button
              key={step.step}
              className={`process-track-step ${i === current ? "active" : ""} ${i < current ? "done" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to step ${step.step}: ${step.title}`}
            >
              <span className="process-track-num">{i < current ? "✓" : step.step}</span>
              <span className="process-track-label">{step.title}</span>
            </button>
          ))}
          <div
            className="process-track-line"
            style={{ width: `${(current / (processSteps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Slider */}
        <div
          className="process-slider-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="process-nav prev"
            onClick={prev}
            aria-label="Previous step"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="process-slides">
            {processSteps.map((step, i) => (
              <div
                key={step.step}
                className={`process-slide ${i === current ? "active" : ""}`}
              >
                <div className="process-slide-inner">
                  <div className="process-slide-left">
                    <div className="process-step-badge">
                      Step {step.step} of {processSteps.length}
                    </div>
                    <div className="process-icon">
                      {ProcessIcons[step.icon]}
                    </div>
                    <div className="process-timeline">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {step.timeline}
                    </div>
                  </div>
                  <div className="process-slide-right">
                    <h3 className="process-step-title">{step.title}</h3>
                    <div className="process-step-divider" />
                    <p className="process-step-desc">{step.description}</p>
                    {i < processSteps.length - 1 && (
                      <button
                        className="btn btn-gold-outline mt-24"
                        onClick={next}
                      >
                        Next: {processSteps[i + 1].title}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </button>
                    )}
                    {i === processSteps.length - 1 && (
                      <button
                        className="btn btn-primary mt-24"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Start Your Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="process-nav next"
            onClick={next}
            aria-label="Next step"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="process-dots" role="tablist">
          {processSteps.map((step, i) => (
            <button
              key={step.step}
              className={`process-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === current}
              aria-label={`Step ${step.step}: ${step.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSlider;
