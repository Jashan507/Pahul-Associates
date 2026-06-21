import React, { useState, useRef } from "react";
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
  const headerLogoRef = useRef(null);

  const handleAnimationComplete = () => {
    setHeaderVisible(true);
  };

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <Header visible={headerVisible} logoRef={headerLogoRef} />

      <main id="main-content">
        <Hero onAnimationComplete={handleAnimationComplete} headerLogoRef={headerLogoRef} />
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
