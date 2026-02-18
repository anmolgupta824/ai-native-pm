# PRD: Stripe Payment Integration

**Template:** API Integration
**Product:** TeamFlow
**Author:** The AI-Native PM
**Date:** 2026-01-15
**Status:** Draft

---

## Overview

Integrate Stripe as TeamFlow's payment processor to handle team subscriptions, seat-based billing, and self-serve plan upgrades. This replaces the current manual invoicing process.

## Integration Goals

**Business goal:** Enable self-serve billing to reduce manual invoicing overhead by 80% and accelerate revenue collection.
**User value:** Team admins can upgrade, downgrade, and manage billing without contacting sales.
**Revenue impact:** Projected 15% increase in upgrade conversion (from 8% to 23%) due to reduced friction.

## API Specification

- **API:** Stripe API v2024-12
- **Base URL:** `https://api.stripe.com/v1/`
- **Authentication:** API key (secret key stored in AWS Secrets Manager)
- **Documentation:** https://docs.stripe.com/api
- **Key endpoints:**
  - `POST /customers` — Create customer on signup
  - `POST /subscriptions` — Create subscription
  - `POST /subscriptions/:id` — Update subscription (upgrade/downgrade)
  - `DELETE /subscriptions/:id` — Cancel subscription
  - `POST /billing_portal/sessions` — Redirect to Stripe billing portal
- **Rate limits:** 100 reads/sec, 100 writes/sec (standard tier)

## Authentication & Security

- **Auth method:** Stripe API secret key (server-side only, never exposed to client)
- **Token storage:** AWS Secrets Manager with automatic rotation every 90 days
- **Webhook verification:** Stripe webhook signatures verified using `stripe.webhooks.constructEvent()`
- **PCI compliance:** TeamFlow never handles raw card data. All payment UI uses Stripe Elements (PCI DSS Level 1 certified).
- **Encryption:** All API calls over TLS 1.3. Customer IDs stored encrypted at rest.

## Data Flow

```
User clicks "Upgrade" → Frontend loads Stripe Checkout
    → Stripe handles payment collection
    → Stripe sends webhook to TeamFlow
    → TeamFlow updates subscription in DB
    → User sees upgraded plan immediately
```

**Data mapping:**

| TeamFlow Entity | Stripe Entity | Sync Direction |
|----------------|---------------|----------------|
| Team | Customer | TeamFlow → Stripe |
| Team Admin email | Customer email | TeamFlow → Stripe |
| Plan (Free/Pro/Enterprise) | Product + Price | Stripe → TeamFlow |
| Seat count | Subscription quantity | Bi-directional |
| Payment status | Invoice status | Stripe → TeamFlow |

## Error Handling

| Error Scenario | User Message | System Action |
|---------------|--------------|---------------|
| Card declined | "Payment failed. Please update your payment method." | Log event, send admin email, retry in 24h |
| Card expired | "Your card on file has expired. Please update it." | Send email to team admin, grace period 7 days |
| Stripe API timeout | "Payment processing. We'll confirm shortly." | Queue retry (3 attempts, exponential backoff) |
| Webhook delivery failure | (No user-facing message) | Stripe auto-retries for 72 hours. Alert if 3+ failures. |
| Subscription downgrade mid-cycle | "Your plan will change at the end of your billing period." | Schedule change via Stripe `cancel_at_period_end` |
| Double charge | "We detected a duplicate. Refunding automatically." | Auto-refund via Stripe API, log incident |

## Rate Limits & Performance

- **Stripe rate limits:** 100 req/sec (sufficient for our scale: ~5 req/sec at peak)
- **Expected volume:** ~200 subscription changes/day, ~50 new customers/day
- **Caching:** Cache plan/price data locally (refresh every 6 hours). Never cache customer payment data.
- **Batch processing:** End-of-month invoicing handled by Stripe automatically. No batch jobs needed.

## Testing Strategy

| Test Type | What We Test | Tools |
|-----------|-------------|-------|
| Unit tests | Webhook handler logic, subscription state machine | Jest |
| Integration tests | Stripe API calls with test mode keys | Stripe test mode |
| Load testing | 500 concurrent subscription changes | k6 |
| Failure mode tests | API timeouts, invalid webhooks, duplicate events | Stripe CLI mock |
| Security tests | API key exposure, webhook signature bypass | OWASP ZAP |

## Monitoring & Alerting

| Metric | Threshold | Alert Action |
|--------|-----------|--------------|
| Webhook processing time | p95 > 5s | Slack #payments channel |
| Failed payments (hourly) | > 10% of attempts | Page on-call engineer |
| Stripe API error rate | > 1% | Slack + PagerDuty |
| Subscription sync lag | > 5 minutes | Slack #payments channel |
| Revenue discrepancy (daily) | > $100 difference | Email finance team |

## Rollback Plan

1. **Detection:** Revenue dashboard shows anomaly OR error rate > 5% OR 3+ customer complaints
2. **Decision:** On-call engineer + PM assess within 30 minutes
3. **Execution:** Disable self-serve billing UI (feature flag). Revert to manual invoicing. Stripe subscriptions remain active.
4. **Verification:** Confirm no pending charges, all webhooks processed, customer data consistent
5. **Communication:** Email affected customers within 2 hours. Post incident report within 24 hours.

## Documentation Requirements

- [ ] Integration architecture diagram
- [ ] Webhook event handling runbook
- [ ] Stripe dashboard access guide (for finance team)
- [ ] Customer billing FAQ for support team
- [ ] Incident response playbook for payment failures

## Open Questions

1. [ ] Should we support annual billing at launch or start with monthly only?
2. [ ] Do we need to support multiple payment methods (ACH, wire) for enterprise?
3. [ ] How do we handle teams that exceed their seat limit mid-cycle?
4. [ ] Tax calculation: use Stripe Tax or integrate with a separate tax provider?
