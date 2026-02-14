# QUICKSTART: Your First PRD in 30 Minutes

This guide takes you from zero to a production-ready PRD in 30 minutes.

## Step 0: New to Claude Code?

If you've never used Claude Code before, start with **[Module 0: Claude Code Basics](../module-0-claude-basics/EXPLAINER.md)** first. It takes 20 minutes and covers:
- What Claude Code is (and how it's different from ChatGPT)
- How to install it on Mac, Windows, or Linux
- The 5 terminal commands you need (and nothing more)
- Your first AI conversation

Already have Claude Code installed? Skip to Step 1.

---

## Prerequisites

Before you start, make sure you have:

- [ ] **Claude Code** installed and working — run `claude --version` to check
- [ ] **Node.js 18+** installed ([download](https://nodejs.org)) — run `node --version` to check

**What's a terminal?** It's the text-based app where you type commands. On Mac: press `Cmd + Space`, type "Terminal", hit Enter. On Windows: press `Win + X`, select "Terminal". See [Module 0](../module-0-claude-basics/EXPLAINER.md) for a full walkthrough.

---

## Step 1: Download the Module (2 minutes)

Pick **one** of these three options — they all do the same thing:

### Option A: Ask Claude to do it for you (Easiest)

Open Claude Code in the folder where you want the module, and paste this:

```
Download the PRD Generator module from GitHub. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-1-prd/mcp-server and run npm install && npm run build.
```

Claude will clone the repo, install dependencies, and build the server for you. Skip to Step 2.

### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-1-prd/mcp-server
npm install
npm run build
```

### Option C: Download from GitHub (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip the folder and place it wherever you want to run Claude Code
4. Open Claude Code in the `modules/module-1-prd/mcp-server` folder and say:
   ```
   Run npm install && npm run build
   ```

---

## Step 2: Connect to Claude Code (1 minute)

Open Claude Code in the module folder and paste this single command:

```
Add the PRD Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

Claude will:
1. Find the correct path to `dist/index.js`
2. Add it to your MCP configuration
3. Restart so the PRD Generator is connected

That's it — one prompt, fully configured.

---

## Step 3: Generate Your First PRD (20 minutes)

Open Claude Code and say:

> "I need to write a PRD. Can you help me?"

The PRD Generator agent will:

1. **Show you the available templates** (feature launch, API integration, redesign)
2. **Ask you 10 questions** about your project, one at a time
3. **Generate a structured PRD** from your answers
4. **Validate the PRD** and suggest improvements
5. **Suggest edge cases** you might have missed

### Tips for Great PRDs

- **Be specific with metrics.** "Improve conversion" is vague. "Increase checkout completion from 45% to 60%" is actionable.
- **Don't skip edge cases.** The generator will suggest some, but add your own too.
- **Include a rollback plan.** Even simple features need one.
- **Name your stakeholders.** "Engineering" is too broad. "Backend team, led by [Name]" is better.

## Step 4: Use Your PRD (3 minutes)

Your PRD is generated as Markdown. You can:

- **Copy to Notion** - Paste directly, formatting is preserved
- **Save as .md** - Commit to your repo alongside the code
- **Export to Confluence** - Paste into a new page
- **Share in Google Docs** - Use a Markdown-to-Docs converter

---

## What's Next?

Now that you've generated your first PRD:

1. **Try a different template** - Generate an API integration or redesign PRD
2. **Validate an existing PRD** - Paste any PRD into Claude Code and ask: "Validate this PRD using the PRD generator"
3. **Customize templates** - Edit the templates in `templates/` to match your team's format
4. **Check out Module 2** - [Rollout Plan Generator](../module-2-rollout/) (also free)

---

## Troubleshooting

### "MCP server not found"
Make sure the path in your Claude Code config points to the correct `dist/index.js` file. Run `npm run build` if the `dist/` folder is missing.

### "Cannot find module"
Run `npm install` in the `mcp-server/` directory.

### "Node version too old"
Update Node.js to version 18 or higher: [nodejs.org](https://nodejs.org)

### "command not found: git"
Install Git from [git-scm.com](https://git-scm.com/downloads), or use Option C (Download ZIP) instead.

### "command not found: claude"
Claude Code isn't installed. Follow [Module 0](../module-0-claude-basics/EXPLAINER.md) to install it.

### PRD feels incomplete
Use the `validate_prd` tool to get a completeness score and specific suggestions. Most first PRDs score 60-70% - iterate based on the feedback.

### Still stuck?
Open an issue on GitHub or join the community discussion.

---

## Time Breakdown

| Step | Time | What You Do |
|------|------|-------------|
| Download | 2 min | Clone or download from GitHub |
| Connect | 1 min | One prompt to Claude does it all |
| Generate | 20 min | Answer questions, review output |
| Export | 3 min | Copy to your team's tool |
| **Total** | **~26 min** | **Production-ready PRD** |
