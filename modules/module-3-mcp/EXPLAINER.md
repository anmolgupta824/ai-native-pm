# Module 3: Automate 5+ Hours of Weekly PM Busy Work

**Time:** 90 minutes (setup) + ongoing automation | **Prerequisites:** Modules 1–2 recommended, Google Workspace account | **Cost:** $39

> You didn't become a PM to copy-paste Jira ticket statuses into Google Docs. This module builds 3 production-ready MCP automations that handle the repetitive work so you can do the strategic work.

---

## Overview

Every PM has a dirty secret: 30–40% of their week is repetitive operations work. Status reports, sprint planning prep, meeting follow-up emails. It's necessary, but it's not what you were hired for.

This module teaches you to build MCP (Model Context Protocol) automations that connect Claude Code directly to your Google Workspace. Not theoretical automations — three specific, battle-tested workflows that save real hours starting Week 1.

### What You'll Build

| Automation | Time Saved | What It Replaces |
|-----------|-----------|-----------------|
| Sprint Planning Assistant | ~2 hrs/week | Manual Jira triage, spreadsheet wrangling, capacity math |
| Status Report Generator | ~1 hr/week | Copy-pasting from 5 tools into a Google Doc |
| Meeting Follow-Up Bot | ~30 min/meeting | Writing recap emails, extracting action items, setting reminders |

### The ROI Math

- **Time saved:** 5+ hours/week
- **At $50/hr PM rate:** $250/week, $13,000/year
- **Module cost:** $39
- **Payback period:** 1.2 days

---

## What is MCP (and Why Should PMs Care)?

MCP (Model Context Protocol) is how Claude Code talks to external tools. Think of it as a universal adapter:

```
Claude Code ←→ MCP Server ←→ Google Docs, Sheets, Calendar, Gmail
```

Without MCP, you copy-paste data between tools. With MCP, Claude reads and writes directly to your workspace.

| Without MCP | With MCP |
|------------|----------|
| Open Jira → copy ticket titles → open Google Sheet → paste → format | "Generate this week's sprint plan from our Jira board" |
| Open 5 tabs → skim updates → write status doc → share | "Create this week's status report and share with the team" |
| Re-read meeting notes → extract action items → email attendees | "Send follow-ups from today's product review meeting" |

> **You don't need to understand the protocol.** You need to understand what it enables. This module handles the technical setup with step-by-step guides.

---

## The Three Automations

### Automation 1: Sprint Planning Assistant

**What it does:** Reads your Jira/Linear board, analyzes team capacity, suggests sprint scope, and generates a sprint planning doc in Google Sheets.

**The manual process it replaces:**
1. Open Jira → filter backlog by priority
2. Check team capacity (who's on PTO, who has carryover)
3. Estimate what fits in the sprint
4. Create sprint planning doc
5. Share with the team pre-standup

**The automated process:**
```
"Prepare sprint planning for next week. Check the backlog,
factor in that Sarah is on PTO Monday–Wednesday and we have
2 carryover tickets from this sprint."
```

**How it works under the hood:**

| Step | MCP Action | Output |
|------|-----------|--------|
| 1. Read backlog | Jira/Linear API → get prioritized tickets | Ranked ticket list |
| 2. Check capacity | Calendar API → find OOO, meetings | Available capacity by person |
| 3. Scope sprint | Estimate points vs capacity | Recommended sprint scope |
| 4. Generate doc | Google Sheets API → create planning doc | Formatted sprint plan |
| 5. Share | Gmail API → send preview to team | Pre-standup email |

**Setup difficulty:** Medium (requires Jira/Linear API token + Google OAuth)

### Automation 2: Status Report Generator

**What it does:** Pulls data from Jira, Google Docs, and Slack, then generates a formatted status report in Google Docs.

**The manual process it replaces:**
1. Open Jira → check what shipped, what's in progress, what's blocked
2. Open Google Docs → check design review status
3. Open Slack → skim #product-updates for notable items
4. Write status report
5. Format nicely, share with leadership

**The automated process:**
```
"Generate this week's status report. Include:
- What shipped
- What's in progress and on track
- What's blocked and needs help
- Key decisions made this week
- Next week's priorities"
```

**What the output looks like:**

```markdown
# Weekly Status Report — Feb 14, 2026

## 🟢 Shipped This Week
- Notification bell icon (FE) — merged to main
- WebSocket infrastructure (BE) — deployed to staging

## 🟡 In Progress (On Track)
- Notification panel UI — 70% complete, on track for Feb 19
- Mark-as-read API — in code review

## 🔴 Blocked
- Security review — waiting on InfoSec team (escalated to VP Eng)

## 📋 Key Decisions
- Chose WebSocket with polling fallback over pure polling
- Moved beta launch to March 10 (was March 3)

## 📅 Next Week
- Complete notification panel UI
- Begin integration testing
- Security review (target: resolved by Feb 19)
```

**Setup difficulty:** Easy (Google Docs API + optional Jira API)

### Automation 3: Meeting Follow-Up Bot

**What it does:** Takes meeting notes (from Google Docs or your pasted notes), extracts decisions, action items, and owners, then drafts follow-up emails.

**The manual process it replaces:**
1. Re-read meeting notes
2. Extract action items and assign owners
3. Decide who needs what information
4. Write 1–3 follow-up emails
5. Send them (usually 2 days late)

**The automated process:**
```
"Here are my notes from today's product review meeting.
Extract action items with owners and deadlines.
Draft follow-up emails for: engineering team, design team,
and leadership. Send the drafts to me for review."
```

**Setup difficulty:** Easy (Google Docs API + Gmail API)

---

## Setup Guide (Step-by-Step)

### Step 1: Google Cloud Project (15 min)

You'll create a Google Cloud project and enable the APIs. Don't worry — this is free and stays within your personal account.

| Step | Action | Why |
|------|--------|-----|
| 1 | Go to console.cloud.google.com | Google's API management console |
| 2 | Create new project: "PM Automations" | Isolates your PM tools |
| 3 | Enable APIs: Docs, Sheets, Gmail, Calendar | These are the tools you'll automate |
| 4 | Create OAuth credentials (Desktop app) | How Claude Code authenticates |
| 5 | Download credentials.json | Store securely, don't commit to git |

> **Pro tip:** The first time is the hardest. After this one-time setup, adding new automations takes minutes, not hours.

### Step 2: MCP Server Installation (10 min)

```bash
# Clone the module
git clone https://github.com/YOUR_USERNAME/pm-ai-toolkit.git
cd pm-ai-toolkit/module-3-mcp/mcp-server

# Install dependencies
npm install

# Build
npm run build

# Configure credentials
cp .env.example .env
# Edit .env with your credentials.json path
```

### Step 3: Claude Code Configuration (5 min)

Add to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "pm-workspace": {
      "command": "node",
      "args": ["/path/to/module-3-mcp/mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_CREDENTIALS_PATH": "/path/to/credentials.json"
      }
    }
  }
}
```

### Step 4: First Authentication (5 min)

The first time you use any automation, Claude Code will open a browser window for Google OAuth. Sign in and grant permissions. This is a one-time step.

### Step 5: Test Each Automation (15 min)

Try each automation with a low-stakes task:
1. "Generate a sprint plan for this week" (check it looks right)
2. "Create a status report for this week" (verify data accuracy)
3. "Draft a follow-up email from my last meeting notes" (review before sending)

---

## Best Practices

### ✅ Do

- **Review before sending.** Always review AI-generated emails and reports before they go out. Your name is on them
- **Start with read-only automations.** Status reports (read) before follow-up emails (write). Build trust gradually
- **Customize templates to your team.** Your status report format isn't the same as every team's. Edit the templates
- **Set up for one automation at a time.** Don't try to configure all three in one session. Get one working, then add the next
- **Keep credentials secure.** Never commit credentials.json to git. Use .env files

### ❌ Don't

- **Don't send AI-generated emails without review.** Especially to leadership or external stakeholders
- **Don't automate judgment calls.** Automations handle data gathering and formatting. You handle decisions and prioritization
- **Don't skip the test step.** Run each automation on a low-stakes task before using in production
- **Don't share API credentials.** Your Google OAuth token has access to your entire workspace
- **Don't over-automate.** If a task requires nuance (performance review, difficult stakeholder email), do it manually

---

## Troubleshooting

**Problem: Google OAuth keeps failing**
- *Cause:* Credentials.json is malformed or missing
- *Fix:* Re-download credentials from Google Cloud Console. Ensure the file path in your .env is correct (absolute path, no typos).

**Problem: "Insufficient permissions" error**
- *Cause:* You didn't enable the required APIs in Google Cloud Console
- *Fix:* Go to console.cloud.google.com → APIs & Services → Enable APIs. Make sure Docs, Sheets, Gmail, and Calendar APIs are all enabled.

**Problem: Status report has stale data**
- *Cause:* Jira/Linear cache needs refreshing
- *Fix:* Add "use fresh data, don't use cached" to your prompt. Or restart the MCP server to clear the cache.

**Problem: Automation is too slow**
- *Cause:* Making too many API calls sequentially
- *Fix:* This is expected for the first run. Subsequent runs use caching and are 3–5x faster. If still slow, check your network connection to Google APIs.

**Problem: Follow-up email tone is wrong**
- *Cause:* AI defaults to formal tone
- *Fix:* Add tone guidance: "Write in a casual but professional tone. We use Slack-style communication, not corporate email." Include an example email for Claude to match.

---

## What's Next?

Now that your PM workflows are automated:

- **Track time savings.** Note how long these tasks took before vs after automation. You'll want this data for your performance review
- **Customize templates.** Edit the output templates to match your team's format and voice
- **Explore new automations.** The MCP framework supports any Google Workspace action. Think about what else you do every week that's repetitive
- **Move to Module 4** — [Vibe Code Real Projects](../module-4-vibe-coding/) teaches you to build internal tools and prototypes

---

## Quick Reference

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `plan_sprint` | Generates sprint plan from backlog + capacity | Monday pre-planning |
| `generate_status_report` | Pulls data from tools, formats status doc | Friday status update |
| `draft_meeting_followup` | Extracts action items, drafts emails | After any meeting |
| `check_workspace_connection` | Tests Google API connectivity | During troubleshooting |
| `list_automations` | Shows available automations and status | Anytime |
