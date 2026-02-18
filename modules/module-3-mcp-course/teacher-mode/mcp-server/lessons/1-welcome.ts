import { LessonContent } from "../index.js";

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
  sections: [
    {
      id: "what-is-mcp",
      title: "What is MCP?",
      content: `MCP stands for **Model Context Protocol**. It is an open standard created by Anthropic that lets Claude talk directly to external tools — Jira, Google Drive, Slack, Figma, and more.

Without MCP, Claude is like a brilliant colleague locked in a room with no phone. With MCP, Claude gets a phone, a computer, and access to your tools.`,
      checkQuestion: "Can you think of a task you do every week that involves copying data between two or more tools?",
    },
    {
      id: "before-mcp",
      title: "The Copy-Paste Tax",
      content: `Without MCP, your PM workflow looks like this:

1. Open Jira, read through 15 tickets
2. Open Sheets, copy sprint velocity numbers
3. Open Docs, type a status report
4. Alt-tab between all three for 45 minutes
5. Paste into Slack

This is the "copy-paste tax." It is tedious, error-prone, and requires none of your actual PM skills.`,
      teacherNotes: "Ask the student what their version of this workflow looks like.",
    },
    {
      id: "after-mcp",
      title: "After MCP",
      content: `With MCP, you tell Claude:

> "Pull the sprint tickets from Jira, read the velocity tracker in Sheets, and draft a status report in Docs."

Claude does all of it — by calling the APIs of each tool through MCP servers you set up. The difference is not incremental. It is a fundamentally different way of working.`,
      checkQuestion: "What multi-tool workflow eats the most time in your week?",
    },
    {
      id: "why-pms-care",
      title: "Why PMs Should Care",
      content: `PMs who learn MCP get a superpower:

1. **Automate repetitive work** — status reports, sprint summaries, stakeholder updates
2. **Get real-time answers** — "What are the open P0 bugs?" instead of Jira filter diving
3. **Connect your tools** — Figma → Jira → Sheets → Docs in one conversation
4. **Stand out in your career** — AI-native PMs are extremely valuable`,
      checkQuestion: "Which of these four benefits resonates most with you?",
    },
    {
      id: "no-engineering-needed",
      title: "No Engineering Degree Required",
      content: `MCP servers are small — typically 100-200 lines of TypeScript. And here is the secret: **Claude will help you write most of the code.**

Your job is to understand what the code does, not memorize syntax. Think of it like writing a PRD — you understand the system well enough to direct the work and review what gets built.`,
    },
    {
      id: "what-you-will-build",
      title: "What You Will Build",
      content: `Over 8 lessons, you will build real integrations:

| Lesson | What You Build |
|--------|---------------|
| 1 | (This lesson) — MCP overview and setup |
| 2 | REST API knowledge |
| 3 | MCP architecture deep dive |
| 4 | Jira MCP Server |
| 5 | Google Drive MCP Server |
| 6 | Google Sheets MCP Server |
| 7 | Custom MCP Server (any API) |
| 8 | Figma MCP Server |`,
      teacherNotes: "Keep this brief. Just show the arc, don't deep-dive into individual lessons.",
    },
    {
      id: "prerequisites",
      title: "Prerequisites",
      content: `Make sure you have:

- **Claude Code installed** — type \`claude\` in your terminal to check. If not, visit Module 0.
- **Basic terminal familiarity** — if you have used \`cd\` or \`git\`, you are ready.
- **Tool accounts (later)** — Jira (Lesson 4), Google (Lessons 5-6), Figma (Lesson 8). We set these up as we go.`,
      checkQuestion: "Do you have Claude Code installed? If not, let me know and I'll help.",
    },
    {
      id: "how-course-works",
      title: "How This Course Works",
      content: `Each lesson has three steps:

1. **Learn** — read the lesson content (like now)
2. **Exercise** — hands-on practice
3. **Quiz** — confirm understanding

The exercises are the most important part. MCP is a hands-on skill. Ready? Complete the exercise below, then we move to Lesson 2: REST APIs.`,
      teacherNotes: "Reassure them that Claude helps write most code. Their job is to understand, not memorize.",
    },
  ],
  exercise: {
    title: "Verify Your MCP Environment",
    description:
      "Open Claude Code and check what MCP servers are currently configured. This confirms your environment is ready.",
    steps: [
      "Open your terminal application",
      'Launch Claude Code by typing: claude',
      'Type: "What MCP servers do I have installed? List them."',
      "Read the output. No MCP servers? That is fine — you will build them in this course.",
      'Try: "Explain what MCP is in one paragraph." Compare to what you learned.',
      "Exit Claude Code with /exit or Ctrl+C",
    ],
    validation:
      "You completed this exercise if: (1) Claude Code launched without errors, (2) you got a response about MCP servers (even if empty), and (3) Claude explained MCP.",
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
          "MCP stands for Model Context Protocol. It is an open standard by Anthropic that lets Claude communicate with external tools through dedicated server processes.",
      },
      {
        question:
          "What is the primary benefit of MCP for Product Managers?",
        options: [
          "It replaces the need for a PM entirely",
          "It lets Claude directly access PM tools like Jira, Google Docs, and Sheets",
          "It provides a visual drag-and-drop interface",
          "It automatically writes code for engineers",
        ],
        correctIndex: 1,
        explanation:
          "MCP lets Claude connect to PM tools — Jira, Drive, Sheets, Slack, Figma. Claude can pull data, create docs, update tickets, and automate workflows.",
      },
      {
        question:
          "Do you need to be a software engineer to build MCP servers?",
        options: [
          "Yes, you need a CS degree",
          "Yes, you need 5+ years of experience",
          "No, MCP servers are small programs and Claude helps write the code",
          "No, because MCP servers don't involve code",
        ],
        correctIndex: 2,
        explanation:
          "MCP servers are 100-200 lines of TypeScript and Claude helps write most of the code. Your job is to understand what it does, not memorize syntax.",
      },
    ],
  },
};

export default lesson;
