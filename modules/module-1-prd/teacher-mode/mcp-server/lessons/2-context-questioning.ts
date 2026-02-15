import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 2,
  title: "Context & Socratic Questioning",
  duration: "20 min",
  objectives: [
    "Learn how to use @-mentions to give Claude full project context",
    "Master the Socratic questioning technique for sharper problem statements",
    "Understand which documents to reference and which to skip",
    "Practice asking better follow-up questions",
  ],
  sections: [
    {
      id: "why-context-matters",
      title: "Why Context Matters",
      content: `## Why Context is Everything

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

You don't need all layers every time. But the more relevant context Claude has, the better the output.`,
      teacherNotes: "Ask the student what docs they typically reference when writing a PRD. Most PMs have 3-5 key docs they always check. Help them think about which ones would be most useful as @-mentions.",
      checkQuestion: "What 3 documents would you @-mention if you were writing a PRD for your current project?",
    },
    {
      id: "at-mentions",
      title: "Using @-Mentions Effectively",
      content: `## @-Mentions: Loading Context into Claude

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

\`\`\`
@product-strategy.md @user-research-q4.md @api-architecture.md

I need to write a PRD for a new notifications center.
Can you review these docs and help me think through the approach?
\`\`\`

Notice the prompt asks Claude to *think through the approach*, not *write the PRD*. This sets up the Socratic exploration phase.`,
      teacherNotes: "If the student doesn't have docs ready, that's OK. The technique works with verbal context too — they can describe their product, users, and constraints in conversation. The @-mention approach just scales better.",
      checkQuestion: "Why is it important to limit @-mentions to 3-5 relevant files rather than loading everything?",
    },
    {
      id: "socratic-questioning",
      title: "The Socratic Questioning Technique",
      content: `## Socratic Questioning for Better PRDs

The PRD Generator's \`get_questions\` tool returns 10 questions tailored to your template type. But the real power is in how you engage with those questions.

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
4. **Flag uncertainty.** "I'm not sure yet — I need to check with the data team" is better than making something up.`,
      teacherNotes: "The key insight: if the student can't answer a question clearly in conversation, they can't write it clearly in a PRD. Help them see that struggling with a question is a signal, not a failure.",
      checkQuestion: "What's the most important question category for your current project — Problem Clarity, Success Criteria, or Constraints?",
    },
    {
      id: "follow-ups",
      title: "The Art of Follow-Up Questions",
      content: `## Follow-Up Questions: Where the Magic Happens

The initial 10 questions from \`get_questions\` are just the starting point. The real value comes from the back-and-forth conversation that follows.

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

1. **The "So what?" test** — For every answer you give, ask yourself "so what?" If you can't articulate why it matters, go deeper.
2. **The specificity ladder** — Move from vague to specific: "Users have problems" → "Approvers miss requests" → "34% of approvals delayed 48+ hrs"
3. **The negative frame** — Ask "What does failure look like?" to clarify what success really means.
4. **The constraint reveal** — Ask "What can't change?" to surface hidden blockers early.

### Time Box It

Spend no more than 15 minutes on the Socratic exploration phase. If you're still unclear after 15 minutes, it's a signal that you need more research (user interviews, data analysis) before writing the PRD. That's not a failure — it's the process working.`,
      checkQuestion: "Try the specificity ladder: Take a vague problem statement from your project and make it specific with a number.",
    },
    {
      id: "multiple-approaches",
      title: "Generating Multiple Approaches",
      content: `## Don't Jump to the First Solution

One of the most common PM mistakes is committing to the first solution that comes to mind. Claude can help you explore alternatives before you commit.

### Three Approach Patterns

| Pattern | When to Use | Example Prompt |
|---------|-------------|----------------|
| **Start broad** | Greenfield features, unclear direction | "Give me 3 different ways to solve [problem]" |
| **Compare trade-offs** | Technical decisions, vendor selection | "Compare build vs buy vs integrate for [need]" |
| **Phased thinking** | Large features that need scoping | "What's the MVP vs v2 vs full vision?" |

### Example: Notifications Center

Instead of jumping straight to "build a notifications center with WebSocket push," explore alternatives:

1. **Real-time WebSocket push** — Best UX, highest engineering effort
2. **Polling with smart batching** — Simpler to build, good enough for most use cases
3. **Email digest only** — Lowest effort, tests demand before building in-app

Then compare on: user experience, engineering effort, scalability, and time-to-ship.

### How This Improves Your PRD

When you include the alternatives you considered and why you chose your approach, your PRD becomes much more convincing. Engineers trust PRDs that show the PM explored multiple options. Executives appreciate clear trade-off analysis.

The \`generate_prd\` tool captures this exploration in the "Technical Approach" section automatically.`,
      teacherNotes: "Encourage the student to try this with their real project. Even if they're already committed to an approach, exploring alternatives can reveal blind spots.",
      checkQuestion: "For your current project, what are two alternative approaches you haven't considered?",
    },
    {
      id: "putting-it-together",
      title: "Putting It All Together",
      content: `## The Full Context + Questioning Flow

Here's the complete flow from context loading to PRD-ready thinking:

**Step 1: Load context (2 min)**
@-mention 3-5 relevant docs and describe what you're building.

**Step 2: Pick a template (1 min)**
Use \`list_templates\` to see the options and pick the one that fits.

**Step 3: Socratic exploration (15 min)**
Use \`get_questions\` and answer each question thoroughly. Engage with follow-ups. Flag uncertainty.

**Step 4: Explore alternatives (5 min)**
Ask Claude for 2-3 alternative approaches. Compare trade-offs. Commit to your approach with reasoning.

**Step 5: Ready to generate**
You now have crisp thinking that's ready to become a structured PRD. Lesson 4 will cover the generation step.

### Key Takeaways

1. **Context before questions.** Always load relevant docs first.
2. **Questions before answers.** Struggle with the hard questions before writing anything.
3. **Alternatives before commitment.** Explore options before locking in your approach.
4. **Specificity over vagueness.** "34% of approvals delayed 48+ hrs" beats "users have notification problems."

Next lesson: We'll explore the three PRD templates in depth — their structure, when to use each one, and how to customize them.`,
      teacherNotes: "Summarize the key takeaway: thinking before writing. If the student has been engaged with real examples, celebrate that — they're already applying the techniques.",
    },
  ],
  exercise: {
    title: "Socratic Exploration for Your Project",
    description:
      "Practice the context + questioning flow with a real or hypothetical project.",
    steps: [
      "Choose a feature or product idea you want to write a PRD for",
      "Describe the context to Claude: What product is this for? Who are the users? What's the strategic context?",
      "Use list_templates to pick the right template type",
      "Use get_questions to see the 10 questions for your template",
      "Answer the first 5 questions conversationally with Claude, engaging with follow-ups",
      "Ask Claude to suggest 2-3 alternative approaches to your solution",
      "Reflect: Which questions were hardest? What alternatives surprised you?",
    ],
    validation:
      "You've completed this exercise if: (1) You answered at least 5 questions with specific, detailed answers, (2) You explored at least 2 alternative approaches, and (3) You identified at least one gap in your thinking that you need to research further.",
  },
  quiz: {
    questions: [
      {
        question: "What's the primary benefit of @-mentioning files before starting a PRD?",
        options: [
          "It makes the PRD longer",
          "It gives Claude product-specific context for sharper questions and output",
          "It automatically generates the PRD without questions",
          "It replaces the need for user research",
        ],
        correctIndex: 1,
        explanation:
          "When Claude has your product strategy, user research, and technical docs as context, it can ask questions and generate content that's specific to your situation — not generic templates.",
      },
      {
        question: "If you can't clearly answer a Socratic question like 'How will you measure success?', what does that signal?",
        options: [
          "The question is irrelevant to your project",
          "You should skip it and move on",
          "You need more research before the PRD is ready to write",
          "You should let Claude answer it for you",
        ],
        correctIndex: 2,
        explanation:
          "Struggling with a question is a signal, not a failure. If you can't articulate success metrics, it means you need to talk to your data team. If you can't define the problem, you need more user research. The questions expose gaps in your preparation.",
      },
      {
        question: "Why should you explore multiple approaches before committing to one?",
        options: [
          "It makes the PRD longer and more impressive",
          "It reveals trade-offs and makes your chosen approach more convincing to engineers and execs",
          "Claude requires you to consider at least 3 options",
          "It delays the project timeline, which is always a good thing",
        ],
        correctIndex: 1,
        explanation:
          "Exploring alternatives reveals trade-offs you might have missed. When your PRD shows that you considered multiple approaches and chose the best one with reasoning, engineers trust it more and execs appreciate the thorough analysis.",
      },
      {
        question: "How long should you spend on the Socratic exploration phase?",
        options: [
          "As long as it takes, there's no limit",
          "No more than 5 minutes",
          "About 15 minutes — if you're still unclear, you need more research",
          "Exactly 30 minutes",
        ],
        correctIndex: 2,
        explanation:
          "Time-box the exploration to about 15 minutes. If you're still unclear after that, it's a signal that you need more research (user interviews, data analysis) before the PRD is ready to write. That's the process working correctly — surfacing gaps early.",
      },
    ],
  },
};

export default lesson;
