'use client'

export default function Module0Page() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 px-3 py-1 rounded-full">
              Module 0
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
              Free
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
              20 min
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Your First 20 Minutes with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-400">
              Claude Code
            </span>
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            You don&apos;t need to be technical. You just need to be curious.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="/modules/0-claude-basics/get-started"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Get Started
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Claude Code?</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Claude Code is a command-line AI assistant that lives in your terminal. Think of it as a
            brilliant colleague who can read your files, write code, search the web, and execute
            tasks &mdash; all through a conversation.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            You&apos;re probably thinking: &ldquo;I&apos;m a PM, not an engineer. Why would I use the
            terminal?&rdquo;
          </p>
          <p className="text-gray-600 leading-relaxed">
            Because Claude Code lets you do things that used to require engineering support: generate
            documents, automate workflows, build prototypes, and analyze data &mdash; all by describing
            what you want in plain English. This module gets you from &ldquo;never opened a
            terminal&rdquo; to &ldquo;having a productive conversation with Claude Code&rdquo; in 20
            minutes.
          </p>
        </div>
      </section>

      {/* ───────── COMPARISON GRID ───────── */}
      <section className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Claude Code vs Other AI Tools</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              The key difference: Claude.ai and ChatGPT are <em>chat tools</em>. Claude Code is a{' '}
              <em>work tool</em>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card: Works with your files */}
            <ComparisonCard
              icon={
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 6h16.5M3.75 13.5h10.5M3.75 17.25h7.5" />
                </svg>
              }
              title="Works with your files"
              claudeCode="Yes — reads & writes directly"
              others="Upload only"
            />

            {/* Card: Runs commands */}
            <ComparisonCard
              icon={
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5z" />
                </svg>
              }
              title="Runs commands"
              claudeCode="Yes — executes on your machine"
              others="No"
            />

            {/* Card: Connects to tools (MCP) */}
            <ComparisonCard
              icon={
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.586-2.474a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.97" />
                </svg>
              }
              title="Connects to tools (MCP)"
              claudeCode="Yes — Google Docs, Jira, etc."
              others="Limited / No"
            />

            {/* Card: Remembers project context */}
            <ComparisonCard
              icon={
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75" />
                </svg>
              }
              title="Remembers project context"
              claudeCode="Per project folder"
              others="Per conversation"
            />

            {/* Card: Best for PMs when... */}
            <ComparisonCard
              icon={
                <svg className="w-6 h-6 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m6 5.96a14.926 14.926 0 01-5.84 2.58m0 0a14.926 14.926 0 01-5.84-2.58m5.84 2.58v4.8" />
                </svg>
              }
              title="Best for PMs when..."
              claudeCode="Workflows & automation"
              others="Quick questions"
            />
          </div>
        </div>
      </section>

      {/* ───────── STEP 1: INSTALL ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StepCard number={1} title="Install Claude Code">
            {/* Info accent card */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5 mb-8">
              <p className="text-sm font-semibold text-brand-800 mb-2">Prerequisites</p>
              <ul className="text-sm text-brand-700 space-y-1.5">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-500" />
                  <span>
                    An Anthropic account &mdash; sign up at{' '}
                    <a
                      href="https://console.anthropic.com"
                      className="underline underline-offset-2 hover:text-brand-900"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      console.anthropic.com
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-500" />
                  <span>A Claude Pro, Team, or Enterprise plan (~$20/month)</span>
                </li>
              </ul>
            </div>

            {/* Install commands */}
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Mac / Windows / Linux</p>
                <p className="text-sm text-gray-500 mb-2">
                  Open your terminal and run:
                </p>
                <CodeBlock>npm install -g @anthropic-ai/claude-code</CodeBlock>
                <p className="text-xs text-gray-400 mt-2">
                  Don&apos;t have npm? Install Node.js first from{' '}
                  <a
                    href="https://nodejs.org"
                    className="underline hover:text-gray-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    nodejs.org
                  </a>{' '}
                  (pick the LTS version), then run the command above.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Verify it worked</p>
                <CodeBlock>claude --version</CodeBlock>
                <p className="text-sm text-gray-500 mt-2">
                  You should see a version number. If you do, you&apos;re ready.
                </p>
              </div>
            </div>
          </StepCard>
        </div>
      </section>

      {/* ───────── STEP 2: TERMINAL BASICS ───────── */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StepCard number={2} title="Terminal Basics for PMs">
            <p className="text-gray-600 mb-6">
              The terminal is just a text-based way to talk to your computer. Instead of clicking
              folders, you type commands.{' '}
              <span className="font-semibold text-gray-800">5 commands &mdash; that&apos;s all you need.</span>
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <TerminalCommandCard command="pwd" description="Shows where you are" example='/Users/you/Documents' />
              <TerminalCommandCard command="ls" description="Lists files in current folder" example='shows all files' />
              <TerminalCommandCard command="cd" description="Changes folder" example='cd Documents' />
              <TerminalCommandCard command="cd .." description="Goes up one folder" example='moves back one level' />
              <TerminalCommandCard command="mkdir" description="Creates a new folder" example='mkdir my-project' />
            </div>

            {/* Tip accent card */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-2">Quick Practice</p>
              <p className="text-sm text-green-700 mb-3">
                Open your terminal and try these commands in order:
              </p>
              <CodeBlock variant="green">
{`pwd
ls
mkdir claude-test
cd claude-test
pwd`}
              </CodeBlock>
              <p className="text-xs text-green-600 mt-3">
                You just created a folder and navigated into it. That&apos;s all the terminal knowledge
                you need.
              </p>
            </div>
          </StepCard>
        </div>
      </section>

      {/* ───────── STEP 3: FIRST CONVERSATION ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StepCard number={3} title="Your First Conversation">
            <p className="text-gray-600 mb-6">
              Navigate to any project folder (or the one you just created) and start Claude Code:
            </p>
            <CodeBlock>claude</CodeBlock>

            <p className="text-sm font-semibold text-gray-700 mt-8 mb-4">Try these starter prompts</p>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Ask a simple question</p>
                <CodeBlock>What files are in this folder?</CodeBlock>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Create something</p>
                <CodeBlock>
{`Create a markdown file called meeting-notes.md with a template
for weekly product team meetings. Include sections for attendees,
agenda, decisions, and action items.`}
                </CodeBlock>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1.5">Analyze a file</p>
                <CodeBlock>
{`@meeting-notes.md Improve this template. Add sections that
senior PMs typically include but juniors forget.`}
                </CodeBlock>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Notice the <span className="font-mono text-brand-600 font-semibold">@</span> symbol? That&apos;s
              how you point Claude Code at specific files. It reads the file and uses it as context.
            </p>

            {/* What just happened */}
            <div className="bg-brand-50 border border-brand-100 rounded-xl p-5">
              <p className="text-sm font-semibold text-brand-800 mb-3">What just happened?</p>
              <p className="text-sm text-brand-700 mb-3">
                Claude Code didn&apos;t just suggest text in a chat bubble. It actually:
              </p>
              <ol className="text-sm text-brand-700 space-y-2 list-none">
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-200 text-brand-800 text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  Read the files on your computer
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-200 text-brand-800 text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  Created or modified real files
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-200 text-brand-800 text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  Used your project context to give better answers
                </li>
              </ol>
              <p className="text-sm text-brand-700 mt-3 font-medium">
                This is the fundamental difference from ChatGPT or Claude.ai.
              </p>
            </div>
          </StepCard>
        </div>
      </section>

      {/* ───────── STEP 4: KEY CONCEPTS ───────── */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <StepCard number={4} title="Key Concepts">
            <p className="text-gray-600 mb-8">
              Four ideas that unlock everything else in Claude Code.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <ConceptCard
                icon={
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                }
                title="@-Mentions"
                description='Point Claude at specific files by typing @filename. Claude reads the file and uses it as context for better answers.'
              />
              <ConceptCard
                icon={
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.22-3.56a1.12 1.12 0 01-.36-1.3l.83-2.35a1.12 1.12 0 011.05-.74h5.56a1.12 1.12 0 011.05.74l.83 2.35a1.12 1.12 0 01-.36 1.3l-5.22 3.56a1.12 1.12 0 01-1.16 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3" />
                  </svg>
                }
                title="Tools"
                description='Claude Code can read files, write files, run commands, search the web, and connect to external services. These capabilities are called tools.'
              />
              <ConceptCard
                icon={
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.421 48.421 0 01-4.163-.3c.186 1.613.46 3.193.816 4.734l5.304-.734 5.304.734c.356-1.54.63-3.12.816-4.734a48.421 48.421 0 01-4.163.3.64.64 0 01-.657-.643v0zm-6.282 6.675a48.08 48.08 0 015.282-.588v0c1.8 0 3.571.2 5.282.588M8.968 12.762c.052.158.108.315.168.47m5.728 0c.06-.155.116-.312.168-.47m-5.896.47a48.712 48.712 0 013.228.164c1.09.07 2.164.18 3.228.33m-6.456-.494l-.164.696a48.406 48.406 0 003.228.164m3.228.164l.164-.696m0 0a48.406 48.406 0 00-3.228-.164" />
                  </svg>
                }
                title="MCP Servers"
                description='MCP (Model Context Protocol) servers are like plugins. They extend Claude Code to connect to Google Docs, Jira, databases, and more.'
              />
              <ConceptCard
                icon={
                  <svg className="w-7 h-7 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                }
                title="Project Memory"
                description='Claude Code remembers context within a project folder. Start it in the same folder and it picks up where you left off.'
              />
            </div>
          </StepCard>
        </div>
      </section>

      {/* ───────── TROUBLESHOOTING ───────── */}
      <section className="bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Troubleshooting</h2>

          <div className="space-y-4">
            <TroubleshootCard
              problem={`"command not found: claude"`}
              fix={
                <>
                  Node.js isn&apos;t in your PATH, or the install didn&apos;t complete. Try running{' '}
                  <span className="font-mono text-amber-800 text-xs bg-amber-100 px-1.5 py-0.5 rounded">
                    npx @anthropic-ai/claude-code
                  </span>{' '}
                  as an alternative.
                </>
              }
            />
            <TroubleshootCard
              problem={`"command not found: npm"`}
              fix={
                <>
                  Install Node.js from{' '}
                  <a
                    href="https://nodejs.org"
                    className="underline underline-offset-2 hover:text-amber-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    nodejs.org
                  </a>{' '}
                  first, then retry the install command.
                </>
              }
            />
            <TroubleshootCard
              problem="Claude Code starts but feels slow"
              fix="First-time startup takes a few seconds to initialize. Subsequent starts are much faster."
            />
            <TroubleshootCard
              problem={`"authentication error" or "API key" message`}
              fix={
                <>
                  Run{' '}
                  <span className="font-mono text-amber-800 text-xs bg-amber-100 px-1.5 py-0.5 rounded">
                    claude
                  </span>{' '}
                  and follow the login prompts. You&apos;ll need your Anthropic account credentials.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* ───────── BOTTOM NAVIGATION ───────── */}
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* You're Ready summary */}
          <div className="bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-2xl p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">You&apos;re Ready</h2>
            <p className="text-gray-600 max-w-lg mx-auto text-sm leading-relaxed">
              You now know what Claude Code is, how to install it, the 5 terminal commands you need,
              how to have your first conversation, and what @-mentions, tools, and MCP servers are.
            </p>
          </div>

          {/* Next module card */}
          <a
            href="/modules/1-prd-generator"
            className="group block rounded-2xl border border-gray-200 hover:border-brand-200 hover:shadow-lg transition-all p-6"
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

/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS (file-local)
   ───────────────────────────────────────────── */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

/* ── Step Card ── */
function StepCard({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-l-4 border-brand-500 pl-8 relative">
      {/* Step number circle */}
      <div className="absolute -left-6 top-0 w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center text-lg font-bold shadow-md">
        {number}
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  )
}

/* ── Code Block ── */
function CodeBlock({
  children,
  variant = 'default',
}: {
  children: React.ReactNode
  variant?: 'default' | 'green'
}) {
  const bg = variant === 'green' ? 'bg-green-100/60' : 'bg-gray-100'
  const text = variant === 'green' ? 'text-green-900' : 'text-gray-800'
  return (
    <pre className={`${bg} ${text} font-mono text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap`}>
      {children}
    </pre>
  )
}

/* ── Comparison Card ── */
function ComparisonCard({
  icon,
  title,
  claudeCode,
  others,
}: {
  icon: React.ReactNode
  title: string
  claudeCode: string
  others: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-3">{icon}</div>
      <h3 className="text-sm font-bold text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-brand-100 flex-shrink-0 mt-0.5">
            <CheckIcon className="w-3 h-3 text-brand-600" />
          </span>
          <div>
            <p className="text-xs font-semibold text-brand-700">Claude Code</p>
            <p className="text-xs text-gray-600">{claudeCode}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 flex-shrink-0 mt-0.5">
            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold text-gray-500">Claude.ai / ChatGPT</p>
            <p className="text-xs text-gray-400">{others}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Terminal Command Card ── */
function TerminalCommandCard({
  command,
  description,
  example,
}: {
  command: string
  description: string
  example: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <p className="font-mono text-sm font-bold text-brand-700 mb-1">{command}</p>
      <p className="text-sm text-gray-700 mb-2">{description}</p>
      <p className="text-xs text-gray-400 font-mono">{example}</p>
    </div>
  )
}

/* ── Concept Card ── */
function ConceptCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="mb-3">{icon}</div>
      <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  )
}

/* ── Troubleshoot Card ── */
function TroubleshootCard({
  problem,
  fix,
}: {
  problem: string
  fix: React.ReactNode
}) {
  return (
    <div className="border-l-4 border-amber-400 bg-white rounded-r-xl p-5 shadow-sm">
      <p className="text-sm font-bold text-gray-900 mb-1.5">{problem}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{fix}</p>
    </div>
  )
}
