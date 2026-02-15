'use client'

export default function Module4ImageGen() {
  return (
    <>
      {/* ─── HERO SECTION ─── */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max section-padding pb-12">
          {/* Pill badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1.5 rounded-full">
              Module 4
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">
              Free
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-600">
              2 hours
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
            Generate Product Visuals with AI
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl leading-relaxed">
            Create mockups, presentation graphics, and social media assets in minutes using DALL-E — no design skills required.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="/modules/4-image-gen/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Get Started
            </a>
            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-4-image-gen"
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
            PMs spend hours waiting for designers to create mockups, presentation visuals, and social media assets. This module gives you 6 MCP tools that generate professional visuals on demand using OpenAI&apos;s DALL-E. Get a concept illustration for your deck in 30 seconds, not 3 days.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-8">What You Will Learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Prompt Engineering for Images',
                desc: 'Master the four-component prompt structure: subject, style, color palette, and composition — the foundation of every great AI image.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Product Mockups & Wireframes',
                desc: 'Generate app screens, dashboard previews, and feature mockups to include in PRDs and stakeholder presentations.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                title: 'Presentation & Social Visuals',
                desc: 'Create concept illustrations, hero backgrounds, and social media graphics that match your brand — no designer needed.',
              },
              {
                icon: (
                  <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                ),
                title: 'Asset Packs & Variations',
                desc: 'Generate coordinated sets of 4 images for campaigns, or explore 3 visual directions before committing to one.',
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
              <p className="text-sm text-gray-600 mb-4">6-lesson interactive course on AI image generation for PMs. Exercises, quizzes, and explanations — learn prompt engineering for visuals.</p>
              <p className="text-xs text-brand-600 font-medium">Say: &quot;I want to learn how to generate images with AI&quot;</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Usage Mode</h3>
              <p className="text-sm text-gray-600 mb-4">6 production-ready MCP tools. Generate images, refine prompts, and create asset packs immediately — skip the teaching.</p>
              <p className="text-xs text-gray-500 font-medium">Say: &quot;Generate a mockup of a notifications dashboard&quot;</p>
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
              { num: 1, title: 'Welcome & Setup', duration: '10 min', desc: 'What DALL-E is, why PMs need image generation, and how to set up your OpenAI API key.' },
              { num: 2, title: 'Prompt Fundamentals', duration: '20 min', desc: 'The four-component prompt structure, style keywords, common mistakes, and the refine-generate-iterate workflow.' },
              { num: 3, title: 'Product Mockups & Wireframes', duration: '20 min', desc: 'Generate app screens, dashboards, and feature previews. Integrate mockups into your PRDs.' },
              { num: 4, title: 'Presentation & Pitch Visuals', duration: '15 min', desc: 'Create concept illustrations, before/after comparisons, and hero backgrounds for slide decks.' },
              { num: 5, title: 'Social Media & Marketing Assets', duration: '15 min', desc: 'Platform-specific graphics, visual consistency across campaigns, and text overlay workflows.' },
              { num: 6, title: 'Advanced Techniques & Workflows', duration: '20 min', desc: 'Variations, asset packs, building a prompt library, and cross-module workflows.' },
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

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">How Image Generation Works for PMs</h2>
          <p className="text-gray-600 mb-10 max-w-2xl">
            See how each step of creating product visuals changes when you bring AI into the process.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: 'Product Mockups',
                traditional: 'Wait 2-3 days for a designer to create wireframes',
                ai: 'Generate a mockup in 30 seconds with a text prompt',
              },
              {
                step: 'Deck Visuals',
                traditional: 'Search stock photos for 30 minutes, settle for something generic',
                ai: 'Generate exactly what you need: concept, color, composition',
              },
              {
                step: 'Social Graphics',
                traditional: 'Request a set of 4 posts, wait a week for the design queue',
                ai: 'Create a coordinated asset pack in one command',
              },
              {
                step: 'Variations',
                traditional: 'Ask for revisions one at a time over days',
                ai: 'Generate 3 style variations instantly, pick the best',
              },
              {
                step: 'Brand Consistency',
                traditional: 'Write a brief, hope the designer interprets it correctly',
                ai: 'Define a style guide string, apply it to every image',
              },
              {
                step: 'Cost',
                traditional: '$50-200 per image from a freelancer',
                ai: '$0.04-0.08 per image via DALL-E API',
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

      {/* ─── FIVE CORE TECHNIQUES ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Five Core Techniques</h2>
          <p className="text-gray-600 mb-12 max-w-2xl">
            These five techniques turn text prompts into professional product visuals.
          </p>

          <div className="space-y-12">
            {/* Technique 1 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  1
                </span>
                <h3 className="text-xl font-bold text-gray-900">The Four-Component Prompt</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Every effective image prompt has four parts: subject, style, color palette, and composition. Missing any one produces unpredictable results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { component: 'Subject', example: '"A web dashboard showing analytics metrics"', why: 'What the image is about' },
                  { component: 'Style', example: '"Clean flat design, modern SaaS aesthetic"', why: 'The visual language' },
                  { component: 'Color Palette', example: '"Blue (#2563EB) and white with gray accents"', why: 'Brand consistency' },
                  { component: 'Composition', example: '"Landscape format, space for text overlay"', why: 'Layout and purpose' },
                ].map((item) => (
                  <div key={item.component} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-brand-700 mb-2">{item.component}</h4>
                    <p className="text-sm text-gray-600 italic mb-2">{item.example}</p>
                    <p className="text-xs text-gray-500">{item.why}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 leading-relaxed">
                <p className="text-gray-400 text-xs mb-2 font-sans font-semibold uppercase tracking-wider">Example prompt</p>
                A web dashboard showing payment analytics with 3 metric cards,<br />
                a line chart, and a data table. Clean flat design, modern SaaS aesthetic.<br />
                Blue (#2563EB) and white with gray accents. Landscape format,<br />
                professional business tool.
              </div>
            </div>

            {/* Technique 2 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  2
                </span>
                <h3 className="text-xl font-bold text-gray-900">Style Presets</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                The module includes 6 pre-configured style presets that append professional styling to your prompts automatically.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { preset: 'product-mockup', desc: 'Clean UI mockups for PRDs and specs' },
                  { preset: 'presentation', desc: 'Slide-ready visuals for decks' },
                  { preset: 'social-media', desc: 'Bold graphics for social posts' },
                  { preset: 'icon-set', desc: 'Consistent icons and illustrations' },
                  { preset: 'concept-art', desc: 'Abstract concept illustrations' },
                  { preset: 'comparison', desc: 'Before/after and side-by-side' },
                ].map((item) => (
                  <div key={item.preset} className="bg-gray-50 rounded-xl p-4">
                    <code className="text-xs bg-gray-200 px-2 py-1 rounded font-mono text-brand-700">{item.preset}</code>
                    <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technique 3 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  3
                </span>
                <h3 className="text-xl font-bold text-gray-900">Refine Before You Generate</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Use <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">refine_prompt</code> and <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">review_prompt</code> to improve your prompt before spending API credits. A refined prompt produces better results on the first try.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { step: 'Start Rough', how: '"I need a dashboard mockup"', result: 'Your initial idea' },
                  { step: 'Refine', how: 'refine_prompt adds specificity, style, composition', result: 'A detailed, structured prompt' },
                  { step: 'Review', how: 'review_prompt scores 0-100 and flags issues', result: 'Confidence before generating' },
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{item.step}</h4>
                    <p className="text-sm text-gray-600 italic mb-2">{item.how}</p>
                    <p className="text-xs text-gray-500">{item.result}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technique 4 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  4
                </span>
                <h3 className="text-xl font-bold text-gray-900">Explore with Variations</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Not sure what style you want? Generate 3 distinct variations of any concept — minimal, bold, and corporate — then iterate on the best one.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { variation: 'A: Minimal', style: 'Clean, lots of whitespace, stripped-down', best: 'Modern SaaS, tech companies' },
                  { variation: 'B: Bold', style: 'High-energy, saturated colors, vibrant', best: 'Social media, marketing' },
                  { variation: 'C: Corporate', style: 'Polished, muted tones, business-appropriate', best: 'Enterprise, stakeholder decks' },
                ].map((item) => (
                  <div key={item.variation} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{item.variation}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.style}</p>
                    <p className="text-xs text-gray-500">Best for: {item.best}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">Cost tip:</span> Set generateImages to false to preview the 3 prompts first (~free). Then generate only the one you like (~$0.04) instead of all three (~$0.12).
                  </p>
                </div>
              </div>
            </div>

            {/* Technique 5 */}
            <div className="border-l-4 border-brand-500 rounded-r-xl bg-white border border-l-4 border-gray-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-brand-700 text-sm font-bold">
                  5
                </span>
                <h3 className="text-xl font-bold text-gray-900">Coordinated Asset Packs</h3>
              </div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Generate 4 related images that share a consistent visual style. Essential for campaigns, presentations, and product pages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { pack: 'Social Campaign', items: 'Announcement, feature highlight, social proof, CTA' },
                  { pack: 'Presentation Set', items: 'Title hero, problem visual, solution visual, results visual' },
                  { pack: 'Icon Set', items: '4 matching feature icons with consistent style' },
                  { pack: 'Feature Highlights', items: 'Value prop, speed, collaboration, results' },
                ].map((item) => (
                  <div key={item.pack} className="bg-gray-50 rounded-xl p-5">
                    <h4 className="text-sm font-bold text-gray-900 mb-2">{item.pack}</h4>
                    <p className="text-sm text-gray-600">{item.items}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-5 font-mono text-sm text-gray-700 leading-relaxed">
                <p className="text-gray-400 text-xs mb-2 font-sans font-semibold uppercase tracking-wider">Example</p>
                create_asset_pack({'{'}<br />
                &nbsp;&nbsp;theme: &quot;AI notifications center launch&quot;,<br />
                &nbsp;&nbsp;packType: &quot;social-campaign&quot;,<br />
                &nbsp;&nbsp;styleGuide: &quot;Clean, minimal, blue and white, flat design&quot;,<br />
                &nbsp;&nbsp;generateImages: true<br />
                {'}'})
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
            The full flow for a PM creating a product mockup for a PRD.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                time: '1 min',
                title: 'Start with a Rough Idea',
                desc: 'You need a mockup of a notifications center for your PRD. You describe it in plain English: "A web dashboard with a notification bell dropdown."',
              },
              {
                step: 2,
                time: '1 min',
                title: 'Refine the Prompt',
                desc: 'Use refine_prompt to transform your rough idea into a detailed, structured prompt with specific UI elements, colors, and layout.',
              },
              {
                step: 3,
                time: '30 sec',
                title: 'Review Before Generating',
                desc: 'Use review_prompt to score your prompt (0-100). It flags that you are missing a color palette — you add "blue (#2563EB) and white." Score jumps to 88.',
              },
              {
                step: 4,
                time: '30 sec',
                title: 'Generate the Image',
                desc: 'Generate the image with DALL-E. You get a detailed dashboard mockup with the notification panel open. Cost: $0.08.',
              },
              {
                step: 5,
                time: '2 min',
                title: 'Explore Variations',
                desc: 'Generate 3 style variations (minimal, bold, corporate). You pick the minimal style for the PRD and the bold style for the launch announcement.',
              },
              {
                step: 6,
                time: '1 min',
                title: 'Add to Your PRD',
                desc: 'Paste the image URL in your PRD\'s Design Considerations section. Stakeholders now have a visual anchor for the feature discussion.',
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
                  { title: 'Be specific about UI elements', desc: '"3 metric cards, a line chart, and a data table" produces much better results than "a dashboard."' },
                  { title: 'Include hex color codes', desc: 'Colors like "#2563EB" give you consistent, on-brand results every time.' },
                  { title: 'Refine before generating', desc: 'Use refine_prompt to add specificity. A $0 refinement saves wasted $0.04-0.08 generations.' },
                  { title: 'Say "no text" for design assets', desc: 'DALL-E renders text poorly. Generate the visual, then add text in Canva or Figma.' },
                  { title: 'Save prompts that work', desc: 'Build a personal prompt library. Template your best prompts with [PLACEHOLDERS] for reuse.' },
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
                  { title: 'Use vague prompts', desc: '"A nice looking app" gives you random results. Specificity is everything.' },
                  { title: 'Expect pixel-perfect UI', desc: 'DALL-E creates visual concepts, not production mockups. Use it for direction, not final design.' },
                  { title: 'Skip the style preset', desc: 'Presets add professional styling keywords automatically. Always specify one.' },
                  { title: 'Generate without reviewing', desc: 'The review_prompt tool catches issues before you spend API credits. Use it.' },
                  { title: 'Ask for text-heavy images', desc: 'DALL-E cannot reliably render text. Generate backgrounds and add text separately.' },
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
                problem: 'Images look nothing like what I described',
                cause: 'Prompt is too vague or conflicting.',
                fix: 'Use review_prompt to score your prompt before generating. Aim for 70+ out of 100. Add specific UI elements, a color palette, and a style keyword.',
              },
              {
                problem: 'Text in images is garbled or unreadable',
                cause: 'DALL-E does not render text reliably.',
                fix: 'Add "no text, no labels" to your prompt. Generate the visual background only, then add text in Canva, Figma, or your presentation tool.',
              },
              {
                problem: 'Colors do not match my brand',
                cause: 'No hex color codes in the prompt.',
                fix: 'Always include hex codes: "blue (#2563EB)" not just "blue." DALL-E interprets color names loosely.',
              },
              {
                problem: 'Asset pack images look inconsistent',
                cause: 'Style guide string is too vague.',
                fix: 'Use specific style guides: "Clean, minimal, blue (#2563EB) and white, flat design, modern SaaS" not "professional looking."',
              },
              {
                problem: '"OPENAI_API_KEY not set" error',
                cause: 'Missing API key environment variable.',
                fix: 'Get a key at platform.openai.com/api-keys. Set it with: export OPENAI_API_KEY="sk-..." in your terminal before starting Claude Code.',
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
                tool: 'list_styles',
                what: 'Shows 6 image style presets (product-mockup, presentation, social-media, etc.).',
                when: 'Start here to pick the right style.',
              },
              {
                tool: 'generate_image',
                what: 'Generates an image via DALL-E with your prompt, style, and size.',
                when: 'After crafting your prompt.',
              },
              {
                tool: 'refine_prompt',
                what: 'Transforms a rough idea into a detailed, structured image prompt.',
                when: 'When your prompt is vague or incomplete.',
              },
              {
                tool: 'generate_variations',
                what: 'Creates 3 distinct visual directions (minimal, bold, corporate).',
                when: 'When you want to explore multiple styles.',
              },
              {
                tool: 'create_asset_pack',
                what: 'Generates 4 coordinated images with consistent style.',
                when: 'For campaigns, presentations, or icon sets.',
              },
              {
                tool: 'review_prompt',
                what: 'Scores your prompt 0-100 and flags issues before generating.',
                when: 'Before every generation to save API credits.',
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

      {/* ─── COST BREAKDOWN ─── */}
      <section className="bg-gray-50">
        <div className="container-max section-padding">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Cost Breakdown</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <p className="text-sm text-gray-600 mb-6 text-center">
                The module is free. You only pay for images you generate via OpenAI&apos;s DALL-E API.
              </p>
              <div className="space-y-3">
                {[
                  { item: 'Standard quality image (1024x1024)', cost: '~$0.04' },
                  { item: 'HD quality image (1024x1024)', cost: '~$0.08' },
                  { item: 'HD landscape (1792x1024)', cost: '~$0.08' },
                  { item: '3 variations (standard)', cost: '~$0.12' },
                  { item: '4-image asset pack (standard)', cost: '~$0.16' },
                  { item: 'Full course exercises (all 6 lessons)', cost: '~$1.00' },
                ].map((item) => (
                  <div key={item.item} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-sm text-gray-700">{item.item}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.cost}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-6 text-center">
                Most PMs spend less than $2 completing the entire course. Compare to $50-200 per image from a freelance designer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD & SETUP ─── */}
      <section className="bg-white">
        <div className="container-max section-padding">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Download and Setup</h2>
            <p className="text-gray-600 mb-8">
              Clone the module from GitHub, set up your OpenAI API key, and add the MCP server to your Claude Code config.
            </p>

            <a
              href="https://github.com/anmolgupta824/ai-native-pm/tree/main/modules/module-4-image-gen"
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
                cd ai-native-pm/modules/module-4-image-gen<br />
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
              href="/modules/3-mcp-automation"
              className="flex-1 flex items-center gap-4 p-5 rounded-xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all group"
            >
              <svg className="w-5 h-5 text-gray-400 group-hover:text-brand-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Previous</span>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                  Module 3 — MCP Integrations
                </p>
              </div>
            </a>

            <a
              href="/modules"
              className="flex-1 flex items-center justify-end gap-4 p-5 rounded-xl border border-gray-200 hover:border-brand-200 hover:bg-brand-50/30 transition-all group text-right"
            >
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">All Modules</span>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                  View All Modules
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
