import { TrendingUp, Users, Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhyUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("why-us");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const reasons = [
    {
      icon: TrendingUp,
      title: "10x More Affordable",
      description: "Save up to 70% compared to enterprise automation platforms. Transparent pricing with no hidden fees.",
      stats: "$29/mo",
    },
    {
      icon: Users,
      title: "50K+ Happy Users",
      description: "Join thousands of teams automating their workflows and saving hours every week.",
      stats: "50,000+",
    },
    {
      icon: Shield,
      title: "Enterprise Grade",
      description: "Bank-level security, 99.9% uptime SLA, and compliance with SOC 2, GDPR, and HIPAA.",
      stats: "99.9%",
    },
    {
      icon: Zap,
      title: "Industry Leading",
      description: "Fastest automation execution in the market with our optimized cloud infrastructure.",
      stats: "<50ms",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager @ TechCorp",
      quote: "We saved 40 hours per week using Mini Zapier. It's a game changer.",
      avatar: "SC",
    },
    {
      name: "James Wilson",
      role: "Operations Lead @ GrowthCo",
      quote: "The best automation platform we've used. Simple, powerful, and affordable.",
      avatar: "JW",
    },
    {
      name: "Maria Rodriguez",
      role: "Founder @ StartupX",
      quote: "Mini Zapier eliminated our manual data entry workflow completely.",
      avatar: "MR",
    },
  ];

  return (
    <section id="why-us" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black">
      {/* Subtle background accents */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Why Choose Mini Zapier?
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            The most trusted automation platform for teams of all sizes
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className={`group relative bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 hover:border-white/30 transition-all duration-300 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10"></div>

                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/15 group-hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      {reason.description}
                    </p>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {reason.stats}
                    </div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/20 to-transparent w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Section */}
        <div className={`bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
              Loved by teams worldwide
            </h3>
            <p className="text-gray-400 text-sm sm:text-base">See what our users are saying</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className={`bg-white/5 border border-white/10 rounded-xl p-4 sm:p-6 hover:border-white/30 transition-all duration-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${300 + i * 100}ms` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-white/70 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-xs sm:text-sm group-hover:bg-white/20 transition-all duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Card accent line */}
                <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-white/20 to-transparent w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
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
    </section>
  );
}