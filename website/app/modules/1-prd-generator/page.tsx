'use client'

export default function Module1PRDGenerator() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max section-padding pb-12">
          {/* Pill badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1.5 rounded-full">
              Module 1
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">
              Free
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
              45 - 60 min
            </span>
          </div>

          {/* Module 0 link banner */}
          <a
            href="/modules/0-claude-basics"
            className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 mb-8 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
            </svg>
            New to Claude Code? Start with Module 0: Claude Code Basics
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 max-w-3xl leading-tight">
            Write a Production-Ready PRD with AI
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
            AI is most valuable when it helps you think better, not when it does all the thinking for you.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="/modules/1-prd-generator/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Get Started
            </a>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-1-prd"
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

      {/* ─── OVERVIEW ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mb-12">
            Most PMs spend 4 - 8 hours writing a PRD. Half that time is staring at a blank page, the other half is chasing down edge cases reviewers will flag. This module flips the process. Instead of writing then reviewing, you will think first with AI, then generate. The PRD Generator MCP server acts as a senior PM sitting across from you — asking the hard questions, surfacing blind spots, and drafting the document only after you have done the real thinking.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">What You Will Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                ),
                title: '@-Mentions for Full Project Context',
                desc: 'Reference product docs, research, and architecture so Claude understands your domain before asking its first question.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                ),
                title: 'Socratic Questioning',
                desc: 'Sharpen your problem statement through a structured Q&A that exposes gaps in your thinking before they reach stakeholders.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                ),
                title: 'Multiple Strategic Approaches',
                desc: 'Generate 2 - 3 distinct approaches and compare trade-offs before committing to a direction.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-3-3.87m6-7.13a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: 'Multi-Perspective Feedback',
                desc: 'Get instant reviews from an engineer, exec, researcher, and QA lead — before your actual review meeting.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TWO WAYS TO USE ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Two Ways to Use This Module</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-brand-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Teacher Mode</h3>
              <p className="text-sm text-gray-600 mb-4">6-lesson interactive course on AI-assisted PRD writing. Exercises, quizzes, and explanations — no prior knowledge needed.</p>
              <p className="text-xs text-brand-600 font-medium">Say: &quot;I want to learn how to write PRDs with AI&quot;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Usage Mode</h3>
              <p className="text-sm text-gray-600 mb-4">6 production-ready MCP tools. Generate, validate, and review PRDs immediately — skip the teaching.</p>
              <p className="text-xs text-gray-500 font-medium">Say: &quot;I need to write a PRD. Can you help me?&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── COURSE STRUCTURE ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Course Structure</h2>
          <div className="space-y-4">
            {[
              { num: 1, title: 'Welcome to PRD Generation', duration: '15 min', desc: 'What AI-assisted PRDs are, why they matter, and what you\'ll build in this course.' },
              { num: 2, title: 'Context & Socratic Questioning', duration: '20 min', desc: '@-mentions, context loading, and the Socratic Q&A technique that sharpens your thinking.' },
              { num: 3, title: 'PRD Structure & Templates', duration: '20 min', desc: 'Templates for feature launches, API integrations, and redesigns. Learn when to use each.' },
              { num: 4, title: 'Generating & Validating PRDs', duration: '20 min', desc: 'Generate a full PRD from your answers, then validate it for completeness with automated scoring.' },
              { num: 5, title: 'Multi-Perspective Review', duration: '20 min', desc: 'Get feedback from Engineer, Designer, and QA perspectives — before your real review meeting.' },
              { num: 6, title: 'Edge Cases & Polish', duration: '15 min', desc: 'Surface edge cases specific to your product, iterate on feedback, and export a production-ready PRD.' },
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

      {/* ─── TRADITIONAL VS AI-PARTNERSHIP ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Traditional vs AI-Partnership</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            See how each step of PRD writing changes when you bring AI into the process.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 'Research',
                traditional: 'Dig through docs, Slack, and tickets manually',
                ai: '@-mention relevant docs, Claude surfaces patterns',
              },
              {
                step: 'Problem Framing',
                traditional: 'Write, rewrite, rewrite again',
                ai: 'Socratic Q&A until the problem is crisp',
              },
              {
                step: 'Requirements',
                traditional: 'Brainstorm alone, miss edge cases',
                ai: 'AI generates candidates, you curate',
              },
              {
                step: 'Validation',
                traditional: 'Wait for the review meeting',
                ai: 'Instant multi-perspective feedback',
              },
              {
                step: 'Edge Cases',
                traditional: 'Reviewers find them for you (too late)',
                ai: 'AI suggests them before you share',
              },
              {
                step: 'Final Document',
                traditional: 'Copy-paste from scattered notes',
                ai: 'Structured generation from your answers',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  {item.step}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Before</span>
                    <p className="text-sm text-gray-500 mt-1">{item.traditional}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">With AI</span>
                    <p className="text-sm text-gray-900 mt-1 flex items-start gap-2">
                      <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {item.ai}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE FOUR CORE TECHNIQUES ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">The Four Core Techniques</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            These four techniques turn Claude from a content generator into a thinking partner.
          </p>

          <div className="space-y-12">
            {/* Technique 1 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  1
                </span>
                <h3 className="text-xl font-bold text-gray-900">Full Context via @-Mentions</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Before writing a single word, give Claude the context it needs. The better the context, the sharper the questions and output.
              </p>

              <h4 className="text-sm font-semibold text-gray-900 mb-3">What to @-mention:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {['Product strategy docs or OKRs', 'User research findings', 'Existing PRDs for related features', 'Technical architecture docs', 'Competitor analysis'].map((item) => (
                  <span key={item} className="text-xs bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 mb-6 font-mono text-sm text-gray-700 leading-relaxed">
                <p className="text-gray-400 text-xs mb-2 font-sans font-semibold uppercase tracking-wider">Example prompt</p>
                @product-strategy.md @user-research-q4.md @api-architecture.md<br /><br />
                I need to write a PRD for a new notifications center.<br />
                Can you review these docs and help me think through the approach?
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Pro tip:</span> Do not dump everything. Pick 3 - 5 docs that are directly relevant. Too much context creates noise, not clarity.
                  </p>
                </div>
              </div>
            </div>

            {/* Technique 2 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  2
                </span>
                <h3 className="text-xl font-bold text-gray-900">Socratic Questioning for Clarity</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                The PRD Generator asks 10 questions, but the real magic is in the follow-ups. A good PRD starts with a crisp problem statement — and most PMs skip this.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    category: 'Problem Clarity',
                    question: '"Who exactly is affected?" "How do you know this is a problem?"',
                    why: 'Vague problems lead to vague solutions',
                  },
                  {
                    category: 'Solution Validation',
                    question: '"What alternatives did you consider?" "Why this approach?"',
                    why: 'Prevents solutioning without exploring options',
                  },
                  {
                    category: 'Success Criteria',
                    question: '"How will you know this worked?" "What does failure look like?"',
                    why: 'Forces measurable outcomes, not vibes',
                  },
                  {
                    category: 'Constraints',
                    question: '"What cannot change?" "What dependencies exist?"',
                    why: 'Surfaces blockers early, not mid-sprint',
                  },
                  {
                    category: 'Strategic Fit',
                    question: '"How does this connect to company OKRs?" "What are you saying no to?"',
                    why: 'Ensures the feature is worth building',
                  },
                ].map((item) => (
                  <div key={item.category} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-brand-700 mb-2">{item.category}</h4>
                    <p className="text-sm text-gray-600 italic mb-2">{item.question}</p>
                    <p className="text-xs text-gray-500">{item.why}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Pro tip:</span> If you cannot answer a question clearly in conversation, you cannot write it clearly in a PRD. Use the struggle as signal.
                  </p>
                </div>
              </div>
            </div>

            {/* Technique 3 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  3
                </span>
                <h3 className="text-xl font-bold text-gray-900">Generate Multiple Approaches</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Do not jump to the first solution. Ask Claude to generate 2 - 3 strategic approaches, then pick the best one.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    approach: 'Start Broad',
                    how: '"Give me 3 different ways to solve [problem]"',
                    best: 'Greenfield features, unclear direction',
                  },
                  {
                    approach: 'Compare Trade-offs',
                    how: '"Compare build vs buy vs integrate for [need]"',
                    best: 'Technical decisions, vendor selection',
                  },
                  {
                    approach: 'Phased Thinking',
                    how: '"What is the MVP vs v2 vs full vision?"',
                    best: 'Large features that need scoping',
                  },
                ].map((item) => (
                  <div key={item.approach} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{item.approach}</h4>
                    <p className="text-sm text-gray-600 italic mb-2">{item.how}</p>
                    <p className="text-xs text-gray-500">Best for: {item.best}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 leading-relaxed">
                <p className="text-gray-400 text-xs mb-2 font-sans font-semibold uppercase tracking-wider">Example prompt</p>
                I am considering three approaches for the notifications center:<br />
                1. Real-time WebSocket push<br />
                2. Polling with smart batching<br />
                3. Email digest only<br /><br />
                Help me compare these on: user experience, engineering effort,<br />
                scalability, and time-to-ship.
              </div>
            </div>

            {/* Technique 4 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  4
                </span>
                <h3 className="text-xl font-bold text-gray-900">Multi-Perspective Feedback</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Before sharing your PRD with stakeholders, get feedback from multiple perspectives. Claude can role-play different reviewers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  {
                    role: 'Engineering Lead',
                    focus: 'Feasibility, technical debt, scalability, timeline realism',
                    color: 'bg-blue-50 border-blue-100',
                    iconColor: 'text-blue-500',
                  },
                  {
                    role: 'VP Product / Exec',
                    focus: 'Strategic alignment, ROI, opportunity cost',
                    color: 'bg-purple-50 border-purple-100',
                    iconColor: 'text-purple-500',
                  },
                  {
                    role: 'User Researcher',
                    focus: 'User needs, usability gaps, accessibility',
                    color: 'bg-green-50 border-green-100',
                    iconColor: 'text-green-500',
                  },
                  {
                    role: 'QA Lead',
                    focus: 'Edge cases, error states, testability',
                    color: 'bg-orange-50 border-orange-100',
                    iconColor: 'text-orange-500',
                  },
                ].map((item) => (
                  <div key={item.role} className={`rounded-xl border p-5 ${item.color}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className={`w-5 h-5 ${item.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <h4 className="text-sm font-bold text-gray-900">{item.role}</h4>
                    </div>
                    <p className="text-sm text-gray-600">{item.focus}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 leading-relaxed">
                <p className="text-gray-400 text-xs mb-2 font-sans font-semibold uppercase tracking-wider">Example prompt</p>
                Here is my PRD draft. Review it from three perspectives:<br /><br />
                1. As a senior backend engineer — flag technical risks<br />
                2. As VP Product — challenge the strategic rationale<br />
                3. As a user researcher — identify gaps in user understanding<br /><br />
                Be specific and critical. I would rather fix problems now than in review.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REAL-WORLD WALKTHROUGH ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Real-World Walkthrough</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            The full flow for a PM writing a PRD for an In-App Notifications Center.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                time: '2 min',
                title: 'Context Loading',
                desc: '@-mention your product roadmap, user research, and any existing technical spikes. Tell Claude what you are building and ask it to help you think through the approach.',
              },
              {
                step: 2,
                time: '15 min',
                title: 'Socratic Exploration',
                desc: 'Claude asks about the problem and you clarify that 34% of approvals are delayed 48+ hours. It pushes on users, metrics, and constraints — you commit to "median response time under 4 hours" and discover a WebSocket scaling gap.',
              },
              {
                step: 3,
                time: '10 min',
                title: 'Approach Generation',
                desc: 'Claude proposes 3 delivery approaches: WebSocket push, polling with batching, and email digest. You compare trade-offs and pick WebSocket with polling fallback.',
              },
              {
                step: 4,
                time: '5 min',
                title: 'PRD Generation',
                desc: 'Claude generates a structured PRD from all the thinking above. The document includes all sections, pre-filled with real content from your conversation.',
              },
              {
                step: 5,
                time: '10 min',
                title: 'Multi-Perspective Review',
                desc: 'Engineering flags WebSocket scaling risk. UX catches missing mobile experience. The exec reviewer questions ROI, prompting you to strengthen the metrics section with dollar impact.',
              },
              {
                step: 6,
                time: '3 min',
                title: 'Validation and Export',
                desc: 'The PRD scores 90% (Grade A). You add a missing rollback trigger, then export to Markdown and paste into Notion. Total time: about 45 minutes for a PRD that would have taken 6 hours.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 flex flex-col items-center">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-600 text-white text-sm font-bold">
                    {item.step}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST PRACTICES ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Best Practices</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Do cards */}
            <div>
              <h3 className="text-sm font-bold text-green-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Do
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Think first, generate second', desc: 'Use the questioning phase to sharpen your thinking, not to outsource it.' },
                  { title: 'Be specific with metrics', desc: '"Improve engagement" is worthless. "Increase 24-hr read rate from 45% to 80%" is actionable.' },
                  { title: 'Challenge the AI\'s suggestions', desc: 'If an edge case does not apply, say why. If a question feels off, push back.' },
                  { title: 'Iterate on the output', desc: 'The first draft is never final. Use validate_prd to find gaps, then fill them.' },
                  { title: 'Save your best prompts', desc: 'Build a personal library of prompts that produce great results.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-l-4 border-green-400 bg-green-50 rounded-r-xl p-4"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Don't cards */}
            <div>
              <h3 className="text-sm font-bold text-red-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Do Not
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Accept the first output blindly', desc: 'AI-generated does not mean production-ready. You are the PM, not Claude.' },
                  { title: 'Skip the problem statement', desc: 'It is tempting to jump to requirements. Resist. A crisp problem is 60% of a good PRD.' },
                  { title: 'Use AI to avoid hard thinking', desc: 'If you cannot explain the "why" verbally, the PRD will not be convincing.' },
                  { title: 'Forget your audience', desc: 'Engineers read PRDs differently than execs. Tailor the depth accordingly.' },
                  { title: 'Generate PRDs for features you do not understand', desc: 'AI cannot compensate for a PM who has not talked to users.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border-l-4 border-red-400 bg-red-50 rounded-r-xl p-4"
                  >
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TROUBLESHOOTING ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Troubleshooting</h2>

          <div className="space-y-4">
            {[
              {
                problem: 'PRD feels generic, not specific to my product',
                cause: 'Not enough context provided upfront.',
                fix: '@-mention 3 - 5 relevant docs before starting. Include user research, product strategy, and technical constraints. The more specific your input, the more specific the output.',
              },
              {
                problem: 'Edge case suggestions are not relevant',
                cause: 'Product description is too vague.',
                fix: 'Be specific about your product type, user base, and technical stack. "B2B SaaS with 12K MAU, WebSocket-based real-time features" produces better edge cases than "a notification feature."',
              },
              {
                problem: 'The process feels too long',
                cause: 'Trying to answer every question perfectly in one pass.',
                fix: 'It is OK to answer "TBD" and come back later. Generate the PRD with what you know, then use validate_prd to identify the gaps worth filling.',
              },
              {
                problem: 'Stakeholders want a different format',
                cause: 'Your team uses a custom PRD template.',
                fix: 'Edit the templates in the templates/ directory to match your team\'s format. The MCP server will generate PRDs using your structure.',
              },
              {
                problem: 'I do not know how to answer some questions',
                cause: 'You need more research before writing the PRD.',
                fix: 'That is actually the point. If you cannot answer "How will you measure success?", that is a sign you need to talk to your data team before writing the PRD. The questions expose gaps in your preparation.',
              },
            ].map((item) => (
              <div
                key={item.problem}
                className="border-l-4 border-amber-400 bg-white rounded-r-xl border border-gray-200 p-6"
              >
                <h3 className="text-base font-bold text-gray-900 mb-2">{item.problem}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  <span className="font-semibold text-gray-600">Cause:</span> {item.cause}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Fix:</span> {item.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUICK REFERENCE ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Quick Reference</h2>
          <p className="text-gray-600 mb-10">The six MCP tools included in this module.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                tool: 'list_templates',
                what: 'Shows 3 PRD template types (feature launch, API integration, redesign).',
                when: 'Start here to pick the right template.',
              },
              {
                tool: 'get_template',
                what: 'Returns the interactive questionnaire for your chosen template.',
                when: 'After picking a template.',
              },
              {
                tool: 'generate_prd',
                what: 'Creates a full, structured PRD from your answers.',
                when: 'After answering questions.',
              },
              {
                tool: 'validate_prd',
                what: 'Scores PRD completeness on an A - D scale.',
                when: 'After generation and before sharing with stakeholders.',
              },
              {
                tool: 'suggest_edge_cases',
                what: 'Lists edge cases specific to your PRD type and product.',
                when: 'During or after PRD generation.',
              },
              {
                tool: 'review_prd',
                what: 'Multi-perspective review from Engineer, Designer, and QA viewpoints.',
                when: 'After generation to catch blind spots before real review.',
              },
            ].map((item) => (
              <div
                key={item.tool}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-sm font-mono font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg">
                    {item.tool}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{item.what}</p>
                <p className="text-xs text-gray-500">{item.when}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD & SETUP ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Download and Setup</h2>
            <p className="text-gray-600 mb-8">
              Clone the module from GitHub, install dependencies, and add the MCP server to your Claude Code config.
            </p>

            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-1-prd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors text-sm mb-8"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View on GitHub
            </a>

            <div className="bg-gray-50 rounded-xl p-5 text-left">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3">Terminal</p>
              <p className="font-mono text-sm text-gray-700">
                git clone https://github.com/anmolgupta824/ai-native-pm.git<br />
                cd ai-native-pm/modules/module-1-prd<br />
                npm install && npm run build
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM NAVIGATION ─── */}
      <section className="bg-white border-t border-gray-100">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4">
            <a
              href="/modules/0-claude-basics"
              className="flex-1 flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Previous</span>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                  Module 0 — Claude Code Basics
                </p>
              </div>
            </a>

            <a
              href="/modules/2-rollout-planner"
              className="flex-1 flex items-center justify-end gap-4 p-5 rounded-xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all group text-right"
            >
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Next</span>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                  Module 2 — Rollout Planner
                </p>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
