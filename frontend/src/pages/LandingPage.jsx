import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import WorkflowPreview from "../components/WorkflowPreview";
import WhyUs from "../components/WhyUs";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export const metadata = {
  title: "Mini Zapier - Automate Your Workflows",
  description: "Connect apps, automate workflows, and save time with Mini Zapier.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-in-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.6s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.6s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}</style>
      
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <WorkflowPreview />
      <WhyUs />
      <CTA />
      <Footer />
    </div>
  );
}
