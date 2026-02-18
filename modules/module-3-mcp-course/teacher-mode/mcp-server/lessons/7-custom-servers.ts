import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 7,
  title: "Build an MCP Server for Any API",
  duration: "90 min",
  objectives: [
    "Apply a repeatable framework to build an MCP server for any REST API",
    "Read and interpret API documentation to plan tools",
    "Handle authentication, error handling, and rate limiting",
    "Build a Slack MCP server as a worked example",
    "Use a configurable template to accelerate future MCP server development",
  ],
  sections: [
    {
      id: "the-superpower",
      title: "The Superpower",
      content: `# Build an MCP Server for Any API

## The Superpower

You have built MCP servers for Jira, Google Drive, and Google Sheets. But the real superpower is not knowing how to build those specific integrations — it is knowing **how to build an MCP server for any API you encounter**.

In this lesson, you will learn a repeatable framework that works for any REST API. We will build a Slack integration as a worked example, and you will get a template you can use to create your own MCP servers in the future.

By the end of this lesson, you will not need this course anymore. You will have the pattern in your head and the tools to build integrations on your own.`,
      checkQuestion: "If you could give Claude access to any tool you use at work (beyond Jira, Drive, and Sheets), what would it be?",
      teacherNotes: "This is the 'graduation' lesson. The student is about to learn the generalizable skill. Whatever they answer for the check question, that is what they should build in the exercise. Store their answer mentally — it will make the exercise feel personalized.",
    },
    {
      id: "six-step-framework",
      title: "The 6-Step Framework",
      content: `## The 6-Step Framework

Every MCP server you build follows the same six steps:

1. **Read the API docs** — Find endpoints, auth method, response format
2. **Plan your tools** — Decide what actions would be useful
3. **Set up the project** — package.json, tsconfig, boilerplate
4. **Implement auth** — API key, OAuth, Bearer token
5. **Add your tools** — One at a time, test each
6. **Handle errors** — API down, rate limited, bad input

This framework works whether you are building for Slack, Notion, Linear, GitHub, Asana, Confluence, or any other service with a REST API. The details change, but the steps do not.

Think of it like a recipe template. The ingredients change (each API has different endpoints and auth), but the cooking method is always the same.`,
      checkQuestion: "Looking at the 6 steps — which one do you think is the most important for getting things right?",
      teacherNotes: "Step 1 (reading the docs) is arguably the most important. Most bugs and confusion come from not understanding the API before coding. Spending 15-20 minutes reading docs saves hours of debugging. Step 2 (planning tools) is a close second — it is PM thinking applied to technical work.",
    },
    {
      id: "read-the-docs",
      title: "Step 1: Read the API Docs",
      content: `## Step 1: Read the API Docs

Before writing any code, spend 15-20 minutes reading the API documentation. You are looking for four things:

### A. Base URL

Every API has a base URL. Find it in the "Getting Started" or "Overview" section.

Examples:
- Slack: \`https://slack.com/api/\`
- GitHub: \`https://api.github.com\`
- Notion: \`https://api.notion.com/v1\`
- Linear: \`https://api.linear.app/graphql\` (note: GraphQL, not REST)

### B. Authentication Method

Look for a section called "Authentication" or "Authorization." Most APIs use one of these:

| Auth Method | What to Look For | Common With |
|------------|-----------------|-------------|
| API Key | "API key in header" or "token" | Figma, Notion, simple APIs |
| Basic Auth | "email:password" or "username:api_token" | Jira, older APIs |
| OAuth2 | "OAuth", "authorize endpoint", "token endpoint" | Google, Slack, GitHub |
| Bearer Token | "Bearer token in Authorization header" | Most modern APIs |

### C. Key Endpoints

Look at the API reference and identify the endpoints you care about. For each endpoint, note:
- **Method** (GET, POST, PUT, DELETE)
- **URL path** (e.g., \`/conversations.list\`)
- **Required parameters** (what you must send)
- **Response format** (what comes back)

### D. Rate Limits

Most APIs limit how many requests you can make. Find the rate limit docs so you know what happens when you exceed the limit (usually a 429 status code).

### Practical Tip

Do not try to read the entire API doc. Focus on the endpoints that map to your use case. For a PM, that usually means: list things, get thing by ID, create a thing, search for things.`,
      checkQuestion: "Pick an API you are interested in. Can you find its base URL and authentication method in the docs? (Try Slack, Notion, or GitHub)",
      teacherNotes: "If they have not picked an API yet, help them choose one based on what tools they use at work. Slack and Notion are the most accessible for PMs. GitHub is great if they work closely with engineering.",
    },
    {
      id: "plan-your-tools",
      title: "Step 2: Plan Your Tools",
      content: `## Step 2: Plan Your Tools

Before writing code, plan what tools you want to create. Think about the PM workflows you want to enable.

### The Tool Planning Template

For each tool, answer these questions:

| Question | Example (Slack) |
|----------|----------------|
| **Tool name** | \`slack_send_message\` |
| **What does it do?** | Send a message to a Slack channel |
| **Which API endpoint?** | \`POST /chat.postMessage\` |
| **What parameters does it need?** | channel (required), text (required) |
| **What does it return?** | Confirmation with timestamp and channel |
| **When would a PM use this?** | "Post the sprint summary to #product-updates" |

### How Many Tools?

Start with 3-5 tools. You can always add more later. Focus on:
1. **A list/search tool** — find things
2. **A read/get tool** — get details about a specific thing
3. **A create/write tool** — create something new
4. **A send/share tool** — communicate or share

This covers 90% of PM workflows.

### Naming Convention

Use a consistent naming pattern: \`servicename_action\`
- \`slack_list_channels\`, \`slack_send_message\`, \`slack_search_messages\`
- \`notion_search_pages\`, \`notion_create_page\`, \`notion_get_page\`
- \`github_list_issues\`, \`github_create_issue\`, \`github_get_pr\`

This makes it clear to Claude which service each tool belongs to.`,
      checkQuestion: "Using the planning template, can you plan 3 tools for the API you chose? Just the tool names and what they do — no code yet.",
      teacherNotes: "This is PM work! Planning tools is like writing user stories. If they are struggling, help them think about it in terms of 'As a PM, I want to...' for each tool. Encourage them to write it down before coding.",
    },
    {
      id: "project-setup-and-auth",
      title: "Steps 3 & 4: Project Setup and Auth",
      content: `## Step 3: Set Up the Project

This is the same every time. We will build it right here in your current project folder.

### index.ts Boilerplate

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// --- Configuration ---
const API_TOKEN = process.env.YOUR_SERVICE_API_TOKEN;
const BASE_URL = "https://api.yourservice.com";

if (!API_TOKEN) {
  console.error("Missing YOUR_SERVICE_API_TOKEN environment variable");
  process.exit(1);
}

// --- API Helper ---
async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = \`\${BASE_URL}\${path}\`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: \`Bearer \${API_TOKEN}\`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`API error (\${response.status}): \${errorText}\`);
  }

  return response.json();
}

// --- Create MCP Server ---
const server = new McpServer({
  name: "your-service-mcp-server",
  version: "1.0.0",
});

// --- Tools go here ---

// --- Start Server ---
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

Use the same package.json and tsconfig.json from previous lessons.

## Step 4: Implement Auth

Modify the \`apiFetch\` helper based on your API's auth method:

**Bearer Token (most modern APIs):**
\`\`\`typescript
Authorization: \`Bearer \${API_TOKEN}\`,
\`\`\`

**API Key in header (Figma, Notion):**
\`\`\`typescript
"X-API-Key": API_TOKEN,
// or for Figma:
"X-Figma-Token": API_TOKEN,
\`\`\`

**Basic Auth (Jira, Confluence):**
\`\`\`typescript
Authorization: \`Basic \${Buffer.from(\`\${EMAIL}:\${TOKEN}\`).toString("base64")}\`,
\`\`\`

**OAuth2 (Google, complex Slack):**
Use the pattern from Lesson 5 or an official SDK that handles OAuth for you.

The key insight: the auth implementation is a one-time decision. Once your \`apiFetch\` helper has the right auth headers, every tool you add works automatically.`,
      checkQuestion: "What auth method does the API you chose use? Can you find it in their docs?",
      teacherNotes: "Most PMs will choose APIs with simple auth (Bearer token or API key). If someone chose Google or another OAuth API, remind them they already know the pattern from Lesson 5. The boilerplate is designed to be copied and modified — encourage them to do exactly that.",
    },
    {
      id: "worked-example-slack",
      title: "Step 5: Worked Example — Slack",
      content: `## Step 5: Add Your Tools (Worked Example — Slack)

Let us build a Slack MCP server as a complete example. Slack uses a Bot Token (Bearer) for authentication.

### Getting Your Slack Bot Token

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App" > "From scratch"**
3. Name it "MCP Bot" and select your workspace
4. Go to **"OAuth & Permissions"**
5. Under **"Bot Token Scopes"**, add: \`channels:read\`, \`chat:write\`, \`search:read\`
6. Click **"Install to Workspace"** at the top
7. Copy the **Bot User OAuth Token** (starts with \`xoxb-\`)

### Tool 1: List Channels

\`\`\`typescript
server.tool(
  "slack_list_channels",
  "List public Slack channels in the workspace. Returns channel name, ID, member count, and topic.",
  {
    limit: z.number().optional().describe("Maximum number of channels to return (default: 20)"),
  },
  async ({ limit }) => {
    const data = await apiFetch(\`/conversations.list?types=public_channel&limit=\${limit || 20}\`);
    if (!data.ok) throw new Error(\`Slack API error: \${data.error}\`);

    const channels = data.channels.map((ch: any) => ({
      id: ch.id, name: ch.name, memberCount: ch.num_members,
      topic: ch.topic?.value || "", purpose: ch.purpose?.value || "",
    }));

    return { content: [{ type: "text" as const, text: JSON.stringify({ count: channels.length, channels }, null, 2) }] };
  }
);
\`\`\`

### Tool 2: Send Message

\`\`\`typescript
server.tool(
  "slack_send_message",
  "Send a message to a Slack channel. Use the channel ID or a channel name prefixed with #.",
  {
    channel: z.string().describe("The channel ID (e.g., 'C01234ABCDE') or name (e.g., '#product-updates')"),
    text: z.string().describe("The message text to send. Supports Slack markdown."),
  },
  async ({ channel, text }) => {
    const data = await apiFetch("/chat.postMessage", {
      method: "POST",
      body: JSON.stringify({ channel, text }),
    });
    if (!data.ok) throw new Error(\`Slack API error: \${data.error}\`);

    return {
      content: [{ type: "text" as const, text: JSON.stringify({ message: "Message sent", channel: data.channel, timestamp: data.ts }, null, 2) }],
    };
  }
);
\`\`\`

### Tool 3: Search Messages

\`\`\`typescript
server.tool(
  "slack_search_messages",
  "Search for messages across Slack channels. Supports operators: 'from:@user', 'in:#channel', 'before:2026-01-01'.",
  {
    query: z.string().describe("The search query"),
    count: z.number().optional().describe("Number of results (default: 10)"),
  },
  async ({ query, count }) => {
    const params = new URLSearchParams({ query, count: (count || 10).toString() });
    const data = await apiFetch(\`/search.messages?\${params.toString()}\`);
    if (!data.ok) throw new Error(\`Slack API error: \${data.error}\`);

    const messages = data.messages.matches.map((msg: any) => ({
      text: msg.text, user: msg.username || msg.user,
      channel: msg.channel?.name, permalink: msg.permalink,
    }));

    return {
      content: [{ type: "text" as const, text: JSON.stringify({ total: data.messages.total, returned: messages.length, messages }, null, 2) }],
    };
  }
);
\`\`\`

Notice the pattern: every tool follows the same structure. Define the name, write a clear description, specify inputs, call the API, return formatted results. Once you see this pattern, you can build tools for any API endpoint.`,
      teacherNotes: "The Slack example is a complete, working implementation. If the student is building their own API (not Slack), encourage them to follow the same pattern but swap in their API's endpoints and response format. The structure is always the same.",
      checkQuestion: "Can you see how each Slack tool follows the same pattern as the Jira, Drive, and Sheets tools? What are the common elements?",
    },
    {
      id: "error-handling-and-template",
      title: "Step 6: Error Handling and Template",
      content: `## Step 6: Handle Errors Gracefully

Real-world APIs fail. Your MCP server should handle failures so Claude can report useful error messages.

### Improved apiFetch with Specific Errors

\`\`\`typescript
async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = \`\${BASE_URL}\${path}\`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Authorization: \`Bearer \${API_TOKEN}\`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    throw new Error(\`Cannot reach \${BASE_URL}. Check your internet connection.\`);
  }

  if (response.status === 401) {
    throw new Error("Authentication failed. Your API token may be invalid or expired.");
  }
  if (response.status === 403) {
    throw new Error("Permission denied. Check your token's scopes/permissions.");
  }
  if (response.status === 404) {
    throw new Error(\`Resource not found at \${path}. Check the ID or URL.\`);
  }
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(\`Rate limit exceeded. Try again in \${retryAfter || "a few"} seconds.\`);
  }
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`API error (\${response.status}): \${errorText}\`);
  }

  return response.json();
}
\`\`\`

**Why specific errors matter:** When Claude encounters "Authentication failed. Your API token may be invalid" vs just "fetch failed," it can give you actionable advice. Write errors for the human, not the machine.

### The isError Flag

When a tool fails, return \`isError: true\` so Claude knows the result is an error, not data:

\`\`\`typescript
return {
  content: [{ type: "text" as const, text: \`Error: \${error.message}\` }],
  isError: true,
};
\`\`\`

## Choosing Your Own API

Here are APIs that work great for PM MCP servers:

| Service | Auth Type | Good Tools to Build |
|---------|-----------|-------------------|
| **Slack** | Bot Token (Bearer) | Send messages, list channels, search |
| **Notion** | API Key | Read pages, create pages, search |
| **Linear** | API Key | Create issues, list projects, search |
| **GitHub** | Personal Access Token | List repos, create issues, read PRs |
| **Asana** | Personal Access Token | List tasks, create tasks, update |
| **Confluence** | Basic Auth | Read pages, create pages, search |

Pick based on: (1) what you use at work, (2) simple auth (avoid OAuth for your first custom build), (3) good documentation.

## Summary

The six-step framework works for any API:

1. **Read the docs** — base URL, auth, endpoints, rate limits
2. **Plan your tools** — 3-5 tools covering list, get, create, search
3. **Set up the project** — same boilerplate every time
4. **Implement auth** — match the API's method
5. **Add tools one at a time** — build, test, add the next
6. **Handle errors** — specific, helpful error messages

You now have the skill to build an MCP server for any service with a REST API. This is the most transferable skill in this course.`,
      teacherNotes: "This is a pivotal moment. The student now has a generalizable skill. Celebrate it: 'You can now build an MCP server for any tool you use. That is a superpower that very few PMs have.' Encourage them to actually build one for the exercise — that is where the real learning happens.",
    },
  ],
  exercise: {
    title: "Build an MCP Server for an API You Use",
    description:
      "Apply the six-step framework to build an MCP server for an API you actually use at work. This is the most important exercise in the course because it teaches you to generalize the pattern.",
    steps: [
      "Choose an API from the list above (Slack, Notion, Linear, GitHub, Asana, etc.) or any other API you use at work",
      "Read the API docs for 15-20 minutes. Find: (a) Base URL, (b) Authentication method, (c) 3-4 endpoints you care about, (d) Rate limits",
      "Plan your tools using the tool planning template: tool name, endpoint, parameters, return value, PM use case",
      "Copy the MCP server boilerplate from this lesson into a new project directory",
      "Update the boilerplate with your API's base URL and authentication",
      "Implement your first tool (a list or search tool is easiest to start with). Build and test it.",
      "Add a second tool (a get-by-ID tool). Build and test.",
      "Add a third tool (a create tool). Build and test.",
      "Connect all tools to Claude Code and try a natural language workflow: for example, 'Search for X, then create Y based on the results'",
    ],
    validation:
      "You have successfully completed this exercise if: (1) You identified the base URL, auth method, and key endpoints from the API docs, (2) You built at least 3 working tools, (3) Claude can call each tool and get results, and (4) You successfully completed a multi-step workflow using your tools.",
  },
  quiz: {
    questions: [
      {
        question:
          "What is the first thing you should do before writing code for a new MCP server?",
        options: [
          "Install the MCP SDK",
          "Create the package.json file",
          "Read the API documentation to understand the base URL, auth method, and key endpoints",
          "Write the tool definitions",
        ],
        correctIndex: 2,
        explanation:
          "Always start by reading the API docs. You need to understand the base URL, authentication method, key endpoints, and response format before you can plan your tools or write any code. Spending 15-20 minutes on docs saves hours of debugging.",
      },
      {
        question:
          "What does the isError: true flag do in a tool response?",
        options: [
          "It crashes the MCP server",
          "It tells Claude the tool execution failed so it can report the error to the user",
          "It retries the API call automatically",
          "It logs the error to a file",
        ],
        correctIndex: 1,
        explanation:
          "Setting isError: true in the tool response tells Claude that the tool call failed. Claude will then report the error to the user in a helpful way rather than trying to use the error message as a successful result.",
      },
      {
        question:
          "Why should you start with 3-5 tools rather than trying to cover every API endpoint?",
        options: [
          "MCP servers have a maximum tool limit of 5",
          "More tools make the server slower",
          "Starting small lets you build, test, and validate each tool before adding complexity. You can always add more tools later.",
          "Claude can only remember 5 tools at a time",
        ],
        correctIndex: 2,
        explanation:
          "Starting with 3-5 tools keeps your initial build manageable. You can test each tool thoroughly, make sure the auth works, and validate that Claude uses the tools correctly. Adding more tools later is easy — the hard part is getting the first one working.",
      },
      {
        question:
          "What information should you include in error messages thrown by the apiFetch helper?",
        options: [
          "Just the word 'Error'",
          "The full stack trace",
          "The HTTP status code and specific guidance on what might be wrong and how to fix it",
          "The raw API response without any context",
        ],
        correctIndex: 2,
        explanation:
          "Good error messages include the HTTP status code and specific, actionable guidance. For example, 'Authentication failed (401). Your API token may be invalid or expired.' This helps the user fix the problem quickly.",
      },
      {
        question:
          "What are the three most common types of tools a PM would need for any API integration?",
        options: [
          "Login, logout, and reset password",
          "List/search, get by ID, and create",
          "Upload, download, and delete",
          "Connect, disconnect, and reconnect",
        ],
        correctIndex: 1,
        explanation:
          "The three most common tool types for PM workflows are: (1) List or search — find things, (2) Get by ID — get details about a specific thing, and (3) Create — make something new. These cover 90% of PM use cases.",
      },
    ],
  },
};

export default lesson;
