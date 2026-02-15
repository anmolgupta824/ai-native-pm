#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";

// ── Auth ────────────────────────────────────────────────────────

const HOME = process.env.HOME || "";
const CREDENTIALS_PATH = path.join(HOME, ".google-drive-credentials.json");
const TOKEN_PATH = path.join(HOME, ".google-drive-token.json");

let drive: any = null;

async function authorize() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Google credentials not found at ${CREDENTIALS_PATH}. ` +
        `Download the OAuth credentials JSON from Google Cloud Console and save it there.`
    );
  }

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(
      `Google auth token not found at ${TOKEN_PATH}. ` +
        `Run the auth flow first: cd ~/mcp-servers/google-drive && node dist/auth.js`
    );
  }

  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf-8"));
  const { client_id, client_secret } = credentials.installed;

  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/callback"
  );

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  auth.setCredentials(token);

  drive = google.drive({ version: "v3", auth });
}

// ── Tool implementations ────────────────────────────────────────

async function listFiles(maxResults: number = 10) {
  if (!drive) await authorize();

  const response = await drive.files.list({
    spaces: "drive",
    fields: "files(id, name, mimeType, modifiedTime, createdTime, webViewLink)",
    pageSize: maxResults,
    orderBy: "modifiedTime desc",
    q: "trashed = false",
  });
  return response.data.files || [];
}

async function readFile(fileId: string) {
  if (!drive) await authorize();

  // Get file metadata to check the mimeType
  const meta = await drive.files.get({
    fileId,
    fields: "mimeType, name",
  });

  const mimeType = meta.data.mimeType;

  // Google Workspace files must be exported (they can't be downloaded directly)
  if (mimeType === "application/vnd.google-apps.document") {
    const res = await drive.files.export(
      { fileId, mimeType: "text/plain" },
      { responseType: "text" }
    );
    return res.data;
  } else if (mimeType === "application/vnd.google-apps.spreadsheet") {
    const res = await drive.files.export(
      { fileId, mimeType: "text/csv" },
      { responseType: "text" }
    );
    return res.data;
  } else if (mimeType === "application/vnd.google-apps.presentation") {
    const res = await drive.files.export(
      { fileId, mimeType: "text/plain" },
      { responseType: "text" }
    );
    return res.data;
  } else {
    // Regular files (PDFs, images, text, etc.) — download directly
    const file = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "text" }
    );
    return file.data;
  }
}

async function createDoc(title: string, content: string) {
  if (!drive) await authorize();

  const fileMetadata = {
    name: title,
    mimeType: "application/vnd.google-apps.document",
  };

  const media = {
    mimeType: "text/plain",
    body: content,
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: "id, name, webViewLink",
  });

  return response.data;
}

async function shareFile(
  fileId: string,
  email: string,
  role: string = "reader"
) {
  if (!drive) await authorize();

  await drive.permissions.create({
    fileId,
    requestBody: {
      role,
      type: "user",
      emailAddress: email,
    },
  });

  return { success: true };
}

// ── MCP Server ──────────────────────────────────────────────────

const server = new Server(
  {
    name: "google-drive-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool discovery — Claude Code calls this to find out what tools are available
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_files",
        description:
          "List recent files from Google Drive, sorted by last modified",
        inputSchema: {
          type: "object" as const,
          properties: {
            max_results: {
              type: "number",
              description: "Maximum number of files to return (default: 10)",
            },
          },
        },
      },
      {
        name: "create_doc",
        description: "Create a new Google Doc in Google Drive",
        inputSchema: {
          type: "object" as const,
          properties: {
            title: { type: "string", description: "Document title" },
            content: {
              type: "string",
              description: "Document content as plain text",
            },
          },
          required: ["title", "content"],
        },
      },
      {
        name: "read_file",
        description:
          "Read the content of a file from Google Drive by its file ID. Supports Google Docs, Sheets, Slides, and regular files.",
        inputSchema: {
          type: "object" as const,
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
        description: "Share a Google Drive file with another user by email",
        inputSchema: {
          type: "object" as const,
          properties: {
            file_id: {
              type: "string",
              description: "The Google Drive file ID",
            },
            email: {
              type: "string",
              description: "Email address to share with",
            },
            role: {
              type: "string",
              description:
                "Permission role: reader, commenter, or writer (default: reader)",
            },
          },
          required: ["file_id", "email"],
        },
      },
    ],
  };
});

// Tool execution — Claude Code calls this when using a tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const toolName = request.params.name;
    const args = request.params.arguments || {};

    let result: string;

    switch (toolName) {
      case "list_files": {
        const maxResults =
          typeof args.max_results === "number" ? args.max_results : 10;
        const files = await listFiles(maxResults);
        result = JSON.stringify(files, null, 2);
        break;
      }

      case "read_file": {
        const fileId = args.file_id as string;
        const content = await readFile(fileId);
        result = typeof content === "string" ? content : JSON.stringify(content);
        break;
      }

      case "create_doc": {
        const title = args.title as string;
        const content = args.content as string;
        const doc = await createDoc(title, content);
        result = `Document created: ${doc.name}\nView: ${doc.webViewLink}`;
        break;
      }

      case "share_file": {
        const fileId = args.file_id as string;
        const email = args.email as string;
        const role = (args.role as string) || "reader";
        await shareFile(fileId, email, role);
        result = `File shared with ${email} as ${role}`;
        break;
      }

      default:
        result = `Unknown tool: ${toolName}`;
    }

    return {
      content: [{ type: "text", text: result }],
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `Error: ${errorMsg}` }],
      isError: true,
    };
  }
});

// ── Start server ────────────────────────────────────────────────

// Don't authorize at startup — authorize lazily when a tool is called.
// This prevents startup failures from crashing the MCP server before
// Claude Code can even discover the tools.
(async () => {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    process.stderr.write(`Failed to start server: ${error}\n`);
    process.exit(1);
  }
})();
