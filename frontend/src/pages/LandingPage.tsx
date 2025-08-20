import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import FAQ from "../components/landing/FAQ";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <FAQ />
    </>
  );
} 