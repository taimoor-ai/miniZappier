import { Check } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Connect Your Apps",
      description: "Choose from 1000+ pre-built integrations or connect custom APIs in minutes.",
      icon: "🔗",
    },
    {
      number: "2",
      title: "Create Your Workflow",
      description: "Use our visual builder to design complex automations without coding.",
      icon: "⚙️",
    },
    {
      number: "3",
      title: "Set Your Triggers",
      description: "Define when your automation should run with flexible conditional logic.",
      icon: "🎯",
    },
    {
      number: "4",
      title: "Build Your Actions",
      description: "Chain multiple actions together to create powerful multi-step workflows.",
      icon: "⚡",
    },
    {
      number: "5",
      title: "Monitor & Optimize",
      description: "Track execution in real-time and optimize based on detailed analytics.",
      icon: "📊",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-20 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background accent */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Get your first automation running in 5 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-blue-500/40 to-blue-500/20 transform -translate-y-1/2"></div>

          <div className="grid lg:grid-cols-5 gap-8 relative">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {/* Step number circle */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30 relative z-10">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="text-sm font-bold text-blue-400 mb-2">Step {step.number}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector - hidden on last step and mobile */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105">
            Start Building Automations <Check className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
