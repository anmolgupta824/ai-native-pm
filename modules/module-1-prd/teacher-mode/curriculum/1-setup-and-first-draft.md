# Lesson 1: Setup & First Draft

**Time:** ~20 minutes
**Goal:** Pick a template, answer all questions, generate your first complete PRD draft.

---

## Section 1: Welcome & Context

Welcome to Module 1 — the PRD Generator.

By the end of this course, you'll have a **complete, validated, stakeholder-reviewed PRD** ready to share with your team. Every lesson builds directly on your PRD — no theory without action.

Before we start, I need to know what you're working on:

**Ask the student:**
1. What company or product are you building this PRD for? (Can be your real company or a fictional one for practice.)
2. What feature, product, or change do you want to write a PRD about? (1-2 sentences is fine.)

> **Store these answers in progress.json** as `referenceProduct` and `projectIdea`. Use them for all examples and analogies throughout the course.

---

## Section 2: Pick Your Template

Now let's pick the right PRD template for your project. Use `list_templates` to show the student all options.

| Template | Best For | Sections | Questions |
|----------|----------|----------|-----------|
| Feature Launch | Adding a new feature to an existing product | 12 | 10 |
| API Integration | Integrating a third-party API or building a new one | 12 | 10 |
| Product Redesign | Redesigning an existing feature or experience | 12 | 10 |
| PRFAQ | Amazon-style "working backwards" press release format | 12 | 10 |
| Custom | Your own section headings — company format, unique structure | Flexible | Flexible |

**Ask the student:** Which template fits your project best?

If they choose "Custom," ask them to list their section headings. Use `generate_prd_custom` later instead of `generate_prd`.

---

## Section 3: Answer the Questions

Use `get_questions` to get all 10 questions for the chosen template. Ask them **one at a time**, in a conversational way.

> **Coaching tips:**
> - If an answer is vague (e.g., "we want more engagement"), push for specifics: "What does engagement mean here? DAU? Session length? Feature adoption rate?"
> - If the student doesn't know an answer, that's fine — record "TBD" and move on. Better to flag the gap than make something up.
> - Push hardest on questions about metrics and risks — these are where most PRDs fall short.

---

## Section 4: Pro Tip — @-Mentions for Context

Before we generate, a quick pro tip for your real PM workflow:

**The more context Claude has, the better your PRD gets.** In a real project, @-mention your company's strategy doc, user research, and technical specs before generating. Claude will pull specific data points instead of generic filler.

We've included 3 practice files in `references/`:
- `references/product-strategy.md` — Mission, OKRs, competitive landscape
- `references/user-research.md` — Personas, pain points, feature requests
- `references/api-architecture.md` — System architecture, known limitations

You don't need them for this course (your own answers are the context), but try @-mentioning them in Usage Mode later.

---

## Section 5: Generate First Draft

Now run `generate_prd` (or `generate_prd_custom` for custom format) with all the answers.

**After generating:**

Tell the student: *"This is your v1 draft — a real PRD with real content. Over the next 4 lessons, we'll strengthen the weak sections, validate it, get stakeholder feedback, and polish it into something you'd be proud to share."*

**Auto-save** the output to `output/prd-draft-lesson-1.md`.

---

## Section 6: Quick Check

Two quick questions to make sure the concepts landed:

1. **Why do we ask all 10 questions before generating instead of writing sections manually?**
   → The questionnaire forces you to think through the full picture before writing. It's faster than staring at blank sections, and it catches gaps early.

2. **When should you @-mention reference documents?**
   → Before generating, in your real workflow. @-mention strategy docs, research, and tech specs so Claude can pull specific data instead of generic filler.

**Transition:** *"In Lesson 2, we'll use Socratic questioning to strengthen the weakest sections and add alternative approaches."*
