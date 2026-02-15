# Lesson 4: Timeline Generation

**Estimated time: 20 minutes**
**Lesson type: Framework + Hands-on**

---

## Timelines vs Wish Lists

A timeline without dependencies is a wish list. Here's the difference:

**Wish list timeline:**
- Week 1: Backend development
- Week 2: Frontend development
- Week 3: Testing
- Week 4: Launch

**Dependency-aware timeline:**
- Week 1: Backend API development (blocks frontend integration)
- Week 1-2: Frontend UI development (can start immediately, independent of API)
- Week 2: Frontend-backend integration (blocked by API completion)
- Week 2-3: QA testing (blocked by integration, can start partial testing Week 2)
- Week 3: Staging deployment + load testing (blocked by QA sign-off)
- Week 4: Phased rollout -- 5% -> 25% -> 50% -> 100%

The second timeline answers crucial questions:
- **What can happen in parallel?** Frontend UI and backend API
- **What blocks what?** Integration is blocked by API completion
- **Where's the critical path?** Backend API -> Integration -> QA -> Staging -> Rollout
- **Where's the buffer?** Frontend has 1 week of slack before integration needs it

---

## The 6 Phases of a Rollout

Every product rollout follows these 6 phases. The `generate_timeline` tool structures your timeline around them:

### Phase 1: Planning
Finalize scope, assign resources, complete design review.
> Key question: "What must be decided before building starts?"
> Common trap: Starting dev before design is approved

### Phase 2: Development
Build the feature, create tests, set up monitoring.
> Key question: "What blocks what? What can run in parallel?"
> Common trap: Assuming everything is parallelizable

### Phase 3: Testing
Unit tests, integration tests, QA review, load testing.
> Key question: "What needs to be tested together vs independently?"
> Common trap: Skipping integration testing

### Phase 4: Staging
Deploy to staging, validate in production-like environment.
> Key question: "How long do we need in staging before production?"
> Common trap: "Works on my machine" leading to production surprises

### Phase 5: Rollout
Phased deployment: internal -> canary -> gradual -> full.
> Key question: "What's the phased rollout sequence?"
> Common trap: Big bang when phased rollout would be safer

### Phase 6: Post-Launch
Monitor metrics, gather feedback, evaluate success.
> Key question: "When do we declare success or rollback?"
> Common trap: No clear evaluation criteria

---

## Using the generate_timeline Tool

The `generate_timeline` tool takes four inputs and generates a Gantt-style timeline:

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `phases` | List of phases with tasks | ["Planning: design review, resource allocation", "Development: backend API, frontend UI", ...] |
| `dependencies` | What blocks what | ["Frontend integration blocked by Backend API", "QA blocked by integration complete"] |
| `team_size` | Number of people available | 5 |
| `start_date` | When work begins | "2026-03-01" |

**What the tool generates:**
- **Gantt-style timeline** with start/end dates for each task
- **Dependency arrows** showing what blocks what
- **Critical path** highlighted -- the longest chain of dependent tasks
- **Buffer suggestions** based on risk level (20% for high-risk, 10% for medium)
- **Milestones** at phase transitions and decision points

**How team size affects the timeline:**
The tool adjusts task durations based on team size:
- Larger teams can parallelize more work
- But coordination overhead increases with team size
- The critical path doesn't shrink proportionally with more people (Brooks's Law)

**How to write good phase descriptions:**
Be specific. "Development" is too vague. "Development: backend notification API, WebSocket server, frontend notification center, email digest service" tells the tool exactly what work needs to be parallelized or sequenced.

---

## Finding and Managing the Critical Path

The **critical path** is the longest chain of dependent tasks. It determines the minimum possible timeline. Everything else has slack.

**Why the critical path matters:**
- Any delay on the critical path delays the ENTIRE project
- Tasks not on the critical path have "float" -- they can slip without affecting the launch
- Your buffer time should be concentrated on critical path tasks

**Example critical path:**
```
Design Review (3d) -> Backend API (10d) -> Integration (3d) -> QA (5d) -> Staging (3d) -> Rollout (7d)
Total: 31 days
```

Meanwhile, "Frontend UI" (8 days) runs in parallel and has 5 days of float.

**Managing the critical path:**
1. **Identify it early** -- the `generate_timeline` tool highlights it
2. **Add buffer to critical path tasks** -- 20% is a good starting point
3. **Staff critical path tasks first** -- your strongest engineers on the highest-risk work
4. **Monitor critical path tasks weekly** -- any slip here slips everything
5. **Have a contingency plan** -- if the critical path slips, what scope can you cut?

**When the critical path changes:**
Sometimes a delay on a non-critical task eats up all its float and it BECOMES the critical path. This is why you re-check the critical path at each milestone, not just at the start.

---

## Buffer and Contingency Strategies

**The universal rule:** Add 20% buffer to engineering estimates. You'll need it.

But not all buffers are created equal. Here's how to be strategic:

**Where to add buffer:**
| Component | Buffer | Why |
|-----------|--------|-----|
| High-risk tasks | 30-50% | Unknown unknowns. Load testing, data migration, third-party integrations |
| New technology | 25-40% | Learning curve. First time using WebSockets, new deployment tool, etc. |
| Cross-team dependencies | 20-30% | Coordination overhead. Their sprint might not align with yours |
| Standard development | 10-20% | Normal estimation error. Even experienced engineers are optimistic |
| Rollout phases | Fixed 48h between phases | Monitoring window. You need time to detect problems |

**Types of contingency plans:**
1. **Scope cut** -- What features can you drop to hit the date? Decide this BEFORE you need to
2. **Phase delay** -- Can you extend a phase without delaying the launch?
3. **Resource addition** -- Can you bring in another engineer? (Careful: Brooks's Law)
4. **Rollout simplification** -- Can you go from 4 rollout phases to 2?

**The "2-week rule":**
If your total buffer is less than 2 weeks on a 6+ week project, you don't have enough. Something WILL go wrong. The question is whether you've left room for it.

---

## Timeline Best Practices

**Do:**
- Map dependencies BEFORE estimating durations -- sequence matters more than estimates
- Identify the critical path and add buffer there first
- Include go/no-go decision points at phase transitions
- Add a 48-hour monitoring window between each rollout phase
- Re-check the timeline after scope changes or delays

**Don't:**
- Don't assume everything can run in parallel -- dependencies are real
- Don't add buffer uniformly -- concentrate it on high-risk and critical path tasks
- Don't forget holidays, PTO, and competing priorities
- Don't hide buffer -- be transparent with the team about where buffer exists and why
- Don't treat the timeline as fixed -- it's a living document that updates with new information

**Go/no-go checkpoints:**
At each phase transition, have an explicit go/no-go decision:
- **Planning -> Development:** Design approved, resources assigned, risks assessed
- **Development -> Testing:** All code complete, unit tests passing
- **Testing -> Staging:** QA sign-off, no P0 bugs, load test passing
- **Staging -> Rollout:** Staging stable for 48 hours, rollback tested
- **Canary -> Gradual:** Metrics within targets for 48 hours

---

## Exercise: Generate a Rollout Timeline

Use the generate_timeline tool to create a dependency-aware timeline for a feature launch.

1. Choose a feature (real or hypothetical) with at least 4 phases
2. List the specific tasks within each phase (not just phase names)
3. Identify at least 3 dependencies between tasks
4. Use the generate_timeline tool with your phases, dependencies, team size, and start date
5. Review the output: identify the critical path
6. Check the buffer allocation -- is it enough? Where would you add more?

---

## Quick Check

1. What is the critical path in a project timeline?
2. Why should you add 48 hours between rollout phases?
3. A task not on the critical path slips by 5 days. It had 3 days of float. What happens?

---

*Previous: [Lesson 3: Stakeholder Mapping](3-stakeholder-mapping.md)*
*Next: [Lesson 5: Rollback Planning](5-rollback-planning.md)*
