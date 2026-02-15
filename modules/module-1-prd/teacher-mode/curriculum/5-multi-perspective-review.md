# Lesson 5: Multi-Perspective Review

**Estimated time: 20 minutes**
**Lesson type: Framework + Hands-on**

---

## Why Multi-Perspective Review?

Every PM knows this scenario: you spend days writing a PRD, share it with the team, and in the review meeting:
- The engineer says "This won't scale"
- The designer says "The user flow doesn't make sense"
- QA says "How do we test this?"

The review meeting becomes a feedback dump, and you leave with a list of revisions that could have been caught earlier.

### Shift Left Your Reviews

The `review_prd` tool lets you simulate that review meeting *before* sharing your PRD. Three expert perspectives critique your document:

| Reviewer | Role | Focus |
|----------|------|-------|
| **Engineering Lead** | Technical feasibility expert | Scalability, dependencies, security, timeline realism |
| **Design Lead** | UX and accessibility expert | User flows, consistency, accessibility, research gaps |
| **QA Lead** | Testability expert | Acceptance criteria, edge cases, regression risk, test strategy |

Each reviewer provides:
- **Strengths** -- What the PRD does well
- **Concerns** -- What needs attention
- **Suggestions** -- Specific questions to address
- **Overall Assessment** -- Summary judgment

### When to Use It

Review your PRD *after* you've reached Grade B (80%+) on validation. There's no point getting multi-perspective feedback on a PRD that's still missing basic sections.

---

## The Engineering Lead Perspective

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
5. **Timeline:** Add engineering estimates or acknowledge areas of uncertainty

---

## The Design Lead Perspective

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
5. **Empty/Error States:** Describe what users see when there's no data or something goes wrong

---

## The QA Lead Perspective

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

If you can't fill in those blanks for a requirement, it's not specific enough. The QA reviewer will catch this.

---

## Using the review_prd Tool

### Single Perspective

Get feedback from one reviewer at a time:

Ask Claude: "Review my PRD from an engineering perspective" -- Claude calls `review_prd` with perspective "engineer" and presents the Engineering Lead's feedback.

### All Perspectives at Once

Get the full review board:

Ask Claude: "Review my PRD from all perspectives" -- Claude calls `review_prd` with perspective "all" and gets feedback from all three reviewers plus a consensus summary.

### The Consensus Summary

When you use "all" perspectives, you also get:
- **Total concerns** across all reviewers
- **Shared themes** -- issues flagged by multiple perspectives
- **Priority suggestions** -- the top 5 things to address first

### The Recommended Flow

1. **First pass:** Use "all" to get the full picture
2. **Triage:** Focus on concerns flagged by multiple perspectives (these are the most important)
3. **Address:** Fix the top 5 priority suggestions
4. **Second pass:** Run "all" again to see improvement
5. **Ship:** When concerns are addressed, your PRD is review-ready

---

## Synthesizing Feedback and Next Steps

### Prioritization Framework

When you get feedback from three perspectives, prioritize this way:

1. **Shared concerns** (flagged by 2+ perspectives) -> Address immediately
2. **High-impact concerns** (affect core functionality or user safety) -> Address before sharing
3. **Polish concerns** (nice-to-have improvements) -> Address if time permits

### Common Cross-Perspective Patterns

| Pattern | What It Means |
|---------|---------------|
| Engineer + QA both flag edge cases | Your PRD is missing critical error handling |
| Designer + QA both flag unclear requirements | Requirements are too vague to implement or test |
| All three flag missing sections | Your PRD needs more structure before review |
| Few concerns across all three | Your PRD is ready to share |

### The Full PRD Workflow (Complete)

1. **Context** -- @-mention relevant docs (Lesson 2)
2. **Questions** -- Socratic exploration with get_questions (Lesson 2)
3. **Structure** -- Choose the right template (Lesson 3)
4. **Generate** -- Create the PRD with generate_prd (Lesson 4)
5. **Validate** -- Check completeness with validate_prd (Lesson 4)
6. **Review** -- Multi-perspective feedback with review_prd (this lesson)
7. **Polish** -- Edge cases with suggest_edge_cases (next lesson)
8. **Share** -- Ready for real stakeholder review

In the next lesson, you'll learn to use `suggest_edge_cases` for final polish and see how all the tools work together in a real-world workflow.

---

## Exercise: Multi-Perspective PRD Review

Review your generated PRD from all three perspectives and address the top concerns.

1. Make sure you have a generated PRD from the Lesson 4 exercise (or generate one now)
2. Ask Claude to review your PRD from all perspectives using `review_prd` with perspective "all"
3. Read through each reviewer's strengths, concerns, and suggestions
4. Identify the top 3 concerns that were flagged by multiple perspectives
5. Address those 3 concerns by adding or improving PRD sections
6. Run the review again and compare -- did the number of concerns decrease?

**Completion check:** You've completed this exercise if: (1) You received reviews from all three perspectives, (2) You identified and addressed at least 3 concerns, and (3) The second review shows improvement.

---

## Quick Check

1. What three reviewer perspectives does review_prd provide?
2. When should you run review_prd on your PRD?
3. What should you prioritize when multiple perspectives flag the same concern?
4. What does the QA perspective mean by "acceptance criteria should be falsifiable"?

---

*Previous: [Lesson 4: Generating & Validating PRDs](4-generating-validating.md)*
*Next: [Lesson 6: Edge Cases & Polish](6-edge-cases-polish.md)*
