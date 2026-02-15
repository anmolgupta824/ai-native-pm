import { LessonContent } from "./1-welcome";

const lesson: LessonContent = {
  number: 6,
  title: "Connect to Google Sheets",
  duration: "45 min",
  objectives: [
    "Enable the Google Sheets API in your existing Google Cloud project",
    "Understand A1 notation for referencing cells and ranges",
    "Build an MCP server with four Google Sheets tools",
    "Use Claude to read sprint data and write summaries to Sheets",
  ],
  content: `# Connect to Google Sheets

## What We Are Building

In this lesson, you will build a Google Sheets MCP server with four tools:

1. **sheets_list_sheets** — List all sheet tabs in a spreadsheet
2. **sheets_read_range** — Read data from a specific range
3. **sheets_write_range** — Write data to a specific range
4. **sheets_create_sheet** — Create a new sheet tab in a spreadsheet

Sheets is where PMs live. Sprint trackers, roadmaps, capacity plans, OKR trackers, feature prioritization matrices — they all live in Sheets. Being able to read and write Sheets data through Claude is one of the highest-value MCP skills.

---

## Step 1: Enable the Sheets API

If you already set up Google Cloud in Lesson 5 (Google Drive), you just need to enable one more API:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Make sure your "MCP Integrations" project is selected
3. Go to **APIs & Services > Library**
4. Search for **"Google Sheets API"**
5. Click on it and click **"Enable"**

If you already completed Lesson 5, your OAuth credentials and token already have the right scopes. If you are doing this lesson standalone, follow the OAuth setup steps from Lesson 5 first, but add this scope to your auth helper:

\`\`\`typescript
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
];
\`\`\`

---

## Step 2: Understanding A1 Notation

Before we build the server, you need to understand how Sheets references work. If you have ever typed a formula in Google Sheets or Excel, you already know the basics.

### The Basics

A1 notation uses the column letter and row number to identify a cell:

\`\`\`
    A     B     C     D
1  Name  Team  Points Status
2  Alice Eng   8     Done
3  Bob   Design 5    In Progress
4  Carol Eng   13    Done
\`\`\`

- \`A1\` = "Name" (column A, row 1)
- \`C3\` = "5" (column C, row 3)
- \`D2\` = "Done" (column D, row 2)

### Ranges

A range specifies a rectangular area using two corners:

- \`A1:D1\` = the header row ("Name", "Team", "Points", "Status")
- \`A1:D4\` = the entire table (4 rows, 4 columns)
- \`A2:A4\` = just the names column ("Alice", "Bob", "Carol")
- \`B2:C4\` = team and points for all people

### Sheet-Specific Ranges

If your spreadsheet has multiple tabs (sheets), specify which one:

- \`Sheet1!A1:D10\` = range A1:D10 in the tab named "Sheet1"
- \`Sprint 23!A1:F50\` = range A1:F50 in the tab named "Sprint 23"
- \`Capacity!A:A\` = the entire column A in the "Capacity" tab

### Entire Rows and Columns

- \`A:A\` = the entire column A
- \`1:1\` = the entire row 1
- \`A:D\` = columns A through D (all rows)

### Quick Reference

| Notation | What It Selects |
|----------|----------------|
| \`A1\` | Single cell |
| \`A1:D1\` | A row of cells |
| \`A1:A10\` | A column of cells |
| \`A1:D10\` | A rectangular area |
| \`Sheet1!A1:D10\` | Area in a specific sheet tab |
| \`A:A\` | Entire column |
| \`1:1\` | Entire row |

---

## Step 3: Finding Your Spreadsheet ID

Every Google Sheet has a unique ID in its URL:

\`\`\`
https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                       |______________________________________________|
                                              This is the spreadsheet ID
\`\`\`

You will need this ID when calling the Sheets API. Claude can also find it by listing Drive files and looking for spreadsheets.

---

## Step 4: Build the Server

Create your project (or extend the Google Drive server — they can share the same OAuth credentials):

\`\`\`bash
mkdir -p google-sheets-mcp-server/src
cd google-sheets-mcp-server
\`\`\`

Use the same package.json and tsconfig.json from Lesson 5, and copy the auth.ts file (updating the scopes to include \`https://www.googleapis.com/auth/spreadsheets\`).

### src/index.ts — Server Setup

\`\`\`typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { google } from "googleapis";
import { getAuthClient } from "./auth.js";

// --- Initialize Google Sheets client ---
const auth = await getAuthClient();
const sheets = google.sheets({ version: "v4", auth });

// --- Create the MCP Server ---
const server = new McpServer({
  name: "google-sheets-mcp-server",
  version: "1.0.0",
});
\`\`\`

---

## Step 5: Add Tool 1 — List Sheet Tabs

\`\`\`typescript
server.tool(
  "sheets_list_sheets",
  "List all sheet tabs in a Google Spreadsheet. Returns the name, ID, row count, and column count for each tab.",
  {
    spreadsheetId: z
      .string()
      .describe(
        "The ID of the Google Spreadsheet (found in the spreadsheet URL between /d/ and /edit)"
      ),
  },
  async ({ spreadsheetId }) => {
    const response = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties",
    });

    const sheetList = (response.data.sheets || []).map((sheet) => ({
      name: sheet.properties?.title,
      sheetId: sheet.properties?.sheetId,
      rowCount: sheet.properties?.gridProperties?.rowCount,
      columnCount: sheet.properties?.gridProperties?.columnCount,
    }));

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              spreadsheetId,
              sheetCount: sheetList.length,
              sheets: sheetList,
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
- Takes a spreadsheet ID
- Calls the Sheets API to get metadata about the spreadsheet
- Returns the name and size of each sheet tab

**When Claude will use it:** "What sheets are in my sprint tracker?" or "Show me the tabs in this spreadsheet."

---

## Step 6: Add Tool 2 — Read Range

This is the most important Sheets tool. It reads data from a specified range.

\`\`\`typescript
server.tool(
  "sheets_read_range",
  "Read data from a specific range in a Google Spreadsheet. Uses A1 notation (e.g., 'Sheet1!A1:D10'). Returns the data as a 2D array of rows and columns.",
  {
    spreadsheetId: z
      .string()
      .describe("The ID of the Google Spreadsheet"),
    range: z
      .string()
      .describe(
        "The A1 notation range to read. Examples: 'Sheet1!A1:D10', 'A1:C50', 'Sprint 23!A:F'"
      ),
  },
  async ({ spreadsheetId, range }) => {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
      valueRenderOption: "FORMATTED_VALUE",
    });

    const values = response.data.values || [];

    // If there is data, create a structured version with headers
    let structured = null;
    if (values.length > 1) {
      const headers = values[0];
      const rows = values.slice(1).map((row) => {
        const obj: Record<string, any> = {};
        headers.forEach((header: string, i: number) => {
          obj[header] = row[i] || "";
        });
        return obj;
      });
      structured = rows;
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              range: response.data.range,
              rowCount: values.length,
              columnCount: values[0]?.length || 0,
              headers: values[0] || [],
              rawData: values,
              ...(structured ? { structuredData: structured } : {}),
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
- Reads data from the specified range
- Returns both raw data (2D array) and structured data (array of objects with headers as keys)
- Uses \`FORMATTED_VALUE\` to return values as they appear in the sheet (with formatting applied)

**Why structured data matters:** Raw data comes back as arrays like \`[["Alice", "Eng", "8"], ["Bob", "Design", "5"]]\`. The structured version converts this to \`[{"Name": "Alice", "Team": "Eng", "Points": "8"}, ...]\`, which is much easier for Claude to work with.

**When Claude will use it:** "Read the sprint capacity data from Sheet1," "What are the OKR scores in the Q1 tab?"

---

## Step 7: Add Tool 3 — Write Range

\`\`\`typescript
server.tool(
  "sheets_write_range",
  "Write data to a specific range in a Google Spreadsheet. Can write a single cell, a row, or multiple rows. Overwrites existing data in the specified range.",
  {
    spreadsheetId: z
      .string()
      .describe("The ID of the Google Spreadsheet"),
    range: z
      .string()
      .describe(
        "The A1 notation range to write to. Examples: 'Sheet1!A1', 'Sheet1!A5:D5', 'Summary!A1:C10'"
      ),
    values: z
      .array(z.array(z.union([z.string(), z.number(), z.boolean()])))
      .describe(
        "The data to write as a 2D array (array of rows). Example: [['Name', 'Score'], ['Alice', 95], ['Bob', 87]]"
      ),
  },
  async ({ spreadsheetId, range, values }) => {
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: "Data written successfully",
              updatedRange: response.data.updatedRange,
              updatedRows: response.data.updatedRows,
              updatedColumns: response.data.updatedColumns,
              updatedCells: response.data.updatedCells,
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
- Writes a 2D array of data to the specified range
- Uses \`USER_ENTERED\` value input option, which means formulas and date formats will be interpreted (just like typing into a cell)
- Returns confirmation of what was updated

**Important: USER_ENTERED vs RAW**
- \`USER_ENTERED\` — Values are parsed as if a user typed them. \`=SUM(A1:A5)\` becomes a formula, \`1/2/2026\` becomes a date.
- \`RAW\` — Values are stored exactly as provided. \`=SUM(A1:A5)\` is stored as the literal text "=SUM(A1:A5)".

For most PM use cases, \`USER_ENTERED\` is what you want.

**When Claude will use it:** "Add a summary row at the bottom of the sprint tracker," "Write these OKR scores to the Q1 sheet."

---

## Step 8: Add Tool 4 — Create a New Sheet Tab

\`\`\`typescript
server.tool(
  "sheets_create_sheet",
  "Create a new sheet tab in an existing Google Spreadsheet. Optionally set the number of rows and columns.",
  {
    spreadsheetId: z
      .string()
      .describe("The ID of the Google Spreadsheet"),
    title: z
      .string()
      .describe("The name for the new sheet tab"),
    rowCount: z
      .number()
      .optional()
      .describe("Number of rows for the new sheet (default: 1000)"),
    columnCount: z
      .number()
      .optional()
      .describe("Number of columns for the new sheet (default: 26)"),
  },
  async ({ spreadsheetId, title, rowCount, columnCount }) => {
    const response = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
                gridProperties: {
                  rowCount: rowCount || 1000,
                  columnCount: columnCount || 26,
                },
              },
            },
          },
        ],
      },
    });

    const newSheet = response.data.replies?.[0]?.addSheet?.properties;

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(
            {
              message: \`Sheet tab "\${title}" created successfully\`,
              sheetId: newSheet?.sheetId,
              title: newSheet?.title,
              rowCount: newSheet?.gridProperties?.rowCount,
              columnCount: newSheet?.gridProperties?.columnCount,
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
- Creates a new tab in an existing spreadsheet
- Optionally sets the grid dimensions
- Returns the new tab's metadata

**When Claude will use it:** "Create a new tab called 'Sprint 24' in the sprint tracker," "Add a 'Summary' sheet to the capacity planning spreadsheet."

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
npm run build
\`\`\`

Configure in Claude Code:

\`\`\`json
{
  "mcpServers": {
    "google-sheets": {
      "command": "node",
      "args": ["/absolute/path/to/google-sheets-mcp-server/build/index.js"]
    }
  }
}
\`\`\`

---

## Real PM Workflow: Sprint Capacity Analysis

Here is a powerful workflow that combines Sheets with your other MCP servers.

Imagine you have a sprint capacity spreadsheet like this:

\`\`\`
    A          B          C           D          E
1  Name       Team       Capacity    Assigned   Available
2  Alice      Eng        8           6          2
3  Bob        Eng        8           9          -1
4  Carol      Design     5           3          2
5  Dave       Eng        8           7          1
\`\`\`

Try this prompt:

> "Read the sprint capacity data from my Sprint Tracker spreadsheet (tab 'Sprint 24', range A1:E10). Summarize who is over capacity, who has available bandwidth, and what the total team capacity looks like. Then write a summary row at the bottom."

Claude will:
1. Call \`sheets_read_range\` to read the data
2. Analyze the numbers (Bob is over capacity!)
3. Call \`sheets_write_range\` to add a summary row
4. Give you a natural language summary

Or combine with Jira:

> "Read the sprint capacity from the Sheets tracker, then search Jira for all unassigned issues in the current sprint. Suggest which team members should pick up the unassigned work based on their available capacity."

---

## Common Gotchas

### 1. Sheet Tab Names with Spaces
If your sheet tab name has spaces, it still works in A1 notation: \`'Sprint 24'!A1:D10\`. The Sheets API handles this correctly.

### 2. Empty Cells
Empty cells at the end of a row are not included in the response. If row 3 has data in columns A and B but C and D are empty, the API returns \`["Alice", "Eng"]\` not \`["Alice", "Eng", "", ""]\`. Your code should handle rows of different lengths.

### 3. Data Types
The API returns everything as strings by default with \`FORMATTED_VALUE\`. The number 42 comes back as \`"42"\`. If you need actual numbers, use \`UNFORMATTED_VALUE\` as the valueRenderOption.

### 4. Rate Limits
Google Sheets API has rate limits. If you are reading and writing rapidly, you may hit a 429 error. Add error handling for rate limits and retry after a short delay.

---

## Summary

You now have a Google Sheets MCP server. The key concepts:

1. **A1 notation** is how you reference cells and ranges (e.g., \`Sheet1!A1:D10\`)
2. **Spreadsheet ID** is in the URL and identifies which spreadsheet to access
3. **Read and write** operations are the core of Sheets automation
4. **USER_ENTERED** input mode interprets values like a user would type them
5. **Structured data** (converting arrays to objects with headers) makes API responses much more useful for Claude
6. **Combining Sheets with Jira and Drive** creates powerful PM workflows
`,
  exercise: {
    title: "Read and Write Sprint Data in Google Sheets",
    description:
      "Connect your Sheets MCP server and practice reading data from a test spreadsheet and writing a summary row.",
    steps: [
      "Create a test spreadsheet in Google Sheets with some sample sprint data. Use columns: Name, Team, Story Points, Status. Add 5-6 rows of sample data.",
      "Copy the spreadsheet ID from the URL (the long string between /d/ and /edit)",
      "Enable the Google Sheets API in your Google Cloud project if you have not already",
      "Build the MCP server from this lesson and configure it in Claude Code",
      "Test: \"List the sheet tabs in spreadsheet [your-spreadsheet-id]\"",
      "Test: \"Read the data from Sheet1!A1:D7 in spreadsheet [your-spreadsheet-id]\"",
      "Test: \"Write a summary row in Sheet1 at row 8 with 'Total', '', '=SUM(C2:C7)', '' in spreadsheet [your-spreadsheet-id]\"",
      "Open your spreadsheet in the browser and verify the summary row was added with a working SUM formula",
      "Try a natural language request: \"Read all the data from my sprint tracker spreadsheet and tell me how many story points are completed vs in progress\"",
    ],
    validation:
      "You have successfully completed this exercise if: (1) Claude can list the sheet tabs, (2) Claude can read and display your sprint data, (3) A summary row with a SUM formula was written to the spreadsheet and works correctly, and (4) Claude can analyze the data and give you a meaningful summary.",
  },
  quiz: {
    questions: [
      {
        question:
          "What does the A1 notation 'Sprint 23!B2:D10' refer to?",
        options: [
          "Cells B2 through D10 in the first sheet tab",
          "Cells B2 through D10 in the sheet tab named 'Sprint 23'",
          "The entire column B in the 'Sprint 23' tab",
          "Rows 2 through 10 across all sheet tabs",
        ],
        correctIndex: 1,
        explanation:
          "A1 notation uses the format 'SheetName!Range'. 'Sprint 23!B2:D10' refers to the rectangular area from cell B2 to D10 in the sheet tab named 'Sprint 23'. The exclamation mark separates the sheet name from the cell range.",
      },
      {
        question:
          "What is the difference between USER_ENTERED and RAW value input options?",
        options: [
          "USER_ENTERED writes faster than RAW",
          "USER_ENTERED interprets formulas and dates like a user typing them; RAW stores values as literal text",
          "RAW is for text data and USER_ENTERED is for numeric data",
          "There is no difference; they are aliases for the same option",
        ],
        correctIndex: 1,
        explanation:
          "With USER_ENTERED, values are parsed as if a user typed them into the Sheets UI. The text '=SUM(A1:A5)' becomes a formula, '1/2/2026' becomes a date. With RAW, values are stored exactly as provided — '=SUM(A1:A5)' would appear as literal text in the cell, not as a formula.",
      },
      {
        question:
          "Where do you find a Google Spreadsheet's ID?",
        options: [
          "In the sheet tab names at the bottom",
          "In the spreadsheet URL between /d/ and /edit",
          "In the Google Cloud Console under API settings",
          "In the File > Properties menu in Google Sheets",
        ],
        correctIndex: 1,
        explanation:
          "The spreadsheet ID is the long string in the URL between '/d/' and '/edit'. For example, in 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit', the ID is '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms'.",
      },
      {
        question:
          "Why does the sheets_read_range tool return both rawData and structuredData?",
        options: [
          "structuredData is compressed for faster processing",
          "rawData is a 2D array while structuredData converts rows to objects using headers as keys, making it easier for Claude to understand the data",
          "rawData is for reading and structuredData is for writing",
          "They contain different subsets of the data",
        ],
        correctIndex: 1,
        explanation:
          "rawData returns the sheet data as a 2D array like [['Name', 'Score'], ['Alice', '95']]. structuredData uses the first row as headers and converts remaining rows to objects: [{'Name': 'Alice', 'Score': '95'}]. The structured format is much easier for Claude to reason about when analyzing data or answering questions.",
      },
    ],
  },
};

export default lesson;
