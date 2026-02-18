import type { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 6,
  title: "Putting It All Together",
  duration: "20 minutes",
  objectives: [
    "Walk through a complete end-to-end rollout planning workflow",
    "Learn how to combine all 5 tools in a single session",
    "Practice the real-world 40-minute rollout planning process",
    "Understand how to iterate and refine rollout plans",
    "Master best practices for rollout plan maintenance",
  ],
  sections: [
    {
      id: "the-complete-workflow",
      title: "The Complete Workflow",
      content: `# The Complete Workflow

Here's the end-to-end process for building a rollout plan. In a real session, this takes about 40 minutes.

**Step 1: Load context (2 min)**
@-mention your PRD, architecture docs, and past incident reports.
\`\`\`
@prd-notifications.md @architecture.md @past-incidents.md
Help me build a rollout plan for this feature.
\`\`\`

**Step 2: Risk assessment with assess_risks (10 min)**
- Generate the risk matrix
- Review and prioritize: focus on High x High
- Assign owners to top risks
- Add mitigation actions to the rollout plan

**Step 3: Stakeholder mapping with map_stakeholders (8 min)**
- Map all stakeholders (don't forget second-order)
- Build the RACI matrix
- Review conflict flags
- Create the communication plan

**Step 4: Timeline generation with generate_timeline (10 min)**
- Define phases with specific tasks
- Map dependencies
- Identify the critical path
- Add buffer to high-risk tasks

**Step 5: Rollback plan with build_rollback_plan (5 min)**
- Choose your deployment type
- Write specific triggers
- Document the step-by-step procedure
- Apply the "2am test"

**Step 6: Full plan with create_rollout_plan (5 min)**
- Generate the complete rollout plan
- Review for completeness
- Share with stakeholders for feedback`,
      teacherNotes: "Walk through this step by step. The student should see how each previous lesson's tool feeds into the next. The timing is aspirational — their first time will take longer, and that's fine.",
      checkQuestion: "Looking at this workflow, which step do you think you'd spend the most time on for your current project?",
    },
    {
      id: "real-world-scenario",
      title: "Real-World Scenario Walkthrough",
      content: `# Real-World Scenario: Notifications Center Rollout

Let's walk through a realistic scenario using the workflow.

**The feature:** In-App Notifications Center replacing email-only alerts.
**Context:** 150,000 MAU, B2B SaaS, 5-person product team, 6-week timeline.

### Risk Assessment Results (Step 2):
Top 3 risks identified:
1. **WebSocket scaling under full load** (High likelihood, High impact) — assigned to Mike (Backend Lead)
2. **Push notification opt-out confusion** (Medium likelihood, Medium impact) — assigned to Priya (Design Lead)
3. **Security review timeline may block launch** (Medium likelihood, High impact) — assigned to PM

PM decision: WebSocket scaling is the #1 risk. Added load testing to Week 2.

### Stakeholder Mapping Results (Step 3):
Conflict flag: Security review timeline conflicts with launch date.
PM action: Moved security review 2 weeks earlier in the timeline.

Communication plan: Leadership gets bi-weekly updates (not weekly — they asked for less noise).

### Timeline Results (Step 4):
Critical path: Backend API → Integration → QA → Staging → Rollout
PM action: Added 30% buffer to Backend API (high-risk). Scheduled design review earlier to unblock frontend.

### Rollback Plan Results (Step 5):
Deployment: Feature flag via LaunchDarkly.
Triggers: Error rate > 2% for 15 min OR user complaints > 20 in first hour.
Decision maker: On-call engineering lead.

**Total time: ~40 minutes.** The PM now has a rollout plan that covers risks, stakeholders, timeline, rollback, and communication.`,
      teacherNotes: "This scenario should feel familiar — it's the same notifications feature from Module 1's PRD. Show how the PRD from Module 1 naturally flows into the rollout plan from Module 2.",
    },
    {
      id: "create-rollout-plan-tool",
      title: "Using create_rollout_plan for the Full Package",
      content: `# Using create_rollout_plan for the Full Package

The \`create_rollout_plan\` tool generates a comprehensive rollout plan in one shot. It's useful when:
- You want a complete plan quickly
- You've already done the individual analysis and want to combine it
- You need a shareable document for stakeholders

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| \`feature_name\` | What you're launching | "Real-Time Notification System" |
| \`description\` | Feature summary | "Replacing email-only alerts with in-app, push, and digest notifications for 150K users" |
| \`team_size\` | People available | 5 |
| \`timeline\` | Available weeks | "6 weeks" |
| \`risk_tolerance\` | How conservative | "medium" |

**Risk tolerance affects the output:**
- **low** — More phases, longer monitoring windows, conservative canary (1% → 5% → 25% → 50% → 100%)
- **medium** — Standard 4-phase rollout (internal → canary → gradual → full)
- **high** — Fewer phases, shorter monitoring, faster ramp (internal → 25% → 100%)

**When to use create_rollout_plan vs individual tools:**
- Use \`create_rollout_plan\` for a quick first draft
- Use individual tools (\`assess_risks\`, \`map_stakeholders\`, etc.) for deeper analysis
- Best approach: generate the full plan first, then deep-dive into areas that need more attention

**Iteration pattern:**
1. \`create_rollout_plan\` → get the overview
2. \`assess_risks\` → deep-dive on risks that seem underestimated
3. \`map_stakeholders\` → check for missing stakeholders
4. Manually refine the plan with insights from steps 2-3`,
      teacherNotes: "Make it clear that create_rollout_plan is a great starting point, but the individual tools are where the real value is. The best workflow combines both.",
      checkQuestion: "When would you choose 'low' risk tolerance vs 'high'? Can you think of a scenario for each?",
    },
    {
      id: "iteration-and-maintenance",
      title: "Iteration and Maintenance",
      content: `# Iteration and Maintenance

A rollout plan isn't a one-time document. It's a living artifact that evolves as the project progresses.

**When to update the rollout plan:**
| Event | What to Update |
|-------|---------------|
| Scope change | Risk matrix, timeline, stakeholder map |
| New dependency discovered | Timeline (dependencies), risk matrix |
| Team member leaves/joins | RACI matrix, risk owners, timeline |
| Incident on related system | Risk matrix, rollback triggers |
| Phase gate passed | Mark tasks complete, update stakeholder comms |
| Feedback from canary users | Risk priorities, rollback triggers |

**The weekly rollout check-in (15 min):**
1. Review risk matrix — any risks materialized or changed priority?
2. Check timeline — on track? Critical path slipping?
3. Stakeholder update — any new conflicts or concerns?
4. Rollback readiness — is the plan still accurate for current state?

**Version control for rollout plans:**
- Keep the plan in your project repo (markdown works great)
- Update it as part of your sprint workflow
- Include a change log at the top: "v2 — Added security review dependency (Feb 20)"

**Common maintenance mistakes:**
- Updating the timeline but not the risk matrix
- Changing scope without re-running stakeholder mapping
- Passing a phase gate without updating rollback triggers for the new phase`,
      teacherNotes: "Maintenance is the unglamorous but critical part of rollout planning. Emphasize that a plan that isn't maintained is a plan that can't be trusted during the launch.",
    },
    {
      id: "best-practices-summary",
      title: "Best Practices Summary",
      content: `# Best Practices Summary

**The 10 Rules of Rollout Planning:**

1. **Start from the PRD.** The rollout plan traces back to requirements. If it doesn't, you're planning the wrong thing.

2. **Assess risks first.** Everything else — timeline, stakeholders, rollback — is shaped by what could go wrong.

3. **Name risk owners.** "The team" owns nothing. One person, one risk.

4. **Map second-order stakeholders.** The people you forget are the ones who derail the launch.

5. **Build dependency-aware timelines.** A timeline without dependencies is a wish list.

6. **Buffer the critical path.** 20% minimum. 30% for high-risk work.

7. **Write the rollback plan now.** 10 minutes now saves 2 hours during an incident.

8. **Apply the "2am test."** If an on-call engineer can't execute your rollback at 2am, it's not specific enough.

9. **Communicate by audience.** Engineers need technical details. Leadership needs outcomes. Support needs preparation time.

10. **Maintain the plan.** A plan that isn't updated after scope changes is a plan that will fail.

**The single most important lesson:**
A rollout plan is not a formality. If you're not referencing it during the launch, it's decoration. The best rollout plans are the ones the team actually uses — simple, specific, and maintained.`,
      teacherNotes: "This is the capstone section. The 10 rules should serve as a reference card the student can come back to. End on a motivational note about putting this into practice.",
    },
    {
      id: "whats-next",
      title: "What's Next",
      content: `# What's Next

Congratulations — you've completed the Rollout Plan Generator course!

**What you've learned:**
- Risk assessment using structured frameworks and the \`assess_risks\` tool
- Stakeholder mapping with RACI and conflict detection via \`map_stakeholders\`
- Dependency-aware timeline generation with \`generate_timeline\`
- Rollback planning with specific triggers via \`build_rollback_plan\`
- Complete rollout plan generation with \`create_rollout_plan\`

**How to apply what you've learned:**
1. **Start today:** Take your next upcoming launch and build a rollout plan using the 5-tool workflow
2. **Combine with Module 1:** Generate a PRD first (Module 1), then immediately create the rollout plan (Module 2). PRD → Rollout Plan is a natural workflow.
3. **Share with your team:** The rollout plan is only valuable if the team sees it. Share it in your kickoff meeting.

**Continue learning:**
- **Module 3: MCP Google Workspace Automation (FREE)** — Automate the ongoing PM work: status reports, sprint planning, follow-ups
- **Module 4: Vibe Coding for PMs** — Build internal tools and prototypes using AI-assisted development

**Remember:** The AI doesn't replace your judgment — it extends your peripheral vision. You think about the feature. The AI thinks about what you forgot.`,
      teacherNotes: "End with encouragement and clear next steps. The student should feel empowered to use these tools on their next real project. Mention the module connections to keep momentum.",
      checkQuestion: "What's the first feature launch you'll build a rollout plan for using these tools?",
    },
  ],
  exercise: {
    title: "End-to-End Rollout Plan",
    description:
      "Build a complete rollout plan from scratch using all 5 tools in sequence.",
    steps: [
      "Choose a real feature you're planning to launch (or use a hypothetical one)",
      "Start with assess_risks — generate the risk matrix and identify top 3 risks",
      "Use map_stakeholders — build the RACI matrix and identify conflicts",
      "Use generate_timeline — create the dependency-aware timeline with buffer",
      "Use build_rollback_plan — write triggers, steps, and verification",
      "Use create_rollout_plan — generate the complete plan",
      "Review the full plan — is it something you'd share with your team?",
    ],
    validation:
      "You should have a complete rollout plan with: risk matrix (5+ risks, owners assigned), RACI matrix, communication plan, dependency-aware timeline, rollback plan with specific triggers, and success metrics. Apply the '2am test' to the rollback section. If you'd share this plan with your team, you've succeeded.",
  },
  quiz: {
    questions: [
      {
        question:
          "What is the recommended order for using the rollout planning tools?",
        options: [
          "create_rollout_plan → assess_risks → map_stakeholders → generate_timeline → build_rollback_plan",
          "assess_risks → map_stakeholders → generate_timeline → build_rollback_plan → create_rollout_plan",
          "generate_timeline → assess_risks → build_rollback_plan → map_stakeholders → create_rollout_plan",
          "The order doesn't matter — use any tool in any sequence",
        ],
        correctIndex: 1,
        explanation:
          "Start with risks (they shape everything), then stakeholders (they reveal dependencies), then timeline (informed by risks and stakeholders), then rollback (specific to the timeline and deployment), and finally the complete plan. Each tool's output informs the next.",
      },
      {
        question: "When should you update a rollout plan?",
        options: [
          "Only when there's a major problem",
          "After scope changes, new dependencies, team changes, phase gates, and incidents",
          "Weekly, regardless of changes",
          "Only before the final launch",
        ],
        correctIndex: 1,
        explanation:
          "A rollout plan is a living document. Update it after scope changes, new dependencies, team changes, phase gates, and related incidents. A plan that isn't maintained after scope changes is a plan that will fail during the launch.",
      },
      {
        question:
          "What is the single most important attribute of a good rollout plan?",
        options: [
          "It's long and comprehensive",
          "It has beautiful formatting",
          "The team actually references it during the launch",
          "It was approved by leadership",
        ],
        correctIndex: 2,
        explanation:
          "A rollout plan is not a formality — if you're not referencing it during the launch, it's decoration. The best rollout plans are simple, specific, maintained, and actually used by the team during the launch.",
      },
    ],
  },
};

export default lesson;
