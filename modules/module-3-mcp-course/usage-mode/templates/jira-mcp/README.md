# Jira MCP Server

A ready-to-use MCP server that connects Claude Code to your Jira Cloud instance. Create issues, search with JQL, update statuses, and manage projects -- all from your terminal.

## What It Does

| Tool | Description |
|------|-------------|
| `jira_list_projects` | List all accessible Jira projects |
| `jira_get_issue` | Get full details of a specific issue |
| `jira_create_issue` | Create Bug, Story, Task, or Epic issues |
| `jira_search_issues` | Search issues using JQL queries |
| `jira_update_issue` | Update summary, description, or transition status |

## Prerequisites

- **Jira Cloud** account (Atlassian-hosted, not self-managed Data Center)
- **API token** from Atlassian (free to create)
- **Node.js 18+** (uses native `fetch`)
- **Claude Code** installed

## Setup

### 1. Create a Jira API Token

1. Go to [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **Create API token**
3. Give it a label (e.g., "Claude Code MCP")
4. Copy the token -- you will not see it again

### 2. Set Environment Variables

Add these to your shell profile (`~/.zshrc`, `~/.bashrc`, etc.):

```bash
export JIRA_BASE_URL="https://yourcompany.atlassian.net"
export JIRA_EMAIL="you@company.com"
export JIRA_API_TOKEN="your-api-token-here"
```

Then reload your shell:

```bash
source ~/.zshrc
```

### 3. Install and Build

```bash
cd path/to/jira-mcp
npm install
npm run build
```

### 4. Connect to Claude Code

Add this to your Claude Code MCP config (`~/.claude/claude_desktop_config.json` or project-level `.mcp.json`):

```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["/absolute/path/to/jira-mcp/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://yourcompany.atlassian.net",
        "JIRA_EMAIL": "you@company.com",
        "JIRA_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
```

Restart Claude Code after updating the config.

## Example Prompts

Once connected, try these in Claude Code:

- "List all my Jira projects"
- "Show me the details of PROJ-123"
- "Create a Bug in the MOBILE project: Login button unresponsive on iOS 17"
- "Find all open stories assigned to me"
- "Search for issues created in the last 7 days in the PLATFORM project"
- "Move PROJ-456 to In Progress"
- "Update the description of PROJ-789 to include the new acceptance criteria"

## Troubleshooting

**"Missing required environment variables"**
- Make sure `JIRA_BASE_URL`, `JIRA_EMAIL`, and `JIRA_API_TOKEN` are all set
- Run `echo $JIRA_BASE_URL` to verify they are exported in your current shell

**"Authentication failed (401)"**
- Double-check your email and API token
- API tokens are different from your Jira password
- Generate a new token at: https://id.atlassian.com/manage-profile/security/api-tokens

**"Permission denied (403)"**
- Your Jira account may not have access to that project
- Ask your Jira admin to check your project role/permissions

**"Resource not found (404)"**
- Verify the issue key or project key is correct (e.g., "PROJ-123" not "proj-123")
- The issue may have been deleted or moved

**Status transition fails**
- Status names must match available transitions (e.g., "In Progress" not "in progress")
- Jira workflows restrict which transitions are available from each status
- Use `jira_get_issue` to see the current status, then check your Jira board for valid transitions

**Server does not start**
- Verify Node.js 18+ is installed: `node --version`
- Make sure you ran `npm run build` after any code changes
- Check that the path in your MCP config points to `dist/index.js` (not `index.ts`)
