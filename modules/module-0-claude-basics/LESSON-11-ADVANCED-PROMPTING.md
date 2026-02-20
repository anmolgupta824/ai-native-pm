# Lesson 11: Advanced Prompting Patterns

**Time:** 20 minutes | **Prerequisites:** Lesson 6 (Context Management) | **Cost:** Free

> The difference between a mediocre PRD and a great one isn't Claude — it's the prompt you gave it.

---

## Why Prompting Matters More Than You Think

Most PMs use Claude Code like this:

```
Write me a PRD for a notifications feature.
```

Then they spend 30 minutes fixing the output. Wrong audience, wrong scope, missing metrics, generic language.

Advanced PMs use Claude Code like this — and get it right the first time:

```
CONTEXT: We're a B2B invoicing platform (2,000 customers, $4M ARR).
Our activation rate dropped from 68% to 52% because new users don't
set up their first invoice within 7 days.

ROLE: Write this as me — Senior PM, Payments team. Audience is our
engineering team (they'll build from this PRD).

TASK: Write a PRD for a "Smart Onboarding" feature that guides new
users through their first invoice with contextual nudges.

CONSTRAINTS:
- Must ship in 1 sprint (2 weeks)
- No changes to the billing system
- Must be measurable: target 68% activation within 30 days of launch
- Engineering resources: 2 backend, 1 frontend, 1 QA

FORMAT: Use our standard PRD template from @prd-template.md
```

Same request. Dramatically better output. Zero revision time.

The rest of this lesson teaches you the patterns that make this happen.

---

## Pattern 1: The CRAFT Framework

We introduced this in Lesson 6. Here's the deep dive.

**C** — Context (background information)
**R** — Role (who Claude should be, who the audience is)
**A** — Action (the specific task)
**F** — Format (how the output should look)
**T** — Tone (communication style)

### Example: Board Update

**Basic prompt:**
```
Write a board update about our Q1 progress.
```

**CRAFT prompt:**
```
CONTEXT: Q1 ended last week. We hit 2 of 3 OKRs.
OKR 1 (Activation): Hit 68% target ✅
OKR 2 (Revenue): Missed by 12% — churned 3 enterprise clients ❌
OKR 3 (NPS): Exceeded — 72 vs 65 target ✅
Read @q1-results.md for detailed metrics.

ROLE: Write as the VP of Product to the Board of Directors.

ACTION: Write a quarterly board update covering results,
learnings, and Q2 plan.

FORMAT:
- Executive summary (3 bullets)
- OKR results table
- What worked / What didn't (2-3 bullets each)
- Q2 priorities (top 3)
- Key risks
- Under 800 words

TONE: Confident but transparent. Don't sugarcoat the revenue miss.
Board members respect honesty over spin.
```

---

## Pattern 2: The Socratic Method (Ask Before You Write)

Instead of letting Claude write immediately, force it to ask questions first. This prevents bad first drafts.

```
I need a competitive analysis of [Company X].

But before you write anything:
1. Ask me 5 questions you'd need answered to write a thorough analysis
2. Tell me what assumptions you're making so I can correct them
3. Suggest what framework would work best for this analysis

Don't write the analysis until I've answered your questions.
```

**Why this works:** Claude's first draft quality improves dramatically when it has answers to its own questions. It's the difference between a PM who starts writing immediately and one who does discovery first.

### PM Scenarios for Socratic Method

**PRD writing:**
```
I need a PRD for [feature]. Before writing:
1. What questions would a Staff PM ask before writing this?
2. What scope ambiguities do you see?
3. What technical dependencies should I check with engineering?
```

**Strategy doc:**
```
I want to create a product strategy for [area]. Before writing:
1. What market data would you want to see?
2. What competitive dynamics should we consider?
3. What internal constraints should I tell you about?
```

**Stakeholder email:**
```
I need to email the VP about [topic]. Before writing:
1. What does a VP typically care about in this situation?
2. What context would make this email more effective?
3. What's the one thing I should NOT include?
```

---

## Pattern 3: Role Stacking

Give Claude multiple perspectives by stacking roles:

```
I've drafted a PRD for our new checkout flow. Read @checkout-prd.md.

Now review it from 3 perspectives:

1. AS THE ENGINEERING LEAD: Is this buildable in 2 sprints?
   What's unclear? What technical risks are missing?

2. AS THE DESIGN LEAD: Does the user flow make sense?
   What usability issues do you see? What's missing from the UX?

3. AS THE VP OF PRODUCT: Does this align with our Q2 goals?
   Is the business case strong enough? What would you push back on?

For each perspective, give 3 strengths and 3 concerns.
```

This produces richer feedback than a single-perspective review because Claude explicitly considers different stakeholder concerns.

### PM Scenarios for Role Stacking

**Before a launch:**
```
Review our launch plan from the perspective of:
1. Customer Support (what will users complain about?)
2. Marketing (what's the best angle to promote this?)
3. Legal (what compliance risks exist?)
```

**Before a meeting:**
```
I'm presenting this roadmap. Challenge it from the perspective of:
1. The CEO (is this ambitious enough?)
2. The CTO (is this technically feasible?)
3. The CFO (what's the ROI?)
```

---

## Pattern 4: Chain of Thought (Show Your Work)

Ask Claude to explain its reasoning, not just give answers. This helps you catch flawed logic.

```
We need to decide whether to build or buy an email notification system.

Don't just give me a recommendation. Walk me through your reasoning:

1. What are the key factors in this decision?
2. For each factor, score Build vs Buy (1-10)
3. What assumptions are you making?
4. Where could you be wrong?
5. NOW give your recommendation with a confidence level (low/medium/high)
```

**Why this works for PMs:** When you share the analysis with stakeholders, you need to defend the reasoning. If Claude just says "Build it," you can't explain why. If Claude shows the full analysis, you can present it confidently.

---

## Pattern 5: Constraint Escalation

Start with tight constraints, then selectively loosen them:

```
ROUND 1:
Write a feature one-pager for smart notifications.
Constraints: Must ship in 1 week, 1 engineer, no backend changes.

[Review output]

ROUND 2:
Good. Now relax the timeline to 3 weeks with 2 engineers.
What would you add to the scope? Keep backend constraint.

[Review output]

ROUND 3:
Now remove the backend constraint too. What's the ideal version
with 3 weeks and 2 engineers?
```

**Why this works:** You end up with three versions — minimal, medium, and ideal — perfectly sized for a scoping conversation with your engineering lead.

---

## Pattern 6: Anti-Patterns (Tell Claude What NOT to Do)

Sometimes the fastest way to get good output is to tell Claude what you don't want:

```
Write a stakeholder update about the checkout project.

DO NOT:
- Use vague language ("making good progress," "on track")
- Include technical implementation details
- Be longer than 300 words
- Use bullet points for everything — use 2-3 short paragraphs
- Assume the reader knows the project background

DO:
- Start with the single most important thing they need to know
- Include specific numbers (% completion, metric changes, dates)
- End with a clear ask (decision needed, blocker to remove, or FYI)
```

**Why this works:** Claude has strong defaults (bullet points, vague language, excessive length). Explicitly blocking these defaults forces better output.

---

## Pattern 7: Iterative Refinement (The 3-Draft Method)

For important documents, don't aim for perfection in one shot:

```
DRAFT 1:
Write a product strategy for expanding into healthcare.
Keep it rough — focus on structure and key arguments.
Don't worry about formatting or polish.

[Review, provide feedback]

DRAFT 2:
Good structure. Now:
- Strengthen the market size argument (need specific TAM numbers)
- The competitive section is weak — add 3 specific competitors
- Remove section 4 entirely, it's not relevant
- Keep everything else

[Review again]

DRAFT 3:
Almost there. Final polish:
- Tighten the executive summary to 3 sentences
- Add a "Risks & Mitigations" section
- Make the recommendation more decisive (less "could" and "might")
- Format for a 10-minute exec review
```

**Why this works:** Each draft has a clear focus. Draft 1 = structure. Draft 2 = content quality. Draft 3 = polish. This is more context-efficient than asking for perfection in one prompt and then doing 5 rounds of scattered feedback.

---

## Pattern 8: Comparative Analysis

Force Claude to consider alternatives before recommending:

```
We're choosing a prioritization framework for our team.

Compare these 4 options:
1. RICE (Reach, Impact, Confidence, Effort)
2. ICE (Impact, Confidence, Ease)
3. MoSCoW (Must, Should, Could, Won't)
4. Weighted Scoring Matrix

For each:
- When it works best
- When it fails
- Effort to implement
- Team buy-in difficulty

Then recommend ONE for a 15-person product team at a Series B SaaS company
managing 3 product lines. Justify your pick.
```

---

## Quick Reference: Which Pattern for Which Task?

| PM Task | Best Pattern | Why |
|---------|-------------|-----|
| Writing PRDs | CRAFT + Socratic | Get context right before writing |
| Strategy docs | Chain of Thought + Iterative | Complex reasoning, needs refinement |
| Stakeholder emails | CRAFT + Anti-Patterns | Tone and format matter most |
| Decision documents | Comparative + Chain of Thought | Need to show reasoning |
| Reviews/feedback | Role Stacking | Multiple perspectives matter |
| Scoping features | Constraint Escalation | Find the right scope |
| Board/exec decks | CRAFT + Iterative | High stakes, needs polish |
| Competitive analysis | Socratic + Comparative | Need comprehensive, structured output |

---

## Exercise: Transform a Bad Prompt

**Time: 10 minutes**

1. Start with this bad prompt:
```
Write me a quarterly business review for my team.
```

2. Rewrite it using at least 3 patterns from this lesson
3. Run both prompts in Claude Code (in separate sessions to keep context clean)
4. Compare the outputs — the difference will be obvious

**Bonus:** Take a prompt you use regularly at work. Rewrite it using CRAFT + one other pattern. Save it as a Skill (Lesson 9).

---

## Key Takeaways

1. **CRAFT** — Context, Role, Action, Format, Tone. Use for every substantial prompt.
2. **Socratic Method** — Ask before you write. Prevents bad first drafts.
3. **Role Stacking** — Review from multiple perspectives (eng, design, VP).
4. **Chain of Thought** — Show reasoning, not just conclusions.
5. **Constraint Escalation** — Start tight, loosen selectively. Great for scoping.
6. **Anti-Patterns** — Tell Claude what NOT to do. Blocks bad defaults.
7. **Iterative Refinement** — 3 focused drafts > 1 perfect attempt.
8. **Comparative Analysis** — Force alternatives before recommendations.

---

## What's Next?

You now have the full Claude Code toolkit: CLAUDE.md (memory), context management, Plan Mode, sub-agents, Skills, Hooks, and advanced prompting. The final lesson ties it all together — building your complete PM workspace from scratch.

**Next:** [Lesson 12: Building Your PM Workspace](/modules/module-0-claude-basics/LESSON-12-PM-WORKSPACE.md)
