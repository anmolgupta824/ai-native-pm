import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 5,
  title: "Connect to Google Drive",
  duration: "45 min",
  objectives: [
    "Set up a Google Cloud project and enable the Drive API",
    "Understand OAuth2 authentication and why Google requires it",
    "Build an MCP server with four Google Drive tools",
    "Use Claude to create, list, read, and share Google Docs",
  ],
  sections: [
    {
      id: "what-we-are-building",
      title: "What We Are Building",
      content: `In this lesson, you will build a Google Drive MCP server with four tools:

1. **drive_list_files** — List files in your Drive or in a specific folder
2. **drive_create_doc** — Create a new Google Doc with content
3. **drive_read_file** — Read the contents of a file
4. **drive_share_file** — Share a file with someone

The real PM value: you will be able to say "Create a status report doc from this week's sprint data" and Claude will create it directly in your Google Drive. No more opening Docs, formatting headers, copy-pasting data from Jira. One prompt, one document, done.

Google Drive is a foundational tool for PMs. Status reports, PRDs, meeting notes, retrospective docs — they all live in Drive. By connecting Claude to Drive, you unlock the ability to generate and organize documents as part of automated workflows.`,
      teacherNotes: "Remind the student that Google requires more setup than Jira, but they only do it once.",
    },
    {
      id: "google-cloud-setup",
      title: "Set Up Google Cloud Console",
      content: `Google APIs require a bit more setup than Jira. You need to create a Google Cloud project, enable the Drive API, and create credentials. It sounds like a lot, but you only do this once.

### Create a Google Cloud Project

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Click **"Select a project"** at the top of the page, then **"New Project"**
3. Name it something like "MCP Integrations"
4. Click **"Create"**
5. Make sure the new project is selected (check the dropdown at the top)

### Enable the Google Drive API

1. In the Google Cloud Console, go to **APIs & Services > Library**
2. Search for **"Google Drive API"**
3. Click on it and click **"Enable"**

### Create OAuth Credentials

1. Go to **APIs & Services > Credentials**
2. Click **"Create Credentials" > "OAuth client ID"**
3. You may need to configure the **OAuth consent screen** first:
   - Choose **"External"** (unless you have a Google Workspace org)
   - Fill in the app name ("MCP Server"), your email as support email
   - Add your email as a test user
   - Save
4. Back on Credentials, click **"Create Credentials" > "OAuth client ID"**
5. Application type: **"Desktop app"**
6. Name: "MCP Server"
7. Click **"Create"**
8. **Download the JSON file** — this contains your client ID and client secret

Save this file as \`credentials.json\` in your project directory. You will need it for authentication.`,
      teacherNotes: "This is the most tedious part. Walk through each step patiently. If they get stuck on the OAuth consent screen, help them through it.",
      checkQuestion: "Have you downloaded the credentials.json file? You'll need it in the next step.",
    },
    {
      id: "understanding-oauth",
      title: "Understanding OAuth2 (Simply)",
      content: `### Why Is Google More Complex Than Jira?

Jira uses Basic authentication — you get an API token and include it in every request. Simple.

Google uses **OAuth2** — a more secure but more complex system. Here is why:

With Jira, you gave the MCP server direct access to your account using a token you created. With Google, the system works differently:

1. **Your MCP server asks Google:** "I want to access this user's Drive files"
2. **Google asks you (in a browser):** "This app wants to access your Drive. Allow?"
3. **You click "Allow"**
4. **Google gives your server a token** that represents your permission
5. **Your server uses that token** for all future requests

This is more secure because:
- You explicitly approve what the app can access
- The token can be revoked at any time
- The app never sees your Google password

### Tokens You Need to Know

| Token | What It Is | How Long It Lasts |
|-------|-----------|-------------------|
| **Access Token** | The token your server uses to make API calls | ~1 hour |
| **Refresh Token** | A long-lived token used to get new access tokens | Until you revoke it |
| **Client ID** | Identifies your application | Permanent |
| **Client Secret** | Your app's password (keep it secret) | Permanent |

In practice, your server will:
1. First time: Open a browser, you log in, you approve access, server saves the refresh token
2. Every time after: Use the refresh token to get a new access token automatically`,
      teacherNotes: "Use the valet key analogy from the concept explanations. Make OAuth feel less intimidating.",
      checkQuestion: "What's the difference between an access token and a refresh token?",
    },
    {
      id: "project-setup",
      title: "Set Up the Project",
      content: `Create the project directory inside your current working folder:

\`\`\`bash
mkdir -p google-drive-mcp-server/src
cd google-drive-mcp-server
\`\`\`

### package.json

\`\`\`json
{
  "name": "google-drive-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "auth": "node build/auth.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "googleapis": "^130.0.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  }
}
\`\`\`

The \`googleapis\` package is Google's official Node.js client library. It handles OAuth2, token refresh, and API calls.

### tsconfig.json

Same as the Jira server:

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

Install dependencies:

\`\`\`bash
npm install
\`\`\``,
      teacherNotes: "IMPORTANT: Build in the current project folder. Say: 'We'll create a google-drive-mcp-server folder right here. Tip: Open Cursor or VS Code pointed at this folder to see each file as we create it.'",
      checkQuestion: "Have you run npm install? The googleapis package should now be in node_modules.",
    },
    {
      id: "auth-helper",
      title: "Create the Auth Helper",
      content: `Before building the main server, you need a way to authenticate with Google. Create \`src/auth.ts\`:

\`\`\`typescript
import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { URL } from "url";

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/documents",
];

const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

export async function getAuthClient() {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret } = credentials.installed || credentials.web;

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/callback"
  );

  // Check if we already have a saved token
  if (fs.existsSync(TOKEN_PATH)) {
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
    oAuth2Client.setCredentials(token);
    return oAuth2Client;
  }

  // No token — need to authorize
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("\\nAuthorize this app by visiting this URL:\\n");
  console.log(authUrl);
  console.log("\\nWaiting for authorization...\\n");

  // Start a temporary server to catch the callback
  const code = await new Promise<string>((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url!, "http://localhost:3000");
        const authCode = url.searchParams.get("code");
        if (authCode) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end("<h1>Authorization successful!</h1><p>You can close this window.</p>");
          server.close();
          resolve(authCode);
        }
      } catch (err) {
        reject(err);
      }
    });
    server.listen(3000);
  });

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Save the token for future use
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  console.log("Token saved to", TOKEN_PATH);

  return oAuth2Client;
}

// If this file is run directly, perform the auth flow
const isMainModule = process.argv[1]?.endsWith("auth.js");
if (isMainModule) {
  getAuthClient()
    .then(() => {
      console.log("Authentication complete!");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Authentication failed:", err);
      process.exit(1);
    });
}
\`\`\`

**What this does:**
1. Reads your OAuth credentials from \`credentials.json\`
2. If a saved token exists, uses it (you are already logged in)
3. If no token exists, generates an auth URL, opens a local server, waits for you to approve access, then saves the token
4. Can be run directly (\`npm run auth\`) to complete the first-time authentication

### First-Time Setup

After building, run the auth flow once:

\`\`\`bash
npm run build
npm run auth
\`\`\`

This opens a URL in your browser. Log in with your Google account, approve access, and the token is saved. You only need to do this once.`,
      teacherNotes: "Explain each part of auth.ts thoroughly. The auth flow only runs once — after that, the refresh token handles everything.",
      checkQuestion: "After building and running npm run auth, did you see 'Authorization successful!' in your browser?",
    },
    {
      id: "tool-list-files",
      title: "Tool 1 — List Files",
      content: `Now create \`src/index.ts\`. Start with the server setup and the first tool:

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { google } from "googleapis";
import { getAuthClient } from "./auth.js";

// --- Initialize Google Drive client ---
const auth = await getAuthClient();
const drive = google.drive({ version: "v3", auth });
const docs = google.docs({ version: "v1", auth });

// --- Create the MCP Server ---
const server = new McpServer({
  name: "google-drive-mcp-server",
  version: "1.0.0",
});
\`\`\`

Now add the first tool — listing files:

\`\`\`typescript
server.tool(
  "drive_list_files",
  "List files in Google Drive. Can list all recent files or files in a specific folder. Returns file name, type, last modified date, and ID.",
  {
    folderId: z
      .string()
      .optional()
      .describe(
        "The ID of a specific folder to list files from. If not provided, lists recent files from the root."
      ),
    query: z
      .string()
      .optional()
      .describe(
        "Search query to filter files. Example: \\"name contains 'sprint'\\" or \\"mimeType = 'application/vnd.google-apps.document'\\""
      ),
    maxResults: z
      .number()
      .optional()
      .describe("Maximum number of files to return (default: 20)"),
  },
  async ({ folderId, query, maxResults }) => {
    let q = "trashed = false";

    if (folderId) {
      q += \` and '\${folderId}' in parents\`;
    }

    if (query) {
      q += \` and \${query}\`;
    }

    const response = await drive.files.list({
      q,
      pageSize: maxResults || 20,
      fields: "files(id, name, mimeType, modifiedTime, size, webViewLink, owners)",
      orderBy: "modifiedTime desc",
    });

    const files = (response.data.files || []).map((file) => ({
      id: file.id,
      name: file.name,
      type: simplifyMimeType(file.mimeType || ""),
      lastModified: file.modifiedTime,
      size: file.size ? formatFileSize(Number(file.size)) : "N/A",
      link: file.webViewLink,
      owner: file.owners?.[0]?.displayName || "Unknown",
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({ count: files.length, files }, null, 2),
        },
      ],
    };
  }
);

// Helper: Convert MIME types to readable names
function simplifyMimeType(mimeType: string): string {
  const types: Record<string, string> = {
    "application/vnd.google-apps.document": "Google Doc",
    "application/vnd.google-apps.spreadsheet": "Google Sheet",
    "application/vnd.google-apps.presentation": "Google Slides",
    "application/vnd.google-apps.folder": "Folder",
    "application/pdf": "PDF",
    "image/png": "PNG Image",
    "image/jpeg": "JPEG Image",
    "text/plain": "Text File",
  };
  return types[mimeType] || mimeType;
}

// Helper: Format file sizes
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}
\`\`\`

**What this does:**
- Lists files from Drive, optionally filtered by folder or search query
- Returns clean, readable file info including a direct link
- Orders by most recently modified

**When Claude will use it:** "Show me my recent Drive files," "List docs in the Sprint Planning folder," "Find all spreadsheets with 'roadmap' in the name."

Notice the two helper functions: \`simplifyMimeType\` converts long MIME type strings like \`application/vnd.google-apps.document\` into human-readable names like "Google Doc". \`formatFileSize\` converts raw byte counts into "1.2 MB" format. These small touches make the output much more readable for both Claude and the user.`,
      teacherNotes: "Point out the helper functions — simplifying MIME types makes the output much more readable for Claude.",
    },
    {
      id: "tool-create-doc",
      title: "Tool 2 — Create a Google Doc",
      content: `This tool creates a new Google Doc with content. It is a 3-step process: create the document, add content, then optionally move it to a folder.

\`\`\`typescript
server.tool(
  "drive_create_doc",
  "Create a new Google Doc in Google Drive with the specified title and content. Returns the document ID and link.",
  {
    title: z.string().describe("The title of the new document"),
    content: z
      .string()
      .describe(
        "The text content to put in the document. Use newlines for paragraphs."
      ),
    folderId: z
      .string()
      .optional()
      .describe(
        "The ID of the folder to create the document in. If not provided, creates in the root of Drive."
      ),
  },
  async ({ title, content, folderId }) => {
    // Step 1: Create the document
    const doc = await docs.documents.create({
      requestBody: {
        title,
      },
    });

    const documentId = doc.data.documentId!;

    // Step 2: Add content to the document
    if (content) {
      await docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: content,
              },
            },
          ],
        },
      });
    }

    // Step 3: Move to the specified folder (if provided)
    if (folderId) {
      // Get current parents
      const file = await drive.files.get({
        fileId: documentId,
        fields: "parents",
      });

      await drive.files.update({
        fileId: documentId,
        addParents: folderId,
        removeParents: file.data.parents?.join(",") || "",
        fields: "id, parents",
      });
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: "Document created successfully",
              documentId,
              title,
              link: \`https://docs.google.com/document/d/\${documentId}/edit\`,
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

**Why does this need TWO APIs?**

This is a key concept: the **Drive API** manages files (create, move, share, delete), while the **Docs API** manages document content (insert text, format text). To create a Google Doc with content, you use both:

1. The **Docs API** creates the document and inserts text (\`docs.documents.create\`, \`docs.documents.batchUpdate\`)
2. The **Drive API** moves it to a folder (\`drive.files.update\`)

**The PM use case:** "Create a status report doc titled 'Sprint 23 Summary' with the following content..." and Claude creates it directly in your Drive.`,
      checkQuestion: "Why does creating a Google Doc require TWO APIs (Drive + Docs)?",
    },
    {
      id: "tool-read-file",
      title: "Tool 3 — Read a File",
      content: `This tool reads the text content of a Google Doc or other text-based file.

\`\`\`typescript
server.tool(
  "drive_read_file",
  "Read the text content of a Google Doc or other text-based file in Google Drive. Returns the document text.",
  {
    fileId: z
      .string()
      .describe("The ID of the file to read (found in the file's URL or from drive_list_files)"),
  },
  async ({ fileId }) => {
    // Try to read as a Google Doc first
    try {
      const doc = await docs.documents.get({ documentId: fileId });

      // Extract text from the document
      let text = "";
      const body = doc.data.body;
      if (body?.content) {
        for (const element of body.content) {
          if (element.paragraph?.elements) {
            for (const el of element.paragraph.elements) {
              if (el.textRun?.content) {
                text += el.textRun.content;
              }
            }
          }
        }
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                title: doc.data.title,
                documentId: fileId,
                content: text,
              },
              null,
              2
            ),
          },
        ],
      };
    } catch {
      // If it is not a Google Doc, try to download as text
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "text" }
      );

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                fileId,
                content: response.data as string,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  }
);
\`\`\`

**What this does:**
- First tries to read the file as a Google Doc (using the Docs API to extract structured text)
- If that fails, downloads the file content directly (works for plain text files)
- Returns the full text content

Notice the **try/catch pattern**: the tool tries the Docs API first (for Google Docs), and if that throws an error (because the file is not a Doc), it falls back to downloading the raw file content via the Drive API. This is a common defensive coding pattern — try the most specific approach first, fall back to the general approach.

**When Claude will use it:** "Read the PRD doc," "What does the requirements document say about the login feature?"`,
      teacherNotes: "Explain the try/catch pattern — try as a Google Doc first, fall back to raw file download.",
    },
    {
      id: "tool-share-file",
      title: "Tool 4 — Share a File",
      content: `The final tool lets Claude share files with team members.

\`\`\`typescript
server.tool(
  "drive_share_file",
  "Share a Google Drive file with someone by email. Can grant view, comment, or edit access.",
  {
    fileId: z
      .string()
      .describe("The ID of the file to share"),
    email: z
      .string()
      .describe("The email address of the person to share with"),
    role: z
      .enum(["reader", "commenter", "writer"])
      .describe("The access level: reader (view only), commenter (can comment), writer (can edit)"),
    message: z
      .string()
      .optional()
      .describe("Optional message to include in the sharing notification email"),
  },
  async ({ fileId, email, role, message }) => {
    await drive.permissions.create({
      fileId,
      requestBody: {
        type: "user",
        role,
        emailAddress: email,
      },
      sendNotificationEmail: !!message,
      emailMessage: message || undefined,
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: \`File shared successfully with \${email} as \${role}\`,
              fileId,
              sharedWith: email,
              accessLevel: role,
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
- Shares a file with a specific person by email
- Supports three access levels: **reader** (view only), **commenter** (can add comments), **writer** (can edit)
- Optionally sends a notification email with a custom message

**When Claude will use it:** "Share the sprint doc with sarah@company.com with edit access."

The three access levels map to what you see in the Google Drive sharing dialog. Reader means view-only. Commenter means they can leave comments but not change the content. Writer means full edit access.`,
      checkQuestion: "What are the three access levels you can grant when sharing a file?",
    },
    {
      id: "build-and-workflow",
      title: "Build, Auth, Configure, and Your First Workflow",
      content: `Add the transport code at the bottom of \`src/index.ts\` to start the server:

\`\`\`typescript
// --- Start the server ---
const transport = new StdioServerTransport();
await server.connect(transport);
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

### First-Time Auth

\`\`\`bash
npm run auth
\`\`\`

This opens your browser. Log in with your Google account, approve Drive access, and the token is saved.

### Configure Claude Code

\`\`\`json
{
  "mcpServers": {
    "google-drive": {
      "command": "node",
      "args": ["/absolute/path/to/google-drive-mcp-server/build/index.js"]
    }
  }
}
\`\`\`

Note: The Google Drive server reads credentials from files (\`credentials.json\` and \`token.json\`) in its directory, so you do not need to pass environment variables. Make sure the working directory is correct, or update the auth helper to use absolute paths.

---

## Real PM Workflow: Status Report Generator

Here is the magic of combining tools. With your Jira server (Lesson 4) and Google Drive server (this lesson) both connected, try this prompt:

> "Get all issues completed this sprint from the PROJ project in Jira. Then create a Google Doc called 'Sprint 23 Status Report' with a summary of what was completed, what is in progress, and any blockers."

Claude will:
1. Call \`jira_search_issues\` to get sprint data
2. Analyze the results
3. Call \`drive_create_doc\` to create the report
4. Give you a link to the finished doc

This is the kind of workflow that takes a PM 30-60 minutes every sprint. With MCP, it takes 10 seconds.

### Summary

You now have a Google Drive MCP server with four tools. The key things to remember:

1. **Google uses OAuth2** — more setup than Jira, but you only do it once
2. **The googleapis library** handles most of the complexity (token refresh, API calls)
3. **File IDs** are the key identifier — every file in Drive has a unique ID
4. **The Docs API** is separate from the Drive API — Drive manages files, Docs manages document content
5. **Combining MCP servers** is where the real power is — Jira + Drive together enables workflows that were not possible before`,
      teacherNotes: "The Status Report Generator workflow is the payoff. Show how Jira + Drive together enable workflows that were impossible before.",
    },
  ],
  exercise: {
    title: "Build and Test Your Google Drive MCP Server",
    description:
      "Set up Google Cloud credentials, build the Drive MCP server, and create a test document to verify the integration works.",
    steps: [
      "Create a Google Cloud project at https://console.cloud.google.com and enable the Google Drive API",
      "Create OAuth2 credentials (Desktop app type) and download the credentials JSON file",
      "Set up the project directory with package.json, tsconfig.json, and install dependencies",
      "Create the auth.ts and index.ts files from this lesson",
      "Build the project: npm run build",
      "Run the first-time auth: npm run auth (this opens a browser for Google login)",
      "Configure the server in Claude Code and restart",
      "Test: \"List my recent Google Drive files\"",
      "Test: \"Create a Google Doc called 'MCP Test Document' with the content 'This document was created by Claude through an MCP server.'\"",
      "Open the created document in your browser using the link Claude provides to verify it worked",
    ],
    validation:
      "You have successfully completed this exercise if: (1) OAuth2 authentication completed without errors and a token.json file was saved, (2) Claude can list your Drive files, (3) A test Google Doc was created with the specified title and content, and (4) You can open the document link and see the content.",
  },
  quiz: {
    questions: [
      {
        question:
          "Why does Google Drive require OAuth2 instead of a simple API key?",
        options: [
          "API keys are not supported by Google",
          "OAuth2 lets you explicitly approve what the app can access and revoke permission at any time",
          "OAuth2 is faster than API key authentication",
          "Google requires OAuth2 only for paid accounts",
        ],
        correctIndex: 1,
        explanation:
          "OAuth2 is a user-consent-based authentication system. It requires you to explicitly approve what data the app can access (in this case, your Drive files). You can revoke this permission at any time from your Google account settings. This is more secure than a simple API key.",
      },
      {
        question:
          "What is the difference between the Drive API and the Docs API?",
        options: [
          "They are the same API with different names",
          "The Drive API manages files (list, move, share); the Docs API manages document content (read text, insert text)",
          "The Drive API is for personal accounts; the Docs API is for business accounts",
          "The Drive API is REST-based; the Docs API is GraphQL-based",
        ],
        correctIndex: 1,
        explanation:
          "The Drive API manages files as objects — listing, moving, sharing, and deleting files. The Docs API manages the content inside Google Docs — reading text, inserting text, and formatting. To create a Google Doc with content, you use both: Drive to create the file and Docs to add the content.",
      },
      {
        question:
          "What is a refresh token used for?",
        options: [
          "To refresh the Google Drive file list",
          "To get a new access token when the current one expires (approximately every hour)",
          "To reset your Google account password",
          "To clear the API rate limit counter",
        ],
        correctIndex: 1,
        explanation:
          "Access tokens expire after about one hour. A refresh token is a long-lived token that your server uses to automatically get a new access token without requiring you to log in again. This is why you only need to run the auth flow once — after that, the refresh token handles everything.",
      },
      {
        question:
          "How does Claude know the ID of a file to read or share?",
        options: [
          "Claude guesses the ID from the file name",
          "The ID is always the same as the file name",
          "Claude first uses drive_list_files to find the file and get its ID, then passes the ID to other tools",
          "Google assigns sequential numeric IDs that Claude can predict",
        ],
        correctIndex: 2,
        explanation:
          "File IDs in Google Drive are unique, random-looking strings (like '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'). Claude typically calls drive_list_files first to find the file and get its ID, then uses that ID with drive_read_file or drive_share_file. This is a common pattern — list first, then act on a specific item.",
      },
    ],
  },
};

export default lesson;
