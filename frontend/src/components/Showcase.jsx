import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import villaImg from "../assets/images/3d_luxury_villa.png";
import "./Showcase.css";

const hotspots = [
  {
    id: 1,
    top: "15%",
    left: "55%",
    title: "Cantilever Roof",
    desc: "Gravity-defying structural roof canopy offering thermal comfort and modern aesthetics.",
  },
  {
    id: 2,
    top: "42%",
    left: "35%",
    title: "Eco Glazing Walls",
    desc: "Triple-glazed Low-E floor-to-ceiling glass paneling for optimal solar gain regulation.",
  },
  {
    id: 3,
    top: "78%",
    left: "68%",
    title: "Reinforced Steel Base",
    desc: "A solid floating foundation designed for seismically resilient cantilever designs.",
  },
];

const Showcase = () => {
  const cardRef = useRef(null);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Framer Motion mouse tilt logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 25, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 25, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setActiveHotspot(null);
  };

  return (
    <section id="showcase" className="section section-dark showcase-section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Interactive 3D Demo</span>
          <h2 className="section-title text-white">Next-Gen Architecture</h2>
          <p className="section-subtitle">
            Hover and interact with our 3D visualization. We blend advanced building technology
            with modern design languages.
          </p>
          <div className="gold-line" />
        </div>

        <div className="showcase-grid">
          {/* Left Column - 3D Interactive Card */}
          <div className="showcase-card-container">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="showcase-3d-card"
            >
              {/* Inner container with translated elements */}
              <div className="showcase-card-inner" style={{ transform: "translateZ(30px)" }}>
                <img
                  src={villaImg}
                  alt="3D Luxury Villa Render"
                  className="showcase-villa-img"
                  style={{ transform: "translateZ(10px)" }}
                />
                
                {/* Glow Overlay */}
                <div className="showcase-card-glow" />

                {/* Hotspots */}
                {hotspots.map((spot) => (
                  <div
                    key={spot.id}
                    className="showcase-hotspot-wrap"
                    style={{
                      top: spot.top,
                      left: spot.left,
                      transform: "translateZ(60px)",
                    }}
                  >
                    <button
                      className={`showcase-hotspot-btn ${activeHotspot === spot.id ? "active" : ""}`}
                      onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                      onMouseEnter={() => setActiveHotspot(spot.id)}
                      aria-label={`Hotspot details: ${spot.title}`}
                    >
                      <span className="hotspot-pulse" />
                      <span className="hotspot-dot" />
                    </button>

                    {activeHotspot === spot.id && (
                      <div className="showcase-hotspot-tooltip">
                        <h4>{spot.title}</h4>
                        <p>{spot.desc}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Engineering & Tech specifications */}
          <div className="showcase-specs">
            <div className="spec-item">
              <div className="spec-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="spec-content">
                <h3>Acoustic & Insulation Excellence</h3>
                <p>
                  Integrated multi-layer sound dampening facades coupled with low-E glazed windows 
                  achieve structural decibel levels below 30dB.
                </p>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="spec-content">
                <h3>Resilient Frameworks</h3>
                <p>
                  Using high-tensile structural steel matrices for expansive double-cantilever overhangs, 
                  ensuring wind resistance exceeding 220 km/h.
                </p>
              </div>
            </div>

            <div className="spec-item">
              <div className="spec-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <div className="spec-content">
                <h3>Eco-Conscious Integration</h3>
                <p>
                  Optimized sunlight positioning maps provide optimal passive lighting and 
                  reduce energy expenditure in HVAC heating by up to 35%.
                </p>
              </div>
            </div>

            <button
              className="btn btn-primary showcase-cta"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Consult with our Architects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
