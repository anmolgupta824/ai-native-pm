'use client'

export default function Module4Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 4</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">$29</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">3–6 hrs</span>
          </div>

          <a href="/modules/0-claude-basics" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mb-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Start with Module 0
          </a>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Ship Your First Prototype This Weekend
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Zero coding experience required. Describe what you want in plain English, let AI write the code, and deploy to a real URL.
          </p>

          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <p className="text-sm text-amber-800">
              <span className="font-semibold">Preview</span> — Purchase to access full content, project templates, and source code.
            </p>
          </div>
        </div>
      </section>

      {/* Why PMs Should Vibe Code */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Why PMs Should Vibe Code</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { reason: 'Speak engineering\'s language', how: 'Understand why "a simple feature" takes 3 sprints' },
              { reason: 'Prototype faster', how: 'Test ideas with users before writing a PRD' },
              { reason: 'Build internal tools', how: 'Don\'t wait for eng to build your dashboard' },
              { reason: 'Career differentiation', how: '"PM who ships prototypes" stands out in any interview' },
              { reason: 'Build empathy', how: 'Experience the build process for better collaboration' },
            ].map((item) => (
              <div key={item.reason} className="border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-gray-900 text-sm">{item.reason}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.how}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">What You&apos;ll Build</h2>
          <div className="space-y-4">
            {[
              {
                title: 'User Feedback Dashboard',
                level: 'Beginner',
                time: '1–2 hrs',
                desc: 'A web app where users submit feedback and you view it in a dashboard with filtering and analytics. Your first full-stack app.',
                color: 'bg-green-100 text-green-700',
              },
              {
                title: 'A/B Test Calculator',
                level: 'Intermediate',
                time: '2–3 hrs',
                desc: 'A statistical significance calculator for A/B tests. Input control and variant metrics, get a clear yes/no with confidence intervals.',
                color: 'bg-amber-100 text-amber-700',
              },
              {
                title: 'Feature Flag Dashboard',
                level: 'Advanced',
                time: '3–4 hrs',
                desc: 'An internal tool to manage feature flag rollouts. Create flags, set rollout percentages, target user segments. Your own LaunchDarkly-lite.',
                color: 'bg-red-100 text-red-700',
              },
            ].map((project) => (
              <div key={project.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-bold text-gray-900">{project.title}</h3>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${project.color}`}>{project.level}</span>
                  <span className="text-xs text-gray-400">{project.time}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">Each project produces a <span className="font-semibold">real, working app</span> deployed to a URL you can share with your team.</p>
          </div>
        </div>
      </section>

      {/* The PM Advantage */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">The PM Advantage</h2>
          <p className="text-gray-600 mb-6">PMs are actually better at vibe coding than most engineers learning a new framework. Why? Because vibe coding is about describing requirements clearly — and that&apos;s literally your job.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { skill: 'Clear Requirements', how: 'You write user stories and acceptance criteria every day' },
              { skill: 'User Empathy', how: 'You know what the end user needs' },
              { skill: 'Prioritization', how: 'You know what to build first and what to skip' },
              { skill: 'Feedback Loops', how: 'You\'re used to iterating based on user input' },
            ].map((item) => (
              <div key={item.skill} className="bg-brand-50 border border-brand-100 rounded-xl p-5">
                <h3 className="font-semibold text-brand-700 text-sm">{item.skill}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.how}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
          <div className="space-y-3">
            {[
              '3 progressive project templates with full conversation flows',
              'Vibe coding copilot MCP agent — guides you through each build',
              'Coding 101 for PMs primer — 5 concepts, not a CS degree',
              'Prompting cheat sheet — copy-paste prompts for common tasks',
              'Full EXPLAINER with techniques, best practices, troubleshooting',
              'Deploy guides — ship to a real URL on Vercel (free tier)',
              'Private GitHub repo access — clone and customize',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100">
                <svg className="w-5 h-5 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-brand-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Get Module 4</h2>
            <p className="text-4xl font-extrabold mb-4">$29</p>
            <p className="text-brand-200 text-sm mb-6">Includes all 3 project templates, MCP copilot agent, and private repo access.<br />Zero coding experience required.</p>
            <a
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
            >
              Get Module 4 — $29
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <a href="/modules/3-mcp-automation" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-white transition-colors group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div>
              <p className="text-xs text-gray-400">Previous</p>
              <p className="text-sm font-semibold text-gray-900">Module 3: MCP Automation</p>
            </div>
          </a>
          <a href="/modules" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-white transition-colors group text-right sm:ml-auto">
            <div>
              <p className="text-xs text-gray-400">All Modules</p>
              <p className="text-sm font-semibold text-gray-900">Back to Module List</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </a>
        </div>
      </section>
    </>
  )
}
