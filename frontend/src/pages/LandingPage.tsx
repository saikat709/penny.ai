import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Features from "../components/landing/Features";
import FAQ from "../components/landing/FAQ";

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <FAQ />

      {/* Floating chat button - opens chat page */}
      <div className="fixed right-6 md:right-10 bottom-6 md:bottom-10 z-50">
        <button
          type="button"
          onClick={() => navigate('/chat')}
          aria-label="Open chat"
          className="w-14 h-14 md:w-16 md:h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <title>Open chat</title>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h.01M12 11h.01M16 11h.01" />
          </svg>
        </button>
      </div>
    </>
  );
} 