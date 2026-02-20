'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

export default function Module4GetStarted() {
  const [mode, setMode] = useState<'teacher' | 'usage'>('teacher')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/2-image-gen" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 2
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 2</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">2 hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: AI Image Generation</h1>
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
              onClick={() => { setMode('teacher'); track('mode_select', { module: 'module-2', mode: 'teacher' }) }}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'teacher'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I&apos;m new to AI image generation</p>
              <p className={`text-xs mt-1 ${mode === 'teacher' ? 'text-brand-100' : 'text-gray-400'}`}>Learn with interactive lessons</p>
            </button>
            <button
              onClick={() => { setMode('usage'); track('mode_select', { module: 'module-2', mode: 'usage' }) }}
              className={`flex-1 py-4 px-4 text-center transition-colors ${
                mode === 'usage'
                  ? 'bg-brand-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <p className="text-sm font-bold">I already know prompt engineering</p>
              <p className={`text-xs mt-1 ${mode === 'usage' ? 'text-brand-100' : 'text-gray-400'}`}>Jump to production tools</p>
            </button>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Prerequisite: OpenAI API Key — shared */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-amber-800 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              Prerequisite: OpenAI API Key
            </h3>
            <p className="text-sm text-amber-800 mb-3">This module requires an OpenAI API key to generate images. You only pay for images you create (~$0.04 each).</p>
            <ol className="text-sm text-amber-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline font-semibold">platform.openai.com/api-keys</a></li>
              <li>Create a new API key</li>
              <li>Add $5 of credit (this covers 100+ images)</li>
              <li>Set it in your terminal: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">export OPENAI_API_KEY=&quot;sk-...&quot;</code></li>
            </ol>
          </div>

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
                    Download the AI Image Generation Course. Clone https://github.com/anmolgupta824/ai-native-pm.git
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
                    <li>Click the green <strong>&quot;Code&quot;</strong> button &rarr; <strong>&quot;Download ZIP&quot;</strong></li>
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
                  cd ai-native-pm/modules/module-2-image-gen &amp;&amp; claude
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-800"><span className="font-semibold">First-time note:</span> You&apos;ll see a prompt &quot;New MCP server found in .mcp.json: image-gen-teacher-mode&quot; — pick <strong>option 1</strong> (&quot;Use this and all future MCP servers in this project&quot;). This is a one-time security check.</p>
                </div>
              </div>

              {/* Step 3: Start Learning */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Your First Lesson</h2>
                  <span className="text-xs text-gray-400">10 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Once Claude Code is open, just say:</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  Start the course
                </div>
                <p className="text-sm text-gray-600 mt-4 mb-3">The Teacher Mode will:</p>
                <div className="space-y-2">
                  {[
                    'Introduce what DALL-E is and why PMs need image generation',
                    'Walk you through OpenAI API key setup',
                    'Teach prompt engineering with real-world examples',
                    'Give you hands-on exercises generating actual images',
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
                    { num: '1', title: 'Welcome & Setup', time: '10 min' },
                    { num: '2', title: 'Prompt Fundamentals', time: '20 min' },
                    { num: '3', title: 'Product Mockups & Wireframes', time: '20 min' },
                    { num: '4', title: 'Presentation & Pitch Visuals', time: '15 min' },
                    { num: '5', title: 'Social Media & Marketing Assets', time: '15 min' },
                    { num: '6', title: 'Advanced Techniques & Workflows', time: '20 min' },
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
                    'Start with Lesson 1 even if you have used DALL-E before — it sets up the PM-specific workflow.',
                    'Do the exercises! Generating actual images is where learning sticks.',
                    'Have a real product or feature in mind. The lessons work best with real examples.',
                    'Budget about $1-2 in OpenAI credits for the full course. Most exercises cost $0.04-0.08 each.',
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
                  <h2 className="text-lg font-bold text-gray-900">Download</h2>
                  <span className="text-xs text-gray-400">2 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Pick one of three options — they all do the same thing:</p>

                <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-brand-800 mb-2">Option A: Ask Claude to do it (Easiest)</h3>
                  <p className="text-sm text-brand-700 mb-3">Open Claude Code and paste:</p>
                  <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200">
                    Download the AI Image Generation tools. Clone https://github.com/anmolgupta824/ai-native-pm.git
                  </div>
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
                    <li>Click the green <strong>&quot;Code&quot;</strong> button &rarr; <strong>&quot;Download ZIP&quot;</strong></li>
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
                  cd ai-native-pm/modules/module-2-image-gen &amp;&amp; claude
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-800"><span className="font-semibold">First-time note:</span> You&apos;ll see a prompt &quot;New MCP server found in .mcp.json: image-gen-teacher-mode&quot; — pick <strong>option 1</strong> (&quot;Use this and all future MCP servers in this project&quot;). This is a one-time security check.</p>
                </div>
              </div>

              {/* Step 3: Start Using */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start Using It</h2>
                </div>
                <p className="text-sm text-gray-600 mb-3">Once Claude Code is open, type <code className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">Usage mode</code> and try these prompts:</p>
                <div className="space-y-3">
                  {[
                    'Generate a mockup of a notifications dashboard with a bell icon dropdown, unread indicators, and blue (#2563EB) color scheme.',
                    'Refine this prompt: "A dashboard for analytics." Make it specific enough for a good image.',
                    'Generate 3 variations of a social media graphic for a product launch announcement.',
                    'Create an asset pack of 4 social campaign images for our AI features launch. Use a dark navy and blue style.',
                  ].map((prompt) => (
                    <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">{prompt}</div>
                  ))}
                </div>
              </div>

              {/* Available Tools */}
              <div className="border-l-4 border-brand-500 pl-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Available Image Tools</h2>
                <div className="space-y-2">
                  {[
                    { tool: 'list_styles', desc: 'Browse 6 image style presets (product-mockup, presentation, social-media, etc.)' },
                    { tool: 'generate_image', desc: 'Generate an image via DALL-E with prompt, style, and size' },
                    { tool: 'refine_prompt', desc: 'Transform a rough idea into a detailed, structured image prompt' },
                    { tool: 'generate_variations', desc: 'Create 3 distinct visual directions (minimal, bold, corporate)' },
                    { tool: 'create_asset_pack', desc: 'Generate 4 coordinated images with consistent style' },
                    { tool: 'review_prompt', desc: 'Score your prompt 0-100 and flag issues before generating' },
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
                  Switch to the <button onClick={() => setMode('teacher')} className="underline font-semibold">Teacher Mode path</button> to take the full 6-lesson course. You&apos;ll learn prompt engineering, style presets, mockup techniques, and how to build a reusable prompt library.
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
                { problem: '"OPENAI_API_KEY not set"', fix: 'Set your API key: export OPENAI_API_KEY="sk-..." in your terminal. Get a key at platform.openai.com/api-keys.' },
                ...(mode === 'teacher' ? [
                  { problem: 'Claude doesn\'t seem to know the curriculum', fix: 'Make sure you opened Claude Code inside the modules/module-2-image-gen folder. The CLAUDE.md file must be in your working directory.' },
                  { problem: 'Lessons feel too fast', fix: 'Use the explain_concept tool to dive deeper into any topic. Ask Claude to explain in more detail.' },
                  { problem: 'Exercises cost too much', fix: 'Set generateImages: false to preview prompts without generating. Only generate the ones you want (~$0.04 each).' },
                ] : [
                  { problem: 'Images look wrong', fix: 'Use review_prompt to score your prompt before generating. Aim for 70+ out of 100. Add specific details, hex colors, and a style preset.' },
                  { problem: 'Asset pack looks inconsistent', fix: 'Make your styleGuide string more specific. Include hex colors, design style, and mood. Vague guides produce vague results.' },
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
                    { step: 'Lesson 1', time: '10 min' },
                    { step: 'Full Course', time: '2 hrs' },
                  ]
                : [
                    { step: 'Download', time: '2 min' },
                    { step: 'Open', time: '1 min' },
                    { step: 'First Image', time: '5 min' },
                    { step: 'Asset Pack', time: '10 min' },
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
            <a href="/modules/2-image-gen" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Read the full course overview</p>
              <p className="text-sm font-semibold text-gray-900">Module 2: AI Image Generation</p>
            </a>
            <a href="/modules" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Browse all modules</p>
              <p className="text-sm font-semibold text-gray-900">All Modules</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
