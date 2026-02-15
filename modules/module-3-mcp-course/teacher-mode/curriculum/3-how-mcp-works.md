# Lesson 3: How MCP Works -- Under the Hood

**Estimated reading time: 30 minutes**
**Lesson type: Architecture + Code walkthrough**

---

## What You'll Learn

By the end of this lesson, you will understand:

- The MCP architecture and how its pieces fit together
- The difference between Tools, Resources, and Prompts
- How to read the three files every MCP server needs
- How Claude discovers and calls tools at runtime
- How the stdio transport works
- A full walkthrough of a real MCP server (Module 1's PRD Generator)

This lesson bridges the gap between "I understand APIs" (Lesson 2) and "I can build an MCP server" (Lessons 4-8).

---

## The Big Picture: MCP Architecture

Here is the full MCP architecture as a text diagram:

```
+------------------+          +------------------+          +------------------+
|                  |          |                  |          |                  |
|   Claude Code    |  stdio   |   MCP Server     |  HTTPS   |   External API   |
|   (The Client)   | <------> |   (The Bridge)   | <------> |   (Jira, etc.)   |
|                  |          |                  |          |                  |
+------------------+          +------------------+          +------------------+
      You talk                  Translates your              The actual
      to Claude                 request into                 service with
      in English                API calls                    your data
```

Let us walk through this step by step.

### Step 1: You Talk to Claude

You open Claude Code and type something like:

```
Show me all bugs assigned to me in the current sprint
```

### Step 2: Claude Identifies the Right Tool

Claude looks at your request and thinks: "To answer this, I need to search Jira for bugs assigned to this user in the active sprint. I have a `search_issues` tool available from the Jira MCP server."

Claude knows what tools are available because it read the list of registered MCP servers when it started up.

### Step 3: Claude Calls the MCP Server

Claude sends a structured message to the Jira MCP server through the stdio transport:

```json
{
  "tool": "search_issues",
  "arguments": {
    "jql": "assignee = currentUser() AND sprint in openSprints() AND type = Bug"
  }
}
```

### Step 4: The MCP Server Calls the API

The MCP server receives this, builds the proper HTTP request, and sends it to Jira's REST API:

```
GET https://your-company.atlassian.net/rest/api/3/search?jql=assignee%20%3D%20currentUser()...
Authorization: Basic <your-credentials>
```

### Step 5: The API Responds

Jira's API sends back a JSON response with the matching issues.

### Step 6: The MCP Server Returns the Data

The MCP server takes Jira's response, possibly formats it, and sends it back to Claude through stdio.

### Step 7: Claude Presents the Answer

Claude takes the raw data and presents it to you in a readable format:

```
You have 3 bugs assigned to you in the current sprint:

1. PROJ-45: Login button unresponsive on mobile (High priority)
2. PROJ-52: Search results not paginating correctly (Medium priority)
3. PROJ-61: Dashboard chart missing legend (Low priority)
```

### The Key Insight

Notice that the MCP server is purely a translator. It does not make decisions. It does not display anything. It just converts Claude's structured request into an API call and sends back the result.

**Claude is the brain.** The MCP server is just the hands.

---

## Tools vs. Resources vs. Prompts

MCP servers can expose three types of capabilities. Understanding the difference will help you design your own servers later.

### Tools -- Actions Claude Can Take

A **Tool** is a function that does something. It takes input, performs an action, and returns a result.

**PM analogy:** Tools are like the actions your assistant can perform: "Book a meeting room," "Send an email," "Create a spreadsheet."

**Examples:**
- `create_issue` -- creates a new Jira ticket
- `write_range` -- writes data to a Google Sheet
- `share_file` -- shares a Google Drive file with someone

**Key characteristics:**
- Tools change things (create, update, delete)
- Tools take parameters (what to create, where to write)
- Claude decides when to call them based on your request

### Resources -- Data Claude Can Read

A **Resource** is read-only data that provides context. Think of it as background information Claude can pull in.

**PM analogy:** Resources are like reference documents on your desk: the sprint board, the team roster, the project roadmap. You look at them but do not edit them in the moment.

**Examples:**
- The current sprint's ticket list
- A project's configuration settings
- A team member directory

**Key characteristics:**
- Resources are read-only
- Resources provide context, not actions
- Claude uses them to make better decisions

### Prompts -- Pre-Built Workflows

A **Prompt** is a template that combines tools and resources into a common workflow. Instead of telling Claude step by step what to do, you invoke a prompt that has the steps pre-defined.

**PM analogy:** Prompts are like SOPs (Standard Operating Procedures). Instead of explaining the status report process every time, you have a documented procedure that anyone can follow.

**Examples:**
- "Weekly Status Report" -- reads sprint data, generates summary, creates doc
- "Sprint Planning" -- reads backlog, checks capacity, suggests scope
- "Bug Triage" -- reads new bugs, categorizes by severity, assigns to engineers

**Key characteristics:**
- Prompts combine multiple tools and resources
- Prompts encode your team's workflows
- Prompts save you from repeating complex instructions

### When to Use What

| You Want To... | Use A... | Example |
|----------------|----------|---------|
| Do something | Tool | Create a Jira ticket |
| Read something | Resource | Get the sprint board data |
| Run a workflow | Prompt | Generate a weekly status report |

In this course, we will focus primarily on **Tools** because they are the most powerful and practical. Resources and Prompts build on top of tools, and once you understand tools, the others are straightforward.

---

## The Three Files Every MCP Server Needs

Every MCP server in this course will have the same three files. Understanding them now will save you confusion later.

### File 1: `package.json` -- The ID Card

`package.json` tells Node.js about your project. Think of it as your project's ID card: its name, version, and what it needs to run.

```json
{
  "name": "jira-mcp-server",
  "version": "1.0.0",
  "description": "MCP server for Jira integration",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "node-fetch": "^3.3.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0"
  }
}
```

Let us decode each field:

| Field | Meaning | PM Analogy |
|-------|---------|------------|
| `name` | The project's name | The app's title in the app store |
| `version` | Current version number | "v2.1" on your product spec |
| `description` | What the project does | One-liner pitch |
| `main` | The entry point file | The front door of the building |
| `scripts` | Commands you can run | Keyboard shortcuts |
| `dependencies` | Other packages this needs | Team members required for the project |
| `devDependencies` | Packages needed only during development | Contractors who help build but do not stay |

The two critical dependencies are:
- **`@modelcontextprotocol/sdk`** -- The official MCP toolkit. This provides the building blocks for creating an MCP server.
- **`node-fetch`** -- A library for making HTTP requests (the API calls from Lesson 2).

### File 2: `tsconfig.json` -- The Build Settings

`tsconfig.json` tells TypeScript how to compile your code. TypeScript is a stricter version of JavaScript that catches errors before your code runs.

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

**You do not need to understand every option.** The two important ones are:

| Field | Meaning |
|-------|---------|
| `outDir: "./dist"` | Compiled code goes into the `dist` folder |
| `rootDir: "./src"` | Your source code lives in the `src` folder |

**PM analogy:** `tsconfig.json` is like the build settings for your product. You set them once and do not touch them unless something changes fundamentally. Think of it as "project configuration" that the build system reads.

### File 3: `src/index.ts` -- The Actual Server

This is where all the logic lives. It is the file you will spend the most time in. Here is its structure, annotated for PMs:

```typescript
// SECTION 1: Imports -- "what libraries do we need?"
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// SECTION 2: Configuration -- "what are our settings?"
const JIRA_BASE_URL = "https://your-company.atlassian.net";
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

// SECTION 3: Server setup -- "create the server and name it"
const server = new Server(
  { name: "jira-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// SECTION 4: Tool definitions -- "what can this server do?"
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_issues",
        description: "Search Jira issues using JQL",
        inputSchema: {
          type: "object",
          properties: {
            jql: { type: "string", description: "JQL query" }
          },
          required: ["jql"]
        }
      }
      // ... more tools
    ]
  };
});

// SECTION 5: Tool implementations -- "what happens when a tool is called?"
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_issues") {
    // Make the API call to Jira
    const response = await fetch(`${JIRA_BASE_URL}/rest/api/3/search?jql=${args.jql}`);
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
});

// SECTION 6: Start the server -- "open for business"
const transport = new StdioServerTransport();
await server.connect(transport);
```

Let us map each section to something familiar:

| Section | Code Purpose | PM Analogy |
|---------|-------------|------------|
| Imports | Load required libraries | Hiring the team for the project |
| Configuration | Set API credentials and URLs | Setting up project parameters |
| Server setup | Create and name the server | Registering your product in the system |
| Tool definitions | List what the server can do | Writing the product spec -- features list |
| Tool implementations | Code for each tool | Building each feature |
| Start | Launch the server | Shipping the product |

---

## How Claude Discovers and Calls Tools

When Claude Code starts up, a specific sequence happens:

### Discovery Phase (Happens Once at Startup)

```
1. Claude reads ~/.claude/claude_desktop_config.json
2. For each MCP server listed, Claude starts the server process
3. Claude asks each server: "What tools do you have?"
4. Each server responds with its tool list (names, descriptions, parameters)
5. Claude stores this list in memory
```

### Execution Phase (Happens Each Time You Make a Request)

```
1. You type a natural language request
2. Claude analyzes your request and determines which tool(s) to use
3. Claude sends a structured call to the appropriate MCP server
4. The MCP server executes the tool and returns results
5. Claude interprets the results and presents them to you
```

### The Configuration File

Here is what `~/.claude/claude_desktop_config.json` looks like with MCP servers registered:

```json
{
  "mcpServers": {
    "jira": {
      "command": "node",
      "args": ["/path/to/jira-server/dist/index.js"],
      "env": {
        "JIRA_BASE_URL": "https://your-company.atlassian.net",
        "JIRA_EMAIL": "you@company.com",
        "JIRA_API_TOKEN": "your-api-token-here"
      }
    },
    "google-drive": {
      "command": "node",
      "args": ["/path/to/drive-server/dist/index.js"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-client-id",
        "GOOGLE_CLIENT_SECRET": "your-client-secret"
      }
    }
  }
}
```

Each entry tells Claude:
- **`command`**: How to start the server (using Node.js)
- **`args`**: Where the server code lives
- **`env`**: Environment variables (API keys, URLs, credentials)

**Security note:** Your API keys live in this config file on your local machine. They are never sent to Anthropic's servers. Claude Code reads them locally to start the MCP servers.

---

## The Stdio Transport: How Claude and MCP Servers Talk

You have seen "stdio" mentioned a few times. Let us clarify what it means.

### What is Stdio?

Stdio stands for "standard input/output." It is the most basic way two programs can communicate on a computer -- one program writes text, and the other reads it.

**PM analogy:** Imagine two people in separate rooms, communicating by sliding notes under the door. One person writes a note (stdout -- standard output), slides it under the door, and the other person reads it (stdin -- standard input). Simple, direct, no internet required.

### Why Stdio Instead of HTTP?

MCP servers could communicate over HTTP (like a web API), but stdio has advantages for local development:

1. **No network setup.** No ports, no URLs, no firewall issues.
2. **Instant.** Communication happens at the speed of your CPU, not your internet.
3. **Simple.** No web server to configure.
4. **Secure.** Everything stays on your machine.

### What the Communication Looks Like

When Claude calls a tool, here is what travels through stdio:

**Claude sends (via stdin):**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "search_issues",
    "arguments": { "jql": "project = PROJ AND sprint in openSprints()" }
  }
}
```

**MCP server responds (via stdout):**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "{\"issues\": [{\"key\": \"PROJ-45\", ...}]}"
      }
    ]
  }
}
```

You will never need to write this communication code yourself. The MCP SDK handles it. But knowing it exists helps you debug when things go wrong -- if you see "jsonrpc" in an error message, you know it is about the Claude-to-server communication layer.

---

## Walkthrough: Module 1's PRD Generator

Let us look at a real, working MCP server to tie everything together. Module 1's PRD Generator is a good example because it shows the complete pattern you will follow in every lesson.

### What It Does

The PRD Generator has five tools:

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `generate_prd` | Creates a full PRD | Product idea, audience | Complete PRD document |
| `generate_user_stories` | Creates user stories | Feature description | Formatted user stories |
| `generate_acceptance_criteria` | Creates AC for a story | User story | Testable acceptance criteria |
| `analyze_competitors` | Analyzes competition | Market/product area | Competitive analysis |
| `generate_release_plan` | Creates a release plan | Features, constraints | Phased release plan |

### How It Follows the Pattern

Every MCP server in this course follows this same pattern:

```
1. Import the MCP SDK
2. Set up configuration (API keys, URLs)
3. Create the server instance
4. Define your tools (name, description, input schema)
5. Implement each tool (the actual logic)
6. Start the server with stdio transport
```

The PRD Generator is special because its tools do not call an external API -- they use Claude's own intelligence to generate content. But the structure is identical to what you will build for Jira, Google Drive, and Figma.

### The Input Schema Pattern

Every tool has an **input schema** that defines what parameters it accepts. This is how Claude knows what information to gather from your request before calling the tool.

```typescript
{
  name: "generate_prd",
  description: "Generate a complete Product Requirements Document",
  inputSchema: {
    type: "object",
    properties: {
      product_name: {
        type: "string",
        description: "The name of the product or feature"
      },
      target_audience: {
        type: "string",
        description: "Who this product is for"
      },
      problem_statement: {
        type: "string",
        description: "The problem this product solves"
      }
    },
    required: ["product_name", "problem_statement"]
  }
}
```

Reading this schema as a PM:
- The tool needs a `product_name` (required)
- It needs a `problem_statement` (required)
- It can optionally take a `target_audience`
- All values are strings (text)

When you ask Claude "Create a PRD for a mobile banking app for Gen Z users," Claude extracts:
- `product_name` = "Mobile Banking App"
- `target_audience` = "Gen Z users"
- `problem_statement` = (Claude might ask you for this since it is required)

---

## The Build and Run Cycle

Here is the workflow you will follow for every MCP server you build:

### Step 1: Write the Code

Create or edit `src/index.ts` with your tools.

### Step 2: Build (Compile)

```bash
npm run build
```

This compiles TypeScript to JavaScript and puts the result in `dist/index.js`.

**PM analogy:** This is like exporting a Figma design to developer-ready assets. You are converting from a human-friendly format (TypeScript) to a machine-friendly format (JavaScript).

### Step 3: Register in Claude's Config

Add your server to `~/.claude/claude_desktop_config.json`.

### Step 4: Restart Claude Code

Claude reads the config on startup, so you need to restart it to pick up new servers.

```bash
# Exit Claude Code (type /exit or Ctrl+C)
# Then start it again
claude
```

### Step 5: Test

Ask Claude to use your new tools and verify they work.

---

## Common Gotchas

### "Claude doesn't see my tools"
- Did you restart Claude Code after adding the server to the config?
- Is the path to `dist/index.js` correct in the config?
- Did you run `npm run build` after making changes?

### "The server crashes on startup"
- Check the config file for JSON syntax errors (missing commas, extra commas)
- Make sure the environment variables are set correctly
- Run `node dist/index.js` directly in your terminal to see the error message

### "Tool calls return errors"
- Check your API credentials (are they expired?)
- Verify the base URL is correct
- Look at the HTTP status code in the error (refer to Lesson 2's cheat sheet)

---

## Quick Check

Before moving on, make sure you can answer:

1. What are the three components of the MCP architecture?
2. What is the difference between a Tool and a Resource?
3. What are the three files every MCP server needs?
4. What does the stdio transport do?
5. Where does Claude's MCP configuration live?

---

## What is Next?

You now understand:
- How APIs work (Lesson 2)
- How MCP sits on top of APIs (this lesson)

In Lesson 4, you will put both together by building your first real MCP server: a **Jira integration** that lets Claude read, create, search, and update your Jira tickets.

Get your Jira API credentials ready -- the next lesson is hands-on from start to finish.

---

*Previous: [Lesson 2: REST API Primer](2-rest-api-primer.md)*
*Next: [Lesson 4: Jira Integration](4-jira-integration.md)*
