import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 6,
  title: "Edge Cases & Polish",
  duration: "15 min",
  objectives: [
    "Use suggest_edge_cases for thorough edge case coverage",
    "Learn the complete PRD workflow from start to finish",
    "Understand best practices and common pitfalls",
    "Know how to continue improving your PRD skills over time",
  ],
  sections: [
    {
      id: "edge-cases-deep-dive",
      title: "Edge Cases: Think Like QA Before QA Does",
      content: `## Why Edge Cases Win Trust

The single fastest way to earn engineering trust as a PM is to include edge cases in your PRD. When an engineer reads "What happens when the API is down?" in your PRD *before* they bring it up, they think: "This PM actually thought this through."

### The suggest_edge_cases Tool

The \`suggest_edge_cases\` tool takes two inputs:
1. **template** — Your PRD template type
2. **productDescription** — A brief description of what you're building

It returns edge cases in two categories:

**Universal edge cases** (apply to everything):
- No internet connection
- Session expiration mid-flow
- Mobile vs desktop differences
- Very slow network connections
- Concurrent users editing the same data

**Template-specific edge cases** (tailored to your template type):
- Feature Launch: Feature conflicts, power users vs new users, scale at 10x
- API Integration: Schema changes, rate limiting, partial failures, token expiration
- Redesign: Features moved to new locations, saved preferences, A/B testing

### How to Use Edge Cases in Your PRD

Don't add all edge cases blindly. Use this process:
1. Run \`suggest_edge_cases\` for your template and product
2. Read through all suggestions
3. Mark which ones are relevant to your product
4. For each relevant edge case, write a one-line response: what the system should do
5. Add the top 5-8 to your PRD's Edge Cases section`,
      teacherNotes: "Edge cases are often the section that turns a good PRD into a great one. If the student has been building a real PRD, have them run suggest_edge_cases now.",
      checkQuestion: "What edge case would be most embarrassing to miss in your current project?",
    },
    {
      id: "complete-workflow",
      title: "The Complete PRD Workflow",
      content: `## The Full Flow: Start to Finish

Here's the complete workflow you've learned across all 6 lessons:

### Phase 1: Prepare (5 min)
- @-mention 3-5 relevant docs (strategy, research, architecture)
- Describe what you're building and why
- Pick a template with \`list_templates\`

### Phase 2: Think (15 min)
- Get questions with \`get_questions\`
- Answer each question thoroughly, engaging with follow-ups
- Explore 2-3 alternative approaches
- Flag uncertainty — "TBD" is a valid answer

### Phase 3: Generate (5 min)
- Create the PRD with \`generate_prd\`
- Read through it — does it capture your thinking?

### Phase 4: Validate (10 min)
- Check completeness with \`validate_prd\`
- Address the top gaps (metrics, edge cases, risks)
- Re-validate until Grade B or above

### Phase 5: Review (10 min)
- Get multi-perspective feedback with \`review_prd\` (all perspectives)
- Prioritize shared concerns
- Address top 3-5 issues

### Phase 6: Polish (5 min)
- Add edge cases with \`suggest_edge_cases\`
- Final validation check
- Ready to share with stakeholders

**Total: ~50 minutes for a PRD that covers all the bases.**

Compare that to 4-8 hours of traditional PRD writing — and the AI-assisted version catches more edge cases and has better structure.`,
      checkQuestion: "Which phase of this workflow do you think will save you the most time?",
    },
    {
      id: "best-practices",
      title: "Best Practices",
      content: `## Do's and Don'ts

### Do

- **Think first, generate second.** The questioning phase is where the real value is, not the generation
- **Be specific with metrics.** "Improve engagement" is worthless. "Increase 24-hr read rate from 45% to 80%" is actionable
- **Challenge the AI's suggestions.** If an edge case doesn't apply, say why. Push back on questions that feel off
- **Iterate on the output.** The first draft is never final. Use validate and review to find gaps
- **Save your best prompts.** Build a personal library of prompts that produce great results
- **Use real context.** @-mention real docs, use real product names, reference real data

### Don't

- **Accept the first output blindly.** AI-generated does not mean production-ready. You are the PM
- **Skip the problem statement.** A crisp problem is 60% of a good PRD
- **Use AI to avoid hard thinking.** If you can't explain the "why" verbally, the PRD won't be convincing
- **Forget your audience.** Engineers, designers, and execs read PRDs differently
- **Generate PRDs for features you don't understand.** AI can't compensate for a PM who hasn't talked to users`,
      teacherNotes: "The biggest pitfall: using AI to skip the thinking. Reinforce that the tools are thinking partners, not content generators.",
    },
    {
      id: "pro-tips",
      title: "Pro Tips for Ongoing Improvement",
      content: `## Level Up Over Time

### Build a Context Library
Keep a folder of @-mentionable docs: strategy, personas, architecture, OKRs. Update it quarterly. This gives you a fast startup for every PRD.

### Validate Old PRDs
Paste one of your old PRDs into \`validate_prd\` and see how it scores. Compare it to a new one. You'll see your PRD quality improve over time.

### Create a Review Ritual
Before sharing any PRD, run the "all perspectives" review. It takes 2 minutes and catches issues that would otherwise surface in a meeting.

### Pair With a Colleague
One person drives Claude, the other challenges the answers. The combination of human debate and AI structure produces the best PRDs.

### Track Your Validation Scores
Your first PRDs might score C or D. After a few iterations with the tools, you'll consistently hit A. Track this improvement — it's a great signal of PM skill growth.

### Customize Your Templates
If your team has a specific PRD format, customize the template sections to match. The key is consistency — use the same structure across your team so PRDs are easy to review.`,
    },
    {
      id: "whats-next",
      title: "What's Next",
      content: `## Congratulations!

You've completed the PRD Generation course. You now know how to:

1. **Load context** with @-mentions for product-specific AI assistance
2. **Think deeply** through Socratic questioning
3. **Choose the right template** for your project type
4. **Generate structured PRDs** from your thinking
5. **Validate completeness** and fix gaps systematically
6. **Get multi-perspective reviews** before sharing with stakeholders
7. **Add edge cases** that earn engineering trust

### Your Next Steps

1. **Write a real PRD** using the complete workflow — context, questions, generate, validate, review, polish
2. **Share it with your team** and compare the feedback to what the tools caught
3. **Try Module 2** — [Rollout Plan Generator](../../module-2-rollout/) uses the same AI-partnership approach for launch planning
4. **Try Module 3** — [MCP Integrations Course](../../module-3-mcp-course/) teaches you to build custom MCP servers for any tool

### The Bigger Picture

The techniques in this course — context loading, Socratic questioning, multi-perspective review — work beyond PRDs. Use them for:
- Strategy docs
- Design briefs
- Technical specs
- Quarterly planning
- Any document where thinking quality matters

The AI doesn't replace your judgment. It sharpens it.`,
      teacherNotes: "Celebrate their completion! Encourage them to write a real PRD this week and share how it went. Point them to Module 2 and Module 3 for continued learning.",
    },
  ],
  exercise: {
    title: "Complete PRD: Start to Finish",
    description:
      "Write a complete PRD using the full workflow — from context loading to polished output.",
    steps: [
      "Choose a real feature or product you want to write a PRD for",
      "Load context: describe the product, users, and strategic context to Claude",
      "Pick a template with list_templates",
      "Answer all 10 questions from get_questions (take your time, engage with follow-ups)",
      "Generate the PRD with generate_prd",
      "Validate with validate_prd and fix gaps until Grade B+",
      "Review with review_prd using all perspectives",
      "Add edge cases with suggest_edge_cases",
      "Final validate — aim for Grade A",
      "Read your finished PRD — would you share this with your team?",
    ],
    validation:
      "You've completed this exercise if: (1) You wrote a complete PRD using all 6 tools, (2) Your PRD validates at Grade B or above, (3) You addressed feedback from the multi-perspective review, and (4) You'd feel confident sharing this PRD with real stakeholders.",
  },
  quiz: {
    questions: [
      {
        question: "What's the fastest way to earn engineering trust as a PM through your PRD?",
        options: [
          "Make the PRD as long as possible",
          "Include edge cases and error handling that engineers would have flagged",
          "Use as many technical terms as possible",
          "Skip the problem statement and get straight to requirements",
        ],
        correctIndex: 1,
        explanation:
          "When engineers see that you've already thought about edge cases, error handling, and failure modes, they trust that you understand the complexity of what you're asking them to build. The suggest_edge_cases tool helps you think through these scenarios systematically.",
      },
      {
        question: "What's the correct order of the complete PRD workflow?",
        options: [
          "Generate → Validate → Context → Questions → Review → Polish",
          "Context → Questions → Generate → Validate → Review → Polish",
          "Questions → Context → Review → Generate → Validate → Polish",
          "Context → Generate → Questions → Validate → Review → Polish",
        ],
        correctIndex: 1,
        explanation:
          "The workflow is: Context (load relevant docs) → Questions (Socratic exploration) → Generate (create the PRD) → Validate (check completeness) → Review (multi-perspective feedback) → Polish (edge cases and final tweaks). Each step builds on the previous one.",
      },
      {
        question: "What's the biggest pitfall when using AI to write PRDs?",
        options: [
          "The AI makes too many mistakes",
          "The AI is too slow",
          "Using AI to skip the thinking — accepting output without engaging with the questions",
          "The templates are too rigid",
        ],
        correctIndex: 2,
        explanation:
          "The biggest pitfall is using AI as a content generator instead of a thinking partner. If you skip the Socratic questioning and just ask for a PRD, you get generic output. The real value comes from engaging deeply with the questions — that's where your product knowledge and judgment create a PRD that no AI could write alone.",
      },
      {
        question: "How much time does the complete AI-assisted PRD workflow typically take?",
        options: [
          "5-10 minutes",
          "About 50 minutes (vs 4-8 hours traditional)",
          "2-3 hours",
          "About the same as traditional PRD writing",
        ],
        correctIndex: 1,
        explanation:
          "The complete workflow — context loading, Socratic exploration, generation, validation, review, and polish — takes about 50 minutes. Compare that to 4-8 hours of traditional PRD writing, and the AI-assisted version catches more edge cases and has better structure. The time savings come from faster iteration, not from skipping thinking.",
      },
    ],
  },
};

export default lesson;
