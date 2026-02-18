# Lesson 4: Google Drive Integration

**Estimated time: 20 minutes**
**Lesson type: Hands-on with Claude**

---

## Why Connect Google Drive to Claude?

As a PM, you live in Google Docs. Meeting notes, PRDs, status reports, one-pagers, retro summaries -- they all end up in Drive. Connecting Claude to Drive means you can:

- "Create a weekly status report doc and put it in my Drive"
- "Read that 20-page PRD and give me a 5-bullet summary"
- "Find all docs I worked on this week"
- "Update the launch checklist doc with today's progress"

### The Valet Key Analogy

Google uses something called OAuth for security. Think of it like a valet key for your car:

- A valet key can start the car and drive it, but cannot open the trunk or glove box
- An OAuth token lets Claude access your Drive files, but not your Gmail, Calendar, or anything else
- You decide exactly what permissions to grant

You'll click "Allow" once in your browser, and after that Claude can access your Drive seamlessly.

### Time Savings

| Task | Manual | With Claude |
|------|--------|-------------|
| Create a status report doc | 10 min (open Drive, create doc, format) | 30 seconds ("create a status report") |
| Summarize a long PRD | 20 min (read through it yourself) | 1 min ("summarize this doc") |
| Find recent docs | 2 min (browse Drive, remember names) | 10 seconds ("show my recent docs") |
| Cross-tool workflows | 30+ min (Jira data → format → paste into doc) | 2 min ("pull sprint data and create a report doc") |

---

## Set Up Google API Access

This is the one manual step -- getting your Google API credentials. It takes about 5 minutes.

### Step 1: Create a Google Cloud Project
1. Go to **console.cloud.google.com**
2. Click the project dropdown at the top, then "New Project"
3. Name it "Claude MCP" and click "Create"

### Step 2: Enable the Google Drive API
1. In the left sidebar, go to "APIs & Services" then "Library"
2. Search for "Google Drive API" and click "Enable"

### Step 3: Set Up OAuth Consent Screen
1. Go to "APIs & Services" then "OAuth consent screen"
2. Select "External" and click "Create"
3. Fill in: App name ("Claude MCP"), your email for support and developer contact
4. Click "Save and Continue" through the remaining steps
5. On "Test users", add your own email

### Step 4: Create Credentials
1. Go to "APIs & Services" then "Credentials"
2. Click "+ Create Credentials" then "OAuth client ID"
3. Application type: "Desktop app", Name: "Claude MCP"
4. Click "Create"
5. Copy the **Client ID** and **Client Secret**

Once you have the Client ID and Client Secret, share them with Claude. That's the last thing you need to do manually.

---

## Claude Builds the Integration

Now tell Claude you're ready to set up Google Drive. You don't need to paste Client IDs or secrets -- Claude will use the credentials file you downloaded earlier.

**"Set up a Google Drive MCP server for me. My credentials file is at ~/.google-drive-credentials.json"**

Claude will automatically:
1. Copy the pre-built server template (tested and working code)
2. Install all dependencies
3. Compile the server
4. Run the authorization script

### The OAuth Step (You Need to Do This)

During setup, **a browser window will open** asking you to sign in with Google and click "Allow." This is the valet key from earlier -- you're giving Claude permission to access your Drive files.

**Important:** You must complete this step in your browser. Claude will show you a URL -- click it, sign in, and click "Allow." Once you do, the terminal will show "Token saved" and Claude will continue.

You only need to do this once. After that, Claude can access your Drive files automatically.

### If the Tools Don't Appear

MCP servers load when Claude Code starts up. If Claude just built the server, it may need a fresh session to pick up the new tools. This is normal -- like installing an app and then opening it.

If Claude says the tools aren't available yet:

1. Your progress is saved automatically -- you won't lose your place
2. Type `/exit` to close this Claude session
3. Type `claude` in your terminal to start a fresh session
4. **You may see a prompt saying "New MCP server found in .mcp.json: google-drive"** with three options. This is Claude Code asking you to trust the server. Select **option 1: "Use this and all future MCP servers in this project"** and press Enter. This is a one-time security check -- you won't see it again.
5. Say "continue the course" and you'll pick up right where you left off, with the Google Drive tools now available

This only happens once per integration. After the tools load, they stay available in every future session.

After setup, you'll have these tools available:
- **list_files** -- Browse your Google Drive files
- **create_doc** -- Create new Google Docs
- **read_file** -- Read any document
- **share_file** -- Share documents with teammates

---

## Try It Out

Now let's use it! Try these with Claude:

### List Your Recent Files
"Show me my 10 most recent Google Drive files"

You'll see file names, types, and when they were last modified.

### Read a Document
"Read the doc called [your-doc-name] and summarize the key points"

Claude reads the full document and gives you a concise summary. Great for those long PRDs you never have time to re-read.

### Create a New Document
"Create a Google Doc called 'Test from Claude MCP Course' with a heading 'Hello from Claude' and a paragraph saying 'This document was created automatically through the MCP integration.'"

Check your Google Drive -- the doc should be there!

### Update a Document
"Add a section to 'Test from Claude MCP Course' with the heading 'Next Steps' and three bullet points about learning MCP integrations"

---

## PM Workflows

Here's where it gets powerful -- real PM workflows:

### Weekly Status Report
"Create a Google Doc called 'Week of [date] Status Report' with sections for: Completed This Week, In Progress, Blocked Items, and Next Week's Priorities. Fill in [describe your project status]."

### PRD Summarization
"Read my PRD called '[doc name]' and create a one-page executive summary as a new doc. Focus on: problem statement, proposed solution, key metrics, and timeline."

### Meeting Notes to Action Items
"Read my meeting notes doc '[doc name]' and create a new doc called 'Action Items from [meeting name]' listing every action item with the responsible person and deadline."

### Document Search
"Find all docs I created in the last month that mention 'notifications' or 'launch plan'"

These workflows save hours every week. The combination of reading, creating, and organizing docs makes Claude a powerful writing partner.

---

## Exercise + Quick Check

### Exercise: Create and Use a Doc

1. Ask Claude to list your recent Google Drive files
2. Ask Claude to create a new doc called "My MCP Test Doc"
3. Ask Claude to add content to it (a heading, some bullet points)
4. Ask Claude to read it back and summarize it
5. Clean up: delete the test doc from your Drive

### Quick Check

1. What is OAuth? (Hint: valet key analogy)
2. After you give Claude your Client ID and Client Secret, what does the student need to do? (Answer: just click "Allow" once in the browser)
3. Name two PM workflows that Google Drive integration makes faster.

### Before You Go: Keep Your Token Alive

Your Google Cloud project is probably in "Testing" mode right now, which means your OAuth token expires after **7 days**. To make it permanent:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to **APIs & Services → OAuth consent screen**
3. Click **"Publish App"** to switch from Testing to Production
4. You do NOT need Google to review it — it's just for your own personal use

Once published, your token refreshes automatically and never expires (unless you manually revoke it in your [Google Account permissions](https://myaccount.google.com/permissions)).

---

*Previous: [Lesson 3: How MCP Works](3-how-mcp-works.md)*
*Next: [Lesson 5: Google Sheets](5-google-sheets.md)*
