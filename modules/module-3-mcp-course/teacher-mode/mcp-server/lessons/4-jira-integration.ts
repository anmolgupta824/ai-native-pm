import { LessonContent } from "../index.js";

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
  sections: [
    {
      id: "what-we-are-building",
      title: "What We Are Building",
      content: `# Build a Jira Integration

## What We Are Building

In this lesson, you will build a fully functional Jira MCP server with four tools:

1. **jira_list_projects** — List all projects in your Jira instance
2. **jira_get_issue** — Get full details for a specific issue
3. **jira_create_issue** — Create a new issue (Bug, Story, Task, or Epic)
4. **jira_search_issues** — Search issues using JQL (Jira Query Language)

By the end, you will be able to say things like "Create a bug ticket in the MOBILE project for the crash on the settings page" and Claude will do it.

This is your first hands-on build. Everything from Lessons 1-3 comes together here — the three-box architecture, tool definitions, REST APIs, and authentication.`,
      teacherNotes: "This is where the course gets real. The student is about to build their first MCP server. Set the tone: 'This is where theory becomes practice. By the end of this lesson, you will have a working Jira integration.' Suggest they open Cursor, VS Code, or their preferred editor alongside Claude Code so they can see the file structure being created. Example: 'Tip: Open a second window with Cursor or VS Code pointed at this folder. You will be able to see each file as we create it.'",
      checkQuestion: "Which of these four tools are you most excited to try with your own Jira instance?",
    },
    {
      id: "get-api-token",
      title: "Get Your Jira API Token",
      content: `## Step 1: Get Your Jira API Token

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

**Remember from Lesson 2:** This is Basic Authentication. Your email and API token get combined and encoded in Base64, then sent with every request. The MCP server handles this automatically.`,
      checkQuestion: "Do you have your three credentials ready? (Base URL, email, and API token) If not, take a moment to get them now.",
      teacherNotes: "This is a practical step. Give them time to actually go get their token. If they do not have a Jira account, they can create a free one at atlassian.com. If they want to skip this and come back later, that is fine too — they can still read through the code.",
    },
    {
      id: "project-setup",
      title: "Set Up the Project",
      content: `## Step 2: Set Up the Project

We will build this right here in your current project folder so you can see every file as it is created.

Open Claude Code and ask it to help you set up the project:

> "Create a new directory called jira-mcp-server with src/ inside it. Create package.json and tsconfig.json for an MCP server project, then run npm install."

Or if you prefer to understand each file, here is what goes into them:

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

Then install dependencies:

\`\`\`bash
cd jira-mcp-server
npm install
\`\`\`

You should now see a \`node_modules/\` directory and a \`package-lock.json\` file. Check your editor — you can see the project taking shape.`,
      teacherNotes: "Remind the student to check their editor window to see the files being created. This builds confidence that things are working. Say something like: 'Check your editor — you should see the jira-mcp-server folder with package.json and tsconfig.json inside it.'",
      checkQuestion: "Can you see the jira-mcp-server directory in your editor? Do you see package.json and node_modules/ inside it?",
    },
    {
      id: "server-boilerplate",
      title: "Server Boilerplate",
      content: `## Step 3: Build the Server — Boilerplate

Now we create \`src/index.ts\` — the main server file. We will start with the boilerplate and add tools one at a time.

This code goes in \`jira-mcp-server/src/index.ts\`:

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
2. **jiraFetch helper** — This function handles all the repetitive parts of calling the Jira API: constructing the URL, adding authentication, setting headers, and handling errors. Every tool will use this helper.
3. **Server creation** — The same \`new McpServer()\` pattern you saw in Lesson 3.

Notice the Base64 encoding: \`Buffer.from(\`email:token\`).toString("base64")\`. This is the Basic Authentication from Lesson 2 in action.`,
      checkQuestion: "Looking at the jiraFetch helper — what happens if the Jira API returns a 401 status code? (Hint: look at the error handling)",
      teacherNotes: "The answer: it throws an error with the status code and error text, which Claude will see and report to the user. This is a good teaching moment about error handling in MCP servers — you want errors to be descriptive so Claude can help the user debug.",
    },
    {
      id: "tool-list-projects",
      title: "Tool 1: List Projects",
      content: `## Step 4: Add Tool 1 — List Projects

This tool lists all Jira projects you have access to. It is the simplest tool and a good way to test your connection.

Add this below the server creation code in \`src/index.ts\`:

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

**When Claude will use it:** When you say things like "What Jira projects do I have?" or "List my projects."

Notice the pattern: define the tool name, write a clear description, specify inputs (none in this case), and write a handler that calls the API and returns results. This same pattern repeats for every tool.`,
      checkQuestion: "This tool takes no input parameters (the empty `{}` object). Why doesn't it need any inputs?",
      teacherNotes: "The answer: because listing all projects does not require any filtering — you just want everything. The next tools will require inputs like issue keys and project keys.",
    },
    {
      id: "tool-get-issue",
      title: "Tool 2: Get Issue Details",
      content: `## Step 5: Add Tool 2 — Get Issue Details

This tool retrieves full details for a specific issue by its key (like PROJ-123).

Add this below the list projects tool in \`src/index.ts\`:

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

Notice that we are extracting only the fields that are useful. The Jira API returns a massive response with dozens of fields — we pick out the ones that matter for a PM.`,
      checkQuestion: "The tool extracts specific fields like summary, status, and assignee. Why don't we just return the raw API response?",
      teacherNotes: "The answer: the raw Jira response is huge and full of internal metadata Claude doesn't need. By extracting just the useful fields, we keep the response clean and focused. This is a key pattern in MCP development — act as a translator, not a passthrough.",
    },
    {
      id: "tool-create-issue",
      title: "Tool 3: Create Issue",
      content: `## Step 6: Add Tool 3 — Create Issue

This is the tool that will save you the most time. Instead of opening Jira, finding the right project, filling out the form, and clicking create — you just tell Claude what you want.

Add this below the get issue tool in \`src/index.ts\`:

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
    const descriptionADF = description
      ? {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [{ type: "text", text: description }],
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

**Important: Atlassian Document Format (ADF)**

Notice the \`descriptionADF\` variable. Jira's v3 API requires descriptions in a special format called Atlassian Document Format — not plain text. This is the most common gotcha when working with the Jira API.

The ADF structure looks verbose, but it follows a consistent pattern: a \`doc\` contains \`paragraph\` blocks, which contain \`text\` nodes. Our server handles this conversion automatically so you never have to think about it.`,
      checkQuestion: "This tool has required AND optional parameters. What is the difference between z.string() and z.string().optional()?",
      teacherNotes: "The answer: z.string() means Claude MUST provide this parameter (like projectKey and summary). z.string().optional() means Claude CAN provide it but does not have to (like description and priority). This maps to the 'required' vs 'nice-to-have' distinction PMs already understand from PRDs.",
    },
    {
      id: "tool-search-jql",
      title: "Tool 4: Search with JQL",
      content: `## Step 7: Add Tool 4 — Search Issues with JQL

JQL (Jira Query Language) is Jira's search language. It lets you find issues using powerful filters. This tool gives Claude the ability to search for anything.

Add this below the create issue tool in \`src/index.ts\`:

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
            { total: data.total, returned: issues.length, issues },
            null,
            2
          ),
        },
      ],
    };
  }
);
\`\`\`

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

The best part: you do not need to memorize JQL. Just tell Claude what you want in plain English — "Find all the P0 bugs assigned to the mobile team created this month" — and Claude will construct the JQL for you.`,
      checkQuestion: "If you wanted to find all Story-type issues in the MOBILE project that are currently in progress, what would the JQL look like?",
      teacherNotes: "The answer: project = MOBILE AND issuetype = Story AND status = 'In Progress'. Encourage them to try writing JQL — it is like SQL but simpler. And remind them that Claude is great at writing JQL from natural language.",
    },
    {
      id: "connect-and-configure",
      title: "Connect and Configure",
      content: `## Step 8: Connect to Claude Code

First, add the transport and start the server. Add this at the bottom of \`src/index.ts\`:

\`\`\`typescript
// --- Start the server ---
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### Build the Server

\`\`\`bash
npm run build
\`\`\`

This compiles your TypeScript to JavaScript in the \`build/\` directory. Open your editor and check — you should see a \`build/index.js\` file.

### Configure Claude Code

Add your server to Claude Code's MCP configuration. You can do this by asking Claude Code:

> "Add an MCP server called 'jira' that runs node with the full path to jira-mcp-server/build/index.js. Set environment variables JIRA_BASE_URL, JIRA_EMAIL, and JIRA_API_TOKEN with my credentials."

Or manually, your MCP configuration will look like:

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

**Important:** After adding the configuration, you need to restart Claude Code. Type \`/exit\` or press Ctrl+C, then relaunch with \`claude\`. When it starts, it will automatically discover your four Jira tools.

**Note:** The MCP server config persists in your Claude Code settings (\`~/.claude/\`). You only need to add it once — it will be there every time you open Claude Code.`,
      teacherNotes: "This is a critical step where things can go wrong. Common issues: wrong path in the config, forgetting to build first, environment variables not set. Be patient and help them debug. Remind them about absolute paths — relative paths do not work in MCP configs.",
      checkQuestion: "Did the build succeed? Do you see build/index.js in your editor?",
    },
    {
      id: "test-and-gotchas",
      title: "Test It and Common Gotchas",
      content: `## Step 9: Test It

Try these prompts in Claude Code:

1. **"List my Jira projects"** — tests jira_list_projects
2. **"Show me the details for PROJ-123"** — tests jira_get_issue (use a real issue key)
3. **"Create a bug ticket in PROJ for 'Login page crashes on mobile'"** — tests jira_create_issue
4. **"What are my open issues?"** — tests jira_search_issues
5. **"Find all high-priority bugs in PROJ that were created this month"** — tests JQL construction

If something does not work, check:
- Are your environment variables correct?
- Did you run \`npm run build\` after making changes?
- Is the path in your Claude Code configuration an absolute path?
- Check the error message — a 401 means bad credentials, a 404 means wrong URL or issue key

## Common Gotchas

### 1. Atlassian Document Format (ADF)
Jira v3 API requires descriptions in ADF format, not plain text. Our server handles this conversion, but if you extend it, remember that text fields need to be wrapped in the ADF structure.

### 2. Account IDs vs. Usernames
Jira Cloud uses account IDs (like \`5b10a2844c20165700ede21g\`) instead of usernames for the assignee field. To assign issues, you need the account ID, not the email or display name.

### 3. Project Keys Are Case-Sensitive
\`PROJ\` and \`proj\` are different. Always use uppercase project keys.

### 4. JQL Special Characters
If your values contain spaces, wrap them in quotes: \`status = "In Progress"\` not \`status = In Progress\`.

## What You Built

You now have a working Jira MCP server with four tools. Claude can list your projects, look up any issue, create new issues with full details, and search using any JQL query.

This is a real, production-quality integration. The same pattern — helper function, tool definitions, error handling — applies to every MCP server you will build.

In the next lesson, we will build a Google Drive integration using the same approach.`,
      teacherNotes: "Celebrate their achievement! This is a major milestone — they just built a real MCP server. Say something like: 'You just built a working Jira integration from scratch. That is a skill most PMs do not have.' Then transition to the next lesson.",
    },
  ],
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
