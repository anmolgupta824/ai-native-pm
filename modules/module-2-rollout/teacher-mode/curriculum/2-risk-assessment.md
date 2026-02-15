# Lesson 2: Risk Assessment

**Estimated time: 20 minutes**
**Lesson type: Framework + Hands-on**

---

## Why Risk Assessment Comes First

Risk assessment is the foundation of every rollout plan. Here's why it comes before everything else:

**Risks shape your timeline.** High-risk components need more testing time, more buffer, and earlier start dates. You can't build a timeline without knowing where the risk is.

**Risks determine your stakeholders.** A compliance risk means you need legal review. A scalability risk means you need infrastructure support. Your risk profile tells you who needs to be involved.

**Risks define your rollback plan.** You can't plan for failure if you don't know what failure looks like. Risk assessment surfaces the specific scenarios your rollback plan needs to handle.

**The "what could go wrong" question:**
Most PMs ask "what could go wrong?" in a brainstorming session and get 4-5 generic answers. With structured context and AI, you get 10-15 specific, actionable risks -- many of which you'd never think of alone.

---

## The 5 Risk Categories

Every product launch faces risks in these 5 categories. The `assess_risks` tool checks all of them:

### 1. Technical Risks
Infrastructure limits, API dependencies, data migration, performance under load.
> Key question: "What breaks if traffic is 3x expected?"

### 2. User Adoption Risks
Change aversion, learning curve, workflow disruption, feature discovery.
> Key question: "Which users will be most disrupted by this change?"

### 3. Timeline Risks
External dependencies, holiday freezes, team capacity, competing priorities.
> Key question: "What's the critical path? What has no slack?"

### 4. Organizational Risks
Stakeholder conflicts, competing priorities, approval delays, team changes.
> Key question: "Who might block this and why?"

### 5. Compliance Risks
Privacy requirements, security review, legal approval, accessibility standards.
> Key question: "What regulatory gates must we pass?"

**The pattern:** Each category has specific signals you can look for in your PRD, architecture docs, and organizational context. The `assess_risks` tool uses these signals to generate targeted risk assessments.

---

## Context-Driven Risk Assessment

Risks don't come from imagination -- they come from context. The quality of your risk assessment depends entirely on the context you provide.

**What to @-mention:**
- **Your PRD** -- The most important input. Contains requirements, technical approach, and scope
- **Architecture docs** -- Reveals technical dependencies, scaling limits, API contracts
- **Past incident logs** -- AI excels at pattern-matching: "Last time we did X, Y went wrong"
- **Team capacity docs** -- Sprint plans, OKR commitments, PTO schedules

**Example prompt with context:**
```
@prd-notifications.md @incident-log-q4.md @architecture.md

I'm planning the rollout for the notifications center.
Generate a risk assessment matrix. For each risk:
- Likelihood (Low/Medium/High)
- Impact (Low/Medium/High)
- Specific mitigation action
- Risk owner

Be aggressive -- I'd rather over-prepare than under-prepare.
```

**The "be aggressive" principle:** Always ask for more risks than you think you need. It takes 5 seconds to deprioritize a risk. It takes 5 hours to manage one you didn't see coming.

**Pro tip:** Include past incident logs. AI is excellent at pattern-matching risks from previous launches to your current one.

---

## Using the assess_risks Tool

The `assess_risks` tool takes three inputs and generates a comprehensive risk matrix:

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `feature_description` | What you're launching | "Real-time notification system replacing email-only alerts" |
| `components_affected` | Systems/services impacted | ["WebSocket server", "notification preferences API", "email service", "mobile push"] |
| `user_base_size` | How many users are affected | 150000 |

**Output structure:**
The tool generates a risk matrix with:
- **Risk name** -- specific, not generic
- **Category** -- technical, user adoption, timeline, organizational, compliance
- **Likelihood** -- Low / Medium / High
- **Impact** -- Low / Medium / High
- **Priority** -- calculated from likelihood x impact
- **Mitigation** -- specific action, not hand-wavy
- **Owner suggestion** -- who should own this risk

**Reading the output:**
Focus on **High likelihood + High impact** risks first. These are your "must mitigate" items -- they go directly into your rollout plan.

**Medium x High** and **High x Medium** are your "should mitigate" items -- address them if time allows.

**Low x Low** can be acknowledged and accepted. Don't waste time mitigating risks that are unlikely AND low-impact.

---

## Prioritizing and Assigning Risks

Once you have a risk matrix, you need to prioritize and assign ownership. This is where PM judgment matters most.

**The Priority Matrix:**
|  | Low Impact | Medium Impact | High Impact |
|--|-----------|---------------|-------------|
| **High Likelihood** | Monitor | Mitigate | Must Mitigate |
| **Medium Likelihood** | Accept | Monitor | Mitigate |
| **Low Likelihood** | Accept | Accept | Monitor |

**Assigning risk owners:**
The golden rule: **"The team" owns nothing. "Sarah (Backend Lead)" owns something.**

For each high-priority risk, assign:
- **Owner** -- One person responsible (not a team)
- **Mitigation action** -- Specific step they'll take
- **Due date** -- When the mitigation must be complete
- **Verification** -- How you'll confirm the mitigation worked

**Example:**
| Risk | Owner | Mitigation | Due | Verification |
|------|-------|-----------|-----|-------------|
| WebSocket scaling under load | Mike (Backend Lead) | Load test at 3x expected traffic | Week 2 | p95 latency < 500ms at 450K connections |
| Push notification opt-out confusion | Priya (Design Lead) | User test preference UI with 5 users | Week 1 | 80% task completion rate |

**Common mistake:** Listing risks without owners. An unowned risk is an unmitigated risk.

---

## Risk Assessment Best Practices

**Do:**
- Run `assess_risks` early -- ideally before the kickoff meeting
- Include 3-5 context files via @-mentions for specific results
- Ask for "aggressive" assessment -- it's easier to deprioritize than to discover
- Update the risk matrix weekly during the rollout -- risks change
- Share the risk matrix with engineering before finalizing the rollout plan

**Don't:**
- Don't treat risks as a checklist to file away -- actively monitor the high-priority ones
- Don't skip mitigation actions -- "we'll deal with it if it happens" is not a mitigation
- Don't assign risks to teams -- assign to individuals
- Don't forget to re-assess after scope changes -- new scope = new risks

**When to re-run risk assessment:**
- After a significant scope change
- After discovering a new dependency
- After an incident on a related system
- At each rollout phase gate (canary -> 25% -> 50% -> 100%)

---

## Exercise: Build a Risk Matrix

Use the assess_risks tool to generate a risk matrix for a real or hypothetical feature launch.

1. Choose a feature to assess (real project or hypothetical)
2. Write a 2-3 sentence feature description
3. List 3-5 components/systems that would be affected
4. Estimate your user base size
5. Use the assess_risks tool with these inputs
6. Review the output: identify your top 3 risks and assign owners

---

## Quick Check

1. Why should risk assessment come before timeline generation?
2. What makes context-driven risk assessment better than brainstorming?
3. A risk has Low likelihood but High impact. What should you do?

---

*Previous: [Lesson 1: Welcome](1-welcome.md)*
*Next: [Lesson 3: Stakeholder Mapping](3-stakeholder-mapping.md)*
