#!/usr/bin/env node

/**
 * Rollout Plan Generator Teacher Mode Server
 *
 * An interactive MCP server that teaches Product Managers how to build
 * comprehensive rollout plans using AI as a co-pilot. 6 lessons covering
 * risk assessment, stakeholder mapping, timeline generation, rollback
 * planning, and end-to-end workflow.
 *
 * Tools:
 *   start_lesson    — Begin a specific lesson (returns first section only)
 *   continue_lesson — Get the next section of the current lesson
 *   resume_course   — Resume after restarting Claude Code
 *   explain_concept — Deep-dive explanation of any rollout concept
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
import lesson2 from "./lessons/2-risk-assessment.js";
import lesson3 from "./lessons/3-stakeholder-mapping.js";
import lesson4 from "./lessons/4-timeline-generation.js";
import lesson5 from "./lessons/5-rollback-planning.js";
import lesson6 from "./lessons/6-putting-it-together.js";

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
  "rollout-plan": `## What is a Rollout Plan?

A **rollout plan** is a structured document that defines how you'll ship a feature safely — from internal testing through full production deployment.

### Key sections:
- **Rollout strategy** — Phased deployment sequence (canary, gradual, full)
- **Risk assessment** — What could go wrong and how you'll mitigate it
- **Stakeholder map** — Who's involved, who decides, who needs to know
- **Timeline** — Dependency-aware schedule with milestones
- **Rollback plan** — Step-by-step procedure for reversing the deployment
- **Success metrics** — How you'll know the launch worked
- **Communication plan** — Right message, right person, right time

A good rollout plan turns "we'll figure it out" into "we've already figured it out."`,

  "risk-matrix": `## Risk Matrix

A **risk matrix** is a structured tool for evaluating risks based on two dimensions: **likelihood** (how probable) and **impact** (how severe).

### The Priority Grid:
|  | Low Impact | Medium Impact | High Impact |
|--|-----------|---------------|-------------|
| **High Likelihood** | Monitor | Mitigate | Must Mitigate |
| **Medium Likelihood** | Accept | Monitor | Mitigate |
| **Low Likelihood** | Accept | Accept | Monitor |

### For each risk, document:
- **Risk name** — specific, not generic
- **Category** — technical, user adoption, timeline, organizational, compliance
- **Likelihood** — Low / Medium / High
- **Impact** — Low / Medium / High
- **Mitigation** — specific action with an owner
- **Owner** — one person (not a team)`,

  raci: `## RACI Framework

RACI is a responsibility assignment matrix:
- **R (Responsible)** — Does the work
- **A (Accountable)** — Owns the outcome (exactly ONE per task)
- **C (Consulted)** — Provides input before a decision
- **I (Informed)** — Needs to know about the outcome

### Rules:
- Every task has exactly ONE Accountable person
- If everyone is Accountable, nobody is Accountable
- If nobody is Informed, somebody will be surprised

### Common PM mistake:
Assigning a team as Accountable. "Backend team is accountable" means nobody is accountable. "Mike (Backend Lead) is accountable" means Mike is accountable.`,

  "critical-path": `## Critical Path

The **critical path** is the longest chain of dependent tasks in your timeline. It determines the minimum possible duration of your project.

### Why it matters:
- Any delay on the critical path delays the ENTIRE project
- Tasks NOT on the critical path have "float" (slack time)
- Buffer should be concentrated on critical path tasks

### Example:
Design Review (3d) → Backend API (10d) → Integration (3d) → QA (5d) → Launch
Total: 21 days (this is your minimum timeline)

Frontend UI (8d) runs in parallel — it has 13 days of float.

### Managing it:
1. Identify it early
2. Add 20-30% buffer to critical path tasks
3. Staff your strongest people on critical path work
4. Monitor weekly — the critical path can change`,

  "rollback-triggers": `## Rollback Triggers

A **rollback trigger** is a specific, measurable condition that activates your rollback procedure.

### The formula:
[Metric] [exceeds/drops below] [threshold] for [duration]

### Examples:
- Error rate > 2% for 15 consecutive minutes
- p95 latency > 2 seconds for 10 minutes
- DAU drops > 3% day-over-day
- Any data loss (zero-tolerance — immediate rollback)

### The 3-tier approach:
- **Tier 1 (Immediate):** Data loss, security breach → auto-rollback
- **Tier 2 (15-minute window):** Error rate spike → manual decision
- **Tier 3 (24-hour window):** DAU drop → evaluate and decide

### Anti-patterns:
- "If things go wrong" — not actionable
- "If the VP says so" — not data-driven
- "If users complain" — too late`,

  "feature-flags": `## Feature Flags for Rollouts

Feature flags let you deploy code to production without exposing it to users. They're the safest rollout mechanism.

### Rollout pattern:
1. Deploy code with feature flag OFF
2. Enable for internal team (dogfooding)
3. Enable for 5% of users (canary)
4. Ramp: 5% → 25% → 50% → 100%
5. Remove the flag after full rollout

### Why feature flags are great for rollouts:
- **Instant rollback** — toggle the flag OFF (seconds, not minutes)
- **Gradual exposure** — control exactly who sees the feature
- **Independent of deployment** — deploy code without activating it
- **A/B testing** — compare metrics between flag-on and flag-off users

### Common tools: LaunchDarkly, Split, Statsig, Unleash`,

  "phased-rollout": `## Phased Rollout Strategy

A phased rollout gradually expands the audience for a new feature, reducing blast radius.

### Standard 4-phase rollout:
1. **Internal testing** — Your team uses it for 3-5 days
2. **Canary (1-5%)** — Small random sample of real users
3. **Gradual (25% → 50%)** — Expanding with monitoring at each stage
4. **Full launch (100%)** — Everyone gets it

### Key rules:
- Minimum 48 hours between phases for monitoring
- Each phase has explicit go/no-go criteria
- Canary users should be representative (not just power users)
- Have rollback ready at every phase

### When to use fewer phases:
- Low-risk UI changes
- Internal tools with small user base
- Bug fixes that need fast deployment`,
};

// ── Branding ──────────────────────────────────────────────────────────────

const BRANDING = "Course by Anmol Gupta — https://www.linkedin.com/in/anmol-gupta-21875a89/";
const BRANDING_LESSONS = [3, 6];

// ── Server Setup ──────────────────────────────────────────────────────────

const server = new Server(
  { name: "rollout-teacher-mode", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "start_lesson",
      description:
        "Start a Rollout Planning course lesson. Returns ONLY the lesson intro and the FIRST section. Present the content warmly and conversationally, then ask if the student is ready to continue. Do NOT dump all sections at once.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `Lesson number (1-${TOTAL_LESSONS}): 1=Welcome, 2=Risk Assessment, 3=Stakeholder Mapping, 4=Timeline Generation, 5=Rollback Planning, 6=Putting It Together`,
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
        "Resume the Rollout Planning course after restarting Claude Code. Shows exactly where you left off and lets you continue.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "explain_concept",
      description:
        "Get a detailed, PM-friendly explanation of any rollout planning concept. After explaining, guide the student back to their current lesson.",
      inputSchema: {
        type: "object" as const,
        properties: {
          concept: {
            type: "string",
            description:
              'The concept to explain. Examples: "rollout-plan", "risk-matrix", "raci", "critical-path", "rollback-triggers", "feature-flags", "phased-rollout"',
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
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: "Welcome back! You've completed the entire Rollout Planning Course!", summary: { completed: completedCount, totalLessons: TOTAL_LESSONS, percentComplete: 100 }, lessons: lessonProgress, branding: BRANDING }, null, 2) }] };
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
        message: "Your Rollout Planning Course Progress",
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
  console.error("Rollout Teacher Mode server running — ready to teach!");
}

main().catch(console.error);
