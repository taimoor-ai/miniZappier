import { Zap, Lock, BarChart3, Smartphone, Smile, Cog } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Automations run in milliseconds with our optimized infrastructure.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with all major standards.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance metrics and optimize your workflows in real-time.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Manage automations from anywhere with our responsive design.",
      color: "from-pink-400 to-pink-600",
    },
    {
      icon: Smile,
      title: "Zero Learning Curve",
      description: "Intuitive UI that anyone can use without technical expertise.",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: Cog,
      title: "Highly Customizable",
      description: "Build complex workflows with conditional logic and advanced triggers.",
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  return (
    <section id="features" className="relative py-20 px-4">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features for Every Use Case
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to build, run, and manage world-class automations
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300 -z-10`}
                ></div>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Accent line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-xl w-0 group-hover:w-full transition-all duration-300`}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
