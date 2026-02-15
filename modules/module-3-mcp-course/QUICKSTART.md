# MCP Integrations Course — Quick Start

Get up and running in under 10 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)

---

## Choose Your Path

| Path | Who it's for | Time to first result |
|------|-------------|---------------------|
| **A: Learn MCP (Teacher Mode)** | New to MCP or APIs | ~13 min to first lesson |
| **B: Use MCP Templates (Usage Mode)** | Already know MCP basics | ~5 min to connected Jira server |

---

## Path A: Learn MCP from Scratch (Teacher Mode)

Start here if you're new to MCP, APIs, or integrations. The Teacher walks you through everything step by step.

### Step 1: Download the Module (~2 min)

Pick one of three options — they all do the same thing:

#### Option A: Ask Claude to do it (Easiest)

Open Claude Code in the folder where you want the course, and paste:

```
Download the MCP Integrations Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/teacher-mode/mcp-server and run npm install && npm run build.
```

Claude will clone, install, and build everything for you.

#### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-3-mcp-course/teacher-mode/mcp-server
npm install
npm run build
```

#### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip and place the folder wherever you want
4. Open Claude Code in the `teacher-mode/mcp-server` folder and say: *"Run npm install && npm run build"*

### Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste this single prompt:

```
Add the MCP Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

> **One prompt, fully configured.** Claude will find the path, update your config, and restart.

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code and say:

```
I want to learn MCP from scratch. Start me on Lesson 1.
```

The Teacher Mode will guide you through 8 lessons covering MCP fundamentals, REST APIs, and building real integrations (Jira, Google Drive, Sheets, Figma).

### Teacher Mode Commands

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin the Welcome lesson |
| "Start Lesson 4" | Jump to Jira integration |
| "Explain what OAuth is" | Get a PM-friendly explanation |
| "Give me an exercise for Lesson 3" | Hands-on practice |
| "Quiz me on Lesson 2" | Test your knowledge |
| "Show my progress" | See completed lessons |

---

## Path B: Jump Straight to Using MCP (Usage Mode)

Already comfortable with MCP? Skip the lessons and install a production-ready Jira MCP server in 5 minutes.

### Step 1: Download & Build (~3 min)

#### Option A: Ask Claude (Easiest)

```
Download the Jira MCP template. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/usage-mode/templates/jira-mcp and run npm install && npm run build.
```

#### Option B: Git clone

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-3-mcp-course/usage-mode/templates/jira-mcp
npm install
npm run build
```

### Step 2: Set Environment Variables

Add these to your shell profile (`~/.zshrc` or `~/.bashrc`):

```bash
export JIRA_BASE_URL="https://yourcompany.atlassian.net"
export JIRA_EMAIL="you@company.com"
export JIRA_API_TOKEN="your-api-token-here"
```

Then reload: `source ~/.zshrc`

> Need a Jira API token? Go to [id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens) and create one.

### Step 3: Connect to Claude Code (~1 min)

```
Add the Jira MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 4: Start Using It

Try these prompts in Claude Code:

```
List all my Jira projects
```

```
Create a Bug in the MOBILE project: Login button unresponsive on iOS 17
```

```
Find all open stories assigned to me
```

```
Move PROJ-456 to In Progress
```

### Available Jira Tools

| Tool | What it does |
|------|-------------|
| `jira_list_projects` | List all accessible projects |
| `jira_get_issue` | Get full details of an issue |
| `jira_create_issue` | Create Bug, Story, Task, or Epic |
| `jira_search_issues` | Search with JQL queries |
| `jira_update_issue` | Update fields or transition status |

> **Full details:** See [usage-mode/templates/jira-mcp/README.md](./usage-mode/templates/jira-mcp/README.md) for troubleshooting and advanced usage.

---

## Time Breakdown

| Path | Step | Time |
|------|------|------|
| **Teacher** | Download & install | 2 min |
| **Teacher** | Connect to Claude Code | 1 min |
| **Teacher** | Lesson 1 | 10 min |
| **Teacher** | Full course (8 lessons) | 4-5 hrs |
| **Usage** | Download, build, connect | 5 min |

---

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues, or ask Claude:

```
I'm having trouble with the MCP server. Help me debug.
```
