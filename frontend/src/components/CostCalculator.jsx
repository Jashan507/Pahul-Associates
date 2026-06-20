import React, { useState, useCallback } from "react";
import {
  projectTypes,
  complexityOptions,
  addOns,
  timelineOptions,
} from "../data/config";
import "./CostCalculator.css";

const formatINR = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const CostCalculator = () => {
  const [projectType, setProjectType] = useState("residential3d");
  const [area, setArea] = useState(2000);
  const [areaInput, setAreaInput] = useState("2000");
  const [complexity, setComplexity] = useState("standard");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [timeline, setTimeline] = useState("standard");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [areaError, setAreaError] = useState("");

  const getRate = () => projectTypes.find((p) => p.value === projectType)?.rate || 45;
  const getComplexityMult = () => complexityOptions.find((c) => c.value === complexity)?.multiplier || 0;
  const getTimelineAdj = () => timelineOptions.find((t) => t.value === timeline)?.adjustment || 0;

  const calculate = useCallback(() => {
    const rate = getRate();
    const baseCost = area * rate;
    const complexityMult = getComplexityMult();
    const complexityCost = baseCost * (1 + complexityMult);
    const addOnsCost = selectedAddOns.reduce((sum, id) => {
      const addon = addOns.find((a) => a.id === id);
      return sum + (addon?.price || 0);
    }, 0);
    const timelineAdj = getTimelineAdj();
    const finalCost = (complexityCost + addOnsCost) * (1 + timelineAdj);

    return {
      baseCost,
      complexityCost: baseCost * complexityMult,
      addOnsCost,
      timelineAdjustment: (complexityCost + addOnsCost) * Math.abs(timelineAdj),
      finalCost,
    };
  }, [projectType, area, complexity, selectedAddOns, timeline]);

  const result = calculate();

  const handleAreaChange = (val) => {
    const numVal = parseInt(val, 10);
    setAreaInput(val);
    if (isNaN(numVal)) {
      setAreaError("Please enter a valid number");
      return;
    }
    if (numVal < 500 || numVal > 10000) {
      setAreaError("Area must be between 500–10,000 sq.ft");
    } else {
      setAreaError("");
      setArea(numVal);
    }
  };

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const resetCalc = () => {
    setProjectType("residential3d");
    setArea(2000);
    setAreaInput("2000");
    setComplexity("standard");
    setSelectedAddOns([]);
    setTimeline("standard");
    setAreaError("");
    setShowBreakdown(false);
  };

  return (
    <section id="calculator" className="section section-off-white">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Instant Estimate</span>
          <h2 className="section-title">Project Cost Calculator</h2>
          <p className="section-subtitle">
            Get a real-time estimate for your project in seconds. Transparent pricing,
            no hidden costs.
          </p>
          <div className="gold-line" />
        </div>

        <div className="calc-grid">
          {/* Left — Inputs */}
          <div className="calc-inputs">
            {/* Step 1: Project Type */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="projectType">
                <span className="calc-step">01</span>
                Project Type
              </label>
              <select
                id="projectType"
                className="calc-select"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                {projectTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>
                    {pt.label} — ₹{pt.rate}/sq.ft
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Area */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="area">
                <span className="calc-step">02</span>
                Area (sq.ft)
              </label>
              <div className="calc-area-row">
                <input
                  id="area"
                  type="number"
                  className={`calc-input ${areaError ? "error" : ""}`}
                  value={areaInput}
                  onChange={(e) => handleAreaChange(e.target.value)}
                  min="500"
                  max="10000"
                  placeholder="e.g. 2000"
                />
                <span className="calc-area-unit">sq.ft</span>
              </div>
              <input
                type="range"
                className="calc-slider"
                min="500"
                max="10000"
                step="100"
                value={area}
                onChange={(e) => { setArea(Number(e.target.value)); setAreaInput(e.target.value); setAreaError(""); }}
                aria-label="Area slider"
              />
              <div className="calc-range-labels">
                <span>500</span>
                <span>{area.toLocaleString()} sq.ft</span>
                <span>10,000</span>
              </div>
              {areaError && <p className="calc-error">{areaError}</p>}
            </div>

            {/* Step 3: Complexity */}
            <div className="calc-field">
              <label className="calc-label">
                <span className="calc-step">03</span>
                Design Complexity
              </label>
              <div className="calc-complexity-grid">
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    className={`calc-complexity-btn ${complexity === opt.value ? "active" : ""}`}
                    onClick={() => setComplexity(opt.value)}
                    type="button"
                  >
                    <span className="complexity-name">{opt.label}</span>
                    <span className="complexity-pct">
                      {opt.multiplier === 0 ? "Base" : `+${(opt.multiplier * 100).toFixed(0)}%`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-ons */}
            <div className="calc-field">
              <label className="calc-label">
                <span className="calc-step">04</span>
                Additional Services
              </label>
              <div className="calc-addons-grid">
                {addOns.map((addon) => (
                  <label key={addon.id} className={`calc-addon ${selectedAddOns.includes(addon.id) ? "checked" : ""}`}>
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.id)}
                      onChange={() => toggleAddOn(addon.id)}
                      className="calc-checkbox-input"
                    />
                    <div className="calc-addon-check">
                      {selectedAddOns.includes(addon.id) && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                    <span className="addon-name">{addon.name}</span>
                    <span className="addon-price">+₹{addon.price.toLocaleString("en-IN")}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 5: Timeline */}
            <div className="calc-field">
              <label className="calc-label" htmlFor="timeline">
                <span className="calc-step">05</span>
                Timeline
              </label>
              <select
                id="timeline"
                className="calc-select"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
              >
                {timelineOptions.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label} {t.adjustment > 0 ? `(+${t.adjustment * 100}% premium)` : t.adjustment < 0 ? `(${t.adjustment * 100}% discount)` : "(Standard)"}
                  </option>
                ))}
              </select>
            </div>

            <button className="calc-reset" onClick={resetCalc} type="button">
              ↺ Reset Calculator
            </button>
          </div>

          {/* Right — Result */}
          <div className="calc-result-panel">
            <div className="calc-result-card">
              <div className="calc-result-header">
                <span className="calc-result-label">Estimated Project Cost</span>
                <div className="calc-result-amount">
                  {formatINR(result.finalCost)}
                </div>
              </div>

              <div className="calc-result-summary">
                <div className="calc-result-row">
                  <span>Base Cost ({area.toLocaleString()} × ₹{getRate()})</span>
                  <span>{formatINR(result.baseCost)}</span>
                </div>
                {result.complexityCost > 0 && (
                  <div className="calc-result-row">
                    <span>Complexity ({(getComplexityMult() * 100).toFixed(0)}%)</span>
                    <span>+{formatINR(result.complexityCost)}</span>
                  </div>
                )}
                {result.addOnsCost > 0 && (
                  <div className="calc-result-row">
                    <span>Add-ons ({selectedAddOns.length} selected)</span>
                    <span>+{formatINR(result.addOnsCost)}</span>
                  </div>
                )}
                {getTimelineAdj() !== 0 && (
                  <div className={`calc-result-row ${getTimelineAdj() < 0 ? "discount" : "premium"}`}>
                    <span>Timeline {getTimelineAdj() < 0 ? "Discount" : "Premium"}</span>
                    <span>{getTimelineAdj() < 0 ? "-" : "+"}{formatINR(result.timelineAdjustment)}</span>
                  </div>
                )}
                <div className="calc-result-total">
                  <span>Total Estimate</span>
                  <span className="calc-total-amount">{formatINR(result.finalCost)}</span>
                </div>
              </div>

              <p className="calc-disclaimer">
                * This is an approximate estimate. Final cost may vary based on
                specific requirements and site conditions.
              </p>

              <button
                className="btn btn-primary w-full"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Detailed Consultation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Features */}
            <div className="calc-features">
              {["Transparent Pricing", "No Hidden Costs", "Expert Consultation", "On-Time Delivery"].map((f) => (
                <div key={f} className="calc-feature">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostCalculator;
