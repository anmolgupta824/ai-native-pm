# Lesson 5: CLAUDE.md — Your Project Brain

**Time:** 15 minutes | **Prerequisites:** Module 0 (Lessons 1-4) | **Cost:** Free

> Every time you start Claude Code, it forgets everything. CLAUDE.md is how you give it a memory.

---

## The Problem

You've been using Claude Code for a week. You've figured out that it's great at reading files and generating docs. But every single time you start a new session, you have to re-explain:

- "I'm a PM at a fintech company"
- "We use Jira for sprint management"
- "Our PRDs follow this specific template"
- "Don't write code — I'm not an engineer"
- "Our product is a B2B payments platform"

This is exhausting. And it gets worse — Claude Code starts making assumptions that don't match your context. It writes PRDs for consumer apps when you're B2B. It suggests tools you don't use. It formats things wrong.

**This is the #1 mistake PMs make with Claude Code: treating every session as a blank slate.**

---

## The Solution: CLAUDE.md

CLAUDE.md is a special file that Claude Code reads automatically every time it starts. It's like a briefing doc you'd hand to a new team member on Day 1.

When Claude Code starts in a folder that contains a CLAUDE.md file, it reads it first — before you type anything. Every response it gives is shaped by what's in that file.

Think of it this way:

| Without CLAUDE.md | With CLAUDE.md |
|-------------------|----------------|
| Claude is a random smart person | Claude is a smart person who's been on your team for 6 months |
| You explain context every session | Context is loaded automatically |
| Outputs are generic | Outputs match your company's style |
| You correct mistakes constantly | Mistakes are rare because constraints are set |

---

## How It Works

### Step 1: Create the File

Navigate to your project folder and create a CLAUDE.md file:

```
cd ~/Documents/my-pm-project
```

Then ask Claude Code:

```
Create a file called CLAUDE.md in this folder
```

Or create it yourself with any text editor.

### Step 2: What Goes Inside

A good CLAUDE.md for a PM has 5 sections:

```markdown
# CLAUDE.md

## Who I Am
- Senior PM at [Company Name], a [type of company]
- I'm not an engineer — never write code unless I explicitly ask
- I manage [product/feature area]

## My Product
- [Product name]: [one-line description]
- Target users: [who uses it]
- Key metrics: [what we measure]
- Tech stack: [what engineering uses — even if you don't code, this helps Claude understand constraints]

## My Tools
- Project management: Jira
- Documents: Google Docs / Notion / Confluence
- Communication: Slack
- Design: Figma
- Data: Amplitude / Mixpanel / Looker

## My Preferences
- PRDs follow this template: [link or description]
- I prefer bullet points over paragraphs
- Always include success metrics with specific numbers
- Use our company terminology: [list key terms]
- Format dates as DD-MMM-YYYY

## Rules
- Never generate code unless I explicitly ask
- Always ask clarifying questions before writing long documents
- When in doubt, be concise
- Flag assumptions you're making so I can correct them
```

### Step 3: Test It

Start Claude Code in the same folder:

```
claude
```

Then ask:

```
Who am I and what do I work on?
```

Claude Code should respond with everything from your CLAUDE.md. If it does — your project brain is working.

---

## CLAUDE.md Templates for PMs

### Template 1: The Sprint PM

You manage a team's sprints, write stories, and run standups.

```markdown
# CLAUDE.md

## Who I Am
- PM at [Company], Series B SaaS startup (50 engineers, 3 squads)
- I own the Payments squad (1 EM, 6 engineers, 1 designer)
- Not an engineer — don't write code

## My Product
- [Product]: B2B invoicing platform
- 2,000 active customers, $4M ARR
- Key metrics: activation rate, time-to-first-invoice, churn

## How I Work
- 2-week sprints, Monday start
- Stories in Jira (project key: PAY)
- PRDs in Google Docs, linked from Jira epics
- Standups: async in Slack #payments-standup
- Retros: every other Friday

## My Preferences
- User stories format: "As a [user], I want [goal], so that [benefit]"
- Acceptance criteria: Given/When/Then format
- Story points: Fibonacci (1, 2, 3, 5, 8, 13)
- Always include edge cases in acceptance criteria
- Flag any assumption about engineering effort

## Rules
- Never generate code
- Ask me about priority before suggesting scope changes
- When I say "write a story," I mean a Jira-ready user story with AC
```

### Template 2: The Strategy PM

You focus on product strategy, market analysis, and roadmapping.

```markdown
# CLAUDE.md

## Who I Am
- Group PM at [Company], public company (500+ engineers)
- I own strategy for the Platform team (3 PMs report to me)
- 8 years PM experience, ex-[Previous Company]

## My Product
- Developer platform: APIs, SDKs, documentation
- 50K monthly active developers
- Key metrics: API calls/month, developer NPS, time-to-first-API-call

## Strategic Context
- Company goal: 100K developers by EOY
- My OKRs this quarter:
  1. Increase API adoption by 40%
  2. Launch self-serve onboarding (reduce support tickets by 60%)
  3. Ship 3 new API endpoints based on top developer requests
- Competitive landscape: [Competitor A] is market leader, [Competitor B] is catching up on DX

## My Preferences
- Strategy docs follow: Vision → Problem → Opportunity → Solution → Metrics → Risks
- Roadmaps: Now / Next / Later format
- Prioritization: RICE framework (Reach, Impact, Confidence, Effort)
- Always include competitive implications
- Quantify everything — no vague statements

## Rules
- Think at the strategy level, not feature level
- Challenge my assumptions — push back when something doesn't make sense
- When I say "analyze," I want data-driven analysis, not opinions
- Always consider second-order effects
```

### Template 3: The Research PM

You focus on user research, discovery, and validation.

```markdown
# CLAUDE.md

## Who I Am
- PM at [Company], growth-stage marketplace (2-sided: buyers + sellers)
- I own Discovery & Research for the Buyer experience
- Background in UX research before moving to PM

## My Product
- Online marketplace for [category]
- 100K monthly buyers, 5K active sellers
- Key metrics: search-to-purchase rate, buyer retention, GMV

## Research Context
- We do continuous discovery (Teresa Torres model)
- Interview 3-5 users per week
- Research repo in Notion (tag: #buyer-research)
- Current focus: Why do 40% of users abandon after first search?

## My Preferences
- Research findings format: Insight → Evidence → Implication → Recommendation
- Always distinguish between qualitative and quantitative evidence
- Use Jobs-to-be-Done framework for user needs
- Persona names: Sarah (power buyer), Mike (casual browser), Lisa (new user)
- Never assume — flag when you're inferring vs. when data supports

## Rules
- Never fabricate user quotes or research data
- When I share interview notes, extract insights — don't summarize
- Challenge whether my sample size supports the conclusion
- Always ask: "What would disprove this hypothesis?"
```

---

## Where to Put CLAUDE.md

CLAUDE.md works based on folder location. Here's how to think about it:

```
~/Documents/
  pm-work/                    ← Top-level CLAUDE.md (general PM context)
    CLAUDE.md                 ← "I'm a PM at Acme Corp, I don't code..."

    q1-planning/              ← Project-specific CLAUDE.md
      CLAUDE.md               ← "This project is about Q1 roadmap planning..."
      strategy-doc.md
      okrs.md

    payments-prd/             ← Another project-specific CLAUDE.md
      CLAUDE.md               ← "This PRD is for the new checkout flow..."
      research-notes.md
      competitor-analysis.md
```

**How it works:**
- Claude Code reads the CLAUDE.md in the folder where you start it
- If you start in `payments-prd/`, it reads that folder's CLAUDE.md
- You can have a general one at the top level and specific ones in subfolders

**Pro tip:** Start with one CLAUDE.md in your main work folder. Only create project-specific ones when a project has enough unique context to justify it.

---

## Common Mistakes

### Mistake 1: Making It Too Long

CLAUDE.md isn't a novel. Keep it under 100 lines. If you need more context, put detailed docs in separate files and reference them:

```markdown
## Key Documents
- Product strategy: @strategy-2026.md
- User personas: @personas.md
- Current sprint: @sprint-42-plan.md
```

### Mistake 2: Being Too Vague

**Bad:** "I work at a tech company and manage a product."
**Good:** "I'm a Senior PM at Stripe, managing the Invoicing product. 2,000 active customers, $4M ARR. Key metric: time-to-first-invoice."

The more specific you are, the better Claude Code's outputs match your reality.

### Mistake 3: Forgetting to Update It

Your CLAUDE.md should evolve. Update it when:
- You start a new quarter (new OKRs)
- You switch projects
- You learn a new preference ("actually, I prefer RICE over MoSCoW")
- Your team structure changes

### Mistake 4: Not Including "Rules"

The Rules section is the most powerful part. It prevents Claude Code from doing things you'll have to undo:
- "Never write code" prevents random code blocks in your PRDs
- "Ask clarifying questions first" prevents low-quality first drafts
- "Use our terminology" prevents generic language

---

## Exercise: Build Your Project Brain

**Time: 10 minutes**

1. Create a new folder: `mkdir ~/Documents/pm-workspace`
2. Navigate into it: `cd ~/Documents/pm-workspace`
3. Start Claude Code: `claude`
4. Tell Claude Code:

```
Create a CLAUDE.md file for me. I'm going to describe my role and
preferences, and I want you to turn it into a well-structured CLAUDE.md.

Ask me the following questions one at a time:
1. What's my role and company?
2. What product do I manage?
3. What tools do I use daily?
4. What are my formatting preferences?
5. What should you never do?
```

5. Answer the questions, and Claude Code will generate your personalized CLAUDE.md
6. Review it, ask Claude to adjust anything that's off
7. Start a new session (`/exit` then `claude`) and test it

**You now have a project brain that works for every future session.**

---

## What's Next?

Now that Claude Code has persistent memory through CLAUDE.md, the next lesson covers what happens *during* a session — specifically, how to manage context so Claude Code doesn't lose track of what you're working on.

**Next:** [Lesson 6: Context Management — Keeping Claude Code Sharp](/modules/module-0-claude-basics/LESSON-6-CONTEXT-MANAGEMENT.md)
