# Lesson 4: Sub-agents — Do 5 Things at Once

**Time:** 15 minutes | **Type:** Hands-on | **You'll practice:** Parallel research + multi-audience writing

---

## What You'll Learn

- What sub-agents are and how they work
- How to run parallel research tasks
- How to generate multiple versions of the same document simultaneously

---

## Concept (3 min read)

### The Problem

As a PM, you constantly need to do the same thing multiple times in parallel:
- Research 3 competitors
- Write the same update for 3 different audiences
- Analyze 4 different metrics

Doing these one at a time is slow and each result influences the next (bias creep).

### The Solution: Sub-agents

When you ask Claude to do multiple independent tasks, it can spin up **sub-agents** — parallel workers that each get their own clean context. They run simultaneously and don't contaminate each other.

**How it works:**
- You give Claude a task with multiple independent parts
- Claude automatically spawns sub-agents for each part
- Each sub-agent works independently with fresh context
- Results come back together

**You don't need special syntax.** Just ask for multiple things clearly and Claude will parallelize when it makes sense.

### Why This Matters for PMs

1. **Speed** — 3 competitors researched in the time of 1
2. **No bias** — Each sub-agent starts fresh, so Competitor A's analysis doesn't color Competitor B's
3. **Clean context** — Each gets only what it needs, so outputs are focused

---

## Exercise 1: Competitive Analysis Sprint (7 min)

### Step 1: Pick 3 competitors in your space

Think of 3 real companies that compete with your product. If you can't, pick 3 companies in any space you know well.

### Step 2: Ask Claude to research all 3 in parallel

In Claude Code, type:

```
Research these 3 competitors and create a comparison table:

1. [Competitor A]
2. [Competitor B]
3. [Competitor C]

For each competitor, find:
- What they do (1 sentence)
- Target audience
- Key differentiator vs. us
- Pricing model
- Biggest weakness

Research each one independently. Don't let one analysis influence another.
Then combine into a comparison table at the end.
```

### Step 3: Watch the execution

Notice how Claude handles this:
- It may spawn sub-agents (you'll see "Searching..." or "Researching..." for each)
- Each competitor analysis comes back independently
- The final table combines them

### Step 4: Save the output

Save the comparison table to `research/competitive-analysis.md`.

---

## Exercise 2: Multi-Stakeholder Comms (5 min)

### Step 1: Think of an announcement you need to make

Something like:
- A feature launch
- A timeline change
- A new partnership
- A process change

### Step 2: Ask Claude to draft 3 versions simultaneously

```
I need to announce [your announcement] to three audiences.
Draft all three in parallel — don't let one influence the others.

1. **Engineering team** — Focus on technical impact, migration steps, timeline.
   Tone: direct and detailed.

2. **Sales team** — Focus on customer-facing value, talking points, competitive advantage.
   Tone: enthusiastic and benefit-driven.

3. **Executive leadership** — Focus on business impact, metrics, strategic alignment.
   Tone: concise and data-driven. Max 100 words.
```

### Step 3: Compare the three versions

Each version should feel completely different:
- Engineering gets technical detail
- Sales gets customer benefit language
- Exec gets business impact in 100 words

If they all sound the same, your prompt wasn't specific enough about audience differences. Try again with more contrast in the instructions.

---

## Quick Reference

```
What:           Sub-agents = parallel workers with clean context
When to use:    Multiple independent tasks (research, comparisons, multi-audience)
How to trigger: Ask for multiple things clearly — Claude parallelizes automatically
Key benefit:    No bias creep between parallel tasks
PM use cases:   Competitive analysis, multi-stakeholder comms, metric analysis
```

---

## Checkpoint

- [ ] Ran a 3-competitor research analysis in parallel
- [ ] Saved competitive analysis to `research/`
- [ ] Drafted 3 versions of an announcement for different audiences
- [ ] Noticed how each version was tailored to its audience

**Next:** Lesson 5 — Skills (Reusable Slash Commands)
