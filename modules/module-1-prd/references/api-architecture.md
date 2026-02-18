# TeamFlow API Architecture Overview

**Last Updated:** January 2026
**Author:** Engineering Team
**Audience:** Product Managers, Technical Stakeholders

---

## System Overview

TeamFlow uses a microservices architecture deployed on AWS. The platform consists of 6 core services communicating via REST APIs and an event bus (Amazon SNS/SQS).

```
Client Apps (Web, Mobile, API)
       |
   API Gateway (Kong)
       |
  ┌────┴────────────────────────┐
  |    |       |       |        |
 Auth  Projects Tasks  Notify  Analytics
  |    |       |       |        |
  └────┴───────┴───────┴────────┘
       |
   PostgreSQL + Redis
```

---

## Core Services

| Service | Responsibility | Tech Stack | Team |
|---------|---------------|------------|------|
| **Auth Service** | User authentication, team management, SSO | Node.js, JWT | Platform Team |
| **Projects Service** | Project CRUD, permissions, templates | Go | Core Team |
| **Tasks Service** | Task CRUD, assignments, status, subtasks | Go | Core Team |
| **Notifications Service** | Email, in-app, push notifications | Python | Platform Team |
| **Analytics Service** | Event tracking, dashboards, reports | Python, ClickHouse | Data Team |
| **Integrations Service** | Third-party connectors (Slack, GitHub) | Node.js | Integrations Team |

---

## API Gateway

- **Technology:** Kong API Gateway
- **Rate Limiting:** 1000 requests/min per API key, 100 requests/min per user session
- **Authentication:** JWT tokens (access token: 15 min TTL, refresh token: 7 day TTL)
- **Versioning:** URL-based (`/api/v1/`, `/api/v2/`)
- **CORS:** Allowed origins configured per environment

---

## Authentication

- **Primary:** Email/password with bcrypt hashing
- **SSO:** Google Workspace, Okta, Azure AD via SAML 2.0
- **API Keys:** For programmatic access (scoped per team)
- **OAuth 2.0:** For third-party integrations
- **MFA:** TOTP-based (optional, required for admin roles)

---

## Database

### Primary: PostgreSQL 15
- **Use:** All transactional data (users, teams, projects, tasks)
- **Hosting:** AWS RDS Multi-AZ
- **Size:** ~120GB across all schemas
- **Connection pooling:** PgBouncer (max 200 connections)

### Cache: Redis 7
- **Use:** Session storage, rate limiting, real-time presence, task count caches
- **Hosting:** AWS ElastiCache
- **TTL policy:** Session data: 24 hours, cached counts: 5 minutes, presence: 30 seconds

### Analytics: ClickHouse
- **Use:** Event storage, time-series analytics, dashboard queries
- **Hosting:** Self-managed cluster (3 nodes)
- **Retention:** Raw events: 90 days, aggregated: 2 years

---

## Current Performance

| Metric | Current | Target |
|--------|---------|--------|
| API p50 latency | 45ms | <50ms |
| API p99 latency | 280ms | <200ms |
| Uptime (30-day) | 99.92% | 99.95% |
| Max concurrent users | 5,000 | 15,000 |
| Database query p95 | 120ms | <100ms |
| Page load time (web) | 2.1s | <1.5s |

---

## Known Limitations & Technical Debt

1. **Notifications Service bottleneck:** Single-threaded Python worker processes notifications sequentially. At peak (9-10 AM), notification delivery can lag 2-5 minutes. Needs migration to async workers with SQS.

2. **No WebSocket support:** All real-time updates use polling (30-second intervals). This causes stale data and unnecessary load. WebSocket infrastructure is planned for Q2.

3. **Monolithic frontend:** The web app is a single React bundle (2.8MB gzipped). Code splitting is partially implemented but the main bundle still loads everything. Mobile app shares some components but has its own build.

4. **Analytics query performance:** Complex dashboard queries on ClickHouse take 3-8 seconds for teams with 1M+ events. Pre-aggregation pipeline is needed.

5. **Integration reliability:** Third-party API failures (Slack, GitHub) are not gracefully handled. Failed webhook deliveries are not retried. No circuit breaker pattern implemented.

6. **Search limitations:** Current task search uses PostgreSQL full-text search, which works for <100K tasks but degrades beyond that. Elasticsearch migration is on the roadmap.

---

## API Endpoints (Key Examples)

**Tasks:**
- `GET /api/v1/tasks` — List tasks (supports filtering, pagination)
- `POST /api/v1/tasks` — Create task
- `PATCH /api/v1/tasks/:id` — Update task
- `POST /api/v1/tasks/:id/assign` — Assign task to user

**Projects:**
- `GET /api/v1/projects` — List projects
- `GET /api/v1/projects/:id/metrics` — Project velocity, burndown data

**Notifications:**
- `GET /api/v1/notifications` — List user notifications
- `POST /api/v1/notifications/preferences` — Update notification settings
