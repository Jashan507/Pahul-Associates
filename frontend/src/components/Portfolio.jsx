import React, { useEffect, useRef, useState } from "react";
import { projects } from "../data/config";
import "./Portfolio.css";

const Portfolio = () => {
  const ref = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".portfolio-card");
    if (!items) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => new Set([...prev, id]));
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

        <div className="portfolio-grid" ref={ref}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`portfolio-card reveal ${visibleItems.has(index) ? "visible" : ""}`}
              data-index={index}
              style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              onClick={() => setActiveProject(project)}
            >
              {/* Skeleton */}
              {!loadedImages.has(project.id) && (
                <div className="portfolio-skeleton skeleton" />
              )}
              <img
                src={project.image}
                alt={project.title}
                className={`portfolio-img ${loadedImages.has(project.id) ? "loaded" : ""}`}
                loading="lazy"
                onLoad={() => handleImageLoad(project.id)}
              />
              <div className="portfolio-overlay">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-subtitle">{project.subtitle}</p>
                <div className="portfolio-view">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  View Project
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {activeProject && (
          <div className="lightbox" onClick={() => setActiveProject(null)}>
            <button className="lightbox-close" onClick={() => setActiveProject(null)}>✕</button>
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
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
