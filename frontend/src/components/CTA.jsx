import { ArrowRight, Check } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 px-4 bg-slate-950">
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl transform -translate-x-1/2 animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-full px-4 py-2 mb-6 backdrop-blur-sm animate-fade-in-up">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-sm text-gray-300">No credit card required</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Ready to Automate <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">Everything?</span>
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Join thousands of teams automating their workflows with Mini Zapier. Start free today and scale as you grow.
        </p>

        {/* Benefits List */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            "1000+ Integrations",
            "Unlimited Automations",
            "24/7 Support",
            "99.9% Uptime SLA",
          ].map((benefit, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-slate-800/30 border border-slate-700/30 rounded-lg px-4 py-3 animate-fade-in-up"
              style={{ animationDelay: `${0.3 + i * 0.05}s` }}
            >
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-sm text-gray-300">{benefit}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-slate-800/50 hover:bg-slate-700/50 text-white px-10 py-4 rounded-lg font-semibold border border-slate-700/50 transition-all transform hover:scale-105">
            Schedule Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
