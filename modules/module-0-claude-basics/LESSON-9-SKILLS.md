# Lesson 9: Skills — Your Reusable Slash Commands

**Time:** 20 minutes | **Prerequisites:** Lesson 8 (Sub-agents) | **Cost:** Free

> Type `/prd` and get a full PRD workflow. Type `/standup` and get your daily standup ready. That's the power of Skills.

---

## The Problem

Every Monday morning, you start Claude Code and type the same prompt:

```
I need to prepare for our daily standup. Read @sprint-board.md and
@yesterday-notes.md. Summarize what I completed yesterday, what I'm
working on today, and any blockers. Format it as 3 bullet points
under each heading. Keep it under 200 words. Use our team's format
from @standup-template.md.
```

It's a great prompt. It produces great output. But you type some version of it every single day.

Now imagine typing this instead:

```
/standup
```

Same output. One word.

**That's what Skills do.** They turn your best prompts into reusable slash commands.

---

## What Are Skills?

A Skill is a markdown file that contains instructions Claude Code follows when you type a slash command. Think of it as a saved prompt that you can trigger anytime with `/skill-name`.

Skills live in a special folder:

```
your-project/
  .claude/
    skills/
      standup/
        SKILL.md       ← Your skill file
      prd/
        SKILL.md       ← Another skill
      retro/
        SKILL.md       ← Another skill
```

When you type `/standup`, Claude Code reads `.claude/skills/standup/SKILL.md` and follows the instructions inside.

---

## Your First Skill: /standup

### Step 1: Create the Skill File

Start Claude Code and tell it:

```
Create a skill called "standup" that prepares my daily standup update.
It should:
1. Read my recent notes and sprint status
2. Summarize: yesterday's progress, today's plan, blockers
3. Format as 3 bullet points per section
4. Keep it under 200 words
```

Claude Code will create the file at `.claude/skills/standup/SKILL.md`.

Or create it manually. The file looks like this:

```markdown
---
name: standup
description: Generate daily standup update from sprint notes
---

## Daily Standup Generator

Read the following files for context:
- @sprint-board.md (current sprint status)
- Any files modified in the last 24 hours

Generate a standup update with these sections:

### Yesterday
- 3 bullet points of what was completed

### Today
- 3 bullet points of what's planned

### Blockers
- Any blockers or dependencies (or "None" if clear)

**Format rules:**
- Under 200 words total
- Bullet points only, no paragraphs
- Be specific — include ticket numbers, feature names, or metrics
- Tone: direct and factual (this is for a Slack async standup)
```

### Step 2: Use It

```
/standup
```

That's it. Claude Code reads the SKILL.md, follows the instructions, and generates your standup.

---

## Anatomy of a Skill File

Every skill file has two parts:

### 1. Frontmatter (the header)

```yaml
---
name: standup
description: Generate daily standup update from sprint notes
---
```

The frontmatter is YAML between `---` markers. Key fields:

| Field | Required? | What It Does |
|-------|-----------|-------------|
| `name` | No (defaults to folder name) | The slash command name (`/standup`) |
| `description` | Recommended | Tells Claude when to suggest this skill |
| `argument-hint` | No | Shows usage hint: `/prd [feature-name]` |
| `disable-model-invocation` | No | If `true`, only YOU can trigger it (Claude won't auto-suggest) |
| `allowed-tools` | No | Restrict which tools Claude can use during this skill |

### 2. Body (the instructions)

Everything after the frontmatter is markdown — your instructions to Claude. This is where you put:
- What files to read
- What to generate
- Formatting rules
- Constraints and preferences

---

## Skills Can Take Arguments

Want to generate a PRD for any feature? Pass the feature name as an argument:

```markdown
---
name: prd
description: Generate a PRD for a given feature
argument-hint: "[feature-name]"
---

## PRD Generator

Generate a Product Requirements Document for: **$ARGUMENTS**

Read @CLAUDE.md for my product context and preferences.

### PRD Structure:
1. **Problem Statement** — What user problem does this solve?
2. **Goals & Success Metrics** — How do we measure success? (include specific numbers)
3. **User Stories** — As a [user], I want [goal], so that [benefit]
4. **Scope** — What's in v1, what's out
5. **Technical Considerations** — Dependencies, constraints, risks
6. **Timeline** — Rough estimate (S/M/L/XL)
7. **Open Questions** — What still needs to be decided

### Rules:
- Ask me 3 clarifying questions before writing the full PRD
- Use our team's terminology from CLAUDE.md
- Include edge cases in each user story
- Save the output as `prd-[feature-name].md`
```

**Usage:**
```
/prd smart-notifications
```

Claude sees `$ARGUMENTS` replaced with "smart-notifications" and generates a PRD specifically for that feature.

**Argument placeholders:**
- `$ARGUMENTS` — everything after the slash command
- `$0`, `$1`, `$2` — individual arguments by position

---

## Skill Files Can Include Supporting Files

A skill isn't limited to one SKILL.md file. You can include templates, examples, and reference docs:

```
.claude/skills/prd/
  SKILL.md              ← Main instructions
  template.md           ← PRD template Claude fills in
  examples/
    good-prd.md         ← Example of a good PRD
    bad-prd.md          ← Example of a bad PRD (with annotations)
```

In your SKILL.md, reference them:

```markdown
Use the template in [template.md](template.md) as your starting structure.
Refer to [examples/good-prd.md](examples/good-prd.md) for quality benchmarks.
```

This is powerful — you're essentially giving Claude a style guide plus a template.

---

## 10 Skills Every PM Should Build

Here are practical skills tailored to PM workflows:

### 1. /standup — Daily Standup Update
Already covered above.

### 2. /prd — PRD Generator
Already covered above. Takes a feature name, generates a structured PRD.

### 3. /retro — Sprint Retrospective

```markdown
---
name: retro
description: Generate sprint retrospective from notes and data
---

## Sprint Retrospective Generator

Read recent sprint notes and any available metrics.

Generate a retrospective with:

### What went well
- 3-5 specific wins (reference actual features, tickets, or metrics)

### What didn't go well
- 3-5 specific issues (be honest, not generic)

### Action items
- 3 concrete, assignable actions with owners and due dates

### Sprint metrics
- Velocity vs. plan
- Carryover items
- Bug count

Keep it factual. No cheerleading, no blame.
```

### 4. /competitor — Competitive Analysis

```markdown
---
name: competitor
description: Quick competitive analysis for a given company
argument-hint: "[company-name]"
---

## Competitive Analysis: $ARGUMENTS

Research $ARGUMENTS and produce:

1. **Overview** — What they do, who they serve, company stage
2. **Product** — Key features, pricing, recent launches
3. **Strengths** — What they do better than us
4. **Weaknesses** — Where we have an advantage
5. **Threat level** — Low / Medium / High, with justification

Read @CLAUDE.md for our product context.
Keep it to 1 page. Use a comparison table where possible.
```

### 5. /one-pager — Feature One-Pager

```markdown
---
name: one-pager
description: Generate a feature one-pager for stakeholder review
argument-hint: "[feature-name]"
---

## Feature One-Pager: $ARGUMENTS

Before writing, ask me 3 key questions about the feature.

Then generate a one-pager with:
- **Problem** (2-3 sentences)
- **Proposed Solution** (2-3 sentences)
- **User Impact** (who benefits and how)
- **Success Metrics** (2-3 specific, measurable)
- **Effort Estimate** (S/M/L/XL with justification)
- **Risks & Mitigations** (top 2-3)
- **Open Questions** (what still needs answers)

One page maximum. Executive audience.
```

### 6. /status — Weekly Status Report

```markdown
---
name: status
description: Generate weekly status report from notes and files
---

## Weekly Status Report

Read any recent notes, PRDs, or sprint data in this folder.

Generate a status report:

**TL;DR** (3 bullets, 1 sentence each)

**Shipped this week:**
- What went live or was completed

**In progress:**
- What's being worked on, expected completion

**Risks & blockers:**
- Anything at risk, needs attention, or is blocked

**Next week:**
- Top 3 priorities

Format for Slack (short, scannable, no walls of text).
Under 300 words.
```

### 7. /user-story — Generate User Stories

```markdown
---
name: user-story
description: Generate user stories with acceptance criteria from a feature description
argument-hint: "[feature-description]"
---

## User Story Generator

Feature: $ARGUMENTS

Generate 3-5 user stories in this format:

**As a** [user type]
**I want** [goal]
**So that** [benefit]

**Acceptance Criteria:**
- Given [context], When [action], Then [expected result]
- Include at least 2 edge cases per story

**Story Points:** Estimate using Fibonacci (1, 2, 3, 5, 8, 13)

Read @CLAUDE.md for our user personas and team conventions.
```

### 8. /meeting-prep — Pre-Meeting Brief

```markdown
---
name: meeting-prep
description: Generate a pre-meeting preparation brief
argument-hint: "[meeting-topic]"
---

## Meeting Prep: $ARGUMENTS

Generate a preparation brief:

1. **Context** — What's this meeting about? What led to it?
2. **Key Questions** — 5 questions I should be ready to answer
3. **Talking Points** — 3-5 points I should make
4. **Data to Have Ready** — What numbers or docs should I bring?
5. **Potential Pushback** — What objections might come up and how to handle them
6. **Desired Outcome** — What does success look like for this meeting?

Read any relevant files in this folder for context.
```

### 9. /metrics — Metrics Narrative

```markdown
---
name: metrics
description: Turn raw metrics data into a narrative summary
---

## Metrics Narrative Generator

Read any CSV, spreadsheet, or data files in this folder.

Generate a metrics narrative:

1. **Headline** — One sentence summary of what the data shows
2. **Key Metrics** — Top 5 metrics with current value, trend (up/down/flat), and context
3. **What's Working** — Metrics trending positively
4. **What Needs Attention** — Metrics trending negatively or below target
5. **Recommended Actions** — 2-3 specific actions based on the data

Use specific numbers. Never say "increased significantly" — say "increased 14% WoW."
```

### 10. /launch-checklist — Go-to-Market Checklist

```markdown
---
name: launch-checklist
description: Generate a launch checklist for a feature release
argument-hint: "[feature-name]"
---

## Launch Checklist: $ARGUMENTS

Generate a pre-launch checklist:

### 2 Weeks Before
- [ ] PRD finalized and signed off
- [ ] QA test plan created
- [ ] Customer communication drafted
- [ ] Support team briefed
- [ ] Rollback plan documented

### 1 Week Before
- [ ] Feature flagged and tested in staging
- [ ] Metrics dashboards set up
- [ ] Release notes drafted
- [ ] Internal announcement prepared

### Launch Day
- [ ] Feature flag enabled (% rollout plan)
- [ ] Monitoring dashboards live
- [ ] Support team on alert
- [ ] External announcement published

### 1 Week After
- [ ] Metrics review vs. success criteria
- [ ] Bug report summary
- [ ] User feedback collected
- [ ] Retro scheduled

Customize this based on the feature scope from @CLAUDE.md context.
```

---

## Personal vs. Project Skills

Skills can live in two places:

| Location | Scope | When to Use |
|----------|-------|-------------|
| `~/.claude/skills/` | All your projects | Personal skills (your standup format, your preferences) |
| `.claude/skills/` (in project folder) | This project only | Project-specific skills (team conventions, product context) |

**Example setup:**
```
~/.claude/skills/                    ← Personal (follows you everywhere)
  standup/SKILL.md                   ← Your standup format
  meeting-prep/SKILL.md              ← Your meeting prep style

~/Documents/payments-project/
  .claude/skills/                    ← Project-specific
    prd/SKILL.md                     ← PRD template for payments team
    user-story/SKILL.md              ← Story format for this team
```

---

## Exercise: Build Your First 3 Skills

**Time: 15 minutes**

1. Start Claude Code in your pm-workspace folder
2. Ask Claude to create 3 skills:

```
Create 3 skills for me in .claude/skills/:

1. /standup — generates my daily standup (3 bullets each for
   yesterday, today, blockers)

2. /one-pager — generates a feature one-pager for any feature
   I name (takes feature name as argument)

3. /status — generates my weekly status report (shipped,
   in progress, risks, next week)

Read @CLAUDE.md for my preferences and context.
```

3. Test each one:
```
/standup
/one-pager smart-notifications
/status
```

4. Customize: read the SKILL.md files Claude created, tweak the instructions to match your exact preferences

**You now have reusable PM workflows that run with one command.**

---

## Key Takeaways

1. **Skills = saved prompts as slash commands** — type `/prd` instead of a 10-line prompt
2. **SKILL.md in `.claude/skills/skill-name/`** — markdown with YAML frontmatter
3. **Arguments with `$ARGUMENTS`** — `/prd smart-notifications` passes the feature name
4. **Supporting files** — include templates, examples, and reference docs alongside SKILL.md
5. **Personal vs project** — `~/.claude/skills/` for you, `.claude/skills/` for the project
6. **Build skills for tasks you repeat** — standup, PRD, status report, retro, competitor analysis

---

## What's Next?

Skills let you trigger workflows manually. Hooks take it further — they trigger automatically when certain things happen. Next, we'll learn how to automate actions that should always occur.

**Next:** [Lesson 10: Hooks — Automate the Boring Stuff](/modules/module-0-claude-basics/LESSON-10-HOOKS.md)
