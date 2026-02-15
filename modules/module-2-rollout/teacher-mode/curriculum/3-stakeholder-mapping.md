# Lesson 3: Stakeholder Mapping

**Estimated time: 20 minutes**
**Lesson type: Framework + Hands-on**

---

## Why Stakeholder Mapping Matters

The fastest way to derail a launch is stakeholder misalignment. You can have the perfect risk matrix, timeline, and rollback plan -- and still fail because the VP of Engineering wasn't looped in, or Sales promised a feature that isn't in scope.

**Common stakeholder failures:**
- "Nobody told me about this change" -- from a team affected by the launch
- "That's not what I approved" -- from a sponsor who had different expectations
- "We needed 2 more weeks of notice" -- from Support who couldn't prepare
- "Sales already promised this to 3 customers" -- from a sales team that moved faster than Product

**The core problem:** PMs often have a mental model of who cares about a launch, but they miss the second-order stakeholders -- the people who aren't directly involved but ARE affected.

**What good stakeholder mapping does:**
1. Identifies everyone who has a stake in the launch (not just the obvious ones)
2. Maps their interests -- what they care about and why
3. Detects conflicts -- where stakeholder interests clash
4. Creates a communication plan -- right message, right person, right time

---

## The RACI Framework

RACI is a responsibility assignment matrix that answers: "Who does what?"

| Letter | Role | Definition | Example |
|--------|------|------------|---------|
| **R** -- Responsible | Does the work | The person actually executing the task | Backend engineer implementing WebSocket |
| **A** -- Accountable | Owns the outcome | One person who signs off. Only ONE per task | PM who owns the rollout plan |
| **C** -- Consulted | Provides input | People whose expertise is needed before a decision | Security team reviewing data access |
| **I** -- Informed | Needs to know | People who need updates but don't have decision power | VP Product getting weekly status |

**Rules of RACI:**
- Every task has exactly ONE Accountable person
- Multiple people can be Responsible, Consulted, or Informed
- If everyone is Accountable, nobody is Accountable
- If nobody is Informed, somebody will be surprised

**Common RACI for a rollout:**
| Task | PM | Eng Lead | Design | QA | Support | Leadership |
|------|-----|---------|--------|-----|---------|-----------|
| Risk assessment | A,R | C | C | C | I | I |
| Timeline | A | R | C | C | I | I |
| Go/no-go decision | R | R | C | R | I | A |
| User communication | A,R | I | C | I | R | I |
| Rollback execution | I | A,R | I | R | I | I |

---

## Stakeholder Conflict Detection

Stakeholder conflicts are the hidden risks that don't show up in technical risk assessment. They're political, organizational, and often the reason launches get delayed.

**Common conflict patterns:**

### Scope Conflicts
Engineering wants to cut scope for timeline. Design wants the full experience. PM is caught in the middle.
> Signal: Different stakeholders have different definitions of "MVP"

### Timeline Conflicts
Sales needs the feature by Q2 for a customer commitment. Engineering says Q3 is realistic. Leadership wants both.
> Signal: External commitments that don't match internal estimates

### Priority Conflicts
Your launch competes with another team's initiative for shared resources (infrastructure, QA, design review).
> Signal: Multiple projects targeting the same release window

### Authority Conflicts
Two leaders both think they have final say on the go/no-go decision. Neither has been explicitly designated.
> Signal: Ambiguous decision-making authority

**How to surface conflicts early:**
The `map_stakeholders` tool analyzes your stakeholder list and org context to flag potential conflicts. But you can also spot them by asking: "Where do two stakeholders want different things from this launch?"

---

## Using the map_stakeholders Tool

The `map_stakeholders` tool takes two inputs and generates a comprehensive stakeholder map:

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| `feature_name` | What you're launching | "Real-Time Notification System" |
| `org_context` | Your organizational context | "B2B SaaS, 150K MAU, 5-person product team, separate backend and frontend teams..." |

**What to include in org_context:**
- Company type (B2B, B2C, marketplace, etc.)
- Team structure (who reports to whom)
- Known dynamics ("VP Engineering and VP Product disagree on WebSocket approach")
- External commitments ("Sales committed notifications to Acme Corp by March")
- Resource constraints ("QA team is shared across 3 product teams")

**Output includes:**
1. **Stakeholder list** with roles, interests, and influence level
2. **RACI matrix** for key rollout decisions
3. **Conflict flags** -- where interests clash
4. **Communication plan** -- who needs what information, when, via what channel

**Pro tip:** The more organizational context you provide, the better the conflict detection. "VP Product and Engineering Lead disagree on WebSocket approach" produces much better results than just listing their names.

---

## Communication Planning

Different stakeholders need different messages at different times. A good communication plan answers: **who, what, when, how.**

**Communication matrix template:**
| Audience | When | Channel | Content | Owner |
|----------|------|---------|---------|-------|
| Engineering | Weekly during dev | Standup / Slack | Technical progress, blockers | Eng Lead |
| Leadership | Weekly | Status email | Milestone progress, risks, asks | PM |
| Support | 2 weeks pre-launch | Training session | Feature walkthrough, FAQ | PM + Support Lead |
| Sales | 1 week pre-launch | Enablement deck | Feature positioning, demo script | PM + PMM |
| Beta users | At beta launch | In-app + email | What's new, how to use, feedback link | PM |
| All users | At full launch | In-app banner + email | Feature announcement, help docs | PMM |

**Key principles:**
1. **Start early with engineering** -- they need to raise blockers before they become crises
2. **Give Support enough lead time** -- 2 weeks minimum for training and FAQ preparation
3. **Don't surprise Sales** -- they talk to customers daily. Surprises create awkward conversations
4. **Differentiate beta vs GA communication** -- beta users expect rough edges; GA users don't
5. **Leadership wants outcomes, not details** -- status updates should focus on "are we on track?" not "what SQL queries we optimized"

---

## Stakeholder Mapping Best Practices

**Do:**
- Map stakeholders BEFORE the kickoff meeting -- don't discover them during the launch
- Include second-order stakeholders (people affected but not directly involved)
- Be specific in org_context -- names, dynamics, and history produce better results
- Update the stakeholder map when scope changes -- new scope may involve new stakeholders
- Share the RACI with the team -- alignment happens when everyone sees the same matrix

**Don't:**
- Don't assume stakeholders agree just because they haven't objected -- silence does not equal alignment
- Don't skip the conflict detection step -- undetected conflicts always surface at the worst time
- Don't send the same update to every stakeholder -- customize by audience
- Don't forget external stakeholders -- customers, partners, regulators may need communication

**Red flags to watch for:**
- A stakeholder who hasn't responded to two communication attempts
- Two stakeholders who both think they make the final call
- A stakeholder whose requirements conflict with the current scope
- An important stakeholder who wasn't in the original map

---

## Exercise: Map Stakeholders for a Launch

Use the map_stakeholders tool to generate a stakeholder map for a real or hypothetical launch.

1. Choose a feature launch (real or hypothetical)
2. Write a detailed org_context paragraph (include team structure, dynamics, constraints)
3. Use the map_stakeholders tool with your feature name and org context
4. Review the RACI matrix -- does every key task have exactly one Accountable person?
5. Review the conflict flags -- are any of these conflicts you've already seen?
6. Customize the communication plan for your organization's actual channels

---

## Quick Check

1. In the RACI framework, how many people should be Accountable for each task?
2. What's the most important input to the map_stakeholders tool?
3. Why is it important to detect stakeholder conflicts BEFORE the launch?

---

*Previous: [Lesson 2: Risk Assessment](2-risk-assessment.md)*
*Next: [Lesson 4: Timeline Generation](4-timeline-generation.md)*
