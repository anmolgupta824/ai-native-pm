'use client'

export default function Module2Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 2</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">45–60 min</span>
          </div>

          <a href="/modules/0-claude-basics" className="inline-flex items-center gap-2 text-sm text-brand-700 bg-brand-50 border border-brand-200 rounded-lg px-4 py-2 mb-6 hover:bg-brand-100 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            New to Claude Code? Start with Module 0
          </a>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            Plan Your Next Launch in 1 Hour
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            A feature that ships without a rollout plan is a feature that ships with invisible risk. Use AI to surface risks, map stakeholders, and build timelines — before the launch, not during the fire drill.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="/modules/2-rollout-planner/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Get Started
            </a>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-2-rollout"
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

      {/* Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-600 leading-relaxed mb-8">
            Launch planning is where good PMs separate from great PMs. Anyone can write requirements. Few can anticipate the 15 things that go wrong during rollout. This module gives you an AI co-pilot that extends your peripheral vision — you think about the feature, the AI thinks about what you forgot.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-6">What You&apos;ll Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Risk Assessment', desc: 'Structured frameworks, not gut feel' },
              { title: 'Stakeholder Mapping', desc: 'Detect conflicts before kickoff' },
              { title: 'Timeline Generation', desc: 'Dependency-aware with buffers' },
              { title: 'Rollback Planning', desc: 'The section everyone skips' },
              { title: 'Communication Plans', desc: 'Right message, right audience, right time' },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Ways to Use */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Two Ways to Use This Module</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-brand-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Teacher Mode</h3>
              <p className="text-sm text-gray-600 mb-4">6-lesson interactive course on rollout planning. Risk assessment, stakeholder mapping, timeline generation — with exercises and quizzes.</p>
              <p className="text-xs text-brand-600 font-medium">Say: &quot;I want to learn rollout planning&quot;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Usage Mode</h3>
              <p className="text-sm text-gray-600 mb-4">5 production-ready MCP tools. Build complete rollout plans immediately — skip the teaching.</p>
              <p className="text-xs text-gray-500 font-medium">Say: &quot;Help me build a rollout plan&quot;</p>
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
              { num: 1, title: 'Welcome to Rollout Planning', duration: '15 min', desc: 'Why rollouts fail, how AI changes the equation, and the 5-tool framework you\'ll learn.' },
              { num: 2, title: 'Risk Assessment', duration: '20 min', desc: 'Build structured risk matrices with likelihood, impact, mitigation strategies, and owners.' },
              { num: 3, title: 'Stakeholder Mapping', duration: '20 min', desc: 'RACI matrices, conflict detection, and communication planning by audience.' },
              { num: 4, title: 'Timeline Generation', duration: '20 min', desc: 'Dependency-aware timelines with critical paths, milestones, and buffer strategies.' },
              { num: 5, title: 'Rollback Planning', duration: '15 min', desc: 'Trigger conditions, step-by-step procedures, verification criteria, and communication protocols.' },
              { num: 6, title: 'Putting It All Together', duration: '20 min', desc: 'End-to-end workflow combining all 5 tools into a complete rollout plan.' },
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

      {/* Traditional vs AI */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">Traditional vs AI-Partnership Approach</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { step: 'Risk Assessment', old: 'Brainstorm in a meeting, miss half', ai: 'Structured risk matrix from PRD context' },
              { step: 'Stakeholder Mapping', old: 'Mental model, miss conflicts', ai: 'Automated conflict detection' },
              { step: 'Timeline', old: 'Spreadsheet with optimistic estimates', ai: 'Dependency-aware with buffer suggestions' },
              { step: 'Rollback Plan', old: '"We\'ll figure it out"', ai: 'Step-by-step with trigger conditions' },
              { step: 'Communication', old: 'Ad-hoc Slack messages', ai: 'Templated plan by audience' },
              { step: 'Go/No-go', old: 'Vibes', ai: 'Explicit checklist with metric thresholds' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 text-sm mb-3">{item.step}</h3>
                <div className="flex items-start gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  <p className="text-sm text-gray-500">{item.old}</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <p className="text-sm text-brand-700 font-medium">{item.ai}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Core Techniques */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">The Five Core Techniques</h2>

          {/* Technique 1 */}
          <div className="border-l-4 border-brand-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
              <h3 className="text-lg font-bold text-gray-900">Context-Driven Risk Assessment</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Risks don&apos;t come from imagination — they come from context. Feed Claude your PRD, architecture docs, and past incident reports.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { cat: 'Technical', q: '"What breaks if traffic is 3x expected?"' },
                { cat: 'User Adoption', q: '"Which users will be most disrupted?"' },
                { cat: 'Timeline', q: '"What\'s the critical path? What has no slack?"' },
                { cat: 'Organizational', q: '"Who might block this and why?"' },
                { cat: 'Compliance', q: '"What regulatory gates must we pass?"' },
              ].map((r) => (
                <div key={r.cat} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700">{r.cat}</p>
                  <p className="text-xs text-gray-500 mt-1">{r.q}</p>
                </div>
              ))}
            </div>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mb-4">
              @prd-notifications.md @incident-log-q4.md @architecture.md<br /><br />
              I&apos;m planning the rollout for the notifications center.<br />
              Generate a risk assessment matrix with likelihood, impact, mitigation, and owner.
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800"><span className="font-semibold">Pro tip:</span> Include past incident logs. AI is great at pattern-matching risks from previous launches to your current one.</p>
            </div>
          </div>

          {/* Technique 2 */}
          <div className="border-l-4 border-brand-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
              <h3 className="text-lg font-bold text-gray-900">Stakeholder Mapping &amp; Conflict Detection</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">The fastest way to derail a launch is stakeholder misalignment. Map who cares, why they care, and where they&apos;ll clash.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { who: 'Engineering', interest: 'Feasibility, timeline', conflict: 'May push back on scope' },
                { who: 'Design', interest: 'UX consistency', conflict: 'May conflict with eng on cuts' },
                { who: 'Sales', interest: 'Customer features', conflict: 'May want features early' },
                { who: 'Support', interest: 'Training time', conflict: 'May not have enough lead time' },
                { who: 'Leadership', interest: 'Business impact', conflict: 'May add scope' },
              ].map((s) => (
                <div key={s.who} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700">{s.who}</p>
                  <p className="text-xs text-gray-500 mt-1">{s.interest} — {s.conflict}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technique 3 */}
          <div className="border-l-4 border-brand-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
              <h3 className="text-lg font-bold text-gray-900">Dependency-Aware Timeline Generation</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">A timeline without dependencies is a wish list. Build timelines that acknowledge reality.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {[
                { phase: 'Planning', trap: 'Starting dev before design approval' },
                { phase: 'Development', trap: 'Assuming everything is parallelizable' },
                { phase: 'Testing', trap: 'Skipping integration testing' },
                { phase: 'Staging', trap: '"Works on my machine" surprises' },
                { phase: 'Rollout', trap: 'Big bang when phased is safer' },
                { phase: 'Post-launch', trap: 'No clear evaluation criteria' },
              ].map((p) => (
                <div key={p.phase} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700">{p.phase}</p>
                  <p className="text-xs text-gray-500 mt-1">Trap: {p.trap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technique 4 */}
          <div className="border-l-4 border-brand-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">4</span>
              <h3 className="text-lg font-bold text-gray-900">Rollback Plan Builder</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">A rollback plan written in advance takes 10 minutes. One written during an incident takes 2 hours of panic.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {[
                { comp: 'Trigger', example: 'Error rate > 2% for 15 min' },
                { comp: 'Decision Maker', example: 'On-call engineering lead' },
                { comp: 'Steps', example: '1. Disable flag 2. Revert DB 3. Clear cache' },
                { comp: 'Verification', example: 'Error rate returns to baseline in 5 min' },
                { comp: 'Communication', example: '#incidents Slack → stakeholder email' },
                { comp: 'Post-mortem', example: 'Within 48 hours, blameless format' },
              ].map((c) => (
                <div key={c.comp} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700">{c.comp}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.example}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Technique 5 */}
          <div className="border-l-4 border-brand-500 pl-6 mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">5</span>
              <h3 className="text-lg font-bold text-gray-900">Communication Plan Templates</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Different stakeholders need different messages at different times. Don&apos;t wing this.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { who: 'Engineering', when: 'Weekly during dev', channel: 'Standup / Slack' },
                { who: 'Leadership', when: 'Weekly', channel: 'Status email' },
                { who: 'Support', when: '2 weeks pre-launch', channel: 'Training session' },
                { who: 'Sales', when: '1 week pre-launch', channel: 'Enablement deck' },
                { who: 'Users (Beta)', when: 'At beta launch', channel: 'In-app + email' },
                { who: 'Users (GA)', when: 'At full launch', channel: 'Banner + email' },
              ].map((a) => (
                <div key={a.who} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs font-semibold text-gray-700">{a.who}</p>
                  <p className="text-xs text-gray-500 mt-1">{a.when} via {a.channel}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-World Walkthrough */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Real-World Walkthrough</h2>
          <p className="text-sm text-gray-600 mb-6">Rolling out the In-App Notifications Center from Module 1&apos;s PRD:</p>
          <div className="space-y-4">
            {[
              { step: 1, time: '2 min', title: 'Load Context', desc: '@-mention PRD, architecture docs, and past incidents' },
              { step: 2, time: '10 min', title: 'Risk Assessment', desc: 'AI generates 12 risks. PM flags WebSocket scaling as #1, adds load testing.' },
              { step: 3, time: '8 min', title: 'Stakeholder Mapping', desc: 'Maps 6 stakeholders. Flags security review may block launch date.' },
              { step: 4, time: '10 min', title: 'Timeline Generation', desc: '6-week timeline with dependencies. Design review moved to critical path.' },
              { step: 5, time: '5 min', title: 'Rollback Plan', desc: 'AI generates rollback steps. PM adds error rate trigger condition.' },
              { step: 6, time: '5 min', title: 'Communication Plan', desc: 'Communication matrix by stakeholder. PM customizes leadership cadence.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                <div className="flex-shrink-0">
                  <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">{s.step}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{s.title}</h3>
                    <span className="text-xs text-gray-400">{s.time}</span>
                  </div>
                  <p className="text-sm text-gray-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 font-medium">Total: ~40 minutes for a rollout plan that covers risks, stakeholders, timeline, rollback, and communication.</p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Best Practices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-green-700 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                Do
              </h3>
              <div className="space-y-3">
                {[
                  'Start from the PRD — the rollout plan should trace back to requirements',
                  'Name risk owners — "The team" owns nothing',
                  'Include rollback triggers — specific, measurable conditions',
                  'Plan communication by audience',
                  'Build in 20% buffer on all estimates',
                ].map((item) => (
                  <div key={item} className="border-l-2 border-green-400 pl-3">
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-600 mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                Don&apos;t
              </h3>
              <div className="space-y-3">
                {[
                  'Treat the rollout plan as a formality',
                  'Assume the happy path — plan for the feature flag that won\'t turn off',
                  'Skip the post-launch evaluation',
                  'Create the plan in isolation — review with eng and design',
                  'Forget the users — phased rollout beats a surprise big bang',
                ].map((item) => (
                  <div key={item} className="border-l-2 border-red-300 pl-3">
                    <p className="text-sm text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            {[
              { problem: 'Risk assessment feels too generic', fix: '@-mention your PRD, architecture docs, and past incident reports. Specify product type, scale, and user base.' },
              { problem: 'Timeline seems unrealistic', fix: 'Tell Claude about your team size, sprint cadence, and competing priorities.' },
              { problem: 'Stakeholder map is too simple', fix: 'Add context about relationships and history between stakeholders.' },
              { problem: 'Rollback plan doesn\'t match your infrastructure', fix: 'Describe your deployment process (feature flags, CI/CD, rollback SLA).' },
            ].map((t) => (
              <div key={t.problem} className="bg-white border border-amber-200 rounded-xl p-5">
                <p className="text-sm font-semibold text-gray-900 mb-2">{t.problem}</p>
                <p className="text-sm text-gray-600">{t.fix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Reference</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { tool: 'create_rollout_plan', desc: 'Generates full rollout plan from PRD', when: 'After PRD is finalized' },
              { tool: 'assess_risks', desc: 'Structured risk matrix with mitigations', when: 'During planning phase' },
              { tool: 'map_stakeholders', desc: 'Stakeholder interests and conflict detection', when: 'Before kickoff meeting' },
              { tool: 'generate_timeline', desc: 'Dependency-aware timeline with buffers', when: 'After scope is confirmed' },
              { tool: 'build_rollback_plan', desc: 'Step-by-step rollback with triggers', when: 'Before launch' },
            ].map((tool) => (
              <div key={tool.tool} className="border border-gray-200 rounded-xl p-4">
                <p className="font-mono text-sm text-brand-600 font-semibold">{tool.tool}</p>
                <p className="text-sm text-gray-700 mt-1">{tool.desc}</p>
                <p className="text-xs text-gray-400 mt-1">{tool.when}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Download & Setup */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Download &amp; Setup</h3>
              <p className="text-sm text-gray-600 mt-1">Get the source code and run the MCP server locally.</p>
              <div className="bg-gray-100 rounded-lg p-3 mt-3 font-mono text-xs text-gray-700">
                git clone https://github.com/anmolgupta824/ai-native-pm.git
              </div>
            </div>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-2-rollout"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-4">
          <a href="/modules/1-prd-generator" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group">
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            <div>
              <p className="text-xs text-gray-400">Previous</p>
              <p className="text-sm font-semibold text-gray-900">Module 1: PRD Generator</p>
            </div>
          </a>
          <a href="/modules/3-mcp-automation" className="flex items-center gap-3 border border-gray-200 rounded-xl px-5 py-4 hover:bg-gray-50 transition-colors group text-right sm:ml-auto">
            <div>
              <p className="text-xs text-gray-400">Next</p>
              <p className="text-sm font-semibold text-gray-900">Module 3: MCP Automation</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>
    </>
  )
}
