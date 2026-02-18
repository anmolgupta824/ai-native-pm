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

> **First-time setup note:** When you first open Claude Code in this module, you'll see a prompt: *"New MCP server found in .mcp.json"* with options to trust it. Pick **option 1** ("Use this and all future MCP servers in this project"). This is a one-time security check — you won't see it again.

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code in the `module-2-rollout` directory and say:

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

> **First-time setup note:** When you first open Claude Code in this module, you'll see a prompt: *"New MCP server found in .mcp.json"* with options to trust it. Pick **option 1** ("Use this and all future MCP servers in this project"). This is a one-time security check — you won't see it again.

### Step 3: Start Using It

Open Claude Code in the `module-2-rollout` directory and type:

```
Usage mode
```

You'll see all available tools and can start right away — just tell Claude what you need.

Here's what you have:

#### Tools

| Tool | What it does |
|------|-------------|
| `create_rollout_plan` | Generate a complete rollout plan with phased deployment |
| `assess_risks` | Structured risk matrix with likelihood, impact, mitigations |
| `map_stakeholders` | Stakeholder map with RACI and conflict detection |
| `generate_timeline` | Dependency-aware timeline with milestones and buffers |
| `build_rollback_plan` | Step-by-step rollback with trigger conditions |

#### Resources

| Folder | What's inside |
|--------|--------------|
| `templates/` | 5 templates (rollout-plan, risk-matrix, stakeholder-map, timeline, rollback-plan) |
| `examples/` | Example rollout plan (Real-Time Notifications) |

> **Already have a rollout plan?** Drag & drop it into Claude Code, or point to a file. You can assess risks, map stakeholders, or build a rollback plan for it.

#### Example Prompts

```
Create a rollout plan for [your feature]. We have 4 engineers and a Q2 deadline.
```

```
@prd-notifications.md @architecture.md
Assess the risks for our notifications feature rollout.
```

```
Map the stakeholders for our payments redesign. Our org has separate backend and frontend teams, a shared QA team, and Sales is pushing for a Q2 deadline.
```

```
Build a rollback plan for our feature flag deployment of the new dashboard.
```

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
