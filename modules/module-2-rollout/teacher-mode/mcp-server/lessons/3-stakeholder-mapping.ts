import type { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 3,
  title: "Stakeholder Mapping",
  duration: "20 minutes",
  objectives: [
    "Understand why stakeholder misalignment derails launches",
    "Learn the RACI framework for rollout planning",
    "Master the map_stakeholders tool for conflict detection",
    "Build communication plans tailored to each stakeholder",
    "Practice detecting and resolving stakeholder conflicts",
  ],
  sections: [
    {
      id: "why-stakeholder-mapping",
      title: "Why Stakeholder Mapping Matters",
      content: `# Why Stakeholder Mapping Matters

The fastest way to derail a launch is stakeholder misalignment. You can have the perfect risk matrix, timeline, and rollback plan — and still fail because the VP of Engineering wasn't looped in, or Sales promised a feature that isn't in scope.

**Common stakeholder failures:**
- "Nobody told me about this change" — from a team affected by the launch
- "That's not what I approved" — from a sponsor who had different expectations
- "We needed 2 more weeks of notice" — from Support who couldn't prepare
- "Sales already promised this to 3 customers" — from a sales team that moved faster than Product

**The core problem:** PMs often have a mental model of who cares about a launch, but they miss the second-order stakeholders — the people who aren't directly involved but ARE affected.

**What good stakeholder mapping does:**
1. Identifies everyone who has a stake in the launch (not just the obvious ones)
2. Maps their interests — what they care about and why
3. Detects conflicts — where stakeholder interests clash
4. Creates a communication plan — right message, right person, right time`,
      teacherNotes: "Use examples the student can relate to. Sales promising features that aren't ready, or Support being blindsided by a launch, are universal PM experiences.",
      checkQuestion: "Have you ever been surprised by a stakeholder who wasn't initially on your radar? What happened?",
    },
    {
      id: "raci-framework",
      title: "The RACI Framework",
      content: `# The RACI Framework

RACI is a responsibility assignment matrix that answers: "Who does what?"

| Letter | Role | Definition | Example |
|--------|------|------------|---------|
| **R** — Responsible | Does the work | The person actually executing the task | Backend engineer implementing WebSocket |
| **A** — Accountable | Owns the outcome | One person who signs off. Only ONE per task | PM who owns the rollout plan |
| **C** — Consulted | Provides input | People whose expertise is needed before a decision | Security team reviewing data access |
| **I** — Informed | Needs to know | People who need updates but don't have decision power | VP Product getting weekly status |

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
| Rollback execution | I | A,R | I | R | I | I |`,
      teacherNotes: "RACI can feel bureaucratic. Emphasize that the point isn't to create a perfect matrix — it's to answer 'who decides?' and 'who needs to know?' before those questions become urgent during the launch.",
      checkQuestion: "In the RACI table above, why is Leadership marked as Accountable for the go/no-go decision instead of the PM?",
    },
    {
      id: "conflict-detection",
      title: "Stakeholder Conflict Detection",
      content: `# Stakeholder Conflict Detection

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
The \`map_stakeholders\` tool analyzes your stakeholder list and org context to flag potential conflicts. But you can also spot them by asking: "Where do two stakeholders want different things from this launch?"`,
      teacherNotes: "Conflict detection is the most valuable part of stakeholder mapping. PMs who surface conflicts before the launch have a much easier time resolving them. Emphasize that conflicts aren't bad — undetected conflicts are bad.",
      checkQuestion: "Can you think of a conflict pattern from the list above that you've seen in your own work? How was it resolved (or not)?",
    },
    {
      id: "using-map-stakeholders",
      title: "Using the map_stakeholders Tool",
      content: `# Using the map_stakeholders Tool

The \`map_stakeholders\` tool takes two inputs and generates a comprehensive stakeholder map:

**Inputs:**
| Parameter | Description | Example |
|-----------|-------------|---------|
| \`feature_name\` | What you're launching | "Real-Time Notification System" |
| \`org_context\` | Your organizational context | "B2B SaaS, 150K MAU, 5-person product team, separate backend and frontend teams..." |

**What to include in org_context:**
- Company type (B2B, B2C, marketplace, etc.)
- Team structure (who reports to whom)
- Known dynamics ("VP Engineering and VP Product disagree on WebSocket approach")
- External commitments ("Sales committed notifications to Acme Corp by March")
- Resource constraints ("QA team is shared across 3 product teams")

**Output includes:**
1. **Stakeholder list** with roles, interests, and influence level
2. **RACI matrix** for key rollout decisions
3. **Conflict flags** — where interests clash
4. **Communication plan** — who needs what information, when, via what channel

**Pro tip:** The more organizational context you provide, the better the conflict detection. "VP Product and Engineering Lead disagree on WebSocket approach" produces much better results than just listing their names.`,
      teacherNotes: "Emphasize that org_context is where the magic happens. Generic stakeholder lists produce generic results. Specific organizational dynamics produce actionable conflict detection.",
    },
    {
      id: "communication-planning",
      title: "Communication Planning",
      content: `# Communication Planning

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
1. **Start early with engineering** — they need to raise blockers before they become crises
2. **Give Support enough lead time** — 2 weeks minimum for training and FAQ preparation
3. **Don't surprise Sales** — they talk to customers daily. Surprises create awkward conversations
4. **Differentiate beta vs GA communication** — beta users expect rough edges; GA users don't
5. **Leadership wants outcomes, not details** — status updates should focus on "are we on track?" not "what SQL queries we optimized"`,
      teacherNotes: "Walk through the communication matrix row by row. The student should be able to customize this for their own organization.",
      checkQuestion: "Which stakeholder group is most often left out of launch communication plans? And what's the consequence?",
    },
    {
      id: "stakeholder-best-practices",
      title: "Stakeholder Mapping Best Practices",
      content: `# Stakeholder Mapping Best Practices

**Do:**
- Map stakeholders BEFORE the kickoff meeting — don't discover them during the launch
- Include second-order stakeholders (people affected but not directly involved)
- Be specific in org_context — names, dynamics, and history produce better results
- Update the stakeholder map when scope changes — new scope may involve new stakeholders
- Share the RACI with the team — alignment happens when everyone sees the same matrix

**Don't:**
- Don't assume stakeholders agree just because they haven't objected — silence ≠ alignment
- Don't skip the conflict detection step — undetected conflicts always surface at the worst time
- Don't send the same update to every stakeholder — customize by audience
- Don't forget external stakeholders — customers, partners, regulators may need communication

**Red flags to watch for:**
- A stakeholder who hasn't responded to two communication attempts
- Two stakeholders who both think they make the final call
- A stakeholder whose requirements conflict with the current scope
- An important stakeholder who wasn't in the original map

**Next up:** Now that you know who's involved and where they'll clash, let's build a timeline that accounts for all of it.`,
      teacherNotes: "End with the connection to timelines — stakeholder mapping feeds directly into timeline generation because it reveals dependencies and approval gates.",
    },
  ],
  exercise: {
    title: "Map Stakeholders for a Launch",
    description:
      "Use the map_stakeholders tool to generate a stakeholder map for a real or hypothetical launch.",
    steps: [
      "Choose a feature launch (real or hypothetical)",
      "Write a detailed org_context paragraph (include team structure, dynamics, constraints)",
      "Use the map_stakeholders tool with your feature name and org context",
      "Review the RACI matrix — does every key task have exactly one Accountable person?",
      "Review the conflict flags — are any of these conflicts you've already seen?",
      "Customize the communication plan for your organization's actual channels",
    ],
    validation:
      "You should have a stakeholder map with at least 5 stakeholders, a RACI matrix for key decisions, at least 1 conflict flag, and a communication plan. If the conflict detection seems generic, try adding more specific org context.",
  },
  quiz: {
    questions: [
      {
        question: "In the RACI framework, how many people should be Accountable for each task?",
        options: [
          "As many as needed",
          "Exactly one",
          "At least two for backup",
          "The whole team should be accountable",
        ],
        correctIndex: 1,
        explanation:
          "Every task has exactly ONE Accountable person. If everyone is Accountable, nobody is Accountable. This person is the single point of responsibility who signs off on the outcome.",
      },
      {
        question: "What's the most important input to the map_stakeholders tool?",
        options: [
          "The feature name",
          "The number of users",
          "The org_context with specific team dynamics and constraints",
          "The launch date",
        ],
        correctIndex: 2,
        explanation:
          "The org_context is where the magic happens. Generic stakeholder lists produce generic results. Specific organizational dynamics — who disagrees with whom, what external commitments exist, where resources are shared — produce actionable conflict detection.",
      },
      {
        question: "Why is it important to detect stakeholder conflicts BEFORE the launch?",
        options: [
          "It makes the stakeholder map look more thorough",
          "Conflicts that surface during the launch cause delays, misalignment, and war rooms",
          "Leadership wants to see conflict analysis",
          "It's a required step in the tool",
        ],
        correctIndex: 1,
        explanation:
          "Undetected conflicts always surface at the worst possible time. A scope conflict discovered during sprint 1 is a conversation. The same conflict discovered during launch week is a crisis. Surfacing conflicts early gives everyone time to resolve them.",
      },
    ],
  },
};

export default lesson;
