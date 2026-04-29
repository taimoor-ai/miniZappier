import { ArrowRight, Check, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function CTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("cta");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const benefits = [
    "1000+ Integrations",
    "Unlimited Automations",
    "24/7 Support",
    "99.9% Uptime SLA",
  ];

  const trustIndicators = [
    { label: "Enterprise Security", icon: Shield },
    { label: "GDPR Compliant", icon: Check },
    { label: "SOC 2 Certified", icon: Check },
  ];

  return (
    <section id="cta" className="relative py-16 sm:py-20 md:py-32 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Animated background accents */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge with Glassmorphism */}
        <div className={`inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 backdrop-blur-md hover:bg-white/15 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <Check className="w-4 h-4 text-white/80" />
          <span className="text-xs sm:text-sm text-white/80">No credit card required</span>
        </div>

        {/* Heading */}
        <h2 className={`text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Ready to Automate <span className="text-white/90">Everything?</span>
        </h2>

        {/* Subtitle */}
        <p className={`text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          Join thousands of teams automating their workflows with Mini Zapier. Start free today and scale as you grow.
        </p>

        {/* Benefits Grid with Glassmorphism */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`group flex items-center justify-center sm:justify-start gap-2 bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-3 sm:py-4 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <Check className="w-5 h-5 text-white/70 flex-shrink-0 group-hover:text-white transition-colors" />
              <span className="text-xs sm:text-sm text-white/70 group-hover:text-white transition-colors">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button className="w-full sm:w-auto group bg-white text-black px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gray-100 hover:shadow-xl shadow-white/20 transform hover:scale-105 active:scale-95">
            Get Started Free
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto bg-white/10 border border-white/20 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 transform hover:scale-105 active:scale-95">
            Schedule Demo
          </button>
        </div>

        {/* Trust Indicators with Icons */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-white/70 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {trustIndicators.map((indicator, i) => {
            const IconComponent = indicator.icon;
            return (
              <div key={i} className="group flex items-center gap-2 hover:text-white transition-colors duration-300">
                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white/50 group-hover:text-white transition-colors" />
                <span>{indicator.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}