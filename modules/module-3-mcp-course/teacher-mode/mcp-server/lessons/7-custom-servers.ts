import { LessonContent } from "./1-welcome";

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
  content: `# Build an MCP Server for Any API

## The Superpower

You have built MCP servers for Jira, Google Drive, and Google Sheets. But the real superpower is not knowing how to build those specific integrations — it is knowing **how to build an MCP server for any API you encounter**.

In this lesson, you will learn a repeatable framework that works for any REST API. We will build a Slack integration as a worked example, and you will get a template you can use to create your own MCP servers in the future.

---

## The 6-Step Framework

Every MCP server you build follows the same six steps:

1. **Read the API docs** — Find endpoints, auth method, response format
2. **Plan your tools** — Decide what actions would be useful
3. **Set up the project** — package.json, tsconfig, boilerplate
4. **Implement auth** — API key, OAuth, Bearer token
5. **Add your tools** — One at a time, test each
6. **Handle errors** — API down, rate limited, bad input

Let us walk through each step in detail.

---

## Step 1: Read the API Docs

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

Most APIs limit how many requests you can make. Find the rate limit docs so you know:
- How many requests per minute/hour
- What happens when you exceed the limit (usually a 429 status code)
- Whether different endpoints have different limits

### Practical Tip

Do not try to read the entire API doc. Focus on the endpoints that map to your use case. For a PM, that usually means: list things, get thing by ID, create a thing, search for things.

---

## Step 2: Plan Your Tools

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

---

## Step 3: Set Up the Project

This is the same every time. Here is the boilerplate:

### Directory Structure

\`\`\`
my-mcp-server/
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
\`\`\`

### package.json Template

\`\`\`json
{
  "name": "YOUR-SERVICE-mcp-server",
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

### tsconfig.json Template

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
async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
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
    throw new Error(
      \`API error (\${response.status}): \${errorText}\`
    );
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

This boilerplate works for any API that uses Bearer token auth. For other auth methods, modify the \`apiFetch\` helper:

**API Key in header:**
\`\`\`typescript
headers: {
  "X-API-Key": API_TOKEN,
  "Content-Type": "application/json",
}
\`\`\`

**Basic Auth:**
\`\`\`typescript
headers: {
  Authorization: \`Basic \${Buffer.from(\`\${EMAIL}:\${TOKEN}\`).toString("base64")}\`,
  "Content-Type": "application/json",
}
\`\`\`

---

## Step 4: Implement Auth

Choose the auth implementation that matches your API (from Step 1):

### Simple: API Key or Bearer Token

Store the token as an environment variable and include it in every request. This is what most APIs use.

\`\`\`typescript
const API_TOKEN = process.env.SERVICE_API_TOKEN;

// In your fetch helper:
headers: {
  Authorization: \`Bearer \${API_TOKEN}\`,
}
\`\`\`

### Medium: Basic Auth

Combine two credentials (usually email + token) and Base64 encode them.

\`\`\`typescript
const EMAIL = process.env.SERVICE_EMAIL;
const TOKEN = process.env.SERVICE_API_TOKEN;
const auth = Buffer.from(\`\${EMAIL}:\${TOKEN}\`).toString("base64");

// In your fetch helper:
headers: {
  Authorization: \`Basic \${auth}\`,
}
\`\`\`

### Complex: OAuth2

Requires a first-time auth flow (like Google). Use the pattern from Lesson 5. Most APIs that use OAuth have official SDKs (like \`googleapis\` for Google or \`@slack/web-api\` for Slack) that handle the OAuth complexity for you.

---

## Step 5: Add Your Tools (Worked Example — Slack)

Let us build a Slack MCP server as a complete example. Slack uses a Bot Token (Bearer) for authentication, which makes it straightforward.

### Getting Your Slack Bot Token

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App" > "From scratch"**
3. Name it "MCP Bot" and select your workspace
4. Go to **"OAuth & Permissions"**
5. Under **"Bot Token Scopes"**, add:
   - \`channels:read\` — list channels
   - \`chat:write\` — send messages
   - \`search:read\` — search messages
6. Click **"Install to Workspace"** at the top
7. Copy the **Bot User OAuth Token** (starts with \`xoxb-\`)

### Tool 1: List Channels

\`\`\`typescript
server.tool(
  "slack_list_channels",
  "List public Slack channels in the workspace. Returns channel name, ID, member count, and topic.",
  {
    limit: z
      .number()
      .optional()
      .describe("Maximum number of channels to return (default: 20)"),
  },
  async ({ limit }) => {
    const data = await apiFetch(
      \`/conversations.list?types=public_channel&limit=\${limit || 20}\`
    );

    if (!data.ok) {
      throw new Error(\`Slack API error: \${data.error}\`);
    }

    const channels = data.channels.map((ch: any) => ({
      id: ch.id,
      name: ch.name,
      memberCount: ch.num_members,
      topic: ch.topic?.value || "",
      purpose: ch.purpose?.value || "",
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ count: channels.length, channels }, null, 2),
        },
      ],
    };
  }
);
\`\`\`

### Tool 2: Send Message

\`\`\`typescript
server.tool(
  "slack_send_message",
  "Send a message to a Slack channel. Use the channel ID (from slack_list_channels) or a channel name prefixed with #.",
  {
    channel: z
      .string()
      .describe("The channel ID (e.g., 'C01234ABCDE') or channel name (e.g., '#product-updates')"),
    text: z
      .string()
      .describe("The message text to send. Supports Slack markdown formatting."),
  },
  async ({ channel, text }) => {
    const data = await apiFetch("/chat.postMessage", {
      method: "POST",
      body: JSON.stringify({ channel, text }),
    });

    if (!data.ok) {
      throw new Error(\`Slack API error: \${data.error}\`);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: "Message sent successfully",
              channel: data.channel,
              timestamp: data.ts,
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

### Tool 3: Search Messages

\`\`\`typescript
server.tool(
  "slack_search_messages",
  "Search for messages across Slack channels. Finds messages matching a query string. Useful for finding past discussions, decisions, or context.",
  {
    query: z
      .string()
      .describe(
        "The search query. Supports Slack search operators: 'from:@user', 'in:#channel', 'before:2026-01-01', 'after:2026-01-01'"
      ),
    count: z
      .number()
      .optional()
      .describe("Number of results to return (default: 10)"),
  },
  async ({ query, count }) => {
    const params = new URLSearchParams({
      query,
      count: (count || 10).toString(),
    });

    const data = await apiFetch(\`/search.messages?\${params.toString()}\`);

    if (!data.ok) {
      throw new Error(\`Slack API error: \${data.error}\`);
    }

    const messages = data.messages.matches.map((msg: any) => ({
      text: msg.text,
      user: msg.username || msg.user,
      channel: msg.channel?.name,
      timestamp: msg.ts,
      permalink: msg.permalink,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              total: data.messages.total,
              returned: messages.length,
              messages,
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

---

## Step 6: Handle Errors Gracefully

Real-world APIs fail. Your MCP server should handle failures gracefully so Claude can report useful error messages instead of crashing.

### Common Errors and How to Handle Them

\`\`\`typescript
async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<any> {
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
    // Network error — API is unreachable
    throw new Error(
      \`Cannot reach \${BASE_URL}. Check your internet connection and the API URL.\`
    );
  }

  // Handle specific HTTP status codes
  if (response.status === 401) {
    throw new Error(
      "Authentication failed. Your API token may be invalid or expired. Generate a new one and update your environment variables."
    );
  }

  if (response.status === 403) {
    throw new Error(
      "Permission denied. Your token does not have the required scopes for this operation. Check the API permissions."
    );
  }

  if (response.status === 404) {
    throw new Error(
      \`Resource not found at \${path}. The ID may be incorrect or the resource may have been deleted.\`
    );
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new Error(
      \`Rate limit exceeded. Try again in \${retryAfter || "a few"} seconds.\`
    );
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      \`API error (\${response.status}): \${errorText}\`
    );
  }

  return response.json();
}
\`\`\`

**Why this matters:** When Claude encounters an error, it reports it to you. A generic "fetch failed" message is not helpful. A specific "Authentication failed. Your API token may be invalid or expired." tells you exactly what to fix.

### Wrapping Tool Handlers

You can also wrap individual tool handlers in try-catch blocks:

\`\`\`typescript
server.tool(
  "my_tool",
  "Description",
  { /* params */ },
  async (params) => {
    try {
      const result = await apiFetch("/endpoint");
      return {
        content: [{ type: "text" as const, text: JSON.stringify(result, null, 2) }],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text" as const,
            text: \`Error: \${error instanceof Error ? error.message : "Unknown error occurred"}\`,
          },
        ],
        isError: true,
      };
    }
  }
);
\`\`\`

The \`isError: true\` flag tells Claude that the tool execution failed, so it can report the error appropriately.

---

## The Complete Template

Here is a complete, configurable MCP server template you can use for any API:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ====================================
// CONFIGURATION — Edit these values
// ====================================
const SERVER_NAME = "your-service-mcp-server";
const SERVER_VERSION = "1.0.0";
const BASE_URL = process.env.SERVICE_BASE_URL || "https://api.yourservice.com";
const API_TOKEN = process.env.SERVICE_API_TOKEN;

if (!API_TOKEN) {
  console.error("Missing SERVICE_API_TOKEN environment variable");
  process.exit(1);
}

// ====================================
// API HELPER — Modify auth as needed
// ====================================
async function apiFetch(path: string, options: RequestInit = {}): Promise<any> {
  const url = \`\${BASE_URL}\${path}\`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: \`Bearer \${API_TOKEN}\`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`API error (\${response.status}): \${errorText}\`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// ====================================
// SERVER SETUP
// ====================================
const server = new McpServer({
  name: SERVER_NAME,
  version: SERVER_VERSION,
});

// ====================================
// TOOLS — Add your tools below
// ====================================

// Tool 1: List/Search
server.tool(
  "service_list_items",
  "List items from the service. Describe what this returns.",
  {
    query: z.string().optional().describe("Search/filter query"),
    limit: z.number().optional().describe("Max results (default: 20)"),
  },
  async ({ query, limit }) => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (limit) params.set("limit", limit.toString());

    const data = await apiFetch(\`/items?\${params.toString()}\`);

    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool 2: Get by ID
server.tool(
  "service_get_item",
  "Get details for a specific item by ID.",
  {
    id: z.string().describe("The item ID"),
  },
  async ({ id }) => {
    const data = await apiFetch(\`/items/\${id}\`);
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    };
  }
);

// Tool 3: Create
server.tool(
  "service_create_item",
  "Create a new item in the service.",
  {
    name: z.string().describe("Item name"),
    description: z.string().optional().describe("Item description"),
  },
  async ({ name, description }) => {
    const data = await apiFetch("/items", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    };
  }
);

// ====================================
// START SERVER
// ====================================
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

To use this template:
1. Copy the file
2. Update SERVER_NAME, BASE_URL, and auth configuration
3. Replace the example tools with your actual tools
4. Build and configure in Claude Code

---

## Choosing Your Own API

Here are some APIs that work great for PM MCP servers:

| Service | Auth Type | Good Tools to Build |
|---------|-----------|-------------------|
| **Slack** | Bot Token (Bearer) | Send messages, list channels, search |
| **Notion** | API Key | Read pages, create pages, search |
| **Linear** | API Key | Create issues, list projects, search |
| **GitHub** | Personal Access Token | List repos, create issues, read PRs |
| **Asana** | Personal Access Token | List tasks, create tasks, update status |
| **Confluence** | Basic Auth (email + token) | Read pages, create pages, search |
| **Airtable** | API Key | Read records, create records, list bases |

### How to Choose

Pick an API based on:
1. **What you use at work** — the integration you will actually use daily
2. **Simple auth** — start with API key or Bearer token, not OAuth
3. **Good documentation** — a well-documented API is much easier to integrate
4. **REST-based** — GraphQL APIs (like Linear) require a different approach

---

## Summary

The six-step framework works for any API:

1. **Read the docs** — Find base URL, auth method, key endpoints, rate limits
2. **Plan your tools** — 3-5 tools covering list, get, create, search
3. **Set up the project** — Same boilerplate every time
4. **Implement auth** — Match the API's auth method
5. **Add tools one at a time** — Build, test, then add the next
6. **Handle errors** — Specific, helpful error messages

The template in this lesson gives you a starting point that handles 90% of API integrations. The remaining 10% is specific to each API's data format and quirks.

In the next lesson (optional), we will build a Figma integration for design-to-development workflows.
`,
  exercise: {
    title: "Build an MCP Server for an API You Use",
    description:
      "Apply the six-step framework to build an MCP server for an API you actually use at work. This is the most important exercise in the course because it teaches you to generalize the pattern.",
    steps: [
      "Choose an API from the list above (Slack, Notion, Linear, GitHub, Asana, etc.) or any other API you use at work",
      "Read the API docs for 15-20 minutes. Find: (a) Base URL, (b) Authentication method, (c) 3-4 endpoints you care about, (d) Rate limits",
      "Plan your tools using the tool planning template: tool name, endpoint, parameters, return value, PM use case",
      "Copy the MCP server template from this lesson into a new project directory",
      "Update the template with your API's base URL and authentication",
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
          "Good error messages include the HTTP status code and specific, actionable guidance. For example, 'Authentication failed (401). Your API token may be invalid or expired. Generate a new one and update your environment variables.' This helps the user fix the problem quickly.",
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
          "The three most common tool types for PM workflows are: (1) List or search — find things (list projects, search issues), (2) Get by ID — get details about a specific thing, and (3) Create — make something new (create a ticket, write a doc). These cover 90% of PM use cases.",
      },
    ],
  },
};

export default lesson;
