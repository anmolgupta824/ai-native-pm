# Lesson 6: Context Management — Keeping Claude Code Sharp

**Time:** 15 minutes | **Prerequisites:** Lesson 5 (CLAUDE.md) | **Cost:** Free

> The longer your conversation, the worse Claude Code gets. Here's how to stay sharp.

---

## The Problem: Context Rot

You've been working with Claude Code for 45 minutes. The first PRD it generated was amazing. But now you're on your third task, and something feels off:

- It's forgetting instructions you gave earlier
- It's repeating suggestions you already rejected
- The quality of output has dropped noticeably
- It's confusing details from Task 1 with Task 2

This is **context rot** — and every PM using Claude Code hits it eventually.

### Why Does This Happen?

Claude Code has a limited "working memory" called a context window. Think of it like a whiteboard:

- At the start of a session, the whiteboard is clean
- Every message you send, every file it reads, every response it gives — all gets written on the whiteboard
- Eventually, the whiteboard fills up
- When it's full, older content gets pushed off the edge
- Claude Code literally forgets the beginning of your conversation

**This isn't a bug. It's how all AI models work today.** The key is learning to work *with* this constraint, not against it.

---

## How Big Is the Whiteboard?

Claude Code's context window is roughly 200,000 tokens. That sounds like a lot, but it fills up fast:

| Action | Tokens Used (Approximate) |
|--------|--------------------------|
| Your CLAUDE.md file | 500-1,000 |
| Reading a 5-page document | 2,000-4,000 |
| A detailed prompt from you | 200-500 |
| A long Claude response (PRD draft) | 1,500-3,000 |
| Reading a large spreadsheet | 5,000-15,000 |
| 30-min back-and-forth conversation | 20,000-50,000 |

So in a typical session, you might use 50-80% of your context just from normal conversation. And the more files you load, the faster it fills.

---

## The 5 Rules of Context Management

### Rule 1: One Task Per Session

The single most effective thing you can do.

**Bad session:**
```
Session 1 (90 minutes):
→ Write a PRD for checkout flow
→ Analyze competitor pricing pages
→ Draft sprint planning email
→ Create user story acceptance criteria
→ Review last quarter's OKRs
```

By task 3, Claude Code is mixing up checkout flow details with competitor data.

**Good sessions:**
```
Session 1 (20 min): Write PRD for checkout flow
Session 2 (15 min): Analyze competitor pricing
Session 3 (10 min): Draft sprint planning email
Session 4 (15 min): Create user story acceptance criteria
Session 5 (10 min): Review OKRs
```

Each session starts clean. CLAUDE.md loads your context automatically. No rot.

**When to use this rule:** Always, unless your tasks are tightly connected (e.g., "write a PRD then generate acceptance criteria from that PRD").

### Rule 2: Front-Load Your Context

Claude Code pays the most attention to what it reads first. Put the important stuff at the top.

**Bad prompt ordering:**
```
1. "Hey, can you help me with something?"
2. "So basically we have this feature..."
3. "Oh wait, let me also mention..."
4. "Actually, here's the real constraint..."
5. "And the most important thing is..."
```

By message 5, the "most important thing" is competing with 4 messages of fluff.

**Good prompt ordering:**
```
"I need a PRD for [feature]. Here's what matters most:

1. CONSTRAINT: Must ship in 2 weeks (hard deadline)
2. CONTEXT: @product-strategy.md has our Q1 goals
3. SCOPE: Only the checkout flow, not the full payment system
4. AUDIENCE: The engineering team (they'll build from this)

Now write the PRD."
```

The important constraints come first. Claude Code won't lose them.

### Rule 3: Use @-Mentions Instead of Copy-Pasting

When you paste a document into the chat, it takes up context and never leaves. When you @-mention a file, Claude Code reads it more efficiently.

**Bad:**
```
Here's our product strategy document:
[pastes 3,000 words]

Now write a PRD based on this.
```

**Good:**
```
Read @product-strategy.md and write a PRD for the checkout flow
improvement described in Section 3.
```

Same result, less context wasted. Plus, Claude Code can re-read the file if needed later.

### Rule 4: Summarize Before Switching Tasks

If you must do two tasks in one session, summarize before switching:

```
Great, the PRD looks good. Before we move on, let me summarize
where we are:

✅ PRD for checkout flow is complete (saved to checkout-prd.md)
✅ Key decisions: Stripe integration, 2-week timeline, mobile-first

Now, separate task: I need help with competitor analysis.
Forget everything about the checkout PRD — focus only on competitors.
```

This explicit "mental reset" helps Claude Code prioritize the new task.

### Rule 5: Know When to Start Fresh

These are signs you need a new session:

- Claude Code repeats something you already discussed
- It references the wrong document or task
- Quality of responses has noticeably dropped
- You've been going for 40+ minutes on complex tasks
- You're starting a new, unrelated task
- Claude Code says "as I mentioned earlier" but gets it wrong

**How to start fresh:**
1. Type `/exit` to end the session
2. Make sure your output files are saved
3. Start a new session with `claude`
4. CLAUDE.md reloads automatically — you don't lose your base context

---

## Prompt Structuring for Better Outputs

Context management isn't just about session length. It's also about how you write prompts. Better prompts = better use of your context budget.

### The CRAFT Framework

Use this for any substantial prompt:

**C** — Context: What's the background?
**R** — Role: Who should Claude Code be?
**A** — Action: What specifically should it do?
**F** — Format: How should the output look?
**T** — Tone: What's the communication style?

**Example — bad prompt:**
```
Write me a stakeholder update about the checkout project.
```

**Example — CRAFT prompt:**
```
CONTEXT: We're 1 week into a 3-week sprint building a new checkout flow.
We're on track. One risk: Stripe API rate limits might cause issues at
scale. @sprint-42-status.md has the latest numbers.

ROLE: You're writing this as me (Senior PM, Payments team).

ACTION: Write a stakeholder update email covering progress, risks, and
next week's plan.

FORMAT:
- Subject line
- 3 bullet summary at top
- Detailed sections: Progress | Risks | Next Week | Asks
- Under 400 words

TONE: Confident but transparent. Executive audience (VP+).
```

This prompt uses ~150 tokens. The output will be dramatically better than the vague version, and you'll spend less context on back-and-forth revisions.

### The "Before You Write" Pattern

For complex documents, don't let Claude Code write immediately. This is the Socratic questioning approach:

```
I need a PRD for [feature]. But before you write anything:

1. Read @product-strategy.md and @user-research-q4.md
2. Ask me every question you'd need answered to write a
   production-ready PRD
3. Don't write the PRD until we've covered scope, edge cases,
   success metrics, and dependencies

Let's start with your questions.
```

This prevents a bad first draft that wastes 3,000 tokens of context, followed by 5 rounds of revision that waste 10,000 more.

---

## Session Planning Cheat Sheet

Before you start Claude Code, spend 30 seconds planning:

| Question | Why It Matters |
|----------|---------------|
| What's my ONE goal for this session? | Prevents context rot from task switching |
| Which files does Claude need to read? | Front-load with @-mentions |
| What are my key constraints? | Put these in the first prompt |
| How long will this take? | If >30 min, plan to split into 2 sessions |
| Where should the output be saved? | Tell Claude the filename upfront |

### Quick Planning Template

```
SESSION GOAL: [One clear goal]
INPUT FILES: @file1.md, @file2.md
KEY CONSTRAINTS: [Budget, timeline, audience, format]
OUTPUT: Save to [filename.md]
```

Paste this as your first message. Claude Code has everything it needs.

---

## Exercise: The Two-Session Challenge

**Time: 15 minutes**

### Session 1 (8 minutes): Write a One-Pager

1. Start Claude Code in your pm-workspace folder
2. Send this prompt:

```
Read @CLAUDE.md for my context.

I need a one-pager for a feature called "Smart Notifications."
The idea: instead of sending users every notification, use their
behavior patterns to only send notifications they're likely to act on.

Before writing, ask me 5 key questions about scope, audience, and
success metrics.
```

3. Answer the questions
4. Let Claude generate the one-pager
5. Save it: "Save this as smart-notifications-one-pager.md"
6. Exit: `/exit`

### Session 2 (7 minutes): Create Acceptance Criteria

1. Start a fresh session: `claude`
2. Send this prompt:

```
Read @smart-notifications-one-pager.md

Generate 5 user stories with acceptance criteria (Given/When/Then)
for the Smart Notifications feature described in this doc.
```

3. Notice how the quality is just as high as Session 1 — because you started fresh and Claude Code read the saved output instead of relying on memory from a long conversation

**That's context management in action: save outputs as files, start fresh sessions, let CLAUDE.md handle the persistent context.**

---

## Key Takeaways

1. **Context rot is real** — the longer you chat, the worse outputs get
2. **One task per session** — the simplest fix for the biggest problem
3. **Front-load context** — put constraints and key info first
4. **Use @-mentions** — more efficient than pasting content
5. **Start fresh often** — CLAUDE.md means you don't lose context between sessions
6. **CRAFT your prompts** — Context, Role, Action, Format, Tone
7. **Save outputs as files** — they become inputs for the next session

---

## What's Next?

You know how to give Claude Code persistent memory (CLAUDE.md) and manage context within sessions. Next, we'll learn about Plan Mode — a special mode for complex tasks where you want Claude Code to think before acting.

**Next:** [Lesson 7: Plan Mode — Think Before You Act](/modules/module-0-claude-basics/LESSON-7-PLAN-MODE.md)
