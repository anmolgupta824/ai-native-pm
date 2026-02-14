'use client'

export default function Hero() {
  return (
    <section className="section-padding">
      <div className="container-max text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          Free &amp; open source — no signup required
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1]">
          Build AI-Powered PM Workflows{' '}
          <span className="gradient-text">in 30 Minutes</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Practical, hands-on modules that teach Product Managers to use Claude
          Code. Generate PRDs, automate workflows, and ship prototypes &mdash;
          no engineering degree required.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/modules/0-claude-basics"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Start Free Course
          </a>
          <a
            href="/modules"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
          >
            View All Modules
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div>
            <p className="text-3xl font-bold text-gray-900">30 min</p>
            <p className="text-sm text-gray-500 mt-1">
              Time to first PRD
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">5+ hrs</p>
            <p className="text-sm text-gray-500 mt-1">
              Saved per week with automations
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-gray-900">$0</p>
            <p className="text-sm text-gray-500 mt-1">
              To get started
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
