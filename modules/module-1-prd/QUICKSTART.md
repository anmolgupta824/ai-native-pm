# QUICKSTART: Your First PRD in 30 Minutes

This guide takes you from zero to a production-ready PRD in 30 minutes.

## Prerequisites

Before you start, make sure you have:

- [ ] **Node.js 18+** installed ([download](https://nodejs.org))
- [ ] **Claude Code** installed ([install guide](https://docs.anthropic.com/en/docs/claude-code))

Not sure if you have Node.js? Run this in your terminal:
```bash
node --version
```
You should see `v18.x.x` or higher.

---

## Step 1: Clone & Install (5 minutes)

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pm-ai-toolkit.git
cd pm-ai-toolkit/module-1-prd/mcp-server

# Install dependencies
npm install

# Build the server
npm run build
```

## Step 2: Add to Claude Code (2 minutes)

Add the MCP server to your Claude Code configuration.

Open your Claude Code settings and add this MCP server:

```json
{
  "mcpServers": {
    "prd-generator": {
      "command": "node",
      "args": ["/path/to/pm-ai-toolkit/module-1-prd/mcp-server/dist/index.js"]
    }
  }
}
```

Replace `/path/to/` with your actual path.

Restart Claude Code to pick up the new server.

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

### PRD feels incomplete
Use the `validate_prd` tool to get a completeness score and specific suggestions. Most first PRDs score 60-70% - iterate based on the feedback.

### Still stuck?
Open an issue on GitHub or join the community discussion.

---

## Time Breakdown

| Step | Time | What You Do |
|------|------|-------------|
| Install | 5 min | Clone, npm install, build |
| Configure | 2 min | Add MCP server to Claude Code |
| Generate | 20 min | Answer questions, review output |
| Export | 3 min | Copy to your team's tool |
| **Total** | **30 min** | **Production-ready PRD** |
