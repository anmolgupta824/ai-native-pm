# PRD: Onboarding Flow Redesign

**Template:** Product Redesign
**Product:** TeamFlow
**Author:** The AI-Native PM
**Date:** 2026-02-10
**Status:** Draft

---

## Overview

Redesign TeamFlow's new user onboarding from a 12-step linear wizard into a progressive, goal-based experience. The current onboarding has a 40% drop-off rate, and users who don't complete onboarding are 3.5x more likely to churn within 30 days.

## Current State Analysis

**What exists:** A 12-step onboarding wizard that runs on first login. Steps include: create profile, invite team, create project, add tasks, assign members, set due dates, configure notifications, connect integrations, choose theme, set timezone, take a tour, complete.

| Metric | Current Value |
|--------|--------------|
| Onboarding completion rate | 60% |
| Median time to complete | 14 minutes |
| Drop-off at step 5 (assign members) | 22% of all drop-offs |
| Time to first value (create + complete a task) | 11 days |
| 30-day retention (completed onboarding) | 72% |
| 30-day retention (did NOT complete) | 21% |
| Support tickets about onboarding | 89/month |

**Where users drop off:**

| Step | Drop-off Rate | Likely Reason |
|------|--------------|---------------|
| Step 3 (Create project) | 8% | "I just want to explore first" |
| Step 5 (Assign members) | 22% | "My team hasn't signed up yet" |
| Step 7 (Configure notifications) | 12% | "Too many options, I'll do this later" |
| Step 8 (Connect integrations) | 11% | "I don't have my Slack/GitHub credentials" |

## Problems with Current Design

| Problem | Evidence | Impact |
|---------|----------|--------|
| Too many steps upfront | 12 steps, 14 min to complete | 40% never finish |
| Blocks on team actions | Can't skip "invite team" or "assign members" | 22% drop-off at team steps |
| No quick path to value | Must complete all steps before using product | 11-day time to first value |
| One-size-fits-all | Same flow for admin, member, and solo user | Irrelevant steps frustrate users |
| Can't resume later | No save state; must restart if browser closed | Users who close tab never return |

## Redesign Goals

| Goal | Current | Target | Timeline |
|------|---------|--------|----------|
| Onboarding completion rate | 60% | > 85% | 30 days post-launch |
| Time to first value | 11 days | < 1 day | 30 days post-launch |
| 30-day retention (all new users) | 52% | > 65% | 60 days post-launch |
| Support tickets (onboarding) | 89/month | < 30/month | 60 days post-launch |
| Median onboarding time | 14 min | < 5 min | 30 days post-launch |

**Non-goals:**
- Changing the core product experience
- Adding new features (only reorganizing the onboarding flow)
- Enterprise/SSO onboarding (separate project)

## User Research Findings

**Methods:** 10 user interviews (churned users who didn't complete onboarding) + session recordings (n=200) + survey (n=450)

**Key findings:**

1. **Users want to DO something immediately.** 78% of interviewed users said they wanted to "just try the product" before committing to setup steps.
   > "I signed up to see if this could replace Jira. Instead, I got a 12-step wizard asking me to invite my team before I even knew if I liked it." — Marcus, Senior Engineer

2. **Team-dependent steps are blockers.** Users signing up solo (42% of signups) can't complete steps that require team members.

3. **Role-based flows are expected.** Admins need project setup; individual contributors just need to find their tasks.
   > "I was invited by my manager. Why am I being asked to create a project and configure integrations?" — New team member

4. **Progressive disclosure works.** In a prototype test, users who got a 3-step onboarding (profile, first task, done) rated satisfaction 4.2/5 vs 2.8/5 for the current flow.

## Proposed Changes

### Change 1: 3-Step Core Onboarding

| Current | Proposed | Rationale |
|---------|----------|-----------|
| 12-step linear wizard | 3 steps: (1) Set name + avatar, (2) Choose your goal ("Manage a team project" / "Track my own work" / "Just exploring"), (3) First action based on goal | Gets users to value in <3 minutes |

### Change 2: Goal-Based Paths

| Current | Proposed | Rationale |
|---------|----------|-----------|
| Same flow for everyone | **Path A (Team lead):** Create project → invite 1 person → add 3 tasks. **Path B (IC):** Join existing project → view your tasks → mark one done. **Path C (Explorer):** Pre-loaded demo project → explore freely. | 42% are solo signups who can't do team steps |

### Change 3: Deferred Setup Checklist

| Current | Proposed | Rationale |
|---------|----------|-----------|
| Must complete all setup upfront | Persistent "Setup Checklist" widget in sidebar. Shows remaining optional steps (notifications, integrations, theme). Completable anytime. Disappears when all done or dismissed. | Eliminates drop-offs at optional steps |

## Migration Plan

**Strategy:** A/B test → gradual rollout

- **Phase 1 (Week 1-2):** Build new onboarding behind feature flag. Internal testing.
- **Phase 2 (Week 3-5):** A/B test: 50% new users see new flow, 50% see current flow. Minimum 2,000 users per variant for statistical significance.
- **Phase 3 (Week 6):** If completion rate improves >15 percentage points, roll out to 100%.
- **Phase 4 (Week 8):** Remove old onboarding code. Move setup checklist items to permanent sidebar widget.

**User communication:**
- No announcement needed (only affects new signups)
- Update help center articles with new screenshots
- Brief support team on new flow

## Success Metrics

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| Onboarding completion | 60% | >85% | Mixpanel funnel (3-step completion) |
| Time to first value | 11 days | <1 day | Time from signup to first task completion |
| 30-day retention | 52% | >65% | Cohort analysis in Mixpanel |
| Setup checklist completion (7 days) | N/A | >50% complete 5+ items | Mixpanel checklist tracking |
| Onboarding support tickets | 89/mo | <30/mo | Zendesk category filter |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users skip important setup (notifications, integrations) | High | Medium | Setup checklist nudges after 3 days, 7 days. Smart defaults. |
| "Explorer" path users never convert to real usage | Medium | Medium | Triggered prompt after 3 demo sessions: "Ready to create your own project?" |
| A/B test contamination (users share links) | Low | Medium | Randomize by team, not individual user |
| New flow confuses users expecting traditional wizard | Low | Low | No prior user expectation (only new signups see it) |

## Timeline

| Milestone | Date | Owner |
|-----------|------|-------|
| Design mockups + prototype | Week 1 | Design Lead |
| Usability test on prototype | Week 2 | UX Researcher |
| Frontend implementation | Week 2-4 | Frontend Team |
| Setup checklist widget | Week 3-4 | Frontend Team |
| Internal dogfood | Week 4 | PM + Design |
| A/B test launch | Week 5 | PM + Data |
| Results analysis | Week 7 | PM + Data |
| GA rollout | Week 8 | PM |

## Stakeholder Communication

| Stakeholder | Interest | Communication Plan |
|-------------|----------|-------------------|
| Growth team | Activation rate improvement | Weekly A/B test metrics |
| Support team | Fewer onboarding tickets | New flow walkthrough (Week 4) |
| Sales team | Demo flow may change | Updated demo script (Week 5) |
| Engineering | Implementation scope | Tech spec review (Week 1) |
| Leadership | Retention impact | Bi-weekly update during A/B test |

## Open Questions

1. [ ] Should the setup checklist persist forever or auto-dismiss after 30 days?
2. [ ] Should we offer a "Skip all" option in the 3-step onboarding?
3. [ ] How do we handle users who switch from "Explorer" to "Team lead" path mid-onboarding?
4. [ ] Should the demo project be customizable or always the same?
