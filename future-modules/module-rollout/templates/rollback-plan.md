# Rollback Plan: [Feature Name]

**Created:** [Date]
**Deployment Type:** [Feature Flag / Blue-Green / Rolling]
**Components:** [List affected components]

---

## Rollback Triggers

Initiate rollback immediately if ANY of these conditions are met:

| Trigger | Threshold | Monitoring Source |
|---------|-----------|------------------|
| Error rate spike | >0.5% increase over baseline | Error tracking |
| Latency regression | >50% increase in p95 | APM dashboard |
| Data corruption | Any instance detected | Data integrity checks |
| Security incident | Any severity | Security alerts |
| Revenue impact | >5% drop in conversion | Business metrics |
| User complaints | >10x normal rate | Support dashboard |

## Rollback Procedure

### Option A: Feature Flag Rollback (~1 minute)
1. [ ] Disable feature flag in dashboard
2. [ ] Verify flag change propagated
3. [ ] Confirm feature is deactivated
4. [ ] Monitor error rates returning to baseline

### Option B: Deployment Rollback (~15-30 minutes)
1. [ ] Identify last known good version
2. [ ] Trigger deployment of previous version
3. [ ] Wait for all instances to update
4. [ ] Run database rollback migration (if applicable)
5. [ ] Verify all health checks passing

## Component Rollback Steps

### [Component 1]
- [ ] Revert to previous state
- [ ] Verify health/connectivity
- [ ] Check for data inconsistencies

### [Component 2]
- [ ] Revert to previous state
- [ ] Verify health/connectivity
- [ ] Check for data inconsistencies

## Post-Rollback Actions

1. **Incident report**
   - [ ] Document timeline of events
   - [ ] Identify root cause
   - [ ] Assess impact
2. **Communication**
   - [ ] Notify stakeholders
   - [ ] Update status page if needed
   - [ ] Schedule post-mortem
3. **Fix forward**
   - [ ] Identify the fix
   - [ ] Update test suite
   - [ ] Plan re-deployment

## Emergency Contacts

| Role | Name | Contact |
|------|------|---------|
| Engineering Lead | [Name] | [Slack/Phone] |
| On-Call Engineer | [Name] | [PagerDuty] |
| Product Manager | [Name] | [Slack/Phone] |
