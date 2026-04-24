import { TrendingUp, Users, Shield, Zap } from "lucide-react";

export default function WhyUs() {
  const reasons = [
    {
      icon: TrendingUp,
      title: "10x More Affordable",
      description: "Save up to 70% compared to enterprise automation platforms. Transparent pricing with no hidden fees.",
      stats: "$29/mo",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Users,
      title: "50K+ Happy Users",
      description: "Join thousands of teams automating their workflows and saving hours every week.",
      stats: "50,000+",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Shield,
      title: "Enterprise Grade",
      description: "Bank-level security, 99.9% uptime SLA, and compliance with SOC 2, GDPR, and HIPAA.",
      stats: "99.9%",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Zap,
      title: "Industry Leading",
      description: "Fastest automation execution in the market with our optimized cloud infrastructure.",
      stats: "<50ms",
      color: "from-orange-400 to-orange-600",
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Background accents */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Mini Zapier?
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            The most trusted automation platform for teams of all sizes
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={i}
                className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 -z-10`}
                ></div>

                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${reason.color} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {reason.description}
                    </p>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                      {reason.stats}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Loved by teams worldwide
            </h3>
            <p className="text-gray-300">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
