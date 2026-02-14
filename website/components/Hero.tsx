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
            href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-1-prd"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Get Started Free
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
