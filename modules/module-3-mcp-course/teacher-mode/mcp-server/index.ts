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
 *   start_lesson    — Begin a specific lesson (returns first section only)
 *   continue_lesson — Get the next section of the current lesson
 *   resume_course   — Resume after restarting Claude Code
 *   explain_concept — Deep-dive explanation of any MCP concept
 *   get_exercise    — Get a hands-on exercise for a lesson
 *   check_progress  — See which lessons are completed (section-level detail)
 *   quiz            — Test knowledge with quiz questions
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";

import lesson1 from "./lessons/1-welcome.js";
import lesson2 from "./lessons/2-rest-api-primer.js";
import lesson3 from "./lessons/3-how-mcp-works.js";
import lesson4 from "./lessons/4-jira-integration.js";
import lesson5 from "./lessons/5-google-drive.js";
import lesson6 from "./lessons/6-google-sheets.js";
import lesson7 from "./lessons/7-custom-servers.js";
import lesson8 from "./lessons/8-figma.js";

// ── Types ─────────────────────────────────────────────────────────────────

export interface Section {
  id: string;
  title: string;
  content: string;
  teacherNotes?: string;
  checkQuestion?: string;
}

export interface LessonContent {
  number: number;
  title: string;
  duration: string;
  objectives: string[];
  sections: Section[];
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

// ── Progress Tracking with Disk Persistence ──────────────────────────────

interface ProgressEntry {
  started: boolean;
  completed: boolean;
  startedAt: string | null;
  completedAt: string | null;
  quizScore: number | null;
  currentSection: number;
  totalSections: number;
}

const PROGRESS_FILE = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "progress-state.json"
);

// CLAUDE.md lives at the project root so Claude Code reads it on startup
const PROJECT_ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../../../../.."
);
const CLAUDE_MD_FILE = path.join(PROJECT_ROOT, "CLAUDE.md");

function loadProgress(): Record<number, ProgressEntry> {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    console.error("Could not load progress file, starting fresh.");
  }

  // Default progress
  const defaultProgress: Record<number, ProgressEntry> = {};
  for (let i = 1; i <= 8; i++) {
    defaultProgress[i] = {
      started: false,
      completed: false,
      startedAt: null,
      completedAt: null,
      quizScore: null,
      currentSection: 0,
      totalSections: LESSONS[i]?.sections.length || 0,
    };
  }
  return defaultProgress;
}

function saveProgress(): void {
  try {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
  } catch {
    console.error("Could not save progress file.");
  }
  // Also update CLAUDE.md for cross-session resume
  saveProgressToCLAUDE();
}

function saveProgressToCLAUDE(): void {
  try {
    const completedCount = Object.values(progress).filter((p) => p.completed).length;
    const startedCount = Object.values(progress).filter((p) => p.started).length;

    // Find current in-progress lesson
    let currentLesson: number | null = null;
    for (let i = 8; i >= 1; i--) {
      if (progress[i].started && !progress[i].completed) {
        currentLesson = i;
        break;
      }
    }

    // Build the MCP course progress section
    const lessonLines = Object.entries(progress).map(([num, p]) => {
      const lesson = LESSONS[parseInt(num)];
      const status = p.completed
        ? "✅ Completed"
        : p.started
          ? `🔄 In Progress (Section ${p.currentSection}/${p.totalSections})`
          : "⬜ Not Started";
      const quiz = p.quizScore !== null ? ` | Quiz: ${p.quizScore}%` : "";
      return `- Lesson ${num}: ${lesson?.title || "Unknown"} — ${status}${quiz}`;
    });

    const mcpSection = `## Module 3: MCP Automation Course — Teaching Mode Progress

**Overall:** ${completedCount}/8 lessons complete (${Math.round((completedCount / 8) * 100)}%)
${currentLesson ? `**Current:** Lesson ${currentLesson} (${LESSONS[currentLesson]?.title}) — Section ${progress[currentLesson].currentSection}/${progress[currentLesson].totalSections}` : completedCount === 8 ? "**Status:** Course complete!" : `**Next:** Lesson ${Object.keys(progress).find((k) => !progress[parseInt(k)].started) || 1}`}

${lessonLines.join("\n")}

**Resume command:** "I want to continue the MCP course" or use resume_course tool`;

    // Read existing CLAUDE.md and update/insert the Module 3 section
    let existingContent = "";
    try {
      if (fs.existsSync(CLAUDE_MD_FILE)) {
        existingContent = fs.readFileSync(CLAUDE_MD_FILE, "utf-8");
      }
    } catch {}

    // Replace existing Module 3 section or append
    const sectionStart = "## Module 3: MCP Automation Course — Teaching Mode Progress";
    const sectionEnd = /\n## (?!Module 3: MCP)/; // Next ## heading that isn't Module 3

    if (existingContent.includes(sectionStart)) {
      // Replace existing section
      const startIdx = existingContent.indexOf(sectionStart);
      const afterStart = existingContent.substring(startIdx + sectionStart.length);
      const endMatch = afterStart.match(sectionEnd);
      const endIdx = endMatch ? startIdx + sectionStart.length + (endMatch.index || afterStart.length) : existingContent.length;
      existingContent = existingContent.substring(0, startIdx) + mcpSection + "\n\n" + existingContent.substring(endIdx);
    } else if (existingContent.trim()) {
      existingContent = existingContent.trimEnd() + "\n\n" + mcpSection + "\n";
    } else {
      existingContent = `# AI-Native PM — Course Progress\n\nThis file tracks your learning progress across all modules. Claude reads this on startup to resume where you left off.\n\n${mcpSection}\n`;
    }

    fs.writeFileSync(CLAUDE_MD_FILE, existingContent);
  } catch {
    console.error("Could not update CLAUDE.md with progress.");
  }
}

const progress = loadProgress();

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

### Tool definition has 3 parts:
- **Name** — what Claude calls it (e.g. \`jira_create_issue\`)
- **Description** — what it does (Claude reads this to decide when to use it)
- **Input Schema** — what parameters it needs (project key, summary, etc.)`,

  resource: `## What is a Resource in MCP?

A **Resource** is data that Claude can read from an MCP server — like a file or document.

If Tools are actions (verbs), Resources are data (nouns).

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
- **Never use console.log() for debugging** in an MCP server!`,

  oauth: `## What is OAuth?

**OAuth** is how apps get permission to access your data without knowing your password.

### The Valet Key Analogy:
When you valet park, you give the valet a special key that can only start the car — it can't open the trunk. OAuth works the same way:
1. Your app asks Google: "Can I read this user's Sheets?"
2. Google asks YOU: "Do you want to allow this?"
3. You click "Allow"
4. Google gives the app a special token (the valet key)
5. The app uses that token — nothing else

### Key terms:
- **Client ID**: Your app's identity
- **Client Secret**: Your app's password (keep private!)
- **Access Token**: The valet key (expires after ~1 hour)
- **Refresh Token**: A way to get a new access token without asking the user again
- **Scope**: What permissions the token grants`,

  "api-key": `## What is an API Key?

An **API Key** is a simple password that identifies your app to a service.

### How it works:
1. You go to the service's settings (e.g., Jira, Figma)
2. You create an API key/token
3. You include it in every request
4. The service checks the key and lets you in

### API Key vs OAuth:
- **API Key**: Simple, one key for everything, doesn't expire (usually)
- **OAuth**: More complex, specific permissions, tokens expire

### Where each is used:
- **Jira**: API key (Basic auth with email + token)
- **Figma**: API key (Personal Access Token)
- **Google**: OAuth (required by Google)

### Security tip:
Never put API keys in your code! Use environment variables instead.`,

  json: `## What is JSON?

**JSON (JavaScript Object Notation)** is the format APIs use to send and receive data.

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

### Common queries:
- \`project = "MYPROJ"\` — All issues in a project
- \`assignee = currentUser()\` — My issues
- \`status = "In Progress"\` — All in-progress items
- \`sprint in openSprints()\` — Current sprint items
- \`type = Bug AND priority = High\` — High-priority bugs

### For PMs:
JQL is incredibly powerful for automation. You can query "all bugs from last sprint" or "all stories without estimates" and Claude will use this to build reports and action items.`,
};

// ── Branding ──────────────────────────────────────────────────────────────

const BRANDING = "Course by Anmol Gupta — https://www.linkedin.com/in/anmol-gupta-21875a89/";
const BRANDING_LESSONS = [3, 6, 8]; // Show branding after these lessons

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
        "Start an MCP lesson. Returns ONLY the lesson intro (title, objectives, duration) and the FIRST section. Present the content warmly and conversationally, then ask if the student is ready to continue. Do NOT dump all sections at once.",
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
      name: "continue_lesson",
      description:
        "Get the next section of the current lesson. Present ONE section at a time, conversationally. If there is a checkQuestion, ask it and wait for the student's response before continuing. When all sections are done, guide the student to the exercise and then the quiz.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: "The lesson number to continue (1-8)",
            minimum: 1,
            maximum: 8,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "resume_course",
      description:
        "Start or resume teaching mode for the MCP Automation course. When called, it explicitly enters teaching mode, shows course progress, and gives the student the option to continue where they left off or switch to a different lesson. Always use this first when a student says they want to learn, study, or start teaching mode.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "explain_concept",
      description:
        "Get a detailed, PM-friendly explanation of any MCP or API concept. After explaining, guide the student back to their current lesson if they are in the middle of one.",
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
        "Get a hands-on exercise for a specific lesson. Guide the student through the steps ONE at a time, waiting for them to complete each step before presenting the next.",
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
        "See your learning progress with section-level detail — which lessons you've started, how far you are in each, and quiz scores.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "quiz",
      description:
        "Take a quiz to test your understanding of a lesson. Present ONE question at a time, wait for the student's answer, check it, then present the next question. Do NOT show all questions at once.",
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

      // Mark as started, set to first section
      progress[lessonNum].started = true;
      progress[lessonNum].startedAt =
        progress[lessonNum].startedAt || new Date().toISOString();
      progress[lessonNum].currentSection = 1;
      progress[lessonNum].totalSections = lesson.sections.length;
      saveProgress();

      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      const firstSection = lesson.sections[0];

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
                },
                section: {
                  sectionNumber: 1,
                  totalSections: lesson.sections.length,
                  id: firstSection.id,
                  title: firstSection.title,
                  content: firstSection.content,
                  teacherNotes: firstSection.teacherNotes,
                  checkQuestion: firstSection.checkQuestion,
                },
                progressTracker: `Lesson ${lessonNum} of 8 | Section 1 of ${lesson.sections.length} | Course: ${completedCount}/8 complete`,
                teachingGuidance: {
                  tone: "IMPORTANT: Be conversational and brief. Paraphrase the content in your own words — do NOT dump the raw markdown. Keep your response SHORT (under 150 words). Think of this as a friendly conversation, not a lecture.",
                  pacing: "Present ONLY this first section. Do NOT skip ahead. Do NOT include content from other sections.",
                  interaction: firstSection.checkQuestion
                    ? "End your response with the check question. Then STOP and wait for the student to reply."
                    : "End by asking if the student is ready to continue. Then STOP and wait.",
                  continuePrompt: "When the student is ready, use continue_lesson to get the next section.",
                  formatting: "Do NOT reproduce the raw content verbatim. Paraphrase it conversationally. Use short paragraphs. No walls of text.",
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── continue_lesson ─────────────────────────────────────────────────
    case "continue_lesson": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];

      if (!lesson) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                { message: `Lesson ${lessonNum} not found. Available lessons are 1-8.` },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }

      const entry = progress[lessonNum];
      if (!entry.started) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `Lesson ${lessonNum} hasn't been started yet. Use start_lesson first.`,
                  action: "start_lesson",
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const nextSectionIndex = entry.currentSection; // 0-indexed into sections array
      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      // All sections done — guide to exercise
      if (nextSectionIndex >= lesson.sections.length) {
        const showBranding = BRANDING_LESSONS.includes(lessonNum);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: `You've completed all ${lesson.sections.length} sections of Lesson ${lessonNum}: ${lesson.title}!`,
                  nextSteps: [
                    `Try the hands-on exercise: use get_exercise with lesson_number ${lessonNum}`,
                    `Test your knowledge: use quiz with lesson_number ${lessonNum}`,
                    lessonNum < 8
                      ? `Then move to Lesson ${lessonNum + 1}: ${LESSONS[lessonNum + 1]?.title}`
                      : "This was the final lesson! Take the quiz to complete the course.",
                  ],
                  progressTracker: `Lesson ${lessonNum} of 8 | All sections complete | Course: ${completedCount}/8 complete`,
                  ...(showBranding ? { branding: BRANDING } : {}),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Return the next section
      const section = lesson.sections[nextSectionIndex];
      entry.currentSection = nextSectionIndex + 1;
      saveProgress();

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Lesson ${lessonNum}, Section ${nextSectionIndex + 1} of ${lesson.sections.length}`,
                section: {
                  sectionNumber: nextSectionIndex + 1,
                  totalSections: lesson.sections.length,
                  id: section.id,
                  title: section.title,
                  content: section.content,
                  teacherNotes: section.teacherNotes,
                  checkQuestion: section.checkQuestion,
                },
                progressTracker: `Lesson ${lessonNum} of 8 | Section ${nextSectionIndex + 1} of ${lesson.sections.length} | Course: ${completedCount}/8 complete`,
                teachingGuidance: {
                  tone: "IMPORTANT: Be conversational and brief. Paraphrase the content in your own words — do NOT dump the raw markdown. Keep your response SHORT (under 150 words). No walls of text.",
                  pacing: "Present ONLY this section. Do NOT skip ahead. Do NOT include content from other sections.",
                  interaction: section.checkQuestion
                    ? "End your response with the check question. Then STOP and wait for the student to reply."
                    : "End by asking if the student is ready to continue. Then STOP and wait.",
                  continuePrompt: nextSectionIndex + 1 < lesson.sections.length
                    ? "When ready, use continue_lesson to get the next section."
                    : "This is the last section! Guide the student to the exercise next.",
                  formatting: "Do NOT reproduce the raw content verbatim. Paraphrase it conversationally. Use short paragraphs.",
                },
              },
              null,
              2
            ),
          },
        ],
      };
    }

    // ── resume_course ───────────────────────────────────────────────────
    case "resume_course": {
      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;
      const startedCount = Object.values(progress).filter(
        (p) => p.started
      ).length;

      // Find the most recent in-progress lesson
      let currentLesson: number | null = null;
      let currentSectionNum = 0;
      let totalSectionsNum = 0;

      for (let i = 8; i >= 1; i--) {
        if (progress[i].started && !progress[i].completed) {
          currentLesson = i;
          currentSectionNum = progress[i].currentSection;
          totalSectionsNum = progress[i].totalSections;
          break;
        }
      }

      // If nothing in progress, find the next unstarted lesson
      if (currentLesson === null) {
        for (let i = 1; i <= 8; i++) {
          if (!progress[i].started) {
            currentLesson = i;
            break;
          }
        }
      }

      const lessonProgress = Object.entries(progress).map(([num, p]) => ({
        lesson: parseInt(num),
        title: LESSONS[parseInt(num)]?.title || "Unknown",
        duration: LESSONS[parseInt(num)]?.duration || "Unknown",
        status: p.completed
          ? "✅ Completed"
          : p.started
            ? `🔄 In Progress (Section ${p.currentSection} of ${p.totalSections})`
            : "⬜ Not Started",
        quizScore:
          p.quizScore !== null ? `${p.quizScore}%` : "Not taken",
      }));

      if (completedCount === 8) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: "🎓 Welcome to Teaching Mode — MCP Automation Course",
                  mode: "TEACHING MODE ACTIVE",
                  courseStatus: "COMPLETE",
                  summary: {
                    completed: completedCount,
                    totalLessons: 8,
                    percentComplete: 100,
                  },
                  curriculum: lessonProgress,
                  teachingGuidance: {
                    presentation: "IMPORTANT: Present this as an explicit 'Teaching Mode' welcome. Show the full curriculum with status. Congratulate the student on completing the course. Offer options: (A) Review any lesson, (B) Switch to another module's course (Module 1: PRD Generation, Module 4: AI Image Generation). Ask which they'd like to do.",
                    tone: "Celebratory but brief. This is a menu, not a lecture.",
                  },
                  options: [
                    "Review any lesson by number (1-8)",
                    "Switch to Module 1: PRD Generation Course",
                    "Switch to Module 4: AI Image Generation Course",
                  ],
                  branding: BRANDING,
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
                message: "🎓 Welcome to Teaching Mode — MCP Automation Course",
                mode: "TEACHING MODE ACTIVE",
                courseInfo: {
                  name: "MCP Automation for PMs",
                  totalLessons: 8,
                  description: "Learn to build MCP integrations with Jira, Google Drive, Google Sheets, Figma, and any custom API.",
                },
                progress: {
                  completed: completedCount,
                  inProgress: startedCount - completedCount,
                  notStarted: 8 - startedCount,
                  percentComplete: Math.round((completedCount / 8) * 100),
                },
                currentPosition: currentLesson && progress[currentLesson]?.started
                  ? {
                      lesson: currentLesson,
                      title: LESSONS[currentLesson]?.title,
                      section: `${currentSectionNum} of ${totalSectionsNum}`,
                      action: "continue",
                    }
                  : {
                      lesson: currentLesson || 1,
                      title: LESSONS[currentLesson || 1]?.title,
                      action: "start",
                    },
                curriculum: lessonProgress,
                teachingGuidance: {
                  presentation: `IMPORTANT: Present this as an explicit 'Teaching Mode' welcome screen. Show the student their progress and the full curriculum with status emojis. Then offer these options clearly:

${currentLesson && progress[currentLesson]?.started
  ? `(A) **Continue where you left off** — Lesson ${currentLesson}: ${LESSONS[currentLesson]?.title}, Section ${currentSectionNum}/${totalSectionsNum} ← RECOMMENDED`
  : `(A) **Start next lesson** — Lesson ${currentLesson || 1}: ${LESSONS[currentLesson || 1]?.title} ← RECOMMENDED`}
(B) **Jump to a different lesson** — pick any lesson 1-8
(C) **Switch curriculum** — Module 1 (PRD Generation) or Module 4 (AI Image Generation)

Ask which option they'd like. Keep it brief and friendly. This is a menu, not a lecture.`,
                  tone: "Warm, brief, and structured. Show the curriculum as a clean list. End with the options above.",
                  action: currentLesson && progress[currentLesson]?.started
                    ? `Default action: use continue_lesson with lesson_number ${currentLesson}`
                    : `Default action: use start_lesson with lesson_number ${currentLesson || 1}`,
                },
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

      // Find current lesson for "return to lesson" guidance
      let currentLessonNum: number | null = null;
      for (let i = 8; i >= 1; i--) {
        if (progress[i].started && !progress[i].completed) {
          currentLessonNum = i;
          break;
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
                  ...(currentLessonNum
                    ? {
                        returnToLesson: {
                          message: `When you're ready, continue with Lesson ${currentLessonNum}: ${LESSONS[currentLessonNum]?.title}`,
                          action: `Use continue_lesson with lesson_number ${currentLessonNum}`,
                        },
                      }
                    : {}),
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
                ...(currentLessonNum
                  ? {
                      returnToLesson: {
                        message: `When you're ready, continue with Lesson ${currentLessonNum}: ${LESSONS[currentLessonNum]?.title} (Section ${progress[currentLessonNum].currentSection} of ${progress[currentLessonNum].totalSections})`,
                        action: `Use continue_lesson with lesson_number ${currentLessonNum}`,
                      },
                    }
                  : {}),
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
                { message: `Lesson ${lessonNum} not found. Available lessons are 1-8.` },
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
                teachingGuidance: {
                  pacing: "Guide the student through the steps ONE at a time. Wait for them to complete each step before presenting the next.",
                  tone: "Be encouraging. Celebrate small wins.",
                },
                nextSteps: [
                  `When done, take the quiz: use quiz with lesson_number ${lessonNum}`,
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
          ? "Completed"
          : p.started
            ? `In Progress (Section ${p.currentSection} of ${p.totalSections})`
            : "Not Started",
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
                        "Congratulations! You've completed the entire course!",
                        "Try building your own MCP server for a tool you use at work",
                        "Check out the usage-mode templates for production-ready servers",
                      ]
                    : [
                        `Continue with your current lesson`,
                        "Use resume_course to pick up where you left off",
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
                { message: `Lesson ${lessonNum} not found. Available lessons are 1-8.` },
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
      saveProgress();

      const completedCount = Object.values(progress).filter(
        (p) => p.completed
      ).length;

      const showBranding = BRANDING_LESSONS.includes(lessonNum);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: `Quiz: Lesson ${lessonNum} — ${lesson.title}`,
                teachingGuidance: {
                  pacing: "Present ONE question at a time. Wait for the student's answer, then reveal if they were correct with the explanation. Then present the next question.",
                  tone: "Be encouraging whether they get it right or wrong. The explanation is the learning moment.",
                },
                questions: lesson.quiz.questions.map((q, i) => ({
                  questionNumber: i + 1,
                  question: q.question,
                  options: q.options.map(
                    (opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`
                  ),
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
                        "You've completed all lessons!",
                        "Use check_progress to see your final progress",
                      ],
                ...(showBranding ? { branding: BRANDING } : {}),
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
                  "continue_lesson",
                  "resume_course",
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
