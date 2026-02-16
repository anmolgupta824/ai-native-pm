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

Claude will automatically:
1. Copy the pre-built server template (tested and working code)
2. Install all dependencies
3. Compile the server
4. Run the authorization script

### The OAuth Step (Same as Lesson 4)

If you already authorized Google in Lesson 4 using the same Google Cloud project, your existing credentials may already work -- Claude will skip this step automatically.

If this is a fresh setup, **a browser window will open** asking you to sign in with Google and click "Allow." This is the same valet key concept from Lesson 4 -- you're granting Claude access to your Sheets data.

**Important:** You must complete this step in your browser. Claude will show you a URL -- click it, sign in, and click "Allow." Once you do, the terminal will show "Token saved" and Claude will continue.

### If the Tools Don't Appear

MCP servers load when Claude Code starts up. If Claude just built the server, it may need a fresh session to pick up the new tools. This is normal -- like installing an app and then opening it.

If Claude says the tools aren't available yet:

1. Your progress is saved automatically -- you won't lose your place
2. Type `/exit` to close this Claude session
3. Type `claude` in your terminal to start a fresh session
4. **You may see a prompt saying "New MCP server found in .mcp.json: google-sheets"** with three options. This is Claude Code asking you to trust the server. Select **option 1: "Use this and all future MCP servers in this project"** and press Enter. This is a one-time security check -- you won't see it again.
5. Say "continue the course" and you'll pick up right where you left off, with the Google Sheets tools now available

This only happens once per integration. After the tools load, they stay available in every future session.

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

### Before You Go: Keep Your Token Alive

If you set up Google Sheets using the same Google Cloud project as Lesson 4 (Google Drive), the same token tip applies: your project is probably in "Testing" mode, which means your OAuth token expires after **7 days**.

If you already published your app to Production in Lesson 4, you're all set -- nothing more to do here. If you haven't:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services > OAuth consent screen**
3. Click **"Publish App"** to switch from Testing to Production
4. You do NOT need Google to review it -- it's just for your own personal use

Once published, your token refreshes automatically and never expires (unless you manually revoke it in your [Google Account permissions](https://myaccount.google.com/permissions)).

---

*Previous: [Lesson 4: Google Drive](4-google-drive.md)*
*Next: [Lesson 6: Jira Integration](6-jira-integration.md)*
