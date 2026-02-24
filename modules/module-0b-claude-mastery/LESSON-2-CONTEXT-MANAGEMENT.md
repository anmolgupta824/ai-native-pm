# Lesson 2: Context Management — Keeping Claude Sharp

**Time:** 15 minutes | **Type:** Hands-on | **You'll build:** A CRAFT prompt + session plan

---

## What You'll Learn

- Why Claude gets worse the longer you chat (context rot)
- The CRAFT framework for writing prompts that produce great output
- How to plan multi-session PM workflows

---

## Concept (3 min read)

### The Problem: Context Rot

Claude Code has a ~200,000 token context window. Think of it as a whiteboard. Every message you send, every file Claude reads, every response it generates — all goes on the whiteboard. When it fills up, Claude starts "forgetting" earlier context. Your PRD draft from 30 minutes ago? Claude might contradict it now.

### Three Rules That Fix This

1. **One task per session.** Don't write a PRD, then pivot to sprint planning, then ask for a status update — all in one session. Each task gets a fresh session.
2. **Front-load context.** Put the most important info in your first message, not buried 10 messages deep.
3. **Know when to start fresh.** If Claude's outputs start getting repetitive, contradictory, or generic — close the session and start a new one.

### The CRAFT Framework

Structure every important prompt with:

- **C**ontext — What's the situation?
- **R**ole — Who should Claude be?
- **A**ction — What exactly should it do?
- **F**ormat — How should the output look?
- **T**one — What voice should it use?

---

## Exercise 1: CRAFT a Real Prompt (7 min)

### Step 1: Think of a prompt you'd actually use at work

Examples:
- "Write a stakeholder update email"
- "Summarize last sprint's wins and misses"
- "Create talking points for my roadmap review"

Write down the BAD version first — the way you'd naturally type it. Something like: "write me a stakeholder update"

### Step 2: Rewrite it using CRAFT

Transform your bad prompt. Here's an example:

**Bad prompt:**
> "Write a stakeholder update"

**CRAFT prompt:**
> **Context:** We just shipped the checkout redesign (Project Phoenix). Conversion rate went from 2.1% to 3.4% in the first week. We're now starting Phase 2 (mobile optimization).
>
> **Role:** You're a Senior PM writing to VP-level stakeholders who care about business impact, not technical details.
>
> **Action:** Write a 4-paragraph stakeholder update covering: what shipped, results so far, what's next, and what we need from leadership.
>
> **Format:** Email format. Use bold for key metrics. Keep it under 200 words.
>
> **Tone:** Confident but not salesy. Data-driven.

### Step 3: Test both versions

Send the BAD prompt first. Then send the CRAFT version and compare the outputs.

Compare the outputs. The CRAFT version should be dramatically more useful.

### Step 4: Save your CRAFT prompt

Save your CRAFT prompt so you can reuse it later:

Save your CRAFT prompt as `prompts/stakeholder-update.md` (or whatever task it was for). You'll build a library over time.

---

## Exercise 2: Plan a Multi-Session Workflow (5 min)

### Step 1: Pick a real PM task that takes more than 30 minutes

Examples:
- "Prepare for quarterly planning"
- "Write a feature spec from scratch"
- "Conduct competitive analysis for Board deck"

### Step 2: Break it into 3 sessions

For each session, define:
- **Goal:** What's the one deliverable?
- **Context to provide:** What does Claude need to know?
- **Output:** What file/document will you save?

Example for "Prepare for quarterly planning":

```
Session 1: Analyze last quarter
- Goal: Summary of Q1 metrics and wins/misses
- Context: Share Q1 dashboard data, team retro notes
- Output: q1-review.md

Session 2: Draft Q2 priorities
- Goal: Ranked list of Q2 initiatives
- Context: Share q1-review.md, company OKRs, stakeholder feedback
- Output: q2-priorities.md

Session 3: Build the roadmap
- Goal: Visual roadmap with timelines
- Context: Share q2-priorities.md, team capacity
- Output: q2-roadmap.md
```

### Step 3: Save your session plan

Save this as `prompts/session-plan-template.md`. Use this pattern for any multi-day PM task.

---

## Quick Reference

```
Context rot:       Claude gets worse as conversation gets longer
Fix:               One task per session, front-load context, start fresh when output degrades
CRAFT:             Context → Role → Action → Format → Tone
Session planning:  Break big tasks into 1-deliverable sessions
Files created:     prompts/
```

---

## Checkpoint

- [ ] Wrote one BAD prompt and one CRAFT prompt for the same task
- [ ] Compared outputs — saw the quality difference
- [ ] Saved your CRAFT prompt to `prompts/`
- [ ] Planned a 3-session workflow for a real PM task

**Next:** Lesson 3 — Plan Mode
