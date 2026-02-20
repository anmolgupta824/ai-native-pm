# Lesson 7: Plan Mode — Think Before You Act

**Time:** 15 minutes | **Prerequisites:** Lesson 6 (Context Management) | **Cost:** Free

> When the task is complex, don't let Claude Code just start doing things. Make it think first.

---

## The Problem

You ask Claude Code:

```
I need a complete go-to-market plan for our new payments feature.
Include positioning, messaging, launch timeline, success metrics,
stakeholder communication plan, and rollback criteria.
```

Claude Code immediately starts writing. Five minutes later, you have a 2,000-word document that:
- Missed that your target audience is enterprise, not SMB
- Assumed a 2-week launch when you have 6 weeks
- Didn't include your legal team in stakeholder comms (they'll block the launch)
- Used generic success metrics instead of ones tied to your OKRs

Now you're spending 30 minutes revising — and burning context doing it.

**The problem: Claude Code defaults to action.** It sees a task, it starts doing it. For simple tasks, that's great. For complex tasks, it's a recipe for rework.

---

## The Solution: Plan Mode

Plan Mode tells Claude Code: **"Don't do anything yet. First, make a plan. Show me. Then I'll tell you to execute."**

It's like the difference between a junior PM who starts building a feature the moment it's mentioned, and a senior PM who says "Let me scope this first, identify dependencies, and come back with a plan."

### How to Activate Plan Mode

Type this at the beginning of your prompt:

```
/plan
```

Or use the keyboard shortcut: `Shift + Tab` to toggle between Plan Mode and regular mode.

When Plan Mode is active, Claude Code will:
1. Read your request
2. Think through the approach
3. Show you a step-by-step plan
4. Wait for your approval before doing anything

---

## Plan Mode in Action

### Example: Go-to-Market Plan

**Without Plan Mode (bad):**

```
Create a go-to-market plan for our new payments feature.
```

→ Claude immediately writes a generic GTM doc. You spend 30 minutes fixing it.

**With Plan Mode (good):**

```
/plan

I need a go-to-market plan for our new payments feature launching in 6 weeks.
Read @product-brief.md for context.
```

→ Claude responds with something like:

```
Here's my plan for creating the GTM document:

1. Read product-brief.md to understand the feature scope
2. Structure the GTM plan with these sections:
   - Target audience & positioning
   - Key messaging (by persona: buyer, finance team, admin)
   - Launch timeline (6-week countdown)
   - Channel strategy (email, in-app, blog, sales enablement)
   - Success metrics tied to Q1 OKRs
   - Stakeholder communication plan
   - Rollback criteria & risk mitigation
3. Save as go-to-market-payments.md

Should I proceed? Any sections to add or remove?
```

Now you can say:

```
Good, but add a section for legal review (they need 2 weeks lead time)
and change success metrics to focus on activation rate, not revenue.
Proceed.
```

→ Claude executes with your corrections baked in from the start. One draft, minimal revisions.

---

## When to Use Plan Mode

### Use Plan Mode When:

| Scenario | Why |
|----------|-----|
| **Multi-section documents** (GTM plans, strategy docs, PRDs) | Prevents missing sections or wrong assumptions |
| **Tasks with dependencies** ("update the roadmap, then email stakeholders") | Ensures the right order and nothing gets skipped |
| **Unfamiliar territory** ("analyze this dataset I've never seen") | Lets you course-correct before Claude goes deep |
| **High-stakes outputs** (board decks, exec emails, launch plans) | You want to review the approach before the output |
| **Multi-file operations** ("restructure the project documentation") | Shows you what will change before anything moves |

### Don't Use Plan Mode When:

| Scenario | Why |
|----------|-----|
| **Simple tasks** ("summarize this doc") | Overhead isn't worth it |
| **Single-file edits** ("add success metrics to this PRD") | Just do it, review after |
| **Quick questions** ("what's in this file?") | Plan mode would slow you down |
| **Tasks you've done before** (you know exactly what the output should look like) | Your prompt is clear enough |

**Rule of thumb:** If the task would take a senior PM more than 30 minutes manually, use Plan Mode.

---

## Advanced Plan Mode Patterns

### Pattern 1: Plan + Critique

Ask Claude to plan, then critique its own plan before executing:

```
/plan

I need a competitive analysis of [Competitor] vs our product.

After you make your plan, critique it:
- What might this analysis miss?
- What biases might it have?
- What would make it more useful for a VP audience?

Then show me the revised plan.
```

This produces a much stronger plan because Claude catches its own blind spots.

### Pattern 2: Plan + Options

Ask Claude to give you multiple approaches:

```
/plan

I need to present our Q2 roadmap to the executive team.

Give me 3 different approaches for structuring this presentation:
1. A narrative approach (story-driven)
2. A metrics-driven approach (data-first)
3. A problem-solution approach (pain points → our plan)

For each, outline the structure and who it works best for.
```

You pick the approach, then Claude executes the one you chose.

### Pattern 3: Plan + Scope Check

When you're unsure about scope, use Plan Mode to explore:

```
/plan

I've been asked to "improve our onboarding flow." Before I commit to a plan:

1. Read @current-onboarding-metrics.md
2. List everything that COULD be improved
3. Estimate effort for each (small/medium/large)
4. Recommend what to tackle first for maximum impact in 1 sprint

Don't write any docs yet — just the scoping analysis.
```

This is how senior PMs scope work before committing resources.

### Pattern 4: Plan + Dependencies

For tasks with ordering that matters:

```
/plan

I need to prepare for our product launch next Thursday. Plan the sequence:

1. What needs to happen first (blockers)?
2. What can happen in parallel?
3. What's the critical path?
4. What's the last responsible moment for each task?

Show me a dependency map, then I'll tell you which parts to help with.
```

---

## Plan Mode for Common PM Scenarios

### Scenario 1: Quarterly Planning

```
/plan

It's Q2 planning. I need to:
1. Review Q1 OKR results (data in @q1-okrs.md)
2. Draft Q2 OKRs based on company goals (@company-goals-2026.md)
3. Create a roadmap for my team (3 PMs, 12 engineers)
4. Write the planning deck for leadership review

Plan the sequence. What do you need from me before starting each step?
```

### Scenario 2: Incident Response

```
/plan

Our checkout completion rate dropped 25% since yesterday.
Read @checkout-metrics-daily.md for the data.

Plan a root cause analysis:
1. What data do we need to look at?
2. What are the most likely causes (rank by probability)?
3. What questions should I ask engineering?
4. Draft a stakeholder communication (but don't send — I'll review first)
```

### Scenario 3: New Feature Scoping

```
/plan

Product leadership wants us to add "team collaboration" to our product.
That's vague. Help me scope this:

1. What are the possible interpretations of "team collaboration"?
2. For each, what's the minimum viable scope?
3. What are the technical dependencies?
4. What should I push back on or ask for clarity on?

I need to go back to leadership with a scoping document, not a PRD.
```

---

## Exercise: Plan Before You Build

**Time: 10 minutes**

1. Start Claude Code in your pm-workspace folder
2. Activate Plan Mode: type `/plan`
3. Give it a complex task:

```
I'm launching a new feature in 4 weeks. I need:
- A 1-page feature brief for the eng team
- A launch communication plan
- Success metrics tied to company OKRs
- A risk register

The feature: [describe something relevant to your product]

Plan how you'd approach this. Give me 2 different strategies.
```

4. Review the plan Claude proposes
5. Pick one strategy and tell Claude to adjust it
6. When you're happy, say "Execute" and watch it build everything with your input already baked in

**Compare:** How does the output quality compare to just asking Claude to "write a feature brief"? The plan step should produce dramatically better first drafts.

---

## Key Takeaways

1. **Plan Mode = think before act** — Claude shows you the plan, you approve, then it executes
2. **Use it for complex tasks** — anything that would take >30 minutes manually
3. **Skip it for simple tasks** — don't over-engineer a quick question
4. **Combine with patterns** — Plan + Critique, Plan + Options, Plan + Scope Check
5. **It saves context** — one good plan + one execution beats 5 rounds of revision
6. **It's how senior PMs work** — scope first, build second

---

## What's Next?

Plan Mode helps you think through complex tasks before executing. Next, we'll learn about sub-agents — how to run multiple Claude tasks in parallel, like researching 5 competitors simultaneously.

**Next:** [Lesson 8: Sub-agents — Do 5 Things at Once](/modules/module-0-claude-basics/LESSON-8-SUB-AGENTS.md)
