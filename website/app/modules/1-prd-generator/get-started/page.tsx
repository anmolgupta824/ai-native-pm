'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

export default function Module1GetStarted() {
  const [mode, setMode] = useState<'teacher' | 'usage'>('teacher')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/1-prd-generator" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 1
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 1</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">2-3 hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: PRD Generator</h1>
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
              onClick={() => { setMode('teacher'); track('mode_select', { module: 'module-1', mode: 'teacher' }) }}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'teacher'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I&apos;m new to PRDs with AI</p>
              <p className={`text-xs mt-1 ${mode === 'teacher' ? 'text-brand-100' : 'text-gray-400'}`}>Learn with interactive lessons</p>
            </button>
            <button
              onClick={() => { setMode('usage'); track('mode_select', { module: 'module-1', mode: 'usage' }) }}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'usage'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I already know the techniques</p>
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
                    Download the PRD Generator Course. Clone https://github.com/anmolgupta824/ai-native-pm.git
                  </div>
                  <p className="text-xs text-brand-600 mt-2">Claude will clone the repo for you.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                    git clone https://github.com/anmolgupta824/ai-native-pm.git
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option C: Download ZIP (No terminal needed)</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://github.com/anmolgupta824/ai-native-pm" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">github.com/anmolgupta824/ai-native-pm</a></li>
                    <li>Click the green <strong>&quot;Code&quot;</strong> button → <strong>&quot;Download ZIP&quot;</strong></li>
                    <li>Unzip the downloaded file</li>
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
                <p className="text-sm text-gray-600 mb-3">Open Claude Code in the module folder:</p>
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                  cd ai-native-pm/modules/module-1-prd &amp;&amp; claude
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-800"><span className="font-semibold">First-time note:</span> You&apos;ll see a prompt &quot;New MCP server found in .mcp.json: prd-generator&quot; — pick <strong>option 1</strong> (&quot;Use this and all future MCP servers in this project&quot;). This is a one-time security check.</p>
                </div>
              </div>

              {/* Step 3: Start Learning */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Your First Lesson</h2>
                  <span className="text-xs text-gray-400">15 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Once Claude Code is open, just say:</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  Start the course
                </div>
                <p className="text-sm text-gray-600 mt-4 mb-3">The Teaching Mode will:</p>
                <div className="space-y-2">
                  {[
                    'Ask about your product and feature to personalize the entire course',
                    'Walk you through a PRD template questionnaire',
                    'Generate your first PRD draft from your answers',
                    'Deepen it with Socratic questioning and alternatives',
                    'Validate, review from 9 stakeholder perspectives, and polish',
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
                <p className="text-sm text-gray-600 mb-4">Work through all 5 lessons at your own pace:</p>
                <div className="space-y-2">
                  {[
                    { num: '1', title: 'Setup & First Draft', time: '20 min' },
                    { num: '2', title: 'Deepen with Questions', time: '15 min' },
                    { num: '3', title: 'Validate & Improve', time: '15 min' },
                    { num: '4', title: 'Stakeholder Review', time: '15 min' },
                    { num: '5', title: 'Polish & Export', time: '10 min' },
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
                    'Start with Lesson 1 even if you think you know PRDs — it sets up the AI-partnership mindset.',
                    'Do the exercises! Reading is good, but hands-on practice is where learning sticks.',
                    'Have a real feature in mind. The lessons work best when applied to your actual product.',
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
                    Download the PRD Generator tools. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-1-prd/mcp-server and run npm install &amp;&amp; npx tsc.
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                    git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                    cd ai-native-pm/modules/module-1-prd/mcp-server<br />
                    npm install<br />
                    npx tsc
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
                  Add the PRD Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my project-level Claude Code MCP config (.mcp.json) with the command &quot;node&quot; and the full path to dist/index.js. Do not restart.
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800"><span className="font-semibold">One prompt, fully configured.</span> Claude will find the path and update your .mcp.json config. The server will be picked up automatically on your next Claude Code session — no restart needed.</p>
                </div>
              </div>

              {/* Step 3: Start Using */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Using It</h2>
                </div>
                <p className="text-sm text-gray-600 mb-3">Open Claude Code in the <code className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">module-1-prd</code> directory and type:</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mb-4">
                  Usage mode
                </div>
                <p className="text-sm text-gray-600 mb-4">You&apos;ll see all available tools and can start right away.</p>
              </div>

              {/* Available Tools */}
              <div className="border-l-4 border-brand-500 pl-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available PRD Tools</h2>
                <div className="space-y-2">
                  {[
                    { tool: 'list_templates', desc: 'Browse 4 PRD templates (Feature Launch, API Integration, Redesign, PRFAQ)' },
                    { tool: 'get_questions', desc: 'Get the 10-question questionnaire for any template' },
                    { tool: 'generate_prd', desc: 'Generate a full PRD from a template + your answers' },
                    { tool: 'generate_prd_custom', desc: 'Generate a PRD with your own custom section headings' },
                    { tool: 'validate_prd', desc: 'Score any PRD for completeness (A-D grade)' },
                    { tool: 'validate_prd_file', desc: 'Score a PRD from a file path' },
                    { tool: 'suggest_edge_cases', desc: 'Surface edge cases for your feature type' },
                    { tool: 'review_prd', desc: 'Stakeholder feedback from 9 perspectives (backend_eng, frontend_eng, designer, qa, finance, legal, compliance, pm, marketing)' },
                  ].map((t) => (
                    <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                      <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                      <p className="text-sm text-gray-600">{t.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800"><span className="font-semibold">Already have a PRD?</span> Drag &amp; drop it into Claude Code, or point to a file in <code className="text-xs bg-green-100 px-1.5 py-0.5 rounded">output/</code>. You can validate it, review it from stakeholder perspectives, or suggest edge cases.</p>
                </div>
              </div>

              {/* Example Prompts */}
              <div className="border-l-4 border-brand-500 pl-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Example Prompts</h2>
                <div className="space-y-3">
                  {[
                    'Generate a PRD for a feature that lets users export dashboards as PDF.\nUse the feature-launch template.',
                    '@references/product-strategy.md @references/user-research.md\nI need to write a PRD for a new notifications center. Ask me questions first.',
                    'Validate this PRD and tell me what\'s missing.',
                    'Review this PRD from a backend_eng and designer perspective.',
                    'I want to use my company\'s custom PRD format. Here are my sections: [list them]',
                  ].map((prompt) => (
                    <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700 whitespace-pre-line">{prompt}</div>
                  ))}
                </div>
              </div>

              {/* Want to learn more */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-brand-800 mb-2">Want to learn the techniques behind the tools?</h3>
                <p className="text-sm text-brand-700">
                  Switch to the <button onClick={() => setMode('teacher')} className="underline font-semibold">Teacher Mode path</button> to take the full 5-lesson course. You&apos;ll learn Socratic questioning, context loading, multi-perspective review, and more.
                </p>
              </div>
            </>
          )}

          {/* Troubleshooting — shared */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Troubleshooting</h2>
            <div className="space-y-3">
              {[
                { problem: '"command not found: claude"', fix: 'Claude Code isn\'t installed. Go to Module 0 to install it.' },
                ...(mode === 'teacher' ? [
                  { problem: '"command not found: git"', fix: 'Use Option C (Download ZIP) instead, or install Git from git-scm.com.' },
                  { problem: 'Claude doesn\'t seem to know the curriculum', fix: 'Make sure you opened Claude Code inside the modules/module-1-prd folder. The CLAUDE.md file must be in your working directory.' },
                  { problem: 'Lessons feel too fast', fix: 'Ask Claude to explain any topic in more detail or give you additional exercises.' },
                ] : [
                  { problem: '"MCP server not found"', fix: 'Make sure the path in your config points to the correct dist/index.js file. Run npm run build if dist/ is missing.' },
                  { problem: '"Cannot find module"', fix: 'Run npm install in the server directory.' },
                  { problem: 'PRD feels incomplete', fix: 'Use the validate_prd tool to get a completeness score. Most first PRDs score 60-70% — iterate based on the feedback.' },
                  { problem: 'PRD feels generic', fix: '@-mention 3-5 relevant docs before starting. Include user research, product strategy, and technical constraints.' },
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
                    { step: 'Open', time: '1 min' },
                    { step: 'Lesson 1', time: '20 min' },
                    { step: 'Full Course', time: '~75 min' },
                  ]
                : [
                    { step: 'Download', time: '3 min' },
                    { step: 'Connect', time: '1 min' },
                    { step: 'First PRD', time: '20 min' },
                    { step: 'Review', time: '5 min' },
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
            <a href="/modules/1-prd-generator" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Read the full course overview</p>
              <p className="text-sm font-semibold text-gray-900">Module 1: PRD Generator</p>
            </a>
            <a href="/modules/2-image-gen" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Next module</p>
              <p className="text-sm font-semibold text-gray-900">Module 2: AI Image Generation</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
