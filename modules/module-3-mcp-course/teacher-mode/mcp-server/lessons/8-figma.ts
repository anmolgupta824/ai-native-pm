import { LessonContent } from "./1-welcome";

const lesson: LessonContent = {
  number: 8,
  title: "Figma Integration (Optional)",
  duration: "45 min",
  objectives: [
    "Create a Figma Personal Access Token",
    "Build an MCP server with four Figma tools",
    "Understand Figma's file structure: files, pages, and frames",
    "Enable a design-to-development workflow using Figma + Jira MCP servers together",
  ],
  content: `# Figma Integration (Optional)

## Why Figma + MCP?

Figma is where designs live. As a PM, you regularly need to:
- Review designs and extract specs for engineering
- Create Jira tickets from Figma frames
- Check comments and feedback on designs
- Export assets for documentation

This lesson builds an MCP server that lets Claude interact with Figma directly. The real power comes from combining it with your Jira server — enabling a design-to-development workflow where Claude can look at Figma designs and create structured Jira tickets automatically.

---

## What We Are Building

Four tools:

1. **figma_get_file** — Get file info, page list, and metadata
2. **figma_get_frames** — Get frames from a specific page
3. **figma_get_comments** — Read comments on a file
4. **figma_export_image** — Export a frame as PNG or SVG

---

## Step 1: Get Your Figma API Token

Figma uses simple Personal Access Tokens — no OAuth needed.

1. Open Figma in your browser
2. Click your profile icon in the top-left
3. Go to **Settings**
4. Scroll down to **Personal Access Tokens**
5. Click **"Generate new token"**
6. Give it a description like "MCP Server"
7. Copy the token

That is it. Figma auth is the simplest of all the tools we have integrated.

---

## Step 2: Understanding Figma's Structure

Before building the server, you need to understand how Figma organizes files:

\`\`\`
Figma Account
└── Team / Project
    └── File (a .fig file)
        └── Page (like slides in a presentation)
            └── Frame (individual screens/components)
                └── Layers (text, shapes, images, etc.)
\`\`\`

### Key Concepts

**File** — A complete Figma file. Identified by a file key (found in the URL):
\`\`\`
https://www.figma.com/design/ABC123defGHI/My-App-Designs
                              |____________|
                              This is the file key
\`\`\`

**Page** — A canvas within a file. Most design files have multiple pages like "Home", "Settings", "Login", "Components".

**Frame** — A defined area on a page, usually representing a screen, component, or design element. Frames have names, dimensions, and can be exported as images.

**Node** — Every element in Figma is a node with a unique ID. Frames, groups, text layers, rectangles — they are all nodes.

---

## Step 3: Set Up the Project

\`\`\`bash
mkdir -p figma-mcp-server/src
cd figma-mcp-server
\`\`\`

### package.json

\`\`\`json
{
  "name": "figma-mcp-server",
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

### tsconfig.json (same as always)

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

---

## Step 4: Build the Server

### src/index.ts

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// --- Configuration ---
const FIGMA_TOKEN = process.env.FIGMA_API_TOKEN;
const BASE_URL = "https://api.figma.com/v1";

if (!FIGMA_TOKEN) {
  console.error("Missing FIGMA_API_TOKEN environment variable");
  process.exit(1);
}

// --- API Helper ---
async function figmaFetch(path: string): Promise<any> {
  const url = \`\${BASE_URL}\${path}\`;

  const response = await fetch(url, {
    headers: {
      "X-FIGMA-TOKEN": FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(\`Figma API error (\${response.status}): \${errorText}\`);
  }

  return response.json();
}

// --- Create MCP Server ---
const server = new McpServer({
  name: "figma-mcp-server",
  version: "1.0.0",
});
\`\`\`

Notice how simple the auth is — Figma uses a custom header (\`X-FIGMA-TOKEN\`) instead of the standard \`Authorization\` header. This is just a quirk of their API.

---

## Step 5: Add Tool 1 — Get File Info

\`\`\`typescript
server.tool(
  "figma_get_file",
  "Get information about a Figma file, including its pages and top-level structure. Use this to explore a design file and find pages/frames to inspect.",
  {
    fileKey: z
      .string()
      .describe(
        "The Figma file key (found in the file URL: figma.com/design/FILE_KEY/...)"
      ),
  },
  async ({ fileKey }) => {
    // Use depth=1 to get pages without deeply nested content
    const data = await figmaFetch(\`/files/\${fileKey}?depth=1\`);

    const pages = data.document.children.map((page: any) => ({
      id: page.id,
      name: page.name,
      type: page.type,
      childCount: page.children?.length || 0,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              fileName: data.name,
              lastModified: data.lastModified,
              version: data.version,
              pageCount: pages.length,
              pages,
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
- Fetches the file structure with minimal depth (for performance)
- Returns the file name, last modified date, and a list of pages
- Each page shows its ID, name, and how many children (frames) it has

**When Claude will use it:** "What pages are in the Mobile App Redesign file?" or "Show me the structure of this Figma file."

**Important: the depth parameter.** Figma files can be deeply nested with hundreds or thousands of nodes. Using \`depth=1\` keeps the response small by only showing top-level pages. You can increase the depth if you need more detail, but be aware of response size.

---

## Step 6: Add Tool 2 — Get Frames from a Page

\`\`\`typescript
server.tool(
  "figma_get_frames",
  "Get all frames from a specific page in a Figma file. Frames typically represent individual screens or components. Returns frame name, ID, dimensions, and position.",
  {
    fileKey: z
      .string()
      .describe("The Figma file key"),
    pageId: z
      .string()
      .describe(
        "The page ID (from figma_get_file). Usually a numeric string like '0:1' or '1:2'."
      ),
  },
  async ({ fileKey, pageId }) => {
    // Fetch the specific page node with its children
    const data = await figmaFetch(\`/files/\${fileKey}/nodes?ids=\${encodeURIComponent(pageId)}\`);

    const pageNode = data.nodes[pageId];
    if (!pageNode) {
      throw new Error(\`Page \${pageId} not found in file \${fileKey}\`);
    }

    const frames = (pageNode.document.children || [])
      .filter((node: any) => node.type === "FRAME" || node.type === "COMPONENT" || node.type === "COMPONENT_SET")
      .map((frame: any) => ({
        id: frame.id,
        name: frame.name,
        type: frame.type,
        width: frame.absoluteBoundingBox?.width,
        height: frame.absoluteBoundingBox?.height,
        x: frame.absoluteBoundingBox?.x,
        y: frame.absoluteBoundingBox?.y,
        childCount: frame.children?.length || 0,
        visible: frame.visible !== false,
      }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              pageId,
              pageName: pageNode.document.name,
              frameCount: frames.length,
              frames,
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
- Fetches a specific page by its node ID
- Filters for frames, components, and component sets (ignoring loose layers)
- Returns each frame's name, dimensions, position, and child count

**When Claude will use it:** "Show me all the screens on the Home page," "What frames are in the Login page?"

**Design-to-development use case:** Once you know the frame names and IDs, you can create Jira tickets for each frame ("Implement the Home Screen — dimensions 375x812").

---

## Step 7: Add Tool 3 — Get Comments

\`\`\`typescript
server.tool(
  "figma_get_comments",
  "Get all comments on a Figma file. Returns comment text, author, creation date, and whether the comment is resolved. Useful for reviewing design feedback.",
  {
    fileKey: z
      .string()
      .describe("The Figma file key"),
  },
  async ({ fileKey }) => {
    const data = await figmaFetch(\`/files/\${fileKey}/comments\`);

    const comments = data.comments.map((comment: any) => ({
      id: comment.id,
      message: comment.message,
      author: comment.user.handle,
      createdAt: comment.created_at,
      resolvedAt: comment.resolved_at,
      isResolved: !!comment.resolved_at,
      orderId: comment.order_id,
      parentId: comment.parent_id || null,
    }));

    // Separate top-level comments from replies
    const topLevel = comments.filter((c: any) => !c.parentId);
    const replies = comments.filter((c: any) => c.parentId);

    const unresolved = topLevel.filter((c: any) => !c.isResolved);
    const resolved = topLevel.filter((c: any) => c.isResolved);

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              totalComments: comments.length,
              topLevelComments: topLevel.length,
              unresolvedCount: unresolved.length,
              resolvedCount: resolved.length,
              replyCount: replies.length,
              unresolved,
              resolved,
              replies,
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
- Fetches all comments on a Figma file
- Separates top-level comments from replies
- Counts resolved vs unresolved comments
- Returns everything organized for easy reading

**When Claude will use it:** "What are the unresolved comments on the design file?" or "Are there any design review comments I need to address?"

**PM workflow:** Before a sprint planning meeting, ask Claude "Get all unresolved comments from the design file and create a Jira ticket for each one." This ensures nothing falls through the cracks.

---

## Step 8: Add Tool 4 — Export a Frame as Image

\`\`\`typescript
server.tool(
  "figma_export_image",
  "Export a specific frame or node from a Figma file as a PNG or SVG image. Returns a URL to the rendered image.",
  {
    fileKey: z
      .string()
      .describe("The Figma file key"),
    nodeId: z
      .string()
      .describe("The node/frame ID to export (from figma_get_frames)"),
    format: z
      .enum(["png", "svg", "pdf"])
      .optional()
      .describe("Export format: png, svg, or pdf (default: png)"),
    scale: z
      .number()
      .optional()
      .describe("Export scale: 1 = original size, 2 = 2x resolution (default: 2)"),
  },
  async ({ fileKey, nodeId, format, scale }) => {
    const exportFormat = format || "png";
    const exportScale = scale || 2;

    const params = new URLSearchParams({
      ids: nodeId,
      format: exportFormat,
      scale: exportScale.toString(),
    });

    const data = await figmaFetch(\`/images/\${fileKey}?\${params.toString()}\`);

    if (data.err) {
      throw new Error(\`Figma export error: \${data.err}\`);
    }

    const imageUrl = data.images[nodeId];

    if (!imageUrl) {
      throw new Error(\`No image generated for node \${nodeId}. The node may not be exportable.\`);
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: "Image exported successfully",
              nodeId,
              format: exportFormat,
              scale: \`\${exportScale}x\`,
              imageUrl,
              note: "This URL is temporary and will expire. Download the image if you need to keep it.",
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
- Requests Figma to render a specific node as an image
- Supports PNG, SVG, and PDF formats
- Supports different scale factors (2x for retina quality)
- Returns a temporary URL to the rendered image

**Important:** The image URLs returned by Figma are temporary (they expire after a short time). If you need to keep the image, download it or attach it to a Jira ticket immediately.

**When Claude will use it:** "Export the Home Screen frame as a PNG," "Get an SVG of the logo component."

---

## Step 9: Start the Server

\`\`\`typescript
// --- Start the server ---
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

---

## Step 10: Build and Configure

\`\`\`bash
npm install
npm run build
\`\`\`

Configure in Claude Code:

\`\`\`json
{
  "mcpServers": {
    "figma": {
      "command": "node",
      "args": ["/absolute/path/to/figma-mcp-server/build/index.js"],
      "env": {
        "FIGMA_API_TOKEN": "your-figma-personal-access-token"
      }
    }
  }
}
\`\`\`

---

## The Design-to-Development Workflow

This is where Figma + Jira together becomes extremely powerful. Here is a real workflow:

### Scenario

Your designer just finished the mobile app redesign. There are 12 new screens in Figma. You need to create Jira tickets for each screen with specs.

### Without MCP (the old way)

1. Open Figma (2 min)
2. Go through each screen, note the name and dimensions (15 min)
3. Open Jira (1 min)
4. Create 12 tickets one by one, typing descriptions for each (30 min)
5. Go back to Figma for details you missed (10 min)
6. Total: ~60 minutes

### With MCP (the new way)

One prompt:

> "Get all the frames from the 'Screens' page in my Mobile App Redesign Figma file (key: ABC123). For each frame, create a Jira Story in the MOBILE project with the title 'Implement [frame name]' and a description that includes the frame dimensions and a link to the Figma file."

Claude will:
1. Call \`figma_get_frames\` to get all frames
2. Loop through each frame
3. Call \`jira_create_issue\` for each one
4. Report what was created

**Total: 30 seconds.**

### Even More Advanced

> "Get the frames from the Figma file, get the unresolved comments, and for any frame that has comments, include those comments in the Jira ticket description so engineering knows about the design feedback."

This combines \`figma_get_frames\`, \`figma_get_comments\`, and \`jira_create_issue\` into a single workflow that would take a PM hours to do manually.

---

## Summary and Course Recap

Congratulations — you have completed the MCP Integrations Course!

### What You Built

| Lesson | Integration | Tools |
|--------|------------|-------|
| 4 | Jira | List projects, get issues, create issues, search with JQL |
| 5 | Google Drive | List files, create docs, read files, share files |
| 6 | Google Sheets | List sheets, read ranges, write ranges, create tabs |
| 7 | Any API | A reusable framework and template for any REST API |
| 8 | Figma | Get file info, get frames, get comments, export images |

### What You Learned

1. **REST APIs** — HTTP methods, status codes, authentication, JSON
2. **MCP Architecture** — Client, server, tools, transport
3. **Tool Design** — Names, descriptions, parameters, handlers
4. **Error Handling** — Graceful failures with actionable messages
5. **Multi-tool Workflows** — Combining MCP servers for complex PM tasks

### The Key Takeaway

MCP is not just about automating individual tasks — it is about creating **workflows** that connect your tools. The PM who can set up a system where Claude pulls from Jira, reads from Sheets, writes to Drive, and posts to Slack is operating at a fundamentally different level than the PM who does all of that manually.

You now have the skills to build MCP servers for any tool you use. The six-step framework from Lesson 7 will serve you for every new integration you build.

Keep building.
`,
  exercise: {
    title: "Build the Figma MCP Server and Test Design-to-Dev Workflow",
    description:
      "Connect the Figma MCP server and, if you also have the Jira server running, test the design-to-development workflow by creating Jira tickets from Figma frames.",
    steps: [
      "Generate a Figma Personal Access Token from your Figma Settings page",
      "Build the Figma MCP server from this lesson",
      "Configure it in Claude Code with your FIGMA_API_TOKEN environment variable",
      "Find a Figma file you have access to and copy its file key from the URL",
      "Test: \"Get the file info for Figma file [your-file-key]\"",
      "Test: \"Show me the frames on the first page of Figma file [your-file-key]\" (use the page ID from the previous response)",
      "Test: \"Get all comments on Figma file [your-file-key]. Are there any unresolved ones?\"",
      "Test: \"Export the first frame as a 2x PNG from [your-file-key]\"",
      "If you have the Jira server running too, try the combined workflow: \"Get all frames from [page] in Figma file [key], then create a Jira Story for each frame in project [PROJECT]\"",
    ],
    validation:
      "You have successfully completed this exercise if: (1) Claude can retrieve your Figma file info and list pages, (2) Claude can list frames with their names and dimensions, (3) Claude can show you comments (resolved and unresolved), and (4) Claude can export a frame as an image URL. Bonus: if you tested the Figma-to-Jira workflow and tickets were created.",
  },
  quiz: {
    questions: [
      {
        question:
          "How does the Figma API authenticate requests?",
        options: [
          "OAuth2 with browser login",
          "Basic authentication with email and password",
          "A Personal Access Token passed in the X-FIGMA-TOKEN header",
          "API key as a URL query parameter",
        ],
        correctIndex: 2,
        explanation:
          "Figma uses a simple Personal Access Token for authentication. You pass it in a custom header called X-FIGMA-TOKEN. This is the simplest auth method of all the APIs in this course — no OAuth, no Base64 encoding, just a token in a header.",
      },
      {
        question:
          "What is the hierarchy of elements in a Figma file?",
        options: [
          "Team > File > Layer > Component",
          "File > Page > Frame > Layers/Nodes",
          "Project > Canvas > Artboard > Elements",
          "Document > Sheet > Cell > Value",
        ],
        correctIndex: 1,
        explanation:
          "Figma files are organized as File > Page > Frame > Layers/Nodes. A file contains pages (like canvases), pages contain frames (individual screens or components), and frames contain layers (text, shapes, images, etc.). Each element is a 'node' with a unique ID.",
      },
      {
        question:
          "Why does the figma_get_file tool use depth=1 in the API request?",
        options: [
          "Figma only supports depth=1",
          "To limit the response to top-level pages without deeply nested content, keeping the response small and fast",
          "To get only the first page of the file",
          "Because deeper levels require a premium API plan",
        ],
        correctIndex: 1,
        explanation:
          "Figma files can contain thousands of nested nodes. Using depth=1 returns only the top-level structure (pages and their immediate children), keeping the response small and fast. Without a depth limit, the API would return every single layer in the entire file, which could be massive and slow.",
      },
    ],
  },
};

export default lesson;
