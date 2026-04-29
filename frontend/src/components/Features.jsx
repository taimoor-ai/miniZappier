'use client';

import { Zap, Lock, BarChart3, Smartphone, Smile, Cog } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Automations run in milliseconds with our optimized infrastructure.",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with all major standards.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance metrics and optimize your workflows in real-time.",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Manage automations from anywhere with our responsive design.",
    },
    {
      icon: Smile,
      title: "Zero Learning Curve",
      description: "Intuitive UI that anyone can use without technical expertise.",
    },
    {
      icon: Cog,
      title: "Highly Customizable",
      description: "Build complex workflows with conditional logic and advanced triggers.",
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="features" 
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-white"
    >
      {/* Animated background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100 rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Powerful Features for Every Use Case
          </h2>
          <p 
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Everything you need to build, run, and manage world-class automations
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className={`group relative bg-white border-2 border-gray-200 rounded-2xl p-6 sm:p-8 hover:border-black hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: isVisible ? `${i * 100}ms` : '0ms',
                }}
              >
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                
                {/* Top border accent line animation */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-black group-hover:w-full transition-all duration-500" />

                {/* Icon Container */}
                <div className="mb-6 sm:mb-8 relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-black flex items-center justify-center group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  
                  {/* Icon glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-black opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 scale-150 -z-10" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line animation */}
                <div className="absolute bottom-0 right-0 w-0 h-1 bg-black group-hover:w-full transition-all duration-500 origin-right" />
                
                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-0 h-0 border-l-0 border-b-0 border-t-[30px] border-r-[30px] border-l-transparent border-b-transparent border-t-white border-r-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes gentle-pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-pulse {
          animation: gentle-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
