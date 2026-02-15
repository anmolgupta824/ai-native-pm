'use client'

export default function Module0GetStarted() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/modules/0-claude-basics" className="inline-flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            Back to Module 0
          </a>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-100 text-brand-700">Module 0</span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600">5 min setup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Get Started: Install Claude Code</h1>
          <p className="mt-4 text-lg text-gray-600">From zero to your first AI conversation in 5 minutes.</p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-12">

          {/* Step 1 */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="text-lg font-bold text-gray-900">Install Node.js</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">Download from <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" className="text-brand-600 underline">nodejs.org</a> — pick the LTS version.</p>
            <p className="text-sm text-gray-600 mb-2">Verify it works:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
              node --version
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="text-lg font-bold text-gray-900">Install Claude Code</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">Open your terminal and run:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
              npm install -g @anthropic-ai/claude-code
            </div>
            <p className="text-sm text-gray-600 mt-3">Verify it works:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mt-2">
              claude --version
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800"><span className="font-semibold">What&apos;s a terminal?</span> On Mac: press Cmd + Space, type &quot;Terminal&quot;, hit Enter. On Windows: press Win + X, select &quot;Terminal&quot;.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-l-4 border-brand-500 pl-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold">3</span>
              <h2 className="text-lg font-bold text-gray-900">Start Claude Code</h2>
            </div>
            <p className="text-sm text-gray-600 mb-3">Navigate to any folder and type:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700">
              claude
            </div>
            <p className="text-sm text-gray-600 mt-3">Follow the login prompts to connect your Anthropic account. Then try:</p>
            <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm text-gray-700 mt-2">
              What files are in this folder?
            </div>
          </div>

          {/* Done */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <p className="text-lg font-bold text-green-800 mb-2">You&apos;re running Claude Code!</p>
            <p className="text-sm text-green-700 mb-4">Read the <a href="/modules/0-claude-basics" className="underline font-semibold">full Module 0 lesson</a> for terminal basics, key concepts, and troubleshooting.</p>
            <a href="/modules/1-prd-generator" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Next: Module 1 — PRD Generator
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
