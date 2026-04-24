export default function WorkflowPreview() {
  return (
    <section className="relative py-20 px-4 bg-slate-950">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Visual Workflow Builder
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Drag, drop, and build complex automations with our intuitive visual interface
          </p>
        </div>

        {/* Workflow Preview Card */}
        <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-slate-900/80 border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-sm text-gray-400">Automation Editor</span>
            <div></div>
          </div>

          {/* Workflow Canvas */}
          <div className="p-8 bg-gradient-to-b from-slate-800/50 to-slate-950 min-h-96 relative overflow-x-auto">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-auto min-w-fit"
              style={{
                filter: "drop-shadow(0 10px 30px rgba(59, 130, 246, 0.1))",
              }}
            >
              {/* Define gradients and markers */}
              <defs>
                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" />
                </linearGradient>
                <marker id="arrowEnd" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                  <path d="M0,0 L0,6 L9,3 z" fill="rgb(59, 130, 246)" />
                </marker>
              </defs>

              {/* Trigger Node */}
              <g>
                <rect x="50" y="150" width="140" height="80" fill="rgba(59, 130, 246, 0.2)" stroke="rgb(59, 130, 246)" strokeWidth="2" rx="8" />
                <text x="120" y="180" textAnchor="middle" fill="rgb(147, 197, 253)" fontSize="14" fontWeight="bold">
                  Trigger
                </text>
                <text x="120" y="200" textAnchor="middle" fill="rgb(191, 219, 254)" fontSize="12">
                  New Email
                </text>
                <circle cx="190" cy="190" r="5" fill="rgb(59, 130, 246)" />
              </g>

              {/* Arrow 1 */}
              <path
                d="M 230 190 L 280 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
              />

              {/* Filter Node */}
              <g>
                <rect x="280" y="150" width="140" height="80" fill="rgba(168, 85, 247, 0.2)" stroke="rgb(168, 85, 247)" strokeWidth="2" rx="8" />
                <text x="350" y="180" textAnchor="middle" fill="rgb(216, 180, 254)" fontSize="14" fontWeight="bold">
                  Filter
                </text>
                <text x="350" y="200" textAnchor="middle" fill="rgb(221, 214, 254)" fontSize="12">
                  Has Attachment
                </text>
                <circle cx="420" cy="190" r="5" fill="rgb(168, 85, 247)" />
              </g>

              {/* Arrow 2 */}
              <path
                d="M 460 190 L 510 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
              />

              {/* Action Node 1 */}
              <g>
                <rect x="510" y="150" width="140" height="80" fill="rgba(34, 197, 94, 0.2)" stroke="rgb(34, 197, 94)" strokeWidth="2" rx="8" />
                <text x="580" y="180" textAnchor="middle" fill="rgb(134, 239, 172)" fontSize="14" fontWeight="bold">
                  Action
                </text>
                <text x="580" y="200" textAnchor="middle" fill="rgb(187, 247, 208)" fontSize="12">
                  Save to Drive
                </text>
                <circle cx="650" cy="190" r="5" fill="rgb(34, 197, 94)" />
              </g>

              {/* Arrow 3 */}
              <path
                d="M 690 190 L 740 190"
                stroke="url(#flowGradient)"
                strokeWidth="2"
                markerEnd="url(#arrowEnd)"
              />

              {/* Action Node 2 */}
              <g>
                <rect x="740" y="150" width="140" height="80" fill="rgba(14, 165, 233, 0.2)" stroke="rgb(14, 165, 233)" strokeWidth="2" rx="8" />
                <text x="810" y="180" textAnchor="middle" fill="rgb(125, 211, 252)" fontSize="14" fontWeight="bold">
                  Action
                </text>
                <text x="810" y="200" textAnchor="middle" fill="rgb(186, 230, 253)" fontSize="12">
                  Send Slack
                </text>
                <circle cx="880" cy="190" r="5" fill="rgb(14, 165, 233)" />
              </g>

              {/* Connection info */}
              <text x="500" y="320" textAnchor="middle" fill="rgb(156, 163, 175)" fontSize="13">
                Trigger → Filter → Save File → Send Notification
              </text>

              {/* Status badges */}
              <g>
                <rect x="50" y="380" width="100" height="30" fill="rgba(34, 197, 94, 0.2)" stroke="rgb(34, 197, 94)" strokeWidth="1" rx="4" />
                <text x="100" y="400" textAnchor="middle" fill="rgb(134, 239, 172)" fontSize="12">
                  ✓ Active
                </text>
              </g>

              <g>
                <text x="200" y="400" fill="rgb(107, 114, 128)" fontSize="12">
                  Last run: 2 minutes ago
                </text>
              </g>

              <g>
                <text x="500" y="400" fill="rgb(107, 114, 128)" fontSize="12">
                  43 executions this week
                </text>
              </g>
            </svg>
          </div>

          {/* Footer */}
          <div className="bg-slate-900/50 border-t border-slate-700/50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Advanced conditions and multi-step workflows supported
            </div>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
              View Documentation →
            </button>
          </div>
        </div>

        {/* Feature List */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { title: "No Code Required", description: "Build automations without writing a single line of code" },
            { title: "Conditional Logic", description: "Add if/then conditions and branching logic for complex workflows" },
            { title: "Real-time Monitoring", description: "Watch your automations run and track every execution" },
          ].map((feature, i) => (
            <div key={i} className="flex gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-blue-600">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
