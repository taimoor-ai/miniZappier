import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export default function WorkflowPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateFlow, setAnimateFlow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateFlow(true), 300);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById("workflow-preview");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const features = [
    { title: "No Code Required", description: "Build automations without writing a single line of code" },
    { title: "Conditional Logic", description: "Add if/then conditions and branching logic for complex workflows" },
    { title: "Real-time Monitoring", description: "Watch your automations run and track every execution" },
  ];

  return (
    <section id="workflow-preview" className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-black">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Visual Workflow Builder
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Drag, drop, and build complex automations with our intuitive visual interface
          </p>
        </div>

        {/* Workflow Preview Card */}
        <div className={`relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 shadow-2xl shadow-white/10' : 'opacity-0 translate-y-10'
        }`}>
          {/* Header */}
          <div className="bg-white/5 border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/40"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/30"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white/20"></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-400">Automation Editor</span>
            <div></div>
          </div>

          {/* Workflow Canvas */}
          <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-b from-white/5 to-black min-h-80 sm:min-h-96 relative overflow-x-auto">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto min-w-fit"
              style={{
                filter: "drop-shadow(0 10px 30px rgba(255, 255, 255, 0.05))",
              }}
            >
              {/* Define gradients and markers */}
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(255, 255, 255)" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="rgb(200, 200, 200)" stopOpacity="0.3" />
                </linearGradient>
                <marker id="arrowEnd" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="rgb(200, 200, 200)" />
                </marker>
              </defs>

              {/* Trigger Node */}
              <g className={animateFlow ? "animate-node-1" : ""}>
                <rect x="50" y="150" width="140" height="80" fill="rgba(255, 255, 255, 0.08)" stroke="rgb(150, 150, 150)" strokeWidth="2" rx="8" />
                <text x="120" y="180" textAnchor="middle" fill="rgb(200, 200, 200)" fontSize="14" fontWeight="bold">
                  Trigger
                </text>
                <text x="120" y="200" textAnchor="middle" fill="rgb(150, 150, 150)" fontSize="12">
                  New Email
                </text>
                <circle cx="190" cy="190" r="5" fill="rgb(200, 200, 200)" />
              </g>

              {/* Arrow 1 */}
              <path
                d="M 230 190 L 280 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
                className={animateFlow ? "animate-arrow-flow" : ""}
                style={{ animationDelay: "0s" }}
              />

              {/* Filter Node */}
              <g className={animateFlow ? "animate-node-2" : ""}>
                <rect x="280" y="150" width="140" height="80" fill="rgba(255, 255, 255, 0.08)" stroke="rgb(150, 150, 150)" strokeWidth="2" rx="8" />
                <text x="350" y="180" textAnchor="middle" fill="rgb(200, 200, 200)" fontSize="14" fontWeight="bold">
                  Filter
                </text>
                <text x="350" y="200" textAnchor="middle" fill="rgb(150, 150, 150)" fontSize="12">
                  Has Attachment
                </text>
                <circle cx="420" cy="190" r="5" fill="rgb(200, 200, 200)" />
              </g>

              {/* Arrow 2 */}
              <path
                d="M 460 190 L 510 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
                className={animateFlow ? "animate-arrow-flow" : ""}
                style={{ animationDelay: "0.3s" }}
              />

              {/* Action Node 1 */}
              <g className={animateFlow ? "animate-node-3" : ""}>
                <rect x="510" y="150" width="140" height="80" fill="rgba(255, 255, 255, 0.08)" stroke="rgb(150, 150, 150)" strokeWidth="2" rx="8" />
                <text x="580" y="180" textAnchor="middle" fill="rgb(200, 200, 200)" fontSize="14" fontWeight="bold">
                  Action
                </text>
                <text x="580" y="200" textAnchor="middle" fill="rgb(150, 150, 150)" fontSize="12">
                  Save to Drive
                </text>
                <circle cx="650" cy="190" r="5" fill="rgb(200, 200, 200)" />
              </g>

              {/* Arrow 3 */}
              <path
                d="M 690 190 L 740 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
                className={animateFlow ? "animate-arrow-flow" : ""}
                style={{ animationDelay: "0.6s" }}
              />

              {/* Action Node 2 */}
              <g className={animateFlow ? "animate-node-4" : ""}>
                <rect x="740" y="150" width="140" height="80" fill="rgba(255, 255, 255, 0.08)" stroke="rgb(150, 150, 150)" strokeWidth="2" rx="8" />
                <text x="810" y="180" textAnchor="middle" fill="rgb(200, 200, 200)" fontSize="14" fontWeight="bold">
                  Action
                </text>
                <text x="810" y="200" textAnchor="middle" fill="rgb(150, 150, 150)" fontSize="12">
                  Send Slack
                </text>
                <circle cx="880" cy="190" r="5" fill="rgb(200, 200, 200)" />
              </g>

              {/* Connection info */}
              <text x="500" y="320" textAnchor="middle" fill="rgb(120, 120, 120)" fontSize="13">
                Trigger → Filter → Save File → Send Notification
              </text>

              {/* Status badges */}
              <g>
                <rect x="50" y="380" width="100" height="30" fill="rgba(255, 255, 255, 0.08)" stroke="rgb(150, 150, 150)" strokeWidth="1" rx="4" />
                <text x="100" y="400" textAnchor="middle" fill="rgb(200, 200, 200)" fontSize="12">
                  ✓ Active
                </text>
              </g>

              <g>
                <text x="200" y="400" fill="rgb(100, 100, 100)" fontSize="12">
                  Last run: 2 minutes ago
                </text>
              </g>

              <g>
                <text x="500" y="400" fill="rgb(100, 100, 100)" fontSize="12">
                  43 executions this week
                </text>
              </g>
            </svg>
          </div>

          {/* Footer */}
          <div className="bg-white/5 border-t border-white/10 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="text-xs sm:text-sm text-gray-400">
              Advanced conditions and multi-step workflows supported
            </div>
            <button className="text-gray-300 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-1">
              View Documentation →
            </button>
          </div>
        </div>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 md:mt-20">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`flex gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Check className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-gray-400 text-xs sm:text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes nodeAppear {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes arrowFlow {
          from {
            stroke-dashoffset: 100;
            stroke-dasharray: 100;
          }
          to {
            stroke-dashoffset: 0;
            stroke-dasharray: 100;
          }
        }

        .animate-node-1 {
          animation: nodeAppear 0.6s ease-out 0s forwards;
        }

        .animate-node-2 {
          animation: nodeAppear 0.6s ease-out 0.2s forwards;
        }

        .animate-node-3 {
          animation: nodeAppear 0.6s ease-out 0.4s forwards;
        }

        .animate-node-4 {
          animation: nodeAppear 0.6s ease-out 0.6s forwards;
        }

        .animate-arrow-flow {
          animation: arrowFlow 0.8s ease-in-out forwards;
        }
      `}</style>
    </section>
  );
}