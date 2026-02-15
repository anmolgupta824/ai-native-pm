import { LessonContent } from "./1-welcome";

const lesson: LessonContent = {
  number: 4,
  title: "Build a Jira Integration",
  duration: "45 min",
  objectives: [
    "Create a Jira API token and configure environment variables",
    "Build an MCP server with four Jira tools from scratch",
    "Understand Jira's REST API structure and JQL (Jira Query Language)",
    "Connect the server to Claude Code and test it with real prompts",
  ],
  content: `# Build a Jira Integration

## What We Are Building

In this lesson, you will build a fully functional Jira MCP server with four tools:

1. **jira_list_projects** — List all projects in your Jira instance
2. **jira_get_issue** — Get full details for a specific issue
3. **jira_create_issue** — Create a new issue (Bug, Story, Task, or Epic)
4. **jira_search_issues** — Search issues using JQL (Jira Query Language)

By the end, you will be able to say things like "Create a bug ticket in the MOBILE project for the crash on the settings page" and Claude will do it.

---

## Step 1: Get Your Jira API Token

Before you write any code, you need API credentials so your MCP server can authenticate with Jira.

### Create an API Token

1. Go to [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Click **"Create API token"**
3. Give it a label like "MCP Server" so you remember what it is for
4. Click **"Create"**
5. **Copy the token immediately** — you will not be able to see it again

### Gather Your Credentials

You need three pieces of information:

| Credential | Example | Where to Find It |
|-----------|---------|-------------------|
| Base URL | \`https://yourcompany.atlassian.net\` | Your Jira URL (everything before \`/browse\`) |
| Email | \`you@company.com\` | The email you log into Jira with |
| API Token | \`ATATT3xF...\` | The token you just created |

Save these somewhere safe — you will use them in a few minutes.

---

## Step 2: Set Up the Project

Let us create the project structure. Open Claude Code and ask it to help you, or follow these steps:

### Create the Directory and Files

\`\`\`bash
mkdir -p jira-mcp-server/src
cd jira-mcp-server
\`\`\`

### package.json

\`\`\`json
{
  "name": "jira-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
\`\`\`

### tsconfig.json

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
\`\`\`

### Install Dependencies

\`\`\`bash
npm install
\`\`\`

---

## Step 3: Build the Server — Boilerplate

Create \`src/index.ts\` and start with the boilerplate:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// --- Configuration ---
const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

if (!JIRA_BASE_URL || !JIRA_EMAIL || !JIRA_API_TOKEN) {
  console.error("Missing required environment variables: JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN");
  process.exit(1);
}

// --- Helper: Make authenticated Jira API requests ---
async function jiraFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = \`\${JIRA_BASE_URL}/rest/api/3\${path}\`;
  const auth = Buffer.from(\`\${JIRA_EMAIL}:\${JIRA_API_TOKEN}\`).toString("base64");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": \`Basic \${auth}\`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`Jira API error (\${response.status}): \${errorText}\`);
  }

  // Some responses (like 204) have no body
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// --- Create the MCP Server ---
const server = new McpServer({
  name: "jira-mcp-server",
  version: "1.0.0",
});
\`\`\`

Let us break down what is happening here:

1. **Environment variables** — We read Jira credentials from environment variables, not hardcoded in the code. This is a security best practice.
2. **jiraFetch helper** — This function handles all the repetitive parts of calling the Jira API: constructing the URL, adding authentication, setting headers, handling errors. Every tool will use this helper.
3. **Error handling** — If the API returns an error, we throw with the status code and error message so Claude can report what went wrong.

---

## Step 4: Add Tool 1 — List Projects

This tool lists all Jira projects you have access to. It is the simplest tool and a good way to test your connection.

\`\`\`typescript
server.tool(
  "jira_list_projects",
  "List all Jira projects the user has access to. Returns project key, name, and type.",
  {},
  async () => {
    const data = await jiraFetch("/project");

    const projects = data.map((p: any) => ({
      key: p.key,
      name: p.name,
      type: p.projectTypeKey,
      lead: p.lead?.displayName || "Unknown",
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(projects, null, 2),
        },
      ],
    };
  }
);
\`\`\`

**What this does:**
- Calls \`GET /rest/api/3/project\` to list all projects
- Extracts the key, name, type, and lead from each project
- Returns the list as formatted JSON

**When Claude will use it:** When you say things like "What Jira projects do I have?" or "List my projects" or "Show me all projects."

---

## Step 5: Add Tool 2 — Get Issue Details

This tool retrieves full details for a specific issue by its key (like PROJ-123).

\`\`\`typescript
server.tool(
  "jira_get_issue",
  "Get detailed information about a specific Jira issue by its key (e.g., PROJ-123). Returns summary, status, assignee, priority, description, and more.",
  {
    issueKey: z.string().describe("The Jira issue key, e.g., PROJ-123"),
  },
  async ({ issueKey }) => {
    const data = await jiraFetch(\`/issue/\${issueKey}\`);

    const issue = {
      key: data.key,
      summary: data.fields.summary,
      status: data.fields.status?.name,
      assignee: data.fields.assignee?.displayName || "Unassigned",
      reporter: data.fields.reporter?.displayName || "Unknown",
      priority: data.fields.priority?.name || "None",
      issueType: data.fields.issuetype?.name,
      created: data.fields.created,
      updated: data.fields.updated,
      labels: data.fields.labels || [],
      description: data.fields.description || "No description",
    };

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(issue, null, 2),
        },
      ],
    };
  }
);
\`\`\`

**What this does:**
- Takes an issue key as input (e.g., "PROJ-123")
- Calls \`GET /rest/api/3/issue/PROJ-123\`
- Extracts the most useful fields from the response
- Returns a clean, readable summary

**When Claude will use it:** When you say "Tell me about PROJ-123" or "What is the status of the login bug ticket?"

---

## Step 6: Add Tool 3 — Create Issue

This is the tool that will save you the most time. Instead of opening Jira, finding the right project, filling out the form, and clicking create — you just tell Claude what you want.

\`\`\`typescript
server.tool(
  "jira_create_issue",
  "Create a new Jira issue in a specified project. Supports Bug, Story, Task, and Epic issue types. Returns the created issue key.",
  {
    projectKey: z.string().describe("The Jira project key (e.g., 'PROJ')"),
    summary: z.string().describe("The issue title/summary"),
    issueType: z
      .enum(["Bug", "Story", "Task", "Epic"])
      .describe("The type of issue to create"),
    description: z
      .string()
      .optional()
      .describe("Detailed description of the issue (optional)"),
    priority: z
      .enum(["Highest", "High", "Medium", "Low", "Lowest"])
      .optional()
      .describe("Issue priority (optional, defaults to Medium)"),
    labels: z
      .array(z.string())
      .optional()
      .describe("Labels to apply to the issue (optional)"),
    assignee: z
      .string()
      .optional()
      .describe("Atlassian account ID of the assignee (optional)"),
  },
  async ({ projectKey, summary, issueType, description, priority, labels, assignee }) => {
    // Build the Jira-formatted description (Atlassian Document Format)
    const descriptionADF = description
      ? {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: description,
                },
              ],
            },
          ],
        }
      : undefined;

    const fields: any = {
      project: { key: projectKey },
      summary,
      issuetype: { name: issueType },
    };

    if (descriptionADF) fields.description = descriptionADF;
    if (priority) fields.priority = { name: priority };
    if (labels) fields.labels = labels;
    if (assignee) fields.assignee = { accountId: assignee };

    const data = await jiraFetch("/issue", {
      method: "POST",
      body: JSON.stringify({ fields }),
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: "Issue created successfully",
              key: data.key,
              id: data.id,
              url: \`\${JIRA_BASE_URL}/browse/\${data.key}\`,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);
\`\`\`

**What this does:**
- Takes project key, summary, issue type, and optional fields
- Formats the description in Atlassian Document Format (ADF) — Jira's required format
- Sends a \`POST /rest/api/3/issue\` request
- Returns the created issue key and a direct link to it

**Important note about ADF:** Jira's v3 API requires descriptions in Atlassian Document Format, not plain text. This is the most common gotcha when working with the Jira API. The ADF structure looks verbose, but it follows a consistent pattern.

**When Claude will use it:** When you say "Create a bug for the login crash" or "Make a story for adding dark mode to settings."

---

## Step 7: Add Tool 4 — Search Issues with JQL

JQL (Jira Query Language) is Jira's search language. It lets you find issues using powerful filters. This tool gives Claude the ability to search for anything.

\`\`\`typescript
server.tool(
  "jira_search_issues",
  "Search for Jira issues using JQL (Jira Query Language). Returns matching issues with key fields. Use this for questions like 'What are my open bugs?' or 'Show P0 issues in the MOBILE project'.",
  {
    jql: z
      .string()
      .describe(
        "JQL query string. Examples: 'project = PROJ AND status = Open', 'assignee = currentUser() AND sprint in openSprints()', 'priority = Highest AND status != Done'"
      ),
    maxResults: z
      .number()
      .optional()
      .describe("Maximum number of results to return (default: 20, max: 50)"),
  },
  async ({ jql, maxResults }) => {
    const limit = Math.min(maxResults || 20, 50);
    const params = new URLSearchParams({
      jql,
      maxResults: limit.toString(),
      fields: "summary,status,assignee,priority,issuetype,created,updated,labels",
    });

    const data = await jiraFetch(\`/search?\${params.toString()}\`);

    const issues = data.issues.map((issue: any) => ({
      key: issue.key,
      summary: issue.fields.summary,
      status: issue.fields.status?.name,
      assignee: issue.fields.assignee?.displayName || "Unassigned",
      priority: issue.fields.priority?.name || "None",
      type: issue.fields.issuetype?.name,
      labels: issue.fields.labels || [],
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              total: data.total,
              returned: issues.length,
              issues,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);
\`\`\`

**What this does:**
- Takes a JQL query and optional result limit
- Calls \`GET /rest/api/3/search?jql=...\`
- Returns matching issues with key fields

### JQL Quick Reference for PMs

JQL looks intimidating at first, but it follows simple patterns:

| What You Want | JQL Query |
|--------------|-----------|
| All issues in a project | \`project = PROJ\` |
| My open issues | \`assignee = currentUser() AND status != Done\` |
| Open bugs | \`issuetype = Bug AND status != Done\` |
| High priority issues | \`priority in (Highest, High)\` |
| Current sprint | \`sprint in openSprints()\` |
| Created this week | \`created >= startOfWeek()\` |
| Combine filters | \`project = PROJ AND priority = Highest AND status = "In Progress"\` |

Claude is great at writing JQL. You can say "Find all the P0 bugs assigned to the mobile team that were created this month" and Claude will construct the JQL for you.

---

## Step 8: Connect to the Transport and Start

Add the final piece to the bottom of your index.ts:

\`\`\`typescript
// --- Start the server ---
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

---

## Step 9: Build and Configure

### Build the Server

\`\`\`bash
npm run build
\`\`\`

This compiles your TypeScript to JavaScript in the \`build/\` directory.

### Configure Claude Code

Add your server to Claude Code's MCP configuration. You can do this by asking Claude Code:

> "Add an MCP server called 'jira' that runs node /path/to/jira-mcp-server/build/index.js with environment variables JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN."

Or manually edit your Claude Code configuration file:

\`\`\`json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["/absolute/path/to/jira-mcp-server/build/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://yourcompany.atlassian.net",
        "JIRA_EMAIL": "you@company.com",
        "JIRA_API_TOKEN": "your-api-token-here"
      }
    }
  }
}
\`\`\`

### Restart Claude Code

After adding the configuration, restart Claude Code so it picks up the new MCP server. When it starts, it will automatically discover your four tools.

---

## Step 10: Test It

Try these prompts in Claude Code:

1. **"List my Jira projects"** — tests jira_list_projects
2. **"Show me the details for PROJ-123"** — tests jira_get_issue (use a real issue key)
3. **"Create a bug ticket in PROJ for 'Login page crashes on mobile'"** — tests jira_create_issue
4. **"What are my open issues?"** — tests jira_search_issues
5. **"Find all high-priority bugs in PROJ that were created this month"** — tests JQL construction

If something does not work, check:
- Are your environment variables correct?
- Did you run \`npm run build\` after making changes?
- Is the path in your Claude Code configuration correct?
- Check the error message — a 401 means bad credentials, a 404 means wrong URL or issue key

---

## Common Gotchas

### 1. Atlassian Document Format (ADF)
Jira v3 API requires descriptions in ADF format, not plain text. Our server handles this conversion, but if you extend it, remember that text fields need to be wrapped in the ADF structure.

### 2. Account IDs vs. Usernames
Jira Cloud uses account IDs (like \`5b10a2844c20165700ede21g\`) instead of usernames for the assignee field. To assign issues, you need the account ID, not the email or display name.

### 3. Project Keys Are Case-Sensitive
\`PROJ\` and \`proj\` are different. Always use uppercase project keys.

### 4. JQL Special Characters
If your values contain spaces, wrap them in quotes: \`status = "In Progress"\` not \`status = In Progress\`.

---

## What You Built

You now have a working Jira MCP server with four tools. Claude can:
- List all your projects
- Look up any issue by key
- Create new issues with full details
- Search using any JQL query

This is a real, production-quality integration. The same pattern — helper function, tool definitions, error handling — applies to every MCP server you will build.

In the next lesson, we will build a Google Drive integration using the same approach.
`,
  exercise: {
    title: "Build and Test Your Jira MCP Server",
    description:
      "Build the Jira MCP server from this lesson, connect it to Claude Code, and create a test issue to verify everything works.",
    steps: [
      "Create your Jira API token at https://id.atlassian.com/manage-profile/security/api-tokens",
      "Open Claude Code and say: \"Help me create a Jira MCP server project. Create the directory, package.json, tsconfig.json, and install dependencies.\"",
      "Copy the full index.ts code from this lesson (or ask Claude to help you write it step by step)",
      "Build the server with: npm run build",
      "Configure the server in Claude Code with your Jira credentials (base URL, email, and API token)",
      "Restart Claude Code and test with: \"List my Jira projects\"",
      "Create a test issue: \"Create a Task in [your-project-key] called 'MCP Integration Test' with description 'Testing my new Jira MCP server'\"",
      "Verify the issue exists by asking: \"Show me the details for [the issue key that was just created]\"",
      "Try a search: \"Show me all issues created today in [your-project-key]\"",
    ],
    validation:
      "You have successfully completed this exercise if: (1) Your server builds without errors, (2) Claude can list your Jira projects, (3) A test issue was successfully created and you can see it in Jira, and (4) You can search for issues using natural language that gets converted to JQL.",
  },
  quiz: {
    questions: [
      {
        question:
          "How does the Jira API authenticate requests in this MCP server?",
        options: [
          "OAuth2 with refresh tokens",
          "Basic authentication with email and API token encoded in Base64",
          "API key passed as a query parameter",
          "Session cookies from a browser login",
        ],
        correctIndex: 1,
        explanation:
          "The Jira Cloud REST API uses Basic authentication. The email and API token are combined (email:token), encoded in Base64, and sent in the Authorization header. This is different from OAuth and simpler to set up.",
      },
      {
        question:
          'Which JQL query would find all open bugs assigned to you?',
        options: [
          "SELECT * FROM bugs WHERE assigned = me",
          "issuetype = Bug AND assignee = currentUser() AND status != Done",
          "type:bug status:open user:me",
          "find bugs where owner = self and open = true",
        ],
        correctIndex: 1,
        explanation:
          "JQL uses a SQL-like syntax but with Jira-specific fields and functions. 'issuetype = Bug' filters to bugs, 'assignee = currentUser()' matches the authenticated user, and 'status != Done' excludes completed issues.",
      },
      {
        question:
          "Why does the create issue tool wrap the description in Atlassian Document Format (ADF)?",
        options: [
          "ADF is faster to process than plain text",
          "The Jira v3 API requires descriptions in ADF format, not plain text",
          "ADF provides syntax highlighting for code blocks",
          "It is optional but recommended for formatting",
        ],
        correctIndex: 1,
        explanation:
          "Jira's v3 REST API requires text content to be in Atlassian Document Format (ADF), a structured JSON format. Sending plain text will result in an error. This is the most common gotcha when working with the Jira API.",
      },
      {
        question:
          "What is the purpose of the jiraFetch helper function?",
        options: [
          "It caches API responses to reduce rate limiting",
          "It handles authentication, headers, URL construction, and error handling so each tool does not have to repeat this code",
          "It converts Jira data into a format Claude can understand",
          "It validates that the Jira API is available before making requests",
        ],
        correctIndex: 1,
        explanation:
          "The jiraFetch helper function centralizes the repetitive parts of making Jira API calls: building the full URL, adding the Base64 authentication header, setting content type headers, and handling error responses. Without it, every tool would need to duplicate this code.",
      },
    ],
  },
};

export default lesson;
