# Lesson 4: Jira Integration -- Your First Real MCP Server

**Estimated reading time: 45 minutes**
**Lesson type: Hands-on build**

---

## What You'll Learn

By the end of this lesson, you will have:

- A working MCP server that connects Claude to your Jira instance
- Five tools: `list_projects`, `get_issue`, `create_issue`, `search_issues`, `update_issue`
- A basic understanding of JQL (Jira Query Language)
- The confidence to ask Claude things like "Show me all open bugs from this sprint"

This is where theory becomes practice. Every line of code will be explained.

---

## Why Jira First?

Jira is the most common tool in a PM's daily workflow, and its API is well-documented and uses straightforward authentication. It is the perfect starting point because:

1. **You already know the domain.** You understand issues, sprints, and projects.
2. **Simple auth.** Jira uses API tokens (no complex OAuth flow).
3. **Clear use cases.** You can immediately see the value of every tool we build.
4. **Great API docs.** Jira's REST API documentation is thorough and searchable.

---

## Step 1: Get Your Jira API Credentials

Before writing any code, you need two things from Jira: your email and an API token.

### 1a: Find Your Jira Email

This is the email address you use to log into Jira. It is typically your work email.

### 1b: Generate an API Token

1. Go to: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **"Create API token"**
3. Give it a label like "Claude MCP Server"
4. Click **"Create"**
5. **Copy the token immediately** -- you will not be able to see it again

**Store this token securely.** Treat it like a password. Do not put it in any shared documents or commit it to Git.

### 1c: Find Your Jira Base URL

Your Jira base URL looks like this:
```
https://your-company.atlassian.net
```

Replace `your-company` with your actual Jira workspace name. You can find this by looking at the URL bar when you are logged into Jira.

### 1d: Verify Your Credentials

Let us test these credentials before building anything. Open Claude Code and type:

```
Make a GET request to https://YOUR-COMPANY.atlassian.net/rest/api/3/myself
with Basic authentication using email YOUR-EMAIL and API token YOUR-TOKEN.
What does the response show?
```

If your credentials are correct, you will see your Jira user profile (name, email, account ID). If you get a 401 error, double-check your email and token.

---

## Step 2: Set Up the Project

### 2a: Create the Project Folder

Open Claude Code and type:

```
Create a new MCP server project for Jira in the directory
~/mcp-servers/jira-server with package.json, tsconfig.json,
and src/index.ts. Use the MCP SDK.
```

Claude will create the folder structure:

```
jira-server/
  package.json
  tsconfig.json
  src/
    index.ts
```

### 2b: Install Dependencies

```
In the jira-server directory, run npm install to install all dependencies.
```

This downloads the MCP SDK and other required packages.

### 2c: Verify the Setup

```
Show me the contents of the jira-server directory.
```

You should see the folder structure above, plus a `node_modules` folder and `package-lock.json` (both created by npm install).

---

## Step 3: Build the Server -- Every Line Explained

Now let us build the actual server. We will go through each section of `src/index.ts`.

### Section 1: Imports

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
```

**What this does:** Loads the MCP building blocks we need.

| Import | Purpose |
|--------|---------|
| `Server` | The core MCP server class |
| `StdioServerTransport` | Handles communication with Claude |
| `CallToolRequestSchema` | Defines the format for tool execution requests |
| `ListToolsRequestSchema` | Defines the format for "what tools do you have?" requests |

**PM analogy:** This is like importing a template library. Instead of building everything from scratch, we are using pre-built components.

### Section 2: Configuration

```typescript
const JIRA_BASE_URL = process.env.JIRA_BASE_URL || "";
const JIRA_EMAIL = process.env.JIRA_EMAIL || "";
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN || "";

// Create the Basic auth header
// Jira expects: base64(email:apiToken)
const auth = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");

const headers = {
  Authorization: `Basic ${auth}`,
  "Content-Type": "application/json",
  Accept: "application/json",
};
```

**What this does:**
- Reads your Jira credentials from environment variables (the `env` section of Claude's config)
- Creates the authentication header that Jira requires
- Sets up the standard headers we will use for every request

**Why `process.env` instead of hardcoding?** Security. Your API token should never be written directly in code. Environment variables keep secrets separate from code, so you can share the code without exposing your credentials.

**What is `Buffer.from(...).toString("base64")`?** Jira uses "Basic" authentication, which requires encoding your email and token as a base64 string. You do not need to understand the encoding -- just know that this is the format Jira expects.

### Section 3: Helper Function for API Calls

```typescript
async function jiraRequest(endpoint: string, method: string = "GET", body?: any) {
  const url = `${JIRA_BASE_URL}/rest/api/3${endpoint}`;

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Jira API error (${response.status}): ${errorText}`);
  }

  return response.json();
}
```

**What this does:** Creates a reusable function for making Jira API calls. Instead of writing the same fetch code five times (once per tool), we write it once and reuse it.

**Breaking it down line by line:**

| Line | Purpose |
|------|---------|
| `async function jiraRequest(...)` | Defines a function that makes Jira API calls |
| `endpoint: string` | The specific API path (like `/issue/PROJ-123`) |
| `method: string = "GET"` | The HTTP method, defaults to GET |
| `body?: any` | Optional request body for POST/PUT requests |
| `const url = ...` | Builds the full URL from base + API path + endpoint |
| `options.body = JSON.stringify(body)` | Converts the JavaScript object to JSON text |
| `await fetch(url, options)` | Makes the actual HTTP request and waits for the response |
| `if (!response.ok)` | Checks if the response was an error (status 400+) |
| `return response.json()` | Converts the JSON response to a JavaScript object |

**PM analogy:** This helper function is like a template email. Instead of writing the greeting, signature, and formatting from scratch every time, you have a template where you just fill in the specifics (endpoint, method, body).

### Section 4: Create the Server

```typescript
const server = new Server(
  {
    name: "jira-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
```

**What this does:** Creates the MCP server instance. The name and version are what Claude sees when it discovers this server. The `capabilities: { tools: {} }` part tells Claude "this server provides tools."

### Section 5: Define the Tools

This is the most important section. Here we tell Claude what tools are available and what parameters they accept.

```typescript
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_projects",
        description: "List all Jira projects accessible to the authenticated user",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
      {
        name: "get_issue",
        description: "Get detailed information about a specific Jira issue by its key (e.g., PROJ-123)",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The issue key, e.g., PROJ-123",
            },
          },
          required: ["issue_key"],
        },
      },
      {
        name: "create_issue",
        description: "Create a new Jira issue in a specified project",
        inputSchema: {
          type: "object",
          properties: {
            project_key: {
              type: "string",
              description: "The project key, e.g., PROJ",
            },
            summary: {
              type: "string",
              description: "The issue title/summary",
            },
            description: {
              type: "string",
              description: "Detailed description of the issue",
            },
            issue_type: {
              type: "string",
              description: "Issue type: Bug, Task, Story, or Epic",
              enum: ["Bug", "Task", "Story", "Epic"],
            },
            priority: {
              type: "string",
              description: "Priority level: Highest, High, Medium, Low, Lowest",
              enum: ["Highest", "High", "Medium", "Low", "Lowest"],
            },
          },
          required: ["project_key", "summary", "issue_type"],
        },
      },
      {
        name: "search_issues",
        description: "Search for Jira issues using JQL (Jira Query Language). Common queries: 'project = PROJ AND sprint in openSprints()' for current sprint, 'assignee = currentUser() AND status != Done' for your open items.",
        inputSchema: {
          type: "object",
          properties: {
            jql: {
              type: "string",
              description: "JQL query string",
            },
            max_results: {
              type: "number",
              description: "Maximum number of results to return (default: 50)",
            },
          },
          required: ["jql"],
        },
      },
      {
        name: "update_issue",
        description: "Update fields on an existing Jira issue",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The issue key, e.g., PROJ-123",
            },
            summary: {
              type: "string",
              description: "New summary/title (optional)",
            },
            description: {
              type: "string",
              description: "New description (optional)",
            },
            priority: {
              type: "string",
              description: "New priority (optional)",
              enum: ["Highest", "High", "Medium", "Low", "Lowest"],
            },
          },
          required: ["issue_key"],
        },
      },
    ],
  };
});
```

**What this does:** When Claude asks "What tools do you have?", this handler responds with the complete list.

Notice each tool has:
- **`name`** -- How Claude refers to it internally
- **`description`** -- Helps Claude decide when to use it (write these clearly!)
- **`inputSchema`** -- What parameters the tool accepts, which are required, and their types

**Pro tip for descriptions:** The description is how Claude decides whether to use a tool. Write it as if you are explaining to a new PM what the tool does. Include example queries in the description -- this helps Claude construct better queries.

### Section 6: Implement the Tools

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_projects": {
        const data = await jiraRequest("/project");
        const projects = data.map((p: any) => ({
          key: p.key,
          name: p.name,
          type: p.projectTypeKey,
        }));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(projects, null, 2),
            },
          ],
        };
      }

      case "get_issue": {
        const data = await jiraRequest(`/issue/${args.issue_key}`);
        const issue = {
          key: data.key,
          summary: data.fields.summary,
          description: data.fields.description,
          status: data.fields.status?.name,
          priority: data.fields.priority?.name,
          assignee: data.fields.assignee?.displayName || "Unassigned",
          reporter: data.fields.reporter?.displayName,
          type: data.fields.issuetype?.name,
          created: data.fields.created,
          updated: data.fields.updated,
        };
        return {
          content: [{ type: "text", text: JSON.stringify(issue, null, 2) }],
        };
      }

      case "create_issue": {
        const body = {
          fields: {
            project: { key: args.project_key },
            summary: args.summary,
            description: args.description
              ? {
                  type: "doc",
                  version: 1,
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: args.description }],
                    },
                  ],
                }
              : undefined,
            issuetype: { name: args.issue_type },
            priority: args.priority ? { name: args.priority } : undefined,
          },
        };
        const data = await jiraRequest("/issue", "POST", body);
        return {
          content: [
            {
              type: "text",
              text: `Created issue ${data.key}: ${JIRA_BASE_URL}/browse/${data.key}`,
            },
          ],
        };
      }

      case "search_issues": {
        const maxResults = args.max_results || 50;
        const data = await jiraRequest(
          `/search?jql=${encodeURIComponent(args.jql)}&maxResults=${maxResults}`
        );
        const issues = data.issues.map((issue: any) => ({
          key: issue.key,
          summary: issue.fields.summary,
          status: issue.fields.status?.name,
          priority: issue.fields.priority?.name,
          assignee: issue.fields.assignee?.displayName || "Unassigned",
          type: issue.fields.issuetype?.name,
        }));
        return {
          content: [
            {
              type: "text",
              text: `Found ${data.total} issues:\n${JSON.stringify(issues, null, 2)}`,
            },
          ],
        };
      }

      case "update_issue": {
        const fields: any = {};
        if (args.summary) fields.summary = args.summary;
        if (args.description) {
          fields.description = {
            type: "doc",
            version: 1,
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: args.description }],
              },
            ],
          };
        }
        if (args.priority) fields.priority = { name: args.priority };

        await jiraRequest(`/issue/${args.issue_key}`, "PUT", { fields });
        return {
          content: [
            {
              type: "text",
              text: `Updated issue ${args.issue_key} successfully`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});
```

**Let us walk through each tool implementation:**

#### `list_projects`
- Calls `GET /project` on the Jira API
- Extracts key, name, and type from each project
- Returns a clean list

#### `get_issue`
- Calls `GET /issue/{key}` for a specific ticket
- Extracts the fields you care about as a PM (summary, status, priority, assignee)
- Jira's raw response has dozens of fields -- we filter to the useful ones

#### `create_issue`
- Calls `POST /issue` with a JSON body
- Note the description format: Jira v3 API uses Atlassian Document Format (ADF), not plain text. That is why the description has `type: "doc"` wrapping.
- Returns the new issue key and a link to it

#### `search_issues`
- Calls `GET /search` with a JQL query
- `encodeURIComponent` converts special characters in the query to URL-safe format
- Returns a list of matching issues with key fields

#### `update_issue`
- Calls `PUT /issue/{key}` with only the fields you want to change
- Only includes fields that were actually provided (the `if` checks)

### Section 7: Start the Server

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Jira MCP server running on stdio");
}

main().catch(console.error);
```

**What this does:** Creates the stdio connection and starts listening for requests from Claude.

**Why `console.error` instead of `console.log`?** The stdio transport uses standard output (stdout) for communication with Claude. If you use `console.log` (which writes to stdout), it would interfere with the MCP communication. `console.error` writes to standard error (stderr) instead, which is safe for logging.

---

## Step 4: Build and Register

### 4a: Build the Server

```
In jira-server, run npm run build
```

This compiles `src/index.ts` into `dist/index.js`.

### 4b: Register with Claude

Tell Claude:

```
Add the jira-server MCP server to my Claude configuration.
The server is at ~/mcp-servers/jira-server/dist/index.js
and needs these environment variables:
JIRA_BASE_URL=https://YOUR-COMPANY.atlassian.net
JIRA_EMAIL=your-email@company.com
JIRA_API_TOKEN=your-api-token
```

Claude will update your `~/.claude/claude_desktop_config.json` file.

### 4c: Restart Claude Code

Exit and restart Claude Code to pick up the new server:

```
/exit
```
Then:
```
claude
```

---

## Step 5: Test Your Server

Now for the fun part. Try these commands:

### Test 1: List Projects
```
List all my Jira projects
```

You should see a list of projects you have access to.

### Test 2: Get a Specific Issue
```
Show me the details of PROJ-123
```
(Replace with a real issue key from your Jira)

### Test 3: Search for Issues
```
Find all open bugs in the PROJ project
```

### Test 4: Create an Issue
```
Create a new Task in PROJ called "Test MCP integration" with
description "Verifying that our Jira MCP server works correctly"
```

### Test 5: Update an Issue
```
Change the priority of PROJ-123 to High
```

---

## JQL Basics for PMs

JQL (Jira Query Language) is Jira's search language. You do not need to write JQL yourself -- Claude will construct it from your natural language requests. But understanding the basics helps you make more specific requests.

### Basic JQL Syntax

```
field operator value
```

### Common Queries PMs Actually Use

| What You Want | JQL | What to Tell Claude |
|--------------|-----|-------------------|
| My open tickets | `assignee = currentUser() AND status != Done` | "Show me my open tickets" |
| Current sprint | `sprint in openSprints() AND project = PROJ` | "What's in our current sprint?" |
| Unassigned bugs | `type = Bug AND assignee is EMPTY AND project = PROJ` | "Show me unassigned bugs in PROJ" |
| Created this week | `created >= startOfWeek() AND project = PROJ` | "What tickets were created this week?" |
| High priority items | `priority in (High, Highest) AND status != Done` | "Show me high priority open items" |
| Overdue items | `due < now() AND status != Done` | "What's overdue?" |
| My team's work | `assignee in (membersOf("pm-team")) AND sprint in openSprints()` | "What's my team working on this sprint?" |

### JQL Operators

| Operator | Meaning | Example |
|----------|---------|---------|
| `=` | Equals | `status = "In Progress"` |
| `!=` | Not equals | `status != Done` |
| `in` | In a list | `priority in (High, Highest)` |
| `is EMPTY` | Has no value | `assignee is EMPTY` |
| `>=` | Greater than or equal | `created >= "2026-01-01"` |
| `ORDER BY` | Sort results | `ORDER BY priority DESC` |

---

## Real PM Workflow: Monday Morning Status Report

Here is a practical workflow you can use every Monday:

```
Pull the current sprint data from Jira for project PROJ.
For each status (To Do, In Progress, Done), count the tickets.
List any blockers or high-priority items that aren't assigned.
Format this as a status report I can share with my stakeholders.
```

Claude will:
1. Call `search_issues` with a JQL query for the current sprint
2. Categorize the results by status
3. Identify blockers and unassigned high-priority items
4. Format a clean report

What used to take 20 minutes now takes 30 seconds.

---

## Troubleshooting

### Error: 401 Unauthorized
**Cause:** Your API token is wrong or expired.
**Fix:** Generate a new token at the Atlassian API token page and update your Claude config.

### Error: 403 Forbidden
**Cause:** Your Jira account does not have permission for the requested action.
**Fix:** Check your Jira permissions. You might need admin access for certain operations.

### Error: 404 Not Found
**Cause:** The issue key or project key does not exist.
**Fix:** Double-check the key. Remember that keys are case-sensitive (PROJ-123, not proj-123).

### Error: 400 Bad Request on Create Issue
**Cause:** Missing required fields or invalid issue type.
**Fix:** Check that the issue type matches your Jira configuration. Some instances use "Story" while others use "User Story."

### Tool Not Showing Up
**Cause:** Claude has not loaded the server.
**Fix:** Make sure you ran `npm run build`, the config file path is correct, and you restarted Claude Code.

### JQL Errors
**Cause:** Invalid JQL syntax.
**Fix:** Jira's JQL is strict about syntax. Let Claude construct the JQL from your natural language request rather than writing it yourself.

---

## What You Built

Congratulations. You now have a working MCP server that:

- Lists all your Jira projects
- Reads any ticket's details
- Creates new tickets from natural language
- Searches tickets with any criteria
- Updates existing tickets

This is not a toy demo. This is a production-grade integration that you can use in your daily work starting today.

---

## Quick Check

1. What two credentials does the Jira API need?
2. What HTTP method does `create_issue` use?
3. Why do we use `console.error` instead of `console.log`?
4. Write a natural language request that would trigger `search_issues`.

---

*Previous: [Lesson 3: How MCP Works](3-how-mcp-works.md)*
*Next: [Lesson 5: Google Drive Integration](5-google-drive.md)*
