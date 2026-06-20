import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "../data/config";
import "./Portfolio.css";

const Portfolio = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeProject, setActiveProject] = useState(null);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [cardWidth, setCardWidth] = useState(0);
  const [gap, setGap] = useState(24);
  const [trackOffset, setTrackOffset] = useState(0);

  // Responsive adjustment for visible cards
  useEffect(() => {
    const handleResize = () => {
      let currentVisible = 3;
      if (window.innerWidth < 768) {
        currentVisible = 1;
      } else if (window.innerWidth < 1024) {
        currentVisible = 2;
      }
      setVisibleCount(currentVisible);

      if (containerRef.current) {
        const cardEl = containerRef.current.querySelector(".portfolio-slide");
        if (cardEl) {
          setCardWidth(cardEl.getBoundingClientRect().width);
        }
        setGap(window.innerWidth < 768 ? 16 : 24);
      }
    };

    // Calculate dimensions after mount
    const timer = setTimeout(() => {
      handleResize();
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Compute offset
  useEffect(() => {
    setTrackOffset(-currentIndex * (cardWidth + gap));
  }, [currentIndex, cardWidth, gap]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="portfolio" className="section section-light">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A curated selection from our portfolio of 250+ completed projects across
            residential, commercial, and mixed-use developments.
          </p>
          <div className="gold-line" />
        </div>

        <div className="portfolio-slider-wrapper" ref={containerRef}>
          {/* Slider Container */}
          <div className="portfolio-slider-container">
            <motion.div
              className="portfolio-track"
              drag="x"
              dragConstraints={{
                left: -maxIndex * (cardWidth + gap),
                right: 0,
              }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                const offset = info.offset.x;
                const velocity = info.velocity.x;
                const threshold = 50;

                if (offset < -threshold || velocity < -500) {
                  if (currentIndex < maxIndex) {
                    setCurrentIndex((prev) => prev + 1);
                  }
                } else if (offset > threshold || velocity > 500) {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                  }
                }
              }}
              animate={{ x: trackOffset }}
              transition={{ type: "spring", stiffness: 150, damping: 22 }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="portfolio-slide"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="portfolio-card">
                    {/* Skeleton */}
                    {!loadedImages.has(project.id) && (
                      <div className="portfolio-skeleton skeleton" />
                    )}
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`portfolio-img ${
                        loadedImages.has(project.id) ? "loaded" : ""
                      }`}
                      loading="lazy"
                      onLoad={() => handleImageLoad(project.id)}
                    />
                    <div className="portfolio-overlay">
                      <span className="portfolio-category">{project.category}</span>
                      <h3 className="portfolio-title">{project.title}</h3>
                      <p className="portfolio-subtitle">{project.subtitle}</p>
                      <div className="portfolio-view">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                        View Project
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            className={`portfolio-nav-btn prev-btn ${currentIndex === 0 ? "disabled" : ""}`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Previous Project"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className={`portfolio-nav-btn next-btn ${
              currentIndex >= maxIndex ? "disabled" : ""
            }`}
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Next Project"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Indicators / Dots */}
        {maxIndex > 0 && (
          <div className="portfolio-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                className={`portfolio-dot ${idx === currentIndex ? "active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Lightbox */}
        {activeProject && (
          <div className="lightbox" onClick={() => setActiveProject(null)}>
            <button className="lightbox-close" onClick={() => setActiveProject(null)}>
              ✕
            </button>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img src={activeProject.image} alt={activeProject.title} />
              <div className="lightbox-info">
                <span className="lightbox-category">{activeProject.category}</span>
                <h3>{activeProject.title}</h3>
                <p>{activeProject.subtitle}</p>
                <button
                  className="btn btn-primary mt-16"
                  onClick={() => {
                    setActiveProject(null);
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Request Similar Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
