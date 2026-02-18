# Module 1: Write a Production-Ready PRD with AI

**Time:** ~90 minutes | **Prerequisites:** Claude Code installed | **Cost:** Free

> AI is most valuable when it helps you think better, not when it does all the thinking for you. This module teaches you to use Claude Code as a thinking partner — not a content generator.

---

## Overview

Most PMs spend 4–8 hours writing a PRD. Half that time is staring at a blank page, the other half is chasing down edge cases reviewers will flag.

This module flips the process. Instead of writing then reviewing, you'll **think first with AI, then generate**. The PRD Generator MCP server acts as a senior PM sitting across from you — asking the hard questions, surfacing blind spots, and drafting the document only after you've done the real thinking.

### What You'll Learn

- How to use @-mentions to give Claude full project context
- The Socratic questioning technique for sharper problem statements
- How to generate multiple strategic approaches before committing
- How to get multi-perspective feedback from 9 stakeholder reviewers
- The PRFAQ technique — Amazon-style "working backwards" from a press release

---

## Traditional vs AI-Partnership Approach

| Step | Traditional (4–8 hrs) | AI Partnership (45–60 min) |
|------|----------------------|---------------------------|
| Research | Dig through docs, Slack, tickets manually | @-mention relevant docs, Claude surfaces patterns |
| Problem framing | Write, rewrite, rewrite again | Socratic Q&A until the problem is crisp |
| Requirements | Brainstorm alone, miss edge cases | AI generates candidates, you curate |
| Validation | Wait for review meeting | Instant multi-perspective feedback |
| Edge cases | Reviewers find them for you (too late) | AI suggests them before you share |
| Final document | Copy-paste from notes | Structured generation from your answers |

---

## The Four Core Techniques

### Technique 1: Full Context via @-Mentions

Before writing a single word, give Claude the context it needs. The better the context, the sharper the questions and output.

**What to @-mention:**

- Product strategy docs or OKRs
- User research findings or survey data
- Existing PRDs for related features
- Technical architecture docs
- Competitor analysis

```
@product-strategy.md @user-research-q4.md @api-architecture.md

I need to write a PRD for a new notifications center.
Can you review these docs and help me think through the approach?
```

> **Pro tip:** Don't dump everything. Pick 3–5 docs that are directly relevant. Too much context creates noise, not clarity.

### Technique 2: Socratic Questioning for Clarity

The PRD Generator asks 10 questions, but the real magic is in the follow-ups. A good PRD starts with a crisp problem statement — and most PMs skip this.

| Category | Questions to Explore | Why It Matters |
|----------|---------------------|----------------|
| **Problem Clarity** | "Who exactly is affected?" / "How do you know this is a problem?" | Vague problems → vague solutions |
| **Solution Validation** | "What alternatives did you consider?" / "Why this approach?" | Prevents solutioning without exploring options |
| **Success Criteria** | "How will you know this worked?" / "What does failure look like?" | Forces measurable outcomes, not vibes |
| **Constraints** | "What can't change?" / "What dependencies exist?" | Surfaces blockers early, not mid-sprint |
| **Strategic Fit** | "How does this connect to company OKRs?" / "What are you saying no to?" | Ensures the feature is worth building |

> **Pro tip:** If you can't answer a question clearly in conversation, you can't write it clearly in a PRD. Use the struggle as signal.

### Technique 3: Generate Multiple Approaches Before Committing

Don't jump to the first solution. Ask Claude to generate 2–3 strategic approaches, then pick the best one.

| Approach | How It Works | Best For |
|----------|-------------|----------|
| **Start broad** | "Give me 3 different ways to solve [problem]" | Greenfield features, unclear direction |
| **Compare trade-offs** | "Compare build vs buy vs integrate for [need]" | Technical decisions, vendor selection |
| **Phased thinking** | "What's the MVP vs v2 vs full vision?" | Large features that need scoping |

```
I'm considering three approaches for the notifications center:
1. Real-time WebSocket push
2. Polling with smart batching
3. Email digest only

Help me compare these on: user experience, engineering effort,
scalability, and time-to-ship.
```

### Technique 4: Multi-Perspective Feedback

Before sharing your PRD with stakeholders, get feedback from multiple perspectives. The PRD Generator includes 9 simulated reviewers:

| Perspective | What They Focus On |
|-------------|-------------------|
| **Backend Engineer** (`backend_eng`) | APIs, database, services, caching, scalability |
| **Frontend Engineer** (`frontend_eng`) | UI states, state management, performance, browser compat |
| **Design Lead** (`designer`) | UX flows, accessibility, visual consistency, user research |
| **QA Lead** (`qa`) | Testability, acceptance criteria, edge cases, regression |
| **Finance Lead** (`finance`) | ROI, cost modeling, revenue impact, unit economics |
| **Legal Counsel** (`legal`) | Privacy, compliance, liability, IP, data governance |
| **Compliance Officer** (`compliance`) | Regulatory, SOC2, audit readiness, access controls |
| **Senior PM** (`pm`) | Strategy alignment, scope, prioritization, competitive |
| **Marketing Lead** (`marketing`) | Positioning, messaging, launch comms, growth impact |

You don't need all 9 for every PRD. Pick the 3-4 most relevant, or use "all" for a comprehensive review.

```
Review this PRD from a backend_eng and designer perspective.
Then run it through finance and pm.
```

### Technique 5: PRFAQ — Working Backwards

The PRFAQ (Press Release / FAQ) technique, popularized by Amazon, starts with the end state: a press release announcing your feature as if it's already launched. Then you work backwards to fill in the details.

| Section | Purpose |
|---------|---------|
| Headline + Subheadline | Forces a crisp value proposition |
| Press Release Body | The complete story in 3-4 paragraphs |
| Customer Quote | Makes you think from the user's perspective |
| Internal FAQ | Surfaces leadership concerns proactively |

The PRD Generator includes a PRFAQ template alongside the standard Feature Launch, API Integration, and Redesign templates.

---

## Real-World Walkthrough

Here's the full flow for a PM writing a PRD for an "In-App Notifications Center":

**Step 1: Context loading** (2 min)
```
@product-roadmap.md @user-survey-q4.md @notifications-spike.md

I need to write a PRD for a centralized notifications center.
Help me think through this before we start writing.
```

**Step 2: Socratic exploration** (15 min)
- Claude asks about the problem → PM clarifies 34% of approvals are delayed 48+ hrs
- Claude asks about users → PM identifies team leads and approvers as primary persona
- Claude pushes on metrics → PM commits to "median response time < 4 hours"
- Claude surfaces constraint → PM realizes WebSocket infra needs scaling assessment

**Step 3: Approach generation** (10 min)
- Claude proposes 3 delivery approaches (WebSocket, polling, email digest)
- PM picks WebSocket with polling fallback after comparing trade-offs

**Step 4: PRD generation** (5 min)
- Claude generates structured PRD from all the thinking above
- Document includes all sections, pre-filled with real content

**Step 5: Multi-perspective review** (10 min)
- Engineering reviewer flags WebSocket scaling risk → PM adds load testing to launch plan
- UX reviewer catches missing mobile experience → PM adds responsive design requirement
- Exec reviewer questions ROI → PM strengthens metrics section with dollar impact

**Step 6: Validation & export** (3 min)
- PRD scores 90% (Grade A)
- Missing: rollback trigger → PM adds "Error rate > 2% for 15 min"
- Export to Markdown, paste into Notion

**Total: ~45 minutes for a PRD that would have taken 6 hours.**

---

## Best Practices

### ✅ Do

- **Think first, generate second.** Use the questioning phase to sharpen your thinking, not to outsource it
- **Be specific with metrics.** "Improve engagement" is worthless. "Increase 24-hr read rate from 45% to 80%" is actionable
- **Challenge the AI's suggestions.** If an edge case doesn't apply, say why. If a question feels off, push back
- **Iterate on the output.** The first draft is never final. Use validate_prd to find gaps, then fill them
- **Save your best prompts.** Build a personal library of prompts that produce great results

### ❌ Don't

- **Don't accept the first output blindly.** AI-generated ≠ production-ready. You are the PM, not Claude
- **Don't skip the problem statement.** It's tempting to jump to requirements. Resist. A crisp problem is 60% of a good PRD
- **Don't use AI to avoid hard thinking.** If you can't explain the "why" verbally, the PRD won't be convincing
- **Don't forget your audience.** Engineers read PRDs differently than execs. Tailor the depth accordingly
- **Don't generate PRDs for features you don't understand.** AI can't compensate for a PM who hasn't talked to users

---

## Pro Tips

| Tip | How | Benefit |
|-----|-----|---------|
| **Build a context library** | Keep a folder of @-mentionable docs (strategy, personas, architecture) | Faster startup for every PRD, better AI context |
| **Create a "PRD review" agent** | Save a prompt that reviews PRDs from 3 perspectives | One-click quality check before sharing |
| **Use validation scores to track improvement** | Run validate_prd on your old PRDs vs new ones | See your PRD quality improve over time |
| **Pair with a colleague** | One person drives Claude, the other challenges answers | Best of human debate + AI structure |
| **Time-box the Socratic phase** | Spend max 15 minutes on questions, then move to generation | Prevents over-thinking and analysis paralysis |

---

## Troubleshooting

**Problem: PRD feels generic, not specific to my product**
- *Cause:* Not enough context provided upfront
- *Fix:* @-mention 3–5 relevant docs before starting. Include user research, product strategy, and technical constraints. The more specific your input, the more specific the output.

**Problem: Edge case suggestions aren't relevant**
- *Cause:* Product description is too vague
- *Fix:* Be specific about your product type, user base, and technical stack. "B2B SaaS with 12K MAU, WebSocket-based real-time features" produces better edge cases than "a notification feature."

**Problem: The process feels too long**
- *Cause:* Trying to answer every question perfectly in one pass
- *Fix:* It's OK to answer "TBD" and come back later. Generate the PRD with what you know, then use validate_prd to identify the gaps worth filling.

**Problem: Stakeholders want a different format**
- *Cause:* Your team uses a custom PRD template
- *Fix:* Use the `generate_prd_custom` tool — pass your own section headings and the server will generate a PRD in your format. You can also edit the templates in `templates/` or paste the generated PRD into your team's template manually.

**Problem: I don't know how to answer some questions**
- *Cause:* You need more research before writing the PRD
- *Fix:* That's actually the point. If you can't answer "How will you measure success?", that's a sign you need to talk to your data team before writing the PRD. The questions expose gaps in your preparation.

---

## What's Next?

Now that you can generate production-ready PRDs:

- **Try all 4 templates** — Feature launch, API integration, redesign, and PRFAQ each surface different thinking
- **Validate an existing PRD** — Paste one of your old PRDs and see how it scores
- **Move to Module 2** — [Rollout Plan Generator](../module-2-rollout/) uses the same AI-partnership approach for launch planning

---

## Quick Reference

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `list_templates` | Shows 4 PRD template types | Start here to pick the right template |
| `get_questions` | Returns 10 questions for your template | After picking a template |
| `generate_prd` | Creates full PRD from your answers | After answering questions |
| `generate_prd_custom` | Creates PRD with your own section headings | When using a custom company format |
| `validate_prd` | Scores PRD completeness (A–D) | After generation, and before sharing |
| `validate_prd_file` | Scores PRD from a file path | When PRD is saved as a file |
| `suggest_edge_cases` | Lists edge cases for your PRD type | During or after PRD generation |
| `review_prd` | Stakeholder review from 9 perspectives | Before sharing with real stakeholders |
