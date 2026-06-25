import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { processSteps } from "../data/config";
import "./ProcessSlider.css";

// Step 1 Visual: Consultation
const ConsultationVisual = () => {
  const uid = React.useId().replace(/:/g, "-");
  return (
    <div className="process-visual-wrapper consultation-visual">
      <svg viewBox="0 0 400 400" className="process-svg">
        <defs>
          <pattern id={`bp-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        
        {/* Background Grid */}
        <rect width="100%" height="100%" fill={`url(#bp-grid-${uid})`} rx="16" />
        
        {/* Drafting layout circle */}
        <motion.circle
          cx="200"
          cy="200"
          r="120"
          stroke="rgba(201, 169, 98, 0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="8 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Target Crosshairs */}
        <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Blueprint Lines drawing themselves */}
        <motion.path
          d="M 120 160 L 280 160 M 120 240 L 280 240 M 160 120 L 160 280 M 240 120 L 240 280"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
        />

        {/* Animated Client Idea Bubble (Left) */}
        <motion.g
          initial={{ opacity: 0, x: -30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
        >
          {/* Glass bubble backing */}
          <rect x="60" y="90" width="110" height="50" rx="10" fill="rgba(31, 58, 92, 0.65)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          <path d="M 130 140 L 140 152 L 142 140 Z" fill="rgba(31, 58, 92, 0.65)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          {/* Glowing Text Lines */}
          <rect x="75" y="105" width="80" height="6" rx="3" fill="var(--white)" opacity="0.8" />
          <rect x="75" y="117" width="55" height="6" rx="3" fill="var(--gold)" opacity="0.9" />
        </motion.g>

        {/* Animated Architect Response Bubble (Right) */}
        <motion.g
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6, type: "spring" }}
        >
          {/* Glass bubble backing */}
          <rect x="220" y="240" width="120" height="50" rx="10" fill="rgba(201, 169, 98, 0.15)" stroke="rgba(201, 169, 98, 0.25)" strokeWidth="1" />
          <path d="M 255 240 L 250 228 L 243 240 Z" fill="rgba(201, 169, 98, 0.15)" stroke="rgba(201, 169, 98, 0.25)" strokeWidth="1" />
          {/* Glowing Text Lines */}
          <rect x="235" y="255" width="90" height="6" rx="3" fill="var(--white)" opacity="0.9" />
          <rect x="235" y="267" width="70" height="6" rx="3" fill="var(--gold)" />
        </motion.g>

        {/* Central Consultation Icon (Handshake / Brainstorm) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 12 }}
        >
          <circle cx="200" cy="200" r="35" fill="rgba(201, 169, 98, 0.1)" stroke="var(--gold)" strokeWidth="2" />
          {/* Architectural drafting compass */}
          <motion.path
            d="M 190 215 L 200 185 L 210 215 M 185 215 L 215 215"
            stroke="var(--gold)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            style={{ originX: "200px", originY: "185px" }}
          />
        </motion.g>
      </svg>
    </div>
  );
};

// Step 2 Visual: Design Development
const DesignVisual = () => {
  const uid = React.useId().replace(/:/g, "-");
  return (
    <div className="process-visual-wrapper design-visual">
      <svg viewBox="0 0 400 400" className="process-svg">
        <defs>
          <pattern id={`bp-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bp-grid-${uid})`} rx="16" />
        
        {/* Rotating Coordinate ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="135"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="1.5"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Isometric wireframe house drawing */}
        <g transform="translate(0, 10)">
          {/* Grid helper lines */}
          <path d="M 100 240 L 200 290 L 300 240 M 200 290 L 200 170" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="none" />
          
          {/* Left Wall Base */}
          <motion.path
            d="M 100 240 L 200 290 L 200 170 L 100 120 Z"
            stroke="var(--white)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
          
          {/* Right Wall Base */}
          <motion.path
            d="M 200 290 L 300 240 L 300 120 L 200 170 Z"
            stroke="var(--white)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeInOut" }}
          />
          
          {/* Roof wireframe */}
          <motion.path
            d="M 100 120 L 200 70 L 300 120"
            stroke="var(--gold)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
          />
          
          {/* Ridge line */}
          <motion.path
            d="M 200 170 L 200 70"
            stroke="var(--gold)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeInOut" }}
          />

          {/* Isometric windows */}
          <motion.path
            d="M 135 180 L 165 195 L 165 150 L 135 135 Z M 235 195 L 265 180 L 265 135 L 235 150 Z"
            stroke="rgba(201, 169, 98, 0.4)"
            strokeWidth="1"
            fill="rgba(201, 169, 98, 0.05)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          />

          {/* Dimensions */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <line x1="85" y1="240" x2="85" y2="120" stroke="rgba(201,169,98,0.25)" strokeWidth="1" />
            <line x1="80" y1="240" x2="90" y2="240" stroke="rgba(201,169,98,0.25)" strokeWidth="1" />
            <line x1="80" y1="120" x2="90" y2="120" stroke="rgba(201,169,98,0.25)" strokeWidth="1" />
            <text x="70" y="180" fill="var(--gold)" fontSize="9" fontFamily="var(--font-heading)" fontWeight="600" textAnchor="middle" transform="rotate(-90 70 180)">H: 8.5m</text>
          </motion.g>

          {/* GlowingCAD intersections dots */}
          <g>
            {[
              { cx: 100, cy: 240 },
              { cx: 200, cy: 290 },
              { cx: 300, cy: 240 },
              { cx: 100, cy: 120 },
              { cx: 200, cy: 170 },
              { cx: 300, cy: 120 },
              { cx: 200, cy: 70 }
            ].map((dot, idx) => (
              <motion.circle
                key={idx}
                cx={dot.cx}
                cy={dot.cy}
                r="3"
                fill="var(--gold)"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1] }}
                transition={{ delay: 1.6 + idx * 0.08, duration: 0.3 }}
              />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

// Step 3 Visual: Approvals & Planning
const ApprovalsVisual = () => {
  const uid = React.useId().replace(/:/g, "-");
  return (
    <div className="process-visual-wrapper approvals-visual">
      <svg viewBox="0 0 400 400" className="process-svg">
        <defs>
          <pattern id={`bp-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bp-grid-${uid})`} rx="16" />
        
        {/* Document sheet */}
        <motion.g
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
          {/* Clipboard board */}
          <rect x="80" y="60" width="240" height="280" rx="8" fill="rgba(31, 58, 92, 0.75)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          
          {/* Paper sheet */}
          <rect x="95" y="85" width="210" height="240" rx="4" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          
          {/* Document header lines */}
          <rect x="115" y="105" width="100" height="8" rx="4" fill="var(--white)" opacity="0.8" />
          <rect x="115" y="120" width="60" height="6" rx="3" fill="var(--gold)" opacity="0.7" />
          
          {/* Blueprint plan detail inside document */}
          <rect x="115" y="140" width="170" height="80" rx="3" fill="rgba(0,0,0,0.15)" stroke="rgba(201, 169, 98, 0.2)" strokeWidth="1" />
          {/* Sketchy schematic lines */}
          <path d="M 125 180 L 275 180 M 145 150 L 145 210 M 245 150 L 245 210" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          
          {/* Text check items */}
          <g transform="translate(0, 10)">
            {/* Row 1 */}
            <circle cx="125" cy="245" r="5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <motion.path d="M 122 245 L 124 247 L 128 243" stroke="var(--gold)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
            <rect x="140" y="242" width="120" height="5" rx="2" fill="var(--white)" opacity="0.5" />

            {/* Row 2 */}
            <circle cx="125" cy="265" r="5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <motion.path d="M 122 265 L 124 267 L 128 263" stroke="var(--gold)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.8 }} />
            <rect x="140" y="262" width="95" height="5" rx="2" fill="var(--white)" opacity="0.5" />

            {/* Row 3 */}
            <circle cx="125" cy="285" r="5" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <motion.path d="M 122 285 L 124 287 L 128 283" stroke="var(--gold)" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.0 }} />
            <rect x="140" y="282" width="130" height="5" rx="2" fill="var(--white)" opacity="0.5" />
          </g>
        </motion.g>

        {/* Stamped Approval Seal */}
        <motion.g
          initial={{ scale: 2.5, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: -12, opacity: 1 }}
          transition={{
            delay: 1.4,
            duration: 0.5,
            type: "spring",
            stiffness: 140,
            damping: 12
          }}
          style={{ originX: "245px", originY: "260px" }}
        >
          {/* Stamp outline */}
          <circle cx="245" cy="260" r="32" fill="none" stroke="var(--gold)" strokeWidth="2" strokeDasharray="60 3" />
          {/* Inner ring */}
          <circle cx="245" cy="260" r="27" fill="none" stroke="var(--gold)" strokeWidth="1" />
          
          <rect x="218" y="247" width="54" height="26" fill="rgba(22, 43, 68, 0.95)" rx="3" stroke="var(--gold)" strokeWidth="1.5" />
          <text x="245" y="260" fill="var(--gold)" fontSize="8" fontFamily="var(--font-heading)" fontWeight="800" textAnchor="middle" letterSpacing="0.8">APPROVED</text>
          <text x="245" y="268" fill="var(--gold)" fontSize="5" fontFamily="var(--font-heading)" fontWeight="600" textAnchor="middle" letterSpacing="0.5">PLANNING DEPT.</text>
        </motion.g>
      </svg>
    </div>
  );
};

// Step 4 Visual: Execution & Handover
const ExecutionVisual = () => {
  const uid = React.useId().replace(/:/g, "-");
  return (
    <div className="process-visual-wrapper execution-visual">
      <svg viewBox="0 0 400 400" className="process-svg">
        <defs>
          <pattern id={`bp-grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#bp-grid-${uid})`} rx="16" />
        
        {/* Completed Villa outline */}
        <g transform="translate(0, 15)">
          {/* Ground line */}
          <line x1="60" y1="270" x2="340" y2="270" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          
          {/* Main structure */}
          <motion.path
            d="M 90 270 L 90 150 L 230 150 L 230 270 Z"
            stroke="var(--white)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Garage block */}
          <motion.path
            d="M 230 270 L 230 185 L 310 185 L 310 270 Z"
            stroke="rgba(255,255,255,0.65)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
          />

          {/* Roof overhang */}
          <motion.path
            d="M 80 150 L 240 150 M 220 185 L 320 185"
            stroke="var(--gold)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
          />

          {/* Columns */}
          <motion.line
            x1="110" y1="150" x2="110" y2="270"
            stroke="var(--white)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          />
          <motion.line
            x1="130" y1="150" x2="130" y2="270"
            stroke="var(--white)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
          />

          {/* Glass window */}
          <motion.rect
            x="155" y="170" width="55" height="70"
            rx="2"
            stroke="rgba(201, 169, 98, 0.4)"
            strokeWidth="1"
            fill="rgba(201, 169, 98, 0.08)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
          <path d="M 182 170 L 182 240 M 155 205 L 210 205" stroke="rgba(201, 169, 98, 0.2)" strokeWidth="0.75" />

          {/* Floating sparks */}
          {[
            { x: 100, y: 120, size: 2.5, delay: 1.4 },
            { x: 180, y: 100, size: 3.5, delay: 1.6 },
            { x: 260, y: 130, size: 2.5, delay: 1.8 },
            { x: 140, y: 80, size: 4, delay: 2.0 }
          ].map((spark, idx) => (
            <motion.circle
              key={idx}
              cx={spark.x}
              cy={spark.y}
              r={spark.size}
              fill="var(--gold)"
              initial={{ opacity: 0, y: spark.y + 15 }}
              animate={{
                opacity: [0, 1, 0],
                y: [spark.y + 10, spark.y - 25],
                scale: [0.6, 1.2, 0.6]
              }}
              transition={{
                delay: spark.delay,
                duration: 2.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut"
              }}
            />
          ))}
        </g>

        {/* Handover Key */}
        <motion.g
          initial={{ y: -40, x: 40, scale: 0, rotate: -90, opacity: 0 }}
          animate={{ y: 0, x: 0, scale: 1, rotate: 45, opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.7,
            type: "spring",
            stiffness: 90,
            damping: 10
          }}
          style={{ originX: "280px", originY: "100px" }}
          transform="translate(180, -20)"
        >
          {/* Key Ring */}
          <circle cx="100" cy="100" r="14" fill="none" stroke="var(--gold)" strokeWidth="3" />
          <circle cx="100" cy="100" r="8" fill="rgba(31, 58, 92, 0.75)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Key Shaft */}
          <line x1="114" y1="100" x2="160" y2="100" stroke="var(--gold)" strokeWidth="4" />
          
          {/* Key Teeth */}
          <path d="M 148 100 L 148 114 L 154 114 L 154 100 M 158 100 L 158 114 L 164 114 L 164 100" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
          
          {/* Glow ring */}
          <circle cx="100" cy="100" r="22" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.12" />
        </motion.g>
      </svg>
    </div>
  );
};

const ProcessSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const currentRef = useRef(0); // Non-stale ref for scroll handler

  // Monitor viewport size to toggle sticky scroll logic
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Framer Motion scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Clamp to [0,1] and map to step index (0–3)
    const clamped = Math.max(0, Math.min(1, latest));
    const index = Math.min(
      Math.floor(clamped * processSteps.length),
      processSteps.length - 1
    );
    if (index !== currentRef.current) {
      currentRef.current = index;
      setCurrent(index);
    }
  });

  // Animated background glow shifts relative to scroll progress
  const glowX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"]);
  // Progress line width tracks scroll continuously (0% → 100%)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const handleStepClick = (index) => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const totalScrollable = element.scrollHeight - window.innerHeight;
    const elementTop = element.getBoundingClientRect().top + scrollTop;
    const fraction = index / processSteps.length;
    const targetScrollY = elementTop + fraction * totalScrollable;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  };

  const next = () => {
    const nextIndex = (current + 1) % processSteps.length;
    handleStepClick(nextIndex);
  };
  const prev = () => {
    const prevIndex = (current - 1 + processSteps.length) % processSteps.length;
    handleStepClick(prevIndex);
  };

  const renderVisual = (stepIdx) => {
    switch (stepIdx) {
      case 0:
        return <ConsultationVisual />;
      case 1:
        return <DesignVisual />;
      case 2:
        return <ApprovalsVisual />;
      case 3:
        return <ExecutionVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="process" className="process-section-wrapper" ref={containerRef}>
      {/* Moving glassmorphism bg glow */}
      <motion.div
        className="process-bg-glow"
        style={{ left: isMobile ? "50%" : glowX }}
      />
      
      <div className="process-sticky-container">
        <div className="container">
          {/* Compact header inside sticky view */}
          <div className="process-compact-header">
            <span className="section-label">How We Work</span>
            <h2 className="process-section-title">Our Design Process</h2>
          </div>

          {/* Steps track */}
          <div className="process-track-bar">
            {processSteps.map((step, i) => (
              <button
                key={step.step}
                className={`process-track-step ${i === current ? "active" : ""} ${i < current ? "done" : ""}`}
                onClick={() => handleStepClick(i)}
                aria-label={`Go to step ${step.step}: ${step.title}`}
              >
                <span className="process-track-num">{i < current ? "✓" : step.step}</span>
                <span className="process-track-label">{step.title}</span>
              </button>
            ))}
            <motion.div
              className="process-track-line"
              style={{ width: lineWidth }}
            />
          </div>

          {/* Slider */}
          <div className="process-slider-container">
            <div className="process-slides">
              <AnimatePresence mode="wait">
                {processSteps.map((step, i) => i === current && (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="process-slide-inner"
                  >
                    <div className="process-grid-split">
                      <div className="process-visual-column">
                        {renderVisual(i)}
                      </div>
                      <div className="process-text-column">
                        <div className="process-step-badge">
                          <span>STEP 0{step.step}</span>
                        </div>
                        <h3 className="process-step-title">{step.title}</h3>
                        <div className="process-step-divider" />
                        <p className="process-step-desc">{step.description}</p>
                        
                        <div className="process-card-footer">
                          {i < processSteps.length - 1 ? (
                            <button
                              className="btn btn-gold-outline mt-24"
                              onClick={next}
                            >
                              Next: {processSteps[i + 1].title}
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                          ) : (
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
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Dots */}
          <div className="process-dots" role="tablist">
            {processSteps.map((step, i) => (
              <button
                key={step.step}
                className={`process-dot ${i === current ? "active" : ""}`}
                onClick={() => handleStepClick(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Step ${step.step}: ${step.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSlider;
