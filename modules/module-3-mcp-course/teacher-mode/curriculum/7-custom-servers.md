# Lesson 7: Building Custom MCP Servers -- The Universal Pattern

**Estimated reading time: 90 minutes**
**Lesson type: Deep dive + Framework + Hands-on**

---

## What You'll Learn

By the end of this lesson, you will:

- Understand the universal pattern for turning ANY REST API into an MCP server
- Have a repeatable 6-step framework you can apply to any tool
- Build a complete Slack MCP server as a worked example
- Know how to handle errors, rate limits, retries, and timeouts
- Understand deployment options beyond your local machine
- Be confident enough to connect Claude to any tool that has an API

This is the longest and most important lesson. If you only internalize one lesson from this course, make it this one. Everything else is an application of what you learn here.

---

## The Universal Pattern

Over the past four lessons, you built MCP servers for Jira (Lesson 4), Google Drive (Lesson 5), and Google Sheets (Lesson 6). If you look back at them, you will notice they all follow the same structure.

Here is the pattern:

```
1. Understand the API        → What can this service do?
2. Get credentials           → How do I authenticate?
3. Create the project        → Set up the three files
4. Define the tools          → What tools should I expose?
5. Implement the tools       → Write the API calls
6. Register and test         → Connect to Claude and verify
```

This six-step pattern works for ANY service with a REST API. Slack, GitHub, Notion, Asana, Linear, Confluence, Airtable, HubSpot -- if it has API documentation, you can build an MCP server for it.

Let us walk through each step in detail, then apply it to a complete Slack example.

---

## Step 1: Understand the API

Before writing a single line of code, you need to understand what the API can do. This is research, not coding.

### Where to Find API Documentation

Every major service publishes API documentation. Here is how to find it:

| Service | Documentation URL |
|---------|------------------|
| Slack | api.slack.com/methods |
| GitHub | docs.github.com/rest |
| Notion | developers.notion.com |
| Asana | developers.asana.com |
| Linear | developers.linear.app |
| Confluence | developer.atlassian.com/cloud/confluence/rest |
| Airtable | airtable.com/developers/web/api |
| HubSpot | developers.hubspot.com |

### What to Look For

When reading API docs, you are looking for four things:

**1. Base URL**
The root address for all API calls. For Slack, it is `https://slack.com/api/`.

**2. Authentication Method**
How do you prove who you are? Look for sections titled "Authentication," "Authorization," or "Getting Started."

**3. Available Endpoints**
What actions can you perform? Skim the endpoint list for ones relevant to your PM workflow. You do not need all of them -- pick the 4-6 most useful.

**4. Request/Response Format**
What does the API expect you to send, and what does it send back? Look at the example requests in the docs.

### The PM Lens

As a PM building an MCP server, you are not trying to support every endpoint. You are asking: "What are the 4-6 actions that would save me the most time?"

For Slack, a PM might want:
- Send a message to a channel
- Read recent messages from a channel
- List channels
- Search messages
- Set a reminder

For GitHub, a PM might want:
- List issues
- Create an issue
- List pull requests
- Read PR comments
- Get repository stats

**Start small.** You can always add more tools later.

---

## Step 2: Get Credentials

Every API requires authentication. The method varies by service, but falls into three categories (from Lesson 2):

### Category A: API Token / Personal Access Token

**Services:** Slack, Figma, GitHub (personal), Linear, Notion

**How to get it:**
1. Go to the service's settings or developer page
2. Look for "API tokens," "Personal access tokens," or "Integrations"
3. Generate a token
4. Copy it and store it securely

**Difficulty:** Easy (5 minutes)

### Category B: Bot Token / App Token

**Services:** Slack (bot), GitHub (app), Discord

**How to get it:**
1. Create an "App" in the service's developer portal
2. Configure the app's permissions (scopes)
3. Install the app to your workspace
4. Get the bot token

**Difficulty:** Moderate (15-20 minutes)

### Category C: OAuth 2.0

**Services:** Google (Drive, Sheets, Calendar), Microsoft (Outlook, Teams), Salesforce

**How to get it:**
1. Create a project in the service's developer console
2. Enable the relevant API
3. Create OAuth credentials
4. Configure the consent screen
5. Implement the OAuth flow in your server

**Difficulty:** More involved (30-45 minutes, but you have already done it in Lessons 5 and 6)

### Finding the Right Auth Method

API documentation always has an authentication section near the beginning. Read it first. It will tell you exactly which method to use and how to set it up.

---

## Step 3: Create the Project

This step is the same every time. You need three files.

### The Template

Ask Claude:

```
Create a new MCP server project for [SERVICE_NAME] in
~/mcp-servers/[service-name]-server with:
- package.json with @modelcontextprotocol/sdk and node-fetch
- tsconfig.json for TypeScript compilation
- src/index.ts with the MCP server boilerplate
```

Claude will generate the standard three-file structure. This is your starting point for every server.

### The Boilerplate

Here is the minimal MCP server that every project starts from:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Configuration
const API_BASE_URL = process.env.SERVICE_BASE_URL || "";
const API_TOKEN = process.env.SERVICE_API_TOKEN || "";

// Helper function for API calls
async function apiRequest(endpoint: string, method: string = "GET", body?: any) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API error (${response.status}): ${errorText}`);
  }
  return response.json();
}

// Create server
const server = new Server(
  { name: "service-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Your tools go here
    ],
  };
});

// Implement tools
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    switch (name) {
      // Your implementations go here
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch(console.error);
```

This template is 80% of every server. The remaining 20% is the specific tools and API calls for your service.

---

## Step 4: Define the Tools

This is where your PM skills shine. You are essentially writing a product spec for your MCP server.

### Writing Good Tool Definitions

Each tool needs three things:

**1. A clear name** -- Use `verb_noun` format: `send_message`, `list_channels`, `search_issues`

**2. A descriptive description** -- This is how Claude decides when to use the tool. Be specific. Include examples.

Bad: `"Search for things"`
Good: `"Search for Slack messages across all channels. Supports filtering by date, user, and channel. Example query: 'from:@sarah in:#product-team after:2026-01-01'"`

**3. A precise input schema** -- Define every parameter with its type, description, and whether it is required.

### The Tool Definition Checklist

For each tool, answer these questions:
- What HTTP method does it use? (GET, POST, PUT, DELETE)
- What endpoint does it call?
- What parameters does it need?
- Which parameters are required vs. optional?
- What does the response look like?
- What is a realistic scenario where a PM would use this?

---

## Step 5: Implement the Tools

This is where you translate API documentation into code. The pattern is always:

```typescript
case "tool_name": {
  // 1. Extract parameters from args
  const param = args.param_name;

  // 2. Make the API call
  const data = await apiRequest("/endpoint", "METHOD", bodyIfNeeded);

  // 3. Format the response
  const result = data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    // ... pick the fields that matter
  }));

  // 4. Return to Claude
  return {
    content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
  };
}
```

### Formatting Responses

When returning data to Claude, you have a choice:

**Raw JSON** -- Best for structured data Claude needs to analyze:
```typescript
return {
  content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
};
```

**Formatted text** -- Best for human-readable summaries:
```typescript
return {
  content: [{
    type: "text",
    text: `Found ${items.length} messages:\n${items.map(m =>
      `- [${m.timestamp}] ${m.user}: ${m.text}`
    ).join("\n")}`
  }],
};
```

Either works. Claude can handle both. Use JSON when the data is complex and Claude needs to process it. Use formatted text when the result is a simple list or confirmation.

---

## Step 6: Register and Test

Same as every lesson:

1. Run `npm run build`
2. Add the server to `~/.claude/claude_desktop_config.json`
3. Restart Claude Code
4. Test each tool with a natural language request

---

## Worked Example: Building a Slack MCP Server

Let us apply the 6-step framework to build a complete Slack integration.

### E1: Understand the Slack API

Slack's API is well-documented at `api.slack.com`. Key findings:

- **Base URL:** `https://slack.com/api/`
- **Auth:** Bot token (starts with `xoxb-`)
- **Format:** All responses include an `ok` field (true/false)
- **Useful endpoints for PMs:**
  - `conversations.list` -- List channels
  - `conversations.history` -- Read messages from a channel
  - `chat.postMessage` -- Send a message
  - `search.messages` -- Search across channels
  - `reminders.add` -- Create a reminder

### E2: Get Slack Credentials

1. Go to [api.slack.com/apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Name it `Claude MCP Bot` and select your workspace
5. In the left sidebar, click **"OAuth & Permissions"**
6. Under **"Bot Token Scopes"**, add:
   - `channels:history` (read public channel messages)
   - `channels:read` (list channels)
   - `chat:write` (send messages)
   - `search:read` (search messages)
   - `reminders:write` (create reminders)
7. Click **"Install to Workspace"** at the top
8. Review permissions and click **"Allow"**
9. Copy the **Bot User OAuth Token** (starts with `xoxb-`)

### E3: Create the Project

```
Create a new MCP server project for Slack in
~/mcp-servers/slack-server with the standard MCP setup.
```

### E4 and E5: Define and Implement Tools

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const SLACK_TOKEN = process.env.SLACK_BOT_TOKEN || "";
const BASE_URL = "https://slack.com/api";

async function slackRequest(method: string, params: Record<string, any> = {}) {
  const url = `${BASE_URL}/${method}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SLACK_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(params),
  });

  const data = await response.json();

  if (!data.ok) {
    throw new Error(`Slack API error: ${data.error}`);
  }

  return data;
}

const server = new Server(
  { name: "slack-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_channels",
        description:
          "List public Slack channels in the workspace. Returns channel names, topics, and member counts.",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Max channels to return (default: 100)",
            },
          },
        },
      },
      {
        name: "read_messages",
        description:
          "Read recent messages from a Slack channel. Use list_channels first to find the channel ID.",
        inputSchema: {
          type: "object",
          properties: {
            channel_id: {
              type: "string",
              description: "The channel ID (e.g., C01ABC23DEF)",
            },
            limit: {
              type: "number",
              description: "Number of messages to retrieve (default: 20)",
            },
          },
          required: ["channel_id"],
        },
      },
      {
        name: "send_message",
        description:
          "Send a message to a Slack channel. Supports basic Slack markdown formatting.",
        inputSchema: {
          type: "object",
          properties: {
            channel_id: {
              type: "string",
              description: "The channel ID to post to",
            },
            text: {
              type: "string",
              description: "The message text (supports Slack markdown)",
            },
          },
          required: ["channel_id", "text"],
        },
      },
      {
        name: "search_messages",
        description:
          "Search for messages across all Slack channels. Supports Slack search operators like 'from:@user', 'in:#channel', 'after:2026-01-01'.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Search query with optional Slack search operators",
            },
            count: {
              type: "number",
              description: "Max results to return (default: 20)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "set_reminder",
        description:
          "Create a Slack reminder for yourself. Time can be natural language like 'in 2 hours', 'tomorrow at 9am', 'next Monday'.",
        inputSchema: {
          type: "object",
          properties: {
            text: {
              type: "string",
              description: "What to be reminded about",
            },
            time: {
              type: "string",
              description:
                "When to be reminded (natural language, e.g., 'tomorrow at 9am')",
            },
          },
          required: ["text", "time"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_channels": {
        const data = await slackRequest("conversations.list", {
          types: "public_channel",
          limit: args?.limit || 100,
          exclude_archived: true,
        });

        const channels = data.channels.map((ch: any) => ({
          id: ch.id,
          name: ch.name,
          topic: ch.topic?.value || "(no topic)",
          members: ch.num_members,
        }));

        return {
          content: [{ type: "text", text: JSON.stringify(channels, null, 2) }],
        };
      }

      case "read_messages": {
        const data = await slackRequest("conversations.history", {
          channel: args.channel_id,
          limit: args?.limit || 20,
        });

        const messages = data.messages.map((msg: any) => ({
          user: msg.user,
          text: msg.text,
          timestamp: new Date(parseFloat(msg.ts) * 1000).toISOString(),
          reactions: msg.reactions?.map((r: any) => `${r.name}(${r.count})`) || [],
        }));

        return {
          content: [{ type: "text", text: JSON.stringify(messages, null, 2) }],
        };
      }

      case "send_message": {
        const data = await slackRequest("chat.postMessage", {
          channel: args.channel_id,
          text: args.text,
        });

        return {
          content: [
            {
              type: "text",
              text: `Message sent to channel. Timestamp: ${data.ts}`,
            },
          ],
        };
      }

      case "search_messages": {
        const data = await slackRequest("search.messages", {
          query: args.query,
          count: args?.count || 20,
        });

        const results = data.messages.matches.map((m: any) => ({
          channel: m.channel?.name,
          user: m.user,
          text: m.text,
          timestamp: m.ts,
          permalink: m.permalink,
        }));

        return {
          content: [
            {
              type: "text",
              text: `Found ${data.messages.total} results:\n${JSON.stringify(results, null, 2)}`,
            },
          ],
        };
      }

      case "set_reminder": {
        const data = await slackRequest("reminders.add", {
          text: args.text,
          time: args.time,
        });

        return {
          content: [
            {
              type: "text",
              text: `Reminder set: "${args.text}" at ${args.time}`,
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [{ type: "text", text: `Error: ${error.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Slack MCP server running on stdio");
}

main().catch(console.error);
```

### E6: Register and Test

```
Add slack-server to my Claude config.
Server at ~/mcp-servers/slack-server/dist/index.js
Environment: SLACK_BOT_TOKEN=xoxb-your-token-here
```

Test commands:
```
List my Slack channels
```
```
Read the last 10 messages from #product-team
```
```
Search Slack for messages about "launch timeline" from the last week
```
```
Set a reminder for tomorrow at 9am to review the sprint backlog
```

---

## Error Handling Best Practices

Real APIs fail. Networks go down, tokens expire, rate limits are hit. Good error handling is the difference between a server that is frustrating and one that is reliable.

### The Error Wrapper Pattern

Always wrap your tool implementations in try/catch:

```typescript
try {
  // ... your tool code ...
} catch (error: any) {
  return {
    content: [{ type: "text", text: `Error: ${error.message}` }],
    isError: true,
  };
}
```

The `isError: true` flag tells Claude that the tool failed, so Claude can report the error to you or try a different approach.

### Providing Helpful Error Messages

Bad error messages:
```
Error: Request failed
```

Good error messages:
```
Error: Jira returned 401 Unauthorized. Your API token may have expired.
Please generate a new token at https://id.atlassian.com/manage-profile/security/api-tokens
```

Include:
- What happened (the status code or error type)
- Why it might have happened (common causes)
- How to fix it (specific steps)

### Validation Before API Calls

Check for problems before making the API call:

```typescript
case "create_issue": {
  if (!args.project_key) {
    return {
      content: [{ type: "text", text: "Error: project_key is required" }],
      isError: true,
    };
  }
  if (!args.summary || args.summary.trim().length === 0) {
    return {
      content: [{ type: "text", text: "Error: summary cannot be empty" }],
      isError: true,
    };
  }
  // ... proceed with API call
}
```

---

## Rate Limiting, Retries, and Timeouts

### Rate Limiting

Most APIs limit how many requests you can make per minute or per hour. When you exceed the limit, you get a **429 Too Many Requests** response.

Here is a simple retry-with-backoff approach:

```typescript
async function apiRequestWithRetry(
  endpoint: string,
  method: string = "GET",
  body?: any,
  maxRetries: number = 3
) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await apiRequest(endpoint, method, body);
      return response;
    } catch (error: any) {
      if (error.message.includes("429") && attempt < maxRetries - 1) {
        // Wait before retrying: 1s, 2s, 4s (exponential backoff)
        const waitTime = Math.pow(2, attempt) * 1000;
        console.error(`Rate limited. Retrying in ${waitTime}ms...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        throw error;
      }
    }
  }
}
```

**Exponential backoff** means each retry waits longer: 1 second, then 2 seconds, then 4 seconds. This gives the API time to recover without hammering it with rapid-fire retries.

### Timeouts

Some API calls take a long time, especially search operations. Add a timeout to prevent hanging:

```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

try {
  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  return response;
} catch (error: any) {
  clearTimeout(timeoutId);
  if (error.name === "AbortError") {
    throw new Error("Request timed out after 30 seconds");
  }
  throw error;
}
```

---

## Deployment Options

So far, all your MCP servers run on your local machine. This is fine for personal use, but there are other options.

### Option 1: Local (What You Have Now)

```
Your Computer
  └── Claude Code
        └── MCP Server (stdio)
              └── API calls to Jira/Slack/etc.
```

**Pros:** Simple, fast, no infrastructure to manage
**Cons:** Only works on your machine, stops when you close your terminal

### Option 2: Docker Container

Wrap your MCP server in a Docker container for portability and consistency.

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY dist/ ./dist/
CMD ["node", "dist/index.js"]
```

**Pros:** Runs the same everywhere, easy to share with your team
**Cons:** Requires Docker knowledge, slightly more setup

### Option 3: Remote Server (Advanced)

Run the MCP server on a cloud server and connect to it over HTTP instead of stdio. This requires using the HTTP transport instead of stdio.

**Pros:** Always running, accessible from any machine
**Cons:** Requires a server, more complex security considerations

For this course, **local is the right choice.** It keeps things simple and you own your data. Consider Docker or remote only if you want to share your servers with your team.

---

## Real PM Workflow: Multi-Tool Automation

Here is the ultimate workflow that combines everything you have built:

```
Every Monday morning, I need a comprehensive status update. Here's what I want:

1. Pull current sprint data from Jira (project PROJ):
   - Ticket counts by status (To Do, In Progress, Done)
   - Blockers and high-priority unassigned items
   - Sprint burndown progress

2. Read team capacity from Google Sheets [spreadsheet-id]:
   - Who is over 90% capacity?
   - Who has availability?

3. Check Slack #product-team for any messages from the last 3 days
   mentioning "blocked", "delayed", or "risk"

4. Create a Google Doc called "Weekly Status - [date]" that
   synthesizes all of this into a professional status report

5. Post a summary to Slack #product-updates
```

Claude orchestrates five different MCP servers to:
1. Query Jira for sprint data
2. Read Sheets for capacity data
3. Search Slack for risk signals
4. Create a Drive document with the synthesis
5. Post the summary to Slack

What used to take 45 minutes of manual cross-referencing now takes 2 minutes of waiting.

---

## The Framework Cheat Sheet

Save this for when you want to connect a new service:

```
Step 1: UNDERSTAND
  - Find the API documentation
  - Identify the base URL
  - Note the authentication method
  - Pick 4-6 endpoints relevant to your PM workflow

Step 2: CREDENTIALS
  - API Token → Generate in service settings
  - Bot Token → Create an app in developer portal
  - OAuth → Set up in Google/Microsoft/etc. cloud console

Step 3: PROJECT
  - Create folder with package.json, tsconfig.json, src/index.ts
  - npm install @modelcontextprotocol/sdk and other dependencies

Step 4: DEFINE TOOLS
  - Name: verb_noun format
  - Description: Be specific, include examples
  - Schema: List all parameters with types and descriptions

Step 5: IMPLEMENT
  - Extract args → Make API call → Format response → Return
  - Add error handling (try/catch)
  - Add retry logic for rate limits

Step 6: REGISTER & TEST
  - npm run build
  - Add to Claude config with env variables
  - Restart Claude Code
  - Test each tool with natural language
```

---

## Practice: Choose Your Next Integration

Pick a service you use daily and apply the framework:

### Option A: Notion
- **Auth:** Integration token (easy)
- **Useful tools:** Search pages, read page content, create page, update page
- **PM use case:** Automated meeting notes, wiki updates

### Option B: GitHub
- **Auth:** Personal access token (easy)
- **Useful tools:** List issues, create issue, list PRs, get PR details
- **PM use case:** Bug tracking, release monitoring

### Option C: Asana
- **Auth:** Personal access token (easy)
- **Useful tools:** List tasks, create task, list projects, update task
- **PM use case:** Task management, cross-project visibility

### Option D: Linear
- **Auth:** API key (easy)
- **Useful tools:** List issues, create issue, list projects, search
- **PM use case:** Sprint management, bug tracking

Start with Step 1 (read the API docs) and work through all six steps. By now, you have the skills to do this independently.

---

## Quick Check

1. What are the six steps of the universal MCP pattern?
2. Why should you start with only 4-6 tools instead of implementing every endpoint?
3. What is exponential backoff and why is it useful?
4. How would you decide between API token auth and OAuth for a new service?
5. Pick a service you use daily. What 4 tools would you build for it?

---

*Previous: [Lesson 6: Google Sheets Integration](6-google-sheets.md)*
*Next: [Lesson 8: Figma Integration](8-figma.md)*
