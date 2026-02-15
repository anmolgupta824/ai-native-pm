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

const lesson: LessonContent = {
  number: 1,
  title: "Welcome to MCP",
  duration: "10 min",
  objectives: [
    "Understand what the Model Context Protocol (MCP) is and why it exists",
    "Identify real PM workflows that MCP can automate",
    "Know what you will build by the end of this course",
    "Confirm your environment is ready (Claude Code installed and working)",
  ],
  content: `# Welcome to MCP: The Model Context Protocol

## What is MCP?

MCP stands for **Model Context Protocol**. It is an open standard created by Anthropic that lets Claude talk directly to external tools and services — things like Jira, Google Drive, Slack, Figma, and any other software with an API.

Think of it this way: without MCP, Claude is like a brilliant colleague who is locked in a room with no phone and no internet. You can talk to them, and they can think deeply, but they cannot look anything up or take action in the real world. MCP gives Claude a phone, a computer, and access to your tools.

### Before MCP

Without MCP, your workflow as a PM looks like this:

1. Open Jira, manually read through 15 tickets
2. Open Google Sheets, copy sprint velocity numbers
3. Open Google Docs, start typing a status report
4. Alt-tab between all three for 45 minutes
5. Paste it into Slack

### After MCP

With MCP, you tell Claude:

> "Pull the current sprint tickets from Jira, read the velocity tracker in Sheets, and draft a status report in Google Docs. Then send a summary to the #product-updates Slack channel."

Claude does all of it. Not by screen-scraping or pretending to click buttons — but by actually calling the APIs of each tool through dedicated MCP servers you have set up.

---

## Why Should PMs Care About MCP?

You might be thinking: "I'm a Product Manager, not an engineer. Why do I need to learn this?"

Here is the honest answer: **the PMs who learn to build MCP integrations will have a superpower that most PMs do not have.** You will be able to:

1. **Automate repetitive work.** Status reports, sprint summaries, capacity planning, stakeholder updates — the tasks that eat 5-10 hours of your week.

2. **Get real-time answers from your tools.** Instead of digging through Jira filters or scrolling through Sheets, just ask Claude: "What are the open P0 bugs?" or "What is our sprint burndown looking like?"

3. **Create workflows that connect your tools.** Pull design specs from Figma, create Jira tickets, update the project tracker in Sheets, and draft the kickoff doc in Google Docs — all in one conversation.

4. **Stand out in your career.** AI-native PMs who can set up their own automations are extremely valuable. This is a concrete, demonstrable skill.

The best part? You do not need to be a software engineer. MCP servers are small, focused programs. They are typically 100-200 lines of TypeScript. By the end of this course, you will be able to write them from scratch.

---

## What You Will Build in This Course

Over the next 8 lessons, you will build real, working integrations:

| Lesson | What You Build | What It Does |
|--------|---------------|--------------|
| 1 | (This lesson) | Understand MCP and set up your environment |
| 2 | REST API Knowledge | Learn how APIs work so the rest makes sense |
| 3 | MCP Deep Dive | Understand MCP architecture inside and out |
| 4 | Jira MCP Server | Search issues, create tickets, run JQL queries |
| 5 | Google Drive MCP Server | List files, create docs, share documents |
| 6 | Google Sheets MCP Server | Read and write spreadsheet data |
| 7 | Custom MCP Server | Build an MCP server for ANY API you choose |
| 8 | Figma MCP Server | Read designs, export frames, get comments |

By the end, you will have a full toolkit of MCP servers that Claude can use to help you with your actual day-to-day work.

---

## Prerequisites

Before we continue, make sure you have the following:

### 1. Claude Code Installed

Claude Code is the command-line interface for Claude. It is where you will interact with Claude and where your MCP servers will run.

If you do not have it installed yet:
- Visit the Anthropic documentation for Claude Code installation
- Follow the instructions for your operating system (macOS, Linux, or Windows via WSL)
- After installation, open your terminal and type \`claude\` to confirm it works

### 2. Basic Terminal Familiarity

You do not need to be a terminal expert. You should be comfortable with:
- Opening a terminal window
- Navigating between directories (\`cd\` command)
- Running a command and reading the output
- Creating a new directory (\`mkdir\` command)

If you have ever used \`git\` commands or run \`npm install\`, you have enough terminal experience for this course.

### 3. Accounts for the Tools We Will Integrate

Throughout the course, you will need:
- A **Jira** account (free tier works fine) — Lesson 4
- A **Google** account (for Drive and Sheets) — Lessons 5-6
- A **Figma** account (free tier works fine) — Lesson 8

You do not need all of these right now. We will set them up as we get to each lesson.

---

## How This Course Works

Each lesson follows the same structure:

1. **Learn** — Read through the lesson content (like you are doing now)
2. **Exercise** — Complete a hands-on exercise to practice what you learned
3. **Quiz** — Answer a few questions to confirm your understanding

The exercises are the most important part. MCP is a hands-on skill. Reading about it is useful, but building with it is where the learning happens.

---

## A Note on "Coding"

You will write TypeScript in this course. If that sounds intimidating, here is a secret: **Claude will help you write most of the code.** Your job is to understand what the code does, why each piece is there, and how to modify it for your needs.

Think of it like writing a PRD. You do not need to implement the feature yourself, but you need to understand the system well enough to describe what you want and review what gets built. Same thing here — you need to understand MCP well enough to direct Claude and troubleshoot when something does not work.

---

## Let's Get Started

In the next lesson, we will cover REST APIs — the foundation that all MCP integrations are built on. Understanding APIs is the single most important concept for everything that follows.

For now, complete the exercise below to confirm your environment is set up correctly.
`,
  exercise: {
    title: "Verify Your MCP Environment",
    description:
      "Open Claude Code and check what MCP servers are currently configured. This will confirm your environment is set up correctly and give you a first look at how MCP servers appear to Claude.",
    steps: [
      "Open your terminal application (Terminal on macOS, or your preferred terminal emulator)",
      'Launch Claude Code by typing: claude',
      'Once Claude Code is running, type this prompt: "What MCP servers do I have installed? List them and describe what each one does."',
      "Read the output carefully. If you have no MCP servers, that is perfectly fine — you will build them in this course. If you do have some, note what they are.",
      "Try one more prompt: \"Explain what MCP is in one paragraph.\" Compare Claude's answer to what you learned in this lesson.",
      "Exit Claude Code by typing /exit or pressing Ctrl+C",
    ],
    validation:
      "You have successfully completed this exercise if: (1) Claude Code launched without errors, (2) you received a response about your MCP servers (even if the list is empty), and (3) Claude was able to explain MCP. If Claude Code did not launch, revisit the installation steps in the Prerequisites section.",
  },
  quiz: {
    questions: [
      {
        question: "What does MCP stand for?",
        options: [
          "Model Communication Platform",
          "Model Context Protocol",
          "Machine Control Protocol",
          "Model Configuration Profile",
        ],
        correctIndex: 1,
        explanation:
          "MCP stands for Model Context Protocol. It is an open standard created by Anthropic that allows Claude to communicate with external tools and services through dedicated server processes.",
      },
      {
        question:
          "What is the primary benefit of MCP for Product Managers?",
        options: [
          "It replaces the need for a PM entirely",
          "It allows Claude to directly access and interact with PM tools like Jira, Google Docs, and Sheets",
          "It provides a visual drag-and-drop interface for building products",
          "It automatically writes code for the engineering team",
        ],
        correctIndex: 1,
        explanation:
          "MCP lets Claude connect to the tools PMs use every day — Jira, Google Drive, Sheets, Slack, Figma, and more. This means Claude can pull data, create documents, update tickets, and automate workflows that would normally take PMs hours of manual work.",
      },
      {
        question:
          "Do you need to be a software engineer to build MCP servers?",
        options: [
          "Yes, you need a computer science degree",
          "Yes, you need at least 5 years of programming experience",
          "No, MCP servers are small and focused programs, and Claude can help you write the code",
          "No, because MCP servers do not involve any code at all",
        ],
        correctIndex: 2,
        explanation:
          "MCP servers are typically 100-200 lines of TypeScript, and Claude can help you write most of the code. Your job is to understand what the code does and how to configure it. MCP servers do involve code, but you do not need to be a professional developer to build them.",
      },
    ],
  },
};

export default lesson;
