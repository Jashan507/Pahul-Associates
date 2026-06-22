import React, { useState, useCallback, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import ProcessSlider from "./components/ProcessSlider";
import CostCalculator from "./components/CostCalculator";
import InquiryForm from "./components/InquiryForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    // Disable automatic browser scroll restoration on reload
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Force scroll to top on initial load/reload
    window.scrollTo(0, 0);

    // Backup scroll to top in case of layout rendering latency
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setHeaderVisible(true);
  }, []);

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <Header visible={headerVisible} />

      <main id="main-content">
        <Hero onAnimationComplete={handleAnimationComplete} />
        <Showcase />
        <Services />
        <Portfolio />
        <ProcessSlider />
        <CostCalculator />
        <InquiryForm />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
