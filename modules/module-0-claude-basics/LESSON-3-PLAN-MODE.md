# Lesson 3: Plan Mode — Think Before You Act

**Time:** 15 minutes | **Type:** Hands-on | **You'll practice:** Plan Mode on real PM tasks

---

## What You'll Learn

- What Plan Mode is and how to activate it
- When to use Plan Mode vs. just diving in
- The "Plan + Options" pattern for PM decision-making

---

## Concept (3 min read)

### The Problem

By default, Claude Code starts executing immediately. Ask for a PRD and it'll start writing one — without asking what kind of product, who the audience is, or what format you want. For simple tasks that's fine. For complex PM work, it leads to rework.

### The Solution: Plan Mode

Plan Mode makes Claude think before acting. Instead of writing a PRD, it first creates a plan: "Here's what I'm going to cover, here's the structure, here are the assumptions I'm making." You review the plan, adjust it, then let Claude execute.

**How to activate:**
- Type `/plan` at the start of your prompt
- Or press `Shift+Tab` to toggle Plan Mode on

### When to Use Plan Mode

| Use Plan Mode | Skip Plan Mode |
|---|---|
| Multi-section documents (PRDs, specs) | Quick questions ("what does MRR mean?") |
| Tasks with dependencies | Simple edits ("fix the typo in line 3") |
| High-stakes deliverables | Brainstorming / ideation |
| Anything you'd outline on paper first | One-paragraph outputs |

---

## Exercise 1: Plan Before You Build (7 min)

Let's practice the plan-first pattern right now. You'll experience the core workflow that Plan Mode automates.

### Step 1: Pick a real PM deliverable

Choose something you actually need to write soon:
- A PRD for an upcoming feature
- A go-to-market brief
- A sprint retrospective summary
- A competitive analysis

### Step 2: Ask for a plan (not the document)

Instead of asking Claude to write the deliverable directly, ask for a plan first:

```
I need to write a PRD for [your actual feature]. Don't write it yet — first, give me an outline: what sections you'd include, what assumptions you're making, and what questions you need answered.
```

**Don't give Claude any more detail yet.** Just the request for a plan.

### Step 3: Review the plan

Claude will respond with a structured outline. Read it critically:
- Is anything missing?
- Are the assumptions correct?
- Is the structure right for your audience?

### Step 4: Give feedback and iterate

Tell Claude what to change:
- "Add a section on success metrics"
- "The audience is engineering leads, not executives — adjust the depth"
- "Remove the competitive analysis section, that's a separate doc"

Let Claude revise the plan. When it looks right, say: "Now write it."

### Step 5: Compare

This is exactly what Plan Mode does automatically. You just experienced the pattern manually — plan first, critique, then execute.

When you use `/plan` or `Shift+Tab` on real tasks outside this course, Claude does this planning step for you automatically before executing.

---

## Exercise 2: Plan + Options Pattern (5 min)

This is the most useful PM pattern: force Claude to give you options instead of a single answer.

### Step 1: Think of a PM decision you're facing

Examples:
- "How should we handle user onboarding for the new feature?"
- "What's the best way to measure success for this initiative?"
- "How should we prioritize these 5 feature requests?"

### Step 2: Ask for 3 options

```
I need to decide [your decision]. Don't pick one for me — give me 3 different approaches.
For each approach, include:
- Description (2-3 sentences)
- Pros
- Cons
- Effort estimate
- Your recommendation and why
```

### Step 3: Pick one and go

Review the options. Pick the best one (or combine elements from multiple). Then tell Claude:

"Go with Option 2, but incorporate the measurement approach from Option 3."

This is how PMs should use AI — not to get ONE answer, but to see the decision space, then choose.

---

## Quick Reference

```
In this lesson:  We practiced the plan-first pattern manually
On real tasks:   Type /plan or press Shift+Tab to activate Plan Mode automatically
Best for:        Multi-section docs, complex tasks, high-stakes deliverables
Plan + Options:  "Give me 3 approaches with pros/cons/effort"
Skip for:        Quick questions, simple edits, brainstorming
```

---

## Checkpoint

- [ ] Asked Claude for a plan/outline before writing a document
- [ ] Reviewed and iterated on the plan — gave feedback
- [ ] Tried the Plan + Options pattern — got 3 approaches
- [ ] Experienced the difference between plan-first vs. dive-in

**Next:** Lesson 4 — Sub-agents
