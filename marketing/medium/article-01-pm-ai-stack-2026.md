# The PM's AI Stack in 2026: What I Actually Use Every Day

**Published on:** Medium
**SEO Keywords:** product manager AI tools, PM AI workflow, Claude Code for PMs
**Tags:** Product Management, Artificial Intelligence, Productivity, Claude Code, PM Tools
**Read time:** 7 minutes
**CTA Target:** Module 0 → ai-native-pm.vercel.app

---

I manage a payments team at Careem, the Uber-backed super app across the Middle East. Twenty-plus engineers and designers. Fifty million customers. Around $120 million flowing through our systems every month.

I also test every AI tool that shows up in my LinkedIn feed.

Over the past two years, I have tried ChatGPT, Claude.ai, Gemini, Copilot, Notion AI, and at least a dozen PM-specific wrappers that promise to "automate your workflow." I have pasted PRD drafts into chat windows. I have uploaded competitive analysis spreadsheets. I have typed "act as a senior product manager" more times than I want to admit.

Most of those experiments produced the same result: a slightly polished version of what I already had, obtained after 20 minutes of copy-pasting context back and forth. Net time saved? Close to zero. Sometimes negative.

But my stack today looks nothing like it did a year ago. I generate production-ready PRDs in under an hour. I pull live data from Jira, Google Docs, and internal dashboards directly into my AI workflow. I run multi-perspective reviews on my documents -- engineering, design, QA, executive -- before a single human sees them.

This is what stuck. And more importantly, why.

## The Problem with AI for PMs

Here is the pattern most product managers follow with AI tools:

1. Open ChatGPT or Claude.ai
2. Spend 5 minutes explaining your product, your team, your constraints
3. Get a decent but generic output
4. Realize it missed critical context that lives in your actual project files
5. Copy-paste three documents into the chat
6. Hit the character limit
7. Start a new conversation and repeat from step 2

I did this for months. And the core problem became obvious: chat interfaces are designed for conversations, not for work.

When I write a PRD, my context is spread across a product strategy document, user research notes, technical architecture docs, a competitive analysis, and half a dozen Slack threads. That context lives in files on my machine and in tools my team uses every day. Copying it into a chat window is not a workflow -- it is data entry.

The bigger issue is memory. Every time you close a ChatGPT conversation, that context is gone. You start fresh on Monday morning, re-explaining your product to an AI that helped you write a spec for it three days ago. It is the equivalent of onboarding a new contractor every week.

This is not a ChatGPT problem specifically. It is a category problem. Chat tools -- all of them -- are built for question-and-answer interactions. PMs need something that operates on their actual work.

## The "Work Tool" Category

Earlier last year, I started using Claude Code. The shift was not subtle.

Claude Code is a terminal-based tool. You open it in the same directory where your project files live. It can read your files directly -- no uploading, no copy-pasting. It can write files. It can run commands. And through something called MCP (Model Context Protocol), it can connect to external tools like Jira, Google Docs, databases, and APIs.

Here is the comparison that made the difference click for me:

**Chat tools** (ChatGPT, Claude.ai, Gemini):
- You upload files manually, one at a time
- Context is limited to the current conversation
- No access to your file system or other tools
- Output appears in the chat -- you copy it out manually
- Memory resets between sessions (or is unreliable)

**Work tools** (Claude Code):
- Reads files directly from your project directory
- Uses @-mentions to load specific files as context
- Connects to Jira, Google Docs, and other tools via MCP
- Writes output directly to files on your machine
- Maintains per-project memory across sessions

The first time I pointed Claude Code at my product strategy doc, my user research folder, and my competitive analysis with three @-mentions and said "write a PRD for the in-app notifications center," the output was fundamentally different from anything I had gotten from a chat tool. It referenced actual metric targets from our strategy doc. It incorporated real user research findings. It addressed technical constraints documented in our architecture notes.

Not because the underlying model is smarter. Because it had actual context.

## My Actual Daily Stack

Here is what a typical work week looks like with my current setup:

**Claude Code for documents and analysis.** This is the primary work tool. When I need to write a PRD, a spec, a strategy brief, or a competitive analysis, I open Claude Code in the relevant project folder. I point it at the files it needs for context. And then I work with it -- not by prompting and copying, but by having it read my existing documents, ask me clarifying questions, and write output directly into new files.

A concrete example: last month, I needed a PRD for a new payment reconciliation feature. I had a product strategy doc, three pages of user interview notes, an engineering constraints document, and a competitive audit. In Claude Code, I loaded all of those as context, then used a Socratic questioning approach where the AI asked me 15 pointed questions about edge cases, success metrics, and scope boundaries before generating a single line of the PRD. The whole process took about 50 minutes. The document went into the first review cycle with one round of minor edits.

Previously, that same PRD would have taken me four to six hours of writing, followed by two to three rounds of significant revisions because I inevitably missed edge cases that my engineering lead would catch.

**MCP servers for tool integration.** MCP is what makes Claude Code a platform rather than a tool. I have MCP servers that connect to Jira (for pulling sprint data and ticket details), Google Docs (for reading and writing shared documents), and our internal dashboards. This means I can say "pull the current sprint tickets and summarize what is at risk" without leaving my terminal.

This is not theoretical. When I prepare for sprint planning, I used to spend 30 minutes pulling data from Jira, cross-referencing it with our roadmap doc, and building a summary. Now I load my roadmap context and ask Claude Code to pull the current sprint state and identify misalignments. The output goes directly into a markdown file I share with my team.

**The terminal as a PM power tool.** I know this sounds intimidating to PMs who have never opened a terminal. It was intimidating to me too, and I have a CS degree. But the reality is that you need exactly five commands: `pwd` (where am I?), `ls` (what is here?), `cd` (go to a folder), `cd ..` (go back), and `mkdir` (make a folder). That is the entire technical prerequisite.

Once you have those five commands, you can navigate to any project folder on your machine and launch Claude Code with full file context. The terminal is not the point -- it is the doorway to a fundamentally better way of working with AI.

## What I Do Not Use AI For

This is the section most AI content skips, and it is the most important one.

**I still talk to users myself.** AI cannot sit in a user interview and pick up on the hesitation in someone's voice when they say "yeah, that feature is fine." It cannot read the body language of a customer who is too polite to tell you your product is confusing. User research is a human skill, and no amount of AI tooling replaces the judgment you build from hundreds of conversations.

**I still make the hard calls.** Should we build feature A or feature B? Should we delay the launch by two weeks to fix that edge case? Should we cut scope or push the deadline? These are judgment calls that require understanding your team's morale, your company's strategic position, your customer relationships, and a dozen other factors that do not live in any document. AI can give you frameworks. It can surface data. It cannot make the decision for you.

**I still run meetings.** Sprint planning, stakeholder alignment, team retrospectives -- these are fundamentally human coordination activities. I have tried using AI to generate meeting agendas and talking points, and it helps at the margins. But the actual work of getting eight people aligned on a decision requires presence, empathy, and real-time negotiation that no tool handles.

**I still review AI output critically.** Every PRD Claude Code generates gets a careful read. I challenge the assumptions. I check the metrics against reality. I ask whether the edge cases actually matter for our users. AI is a drafting partner, not an autopilot. The PM who blindly ships AI-generated specs will ship bad products -- faster.

The honest framing is this: AI handles the 60% of PM work that is information synthesis, document drafting, and data aggregation. It frees me to spend more time on the 40% that actually determines whether a product succeeds -- user empathy, strategic judgment, and team leadership.

## Where to Start

I built all of these workflows into a free course because I got tired of explaining the setup in one-off conversations.

Module 0 takes about 20 minutes. It gets Claude Code installed and running on your machine with a real project folder. No coding. No prior terminal experience. Five commands.

From there, you can move into Module 1 (the PRD Generator I described above) and Module 2 (Rollout Plan Generator) -- both free.

If you are a PM who has been experimenting with AI chat tools and wondering why the productivity gains feel marginal, the answer is probably not the model. It is the interface. Work tools beat chat tools for actual work.

Try it: [ai-native-pm.vercel.app](https://ai-native-pm.vercel.app)

---

*Anmol Gupta is a Product Manager at Careem (Uber), leading Payments & Fintech. Previously at Visa and RAENA. MBA from Nanyang Business School, B.Tech CS from NIT Warangal. Based in Dubai, UAE. He writes about practical AI workflows for product managers at The AI-Native PM.*
