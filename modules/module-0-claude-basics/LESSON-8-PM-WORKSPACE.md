# Lesson 8: Building Your PM Workspace — Capstone

**Time:** 30 minutes | **Type:** Hands-on | **You'll build:** Your complete AI-powered PM command center

---

## What You'll Learn

- How to wire together everything from Lessons 1-7 into a daily workflow
- How to organize your workspace for long-term PM use
- How to map your weekly PM tasks to skills and commands

---

## Concept (2 min read)

Over the past 7 lessons, you've built individual pieces:
- **CLAUDE.md** — Your project brain (Lesson 1)
- **CRAFT prompts** — Better prompt structure (Lesson 2)
- **Plan Mode** — Think before acting (Lesson 3)
- **Sub-agents** — Parallel work (Lesson 4)
- **Skills** — /standup, /prd, and a custom command (Lesson 5)
- **Hooks** — Reminders, file protection, notifications (Lesson 6)
- **Prompting patterns** — Socratic, Role Stacking, 3-Draft (Lesson 7)

Now we wire them together into a **complete workspace** you'll use every day. By the end of this lesson, you'll be able to:
- Type `/standup` Monday morning and get your update
- Type `/prd feature-x` and get guided through a full PRD
- Have sprint context automatically loaded at every session
- Have files protected and notifications set up

Let's build it.

---

## Exercise 1: Verify Your Foundation (5 min)

### Step 1: Check your workspace structure

Run this to see what you've built so far:

Check your current directory — you should have:
- `CLAUDE.md` (from Lesson 1)
- `.claude/skills/standup/` (from Lesson 5)
- `.claude/skills/prd/` (from Lesson 5)
- `.claude/skills/[your custom skill]/` (from Lesson 5)
- `.claude/settings.json` (from Lesson 6)

> **Quick fix:** If any skill files are missing, copy them from this module's `skills/` folder.

### Step 2: Fill any gaps

If anything is missing, go back and create it. This capstone builds on everything.

---

## Exercise 2: Add More Skills (5 min)

You have 3 skills from Lesson 5. Let's add 2 more that round out the daily workflow.

### /retro — Sprint Retrospective

```bash
mkdir -p .claude/skills/retro
```

Create `.claude/skills/retro/SKILL.md` with the content below, or copy it from this module's `skills/retro/SKILL.md`.

```markdown
---
name: retro
description: Generate sprint retrospective
argument-hint: sprint number (e.g., "14")
---

Generate a sprint retrospective for Sprint $ARGUMENTS.

Format:

## Sprint $ARGUMENTS Retrospective

### What went well
- (3-5 items)

### What didn't go well
- (3-5 items)

### Action items
- (2-3 specific, assignable actions with owners)

### Key metrics
- Velocity: [planned vs actual]
- Bugs shipped: [count]
- Cycle time: [average]

Base this on any project files, recent activity, and sprint goals.
Be honest — don't sugarcoat the "didn't go well" section.
```

> **Source file:** [`skills/retro/SKILL.md`](./skills/retro/SKILL.md)

### /status — Weekly Status Report

```bash
mkdir -p .claude/skills/status
```

Create `.claude/skills/status/SKILL.md` with the content below, or copy it from this module's `skills/status/SKILL.md`.

```markdown
---
name: status
description: Generate weekly status report
---

Generate my weekly status report:

## Weekly Status — [Today's Date]

### Highlights (top 3 wins this week)
1.
2.
3.

### In Progress
- [List active work items with % complete estimates]

### Risks & Blockers
- [List any risks, blockers, or dependencies]

### Next Week
- [Top 3 priorities for next week]

### Metrics Update
- [Key metrics from CLAUDE.md, current vs target]

Keep it concise. Each section should be 3-5 items max.
Reference sprint goals from sprint-goals.md if available.
```

> **Source file:** [`skills/status/SKILL.md`](./skills/status/SKILL.md)

### Test both

```
/retro 14
/status
```

---

## Exercise 3: Refine Your Hooks (5 min)

### Step 1: Review your current settings.json

Open `.claude/settings.json` and make sure it has all 3 hooks from Lesson 6.

### Step 2: Add an auto-format hook

Add this hook to your PreToolUse section — it reminds Claude to use your preferred format:

```json
{
  "matcher": "Write",
  "command": "echo '📝 FORMAT REMINDER: Use bullet points, not paragraphs. Keep sections under 5 items. Use bold for headers.'"
}
```

Customize this to match YOUR preferences from your CLAUDE.md.

### Step 3: Verify the complete settings.json

Your final `settings.json` should look something like:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Task",
        "command": "cat sprint-goals.md 2>/dev/null || echo 'No sprint goals set'"
      },
      {
        "matcher": "Edit|Write",
        "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"CLAUDE.md\"; then echo \"❌ BLOCKED: Cannot edit CLAUDE.md\" && exit 2; fi'"
      },
      {
        "matcher": "Write",
        "command": "echo '📝 FORMAT: Bullet points, not paragraphs. Max 5 items per section.'"
      }
    ],
    "Stop": [
      {
        "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"' 2>/dev/null; echo done"
      }
    ]
  }
}
```

---

## Exercise 4: Create PM Templates (5 min)

### Step 1: Create a templates folder

```bash
mkdir -p templates
```

### Step 2: Create a PRD template

Create `templates/prd-template.md`:

```markdown
# PRD: [Feature Name]

**Author:** [Name] | **Date:** [Date] | **Status:** Draft

## Overview
[2-3 sentence summary]

## Problem Statement
[What user problem are we solving?]

## Target Users
[Who is this for?]

## Requirements

### Must-Have
- [ ]

### Nice-to-Have
- [ ]

### Out of Scope
- [ ]

## Success Metrics
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
|        |         |        |          |

## Timeline & Milestones
| Milestone | Date | Owner |
|-----------|------|-------|
|           |      |       |

## Open Questions
-
```

### Step 3: Create a one-pager template

Create `templates/one-pager-template.md`:

```markdown
# [Feature Name] — One-Pager

**Author:** [Name] | **Date:** [Date]

## The Problem (2-3 sentences)


## The Solution (2-3 sentences)


## Key Metrics
-

## Effort Estimate


## Risks
-

## Decision Needed
[What do you need stakeholders to decide?]
```

### Step 4: Update your CLAUDE.md

Add a line to your CLAUDE.md so Claude knows about templates:

```markdown
## My Templates
- PRD template: templates/prd-template.md
- One-pager template: templates/one-pager-template.md
- When I ask for a PRD or one-pager, start from these templates
```

---

## Exercise 5: Full Workflow Test (5 min)

Time to test everything together in your current session.

### Test 1: Context

Ask: "What product am I working on and what's our current sprint focus?"

Claude should pull from CLAUDE.md and sprint-goals.md.

### Test 2: Skills

Run: `/standup`

You should get a formatted standup update.

### Test 3: PRD Skill

Run: `/prd [a real feature name]`

Claude should ask you questions (Socratic method built into the skill) before writing.

### Test 4: Notification

Run: `/status`

When Claude finishes, you should get a desktop notification.

### Test 5: File Protection

Ask: "Add a new section to my CLAUDE.md"

It should be blocked by your hook.

If all 5 tests pass — congratulations, your workspace is fully operational.

---

## Exercise 6: Map Your Weekly Workflow (3 min)

### Create a workflow cheat sheet

Create `workflow.md`:

```markdown
# My Weekly PM Workflow

## Monday
- `/standup` — Generate standup update
- Review sprint-goals.md, update if needed

## Tuesday-Thursday
- `/prd [feature]` — For any new features
- Use Plan Mode for complex docs
- Use Role Stacking to review your own work

## Friday
- `/status` — Generate weekly status report
- `/retro [sprint]` — If sprint ends this week

## Ad-Hoc
- `/competitor [company]` — Quick competitive analysis
- Use sub-agents for multi-stakeholder comms
- Use 3-Draft Method for important emails/announcements
```

Customize this to YOUR actual weekly rhythm.

---

## Your Complete Workspace

```
your-workspace/
  CLAUDE.md                         ← Your project brain
  sprint-goals.md                   ← Current sprint context
  workflow.md                       ← Your weekly cheat sheet
  .claude/
    settings.json                   ← Hooks (reminder, protect, format, notify)
    skills/
      standup/SKILL.md              ← /standup
      prd/SKILL.md                  ← /prd [feature]
      retro/SKILL.md                ← /retro [sprint]
      status/SKILL.md               ← /status
      [your-custom]/SKILL.md        ← Your custom skill
  templates/
    prd-template.md                 ← PRD template
    one-pager-template.md           ← One-pager template
  prompts/
    stakeholder-update.md           ← Saved CRAFT prompts (from Lesson 2)
    session-plan-template.md        ← Session planning template
  research/
    competitive-analysis.md         ← Competitive research (from Lesson 4)
```

---

## Checkpoint

- [ ] All skills working: /standup, /prd, /retro, /status, + custom
- [ ] All hooks working: reminder, file protection, format, notification
- [ ] Templates created and referenced in CLAUDE.md
- [ ] Full workflow test passed (all 5 tests)
- [ ] Weekly workflow mapped to your actual schedule

---

## You're Done! 🎉

You've gone from "I can use Claude Code" to having a complete AI-powered PM workspace.

**What you built:**
- A CLAUDE.md that gives Claude persistent memory of your product, team, and preferences
- 5+ reusable slash commands for daily PM tasks
- Automated hooks for reminders, file protection, and notifications
- Templates for PRDs and one-pagers
- A weekly workflow that maps every PM task to a skill or pattern

**What's next?**
- [Module 1: PRD Generator](../module-1-prd/) — A dedicated MCP server for generating production-ready PRDs
- [Module 2: Image Generation](../module-2-image-gen/) — Product mockups, presentation visuals, and social media assets
- [Module 3: MCP Automation](../module-3-mcp-course/) — Connect Claude to Jira, Google Drive, Sheets, and Figma
