# Lesson 6: Jira Integration

**Estimated time: 20 minutes**
**Lesson type: Hands-on with Claude**

---

## Why Connect Jira to Claude?

As a PM, you probably spend 30-60 minutes a day in Jira -- checking sprint progress, finding blockers, updating tickets, pulling data for standups. What if Claude could do that for you?

When Jira is connected to Claude through MCP, you can say things like:

- "Show me all open bugs from this sprint"
- "Create a new story for the notifications feature"
- "What issues are blocking the release?"
- "Give me a sprint progress summary for today's standup"

### Time Savings

| Task | Manual | With Claude |
|------|--------|-------------|
| Sprint standup prep | 15 min (open Jira, check each ticket, write notes) | 30 seconds ("summarize the sprint") |
| Find blockers | 5 min (filter by status, scan labels) | 10 seconds ("what's blocked?") |
| Create a ticket | 3 min (click around, fill fields) | 20 seconds (tell Claude what you need) |
| Weekly status report | 20 min (export, format, write) | 1 min ("generate status report") |

This is not about replacing Jira. It is about having a conversational shortcut to the data you already use every day.

---

## Get Your Jira Credentials

To connect Claude to Jira, you need three things. This takes about 2 minutes.

### 1. Your Jira Email
The email you use to log into Jira. Usually your work email.

### 2. An API Token
Go to: **id.atlassian.com/manage-profile/security/api-tokens**

1. Click "Create API token"
2. Label it "Claude MCP"
3. Click "Create"
4. Copy the token (you won't see it again!)

### 3. Your Jira URL
Look at your browser when you're in Jira. Your URL looks like:
**https://your-company.atlassian.net**

Once you have all three, share them with Claude and we'll set everything up.

---

## Claude Sets It Up

Now comes the easy part. You've got your credentials -- give them to Claude and say:

**"Set up a Jira MCP server for me. Here are my credentials: [email], [API token], [Jira URL]"**

Claude will automatically:
1. Copy the pre-built server template (tested and working code)
2. Install the dependencies
3. Compile everything
4. Configure it so Claude can use it

Notice there's no browser authorization step here. Unlike Google Drive and Sheets (which use OAuth and ask you to click "Allow" in a browser), Jira uses a simple API token. You already created it -- Claude just stores it securely and uses it directly. No browser popups, no extra clicks.

### If the Tools Don't Appear

MCP servers load when Claude Code starts up. If Claude just built the server, it may need a fresh session to pick up the new tools. This is normal -- like installing an app and then opening it.

If Claude says the tools aren't available yet:

1. Your progress is saved automatically -- you won't lose your place
2. Type `/exit` to close this Claude session
3. Type `claude` in your terminal to start a fresh session
4. **You may see a prompt saying "New MCP server found in .mcp.json: jira"** with three options. This is Claude Code asking you to trust the server. Select **option 1: "Use this and all future MCP servers in this project"** and press Enter. This is a one-time security check -- you won't see it again.
5. Say "continue the course" and you'll pick up right where you left off, with the Jira tools now available

This only happens once per integration. After the tools load, they stay available in every future session.

When it's done, you'll have 5 Jira tools available:
- **list_projects** -- See all your Jira projects
- **get_issue** -- Get details on any ticket
- **create_issue** -- Create new tickets
- **search_issues** -- Find tickets with any criteria
- **update_issue** -- Update existing tickets

---

## Try It Out

Now the fun part -- using it! Try these commands with Claude:

### List Your Projects
"Show me all my Jira projects"

You should see a list of your projects with their keys and names.

### Search for Issues
"Show me all open bugs in [PROJECT-KEY]"

Claude uses JQL (Jira Query Language) behind the scenes, but you don't need to know JQL -- just describe what you want in plain English.

### Get Issue Details
"Show me the details of [PROJECT-KEY]-123"

Claude will show you the full issue: title, status, assignee, description, comments, and more.

### Create an Issue
"Create a new story in [PROJECT-KEY] titled 'Add notification preferences page' with description 'Allow users to choose which notifications they receive and how (email, in-app, push)'"

Claude creates the ticket and gives you the issue key.

### Update an Issue
"Move [PROJECT-KEY]-123 to In Progress and assign it to me"

Try each of these with your real Jira data. The more you practice, the more natural it feels.

---

## PM Workflows

Here's where the integration really shines -- real PM workflows you can run with a single sentence.

### Morning Standup Prep
"Give me a sprint summary: how many stories are done, in progress, and to do? What got completed yesterday? What's blocked?"

### Weekly Status Report
"Generate a weekly status report for [PROJECT-KEY]. Include: completed this week, in progress, blocked items, and next week's priorities."

### Blocker Detection
"Find all issues in [PROJECT-KEY] that are blocked or have the 'blocker' label. For each one, show who's assigned and how long it's been in that status."

### Sprint Planning Support
"Show me all unassigned stories in the backlog for [PROJECT-KEY] with story point estimates. Sort by priority."

### Release Readiness Check
"How many open bugs are there in [PROJECT-KEY] for the v2.0 milestone? Show me any P0 or P1 issues."

These workflows take 20+ minutes manually. With Claude, they take seconds.

---

## Exercise + Quick Check

### Exercise: Your First Jira Workflow

1. Ask Claude to list your Jira projects
2. Pick a project and ask Claude to show all open issues
3. Create a test issue: "Test ticket from Claude MCP course"
4. Search for the ticket you just created
5. Update the ticket (change the description or add a comment)
6. Delete the test ticket when you're done

### Quick Check

1. What three things do you need to connect Jira to Claude?
2. Name two PM workflows that become faster with the Jira integration.
3. When Claude sets up the integration, what does the student need to do? (Answer: just provide credentials)

### Before You Go: Know Your Token

Jira API tokens work differently from Google's OAuth tokens. They don't expire after 7 days -- once created, a Jira API token stays valid until you manually revoke it or your Atlassian admin disables it.

Good to know:
- **If you leave your company**, your Jira token stops working automatically (it's tied to your Atlassian account).
- **If you want to revoke it**, go to **id.atlassian.com/manage-profile/security/api-tokens** and delete the "Claude MCP" token.
- **No maintenance needed.** Unlike Google OAuth, you won't need to re-authorize periodically.

---

*Previous: [Lesson 5: Google Sheets](5-google-sheets.md)*
*Next: [Lesson 7: Figma Integration](7-figma.md)*
