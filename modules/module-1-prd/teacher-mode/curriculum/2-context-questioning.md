# Lesson 2: Context & Socratic Questioning

**Estimated time: 20 minutes**
**Lesson type: Technique + Practice**

---

## Why Context is Everything

The number one reason AI-generated PRDs feel generic is **lack of context**. When you ask Claude to help you write a PRD with no background, it can only give you generic templates and generic questions.

But when you load Claude with your product strategy, user research, and technical constraints, everything changes:

- Questions become specific to your product
- Suggestions reference your actual architecture
- Edge cases are relevant to your user base
- The generated PRD sounds like it was written by someone who understands your product

### The Context Stack

Think of context as layers. Each layer makes the output better:

| Layer | What It Provides | Example |
|-------|-----------------|---------|
| **Company** | Business model, OKRs, strategy | product-strategy-2026.md |
| **Product** | Architecture, tech stack, constraints | api-architecture.md |
| **User** | Personas, research findings, pain points | user-research-q4.md |
| **Feature** | Related PRDs, competitor analysis | notifications-spike.md |

You don't need all layers every time. But the more relevant context Claude has, the better the output.

---

## Using @-Mentions Effectively

In Claude Code, you can reference files directly using the @ symbol. This gives Claude access to the full contents of those files.

### What to @-Mention

**Always include:**
- Product strategy or OKRs (gives Claude the "why")
- User research or survey data (gives Claude the user perspective)
- Technical architecture docs (gives Claude constraints and feasibility context)

**Include when relevant:**
- Existing PRDs for similar features (establishes your PRD style and depth)
- Competitor analysis (helps with differentiation)
- Design mockups or wireframes (if available as text descriptions)

### What NOT to @-Mention

- Entire codebases (too much noise)
- Unrelated product docs (dilutes focus)
- Internal meeting notes (unless they contain key decisions)
- More than 5-7 files (diminishing returns)

### Example Prompt

```
@product-strategy.md @user-research-q4.md @api-architecture.md

I need to write a PRD for a new notifications center.
Can you review these docs and help me think through the approach?
```

Notice the prompt asks Claude to *think through the approach*, not *write the PRD*. This sets up the Socratic exploration phase.

---

## The Socratic Questioning Technique

The PRD Generator's `get_questions` tool returns 10 questions tailored to your template type. But the real power is in how you engage with those questions.

### The Five Question Categories

| Category | Questions | Why It Matters |
|----------|----------|----------------|
| **Problem Clarity** | "Who exactly is affected?" / "How do you know this is a problem?" | Vague problems lead to vague solutions |
| **Solution Validation** | "What alternatives did you consider?" / "Why this approach?" | Prevents solutioning without exploring options |
| **Success Criteria** | "How will you know this worked?" / "What does failure look like?" | Forces measurable outcomes, not vibes |
| **Constraints** | "What can't change?" / "What dependencies exist?" | Surfaces blockers early, not mid-sprint |
| **Strategic Fit** | "How does this connect to OKRs?" / "What are you saying no to?" | Ensures the feature is worth building |

### How to Use the Questions

1. **Don't rush.** Take each question seriously. If it takes you 2 minutes to answer well, that's 2 minutes saved later.
2. **Push back.** If a question doesn't apply, say why. "This isn't relevant because..." is a valid answer that adds context.
3. **Follow up.** When Claude follows up on your answer, engage with it. The follow-ups are where the real insight happens.
4. **Flag uncertainty.** "I'm not sure yet -- I need to check with the data team" is better than making something up.

---

## The Art of Follow-Up Questions

The initial 10 questions from `get_questions` are just the starting point. The real value comes from the back-and-forth conversation that follows.

### Bad vs Good Follow-Up Patterns

**Bad pattern (PM gives surface-level answers):**
> Q: "What problem does this solve?"
> A: "Users want notifications."
> *Claude moves on to the next question.*

**Good pattern (PM engages deeply):**
> Q: "What problem does this solve?"
> A: "Users want notifications."
> *Claude follows up:* "What specific user behavior tells you this is a problem? Is it missed deadlines, slow approvals, or something else?"
> A: "34% of approvals are delayed more than 48 hours because approvers don't see the request."
> *Now we have a crisp problem statement.*

### Techniques for Deeper Exploration

1. **The "So what?" test** -- For every answer you give, ask yourself "so what?" If you can't articulate why it matters, go deeper.
2. **The specificity ladder** -- Move from vague to specific: "Users have problems" -> "Approvers miss requests" -> "34% of approvals delayed 48+ hrs"
3. **The negative frame** -- Ask "What does failure look like?" to clarify what success really means.
4. **The constraint reveal** -- Ask "What can't change?" to surface hidden blockers early.

### Time Box It

Spend no more than 15 minutes on the Socratic exploration phase. If you're still unclear after 15 minutes, it's a signal that you need more research (user interviews, data analysis) before writing the PRD. That's not a failure -- it's the process working.

---

## Generating Multiple Approaches

One of the most common PM mistakes is committing to the first solution that comes to mind. Claude can help you explore alternatives before you commit.

### Three Approach Patterns

| Pattern | When to Use | Example Prompt |
|---------|-------------|----------------|
| **Start broad** | Greenfield features, unclear direction | "Give me 3 different ways to solve [problem]" |
| **Compare trade-offs** | Technical decisions, vendor selection | "Compare build vs buy vs integrate for [need]" |
| **Phased thinking** | Large features that need scoping | "What's the MVP vs v2 vs full vision?" |

### Example: Notifications Center

Instead of jumping straight to "build a notifications center with WebSocket push," explore alternatives:

1. **Real-time WebSocket push** -- Best UX, highest engineering effort
2. **Polling with smart batching** -- Simpler to build, good enough for most use cases
3. **Email digest only** -- Lowest effort, tests demand before building in-app

Then compare on: user experience, engineering effort, scalability, and time-to-ship.

### How This Improves Your PRD

When you include the alternatives you considered and why you chose your approach, your PRD becomes much more convincing. Engineers trust PRDs that show the PM explored multiple options. Executives appreciate clear trade-off analysis.

The `generate_prd` tool captures this exploration in the "Technical Approach" section automatically.

---

## Putting It All Together

Here's the complete flow from context loading to PRD-ready thinking:

**Step 1: Load context (2 min)**
@-mention 3-5 relevant docs and describe what you're building.

**Step 2: Pick a template (1 min)**
Use `list_templates` to see the options and pick the one that fits.

**Step 3: Socratic exploration (15 min)**
Use `get_questions` and answer each question thoroughly. Engage with follow-ups. Flag uncertainty.

**Step 4: Explore alternatives (5 min)**
Ask Claude for 2-3 alternative approaches. Compare trade-offs. Commit to your approach with reasoning.

**Step 5: Ready to generate**
You now have crisp thinking that's ready to become a structured PRD. Lesson 4 will cover the generation step.

### Key Takeaways

1. **Context before questions.** Always load relevant docs first.
2. **Questions before answers.** Struggle with the hard questions before writing anything.
3. **Alternatives before commitment.** Explore options before locking in your approach.
4. **Specificity over vagueness.** "34% of approvals delayed 48+ hrs" beats "users have notification problems."

Next lesson: We'll explore the three PRD templates in depth -- their structure, when to use each one, and how to customize them.

---

## Exercise: Socratic Exploration for Your Project

Practice the context + questioning flow with a real or hypothetical project.

1. Choose a feature or product idea you want to write a PRD for
2. Describe the context to Claude: What product is this for? Who are the users? What's the strategic context?
3. Use `list_templates` to pick the right template type
4. Use `get_questions` to see the 10 questions for your template
5. Answer the first 5 questions conversationally with Claude, engaging with follow-ups
6. Ask Claude to suggest 2-3 alternative approaches to your solution
7. Reflect: Which questions were hardest? What alternatives surprised you?

**Completion check:** You've completed this exercise if: (1) You answered at least 5 questions with specific, detailed answers, (2) You explored at least 2 alternative approaches, and (3) You identified at least one gap in your thinking that you need to research further.

---

## Quick Check

1. What's the primary benefit of @-mentioning files before starting a PRD?
2. If you can't clearly answer a Socratic question like "How will you measure success?", what does that signal?
3. Why should you explore multiple approaches before committing to one?
4. How long should you spend on the Socratic exploration phase?

---

*Previous: [Lesson 1: Welcome](1-welcome.md)*
*Next: [Lesson 3: PRD Structure & Templates](3-prd-structure.md)*
