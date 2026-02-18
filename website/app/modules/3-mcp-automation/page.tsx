'use client'

export default function Module3Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 3</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">4-5 hours</span>
          </div>

          <a href="/modules/0-claude-basics" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mb-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Start with Module 0
          </a>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Master MCP Integrations in One Weekend
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Learn to connect Claude to Jira, Google Drive, Google Sheets, Figma, and any REST API. Zero prior knowledge required — just bring your curiosity.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="/modules/3-mcp-automation/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Get Started — Free
            </a>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-3-mcp-course"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Download from GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Why Learn MCP */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why PMs Should Learn MCP</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            MCP (Model Context Protocol) is how Claude connects to external tools. Without MCP, Claude can only chat. With MCP, Claude can create Jira tickets, read your Google Sheets, write reports in Google Docs, and automate the repetitive work that eats 30-40% of your week.
          </p>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 text-center mb-6">
            You &harr; Claude Code &harr; MCP Server &harr; Jira, Google Docs, Sheets, Figma, Slack, Any API
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                <h3 className="text-sm font-semibold text-gray-700">Without MCP</h3>
              </div>
              <p className="text-sm text-gray-500">Open Jira, copy tickets, open Sheets, paste data, write status report in Docs. Every. Single. Week.</p>
            </div>
            <div className="bg-white border border-brand-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <h3 className="text-sm font-semibold text-brand-700">With MCP</h3>
              </div>
              <p className="text-sm text-gray-600">&quot;Generate this week&apos;s status report from Jira and our capacity sheet&quot; — done in one sentence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Ways to Learn */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Two Ways to Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-brand-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Teacher Mode</h3>
              <p className="text-sm text-gray-600 mb-4">Interactive lessons that teach MCP from scratch. Exercises, quizzes, and explanations — no prior knowledge needed.</p>
              <p className="text-xs text-brand-600 font-medium">Say: &quot;I want to learn MCP from scratch&quot;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Usage Mode</h3>
              <p className="text-sm text-gray-600 mb-4">Production-ready templates. Skip the teaching and build integrations immediately with pre-built MCP servers.</p>
              <p className="text-xs text-gray-500 font-medium">Say: &quot;Build me a Jira MCP server&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Structure */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Course Structure</h2>
          <div className="space-y-4">
            {[
              { num: 1, title: 'Welcome to MCP', duration: '10 min', desc: 'What MCP is, why it matters for PMs, and what you\'ll build in this course.' },
              { num: 2, title: 'REST APIs for PMs', duration: '30-60 min', desc: 'HTTP methods, JSON, authentication — the API fundamentals you need before building integrations.' },
              { num: 3, title: 'How MCP Works', duration: '30 min', desc: 'MCP architecture, tools vs resources vs prompts, and the anatomy of an MCP server.' },
              { num: 4, title: 'Google Drive', duration: '20 min', desc: 'Connect Claude to Google Drive — create docs, read files, and automate document workflows.' },
              { num: 5, title: 'Google Sheets', duration: '20 min', desc: 'Read and write spreadsheet data — pull team capacity, update tracking sheets, generate reports.' },
              { num: 6, title: 'Jira Integration', duration: '20 min', desc: 'Connect Claude to Jira to create, read, search, and update issues for sprint management.' },
              { num: 7, title: 'Figma Integration', duration: '20 min', desc: 'Design-to-development automation — get Figma frames, read comments, export design specs.' },
            ].map((lesson) => (
              <div key={lesson.num} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {lesson.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-gray-900">{lesson.title}</h3>
                    <span className="text-xs text-gray-400">{lesson.duration}</span>
                  </div>
                  <p className="text-sm text-gray-600">{lesson.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Build */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Real PM Use Cases</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Automated Status Reports',
                desc: 'Read Jira tickets from last week, get team capacity from Google Sheets, and generate a formatted status report in Google Docs. What used to take an hour is now one sentence.',
                tools: 'Jira + Sheets + Drive',
              },
              {
                title: 'Design-to-Development',
                desc: 'Fetch Figma frames, create a Jira ticket for each screen with design specs attached. Bridge the gap between design and engineering.',
                tools: 'Figma + Jira',
              },
              {
                title: 'Capacity Planning',
                desc: 'Read team availability from Sheets, get the Jira backlog, and suggest sprint allocation based on story points and team bandwidth.',
                tools: 'Sheets + Jira',
              },
            ].map((useCase) => (
              <div key={useCase.title} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{useCase.title}</h3>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-50 text-brand-700">{useCase.tools}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
          <div className="space-y-3">
            {[
              '7 interactive lessons — from zero to building any MCP integration',
              'Teacher Mode MCP server with exercises, quizzes, and progress tracking',
              'Production-ready Jira MCP template (more templates coming)',
              '3 real PM use case examples with full code',
              'Comprehensive troubleshooting guide',
              'Curriculum guides you can reference anytime (markdown)',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <p className="text-sm text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-xl mx-auto">
          <div className="bg-brand-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-2">Start Learning MCP</h2>
            <p className="text-4xl font-extrabold mb-4">Free</p>
            <p className="text-brand-200 text-sm mb-6">7 lessons, hands-on exercises, production-ready templates.<br />From zero MCP knowledge to building real integrations.</p>
            <a
              href="/modules/3-mcp-automation/get-started"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors"
            >
              Get Started — Free
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <a href="/modules/2-image-gen" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div>
              <p className="text-xs text-gray-400">Previous</p>
              <p className="text-sm font-semibold text-gray-900">Module 2: AI Image Generation</p>
            </div>
          </a>
        </div>
      </section>
    </>
  )
}
