'use client'

import { track } from '@vercel/analytics'

export default function Module0BGetStarted() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/0b-claude-mastery" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 0B
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 0B</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">2-3 hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: Claude Code Mastery</h1>
          <p className="mt-4 text-lg text-gray-600">Three ways to download and begin the interactive lessons.</p>

          <a href="/modules/0-claude-basics/get-started" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mt-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Complete Module 0 first (20 min)
          </a>
        </div>
      </section>

      {/* ===== PREREQUISITES ===== */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h2 className="text-sm font-bold text-blue-900 mb-3">Before You Start</h2>
            <ul className="space-y-2">
              {[
                'Completed Module 0: Claude Code Basics (or have Claude Code installed)',
                'Claude Pro or Max subscription',
                '2-3 hours of uninterrupted time (or break it into 3x 1-hour sessions)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-blue-800">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== DOWNLOAD OPTIONS ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          {/* Step 1: Download */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="text-lg font-bold text-gray-900">Download the Course</h2>
              <span className="text-xs text-gray-400">2 min</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">Pick one of three options — they all work the same way:</p>

            {/* Option A: Ask Claude */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
              <h3 className="text-sm font-bold text-brand-800 mb-2">✨ Option A: Ask Claude to Do It (Easiest)</h3>
              <p className="text-sm text-brand-700 mb-3">Open Claude Code anywhere and paste:</p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200 overflow-x-auto">
                Clone module-0b-claude-mastery from https://github.com/anmolgupta824/ai-native-pm
              </div>
              <p className="text-xs text-brand-600 mt-2">Claude will fetch the course to your current folder.</p>
            </div>

            {/* Option B: Git Clone */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="text-sm font-bold text-gray-800 mb-2">📦 Option B: Git Clone (Terminal)</h3>
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 overflow-x-auto">
                git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                cd ai-native-pm/modules/module-0b-claude-mastery
              </div>
            </div>

            {/* Option C: Download ZIP */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-bold text-gray-800 mb-2">⬇️ Option C: Download ZIP (No Terminal)</h3>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Go to <a href="https://github.com/anmolgupta824/ai-native-pm" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline hover:text-brand-700">github.com/anmolgupta824/ai-native-pm</a></li>
                <li>Click the green <strong>&quot;Code&quot;</strong> button → <strong>&quot;Download ZIP&quot;</strong></li>
                <li>Unzip and navigate to: <span className="font-mono">modules/module-0b-claude-mastery</span></li>
              </ol>
            </div>
          </div>

          {/* Step 2: Open Claude Code */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="text-lg font-bold text-gray-900">Open Claude Code</h2>
              <span className="text-xs text-gray-400">1 min</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Open Claude Code in the course folder:</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 font-mono text-sm text-gray-700 overflow-x-auto">
              claude
            </div>
            <p className="text-xs text-gray-500 mt-2">Or use your IDE's &quot;Open in Claude Code&quot; extension.</p>
          </div>

          {/* Step 3: Start Learning */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
              <h2 className="text-lg font-bold text-gray-900">Start Lesson 1</h2>
              <span className="text-xs text-gray-400">15 min</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">Once Claude Code is open, type:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
              start
            </div>
            <p className="text-sm text-gray-600 mt-4">The interactive teacher will greet you and begin Lesson 1: CLAUDE.md — Your Project Brain</p>
          </div>

          {/* What to Expect */}
          <div className="border-l-4 border-brand-500 pl-6 bg-green-50 border border-green-200 rounded-lg p-5 ml-0">
            <h3 className="text-sm font-bold text-green-900 mb-3">What to Expect</h3>
            <ul className="space-y-2">
              {[
                '✅ Lessons delivered section-by-section (not all at once)',
                '✅ Interactive exercises you do RIGHT NOW',
                '✅ Real files and skills you&apos;ll actually use',
                '✅ Everything stays in ONE session (no tab-switching)',
                '✅ Progress is saved between sessions',
              ].map((item, i) => (
                <li key={i} className="text-sm text-green-800">{item}</li>
              ))}
            </ul>
          </div>

          {/* The 8 Lessons */}
          <div className="border-l-4 border-brand-500 pl-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">The 8 Lessons You&apos;ll Complete</h2>
            <div className="space-y-3">
              {[
                { num: 1, title: 'CLAUDE.md — Your Project Brain', time: '15 min', desc: 'Persistent memory templates' },
                { num: 2, title: 'Context Management', time: '15 min', desc: 'CRAFT framework + session planning' },
                { num: 3, title: 'Plan Mode — Think Before You Act', time: '15 min', desc: 'Plan-first workflow' },
                { num: 4, title: 'Sub-agents — Do 5 Things at Once', time: '15 min', desc: 'Parallel research & analysis' },
                { num: 5, title: 'Skills — Reusable Slash Commands', time: '20 min', desc: '/prd, /standup, /status, /retro' },
                { num: 6, title: 'Hooks — Automate the Boring Stuff', time: '20 min', desc: 'Auto-format, file protection, notifications' },
                { num: 7, title: 'Advanced Prompting Patterns', time: '20 min', desc: '8 patterns for better outputs' },
                { num: 8, title: 'Building Your PM Workspace', time: '30 min', desc: 'Capstone: wire everything together' },
              ].map((lesson) => (
                <div key={lesson.num} className="flex gap-4 pb-3 border-b border-gray-100 last:border-b-0">
                  <span className="font-bold text-brand-600 text-lg flex-shrink-0">{lesson.num}.</span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{lesson.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{lesson.desc} · {lesson.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">Total: ~2.5 hours spread over your preferred timeframe</p>
          </div>

          {/* FAQ */}
          <div className="border-l-4 border-brand-500 pl-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Do I need Module 0?',
                  a: 'Yes. Module 0B assumes you have Claude Code installed and understand the basics. If you don\'t, complete Module 0 first (20 min).',
                },
                {
                  q: 'Can I skip lessons?',
                  a: 'Not recommended — each builds on the previous. But Lessons 5+ are somewhat independent.',
                },
                {
                  q: 'How long does it take?',
                  a: '2-3 hours total. Most people spread it over 2-3 days (30 min sessions).',
                },
                {
                  q: 'Can I save progress?',
                  a: 'Yes! Progress is tracked in progress.json. Reopen anytime to pick up where you left off.',
                },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-gray-900">{item.q}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-brand-50 rounded-xl p-8 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready?</h3>
            <p className="text-gray-600 mb-6">Download the course above and type <span className="font-mono text-sm bg-white px-2 py-1 rounded border border-brand-200">start</span> to begin.</p>
            <a
              href="/modules/0b-claude-mastery"
              onClick={() => track('cta_click', { section: 'get_started', module: 'module-0b' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white text-sm font-bold rounded-xl hover:bg-brand-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Back to Module 0B
            </a>
          </div>

        </div>
      </section>

      {/* ===== SUPPORT ===== */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-gray-900">Need Help?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">Stuck on a lesson?</p>
              <p className="text-sm text-gray-600">Type <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">help</span> in Claude Code to get hints.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <p className="font-semibold text-gray-900 mb-2">Found a bug?</p>
              <p className="text-sm text-gray-600"><a href="https://github.com/anmolgupta824/ai-native-pm/issues" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">Report it on GitHub</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
