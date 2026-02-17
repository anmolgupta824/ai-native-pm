# Lesson 7: Figma Integration

**Estimated time: 20 minutes**
**Lesson type: Hands-on with Claude**

---

## Why Connect Figma to Claude?

Design is at the heart of product work. As a PM, you're constantly checking Figma for design progress, reviewing specs, tracking component usage, and writing design-related sections of your PRDs.

With Claude connected to Figma, you can:

- "What's the status of the notification center designs?"
- "List all the screens in our mobile app project"
- "Pull the design specs for the checkout flow -- I need them for the PRD"
- "How many components are we using from the design system?"

### The PM-Designer Bridge

PMs and designers work closely together, but they often speak different languages. PMs think in user stories and requirements. Designers think in components, layouts, and interaction patterns.

This integration bridges that gap. You can ask Claude to translate Figma designs into PM-friendly summaries, pull spec data into PRDs, and track design progress without constantly asking "is it done yet?"

---

## Get Your Figma Credentials

Figma uses a simple Personal Access Token -- much easier than Google's OAuth. It takes 1 minute.

### Generate Your Token
1. Go to **figma.com** and log in
2. Click your profile icon in the top-right corner
3. Go to "Settings"
4. Scroll down to "Personal access tokens"
5. Click "Generate new token"
6. Name it "Claude MCP" and click "Generate"
7. Copy the token (starts with "figd_")

That's it -- one token, no OAuth, no consent screens. Give it to Claude and you're done.

---

## Claude Builds the Integration

Tell Claude:

**"Set up a Figma MCP server for me. My token is: [paste your token]"**

Claude will automatically:
1. Copy the pre-built server template (tested and working code)
2. Install all dependencies
3. Compile the server
4. Configure it so Claude can use it

Like Jira, there's no browser authorization step. Figma uses a simple Personal Access Token -- Claude stores it and uses it directly. By now, this pattern should feel familiar: give Claude the credentials, let it build, start using the tools.

### If the Tools Don't Appear

MCP servers load when Claude Code starts up. If Claude just built the server, it may need a fresh session to pick up the new tools. This is normal -- like installing an app and then opening it.

If Claude says the tools aren't available yet:

1. Your progress is saved automatically -- you won't lose your place
2. Type `/exit` to close this Claude session
3. Type `claude` in your terminal to start a fresh session
4. **You may see a prompt saying "New MCP server found in .mcp.json: figma"** with three options. This is Claude Code asking you to trust the server. Select **option 1: "Use this and all future MCP servers in this project"** and press Enter. This is a one-time security check -- you won't see it again.
5. Say "continue the course" and you'll pick up right where you left off, with the Figma tools now available

This only happens once per integration. After the tools load, they stay available in every future session.

After setup, you'll have these tools:
- **list_files** -- Browse your Figma files and projects
- **get_file_info** -- Get details about any Figma file (pages, frames, components)
- **get_comments** -- Read design feedback and comments
- **get_component_info** -- See component details and usage

---

## Try It Out

Let's explore your Figma workspace:

### Browse Your Files
"Show me my recent Figma files"

You'll see your files with names, last modified dates, and project info.

### Explore a Design File
"Show me the pages and frames in my file called '[your-file-name]'"

Claude shows you the structure -- pages, frames, components -- so you can understand what's in the file without opening Figma.

### Read Design Comments
"Show me the comments on '[your-file-name]'. Are there any unresolved ones?"

Great for catching design feedback you might have missed.

### Check Components
"What components are used in '[your-file-name]'? Which ones are from the design system?"

Useful for tracking design system adoption.

---

## PM Workflows

### Design Status Check
"Check all my Figma files for the notifications project. Which files were updated this week? Are there any unresolved comments or feedback?"

Perfect for your Monday design sync -- know the status before the meeting starts.

### PRD Design Section
"Pull the design specs from '[figma-file]' and create a summary I can paste into my PRD. Include: screen names, key user flows, and any design decisions noted in the comments."

Instead of manually screenshotting and writing up the design section, Claude does it for you.

### Design-Dev Handoff Prep
"List all the screens in '[figma-file]' and create a checklist: screen name, status (has comments? resolved?), and whether specs are complete."

This gives you a handoff readiness tracker without manually checking each screen.

### Component Inventory
"What components from our design system are used in the new feature designs? Are there any custom components that aren't in the system yet?"

Useful for design reviews and maintaining consistency.

### Design Review Prep
"Summarize the design file '[name]': how many pages, how many frames per page, and list any unresolved comments. I need this for tomorrow's design review."

---

## Course Wrap-Up: What You've Learned

Congratulations -- you've completed the MCP Integrations Course! Here's what you now know:

### Your New Superpowers

| Integration | What You Can Do |
|------------|----------------|
| **Google Drive** | Create docs, read and summarize docs, organize files |
| **Google Sheets** | Read data, write rows, create spreadsheets, build dashboards |
| **Jira** | Search issues, create tickets, generate sprint reports |
| **Figma** | Browse designs, read comments, pull specs for PRDs |

### The Pattern You Learned

Every integration follows the same pattern:
1. Get your API credentials (1-5 minutes, one time only)
2. Give them to Claude and say "set it up"
3. Start using it with natural language commands

This pattern works for ANY tool with an API. If you need another integration (Slack, Notion, Linear, Datadog, etc.), the same approach applies.

### What's Next

1. **Use these integrations daily.** Start with the one that saves you the most time.
2. **Combine integrations.** "Pull sprint data from Jira and create a status report in Google Drive" -- that's cross-tool workflow magic.
3. **Share with your team.** Show a colleague how you created a sprint report in 30 seconds.
4. **Try other modules.** Module 1 (PRD Generator) and Module 2 (Rollout Plans) complement these integrations perfectly.

---

## Exercise + Quick Check

### Exercise: Cross-Tool Workflow

Try a workflow that combines two or more integrations:

1. Ask Claude to pull data from one tool (Jira issues, or Sheets data)
2. Have Claude create a summary document in Google Drive with that data
3. Review the doc -- does it capture the key information?

This is the real power of MCP -- connecting your tools so Claude can do multi-step workflows.

### Quick Check

1. How do you get a Figma personal access token?
2. What can you do with the Figma integration that helps with PRD writing?
3. What's the universal pattern for setting up any MCP integration? (Answer: get credentials, give to Claude, start using it)

### Before You Go: Keep Your Tokens Alive

Your Figma Personal Access Token has an expiration date. When you created it, you may have set it to 90 days. When it expires, the integration will stop working and you'll need to generate a new token in Figma Settings and update your MCP server configuration.

**Quick reference for all your tokens:**

| Integration | Token Type | Expires? | What to Do |
|------------|-----------|----------|------------|
| **Google Drive/Sheets** | OAuth token | 7 days in Testing mode | Publish app to Production (see Lesson 4) |
| **Jira** | API token | Never (until revoked) | No maintenance needed |
| **Figma** | Personal Access Token | Based on your setting (e.g., 90 days) | Generate a new token in Figma Settings |

If any integration stops working unexpectedly, the first thing to check is whether the token has expired. Now you know exactly where to look for each one.

---

---
Enjoyed this course? Follow Anmol Gupta on LinkedIn → https://linkedin.com/in/anmol-gupta-21875a89

*Previous: [Lesson 6: Jira Integration](6-jira-integration.md)*
