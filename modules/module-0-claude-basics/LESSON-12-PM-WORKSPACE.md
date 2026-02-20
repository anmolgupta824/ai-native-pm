# Lesson 12: Building Your PM Workspace

**Time:** 30 minutes | **Prerequisites:** Lessons 5-11 | **Cost:** Free

> This is the capstone. You'll build a complete AI-powered PM workspace from scratch using everything you've learned.

---

## What We're Building

By the end of this lesson, you'll have a project folder that turns Claude Code into your personal PM assistant. It will have:

- **A CLAUDE.md** that knows your role, product, and preferences
- **Skills** for your most common tasks (`/standup`, `/prd`, `/status`, `/retro`)
- **Hooks** that auto-format your docs and protect sensitive files
- **A folder structure** organized for PM workflows
- **Templates** for PRDs, one-pagers, and status reports

When you `cd` into this folder and type `claude`, you'll have a PM command center ready to go.

---

## Step 1: Create the Folder Structure (2 min)

Start Claude Code anywhere and tell it:

```
Create a folder structure at ~/Documents/pm-workspace with these directories:

pm-workspace/
  .claude/
    skills/
    settings.json
  docs/
    prds/
    one-pagers/
    status-reports/
    retros/
    research/
  templates/
  data/
  sprint-goals.md
  CLAUDE.md
```

Or create it manually:

```bash
mkdir -p ~/Documents/pm-workspace/{.claude/skills,docs/{prds,one-pagers,status-reports,retros,research},templates,data}
touch ~/Documents/pm-workspace/{CLAUDE.md,sprint-goals.md,.claude/settings.json}
```

---

## Step 2: Write Your CLAUDE.md (5 min)

Navigate to the workspace:

```bash
cd ~/Documents/pm-workspace
claude
```

Now tell Claude:

```
Help me write my CLAUDE.md. Ask me the following questions one at a time:

1. What's my role and company? (title, company type, team size)
2. What product do I manage? (name, users, key metrics)
3. What tools does my team use? (Jira, Confluence, Slack, etc.)
4. What are my formatting preferences? (bullet points vs paragraphs,
   PRD structure, how I like metrics presented)
5. What should Claude never do? (write code, make up data, etc.)
6. What are my current sprint/quarter goals?

Create the CLAUDE.md from my answers.
```

Answer the questions. Claude generates your personalized CLAUDE.md.

**If you're not sure what to write**, use this starter and fill in the blanks:

```markdown
# CLAUDE.md

## Who I Am
- [Title] at [Company], [company description]
- I manage [product/area] ([team size])
- Not an engineer — never write code unless I explicitly ask

## My Product
- [Product name]: [one-sentence description]
- [X] active users, [key metric]: [current value]
- Tech stack: [what engineering uses]

## My Tools
- Project management: [Jira / Linear / Asana]
- Docs: [Google Docs / Notion / Confluence]
- Communication: [Slack / Teams]
- Data: [Amplitude / Mixpanel / Looker / Google Sheets]

## Current Focus
- Sprint: [current sprint name/goal]
- Quarter OKRs: [top 2-3]
- Key deadline: [date and what]

## My Preferences
- PRDs follow: Problem → Goals → User Stories → Scope → Metrics → Risks
- I prefer bullet points over paragraphs
- Always include specific numbers for metrics (not "improved significantly")
- User stories: "As a [user], I want [goal], so that [benefit]"
- Acceptance criteria: Given/When/Then format

## Rules
- Never generate code unless I explicitly ask
- Ask clarifying questions before writing long documents
- When in doubt, be concise
- Flag assumptions you're making
- Always include success metrics with specific numbers
```

---

## Step 3: Create Your Core Skills (10 min)

Tell Claude:

```
Create 5 skills for me in .claude/skills/. For each, create a folder
with a SKILL.md file. Read my CLAUDE.md for context and preferences.

1. /standup — Daily standup: yesterday, today, blockers
   (read sprint-goals.md for current context)

2. /prd [feature-name] — Full PRD using my preferred structure
   (ask 3 clarifying questions before writing)

3. /status — Weekly status report: shipped, in progress, risks, next week
   (format for Slack, under 300 words)

4. /one-pager [feature] — Quick feature one-pager for stakeholder review
   (problem, solution, impact, effort, risks)

5. /retro — Sprint retro: what went well, what didn't, action items
   (be specific, not generic)
```

After Claude creates them, verify they exist:

```
Show me the list of skills you created and a 1-line summary of each.
```

Test one:

```
/standup
```

If the output isn't quite right, tell Claude to adjust the SKILL.md.

---

## Step 4: Set Up Your Hooks (5 min)

Tell Claude:

```
Update .claude/settings.json with these hooks:

1. SessionStart: Read and display sprint-goals.md when I start a session

2. PostToolUse (Write): Log every file Claude creates to
   .claude/generation-log.txt with timestamp

3. PreToolUse (Edit|Write): Block edits to any file in a "final/" directory
   (these are approved documents that shouldn't be changed)

4. Notification: Send a macOS desktop notification when Claude
   needs my attention
```

Test the setup:

```
/exit
claude
```

You should see your sprint goals displayed when the session starts.

---

## Step 5: Add Your Templates (5 min)

Tell Claude:

```
Create template files in the templates/ folder. Read CLAUDE.md for
my preferred formats:

1. templates/prd-template.md — Our PRD structure with section headers
   and placeholder descriptions for each section

2. templates/one-pager-template.md — Feature one-pager with sections
   for problem, solution, impact, effort, risks, open questions

3. templates/status-template.md — Weekly status with TL;DR, shipped,
   in progress, risks, next week

4. templates/retro-template.md — Sprint retro with went well,
   didn't go well, action items, metrics
```

These templates serve double duty:
- Your Skills reference them for consistent output
- You can share them with your team as standalone templates

---

## Step 6: Set Up Sprint Goals (2 min)

Update your sprint-goals.md:

```
Update sprint-goals.md with my current sprint focus. Ask me:
1. What sprint are we in?
2. What's the main goal?
3. Key deadline?
4. Top 3 priorities?
```

This file powers your SessionStart hook (shows goals every time you open Claude Code) and gives context to your /standup and /status skills.

---

## Step 7: Test the Full Workflow (5 min)

Exit and restart to load everything fresh:

```
/exit
claude
```

You should see your sprint goals. Now test the workflow:

### Test 1: Morning Standup
```
/standup
```
Verify it reads your sprint context and generates a clean standup.

### Test 2: Feature PRD
```
/prd smart-notifications
```
Verify it asks clarifying questions first, then generates a PRD matching your preferred structure.

### Test 3: Weekly Status
```
/status
```
Verify it's formatted for Slack and under 300 words.

### Test 4: Check Your Logs
```
Show me the contents of .claude/generation-log.txt
```
Verify that file creations were logged.

### Test 5: Protected Files
```
mkdir -p docs/final
Create a file at docs/final/approved-prd.md with some content
```
Then try to edit it — the hook should block the edit.

---

## Your Complete Workspace

Here's what you've built:

```
pm-workspace/
  CLAUDE.md                           ← Your project brain
  sprint-goals.md                     ← Current sprint context
  .claude/
    settings.json                     ← Hooks configuration
    generation-log.txt                ← Auto-generated file log
    skills/
      standup/SKILL.md                ← /standup command
      prd/SKILL.md                    ← /prd [feature] command
      status/SKILL.md                 ← /status command
      one-pager/SKILL.md              ← /one-pager [feature] command
      retro/SKILL.md                  ← /retro command
  templates/
    prd-template.md                   ← PRD structure
    one-pager-template.md             ← One-pager structure
    status-template.md                ← Status report structure
    retro-template.md                 ← Retrospective structure
  docs/
    prds/                             ← Generated PRDs
    one-pagers/                       ← Generated one-pagers
    status-reports/                   ← Generated status reports
    retros/                           ← Generated retros
    research/                         ← Competitive analysis, research notes
    final/                            ← Approved docs (protected by hook)
  data/                               ← CSVs, spreadsheets, raw data
```

---

## Weekly Workflow with Your Workspace

Here's how a typical PM week looks with this workspace:

### Monday
```bash
cd ~/Documents/pm-workspace
claude
```
→ Sprint goals display automatically
```
/standup
```
→ Copy to Slack

### Tuesday - Thursday
```
/prd checkout-redesign
```
→ Claude asks questions, generates PRD, saves to `docs/prds/`

```
/one-pager smart-notifications
```
→ Quick one-pager for stakeholder review

### Friday
```
/status
```
→ Weekly status report, copy to Slack/email

### End of Sprint
```
/retro
```
→ Sprint retro with specific data, action items assigned

---

## Evolving Your Workspace

Your workspace isn't static. Here's how to grow it over time:

### Add New Skills as You Find Patterns

If you keep writing the same type of email, create a skill:
```
/stakeholder-update [topic]
/meeting-prep [meeting-name]
/competitor [company-name]
/user-story [feature]
```

### Update CLAUDE.md When Things Change

- New quarter? Update your OKRs
- New team structure? Update team size and roles
- Learned a preference? Add it to the Rules section
- Switched tools? Update the My Tools section

### Share with Your Team

The `.claude/skills/` folder and `templates/` folder can be shared with your team. They get your workflows out of the box. Just make sure to remove personal details from CLAUDE.md (or have each person create their own).

---

## Congratulations — You've Completed Claude Code Mastery

You started with "what is Claude Code?" and you've built a full PM workspace with:

| Lesson | What You Learned |
|--------|-----------------|
| 5. CLAUDE.md | How to give Claude persistent memory |
| 6. Context Management | How to keep sessions clean and outputs sharp |
| 7. Plan Mode | How to think before acting on complex tasks |
| 8. Sub-agents | How to run parallel tasks (competitive analysis, multi-stakeholder docs) |
| 9. Skills | How to build reusable slash commands for PM workflows |
| 10. Hooks | How to automate rules and enforce quality |
| 11. Advanced Prompting | 8 patterns that produce dramatically better output |
| 12. PM Workspace | How to wire it all together into a daily command center |

**What makes you different from 99% of PMs now:**
- You don't just use AI to chat — you have a system
- Your AI assistant has memory, context, workflows, and quality controls
- You can generate a PRD in 5 minutes that used to take 2 hours
- You can research 5 competitors in the time it takes to research 1
- You have reusable workflows that compound over time

---

## What's Next?

Now that you've mastered Claude Code, explore the rest of the course:

- **[Module 1: PRD Generator](/modules/1-prd-generator)** — Generate production-ready PRDs with a custom MCP server
- **[Module 2: Image Generation](/modules/2-image-gen)** — Create product mockups and diagrams with AI
- **[Module 3: MCP Automation](/modules/3-mcp-automation)** — Build custom MCP tools for your PM workflows

And keep building skills. The more you use your workspace, the more powerful it becomes.

**Happy shipping.**
