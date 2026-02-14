#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── PRD Templates ──────────────────────────────────────────────

const PRD_TEMPLATES: Record<string, PRDTemplate> = {
  "feature-launch": {
    name: "Feature Launch",
    description: "New feature being added to an existing product",
    sections: [
      "Overview",
      "Problem Statement",
      "Goals & Success Metrics",
      "User Stories",
      "Requirements (Functional)",
      "Requirements (Non-Functional)",
      "Design Considerations",
      "Technical Approach",
      "Edge Cases & Error Handling",
      "Launch Plan",
      "Risks & Mitigations",
      "Open Questions",
    ],
    questions: [
      "What is the feature you're building? (1-2 sentence summary)",
      "What problem does this solve for users? What's the pain point?",
      "Who are the target users? (role, segment, persona)",
      "How will you measure success? (list 2-3 key metrics)",
      "What are the must-have requirements vs nice-to-haves?",
      "Are there any technical constraints or dependencies?",
      "What's the target launch date or timeline?",
      "Who are the key stakeholders that need to sign off?",
      "What's the rollout strategy? (big bang, phased, feature flag)",
      "What could go wrong? List 2-3 risks.",
    ],
  },
  "api-integration": {
    name: "API Integration",
    description: "Integrating with a third-party API or building a new API",
    sections: [
      "Overview",
      "Integration Goals",
      "API Specification",
      "Authentication & Security",
      "Data Flow",
      "Error Handling",
      "Rate Limits & Performance",
      "Testing Strategy",
      "Monitoring & Alerting",
      "Rollback Plan",
      "Documentation Requirements",
      "Open Questions",
    ],
    questions: [
      "What API or service are you integrating with?",
      "What's the business goal of this integration?",
      "What data flows between your system and the API?",
      "What authentication method will you use? (OAuth, API key, etc.)",
      "What are the expected request volumes / rate limits?",
      "How should the system handle API failures or timeouts?",
      "What are the security and compliance requirements?",
      "Who owns the integration long-term? (team/person)",
      "What monitoring do you need? (uptime, latency, error rates)",
      "What's the rollback plan if the integration fails in production?",
    ],
  },
  redesign: {
    name: "Product Redesign",
    description: "Redesigning an existing feature or product experience",
    sections: [
      "Overview",
      "Current State Analysis",
      "Problems with Current Design",
      "Redesign Goals",
      "User Research Findings",
      "Proposed Changes",
      "Migration Plan",
      "Success Metrics",
      "Risks & Mitigations",
      "Timeline",
      "Stakeholder Communication",
      "Open Questions",
    ],
    questions: [
      "What are you redesigning? (feature, page, flow, entire product)",
      "Why does the current design need to change? What's broken?",
      "Do you have user research or data supporting the redesign?",
      "What are the goals of the redesign? (metrics to improve)",
      "What constraints exist? (brand guidelines, tech debt, etc.)",
      "How will you handle existing users during the transition?",
      "Will this be a gradual migration or a hard cutover?",
      "What's the success criteria? When do you know the redesign worked?",
      "Who needs to approve the new design?",
      "What's the biggest risk with this redesign?",
    ],
  },
};

interface PRDTemplate {
  name: string;
  description: string;
  sections: string[];
  questions: string[];
}

interface PRDAnswers {
  template: string;
  productName: string;
  answers: Record<string, string>;
}

// ── Validation ─────────────────────────────────────────────────

interface ValidationResult {
  isComplete: boolean;
  score: number;
  missing: string[];
  suggestions: string[];
}

function validatePRD(prdContent: string): ValidationResult {
  const checks = [
    { label: "Problem statement", pattern: /problem|pain point|challenge/i },
    { label: "Success metrics", pattern: /metric|kpi|measure|success/i },
    { label: "User stories", pattern: /as a|user|persona/i },
    { label: "Requirements", pattern: /must|shall|requirement|functional/i },
    { label: "Edge cases", pattern: /edge case|error|failure|fallback/i },
    { label: "Timeline", pattern: /timeline|deadline|milestone|launch date/i },
    { label: "Risks", pattern: /risk|mitigation|contingency/i },
    { label: "Stakeholders", pattern: /stakeholder|owner|responsible|sign.?off/i },
    { label: "Rollout plan", pattern: /rollout|deploy|release|launch plan/i },
    { label: "Open questions", pattern: /open question|tbd|to be determined/i },
  ];

  const missing: string[] = [];
  const suggestions: string[] = [];
  let found = 0;

  for (const check of checks) {
    if (check.pattern.test(prdContent)) {
      found++;
    } else {
      missing.push(check.label);
    }
  }

  const score = Math.round((found / checks.length) * 100);

  if (!prdContent.match(/metric|kpi|measure/i)) {
    suggestions.push(
      "Add specific, measurable success metrics (e.g., 'Reduce time-to-checkout by 20%')"
    );
  }
  if (!prdContent.match(/edge case|error|failure/i)) {
    suggestions.push(
      "Consider edge cases: What happens when the user has no data? When the API is down? When they're on mobile?"
    );
  }
  if (!prdContent.match(/risk|mitigation/i)) {
    suggestions.push(
      "Add a risks section: technical risks, user adoption risks, timeline risks"
    );
  }
  if (!prdContent.match(/rollback|revert/i)) {
    suggestions.push(
      "Include a rollback plan: How do you undo this if something goes wrong?"
    );
  }

  return {
    isComplete: score >= 80,
    score,
    missing,
    suggestions,
  };
}

// ── PRD Generation ─────────────────────────────────────────────

function generatePRD(data: PRDAnswers): string {
  const template = PRD_TEMPLATES[data.template];
  if (!template) {
    return "Error: Unknown template type";
  }

  const now = new Date().toISOString().split("T")[0];
  const answers = data.answers;
  const questionKeys = template.questions;

  let prd = `# PRD: ${data.productName}\n\n`;
  prd += `**Template:** ${template.name}\n`;
  prd += `**Created:** ${now}\n`;
  prd += `**Status:** Draft\n`;
  prd += `**Author:** [Your Name]\n\n`;
  prd += `---\n\n`;

  // Build sections based on template type
  for (let i = 0; i < template.sections.length; i++) {
    const section = template.sections[i];
    prd += `## ${section}\n\n`;

    // Map answers to sections intelligently
    const relevantAnswer = answers[questionKeys[i]] || "";
    if (relevantAnswer) {
      prd += `${relevantAnswer}\n\n`;
    } else {
      prd += `*[TODO: Fill in this section]*\n\n`;
    }
  }

  // Append checklist
  prd += `---\n\n`;
  prd += `## Pre-Ship Checklist\n\n`;
  prd += `- [ ] All requirements reviewed by engineering\n`;
  prd += `- [ ] Design mocks approved\n`;
  prd += `- [ ] Success metrics finalized with data team\n`;
  prd += `- [ ] Edge cases documented\n`;
  prd += `- [ ] Rollback plan tested\n`;
  prd += `- [ ] Stakeholder sign-off obtained\n`;
  prd += `- [ ] Launch date confirmed\n`;
  prd += `- [ ] Monitoring and alerting set up\n`;

  return prd;
}

// ── MCP Server ─────────────────────────────────────────────────

const server = new Server(
  {
    name: "prd-generator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
    },
  }
);

// ── Tools ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_templates",
      description:
        "List all available PRD templates with descriptions. Use this first to help the user choose the right template.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "get_questions",
      description:
        "Get the interactive questionnaire for a specific PRD template. Returns 10 essential questions the PM should answer.",
      inputSchema: {
        type: "object" as const,
        properties: {
          template: {
            type: "string",
            enum: Object.keys(PRD_TEMPLATES),
            description: "The PRD template type",
          },
        },
        required: ["template"],
      },
    },
    {
      name: "generate_prd",
      description:
        "Generate a complete PRD document from the user's answers. Pass the template type, product name, and a map of question→answer pairs.",
      inputSchema: {
        type: "object" as const,
        properties: {
          template: {
            type: "string",
            enum: Object.keys(PRD_TEMPLATES),
            description: "The PRD template type",
          },
          productName: {
            type: "string",
            description: "Name of the product or feature",
          },
          answers: {
            type: "object",
            description:
              "Map of question text to answer text. Use the exact question strings from get_questions.",
            additionalProperties: { type: "string" },
          },
        },
        required: ["template", "productName", "answers"],
      },
    },
    {
      name: "validate_prd",
      description:
        "Validate a PRD for completeness. Returns a score, missing sections, and improvement suggestions. Pass the full PRD text.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prdContent: {
            type: "string",
            description: "The full PRD content to validate",
          },
        },
        required: ["prdContent"],
      },
    },
    {
      name: "suggest_edge_cases",
      description:
        "Suggest edge cases and error scenarios based on the PRD type and product description. Helps PMs think about what could go wrong.",
      inputSchema: {
        type: "object" as const,
        properties: {
          template: {
            type: "string",
            enum: Object.keys(PRD_TEMPLATES),
            description: "The PRD template type",
          },
          productDescription: {
            type: "string",
            description: "Brief description of what you're building",
          },
        },
        required: ["template", "productDescription"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_templates": {
      const templates = Object.entries(PRD_TEMPLATES).map(([key, t]) => ({
        id: key,
        name: t.name,
        description: t.description,
        questionCount: t.questions.length,
        sections: t.sections,
      }));
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Here are the available PRD templates. Help the user choose the best one for their project.",
                templates,
                nextStep:
                  "Once the user picks a template, use get_questions to start the interactive questionnaire.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "get_questions": {
      const template = PRD_TEMPLATES[args?.template as string];
      if (!template) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Unknown template: ${args?.template}. Use list_templates to see available options.`,
            },
          ],
          isError: true,
        };
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                template: args?.template,
                templateName: template.name,
                instructions:
                  "Ask these questions one at a time, in a conversational way. Adapt follow-up questions based on answers. Don't just dump all questions at once.",
                questions: template.questions.map((q, i) => ({
                  number: i + 1,
                  question: q,
                  tip:
                    i === 0
                      ? "Start here. Keep it concise."
                      : i === 3
                        ? "Push for specific, measurable metrics. Vague goals = vague PRDs."
                        : i === 9
                          ? "This is where most PMs fall short. Be honest about risks."
                          : undefined,
                })),
                outputSections: template.sections,
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "generate_prd": {
      const prd = generatePRD(args as unknown as PRDAnswers);
      const validation = validatePRD(prd);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                prd,
                validation: {
                  score: validation.score,
                  isComplete: validation.isComplete,
                  missing: validation.missing,
                  suggestions: validation.suggestions,
                },
                nextSteps: validation.isComplete
                  ? [
                      "Review the PRD with your team",
                      "Share with engineering for feasibility check",
                      "Get stakeholder sign-off",
                    ]
                  : [
                      `Address missing sections: ${validation.missing.join(", ")}`,
                      ...validation.suggestions,
                    ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "validate_prd": {
      const validation = validatePRD(args?.prdContent as string);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                score: validation.score,
                grade:
                  validation.score >= 90
                    ? "A - Excellent"
                    : validation.score >= 80
                      ? "B - Good"
                      : validation.score >= 60
                        ? "C - Needs Work"
                        : "D - Incomplete",
                isComplete: validation.isComplete,
                missing: validation.missing,
                suggestions: validation.suggestions,
                message: validation.isComplete
                  ? "This PRD is solid! Review the suggestions below for polish."
                  : "This PRD needs more work before it's ready to share. Focus on the missing sections.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "suggest_edge_cases": {
      const edgeCases = getEdgeCases(
        args?.template as string,
        args?.productDescription as string
      );
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message:
                  "Here are edge cases to consider. Add the relevant ones to your PRD.",
                edgeCases,
                tip: "The best PRDs anticipate problems before engineering finds them.",
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

// ── Resources (templates as files) ─────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: Object.entries(PRD_TEMPLATES).map(([key, t]) => ({
    uri: `prd://templates/${key}`,
    name: `${t.name} Template`,
    description: t.description,
    mimeType: "text/markdown",
  })),
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  const templateKey = uri.replace("prd://templates/", "");
  const template = PRD_TEMPLATES[templateKey];

  if (!template) {
    throw new Error(`Template not found: ${templateKey}`);
  }

  let content = `# ${template.name} PRD Template\n\n`;
  content += `> ${template.description}\n\n`;
  content += `## Sections\n\n`;
  for (const section of template.sections) {
    content += `### ${section}\n\n`;
    content += `*[Describe ${section.toLowerCase()} here]*\n\n`;
  }

  return {
    contents: [
      {
        uri,
        mimeType: "text/markdown",
        text: content,
      },
    ],
  };
});

// ── Edge case generator ────────────────────────────────────────

function getEdgeCases(template: string, description: string): string[] {
  const common = [
    "What happens when the user has no internet connection?",
    "What if the user's session expires mid-flow?",
    "How does this work on mobile vs desktop?",
    "What happens with very slow network connections?",
    "How do you handle concurrent users editing the same data?",
  ];

  const templateSpecific: Record<string, string[]> = {
    "feature-launch": [
      "What if the feature conflicts with an existing workflow?",
      "How do power users vs new users experience this differently?",
      "What happens if the user has older data that doesn't fit the new schema?",
      "What if feature adoption is much higher/lower than expected?",
      "How does this interact with existing permissions/roles?",
      "What's the experience for users who don't have this feature enabled?",
      "What happens at scale (10x current traffic)?",
    ],
    "api-integration": [
      "What if the third-party API changes its schema without notice?",
      "How do you handle API rate limiting gracefully?",
      "What happens if the API returns malformed data?",
      "What if authentication tokens expire during a long-running operation?",
      "How do you handle partial failures in batch operations?",
      "What if the API has different behavior in sandbox vs production?",
      "What happens to in-flight requests during a deployment?",
    ],
    redesign: [
      "What if users can't find features that moved to new locations?",
      "How do you handle users who prefer the old design?",
      "What if the redesign breaks accessibility for screen readers?",
      "What happens to saved preferences/customizations from the old design?",
      "How do you handle the redesign in embedded/iframe contexts?",
      "What if A/B testing shows the old design performs better?",
      "How do you train customer support on the new design?",
    ],
  };

  return [...common, ...(templateSpecific[template] || [])];
}

// ── Start server ───────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PRD Generator MCP server running on stdio");
}

main().catch(console.error);
