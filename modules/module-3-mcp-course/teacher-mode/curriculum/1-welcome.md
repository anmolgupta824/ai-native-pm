# Lesson 1: Welcome to MCP

**Estimated reading time: 10 minutes**
**Lesson type: Conceptual + First hands-on command**

---

## What You'll Learn

By the end of this lesson, you will understand:

- What MCP (Model Context Protocol) is and why it exists
- Why it is a game-changer for Product Managers specifically
- What you will build across all 8 lessons of this course
- The key vocabulary you need to follow along

No coding required for this lesson. Just reading, understanding, and one simple command.

---

## What is MCP?

### The Simple Explanation

Think about how you use Claude today. You type a question, Claude types an answer. It is a conversation -- like texting a very smart colleague.

Now imagine that colleague could also:
- Open your Jira board and pull the latest sprint data
- Create a Google Doc with a status report pre-filled
- Read your team's capacity spreadsheet in Google Sheets
- Check the latest Figma designs and summarize what changed

**That is what MCP does.** It gives Claude "hands" to reach into the tools you already use every day.

### The Formal Definition

MCP stands for **Model Context Protocol**. It is an open standard created by Anthropic that lets AI assistants like Claude connect to external tools and data sources.

Without MCP, Claude is a brain in a jar -- brilliant but isolated. With MCP, Claude becomes a brain with hands, able to interact with the real world of your PM tools.

### The Analogy That Makes It Click

Think of MCP like a **universal remote control**.

Your living room has a TV, a soundbar, a streaming box, and smart lights. Each device has its own remote with its own buttons. You are constantly juggling remotes.

A universal remote learns how to talk to each device. You press one button, and it sends the right signal to the right device.

MCP is that universal remote for Claude:
- **Claude** = you holding the remote
- **MCP Servers** = the individual device adapters (one for Jira, one for Google Docs, one for Figma)
- **Tools** = the buttons on the remote (create_issue, read_spreadsheet, get_comments)

You tell Claude what you want in plain English, and MCP translates that into the right action on the right tool.

---

## Why Should PMs Care?

You might be thinking: "I am a PM, not a developer. Why do I need to know about protocols?"

Here is the honest answer: **you do not need to understand the protocol in depth.** What you need is to be able to set up these connections so Claude can automate the tedious parts of your job.

Let us look at three real scenarios.

### Scenario 1: The Monday Morning Status Report

**Without MCP (today):**
1. Open Jira, filter by your sprint (2 min)
2. Count tickets by status -- To Do, In Progress, Done (3 min)
3. Check for blockers and overdue items (5 min)
4. Open Google Docs, create a new doc (1 min)
5. Type up the status report with all the numbers (10 min)
6. Share it with your stakeholders (1 min)

**Total: ~22 minutes every Monday**

**With MCP (after this course):**
1. Tell Claude: "Pull this sprint's data from Jira, create a status report in Google Docs, and share it with the team."
2. Claude does all of it in under 30 seconds.

**Total: ~1 minute every Monday. That is 21 minutes saved per week, or 18 hours per year.**

### Scenario 2: Sprint Planning Prep

**Without MCP:**
1. Export backlog from Jira to a spreadsheet (5 min)
2. Cross-reference with capacity in Google Sheets (10 min)
3. Prioritize based on story points and team availability (15 min)
4. Create sprint scope document (10 min)

**Total: ~40 minutes per sprint**

**With MCP:**
1. Tell Claude: "Read the backlog from Jira, check team capacity in our Sheets tracker, and recommend a sprint scope."
2. Claude reads both sources, does the math, and gives you a recommendation.

**Total: ~5 minutes per sprint**

### Scenario 3: Design Review Follow-up

**Without MCP:**
1. Review Figma comments from the design review (10 min)
2. Create Jira tickets for each piece of feedback (15 min)
3. Link Figma frames to the tickets manually (10 min)
4. Send a summary email to the team (5 min)

**Total: ~40 minutes per design review**

**With MCP:**
1. Tell Claude: "Read the comments on our Figma file, create Jira tickets for each actionable item, and draft a summary."
2. Claude handles the cross-tool workflow end to end.

**Total: ~3 minutes per design review**

### The Bigger Picture

These three scenarios alone save you **3-5 hours per week**. Over a year, that is **150-250 hours** -- more than six full work weeks.

But the real value is not just time saved. It is **cognitive load reduced**. Instead of context-switching between five browser tabs and manually copying data between tools, you stay focused on the decisions that actually need your PM brain.

---

## What You'll Build in This Course

Here is your roadmap across all 8 lessons:

| Lesson | Title | What You'll Do | Time |
|--------|-------|---------------|------|
| 1 | Welcome to MCP | Understand MCP and run your first command | 10 min |
| 2 | REST API Primer | Learn how apps talk to each other | 30-60 min |
| 3 | How MCP Works | Understand the architecture and code structure | 30 min |
| 4 | Jira Integration | Build an MCP server that connects Claude to Jira | 45 min |
| 5 | Google Drive | Build an MCP server for Google Drive | 45 min |
| 6 | Google Sheets | Build an MCP server for Google Sheets | 45 min |
| 7 | Custom Servers | Learn the universal pattern for ANY API | 90 min |
| 8 | Figma Integration | Build an MCP server for Figma | 45 min |

**By the end of this course**, you will have four working MCP servers that connect Claude to Jira, Google Drive, Google Sheets, and Figma. More importantly, you will understand the pattern well enough to connect Claude to any tool with an API.

---

## Prerequisites

Before starting Lesson 2, make sure you have:

### 1. Claude Code Installed
If you completed Module 0, you already have this. If not, install Claude Code by following the setup guide at [claude.ai/code](https://claude.ai/code).

To verify, open your terminal and type:
```
claude --version
```
You should see a version number. If you see "command not found," revisit the installation guide.

### 2. Node.js 18 or Higher
Node.js is the engine that runs our MCP servers. Think of it like how your computer needs an operating system to run apps -- MCP servers need Node.js to run.

To check if you have it:
```
node --version
```
You should see `v18.x.x` or higher. If not, download it from [nodejs.org](https://nodejs.org) -- choose the LTS (Long Term Support) version.

### 3. A Text Editor (Optional)
Claude Code will write all the code for you, but it helps to be able to look at files. VS Code is a popular free option: [code.visualstudio.com](https://code.visualstudio.com).

### 4. Curiosity
Seriously. No coding experience is required. Every line of code will be explained. Every concept will have an analogy. If something does not make sense, that is the lesson's fault, not yours.

---

## Your First MCP Command

Let us do something hands-on right now to see MCP in action.

### Step 1: Open Claude Code

Open your terminal (Terminal on Mac, Command Prompt or PowerShell on Windows) and type:

```
claude
```

This starts an interactive Claude Code session.

### Step 2: Ask About MCP Servers

Type this exactly:

```
What MCP servers do I have installed?
```

### Step 3: Read the Output

Claude will respond with one of two things:

**If you have no MCP servers installed:**
```
You don't currently have any MCP servers configured.
```
This is completely normal. You have not built any yet. That is what this course is for.

**If you have MCP servers from Module 1:**
```
You have the following MCP servers configured:
- prd-generator: A PRD generation tool with 5 tools available
```
If you see this, great -- you already have your first MCP server from Module 1.

### What Just Happened?

When you asked that question, Claude checked its configuration file to see what MCP servers are registered. This configuration file lives at:

- **Mac/Linux:** `~/.claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

We will look at this file in detail in Lesson 3. For now, just know that it is the "address book" that tells Claude which MCP servers exist and how to connect to them.

---

## Key Terms Glossary

These terms will come up throughout the course. Bookmark this section.

### MCP (Model Context Protocol)
The open standard that lets AI assistants connect to external tools. Think of it as the "language" Claude uses to talk to your apps.

### MCP Server
A small program that acts as a bridge between Claude and a specific tool (like Jira or Google Sheets). Each tool gets its own MCP server. Think of it as an adapter -- like how a USB-C adapter lets your laptop talk to an HDMI monitor.

### Tool
A specific action that an MCP server can perform. For example, a Jira MCP server might have tools like `create_issue`, `search_issues`, and `update_issue`. Tools are the "buttons" on our universal remote.

### Resource
Data that an MCP server can provide to Claude for context. For example, a resource might be "the current sprint's tickets" or "the team's capacity spreadsheet." Resources are read-only -- Claude can look at them but not change them.

### Prompt
A pre-written template that combines tools and resources into a useful workflow. For example, a "weekly status report" prompt might tell Claude to read sprint data (resource), summarize it (Claude's brain), and create a document (tool).

### Transport
The communication method between Claude and an MCP server. For our purposes, this will always be **stdio** (standard input/output), which means Claude and the MCP server talk through your terminal. Think of it as a direct phone line versus going through a switchboard.

### JSON
The data format that APIs and MCP use to send information back and forth. We will cover this in depth in Lesson 2. For now, think of it as a very structured way to organize information -- like a form with labeled fields instead of a paragraph of text.

### API (Application Programming Interface)
The "menu" that a tool like Jira or Google Sheets publishes, listing all the things other programs can ask it to do. We will cover this thoroughly in Lesson 2.

---

## What is Next?

In Lesson 2, you will learn the foundation that makes all of this work: **REST APIs**. Understanding APIs is like understanding how roads work before you learn to drive. You do not need to build the roads, but you need to know how they connect places.

Lesson 2 is the longest foundational lesson, but it is also the one that will make everything else click. Take your time with it.

---

## Quick Check

Before moving on, make sure you can answer these questions:

1. In one sentence, what does MCP do?
2. Name two PM tasks that MCP could automate.
3. What is the difference between a Tool and a Resource?
4. What command did you run to check your installed MCP servers?

If you can answer all four, you are ready for Lesson 2.

---

*Next lesson: [Lesson 2: REST API Primer -- How Apps Talk to Each Other](2-rest-api-primer.md)*
