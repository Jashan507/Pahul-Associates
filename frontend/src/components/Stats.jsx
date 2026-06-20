import React, { useEffect, useRef, useState } from "react";
import { stats } from "../data/config";
import "./Stats.css";

function useCountUp(target, duration = 1500, isVisible) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!isVisible || started.current) return;
    started.current = true;

    const startTime = performance.now();
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return count;
}

const StatCard = ({ stat, isVisible, delay }) => {
  const count = useCountUp(stat.value, 1800, isVisible);

  return (
    <div
      className={`stat-card reveal ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-icon">{stat.icon}</div>
      <div className="stat-number">
        {count}<span className="stat-suffix">{stat.suffix}</span>
      </div>
      <p className="stat-label">{stat.label}</p>
      <div className="stat-line" />
    </div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              stat={stat}
              isVisible={isVisible}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
