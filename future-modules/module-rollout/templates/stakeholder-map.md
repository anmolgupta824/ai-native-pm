# Stakeholder Map: [Feature Name]

**Created:** [Date]
**Owner:** [PM Name]

---

## Stakeholder List

| Stakeholder | Role | Interest | Influence | RACI | Communication |
|-------------|------|----------|-----------|------|---------------|
| [Name] | Product Manager | High | High | A | Daily |
| [Name] | Engineering Lead | High | High | R | Daily |
| [Name] | Design Lead | High | Medium | C | Weekly |
| [Name] | QA Lead | High | Medium | R | Daily (testing) |
| [Name] | Support Lead | Medium | Medium | I | Weekly |
| [Name] | Executive Sponsor | Medium | High | I | Phase transitions |

## RACI Matrix

| Activity | PM | Eng Lead | Design | QA | Support | Exec |
|----------|-----|----------|--------|-----|---------|------|
| Requirements | A | C | C | C | I | I |
| Design | C | C | R | I | I | I |
| Implementation | A | R | C | I | I | I |
| Testing | A | C | C | R | I | I |
| Deployment | A | R | I | C | I | I |
| Monitoring | I | R | I | C | I | I |
| User comms | R | I | C | I | C | A |
| Rollback decision | A | R | I | C | I | I |

**Legend:** R = Responsible, A = Accountable, C = Consulted, I = Informed

## Communication Plan

### [Product Manager]
- **Frequency:** Daily during rollout
- **Channel:** Slack DM / standup
- **Content:** Full progress, blockers, decisions needed

### [Engineering Lead]
- **Frequency:** Daily during rollout
- **Channel:** Slack DM / standup
- **Content:** Technical updates, blockers, timeline

### [Executive Sponsor]
- **Frequency:** At phase transitions + weekly summary
- **Channel:** Email / brief meeting
- **Content:** High-level status, milestones, risks

### [Support Lead]
- **Frequency:** Weekly + before public launch
- **Channel:** Email / Slack channel
- **Content:** FAQ updates, expected ticket volume, escalation path
