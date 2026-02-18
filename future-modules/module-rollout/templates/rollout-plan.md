# Rollout Plan: [Feature Name]

**Created:** [Date]
**Status:** Draft
**Owner:** [PM Name]
**Team Size:** [Number]
**Timeline:** [X weeks]
**Risk Tolerance:** [low / medium / high]

---

## Overview

[Brief description of the feature and why it's being rolled out]

## Rollout Strategy

[Conservative / Standard / Aggressive] rollout with [N] phases.

### Phase 1: Internal Testing
> Deploy to internal team members and dogfood the feature

**Duration:** [X days]

**Tasks:**
- [ ] Deploy to staging environment
- [ ] Internal team testing with real workflows
- [ ] Gather feedback from internal users
- [ ] Fix critical issues found during testing
- [ ] Update documentation based on feedback

**Exit Criteria:**
- [ ] No P0 or P1 bugs remaining
- [ ] Internal team sign-off obtained
- [ ] Monitoring and alerting verified
- [ ] Rollback procedure tested

### Phase 2: Canary Release
> Roll out to [1-10]% of users

**Duration:** [X days]

**Tasks:**
- [ ] Enable feature flag for [X]% of users
- [ ] Monitor error rates, latency, and key metrics
- [ ] Watch for user-reported issues
- [ ] Compare metrics against baseline
- [ ] Review support ticket volume

**Exit Criteria:**
- [ ] Error rate within acceptable threshold
- [ ] No significant latency regression
- [ ] Key metrics stable or improving
- [ ] No critical user-reported issues

### Phase 3: Gradual Rollout
> Incrementally increase rollout percentage

**Duration:** [X days]

**Tasks:**
- [ ] Increase to 25% → 50% → 100%
- [ ] Monitor metrics at each increment
- [ ] Pause and investigate any anomalies
- [ ] Update stakeholders at each milestone

**Exit Criteria:**
- [ ] All rollout percentages completed without issues
- [ ] Metrics meet or exceed success criteria

### Phase 4: Full Launch
> Feature available to all users

**Duration:** [X days]

**Tasks:**
- [ ] Remove feature flag
- [ ] Send launch announcement
- [ ] Update documentation and help center
- [ ] Brief support team
- [ ] Schedule retrospective

**Exit Criteria:**
- [ ] Documentation published
- [ ] Retrospective completed
- [ ] Success metrics confirmed

## Success Metrics

| Metric | Baseline | Target | Method |
|--------|----------|--------|--------|
| Error rate | [current] | <0.1% increase | Monitoring |
| Latency (p95) | [current] | <10% increase | APM |
| User adoption | 0% | [target]% | Analytics |
| Support tickets | [current/week] | <20% increase | Support |

## Rollback Triggers

Immediately halt and rollback if:
- Error rate increases by more than 0.5%
- P95 latency increases by more than 50%
- Any data corruption detected
- Critical security vulnerability discovered
