# Module 0: Your First 20 Minutes with Claude Code

**Time:** 20 minutes | **Prerequisites:** None | **Cost:** Free

> You don't need to be technical to use Claude Code. You just need to be curious.

---

## Overview

Claude Code is a command-line AI assistant that lives in your terminal. Think of it as a brilliant colleague who can read your files, write code, search the web, and execute tasks — all through a conversation.

You're probably thinking: "I'm a PM, not an engineer. Why would I use the terminal?"

Because Claude Code lets you do things that used to require engineering support: generate documents, automate workflows, build prototypes, and analyze data — all by describing what you want in plain English.

This module gets you from "never opened a terminal" to "having a productive conversation with Claude Code" in 20 minutes.

---

## Claude Code vs Other AI Tools

| Feature | Claude.ai (Chat) | ChatGPT | Claude Code |
|---------|-----------------|---------|-------------|
| Works with your files | No (upload only) | No (upload only) | Yes — reads & writes directly |
| Runs commands | No | No | Yes — executes tasks on your machine |
| Connects to tools (MCP) | Limited | No | Yes — Google Docs, Jira, databases |
| Remembers project context | Per conversation | Per conversation | Per project folder |
| Best for PMs when... | Quick questions, brainstorming | General chat | Building workflows, generating docs, automating tasks |

**The key difference:** Claude.ai and ChatGPT are *chat tools*. Claude Code is a *work tool*. It operates on your actual files and projects, not just conversations.

---

## Step 1: Get Claude Code (5 min)

### What You Need First

1. **An Anthropic account** — Sign up at [console.anthropic.com](https://console.anthropic.com) if you don't have one
2. **A Claude Pro, Team, or Enterprise plan** — Claude Code requires a paid Anthropic subscription (~$20/month)

### Install on Mac

Open **Terminal** (press `Cmd + Space`, type "Terminal", hit Enter) and run:

```
npm install -g @anthropic-ai/claude-code
```

Don't have npm? Install Node.js first from [nodejs.org](https://nodejs.org) (pick the LTS version), then run the command above.

### Install on Windows

Open **PowerShell** (press `Win + X`, select "Terminal") and run:

```
npm install -g @anthropic-ai/claude-code
```

### Install on Linux

Open your terminal and run:

```
npm install -g @anthropic-ai/claude-code
```

### Verify It Worked

Run this command:

```
claude --version
```

You should see a version number. If you do, you're ready.

---

## Step 2: Terminal Basics for PMs (3 min)

The terminal is just a text-based way to talk to your computer. Instead of clicking folders, you type commands. You only need five:

| Command | What It Does | Example |
|---------|-------------|---------|
| `pwd` | Shows where you are | `pwd` → `/Users/you/Documents` |
| `ls` | Lists files in current folder | `ls` → shows all files |
| `cd` | Changes folder | `cd Documents` → moves into Documents |
| `cd ..` | Goes up one folder | `cd ..` → moves back |
| `mkdir` | Creates a new folder | `mkdir my-project` → creates folder |

That's it. Five commands. Everything else, Claude Code handles for you.

### Quick Practice

Open your terminal and try:

```
pwd
ls
mkdir claude-test
cd claude-test
pwd
```

You just created a folder and navigated into it. That's all the terminal knowledge you need.

---

## Step 3: Your First Conversation (10 min)

### Start Claude Code

Navigate to any project folder (or the one you just created) and type:

```
claude
```

Claude Code starts up and you'll see a prompt where you can type. This is your conversation interface.

### Try These Starter Prompts

**Ask a simple question:**
```
What files are in this folder?
```

**Create something:**
```
Create a markdown file called meeting-notes.md with a template for
weekly product team meetings. Include sections for attendees,
agenda, decisions, and action items.
```

**Analyze a file:**
```
@meeting-notes.md Improve this template. Add sections that senior
PMs typically include but juniors forget.
```

Notice the `@` symbol? That's how you point Claude Code at specific files. It reads the file and uses it as context.

### What Just Happened

Claude Code didn't just suggest text in a chat bubble. It actually:
1. Read the files on your computer
2. Created or modified real files
3. Used your project context to give better answers

This is the fundamental difference from ChatGPT or Claude.ai.

---

## Step 4: Key Concepts (2 min)

### @-Mentions
Point Claude at specific files by typing `@filename`. Claude reads the file and uses it as context.

```
@quarterly-report.md Summarize the key metrics from this report
```

### Tools
Claude Code can do more than chat. It reads files, writes files, runs commands, searches the web, and connects to external services. These capabilities are called "tools."

### MCP Servers
MCP (Model Context Protocol) servers extend what Claude Code can do. Think of them as plugins. The modules in this course give you MCP servers that connect Claude Code to PM workflows — like generating PRDs, creating rollout plans, or automating status reports.

### Project Memory
Claude Code remembers context within a project folder. When you start Claude Code in the same folder, it picks up where you left off. This means your PRDs, templates, and configurations persist between sessions.

---

## Troubleshooting

**"command not found: claude"**
Node.js isn't in your PATH, or the install didn't complete. Try: `npx @anthropic-ai/claude-code` as an alternative.

**"command not found: npm"**
Install Node.js from [nodejs.org](https://nodejs.org) first, then retry the install command.

**Claude Code starts but feels slow**
First-time startup takes a few seconds to initialize. Subsequent starts are faster.

**"authentication error" or "API key" message**
Run `claude` and follow the login prompts. You'll need your Anthropic account credentials.

---

## You're Ready

That's it. You now know:
- What Claude Code is and how it's different from ChatGPT
- How to install it
- The 5 terminal commands you need
- How to have your first conversation
- What @-mentions, tools, and MCP servers are

**Next step:** Jump into [Module 1: PRD Generator](/modules/1-prd-generator) and generate your first production-ready PRD in 30 minutes.
