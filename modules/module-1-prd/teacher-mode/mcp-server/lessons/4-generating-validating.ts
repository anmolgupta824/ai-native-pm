import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 4,
  title: "Generating & Validating PRDs",
  duration: "25 min",
  objectives: [
    "Use the generate_prd tool to create a complete PRD from your answers",
    "Understand how the validation scoring system works",
    "Learn to iterate on a PRD based on validation feedback",
    "Practice the generate-validate-improve loop",
  ],
  sections: [
    {
      id: "generation-flow",
      title: "The Generation Flow",
      content: `## From Thinking to Document

You've done the hard work: loading context, answering questions, exploring alternatives. Now it's time to turn that thinking into a structured PRD.

### How generate_prd Works

The \`generate_prd\` tool takes three inputs:
1. **template** — Which template type (feature-launch, api-integration, or redesign)
2. **productName** — The name of your feature or product
3. **answers** — A map of question-to-answer pairs from your Socratic exploration

It returns:
- A complete PRD document in Markdown
- An automatic validation score
- Suggestions for improvement

### What Claude Does With Your Answers

When you ask Claude to generate a PRD, it maps your conversational answers to the template's sections. For example:
- Your answer to "What problem does this solve?" → Problem Statement section
- Your answer to "How will you measure success?" → Goals & Success Metrics section
- Your answer to "What could go wrong?" → Risks & Mitigations section

The generated PRD isn't a raw dump of your answers — Claude structures and expands them into proper PRD prose with headings, bullet points, and tables where appropriate.

### The Pre-Ship Checklist

Every generated PRD includes a pre-ship checklist at the bottom:
- [ ] All requirements reviewed by engineering
- [ ] Design mocks approved
- [ ] Success metrics finalized with data team
- [ ] Edge cases documented
- [ ] Rollback plan tested
- [ ] Stakeholder sign-off obtained
- [ ] Launch date confirmed
- [ ] Monitoring and alerting set up`,
      teacherNotes: "Walk the student through the flow. If they've answered questions in the previous exercises, suggest they actually generate a PRD now. Seeing their thinking turned into a document is the 'aha moment.'",
      checkQuestion: "Have you answered enough questions to generate a PRD? (You need at least 5-6 solid answers for a useful output.)",
    },
    {
      id: "validation-scoring",
      title: "How Validation Scoring Works",
      content: `## validate_prd: Your Quality Checker

The \`validate_prd\` tool scores your PRD on completeness. It checks for 10 critical elements:

| Check | What It Looks For | Weight |
|-------|-------------------|--------|
| Problem statement | Evidence of a clearly stated problem | Required |
| Success metrics | Specific, measurable KPIs | Required |
| User stories | User personas or use cases | Important |
| Requirements | Functional specifications | Important |
| Edge cases | Error scenarios and boundaries | Important |
| Timeline | Milestones or deadlines | Standard |
| Risks | Risk identification and mitigation | Standard |
| Stakeholders | Ownership and sign-off | Standard |
| Rollout plan | Deployment or launch strategy | Standard |
| Open questions | Acknowledged unknowns | Standard |

### The Grading Scale

| Grade | Score | What It Means |
|-------|-------|---------------|
| **A - Excellent** | 90-100% | Ready to share with stakeholders |
| **B - Good** | 80-89% | Solid, review the suggestions for polish |
| **C - Needs Work** | 60-79% | Missing critical sections, iterate before sharing |
| **D - Incomplete** | <60% | Major gaps, go back to the questioning phase |

### What the Score Really Means

An A grade doesn't mean your PRD is perfect — it means it's structurally complete. The content quality still depends on the depth of your answers during the Socratic phase.

A C or D grade doesn't mean you failed — it means you have specific, identifiable gaps to fill. That's much better than sharing a PRD and having reviewers find those gaps for you.`,
      checkQuestion: "What grade do you think your last PRD would get from this validation system?",
    },
    {
      id: "generate-validate-loop",
      title: "The Generate-Validate-Improve Loop",
      content: `## Iterate Until It's Ready

The best PRDs come from iteration, not from one-shot generation. Here's the loop:

### Step 1: Generate
Use \`generate_prd\` with your best answers. Don't wait for perfect answers — generate with what you have.

### Step 2: Validate
Use \`validate_prd\` on the generated PRD. Look at:
- **Score** — Are you at A or B? If C or D, focus on the missing sections.
- **Missing sections** — These are specific things to add.
- **Suggestions** — These are improvements to existing sections.

### Step 3: Improve
Address the gaps. You don't need to regenerate the entire PRD — just fill in the missing sections. Common improvements:

- Add specific success metrics (the most common gap)
- Add edge cases (use \`suggest_edge_cases\` if you need ideas)
- Add a risk section with real risks and mitigations
- Add a rollback plan (even a simple one)

### Step 4: Re-validate
Run \`validate_prd\` again. You should see your score improve. Repeat until you're at B or above.

### The 80/20 Rule

Getting from D to B usually takes 10-15 minutes. Getting from B to A takes another 10. Getting from A to A+ isn't worth the time — share it and iterate based on real feedback from stakeholders.`,
      teacherNotes: "If the student has generated a PRD, help them validate it now. Walk through the missing sections together. The 'aha moment' is seeing specific, actionable gaps instead of vague 'this needs work' feedback.",
    },
    {
      id: "common-gaps",
      title: "Most Common Validation Gaps",
      content: `## The Top 5 Gaps (and How to Fix Them)

After validating hundreds of PRDs, these are the most common missing elements:

### 1. Vague Success Metrics
**What validation catches:** No specific numbers, no baseline, no target.
**Fix:** Use the format: "[Metric] from [baseline] to [target] within [timeframe]"
- Bad: "Improve user engagement"
- Good: "Increase 24-hour notification read rate from 45% to 80% within 3 months"

### 2. Missing Edge Cases
**What validation catches:** No mention of error scenarios or boundary conditions.
**Fix:** Use \`suggest_edge_cases\` to get template-specific suggestions. Add the 5 most relevant ones.

### 3. No Rollback Plan
**What validation catches:** No mention of how to undo the change if something goes wrong.
**Fix:** Add a simple rollback section: "If [metric] degrades by more than [X%], we will [specific action]."

### 4. No Risk Identification
**What validation catches:** No mention of what could go wrong.
**Fix:** List 3-5 risks with likelihood (low/medium/high), impact, and mitigation strategy. Technical risks, business risks, and timeline risks.

### 5. Missing Stakeholder Sign-Off
**What validation catches:** No mention of who owns or approves the PRD.
**Fix:** Add an owner (you) and a list of stakeholders who need to sign off before development begins.`,
      checkQuestion: "Which of these 5 gaps is most relevant to your PRD right now?",
    },
    {
      id: "edge-cases-tool",
      title: "Using suggest_edge_cases",
      content: `## suggest_edge_cases: Think Like QA

The \`suggest_edge_cases\` tool generates edge cases specific to your template type and product description. It returns two types:

### Universal Edge Cases
These apply to almost any feature:
- What happens with no internet connection?
- What if the user's session expires mid-flow?
- How does this work on mobile vs desktop?
- What about very slow network connections?
- How do you handle concurrent users editing the same data?

### Template-Specific Edge Cases

**Feature Launch:**
- What if the feature conflicts with an existing workflow?
- How do power users vs new users experience this differently?
- What happens at scale (10x current traffic)?

**API Integration:**
- What if the third-party API changes its schema without notice?
- How do you handle partial failures in batch operations?
- What if authentication tokens expire during a long-running operation?

**Product Redesign:**
- What if users can't find features that moved to new locations?
- What happens to saved preferences from the old design?
- What if A/B testing shows the old design performs better?

### How to Use Edge Cases in Your PRD

Don't add every edge case to your PRD. Pick the 5-8 most relevant ones and add them to the "Edge Cases & Error Handling" section with your planned response:

"**Edge case:** User's session expires during checkout.
**Response:** Save cart state to local storage, prompt re-auth, restore cart."`,
      teacherNotes: "Have the student run suggest_edge_cases for their project. Then ask them to pick the 5 most relevant ones and write a one-line response for each.",
    },
    {
      id: "real-world-example",
      title: "Real-World Example: Start to Finish",
      content: `## Putting It All Together

Here's a complete walkthrough of the generate-validate-improve loop:

### The Project: In-App Notifications Center

**Step 1: Generate** (5 min)
Generated a Feature Launch PRD from 10 answered questions.

**Step 2: First Validation**
- Score: 70% (Grade C - Needs Work)
- Missing: Success metrics (vague), edge cases, rollback plan, risk section
- Suggestions: "Add specific metrics," "Consider edge cases," "Add risks"

**Step 3: First Improvement** (10 min)
- Added: "Median notification response time from N/A to < 4 hours"
- Added: "WebSocket reconnection rate < 2%"
- Added 6 edge cases from \`suggest_edge_cases\`
- Added risk section with 4 risks and mitigations
- Added rollback plan: "Feature flag kill switch, <30 second rollback"

**Step 4: Second Validation**
- Score: 90% (Grade A - Excellent)
- Suggestions: "Consider adding stakeholder sign-off list"
- Added owner and 3 stakeholder names

**Result:** A production-ready PRD in ~20 minutes of iteration (after the ~25 minutes of Socratic exploration).

### Key Lesson
The first draft is never final. But with validation feedback, the path from first draft to ready-to-share is clear and fast.

Next lesson: You'll learn to use \`review_prd\` to get multi-perspective feedback from Engineer, Designer, and QA personas.`,
      teacherNotes: "If the student has been working with a real project, encourage them to do this loop now. If not, walk through the example and make sure they understand the iteration pattern.",
    },
  ],
  exercise: {
    title: "Generate and Validate a PRD",
    description:
      "Generate a complete PRD from your answers and iterate on it using the validation loop.",
    steps: [
      "Use generate_prd with your template type, product name, and your question answers from previous exercises",
      "Read through the generated PRD — does it capture your thinking accurately?",
      "Use validate_prd on the generated PRD and note the score and missing sections",
      "Address the top 3 gaps identified by validation (add metrics, edge cases, or risks)",
      "Use suggest_edge_cases to get edge case ideas and add the 5 most relevant ones",
      "Re-validate the improved PRD — aim for a B grade (80%) or higher",
      "If you're below B, iterate one more time on the remaining gaps",
    ],
    validation:
      "You've completed this exercise if: (1) You generated a complete PRD, (2) You validated it and saw specific gaps, (3) You improved it and re-validated with a higher score, and (4) Your PRD scores at least 80% (Grade B).",
  },
  quiz: {
    questions: [
      {
        question: "What does a Grade C (60-79%) validation score mean?",
        options: [
          "Your PRD is terrible and should be rewritten from scratch",
          "Your PRD has specific gaps to fill but has a solid foundation",
          "Your PRD is ready to share with stakeholders",
          "You need to redo the Socratic questioning phase",
        ],
        correctIndex: 1,
        explanation:
          "A Grade C means your PRD has a solid foundation but is missing critical sections. The validation tells you exactly what's missing (e.g., success metrics, edge cases, risks), so you know exactly what to add. It's much better to find these gaps through validation than through a review meeting.",
      },
      {
        question: "What is the most common gap found by validate_prd?",
        options: [
          "Missing overview section",
          "Too many requirements",
          "Vague or missing success metrics",
          "No user stories",
        ],
        correctIndex: 2,
        explanation:
          "Vague success metrics are the most common gap. PMs often write 'improve user engagement' instead of specific, measurable targets like 'increase 24-hour read rate from 45% to 80% within 3 months.' The validate_prd tool specifically flags this.",
      },
      {
        question: "How should you format edge cases in your PRD?",
        options: [
          "Just list the edge case names",
          "Describe the edge case scenario AND your planned response",
          "Only include edge cases that have already happened",
          "Put all edge cases in a separate document",
        ],
        correctIndex: 1,
        explanation:
          "Each edge case should have both the scenario (what could happen) and your planned response (what the system does). For example: 'Edge case: Session expires during checkout. Response: Save cart to local storage, prompt re-auth, restore cart.' This shows engineers you've thought through the handling, not just identified the risk.",
      },
      {
        question: "When should you stop iterating on a PRD?",
        options: [
          "After the first validation",
          "When it reaches 100% score",
          "When it reaches Grade B (80%) or higher — then share and iterate on real feedback",
          "After exactly 3 improvement cycles",
        ],
        correctIndex: 2,
        explanation:
          "Getting from D to B usually takes 10-15 minutes. Getting from B to A takes another 10. Getting from A to 100% isn't worth the time. Share at B or above and iterate based on real feedback from stakeholders. The 80/20 rule applies — most value comes from the first few iterations.",
      },
    ],
  },
};

export default lesson;
