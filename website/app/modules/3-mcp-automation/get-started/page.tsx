'use client'

import { useState } from 'react'

type Product = 'jira' | 'gdrive' | 'gsheets' | 'figma'

const products: { id: Product; label: string; ready: boolean }[] = [
  { id: 'jira', label: 'Jira', ready: true },
  { id: 'gdrive', label: 'Google Drive', ready: true },
  { id: 'gsheets', label: 'Google Sheets', ready: false },
  { id: 'figma', label: 'Figma', ready: false },
]

export default function Module3GetStarted() {
  const [mode, setMode] = useState<'teacher' | 'usage'>('teacher')
  const [product, setProduct] = useState<Product>('jira')

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/3-mcp-automation" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 3
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 3</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">4-5 hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: MCP Integrations</h1>
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
              <p className="text-sm font-bold">I&apos;m new to MCP</p>
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
              <p className="text-sm font-bold">I already know MCP</p>
              <p className={`text-xs mt-1 ${mode === 'usage' ? 'text-brand-100' : 'text-gray-400'}`}>Jump to ready-made templates</p>
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
                    Download the MCP Integrations Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/teacher-mode/mcp-server and run npm install &amp;&amp; npm run build.
                  </div>
                  <p className="text-xs text-brand-600 mt-2">Claude will clone, install, and build everything for you.</p>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                  <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                    git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                    cd ai-native-pm/modules/module-3-mcp-course/teacher-mode/mcp-server<br />
                    npm install<br />
                    npm run build
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">Option C: Download ZIP (No terminal needed)</h3>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Go to <a href="https://github.com/anmolgupta824/ai-native-pm" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">github.com/anmolgupta824/ai-native-pm</a></li>
                    <li>Click the green <strong>&quot;Code&quot;</strong> button → <strong>&quot;Download ZIP&quot;</strong></li>
                    <li>Unzip and place the folder wherever you want</li>
                    <li>Open Claude Code in the <code className="bg-gray-200 px-1 rounded text-xs">teacher-mode/mcp-server</code> folder and say: <em>&quot;Run npm install &amp;&amp; npm run build&quot;</em></li>
                  </ol>
                </div>
              </div>

              {/* Step 2: Connect */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                  <h2 className="text-lg font-bold text-gray-900">Open Claude Code in the Course Folder</h2>
                  <span className="text-xs text-gray-400">30 sec</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Open Claude Code in the course folder:</p>
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                  cd ai-native-pm/modules/module-3-mcp-course &amp;&amp; claude
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-green-800"><span className="font-semibold">No extra setup needed.</span> The CLAUDE.md file in this folder automatically configures Claude as your interactive teacher.</p>
                </div>
              </div>

              {/* Step 3: Start Learning */}
              <div className="border-l-4 border-brand-500 pl-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                  <h2 className="text-lg font-bold text-gray-900">Start the Course</h2>
                  <span className="text-xs text-gray-400">10 min</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">Say one of these to get started:</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  Start the course
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-3">or</p>
                <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                  I want to learn MCP from scratch
                </div>
                <p className="text-sm text-gray-600 mt-4 mb-3">The Teacher Mode will:</p>
                <div className="space-y-2">
                  {[
                    'Introduce what MCP is and why it matters for PMs',
                    'Explain core concepts with real-world analogies',
                    'Give you hands-on exercises to practice',
                    'Quiz you to reinforce your understanding',
                    'Track your progress across all 7 lessons',
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
                <p className="text-sm text-gray-600 mb-4">Work through all 7 lessons at your own pace:</p>
                <div className="space-y-2">
                  {[
                    { num: '1', title: 'Welcome to MCP', time: '10 min' },
                    { num: '2', title: 'REST APIs for PMs', time: '30-60 min' },
                    { num: '3', title: 'How MCP Works', time: '30 min' },
                    { num: '4', title: 'Google Drive', time: '20 min' },
                    { num: '5', title: 'Google Sheets', time: '20 min' },
                    { num: '6', title: 'Jira Integration', time: '20 min' },
                    { num: '7', title: 'Figma Integration', time: '20 min' },
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
                    'Start with Lesson 1 even if you think you know the basics — it sets up important context.',
                    'Do the exercises! Reading is good, but hands-on practice is where learning sticks.',
                    'You don\'t need all API keys upfront. Lessons 1-3 require no external APIs.',
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
              {/* Product Tab Row */}
              <div className="mb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-3">Choose a Product</h2>
                <div className="flex flex-wrap gap-2">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setProduct(p.id)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                        product === p.id
                          ? 'bg-brand-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {p.label}
                      {!p.ready && (
                        <span className={`ml-1 text-xs ${product === p.id ? 'text-brand-200' : 'text-gray-400'}`}>
                          (Soon)
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ===== JIRA TAB ===== */}
              {product === 'jira' && (
                <>
                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                      <h2 className="text-lg font-bold text-gray-900">Download &amp; Build the Jira Template</h2>
                      <span className="text-xs text-gray-400">3 min</span>
                    </div>
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
                      <h3 className="text-sm font-bold text-brand-800 mb-2">Option A: Ask Claude (Easiest)</h3>
                      <p className="text-sm text-brand-700 mb-3">Open Claude Code and paste:</p>
                      <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200">
                        Download the Jira MCP template. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/usage-mode/templates/jira-mcp and run npm install &amp;&amp; npm run build.
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                      <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                        git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                        cd ai-native-pm/modules/module-3-mcp-course/usage-mode/templates/jira-mcp<br />
                        npm install<br />
                        npm run build
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                      <h2 className="text-lg font-bold text-gray-900">Set Your Jira Credentials</h2>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3"><strong>Mac/Linux:</strong> Add these to your shell profile (<code className="bg-gray-200 px-1 rounded text-xs">~/.zshrc</code> or <code className="bg-gray-200 px-1 rounded text-xs">~/.bashrc</code>):</p>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                      export JIRA_BASE_URL=&quot;https://yourcompany.atlassian.net&quot;<br />
                      export JIRA_EMAIL=&quot;you@company.com&quot;<br />
                      export JIRA_API_TOKEN=&quot;your-api-token-here&quot;
                    </div>
                    <p className="text-sm text-gray-600 mt-3">Then reload: <code className="bg-gray-200 px-1 rounded text-xs">source ~/.zshrc</code></p>
                    <p className="text-sm text-gray-600 mt-3"><strong>Windows (PowerShell):</strong> Run these commands instead:</p>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                      $env:JIRA_BASE_URL=&quot;https://yourcompany.atlassian.net&quot;<br />
                      $env:JIRA_EMAIL=&quot;you@company.com&quot;<br />
                      $env:JIRA_API_TOKEN=&quot;your-api-token-here&quot;
                    </div>
                    <p className="text-sm text-gray-600 mt-1">To make them permanent, use <strong>Settings → System → About → Advanced system settings → Environment Variables</strong>.</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Need a Jira API token?</span> Go to{' '}
                        <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer" className="underline">id.atlassian.com/manage-profile/security/api-tokens</a>{' '}
                        and click &quot;Create API token&quot;.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                      <h2 className="text-lg font-bold text-gray-900">Connect to Claude Code</h2>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                    <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                      Add the Jira MCP server. The server file is at ./dist/index.js in the current directory. Add it to my project-level Claude Code MCP config (.mcp.json) with the command &quot;node&quot; and the full path to dist/index.js. Do not restart.
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-green-800"><span className="font-semibold">One prompt, fully configured.</span> Claude will find the path and update your .mcp.json config. The server will be picked up automatically on your next Claude Code session — no restart needed.</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">4</span>
                      <h2 className="text-lg font-bold text-gray-900">Start Using It</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Try these prompts in Claude Code:</p>
                    <div className="space-y-3">
                      {['List all my Jira projects', 'Show me the details of PROJ-123', 'Create a Bug in the MOBILE project: Login button unresponsive on iOS 17', 'Find all open stories assigned to me', 'Move PROJ-456 to In Progress'].map((prompt) => (
                        <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">{prompt}</div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Available Jira Tools</h2>
                    <div className="space-y-2">
                      {[
                        { tool: 'jira_list_projects', desc: 'List all accessible Jira projects' },
                        { tool: 'jira_get_issue', desc: 'Get full details of a specific issue' },
                        { tool: 'jira_create_issue', desc: 'Create Bug, Story, Task, or Epic issues' },
                        { tool: 'jira_search_issues', desc: 'Search issues using JQL queries' },
                        { tool: 'jira_update_issue', desc: 'Update summary, description, or transition status' },
                      ].map((t) => (
                        <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                          <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                          <p className="text-sm text-gray-600">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ===== GOOGLE DRIVE TAB ===== */}
              {product === 'gdrive' && (
                <>
                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                      <h2 className="text-lg font-bold text-gray-900">Download &amp; Build the Google Drive Template</h2>
                      <span className="text-xs text-gray-400">3 min</span>
                    </div>
                    <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-4">
                      <h3 className="text-sm font-bold text-brand-800 mb-2">Option A: Ask Claude (Easiest)</h3>
                      <p className="text-sm text-brand-700 mb-3">Open Claude Code and paste:</p>
                      <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700 border border-brand-200">
                        Download the Google Drive MCP template. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/usage-mode/templates/google-drive-mcp and run npm install &amp;&amp; npm run build.
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                      <h3 className="text-sm font-bold text-gray-800 mb-2">Option B: Git clone (Terminal)</h3>
                      <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                        git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                        cd ai-native-pm/modules/module-3-mcp-course/usage-mode/templates/google-drive-mcp<br />
                        npm install<br />
                        npm run build
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                      <h2 className="text-lg font-bold text-gray-900">Set Up Google Cloud Credentials</h2>
                      <span className="text-xs text-gray-400">10 min</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">You need a Google Cloud project with the Drive API enabled and OAuth credentials.</p>
                    <ol className="text-sm text-gray-600 space-y-3 list-decimal list-inside">
                      <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">console.cloud.google.com</a></li>
                      <li>Create a new project named <strong>&quot;Claude MCP Server&quot;</strong></li>
                      <li>Go to <strong>APIs &amp; Services → Library</strong>, search for <strong>&quot;Google Drive API&quot;</strong>, and click <strong>Enable</strong></li>
                      <li>Go to <strong>APIs &amp; Services → OAuth consent screen</strong>, select <strong>External</strong>, fill in app name and your email</li>
                      <li>On the Scopes page, add: <code className="bg-gray-200 px-1 rounded text-xs">drive.file</code> and <code className="bg-gray-200 px-1 rounded text-xs">drive.readonly</code></li>
                      <li>Add yourself as a <strong>Test user</strong></li>
                      <li>Go to <strong>Credentials → Create Credentials → OAuth client ID</strong>, select <strong>Desktop app</strong></li>
                      <li>Download the credentials JSON and save it to your home folder as <code className="bg-gray-200 px-1 rounded text-xs">.google-drive-credentials.json</code> (Mac/Linux: <code className="bg-gray-200 px-1 rounded text-xs">~/.google-drive-credentials.json</code> | Windows: <code className="bg-gray-200 px-1 rounded text-xs">C:\Users\YourName\.google-drive-credentials.json</code>)</li>
                    </ol>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                      <h2 className="text-lg font-bold text-gray-900">Authorize with Google</h2>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Run the authorization script from the template directory:</p>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
                      node dist/auth.js
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">This opens a browser window</span> where you&apos;ll sign in with your Google account and grant access. The token will be saved locally for future sessions.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">4</span>
                      <h2 className="text-lg font-bold text-gray-900">Connect to Claude Code</h2>
                      <span className="text-xs text-gray-400">1 min</span>
                    </div>
                    <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 font-mono text-sm text-brand-800">
                      Add the Google Drive MCP server. The server file is at ./dist/index.js in the current directory. Add it to my project-level Claude Code MCP config (.mcp.json) with the command &quot;node&quot; and the full path to dist/index.js. Do not restart.
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-green-800"><span className="font-semibold">One prompt, fully configured.</span> Claude will find the path and update your .mcp.json config. The server will be picked up automatically on your next Claude Code session — no restart needed.</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">5</span>
                      <h2 className="text-lg font-bold text-gray-900">Start Using It</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Try these prompts in Claude Code:</p>
                    <div className="space-y-3">
                      {['List my recent Google Drive files', 'Create a Google Doc called "Weekly Status Report" summarizing sprint progress', 'Read the contents of my Product Roadmap Q1 document', 'Pull sprint data from Jira and save a status report as a Google Doc'].map((prompt) => (
                        <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">{prompt}</div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Available Google Drive Tools</h2>
                    <div className="space-y-2">
                      {[
                        { tool: 'list_files', desc: 'List files in Google Drive, filter by name, type, or folder' },
                        { tool: 'create_doc', desc: 'Create a new Google Doc with title and content' },
                        { tool: 'read_file', desc: 'Read contents of a Google Doc or text-based file' },
                        { tool: 'share_file', desc: 'Share a Drive file with specified email and role' },
                      ].map((t) => (
                        <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                          <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                          <p className="text-sm text-gray-600">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ===== GOOGLE SHEETS TAB ===== */}
              {product === 'gsheets' && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-amber-800 mb-2">Template Coming Soon</h3>
                    <p className="text-sm text-amber-700">
                      The production-ready Google Sheets template is under active development. In the meantime, you can set up your credentials now, or{' '}
                      <button onClick={() => setMode('teacher')} className="underline font-semibold">switch to Teacher Mode, Lesson 5</button>{' '}
                      to learn how to build it yourself.
                    </p>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                      <h2 className="text-lg font-bold text-gray-900">Set Up Google Sheets API</h2>
                      <span className="text-xs text-gray-400">5-10 min</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Already set up Google Drive?</span> Reuse the same Google Cloud project — just enable the Sheets API and add the spreadsheets scope.
                      </p>
                    </div>
                    <ol className="text-sm text-gray-600 space-y-3 list-decimal list-inside">
                      <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">console.cloud.google.com</a> and select your project</li>
                      <li>Go to <strong>APIs &amp; Services → Library</strong>, search for <strong>&quot;Google Sheets API&quot;</strong>, and click <strong>Enable</strong></li>
                      <li>Go to <strong>OAuth consent screen → Edit App → Scopes</strong></li>
                      <li>Add scope: <code className="bg-gray-200 px-1 rounded text-xs">spreadsheets</code> (read and write sheets)</li>
                      <li>If starting from scratch, follow the Google Drive setup steps first to create the project and OAuth credentials</li>
                    </ol>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mt-4">
                      export GOOGLE_CLIENT_ID=&quot;your-client-id-here&quot;<br />
                      export GOOGLE_CLIENT_SECRET=&quot;your-client-secret-here&quot;
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                      <h2 className="text-lg font-bold text-gray-900">Available Tools (When Template Launches)</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { tool: 'list_sheets', desc: 'List all sheets (tabs) in a spreadsheet with properties' },
                        { tool: 'read_range', desc: 'Read data from a range using A1 notation (e.g., Sheet1!A1:D10)' },
                        { tool: 'write_range', desc: 'Write data to a range as a 2D array of rows' },
                        { tool: 'create_sheet', desc: 'Create a new spreadsheet with optional tabs and initial data' },
                      ].map((t) => (
                        <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                          <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                          <p className="text-sm text-gray-600">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                      <h2 className="text-lg font-bold text-gray-900">Example Prompts</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Once the template is available, you&apos;ll be able to say:</p>
                    <div className="space-y-3">
                      {[
                        'List all tabs in my spreadsheet [paste URL or ID]',
                        'Read the team capacity data from cells A1 to F20',
                        'Create a new Sprint Velocity Tracker spreadsheet with Velocity and Capacity tabs',
                        'Take completed issues from Jira and append a summary row to my tracking sheet',
                      ].map((prompt) => (
                        <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">{prompt}</div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ===== FIGMA TAB ===== */}
              {product === 'figma' && (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <h3 className="text-sm font-bold text-amber-800 mb-2">Template Coming Soon</h3>
                    <p className="text-sm text-amber-700">
                      The production-ready Figma template is under active development. In the meantime, you can set up your API token now, or{' '}
                      <button onClick={() => setMode('teacher')} className="underline font-semibold">switch to Teacher Mode, Lesson 7</button>{' '}
                      to learn how to build it yourself.
                    </p>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
                      <h2 className="text-lg font-bold text-gray-900">Get Your Figma API Token</h2>
                      <span className="text-xs text-gray-400">3 min</span>
                    </div>
                    <ol className="text-sm text-gray-600 space-y-3 list-decimal list-inside">
                      <li>Open Figma in your browser</li>
                      <li>Click your profile icon → <strong>Settings</strong></li>
                      <li>Scroll to <strong>Personal access tokens</strong></li>
                      <li>Click <strong>&quot;Generate new token&quot;</strong></li>
                      <li>Description: <strong>&quot;Claude MCP Server&quot;</strong>, expiration: 90 days</li>
                      <li>Click <strong>&quot;Generate token&quot;</strong> and <strong>copy it immediately</strong> — Figma only shows it once</li>
                    </ol>
                    <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mt-4">
                      export FIGMA_API_TOKEN=&quot;your-figma-token-here&quot;
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-800">
                        <span className="font-semibold">Figma file keys</span> are in the URL:{' '}
                        <code className="bg-blue-100 px-1 rounded text-xs">figma.com/file/<strong>abc123XYZ</strong>/My-Design</code> — you&apos;ll use this key when querying files.
                      </p>
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
                      <h2 className="text-lg font-bold text-gray-900">Available Tools (When Template Launches)</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { tool: 'get_file', desc: 'Get metadata and structure of a Figma file (pages, frame counts)' },
                        { tool: 'get_frames', desc: 'List all frames/screens in a file, optionally filtered by page' },
                        { tool: 'get_comments', desc: 'Get all comments on a file, with resolved/unresolved status' },
                        { tool: 'export_image', desc: 'Export specific frames as PNG, JPG, SVG, or PDF images' },
                      ].map((t) => (
                        <div key={t.tool} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                          <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700 flex-shrink-0">{t.tool}</code>
                          <p className="text-sm text-gray-600">{t.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-l-4 border-brand-500 pl-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
                      <h2 className="text-lg font-bold text-gray-900">Example Prompts</h2>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Once the template is available, you&apos;ll be able to say:</p>
                    <div className="space-y-3">
                      {[
                        'Get the structure of my Figma file [key]',
                        'List all frames on the "Screens" page in Figma file [key]',
                        'Show me all unresolved comments on my Figma file from the last week',
                        'For each frame in the Figma file, create a Jira Story with the frame name as the title',
                      ].map((prompt) => (
                        <div key={prompt} className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-gray-700">{prompt}</div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Want to learn more — shared for all usage tabs */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h3 className="text-sm font-bold text-brand-800 mb-2">Want to learn how it works under the hood?</h3>
                <p className="text-sm text-brand-700">
                  Switch to the <button onClick={() => setMode('teacher')} className="underline font-semibold">Teacher Mode path</button> to take the full 7-lesson course. You&apos;ll learn to build MCP servers for Google Drive, Sheets, Jira, and Figma, not just {product === 'jira' ? 'Jira' : product === 'gdrive' ? 'Google Drive' : product === 'gsheets' ? 'Google Sheets' : 'Figma'}.
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
                ...(mode === 'usage' && product === 'jira' ? [
                  { problem: '"Missing required environment variables"', fix: 'Set JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN. Mac/Linux: add to ~/.zshrc and reload with source ~/.zshrc. Windows: set via System Environment Variables or use $env: in PowerShell.' },
                  { problem: '"Authentication failed (401)"', fix: 'Double-check your email and API token. API tokens are different from your Jira password.' },
                ] : mode === 'usage' && (product === 'gdrive' || product === 'gsheets') ? [
                  { problem: '"Error: invalid_client"', fix: 'Double-check your credentials JSON file. Make sure it was downloaded from the OAuth credentials page and saved to your home folder as .google-drive-credentials.json (Mac: ~/.google-drive-credentials.json, Windows: C:\\Users\\YourName\\.google-drive-credentials.json).' },
                  { problem: '"Error: access_denied"', fix: 'Make sure you added yourself as a test user in the OAuth consent screen settings.' },
                ] : mode === 'usage' && product === 'figma' ? [
                  { problem: '"403 Forbidden"', fix: 'Your Figma token may not have access to that file. Make sure you generated the token from the same account that owns the file.' },
                  { problem: '"404 Not Found"', fix: 'Check the file key in your Figma URL — it\'s the part between /file/ and the next /. Example: figma.com/file/abc123XYZ/...' },
                ] : mode === 'teacher' ? [
                  { problem: '"command not found: git"', fix: 'Use Option C (Download ZIP) instead, or install Git from git-scm.com.' },
                  { problem: 'Lessons feel too fast', fix: 'Ask Claude to explain in more detail or dive deeper into any topic.' },
                ] : []),
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
                    { step: 'Lesson 1', time: '10 min' },
                    { step: 'Full Course', time: '4-5 hrs' },
                  ]
                : product === 'jira'
                ? [
                    { step: 'Download', time: '3 min' },
                    { step: 'Credentials', time: '1 min' },
                    { step: 'Connect', time: '1 min' },
                    { step: 'First Query', time: '30 sec' },
                  ]
                : product === 'gdrive'
                ? [
                    { step: 'Download', time: '3 min' },
                    { step: 'Credentials', time: '10 min' },
                    { step: 'Authorize', time: '1 min' },
                    { step: 'First Query', time: '30 sec' },
                  ]
                : [
                    { step: 'Set Up Creds', time: '10 min' },
                    { step: 'Template', time: 'Soon' },
                    { step: 'Connect', time: '1 min' },
                    { step: 'First Query', time: '30 sec' },
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
            <a href="/modules/3-mcp-automation" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Read the full course overview</p>
              <p className="text-sm font-semibold text-gray-900">Module 3: MCP Integrations</p>
            </a>
            <a href="/modules/4-vibe-coding" className="flex-1 border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors text-center">
              <p className="text-xs text-gray-400 mb-1">Next module</p>
              <p className="text-sm font-semibold text-gray-900">Module 4: Vibe Coding</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
