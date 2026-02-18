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
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";

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

// ── Generated Images Directory ───────────────────────────────────────────

const GENERATED_IMAGES_DIR = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "..", "..", "generated-images"
);

function saveAndOpenImage(imageBuffer: Buffer, descriptiveName: string): string {
  if (!fs.existsSync(GENERATED_IMAGES_DIR)) {
    fs.mkdirSync(GENERATED_IMAGES_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const safeName = descriptiveName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
  const filename = `${safeName}-${timestamp}.png`;
  const filepath = path.join(GENERATED_IMAGES_DIR, filename);

  fs.writeFileSync(filepath, imageBuffer);

  // Auto-open on macOS (fire-and-forget)
  exec(`open "${filepath}"`, (err) => {
    if (err) console.error(`Could not auto-open image: ${err.message}`);
  });

  return filepath;
}

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

// ── Image Generation Types & Constants ────────────────────────────────────

interface ImageStyle {
  name: string;
  description: string;
  styleKeywords: string;
  bestFor: string[];
  defaultSize: string;
}

const IMAGE_STYLES: Record<string, ImageStyle> = {
  "product-mockup": {
    name: "Product Mockup",
    description: "Clean UI/UX mockups for app screens, dashboards, and feature previews",
    styleKeywords: "clean UI design, flat design, minimal, modern SaaS aesthetic, white background, professional interface mockup",
    bestFor: ["PRDs", "feature specs", "design briefs", "stakeholder presentations"],
    defaultSize: "1024x1024",
  },
  "presentation": {
    name: "Presentation Visual",
    description: "Illustrations and graphics for slide decks and stakeholder presentations",
    styleKeywords: "professional illustration, corporate presentation style, clean infographic, polished, business context",
    bestFor: ["pitch decks", "all-hands slides", "quarterly reviews", "board presentations"],
    defaultSize: "1792x1024",
  },
  "social-media": {
    name: "Social Media Asset",
    description: "Bold graphics for LinkedIn, Instagram, Twitter, and blog headers",
    styleKeywords: "bold, modern, eye-catching social media graphic, vibrant colors, strong visual hierarchy, suitable for social platforms",
    bestFor: ["LinkedIn posts", "Instagram posts", "Twitter/X cards", "blog headers"],
    defaultSize: "1024x1024",
  },
  "icon-set": {
    name: "Icon / Illustration Set",
    description: "Consistent icon sets and small illustrations for product features",
    styleKeywords: "flat icon, simple illustration, consistent style, minimal detail, clean lines, single color palette",
    bestFor: ["feature pages", "onboarding flows", "documentation", "email graphics"],
    defaultSize: "1024x1024",
  },
  "concept-art": {
    name: "Concept Illustration",
    description: "Abstract or metaphorical visuals representing product concepts",
    styleKeywords: "conceptual illustration, abstract, metaphorical visual, modern art style, thought-provoking imagery",
    bestFor: ["blog posts", "thought leadership", "landing pages", "brand storytelling"],
    defaultSize: "1792x1024",
  },
  "comparison": {
    name: "Before / After Comparison",
    description: "Split-view visuals showing transformation or improvement",
    styleKeywords: "split-view comparison, before and after, side-by-side, contrasting visuals, clear dividing line",
    bestFor: ["case studies", "ROI presentations", "launch announcements", "social proof"],
    defaultSize: "1792x1024",
  },
};

// ── Prompt Refinement ────────────────────────────────────────────────────

interface PromptReview {
  originalPrompt: string;
  issues: string[];
  suggestions: string[];
  refinedPrompt: string;
  score: number;
}

function reviewPrompt(prompt: string): PromptReview {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const lower = prompt.toLowerCase();

  if (prompt.length < 20) {
    issues.push("Prompt is too short — DALL-E performs better with detailed descriptions.");
    suggestions.push("Add subject, style, composition, and color details.");
  }
  if (!lower.match(/style|design|aesthetic|illustration|flat|minimal|realistic|modern/)) {
    issues.push("No style direction — output will be unpredictable.");
    suggestions.push("Add a style keyword: 'flat design', 'minimal', 'realistic', 'modern SaaS', 'corporate illustration'.");
  }
  if (!lower.match(/background|white|dark|gradient|color|palette|blue|gray|black/)) {
    issues.push("No background or color specified.");
    suggestions.push("Add background and color: 'white background', 'blue and gray palette', 'dark gradient background'.");
  }
  if (!lower.match(/layout|centered|left|right|top|bottom|split|grid|arranged/)) {
    issues.push("No composition or layout direction.");
    suggestions.push("Add layout: 'centered', 'left-aligned with text space on right', 'grid layout', 'split-view'.");
  }
  if (lower.match(/text|word|label|title|heading|button text/)) {
    suggestions.push("Warning: DALL-E often renders text inaccurately. Consider adding text overlays manually after generation.");
  }
  if (lower.match(/photo of.*person|face|portrait|headshot/)) {
    suggestions.push("Warning: Generating images of specific real people is not supported. Use illustrated or abstract representations instead.");
  }
  if (!lower.match(/for|suitable|format|size|ratio|square|wide|landscape/)) {
    suggestions.push("Consider specifying the intended use: 'suitable for LinkedIn post (square)', 'wide format for presentation slide'.");
  }

  let score = 50;
  if (prompt.length >= 50) score += 10;
  if (prompt.length >= 100) score += 10;
  if (lower.match(/style|design|aesthetic/)) score += 10;
  if (lower.match(/background|color|palette/)) score += 10;
  if (lower.match(/layout|centered|composition/)) score += 5;
  if (lower.match(/for|suitable|format/)) score += 5;
  score = Math.min(score, 100);

  let refined = prompt;
  if (!lower.match(/style|design|aesthetic/)) {
    refined += ". Clean, modern design style.";
  }
  if (!lower.match(/background|color/)) {
    refined += " White background, blue and gray color palette.";
  }
  if (!lower.match(/layout|centered|composition/)) {
    refined += " Centered composition with balanced whitespace.";
  }

  return { originalPrompt: prompt, issues, suggestions, refinedPrompt: refined, score };
}

// ── OpenAI Client ────────────────────────────────────────────────────────

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set yet. " +
      "If you haven't set it up, Lesson 1 Section 3 walks you through it. " +
      "Quick fix: type /exit, then paste: export OPENAI_API_KEY='sk-your-key-here' in your terminal, then type claude to restart. " +
      "Get your key at https://platform.openai.com/api-keys"
    );
  }
  return new OpenAI({ apiKey });
}

async function generateImageWithDALLE(
  prompt: string,
  size: string = "1024x1024",
  quality: string = "standard",
  n: number = 1
): Promise<{ images: { url: string }[]; revisedPrompt: string }> {
  const client = getOpenAIClient();
  const response = await client.images.generate({
    model: "dall-e-3",
    prompt,
    n: Math.min(n, 1),
    size: size as "1024x1024" | "1792x1024" | "1024x1792",
    quality: quality as "standard" | "hd",
    response_format: "url",
  });
  const data = response.data || [];
  const images = data
    .map((img) => img.url)
    .filter((url): url is string => !!url)
    .map((url) => ({ url }));
  const revisedPrompt = data[0]?.revised_prompt || prompt;
  return { images, revisedPrompt };
}

async function downloadImage(url: string): Promise<Buffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download image: ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

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
    // ── Image Generation Tools ──────────────────────────────────────────
    {
      name: "list_styles",
      description:
        "List all available image styles and presets with descriptions. Use this first to help the PM choose the right visual style for their use case.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "generate_image",
      description:
        "Generate an image using DALL-E from a text prompt. Returns the image URL and the revised prompt DALL-E used. Optionally specify a style preset, size, and quality.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "Detailed text description of the image to generate. Be specific about subject, style, composition, and colors.",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional style preset to apply. Style keywords will be appended to your prompt.",
          },
          size: {
            type: "string",
            enum: ["1024x1024", "1792x1024", "1024x1792"],
            description: "Image dimensions. 1024x1024 (square, social media), 1792x1024 (landscape, presentations), 1024x1792 (portrait, mobile).",
          },
          quality: {
            type: "string",
            enum: ["standard", "hd"],
            description: "Image quality. 'standard' (~$0.04) or 'hd' (~$0.08) for finer detail.",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "refine_prompt",
      description:
        "Take a rough or vague image prompt and improve it with style, composition, and detail. Returns the refined prompt without generating an image. Use this before generate_image for better results.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The rough prompt to refine",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional target style to incorporate into refinement",
          },
          purpose: {
            type: "string",
            description: "What the image will be used for (e.g., 'PRD mockup', 'LinkedIn post', 'pitch deck slide')",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "generate_variations",
      description:
        "Generate multiple conceptual variations of an image prompt. Returns 3 distinct prompt variations and can optionally generate images for each. Useful for exploring different visual directions.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The base concept to create variations of",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional style preset to apply to all variations",
          },
          generateImages: {
            type: "boolean",
            description: "If true, generate images for each variation (costs ~$0.12 for 3 standard images). Default: false (returns prompts only).",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "create_asset_pack",
      description:
        "Generate a coordinated set of related images that share a consistent visual style. Ideal for social media campaigns, feature launch graphics, or icon sets. Returns prompts for 4 coordinated images and optionally generates them.",
      inputSchema: {
        type: "object" as const,
        properties: {
          theme: {
            type: "string",
            description: "The theme or subject tying the pack together (e.g., 'product launch', 'quarterly review', 'feature set')",
          },
          packType: {
            type: "string",
            enum: ["social-campaign", "presentation-set", "icon-set", "feature-highlights"],
            description: "Type of asset pack to generate",
          },
          styleGuide: {
            type: "string",
            description: "Style and brand instructions (e.g., 'blue and white, minimal, SaaS aesthetic')",
          },
          generateImages: {
            type: "boolean",
            description: "If true, generate all images (~$0.16 for 4 standard). Default: false (returns prompts only).",
          },
        },
        required: ["theme", "packType"],
      },
    },
    {
      name: "review_prompt",
      description:
        "Analyze an image prompt for common issues before generating. Returns a quality score, identified issues, and suggestions for improvement. Helps avoid wasted generations.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The image prompt to review",
          },
        },
        required: ["prompt"],
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
          teachingGuidance: firstSection.id === "api-key-setup"
            ? { tone: "This is a SETUP section with terminal commands. Present the steps EXACTLY as written — do NOT paraphrase commands. Use the markdown formatting from the content. Students need exact copy-paste commands.", pacing: "Present ONLY this section. Walk through each step clearly.", interaction: firstSection.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: "When ready, use continue_lesson.", formatting: "KEEP the numbered steps, code blocks, and bold text exactly as provided. Do NOT rewrite terminal commands." }
            : { tone: "IMPORTANT: Be conversational and brief. Paraphrase the content — do NOT dump raw markdown. Keep response SHORT (under 150 words). No walls of text.", pacing: "Present ONLY this first section. Do NOT skip ahead.", interaction: firstSection.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: "When ready, use continue_lesson.", formatting: "Do NOT reproduce content verbatim. Paraphrase conversationally." },
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
          teachingGuidance: section.id === "api-key-setup"
            ? { tone: "This is a SETUP section with terminal commands. Present the steps EXACTLY as written — do NOT paraphrase commands. Use the markdown formatting from the content. Students need exact copy-paste commands.", pacing: "Present ONLY this section. Walk through each step clearly.", interaction: section.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: nextSectionIndex + 1 < lesson.sections.length ? "Use continue_lesson for the next section." : "Last section! Guide to the exercise next.", formatting: "KEEP the numbered steps, code blocks, and bold text exactly as provided. Do NOT rewrite terminal commands." }
            : { tone: "IMPORTANT: Be conversational and brief. Paraphrase — do NOT dump raw markdown. Keep response SHORT (under 150 words). No walls of text.", pacing: "Present ONLY this section. Do NOT skip ahead.", interaction: section.checkQuestion ? "End with the check question. Then STOP and wait." : "Ask if ready to continue. Then STOP and wait.", continuePrompt: nextSectionIndex + 1 < lesson.sections.length ? "Use continue_lesson for the next section." : "Last section! Guide to the exercise next.", formatting: "Do NOT reproduce content verbatim. Paraphrase conversationally." },
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

    // ── Image Generation Tool Handlers ─────────────────────────────────────

    case "list_styles": {
      const styles = Object.entries(IMAGE_STYLES).map(([key, s]) => ({
        id: key, name: s.name, description: s.description, bestFor: s.bestFor, defaultSize: s.defaultSize,
      }));
      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: "Available image styles. Help the PM choose the best style for their use case.",
        styles,
        nextStep: "Once the PM picks a style, use generate_image or refine_prompt to create visuals.",
        tip: "You can also use generate_image without a style — just include style keywords directly in the prompt.",
      }, null, 2) }] };
    }

    case "generate_image": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const size = args?.size as string || "1024x1024";
      const quality = args?.quality as string || "standard";

      let fullPrompt = prompt;
      if (style && IMAGE_STYLES[style]) {
        fullPrompt = `${prompt}. Style: ${IMAGE_STYLES[style].styleKeywords}`;
      }

      try {
        const result = await generateImageWithDALLE(fullPrompt, size, quality);

        let imagePath = "";
        let imageUrl = "";
        if (result.images.length > 0) {
          imageUrl = result.images[0].url;
          try {
            const descriptiveName = style
              ? `${style}-${prompt.slice(0, 30)}`
              : prompt.slice(0, 40);
            const imageBuffer = await downloadImage(imageUrl);
            imagePath = saveAndOpenImage(imageBuffer, descriptiveName);
          } catch {
            // Download/save failed — URL still available as fallback
          }
        }

        const summary = [
          imagePath ? "✅ Image downloaded locally and opened in Preview." : "✅ Image generated!",
          "",
          `DALL-E URL: ${imageUrl}`,
          ...(imagePath ? [`Local file: ${imagePath}`] : []),
        ].join("\n");

        return { content: [
          { type: "text" as const, text: summary },
          { type: "text" as const, text: JSON.stringify({
            revisedPrompt: result.revisedPrompt,
            settings: { size, quality, style: style || "custom" },
            cost: quality === "hd" ? "~$0.08" : "~$0.04",
            nextSteps: [
              "Use generate_variations to explore different visual directions",
              "Modify the prompt and regenerate for different results",
              "Use create_asset_pack to build a coordinated set of visuals",
            ],
          }, null, 2) },
        ] };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: JSON.stringify({
          error: "Image generation failed",
          message: errorMessage,
          troubleshooting: errorMessage.includes("API key") || errorMessage.includes("OPENAI_API_KEY")
            ? "Your OpenAI API key isn't set up yet. Lesson 1, Section 3 walks you through this. Quick fix: type /exit, run export OPENAI_API_KEY='sk-your-key-here', then type claude to restart."
            : errorMessage.includes("billing")
            ? "Check your OpenAI billing at https://platform.openai.com/account/billing — you may need to add a payment method."
            : "Check the prompt for content policy violations or try a simpler description.",
        }, null, 2) }], isError: true };
      }
    }

    case "refine_prompt": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const purpose = args?.purpose as string | undefined;

      const review = reviewPrompt(prompt);
      let refinedPrompt = prompt;

      if (style && IMAGE_STYLES[style]) {
        refinedPrompt += `. ${IMAGE_STYLES[style].styleKeywords}`;
      }
      if (purpose) {
        const purposeLower = purpose.toLowerCase();
        if (purposeLower.includes("linkedin") || purposeLower.includes("social")) {
          refinedPrompt += ". Bold, eye-catching, suitable for social media feed. Strong visual hierarchy.";
        } else if (purposeLower.includes("presentation") || purposeLower.includes("deck") || purposeLower.includes("slide")) {
          refinedPrompt += ". Professional, suitable for corporate presentation. Clean composition with space for text overlay.";
        } else if (purposeLower.includes("prd") || purposeLower.includes("mockup") || purposeLower.includes("spec")) {
          refinedPrompt += ". Clean UI mockup style, realistic interface elements, suitable for product documentation.";
        } else if (purposeLower.includes("blog") || purposeLower.includes("header")) {
          refinedPrompt += ". Wide format, thematic, suitable as a blog post header image.";
        }
      }
      if (!prompt.toLowerCase().match(/background|color/)) {
        refinedPrompt += " White background, professional color palette.";
      }
      if (!prompt.toLowerCase().match(/layout|centered|composition/)) {
        refinedPrompt += " Balanced composition.";
      }

      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: "Prompt refined. Review the improved version and use generate_image when ready.",
        originalPrompt: prompt, refinedPrompt, promptScore: review.score,
        issues: review.issues, suggestions: review.suggestions,
        nextStep: "Use generate_image with the refined prompt to create the visual.",
      }, null, 2) }] };
    }

    case "generate_variations": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const generateImages = args?.generateImages as boolean || false;

      const styleKeywords = style && IMAGE_STYLES[style] ? IMAGE_STYLES[style].styleKeywords : "";
      const variations = [
        { name: "Variation A: Minimal & Clean", prompt: `${prompt}. Minimal, clean design with lots of whitespace. Subtle color accents. ${styleKeywords}`.trim(), approach: "Stripped-down, focused on core subject with maximum clarity" },
        { name: "Variation B: Bold & Vibrant", prompt: `${prompt}. Bold, vibrant design with strong colors and visual impact. Dynamic composition. ${styleKeywords}`.trim(), approach: "High-energy visual with saturated colors and strong contrast" },
        { name: "Variation C: Professional & Corporate", prompt: `${prompt}. Professional, corporate style with muted tones. Sophisticated layout, business-appropriate. ${styleKeywords}`.trim(), approach: "Polished and formal, suitable for executive audiences" },
      ];

      const variationResults: Array<{ name: string; prompt: string; approach: string; dalleUrl?: string; localPath?: string }> = [];

      for (const variation of variations) {
        const entry: { name: string; prompt: string; approach: string; dalleUrl?: string; localPath?: string } = {
          name: variation.name, prompt: variation.prompt, approach: variation.approach,
        };
        if (generateImages) {
          try {
            const imageResult = await generateImageWithDALLE(variation.prompt);
            if (imageResult.images.length > 0) {
              entry.dalleUrl = imageResult.images[0].url;
              try {
                const descriptiveName = `variation-${variation.name.slice(0, 20)}-${prompt.slice(0, 20)}`;
                const imageBuffer = await downloadImage(entry.dalleUrl);
                entry.localPath = saveAndOpenImage(imageBuffer, descriptiveName);
              } catch {
                // Download/save failed — URL still available
              }
            }
          } catch (error) {
            entry.dalleUrl = `Error: ${error instanceof Error ? error.message : String(error)}`;
          }
        }
        variationResults.push(entry);
      }

      if (generateImages) {
        const summaryLines = ["✅ 3 variations generated! Downloaded locally and opened in Preview.", ""];
        for (const v of variationResults) {
          summaryLines.push(`${v.name}`);
          if (v.dalleUrl && !v.dalleUrl.startsWith("Error")) summaryLines.push(`  DALL-E URL: ${v.dalleUrl}`);
          if (v.localPath) summaryLines.push(`  Local file: ${v.localPath}`);
          summaryLines.push("");
        }
        return { content: [
          { type: "text" as const, text: summaryLines.join("\n") },
          { type: "text" as const, text: JSON.stringify({
            variations: variationResults.map(v => ({ name: v.name, prompt: v.prompt, approach: v.approach })),
            estimatedCost: "~$0.12 (3 standard images)",
            nextStep: "Pick the best variation and iterate on it with generate_image.",
          }, null, 2) },
        ] };
      }

      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: "3 prompt variations created. Review and use generate_image on the one you prefer.",
        variations: variationResults,
        estimatedCost: "$0.00 (prompts only)",
        nextStep: "Use generate_image with the prompt from the variation you like best.",
      }, null, 2) }] };
    }

    case "create_asset_pack": {
      const theme = args?.theme as string;
      const packType = args?.packType as string;
      const styleGuide = args?.styleGuide as string || "clean, modern, professional";
      const generateImages = args?.generateImages as boolean || false;

      const packTemplates: Record<string, Array<{ title: string; promptSuffix: string }>> = {
        "social-campaign": [
          { title: "Announcement Post", promptSuffix: "Bold announcement graphic with text space on left. Eye-catching, celebration feel." },
          { title: "Feature Highlight", promptSuffix: "Focused feature showcase. Single key visual with supporting details." },
          { title: "Testimonial / Social Proof", promptSuffix: "Trust-building visual. Clean, credible, with quote space." },
          { title: "Call-to-Action Post", promptSuffix: "Action-oriented graphic. Strong CTA area, urgency feel, clear visual hierarchy." },
        ],
        "presentation-set": [
          { title: "Title Slide Background", promptSuffix: "Hero background image, abstract, professional. Space for large title text." },
          { title: "Problem Slide Visual", promptSuffix: "Illustration representing the problem or pain point. Slightly chaotic, muted colors." },
          { title: "Solution Slide Visual", promptSuffix: "Illustration representing the solution. Organized, bright accents, clarity." },
          { title: "Results Slide Visual", promptSuffix: "Upward-trending visual, achievement, success. Charts or growth metaphor." },
        ],
        "icon-set": [
          { title: "Icon 1: Core Feature", promptSuffix: "Simple flat icon representing the primary feature. Single color, clean lines." },
          { title: "Icon 2: Integration", promptSuffix: "Simple flat icon representing connectivity or integration. Matching style." },
          { title: "Icon 3: Analytics", promptSuffix: "Simple flat icon representing data or analytics. Matching style." },
          { title: "Icon 4: Security / Trust", promptSuffix: "Simple flat icon representing security or reliability. Matching style." },
        ],
        "feature-highlights": [
          { title: "Feature 1: Main Value", promptSuffix: "Visual highlighting the primary value proposition. Product in action." },
          { title: "Feature 2: Speed / Efficiency", promptSuffix: "Visual emphasizing speed or efficiency gains. Before/after or time-saving." },
          { title: "Feature 3: Collaboration", promptSuffix: "Visual showing team collaboration or multi-user benefits." },
          { title: "Feature 4: Results / Impact", promptSuffix: "Visual showing measurable results or impact. Data-driven, impressive." },
        ],
      };

      const templates = packTemplates[packType] || packTemplates["social-campaign"];
      const assets: Array<{ title: string; prompt: string; dalleUrl?: string; localPath?: string }> = [];

      for (const template of templates) {
        const assetPrompt = `${theme}. ${template.promptSuffix} Style: ${styleGuide}. Consistent with other images in this set.`;
        const entry: { title: string; prompt: string; dalleUrl?: string; localPath?: string } = {
          title: template.title, prompt: assetPrompt,
        };
        if (generateImages) {
          try {
            const imageResult = await generateImageWithDALLE(assetPrompt);
            if (imageResult.images.length > 0) {
              entry.dalleUrl = imageResult.images[0].url;
              try {
                const descriptiveName = `${packType}-${template.title}-${theme.slice(0, 20)}`;
                const imageBuffer = await downloadImage(entry.dalleUrl);
                entry.localPath = saveAndOpenImage(imageBuffer, descriptiveName);
              } catch {
                // Download/save failed — URL still available
              }
            }
          } catch (error) {
            entry.dalleUrl = `Error: ${error instanceof Error ? error.message : String(error)}`;
          }
        }
        assets.push(entry);
      }

      if (generateImages) {
        const summaryLines = [`✅ Asset pack generated: 4 coordinated ${packType} images for "${theme}". Downloaded locally and opened in Preview.`, ""];
        for (const a of assets) {
          summaryLines.push(`${a.title}`);
          if (a.dalleUrl && !a.dalleUrl.startsWith("Error")) summaryLines.push(`  DALL-E URL: ${a.dalleUrl}`);
          if (a.localPath) summaryLines.push(`  Local file: ${a.localPath}`);
          summaryLines.push("");
        }
        return { content: [
          { type: "text" as const, text: summaryLines.join("\n") },
          { type: "text" as const, text: JSON.stringify({
            packType, theme, styleGuide,
            assets: assets.map(a => ({ title: a.title, prompt: a.prompt })),
            estimatedCost: "~$0.16 (4 standard images)",
            tip: "For maximum consistency, generate all 4 images in the same session and include the same style guide in each prompt.",
          }, null, 2) },
        ] };
      }

      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: `Asset pack prompts ready: 4 coordinated ${packType} prompts for "${theme}". Use generate_image on each when ready.`,
        packType, theme, styleGuide, assets,
        estimatedCost: "$0.00 (prompts only)",
        tip: "For maximum consistency, generate all 4 images in the same session and include the same style guide in each prompt.",
      }, null, 2) }] };
    }

    case "review_prompt": {
      const prompt = args?.prompt as string;
      const review = reviewPrompt(prompt);
      return { content: [{ type: "text" as const, text: JSON.stringify({
        message: review.score >= 80
          ? "This prompt is solid. You can generate an image directly."
          : review.score >= 60
          ? "This prompt is decent but could be improved. Consider the suggestions below."
          : "This prompt needs work. Address the issues below for better results.",
        score: review.score,
        grade: review.score >= 80 ? "A - Ready to generate" : review.score >= 60 ? "B - Could be better" : "C - Needs refinement",
        issues: review.issues, suggestions: review.suggestions, refinedPrompt: review.refinedPrompt,
        nextStep: review.score >= 70
          ? "Use generate_image to create the visual."
          : "Use refine_prompt to improve this prompt before generating.",
      }, null, 2) }] };
    }

    default:
      return { content: [{ type: "text" as const, text: JSON.stringify({ message: `Unknown tool: ${name}`, availableTools: ["start_lesson", "continue_lesson", "resume_course", "explain_concept", "get_exercise", "check_progress", "quiz", "list_styles", "generate_image", "refine_prompt", "review_prompt", "generate_variations", "create_asset_pack"] }, null, 2) }], isError: true };
  }
});

// ── Start Server ──────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Image Generation Teacher Mode server running — ready to teach!");
}

main().catch(console.error);
