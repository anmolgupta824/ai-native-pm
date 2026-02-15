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
    {
      name: "review_prd",
      description:
        "Review a PRD from the perspective of an Engineering Lead, Design Lead, or QA Lead. Each reviewer analyzes the PRD through their professional lens and provides strengths, concerns, and actionable suggestions. Use perspective 'all' to get reviews from all three perspectives at once.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prd_content: {
            type: "string",
            description: "The full PRD content to review",
          },
          perspective: {
            type: "string",
            enum: ["engineer", "designer", "qa", "all"],
            description:
              "Which reviewer perspective: 'engineer' (technical feasibility, scalability), 'designer' (UX, accessibility, consistency), 'qa' (testability, acceptance criteria, regression risk), or 'all' for a combined multi-perspective review",
          },
        },
        required: ["prd_content", "perspective"],
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

    case "review_prd": {
      const prdContent = args?.prd_content as string;
      const perspective = args?.perspective as string;

      if (perspective === "all") {
        const reviews = ["engineer", "designer", "qa"].map((p) =>
          reviewPRD(prdContent, p)
        );

        // Build consensus summary
        const allConcerns = reviews.flatMap((r) => r.concerns);
        const allSuggestions = reviews.flatMap((r) => r.suggestions);
        const uniqueSuggestions = [...new Set(allSuggestions)];

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message:
                    "Multi-perspective PRD review complete. Present each reviewer's feedback separately, then the consensus.",
                  reviews,
                  consensusSummary: {
                    totalConcerns: allConcerns.length,
                    sharedThemes:
                      allConcerns.length > 6
                        ? "Multiple perspectives flagged significant gaps — this PRD needs substantial revision."
                        : allConcerns.length > 3
                          ? "Several cross-functional concerns identified. Address these before moving forward."
                          : "Minor gaps identified. This PRD is in good shape overall.",
                    prioritySuggestions: uniqueSuggestions.slice(0, 5),
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const review = reviewPRD(prdContent, perspective);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `PRD review from ${review.role} perspective. Present the feedback constructively.`,
                review,
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

// ── Reviewer Personas ───────────────────────────────────────────

interface ReviewerPersona {
  perspective: string;
  role: string;
  focusAreas: string[];
  critiqueFramework: Record<string, string[]>;
}

const REVIEWER_PERSONAS: Record<string, ReviewerPersona> = {
  engineer: {
    perspective: "engineer",
    role: "Engineering Lead",
    focusAreas: [
      "Technical feasibility",
      "API design",
      "Scalability",
      "Edge cases",
      "Dependencies",
      "Performance",
    ],
    critiqueFramework: {
      feasibility: [
        "Is this technically achievable with the current stack?",
        "Are there hidden technical complexities not addressed?",
        "What infrastructure changes would be needed?",
      ],
      scalability: [
        "How does this perform at 10x current load?",
        "Are there database query concerns with growing data?",
        "Will this require horizontal or vertical scaling?",
      ],
      dependencies: [
        "What external services does this depend on?",
        "Are there version compatibility risks?",
        "What happens if a dependency goes down?",
      ],
      edgeCases: [
        "What race conditions could occur?",
        "How are concurrent modifications handled?",
        "What about data migration for existing users?",
      ],
      security: [
        "Are there authentication or authorization gaps?",
        "Is sensitive data properly handled?",
        "Are inputs validated and sanitized?",
      ],
      timeline: [
        "Is the engineering estimate realistic?",
        "What technical debt will this create?",
        "Are there prerequisites that need to be built first?",
      ],
    },
  },
  designer: {
    perspective: "designer",
    role: "Design Lead",
    focusAreas: [
      "User experience",
      "Accessibility",
      "Interaction flows",
      "Visual consistency",
      "User research gaps",
      "Information architecture",
    ],
    critiqueFramework: {
      userExperience: [
        "Is the user flow intuitive for first-time users?",
        "Are there unnecessary steps that could be eliminated?",
        "What's the cognitive load for the user?",
      ],
      accessibility: [
        "Does this meet WCAG 2.1 AA standards?",
        "How does this work with screen readers?",
        "Are there color contrast issues for low-vision users?",
      ],
      consistency: [
        "Does this match existing design patterns in the product?",
        "Are interaction patterns consistent with user expectations?",
        "Does the terminology match the rest of the product?",
      ],
      research: [
        "What user research supports this design direction?",
        "Have the core assumptions been validated with users?",
        "What usability testing is planned?",
      ],
      edgeCases: [
        "What does the empty state look like?",
        "How are error states communicated to the user?",
        "What happens with very long text or unusual data?",
      ],
      mobileCross: [
        "How does this adapt across screen sizes?",
        "Are touch targets large enough for mobile?",
        "What's the experience on slow connections?",
      ],
    },
  },
  qa: {
    perspective: "qa",
    role: "QA Lead",
    focusAreas: [
      "Testability",
      "Acceptance criteria clarity",
      "Edge cases",
      "Regression risk",
      "Test strategy",
      "Data integrity",
    ],
    critiqueFramework: {
      acceptanceCriteria: [
        "Are acceptance criteria specific and measurable?",
        "Is the expected behavior for each scenario documented?",
        "Are boundary values defined?",
      ],
      testability: [
        "Can each requirement be independently tested?",
        "Are there features that would be difficult to automate testing for?",
        "What test data would be needed?",
      ],
      edgeCases: [
        "What happens at boundary values (empty, max length, zero)?",
        "How does the system behave with invalid input?",
        "What concurrent access scenarios need testing?",
      ],
      regression: [
        "What existing features might be affected?",
        "Are there integration points that could break?",
        "What backward compatibility concerns exist?",
      ],
      dataIntegrity: [
        "How is data consistency maintained during failures?",
        "Are there migration risks for existing data?",
        "What happens if the process is interrupted midway?",
      ],
      environments: [
        "Are there environment-specific behaviors to test?",
        "What browser/device combinations need coverage?",
        "Are there timezone or locale-specific considerations?",
      ],
    },
  },
};

interface ReviewResult {
  perspective: string;
  role: string;
  strengths: string[];
  concerns: string[];
  suggestions: string[];
  overallAssessment: string;
}

function reviewPRD(prdContent: string, perspective: string): ReviewResult {
  const persona = REVIEWER_PERSONAS[perspective];
  if (!persona) {
    return {
      perspective,
      role: "Unknown",
      strengths: [],
      concerns: ["Unknown reviewer perspective"],
      suggestions: ["Use 'engineer', 'designer', or 'qa'"],
      overallAssessment: "Invalid perspective",
    };
  }

  const content = prdContent.toLowerCase();
  const strengths: string[] = [];
  const concerns: string[] = [];
  const suggestions: string[] = [];

  // Analyze based on the persona's critique framework
  for (const [category, questions] of Object.entries(
    persona.critiqueFramework
  )) {
    // Check if the PRD addresses this category
    const categoryPatterns: Record<string, RegExp[]> = {
      feasibility: [/technical|architecture|stack|infrastructure/i],
      scalability: [/scale|performance|load|capacity|throughput/i],
      dependencies: [/depend|external|third.?party|integration/i],
      edgeCases: [/edge case|error|failure|fallback|boundary/i],
      security: [/security|auth|permission|encrypt|sensitive/i],
      timeline: [/timeline|estimate|milestone|sprint|deadline/i],
      userExperience: [/user flow|interaction|experience|journey|usability/i],
      accessibility: [/accessib|wcag|screen reader|aria|a11y/i],
      consistency: [/consistent|pattern|design system|component/i],
      research: [/research|user test|interview|survey|validation/i],
      mobileCross: [/mobile|responsive|cross.?browser|device/i],
      acceptanceCriteria: [/acceptance|criteria|given|when|then|expected/i],
      testability: [/test|automat|coverage|scenario/i],
      regression: [/regression|backward|compatib|existing feature/i],
      dataIntegrity: [/data integrity|migration|consistency|rollback/i],
      environments: [/environment|browser|device|timezone|locale/i],
    };

    const patterns = categoryPatterns[category] || [];
    const addressed = patterns.some((p) => p.test(content));

    if (addressed) {
      strengths.push(
        `${category}: PRD addresses ${persona.role.toLowerCase()} concerns about ${category}`
      );
    } else {
      concerns.push(
        `${category}: Not addressed from a ${persona.role.toLowerCase()} perspective`
      );
      // Add the first question from the framework as a suggestion
      suggestions.push(questions[0]);
    }
  }

  // Generate overall assessment based on ratio of strengths to concerns
  const ratio = strengths.length / (strengths.length + concerns.length);
  let overallAssessment: string;
  if (ratio >= 0.8) {
    overallAssessment = `Strong PRD from a ${persona.role} perspective. Minor gaps to address, but well-thought-out overall.`;
  } else if (ratio >= 0.5) {
    overallAssessment = `Solid foundation, but several ${persona.role.toLowerCase()} concerns need attention before this is ready for implementation.`;
  } else {
    overallAssessment = `This PRD needs significant work from a ${persona.role.toLowerCase()} perspective. Key areas are missing that would cause issues during ${
      perspective === "engineer"
        ? "development"
        : perspective === "designer"
          ? "design review"
          : "testing"
    }.`;
  }

  return {
    perspective: persona.perspective,
    role: persona.role,
    strengths,
    concerns,
    suggestions,
    overallAssessment,
  };
}

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
