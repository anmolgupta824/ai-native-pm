import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 3,
  title: "PRD Structure & Templates",
  duration: "20 min",
  objectives: [
    "Understand the anatomy of a well-structured PRD",
    "Learn when to use each of the three templates",
    "Know which sections matter most and which are often skipped",
    "Customize templates for your team's format",
  ],
  sections: [
    {
      id: "anatomy-of-prd",
      title: "Anatomy of a Well-Structured PRD",
      content: `## What Makes a Good PRD?

A PRD has one job: **align everyone on what you're building, why, and how you'll know it worked.** Every section in the PRD should serve that goal.

### The Essential Sections

| Section | Purpose | Who Reads It Most |
|---------|---------|-------------------|
| **Overview** | The elevator pitch — what and why in 2-3 sentences | Everyone |
| **Problem Statement** | Why this matters, with evidence | Execs, stakeholders |
| **Goals & Success Metrics** | How you'll measure success | Data team, execs |
| **User Stories** | Who benefits and how | Design, engineering |
| **Requirements** | What to build (functional and non-functional) | Engineering |
| **Edge Cases & Error Handling** | What could go wrong | Engineering, QA |
| **Launch Plan** | How to ship it safely | Engineering, ops |
| **Risks & Mitigations** | What could derail this | Everyone |
| **Open Questions** | What you don't know yet | Everyone |

### The Most Skipped Sections

PMs consistently skip three sections that cause the most review pushback:

1. **Success Metrics** — "Improve engagement" is not a metric. "Increase 24-hr read rate from 45% to 80%" is.
2. **Edge Cases** — Engineers will find them anyway. Finding them first earns trust.
3. **Risks & Mitigations** — Execs respect PMs who acknowledge what could go wrong.

The PRD Generator's \`validate_prd\` tool checks for these exact gaps.`,
      teacherNotes: "Ask the student which sections they typically struggle with or skip. Most PMs will say success metrics or edge cases. That's where the tools add the most value.",
      checkQuestion: "Which of the 'most skipped' sections do you find hardest to write?",
    },
    {
      id: "feature-launch-template",
      title: "Template 1: Feature Launch",
      content: `## Feature Launch Template

**Use when:** You're adding a new feature to an existing product.

This is the most common template. It covers the full lifecycle from problem to launch.

### Sections

1. Overview
2. Problem Statement
3. Goals & Success Metrics
4. User Stories
5. Requirements (Functional)
6. Requirements (Non-Functional)
7. Design Considerations
8. Technical Approach
9. Edge Cases & Error Handling
10. Launch Plan
11. Risks & Mitigations
12. Open Questions

### What Makes This Template Special

The Feature Launch template balances **user needs** and **technical reality**. It has separate sections for functional requirements (what the feature does) and non-functional requirements (how well it does it — performance, security, accessibility).

### When NOT to Use It

- If you're integrating with an external API → use the API Integration template
- If you're redesigning something that already exists → use the Product Redesign template
- If you're building from scratch with no existing product → Feature Launch still works

### Example: In-App Notifications Center

A Feature Launch PRD for notifications would cover: the user problem (34% of approvals delayed), the solution (real-time in-app notifications), success metrics (median response time < 4 hours), and the launch plan (canary → gradual → full).`,
      checkQuestion: "Can you think of a feature at your company that would use the Feature Launch template?",
    },
    {
      id: "api-integration-template",
      title: "Template 2: API Integration",
      content: `## API Integration Template

**Use when:** You're integrating with a third-party API or building a new API.

### Sections

1. Overview
2. Integration Goals
3. API Specification
4. Authentication & Security
5. Data Flow
6. Error Handling
7. Rate Limits & Performance
8. Testing Strategy
9. Monitoring & Alerting
10. Rollback Plan
11. Documentation Requirements
12. Open Questions

### What Makes This Template Special

API integrations have unique concerns that the Feature Launch template misses: authentication (OAuth vs API key), rate limits, data flow between systems, and the critical question of **what happens when the API is down**.

### Key Questions This Template Asks

- "What data flows between your system and the API?"
- "How should the system handle API failures or timeouts?"
- "What are the security and compliance requirements?"
- "What's the rollback plan if the integration fails in production?"

These questions force you to think about the integration's failure modes — not just the happy path.

### Example: Stripe Payment Integration

An API Integration PRD for Stripe would cover: the authentication method (OAuth for Connect, API keys for direct), the data flow (customer → checkout → Stripe → webhook → your DB), error handling (what if Stripe is down during checkout?), and monitoring (latency, success rate, failed payment alerts).`,
      teacherNotes: "If the student has done the Module 3 MCP course, they've already built API integrations. Connect the dots — writing a PRD for an integration before building it catches issues early.",
      checkQuestion: "What third-party API integration has caused the most headaches at your company? What went wrong?",
    },
    {
      id: "redesign-template",
      title: "Template 3: Product Redesign",
      content: `## Product Redesign Template

**Use when:** You're redesigning an existing feature or product experience.

### Sections

1. Overview
2. Current State Analysis
3. Problems with Current Design
4. Redesign Goals
5. User Research Findings
6. Proposed Changes
7. Migration Plan
8. Success Metrics
9. Risks & Mitigations
10. Timeline
11. Stakeholder Communication
12. Open Questions

### What Makes This Template Special

Redesigns are uniquely risky because you're changing something people already use. The template includes two sections that other templates don't:

1. **Current State Analysis** — Forces you to document what exists before changing it
2. **Migration Plan** — How do existing users transition to the new design?

### The Redesign Trap

The biggest mistake in redesign PRDs: **skipping the "why."** "The current design looks outdated" is not a business case. You need evidence:

- User research showing confusion or drop-off
- Analytics showing poor conversion or engagement
- Support ticket trends related to the current design
- Competitive analysis showing you're falling behind

### Example: Settings Page Redesign

A Redesign PRD would cover: what's wrong with the current settings page (12 support tickets/week about finding settings, 40% abandonment rate on the settings flow), the proposed changes (categorized settings with search), the migration plan (redirect old URLs, show "What's new" banner), and success metrics (reduce settings-related support tickets by 50%).`,
      checkQuestion: "What's the most common reason redesign projects go wrong?",
    },
    {
      id: "choosing-template",
      title: "Choosing the Right Template",
      content: `## How to Choose

Use this decision tree:

1. **Are you adding something new to an existing product?** → Feature Launch
2. **Are you connecting to or building an API?** → API Integration
3. **Are you changing something that already exists?** → Product Redesign
4. **Not sure?** → Start with Feature Launch (it's the most general)

### Hybrid Cases

Sometimes your project spans multiple templates:

- **"We're redesigning the checkout AND integrating with a new payment API"** → Write two PRDs, or use the Feature Launch template with extra sections borrowed from the other two.
- **"We're building a new microservice with a public API"** → API Integration for the API itself, Feature Launch for the user-facing features.

### Customizing Templates

The PRD Generator's templates are starting points, not rigid structures. Your team might:

- Add a "Compliance" section (healthcare, finance)
- Rename "User Stories" to "Jobs to Be Done"
- Add a "Competitive Analysis" section
- Remove sections that don't apply to your product

The key is consistency — use the same structure across your team so PRDs are easy to review.`,
      teacherNotes: "If the student's team has a custom PRD template, help them see how the three templates map to their format. The goal isn't to replace their template — it's to ensure they don't skip critical sections.",
    },
    {
      id: "template-tips",
      title: "Pro Tips for Better PRD Structure",
      content: `## Pro Tips

### 1. Start With the Problem, Not the Solution
The first thing someone reads sets their frame. If your PRD starts with "We should build X," readers are evaluating your solution before understanding the problem. Start with the pain.

### 2. Make Success Metrics Falsifiable
"Improve user experience" is not falsifiable — you can always claim success. "Reduce checkout abandonment from 67% to 50% within 3 months" is falsifiable — you either hit it or you don't.

### 3. Include a Pre-Ship Checklist
The \`generate_prd\` tool adds one automatically. It includes: engineering review, design approval, metrics finalized, edge cases documented, rollback plan tested, stakeholder sign-off.

### 4. Keep Open Questions Open
Don't try to answer everything in the first draft. An honest "TBD — need input from data team" is better than a guess. Open questions show maturity, not incompleteness.

### 5. Write for Your Audience
- Engineers need implementation details and edge cases
- Execs need business impact and strategic alignment
- Designers need user flows and interaction patterns

The best PRDs serve all three audiences without being too long. The templates help with this by putting the right content in the right sections.

In the next lesson, you'll use \`generate_prd\` and \`validate_prd\` to turn your thinking into a complete document.`,
      teacherNotes: "Close with encouragement: they now understand the structure. The next lesson is where they'll actually generate a PRD and see the tools in action.",
    },
  ],
  exercise: {
    title: "Analyze a PRD Template",
    description:
      "Deep-dive into the template that best fits your project and identify which sections you'd customize.",
    steps: [
      "Use list_templates to see all three templates",
      "Pick the one that best fits your current project",
      "Use get_questions to see the 10 questions for your chosen template",
      "For each question, write a 1-sentence answer (even if rough)",
      "Identify which sections of the template you'd add, remove, or rename for your team's format",
      "Ask Claude: 'What's missing from this template for a [your industry] product?'",
    ],
    validation:
      "You've completed this exercise if: (1) You've reviewed all three templates, (2) You have rough answers for all 10 questions in your chosen template, and (3) You've identified at least one customization for your team's needs.",
  },
  quiz: {
    questions: [
      {
        question: "What are the three sections PMs most commonly skip in PRDs?",
        options: [
          "Overview, Timeline, Open Questions",
          "Success Metrics, Edge Cases, Risks & Mitigations",
          "User Stories, Design Considerations, Technical Approach",
          "Problem Statement, Requirements, Launch Plan",
        ],
        correctIndex: 1,
        explanation:
          "Success Metrics, Edge Cases, and Risks & Mitigations are the most commonly skipped — and they cause the most review pushback. Engineers find edge cases you missed. Execs question vague success criteria. The validate_prd tool checks specifically for these gaps.",
      },
      {
        question: "When should you use the API Integration template instead of Feature Launch?",
        options: [
          "When the feature involves any API calls",
          "When you're specifically integrating with a third-party API or building a new API",
          "When the feature is technically complex",
          "When you need more sections in your PRD",
        ],
        correctIndex: 1,
        explanation:
          "The API Integration template is designed for cases where the core of your project is connecting to an external API or building one. It has unique sections for authentication, data flow, rate limits, and error handling that the Feature Launch template doesn't cover.",
      },
      {
        question: "What two unique sections does the Product Redesign template include?",
        options: [
          "API Specification and Rate Limits",
          "Current State Analysis and Migration Plan",
          "User Research and Competitor Analysis",
          "Technical Approach and Performance Requirements",
        ],
        correctIndex: 1,
        explanation:
          "The Redesign template includes Current State Analysis (what exists today) and Migration Plan (how existing users transition). These are critical because redesigns change things people already use, and you need to document both what you're changing and how users will be moved to the new experience.",
      },
      {
        question: "What makes a success metric 'falsifiable'?",
        options: [
          "It includes a deadline",
          "It's approved by the exec team",
          "It has a specific number that you either hit or don't",
          "It mentions the word 'improve'",
        ],
        correctIndex: 2,
        explanation:
          "A falsifiable metric has a specific target number: 'Reduce checkout abandonment from 67% to 50% within 3 months.' You can objectively determine whether you hit it. 'Improve user experience' is not falsifiable — you can always claim success.",
      },
    ],
  },
};

export default lesson;
