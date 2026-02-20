# Lesson 8: Sub-agents — Do 5 Things at Once

**Time:** 15 minutes | **Prerequisites:** Lesson 7 (Plan Mode) | **Cost:** Free

> Why do one thing at a time when Claude Code can run 5 tasks in parallel?

---

## The Problem

You're doing a competitive analysis. You need to research 5 competitors. The old way:

```
Tell me about Competitor A's pricing and features.
[wait 2 minutes, read response]

Now tell me about Competitor B's pricing and features.
[wait 2 minutes, read response]

Now Competitor C...
[wait 2 minutes]

Now D...
[wait 2 minutes]

Now E...
[wait 2 minutes]
```

That's 10+ minutes of sequential work. Plus, by the time you get to Competitor E, you've used up a chunk of your context window on Competitors A through D.

**What if Claude Code could research all 5 simultaneously?**

---

## The Solution: Sub-agents

Sub-agents are independent Claude Code workers that run in parallel. Think of them as interns you can dispatch simultaneously:

- "Intern 1 — go research Competitor A"
- "Intern 2 — go research Competitor B"
- "Intern 3 — go research Competitor C"

They all work at the same time. When they're done, they report back to you. You get 5 results in the time it takes to get 1.

### How It Works

When you give Claude Code a task that has independent parts, it can automatically spawn sub-agents. You can also explicitly ask for it:

```
Research these 5 competitors in parallel. For each one, find:
- Pricing model
- Key features
- Target audience
- Recent product launches (last 6 months)
- Strengths and weaknesses vs our product

Competitors: Stripe, Square, Adyen, PayPal, Braintree

Run these as parallel research tasks and compile the results
into a single comparison table.
```

Claude Code will:
1. Spawn 5 sub-agents (one per competitor)
2. Each agent researches independently
3. Results come back to the main conversation
4. Claude compiles everything into your comparison table

**Result:** 5 competitor profiles in ~3 minutes instead of 15.

---

## Why Sub-agents Matter for PMs

Sub-agents aren't just faster — they're **smarter** for PM work because:

### 1. Each Sub-agent Gets a Clean Context

Remember context rot from Lesson 6? When you research 5 competitors sequentially, each response eats into your context window. By Competitor 5, Claude is working with a crowded whiteboard.

With sub-agents, each competitor gets its own clean context. Competitor 5 gets the same quality as Competitor 1.

### 2. Parallel Tasks = Time Savings

| Task | Sequential | With Sub-agents |
|------|-----------|----------------|
| Research 5 competitors | 10-15 min | 3-4 min |
| Analyze 3 user interview transcripts | 15 min | 5 min |
| Generate PRD + launch plan + stakeholder email | 20 min | 7 min |
| Review 4 quarterly reports for trends | 20 min | 6 min |

### 3. Independent Analysis = Less Bias

When you research competitors sequentially, the analysis of Competitor B is unconsciously influenced by what Claude just wrote about Competitor A. With sub-agents, each analysis is independent — no cross-contamination.

---

## PM Use Cases for Sub-agents

### Use Case 1: Competitive Analysis

```
I need a competitive landscape analysis. Research these companies in parallel:

1. [Competitor A] — focus on enterprise features and pricing
2. [Competitor B] — focus on developer experience and API
3. [Competitor C] — focus on market positioning and recent funding
4. [Competitor D] — focus on customer reviews and pain points

For each, create a 1-page brief. Then compile into a comparison matrix.
```

### Use Case 2: Multi-Stakeholder Communication

```
I need to communicate our Q2 roadmap to 3 different audiences.
Read @q2-roadmap.md first.

Generate these 3 documents in parallel:
1. Executive summary for the VP team (focus on business impact, 1 page)
2. Technical brief for engineering leads (focus on dependencies and timelines)
3. Customer-facing changelog preview for the marketing team (focus on user value)

Each should be tailored to its audience — don't just change the tone,
change the content emphasis.
```

### Use Case 3: User Research Synthesis

```
I have 4 user interview transcripts. Analyze them in parallel:

1. @interview-sarah.md — extract key pain points and feature requests
2. @interview-mike.md — extract key pain points and feature requests
3. @interview-lisa.md — extract key pain points and feature requests
4. @interview-david.md — extract key pain points and feature requests

Then synthesize across all 4:
- Common themes (mentioned by 2+ users)
- Unique insights (mentioned by only 1 but high-impact)
- Contradictions between users
- Recommended priority actions
```

### Use Case 4: Sprint Planning Prep

```
Sprint planning is tomorrow. I need 3 things prepared in parallel:

1. Sprint velocity analysis — read @sprint-history.md, calculate average
   velocity, flag if we're trending up or down
2. Backlog grooming — read @backlog.md, identify the top 10 items by
   RICE score, flag any that are missing acceptance criteria
3. Dependency check — read @team-dependencies.md, identify any blocked
   items that need cross-team coordination

Compile into a sprint planning prep doc.
```

### Use Case 5: Market Opportunity Assessment

```
We're considering expanding into 3 new markets. Assess each in parallel:

1. Healthcare — TAM, regulatory barriers, competitor landscape,
   time-to-market estimate
2. Education — TAM, procurement cycles, competitor landscape,
   time-to-market estimate
3. Government — TAM, compliance requirements, competitor landscape,
   time-to-market estimate

Produce a comparison matrix with a recommendation on which to pursue first.
```

---

## Tips for Getting the Most Out of Sub-agents

### Tip 1: Be Specific About What Each Agent Should Do

**Bad:**
```
Research our competitors.
```

**Good:**
```
Research these 4 competitors in parallel. For EACH one:
- Pricing (plans, per-user cost, enterprise pricing)
- Top 3 features we don't have
- Top 3 features we have that they don't
- Most recent product launch
- One key weakness from user reviews
```

The more specific the task, the better each sub-agent performs.

### Tip 2: Define the Output Format Upfront

```
For each competitor, structure your findings as:

## [Competitor Name]
**Pricing:** [summary]
**We lack:** [3 features]
**We lead:** [3 features]
**Recent launch:** [description]
**Weakness:** [from reviews]
```

This ensures all sub-agent outputs are consistent and easy to compile.

### Tip 3: Don't Use Sub-agents for Connected Tasks

Sub-agents work on **independent** tasks. If Task B depends on the output of Task A, they can't run in parallel.

**Good for sub-agents (independent):**
- Research 5 different competitors
- Analyze 4 separate interview transcripts
- Write 3 communications for different audiences

**Bad for sub-agents (dependent):**
- "Analyze data, THEN write recommendations based on the analysis"
- "Read the PRD, THEN generate user stories from it"
- "Research the market, THEN create a strategy based on findings"

For dependent tasks, use them sequentially. For independent tasks, go parallel.

### Tip 4: Use Sub-agents + Plan Mode Together

The power combo:

```
/plan

I need a full product launch package for [feature]. Plan it out:
- Which parts can be done in parallel (sub-agents)?
- Which parts need to be sequential?
- What's the most efficient execution order?
```

Claude will plan the work, identify what can be parallelized, and execute efficiently.

---

## Exercise: Parallel Research Sprint

**Time: 10 minutes**

1. Start Claude Code in your pm-workspace folder
2. Pick 3-4 companies in your industry
3. Run this prompt:

```
Research these companies in parallel: [Company A], [Company B],
[Company C], [Company D]

For each, find:
- What they do (1 sentence)
- Who they serve (target audience)
- Pricing model
- One thing they do better than everyone else
- One obvious weakness

Output as a comparison table, then give me your recommendation
on which is the biggest threat and why.
```

4. Time it — note how long the parallel research takes
5. Compare: imagine asking about each company one at a time

---

## Key Takeaways

1. **Sub-agents = parallel workers** — multiple tasks running simultaneously
2. **Each gets clean context** — no context rot across tasks
3. **Best for independent tasks** — competitor research, multi-stakeholder comms, interview synthesis
4. **Be specific** — define what each agent should do and the output format
5. **Don't parallelize dependent tasks** — if B needs A's output, run them sequentially
6. **Combine with Plan Mode** — plan first, then Claude identifies what to parallelize

---

## What's Next?

You've learned how to think before acting (Plan Mode) and do multiple things at once (Sub-agents). Next, we'll learn about Skills — how to create reusable slash commands that turn complex workflows into one-liners.

**Next:** [Lesson 9: Skills — Your Reusable Slash Commands](/modules/module-0-claude-basics/LESSON-9-SKILLS.md)
