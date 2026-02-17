# Lesson 6: Putting It All Together

**Estimated time: 20 minutes**
**Lesson type: End-to-end walkthrough + Capstone**

---

## The Complete Workflow

Here's the end-to-end process for building a rollout plan. In a real session, this takes about 40 minutes.

**Step 1: Load context (2 min)**
@-mention your PRD, architecture docs, and past incident reports.
```
@prd-notifications.md @architecture.md @past-incidents.md
Help me build a rollout plan for this feature.
```

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
- Share with stakeholders for feedback

---

## Real-World Scenario Walkthrough

Let's walk through a realistic scenario using the workflow.

**The feature:** In-App Notifications Center replacing email-only alerts.
**Context:** 150,000 MAU, B2B SaaS, 5-person product team, 6-week timeline.

### Risk Assessment Results (Step 2):
Top 3 risks identified:
1. **WebSocket scaling under full load** (High likelihood, High impact) -- assigned to Mike (Backend Lead)
2. **Push notification opt-out confusion** (Medium likelihood, Medium impact) -- assigned to Priya (Design Lead)
3. **Security review timeline may block launch** (Medium likelihood, High impact) -- assigned to PM

PM decision: WebSocket scaling is the #1 risk. Added load testing to Week 2.

### Stakeholder Mapping Results (Step 3):
Conflict flag: Security review timeline conflicts with launch date.
PM action: Moved security review 2 weeks earlier in the timeline.

Communication plan: Leadership gets bi-weekly updates (not weekly -- they asked for less noise).

### Timeline Results (Step 4):
Critical path: Backend API -> Integration -> QA -> Staging -> Rollout
PM action: Added 30% buffer to Backend API (high-risk). Scheduled design review earlier to unblock frontend.

### Rollback Plan Results (Step 5):
Deployment: Feature flag via LaunchDarkly.
Triggers: Error rate > 2% for 15 min OR user complaints > 20 in first hour.
Decision maker: On-call engineering lead.

**Total time: ~40 minutes.** The PM now has a rollout plan that covers risks, stakeholders, timeline, rollback, and communication.

---

## Using create_rollout_plan for the Full Package

The `create_rollout_plan` tool generates a comprehensive rollout plan in one shot. It's useful when:
- You want a complete plan quickly
- You've already done the individual analysis and want to combine it
- You need a shareable document for stakeholders

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `feature_name` | What you're launching | "Real-Time Notification System" |
| `description` | Feature summary | "Replacing email-only alerts with in-app, push, and digest notifications for 150K users" |
| `team_size` | People available | 5 |
| `timeline` | Available weeks | "6 weeks" |
| `risk_tolerance` | How conservative | "medium" |

**Risk tolerance affects the output:**
- **low** -- More phases, longer monitoring windows, conservative canary (1% -> 5% -> 25% -> 50% -> 100%)
- **medium** -- Standard 4-phase rollout (internal -> canary -> gradual -> full)
- **high** -- Fewer phases, shorter monitoring, faster ramp (internal -> 25% -> 100%)

**When to use create_rollout_plan vs individual tools:**
- Use `create_rollout_plan` for a quick first draft
- Use individual tools (`assess_risks`, `map_stakeholders`, etc.) for deeper analysis
- Best approach: generate the full plan first, then deep-dive into areas that need more attention

**Iteration pattern:**
1. `create_rollout_plan` -> get the overview
2. `assess_risks` -> deep-dive on risks that seem underestimated
3. `map_stakeholders` -> check for missing stakeholders
4. Manually refine the plan with insights from steps 2-3

---

## Iteration and Maintenance

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
1. Review risk matrix -- any risks materialized or changed priority?
2. Check timeline -- on track? Critical path slipping?
3. Stakeholder update -- any new conflicts or concerns?
4. Rollback readiness -- is the plan still accurate for current state?

**Version control for rollout plans:**
- Keep the plan in your project repo (markdown works great)
- Update it as part of your sprint workflow
- Include a change log at the top: "v2 -- Added security review dependency (Feb 20)"

**Common maintenance mistakes:**
- Updating the timeline but not the risk matrix
- Changing scope without re-running stakeholder mapping
- Passing a phase gate without updating rollback triggers for the new phase

---

## Best Practices Summary

**The 10 Rules of Rollout Planning:**

1. **Start from the PRD.** The rollout plan traces back to requirements. If it doesn't, you're planning the wrong thing.

2. **Assess risks first.** Everything else -- timeline, stakeholders, rollback -- is shaped by what could go wrong.

3. **Name risk owners.** "The team" owns nothing. One person, one risk.

4. **Map second-order stakeholders.** The people you forget are the ones who derail the launch.

5. **Build dependency-aware timelines.** A timeline without dependencies is a wish list.

6. **Buffer the critical path.** 20% minimum. 30% for high-risk work.

7. **Write the rollback plan now.** 10 minutes now saves 2 hours during an incident.

8. **Apply the "2am test."** If an on-call engineer can't execute your rollback at 2am, it's not specific enough.

9. **Communicate by audience.** Engineers need technical details. Leadership needs outcomes. Support needs preparation time.

10. **Maintain the plan.** A plan that isn't updated after scope changes is a plan that will fail.

---

## What's Next

Congratulations -- you've completed the Rollout Plan Generator course!

**What you've learned:**
- Risk assessment using structured frameworks and the `assess_risks` tool
- Stakeholder mapping with RACI and conflict detection via `map_stakeholders`
- Dependency-aware timeline generation with `generate_timeline`
- Rollback planning with specific triggers via `build_rollback_plan`
- Complete rollout plan generation with `create_rollout_plan`

**How to apply what you've learned:**
1. **Start today:** Take your next upcoming launch and build a rollout plan using the 5-tool workflow
2. **Combine with Module 1:** Generate a PRD first (Module 1), then immediately create the rollout plan (Module 2). PRD -> Rollout Plan is a natural workflow.
3. **Share with your team:** The rollout plan is only valuable if the team sees it. Share it in your kickoff meeting.

**Continue learning:**
- **Module 3: MCP Integrations Course (FREE)** -- Connect Claude to Jira, Google Drive, Sheets, and Figma
- **Module 4: AI Image Generation (FREE)** -- Generate product mockups, presentation visuals, and marketing assets

**Remember:** The AI doesn't replace your judgment -- it extends your peripheral vision. You think about the feature. The AI thinks about what you forgot.

---

## Exercise: End-to-End Rollout Plan

Build a complete rollout plan from scratch using all 5 tools in sequence.

1. Choose a real feature you're planning to launch (or use a hypothetical one)
2. Start with assess_risks -- generate the risk matrix and identify top 3 risks
3. Use map_stakeholders -- build the RACI matrix and identify conflicts
4. Use generate_timeline -- create the dependency-aware timeline with buffer
5. Use build_rollback_plan -- write triggers, steps, and verification
6. Use create_rollout_plan -- generate the complete plan
7. Review the full plan -- is it something you'd share with your team?

---

## Quick Check (Final)

1. What is the recommended order for using the rollout planning tools?
2. When should you update a rollout plan?
3. What is the single most important attribute of a good rollout plan?

---

---
Enjoyed this course? Follow Anmol Gupta on LinkedIn → https://linkedin.com/in/anmol-gupta-21875a89

*Previous: [Lesson 5: Rollback Planning](5-rollback-planning.md)*
*Back to: [Lesson 1: Welcome](1-welcome.md)*
