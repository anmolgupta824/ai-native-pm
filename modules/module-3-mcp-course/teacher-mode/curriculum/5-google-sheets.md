# Lesson 5: Google Sheets Integration

**Estimated time: 20 minutes**
**Lesson type: Hands-on with Claude**

---

## Why Connect Google Sheets to Claude?

Spreadsheets are the PM's secret weapon. OKR trackers, sprint velocity, feature requests, bug counts, user feedback logs -- if it has rows and columns, it's probably in Sheets.

But pulling data from sheets, formatting it, and turning it into insights takes time. With Claude connected to Sheets, you can:

- "What's our OKR progress this quarter? Pull the numbers from the tracker."
- "Add a new row to the feature requests sheet with this feedback I just got."
- "Create a chart-ready summary of our sprint velocity for the last 6 sprints."
- "Compare this month's bug count to last month from the bug tracker sheet."

### Think of It Like a Data Assistant

You already know where your data lives. Claude just makes it faster to get answers from it. Instead of opening the sheet, scrolling around, filtering columns, and copying numbers into a summary -- you just ask.

---

## Get Your Credentials

Google Sheets uses the same Google API access as Google Drive. If you already set up Drive in the previous lesson, you may already have everything you need.

### If You Already Did Lesson 4 (Google Drive)
Your credentials should already work. Just tell Claude:
"Add Google Sheets access to my existing Google MCP server."

### If You're Starting Fresh
Follow these 4 steps (same as the Drive lesson):

1. Go to **console.cloud.google.com** and create a project (or use your existing one)
2. Enable the **Google Sheets API** (search for it in the API Library)
3. Set up the OAuth consent screen (if you haven't already)
4. Create OAuth credentials and copy the **Client ID** and **Client Secret**

Give those to Claude and you're done with the manual part.

---

## Claude Builds the Integration

Tell Claude:

**"Set up a Google Sheets MCP server for me. Client ID: [yours]. Client Secret: [yours]."**

Or if you already have the Drive server from Lesson 4:

**"Add Google Sheets capabilities to my existing Google MCP server."**

Claude handles everything -- creating files, installing packages, compiling, configuring. You'll click "Allow" once in the browser if prompted.

If the tools don't appear right away, you may need to start a fresh Claude session (type `/exit`, then `claude`). This is the same process as Lesson 4 -- MCP tools load at startup. Your progress is saved, so just say "continue the course" when you return. If you see a prompt saying "New MCP server found" with options, select **option 1: "Use this and all future MCP servers in this project"** -- this is a one-time security check.

After setup, you'll have these tools:
- **list_spreadsheets** -- Find your spreadsheets
- **read_sheet** -- Read data from any sheet
- **write_to_sheet** -- Add or update rows
- **create_spreadsheet** -- Create new spreadsheets

---

## Try It Out

Let's play with real data:

### Find Your Spreadsheets
"Show me my recent Google Sheets files"

### Read Data
"Read the data from my spreadsheet called '[your-sheet-name]' and show me the first 10 rows"

Claude reads the sheet and presents the data in a clean format.

### Write Data
"Add a new row to '[your-sheet-name]' with values: [value1], [value2], [value3]"

### Create a Spreadsheet
"Create a new Google Sheet called 'MCP Test Data' with columns: Feature, Status, Priority, Owner. Add 3 sample rows."

Check your Google Drive -- the spreadsheet should be there with the data filled in.

---

## PM Workflows

This is where Sheets integration shines for PMs:

### OKR Progress Check
"Read my OKR tracker sheet and give me a summary: which OKRs are on track (green), at risk (yellow), and off track (red)? What percentage of key results are completed?"

### Sprint Velocity Report
"Read the sprint data from my '[sheet-name]' spreadsheet. Calculate average velocity over the last 6 sprints. Is velocity trending up or down? Create a summary I can share in standup."

### Feature Request Triage
"Read my feature requests sheet. Group the requests by theme. Which themes have the most requests? Which have the highest average priority score?"

### Bug Tracking Dashboard Data
"Read the bug tracker sheet. How many open bugs per severity level? How many were closed this week vs last week? Is our bug count trending up or down?"

### Quick Data Collection
"Add this user feedback to my feedback sheet: 'User complained that the export takes too long for large datasets. Priority: medium. Source: support ticket #4521. Date: today.'"

The power here is that Claude understands context. You don't need to remember column names or cell references -- just describe what you want in plain English.

---

## Exercise + Quick Check

### Exercise: Build a Quick PM Dashboard

1. Ask Claude to create a new spreadsheet called "PM Dashboard Test"
2. Have Claude add columns: Metric, This Week, Last Week, Trend
3. Have Claude add 5 rows of sample PM metrics (active users, bug count, sprint velocity, feature completion, NPS score)
4. Ask Claude to read the data back and give you a one-paragraph summary of the trends
5. Clean up when done

### Quick Check

1. If you already set up Google Drive in Lesson 4, what do you need to do differently for Sheets?
2. Name a PM workflow where Sheets integration saves the most time.
3. Do you need to know column names or cell references to use the integration? (Answer: no, just describe what you want)

---

*Previous: [Lesson 4: Google Drive](4-google-drive.md)*
*Next: [Lesson 6: Jira Integration](6-jira-integration.md)*
