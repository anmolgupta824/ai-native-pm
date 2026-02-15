#!/usr/bin/env node

/**
 * PRD Generator Teacher Mode Server
 *
 * An interactive MCP server that teaches Product Managers how to write
 * production-ready PRDs using AI as a thinking partner. 6 lessons covering
 * context loading, Socratic questioning, PRD generation, validation,
 * multi-perspective review, and edge case analysis.
 *
 * Tools:
 *   start_lesson    — Begin a specific lesson (returns first section only)
 *   continue_lesson — Get the next section of the current lesson
 *   resume_course   — Resume after restarting Claude Code
 *   explain_concept — Deep-dive explanation of any PRD concept
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
import lesson2 from "./lessons/2-context-questioning.js";
import lesson3 from "./lessons/3-prd-structure.js";
import lesson4 from "./lessons/4-generating-validating.js";
import lesson5 from "./lessons/5-multi-perspective-review.js";
import lesson6 from "./lessons/6-edge-cases-polish.js";

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
};

const TOTAL_LESSONS = 6;

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

function loadProgress(): Record<number, ProgressEntry> {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    console.error("Could not load progress file, starting fresh.");
  }

  const defaultProgress: Record<number, ProgressEntry> = {};
  for (let i = 1; i <= TOTAL_LESSONS; i++) {
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
}

const progress = loadProgress();

// ── Concept Explanations ──────────────────────────────────────────────────

const CONCEPTS: Record<string, string> = {
  prd: `## What is a PRD?

A **PRD (Product Requirements Document)** is the single source of truth for what you're building, why, and how you'll know it worked.

A good PRD aligns engineering, design, QA, and leadership on scope, requirements, and success criteria BEFORE development begins.

### Sections of a PRD:
- **Overview** — The elevator pitch
- **Problem Statement** — Why this matters, with evidence
- **Goals & Success Metrics** — How you'll measure success
- **User Stories** — Who benefits and how
- **Requirements** — What to build
- **Edge Cases** — What could go wrong
- **Risks & Mitigations** — What could derail this
- **Launch Plan** — How to ship it safely`,

  "socratic-questioning": `## Socratic Questioning for PRDs

Socratic questioning is a technique where you ask probing questions to deepen understanding and surface assumptions.

### The Five Categories:
1. **Problem Clarity** — "Who exactly is affected? How do you know?"
2. **Solution Validation** — "What alternatives did you consider?"
3. **Success Criteria** — "How will you know this worked?"
4. **Constraints** — "What can't change? What dependencies exist?"
5. **Strategic Fit** — "How does this connect to company OKRs?"

### Why it works:
If you can't answer a question clearly in conversation, you can't write it clearly in a PRD. The struggle is the signal.`,

  "success-metrics": `## Writing Good Success Metrics

A good success metric is **specific, measurable, and falsifiable**.

### Bad metrics:
- "Improve user experience"
- "Increase engagement"
- "Make it faster"

### Good metrics:
- "Increase 24-hour notification read rate from 45% to 80%"
- "Reduce checkout abandonment from 67% to 50% within 3 months"
- "Decrease average page load time from 3.2s to under 1.5s"

### The formula:
[What metric] from [baseline] to [target] within [timeframe]

If you don't know the baseline, that's your first task — measure it before you set a target.`,

  "edge-cases": `## Edge Cases in PRDs

Edge cases are scenarios that happen at the boundaries of normal behavior. They're the "what ifs" that engineers find during implementation — finding them first earns trust.

### Categories:
- **User edge cases** — Empty state, very long text, special characters
- **System edge cases** — No internet, slow connection, expired session
- **Data edge cases** — Concurrent edits, missing data, migration from old format
- **Scale edge cases** — 10x traffic, large data sets, many concurrent users

### Format in PRDs:
**Edge case:** User's session expires during checkout.
**Response:** Save cart to local storage, prompt re-auth, restore cart.`,

  "review-perspectives": `## Multi-Perspective PRD Review

Three perspectives that catch different issues:

### Engineering Lead
Focuses on: technical feasibility, scalability, dependencies, security, timeline realism.
Catches: "This won't scale," "There's a dependency you haven't considered."

### Design Lead
Focuses on: user experience, accessibility, consistency, user research.
Catches: "The user flow has too many steps," "This doesn't meet accessibility standards."

### QA Lead
Focuses on: testability, acceptance criteria, edge cases, regression risk.
Catches: "I can't test this requirement," "This will break existing feature X."`,

  "at-mentions": `## @-Mentions in Claude Code

@-mentions let you reference files directly in your conversation with Claude. This gives Claude access to the full contents of those files.

### Best practices:
- Reference 3-5 relevant files (not your entire codebase)
- Include: strategy docs, user research, architecture docs
- Don't include: meeting notes, unrelated PRDs, entire codebases

### Example:
\`\`\`
@product-strategy.md @user-research-q4.md @api-architecture.md

I need to write a PRD for a new notifications center.
\`\`\`

This gives Claude product-specific context for sharper questions and output.`,

  validation: `## PRD Validation

The validate_prd tool checks your PRD for 10 critical elements:
1. Problem statement
2. Success metrics
3. User stories
4. Requirements
5. Edge cases
6. Timeline
7. Risks
8. Stakeholders
9. Rollout plan
10. Open questions

### Grades:
- **A (90-100%)** — Ready to share
- **B (80-89%)** — Solid, minor polish needed
- **C (60-79%)** — Missing critical sections
- **D (<60%)** — Major gaps, go back to questioning

A Grade B is good enough to share. Don't chase perfection.`,
};

// ── Branding ──────────────────────────────────────────────────────────────

const BRANDING = "Course by Anmol Gupta — https://www.linkedin.com/in/anmol-gupta-21875a89/";
const BRANDING_LESSONS = [3, 6];

// ── Server Setup ──────────────────────────────────────────────────────────

const server = new Server(
  { name: "prd-teacher-mode", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "start_lesson",
      description:
        "Start a PRD course lesson. Returns ONLY the lesson intro and the FIRST section. Present the content warmly and conversationally, then ask if the student is ready to continue. Do NOT dump all sections at once.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `Lesson number (1-${TOTAL_LESSONS}): 1=Welcome, 2=Context & Questioning, 3=PRD Structure, 4=Generating & Validating, 5=Multi-Perspective Review, 6=Edge Cases & Polish`,
            minimum: 1,
            maximum: TOTAL_LESSONS,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "continue_lesson",
      description:
        "Get the next section of the current lesson. Present ONE section at a time, conversationally. If there is a checkQuestion, ask it and wait for the student's response before continuing.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `The lesson number to continue (1-${TOTAL_LESSONS})`,
            minimum: 1,
            maximum: TOTAL_LESSONS,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "resume_course",
      description:
        "Resume the PRD course after restarting Claude Code. Shows exactly where you left off and lets you continue.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "explain_concept",
      description:
        "Get a detailed, PM-friendly explanation of any PRD or product management concept. After explaining, guide the student back to their current lesson.",
      inputSchema: {
        type: "object" as const,
        properties: {
          concept: {
            type: "string",
            description:
              'The concept to explain. Examples: "prd", "socratic-questioning", "success-metrics", "edge-cases", "review-perspectives", "at-mentions", "validation"',
          },
        },
        required: ["concept"],
      },
    },
    {
      name: "get_exercise",
      description:
        "Get a hands-on exercise for a specific lesson. Guide the student through the steps ONE at a time.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `The lesson number (1-${TOTAL_LESSONS}) to get an exercise for`,
            minimum: 1,
            maximum: TOTAL_LESSONS,
          },
        },
        required: ["lesson_number"],
      },
    },
    {
      name: "check_progress",
      description:
        "See your learning progress — which lessons you've started, how far you are in each, and quiz scores.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "quiz",
      description:
        "Take a quiz to test understanding. Present ONE question at a time, wait for the answer, then present the next.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `The lesson number (1-${TOTAL_LESSONS}) to take a quiz for`,
            minimum: 1,
            maximum: TOTAL_LESSONS,
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
    case "start_lesson": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];
      if (!lesson) {
        return {
          content: [{ type: "text" as const, text: JSON.stringify({ message: `Lesson ${lessonNum} not found. Available: 1-${TOTAL_LESSONS}.`, availableLessons: Object.entries(LESSONS).map(([num, l]) => ({ number: parseInt(num), title: l.title, duration: l.duration })) }, null, 2) }],
          isError: true,
        };
      }

      progress[lessonNum].started = true;
      progress[lessonNum].startedAt = progress[lessonNum].startedAt || new Date().toISOString();
      progress[lessonNum].currentSection = 1;
      progress[lessonNum].totalSections = lesson.sections.length;
      saveProgress();

      const completedCount = Object.values(progress).filter((p) => p.completed).length;
      const firstSection = lesson.sections[0];

      return {
        content: [{ type: "text" as const, text: JSON.stringify({
          message: `Starting Lesson ${lessonNum}: ${lesson.title}`,
          lesson: { number: lesson.number, title: lesson.title, duration: lesson.duration, objectives: lesson.objectives },
          section: { sectionNumber: 1, totalSections: lesson.sections.length, id: firstSection.id, title: firstSection.title, content: firstSection.content, teacherNotes: firstSection.teacherNotes, checkQuestion: firstSection.checkQuestion },
          progressTracker: `Lesson ${lessonNum} of ${TOTAL_LESSONS} | Section 1 of ${lesson.sections.length} | Course: ${completedCount}/${TOTAL_LESSONS} complete`,
          teachingGuidance: { tone: "Be conversational and encouraging.", pacing: "Present ONLY this first section.", interaction: firstSection.checkQuestion ? "After presenting, ask the check question and wait." : "After presenting, ask if the student is ready to continue.", continuePrompt: "When ready, use continue_lesson." },
        }, null, 2) }],
      };
    }

    case "continue_lesson": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];
      if (!lesson) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Lesson ${lessonNum} not found.` }, null, 2) }], isError: true };
      }

      const entry = progress[lessonNum];
      if (!entry.started) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Lesson ${lessonNum} not started yet. Use start_lesson first.` }, null, 2) }] };
      }

      const nextSectionIndex = entry.currentSection;
      const completedCount = Object.values(progress).filter((p) => p.completed).length;

      if (nextSectionIndex >= lesson.sections.length) {
        const showBranding = BRANDING_LESSONS.includes(lessonNum);
        return {
          content: [{ type: "text" as const, text: JSON.stringify({
            message: `All ${lesson.sections.length} sections of Lesson ${lessonNum} complete!`,
            nextSteps: [
              `Try the exercise: use get_exercise with lesson_number ${lessonNum}`,
              `Test your knowledge: use quiz with lesson_number ${lessonNum}`,
              lessonNum < TOTAL_LESSONS ? `Then Lesson ${lessonNum + 1}: ${LESSONS[lessonNum + 1]?.title}` : "This was the final lesson! Take the quiz to complete the course.",
            ],
            progressTracker: `Lesson ${lessonNum} of ${TOTAL_LESSONS} | All sections complete | Course: ${completedCount}/${TOTAL_LESSONS} complete`,
            ...(showBranding ? { branding: BRANDING } : {}),
          }, null, 2) }],
        };
      }

      const section = lesson.sections[nextSectionIndex];
      entry.currentSection = nextSectionIndex + 1;
      saveProgress();

      return {
        content: [{ type: "text" as const, text: JSON.stringify({
          message: `Lesson ${lessonNum}, Section ${nextSectionIndex + 1} of ${lesson.sections.length}`,
          section: { sectionNumber: nextSectionIndex + 1, totalSections: lesson.sections.length, id: section.id, title: section.title, content: section.content, teacherNotes: section.teacherNotes, checkQuestion: section.checkQuestion },
          progressTracker: `Lesson ${lessonNum} of ${TOTAL_LESSONS} | Section ${nextSectionIndex + 1} of ${lesson.sections.length} | Course: ${completedCount}/${TOTAL_LESSONS} complete`,
          teachingGuidance: { pacing: "Present ONLY this section.", interaction: section.checkQuestion ? "Ask the check question and wait." : "Ask if ready to continue.", continuePrompt: nextSectionIndex + 1 < lesson.sections.length ? "Use continue_lesson for the next section." : "Last section! Guide to the exercise next." },
        }, null, 2) }],
      };
    }

    case "resume_course": {
      const completedCount = Object.values(progress).filter((p) => p.completed).length;
      const startedCount = Object.values(progress).filter((p) => p.started).length;

      let currentLesson: number | null = null;
      let currentSectionNum = 0;
      let totalSectionsNum = 0;

      for (let i = TOTAL_LESSONS; i >= 1; i--) {
        if (progress[i].started && !progress[i].completed) {
          currentLesson = i;
          currentSectionNum = progress[i].currentSection;
          totalSectionsNum = progress[i].totalSections;
          break;
        }
      }

      if (currentLesson === null) {
        for (let i = 1; i <= TOTAL_LESSONS; i++) {
          if (!progress[i].started) { currentLesson = i; break; }
        }
      }

      const lessonProgress = Object.entries(progress).map(([num, p]) => ({
        lesson: parseInt(num),
        title: LESSONS[parseInt(num)]?.title || "Unknown",
        status: p.completed ? "Completed" : p.started ? `In Progress (Section ${p.currentSection} of ${p.totalSections})` : "Not Started",
        quizScore: p.quizScore !== null ? `${p.quizScore}%` : "Not taken",
      }));

      if (completedCount === TOTAL_LESSONS) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: "Welcome back! You've completed the entire PRD Generation Course!", summary: { completed: completedCount, totalLessons: TOTAL_LESSONS, percentComplete: 100 }, lessons: lessonProgress, branding: BRANDING }, null, 2) }] };
      }

      return {
        content: [{ type: "text" as const, text: JSON.stringify({
          message: currentLesson && progress[currentLesson]?.started
            ? `Welcome back! You were on Lesson ${currentLesson}: ${LESSONS[currentLesson]?.title}, Section ${currentSectionNum} of ${totalSectionsNum}. Say "continue" to pick up where you left off.`
            : `Welcome back! Ready for Lesson ${currentLesson || 1}: ${LESSONS[currentLesson || 1]?.title}.`,
          currentLesson: currentLesson || 1, currentSection: currentSectionNum, totalSections: totalSectionsNum,
          summary: { completed: completedCount, inProgress: startedCount - completedCount, notStarted: TOTAL_LESSONS - startedCount, totalLessons: TOTAL_LESSONS, percentComplete: Math.round((completedCount / TOTAL_LESSONS) * 100) },
          lessons: lessonProgress,
          teachingGuidance: { action: currentLesson && progress[currentLesson]?.started ? `Use continue_lesson with lesson_number ${currentLesson}.` : `Use start_lesson with lesson_number ${currentLesson || 1}.` },
        }, null, 2) }],
      };
    }

    case "explain_concept": {
      const concept = (args?.concept as string)?.toLowerCase().trim();
      if (!concept) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: "Please provide a concept.", availableConcepts: Object.keys(CONCEPTS) }, null, 2) }], isError: true };
      }

      let explanation = CONCEPTS[concept];
      if (!explanation) {
        const match = Object.keys(CONCEPTS).find((k) => k.includes(concept) || concept.includes(k));
        if (match) explanation = CONCEPTS[match];
      }

      let currentLessonNum: number | null = null;
      for (let i = TOTAL_LESSONS; i >= 1; i--) {
        if (progress[i].started && !progress[i].completed) { currentLessonNum = i; break; }
      }

      if (!explanation) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: `No pre-written explanation for "${concept}". Available:`, availableConcepts: Object.keys(CONCEPTS), suggestion: "Ask Claude directly about this concept.", ...(currentLessonNum ? { returnToLesson: { message: `Continue with Lesson ${currentLessonNum}: ${LESSONS[currentLessonNum]?.title}`, action: `Use continue_lesson with lesson_number ${currentLessonNum}` } } : {}) }, null, 2) }] };
      }

      return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Explanation: ${concept}`, explanation, ...(currentLessonNum ? { returnToLesson: { message: `Continue Lesson ${currentLessonNum}: ${LESSONS[currentLessonNum]?.title} (Section ${progress[currentLessonNum].currentSection} of ${progress[currentLessonNum].totalSections})`, action: `Use continue_lesson with lesson_number ${currentLessonNum}` } } : {}) }, null, 2) }] };
    }

    case "get_exercise": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];
      if (!lesson) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Lesson ${lessonNum} not found.` }, null, 2) }], isError: true };
      }
      return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Exercise for Lesson ${lessonNum}: ${lesson.title}`, exercise: lesson.exercise, teachingGuidance: { pacing: "Guide through steps ONE at a time.", tone: "Be encouraging." }, nextSteps: [`Take the quiz: use quiz with lesson_number ${lessonNum}`] }, null, 2) }] };
    }

    case "check_progress": {
      const lessonProgress = Object.entries(progress).map(([num, p]) => ({
        lesson: parseInt(num), title: LESSONS[parseInt(num)]?.title || "Unknown", duration: LESSONS[parseInt(num)]?.duration || "Unknown",
        status: p.completed ? "Completed" : p.started ? `In Progress (Section ${p.currentSection} of ${p.totalSections})` : "Not Started",
        quizScore: p.quizScore !== null ? `${p.quizScore}%` : "Not taken",
      }));
      const completedCount = Object.values(progress).filter((p) => p.completed).length;
      const startedCount = Object.values(progress).filter((p) => p.started).length;

      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: "Your PRD Course Progress",
        summary: { completed: completedCount, inProgress: startedCount - completedCount, notStarted: TOTAL_LESSONS - startedCount, totalLessons: TOTAL_LESSONS, percentComplete: Math.round((completedCount / TOTAL_LESSONS) * 100) },
        lessons: lessonProgress,
      }, null, 2) }] };
    }

    case "quiz": {
      const lessonNum = args?.lesson_number as number;
      const lesson = LESSONS[lessonNum];
      if (!lesson) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Lesson ${lessonNum} not found.` }, null, 2) }], isError: true };
      }

      progress[lessonNum].completed = true;
      progress[lessonNum].completedAt = new Date().toISOString();
      saveProgress();

      const completedCount = Object.values(progress).filter((p) => p.completed).length;
      const showBranding = BRANDING_LESSONS.includes(lessonNum);

      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: `Quiz: Lesson ${lessonNum} — ${lesson.title}`,
        teachingGuidance: { pacing: "Present ONE question at a time. Wait for answer, then explain.", tone: "Be encouraging whether right or wrong." },
        questions: lesson.quiz.questions.map((q, i) => ({
          questionNumber: i + 1, question: q.question,
          options: q.options.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`),
          correctAnswer: `${String.fromCharCode(65 + q.correctIndex)}. ${q.options[q.correctIndex]}`,
          explanation: q.explanation,
        })),
        totalQuestions: lesson.quiz.questions.length,
        progress: { completedLessons: completedCount, totalLessons: TOTAL_LESSONS, percentComplete: Math.round((completedCount / TOTAL_LESSONS) * 100) },
        nextSteps: lessonNum < TOTAL_LESSONS
          ? [`Move to Lesson ${lessonNum + 1}: ${LESSONS[lessonNum + 1]?.title}`]
          : ["You've completed all lessons! Use check_progress to see your final results."],
        ...(showBranding ? { branding: BRANDING } : {}),
      }, null, 2) }] };
    }

    default:
      return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Unknown tool: ${name}`, availableTools: ["start_lesson", "continue_lesson", "resume_course", "explain_concept", "get_exercise", "check_progress", "quiz"] }, null, 2) }], isError: true };
  }
});

// ── Start Server ──────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("PRD Teacher Mode server running — ready to teach!");
}

main().catch(console.error);
