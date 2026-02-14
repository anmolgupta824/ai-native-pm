import PricingTable from '@/components/PricingTable'
import EmailCapture from '@/components/EmailCapture'

export default function PricingPage() {
  return (
    <>
      <section className="section-padding">
        <div className="container-max text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to automate your entire
            PM workflow.
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <PricingTable />
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-max max-w-3xl">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Do I need coding experience?',
                a: 'No! The free modules require zero coding knowledge. Module 4 (Vibe Coding) teaches you the basics from scratch. Module 3 has step-by-step setup guides.',
              },
              {
                q: 'What is Claude Code?',
                a: 'Claude Code is an AI coding assistant by Anthropic. It lets you build software, automate workflows, and create tools using natural language. Think of it as a super-powered co-pilot for your PM work.',
              },
              {
                q: 'How long does each module take?',
                a: 'You can be productive with any module in 30-60 minutes. The QUICKSTART guides are designed for busy PMs who need results fast.',
              },
              {
                q: 'Is there a refund policy?',
                a: "Yes. If you can't get a paid module working within 1 hour, we'll refund you in full. No questions asked.",
              },
              {
                q: 'Can I use these at my company?',
                a: 'Absolutely. The modules are designed for real PM work. Many users customize the templates for their team and share the outputs in sprint meetings, all-hands, and stakeholder reviews.',
              },
              {
                q: 'Will new modules be added?',
                a: 'Yes. Modules for User Research Analysis, Competitive Analysis, and PM Data Analysis are in development. Pro Bundle owners get access to all future updates.',
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-gray-200 p-5"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-gray-900 text-sm">
                    {faq.q}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <EmailCapture />
    </>
  )
}
