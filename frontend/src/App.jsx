import React, { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import ProcessSlider from "./components/ProcessSlider";
import CostCalculator from "./components/CostCalculator";
import InquiryForm from "./components/InquiryForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const [headerVisible, setHeaderVisible] = useState(false);

  const handleAnimationComplete = () => {
    setHeaderVisible(true);
  };

  return (
    <>
      {/* Skip to main content (accessibility) */}
      <a href="#home" className="skip-link">Skip to main content</a>

      <Header visible={headerVisible} />

      <main id="main-content">
        <Hero onAnimationComplete={handleAnimationComplete} />
        <Stats />
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
