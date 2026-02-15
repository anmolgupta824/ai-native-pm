# How I Write Production-Ready PRDs in 45 Minutes with AI (Step-by-Step)

**Published on:** Medium
**SEO Keywords:** PRD template, product requirements document AI, how to write a PRD with AI
**Tags:** Product Management, PRD, Artificial Intelligence, Product Requirements, Tutorial
**Read time:** 9 minutes
**CTA Target:** Module 1 → ai-native-pm.vercel.app

---

Last quarter, I spent six hours writing a PRD for a payment reconciliation feature at Careem. Six hours of staring at a blank document, tabbing between user research notes, referencing our product strategy, and trying to remember every edge case my engineering lead brought up in last week's sync.

The PRD went into review. Three days later, it came back with 14 comments. My QA lead found four edge cases I had missed entirely. My VP of Product wanted a different success metric framework. My engineering counterpart pointed out a technical constraint that invalidated one of my proposed approaches.

Two more days of revisions. Another review cycle. By the time we had a document the team could build against, we had burned nearly two weeks of calendar time.

This was not a bad PRD. It was a normal PRD, written the normal way. And that is the problem.

I now write PRDs in about 45 minutes that go into review cycles with one round of minor edits. The documents are more thorough, the edge cases are covered, and the metrics are tighter. Here is exactly how I do it, and how you can do it starting today.

## The AI-Partnership Approach

The first thing to understand is that this is not about telling AI to "write a PRD" and accepting whatever comes out. That approach produces generic, surface-level documents that no engineering team wants to build from.

The method I use is what I call an AI-partnership approach: **think first, generate second.** I spend most of my time in the exploration and questioning phase, and a fraction of the time in the actual writing phase. The AI handles information synthesis and document structure. I handle judgment, prioritization, and domain expertise.

Here is how the time breaks down:

**Traditional approach (4-8 hours):**
- Research and context gathering: 1-2 hours
- Writing first draft: 2-3 hours
- Self-review and revision: 1-2 hours
- Edge case discovery during review: happens after the fact
- Additional revision cycles: 1-3 hours

**AI-partnership approach (45-60 minutes):**
- Context loading: 2 minutes
- Socratic exploration: 15 minutes
- Approach generation: 10 minutes
- PRD generation: 5 minutes
- Multi-perspective review: 10 minutes
- Validation and polish: 3 minutes

The total word count and document quality are comparable. What changes is where the thinking happens. In the traditional approach, you discover gaps during review -- after you have already invested hours in writing. In the AI-partnership approach, you discover gaps before a single line of the PRD is written.

## The Four Core Techniques

This method relies on four techniques. None of them are complicated, but they work together as a system.

### 1. Full Context Loading

Before you ask AI to help with anything, you give it the complete picture. In Claude Code, this means using @-mentions to point at specific files:

```
@product-strategy-2026.md @user-research-notifications.md @tech-architecture.md
I need to write a PRD for an in-app notifications center.
```

Those three @-mentions load the full contents of those files as context. The AI now understands your strategic priorities, what users actually said in interviews, and what your technical architecture can support.

This is the step that makes everything downstream better. Without full context, every AI-generated document is a guess. With full context, it is an informed draft. I have a folder on my machine called `context/` in every project directory, and it contains the five to eight documents that define the product area I am working on. Loading context takes me about two minutes.

### 2. Socratic Questioning

This is the technique that most PMs skip, and it is the one that saves the most revision cycles later.

Instead of jumping straight to "write the PRD," you ask the AI to question you first. It asks hard, pointed questions across five categories:

**Problem Clarity:** "Who exactly experiences this problem? How do you know? What data supports the claim that this is worth solving?"

**Solution Validation:** "What alternatives did you consider? Why is this approach better than the next best option? What would you cut if you had half the timeline?"

**Success Criteria:** "What metric will tell you this shipped successfully? What is the baseline? What improvement makes this worth the engineering investment?"

**Constraints:** "What technical limitations exist? Are there regulatory requirements? What dependencies does this create for other teams?"

**Strategic Fit:** "How does this ladder up to the company's current priorities? What are you choosing not to build by building this?"

When I built the PRD for our notifications center, the Socratic phase surfaced three critical insights I had missed: we had a regulatory requirement around notification consent for certain transaction types, our push notification infrastructure had a rate limit that would affect the rollout plan, and our user research showed that 40% of users had notifications disabled at the OS level, which changed our entire channel strategy.

Each of those would have become a review comment and a revision cycle. Instead, they became inputs to the first draft.

### 3. Multiple Approaches

Before generating the PRD, I ask the AI to propose three different approaches to the problem. Not just "option A vs. option B" -- but genuinely different strategies with different tradeoffs.

For the notifications center, the three approaches were:

**Approach A: Full in-app notification center.** Custom UI, full notification history, granular preferences. High effort (3 months), high value, serves all user segments.

**Approach B: Progressive enhancement.** Start with transaction notifications only, add channels over time. Medium effort (6 weeks), fast to market, validates demand before full investment.

**Approach C: API-first.** Build the notification infrastructure as an internal API, let individual teams send notifications through it. Medium effort, high reusability, but slower to deliver visible user value.

We went with Approach B. But having the three options side by side -- with estimated timelines, resource needs, and risk profiles -- made the trade-off conversation with my engineering lead and VP a 10-minute discussion instead of a 45-minute debate. The context was already structured.

### 4. Multi-Perspective Review

After the PRD is drafted, I run it through four simulated perspectives before any human reviewer sees it:

**Engineering Lead perspective:** Flags technical feasibility issues, missing API specifications, unclear data models, and unrealistic performance requirements.

**VP Product perspective:** Challenges strategic alignment, questions prioritization, pushes on impact sizing, and asks whether this is the highest-value use of the team's time.

**UX Researcher perspective:** Identifies assumptions about user behavior that lack evidence, flags accessibility concerns, and questions whether the proposed solution matches observed user mental models.

**QA Lead perspective:** Surfaces edge cases, error states, boundary conditions, and regression risks. Asks what happens when the network drops mid-transaction, when a user has zero notification history, or when two notifications arrive simultaneously.

The QA perspective alone typically finds five to eight edge cases that would have survived into the review cycle. Each edge case caught before review saves a comment-response-revision loop that adds half a day to the process.

## Full Walkthrough: The In-App Notifications Center

Let me walk through the actual sequence for the notifications PRD, step by step.

**Step 1: Context Loading (2 minutes)**

I opened Claude Code in my project directory and loaded three documents:

```
@context/product-strategy-q1.md @context/user-research-engagement.md @context/technical-architecture.md
I need to write a PRD for an in-app notifications center for Careem Pay.
Let's start with the exploration phase.
```

**Step 2: Socratic Exploration (15 minutes)**

Claude Code asked me 15 questions across the five categories. Here are some of the ones that shaped the document:

- "Your user research mentions low engagement with email notifications. What is the current open rate, and do you have data on whether users prefer in-app vs. push vs. email?"
- "Your strategy doc prioritizes transaction trust. How does a notifications center contribute to trust specifically, beyond general engagement?"
- "What consent framework applies to financial notifications in your operating markets? Are there markets where opt-in is required vs. opt-out?"

I answered each one. Some answers were precise ("email open rate is 12%, push is 34%"). Some were honest admissions ("I do not have data on in-app notification preferences -- that is an assumption we need to validate"). Those honest answers became "open questions" in the final PRD rather than unstated assumptions, which my VP appreciated.

**Step 3: Approach Generation (10 minutes)**

Based on my answers, Claude Code proposed three approaches with different scope, timeline, and risk profiles. I read through them, asked follow-up questions about the progressive enhancement approach, and confirmed that was the direction I wanted.

**Step 4: PRD Generation (5 minutes)**

Claude Code generated the full PRD, written directly to a file in my project directory. The document included problem statement, user stories, success metrics (with baselines and targets), technical requirements, rollout plan, edge cases, and open questions.

I did not dictate the structure. The context from my strategy doc, the answers from the Socratic phase, and the chosen approach gave it enough information to produce a coherent first draft.

**Step 5: Multi-Perspective Review (10 minutes)**

I ran the document through all four perspectives. The notable findings:

- Engineering flagged that our current notification queue could not handle the projected volume at peak times and recommended a separate queue for financial notifications.
- UX Research flagged that we had no data on how users categorize notifications mentally, and suggested a card sort study before finalizing the notification taxonomy.
- QA found seven edge cases, including: what happens when a notification references a transaction that the user has disputed? Does the notification update, disappear, or stay with a stale status?

Each finding was specific and actionable. I incorporated them into the document.

**Step 6: Validation (3 minutes)**

I ran a final validation check that scored the PRD across completeness dimensions: problem definition, user stories, success metrics, technical requirements, edge cases, rollout plan, and open questions. The score came back at 87%. The gap was in the rollout plan section -- I had not specified the rollback criteria clearly enough. I added two sentences and moved on.

Total elapsed time: approximately 50 minutes.

## Common Mistakes to Avoid

After teaching this approach to a handful of PMs on my team and in my network, I have seen the same mistakes come up repeatedly:

**Generating before thinking.** The most common mistake is typing "write me a PRD for X" as the first prompt. Without the Socratic questioning phase, the output lacks the nuance of your specific context. The AI does not know what it does not know. The questioning phase is where you surface the unknowns.

**Accepting vague metrics.** If your PRD says "increase engagement," that is not a metric. Push for specifics: what engagement metric? What is the baseline? What target makes this worth building? What is the measurement methodology? AI will default to vague metrics unless you push it toward specifics during the exploration phase.

**Skipping the challenge step.** When Claude Code proposes an approach, your instinct might be to accept the first thing that sounds reasonable. Push back. Ask "what is wrong with this approach?" and "what would the strongest argument against this be?" The AI will generate counterarguments that strengthen your thinking.

**Treating AI output as final.** The 45-minute number is for a strong first draft. You should still read every line. You should still check that the metrics are grounded in reality. You should still validate that the technical requirements are feasible with your engineering lead. AI handles the synthesis. You own the judgment.

## Try It Yourself

I packaged this entire workflow into a free, hands-on module. It is not a course about theory -- it is a set of tools you install on your machine and use with Claude Code.

The PRD Generator gives you the four techniques described above, plus templates, validation scoring, and the multi-perspective review framework. Module 0 (Claude Code setup) takes 20 minutes. Module 1 (the PRD Generator) takes another 30 minutes to install and run through your first document.

Start here: [ai-native-pm.vercel.app](https://ai-native-pm.vercel.app)

The best way to evaluate this is to try it on a real PRD you need to write this week. Not a toy example -- a real feature your team is building. That is when you will feel the difference.

---

*Anmol Gupta is a Product Manager at Careem (Uber), leading Payments & Fintech. Previously at Visa and RAENA. MBA from Nanyang Business School, B.Tech CS from NIT Warangal. Based in Dubai, UAE. He writes about practical AI workflows for product managers at The AI-Native PM.*
