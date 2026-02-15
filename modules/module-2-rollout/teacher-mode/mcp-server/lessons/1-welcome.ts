import type { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 1,
  title: "Welcome to Rollout Planning",
  duration: "15 minutes",
  objectives: [
    "Understand why rollout plans fail and how AI changes the equation",
    "Learn the 5-tool framework for rollout planning",
    "See how a 1-2 week process becomes a 1-hour workflow",
    "Get oriented to the course structure",
  ],
  sections: [
    {
      id: "why-rollouts-fail",
      title: "Why Rollouts Fail",
      content: `# Why Rollouts Fail

Launch planning is where good PMs separate from great PMs. Anyone can write requirements. Few can anticipate the 15 things that go wrong during rollout.

Here's the pattern: PM writes a great PRD, engineering builds it, and then... the rollout plan is a half-page doc written the night before launch. The result?

**Common failure modes:**
- Risks discovered during the incident, not before
- Stakeholders surprised by changes ("Nobody told me about this")
- No rollback plan — "We'll figure it out" is the plan
- Timelines that ignore dependencies ("Why is backend blocking frontend?")
- Communication gaps between teams, leadership, and users

**The uncomfortable truth:** Most rollout plans are written from memory. The PM brainstorms risks in a meeting (and misses half of them), builds a timeline in a spreadsheet (with optimistic estimates), and skips the rollback section entirely.

Then Week 2 happens. And they're in a war room.`,
      teacherNotes: "Start by acknowledging this is a common problem — the student probably recognizes these patterns. Don't make them feel bad about past rollouts. Frame it as: everyone does this, and there's a better way.",
      checkQuestion: "Think about a past launch or rollout you've been part of. What went wrong that could have been prevented with better planning?",
    },
    {
      id: "ai-changes-the-equation",
      title: "How AI Changes the Equation",
      content: `# How AI Changes the Equation

The traditional rollout planning process takes 1-2 weeks of meetings, spreadsheets, and stakeholder alignment. With AI as a co-pilot, you can compress that into about an hour.

**Traditional vs AI-Partnership Approach:**

| Step | Traditional (1-2 weeks) | AI Partnership (1 hour) |
|------|------------------------|------------------------|
| Risk assessment | Brainstorm in a meeting, miss half the risks | Structured risk matrix from PRD context |
| Stakeholder mapping | Mental model, miss conflicts | Automated conflict detection |
| Timeline | Spreadsheet with optimistic estimates | Dependency-aware timeline with buffers |
| Rollback plan | "We'll figure it out" | Step-by-step rollback with triggers |
| Communication | Ad-hoc Slack messages | Templated comms plan by audience |

**Key insight:** AI doesn't replace your judgment — it extends your peripheral vision. You think about the feature. The AI thinks about what you forgot.

The AI is particularly good at:
- Pattern-matching risks from context (PRDs, architecture docs, past incidents)
- Generating exhaustive lists (stakeholders, dependencies, edge cases)
- Structuring communication (different messages for different audiences)
- Building rollback procedures (step-by-step, not hand-wavy)`,
      teacherNotes: "Emphasize that AI is a thinking partner, not a replacement. The PM still makes all the decisions — AI just surfaces things the PM might miss.",
      checkQuestion: "Which part of rollout planning do you currently spend the most time on? Which part do you skip most often?",
    },
    {
      id: "five-tool-framework",
      title: "The 5-Tool Framework",
      content: `# The 5-Tool Framework

This course teaches you to use 5 MCP tools that cover the entire rollout planning lifecycle:

| # | Tool | What It Does | When to Use |
|---|------|-------------|-------------|
| 1 | \`create_rollout_plan\` | Generates a complete rollout plan | After your PRD is finalized |
| 2 | \`assess_risks\` | Structured risk matrix with mitigations | During planning phase |
| 3 | \`map_stakeholders\` | Stakeholder interests & conflict detection | Before kickoff meeting |
| 4 | \`generate_timeline\` | Dependency-aware timeline with buffers | After scope is confirmed |
| 5 | \`build_rollback_plan\` | Step-by-step rollback with triggers | Before launch, not during incident |

**The workflow:**
1. Start with \`assess_risks\` — understand what could go wrong
2. Use \`map_stakeholders\` — understand who's involved and where they'll clash
3. Run \`generate_timeline\` — build a realistic schedule with dependencies
4. Build your safety net with \`build_rollback_plan\` — plan for failure before it happens
5. Bring it all together with \`create_rollout_plan\` — generate the complete plan

You can also use each tool independently. Need a quick risk assessment for a standup? Just use \`assess_risks\`. Need to update the timeline? Just use \`generate_timeline\`.`,
      teacherNotes: "Walk through the tools one by one. Make sure the student understands this is a toolkit, not a rigid sequence. They can use individual tools as needed.",
    },
    {
      id: "course-overview",
      title: "Course Overview",
      content: `# Course Overview

Here's what we'll cover in 6 lessons:

**Lesson 1 (this one):** Welcome & Framework
Get oriented. Understand why rollouts fail and how AI helps.

**Lesson 2: Risk Assessment**
Deep dive into \`assess_risks\`. Learn to identify technical, organizational, and user adoption risks using structured frameworks.

**Lesson 3: Stakeholder Mapping**
Master \`map_stakeholders\`. Build RACI matrices, detect conflicts, and create communication plans.

**Lesson 4: Timeline Generation**
Use \`generate_timeline\` to build dependency-aware timelines with realistic buffers and milestones.

**Lesson 5: Rollback Planning**
The section every PM skips — and every PM needs. Build \`build_rollback_plan\` procedures with triggers, steps, and verification.

**Lesson 6: Putting It All Together**
End-to-end workflow combining all tools. Real-world scenario from PRD to rollout plan in one session.

Each lesson includes:
- Conceptual explanation of the technique
- Hands-on exercises using the actual tools
- A quiz to test your understanding
- Teacher notes to deepen your learning`,
      teacherNotes: "Give a quick overview but don't dwell on it. The student is eager to get started.",
    },
    {
      id: "getting-started",
      title: "Getting Started",
      content: `# Getting Started

Before we dive into risk assessment in Lesson 2, here are the key concepts you'll need:

**Context loading with @-mentions:**
Just like in PRD generation, the quality of your rollout plan depends on the context you provide. Reference relevant files:
- Your PRD (the most important input)
- Architecture docs (for technical risk assessment)
- Past incident logs (for pattern-matching risks)
- Org charts or team docs (for stakeholder mapping)

**The "Be Aggressive" principle:**
When generating risks, stakeholder conflicts, or rollback triggers, always ask for MORE than you think you need. It's easier to deprioritize a risk than to discover it during an incident.

**Iteration over perfection:**
Your first rollout plan won't be perfect. That's fine. The tools are designed for iteration — generate, review, adjust, regenerate. Each pass gets sharper.

**Ready?** Let's move to Lesson 2 and learn how to do real risk assessment.`,
      teacherNotes: "End with energy. The student should be excited to start using the tools in Lesson 2.",
      checkQuestion: "What files or documents would you @-mention if you were building a rollout plan for your current or most recent project?",
    },
  ],
  exercise: {
    title: "Identify Your Rollout Gaps",
    description:
      "Analyze a past or current launch to identify what a proper rollout plan would have caught.",
    steps: [
      "Think of a feature launch you've been involved with (or invent one)",
      "List 3 risks that weren't identified before launch",
      "List 2 stakeholders who were surprised or misaligned",
      "Describe the rollback plan (or lack thereof)",
      "Write 1 paragraph describing what you'd do differently with an AI co-pilot",
    ],
    validation:
      "You should have at least 3 risks, 2 stakeholder gaps, and a clear idea of what was missing. If you can't think of gaps, your rollout planning might already be strong — but there's always room to systematize it.",
  },
  quiz: {
    questions: [
      {
        question:
          "What is the most common reason rollout plans fail?",
        options: [
          "The feature has bugs",
          "Risks are discovered during incidents instead of during planning",
          "The timeline is too aggressive",
          "Stakeholders don't read the plan",
        ],
        correctIndex: 1,
        explanation:
          "The biggest issue is that risks aren't surfaced before launch. Bugs, timelines, and stakeholder engagement are all symptoms of inadequate risk assessment during the planning phase.",
      },
      {
        question:
          "How does AI change the rollout planning process?",
        options: [
          "It replaces the PM's judgment",
          "It automates the entire process without human input",
          "It extends the PM's peripheral vision by surfacing things they might miss",
          "It guarantees a successful launch",
        ],
        correctIndex: 2,
        explanation:
          "AI is a thinking partner, not a replacement. It's particularly good at pattern-matching risks from context, generating exhaustive lists, and structuring communication — but the PM still makes all decisions.",
      },
      {
        question: "Which tool should you typically use FIRST in the rollout planning process?",
        options: [
          "create_rollout_plan — generate the complete plan",
          "assess_risks — understand what could go wrong",
          "generate_timeline — build the schedule",
          "build_rollback_plan — plan for failure",
        ],
        correctIndex: 1,
        explanation:
          "Start with risk assessment. Understanding what could go wrong shapes every other decision — stakeholder mapping, timeline buffers, rollback procedures, and the overall plan structure.",
      },
    ],
  },
};

export default lesson;
