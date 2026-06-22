import React, { useEffect, useState, useRef } from "react";
import bgVideo from "../assets/videos/home-background.mp4";
import logoMark from "../assets/images/logo_mark.png";
import logoText from "../assets/images/logo_text.png";
import "./Hero.css";

/* ── StatCounter Component for Animated Counting Effect ── */
const StatCounter = ({ target, suffix, startTrigger }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (!startTrigger) {
      setCount(0);
      return;
    }

    let animationFrameId;
    let observer;

    const startAnimation = () => {
      const end = parseInt(target, 10);
      if (isNaN(end)) return;

      const duration = 800; // 800ms animation duration for snappy feel
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing: easeOutCubic for a smoother and faster deceleration
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentCount = Math.floor(easedProgress * end);
        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          // Reset to 0 when out of view so it animates again when user scrolls back
          setCount(0);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (observer && elementRef.current) {
        observer.unobserve(elementRef.current);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, startTrigger]);

  return (
    <strong ref={elementRef}>
      {count}
      {suffix}
    </strong>
  );
};

/* ── Hero Component ─────────────────────────────────────────────── */
const Hero = ({ onAnimationComplete }) => {
  // phases: "logo" → "burst" → "hero"
  const [phase, setPhase] = useState("logo");

  useEffect(() => {
    // Show logo for 1.6s, then trigger the exit glow + fade transition (800ms)
    const timer = setTimeout(() => {
      setPhase("burst");
      // After the burst transition (800ms), switch fully to hero view
      setTimeout(() => {
        setPhase("hero");
        if (onAnimationComplete) onAnimationComplete();
      }, 800);
    }, 1600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* ── Logo Animation Overlay ── */}
      {(phase === "logo" || phase === "burst") && (
        <div className={`logo-overlay ${phase === "burst" ? "burst-out" : ""}`}>
          {/* Blueprint grid – decorative, sits behind the logo */}
          <div className="blueprint-grid" aria-hidden="true" />

          {/* Central logo group */}
          <div className={`logo-anim-wrap ${phase === "burst" ? "logo-burst" : ""}`}>
            {/* Glow ring behind mark */}
            <div className="logo-glow-ring" aria-hidden="true" />

            {/* Building icon */}
            <div className="logo-mark-wrap">
              <img src={logoMark} alt="Pahul Associates Logo Mark" className="logo-mark-img" />
            </div>

            {/* Brand name */}
            <div className="logo-text-wrap">
              <img src={logoText} alt="PAHUL ASSOCIATES" className="logo-text-img" />
            </div>
          </div>
        </div>
      )}

      {/* ── Hero Content ── */}
      <div className={`hero-content ${phase === "burst" || phase === "hero" ? "visible" : ""}`}>
        {/* Background Video */}
        <div className="hero-bg">
          <video autoPlay muted loop playsInline className="hero-bg-video">
            <source src={bgVideo} type="video/mp4" />
          </video>
          <div className="hero-bg-overlay" />
        </div>

        {/* Text Content */}
        <div className="hero-text">
          <span className="hero-eyebrow">Premier Architecture &amp; Design</span>
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
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            >
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
              <StatCounter target={25} suffix="+" startTrigger={phase === "hero"} />
              <span>Years</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <StatCounter target={1500} suffix="+" startTrigger={phase === "hero"} />
              <span>Projects</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat">
              <StatCounter target={99} suffix="%" startTrigger={phase === "hero"} />
              <span>Satisfaction</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse"><div className="scroll-wheel" /></div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
