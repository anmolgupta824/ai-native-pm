# Lesson 6: Google Sheets Integration

**Estimated reading time: 45 minutes**
**Lesson type: Hands-on build**

---

## What You'll Learn

By the end of this lesson, you will have:

- The Google Sheets API enabled in your Google Cloud project
- A working MCP server that connects Claude to Google Sheets
- Four tools: `list_sheets`, `read_range`, `write_range`, `create_sheet`
- Mastery of A1 notation (how Sheets references cells and ranges)
- A real workflow combining Sheets and Drive

If you completed Lesson 5 (Google Drive), you already have a Google Cloud project and OAuth credentials. This lesson builds on that foundation.

---

## Why Google Sheets?

PMs use spreadsheets constantly. Team capacity planning, feature prioritization matrices, bug tracking, OKR scorecards, launch checklists -- the list is endless.

Connecting Claude to Sheets means:

- **Read data for analysis.** "Summarize the team capacity spreadsheet and flag anyone who is over-allocated."
- **Write data from other sources.** "Take the sprint velocity from Jira and update our tracking sheet."
- **Generate reports.** "Create a new sheet with this quarter's feature prioritization matrix."
- **Cross-reference data.** "Compare the budget spreadsheet against actual spend and highlight variances."

---

## Step 1: Enable the Google Sheets API

If you completed Lesson 5, you already have a Google Cloud project. We just need to enable one more API.

### 1a: Enable the Sheets API

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Make sure your `Claude MCP Server` project is selected
3. Go to **"APIs & Services"** then **"Library"**
4. Search for **"Google Sheets API"**
5. Click on it
6. Click **"Enable"**

### 1b: Update OAuth Scopes

We need to add Sheets-specific scopes to our OAuth consent screen.

1. Go to **"APIs & Services"** then **"OAuth consent screen"**
2. Click **"Edit App"**
3. Click through to the **Scopes** page
4. Click **"Add or Remove Scopes"**
5. Search for and add:
   - `https://www.googleapis.com/auth/spreadsheets` (read and write sheets)
6. Click **"Update"** then **"Save and Continue"** through the remaining pages

### 1c: Reuse or Create Credentials

You can reuse the OAuth Client ID from Lesson 5. The same Client ID and Client Secret work for both Drive and Sheets, as long as the scopes are configured.

If you did not complete Lesson 5, follow Steps 1a through 1d in that lesson to create a Google Cloud project and OAuth credentials.

---

## Step 2: Understanding A1 Notation

Before building the server, you need to understand how Google Sheets references cells. This is called **A1 notation**, and you have been using it in spreadsheets your whole career -- you just might not have known it had a name.

### The Basics

Every cell in a spreadsheet has an address made up of a **column letter** and a **row number**:

```
    A       B       C       D
1 | Name  | Role  | Team  | Capacity |
2 | Sarah | Eng   | Alpha | 80%      |
3 | James | Eng   | Alpha | 100%     |
4 | Priya | PM    | Beta  | 60%      |
5 | Marco | Design| Beta  | 90%      |
```

- `A1` = "Name" (column A, row 1)
- `D3` = "100%" (column D, row 3)
- `B4` = "PM" (column B, row 4)

### Ranges

A **range** is a rectangular block of cells, specified as `TopLeft:BottomRight`:

- `A1:D1` = The header row ("Name", "Role", "Team", "Capacity")
- `A2:A5` = All names ("Sarah", "James", "Priya", "Marco")
- `A1:D5` = The entire table
- `D2:D5` = All capacity values ("80%", "100%", "60%", "90%")

### Sheet Names

If your spreadsheet has multiple sheets (tabs), you specify which one:

- `Sheet1!A1:D5` = Cells A1 through D5 on the sheet named "Sheet1"
- `Team Capacity!A1:D5` = Same range on a sheet named "Team Capacity"
- If the sheet name has spaces, wrap it in single quotes: `'Team Capacity'!A1:D5`

### Common Ranges You Will Use

| What You Want | A1 Notation | Explanation |
|--------------|-------------|-------------|
| Entire first row | `A1:Z1` | Row 1, all columns through Z |
| First column | `A:A` | All of column A |
| Specific block | `B2:D10` | A block from B2 to D10 |
| Whole sheet | `A:Z` | All data in the sheet |
| Named sheet | `'Q1 OKRs'!A1:F20` | Specific range in a named sheet |

**You do not need to memorize this.** When you ask Claude "read the team capacity data," Claude will figure out the right range from context. But knowing A1 notation helps you be more specific when you need to be.

---

## Step 3: Build the Server

### 3a: Create the Project

```
Create a new MCP server project for Google Sheets in
~/mcp-servers/google-sheets-server with package.json,
tsconfig.json, and src/index.ts. Include the MCP SDK
and googleapis as dependencies.
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
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import * as fs from "fs";
import * as path from "path";
import * as http from "http";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const REDIRECT_URI = "http://localhost:3001/oauth2callback";
const TOKEN_PATH = path.join(
  process.env.HOME || process.env.USERPROFILE || "",
  ".mcp-google-sheets-tokens.json"
);
```

**Note:** We use port 3001 here (not 3000) to avoid conflicts if the Drive server is also running. Each server gets its own port for the OAuth callback.

#### OAuth Helper Functions

The OAuth code is identical to Lesson 5, with two small changes: the port (3001) and the scope.

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
    if (
      oauth2Client.credentials.expiry_date &&
      oauth2Client.credentials.expiry_date < Date.now()
    ) {
      const { credentials } = await oauth2Client.refreshAccessToken();
      saveTokens(credentials);
    }
    return;
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      if (req.url?.startsWith("/oauth2callback")) {
        const url = new URL(req.url, "http://localhost:3001");
        const code = url.searchParams.get("code");
        if (code) {
          const { tokens } = await oauth2Client.getToken(code);
          oauth2Client.setCredentials(tokens);
          saveTokens(tokens);
          res.end("Authentication successful! You can close this tab.");
          server.close();
          resolve();
        } else {
          res.end("Authentication failed.");
          server.close();
          reject(new Error("No auth code"));
        }
      }
    });
    server.listen(3001, () => {
      console.error(`Open this URL to authenticate:\n${authUrl}`);
    });
  });
}
```

#### Tool Definitions

```typescript
const server = new Server(
  { name: "google-sheets-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_sheets",
        description:
          "List all sheets (tabs) in a Google Spreadsheet and their properties",
        inputSchema: {
          type: "object",
          properties: {
            spreadsheet_id: {
              type: "string",
              description:
                "The spreadsheet ID (from the URL: docs.google.com/spreadsheets/d/{ID}/edit)",
            },
          },
          required: ["spreadsheet_id"],
        },
      },
      {
        name: "read_range",
        description:
          "Read data from a specified range in a Google Sheet. Uses A1 notation (e.g., 'Sheet1!A1:D10', 'A:C' for entire columns).",
        inputSchema: {
          type: "object",
          properties: {
            spreadsheet_id: {
              type: "string",
              description: "The spreadsheet ID",
            },
            range: {
              type: "string",
              description:
                "The A1 notation range to read (e.g., 'Sheet1!A1:D10')",
            },
          },
          required: ["spreadsheet_id", "range"],
        },
      },
      {
        name: "write_range",
        description:
          "Write data to a specified range in a Google Sheet. Data should be a 2D array where each inner array is a row.",
        inputSchema: {
          type: "object",
          properties: {
            spreadsheet_id: {
              type: "string",
              description: "The spreadsheet ID",
            },
            range: {
              type: "string",
              description:
                "The A1 notation range to write to (e.g., 'Sheet1!A1:D5')",
            },
            values: {
              type: "array",
              description:
                "2D array of values. Each inner array is a row. Example: [['Name', 'Score'], ['Alice', 95], ['Bob', 87]]",
              items: {
                type: "array",
                items: {},
              },
            },
          },
          required: ["spreadsheet_id", "range", "values"],
        },
      },
      {
        name: "create_sheet",
        description:
          "Create a new Google Spreadsheet with an optional initial data set",
        inputSchema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the new spreadsheet",
            },
            sheet_names: {
              type: "array",
              description:
                "Optional: Names for the sheets/tabs (default: ['Sheet1'])",
              items: { type: "string" },
            },
            initial_data: {
              type: "array",
              description:
                "Optional: Initial data as a 2D array for the first sheet",
              items: {
                type: "array",
                items: {},
              },
            },
          },
          required: ["title"],
        },
      },
    ],
  };
});
```

**Notice the descriptions.** Each description includes practical examples and explains the format Claude needs to follow. The better your descriptions, the better Claude will use the tools.

#### Tool Implementations

```typescript
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  await authenticate();
  const sheets = google.sheets({ version: "v4", auth: oauth2Client });
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    switch (name) {
      case "list_sheets": {
        const response = await sheets.spreadsheets.get({
          spreadsheetId: args.spreadsheet_id,
          fields: "sheets.properties",
        });

        const sheetList = response.data.sheets?.map((s) => ({
          name: s.properties?.title,
          index: s.properties?.index,
          id: s.properties?.sheetId,
          rowCount: s.properties?.gridProperties?.rowCount,
          columnCount: s.properties?.gridProperties?.columnCount,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(sheetList, null, 2),
            },
          ],
        };
      }

      case "read_range": {
        const response = await sheets.spreadsheets.values.get({
          spreadsheetId: args.spreadsheet_id,
          range: args.range,
          valueRenderOption: "FORMATTED_VALUE",
        });

        const values = response.data.values || [];

        // Format as a readable table
        let output = `Range: ${args.range}\n`;
        output += `Rows: ${values.length}\n\n`;

        if (values.length > 0) {
          // Use first row as headers if it looks like a header row
          const headers = values[0];
          output += "Data:\n";
          values.forEach((row, i) => {
            if (i === 0) {
              output += `[Header] ${row.join(" | ")}\n`;
              output += "-".repeat(60) + "\n";
            } else {
              output += `[Row ${i}] ${row.join(" | ")}\n`;
            }
          });
        }

        return {
          content: [{ type: "text", text: output }],
        };
      }

      case "write_range": {
        const response = await sheets.spreadsheets.values.update({
          spreadsheetId: args.spreadsheet_id,
          range: args.range,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: args.values,
          },
        });

        return {
          content: [
            {
              type: "text",
              text: `Updated ${response.data.updatedCells} cells in range ${response.data.updatedRange}`,
            },
          ],
        };
      }

      case "create_sheet": {
        // Step 1: Create the spreadsheet
        const sheetProps =
          args.sheet_names?.map((name: string, index: number) => ({
            properties: { title: name, index },
          })) || [];

        const createResponse = await sheets.spreadsheets.create({
          requestBody: {
            properties: { title: args.title },
            sheets:
              sheetProps.length > 0
                ? sheetProps
                : [{ properties: { title: "Sheet1" } }],
          },
        });

        const spreadsheetId = createResponse.data.spreadsheetId;
        const spreadsheetUrl = createResponse.data.spreadsheetUrl;

        // Step 2: Write initial data if provided
        if (args.initial_data && spreadsheetId) {
          const firstSheetName =
            args.sheet_names?.[0] || "Sheet1";
          await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: `'${firstSheetName}'!A1`,
            valueInputOption: "USER_ENTERED",
            requestBody: {
              values: args.initial_data,
            },
          });
        }

        return {
          content: [
            {
              type: "text",
              text: `Created spreadsheet "${args.title}"\nID: ${spreadsheetId}\nURL: ${spreadsheetUrl}`,
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

**Implementation details worth noting:**

**`read_range`**: The `valueRenderOption: "FORMATTED_VALUE"` means you get values as they appear in the sheet (e.g., "$1,234.56" instead of "1234.56" and "75%" instead of "0.75"). This is usually what PMs want -- human-readable data.

**`write_range`**: The `valueInputOption: "USER_ENTERED"` means Google Sheets will interpret the values as if you typed them. This means formulas (like `=SUM(A1:A10)`) will work, dates will be parsed, and numbers will be recognized.

**`create_sheet`**: We can create a spreadsheet with multiple named tabs and optionally pre-populate the first tab with data. This is perfect for creating templated spreadsheets.

#### Start the Server

```typescript
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Google Sheets MCP server running on stdio");
}

main().catch(console.error);
```

---

## Step 4: Finding Spreadsheet IDs

Every Google Sheet has a unique ID, just like Google Docs. You can find it in the URL:

```
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        This is the spreadsheet ID
```

When you tell Claude "read my team capacity spreadsheet," Claude will need this ID. You can either:
1. Give Claude the full URL and it will extract the ID
2. Use `list_files` from the Drive server (Lesson 5) to find the ID
3. Provide the ID directly

---

## Step 5: Register and Test

### Register with Claude

```
Add the google-sheets-server to my Claude configuration.
Server at ~/mcp-servers/google-sheets-server/dist/index.js
Environment variables:
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Test the Tools

#### Test 1: List Sheets
```
List all the tabs in my spreadsheet with ID [your-spreadsheet-id]
```

#### Test 2: Read Data
```
Read the data in cells A1 through D10 from my spreadsheet [ID]
```

#### Test 3: Write Data
```
In my spreadsheet [ID], write these values starting at cell A1:
Header row: Name, Department, Q1 Score, Q2 Score
Row 1: Alice, Engineering, 92, 88
Row 2: Bob, Product, 85, 91
Row 3: Carol, Design, 78, 95
```

#### Test 4: Create a Spreadsheet
```
Create a new Google Spreadsheet called "Sprint Velocity Tracker"
with two tabs: "Velocity" and "Capacity". Pre-fill the Velocity tab
with headers: Sprint, Planned Points, Completed Points, Velocity %.
```

---

## Real PM Workflow: Team Capacity Analysis

Here is a practical workflow that reads real data and provides analysis:

```
Read the data from my team capacity spreadsheet [ID], range 'Capacity'!A1:F20.
Analyze the data and tell me:
1. Who is over 90% capacity (at risk of burnout)?
2. Who is under 50% capacity (available for more work)?
3. What is the average team capacity?
4. Are there any teams that are significantly over or under-loaded?
```

Claude will:
1. Call `read_range` to get the capacity data
2. Analyze the numbers
3. Present findings with specific names and recommendations

---

## Combining Sheets + Drive: The Power Combo

Now that you have both the Sheets server (this lesson) and the Drive server (Lesson 5), you can chain them together for powerful workflows.

### Workflow: Data Analysis to Document

```
1. Read the sprint velocity data from my spreadsheet [ID], range 'Velocity'!A1:H13
2. Calculate the average velocity over the last 6 sprints
3. Identify any sprints where velocity dropped more than 20% from the previous sprint
4. Create a Google Doc called "Sprint Velocity Analysis - Q1 2026" with:
   - Average velocity
   - Velocity trend (improving, declining, or stable)
   - Sprints with significant drops and possible reasons
   - Recommendation for next quarter's sprint planning
```

Claude will:
1. Call Sheets `read_range` to get the velocity data
2. Do the math (Claude is excellent at data analysis)
3. Call Drive `create_doc` to create the analysis document
4. Return a link to the new document

### Workflow: Jira to Sheets Tracking

If you also have the Jira server from Lesson 4:

```
Search Jira for all issues completed in the last sprint (project PROJ).
Count them by type (Bug, Story, Task).
Write a summary row to my tracking spreadsheet [ID] in the
'Sprint History' tab, appending to the next empty row.
```

Claude will:
1. Call Jira `search_issues` to get completed sprint items
2. Count and categorize them
3. Call Sheets `write_range` to append the data

This gives you an automatically updated sprint history spreadsheet.

---

## Understanding valueInputOption

When writing to Sheets, the `valueInputOption` parameter controls how Google interprets the data you send. There are two options:

### RAW
Google stores exactly what you send. The text "=SUM(A1:A10)" is stored as literal text, not as a formula.

**Use when:** You want to store values exactly as-is, no interpretation.

### USER_ENTERED
Google interprets the data as if you typed it into the cell. Formulas are evaluated, dates are parsed, and numbers are formatted.

**Use when:** You want natural behavior (formulas work, dates are recognized).

We use `USER_ENTERED` in our server because it matches how PMs actually interact with spreadsheets.

---

## Troubleshooting

### "Error: The caller does not have permission"
**Cause:** Your OAuth token does not have the Sheets scope.
**Fix:** Delete `~/.mcp-google-sheets-tokens.json`, make sure the spreadsheets scope is in the OAuth consent screen, and re-authenticate.

### "Error: Requested entity was not found"
**Cause:** The spreadsheet ID is wrong or you do not have access.
**Fix:** Double-check the ID from the spreadsheet URL. Make sure the spreadsheet is shared with you or owned by you.

### "Error: Unable to parse range"
**Cause:** Invalid A1 notation.
**Fix:** Check the range format. Common mistakes:
- Missing sheet name for multi-sheet spreadsheets
- Using commas instead of colons (A1,D5 vs A1:D5)
- Sheet names with spaces not wrapped in single quotes

### Write Returns 0 Updated Cells
**Cause:** The range and data dimensions do not match.
**Fix:** If you are writing 3 rows of 4 columns, the range should cover at least 3 rows and 4 columns (e.g., A1:D3).

### Authentication Fails on Port 3001
**Cause:** You need to add `http://localhost:3001/oauth2callback` as a redirect URI in your Google Cloud credentials.
**Fix:** Go to APIs & Services > Credentials > Your OAuth Client ID > Add `http://localhost:3001/oauth2callback` as an authorized redirect URI.

---

## Quick Check

1. What does A1 notation `'Sales Data'!B2:E10` mean?
2. What is the difference between `RAW` and `USER_ENTERED` value input options?
3. Where do you find a spreadsheet's ID?
4. How would you ask Claude to read your capacity spreadsheet? (Natural language, not code.)

---

*Previous: [Lesson 5: Google Drive Integration](5-google-drive.md)*
*Next: [Lesson 7: Building Custom MCP Servers](7-custom-servers.md)*
