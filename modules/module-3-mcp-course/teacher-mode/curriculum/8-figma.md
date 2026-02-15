# Lesson 8: Figma Integration -- Connecting Design to Development

**Estimated reading time: 45 minutes**
**Lesson type: Hands-on build + Capstone workflow**

---

## What You'll Learn

By the end of this lesson, you will have:

- A Figma API token ready to use
- A working MCP server that connects Claude to Figma
- Four tools: `get_file`, `get_frames`, `get_comments`, `export_image`
- A capstone workflow that bridges Figma to Jira
- The confidence to build MCP servers independently

This is the final build lesson. It brings together everything you have learned and shows the ultimate PM workflow: design-to-development automation.

---

## Why Figma?

PMs sit between design and engineering. You are the translator, the bridge-builder, the person who turns Figma frames into Jira tickets. This process is manual, repetitive, and error-prone:

1. Open Figma, review the designs
2. Note the design decisions and their context
3. Open Jira, create tickets for each component
4. Write descriptions, reference the Figma links
5. Assign tickets and prioritize

With an MCP server connecting Claude to Figma, you can:

- **Audit designs.** "How many frames are in the new checkout flow?"
- **Read feedback.** "Summarize all comments on the mobile designs."
- **Create tickets from designs.** "For each frame in the Figma file, create a Jira Story with the frame name as the title and a link to the frame."
- **Track design changes.** "What comments were added to the Figma file since our last design review?"

---

## Step 1: Get Your Figma API Token

Figma uses Personal Access Tokens, which is the simplest authentication method.

### 1a: Generate a Token

1. Open Figma in your browser
2. Click your profile icon in the top-left corner
3. Go to **Settings**
4. Scroll down to **Personal access tokens**
5. Click **"Generate new token"**
6. Give it a description: `Claude MCP Server`
7. For expiration, choose a reasonable timeframe (90 days is typical)
8. Click **"Generate token"**
9. **Copy the token immediately** -- Figma only shows it once

### 1b: Find a Figma File Key

Every Figma file has a unique key in its URL:

```
https://www.figma.com/file/abc123XYZ/My-Design-File
                             ^^^^^^^^^^^
                             This is the file key
```

You will need this key when calling the API. Find a Figma file you want to work with and note its key.

### 1c: Verify Your Token

Open Claude Code and test:

```
Make a GET request to https://api.figma.com/v1/me
with header X-FIGMA-TOKEN set to YOUR-TOKEN.
What does the response show?
```

You should see your Figma user profile (name, email, profile image URL). If you get an error, double-check that you copied the full token.

---

## Step 2: Understanding the Figma API

### Key Concepts

Figma files have a hierarchical structure:

```
File
  └── Page (like "Screens" or "Components")
        └── Frame (like "Login Screen" or "Dashboard")
              └── Elements (rectangles, text, images, etc.)
```

The Figma API lets you access any level of this hierarchy. For PM workflows, you will mostly work with:

- **Files** -- The overall design document
- **Frames** -- Individual screens or components
- **Comments** -- Feedback from the design review process

### API Base URL

All Figma API calls go to:
```
https://api.figma.com/v1/
```

### Authentication

Figma uses a custom header instead of the standard `Authorization` header:
```
X-FIGMA-TOKEN: your-personal-access-token
```

### Key Endpoints

| Endpoint | Method | What It Does |
|----------|--------|-------------|
| `/files/{key}` | GET | Get file structure and metadata |
| `/files/{key}/nodes?ids={ids}` | GET | Get specific nodes (frames) |
| `/files/{key}/comments` | GET | Get all comments on a file |
| `/images/{key}?ids={ids}` | GET | Export frames as images (PNG, SVG, etc.) |

---

## Step 3: Build the Server

### 3a: Create the Project

```
Create a new MCP server project for Figma in
~/mcp-servers/figma-server with the standard MCP setup.
```

### 3b: The Server Code

#### Imports and Configuration

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const FIGMA_TOKEN = process.env.FIGMA_API_TOKEN || "";
const BASE_URL = "https://api.figma.com/v1";

async function figmaRequest(endpoint: string) {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-FIGMA-TOKEN": FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Figma API error (${response.status}): ${errorText}`);
  }

  return response.json();
}
```

**Note the differences from previous servers:**
- Figma uses `X-FIGMA-TOKEN` header instead of `Authorization: Bearer`
- All Figma API calls are GET requests (read-only for our purposes)
- No `Content-Type` header needed since we are only reading, not writing

#### Helper: Extracting Frames

Figma files can be deeply nested. This helper function walks the tree and extracts all frames:

```typescript
interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
}

function extractFrames(node: FigmaNode, depth: number = 0): any[] {
  const frames: any[] = [];

  if (node.type === "FRAME" || node.type === "COMPONENT") {
    frames.push({
      id: node.id,
      name: node.name,
      type: node.type,
      depth,
    });
  }

  if (node.children) {
    for (const child of node.children) {
      frames.push(...extractFrames(child, depth + 1));
    }
  }

  return frames;
}
```

**What this does:** Figma files organize content in a tree structure (like folders within folders). This function walks through every level of the tree and collects items that are "FRAME" or "COMPONENT" types. These are the design screens and reusable components that PMs care about.

**PM analogy:** Imagine you have a filing cabinet (the Figma file) with drawers (pages) that contain folders (frames) that contain documents (elements). This function opens every drawer and folder and makes a list of all the folders it finds.

#### Tool Definitions

```typescript
const server = new Server(
  { name: "figma-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_file",
        description:
          "Get metadata and structure of a Figma file including all pages and their top-level frames. The file key is in the Figma URL: figma.com/file/{KEY}/...",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "The Figma file key from the URL",
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "get_frames",
        description:
          "List all frames (screens/components) in a Figma file with their names and IDs. Useful for understanding the design structure before creating development tickets.",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "The Figma file key",
            },
            page_name: {
              type: "string",
              description:
                "Optional: Filter to a specific page name (e.g., 'Screens', 'Components')",
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "get_comments",
        description:
          "Get all comments and replies on a Figma file. Useful for collecting design review feedback to create action items.",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "The Figma file key",
            },
            as_of: {
              type: "string",
              description:
                "Optional: Only return comments created after this ISO timestamp (e.g., '2026-02-01T00:00:00Z')",
            },
          },
          required: ["file_key"],
        },
      },
      {
        name: "export_image",
        description:
          "Export specific frames from a Figma file as images. Returns URLs to the generated images (PNG by default). Use get_frames first to find frame IDs.",
        inputSchema: {
          type: "object",
          properties: {
            file_key: {
              type: "string",
              description: "The Figma file key",
            },
            node_ids: {
              type: "array",
              description:
                "Array of node IDs to export (from get_frames output)",
              items: { type: "string" },
            },
            format: {
              type: "string",
              description: "Image format: png, jpg, svg, or pdf",
              enum: ["png", "jpg", "svg", "pdf"],
            },
            scale: {
              type: "number",
              description: "Export scale (1 = 1x, 2 = 2x retina). Default: 2",
            },
          },
          required: ["file_key", "node_ids"],
        },
      },
    ],
  };
});
```

#### Tool Implementations

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_file": {
        const data = await figmaRequest(`/files/${args.file_key}?depth=1`);

        const fileInfo = {
          name: data.name,
          lastModified: data.lastModified,
          version: data.version,
          pages: data.document.children.map((page: any) => ({
            id: page.id,
            name: page.name,
            frameCount: page.children?.filter(
              (c: any) => c.type === "FRAME" || c.type === "COMPONENT"
            ).length || 0,
          })),
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(fileInfo, null, 2),
            },
          ],
        };
      }

      case "get_frames": {
        // Get full file structure
        const data = await figmaRequest(`/files/${args.file_key}`);

        let pages = data.document.children;

        // Filter to specific page if requested
        if (args.page_name) {
          pages = pages.filter(
            (p: any) =>
              p.name.toLowerCase() === args.page_name.toLowerCase()
          );
          if (pages.length === 0) {
            const availablePages = data.document.children.map(
              (p: any) => p.name
            );
            return {
              content: [
                {
                  type: "text",
                  text: `Page "${args.page_name}" not found. Available pages: ${availablePages.join(", ")}`,
                },
              ],
              isError: true,
            };
          }
        }

        const allFrames: any[] = [];
        for (const page of pages) {
          const frames = extractFrames(page);
          allFrames.push({
            page: page.name,
            frames: frames.filter((f) => f.depth <= 1), // Only top-level frames
          });
        }

        const totalFrames = allFrames.reduce(
          (sum, p) => sum + p.frames.length,
          0
        );

        let output = `Found ${totalFrames} frames across ${allFrames.length} page(s):\n\n`;
        for (const page of allFrames) {
          output += `Page: ${page.page}\n`;
          for (const frame of page.frames) {
            output += `  - ${frame.name} (ID: ${frame.id}, Type: ${frame.type})\n`;
          }
          output += "\n";
        }

        return {
          content: [{ type: "text", text: output }],
        };
      }

      case "get_comments": {
        let endpoint = `/files/${args.file_key}/comments`;
        if (args.as_of) {
          endpoint += `?as_md=true`;
        }

        const data = await figmaRequest(endpoint);

        let comments = data.comments || [];

        // Filter by date if specified
        if (args.as_of) {
          const cutoff = new Date(args.as_of).getTime();
          comments = comments.filter(
            (c: any) => new Date(c.created_at).getTime() > cutoff
          );
        }

        const formattedComments = comments.map((comment: any) => ({
          id: comment.id,
          author: comment.user.handle,
          message: comment.message,
          created: comment.created_at,
          resolved: comment.resolved_at ? true : false,
          replies: comment.replies?.length || 0,
          nodeId: comment.client_meta?.node_id || null,
          nodeOffset: comment.client_meta?.node_offset || null,
        }));

        const unresolvedCount = formattedComments.filter(
          (c: any) => !c.resolved
        ).length;

        let output = `Found ${formattedComments.length} comments (${unresolvedCount} unresolved):\n\n`;
        for (const comment of formattedComments) {
          const status = comment.resolved ? "[RESOLVED]" : "[OPEN]";
          output += `${status} ${comment.author}: "${comment.message}"`;
          if (comment.replies > 0) {
            output += ` (${comment.replies} replies)`;
          }
          output += `\n  Created: ${comment.created}\n\n`;
        }

        return {
          content: [{ type: "text", text: output }],
        };
      }

      case "export_image": {
        const nodeIds = args.node_ids.join(",");
        const format = args.format || "png";
        const scale = args.scale || 2;

        const data = await figmaRequest(
          `/images/${args.file_key}?ids=${nodeIds}&format=${format}&scale=${scale}`
        );

        if (data.err) {
          throw new Error(`Figma export error: ${data.err}`);
        }

        const images = Object.entries(data.images).map(
          ([nodeId, url]: [string, any]) => ({
            nodeId,
            url,
            format,
            scale: `${scale}x`,
          })
        );

        let output = `Exported ${images.length} image(s):\n\n`;
        for (const img of images) {
          output += `Node ${img.nodeId}: ${img.url}\n`;
          output += `  Format: ${img.format}, Scale: ${img.scale}\n\n`;
        }

        return {
          content: [{ type: "text", text: output }],
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
  console.error("Figma MCP server running on stdio");
}

main().catch(console.error);
```

**Key implementation details:**

**`get_file`**: Uses `?depth=1` to only get the top level of the file structure. Without this, Figma returns the entire deeply-nested file tree, which can be enormous for complex files.

**`get_frames`**: Walks the full file tree but filters to depth 1 (top-level frames only). This gives you the screens and major components without drowning you in every nested rectangle and text element.

**`get_comments`**: Includes resolved/unresolved status and reply counts. The `as_of` filter lets you see only comments since your last design review.

**`export_image`**: Returns URLs to generated images hosted by Figma's CDN. These URLs are temporary (they expire after a few hours) but are perfect for immediate use -- paste them in a Jira ticket, Slack message, or Google Doc.

---

## Step 4: Register and Test

### Register with Claude

```
Add figma-server to my Claude configuration.
Server at ~/mcp-servers/figma-server/dist/index.js
Environment: FIGMA_API_TOKEN=your-figma-token
```

### Test the Tools

```
Get the structure of my Figma file with key [your-file-key]
```

```
List all frames in my Figma file [key], specifically the "Screens" page
```

```
Show me all comments on my Figma file [key] that were created after February 1st
```

```
Export the frames with IDs [id1] and [id2] from Figma file [key] as PNG images
```

---

## Design-to-Development Workflow

This is the workflow that makes the Figma integration truly valuable for PMs.

### The Manual Process (Before MCP)

1. Open Figma file (1 min)
2. Review each frame -- note the screen name and key details (15 min)
3. Open Jira (1 min)
4. For each frame, create a ticket:
   - Title: "Implement [Screen Name]"
   - Description: Copy design notes, paste Figma link
   - Type: Story
   - Priority: Based on your judgment
5. Repeat for 10-20 frames (30-60 min)
6. Review and adjust tickets (10 min)

**Total: 60-90 minutes for a typical design file**

### The Automated Process (With MCP)

```
I just got final designs from the design team in Figma file [key].

1. List all frames in the "Screens" page
2. For each frame, create a Jira Story in project PROJ with:
   - Title: "Implement: [Frame Name]"
   - Description: Include the Figma frame link
   - Priority: Medium (I'll adjust after)
3. Also check for any unresolved comments on the file
   and create a separate Bug ticket for each one
4. Give me a summary of all created tickets
```

Claude will:
1. Call Figma `get_frames` to list all screens
2. For each frame, call Jira `create_issue` to create a Story
3. Call Figma `get_comments` to find unresolved feedback
4. Create Bug tickets for each unresolved comment
5. Summarize everything with links

**Total: 2-3 minutes. And you still review everything before the sprint.**

### Extended Workflow: Design + Jira + Sheets

```
From the Figma file [key], get all frames on the "Screens" page.
Create Jira Stories for each one in project PROJ.
Then update my sprint planning spreadsheet [sheets-id]:
  - Add a row for each new ticket in the "Backlog" tab
  - Columns: Ticket Key, Title, Type, Priority, Estimated Points (leave blank)
```

This chains three MCP servers (Figma, Jira, Sheets) into one workflow.

---

## Real PM Workflow: Design Review Summary

After a design review meeting, use this to create an actionable summary:

```
Review the Figma file [key]:
1. Get all comments created after [last-review-date]
2. Categorize them as:
   - Design changes (things the designer needs to update)
   - Implementation notes (things the developer needs to know)
   - Questions (things that need answers before development)
3. For design changes, list the specific frame and what needs to change
4. For implementation notes, draft Jira ticket descriptions
5. Create a Google Doc called "Design Review Notes - [date]" with this summary
```

---

## Understanding Figma Node IDs

Figma uses node IDs that look like `1:23` or `456:789`. The format is `pageId:nodeId`.

When you use `get_frames`, the output includes the node ID for each frame. You then use these IDs with `export_image` or to construct direct links to specific frames:

```
https://www.figma.com/file/{file_key}?node-id={node_id}
```

For example:
```
https://www.figma.com/file/abc123XYZ?node-id=1:23
```

This links directly to a specific frame, which is extremely useful in Jira ticket descriptions.

---

## Troubleshooting

### Error: 403 Forbidden
**Cause:** Your token does not have access to this file.
**Fix:** Make sure the Figma file is in a project or team you belong to. Personal access tokens can only access files you have permission to view.

### Error: 404 Not Found
**Cause:** The file key is wrong.
**Fix:** Double-check the key from the Figma URL. It is the string between `/file/` and the file name.

### "No frames found"
**Cause:** The page name might not match exactly.
**Fix:** Use `get_file` first to see the exact page names, then use the correct name with `get_frames`.

### Export Returns Null URLs
**Cause:** The node IDs are invalid or the frames are empty.
**Fix:** Use `get_frames` to get valid node IDs first. Make sure the frames contain visible content.

### Slow Responses
**Cause:** Large Figma files with many components take longer to process.
**Fix:** Use the `page_name` filter in `get_frames` to narrow the scope. Avoid requesting the full file structure for very large files.

### Rate Limiting (429 Too Many Requests)
**Cause:** Figma limits API requests to approximately 30 requests per minute.
**Fix:** If you are processing many frames in sequence, add a small delay between requests. For most PM workflows, you will not hit this limit.

---

## Course Recap: What You Have Built

Over 8 lessons, you have gone from zero to a fully automated PM toolkit:

| Lesson | What You Built | PM Superpower |
|--------|---------------|---------------|
| 1 | Understanding of MCP | Know what is possible |
| 2 | API knowledge | Understand how tools communicate |
| 3 | Architecture knowledge | Understand how MCP servers work |
| 4 | Jira MCP server | Read, create, search, update tickets |
| 5 | Google Drive MCP server | Create and read documents |
| 6 | Google Sheets MCP server | Read and write spreadsheet data |
| 7 | Universal framework | Connect ANY API to Claude |
| 8 | Figma MCP server | Bridge design to development |

### Your Toolkit

You now have four working MCP servers:

```
Claude Code
  ├── Jira Server → Sprint data, ticket management
  ├── Google Drive Server → Document creation and reading
  ├── Google Sheets Server → Spreadsheet data analysis
  └── Figma Server → Design file analysis and export
```

### The Real Value

The individual servers are useful, but the real power is in combining them. You can now tell Claude to:

- Pull sprint data from Jira + capacity from Sheets + create a status report in Drive
- Read Figma designs + create Jira tickets + update the planning spreadsheet
- Search Slack for blockers + check Jira for overdue items + draft a risk summary
- Read a PRD from Drive + create corresponding Jira epics and stories

Each of these workflows used to take 30-60 minutes. Now they take 2-3 minutes.

### What is Next for You

1. **Use these servers daily.** Build the habit of asking Claude to handle the repetitive parts of your workflow.
2. **Build more servers.** Apply the Lesson 7 framework to connect Slack, Notion, GitHub, or any tool you use.
3. **Share with your team.** Help other PMs set up their own MCP servers. Be the person who levels up your entire team.
4. **Iterate.** As you use the servers, you will discover new tools you want to add. The pattern is always the same: define the tool, implement the API call, rebuild, and test.

You started this course as a PM who could chat with Claude. You are finishing it as a PM who can orchestrate Claude across your entire tool stack.

That is a significant upgrade.

---

## Quick Check (Final)

1. What header does Figma use for authentication?
2. How do you find a Figma file key?
3. Describe a workflow that uses at least 3 MCP servers together.
4. What is the 6-step framework for building any MCP server?
5. What will you build next?

---

*Previous: [Lesson 7: Building Custom MCP Servers](7-custom-servers.md)*
*Back to: [Lesson 1: Welcome to MCP](1-welcome.md)*
