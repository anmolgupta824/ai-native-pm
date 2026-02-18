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

// Reuse Google Drive credentials if they exist (same Google Cloud project)
const DRIVE_CREDENTIALS_PATH = path.join(HOME, ".google-drive-credentials.json");
const SHEETS_CREDENTIALS_PATH = path.join(HOME, ".google-sheets-credentials.json");
const TOKEN_PATH = path.join(HOME, ".google-sheets-token.json");

function getCredentialsPath(): string {
  if (fs.existsSync(DRIVE_CREDENTIALS_PATH)) {
    return DRIVE_CREDENTIALS_PATH;
  }
  if (fs.existsSync(SHEETS_CREDENTIALS_PATH)) {
    return SHEETS_CREDENTIALS_PATH;
  }
  throw new Error(
    `Google credentials not found. Looked for:\n` +
      `  ${DRIVE_CREDENTIALS_PATH} (from Google Drive lesson)\n` +
      `  ${SHEETS_CREDENTIALS_PATH}\n\n` +
      `If you completed Lesson 4 (Google Drive), the credentials should already be there.\n` +
      `Otherwise, download the OAuth credentials JSON from Google Cloud Console.`
  );
}

let sheets: any = null;
let driveClient: any = null;

async function authorize() {
  const credentialsPath = getCredentialsPath();

  if (!fs.existsSync(TOKEN_PATH)) {
    throw new Error(
      `Google auth token not found at ${TOKEN_PATH}. ` +
        `Run the auth flow first: cd ~/mcp-servers/google-sheets && node dist/auth.js`
    );
  }

  const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf-8"));
  const { client_id, client_secret } = credentials.installed;

  const auth = new google.auth.OAuth2(
    client_id,
    client_secret,
    "http://localhost:3000/callback"
  );

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf-8"));
  auth.setCredentials(token);

  sheets = google.sheets({ version: "v4", auth });
  driveClient = google.drive({ version: "v3", auth });
}

// ── Tool implementations ────────────────────────────────────────

async function listSpreadsheets(maxResults: number = 10) {
  if (!sheets) await authorize();

  // Use Drive API to find spreadsheets (Sheets API doesn't have a list endpoint)
  const response = await driveClient.files.list({
    spaces: "drive",
    fields: "files(id, name, modifiedTime, createdTime, webViewLink)",
    pageSize: maxResults,
    orderBy: "modifiedTime desc",
    q: "mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
  });

  return response.data.files || [];
}

async function readSheet(
  spreadsheetId: string,
  range?: string
) {
  if (!sheets) await authorize();

  // If no range specified, get spreadsheet metadata first to find sheet names
  if (!range) {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "properties.title,sheets.properties.title",
    });

    const sheetNames = meta.data.sheets?.map(
      (s: any) => s.properties?.title
    ) || [];

    // Default to first sheet, all data
    range = sheetNames[0] ? `'${sheetNames[0]}'` : "Sheet1";
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values || [];

  // Get spreadsheet title for context
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "properties.title",
  });

  return {
    spreadsheetTitle: meta.data.properties?.title || "Unknown",
    range: response.data.range || range,
    totalRows: rows.length,
    data: rows,
  };
}

async function writeToSheet(
  spreadsheetId: string,
  range: string,
  values: string[][],
  mode: "overwrite" | "append" = "append"
) {
  if (!sheets) await authorize();

  let response;

  if (mode === "append") {
    response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values },
    });
  } else {
    response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });
  }

  // Get spreadsheet title for context
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "properties.title,spreadsheetUrl",
  });

  return {
    spreadsheetTitle: meta.data.properties?.title || "Unknown",
    updatedRange: response.data.updates?.updatedRange || range,
    updatedRows: response.data.updates?.updatedRows || values.length,
    updatedCells: response.data.updates?.updatedCells || 0,
    url: meta.data.spreadsheetUrl || "",
  };
}

async function createSpreadsheet(
  title: string,
  sheetNames?: string[],
  headerRow?: string[],
  dataRows?: string[][]
) {
  if (!sheets) await authorize();

  // Build the spreadsheet creation request
  const requestBody: any = {
    properties: { title },
  };

  // Add custom sheet names if provided
  if (sheetNames && sheetNames.length > 0) {
    requestBody.sheets = sheetNames.map((name) => ({
      properties: { title: name },
    }));
  }

  const response = await sheets.spreadsheets.create({
    requestBody,
    fields: "spreadsheetId,spreadsheetUrl,properties.title,sheets.properties.title",
  });

  const spreadsheetId = response.data.spreadsheetId;
  const firstSheet =
    response.data.sheets?.[0]?.properties?.title || "Sheet1";

  // Write header and data if provided
  if (headerRow || dataRows) {
    const allRows: string[][] = [];
    if (headerRow) allRows.push(headerRow);
    if (dataRows) allRows.push(...dataRows);

    if (allRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'${firstSheet}'!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: allRows },
      });
    }
  }

  return {
    spreadsheetId,
    title: response.data.properties?.title || title,
    url: response.data.spreadsheetUrl,
    sheets: response.data.sheets?.map((s: any) => s.properties?.title) || [],
  };
}

// ── MCP Server ──────────────────────────────────────────────────

const server = new Server(
  {
    name: "google-sheets-mcp",
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
        name: "list_spreadsheets",
        description:
          "List recent Google Sheets spreadsheets, sorted by last modified. Use this to find spreadsheet IDs for other operations.",
        inputSchema: {
          type: "object" as const,
          properties: {
            max_results: {
              type: "number",
              description: "Maximum number of spreadsheets to return (default: 10)",
            },
          },
        },
      },
      {
        name: "read_sheet",
        description:
          "Read data from a Google Sheets spreadsheet. Returns all rows and columns from the specified range. If no range is given, reads the entire first sheet.",
        inputSchema: {
          type: "object" as const,
          properties: {
            spreadsheet_id: {
              type: "string",
              description:
                "The spreadsheet ID (from the URL or list_spreadsheets). Example: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'",
            },
            range: {
              type: "string",
              description:
                "A1 notation range to read (e.g., 'Sheet1!A1:D10', 'Sheet1', 'A1:C5'). Optional — reads entire first sheet if not specified.",
            },
          },
          required: ["spreadsheet_id"],
        },
      },
      {
        name: "write_to_sheet",
        description:
          "Write data to a Google Sheets spreadsheet. Can append new rows or overwrite a specific range. Each row is an array of cell values.",
        inputSchema: {
          type: "object" as const,
          properties: {
            spreadsheet_id: {
              type: "string",
              description: "The spreadsheet ID",
            },
            range: {
              type: "string",
              description:
                "A1 notation range to write to (e.g., 'Sheet1!A1', 'Sheet1!A:D'). For append mode, this defines which columns to use.",
            },
            values: {
              type: "array",
              description:
                'Array of rows, where each row is an array of cell values. Example: [["Name", "Score"], ["Alice", "95"], ["Bob", "87"]]',
              items: {
                type: "array",
                items: { type: "string" },
              },
            },
            mode: {
              type: "string",
              enum: ["append", "overwrite"],
              description:
                "Write mode: 'append' adds rows after existing data (default), 'overwrite' replaces the specified range.",
            },
          },
          required: ["spreadsheet_id", "range", "values"],
        },
      },
      {
        name: "create_spreadsheet",
        description:
          "Create a new Google Sheets spreadsheet. Optionally set custom sheet names, a header row, and initial data rows.",
        inputSchema: {
          type: "object" as const,
          properties: {
            title: {
              type: "string",
              description: "The title of the new spreadsheet",
            },
            sheet_names: {
              type: "array",
              items: { type: "string" },
              description:
                "Custom names for the sheets/tabs (e.g., ['Summary', 'Raw Data']). Optional — defaults to 'Sheet1'.",
            },
            header_row: {
              type: "array",
              items: { type: "string" },
              description:
                "Column headers for the first row (e.g., ['Name', 'Email', 'Status']). Optional.",
            },
            data_rows: {
              type: "array",
              description:
                "Initial data rows to populate after the header. Each row is an array of values.",
              items: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
          required: ["title"],
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
      case "list_spreadsheets": {
        const maxResults =
          typeof args.max_results === "number" ? args.max_results : 10;
        const files = await listSpreadsheets(maxResults);
        result = JSON.stringify(files, null, 2);
        break;
      }

      case "read_sheet": {
        const spreadsheetId = args.spreadsheet_id as string;
        const range = args.range as string | undefined;
        const data = await readSheet(spreadsheetId, range);
        result = JSON.stringify(data, null, 2);
        break;
      }

      case "write_to_sheet": {
        const spreadsheetId = args.spreadsheet_id as string;
        const range = args.range as string;
        const values = args.values as string[][];
        const mode = (args.mode as "append" | "overwrite") || "append";
        const writeResult = await writeToSheet(
          spreadsheetId,
          range,
          values,
          mode
        );
        result = JSON.stringify(writeResult, null, 2);
        break;
      }

      case "create_spreadsheet": {
        const title = args.title as string;
        const sheetNames = args.sheet_names as string[] | undefined;
        const headerRow = args.header_row as string[] | undefined;
        const dataRows = args.data_rows as string[][] | undefined;
        const created = await createSpreadsheet(
          title,
          sheetNames,
          headerRow,
          dataRows
        );
        result = `Spreadsheet created: ${created.title}\nID: ${created.spreadsheetId}\nURL: ${created.url}`;
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
