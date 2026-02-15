#!/usr/bin/env node

/**
 * MCP Teacher Mode Server
 *
 * An interactive MCP server that teaches Product Managers how to build
 * MCP integrations from scratch. Supports 8 lessons covering REST APIs,
 * MCP architecture, and integrations with Jira, Google Drive, Sheets,
 * Figma, and any custom API.
 *
 * Tools:
 *   start_lesson   — Begin a specific lesson (1-8)
 *   explain_concept — Deep-dive explanation of any MCP concept
 *   get_exercise    — Get a hands-on exercise for a lesson
 *   check_progress  — See which lessons are completed
 *   quiz            — Test knowledge with quiz questions
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import lesson1 from "./lessons/1-welcome.js";
import lesson2 from "./lessons/2-rest-api-primer.js";
import lesson3 from "./lessons/3-how-mcp-works.js";
import lesson4 from "./lessons/4-jira-integration.js";
import lesson5 from "./lessons/5-google-drive.js";
import lesson6 from "./lessons/6-google-sheets.js";
import lesson7 from "./lessons/7-custom-servers.js";
import lesson8 from "./lessons/8-figma.js";

// ── Types ─────────────────────────────────────────────────────────────────

export interface LessonContent {
  number: number;
  title: string;
  duration: string;
  objectives: string[];
  content: string;
  exercise: {
    title: string;
    description: string;
    steps: string[];
    validation: string;
  };
  quiz: {
    questions: Array<{
      question: string;
      options: string[];
      correctIndex: number;
      explanation: string;
    }>;
  };
}

// ── Lesson Registry ───────────────────────────────────────────────────────

const LESSONS: Record<number, LessonContent> = {
  1: lesson1,
  2: lesson2,
  3: lesson3,
  4: lesson4,
  5: lesson5,
  6: lesson6,
  7: lesson7,
  8: lesson8,
};

// ── Progress Tracking (in-memory for this session) ────────────────────────

interface ProgressEntry {
  started: boolean;
  completed: boolean;
  startedAt: string | null;
  completedAt: string | null;
  quizScore: number | null;
}

const progress: Record<number, ProgressEntry> = {};
for (let i = 1; i <= 8; i++) {
  progress[i] = {
    started: false,
    completed: false,
    startedAt: null,
    completedAt: null,
    quizScore: null,
  };
}

// ── Concept Explanations ──────────────────────────────────────────────────

const CONCEPTS: Record<string, string> = {
  mcp: `## What is MCP?

**MCP (Model Context Protocol)** is an open standard that lets AI assistants like Claude interact with external tools and data sources.

Think of it like USB for AI — a universal way to plug in any tool. Without MCP, Claude can only chat. With MCP, Claude can:
- Create Jira tickets
- Read Google Sheets data
- Write Google Docs
- Search Slack messages
- Interact with ANY API

### How it works:
1. You install an **MCP server** (a small program)
2. Claude Code discovers it automatically
3. Claude can now use the **tools** that server provides

### The key insight for PMs:
MCP turns Claude from a chatbot into a workflow automation engine. Instead of copy-pasting between 5 tools, you tell Claude what you need and it does the work.`,

  tool: `## What is a Tool in MCP?

A **Tool** is an action that Claude can perform through an MCP server.

Think of tools like buttons on a remote control:
- Each button does one specific thing
- Claude reads the label to know what it does
- Claude presses the button and gets a result

### Example Tools:
- \`jira_create_issue\` — Creates a new Jira ticket
- \`sheets_read_range\` — Reads data from Google Sheets
- \`drive_create_doc\` — Creates a new Google Doc

### How Claude uses tools:
1. Claude sees the list of available tools (like reading a menu)
2. Based on your request, it picks the right tool
3. It fills in the required parameters
4. It calls the tool and gets back a result
5. It uses the result to respond to you

### Tool definition has 3 parts:
- **Name** — what Claude calls it (e.g. \`jira_create_issue\`)
- **Description** — what it does (Claude reads this to decide when to use it)
- **Input Schema** — what parameters it needs (project key, summary, etc.)`,

  resource: `## What is a Resource in MCP?

A **Resource** is data that Claude can read from an MCP server — like a file or document.

If Tools are actions (verbs), Resources are data (nouns).

### Example Resources:
- \`prd://templates/feature-launch\` — A PRD template
- \`config://settings\` — Server configuration
- \`docs://api-reference\` — API documentation

### When to use Resources vs Tools:
- **Resource**: Static or semi-static data Claude needs to read
- **Tool**: An action that changes something or queries dynamic data

### For PMs:
Most PM workflows use Tools (creating tickets, reading spreadsheets). Resources are more useful for templates and reference docs.`,

  transport: `## What is a Transport in MCP?

A **Transport** is how Claude and the MCP server communicate — the "phone line" between them.

### The most common transport: stdio
- Claude starts the MCP server as a child process
- They talk through standard input/output (stdin/stdout)
- This is what you'll use 99% of the time

### Why this matters:
- \`console.log()\` goes to stdout → Claude reads it as MCP messages
- \`console.error()\` goes to stderr → safe for your debug logs
- **Never use console.log() for debugging** in an MCP server!

### Other transports (advanced):
- **HTTP/SSE**: For remote MCP servers (server runs on a different machine)
- You won't need these for this course`,

  oauth: `## What is OAuth?

**OAuth** is how apps get permission to access your data without knowing your password.

### The Valet Key Analogy:
When you valet park, you give the valet a special key that can only start the car — it can't open the trunk or glove box. OAuth works the same way:
1. Your app asks Google: "Can I read this user's Sheets?"
2. Google asks YOU: "Do you want to allow this?"
3. You click "Allow"
4. Google gives the app a special token (the valet key)
5. The app uses that token to read your Sheets — nothing else

### Key terms:
- **Client ID**: Your app's identity (like a business card)
- **Client Secret**: Your app's password (keep this private!)
- **Access Token**: The valet key (expires after ~1 hour)
- **Refresh Token**: A way to get a new access token without asking the user again
- **Scope**: What permissions the token grants (read files? create files? both?)

### For PMs:
OAuth is why Google shows you those "Allow access?" popups. It's the most secure way to connect Claude to your Google Workspace.`,

  "api-key": `## What is an API Key?

An **API Key** is a simple password that identifies your app to a service.

### How it works:
1. You go to the service's settings (e.g., Jira, Figma)
2. You create an API key/token
3. You include it in every request you make
4. The service checks the key and lets you in

### API Key vs OAuth:
- **API Key**: Simple, one key for everything, doesn't expire (usually)
- **OAuth**: More complex, specific permissions, tokens expire

### Where each is used:
- **Jira**: API key (Basic auth with email + token)
- **Figma**: API key (Personal Access Token)
- **Google**: OAuth (more secure, required by Google)
- **Slack**: Both (API key for bots, OAuth for user actions)

### Security tip:
Never put API keys in your code! Use environment variables instead.`,

  json: `## What is JSON?

**JSON (JavaScript Object Notation)** is the format APIs use to send and receive data.

### It looks like this:
\`\`\`json
{
  "name": "Sprint Planning",
  "status": "In Progress",
  "assignee": {
    "name": "Sarah",
    "email": "sarah@company.com"
  },
  "tags": ["Q1", "priority"]
}
\`\`\`

### The basics:
- **Objects**: Curly braces \`{}\` with key-value pairs
- **Arrays**: Square brackets \`[]\` with lists of items
- **Strings**: Text in double quotes \`"hello"\`
- **Numbers**: No quotes \`42\`
- **Booleans**: \`true\` or \`false\`
- **Null**: \`null\` (means "nothing")

### For PMs:
JSON is how Jira sends you ticket data, how Google Sheets returns spreadsheet values, and how you tell APIs what to create. You don't need to memorize the syntax — Claude handles that — but understanding the structure helps you debug issues.`,

  jql: `## What is JQL?

**JQL (Jira Query Language)** is how you search for issues in Jira programmatically.

### Basic syntax:
\`field operator value\`

### Common queries:
- \`project = "MYPROJ"\` — All issues in a project
- \`assignee = currentUser()\` — My issues
- \`status = "In Progress"\` — All in-progress items
- \`sprint in openSprints()\` — Current sprint items
- \`created >= -7d\` — Created in the last 7 days
- \`type = Bug AND priority = High\` — High-priority bugs

### Combining with AND/OR:
\`project = "MYPROJ" AND status = "In Progress" AND assignee = currentUser()\`

### Ordering:
\`project = "MYPROJ" ORDER BY priority DESC, created ASC\`

### For PMs:
JQL is incredibly powerful for automation. You can query "all bugs from last sprint" or "all stories without estimates" and Claude will use this to build reports, summaries, and action items.`,
};

// ── Server Setup ──────────────────────────────────────────────────────────

const server = new Server(
  { name: "mcp-teacher-mode", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "start_lesson",
      description:
        "Start an interactive MCP lesson. Returns the full lesson content including objectives, explanations, code examples, and what you'll build. Lessons build on each other — start with Lesson 1 if you're new to MCP.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description:
              "Lesson number (1-8): 1=Welcome, 2=REST APIs, 3=How MCP Works, 4=Jira, 5=Google Drive, 6=Google Sheets, 7=Custom Servers, 8=Figma",
            minimum: 1,
            maximum: 8,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "explain_concept",
      description:
        "Get a detailed, PM-friendly explanation of any MCP or API concept. Great for when you encounter a term you don't understand.",
      inputSchema: {
        type: "object" as const,
        properties: {
          concept: {
            type: "string",
            description:
              'The concept to explain. Examples: "mcp", "tool", "resource", "transport", "oauth", "api-key", "json", "jql"',
          },
        },
        required: ["concept"],
      },
    },
    {
      name: "get_exercise",
      description:
        "Get a hands-on exercise for a specific lesson. Each exercise has step-by-step instructions and validation criteria so you know when you've completed it successfully.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: "The lesson number (1-8) to get an exercise for",
            minimum: 1,
            maximum: 8,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "check_progress",
      description:
        "See your learning progress — which lessons you've started, completed, and quiz scores. Helps you track where you are in the course.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "quiz",
      description:
        "Take a quiz to test your understanding of a lesson. Returns multiple-choice questions with explanations for each answer. Great for reinforcing what you've learned.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: "The lesson number (1-8) to take a quiz for",
            minimum: 1,
            maximum: 8,
          },
        },
        required: ["lesson_number"],
      },
    },
  ],
}));

// ── Tool Handlers ─────────────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    // ── start_lesson ────────────────────────────────────────────────────
    case "start_lesson": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];

      if (!lesson) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `Lesson ${lessonNum} not found. Available lessons are 1-8.`,
                  availableLessons: Object.entries(LESSONS).map(([num, l]) => ({
                    number: parseInt(num),
                    title: l.title,
                    duration: l.duration,
                  })),
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      // Mark as started
      progress[lessonNum].started = true;
      progress[lessonNum].startedAt =
        progress[lessonNum].startedAt || new Date().toISOString();

      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Starting Lesson ${lessonNum}: ${lesson.title}`,
                lesson: {
                  number: lesson.number,
                  title: lesson.title,
                  duration: lesson.duration,
                  objectives: lesson.objectives,
                  content: lesson.content,
                },
                progress: {
                  currentLesson: lessonNum,
                  completedLessons: completedCount,
                  totalLessons: 8,
                },
                nextSteps: [
                  "Read through the lesson content above",
                  `Try the exercise: use get_exercise with lesson_number ${lessonNum}`,
                  `Test your knowledge: use quiz with lesson_number ${lessonNum}`,
                  lessonNum < 8
                    ? `When ready, move to Lesson ${lessonNum + 1}: ${LESSONS[lessonNum + 1]?.title}`
                    : "You've reached the final lesson! Complete the quiz to finish the course.",
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── explain_concept ─────────────────────────────────────────────────
    case "explain_concept": {
      const concept = (args?.concept as string)?.toLowerCase().trim();

      if (!concept) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: "Please provide a concept to explain.",
                  availableConcepts: Object.keys(CONCEPTS),
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      // Try exact match first, then partial match
      let explanation = CONCEPTS[concept];
      if (!explanation) {
        const partialMatch = Object.keys(CONCEPTS).find(
          (key) => key.includes(concept) || concept.includes(key)
        );
        if (partialMatch) {
          explanation = CONCEPTS[partialMatch];
        }
      }

      if (!explanation) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `I don't have a pre-written explanation for "${concept}", but I can help! Here are concepts I have detailed explanations for:`,
                  availableConcepts: Object.keys(CONCEPTS),
                  suggestion:
                    "Ask Claude directly about this concept — Claude can explain any MCP or API topic even without this tool.",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Explanation: ${concept}`,
                explanation,
                nextSteps: [
                  "Ask about related concepts if anything is unclear",
                  "Try a hands-on exercise to see this in practice",
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── get_exercise ────────────────────────────────────────────────────
    case "get_exercise": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];

      if (!lesson) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `Lesson ${lessonNum} not found. Available lessons are 1-8.`,
                },
                null,
                2
              ),
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
                message: `Exercise for Lesson ${lessonNum}: ${lesson.title}`,
                exercise: {
                  title: lesson.exercise.title,
                  description: lesson.exercise.description,
                  steps: lesson.exercise.steps,
                  validation: lesson.exercise.validation,
                },
                nextSteps: [
                  "Follow the steps above to complete the exercise",
                  "If you get stuck, use explain_concept to understand any terms",
                  `When done, take the quiz with: quiz lesson_number ${lessonNum}`,
                ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── check_progress ──────────────────────────────────────────────────
    case "check_progress": {
      const lessonProgress = Object.entries(progress).map(([num, p]) => ({
        lesson: parseInt(num),
        title: LESSONS[parseInt(num)]?.title || "Unknown",
        duration: LESSONS[parseInt(num)]?.duration || "Unknown",
        status: p.completed
          ? "✅ Completed"
          : p.started
            ? "📖 In Progress"
            : "⬜ Not Started",
        quizScore:
          p.quizScore !== null ? `${p.quizScore}%` : "Not taken",
      }));

      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;
      const startedCount = Object.values(progress).filter(
        (p) => p.started
      ).length;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: "Your MCP Course Progress",
                summary: {
                  completed: completedCount,
                  inProgress: startedCount - completedCount,
                  notStarted: 8 - startedCount,
                  totalLessons: 8,
                  percentComplete: Math.round((completedCount / 8) * 100),
                },
                lessons: lessonProgress,
                nextSteps:
                  completedCount === 8
                    ? [
                        "🎉 Congratulations! You've completed the entire course!",
                        "Try building your own MCP server for a tool you use at work",
                        "Check out the usage-mode templates for production-ready servers",
                      ]
                    : [
                        `Continue with Lesson ${startedCount > 0 ? Math.max(...Object.entries(progress).filter(([, p]) => p.started).map(([n]) => parseInt(n))) : 1}`,
                        "Use start_lesson to begin any lesson",
                      ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── quiz ────────────────────────────────────────────────────────────
    case "quiz": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];

      if (!lesson) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `Lesson ${lessonNum} not found. Available lessons are 1-8.`,
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      // Mark lesson as completed when quiz is taken
      progress[lessonNum].completed = true;
      progress[lessonNum].completedAt = new Date().toISOString();

      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Quiz: Lesson ${lessonNum} — ${lesson.title}`,
                instructions:
                  "Answer each question below. Claude will check your answers and explain the correct ones.",
                questions: lesson.quiz.questions.map((q, i) => ({
                  questionNumber: i + 1,
                  question: q.question,
                  options: q.options.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`),
                  correctAnswer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
                  explanation: q.explanation,
                })),
                totalQuestions: lesson.quiz.questions.length,
                progress: {
                  completedLessons: completedCount,
                  totalLessons: 8,
                  percentComplete: Math.round((completedCount / 8) * 100),
                },
                nextSteps:
                  lessonNum < 8
                    ? [
                        `Great work! Move to Lesson ${lessonNum + 1}: ${LESSONS[lessonNum + 1]?.title}`,
                        "Use check_progress to see your overall progress",
                      ]
                    : [
                        "🎉 You've completed all lessons!",
                        "Check out the usage-mode templates to build real integrations",
                        "Use check_progress to see your final progress",
                      ],
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── Unknown tool ────────────────────────────────────────────────────
    default:
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Unknown tool: ${name}`,
                availableTools: [
                  "start_lesson",
                  "explain_concept",
                  "get_exercise",
                  "check_progress",
                  "quiz",
                ],
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
  }
});

// ── Start Server ──────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Teacher Mode server running — ready to teach!");
}

main().catch(console.error);
