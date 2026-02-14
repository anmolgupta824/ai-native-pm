import ModuleCard from '@/components/ModuleCard'
import EmailCapture from '@/components/EmailCapture'

const modules = [
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
    href: '#signup',
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
    href: '#signup',
    timeline: 'Coming Week 3-4',
    promise: 'Plan your next launch in 1 hour, not 1 week',
  },
  {
    number: 3,
    title: 'MCP Google Workspace Automation',
    description:
      'Automate sprint planning, status reports, and meeting follow-ups. 3 production-ready automations that save 5+ hours per week.',
    price: '$39',
    tag: 'Flagship',
    features: [
      'Sprint planning assistant (2 hrs/week saved)',
      'Automated status reports (1 hr/week saved)',
      'Meeting follow-up bot (30 min/meeting saved)',
      'Step-by-step Google OAuth setup',
      'MCP installation wizard',
      'Error debugging assistant',
    ],
    href: '/pricing',
    highlighted: true,
    timeline: 'Coming Week 5-7',
    promise: 'Automate 5+ hours of weekly busy work. Pays for itself in Week 1.',
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
    href: '/pricing',
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
              real projects. Start free, upgrade when you&apos;re ready.
            </p>
          </div>

          <div className="space-y-16">
            {modules.map((mod) => (
              <div
                key={mod.number}
                className={`rounded-2xl border p-8 sm:p-10 ${
                  mod.highlighted
                    ? 'border-brand-200 bg-brand-50/30'
                    : 'border-gray-200'
                }`}
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
                          ? 'Download Free'
                          : `Get Module - ${mod.price}`}
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
