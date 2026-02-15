'use client'

import { useState } from 'react'

export default function Module2GetStarted() {
  const [mode, setMode] = useState<'teacher' | 'usage'>('teacher')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/2-rollout-planner" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 2
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 2</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">2-3 hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: Rollout Plan Generator</h1>
          <p className="mt-4 text-lg text-gray-600">Choose your path based on your experience level.</p>

          <a href="/modules/0-claude-basics/get-started" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mt-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Install it first (5 min)
          </a>
        </div>
      </section>

      {/* Path Selector */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setMode('teacher')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'teacher'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I&apos;m new to rollout planning</p>
              <p className={`text-xs mt-1 ${mode === 'teacher' ? 'text-brand-100' : 'text-gray-400'}`}>Learn with interactive lessons</p>
            </button>
            <button
              onClick={() => setMode('usage')}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'usage'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I already know the basics</p>
              <p className={`text-xs mt-1 ${mode === 'usage' ? 'text-brand-100' : 'text-gray-400'}`}>Jump to production tools</p>
            </button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">

          {mode === 'teacher' ? (
            /* ===== TEACHER MODE STEPS ===== */
            <>
              {/* Step 1: Download */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                  <h2 className="text-lg font-bold text-gray-900">Download the Course</h2>
                  <span className="text-xs text-gray-400">2 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pick one of three options — they all do the same thing:</p>

                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-brand-800 mb-2">Option A: Ask Claude to do it (Easiest)</h3>
                  <p className="text-sm text-brand-700 mb-3">Open Claude Code in the folder where you want the course, and paste:</p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200">
                    Download the Rollout Planning Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-2-rollout/teacher-mode/mcp-server and run npm install &amp;&amp; npm run build.
                  </div>
                  <p className="text-xs text-brand-600 mt-2">Claude will clone, install, and build everything for you.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                    git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                    cd ai-native-pm/modules/module-2-rollout/teacher-mode/mcp-server<br />
                    npm install<br />
                    npm run build
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option C: Download ZIP (No terminal needed)</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://github.com/anmolgupta824/ai-native-pm" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">github.com/anmolgupta824/ai-native-pm</a></li>
                    <li>Click the green <strong>&quot;Code&quot;</strong> button → <strong>&quot;Download ZIP&quot;</strong></li>
                    <li>Unzip and navigate to <code className="bg-gray-200 px-1 rounded text-xs">modules/module-2-rollout/teacher-mode/mcp-server</code></li>
                    <li>Open Claude Code there and say: <em>&quot;Run npm install &amp;&amp; npm run build&quot;</em></li>
                  </ol>
                </div>
              </div>

              {/* Step 2: Connect */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                  <h2 className="text-lg font-bold text-gray-900">Connect to Claude Code</h2>
                  <span className="text-xs text-gray-400">1 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Open Claude Code in the module folder and paste this single prompt:</p>
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                  Add the Rollout Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command &quot;node&quot; and the full path to dist/index.js. Then restart to pick up the new server.
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800"><span className="font-semibold">One prompt, fully configured.</span> Claude will find the path, update your config, and restart.</p>
                </div>
              </div>

              {/* Step 3: Start Learning */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Your First Lesson</h2>
                  <span className="text-xs text-gray-400">15 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Open Claude Code and say:</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  I want to learn how to build better rollout plans. Start me on Lesson 1.
                </div>
                <p className="text-sm text-gray-600 mt-4 mb-3">The Teacher Mode will:</p>
                <div className="space-y-2">
                  {[
                    'Introduce why rollouts fail and how AI changes the equation',
                    'Teach the 5-tool framework with real-world examples',
                    'Give you hands-on exercises to practice',
                    'Quiz you to reinforce your understanding',
                    'Track your progress across all 6 lessons',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Overview */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">4</span>
                  <h2 className="text-lg font-bold text-gray-900">Continue Through the Course</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Work through all 6 lessons at your own pace:</p>
                <div className="space-y-2">
                  {[
                    { num: '1', title: 'Welcome to Rollout Planning', time: '15 min' },
                    { num: '2', title: 'Risk Assessment', time: '20 min' },
                    { num: '3', title: 'Stakeholder Mapping', time: '20 min' },
                    { num: '4', title: 'Timeline Generation', time: '20 min' },
                    { num: '5', title: 'Rollback Planning', time: '15 min' },
                    { num: '6', title: 'Putting It All Together', time: '20 min' },
                  ].map((lesson) => (
                    <div key={lesson.num} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold flex-shrink-0">{lesson.num}</span>
                      <p className="text-sm text-gray-700 flex-1">{lesson.title}</p>
                      <span className="text-xs text-gray-400">{lesson.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-amber-800 mb-3">Tips for Success</h3>
                <ul className="space-y-2">
                  {[
                    'Start with Lesson 1 even if you\'ve done rollout plans before — it sets up the AI-partnership approach.',
                    'Do the exercises! Building a risk matrix for your real product is more valuable than reading about one.',
                    'Have a real launch in mind. The lessons work best when applied to your actual upcoming feature.',
                    'Take breaks between lessons. Each one builds on the last, so spacing helps retention.',
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                      <svg className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" /></svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            /* ===== USAGE MODE STEPS ===== */
            <>
              {/* Step 1: Download */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                  <h2 className="text-lg font-bold text-gray-900">Download &amp; Build</h2>
                  <span className="text-xs text-gray-400">3 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pick one of three options — they all do the same thing:</p>

                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-brand-800 mb-2">Option A: Ask Claude to do it (Easiest)</h3>
                  <p className="text-sm text-brand-700 mb-3">Open Claude Code and paste:</p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200">
                    Download the Rollout Plan Generator tools. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-2-rollout/mcp-server and run npm install &amp;&amp; npm run build.
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                    git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                    cd ai-native-pm/modules/module-2-rollout/mcp-server<br />
                    npm install<br />
                    npm run build
                  </div>
                </div>
              </div>

              {/* Step 2: Connect */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                  <h2 className="text-lg font-bold text-gray-900">Connect to Claude Code</h2>
                  <span className="text-xs text-gray-400">1 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Open Claude Code in the module folder and paste this single prompt:</p>
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                  Add the Rollout Plan Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command &quot;node&quot; and the full path to dist/index.js. Then restart to pick up the new server.
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800"><span className="font-semibold">One prompt, fully configured.</span> Claude will update your config and restart.</p>
                </div>
              </div>

              {/* Step 3: Start Using */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Using It</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Try these prompts in Claude Code:</p>
                <div className="space-y-3">
                  {[
                    '@prd-notifications.md @architecture.md\nI need a rollout plan for the notifications feature. Assess the risks first.',
                    'Map the stakeholders for our payments redesign. Our org has separate backend and frontend teams, a shared QA team, and Sales is pushing for a Q2 deadline.',
                    'Generate a 6-week timeline for the search feature rollout. We have 4 engineers and the backend API blocks the frontend integration.',
                    'Build a rollback plan for our feature flag deployment of the new dashboard.',
                  ].map((prompt) => (
                    <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700 whitespace-pre-line">{prompt}</div>
                  ))}
                </div>
              </div>

              {/* Available Tools */}
              <div className="border-l-4 border-brand-500 pl-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available Rollout Tools</h2>
                <div className="space-y-2">
                  {[
                    { tool: 'create_rollout_plan', desc: 'Generate a complete rollout plan from PRD and context' },
                    { tool: 'assess_risks', desc: 'Structured risk matrix with likelihood, impact, and mitigations' },
                    { tool: 'map_stakeholders', desc: 'Stakeholder map with RACI and conflict detection' },
                    { tool: 'generate_timeline', desc: 'Dependency-aware timeline with milestones and buffers' },
                    { tool: 'build_rollback_plan', desc: 'Step-by-step rollback with trigger conditions' },
                  ].map((t) => (
                    <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                      <p className="text-sm text-gray-600">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Want to learn more */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-brand-800 mb-2">Want to learn the techniques behind the tools?</h3>
                <p className="text-sm text-brand-700">
                  Switch to the <button onClick={() => setMode('teacher')} className="underline font-semibold">Teacher Mode path</button> to take the full 6-lesson course. You&apos;ll learn risk assessment frameworks, stakeholder mapping, timeline generation, and more.
                </p>
              </div>
            </>
          )}

          {/* Troubleshooting — shared */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Troubleshooting</h2>
            <div className="space-y-3">
              {[
                { problem: '"MCP server not found"', fix: 'Make sure the path in your config points to the correct dist/index.js file. Run npm run build if dist/ is missing.' },
                { problem: '"Cannot find module"', fix: 'Run npm install in the server directory.' },
                { problem: '"command not found: claude"', fix: 'Claude Code isn\'t installed. Go to Module 0 to install it.' },
                ...(mode === 'teacher' ? [
                  { problem: '"command not found: git"', fix: 'Use Option C (Download ZIP) instead, or install Git from git-scm.com.' },
                  { problem: 'Lessons feel too fast', fix: 'Use the explain_concept tool to dive deeper into any topic. Ask Claude to explain in more detail.' },
                ] : [
                  { problem: 'Risk assessment feels too generic', fix: '@-mention your PRD, architecture docs, and past incident reports. Specify product type, scale, and user base.' },
                  { problem: 'Timeline seems unrealistic', fix: 'Tell Claude about your team size, sprint cadence, and competing priorities.' },
                ]),
              ].map((t) => (
                <div key={t.problem} className="border-l-4 border-amber-300 bg-white rounded-r-lg p-4 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{t.problem}</p>
                  <p className="text-sm text-gray-600 mt-1">{t.fix}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Time breakdown */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Time Breakdown</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(mode === 'teacher'
                ? [
                    { step: 'Download', time: '2 min' },
                    { step: 'Connect', time: '1 min' },
                    { step: 'Lesson 1', time: '15 min' },
                    { step: 'Full Course', time: '2-3 hrs' },
                  ]
                : [
                    { step: 'Download', time: '3 min' },
                    { step: 'Connect', time: '1 min' },
                    { step: 'First Plan', time: '30 min' },
                    { step: 'Full Plan', time: '1 hr' },
                  ]
              ).map((s) => (
                <div key={s.step} className="text-center">
                  <p className="text-xl font-bold text-brand-700">{s.time}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/modules/2-rollout-planner" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Read the full course overview</p>
              <p className="text-sm font-semibold text-gray-900">Module 2: Rollout Planner</p>
            </a>
            <a href="/modules/3-mcp-automation" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Next module</p>
              <p className="text-sm font-semibold text-gray-900">Module 3: MCP Automation</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
