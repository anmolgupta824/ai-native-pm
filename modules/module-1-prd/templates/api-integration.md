# PRD Template: API Integration

> Use this template when integrating with a third-party API or building a new API.

## Overview

**Product:** [Product name]
**Integration:** [API/Service name]
**Author:** [Your name]
**Date:** [Date]
**Status:** Draft | In Review | Approved

---

## Integration Goals

**Business goal:** [Why are you building this integration?]
**User value:** [What does the user get from this?]
**Revenue impact:** [Expected impact on revenue/retention]

## API Specification

**Base URL:** `https://api.example.com/v1`
**Auth method:** [OAuth 2.0 | API Key | JWT | Other]
**Documentation:** [Link to API docs]

### Key Endpoints

| Method | Endpoint | Purpose | Rate Limit |
|--------|----------|---------|------------|
| GET | `/resource` | | |
| POST | `/resource` | | |
| PUT | `/resource/:id` | | |

### Request/Response Examples

```json
// Request
{
}

// Response
{
}
```

## Authentication & Security

- **Auth flow:** [Describe OAuth flow or API key management]
- **Token storage:** [Where and how tokens are stored]
- **Token refresh:** [How expired tokens are handled]
- **Scopes required:** [List required permissions]
- **Data encryption:** [In transit / at rest]

## Data Flow

```
[Your System] → [API Gateway] → [Third-Party API]
                                        ↓
[Your System] ← [Webhook/Polling] ← [Response]
```

**Data mapping:**

| Your Field | API Field | Transform |
|-----------|-----------|-----------|
| | | |
| | | |

## Error Handling

| Error Code | Scenario | User-Facing Message | System Action |
|------------|----------|---------------------|---------------|
| 400 | Bad request | | Retry with corrected data |
| 401 | Auth failed | | Refresh token, retry |
| 429 | Rate limited | | Exponential backoff |
| 500 | Server error | | Retry 3x, then alert |
| Timeout | No response | | Retry with backoff |

## Rate Limits & Performance

- **API rate limit:** [X requests per minute/hour]
- **Expected volume:** [X requests per day]
- **Caching strategy:** [What to cache, TTL]
- **Batch processing:** [If applicable]

## Testing Strategy

- [ ] Unit tests for data transformation
- [ ] Integration tests against sandbox API
- [ ] Load testing at expected volume
- [ ] Failure mode testing (API down, slow, malformed)
- [ ] Security testing (token handling, injection)

## Monitoring & Alerting

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Error rate | > 5% | Page on-call |
| Latency (p99) | > 2s | Investigate |
| Token failures | > 3 in 10 min | Check auth config |

## Rollback Plan

1. **Detection:** [How you know something is wrong]
2. **Decision:** [Who decides to rollback]
3. **Execution:** [Steps to rollback]
4. **Verification:** [How you know rollback worked]
5. **Communication:** [Who to notify]

## Documentation Requirements

- [ ] Integration architecture diagram
- [ ] Setup guide for new developers
- [ ] Runbook for common issues
- [ ] API changelog tracking process

## Open Questions

1. [ ]
2. [ ]
3. [ ]
