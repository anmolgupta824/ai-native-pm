# PRD: Settings Page Redesign

**Template:** Product Redesign
**Product:** TeamFlow
**Author:** The AI-Native PM
**Date:** 2026-02-05
**Status:** Draft

---

## Overview

Redesign TeamFlow's settings page from a single flat list of 40+ options into a categorized, searchable settings experience. The current design is the #1 source of support tickets and a frequent complaint in user interviews.

## Current State Analysis

**What exists:** A single settings page with 43 options displayed as a vertical list. No categories, no search, no visual hierarchy.

| Metric | Current Value |
|--------|--------------|
| Monthly support tickets about settings | 312 (12% of all tickets) |
| Average time to find a setting | 47 seconds |
| Settings page bounce rate | 34% (users leave without changing anything) |
| Mobile settings completion rate | 18% (vs 62% desktop) |
| CSAT for settings experience | 2.1/5 |

**User feedback highlights:**
- "I can never find where to change my notification preferences" (mentioned in 8/15 interviews)
- "The settings page feels like it was designed for engineers, not normal people" (NPS verbatim)
- "I gave up trying to change my timezone and asked my admin to do it" (support ticket theme)

## Problems with Current Design

| Problem | Evidence | Impact |
|---------|----------|--------|
| No categorization | 43 settings in flat list | Users can't find what they need |
| No search | Zero search functionality | 47-second average find time |
| Poor mobile layout | Single column, tiny tap targets | 18% mobile completion rate |
| Technical language | Labels like "SAML SSO Configuration" | Non-technical users confused |
| No contextual help | No tooltips or explanations | 312 support tickets/month |
| Mixed personal/team settings | Personal and admin settings interleaved | Users accidentally change team-wide settings |

## Redesign Goals

| Goal | Current | Target | Timeline |
|------|---------|--------|----------|
| Average time to find a setting | 47 seconds | < 15 seconds | 30 days post-launch |
| Settings-related support tickets | 312/month | < 100/month | 60 days post-launch |
| Settings page bounce rate | 34% | < 15% | 30 days post-launch |
| Mobile completion rate | 18% | > 50% | 30 days post-launch |
| CSAT for settings | 2.1/5 | > 3.8/5 | 90 days post-launch |

**Non-goals:**
- Adding new settings (scope limited to reorganizing existing ones)
- Changing settings behavior or defaults
- Building an admin console (separate project)

## User Research Findings

**Methods:** 15 user interviews + unmoderated usability test (n=50) + heatmap analysis

**Key findings:**
1. **Users think in categories, not lists.** When asked to group settings, 89% of participants created 5-7 categories consistently: Profile, Notifications, Privacy, Team, Integrations, Display.
2. **Search is expected.** 72% of usability test participants attempted to search before scrolling.
3. **Users don't know what's personal vs team-wide.** 45% of participants didn't realize some settings affected the entire team.
4. **Tooltip demand is high.** Users hovered over 63% of setting labels, suggesting they wanted more context.

> "Just put a search bar at the top. That would solve 80% of my problems." — Sarah, Team Lead

## Proposed Changes

### Change 1: Categorized Navigation

| Current | Proposed | Rationale |
|---------|----------|-----------|
| Flat list of 43 settings | 6 categories with sidebar nav: Profile, Notifications, Privacy, Team (admin only), Integrations, Display | Matches users' mental model from card sort |

### Change 2: Search

| Current | Proposed | Rationale |
|---------|----------|-----------|
| No search | Fuzzy search bar at top of settings. Searches setting names, descriptions, and category names. | 72% of users attempted search in usability tests |

### Change 3: Contextual Help

| Current | Proposed | Rationale |
|---------|----------|-----------|
| No tooltips or descriptions | Every setting has: clear label, one-line description, "Learn more" link, and visual indicator if it's team-wide | Reduces support tickets, builds user confidence |

## Migration Plan

**Strategy:** Gradual rollout with A/B test

- **Phase 1 (Week 1-2):** Internal dogfooding. All TeamFlow employees see new settings. Collect feedback via Slack channel.
- **Phase 2 (Week 3-4):** A/B test with 20% of users. Measure: time-to-find, bounce rate, support tickets. Old settings remain accessible via "Switch to classic view" link.
- **Phase 3 (Week 5-6):** If metrics improve by >20%, roll out to 100%. Remove classic view after 30-day grace period.

**User communication:**
- In-app banner: "We've reorganized your settings to make them easier to find."
- One-time guided tour highlighting search and new categories
- Blog post explaining changes
- Support team briefed with FAQ document

## Success Metrics

| Metric | Baseline | Target | Measurement Method |
|--------|----------|--------|--------------------|
| Time to find setting | 47s | <15s | Usability test (n=50, post-launch) |
| Support tickets (settings) | 312/mo | <100/mo | Zendesk category filter |
| Bounce rate | 34% | <15% | Mixpanel funnel |
| Mobile completion | 18% | >50% | Mixpanel device segmentation |
| CSAT | 2.1/5 | >3.8/5 | In-app survey (30 days post) |

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Users can't find settings they're used to | High | Medium | Search bar + "classic view" fallback for 30 days |
| A/B test sample too small for significance | Medium | Medium | Run for minimum 2 weeks, minimum 5K users per variant |
| Team settings accidentally changed by members | Low | High | Add confirmation dialog for team-wide settings |
| Search performance degrades with many settings | Low | Low | Client-side search (43 items, no API needed) |

## Timeline

| Milestone | Date | Owner |
|-----------|------|-------|
| Design mockups complete | Week 1 | Design Lead |
| Frontend implementation | Week 2-3 | Frontend Team |
| Search implementation | Week 3 | Frontend Team |
| Internal dogfood | Week 4 | All Teams |
| A/B test launch | Week 5 | PM + Data |
| GA rollout decision | Week 7 | PM |
| Classic view removal | Week 11 | Frontend Team |

## Stakeholder Communication

| Stakeholder | Interest | Communication Plan |
|-------------|----------|-------------------|
| Support team | Ticket reduction, new FAQ | Briefing session + FAQ doc (Week 3) |
| Engineering | Implementation complexity | Technical spec review (Week 1) |
| Design | UX consistency | Design review + approval (Week 1) |
| Leadership | CSAT improvement | Weekly metrics update during A/B test |
| Users | Finding their settings | In-app banner + guided tour |

## Open Questions

1. [ ] Should we add a "Recently changed" section showing settings modified in the last 30 days?
2. [ ] Do we need keyboard navigation support for accessibility?
3. [ ] Should admin-only settings be completely hidden or shown as disabled for non-admins?
