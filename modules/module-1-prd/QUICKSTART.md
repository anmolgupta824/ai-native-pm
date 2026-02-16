# PRD Generator — Quick Start

Get up and running in under 10 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)

---

## Choose Your Path

| Path | Who it's for | Time to first result |
|------|-------------|---------------------|
| **A: Learn PRD Generation (Teaching Mode)** | New to AI-assisted PRDs | ~10 min to first PRD draft |
| **B: Use PRD Tools (Usage Mode)** | Already familiar with PRDs | ~5 min to first PRD |

---

## Path A: Learn PRD Generation (Teaching Mode)

Start here to build a complete PRD from scratch over 6 lessons.

### Step 1: Download the Module (~2 min)

Pick one of three options:

#### Option A: Ask Claude to do it (Easiest)

Open Claude Code and paste:

```
Download the PRD Generator Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-1-prd/mcp-server and run npm install && npx tsc.
```

#### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-1-prd/mcp-server
npm install
npx tsc
```

#### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button > **"Download ZIP"**
3. Unzip and navigate to `modules/module-1-prd/mcp-server`
4. Open Claude Code there and say: *"Run npm install && npx tsc"*

### Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste:

```
Add the PRD Generator as an MCP server. The server file is at ./dist/index.js in the mcp-server directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code in the `module-1-prd` directory and say:

```
I want to learn how to write better PRDs with AI. Start me on Lesson 1.
```

The Teaching Mode will guide you through 5 lessons:

| Lesson | What You'll Do | Duration |
|--------|---------------|----------|
| 1 | Pick a template, answer all questions, generate first draft | 20 min |
| 2 | Socratic questioning, add alternative approaches | 15 min |
| 3 | Automated scoring, fix gaps, add edge cases | 15 min |
| 4 | Simulated stakeholder review from 9 perspectives | 15 min |
| 5 | Final validation, compare journey, export | 10 min |

### Teaching Mode Commands

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin building your PRD |
| "Continue" | Get the next section of the current lesson |
| "Start Lesson 3" | Jump to Validate & Improve |
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
Add the PRD Generator as an MCP server. The server file is at ./dist/index.js in the mcp-server directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Using It

Open Claude Code in the `module-1-prd` directory and type:

```
Usage mode
```

You'll see all available tools and can start right away — just tell Claude what you need.

Here's what you have:

#### Tools

| Tool | What it does |
|------|-------------|
| `list_templates` | Browse all templates (Feature Launch, API Integration, Redesign, PRFAQ) |
| `get_questions` | Get the 10-question questionnaire for any template |
| `generate_prd` | Generate a full PRD from a template + your answers |
| `generate_prd_custom` | Generate a PRD with your own custom section headings |
| `validate_prd` | Score any PRD for completeness (A-D grade) |
| `validate_prd_file` | Score a PRD from a file path |
| `suggest_edge_cases` | Surface edge cases for your feature type |
| `review_prd` | Stakeholder feedback from 9 perspectives: backend_eng, frontend_eng, designer, qa, finance, legal, compliance, pm, marketing |

#### Resources

| Folder | What's inside |
|--------|--------------|
| `examples/` | 6 example PRDs (2 per template type) |
| `templates/` | 4 PRD templates (feature-launch, api-integration, redesign, prfaq) |
| `references/` | 3 sample docs for @-mention practice |
| `output/` | Your saved PRD drafts |

> **Already have a PRD?** Drag & drop it into Claude Code, or point to a file in `output/`. You can validate it, review it from stakeholder perspectives, or suggest edge cases.

#### Example Prompts

```
Generate a PRD for a feature that lets users export dashboards as PDF.
Use the feature-launch template.
```

```
@references/product-strategy.md @references/user-research.md
I need to write a PRD for a new notifications center. Ask me questions first.
```

```
Validate this PRD and tell me what's missing.
```

```
Review this PRD from a backend_eng and designer perspective.
```

```
I want to use my company's custom PRD format. Here are my sections: [list them]
```

---

## Time Breakdown

| Path | Step | Time |
|------|------|------|
| **Teacher** | Download & install | 2 min |
| **Teacher** | Connect to Claude Code | 1 min |
| **Teacher** | Lesson 1 | 15 min |
| **Teacher** | Full course (5 lessons) | ~75 min |
| **Usage** | Download, build, connect | 5 min |

---

## Resuming After Closing Claude Code

Your progress is automatically saved. When you come back:

1. **Open Claude Code** in the `module-1-prd` directory
2. **Say anything** — Claude will detect your saved progress and offer to resume
3. Your PRD drafts are in `output/` — they persist between sessions

> **Note:** The MCP server config persists — you don't need to re-add it each time.

---

## Troubleshooting

**Server not connecting after restart?**
Re-add it:
```
Reconnect the PRD Generator server. The server file is at ./dist/index.js in the mcp-server directory. Add it to my Claude Code MCP config and restart.
```

**Build failed?**
Make sure you're in the correct directory and have Node.js 18+:
```bash
node --version  # Should be 18+
npm install
npx tsc
```

**PRD feels incomplete?**
Use the `validate_prd` tool to get a completeness score. Most first PRDs score 60-70% — iterate based on the feedback.

**Still stuck?**
Open an issue on GitHub or join the community discussion.
