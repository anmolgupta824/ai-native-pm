'use client'

const lessons = [
  {
    number: 5,
    title: 'CLAUDE.md — Your Project Brain',
    time: '15 min',
    description:
      'Give Claude persistent memory. Write a CLAUDE.md that makes every session feel like Claude has been on your team for 6 months. Includes templates for Sprint PMs, Strategy PMs, and Research PMs.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-5-CLAUDE-MD.md',
  },
  {
    number: 6,
    title: 'Context Management',
    time: '15 min',
    description:
      'Avoid context rot — the #1 reason Claude outputs get worse over time. Learn the one-task-per-session rule, CRAFT framework, and prompt structuring for better outputs.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-6-CONTEXT-MANAGEMENT.md',
  },
  {
    number: 7,
    title: 'Plan Mode — Think Before You Act',
    time: '15 min',
    description:
      'Make Claude plan before executing on complex tasks. Learn Plan + Critique, Plan + Options, and Plan + Scope Check patterns for PM workflows.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-7-PLAN-MODE.md',
  },
  {
    number: 8,
    title: 'Sub-agents — Do 5 Things at Once',
    time: '15 min',
    description:
      'Run parallel research, multi-stakeholder communications, and competitive analysis simultaneously. Each sub-agent gets clean context — no cross-contamination.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-8-SUB-AGENTS.md',
  },
  {
    number: 9,
    title: 'Skills — Reusable Slash Commands',
    time: '20 min',
    description:
      'Build /prd, /standup, /status, /retro, /competitor and 5 more PM slash commands. Type one word, get a full workflow.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-9-SKILLS.md',
  },
  {
    number: 10,
    title: 'Hooks — Automate the Boring Stuff',
    time: '20 min',
    description:
      'Set up automatic rules: auto-format docs, protect sensitive files, desktop notifications when Claude finishes, quality checks before output.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-10-HOOKS.md',
  },
  {
    number: 11,
    title: 'Advanced Prompting Patterns',
    time: '20 min',
    description:
      '8 patterns that separate okay output from great output: CRAFT, Socratic Method, Role Stacking, Chain of Thought, Constraint Escalation, Anti-Patterns, Iterative Refinement, and Comparative Analysis.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-11-ADVANCED-PROMPTING.md',
  },
  {
    number: 12,
    title: 'Building Your PM Workspace',
    time: '30 min',
    description:
      'Capstone project: wire everything together into a daily PM command center. CLAUDE.md + Skills + Hooks + templates + folder structure — all ready to go.',
    href: 'https://github.com/anmolgupta824/ai-native-pm/blob/main/modules/module-0-claude-basics/LESSON-12-PM-WORKSPACE.md',
  },
]

export default function Module0BMasteryPage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
              Module 0B
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              Free
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              2-3 hours
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Claude Code{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
              Mastery
            </span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Go from &ldquo;I can use Claude Code&rdquo; to &ldquo;Claude Code is my PM command center.&rdquo;
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="#lessons"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Start Learning
            </a>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-0-claude-basics"
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

      {/* ───────── OVERVIEW ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is this module?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Module 0 got you started &mdash; you installed Claude Code, learned 5 terminal commands, and had your
            first AI conversation. <strong>This module takes you from beginner to power user.</strong>
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Over 8 lessons, you&apos;ll learn how to give Claude persistent memory, manage context like a pro,
            run parallel research tasks, create reusable slash commands, set up automation hooks, and master
            advanced prompting patterns that produce dramatically better output.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By the end, you&apos;ll have a <strong>complete PM workspace</strong> &mdash; type{' '}
            <span className="font-mono text-brand-600">/standup</span> and get your daily update,{' '}
            <span className="font-mono text-brand-600">/prd</span> and get a full PRD workflow,{' '}
            <span className="font-mono text-brand-600">/retro</span> and get a sprint retrospective.
            All powered by Claude Code, running on your machine.
          </p>

          {/* Prerequisites */}
          <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mt-8">
            <p className="text-sm font-semibold text-brand-800 mb-2">Prerequisites</p>
            <ul className="text-sm text-brand-700 space-y-1.5">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>
                  Completed{' '}
                  <a href="/modules/0-claude-basics" className="underline underline-offset-2 hover:text-brand-900">
                    Module 0: Claude Code Basics
                  </a>{' '}
                  (or already have Claude Code installed)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>A Claude Pro or Max subscription</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── LESSONS ───────── */}
      <section className="bg-gray-50" id="lessons">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">8 Lessons to Mastery</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Each lesson is self-contained with exercises. Work through them in order or jump to what you need.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {lessons.map((lesson) => (
              <a
                key={lesson.number}
                href={lesson.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-brand-200 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-600 text-white text-sm font-bold flex-shrink-0">
                    {lesson.number}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                    {lesson.time}
                  </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 group-hover:text-brand-700 transition-colors mb-2">
                  {lesson.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {lesson.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHAT YOU'LL BUILD ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What you&apos;ll build</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            By the end of Lesson 12, you&apos;ll have a complete PM workspace that looks like this:
          </p>

          <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm text-gray-300 overflow-x-auto">
            <pre className="whitespace-pre">{`pm-workspace/
  CLAUDE.md                    ← Your project brain
  sprint-goals.md              ← Current sprint context
  .claude/
    settings.json              ← Hooks (auto-format, protect files)
    skills/
      standup/SKILL.md         ← /standup command
      prd/SKILL.md             ← /prd [feature] command
      status/SKILL.md          ← /status command
      one-pager/SKILL.md       ← /one-pager [feature] command
      retro/SKILL.md           ← /retro command
  templates/                   ← PRD, one-pager, status templates
  docs/                        ← Generated outputs`}</pre>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <div className="bg-brand-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-brand-800 mb-2">Before Mastery</p>
              <ul className="text-sm text-brand-700 space-y-1.5">
                <li>Re-explain context every session</li>
                <li>Write the same prompts over and over</li>
                <li>Outputs get worse the longer you chat</li>
                <li>One task at a time, sequentially</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-2">After Mastery</p>
              <ul className="text-sm text-green-700 space-y-1.5">
                <li>Claude knows your context automatically</li>
                <li>Type /prd and get a full workflow</li>
                <li>Clean sessions, sharp outputs every time</li>
                <li>5 tasks in parallel with sub-agents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── BOTTOM NAVIGATION ───────── */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Ready summary */}
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to level up?</h2>
            <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed mb-6">
              Start with Lesson 5 (CLAUDE.md) and work through to Lesson 12. By the end, you&apos;ll have
              a complete AI-powered PM workspace that saves you hours every week.
            </p>
            <a
              href={lessons[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Start Lesson 5: CLAUDE.md
            </a>
          </div>

          {/* Next module card */}
          <a
            href="/modules/1-prd-generator"
            className="group block rounded-2xl border border-gray-200 hover:border-brand-200 hover:shadow-lg transition-all p-6 bg-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                  Next Up
                </p>
                <p className="text-lg font-bold text-gray-900 group-hover:text-brand-700 transition-colors">
                  Module 1: PRD Generator
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Generate your first production-ready PRD in 30 minutes.
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          </a>

          {/* Back to all modules */}
          <div className="text-center mt-6">
            <a
              href="/modules"
              className="text-sm text-gray-400 hover:text-brand-600 transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to All Modules
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
