import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 5,
  title: "Multi-Perspective Review",
  duration: "20 min",
  objectives: [
    "Use the review_prd tool to get feedback from Engineering, Design, and QA perspectives",
    "Understand what each reviewer persona focuses on and why",
    "Learn to synthesize feedback from multiple perspectives",
    "Practice addressing review feedback systematically",
  ],
  sections: [
    {
      id: "why-multi-perspective",
      title: "Why Multi-Perspective Review?",
      content: `## The Review Meeting Problem

Every PM knows this scenario: you spend days writing a PRD, share it with the team, and in the review meeting:
- The engineer says "This won't scale"
- The designer says "The user flow doesn't make sense"
- QA says "How do we test this?"

The review meeting becomes a feedback dump, and you leave with a list of revisions that could have been caught earlier.

### Shift Left Your Reviews

The \`review_prd\` tool lets you simulate that review meeting *before* sharing your PRD. Three expert perspectives critique your document:

| Reviewer | Role | Focus |
|----------|------|-------|
| **Engineering Lead** | Technical feasibility expert | Scalability, dependencies, security, timeline realism |
| **Design Lead** | UX and accessibility expert | User flows, consistency, accessibility, research gaps |
| **QA Lead** | Testability expert | Acceptance criteria, edge cases, regression risk, test strategy |

Each reviewer provides:
- **Strengths** — What the PRD does well
- **Concerns** — What needs attention
- **Suggestions** — Specific questions to address
- **Overall Assessment** — Summary judgment

### When to Use It

Review your PRD *after* you've reached Grade B (80%+) on validation. There's no point getting multi-perspective feedback on a PRD that's still missing basic sections.`,
      teacherNotes: "Most PMs will relate to the painful review meeting scenario. Use that to motivate the value of pre-review. The 'shift left' concept is powerful — catch issues before they become expensive.",
      checkQuestion: "What's the most unexpected feedback you've received in a PRD review meeting?",
    },
    {
      id: "engineering-perspective",
      title: "The Engineering Lead Perspective",
      content: `## Engineering Lead Review

The Engineering Lead focuses on **whether this can actually be built** within the proposed timeline and constraints.

### What They Check

| Area | Key Questions |
|------|--------------|
| **Feasibility** | Is this achievable with the current stack? What hidden complexities exist? |
| **Scalability** | How does this perform at 10x load? Database concerns? |
| **Dependencies** | What external services does this depend on? Version compatibility? |
| **Edge Cases** | Race conditions? Concurrent modifications? Data migration? |
| **Security** | Auth gaps? Data handling? Input validation? |
| **Timeline** | Is the estimate realistic? Technical debt impact? Prerequisites? |

### What Triggers Concerns

The Engineering reviewer flags concerns when your PRD:
- Doesn't mention technical architecture or approach
- Has no discussion of scalability or performance
- Ignores external dependencies and their failure modes
- Lacks security considerations
- Has an unrealistic timeline with no technical justification

### How to Address Engineering Feedback

When the Engineering reviewer flags a concern:
1. **Feasibility:** Add a technical approach section or expand the existing one
2. **Scalability:** Add performance requirements (response time, throughput, data volume)
3. **Dependencies:** List external services and what happens when they're down
4. **Security:** Add authentication, authorization, and data handling details
5. **Timeline:** Add engineering estimates or acknowledge areas of uncertainty`,
      checkQuestion: "What's one technical concern an engineer might raise about your current project?",
    },
    {
      id: "design-perspective",
      title: "The Design Lead Perspective",
      content: `## Design Lead Review

The Design Lead focuses on **whether users will actually be able to use this** and whether the experience is consistent with the rest of the product.

### What They Check

| Area | Key Questions |
|------|--------------|
| **User Experience** | Is the flow intuitive? Are there unnecessary steps? Cognitive load? |
| **Accessibility** | WCAG compliance? Screen reader support? Color contrast? |
| **Consistency** | Matches existing design patterns? Consistent terminology? |
| **Research** | What user research supports this? Validated assumptions? |
| **Edge Cases** | Empty states? Error states? Very long text? |
| **Cross-Platform** | Responsive? Touch targets? Slow connections? |

### What Triggers Concerns

The Design reviewer flags concerns when your PRD:
- Doesn't describe the user flow or interaction patterns
- Has no mention of accessibility
- Uses terminology inconsistent with the rest of the product
- Doesn't reference user research or testing plans
- Ignores mobile/responsive considerations

### How to Address Design Feedback

1. **User Experience:** Add user flow descriptions or wireframe references
2. **Accessibility:** Add WCAG compliance requirements and testing plans
3. **Consistency:** Reference existing design system patterns
4. **Research:** Note what user research exists and what testing is planned
5. **Empty/Error States:** Describe what users see when there's no data or something goes wrong`,
      teacherNotes: "PMs often underestimate design concerns in PRDs because they think 'design will figure it out.' But a PRD that addresses UX concerns gets better design collaboration.",
    },
    {
      id: "qa-perspective",
      title: "The QA Lead Perspective",
      content: `## QA Lead Review

The QA Lead focuses on **whether this can be properly tested** and whether the requirements are clear enough to verify.

### What They Check

| Area | Key Questions |
|------|--------------|
| **Acceptance Criteria** | Are criteria specific and measurable? Expected behavior documented? |
| **Testability** | Can each requirement be independently tested? Automation-friendly? |
| **Edge Cases** | Boundary values? Invalid input? Concurrent access? |
| **Regression** | What existing features might be affected? Integration points? |
| **Data Integrity** | Data consistency during failures? Migration risks? |
| **Environments** | Browser/device coverage? Timezone/locale considerations? |

### What Triggers Concerns

The QA reviewer flags concerns when your PRD:
- Has vague acceptance criteria ("it should work well")
- Doesn't mention test strategy or test data requirements
- Ignores boundary conditions and invalid inputs
- Doesn't consider regression risk to existing features
- Lacks environment-specific considerations

### The Acceptance Criteria Test

The QA perspective teaches a valuable lesson: **if you can't test it, you can't ship it.** Every requirement in your PRD should pass this test:

"Given [condition], when [action], then [expected result]."

If you can't fill in those blanks for a requirement, it's not specific enough. The QA reviewer will catch this.`,
      checkQuestion: "Pick one requirement from your PRD — can you state it as 'Given X, when Y, then Z'?",
    },
    {
      id: "using-review-tool",
      title: "Using the review_prd Tool",
      content: `## How to Use review_prd

### Single Perspective

Get feedback from one reviewer at a time:

Ask Claude: "Review my PRD from an engineering perspective" — Claude calls \`review_prd\` with perspective "engineer" and presents the Engineering Lead's feedback.

### All Perspectives at Once

Get the full review board:

Ask Claude: "Review my PRD from all perspectives" — Claude calls \`review_prd\` with perspective "all" and gets feedback from all three reviewers plus a consensus summary.

### The Consensus Summary

When you use "all" perspectives, you also get:
- **Total concerns** across all reviewers
- **Shared themes** — issues flagged by multiple perspectives
- **Priority suggestions** — the top 5 things to address first

### The Recommended Flow

1. **First pass:** Use "all" to get the full picture
2. **Triage:** Focus on concerns flagged by multiple perspectives (these are the most important)
3. **Address:** Fix the top 5 priority suggestions
4. **Second pass:** Run "all" again to see improvement
5. **Ship:** When concerns are addressed, your PRD is review-ready`,
      teacherNotes: "If the student has a generated PRD, have them run review_prd now. The feedback is often eye-opening — perspectives they hadn't considered.",
    },
    {
      id: "synthesizing-feedback",
      title: "Synthesizing Feedback and Next Steps",
      content: `## From Feedback to Action

### Prioritization Framework

When you get feedback from three perspectives, prioritize this way:

1. **Shared concerns** (flagged by 2+ perspectives) → Address immediately
2. **High-impact concerns** (affect core functionality or user safety) → Address before sharing
3. **Polish concerns** (nice-to-have improvements) → Address if time permits

### Common Cross-Perspective Patterns

| Pattern | What It Means |
|---------|---------------|
| Engineer + QA both flag edge cases | Your PRD is missing critical error handling |
| Designer + QA both flag unclear requirements | Requirements are too vague to implement or test |
| All three flag missing sections | Your PRD needs more structure before review |
| Few concerns across all three | Your PRD is ready to share |

### The Full PRD Workflow (Complete)

1. **Context** — @-mention relevant docs (Lesson 2)
2. **Questions** — Socratic exploration with get_questions (Lesson 2)
3. **Structure** — Choose the right template (Lesson 3)
4. **Generate** — Create the PRD with generate_prd (Lesson 4)
5. **Validate** — Check completeness with validate_prd (Lesson 4)
6. **Review** — Multi-perspective feedback with review_prd (this lesson)
7. **Polish** — Edge cases with suggest_edge_cases (next lesson)
8. **Share** — Ready for real stakeholder review

In the next lesson, you'll learn to use \`suggest_edge_cases\` for final polish and see how all the tools work together in a real-world workflow.`,
      teacherNotes: "Celebrate — the student now knows 5 of the 6 tools. One more lesson and they'll have the complete toolkit. Encourage them to try the full workflow on their real project.",
    },
  ],
  exercise: {
    title: "Multi-Perspective PRD Review",
    description:
      "Review your generated PRD from all three perspectives and address the top concerns.",
    steps: [
      "Make sure you have a generated PRD from the Lesson 4 exercise (or generate one now)",
      "Ask Claude to review your PRD from all perspectives using review_prd with perspective 'all'",
      "Read through each reviewer's strengths, concerns, and suggestions",
      "Identify the top 3 concerns that were flagged by multiple perspectives",
      "Address those 3 concerns by adding or improving PRD sections",
      "Run the review again and compare — did the number of concerns decrease?",
    ],
    validation:
      "You've completed this exercise if: (1) You received reviews from all three perspectives, (2) You identified and addressed at least 3 concerns, and (3) The second review shows improvement.",
  },
  quiz: {
    questions: [
      {
        question: "What three reviewer perspectives does review_prd provide?",
        options: [
          "CEO, CTO, and CFO",
          "Engineering Lead, Design Lead, and QA Lead",
          "Product Manager, Engineer, and User",
          "Technical Writer, Project Manager, and Architect",
        ],
        correctIndex: 1,
        explanation:
          "The review_prd tool provides feedback from an Engineering Lead (technical feasibility), Design Lead (user experience and accessibility), and QA Lead (testability and acceptance criteria). Each catches different types of issues in your PRD.",
      },
      {
        question: "When should you run review_prd on your PRD?",
        options: [
          "Before writing any content",
          "After getting a Grade B (80%+) on validation",
          "Only after stakeholders have reviewed it",
          "After every single edit",
        ],
        correctIndex: 1,
        explanation:
          "Run review_prd after your PRD passes validation at Grade B or higher. There's no point getting multi-perspective feedback on a PRD that's still missing basic sections — fix the structural gaps first with validate_prd, then get perspective-based feedback.",
      },
      {
        question: "What should you prioritize when multiple perspectives flag the same concern?",
        options: [
          "Ignore it — it's probably not important",
          "Address it immediately — shared concerns are the highest priority",
          "Only address it if engineering flagged it",
          "Save it for the next version",
        ],
        correctIndex: 1,
        explanation:
          "When multiple perspectives flag the same concern, it's a signal that there's a real gap in your PRD. Shared concerns should be addressed immediately because they indicate issues that will affect feasibility, usability, AND testability — all at once.",
      },
      {
        question: "What does the QA perspective mean by 'acceptance criteria should be falsifiable'?",
        options: [
          "They should be proven wrong before development starts",
          "They should be stated as 'Given X, when Y, then Z' so they can be objectively verified",
          "They should include the word 'false' somewhere",
          "They should be reviewed by the legal team",
        ],
        correctIndex: 1,
        explanation:
          "Falsifiable acceptance criteria can be objectively tested: 'Given a user clicks submit, when the form has empty required fields, then error messages appear for each empty field.' If you can't state a requirement in Given/When/Then format, it's too vague to test — and too vague to build.",
      },
    ],
  },
};

export default lesson;
