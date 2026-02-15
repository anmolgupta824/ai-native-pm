import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 1,
  title: "Welcome to PRD Generation with AI",
  duration: "15 min",
  objectives: [
    "Understand why AI-assisted PRD writing is different from traditional approaches",
    "Learn the four core techniques: Context, Socratic Questioning, Multiple Approaches, Multi-Perspective Review",
    "See the MCP tools you'll use throughout this course",
    "Get set up for hands-on exercises",
  ],
  sections: [
    {
      id: "why-ai-prd",
      title: "Why AI-Assisted PRD Writing?",
      content: `# Welcome to PRD Generation with AI

Most PMs spend 4-8 hours writing a PRD. Half that time is staring at a blank page, the other half is chasing down edge cases that reviewers will flag anyway.

This course flips the process. Instead of *writing then reviewing*, you will **think first with AI, then generate**.

The PRD Generator MCP server acts like a senior PM sitting across the table from you — asking the hard questions, surfacing blind spots, and drafting the document only after you have done the real thinking.

### What Changes?

| Step | Traditional (4-8 hrs) | AI Partnership (45-60 min) |
|------|----------------------|---------------------------|
| Research | Dig through docs, Slack, tickets manually | @-mention relevant docs, AI surfaces patterns |
| Problem framing | Write, rewrite, rewrite again | Socratic Q&A until the problem is crisp |
| Requirements | Brainstorm alone, miss edge cases | AI generates candidates, you curate |
| Validation | Wait for review meeting | Instant multi-perspective feedback |
| Edge cases | Reviewers find them for you (too late) | AI suggests them before you share |

The key insight: **AI is most valuable when it helps you think better, not when it does all the thinking for you.**`,
      teacherNotes: "Set the tone: this is not about replacing PM thinking, it's about augmenting it. Ask the student about their current PRD process — how long does it take them? What's the most painful part?",
      checkQuestion: "What's the most time-consuming part of your current PRD process?",
    },
    {
      id: "four-techniques",
      title: "The Four Core Techniques",
      content: `## The Four Core Techniques

This course teaches four techniques that transform how you write PRDs:

### 1. Full Context via @-Mentions
Before writing a single word, give Claude the context it needs. The better the context, the sharper the questions and output.

What to @-mention: product strategy docs, user research, existing PRDs, technical architecture, competitor analysis. Pick 3-5 docs that are directly relevant. Too much context creates noise, not clarity.

### 2. Socratic Questioning for Clarity
The PRD Generator asks 10 questions, but the real magic is in the follow-ups. A good PRD starts with a crisp problem statement — and most PMs skip this.

Key categories: Problem Clarity, Solution Validation, Success Criteria, Constraints, Strategic Fit.

**Pro tip:** If you can't answer a question clearly in conversation, you can't write it clearly in a PRD. Use the struggle as signal.

### 3. Generate Multiple Approaches Before Committing
Don't jump to the first solution. Ask Claude to generate 2-3 strategic approaches, then pick the best one. Start broad, compare trade-offs, and think in phases (MVP vs v2 vs full vision).

### 4. Multi-Perspective Review
Before sharing your PRD, get feedback from multiple perspectives. The new \`review_prd\` tool lets you get critiques from an Engineering Lead, Design Lead, and QA Lead — all in one step.

Each perspective catches different things. Engineers flag feasibility issues. Designers catch UX gaps. QA finds untestable requirements.`,
      teacherNotes: "Don't go too deep on each technique yet — that's what the rest of the course is for. Just give the student a taste of what's coming.",
      checkQuestion: "Which of the four techniques are you most curious about?",
    },
    {
      id: "tools-overview",
      title: "The MCP Tools You'll Use",
      content: `## Your Toolkit

The PRD Generator MCP server gives you 6 tools:

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| \`list_templates\` | Shows 3 PRD template types | Start here to pick the right template |
| \`get_questions\` | Returns 10 questions for your template | After picking a template |
| \`generate_prd\` | Creates full PRD from your answers | After answering questions |
| \`validate_prd\` | Scores PRD completeness (A-D grade) | After generation, and before sharing |
| \`suggest_edge_cases\` | Lists edge cases for your PRD type | During or after PRD generation |
| \`review_prd\` | Multi-perspective review from Engineer, Designer, QA | Before sharing with stakeholders |

### Three Templates

1. **Feature Launch** — New feature being added to an existing product
2. **API Integration** — Integrating with a third-party API or building a new one
3. **Product Redesign** — Redesigning an existing feature or product experience

Each template has its own set of 10 questions and specialized edge case suggestions.

### The Flow

1. Pick a template with \`list_templates\`
2. Answer questions from \`get_questions\` (Socratic exploration)
3. Generate the PRD with \`generate_prd\`
4. Validate with \`validate_prd\` and fix gaps
5. Review with \`review_prd\` from multiple perspectives
6. Polish with \`suggest_edge_cases\``,
      checkQuestion: "Which template type would be most useful for something you're working on right now?",
    },
    {
      id: "course-overview",
      title: "Course Overview",
      content: `## What This Course Covers

| Lesson | Topic | What You'll Learn |
|--------|-------|-------------------|
| 1 | Welcome (this lesson) | Course overview, tools, setup |
| 2 | Context & Socratic Questioning | How to load context and ask better questions |
| 3 | PRD Structure & Templates | Template anatomy, choosing the right one |
| 4 | Generating & Validating PRDs | Using generate_prd and validate_prd |
| 5 | Multi-Perspective Review | Using review_prd with Engineer, Designer, QA personas |
| 6 | Edge Cases & Polish | Final polish, suggest_edge_cases, real-world workflows |

Each lesson has:
- **Sections** — Bite-sized content presented one at a time
- **Exercises** — Hands-on practice with the MCP tools
- **Quizzes** — Quick knowledge checks

### Prerequisites

- Claude Code installed and running
- The PRD Generator MCP server connected (it should already be if you're seeing this!)
- A real feature or product idea in mind (you'll use it throughout the course)

### Tip

Have a real PRD project in mind as you go through this course. The exercises work best when you use real requirements, not hypothetical ones. If you don't have one, think of a feature you wish your product had.`,
      teacherNotes: "Encourage the student to think of a real feature they need to write a PRD for. The course is much more valuable with real context. If they don't have one, suggest: 'Think of a feature you wish your product had — something you've been wanting to build.'",
      checkQuestion: "Do you have a real feature or product idea you can use throughout this course?",
    },
    {
      id: "getting-started",
      title: "Getting Started",
      content: `## Let's Get Started

You're all set. Here's what comes next:

1. **Lesson 2** teaches you how to load context with @-mentions and use the Socratic questioning technique to sharpen your problem statement
2. **Lesson 3** dives into the three PRD templates and how to choose the right one
3. **Lessons 4-6** are hands-on — you'll generate, validate, review, and polish a real PRD

### Quick Commands

| What to say | What happens |
|-------------|--------------|
| "Continue" | Next section of the current lesson |
| "Start Lesson 2" | Jump to the next lesson |
| "Resume my course" | Pick up where you left off after restarting |
| "Explain what Socratic questioning is" | Deep-dive on any concept |
| "Quiz me on Lesson 1" | Test your knowledge |
| "Show my progress" | See completed lessons |

Ready to move on? Lesson 2 is where the real learning begins.`,
      teacherNotes: "This is a short wrap-up. Ask if they have any questions before moving on. If they're eager, suggest jumping straight to Lesson 2.",
    },
  ],
  exercise: {
    title: "Explore the PRD Generator Tools",
    description:
      "Get familiar with the MCP tools by exploring templates and trying a quick generation.",
    steps: [
      "Ask Claude to list the available PRD templates (list_templates)",
      "Pick the template that best matches a project you're working on",
      "Ask Claude to show you the questions for that template (get_questions)",
      "Read through the 10 questions — which ones would be hardest for you to answer?",
      "Try answering the first 3 questions conversationally with Claude",
    ],
    validation:
      "You've completed this exercise if: (1) You can see all three templates, (2) You've read through the questions for at least one template, and (3) You've identified which questions would be hardest for you to answer (those are your thinking gaps).",
  },
  quiz: {
    questions: [
      {
        question:
          "What's the main difference between traditional PRD writing and the AI-partnership approach?",
        options: [
          "The AI approach skips the thinking phase entirely",
          "The AI approach focuses on thinking first with AI, then generating the document",
          "The AI approach uses templates that traditional approaches don't",
          "The AI approach is only for junior PMs who need help",
        ],
        correctIndex: 1,
        explanation:
          "The AI partnership approach flips the process: instead of writing then reviewing, you think first with AI (Socratic questioning, multiple approaches) and generate the document only after the thinking is crisp. The AI doesn't replace your thinking — it sharpens it.",
      },
      {
        question:
          "Why should you @-mention 3-5 documents before starting a PRD?",
        options: [
          "To make the PRD longer with more references",
          "To give Claude the context it needs for sharper questions and output",
          "Because Claude can't work without uploaded documents",
          "To bypass the questioning phase",
        ],
        correctIndex: 1,
        explanation:
          "Better context leads to sharper questions and more relevant output. When Claude has your product strategy, user research, and technical docs, it can ask questions specific to your situation rather than generic ones. But don't overdo it — 3-5 relevant docs beats 20 tangential ones.",
      },
      {
        question: "What does the review_prd tool provide?",
        options: [
          "A grammar and spelling check",
          "An automatic rewrite of the PRD",
          "Multi-perspective feedback from Engineering, Design, and QA viewpoints",
          "A comparison with competitor PRDs",
        ],
        correctIndex: 2,
        explanation:
          "The review_prd tool simulates a review meeting by providing feedback from three professional perspectives: an Engineering Lead (technical feasibility, scalability), a Design Lead (UX, accessibility), and a QA Lead (testability, acceptance criteria). Each catches different types of issues.",
      },
      {
        question:
          "If you can't answer a Socratic question clearly, what should you do?",
        options: [
          "Skip it and move on",
          "Let the AI answer it for you",
          "Treat it as a signal that you need more research before writing the PRD",
          "Remove that section from the PRD",
        ],
        correctIndex: 2,
        explanation:
          "If you can't answer a question clearly in conversation, you can't write it clearly in a PRD. The struggle is the signal — it tells you where you need more research, more user conversations, or more thinking before the PRD is ready.",
      },
    ],
  },
};

export default lesson;
