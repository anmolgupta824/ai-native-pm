#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── Rollout Plan Templates ──────────────────────────────────────

interface RolloutPhase {
  name: string;
  description: string;
  duration: string;
  tasks: string[];
  exitCriteria: string[];
}

interface RiskEntry {
  risk: string;
  likelihood: "low" | "medium" | "high";
  impact: "low" | "medium" | "high";
  mitigation: string;
  owner: string;
}

interface StakeholderEntry {
  name: string;
  role: string;
  interest: "low" | "medium" | "high";
  influence: "low" | "medium" | "high";
  rpiCategory: "responsible" | "accountable" | "consulted" | "informed";
  communicationFrequency: string;
}

// ── Risk Assessment Knowledge Base ──────────────────────────────

const RISK_CATEGORIES: Record<string, string[]> = {
  technical: [
    "Service outages or degraded performance during deployment",
    "Data migration errors or data loss",
    "Incompatibility with existing systems or APIs",
    "Performance regression under production load",
    "Security vulnerabilities introduced by new code",
    "Database schema changes causing downtime",
  ],
  operational: [
    "Insufficient team capacity for rollout support",
    "Inadequate monitoring or alerting for new features",
    "Missing or incomplete runbooks for incident response",
    "Third-party dependency failures during rollout",
    "Insufficient testing in staging environment",
  ],
  business: [
    "User adoption lower than expected",
    "Negative impact on key business metrics",
    "Customer support overwhelmed by change-related tickets",
    "Compliance or regulatory issues discovered post-launch",
    "Competitive response timing concerns",
  ],
  communication: [
    "Stakeholders not aware of changes or timeline",
    "Users confused by new functionality without proper onboarding",
    "Internal teams not trained on new features",
    "Missing or unclear documentation",
  ],
};

// ── Rollout Plan Generation ─────────────────────────────────────

function generateRolloutPlan(
  featureName: string,
  description: string,
  teamSize: number,
  timelineWeeks: number,
  riskTolerance: string
): string {
  const now = new Date().toISOString().split("T")[0];

  // Determine phases based on risk tolerance
  const phases: RolloutPhase[] = [];

  if (riskTolerance === "low" || riskTolerance === "medium") {
    phases.push({
      name: "Internal Testing",
      description: "Deploy to internal team members and dogfood the feature",
      duration: riskTolerance === "low" ? "1 week" : "3 days",
      tasks: [
        "Deploy to staging environment",
        "Internal team testing with real workflows",
        "Gather feedback from internal users",
        "Fix critical issues found during testing",
        "Update documentation based on feedback",
      ],
      exitCriteria: [
        "No P0 or P1 bugs remaining",
        "Internal team sign-off obtained",
        "Monitoring and alerting verified",
        "Rollback procedure tested",
      ],
    });
  }

  phases.push({
    name: "Canary Release",
    description: `Roll out to ${riskTolerance === "low" ? "1%" : riskTolerance === "medium" ? "5%" : "10%"} of users`,
    duration: riskTolerance === "low" ? "1 week" : "3 days",
    tasks: [
      `Enable feature flag for ${riskTolerance === "low" ? "1%" : riskTolerance === "medium" ? "5%" : "10%"} of users`,
      "Monitor error rates, latency, and key metrics",
      "Watch for user-reported issues",
      "Compare metrics against baseline",
      "Review support ticket volume",
    ],
    exitCriteria: [
      "Error rate within acceptable threshold (<0.1% increase)",
      "No significant latency regression",
      "Key metrics stable or improving",
      "No critical user-reported issues",
    ],
  });

  phases.push({
    name: "Gradual Rollout",
    description: "Incrementally increase rollout percentage",
    duration: `${Math.max(1, Math.floor(timelineWeeks / 3))} week(s)`,
    tasks: [
      riskTolerance === "high"
        ? "Increase to 25% → 50% → 100%"
        : "Increase to 10% → 25% → 50% → 75% → 100%",
      "Monitor metrics at each increment",
      "Pause and investigate any anomalies",
      "Update stakeholders at each milestone",
      "Continue gathering user feedback",
    ],
    exitCriteria: [
      "All rollout percentages completed without issues",
      "Metrics meet or exceed success criteria",
      "Support team reports manageable ticket volume",
    ],
  });

  phases.push({
    name: "Full Launch",
    description: "Feature available to all users, cleanup and retrospective",
    duration: "1 week",
    tasks: [
      "Remove feature flag (if applicable)",
      "Send launch announcement to users",
      "Update public documentation and help center",
      "Brief customer support team on FAQ",
      "Schedule post-launch retrospective",
    ],
    exitCriteria: [
      "Feature flag removed or set to 100%",
      "Documentation published",
      "Retrospective completed",
      "Success metrics confirmed",
    ],
  });

  // Build the markdown document
  let plan = `# Rollout Plan: ${featureName}\n\n`;
  plan += `**Created:** ${now}\n`;
  plan += `**Status:** Draft\n`;
  plan += `**Team Size:** ${teamSize} people\n`;
  plan += `**Timeline:** ${timelineWeeks} weeks\n`;
  plan += `**Risk Tolerance:** ${riskTolerance}\n\n`;
  plan += `---\n\n`;

  plan += `## Overview\n\n${description}\n\n`;

  plan += `## Rollout Strategy\n\n`;
  plan += `This rollout follows a **${riskTolerance === "low" ? "conservative" : riskTolerance === "medium" ? "standard" : "aggressive"}** approach with ${phases.length} phases.\n\n`;

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    plan += `### Phase ${i + 1}: ${phase.name}\n\n`;
    plan += `> ${phase.description}\n\n`;
    plan += `**Duration:** ${phase.duration}\n\n`;
    plan += `**Tasks:**\n`;
    for (const task of phase.tasks) {
      plan += `- [ ] ${task}\n`;
    }
    plan += `\n**Exit Criteria:**\n`;
    for (const criterion of phase.exitCriteria) {
      plan += `- [ ] ${criterion}\n`;
    }
    plan += `\n`;
  }

  plan += `## Success Metrics\n\n`;
  plan += `| Metric | Baseline | Target | Measurement Method |\n`;
  plan += `|--------|----------|--------|-------------------|\n`;
  plan += `| Error rate | [current] | <0.1% increase | Monitoring dashboard |\n`;
  plan += `| Latency (p95) | [current] | <10% increase | APM tool |\n`;
  plan += `| User adoption | 0% | [target]% | Feature analytics |\n`;
  plan += `| Support tickets | [current/week] | <20% increase | Support dashboard |\n\n`;

  plan += `## Communication Plan\n\n`;
  plan += `| When | Who | What | Channel |\n`;
  plan += `|------|-----|------|--------|\n`;
  plan += `| Before launch | Engineering | Technical review complete | Slack / meeting |\n`;
  plan += `| Canary start | Stakeholders | Rollout beginning | Email |\n`;
  plan += `| Each phase | Team leads | Progress update | Slack |\n`;
  plan += `| Full launch | All users | Feature announcement | Email / in-app |\n`;
  plan += `| Post-launch | Team | Retrospective | Meeting |\n\n`;

  plan += `## Rollback Triggers\n\n`;
  plan += `Immediately halt and rollback if:\n`;
  plan += `- Error rate increases by more than 0.5%\n`;
  plan += `- P95 latency increases by more than 50%\n`;
  plan += `- Any data corruption or loss detected\n`;
  plan += `- Critical security vulnerability discovered\n`;
  plan += `- Key business metric drops by more than 10%\n`;

  return plan;
}

// ── Risk Assessment ─────────────────────────────────────────────

function assessRisks(
  featureDescription: string,
  componentsAffected: string[],
  userBaseSize: string
): { risks: RiskEntry[]; summary: string } {
  const desc = featureDescription.toLowerCase();
  const risks: RiskEntry[] = [];

  // Technical risks based on components
  if (componentsAffected.some((c) => /database|db|data/i.test(c))) {
    risks.push({
      risk: "Data migration errors or schema changes causing downtime",
      likelihood: "medium",
      impact: "high",
      mitigation:
        "Run migration in staging first, prepare rollback script, schedule maintenance window",
      owner: "[Engineering Lead]",
    });
  }

  if (componentsAffected.some((c) => /api|endpoint|service/i.test(c))) {
    risks.push({
      risk: "API breaking changes affecting downstream consumers",
      likelihood: "medium",
      impact: "high",
      mitigation:
        "Version the API, maintain backward compatibility, notify consumers in advance",
      owner: "[API Owner]",
    });
  }

  if (componentsAffected.some((c) => /auth|login|security/i.test(c))) {
    risks.push({
      risk: "Authentication or authorization regression locking users out",
      likelihood: "low",
      impact: "high",
      mitigation:
        "Comprehensive auth testing, staged rollout with quick rollback, emergency bypass procedure",
      owner: "[Security Lead]",
    });
  }

  if (componentsAffected.some((c) => /ui|frontend|page/i.test(c))) {
    risks.push({
      risk: "UI regression or visual bugs across browsers/devices",
      likelihood: "medium",
      impact: "medium",
      mitigation:
        "Cross-browser testing, visual regression tests, feature flag for easy disable",
      owner: "[Frontend Lead]",
    });
  }

  // Business risks based on user base
  const isLargeUserBase =
    /million|100k|large|enterprise/i.test(userBaseSize);
  if (isLargeUserBase) {
    risks.push({
      risk: "High-volume user complaints overwhelming support",
      likelihood: "medium",
      impact: "high",
      mitigation:
        "Prepare FAQ, brief support team, use gradual rollout to limit blast radius",
      owner: "[Support Lead]",
    });
  }

  // General risks that always apply
  risks.push({
    risk: "Performance degradation under production load",
    likelihood: desc.includes("performance") ? "low" : "medium",
    impact: "high",
    mitigation:
      "Load testing in staging, monitoring dashboards, auto-scaling policies",
    owner: "[Engineering Lead]",
  });

  risks.push({
    risk: "Feature adoption lower than expected",
    likelihood: "medium",
    impact: "medium",
    mitigation:
      "In-app onboarding, user communication plan, track adoption metrics from day 1",
    owner: "[Product Manager]",
  });

  risks.push({
    risk: "Incomplete rollback procedure",
    likelihood: "low",
    impact: "high",
    mitigation:
      "Document and test rollback procedure before launch, practice in staging",
    owner: "[Engineering Lead]",
  });

  // Risk matrix summary
  const highRisks = risks.filter(
    (r) => r.impact === "high" && r.likelihood !== "low"
  );
  const summary =
    highRisks.length > 2
      ? "HIGH RISK: Multiple high-impact risks identified. Consider a more conservative rollout approach."
      : highRisks.length > 0
        ? "MODERATE RISK: Some significant risks identified. Ensure mitigations are in place before proceeding."
        : "LOW RISK: No critical risks identified. Standard rollout approach should be sufficient.";

  return { risks, summary };
}

// ── Stakeholder Mapping ─────────────────────────────────────────

function mapStakeholders(
  featureName: string,
  orgContext: string
): {
  stakeholders: StakeholderEntry[];
  raciMatrix: string;
  communicationPlan: string;
} {
  const ctx = orgContext.toLowerCase();

  const stakeholders: StakeholderEntry[] = [
    {
      name: "[Product Manager]",
      role: "Feature owner, drives requirements and priorities",
      interest: "high",
      influence: "high",
      rpiCategory: "accountable",
      communicationFrequency: "Daily during rollout",
    },
    {
      name: "[Engineering Lead]",
      role: "Technical implementation, deployment, and monitoring",
      interest: "high",
      influence: "high",
      rpiCategory: "responsible",
      communicationFrequency: "Daily during rollout",
    },
  ];

  if (ctx.includes("design") || ctx.includes("ux")) {
    stakeholders.push({
      name: "[Design Lead]",
      role: "UX review, design QA, user research",
      interest: "high",
      influence: "medium",
      rpiCategory: "consulted",
      communicationFrequency: "Weekly + at phase transitions",
    });
  }

  if (ctx.includes("qa") || ctx.includes("test")) {
    stakeholders.push({
      name: "[QA Lead]",
      role: "Test planning, regression testing, sign-off",
      interest: "high",
      influence: "medium",
      rpiCategory: "responsible",
      communicationFrequency: "Daily during testing phases",
    });
  }

  if (
    ctx.includes("support") ||
    ctx.includes("customer") ||
    ctx.includes("cs")
  ) {
    stakeholders.push({
      name: "[Support Lead]",
      role: "Customer communication, FAQ preparation, ticket triage",
      interest: "medium",
      influence: "medium",
      rpiCategory: "informed",
      communicationFrequency: "Weekly + before public launch",
    });
  }

  if (
    ctx.includes("exec") ||
    ctx.includes("vp") ||
    ctx.includes("director") ||
    ctx.includes("c-suite")
  ) {
    stakeholders.push({
      name: "[Executive Sponsor]",
      role: "Strategic alignment, resource allocation, escalation path",
      interest: "medium",
      influence: "high",
      rpiCategory: "informed",
      communicationFrequency: "At phase transitions + weekly summary",
    });
  }

  if (ctx.includes("marketing") || ctx.includes("growth")) {
    stakeholders.push({
      name: "[Marketing Lead]",
      role: "Launch messaging, user communication, adoption campaigns",
      interest: "medium",
      influence: "medium",
      rpiCategory: "consulted",
      communicationFrequency: "Weekly + before public launch",
    });
  }

  if (
    ctx.includes("data") ||
    ctx.includes("analytics") ||
    ctx.includes("metric")
  ) {
    stakeholders.push({
      name: "[Data/Analytics Lead]",
      role: "Metrics setup, dashboard creation, impact measurement",
      interest: "medium",
      influence: "low",
      rpiCategory: "consulted",
      communicationFrequency: "At setup + weekly during rollout",
    });
  }

  // Always add ops/infra
  stakeholders.push({
    name: "[DevOps/Infra]",
    role: "Deployment pipeline, monitoring, alerting, scaling",
    interest: "medium",
    influence: "medium",
    rpiCategory: "responsible",
    communicationFrequency: "At deployment phases",
  });

  // Build RACI matrix markdown
  let raciMatrix = `## RACI Matrix: ${featureName}\n\n`;
  raciMatrix += `| Activity | ${stakeholders.map((s) => s.name).join(" | ")} |\n`;
  raciMatrix += `|----------|${stakeholders.map(() => "---").join("|")}|\n`;

  const activities = [
    "Requirements sign-off",
    "Technical design",
    "Implementation",
    "Testing",
    "Deployment",
    "Monitoring",
    "User communication",
    "Rollback decision",
  ];

  for (const activity of activities) {
    const cells = stakeholders.map((s) => {
      if (activity.includes("Requirements"))
        return s.rpiCategory === "accountable" ? "A" : s.rpiCategory === "responsible" ? "R" : s.rpiCategory === "consulted" ? "C" : "I";
      if (activity.includes("Implementation"))
        return s.role.includes("Engineering") ? "R" : s.rpiCategory === "accountable" ? "A" : "I";
      if (activity.includes("Testing"))
        return s.role.includes("QA") ? "R" : s.role.includes("Engineering") ? "C" : "I";
      if (activity.includes("Deployment"))
        return s.role.includes("DevOps") || s.role.includes("Engineering") ? "R" : s.rpiCategory === "accountable" ? "A" : "I";
      return s.rpiCategory === "accountable" ? "A" : s.rpiCategory === "responsible" ? "R" : s.rpiCategory === "consulted" ? "C" : "I";
    });
    raciMatrix += `| ${activity} | ${cells.join(" | ")} |\n`;
  }

  // Build communication plan
  let communicationPlan = `## Communication Plan\n\n`;
  for (const s of stakeholders) {
    communicationPlan += `### ${s.name} (${s.role.split(",")[0]})\n`;
    communicationPlan += `- **Frequency:** ${s.communicationFrequency}\n`;
    communicationPlan += `- **Channel:** ${s.influence === "high" ? "Direct meeting/Slack DM" : "Email/Slack channel"}\n`;
    communicationPlan += `- **Content:** ${s.rpiCategory === "accountable" ? "Full progress, blockers, decisions needed" : s.rpiCategory === "responsible" ? "Technical updates, blockers, timeline" : s.rpiCategory === "consulted" ? "Design decisions, feedback requests" : "High-level status, milestones"}\n\n`;
  }

  return { stakeholders, raciMatrix, communicationPlan };
}

// ── Timeline Generation ─────────────────────────────────────────

function generateTimeline(
  phases: string[],
  dependencies: string[],
  teamSize: number,
  startDate: string
): string {
  const start = new Date(startDate);

  let timeline = `## Rollout Timeline\n\n`;
  timeline += `**Start Date:** ${startDate}\n`;
  timeline += `**Team Size:** ${teamSize}\n\n`;

  // Estimate duration per phase based on team size
  const durationMultiplier = teamSize <= 3 ? 1.5 : teamSize <= 6 ? 1 : 0.75;

  const phaseData: Array<{
    name: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    milestone: string;
  }> = [];

  let currentDate = new Date(start);

  for (const phase of phases) {
    // Estimate base days per phase type
    let baseDays: number;
    const p = phase.toLowerCase();
    if (p.includes("plan") || p.includes("design") || p.includes("prep")) {
      baseDays = 5;
    } else if (
      p.includes("develop") ||
      p.includes("build") ||
      p.includes("implement")
    ) {
      baseDays = 10;
    } else if (p.includes("test") || p.includes("qa") || p.includes("staging")) {
      baseDays = 5;
    } else if (
      p.includes("canary") ||
      p.includes("pilot") ||
      p.includes("beta")
    ) {
      baseDays = 7;
    } else if (p.includes("rollout") || p.includes("deploy") || p.includes("launch")) {
      baseDays = 5;
    } else if (p.includes("monitor") || p.includes("stabilize")) {
      baseDays = 7;
    } else {
      baseDays = 5;
    }

    const adjustedDays = Math.ceil(baseDays * durationMultiplier);
    const endDate = new Date(currentDate);
    endDate.setDate(endDate.getDate() + adjustedDays);

    phaseData.push({
      name: phase,
      startDate: new Date(currentDate),
      endDate: new Date(endDate),
      duration: adjustedDays,
      milestone: `${phase} complete`,
    });

    currentDate = new Date(endDate);
    currentDate.setDate(currentDate.getDate() + 1); // 1-day gap between phases
  }

  const totalEnd = phaseData[phaseData.length - 1]?.endDate;
  const totalDays = totalEnd
    ? Math.ceil(
        (totalEnd.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  timeline += `**Estimated End Date:** ${totalEnd?.toISOString().split("T")[0] || "TBD"}\n`;
  timeline += `**Total Duration:** ${totalDays} days (~${Math.ceil(totalDays / 7)} weeks)\n\n`;

  // Gantt-style table
  timeline += `| Phase | Start | End | Duration | Milestone |\n`;
  timeline += `|-------|-------|-----|----------|----------|\n`;

  for (const p of phaseData) {
    timeline += `| ${p.name} | ${p.startDate.toISOString().split("T")[0]} | ${p.endDate.toISOString().split("T")[0]} | ${p.duration} days | ${p.milestone} |\n`;
  }

  timeline += `\n`;

  // Dependencies
  if (dependencies.length > 0) {
    timeline += `## Dependencies\n\n`;
    for (const dep of dependencies) {
      timeline += `- [ ] ${dep}\n`;
    }
    timeline += `\n`;
  }

  // Milestones
  timeline += `## Key Milestones\n\n`;
  for (const p of phaseData) {
    timeline += `- **${p.endDate.toISOString().split("T")[0]}** — ${p.milestone}\n`;
  }

  return timeline;
}

// ── Rollback Plan Builder ───────────────────────────────────────

function buildRollbackPlan(
  featureName: string,
  components: string[],
  deploymentType: string
): string {
  let plan = `# Rollback Plan: ${featureName}\n\n`;
  plan += `**Created:** ${new Date().toISOString().split("T")[0]}\n`;
  plan += `**Deployment Type:** ${deploymentType}\n`;
  plan += `**Components:** ${components.join(", ")}\n\n`;

  plan += `---\n\n`;

  // Rollback triggers
  plan += `## Rollback Triggers\n\n`;
  plan += `Initiate rollback immediately if ANY of these conditions are met:\n\n`;
  plan += `| Trigger | Threshold | Monitoring Source |\n`;
  plan += `|---------|-----------|------------------|\n`;
  plan += `| Error rate spike | >0.5% increase over baseline | Error tracking (Sentry, Datadog) |\n`;
  plan += `| Latency regression | >50% increase in p95 | APM dashboard |\n`;
  plan += `| Data corruption | Any instance detected | Data integrity checks |\n`;
  plan += `| Security incident | Any severity | Security alerts |\n`;
  plan += `| Revenue impact | >5% drop in conversion | Business metrics |\n`;
  plan += `| User complaints | >10x normal rate | Support dashboard |\n\n`;

  // Rollback procedure based on deployment type
  plan += `## Rollback Procedure\n\n`;

  const dtype = deploymentType.toLowerCase();

  if (dtype.includes("feature flag") || dtype.includes("flag")) {
    plan += `### Feature Flag Rollback (Fastest — ~1 minute)\n\n`;
    plan += `1. **Disable the feature flag** in your feature flag service\n`;
    plan += `   - [ ] Navigate to feature flag dashboard\n`;
    plan += `   - [ ] Set "${featureName}" flag to OFF / 0%\n`;
    plan += `   - [ ] Verify flag change propagated (check 2-3 instances)\n`;
    plan += `2. **Verify rollback** — confirm the feature is no longer active\n`;
    plan += `   - [ ] Check application logs for feature flag state\n`;
    plan += `   - [ ] Verify user-facing behavior reverted\n`;
    plan += `   - [ ] Monitor error rates returning to baseline\n`;
    plan += `3. **Notify stakeholders** — send rollback notification\n`;
    plan += `   - [ ] Post in incident Slack channel\n`;
    plan += `   - [ ] Notify on-call engineer\n`;
    plan += `   - [ ] Update status page if user-facing\n\n`;
  }

  if (dtype.includes("blue") || dtype.includes("green")) {
    plan += `### Blue-Green Rollback (~5 minutes)\n\n`;
    plan += `1. **Switch traffic** back to the previous (blue) environment\n`;
    plan += `   - [ ] Update load balancer / DNS to point to blue environment\n`;
    plan += `   - [ ] Verify traffic is routing to blue\n`;
    plan += `2. **Drain connections** on the green (new) environment\n`;
    plan += `   - [ ] Wait for in-flight requests to complete\n`;
    plan += `   - [ ] Monitor for stuck connections\n`;
    plan += `3. **Verify rollback** — confirm service is healthy on blue\n`;
    plan += `   - [ ] Health check endpoints responding\n`;
    plan += `   - [ ] Error rates returning to baseline\n\n`;
  }

  if (
    dtype.includes("rolling") ||
    dtype.includes("deploy") ||
    (!dtype.includes("flag") && !dtype.includes("blue"))
  ) {
    plan += `### Deployment Rollback (~15-30 minutes)\n\n`;
    plan += `1. **Revert to previous version**\n`;
    plan += `   - [ ] Identify the last known good version/commit\n`;
    plan += `   - [ ] Trigger deployment of the previous version\n`;
    plan += `   - [ ] Wait for all instances to update\n`;
    plan += `2. **Database rollback** (if schema changes were made)\n`;
    plan += `   - [ ] Run the reverse migration script\n`;
    plan += `   - [ ] Verify data integrity after migration rollback\n`;
    plan += `   - [ ] Check for data written during the deployment window\n`;
    plan += `3. **Verify rollback**\n`;
    plan += `   - [ ] All instances running previous version\n`;
    plan += `   - [ ] Health checks passing\n`;
    plan += `   - [ ] Error rates returning to baseline\n\n`;
  }

  // Component-specific rollback steps
  plan += `## Component-Specific Steps\n\n`;
  for (const component of components) {
    plan += `### ${component}\n`;
    plan += `- [ ] Verify ${component} reverted to previous state\n`;
    plan += `- [ ] Check ${component} health/connectivity\n`;
    plan += `- [ ] Confirm no data inconsistencies in ${component}\n\n`;
  }

  // Post-rollback
  plan += `## Post-Rollback Actions\n\n`;
  plan += `1. **Incident report** — Document what happened\n`;
  plan += `   - [ ] Timeline of events\n`;
  plan += `   - [ ] Root cause (or initial hypothesis)\n`;
  plan += `   - [ ] Impact assessment\n`;
  plan += `2. **Communication**\n`;
  plan += `   - [ ] Notify all stakeholders of rollback\n`;
  plan += `   - [ ] Update status page / user communication if needed\n`;
  plan += `   - [ ] Schedule post-mortem\n`;
  plan += `3. **Fix forward plan**\n`;
  plan += `   - [ ] Identify the fix for the issue that caused rollback\n`;
  plan += `   - [ ] Update test suite to catch this scenario\n`;
  plan += `   - [ ] Plan re-deployment with additional safeguards\n`;

  return plan;
}

// ── MCP Server ──────────────────────────────────────────────────

const server = new Server(
  {
    name: "rollout-plan-generator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ── Tools ───────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_rollout_plan",
      description:
        "Generate a complete rollout plan with phased deployment, exit criteria, success metrics, and communication plan. Adapts to your risk tolerance (conservative, standard, or aggressive).",
      inputSchema: {
        type: "object" as const,
        properties: {
          feature_name: {
            type: "string",
            description: "Name of the feature being rolled out",
          },
          description: {
            type: "string",
            description:
              "Brief description of what the feature does and why it matters",
          },
          team_size: {
            type: "number",
            description: "Number of people on the team executing the rollout",
          },
          timeline_weeks: {
            type: "number",
            description: "Target timeline in weeks for the full rollout",
          },
          risk_tolerance: {
            type: "string",
            enum: ["low", "medium", "high"],
            description:
              "Risk tolerance level: 'low' (most conservative, more phases), 'medium' (standard), 'high' (faster, fewer phases)",
          },
        },
        required: [
          "feature_name",
          "description",
          "team_size",
          "timeline_weeks",
          "risk_tolerance",
        ],
      },
    },
    {
      name: "assess_risks",
      description:
        "Assess risks for a feature rollout. Analyzes technical, operational, business, and communication risks based on the components affected and user base size. Returns a risk matrix with likelihood, impact, and mitigation strategies.",
      inputSchema: {
        type: "object" as const,
        properties: {
          feature_description: {
            type: "string",
            description: "Description of the feature and what it changes",
          },
          components_affected: {
            type: "array",
            items: { type: "string" },
            description:
              "List of system components affected (e.g., 'database', 'API', 'frontend', 'auth', 'payments')",
          },
          user_base_size: {
            type: "string",
            description:
              "Description of user base size (e.g., '50k users', '2 million MAU', 'enterprise clients')",
          },
        },
        required: [
          "feature_description",
          "components_affected",
          "user_base_size",
        ],
      },
    },
    {
      name: "map_stakeholders",
      description:
        "Create a stakeholder map with RACI matrix and communication plan. Identifies relevant stakeholders based on your organization context and assigns responsibilities.",
      inputSchema: {
        type: "object" as const,
        properties: {
          feature_name: {
            type: "string",
            description: "Name of the feature being rolled out",
          },
          org_context: {
            type: "string",
            description:
              "Describe your organization context: what teams exist, who's involved. Example: 'We have engineering, design, QA, support, and executive stakeholders. The VP of Product is the sponsor.'",
          },
        },
        required: ["feature_name", "org_context"],
      },
    },
    {
      name: "generate_timeline",
      description:
        "Generate a detailed timeline with milestones for a rollout. Estimates durations based on phase type and team size. Returns a Gantt-style table.",
      inputSchema: {
        type: "object" as const,
        properties: {
          phases: {
            type: "array",
            items: { type: "string" },
            description:
              "List of rollout phases in order (e.g., ['Planning', 'Development', 'Staging QA', 'Canary Release', 'Gradual Rollout', 'Full Launch'])",
          },
          dependencies: {
            type: "array",
            items: { type: "string" },
            description:
              "List of external dependencies (e.g., ['API v2 migration complete', 'Design review approved'])",
          },
          team_size: {
            type: "number",
            description: "Number of people on the team",
          },
          start_date: {
            type: "string",
            description: "Start date in YYYY-MM-DD format",
          },
        },
        required: ["phases", "dependencies", "team_size", "start_date"],
      },
    },
    {
      name: "build_rollback_plan",
      description:
        "Build a detailed rollback plan with triggers, step-by-step procedures, and post-rollback actions. Adapts to your deployment type (feature flag, blue-green, rolling deployment).",
      inputSchema: {
        type: "object" as const,
        properties: {
          feature_name: {
            type: "string",
            description: "Name of the feature",
          },
          components: {
            type: "array",
            items: { type: "string" },
            description:
              "List of components that would need to be rolled back (e.g., ['API service', 'Database migration', 'Frontend bundle'])",
          },
          deployment_type: {
            type: "string",
            description:
              "How the feature is deployed: 'feature-flag', 'blue-green', 'rolling-deployment', or describe your setup",
          },
        },
        required: ["feature_name", "components", "deployment_type"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "create_rollout_plan": {
      const plan = generateRolloutPlan(
        args?.feature_name as string,
        args?.description as string,
        args?.team_size as number,
        args?.timeline_weeks as number,
        args?.risk_tolerance as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Rollout plan generated. Present each phase clearly and ask the user to customize the success metrics and communication plan for their specific situation.",
                plan,
                nextSteps: [
                  "Review and customize success metrics with your team",
                  "Use assess_risks to identify risks for this rollout",
                  "Use map_stakeholders to identify who needs to be involved",
                  "Use build_rollback_plan to prepare your safety net",
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "assess_risks": {
      const { risks, summary } = assessRisks(
        args?.feature_description as string,
        args?.components_affected as string[],
        args?.user_base_size as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Risk assessment complete. Present the risk matrix clearly, starting with the highest-impact risks.",
                summary,
                riskCount: risks.length,
                risks,
                riskCategories: Object.keys(RISK_CATEGORIES),
                tip: "Ask the user to fill in the [Owner] placeholders with real team members.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "map_stakeholders": {
      const { stakeholders, raciMatrix, communicationPlan } = mapStakeholders(
        args?.feature_name as string,
        args?.org_context as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Stakeholder map generated. Present the RACI matrix and communication plan. Ask the user to replace placeholder names with real people.",
                stakeholderCount: stakeholders.length,
                stakeholders,
                raciMatrix,
                communicationPlan,
                tip: "Replace [placeholder names] with real team members from your organization.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "generate_timeline": {
      const timeline = generateTimeline(
        args?.phases as string[],
        args?.dependencies as string[],
        args?.team_size as number,
        args?.start_date as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Timeline generated with estimated durations per phase. Durations are adjusted based on team size. Ask the user to verify estimates.",
                timeline,
                note: "These are estimates based on typical phase durations. Adjust based on your team's velocity and the specific complexity of each phase.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "build_rollback_plan": {
      const plan = buildRollbackPlan(
        args?.feature_name as string,
        args?.components as string[],
        args?.deployment_type as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Rollback plan generated. This is your safety net. Present the triggers and procedures clearly. Remind the user to test the rollback procedure before launch.",
                plan,
                criticalReminder:
                  "Test this rollback procedure in staging BEFORE your production rollout. An untested rollback plan is not a plan.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      return {
        content: [
          { type: "text" as const, text: `Unknown tool: ${name}` },
        ],
        isError: true,
      };
  }
});

// ── Start server ────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Rollout Plan Generator MCP server running on stdio");
}

main().catch(console.error);
