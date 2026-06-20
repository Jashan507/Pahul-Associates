import React, { useEffect, useRef, useState } from "react";
import logoVideo from "../assets/videos/logo-animation.mp4";
import logoVideoWebm from "../assets/videos/logo-animation.webm";
import bgVideo from "../assets/videos/home-background.mp4";
import "./Hero.css";

const Hero = ({ onAnimationComplete }) => {
  const [phase, setPhase] = useState("logo"); // logo | transition | hero
  const [skipVisible, setSkipVisible] = useState(true);
  const logoRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Show logo for 3s, then transition
    const timer = setTimeout(() => {
      startTransition();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const startTransition = () => {
    setPhase("transition");
    setTimeout(() => {
      setPhase("hero");
      setSkipVisible(false);
      if (onAnimationComplete) onAnimationComplete();
    }, 1000);
  };

  const handleSkip = () => {
    startTransition();
  };

  const scrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-section">
      {/* Logo Animation Overlay */}
      {(phase === "logo" || phase === "transition") && (
        <div
          ref={overlayRef}
          className={`logo-overlay ${phase === "transition" ? "fade-out" : ""}`}
        >
          {/* Blueprint grid */}
          <div className="blueprint-grid" />

          {/* Logo Video */}
          <div
            ref={logoRef}
            className={`logo-container ${phase === "transition" ? "fly-to-header" : "center-logo"}`}
          >
            <video
              autoPlay
              muted
              playsInline
              className="logo-video"
            >
              <source src={logoVideoWebm} type="video/webm" />
              <source src={logoVideo} type="video/mp4" />
            </video>
          </div>

          {/* Skip button */}
          {skipVisible && (
            <button className="skip-btn" onClick={handleSkip}>
              Skip Intro ↓
            </button>
          )}
        </div>
      )}

      {/* Hero Content */}
      <div className={`hero-content ${phase === "hero" ? "visible" : ""}`}>
        {/* Background Video */}
        <div className="hero-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hero-bg-video"
          >
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="hero-bg-overlay" />
        </div>

        {/* Text Content */}
        <div className="hero-text">
          <span className="hero-eyebrow">Premier Architecture & Design</span>
          <h1 className="hero-title">
            Transform Your
            <br />
            <span className="hero-title-accent">Vision Into Reality</span>
          </h1>
          <p className="hero-subtitle">
            25+ years of crafting extraordinary spaces that inspire, function beautifully,
            and stand the test of time.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={scrollToServices}>
              Explore Our Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start a Project
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <strong>25+</strong>
              <span>Years</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>250+</strong>
              <span>Projects</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <strong>99%</strong>
              <span>Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
