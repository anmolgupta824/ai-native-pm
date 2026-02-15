# Rollout Plan Generator — Quick Start

Get up and running in under 10 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)

---

## Choose Your Path

| Path | Who it's for | Time to first result |
|------|-------------|---------------------|
| **A: Learn Rollout Planning (Teacher Mode)** | New to structured rollout planning | ~10 min to first lesson |
| **B: Use Rollout Tools (Usage Mode)** | Already familiar with rollout planning | ~5 min to first plan |

---

## Path A: Learn Rollout Planning (Teacher Mode)

Start here if you want to learn the 5-tool framework for AI-assisted rollout planning.

### Step 1: Download the Module (~2 min)

Pick one of three options:

#### Option A: Ask Claude to do it (Easiest)

Open Claude Code and paste:

```
Download the Rollout Planning Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-2-rollout/teacher-mode/mcp-server and run npm install && npm run build.
```

#### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-2-rollout/teacher-mode/mcp-server
npm install
npm run build
```

#### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip and navigate to `modules/module-2-rollout/teacher-mode/mcp-server`
4. Open Claude Code there and say: *"Run npm install && npm run build"*

### Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste:

```
Add the Rollout Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code and say:

```
I want to learn how to build better rollout plans. Start me on Lesson 1.
```

The Teacher Mode will guide you through 6 lessons covering risk assessment, stakeholder mapping, timeline generation, rollback planning, and end-to-end workflow.

### Teacher Mode Commands

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin the Welcome lesson |
| "Continue" | Get the next section of the current lesson |
| "Start Lesson 2" | Jump to Risk Assessment |
| "Resume my course" | Pick up where you left off after restarting |
| "Explain what a risk matrix is" | Get a PM-friendly explanation |
| "Give me an exercise for Lesson 3" | Hands-on practice |
| "Quiz me on Lesson 4" | Test your knowledge |
| "Show my progress" | See completed lessons with section-level detail |

---

## Path B: Jump Straight to Using Rollout Tools (Usage Mode)

Already know what you want? Skip the lessons and start building rollout plans immediately.

### Step 1: Download & Build (~3 min)

#### Option A: Ask Claude (Easiest)

```
Download the Rollout Plan Generator tools. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-2-rollout/mcp-server and run npm install && npm run build.
```

#### Option B: Git clone

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-2-rollout/mcp-server
npm install
npm run build
```

### Step 2: Connect to Claude Code (~1 min)

```
Add the Rollout Plan Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Using It

Try these prompts in Claude Code:

```
@prd-notifications.md @architecture.md
I need a rollout plan for the notifications feature. Assess the risks first.
```

```
Map the stakeholders for our payments redesign. Our org has separate backend and frontend teams, a shared QA team, and Sales is pushing for a Q2 deadline.
```

```
Generate a 6-week timeline for the search feature rollout. We have 4 engineers and the backend API blocks the frontend integration.
```

```
Build a rollback plan for our feature flag deployment of the new dashboard.
```

### Available Rollout Tools

| Tool | What it does |
|------|-------------|
| `create_rollout_plan` | Generate a complete rollout plan from context |
| `assess_risks` | Structured risk matrix with mitigations |
| `map_stakeholders` | Stakeholder map with RACI and conflict detection |
| `generate_timeline` | Dependency-aware timeline with milestones |
| `build_rollback_plan` | Step-by-step rollback with triggers |

---

## Time Breakdown

| Path | Step | Time |
|------|------|------|
| **Teacher** | Download & install | 2 min |
| **Teacher** | Connect to Claude Code | 1 min |
| **Teacher** | Lesson 1 | 15 min |
| **Teacher** | Full course (6 lessons) | 2-3 hrs |
| **Usage** | Download, build, connect | 5 min |

---

## Resuming After Closing Claude Code

Your progress is automatically saved. When you come back:

1. **Open Claude Code** in the same project folder
2. **Say:** `Resume my rollout planning course`
3. The Teacher will tell you exactly where you left off

> **Note:** The MCP server config persists — you don't need to re-add it each time.

---

## Troubleshooting

**Server not connecting after restart?**
Re-add it:
```
Reconnect the Rollout Teacher server. The server file is at ./dist/index.js in the teacher-mode/mcp-server directory. Add it to my Claude Code MCP config and restart.
```

**Build failed?**
Make sure you're in the correct directory and have Node.js 18+:
```bash
node --version  # Should be 18+
npm install
npm run build
```

**Still stuck?**
Open an issue on GitHub or join the community discussion.
