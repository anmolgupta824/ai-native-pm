# Lesson 2: Deepen with Questions

**Time:** ~15 minutes
**Goal:** Strengthen weak sections using Socratic questioning, add alternative approaches.

---

## Section 1: Socratic Deepening

Good PMs don't just write PRDs — they stress-test them. Here are 5 categories of questions that expose gaps:

| Category | What It Tests | Example Question |
|----------|--------------|-----------------|
| Assumptions | Are you building on unvalidated beliefs? | "What evidence supports this user need?" |
| Scope | Is the boundary clear? | "What's explicitly NOT included and why?" |
| Dependencies | What could block you? | "Which teams or services must ship before you can?" |
| Trade-offs | Did you consider alternatives? | "What did you choose NOT to build?" |
| Failure modes | What if it doesn't work? | "How do you know this failed, and what's plan B?" |

**Exercise:** Look at your current PRD. Pick the 3 weakest sections — the ones where you're least confident in your answers.

---

## Section 2: Deep Dive

For each of the 3 weak sections the student identified:

1. Ask 2-3 follow-up questions from the categories above
2. Let the student refine their answers
3. Help them rewrite that section with the stronger answers

**Coaching approach:**
- Don't accept vague answers. "We'll figure it out later" is a red flag in a PRD.
- Push for specifics: numbers, timelines, names, metrics.
- If the student doesn't know an answer, that's fine — add it to the "Open Questions" section. An honest gap is better than a confident guess.

> **Example exchange:**
> Student: "We'll measure success by user engagement."
> Claude: "What specific engagement metric? DAU? Feature adoption rate? And what's your target number? Without a target, you can't tell if you succeeded."

---

## Section 3: Alternative Approaches

Every good PRD should document what you considered but chose NOT to do. This shows stakeholders you've thought broadly.

**Exercise:**
1. Claude suggests 2-3 alternative approaches to the student's problem (different technical approaches, different scope cuts, different target users)
2. Student picks one they considered (or adds a new one)
3. Add a "Considered Alternatives" section to the PRD with a brief table:

| Alternative | Why Considered | Why Rejected |
|-------------|---------------|-------------|
| [Approach A] | [Benefit] | [Reason it wasn't chosen] |
| [Approach B] | [Benefit] | [Reason it wasn't chosen] |

**Auto-save** the updated draft to `output/prd-draft-lesson-3.md`.

---

## Section 4: Quick Check

1. **Why is documenting "Considered Alternatives" valuable in a PRD?**
   → It shows stakeholders you explored the solution space, prevents the "but did you think about X?" conversation, and creates a record of your decision rationale.

2. **When a section of your PRD has a vague answer, what should you do?**
   → Either dig deeper to get a specific answer, or move it to "Open Questions" with a clear owner and deadline. Never leave a vague answer pretending to be complete.

**Transition:** *"Your PRD is getting stronger. In Lesson 3, we'll run it through automated validation to score it and fix the remaining gaps."*
