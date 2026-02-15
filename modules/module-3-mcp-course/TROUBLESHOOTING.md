# MCP Integrations Course — Troubleshooting

Common issues and how to fix them.

---

## Setup Issues

### "MCP server not found" or "Failed to connect"

**Cause:** The path in your Claude Code config doesn't point to the right file.

**Fix:**
1. Make sure you ran `npm run build` in the `mcp-server/` directory
2. Check that `dist/index.js` exists: `ls dist/index.js`
3. Verify the full path in your config is correct
4. Ask Claude: *"Check my MCP config and fix the path to the teacher mode server"*

### "Cannot find module @modelcontextprotocol/sdk"

**Cause:** Dependencies not installed.

**Fix:**
```bash
cd teacher-mode/mcp-server
npm install
npm run build
```

### "command not found: node"

**Cause:** Node.js is not installed.

**Fix:** Install Node.js 18+:
- Mac: `brew install node` or download from [nodejs.org](https://nodejs.org)
- Windows: Download from [nodejs.org](https://nodejs.org)

### "command not found: claude"

**Cause:** Claude Code is not installed.

**Fix:** Go to [Module 0](../module-0-claude-basics/) to install Claude Code.

### "command not found: git"

**Cause:** Git is not installed.

**Fix:** Use Option C (Download ZIP) from the QUICKSTART, or install Git:
- Mac: `brew install git` or `xcode-select --install`
- Windows: Download from [git-scm.com](https://git-scm.com)

---

## Jira API Issues

### "401 Unauthorized"

**Cause:** Invalid or missing Jira credentials.

**Fix:**
1. Go to [id.atlassian.com/manage/api-tokens](https://id.atlassian.com/manage/api-tokens)
2. Create a new API token
3. Set environment variables:
   ```bash
   export JIRA_BASE_URL="https://your-company.atlassian.net"
   export JIRA_EMAIL="your-email@company.com"
   export JIRA_API_TOKEN="your-token-here"
   ```

### "404 Not Found" on Jira requests

**Cause:** Wrong project key or issue key.

**Fix:**
- Check that the project key matches exactly (e.g., "PROJ" not "proj")
- Verify the issue exists: go to `https://your-company.atlassian.net/browse/PROJ-123`
- Make sure your API token has access to that project

### "403 Forbidden"

**Cause:** Your API token doesn't have permission for that action.

**Fix:**
- Check your Jira permissions with your admin
- Some actions (like creating issues) require specific project roles

---

## Google API Issues

### "OAuth consent screen not configured"

**Cause:** Google Cloud project needs consent screen setup before OAuth works.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → OAuth consent screen
3. Set up as "External" (for testing)
4. Add your email as a test user

### "Access token expired"

**Cause:** Google access tokens expire after ~1 hour.

**Fix:**
- If you stored a refresh token, the server should auto-refresh
- If not, re-run the OAuth flow to get new tokens
- Ask Claude: *"My Google access token expired. Help me refresh it."*

### "API not enabled"

**Cause:** The specific Google API (Drive, Sheets) isn't turned on.

**Fix:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to APIs & Services → Library
3. Search for "Google Drive API" or "Google Sheets API"
4. Click **Enable**

---

## General MCP Issues

### "Tool not found" when Claude tries to use a tool

**Cause:** The MCP server isn't connected or isn't running.

**Fix:**
1. Check if the server is listed: ask Claude *"What MCP servers do I have?"*
2. If not listed, reconnect using the QUICKSTART instructions
3. If listed but not working, restart Claude Code

### Console shows errors but tools seem to work

**Cause:** `console.error()` in MCP servers goes to stderr (for logging). This is normal.

**Fix:** No fix needed — this is expected behavior. MCP uses stdout for communication and stderr for logs.

### Server works in terminal but not in Claude Code

**Cause:** Path differences between terminal and Claude Code.

**Fix:**
- Use absolute paths in your MCP config (e.g., `/Users/you/path/to/dist/index.js`)
- Don't use `~` or relative paths
- Ask Claude: *"Fix my MCP config to use absolute paths"*

---

## Still Stuck?

Try these steps:

1. **Ask Claude:** *"I'm having trouble with [specific issue]. Help me debug."*
2. **Check the basics:** Node.js installed? npm install ran? npm run build ran? dist/index.js exists?
3. **Start fresh:** Delete `node_modules/` and `dist/`, then run `npm install && npm run build`
4. **Check the curriculum:** The lesson markdown files in `curriculum/` have detailed explanations

---

## Common Misconceptions

| Misconception | Reality |
|--------------|---------|
| "I need to know TypeScript" | You don't — Claude writes the code, you guide it |
| "MCP is only for developers" | MCP is for anyone who wants to automate workflows |
| "I need all APIs set up before starting" | Start with Lesson 1 — no API keys needed until Lesson 4 |
| "OAuth is too complicated" | It's a one-time setup. The course walks you through every click |
| "I need to memorize the code" | You don't — understanding the pattern is enough |
