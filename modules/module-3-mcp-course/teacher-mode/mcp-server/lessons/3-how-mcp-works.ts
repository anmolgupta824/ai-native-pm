import { LessonContent } from "./1-welcome";

const lesson: LessonContent = {
  number: 3,
  title: "How MCP Works",
  duration: "30 min",
  objectives: [
    "Understand the MCP architecture: Client, Server, and External Tool",
    "Know the three MCP primitives: Tools, Resources, and Prompts",
    "Understand the anatomy of an MCP server (package.json, index.ts, tool definitions)",
    "Know how Claude discovers available tools (ListToolsRequestSchema)",
    "Know how Claude calls tools (CallToolRequestSchema)",
    "Understand the stdio transport mechanism",
  ],
  content: `# How MCP Works

## The Big Picture

In the last lesson, you learned how APIs work — how you send requests and get responses. Now we are going to see how MCP uses APIs to give Claude superpowers.

Here is the architecture in one sentence: **Claude (the client) talks to an MCP server (a small program you run), which talks to an external tool (Jira, Sheets, etc.) via its API.**

\`\`\`
┌─────────────┐     stdio      ┌──────────────┐    REST API    ┌──────────────┐
│             │ ◄────────────► │              │ ◄────────────► │              │
│  Claude     │   JSON-RPC     │  MCP Server  │   HTTP/HTTPS   │  External    │
│  (Client)   │   messages     │  (Your Code) │   requests     │  Tool (Jira, │
│             │                │              │                │  Sheets, etc)│
└─────────────┘                └──────────────┘                └──────────────┘
\`\`\`

Let us break down each piece.

---

## The Three Players

### 1. Claude (The Client)

Claude is the MCP **client**. When you use Claude Code and type a prompt like "List my Jira projects," Claude:

1. Checks which MCP servers are available
2. Looks at the tools each server provides
3. Decides which tool to call based on your request
4. Sends a structured request to the appropriate MCP server
5. Receives the response and formats it for you

Claude does all of this automatically. You do not need to tell Claude which tool to use — it figures that out from the tool names and descriptions you define.

### 2. The MCP Server (Your Code)

The MCP server is a small program that acts as the translator between Claude and an external tool. It is the piece you will build in this course.

An MCP server does three things:
1. **Advertises tools** — tells Claude what actions are available ("I can list projects, get issues, create tickets")
2. **Receives requests** — Claude says "call the jira_list_projects tool"
3. **Executes and responds** — the server calls the Jira API and returns the result to Claude

Each MCP server is typically focused on one external tool. You would have a separate MCP server for Jira, another for Google Drive, another for Sheets, and so on.

### 3. The External Tool (The API)

This is the actual service — Jira, Google Drive, Google Sheets, Figma, Slack, or any other tool with an API. The MCP server talks to it using the REST API concepts you learned in Lesson 2.

---

## The Three MCP Primitives

MCP has three core concepts. For this course, we will focus primarily on **Tools**, since they are the most useful for PM workflows.

### Tools (Actions Claude Can Take)

Tools are the most important primitive. A tool is an action that Claude can execute — like creating a Jira ticket, reading a spreadsheet, or listing files in Google Drive.

Each tool has:
- **A name** — a unique identifier like \`jira_create_issue\` or \`sheets_read_range\`
- **A description** — explains what the tool does (Claude reads this to decide when to use it)
- **Input parameters** — what data the tool needs (like a project key or spreadsheet ID)
- **Output** — what data the tool returns

Here is what a tool definition looks like:

\`\`\`typescript
{
  name: "jira_create_issue",
  description: "Create a new issue in a Jira project. Use this when the user wants to create a ticket, bug report, story, or task.",
  inputSchema: {
    type: "object",
    properties: {
      projectKey: {
        type: "string",
        description: "The Jira project key (e.g., 'PROJ', 'MOBILE', 'BACKEND')"
      },
      summary: {
        type: "string",
        description: "The issue title/summary"
      },
      issueType: {
        type: "string",
        description: "The type of issue: Bug, Story, Task, or Epic",
        enum: ["Bug", "Story", "Task", "Epic"]
      }
    },
    required: ["projectKey", "summary", "issueType"]
  }
}
\`\`\`

**Key insight:** The \`description\` field is critical. Claude uses it to decide when to call this tool. A vague description means Claude will not know when to use it. A clear description means Claude will call it at exactly the right time.

### Resources (Data Claude Can Read)

Resources represent data that Claude can read — like a file, a database record, or a configuration. Think of resources as "things you can look at" versus tools which are "things you can do."

Resources are identified by URIs:
\`\`\`
jira://projects          — list of Jira projects
drive://files/abc123     — a specific Google Drive file
sheets://spreadsheet/id  — a specific spreadsheet
\`\`\`

For this course, we will build everything using Tools, which gives you more flexibility and is the more common pattern.

### Prompts (Reusable Templates)

Prompts are pre-written templates that help users interact with your MCP server. For example, a Jira MCP server might include a prompt template for "Sprint Retrospective" that knows to pull the right data and format it in a specific way.

We will touch on prompts briefly but they are less critical than tools for the integrations we are building.

---

## Anatomy of an MCP Server

Every MCP server you build will have the same basic file structure:

\`\`\`
my-mcp-server/
├── package.json          # Dependencies and project config
├── tsconfig.json         # TypeScript configuration
├── src/
│   └── index.ts          # The main server code
└── build/
    └── index.js          # Compiled JavaScript (auto-generated)
\`\`\`

Let us look at each file.

### package.json

This file lists your project's dependencies and metadata:

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
    "@modelcontextprotocol/sdk": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
\`\`\`

The key dependency is \`@modelcontextprotocol/sdk\` — this is the official MCP SDK that provides all the building blocks for your server.

### tsconfig.json

Standard TypeScript configuration. You will use the same one for every MCP server:

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

### index.ts — The Main Server File

This is where all the action happens. Every MCP server follows the same pattern:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Create the server
const server = new McpServer({
  name: "my-mcp-server",
  version: "1.0.0",
});

// 2. Define your tools
server.tool(
  "my_tool_name",
  "Description of what this tool does",
  {
    // Input parameters using Zod schema
    param1: z.string().describe("Description of param1"),
    param2: z.number().optional().describe("Optional numeric parameter"),
  },
  async ({ param1, param2 }) => {
    // 3. Tool handler — do the actual work here
    // Call an API, process data, etc.
    const result = await callSomeAPI(param1);

    // 4. Return the result to Claude
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  }
);

// 5. Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

Let us break down the five parts:

**Part 1 — Create the server:** You create a new MCP server with a name and version. This is how Claude identifies your server.

**Part 2 — Define tools:** You use \`server.tool()\` to register each tool. You give it a name, description, parameter schema, and a handler function.

**Part 3 — Tool handler:** This is the function that runs when Claude calls the tool. This is where you make API calls to Jira, Google, etc.

**Part 4 — Return results:** You return data as a content array. The most common format is a text content block with JSON data.

**Part 5 — Start the server:** You create a stdio transport and connect the server. This starts the server and makes it ready to receive requests from Claude.

---

## How Claude Discovers Tools

When Claude Code starts up and connects to your MCP servers, the first thing it does is ask each server: "What tools do you have?"

This happens through the **ListToolsRequestSchema**. Claude sends a request, and your server responds with a list of all available tools, their descriptions, and their input schemas.

\`\`\`
Claude → MCP Server: "What tools do you have?"

MCP Server → Claude: "I have these tools:
  1. jira_list_projects - List all Jira projects
  2. jira_get_issue - Get details for a specific issue
  3. jira_create_issue - Create a new issue
  4. jira_search_issues - Search issues using JQL"
\`\`\`

Claude reads the tool names and descriptions, and stores them. Now, when you type a prompt, Claude knows what tools are available and can decide which one to call.

**This is why good descriptions matter.** Claude decides which tool to call based on the description. If your description says "Create a new issue in a Jira project," Claude will call it when you say "Create a Jira ticket for the login bug." If your description just says "Create issue," Claude might not understand when to use it.

---

## How Claude Calls Tools

When you type a prompt like "What are my open Jira issues?", here is what happens:

1. **Claude analyzes your prompt** and decides it needs to call the \`jira_search_issues\` tool
2. **Claude sends a CallToolRequest** to your MCP server with the tool name and parameters:

\`\`\`json
{
  "method": "tools/call",
  "params": {
    "name": "jira_search_issues",
    "arguments": {
      "jql": "assignee = currentUser() AND status != Done"
    }
  }
}
\`\`\`

3. **Your MCP server receives the request**, runs the handler function, calls the Jira API, and returns the result:

\`\`\`json
{
  "content": [
    {
      "type": "text",
      "text": "[{\\"key\\": \\"PROJ-123\\", \\"summary\\": \\"Fix login bug\\"}, ...]"
    }
  ]
}
\`\`\`

4. **Claude receives the result** and formats it into a natural language response for you:

> "You have 5 open Jira issues. Here are the details..."

This entire flow happens in seconds. You just type a natural language prompt, and Claude handles the rest.

---

## The stdio Transport

You might be wondering: how does Claude actually talk to the MCP server? The answer is **stdio** (standard input/output).

When Claude starts your MCP server, it launches it as a child process — similar to how you run a command in the terminal. Communication happens through:
- **stdin** (standard input) — Claude sends requests to the server
- **stdout** (standard output) — the server sends responses back to Claude

The messages are formatted as **JSON-RPC** — a simple protocol for sending structured requests and responses.

You do not need to worry about the details of stdio or JSON-RPC. The MCP SDK handles all of this for you. You just need to know that:
- Your server runs as a process on your machine
- Claude communicates with it through stdin/stdout
- The MCP SDK manages the connection

### How Claude Knows About Your Server

You register your MCP servers in Claude Code's configuration file. This tells Claude where to find your server and how to start it:

\`\`\`json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["/path/to/jira-mcp-server/build/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://your-domain.atlassian.net",
        "JIRA_EMAIL": "your-email@example.com",
        "JIRA_API_TOKEN": "your-api-token"
      }
    }
  }
}
\`\`\`

This configuration goes in \`~/.claude/claude_desktop_config.json\` or can be set within your project. It tells Claude:
- **command**: what program to run (\`node\`)
- **args**: what file to execute (your compiled server)
- **env**: environment variables to pass (API credentials)

---

## Putting It All Together

Let us trace a complete flow from prompt to response:

1. **You type:** "Create a Jira ticket for fixing the homepage load time"

2. **Claude thinks:** "I need to create a Jira issue. I have a \`jira_create_issue\` tool available. I need a project key, summary, and issue type."

3. **Claude might ask:** "Which Jira project should I create this in?" (or it might infer from context)

4. **Claude calls the tool:**
   \`\`\`json
   {
     "name": "jira_create_issue",
     "arguments": {
       "projectKey": "PROJ",
       "summary": "Fix homepage load time performance",
       "issueType": "Bug"
     }
   }
   \`\`\`

5. **Your MCP server receives this**, constructs a POST request to the Jira API, sends it, and gets back:
   \`\`\`json
   { "key": "PROJ-456", "id": "10087" }
   \`\`\`

6. **Your server returns this to Claude**, and Claude responds:
   > "I have created Jira ticket PROJ-456: 'Fix homepage load time performance' as a Bug in the PROJ project."

The beauty of MCP is that step 2-5 is invisible to you. You just talk naturally, and Claude handles the rest.

---

## Summary

Here is what you need to remember from this lesson:

1. **MCP architecture:** Claude (client) ↔ MCP Server (your code) ↔ External Tool (API)
2. **Tools** are the primary primitive — actions Claude can take (create ticket, read file, search issues)
3. **Resources** are data Claude can read; **Prompts** are reusable templates
4. **Every MCP server** has: package.json, tsconfig.json, and index.ts
5. **Claude discovers tools** by asking the server what it offers (ListToolsRequestSchema)
6. **Claude calls tools** by sending a structured request with the tool name and parameters (CallToolRequestSchema)
7. **stdio transport** lets Claude talk to the server process through stdin/stdout
8. **Tool descriptions are critical** — Claude uses them to decide when to call each tool

In the next lesson, we will build your first real MCP server: a Jira integration.
`,
  exercise: {
    title: "Read and Analyze an MCP Server",
    description:
      "Look at the PRD Generator MCP server from Module 1 (or the example below) and identify the three core parts of an MCP server: server creation, tool definitions, and transport setup.",
    steps: [
      "Open Claude Code and ask: \"Show me the basic structure of an MCP server with one tool that returns a greeting. Write it out with comments explaining each section.\"",
      "In the response, identify these five parts: (1) Imports, (2) Server creation, (3) Tool definition with name, description, and schema, (4) Tool handler function, (5) Transport and connection",
      "Ask Claude: \"Now add a second tool to this server called 'farewell' that takes a name parameter and returns a goodbye message.\"",
      "Notice how adding a second tool follows the exact same pattern — another server.tool() call with its own name, description, schema, and handler",
      "Ask Claude: \"If this server were running, how would you discover its tools? What would the tool list look like?\"",
      "Ask Claude: \"What would happen if I gave a tool a vague description like 'does stuff'? Why do descriptions matter?\"",
    ],
    validation:
      "You have successfully completed this exercise if you can identify all five parts of an MCP server in code, understand that each tool follows the same pattern (name, description, schema, handler), and can explain why tool descriptions are important for Claude's tool selection.",
  },
  quiz: {
    questions: [
      {
        question:
          "In the MCP architecture, what sits between Claude and the external tool (like Jira)?",
        options: [
          "A web browser",
          "An MCP server that you build and run",
          "The Jira user interface",
          "A cloud function managed by Anthropic",
        ],
        correctIndex: 1,
        explanation:
          "The MCP server is the middleman between Claude (the client) and the external tool. You build and run the MCP server on your machine. It translates Claude's requests into API calls and returns the results.",
      },
      {
        question:
          "What are the three MCP primitives?",
        options: [
          "GET, POST, and DELETE",
          "Client, Server, and Transport",
          "Tools, Resources, and Prompts",
          "Request, Response, and Error",
        ],
        correctIndex: 2,
        explanation:
          "The three MCP primitives are Tools (actions Claude can take), Resources (data Claude can read), and Prompts (reusable templates). Tools are the most important for building integrations.",
      },
      {
        question:
          "Why is the description field in a tool definition so important?",
        options: [
          "It is displayed to the user as help text",
          "Claude uses it to decide when to call the tool",
          "It is required by the TypeScript compiler",
          "It is sent to the external API as documentation",
        ],
        correctIndex: 1,
        explanation:
          "Claude reads tool descriptions to decide which tool to call based on the user's prompt. A clear, specific description helps Claude pick the right tool at the right time. A vague description means Claude may not know when to use the tool.",
      },
      {
        question:
          "How does Claude communicate with an MCP server?",
        options: [
          "Through HTTP requests over the network",
          "Through a WebSocket connection",
          "Through stdio (standard input/output) using JSON-RPC messages",
          "Through a shared database",
        ],
        correctIndex: 2,
        explanation:
          "Claude communicates with MCP servers through stdio — standard input and output. The MCP server runs as a child process, and Claude sends JSON-RPC messages through stdin and receives responses through stdout. The MCP SDK handles all of this automatically.",
      },
    ],
  },
};

export default lesson;
