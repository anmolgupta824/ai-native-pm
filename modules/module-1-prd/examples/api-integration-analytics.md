# PRD: Mixpanel Analytics Integration

**Template:** API Integration
**Product:** TeamFlow
**Author:** The AI-Native PM
**Date:** 2026-01-20
**Status:** Draft

---

## Overview

Integrate Mixpanel for product analytics event tracking across TeamFlow's web and mobile clients. This replaces our homegrown ClickHouse-based analytics with a purpose-built platform, enabling product and growth teams to self-serve on user behavior insights.

## Integration Goals

**Business goal:** Give product and growth teams self-serve analytics without engineering support. Currently 85% of analytics queries require an engineer.
**User value:** PMs and growth leads can build funnels, cohort analyses, and retention reports in minutes.
**Revenue impact:** Faster experimentation leads to projected 10% improvement in activation rate (worth ~$400K ARR).

## API Specification

- **API:** Mixpanel Ingestion API + Query API
- **Ingestion URL:** `https://api.mixpanel.com/track`
- **Query URL:** `https://mixpanel.com/api/2.0/`
- **Authentication:** Project token (ingestion), Service Account (query)
- **Documentation:** https://developer.mixpanel.com/docs
- **Key endpoints:**
  - `POST /track` — Send events (batched)
  - `POST /engage` — Update user profiles
  - `GET /api/2.0/events` — Query event data
  - `GET /api/2.0/funnels` — Query funnel data
- **Rate limits:** 2,000 events/sec (ingestion), 60 queries/min (query API)

## Authentication & Security

- **Ingestion auth:** Project token (public, safe to include in client-side code — Mixpanel's design)
- **Query auth:** Service Account credentials (server-side only, stored in AWS Secrets Manager)
- **Data privacy:**
  - No PII in event properties (no names, emails, IP addresses)
  - Use internal user IDs only (UUID format)
  - GDPR: Implement Mixpanel's deletion API for right-to-erasure requests
  - Data residency: EU data center (Mixpanel EU endpoint) for EU users
- **Consent:** Events only tracked after user accepts analytics cookies (GDPR/CCPA compliant)

## Data Flow

```
User action in TeamFlow
    → Analytics SDK captures event
    → Events batched (10 events or 10 seconds)
    → POST to Mixpanel /track endpoint
    → Mixpanel processes and stores
    → PM queries via Mixpanel dashboard
```

**Event Schema:**

| Event Name | Properties | Trigger |
|-----------|------------|---------|
| `task_created` | task_type, project_id, has_assignee, has_due_date | User creates a task |
| `task_completed` | task_type, time_to_complete_hours, was_overdue | User marks task done |
| `dashboard_viewed` | dashboard_type, widget_count, view_duration_sec | User opens a dashboard |
| `sprint_started` | sprint_length_days, task_count, team_size | Team lead starts sprint |
| `export_generated` | format (pdf/png), dashboard_type, generation_time_ms | User exports dashboard |
| `feature_activated` | feature_name, activation_step, is_first_time | User uses feature first time |

**User Profile Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `plan_type` | string | free / pro / enterprise |
| `team_size` | number | Number of team members |
| `role` | string | admin / member / viewer |
| `signup_date` | datetime | When user created account |
| `features_used` | list | Features activated by user |

## Error Handling

| Error Scenario | User Impact | System Action |
|---------------|-------------|---------------|
| Mixpanel API unreachable | None (analytics is non-blocking) | Queue events locally, retry every 60 seconds for up to 24 hours |
| Rate limit exceeded | None | Exponential backoff, increase batch window |
| Malformed event rejected | None | Log error, skip event, alert in monitoring |
| User requests data deletion (GDPR) | Confirmation email within 72 hours | Call Mixpanel Deletion API, log compliance action |
| Consent withdrawn | Stop tracking immediately | Delete local event queue, send deletion request |
| SDK initialization failure | None (app works without analytics) | Log error, disable tracking for session, retry on next page load |

## Rate Limits & Performance

- **Ingestion:** 2,000 events/sec limit. Our peak: ~200 events/sec. Comfortable headroom.
- **Client performance:** SDK adds <50KB to bundle. Event tracking adds <5ms to user actions.
- **Batching:** 10 events or 10-second window (whichever comes first) to minimize HTTP requests.
- **Offline:** Mobile SDK queues events offline, sends when connectivity returns.

## Testing Strategy

| Test Type | What We Test | Tools |
|-----------|-------------|-------|
| Unit tests | Event formatting, property sanitization, PII stripping | Jest |
| Integration tests | Event delivery to Mixpanel test project | Mixpanel test project |
| E2E tests | Full user flow generates expected events | Playwright + Mixpanel Live View |
| Privacy tests | No PII in events, consent gating works, deletion works | Manual audit + automated scan |
| Performance tests | SDK impact on page load, event batching under load | Lighthouse, k6 |

## Monitoring & Alerting

| Metric | Threshold | Alert Action |
|--------|-----------|--------------|
| Event delivery success rate | < 99% over 1 hour | Slack #analytics channel |
| Event queue depth | > 10,000 events | Slack + investigate batching |
| SDK initialization failures | > 1% of sessions | Slack #engineering channel |
| Mixpanel API latency (p95) | > 500ms | Monitor, no action unless persistent |
| GDPR deletion request backlog | > 5 pending for 48+ hours | Email compliance team |

## Rollback Plan

1. **Detection:** Event delivery rate drops below 95% OR client performance degrades
2. **Decision:** PM + on-call engineer assess within 1 hour
3. **Execution:** Disable Mixpanel SDK via feature flag (client-side). Events stop flowing. Dashboard access remains (historical data preserved in Mixpanel).
4. **Verification:** Confirm app performance returns to baseline. No data loss (queued events discarded).
5. **Communication:** Internal only (analytics is a backend system, no user-facing impact)

## Documentation Requirements

- [ ] Event taxonomy document (all events, properties, triggers)
- [ ] Mixpanel dashboard setup guide for PMs
- [ ] Privacy compliance checklist
- [ ] SDK integration guide for frontend engineers
- [ ] Runbook for GDPR deletion requests

## Open Questions

1. [ ] Should we track events in development/staging environments (separate Mixpanel project)?
2. [ ] Do we need server-side event tracking for background jobs (e.g., sprint auto-complete)?
3. [ ] How do we handle event schema versioning as product evolves?
4. [ ] Should we set up Mixpanel Warehouses connector to feed data back to our ClickHouse?
