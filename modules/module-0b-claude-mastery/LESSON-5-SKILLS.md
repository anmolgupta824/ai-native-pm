# Lesson 5: Skills — Reusable Slash Commands

**Time:** 20 minutes | **Type:** Hands-on | **You'll build:** 3 working slash commands

---

## What You'll Learn

- What Skills are and how they work
- How to create a SKILL.md file
- How to pass arguments to skills (e.g., `/prd checkout-redesign`)

---

## Concept (3 min read)

### The Problem

You type the same prompts every day:
- "Give me a standup update based on what we did yesterday"
- "Write a PRD for [feature]"
- "Create a sprint retro summary"

Every time, you re-type the instructions, the format, the rules. It's the PM equivalent of copy-pasting boilerplate.

### The Solution: Skills

Skills are saved prompts that become slash commands. Create a file, and you can type `/standup` instead of writing a 10-line prompt every morning.

**How Skills work:**
1. Create a folder: `.claude/skills/[skill-name]/`
2. Inside, create `SKILL.md` with your prompt
3. Type `/skill-name` in Claude Code — it runs the prompt

**Skills can take arguments:** `/prd checkout-redesign` passes "checkout-redesign" to the skill as `$ARGUMENTS`.

> **Included files:** The complete SKILL.md files for this lesson are in this module's `skills/` folder. You can copy them directly to your workspace, or type them out for practice.

---

## Exercise 1: Build Your /standup Skill (7 min)

### Step 1: Create the skills folder

```bash
mkdir -p .claude/skills/standup
```

### Step 2: Create the SKILL.md file

Create `.claude/skills/standup/SKILL.md` with the content below, or copy it from this module's `skills/standup/SKILL.md`.

```markdown
---
name: standup
description: Generate daily standup update
---

Generate my daily standup update using this format:

**Yesterday:**
- List what was completed or progressed

**Today:**
- List what I plan to work on

**Blockers:**
- List any blockers or dependencies (or "None" if clear)

Keep each section to 3-5 bullet points max.
Use specific, concrete language — not vague statements like "worked on stuff."
Reference actual feature names, ticket numbers, or deliverables where possible.

Look at any recent files I've edited or created to figure out what I worked on.
```

> **Source file:** [`skills/standup/SKILL.md`](./skills/standup/SKILL.md)

### Step 3: Test it

In Claude Code, type:

```
/standup
```

Claude should generate a standup based on your recent activity. If your workspace is new, it might say there's no recent activity — that's fine, the skill works.

---

## Exercise 2: Build /prd with Arguments (7 min)

### Step 1: Create the skill folder

```bash
mkdir -p .claude/skills/prd
```

### Step 2: Create the SKILL.md with arguments

Create `.claude/skills/prd/SKILL.md` with the content below, or copy it from this module's `skills/prd/SKILL.md`.

```markdown
---
name: prd
description: Start a PRD workflow for a feature
argument-hint: feature name (e.g., "checkout redesign")
---

I need to write a PRD for: $ARGUMENTS

Before writing anything, ask me these questions one at a time:

1. Who is the target user for this feature?
2. What problem does it solve?
3. What does success look like? (metrics)
4. Are there any technical constraints I should know about?
5. What's the timeline?

After I answer all 5, write the PRD with these sections:
- Overview (2-3 sentences)
- Problem Statement
- Target Users
- Requirements (must-have vs nice-to-have)
- Success Metrics
- Timeline & Milestones
- Open Questions

Format as markdown. Use bullet points, not paragraphs.
```

> **Source file:** [`skills/prd/SKILL.md`](./skills/prd/SKILL.md)

### Step 3: Test it with a real feature

```
/prd checkout-redesign
```

Or use any real feature you're working on. Claude should ask you the 5 questions before writing — because that's what the skill says to do.

---

## Exercise 3: Build a Custom Skill (3 min)

### Step 1: Think of something YOU do every day

What prompt do you type repeatedly? Some ideas:
- `/status` — Generate a status report
- `/retro` — Sprint retrospective template
- `/meeting-prep` — Prepare talking points for a meeting
- `/competitor` — Quick competitive brief on a company
- `/one-pager` — Write a feature one-pager

### Step 2: Create it

```bash
mkdir -p .claude/skills/[your-skill-name]
```

Write the SKILL.md following the same pattern:
- YAML frontmatter with name, description, and optional argument-hint
- Clear instructions for what Claude should do
- The format you want the output in

### Step 3: Test it

Type `/[your-skill-name]` and verify it works.

---

## Quick Reference

```
Skill location:    .claude/skills/[name]/SKILL.md
Activate:          /[name] in Claude Code
Arguments:         Use $ARGUMENTS in the skill body
                   User types: /prd checkout-redesign
                   $ARGUMENTS becomes: checkout-redesign
Frontmatter:       name, description, argument-hint (all optional but recommended)
Personal skills:   ~/.claude/skills/ (available in all projects)
Project skills:    .claude/skills/ (only in this project)
Module skills:     All skills from this lesson are in skills/ in this module folder
```

---

## Checkpoint

- [ ] `/standup` skill created and tested
- [ ] `/prd` skill created with argument support and tested
- [ ] One custom skill created for YOUR workflow
- [ ] All 3 skills live in `.claude/skills/`

**Next:** Lesson 6 — Hooks (Automate the Boring Stuff)
