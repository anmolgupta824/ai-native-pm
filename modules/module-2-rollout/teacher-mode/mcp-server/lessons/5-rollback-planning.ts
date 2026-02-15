import type { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 5,
  title: "Rollback Planning",
  duration: "15 minutes",
  objectives: [
    "Understand why rollback planning is the most skipped and most needed section",
    "Learn the 6 components of a rollback plan",
    "Master the build_rollback_plan tool for deployment-specific procedures",
    "Practice writing rollback triggers with specific, measurable conditions",
    "Learn how different deployment types require different rollback strategies",
  ],
  sections: [
    {
      id: "why-rollback-planning",
      title: "The Section Every PM Skips",
      content: `# The Section Every PM Skips

Rollback planning is the most skipped section of every rollout plan — and the one you need most when things go wrong.

**The math is simple:**
- A rollback plan written in advance: 10 minutes
- A rollback plan written during an incident: 2 hours of panic

**Why PMs skip it:**
- "We'll figure it out if something goes wrong" (narrator: they didn't figure it out)
- "The engineering team knows how to rollback" (narrator: they didn't agree on the process)
- "We've never needed to rollback before" (narrator: this was their first time)

**What happens without a rollback plan:**
1. Something breaks at 3pm on a Friday
2. The PM asks "can we roll back?"
3. Engineering says "define 'roll back' — do you mean the feature flag, the database migration, or the API version?"
4. 45 minutes of discussion about what "rollback" means
5. Someone rolls back the wrong thing
6. Now you have two problems

**The solution:** Write the rollback plan when you're calm, clear, and not on a Zoom call with an angry VP. The \`build_rollback_plan\` tool does exactly this.`,
      teacherNotes: "The humor here is intentional — rollback planning is a topic that can feel dry, so use the narrator commentary to keep it engaging. The key message is: write it now so you don't have to figure it out during a crisis.",
      checkQuestion: "Have you ever been in an incident where the team didn't have a clear rollback plan? What happened?",
    },
    {
      id: "six-components",
      title: "The 6 Components of a Rollback Plan",
      content: `# The 6 Components of a Rollback Plan

Every rollback plan needs these 6 components:

### 1. Trigger
What condition activates the rollback? Must be specific and measurable.
> Bad: "If things go wrong"
> Good: "Error rate exceeds 2% for 15 consecutive minutes"

### 2. Decision Maker
Who authorizes the rollback? One person, not a committee.
> Bad: "The team decides"
> Good: "On-call engineering lead (currently: Mike Chen)"

### 3. Steps
Exact sequence to undo the change. Numbered, unambiguous.
> Bad: "Revert the deployment"
> Good: "1. Disable feature flag 'notifications-v2' in LaunchDarkly 2. Revert DB migration: run migrate:rollback 3. Clear Redis notification cache 4. Verify rollback via health check endpoint"

### 4. Verification
How to confirm the rollback worked. Specific checks.
> Bad: "Check that it's working"
> Good: "Error rate returns to baseline (<0.05%) within 5 minutes of rollback"

### 5. Communication
Who to notify, in what order, via what channel.
> Bad: "Tell everyone"
> Good: "1. #incidents Slack → 2. VP Engineering DM → 3. Status page update → 4. Stakeholder email within 1 hour"

### 6. Post-mortem
When and how to review what happened.
> "Schedule blameless post-mortem within 48 hours. Use standard template in Notion."`,
      teacherNotes: "Walk through each component with the 'bad vs good' examples. The contrast is the teaching moment. The student should understand that vague rollback components are worse than no rollback plan — they create false confidence.",
      checkQuestion: "Which of the 6 components do you think is hardest to define in advance? Why?",
    },
    {
      id: "rollback-triggers",
      title: "Writing Effective Rollback Triggers",
      content: `# Writing Effective Rollback Triggers

Rollback triggers are the most critical part of the rollback plan. They answer: "At what point do we stop and reverse?"

**The formula for a good trigger:**
\`[Metric] [exceeds/drops below] [threshold] for [duration]\`

**Examples of good triggers:**
| Trigger | Why it works |
|---------|-------------|
| Error rate > 2% for 15 minutes | Specific metric, clear threshold, time window prevents false positives |
| p95 latency > 2 seconds for 10 minutes | Performance-based, accounts for normal variance |
| DAU drops > 3% day-over-day | Business metric, catches user-facing issues |
| More than 20 user complaints in first hour | Qualitative signal with quantitative threshold |
| Any data loss in notification history | Zero-tolerance trigger for data integrity |
| Duplicate notifications sent to any user | Immediate trigger — no waiting period needed |

**Types of triggers:**
1. **Automatic triggers** — monitoring tools alert and initiate rollback
2. **Manual triggers** — human reviews metrics and decides
3. **Zero-tolerance triggers** — any occurrence triggers immediate rollback (data loss, security breach)

**Anti-patterns:**
- "If users complain" — too vague, too late
- "If the VP says so" — subjective, not based on data
- "If something feels wrong" — not actionable for an on-call engineer at 2am

**The 3-tier approach:**
- **Tier 1 (Immediate):** Data loss, security breach, duplicates → auto-rollback
- **Tier 2 (15-minute window):** Error rate spike, latency spike → manual decision
- **Tier 3 (24-hour window):** DAU drop, engagement decline → evaluate and decide`,
      teacherNotes: "The trigger formula is the key takeaway. Students should be able to write triggers using [Metric] [exceeds/drops below] [threshold] for [duration]. The 3-tier approach helps them categorize triggers by severity.",
    },
    {
      id: "deployment-specific-rollback",
      title: "Deployment-Specific Rollback Strategies",
      content: `# Deployment-Specific Rollback Strategies

Different deployment architectures require different rollback approaches. The \`build_rollback_plan\` tool adapts to your deployment type.

### Feature Flag Rollback
**How it works:** Toggle the flag to disable the feature.
**Rollback time:** Seconds (near-instant).
**Best for:** New features, UI changes, gradual rollouts.
**Steps:** 1. Disable flag in LaunchDarkly/Split 2. Verify flag is disabled across all regions 3. Monitor metrics for 5 minutes
**Caveat:** Doesn't help with database migrations or backend changes that aren't behind the flag.

### Blue-Green Deployment Rollback
**How it works:** Switch traffic back to the "blue" (previous) environment.
**Rollback time:** 1-5 minutes.
**Best for:** Full application deployments, major version changes.
**Steps:** 1. Switch load balancer to blue environment 2. Verify traffic routing 3. Keep green environment running for investigation
**Caveat:** Requires maintaining two environments. Database schema changes can prevent rollback.

### Rolling Deployment Rollback
**How it works:** Gradually replace new instances with old version.
**Rollback time:** 5-30 minutes depending on cluster size.
**Best for:** Microservices, containerized applications.
**Steps:** 1. Halt rollout 2. Begin rolling back to previous version 3. Wait for all instances to be on old version 4. Verify via health checks
**Caveat:** Slow for large clusters. Mixed state during rollback can cause issues.

### Database Migration Rollback
**Caution:** The hardest type to rollback. Plan carefully.
**Steps:** 1. Run reverse migration 2. Verify data integrity 3. Test application with old schema
**Caveat:** Not all migrations are reversible. Test rollback in staging first. ALWAYS.`,
      teacherNotes: "This section is technical. The student doesn't need to understand every deployment type — focus on the one that matches their organization. The key message is: know your deployment type BEFORE you write the rollback plan.",
      checkQuestion: "What deployment type does your team use? How does that affect your rollback strategy?",
    },
    {
      id: "rollback-best-practices",
      title: "Rollback Planning Best Practices",
      content: `# Rollback Planning Best Practices

**Do:**
- Write the rollback plan BEFORE you launch — not during the incident
- Test the rollback in staging — a rollback plan that hasn't been tested is a wish
- Include specific, measurable triggers — no vibes-based rollback decisions
- Name ONE decision maker — committees don't make fast decisions during incidents
- Practice the rollback with the on-call team — they're the ones executing it at 2am
- Document the rollback steps so specifically that a new team member could execute them

**Don't:**
- Don't assume all changes are reversible — database migrations, sent emails, deleted data
- Don't skip the communication component — stakeholders need to know what happened
- Don't wait for the post-mortem to improve the plan — update triggers after each near-miss
- Don't forget about partial rollback — sometimes you can rollback one component without rolling back everything

**The "2am test":**
Read your rollback plan and ask: "Could an on-call engineer who didn't build this feature execute these steps at 2am with no context?"

If the answer is no, your steps aren't specific enough.

**Next up:** We've covered all 5 tools individually. In Lesson 6, we'll put it all together — building a complete rollout plan from start to finish.`,
      teacherNotes: "The '2am test' is a powerful framework for evaluating rollback plans. End with excitement about the final lesson where everything comes together.",
    },
  ],
  exercise: {
    title: "Build a Rollback Plan",
    description:
      "Use the build_rollback_plan tool to create a deployment-specific rollback plan.",
    steps: [
      "Choose a feature and identify your deployment type (feature flag, blue-green, or rolling)",
      "List the components involved in the launch",
      "Use the build_rollback_plan tool with your feature, components, and deployment type",
      "Review the triggers — are they specific and measurable?",
      "Apply the '2am test' — could a new engineer execute these steps at 2am?",
      "If any steps are vague, rewrite them to be more specific",
    ],
    validation:
      "You should have a rollback plan with at least 3 specific triggers, numbered rollback steps, a named decision maker, verification criteria, and a communication sequence. Apply the '2am test' — if any step requires context that isn't written down, add it.",
  },
  quiz: {
    questions: [
      {
        question:
          "What's wrong with this rollback trigger: 'If something goes wrong, rollback'?",
        options: [
          "Nothing — it covers all scenarios",
          "It's not specific or measurable — an on-call engineer can't act on it",
          "It doesn't specify the deployment type",
          "It should say 'revert' instead of 'rollback'",
        ],
        correctIndex: 1,
        explanation:
          "Good rollback triggers follow the formula: [Metric] [exceeds/drops below] [threshold] for [duration]. 'Something goes wrong' is not a metric, has no threshold, and no time window. An on-call engineer at 2am can't act on it.",
      },
      {
        question:
          "Which deployment type has the fastest rollback time?",
        options: [
          "Rolling deployment (5-30 minutes)",
          "Blue-green deployment (1-5 minutes)",
          "Feature flag toggle (seconds)",
          "Database migration rollback (varies)",
        ],
        correctIndex: 2,
        explanation:
          "Feature flag toggles are near-instant — you flip a switch and the feature is disabled. Blue-green takes 1-5 minutes for traffic switching. Rolling deployments take 5-30 minutes. Database migrations are the slowest and most complex to rollback.",
      },
      {
        question: "What is the '2am test' for rollback plans?",
        options: [
          "Test your rollback at 2am when traffic is lowest",
          "Could an on-call engineer with no context execute the steps at 2am?",
          "Ensure your monitoring alerts work at 2am",
          "Schedule rollbacks for 2am to minimize user impact",
        ],
        correctIndex: 1,
        explanation:
          "The '2am test' asks: could someone who didn't build this feature, who was woken up at 2am, execute your rollback steps with only the written plan? If any step requires context that isn't documented, the plan isn't specific enough.",
      },
    ],
  },
};

export default lesson;
