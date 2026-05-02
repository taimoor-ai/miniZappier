import { Check, Link2, Zap, Target, Workflow, BarChart3, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AuthModal from "./AuthModel";

export default function HowItWorks() {
  const [isVisible, setIsVisible] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'login' | 'register' | null
    const [isOpen, setIsOpen] = useState(false);
const openRegister = () => {
    setIsOpen(false);
    setAuthMode("register");
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("how-it-works");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "1",
      title: "Connect Your Apps",
      description: "Choose from 1000+ pre-built integrations or connect custom APIs in minutes.",
      icon: Link2,
    },
    {
      number: "2",
      title: "Create Your Workflow",
      description: "Use our visual builder to design complex automations without coding.",
      icon: Workflow,
    },
    {
      number: "3",
      title: "Set Your Triggers",
      description: "Define when your automation should run with flexible conditional logic.",
      icon: Target,
    },
    {
      number: "4",
      title: "Build Your Actions",
      description: "Chain multiple actions together to create powerful multi-step workflows.",
      icon: Zap,
    },
    {
      number: "5",
      title: "Monitor & Optimize",
      description: "Track execution in real-time and optimize based on detailed analytics.",
      icon: BarChart3,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            How It Works
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Get your first automation running in 5 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className={`hidden lg:block absolute top-20 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className={`flex flex-col items-center transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Step number circle with icon */}
                  <div className="relative mb-6 sm:mb-8 w-full flex justify-center">
                    <div className="group relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-300 scale-100"></div>

                      {/* Icon circle */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border border-white/10 group-hover:border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/10">
                        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white/80 group-hover:text-white transition-colors" />
                      </div>

                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black border-2 border-white/20 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                        {step.number}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center px-2 sm:px-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-white/90 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector - hidden on mobile and last step */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-20 -right-4 w-8 h-1 items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white/20" />
                    </div>
                  )}

                  {/* Mobile divider - shown only between items on mobile/tablet */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-6 sm:mt-8 w-px h-6 sm:h-8 bg-gradient-to-b from-white/20 to-transparent"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button 
           onClick={openRegister}
          className="inline-flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100 hover:shadow-lg transform hover:scale-105 active:scale-95">
            Start Building Automations <Check className="w-5 h-5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
       {/* Auth Modal — blur backdrop + Login/Register switching */}
      <AuthModal
        mode={authMode}
        onClose={() => setAuthMode(null)}
        onSwitch={(newMode) => setAuthMode(newMode)}
      />
    </section>
  );
}