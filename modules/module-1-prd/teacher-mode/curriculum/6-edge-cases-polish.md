# Lesson 6: Edge Cases & Polish

**Estimated time: 15 minutes**
**Lesson type: Hands-on + Wrap-up**

---

## Edge Cases: Think Like QA Before QA Does

The single fastest way to earn engineering trust as a PM is to include edge cases in your PRD. When an engineer reads "What happens when the API is down?" in your PRD *before* they bring it up, they think: "This PM actually thought this through."

### The suggest_edge_cases Tool

The `suggest_edge_cases` tool takes two inputs:
1. **template** -- Your PRD template type
2. **productDescription** -- A brief description of what you're building

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
1. Run `suggest_edge_cases` for your template and product
2. Read through all suggestions
3. Mark which ones are relevant to your product
4. For each relevant edge case, write a one-line response: what the system should do
5. Add the top 5-8 to your PRD's Edge Cases section

---

## The Complete PRD Workflow

Here's the complete workflow you've learned across all 6 lessons:

### Phase 1: Prepare (5 min)
- @-mention 3-5 relevant docs (strategy, research, architecture)
- Describe what you're building and why
- Pick a template with `list_templates`

### Phase 2: Think (15 min)
- Get questions with `get_questions`
- Answer each question thoroughly, engaging with follow-ups
- Explore 2-3 alternative approaches
- Flag uncertainty -- "TBD" is a valid answer

### Phase 3: Generate (5 min)
- Create the PRD with `generate_prd`
- Read through it -- does it capture your thinking?

### Phase 4: Validate (10 min)
- Check completeness with `validate_prd`
- Address the top gaps (metrics, edge cases, risks)
- Re-validate until Grade B or above

### Phase 5: Review (10 min)
- Get multi-perspective feedback with `review_prd` (all perspectives)
- Prioritize shared concerns
- Address top 3-5 issues

### Phase 6: Polish (5 min)
- Add edge cases with `suggest_edge_cases`
- Final validation check
- Ready to share with stakeholders

**Total: ~50 minutes for a PRD that covers all the bases.**

Compare that to 4-8 hours of traditional PRD writing -- and the AI-assisted version catches more edge cases and has better structure.

---

## Best Practices

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
- **Generate PRDs for features you don't understand.** AI can't compensate for a PM who hasn't talked to users

---

## Pro Tips for Ongoing Improvement

### Build a Context Library
Keep a folder of @-mentionable docs: strategy, personas, architecture, OKRs. Update it quarterly. This gives you a fast startup for every PRD.

### Validate Old PRDs
Paste one of your old PRDs into `validate_prd` and see how it scores. Compare it to a new one. You'll see your PRD quality improve over time.

### Create a Review Ritual
Before sharing any PRD, run the "all perspectives" review. It takes 2 minutes and catches issues that would otherwise surface in a meeting.

### Pair With a Colleague
One person drives Claude, the other challenges the answers. The combination of human debate and AI structure produces the best PRDs.

### Track Your Validation Scores
Your first PRDs might score C or D. After a few iterations with the tools, you'll consistently hit A. Track this improvement -- it's a great signal of PM skill growth.

### Customize Your Templates
If your team has a specific PRD format, customize the template sections to match. The key is consistency -- use the same structure across your team so PRDs are easy to review.

---

## What's Next

Congratulations! You've completed the PRD Generation course. You now know how to:

1. **Load context** with @-mentions for product-specific AI assistance
2. **Think deeply** through Socratic questioning
3. **Choose the right template** for your project type
4. **Generate structured PRDs** from your thinking
5. **Validate completeness** and fix gaps systematically
6. **Get multi-perspective reviews** before sharing with stakeholders
7. **Add edge cases** that earn engineering trust

### Your Next Steps

1. **Write a real PRD** using the complete workflow -- context, questions, generate, validate, review, polish
2. **Share it with your team** and compare the feedback to what the tools caught
3. **Try Module 2** -- Rollout Plan Generator uses the same AI-partnership approach for launch planning
4. **Try Module 3** -- MCP Integrations Course teaches you to build custom MCP servers for any tool

### The Bigger Picture

The techniques in this course -- context loading, Socratic questioning, multi-perspective review -- work beyond PRDs. Use them for:
- Strategy docs
- Design briefs
- Technical specs
- Quarterly planning
- Any document where thinking quality matters

The AI doesn't replace your judgment. It sharpens it.

---

## Exercise: Complete PRD -- Start to Finish

Write a complete PRD using the full workflow -- from context loading to polished output.

1. Choose a real feature or product you want to write a PRD for
2. Load context: describe the product, users, and strategic context to Claude
3. Pick a template with `list_templates`
4. Answer all 10 questions from `get_questions` (take your time, engage with follow-ups)
5. Generate the PRD with `generate_prd`
6. Validate with `validate_prd` and fix gaps until Grade B+
7. Review with `review_prd` using all perspectives
8. Add edge cases with `suggest_edge_cases`
9. Final validate -- aim for Grade A
10. Read your finished PRD -- would you share this with your team?

**Completion check:** You've completed this exercise if: (1) You wrote a complete PRD using all 6 tools, (2) Your PRD validates at Grade B or above, (3) You addressed feedback from the multi-perspective review, and (4) You'd feel confident sharing this PRD with real stakeholders.

---

## Quick Check

1. What's the fastest way to earn engineering trust as a PM through your PRD?
2. What's the correct order of the complete PRD workflow?
3. What's the biggest pitfall when using AI to write PRDs?
4. How much time does the complete AI-assisted PRD workflow typically take?

---

*Previous: [Lesson 5: Multi-Perspective Review](5-multi-perspective-review.md)*
