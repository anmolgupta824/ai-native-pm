# MCP Integrations Course — Quick Start

Get from zero to your first MCP lesson in under 10 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)

---

## Step 1: Download the Module (~2 min)

Pick one of three options — they all do the same thing:

### Option A: Ask Claude to do it (Easiest)

Open Claude Code in the folder where you want the course, and paste:

```
Download the MCP Integrations Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/teacher-mode/mcp-server and run npm install && npm run build.
```

Claude will clone, install, and build everything for you.

### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-3-mcp-course/teacher-mode/mcp-server
npm install
npm run build
```

### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip and place the folder wherever you want
4. Open Claude Code in the `teacher-mode/mcp-server` folder and say: *"Run npm install && npm run build"*

---

## Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste this single prompt:

```
Add the MCP Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

> **One prompt, fully configured.** Claude will find the path, update your config, and restart.

---

## Step 3: Start Your First Lesson (~5 min)

Open Claude Code and say:

```
I want to learn MCP from scratch. Start me on Lesson 1.
```

The Teacher Mode will guide you through:
1. What MCP is and why it matters
2. REST API fundamentals
3. How MCP servers work
4. Building real integrations (Jira, Google, Figma)

---

## Available Commands

Once connected, try these in Claude Code:

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin the Welcome lesson |
| "Start Lesson 4" | Jump to Jira integration |
| "Explain what OAuth is" | Get a PM-friendly explanation |
| "Give me an exercise for Lesson 3" | Hands-on practice |
| "Quiz me on Lesson 2" | Test your knowledge |
| "Show my progress" | See completed lessons |

---

## Time Breakdown

| Step | Time |
|------|------|
| Download & install | 2 min |
| Connect to Claude Code | 1 min |
| Lesson 1: Welcome | 10 min |
| **Total to first lesson** | **~13 min** |
| Full course (all 8 lessons) | 4-5 hrs |

---

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues, or ask Claude:

```
I'm having trouble with the MCP Teacher. Help me debug.
```

---

## What's Next?

After completing the course, check out the **Usage Mode templates** for production-ready MCP servers:

```bash
cd ../usage-mode/templates/jira-mcp
npm install && npm run build
```

Then connect the Jira server to Claude Code and start automating your PM workflow.
