'use client'

export default function Module3Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 3</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">$39</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">90 min setup</span>
          </div>

          <a href="/modules/0-claude-basics" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mb-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Start with Module 0
          </a>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Automate 5+ Hours of Weekly PM Busy Work
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            3 production-ready MCP automations that handle the repetitive work so you can do the strategic work.
          </p>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Preview</span> — Purchase to access full content, setup guides, and source code.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed">
            Every PM has a dirty secret: 30–40% of their week is repetitive operations work. Status reports, sprint planning prep, meeting follow-up emails. It&apos;s necessary, but it&apos;s not what you were hired for. This module teaches you to build MCP automations that connect Claude Code directly to your Google Workspace.
          </p>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">What You&apos;ll Build</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Sprint Planning Assistant',
                saved: '~2 hrs/week saved',
                desc: 'Reads your Jira/Linear board, analyzes team capacity, suggests sprint scope, and generates a sprint planning doc in Google Sheets. Replaces Monday morning spreadsheet work.',
              },
              {
                title: 'Status Report Generator',
                saved: '~1 hr/week saved',
                desc: 'Pulls data from Jira, Google Docs, and Slack, then generates a formatted status report in Google Docs. What used to take an hour of copy-pasting is now one sentence.',
              },
              {
                title: 'Meeting Follow-Up Bot',
                saved: '~30 min/meeting saved',
                desc: 'Takes meeting notes, extracts decisions and action items with owners, then drafts follow-up emails. No more "I\'ll send the recap later" that turns into "never."',
              },
            ].map((automation) => (
              <div key={automation.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{automation.title}</h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">{automation.saved}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{automation.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Math */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">The ROI Math</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { stat: '5+ hrs', label: 'Saved per week' },
              { stat: '$250', label: 'Per week at $50/hr' },
              { stat: '$39', label: 'Module cost' },
              { stat: '1.2 days', label: 'Payback period' },
            ].map((s) => (
              <div key={s.label} className="text-center bg-brand-50 rounded-xl p-5">
                <p className="text-2xl font-bold text-brand-700">{s.stat}</p>
                <p className="text-xs text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is MCP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What is MCP?</h2>
          <p className="text-gray-600 mb-6">MCP (Model Context Protocol) is how Claude Code talks to external tools. Think of it as a universal adapter between AI and your workspace.</p>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 text-center mb-6">
            Claude Code &harr; MCP Server &harr; Google Docs, Sheets, Calendar, Gmail
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <h3 className="text-sm font-semibold text-gray-700">Without MCP</h3>
              </div>
              <p className="text-sm text-gray-500">Open Jira, copy tickets, open Google Sheet, paste, format. Repeat for 5 tools every week.</p>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-sm font-semibold text-brand-700">With MCP</h3>
              </div>
              <p className="text-sm text-gray-600">&quot;Generate this week&apos;s sprint plan from our Jira board&quot; — done in one sentence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
          <div className="space-y-3">
            {[
              '3 production-ready MCP automations (TypeScript, fully documented)',
              'Step-by-step Google OAuth setup guide (15 min)',
              'MCP server with 5+ tools',
              'Full EXPLAINER with techniques, best practices, and troubleshooting',
              'QUICKSTART guide — working automations in 90 minutes',
              'Private GitHub repo access — clone and customize',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-brand-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Get Module 3</h2>
            <p className="text-4xl font-extrabold mb-4">$39</p>
            <p className="text-brand-200 text-sm mb-6">Includes source code, setup guides, and private repo access.<br />Pays for itself in the first week.</p>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
            >
              Get Module 3 — $39
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <a href="/modules/2-rollout-planner" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div>
              <p className="text-xs text-gray-400">Previous</p>
              <p className="text-sm font-semibold text-gray-900">Module 2: Rollout Planner</p>
            </div>
          </a>
          <a href="/modules/4-vibe-coding" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group text-right sm:ml-auto">
            <div>
              <p className="text-xs text-gray-400">Next</p>
              <p className="text-sm font-semibold text-gray-900">Module 4: Vibe Coding</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </>
  )
}
