# PRD Generator — Quick Start

Get up and running in under 10 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)

---

## Choose Your Path

| Path | Who it's for | Time to first result |
|------|-------------|---------------------|
| **A: Learn PRD Generation (Teacher Mode)** | New to AI-assisted PRDs | ~10 min to first lesson |
| **B: Use PRD Tools (Usage Mode)** | Already familiar with PRDs | ~5 min to first PRD |

---

## Path A: Learn PRD Generation (Teacher Mode)

Start here if you want to learn the 4 core techniques for AI-assisted PRD writing.

### Step 1: Download the Module (~2 min)

Pick one of three options:

#### Option A: Ask Claude to do it (Easiest)

Open Claude Code and paste:

```
Download the PRD Generator Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-1-prd/teacher-mode/mcp-server and run npm install && npm run build.
```

#### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-1-prd/teacher-mode/mcp-server
npm install
npm run build
```

#### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip and navigate to `modules/module-1-prd/teacher-mode/mcp-server`
4. Open Claude Code there and say: *"Run npm install && npm run build"*

### Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste:

```
Add the PRD Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code and say:

```
I want to learn how to write better PRDs with AI. Start me on Lesson 1.
```

The Teacher Mode will guide you through 6 lessons covering context loading, Socratic questioning, PRD generation, validation, multi-perspective review, and edge case analysis.

### Teacher Mode Commands

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin the Welcome lesson |
| "Continue" | Get the next section of the current lesson |
| "Start Lesson 4" | Jump to Generating & Validating PRDs |
| "Resume my course" | Pick up where you left off after restarting |
| "Explain what Socratic questioning is" | Get a PM-friendly explanation |
| "Give me an exercise for Lesson 3" | Hands-on practice |
| "Quiz me on Lesson 2" | Test your knowledge |
| "Show my progress" | See completed lessons with section-level detail |

---

## Path B: Jump Straight to Using PRD Tools (Usage Mode)

Already know what you want? Skip the lessons and start generating PRDs immediately.

### Step 1: Download & Build (~3 min)

#### Option A: Ask Claude (Easiest)

```
Download the PRD Generator tools. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-1-prd/mcp-server and run npm install && npx tsc.
```

#### Option B: Git clone

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-1-prd/mcp-server
npm install
npx tsc
```

### Step 2: Connect to Claude Code (~1 min)

```
Add the PRD Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Using It

Try these prompts in Claude Code:

```
@product-strategy.md @user-research.md
I need to write a PRD for a new notifications center. Ask me questions first.
```

```
Generate a PRD for a feature that lets users export dashboards as PDF.
Use the feature-launch template.
```

```
Validate this PRD and tell me what's missing.
```

```
Review this PRD from an engineering perspective. Then from a design perspective.
```

### Available PRD Tools

| Tool | What it does |
|------|-------------|
| `generate_prd` | Generate a complete PRD from context |
| `validate_prd` | Score and grade a PRD for completeness |
| `suggest_edge_cases` | Surface edge cases for a feature |
| `get_template` | Get a PRD template (feature-launch, api-integration, redesign) |
| `list_templates` | See all available templates |
| `review_prd` | Get feedback from Engineer, Designer, and QA perspectives |

---

## Time Breakdown

| Path | Step | Time |
|------|------|------|
| **Teacher** | Download & install | 2 min |
| **Teacher** | Connect to Claude Code | 1 min |
| **Teacher** | Lesson 1 | 10 min |
| **Teacher** | Full course (6 lessons) | 2-3 hrs |
| **Usage** | Download, build, connect | 5 min |

---

## Resuming After Closing Claude Code

Your progress is automatically saved. When you come back:

1. **Open Claude Code** in the same project folder
2. **Say:** `Resume my PRD course`
3. The Teacher will tell you exactly where you left off

> **Note:** The MCP server config persists — you don't need to re-add it each time.

---

## Troubleshooting

**Server not connecting after restart?**
Re-add it:
```
Reconnect the PRD Teacher server. The server file is at ./dist/index.js in the teacher-mode/mcp-server directory. Add it to my Claude Code MCP config and restart.
```

**Build failed?**
Make sure you're in the correct directory and have Node.js 18+:
```bash
node --version  # Should be 18+
npm install
npm run build   # or npx tsc for usage mode
```

**PRD feels incomplete?**
Use the `validate_prd` tool to get a completeness score. Most first PRDs score 60-70% — iterate based on the feedback.

**Still stuck?**
Open an issue on GitHub or join the community discussion.
