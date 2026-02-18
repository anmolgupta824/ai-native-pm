#!/usr/bin/env node

/**
 * AI Image Generation Teacher Mode Server
 *
 * An interactive MCP server that teaches Product Managers how to generate
 * images with DALL-E for mockups, presentations, and marketing assets.
 * 6 lessons covering setup, prompt fundamentals, product mockups,
 * presentation visuals, social media assets, and advanced techniques.
 *
 * Tools:
 *   start_lesson    — Begin a specific lesson (returns first section only)
 *   continue_lesson — Get the next section of the current lesson
 *   resume_course   — Resume after restarting Claude Code
 *   explain_concept — Deep-dive explanation of any image generation concept
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
import lesson2 from "./lessons/2-prompt-fundamentals.js";
import lesson3 from "./lessons/3-product-mockups.js";
import lesson4 from "./lessons/4-presentation-visuals.js";
import lesson5 from "./lessons/5-social-media-assets.js";
import lesson6 from "./lessons/6-advanced-techniques.js";

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
  "dall-e": `## What is DALL-E?

**DALL-E** is OpenAI's image generation AI model. It creates images from text descriptions (prompts).

### Key facts:
- **DALL-E 3** is the current version (used by this module)
- Creates images in three sizes: 1024x1024, 1792x1024, 1024x1792
- Costs ~$0.04 per standard image, ~$0.08 per HD image
- Accessed via the OpenAI API with an API key

### For PMs:
DALL-E is useful when you need visuals faster than your design team can deliver — mockups for PRDs, graphics for presentations, assets for social media.`,

  "prompt-engineering": `## Prompt Engineering for Images

Image prompts work differently from text prompts. The four components of a great image prompt:

### 1. Subject — What to generate
"A mobile app dashboard", "A team collaboration scene"

### 2. Style — Visual treatment
"Flat design", "Realistic", "Minimal illustration", "Corporate infographic"

### 3. Composition — Layout and framing
"Centered", "Split-view", "Top-down", "Wide landscape format"

### 4. Details — Specific elements
"Showing 3 metric cards", "Blue and gray color palette", "White background"

### The formula:
[Subject] + [Style] + [Composition] + [Details] = Great image`,

  "image-styles": `## Image Styles for PM Work

### Flat Design
Clean, minimal, no shadows or gradients. Great for mockups and icons.

### Infographic Style
Data-focused, clean charts and diagrams. Great for presentations.

### Corporate Illustration
Professional, polished, muted tones. Great for decks and reports.

### Bold / Social Media
High contrast, vibrant colors, eye-catching. Great for LinkedIn and Instagram.

### Concept Art
Abstract, metaphorical, thought-provoking. Great for blog posts and thought leadership.`,

  "mockups": `## Product Mockups with AI

AI-generated mockups are not pixel-perfect UI designs. They are **communication tools** — visuals that help stakeholders understand what you are proposing.

### Best for:
- Quick concept visuals in PRDs
- Stakeholder alignment before design begins
- Exploring visual directions

### Not for:
- Final production assets
- Pixel-perfect UI specifications
- Design handoff to engineers

### Prompt pattern:
"A [device] screen showing [feature] with [specific elements]. [Style] design, [color palette]."`,

  "asset-packs": `## Asset Packs

An asset pack is a coordinated set of 4 related images that share a consistent visual style.

### Types:
- **Social campaign** — Announcement, feature highlight, testimonial, CTA
- **Presentation set** — Title, problem, solution, results slides
- **Icon set** — 4 matching icons for features or categories
- **Feature highlights** — Main value, speed, collaboration, results

### Why packs matter:
Individual images generated one at a time often look inconsistent. Packs use shared style instructions for visual coherence.`,

  "text-in-images": `## Text in AI-Generated Images

DALL-E often renders text inaccurately — misspelled words, garbled letters, wrong fonts.

### Best practice:
1. Generate the image WITHOUT text
2. Add text overlays manually in Canva, Figma, or any image editor
3. Use placeholder text ("Lorem ipsum") in prompts if you need text areas

### Exception:
Single short words (1-3 characters) sometimes render correctly. But rely on manual text overlay for anything important.`,

  "api-key": `## OpenAI API Key Setup

### Getting your key:
1. Go to platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (starts with "sk-")

### Setting it up:
Mac/Linux: \`export OPENAI_API_KEY="sk-your-key-here"\`
Add to ~/.zshrc or ~/.bashrc to make permanent.

### Costs:
- Standard image: ~$0.04
- HD image: ~$0.08
- Typical session (10-20 images): $0.40-$1.60

### Usage limits:
Check at platform.openai.com/usage`,
};

// ── Branding ──────────────────────────────────────────────────────────────

const BRANDING = "Course by Anmol Gupta — https://www.linkedin.com/in/anmol-gupta-21875a89/";
const BRANDING_LESSONS = [3, 6];

// ── Server Setup ──────────────────────────────────────────────────────────

const server = new Server(
  { name: "image-gen-teacher-mode", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// ── Tool Definitions ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "start_lesson",
      description:
        "Start an Image Generation course lesson. Returns ONLY the lesson intro and the FIRST section. Present the content warmly and conversationally, then ask if the student is ready to continue. Do NOT dump all sections at once.",
      inputSchema: {
        type: "object" as const,
        properties: {
          lesson_number: {
            type: "number",
            description: `Lesson number (1-${TOTAL_LESSONS}): 1=Welcome & Setup, 2=Prompt Fundamentals, 3=Product Mockups, 4=Presentation Visuals, 5=Social Media Assets, 6=Advanced Techniques`,
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
        "Resume the Image Generation course after restarting Claude Code. Shows exactly where you left off and lets you continue.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "explain_concept",
      description:
        "Get a detailed, PM-friendly explanation of any image generation concept. After explaining, guide the student back to their current lesson.",
      inputSchema: {
        type: "object" as const,
        properties: {
          concept: {
            type: "string",
            description:
              'The concept to explain. Examples: "dall-e", "prompt-engineering", "image-styles", "mockups", "asset-packs", "text-in-images", "api-key"',
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
          teachingGuidance: { tone: "IMPORTANT: Be conversational and brief. Paraphrase the content — do NOT dump raw markdown. Keep response SHORT (under 150 words). No walls of text.", pacing: "Present ONLY this first section. Do NOT skip ahead.", interaction: firstSection.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: "When ready, use continue_lesson.", formatting: "Do NOT reproduce content verbatim. Paraphrase conversationally." },
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
          teachingGuidance: { tone: "IMPORTANT: Be conversational and brief. Paraphrase — do NOT dump raw markdown. Keep response SHORT (under 150 words). No walls of text.", pacing: "Present ONLY this section. Do NOT skip ahead.", interaction: section.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: nextSectionIndex + 1 < lesson.sections.length ? "Use continue_lesson for the next section." : "Last section! Guide to the exercise next.", formatting: "Do NOT reproduce content verbatim. Paraphrase conversationally." },
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
        return { content: [{ type: "text" as const, text: JSON.stringify({ message: "Welcome back! You've completed the entire AI Image Generation Course!", summary: { completed: completedCount, totalLessons: TOTAL_LESSONS, percentComplete: 100 }, lessons: lessonProgress, branding: BRANDING }, null, 2) }] };
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
        message: "Your Image Generation Course Progress",
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
  console.error("Image Generation Teacher Mode server running — ready to teach!");
}

main().catch(console.error);
