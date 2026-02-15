import ModuleCard from '@/components/ModuleCard'
import EmailCapture from '@/components/EmailCapture'

const modules = [
  {
    number: 0,
    title: 'Claude Code Basics',
    description:
      'New to Claude Code? Start here. Install Claude Code, learn the 5 terminal commands you need, and have your first AI conversation — all in 20 minutes.',
    price: 'Free',
    tag: 'Start Here',
    features: [
      'What Claude Code is (vs ChatGPT, vs Claude.ai)',
      'Install on Mac, Windows, or Linux',
      'Terminal basics — only 5 commands',
      'Your first AI conversation walkthrough',
      'Key concepts: @-mentions, tools, MCP servers',
      'Troubleshooting common setup issues',
    ],
    href: '/modules/0-claude-basics',
    timeline: 'Available now',
    promise: 'Get up and running with Claude Code in 20 minutes',
  },
  {
    number: 1,
    title: 'PRD Generator',
    description:
      'Generate production-ready PRDs in 30 minutes with an AI trainer agent that asks the right questions, validates completeness, and catches edge cases.',
    price: 'Free',
    tag: 'Lead Magnet',
    features: [
      'Interactive 10-question PRD wizard',
      '3 templates: feature launch, API integration, redesign',
      'Smart follow-ups based on PRD type',
      'Validates completeness before export',
      'Export to Markdown & Notion',
      'Example PRDs from SaaS, marketplace, and mobile',
    ],
    href: '/modules/1-prd-generator',
    timeline: 'Available now',
    promise: 'Generate your first production-ready PRD in 30 minutes',
  },
  {
    number: 2,
    title: 'Rollout Plan Generator',
    description:
      'Plan your next launch in 1 hour. Automated risk assessment, stakeholder mapping, dependency timelines, and rollback plans.',
    price: 'Free',
    tag: 'Trust Builder',
    features: [
      'Rollout plan wizard (feature, API, redesign, sunset)',
      'Automated risk assessment matrix',
      'Stakeholder conflict detection',
      'Timeline with dependency mapping',
      'Rollback plan builder',
      'Communication plan templates',
    ],
    href: '/modules/2-rollout-planner',
    timeline: 'Coming Week 3-4',
    promise: 'Plan your next launch in 1 hour, not 1 week',
  },
  {
    number: 3,
    title: 'MCP Integrations Course',
    description:
      'Master MCP integrations in one weekend. Learn to connect Claude to Jira, Google Drive, Sheets, and any API — zero prior knowledge required.',
    price: 'Free',
    tag: 'Build Skills',
    features: [
      '8 interactive lessons — zero to MCP expert',
      'Teacher Mode with exercises and quizzes',
      'Build Jira, Google Drive, Sheets integrations',
      'Learn to build MCP servers for ANY API',
      'Production-ready Jira template included',
      'Real PM automation use cases',
    ],
    href: '/modules/3-mcp-automation',
    timeline: 'Available now',
    promise: 'Master MCP integrations in one weekend — zero prior knowledge required',
  },
  {
    number: 4,
    title: 'Vibe Code Real Projects',
    description:
      'Ship your first working prototype this weekend. Three progressive projects from beginner to advanced, zero coding experience required.',
    price: '$29',
    tag: 'Career Growth',
    features: [
      'Beginner: User Feedback Dashboard',
      'Intermediate: A/B Test Calculator',
      'Advanced: Feature Flag Dashboard',
      'Vibe coding copilot agent',
      'Deploy to production URL',
      'Coding 101 for PMs primer',
    ],
    href: '/modules/4-vibe-coding',
    timeline: 'Coming Week 8-9',
    promise: 'Ship your first working prototype this weekend',
  },
]

export default function ModulesPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Learning Modules
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each module gives you a working AI workflow you can use on your
              real projects. Start with Module 0, then work through the rest.
            </p>
          </div>

          <div className="space-y-16">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className="rounded-2xl border border-gray-200 p-8 sm:p-10"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Module {mod.number}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          mod.price === 'Free'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-brand-100 text-brand-700'
                        }`}
                      >
                        {mod.price}
                      </span>
                      <span className="text-xs text-gray-400">
                        {mod.timeline}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {mod.title}
                    </h2>
                    <p className="text-brand-600 font-medium text-sm mb-4">
                      {mod.promise}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <div className="lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-4">
                        What you get:
                      </h3>
                      <ul className="space-y-2.5">
                        {mod.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm text-gray-600 flex items-start gap-2"
                          >
                            <svg
                              className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <a
                        href={mod.href}
                        className={`mt-6 block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${
                          mod.price === 'Free'
                            ? 'bg-brand-600 text-white hover:bg-brand-700'
                            : 'border border-brand-600 text-brand-600 hover:bg-brand-50'
                        }`}
                      >
                        {mod.price === 'Free'
                          ? 'Start Learning'
                          : `Preview Module — ${mod.price}`}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  )
}
