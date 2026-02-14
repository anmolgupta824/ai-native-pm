import Hero from '@/components/Hero'
import ModuleCard from '@/components/ModuleCard'
import EmailCapture from '@/components/EmailCapture'

const modules = [
  {
    number: 0,
    title: 'Claude Code Basics',
    description:
      'New to Claude Code? Start here. Install, learn the terminal basics, and have your first AI conversation in 20 minutes.',
    price: 'Free',
    tag: 'Start Here',
    features: [
      'What Claude Code is (and isn\'t)',
      'Install on Mac, Windows, or Linux',
      'Terminal basics — 5 commands only',
      'Your first AI conversation',
      'Key concepts: @-mentions, tools, MCP',
    ],
    href: '/modules/0-claude-basics',
  },
  {
    number: 1,
    title: 'PRD Generator',
    description:
      'Generate production-ready PRDs in 30 minutes with an AI trainer agent that asks the right questions.',
    price: 'Free',
    tag: 'Lead Magnet',
    features: [
      'Interactive PRD questionnaire',
      '3 PRD templates (feature, API, redesign)',
      'Smart validation & edge-case detection',
      'Export to Markdown & Notion',
      'QUICKSTART: 0 to first PRD in 30 min',
    ],
    href: '/modules/1-prd-generator',
  },
  {
    number: 2,
    title: 'Rollout Plan Generator',
    description:
      'Plan your next launch in 1 hour, not 1 week. Automated risk assessment, stakeholder mapping, and timelines.',
    price: 'Free',
    tag: 'Trust Builder',
    features: [
      'Launch plan wizard',
      'Automated risk matrix',
      'Stakeholder mapper',
      'Timeline with dependencies',
      'Rollback plan templates',
    ],
    href: '/modules/2-rollout-planner',
  },
  {
    number: 3,
    title: 'MCP Google Workspace',
    description:
      'Automate 5+ hours of weekly busy work. Sprint planning, status reports, and meeting follow-ups on autopilot.',
    price: '$39',
    tag: 'Flagship',
    features: [
      '3 production-ready automations',
      'Sprint planning assistant',
      'Automated status reports',
      'Meeting follow-up bot',
      'Pays for itself in Week 1',
    ],
    href: '/modules/3-mcp-automation',
    highlighted: true,
  },
  {
    number: 4,
    title: 'Vibe Code Real Projects',
    description:
      'Ship your first working prototype this weekend. Zero coding experience required.',
    price: '$29',
    tag: 'Career Growth',
    features: [
      '3 progressive project templates',
      'User feedback dashboard',
      'A/B test calculator',
      'Feature flag dashboard',
      'Deploy to production URL',
    ],
    href: '/modules/4-vibe-coding',
  },
]

const testimonials = [
  {
    quote:
      'I generated a PRD in 20 minutes that would have taken me half a day. The edge-case suggestions alone were worth it.',
    name: 'Sarah K.',
    role: 'Senior PM at a B2B SaaS',
  },
  {
    quote:
      'Finally, a practical AI course for PMs. Not theory, not hype — actual tools I use every day.',
    name: 'Marcus T.',
    role: 'Product Lead, Series B Startup',
  },
  {
    quote:
      'The MCP automation module saved me 4 hours a week on status reports. My manager thinks I cloned myself.',
    name: 'Priya R.',
    role: 'PM at Enterprise Tech Co',
  },
]

export default function Home() {
  return (
    <>
      <Hero />

      {/* Module showcase */}
      <section className="section-padding">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Five Modules. Immediate Impact.
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Each module gives you a working AI workflow you can use on your
              real projects &mdash; starting today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <ModuleCard key={mod.number} {...mod} />
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            What PMs Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl border border-gray-200 p-6"
              >
                <svg
                  className="w-8 h-8 text-brand-200 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                </svg>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {t.quote}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            * Testimonials from early beta testers
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding">
        <div className="container-max text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
                1
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Start with Module 0
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Install Claude Code and learn the basics in 20 minutes. No
                technical experience required.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
                2
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Pick a Module
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Each module teaches a real PM workflow. Follow the lesson, then
                use the tools on your own projects.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mx-auto text-lg font-bold">
                3
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">
                Use on Real Projects
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                These aren&apos;t toy demos. Use the outputs in your actual PM
                work on Monday.
              </p>
            </div>
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  )
}
