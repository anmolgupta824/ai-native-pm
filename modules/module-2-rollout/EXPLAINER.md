# Module 2: Plan Your Next Launch in 1 Hour

**Time:** 45–60 minutes | **Prerequisites:** Claude Code installed, Module 1 recommended | **Cost:** Free

> A feature that ships without a rollout plan is a feature that ships with invisible risk. This module teaches you to use AI to surface risks, map stakeholders, and build timelines — before the launch, not during the fire drill.

---

## Overview

Launch planning is where good PMs separate from great PMs. Anyone can write requirements. Few can anticipate the 15 things that go wrong during rollout.

The problem? Rollout plans are tedious. Dependency mapping, risk assessment, stakeholder alignment, rollback procedures — most PMs do this from memory or skip it entirely. Then Week 2 happens, and they're in a war room.

This module gives you an AI co-pilot for launch planning. It doesn't replace your judgment — it extends your peripheral vision. You think about the feature. The AI thinks about what you forgot.

### What You'll Learn

- How to structure a rollout plan that engineering actually follows
- Risk assessment using structured frameworks (not gut feel)
- Stakeholder mapping and conflict detection
- Timeline generation with realistic dependency chains
- Rollback planning (the section everyone skips)

---

## Traditional vs AI-Partnership Approach

| Step | Traditional (1–2 weeks) | AI Partnership (1 hour) |
|------|------------------------|------------------------|
| Risk assessment | Brainstorm in a meeting, miss half the risks | Structured risk matrix generated from PRD context |
| Stakeholder mapping | Mental model, miss conflicts | Automated detection of overlapping interests |
| Timeline | Spreadsheet with optimistic estimates | Dependency-aware timeline with buffer suggestions |
| Rollback plan | "We'll figure it out" | Step-by-step rollback with trigger conditions |
| Communication | Ad-hoc Slack messages | Templated comms plan by audience |
| Go/No-go criteria | Vibes | Explicit checklist with metric thresholds |

---

## The Five Core Techniques

### Technique 1: Context-Driven Risk Assessment

Risks don't come from imagination — they come from context. Feed Claude your PRD, architecture docs, and past incident reports, and it will surface risks you'd miss alone.

| Risk Category | What to Look For | Questions to Ask |
|---------------|-----------------|-----------------|
| **Technical** | Infrastructure limits, API dependencies, data migration | "What breaks if traffic is 3x expected?" |
| **User adoption** | Change aversion, learning curve, workflow disruption | "Which users will be most disrupted by this change?" |
| **Timeline** | External dependencies, holiday freezes, team capacity | "What's the critical path? What has no slack?" |
| **Organizational** | Stakeholder conflicts, competing priorities, approval delays | "Who might block this and why?" |
| **Compliance** | Privacy, security review, legal approval | "What regulatory gates must we pass?" |

```
@prd-notifications.md @incident-log-q4.md @architecture.md

I'm planning the rollout for the notifications center.
Generate a risk assessment matrix. For each risk:
- Likelihood (Low/Medium/High)
- Impact (Low/Medium/High)
- Specific mitigation action
- Risk owner

Be aggressive — I'd rather over-prepare than under-prepare.
```

> **Pro tip:** Include past incident logs. AI is great at pattern-matching risks from previous launches to your current one.

### Technique 2: Stakeholder Mapping & Conflict Detection

The fastest way to derail a launch is stakeholder misalignment. This technique maps who cares, why they care, and where they'll clash.

| Stakeholder | Interest | Potential Conflict | Communication Need |
|-------------|----------|-------------------|-------------------|
| **Engineering** | Feasibility, timeline, tech debt | May push back on scope or timeline | Technical details, early warning on changes |
| **Design** | UX consistency, accessibility | May conflict with eng on scope cuts | Design review checkpoints |
| **Sales** | Customer-facing features, demo-ability | May want features before they're ready | Feature availability timeline |
| **Support** | Training time, FAQ preparation | May not have enough lead time | Pre-launch walkthrough, runbook |
| **Leadership** | Business impact, strategic alignment | May add scope or change priorities | Weekly status, go/no-go decision |

```
Here are the stakeholders for the notifications launch:
- VP Product (sponsor, final sign-off)
- Backend team lead (WebSocket infrastructure)
- Frontend team lead (notification UI)
- Design lead (UX review)
- Support lead (training & FAQ)
- Security team (data access review)

Map their interests, flag potential conflicts, and suggest
a communication cadence for each.
```

### Technique 3: Dependency-Aware Timeline Generation

A timeline without dependencies is a wish list. This technique builds timelines that acknowledge reality.

| Phase | Key Question | Common Trap |
|-------|-------------|-------------|
| **Planning** | "What must be decided before building starts?" | Starting dev before design is approved |
| **Development** | "What blocks what? What can run in parallel?" | Assuming everything is parallelizable |
| **Testing** | "What needs to be tested together vs independently?" | Skipping integration testing |
| **Staging** | "How long do we need in staging before production?" | "Works on my machine" → production surprises |
| **Rollout** | "What's the phased rollout sequence?" | Big bang when phased would be safer |
| **Post-launch** | "When do we declare success or rollback?" | No clear evaluation criteria |

```
Generate a rollout timeline for the notifications center PRD.
Include:
- Task dependencies (what blocks what)
- Parallel vs sequential work
- Buffer time (add 20% to engineering estimates)
- Go/no-go decision points
- Rollback windows

Format as a Gantt-style table with dates.
```

### Technique 4: Rollback Plan Builder

This is the section every PM skips and every PM needs. A rollback plan written in advance takes 10 minutes. A rollback plan written during an incident takes 2 hours of panic.

| Rollback Component | What to Define | Example |
|-------------------|----------------|---------|
| **Trigger** | What condition activates rollback | Error rate > 2% for 15 min |
| **Decision maker** | Who authorizes rollback | On-call engineering lead |
| **Steps** | Exact sequence to undo | 1. Disable feature flag 2. Revert DB migration 3. Clear cache |
| **Verification** | How to confirm rollback worked | Error rate returns to baseline within 5 min |
| **Communication** | Who to notify and how | #incidents Slack channel, then email to stakeholders |
| **Post-mortem** | When and how to review | Within 48 hours, blameless format |

### Technique 5: Communication Plan Templates

Different stakeholders need different messages at different times. Don't wing this.

| Audience | When | Channel | Content |
|----------|------|---------|---------|
| Engineering | Weekly during dev | Standup / Slack | Technical progress, blockers |
| Leadership | Weekly | Status email | Milestone progress, risks, asks |
| Support | 2 weeks pre-launch | Training session | Feature walkthrough, FAQ |
| Sales | 1 week pre-launch | Sales enablement deck | Feature positioning, demo script |
| Users (beta) | At beta launch | In-app + email | What's new, how to use, feedback link |
| Users (GA) | At full launch | In-app banner + email | Feature announcement, help docs |

---

## Real-World Walkthrough

**Scenario:** Rolling out the In-App Notifications Center from Module 1's PRD.

**Step 1: Load context** (2 min)
```
@prd-notifications.md @architecture.md @past-incidents.md
Help me build a rollout plan for this feature.
```

**Step 2: Risk assessment** (10 min)
- AI generates 12 risks across technical, user adoption, and organizational categories
- PM flags WebSocket scaling as the #1 risk, adds load testing to the plan
- PM deprioritizes "notification fatigue" risk — decides to ship conservative defaults

**Step 3: Stakeholder mapping** (8 min)
- AI maps 6 stakeholders with interests and conflicts
- Flags potential conflict: Security review timeline may block launch date
- PM moves security review earlier in timeline

**Step 4: Timeline generation** (10 min)
- AI generates 6-week timeline with dependencies
- PM sees that design review is on the critical path → schedules earlier
- Adds 20% buffer to backend WebSocket work (highest-risk component)

**Step 5: Rollback plan** (5 min)
- AI generates rollback steps specific to feature flags + WebSocket
- PM adds trigger: "Error rate > 2% for 15 min OR user complaints > 20 in first hour"

**Step 6: Communication plan** (5 min)
- AI generates communication matrix by stakeholder
- PM customizes cadence for leadership (they want bi-weekly, not weekly)

**Total: ~40 minutes for a rollout plan that covers risks, stakeholders, timeline, rollback, and communication.**

---

## Best Practices

### ✅ Do

- **Start from the PRD.** The rollout plan should trace directly back to requirements. If it doesn't, you're planning the wrong thing
- **Name risk owners.** "The team" owns nothing. "Sarah (Backend Lead)" owns something
- **Include rollback triggers.** Specific, measurable conditions. Not "if things go wrong"
- **Plan communication by audience.** Engineers need different info than execs
- **Build in buffer.** Add 20% to every engineering estimate. You'll need it

### ❌ Don't

- **Don't treat the rollout plan as a formality.** If you're not referencing it during launch, it's decoration
- **Don't assume the happy path.** Plan for the feature flag that doesn't turn off, the migration that corrupts data, the stakeholder who changes their mind at the last minute
- **Don't skip the post-launch evaluation.** Define "success" before launch, not after
- **Don't create the plan in isolation.** Review with engineering and design before finalizing
- **Don't forget the users.** A phased rollout with clear communication beats a surprise big bang

---

## Troubleshooting

**Problem: Risk assessment feels too generic**
- *Cause:* Not enough project-specific context
- *Fix:* @-mention your PRD, architecture docs, and past incident reports. The more specific the input, the more specific the risks. Also specify your product type, scale, and user base.

**Problem: Timeline seems unrealistic**
- *Cause:* AI doesn't know your team's velocity
- *Fix:* Tell Claude about your team size, sprint cadence, and any competing priorities. Example: "We have 3 backend engineers, 2-week sprints, and Q1 OKR work competing for 30% of capacity."

**Problem: Stakeholder map is too simple**
- *Cause:* You listed roles, not individuals with real dynamics
- *Fix:* Add context about relationships and history. "VP Product and Engineering Lead disagree on WebSocket approach" produces better conflict detection than just listing their names.

**Problem: Rollback plan doesn't match our infrastructure**
- *Cause:* AI doesn't know your deployment setup
- *Fix:* Describe your deployment process: "We use feature flags via LaunchDarkly, deploy via GitHub Actions, and have a 15-minute rollback SLA." This produces infrastructure-specific rollback steps.

---

## What's Next?

Now that you can create comprehensive rollout plans:

- **Apply it to a real launch** — Take your next ship date and build a plan with this module
- **Combine with Module 1** — Generate a PRD (Module 1) then immediately create the rollout plan (Module 2)
- **Move to Module 3** — [MCP Google Workspace Automation](../module-3-mcp/) automates the ongoing PM work (status reports, sprint planning, follow-ups)

---

## Quick Reference

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `create_rollout_plan` | Generates full rollout plan from PRD | After your PRD is finalized |
| `assess_risks` | Structured risk matrix with mitigations | During planning phase |
| `map_stakeholders` | Stakeholder interests and conflict detection | Before kickoff meeting |
| `generate_timeline` | Dependency-aware timeline with buffers | After scope is confirmed |
| `build_rollback_plan` | Step-by-step rollback with triggers | Before launch, not during incident |
