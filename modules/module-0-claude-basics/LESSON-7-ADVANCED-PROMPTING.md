# Lesson 7: Advanced Prompting Patterns

**Time:** 20 minutes | **Type:** Hands-on | **You'll practice:** 3 patterns on real PM work

---

## What You'll Learn

- Three high-impact prompting patterns every PM should know
- How to get Claude to ask YOU questions before writing (Socratic Method)
- How to get multi-perspective feedback in one prompt (Role Stacking)
- How to produce polished output fast (3-Draft Method)

---

## Concept (3 min read)

### Why This Matters

Most PMs use Claude like a search engine: "write me a PRD." And they get a generic PRD back.

The difference between a mediocre output and a great one isn't the AI — it's the prompt pattern. Here are the three patterns that have the biggest impact on PM work:

**Pattern 1: Socratic Method** — Claude asks YOU questions before writing. Result: output based on real context, not guesses.

**Pattern 2: Role Stacking** — Claude reviews work from multiple perspectives (PM, engineer, designer, customer). Result: catches blind spots you'd miss.

**Pattern 3: 3-Draft Method** — First draft → critique → final draft. Result: polished output in minutes, not hours.

There are more patterns (CRAFT from Lesson 2, Constraint Escalation, Anti-Patterns, Comparative Analysis), but these three move the needle most. Master these, then explore the rest.

---

## Exercise 1: Socratic Method (5 min)

### The Pattern

Instead of: "Write a PRD for feature X"
Use: "I need a PRD for feature X. Before writing anything, ask me 5-7 questions to understand the requirements."

### Step 1: See the pattern in action — the /prd skill

Open [`skills/prd/SKILL.md`](./skills/prd/SKILL.md) in this module. Notice how it uses the Socratic pattern — it tells Claude: "Before writing anything, ask me these questions one at a time."

This is the Socratic Method baked into a reusable skill.

### Step 2: Test it

Type `/prd [a real feature you're working on]` and experience Claude asking you questions before writing.

Answer each question from your real experience. Don't make things up — use this as an actual working session.

### Step 3: Apply the pattern to something new

Now use the same pattern for a different task — not a PRD, but something else. In Claude Code, type:

```
I need to write a stakeholder update about [your topic].

Don't write anything yet. First, ask me 5-7 questions that will help you write a better update. Ask them one at a time — wait for my answer before asking the next one.

Focus on questions about: audience, key metrics, what shipped, what's next, and what you need from leadership.
```

### Step 4: Compare

After answering all questions, say: "Now write the update based on my answers."

Compare this output to what you'd get from "write a stakeholder update" with no questions. Night and day.

---

## Exercise 2: Role Stacking (5 min)

### The Pattern

Ask Claude to review a document from multiple perspectives in one prompt. Each "role" catches different problems.

### Step 1: Pick a PM artifact to review

Use something you've already written — a PRD, email, feature spec, or even the feature brief from Exercise 1.

### Step 2: Ask for multi-perspective review

```
Review this document from three different perspectives. For each, list what's good, what's missing, and what's confusing.

**As a Senior Engineer:**
Focus on technical feasibility, missing edge cases, unclear requirements, and implementation questions.

**As a Designer:**
Focus on user experience gaps, accessibility concerns, missing user flows, and unclear interaction patterns.

**As the Customer:**
Focus on whether this solves a real pain point, what's confusing, what's missing from their perspective, and whether they'd actually use this.

Here's the document:
[paste your artifact]
```

### Step 3: Review the feedback

Each perspective should surface different issues:
- Engineer catches technical gaps
- Designer catches UX blind spots
- Customer catches "nobody asked for this" problems

Save the best feedback and use it to improve your document.

---

## Exercise 3: 3-Draft Method (5 min)

### The Pattern

Three rounds: draft → critique → polish. Faster than writing one "perfect" draft.

### Step 1: Pick something to write

Something short:
- A product update email
- An executive summary
- A Slack announcement for a launch

### Step 2: Ask for Draft 1

```
Write a [type of document] about [topic]. This is Draft 1 — don't try to be perfect, just get the structure and key points right.
```

### Step 3: Ask Claude to critique it

```
Now critique Draft 1. Be brutal. What's weak? What's missing? What would a VP read and think "this isn't ready"? List the top 5 issues.
```

### Step 4: Ask for the final draft

```
Now write Draft 2 that fixes all 5 issues. This is the final version.
```

**Why this works:** Writing and critiquing use different parts of the brain (even an AI brain). Splitting them produces better output than trying to be perfect in one pass.

---

## Exercise 4: Explore More Patterns (2 min)

Here's a reference table of all patterns. You've already used CRAFT (Lesson 2) and the three above. Try 1-2 more on your own when you need them:

| Pattern | What It Does | Best For |
|---|---|---|
| **CRAFT** | Structure: Context, Role, Action, Format, Tone | Any important prompt |
| **Socratic** | Claude asks YOU before writing | PRDs, specs, briefs |
| **Role Stacking** | Review from multiple perspectives | Document reviews, feedback |
| **3-Draft** | Draft → critique → polish | Emails, updates, summaries |
| **Constraint Escalation** | Start tight, loosen gradually | Scope definition |
| **Anti-Patterns** | Tell Claude what NOT to do | Avoiding generic output |
| **Comparative Analysis** | Force 3 options, then pick one | Decision-making |

---

## Quick Reference

```
Socratic:          "Ask me 5-7 questions before writing. One at a time."
Role Stacking:     "Review from [role 1], [role 2], [role 3] perspectives"
3-Draft:           Draft 1 → "Critique brutally" → Draft 2 (final)
When to combine:   Socratic first → write → Role Stack review → 3-Draft polish
```

---

## Checkpoint

- [ ] Used Socratic Method — Claude asked questions before writing
- [ ] Used Role Stacking — got feedback from 3 perspectives
- [ ] Used 3-Draft Method — draft → critique → final
- [ ] Saved best prompts to `prompts/`

**Next:** Lesson 8 — Building Your PM Workspace (Capstone)
