import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 1,
  title: "Welcome & Setup",
  duration: "10 min",
  objectives: [
    "Understand why PMs need AI image generation",
    "Learn what DALL-E is and how it connects to Claude Code via MCP",
    "Set up your OpenAI API key",
    "See the 6 tools you will use throughout this course",
  ],
  sections: [
    {
      id: "why-image-gen",
      title: "Why PMs Need AI Image Generation",
      content: `# Welcome to AI Image Generation for PMs

Product Managers create and consume more visual content than almost any other role. Mockups in PRDs, graphics in pitch decks, assets for launch posts, icons for feature specs.

Yet most PMs either wait for design resources, use outdated screenshots, or skip visuals entirely. The result: PRDs without visual context, presentations with bullet points instead of graphics, and launch posts without eye-catching visuals.

### What Changes with DALL-E?

| Situation | Without AI | With DALL-E |
|-----------|-----------|-------------|
| PRD needs a mockup | Wait 2-3 days for design, or use text | Generate a concept visual in 30 seconds |
| Pitch deck visual | Stock photos or blank slides | Custom illustrations matching your narrative |
| Launch social post | Request from marketing (1-2 week lead) | Generate branded assets on demand |
| Internal tool icons | Skip them or use emoji | Consistent icon sets in minutes |

**Key insight:** This is not about replacing your design team. It is about creating visuals for the dozens of situations where waiting for a designer was never an option.`,
      teacherNotes: "Set the tone: this is about speed and communication, not replacing designers. Ask the student about their current visual workflow — where do they struggle to get visuals?",
      checkQuestion: "Where do you currently struggle most to get visuals for your PM work?",
    },
    {
      id: "what-is-dalle",
      title: "What Is DALL-E?",
      content: `## What Is DALL-E?

DALL-E is OpenAI's image generation AI. You give it a text description (a "prompt") and it creates an image.

### Key Facts

- **Current version:** DALL-E 3
- **How it works:** Text prompt in → image out
- **Image sizes:** 1024x1024 (square), 1792x1024 (landscape), 1024x1792 (portrait)
- **Quality levels:** Standard (~$0.04) or HD (~$0.08)
- **Access:** Via OpenAI API with an API key

### How This Module Works

This module connects DALL-E to Claude Code through an **MCP server** (the same pattern as the PRD Generator in Module 1). You talk to Claude Code in natural language, and it uses the Image Generator tools to create visuals for you.

The flow:
1. You describe what you want in plain English
2. Claude Code sends the prompt to DALL-E via the MCP server
3. DALL-E generates the image
4. You get back a URL to view and download the image

### Cost Expectations

A typical session generates 10-20 images. At ~$0.04 per image, that is $0.40-$1.60 per session. Check your usage at platform.openai.com/usage.`,
      checkQuestion: "Have you used any image generation tools before (DALL-E, Midjourney, Stable Diffusion)?",
    },
    {
      id: "api-key-setup",
      title: "Setting Up Your API Key",
      content: `## Setting Up Your OpenAI API Key

To use DALL-E, you need an OpenAI API key. Here is how to get one:

### Step 1: Create an OpenAI Account
Go to **platform.openai.com** and sign up (or log in if you have one).

### Step 2: Generate an API Key
Go to **platform.openai.com/api-keys** and click "Create new secret key". Copy it — it starts with "sk-".

### Step 3: Set It as an Environment Variable

**Mac/Linux (Terminal):**
\`\`\`
export OPENAI_API_KEY="sk-your-key-here"
\`\`\`

To make it permanent, add that line to your \`~/.zshrc\` or \`~/.bashrc\` file.

**Windows (PowerShell):**
\`\`\`
$env:OPENAI_API_KEY = "sk-your-key-here"
\`\`\`

### Step 4: Verify
In your terminal, run:
\`\`\`
echo $OPENAI_API_KEY
\`\`\`
It should print your key.

### Billing
Add a payment method at platform.openai.com/account/billing. Start with a $5-10 limit — that is enough for hundreds of images.`,
      teacherNotes: "This is a setup step. Walk through it slowly. If the student already has an API key, skip ahead. If they hit issues, point them to the troubleshooting section in QUICKSTART.md.",
      checkQuestion: "Is your OpenAI API key set up and working?",
    },
    {
      id: "tools-overview",
      title: "Your Toolkit: 6 Image Generation Tools",
      content: `## Your Toolkit

The Image Generator MCP server gives you 6 tools:

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| \`list_styles\` | Shows available image styles and presets | Start here to pick a visual style |
| \`generate_image\` | Creates an image from your prompt | When you are ready to generate |
| \`refine_prompt\` | Improves a vague prompt with details | Before generating, to get better results |
| \`generate_variations\` | Creates 3 versions of a concept | After generating, to explore options |
| \`create_asset_pack\` | Generates a set of 4 related images | For campaigns, presentations, or icon sets |
| \`review_prompt\` | Analyzes your prompt for issues | Before generating, to catch problems |

### The Recommended Flow

1. Start with \`list_styles\` to pick a visual direction
2. Write your initial prompt
3. Use \`review_prompt\` to check it
4. Use \`refine_prompt\` to improve it
5. Use \`generate_image\` to create the visual
6. Use \`generate_variations\` to explore alternatives

### Styles Available

Six preset styles: Product Mockup, Presentation Visual, Social Media Asset, Icon Set, Concept Illustration, Before/After Comparison.`,
      checkQuestion: "Which of the 6 styles sounds most useful for your current work?",
    },
    {
      id: "getting-started",
      title: "Getting Started",
      content: `## Let's Get Started

You are all set. Here is what comes next:

### Course Overview

| Lesson | Topic | What You'll Learn |
|--------|-------|-------------------|
| 1 | Welcome & Setup (this lesson) | Overview, API key, tools |
| 2 | Prompt Fundamentals | Anatomy of a great prompt, style keywords |
| 3 | Product Mockups & Wireframes | Generating visuals for PRDs and specs |
| 4 | Presentation & Pitch Visuals | Creating graphics for decks |
| 5 | Social Media & Marketing Assets | Launch graphics, blog headers |
| 6 | Advanced Techniques & Workflows | Variations, iteration, asset packs |

Each lesson has sections, exercises, and quizzes.

### Quick Commands

| What to say | What happens |
|-------------|--------------|
| "Continue" | Next section of the current lesson |
| "Start Lesson 2" | Jump to the next lesson |
| "Resume my course" | Pick up where you left off |
| "Explain what prompt engineering is" | Deep-dive on any concept |
| "Quiz me on Lesson 1" | Test your knowledge |
| "Show my progress" | See completed lessons |

Ready? Lesson 2 is where you learn the most important skill: writing great prompts.`,
      teacherNotes: "Quick wrap-up. If the student is eager, suggest jumping straight to Lesson 2. If they need help with setup, point them back to the API key section.",
    },
  ],
  exercise: {
    title: "Explore the Image Generator Tools",
    description: "Get familiar with the MCP tools by exploring styles and trying your first image.",
    steps: [
      "Ask Claude to list the available image styles (list_styles)",
      "Pick the style that best matches something you need visually right now",
      "Write a one-sentence description of an image you would find useful for your work",
      "Use review_prompt to check your description for issues",
      "Use refine_prompt to improve it, then use generate_image to create your first image",
    ],
    validation: "You have completed this exercise if: (1) You can see all six styles, (2) You have generated at least one image, and (3) You understand the difference between your original prompt and the refined version.",
  },
  quiz: {
    questions: [
      {
        question: "What is the primary benefit of AI image generation for PMs?",
        options: [
          "It replaces the design team entirely",
          "It creates pixel-perfect production assets",
          "It provides quick visuals for situations where waiting for a designer is not practical",
          "It reduces the cost of hiring designers",
        ],
        correctIndex: 2,
        explanation: "AI image generation is about speed and communication. It gives PMs visuals for PRDs, presentations, and social posts where waiting for design resources was never an option. It does not replace professional design work.",
      },
      {
        question: "How much does a standard DALL-E 3 image cost?",
        options: [
          "Free",
          "~$0.04",
          "~$0.50",
          "~$2.00",
        ],
        correctIndex: 1,
        explanation: "A standard DALL-E 3 image costs approximately $0.04. HD images cost ~$0.08. A typical session of 10-20 images runs $0.40-$1.60.",
      },
      {
        question: "What should you do BEFORE generating an image?",
        options: [
          "Generate as many images as possible and pick the best one",
          "Use review_prompt or refine_prompt to improve your description first",
          "Skip the prompt and let DALL-E decide what to create",
          "Always use the HD quality setting for best results",
        ],
        correctIndex: 1,
        explanation: "Using review_prompt and refine_prompt before generating helps you catch vague descriptions and add the style, composition, and detail that produce better images. This saves time and money by reducing wasted generations.",
      },
      {
        question: "How does this module connect DALL-E to Claude Code?",
        options: [
          "Through a browser plugin",
          "Through an MCP server that Claude Code can use as a tool",
          "Through copy-pasting prompts into the DALL-E website",
          "Through the ChatGPT interface",
        ],
        correctIndex: 1,
        explanation: "The Image Generator is an MCP server — the same pattern used in Module 1 (PRD Generator). Claude Code connects to the MCP server, which talks to the DALL-E API. You interact with Claude Code in natural language, and it handles the API calls.",
      },
    ],
  },
};

export default lesson;
