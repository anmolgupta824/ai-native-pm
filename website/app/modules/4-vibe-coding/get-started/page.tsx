'use client'

export default function Module4GetStarted() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/4-vibe-coding" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 4
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 4</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">$29</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: Vibe Coding</h1>
          <p className="mt-4 text-lg text-gray-600">Purchase to access project templates, the copilot agent, and private repo.</p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How It Works</h2>
            <div className="space-y-4 text-left mb-8">
              {[
                { step: '1', text: 'Purchase Module 4 ($29)' },
                { step: '2', text: 'Get access to the private GitHub repo with all 3 project templates' },
                { step: '3', text: 'Start with the beginner project (User Feedback Dashboard, 1-2 hrs)' },
                { step: '4', text: 'Deploy your first working prototype to a real URL' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0">{s.step}</span>
                  <p className="text-sm text-gray-700">{s.text}</p>
                </div>
              ))}
            </div>
            <a href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Get Module 4 — $29
            </a>
            <p className="text-xs text-gray-400 mt-3">Includes all 3 project templates, MCP copilot, and private repo access.</p>
          </div>
        </div>
      </section>
    </>
  )
}
