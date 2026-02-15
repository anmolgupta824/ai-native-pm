# Lesson 5: Google Drive Integration

**Estimated reading time: 45 minutes**
**Lesson type: Hands-on build**

---

## What You'll Learn

By the end of this lesson, you will have:

- A Google Cloud project configured with the Drive API enabled
- OAuth 2.0 credentials set up (the "hardest" part, done step by step)
- A working MCP server that connects Claude to Google Drive
- Four tools: `list_files`, `create_doc`, `read_file`, `share_file`
- A real workflow for creating status report documents

This lesson introduces OAuth 2.0, which is more complex than the API token approach in Jira. Do not be intimidated -- we will walk through every click.

---

## Why Google Drive?

As a PM, you live in Google Docs. Meeting notes, PRDs, status reports, one-pagers, retrospective summaries -- they all end up in Drive. Connecting Claude to Drive means:

- **Automated document creation.** Tell Claude to create a status report and it appears in your Drive.
- **Document reading.** Ask Claude to summarize a 20-page PRD you do not have time to re-read.
- **Cross-tool workflows.** Pull data from Jira (Lesson 4), generate a report, and save it as a Google Doc.

---

## Step 1: Google Cloud Console Setup

Google's APIs require a "project" in Google Cloud Console. Think of it as registering your MCP server with Google so Google knows who is making requests.

### 1a: Create a Google Cloud Project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. If this is your first time, you may need to agree to Google Cloud terms of service
3. Click the project dropdown at the top of the page (it might say "Select a project" or show an existing project name)
4. Click **"New Project"**
5. Name it: `Claude MCP Server`
6. Click **"Create"**
7. Wait 10-15 seconds for the project to be created
8. Make sure the new project is selected in the dropdown

### 1b: Enable the Google Drive API

1. In the left sidebar, click **"APIs & Services"** then **"Library"**
2. Search for **"Google Drive API"**
3. Click on it
4. Click **"Enable"**
5. Wait for it to activate (a few seconds)

### 1c: Configure the OAuth Consent Screen

Before you can create credentials, Google needs to know what your "app" will ask users for. This is the consent screen -- what a user sees when your app requests access.

1. Go to **"APIs & Services"** then **"OAuth consent screen"**
2. Select **"External"** (even though only you will use it)
3. Click **"Create"**
4. Fill in the form:
   - **App name:** `Claude MCP Server`
   - **User support email:** your email
   - **Developer contact email:** your email
5. Click **"Save and Continue"**
6. On the **Scopes** page, click **"Add or Remove Scopes"**
7. Search for and select these scopes:
   - `https://www.googleapis.com/auth/drive.file` (create/edit files this app creates)
   - `https://www.googleapis.com/auth/drive.readonly` (read files)
8. Click **"Update"** then **"Save and Continue"**
9. On the **Test users** page, click **"Add Users"**
10. Add your own Gmail/Google Workspace email
11. Click **"Save and Continue"**
12. Review and click **"Back to Dashboard"**

**Why "External"?** Google Cloud offers "Internal" (only your organization) and "External" (anyone). We choose External because it works for both personal Gmail accounts and Google Workspace accounts. Since we are adding ourselves as a test user, only we can use it.

### 1d: Create OAuth Credentials

1. Go to **"APIs & Services"** then **"Credentials"**
2. Click **"+ Create Credentials"** at the top
3. Select **"OAuth client ID"**
4. For **Application type**, select **"Desktop app"**
5. Name it: `Claude MCP Drive`
6. Click **"Create"**
7. A dialog will show your **Client ID** and **Client Secret**
8. Click **"Download JSON"** to save these
9. Also **copy both values** somewhere safe

You now have:
- **Client ID:** looks like `123456-abc.apps.googleusercontent.com`
- **Client Secret:** looks like `GOCSPX-abc123def456`

---

## Step 2: Understanding OAuth 2.0

Before building the server, let us understand what OAuth does and why Google requires it.

### The Valet Key Analogy

When you use valet parking, you give the valet a special key. This key can:
- Start the car
- Drive the car

But it cannot:
- Open the trunk
- Open the glove box
- Access the car's settings

OAuth works the same way. Instead of giving your MCP server your Google password (which would give it access to EVERYTHING), OAuth lets you give it a limited key that can only access specific things (your Drive files, not your Gmail or Calendar).

### The OAuth Flow

Here is what happens when your MCP server first connects to Google:

```
Step 1: Your MCP server says to Google:
        "Hi, I'm the Claude MCP Server. I'd like to access this
         user's Drive files."

Step 2: Google opens a browser window showing you:
        "Claude MCP Server wants to:
         - See and download your Google Drive files
         - Create files in your Drive
         Allow?"

Step 3: You click "Allow"

Step 4: Google gives your MCP server an "access token"
        (the valet key)

Step 5: Your MCP server uses this token for all future requests

Step 6: When the token expires (after ~1 hour), your server
        uses a "refresh token" to get a new one automatically
```

After the first time, you will not see the consent screen again. The refresh token handles renewals silently.

### Token Storage

Your MCP server needs to save the tokens somewhere so you do not have to re-authorize every time. We will store them in a local file (`~/.mcp-google-tokens.json`). This file stays on your machine and is never sent anywhere.

---

## Step 3: Build the Server

### 3a: Create the Project

Open Claude Code:

```
Create a new MCP server project for Google Drive in
~/mcp-servers/google-drive-server with package.json,
tsconfig.json, and src/index.ts. Include the MCP SDK
and googleapis as dependencies.
```

### 3b: Install Dependencies

```
Install all dependencies in google-drive-server:
@modelcontextprotocol/sdk, googleapis, and open (for opening the browser)
```

### 3c: The Server Code -- Section by Section

#### Imports and Configuration

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI = "http://localhost:3000/oauth2callback";
const TOKEN_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || "",
  ".mcp-google-drive-tokens.json"
);
```

**New concepts:**
- `googleapis` -- Google's official Node.js library for accessing Google APIs
- `OAuth2Client` -- Handles the OAuth authentication flow
- `TOKEN_PATH` -- Where we save the tokens on your machine

#### OAuth Helper Functions

```typescript
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

async function loadTokens(): Promise<boolean> {
  try {
    if (fs.existsSync(TOKEN_PATH)) {
      const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
      oauth2Client.setCredentials(tokens);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

function saveTokens(tokens: any): void {
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
}

async function authenticate(): Promise<void> {
  const hasTokens = await loadTokens();
  if (hasTokens) {
    // Check if we need to refresh
    if (oauth2Client.credentials.expiry_date &&
        oauth2Client.credentials.expiry_date < Date.now()) {
      const { credentials } = await oauth2Client.refreshAccessToken();
      saveTokens(credentials);
    }
    return;
  }

  // Need to do the full OAuth flow
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly",
    ],
  });

  // Start a temporary local server to receive the callback
  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      if (req.url?.startsWith("/oauth2callback")) {
        const url = new URL(req.url, "http://localhost:3000");
        const code = url.searchParams.get("code");

        if (code) {
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          saveTokens(tokens);
          res.end("Authentication successful! You can close this tab.");
          server.close();
          resolve();
        } else {
          res.end("Authentication failed. No code received.");
          server.close();
          reject(new Error("No auth code received"));
        }
      }
    });

    server.listen(3000, () => {
      console.error(`Open this URL to authenticate:\n${authUrl}`);
    });
  });
}
```

**What this does, step by step:**

1. `loadTokens()` -- Checks if we have saved tokens from a previous session
2. If tokens exist and are not expired, we use them (no browser needed)
3. If tokens are expired, we refresh them silently
4. If no tokens exist (first time), we start the OAuth flow:
   - Generate an authentication URL
   - Start a temporary local web server on port 3000
   - Print the URL so you can open it in a browser
   - When you authorize, Google redirects to our local server with a code
   - We exchange the code for tokens and save them

**PM analogy:** This is like the first time you set up a new app on your phone. It asks for permission once, you grant it, and then it remembers you. The `loadTokens` function is like the app checking "have I been set up before?"

#### Tool Definitions

```typescript
const server = new Server(
  { name: "google-drive-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_files",
        description:
          "List files in Google Drive. Can filter by name, type, or folder.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description:
                "Search query (e.g., 'name contains \"Status Report\"' or 'mimeType = \"application/vnd.google-apps.document\"')",
            },
            max_results: {
              type: "number",
              description: "Maximum files to return (default: 20)",
            },
          },
        },
      },
      {
        name: "create_doc",
        description: "Create a new Google Doc with the specified title and content",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Document title",
            },
            content: {
              type: "string",
              description: "Document content in plain text",
            },
            folder_id: {
              type: "string",
              description: "Optional: Google Drive folder ID to create the doc in",
            },
          },
          required: ["title", "content"],
        },
      },
      {
        name: "read_file",
        description: "Read the contents of a Google Doc or other text-based file",
        inputSchema: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "The Google Drive file ID",
            },
          },
          required: ["file_id"],
        },
      },
      {
        name: "share_file",
        description: "Share a Google Drive file with specified email addresses",
        inputSchema: {
          type: "object",
          properties: {
            file_id: {
              type: "string",
              description: "The Google Drive file ID to share",
            },
            email: {
              type: "string",
              description: "Email address to share with",
            },
            role: {
              type: "string",
              description: "Permission role",
              enum: ["reader", "commenter", "writer"],
            },
          },
          required: ["file_id", "email", "role"],
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

  // Ensure we are authenticated before any operation
  await authenticate();
  const drive = google.drive({ version: "v3", auth: oauth2Client });
  const docs = google.docs({ version: "v1", auth: oauth2Client });

  try {
    switch (name) {
      case "list_files": {
        const maxResults = args?.max_results || 20;
        const params: any = {
          pageSize: maxResults,
          fields: "files(id, name, mimeType, modifiedTime, owners, webViewLink)",
        };
        if (args?.query) {
          params.q = args.query;
        }
        const response = await drive.files.list(params);
        const files = response.data.files?.map((f) => ({
          id: f.id,
          name: f.name,
          type: f.mimeType,
          modified: f.modifiedTime,
          link: f.webViewLink,
        }));
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(files, null, 2),
            },
          ],
        };
      }

      case "create_doc": {
        // Step 1: Create the document
        const doc = await docs.documents.create({
          requestBody: { title: args.title },
        });

        const docId = doc.data.documentId;

        // Step 2: Add content to the document
        if (args.content && docId) {
          await docs.documents.batchUpdate({
            documentId: docId,
            requestBody: {
              requests: [
                {
                  insertText: {
                    location: { index: 1 },
                    text: args.content,
                  },
                },
              ],
            },
          });
        }

        // Step 3: Move to folder if specified
        if (args.folder_id && docId) {
          await drive.files.update({
            fileId: docId,
            addParents: args.folder_id,
            fields: "id, parents",
          });
        }

        return {
          content: [
            {
              type: "text",
              text: `Created document "${args.title}"\nID: ${docId}\nLink: https://docs.google.com/document/d/${docId}/edit`,
            },
          ],
        };
      }

      case "read_file": {
        // Try to export as plain text (works for Google Docs)
        try {
          const response = await drive.files.export({
            fileId: args.file_id,
            mimeType: "text/plain",
          });
          return {
            content: [{ type: "text", text: String(response.data) }],
          };
        } catch {
          // If export fails, try downloading the raw content
          const response = await drive.files.get({
            fileId: args.file_id,
            alt: "media",
          });
          return {
            content: [{ type: "text", text: String(response.data) }],
          };
        }
      }

      case "share_file": {
        await drive.permissions.create({
          fileId: args.file_id,
          requestBody: {
            type: "user",
            role: args.role,
            emailAddress: args.email,
          },
        });
        return {
          content: [
            {
              type: "text",
              text: `Shared file with ${args.email} as ${args.role}`,
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
```

**Key implementation notes:**

**`list_files`**: The `fields` parameter tells Google which data to return. Without it, Google returns everything (including metadata you do not need). This is like telling your assistant "just bring me the name, date, and link -- I don't need the entire file history."

**`create_doc`**: This is a two-step process. First, create an empty doc with a title. Then, insert the content. Google Docs API treats document editing as a series of "requests" (insert text, format text, add heading, etc.).

**`read_file`**: We try to export as plain text first (which works for Google Docs). If that fails (e.g., for PDFs or images), we download the raw content. This "try, then fallback" pattern is a common strategy in programming.

**`share_file`**: Creates a permission entry on the file. The `role` can be "reader" (view only), "commenter" (can comment but not edit), or "writer" (full edit access).

#### Start the Server

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Google Drive MCP server running on stdio");
}

main().catch(console.error);
```

---

## Step 4: First-Time Authentication

The first time you use the Google Drive server, you need to complete the OAuth flow.

### What Will Happen

1. Start Claude Code with the Drive server configured
2. Ask Claude to list your Drive files
3. The server will print a URL in the console
4. Open that URL in your browser
5. Sign in with your Google account
6. Click "Allow" on the consent screen
7. You will see "Authentication successful!"
8. Claude will then show your Drive files

### If You See a "This App Isn't Verified" Warning

Since your Google Cloud project is in "testing" mode, Google will show a warning. This is normal for personal projects.

1. Click **"Advanced"**
2. Click **"Go to Claude MCP Server (unsafe)"**
3. This is safe -- you created this app yourself
4. Review the permissions and click **"Allow"**

After this one-time setup, the tokens are saved and you will not see the consent screen again.

---

## Step 5: Register and Test

### Register with Claude

```
Add the google-drive-server to my Claude configuration.
Server at ~/mcp-servers/google-drive-server/dist/index.js
Environment variables:
GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here
```

### Test the Tools

```
List my recent Google Drive files
```

```
Create a new Google Doc called "Weekly Status Report - Feb 2026"
with content summarizing that the MCP course development is on track,
3 of 8 modules completed, and the Jira integration is working.
```

```
Read the contents of my file called "Product Roadmap Q1"
```

---

## Real PM Workflow: Automated Status Report

Here is the workflow that ties Jira (Lesson 4) and Google Drive together:

```
Pull the current sprint data from Jira for project PROJ.
Summarize the sprint status including:
- Total tickets and their breakdown by status
- Any blockers or high-priority unassigned items
- Sprint progress percentage

Then create a Google Doc called "Sprint Status Report - [today's date]"
with this information formatted as a professional status update.
```

Claude will:
1. Call the Jira `search_issues` tool to get sprint data
2. Analyze and summarize the results
3. Call the Drive `create_doc` tool to create the report
4. Return the link to the new document

This cross-tool workflow is the real power of MCP. Each server is independently useful, but combining them is where the magic happens.

---

## Understanding Google Drive File IDs

Every file in Google Drive has a unique ID. It looks like this:

```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
```

You can find a file's ID in its URL:
```
https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                    This is the file ID
```

When Claude lists files, it includes the ID for each one. You can then use that ID with `read_file` or `share_file`.

---

## Troubleshooting

### "Error: invalid_client"
**Cause:** Your Client ID or Client Secret is wrong.
**Fix:** Go back to Google Cloud Console, check your credentials, and update the environment variables.

### "Error: access_denied"
**Cause:** You did not add yourself as a test user in the OAuth consent screen.
**Fix:** Go to APIs & Services > OAuth consent screen > Test users and add your email.

### "Error: insufficient_scope"
**Cause:** The OAuth scopes in your consent screen do not match what the server requests.
**Fix:** Update the scopes in the consent screen configuration to include Drive scopes.

### "Token has been expired or revoked"
**Cause:** Your refresh token is no longer valid.
**Fix:** Delete `~/.mcp-google-drive-tokens.json` and authenticate again.

### "File not found" When Reading
**Cause:** The file ID is wrong or you do not have access.
**Fix:** Check the file ID from the list_files output. Make sure the file is in your Drive or shared with you.

### OAuth Callback Fails
**Cause:** Port 3000 is already in use by another application.
**Fix:** Stop whatever is running on port 3000, or change the REDIRECT_URI and port in the code to 3001 or another available port. Remember to also update the redirect URI in Google Cloud Console.

---

## Quick Check

1. What is the difference between an API key and OAuth 2.0?
2. Why does the OAuth flow open a browser the first time?
3. What happens when an access token expires?
4. What two Google APIs does this server use (Drive vs Docs)?

---

*Previous: [Lesson 4: Jira Integration](4-jira-integration.md)*
*Next: [Lesson 6: Google Sheets Integration](6-google-sheets.md)*
