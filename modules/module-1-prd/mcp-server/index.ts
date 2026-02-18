#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";

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
  prfaq: {
    name: "PRFAQ (Press Release / FAQ)",
    description:
      "Amazon-style working backwards document — start with the press release, then fill in the details",
    sections: [
      "Press Release — Headline",
      "Press Release — Subheadline",
      "Press Release — Body",
      "Customer Problem",
      "Solution",
      "Customer Quote",
      "How to Get Started",
      "Executive Quote",
      "FAQ — Customer",
      "FAQ — Internal",
      "Success Metrics",
      "Open Questions",
    ],
    questions: [
      "What is the product or feature? Write a one-sentence headline as if announcing it publicly.",
      "Who is the target customer? What key benefit does this deliver in one sentence?",
      "What customer problem does this solve? Why is it painful today?",
      "How does the product/feature solve this problem? Describe the core experience.",
      "What would a delighted customer say about this? (write a realistic quote)",
      "How does a customer get started? What are the first 3 steps?",
      "What does success look like? List 2-3 measurable outcomes.",
      "What are the top 3 questions a customer would ask? (FAQ)",
      "What are the top 3 questions your leadership team would ask? (internal FAQ)",
      "What's the biggest risk or open question that could derail this?",
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

// ── Custom PRD Generation ─────────────────────────────────────

function generateCustomPRD(
  productName: string,
  sections: string[],
  answers?: Record<string, string>
): string {
  const now = new Date().toISOString().split("T")[0];

  let prd = `# PRD: ${productName}\n\n`;
  prd += `**Template:** Custom Format\n`;
  prd += `**Created:** ${now}\n`;
  prd += `**Status:** Draft\n`;
  prd += `**Author:** [Your Name]\n\n`;
  prd += `---\n\n`;

  for (const section of sections) {
    prd += `## ${section}\n\n`;
    const content = answers?.[section];
    if (content) {
      prd += `${content}\n\n`;
    } else {
      prd += `*[TODO: Fill in this section]*\n\n`;
    }
  }

  prd += `---\n\n`;
  prd += `## Pre-Ship Checklist\n\n`;
  prd += `- [ ] All sections reviewed and complete\n`;
  prd += `- [ ] Stakeholder sign-off obtained\n`;
  prd += `- [ ] Success metrics finalized\n`;
  prd += `- [ ] Edge cases documented\n`;
  prd += `- [ ] Launch date confirmed\n`;

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
        "Validate a PRD for completeness. Returns a score (A/B/C/D grade), missing sections, and improvement suggestions. IMPORTANT: Pass the FULL TEXT of your PRD (not a file path). Read the file first, then pass its contents here.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prdContent: {
            type: "string",
            description:
              "The full PRD content to validate. Must be the actual PRD text, not a file path. Read the PRD file first, then pass its text content here.",
          },
        },
        required: ["prdContent"],
      },
    },
    {
      name: "validate_prd_file",
      description:
        "Convenience wrapper: Reads a PRD from a file path and validates it. Returns a score (A/B/C/D grade), missing sections, and improvement suggestions. Use this when the PRD is saved as a file.",
      inputSchema: {
        type: "object" as const,
        properties: {
          filePath: {
            type: "string",
            description:
              "Absolute path to the PRD file (e.g., '/Users/you/project/output/prd-draft.md')",
          },
        },
        required: ["filePath"],
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
      name: "generate_prd_custom",
      description:
        "Generate a PRD using a custom format with user-defined section headings instead of a predefined template. Use this when the user wants their own company format or a structure that doesn't match the built-in templates.",
      inputSchema: {
        type: "object" as const,
        properties: {
          productName: {
            type: "string",
            description: "Name of the product or feature",
          },
          sections: {
            type: "array",
            items: { type: "string" },
            description:
              'Array of custom section headings in order (e.g., ["Executive Summary", "Problem Space", "Solution Design", "Go-to-Market"])',
          },
          answers: {
            type: "object",
            description:
              "Map of section heading to content for that section. Use the exact section heading strings from the sections array as keys.",
            additionalProperties: { type: "string" },
          },
        },
        required: ["productName", "sections"],
      },
    },
    {
      name: "review_prd",
      description:
        "Review a PRD from a specific stakeholder perspective. 9 reviewers available: backend_eng (APIs, DB, services), frontend_eng (UI, state, performance), designer (UX, accessibility), qa (testability, edge cases), finance (ROI, costs), legal (privacy, compliance, IP), compliance (regulatory, SOC2, audit), pm (strategy, scope, prioritization), marketing (positioning, launch comms). Use 'all' for a combined review from all 9.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prd_content: {
            type: "string",
            description: "The full PRD content to review (paste the entire PRD text, not a file path)",
          },
          perspective: {
            type: "string",
            enum: [
              "backend_eng",
              "frontend_eng",
              "designer",
              "qa",
              "finance",
              "legal",
              "compliance",
              "pm",
              "marketing",
              "all",
            ],
            description:
              "Which reviewer perspective to use, or 'all' for a combined multi-perspective review from all 9 reviewers",
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

    case "validate_prd_file": {
      const filePath = args?.filePath as string;
      try {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const fileValidation = validatePRD(fileContent);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  filePath,
                  score: fileValidation.score,
                  grade:
                    fileValidation.score >= 90
                      ? "A - Excellent"
                      : fileValidation.score >= 80
                        ? "B - Good"
                        : fileValidation.score >= 60
                          ? "C - Needs Work"
                          : "D - Incomplete",
                  isComplete: fileValidation.isComplete,
                  missing: fileValidation.missing,
                  suggestions: fileValidation.suggestions,
                  message: fileValidation.isComplete
                    ? "This PRD is solid! Review the suggestions below for polish."
                    : "This PRD needs more work before it's ready to share. Focus on the missing sections.",
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (err) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error reading file: ${err instanceof Error ? err.message : String(err)}. Make sure the file path is absolute and the file exists.`,
            },
          ],
          isError: true,
        };
      }
    }

    case "generate_prd_custom": {
      const customPrd = generateCustomPRD(
        args?.productName as string,
        args?.sections as string[],
        args?.answers as Record<string, string> | undefined
      );
      const customValidation = validatePRD(customPrd);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                prd: customPrd,
                validation: {
                  score: customValidation.score,
                  isComplete: customValidation.isComplete,
                  missing: customValidation.missing,
                  suggestions: customValidation.suggestions,
                },
                nextSteps: customValidation.isComplete
                  ? [
                      "Review the PRD with your team",
                      "Share with engineering for feasibility check",
                      "Get stakeholder sign-off",
                    ]
                  : [
                      `Address missing sections: ${customValidation.missing.join(", ")}`,
                      ...customValidation.suggestions,
                    ],
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
        const reviews = Object.keys(REVIEWER_PERSONAS).map((p) =>
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
  backend_eng: {
    perspective: "backend_eng",
    role: "Backend Engineer",
    focusAreas: [
      "API design",
      "Database schema",
      "Service architecture",
      "Caching strategy",
      "Scalability",
      "Data consistency",
    ],
    critiqueFramework: {
      apiDesign: [
        "Are API endpoints well-defined with clear request/response schemas?",
        "Is the API versioning strategy defined?",
        "Are there missing endpoints needed for the feature?",
      ],
      database: [
        "Is the data model normalized appropriately?",
        "What indexes are needed for query performance?",
        "How does this affect database migration for existing data?",
      ],
      services: [
        "Which microservices are affected or need to be created?",
        "How are inter-service dependencies managed?",
        "What happens if a downstream service is unavailable?",
      ],
      caching: [
        "What caching strategy is appropriate (Redis, in-memory, CDN)?",
        "How are cache invalidation scenarios handled?",
        "What's the cache-miss penalty at peak load?",
      ],
      scalability: [
        "How does this perform at 10x current load?",
        "Are there database query concerns with growing data?",
        "Will this require horizontal or vertical scaling?",
      ],
      security: [
        "Are there authentication or authorization gaps?",
        "Is sensitive data properly encrypted at rest and in transit?",
        "Are inputs validated and sanitized?",
      ],
    },
  },
  frontend_eng: {
    perspective: "frontend_eng",
    role: "Frontend Engineer",
    focusAreas: [
      "UI implementation",
      "State management",
      "Performance",
      "Browser compatibility",
      "Component architecture",
      "Responsiveness",
    ],
    critiqueFramework: {
      uiImplementation: [
        "Are all UI states defined (loading, empty, error, success)?",
        "What component library or design system components are reused?",
        "Are there complex interactions that need detailed specs?",
      ],
      stateManagement: [
        "How is client-side state managed for this feature?",
        "Are there optimistic update scenarios?",
        "How is state synchronized across tabs or sessions?",
      ],
      performance: [
        "What's the expected bundle size impact?",
        "Are there lazy-loading opportunities?",
        "How is rendering performance on large lists or datasets?",
      ],
      browserCompat: [
        "What browsers and versions need to be supported?",
        "Are there CSS or JS features with limited browser support?",
        "How does this work without JavaScript enabled?",
      ],
      accessibility: [
        "Are keyboard navigation and focus management handled?",
        "Do interactive elements have proper ARIA attributes?",
        "Is the tab order logical and complete?",
      ],
      responsiveness: [
        "How does the layout adapt from mobile to desktop?",
        "Are touch targets at least 44x44px on mobile?",
        "What's the experience on slow 3G connections?",
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
  finance: {
    perspective: "finance",
    role: "Finance Lead",
    focusAreas: [
      "ROI analysis",
      "Cost modeling",
      "Revenue impact",
      "Budget allocation",
      "Unit economics",
      "Financial risk",
    ],
    critiqueFramework: {
      roi: [
        "What's the expected ROI and payback period?",
        "How does the cost of building this compare to the revenue it generates?",
        "Are there cheaper alternatives that deliver 80% of the value?",
      ],
      costModeling: [
        "What are the infrastructure costs at projected scale?",
        "Are there third-party licensing or API costs?",
        "What's the ongoing maintenance cost vs. one-time build cost?",
      ],
      revenueImpact: [
        "Does this directly drive revenue, reduce churn, or improve conversion?",
        "What's the projected revenue impact over 6 and 12 months?",
        "How does this affect average revenue per user (ARPU)?",
      ],
      budgetAllocation: [
        "Is this the highest-value use of the engineering budget?",
        "What's the opportunity cost of building this vs. something else?",
        "Are there headcount or contractor budget implications?",
      ],
      unitEconomics: [
        "How does this affect customer acquisition cost (CAC)?",
        "What's the impact on lifetime value (LTV)?",
        "Does this improve or worsen the LTV:CAC ratio?",
      ],
      financialRisk: [
        "What if adoption is 50% lower than projected?",
        "Are there contractual or SLA financial penalties to consider?",
        "What's the sunk cost if this project is cancelled midway?",
      ],
    },
  },
  legal: {
    perspective: "legal",
    role: "Legal Counsel",
    focusAreas: [
      "Privacy compliance",
      "Terms of service",
      "Liability exposure",
      "Intellectual property",
      "Data governance",
      "Contractual obligations",
    ],
    critiqueFramework: {
      privacy: [
        "Does this collect, store, or process personal data (PII)?",
        "Is a privacy impact assessment required?",
        "Are user consent mechanisms adequate under GDPR/CCPA?",
      ],
      termsOfService: [
        "Does this require changes to the Terms of Service?",
        "Are there new user agreements or disclosures needed?",
        "How are users notified of changes to data handling?",
      ],
      liability: [
        "What liability exposure does this feature create?",
        "Are there indemnification clauses that need updating?",
        "What happens if this feature causes data loss for a customer?",
      ],
      intellectualProperty: [
        "Are there patent or IP concerns with the approach?",
        "Does this use any open-source components with restrictive licenses?",
        "Are there trademark considerations for naming?",
      ],
      dataGovernance: [
        "Where is data stored geographically (data residency)?",
        "What's the data retention and deletion policy?",
        "How is data shared with or accessed by third parties?",
      ],
      contractualObligations: [
        "Does this affect existing customer contracts or SLAs?",
        "Are there vendor agreements that need to be reviewed?",
        "What notification obligations exist for enterprise customers?",
      ],
    },
  },
  compliance: {
    perspective: "compliance",
    role: "Compliance Officer",
    focusAreas: [
      "Regulatory requirements",
      "Audit readiness",
      "SOC2 compliance",
      "Data retention",
      "Access controls",
      "Change management",
    ],
    critiqueFramework: {
      regulatory: [
        "Which regulations apply (GDPR, CCPA, HIPAA, SOX)?",
        "Are there industry-specific compliance requirements?",
        "Does this trigger any new regulatory filing requirements?",
      ],
      auditReadiness: [
        "Is this feature auditable (logging, traceability)?",
        "Are there audit trail requirements for data changes?",
        "Can we demonstrate compliance to auditors?",
      ],
      soc2: [
        "How does this affect SOC2 Type II compliance?",
        "Are there new security controls needed?",
        "Does this change the scope of our security assessment?",
      ],
      dataRetention: [
        "What are the data retention requirements?",
        "How is data purged when retention periods expire?",
        "Are there legal hold implications?",
      ],
      accessControls: [
        "Are role-based access controls (RBAC) properly defined?",
        "Is the principle of least privilege applied?",
        "How are admin actions logged and monitored?",
      ],
      changeManagement: [
        "Does this follow the change management process?",
        "Is a rollback plan documented and tested?",
        "Are change advisory board (CAB) approvals needed?",
      ],
    },
  },
  pm: {
    perspective: "pm",
    role: "Senior PM",
    focusAreas: [
      "Product strategy alignment",
      "Scope management",
      "Prioritization",
      "Competitive analysis",
      "Stakeholder alignment",
      "Success definition",
    ],
    critiqueFramework: {
      strategyAlignment: [
        "How does this align with the product vision and roadmap?",
        "Does this support the company's current strategic priorities?",
        "What OKRs does this contribute to?",
      ],
      scopeManagement: [
        "Is the scope clearly defined with explicit non-goals?",
        "What's the MVP vs. full vision? Are they clearly separated?",
        "Are there scope creep risks that need guardrails?",
      ],
      prioritization: [
        "Why is this more important than other items on the backlog?",
        "What's the impact vs. effort assessment?",
        "What gets deprioritized to make room for this?",
      ],
      competitive: [
        "How do competitors handle this? What can we learn?",
        "Does this create or maintain competitive advantage?",
        "Is there a risk of fast follower if we invest heavily?",
      ],
      stakeholderAlignment: [
        "Are all key stakeholders aligned on the approach?",
        "Who has veto power and have they signed off?",
        "What cross-team dependencies need coordination?",
      ],
      successDefinition: [
        "Are success metrics specific, measurable, and time-bound?",
        "What does failure look like and how would you detect it?",
        "What's the decision framework for continuing vs. killing this?",
      ],
    },
  },
  marketing: {
    perspective: "marketing",
    role: "Marketing Lead",
    focusAreas: [
      "Product positioning",
      "Messaging and naming",
      "Launch communications",
      "Customer education",
      "Market timing",
      "Growth impact",
    ],
    critiqueFramework: {
      positioning: [
        "How is this positioned relative to competitors?",
        "Does this reinforce or dilute the brand positioning?",
        "What's the one-sentence value proposition for customers?",
      ],
      messaging: [
        "Is the feature naming clear, memorable, and on-brand?",
        "What messaging framework will be used for launch?",
        "How will this be explained to non-technical users?",
      ],
      launchComms: [
        "What channels will be used for launch (email, blog, social)?",
        "Is a press release or analyst briefing appropriate?",
        "What's the launch timeline relative to marketing campaigns?",
      ],
      customerEducation: [
        "What documentation, tutorials, or videos are needed?",
        "How will existing customers be notified and educated?",
        "Are there customer webinars or training sessions planned?",
      ],
      marketTiming: [
        "Is the launch timed with any industry events or cycles?",
        "Are there competitor launches we need to be aware of?",
        "Does seasonality affect adoption of this feature?",
      ],
      growthImpact: [
        "How will this affect trial-to-paid conversion?",
        "Can this feature be used for lead generation or demos?",
        "What's the viral coefficient — does this encourage sharing?",
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
      suggestions: ["Use one of: backend_eng, frontend_eng, designer, qa, finance, legal, compliance, pm, marketing, or 'all'"],
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
      // Backend Engineer
      apiDesign: [/api|endpoint|rest|graphql|request|response|schema/i],
      database: [/database|db|sql|schema|index|query|migration/i],
      services: [/microservice|service|downstream|upstream|dependency/i],
      caching: [/cache|redis|cdn|invalidat|ttl|in.?memory/i],
      scalability: [/scale|performance|load|capacity|throughput/i],
      security: [/security|auth|permission|encrypt|sensitive/i],
      // Frontend Engineer
      uiImplementation: [/component|ui state|loading|empty state|error state/i],
      stateManagement: [/state management|redux|context|optimistic|sync/i],
      performance: [/bundle|lazy.?load|render|performance|speed/i],
      browserCompat: [/browser|chrome|safari|firefox|compatib/i],
      responsiveness: [/responsive|mobile|tablet|breakpoint|touch/i],
      // Designer
      userExperience: [/user flow|interaction|experience|journey|usability/i],
      accessibility: [/accessib|wcag|screen reader|aria|a11y/i],
      consistency: [/consistent|pattern|design system|component/i],
      research: [/research|user test|interview|survey|validation/i],
      edgeCases: [/edge case|error|failure|fallback|boundary/i],
      mobileCross: [/mobile|responsive|cross.?browser|device/i],
      // QA
      acceptanceCriteria: [/acceptance|criteria|given|when|then|expected/i],
      testability: [/test|automat|coverage|scenario/i],
      regression: [/regression|backward|compatib|existing feature/i],
      dataIntegrity: [/data integrity|migration|consistency|rollback/i],
      environments: [/environment|browser|device|timezone|locale/i],
      // Finance
      roi: [/roi|return on investment|payback|cost.?benefit/i],
      costModeling: [/cost|infrastructure cost|licensing|maintenance cost/i],
      revenueImpact: [/revenue|arpu|conversion|churn|monetiz/i],
      budgetAllocation: [/budget|headcount|resource|opportunity cost/i],
      unitEconomics: [/cac|ltv|lifetime value|acquisition cost|unit econom/i],
      financialRisk: [/financial risk|sunk cost|penalty|contractual/i],
      // Legal
      privacy: [/privacy|pii|personal data|gdpr|ccpa|consent/i],
      termsOfService: [/terms of service|tos|user agreement|disclosure/i],
      liability: [/liability|indemnif|damages|data loss/i],
      intellectualProperty: [/patent|ip|intellectual property|trademark|license/i],
      dataGovernance: [/data residency|retention|deletion|third.?party data/i],
      contractualObligations: [/contract|sla|vendor|enterprise|notification/i],
      // Compliance
      regulatory: [/regulat|gdpr|ccpa|hipaa|sox|compliance/i],
      auditReadiness: [/audit|trail|traceab|logging|evidence/i],
      soc2: [/soc2|soc 2|security control|assessment/i],
      dataRetention: [/retention|purge|legal hold|expir/i],
      accessControls: [/rbac|role.?based|least privilege|access control/i],
      changeManagement: [/change management|cab|rollback|change advisory/i],
      // PM
      strategyAlignment: [/vision|roadmap|strategy|okr|objective/i],
      scopeManagement: [/scope|non.?goal|mvp|scope creep|guardrail/i],
      prioritization: [/priorit|backlog|impact|effort|trade.?off/i],
      competitive: [/competitor|competitive|market|differenti/i],
      stakeholderAlignment: [/stakeholder|sign.?off|alignment|cross.?team/i],
      successDefinition: [/success metric|kpi|measurable|time.?bound/i],
      // Marketing
      positioning: [/positioning|brand|value proposition|differentiat/i],
      messaging: [/messaging|naming|copywriting|tagline/i],
      launchComms: [/launch|announcement|press|blog|social media/i],
      customerEducation: [/documentation|tutorial|video|webinar|training/i],
      marketTiming: [/timing|seasonality|event|industry cycle/i],
      growthImpact: [/trial|conversion|lead gen|viral|growth/i],
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
    const phaseMap: Record<string, string> = {
      backend_eng: "backend development",
      frontend_eng: "frontend implementation",
      designer: "design review",
      qa: "testing",
      finance: "budget approval",
      legal: "legal review",
      compliance: "compliance audit",
      pm: "roadmap planning",
      marketing: "launch planning",
    };
    overallAssessment = `This PRD needs significant work from a ${persona.role.toLowerCase()} perspective. Key areas are missing that would cause issues during ${phaseMap[perspective] || "review"}.`;
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
    prfaq: [
      "What if the press release promise doesn't match what engineering can deliver?",
      "What if the customer quote feels aspirational but customers don't actually say that?",
      "What if leadership FAQ reveals misalignment on strategy or priorities?",
      "What if the 'getting started' flow has more friction than the PRFAQ implies?",
      "What if the success metrics are lagging indicators that take months to measure?",
      "What if a competitor launches a similar feature before you ship?",
      "How do you handle the gap between the PRFAQ vision and the MVP reality?",
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
