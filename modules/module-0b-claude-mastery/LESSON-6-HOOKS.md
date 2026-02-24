# Lesson 6: Hooks — Automate the Boring Stuff

**Time:** 20 minutes | **Type:** Hands-on | **You'll build:** 3 working hooks

---

## What You'll Learn

- The difference between Skills (you trigger) and Hooks (auto-trigger)
- How to create hooks in settings.json
- Three practical hooks: session reminder, file protection, notifications

---

## Concept (3 min read)

### Skills vs. Hooks

| | Skills | Hooks |
|---|---|---|
| **Trigger** | You type `/name` | Automatic on events |
| **When** | When you want | Every time the event happens |
| **Example** | `/standup` generates your update | Auto-remind you of sprint goals at session start |

### How Hooks Work

Hooks live in `.claude/settings.json`. They fire on specific **events**:

- **PreToolUse** — Before Claude uses a tool (e.g., before editing a file)
- **PostToolUse** — After Claude uses a tool
- **Stop** — When Claude finishes a response
- **Notification** — When Claude sends a notification

Each hook has:
- **Event** — When to fire
- **Matcher** — Optional regex to filter (e.g., only fire for specific tools)
- **Command/script** — What to run

### The Key Rule

If a hook's command exits with **code 2**, it **blocks the action**. This is how you protect files — the hook says "nope, don't touch that file" and Claude stops.

---

## Exercise 1: Session Start Reminder (7 min)

### Step 1: Create settings.json

```bash
mkdir -p .claude
```

Create `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Task",
        "command": "echo '📋 REMINDER: Sprint 14 — Focus on checkout redesign. Key metric: conversion rate > 3.5%'"
      }
    ]
  }
}
```

**Customize this:** Replace the reminder with YOUR current sprint/project context.

### Step 2: Test it

Ask Claude to do something that uses a tool (like reading a file or searching). You should see your reminder appear.

### Step 3: Make it dynamic (optional upgrade)

Instead of a hardcoded message, read from a file:

Update the hook command to:

```json
"command": "cat sprint-goals.md 2>/dev/null || echo 'No sprint goals set'"
```

Then create `sprint-goals.md`:

```markdown
## Current Sprint: Sprint 14
**Focus:** Checkout redesign
**Key metric:** Conversion rate > 3.5%
**Deadline:** March 7, 2026
**Blockers:** Waiting on design approval for mobile flow
```

Now the reminder updates whenever you edit the sprint goals file.

---

## Exercise 2: File Protection Hook (7 min)

### Step 1: Add a protection hook

Edit `.claude/settings.json` to add a second hook:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Task",
        "command": "echo '📋 REMINDER: Sprint 14 — Focus on checkout redesign'"
      },
      {
        "matcher": "Edit|Write",
        "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"CLAUDE.md\"; then echo \"❌ BLOCKED: Cannot edit CLAUDE.md via hooks\" && exit 2; fi'"
      }
    ]
  }
}
```

This hook fires before any file edit/write. If the target file is `CLAUDE.md`, it exits with code 2 — blocking the action.

### Step 2: Test it

In Claude Code, ask:

```
Add a new rule to my CLAUDE.md file
```

Claude should be blocked from editing CLAUDE.md. You should see the "BLOCKED" message.

### Step 3: Customize protection

Add more files you want to protect. Common PM choices:
- `CLAUDE.md` — Your project brain shouldn't be edited by Claude
- `sprint-goals.md` — Sprint context is manual
- Any files in a `final/` or `approved/` folder

> **Skills + Hooks:** In Lesson 5, you created skills like `/standup` and `/prd` (see `skills/` folder). This file protection hook guards critical files from accidental edits. Together, skills define what Claude *does* and hooks define what Claude *can't do*.

---

## Exercise 3: Desktop Notification (3 min)

### Step 1: Add a notification hook

Add a third hook to your settings.json under a **Stop** event:

```json
{
  "hooks": {
    "PreToolUse": [
      ...your existing hooks...
    ],
    "Stop": [
      {
        "command": "osascript -e 'display notification \"Claude finished your task\" with title \"Claude Code\"' 2>/dev/null; echo 'done'"
      }
    ]
  }
}
```

**Note:** This uses macOS `osascript`. For Linux, replace with `notify-send "Claude finished your task"`.

### Step 2: Test it

Ask Claude to do something that takes a few seconds (like a detailed analysis). When it finishes, you should get a desktop notification.

This is perfect for long-running tasks — kick off a competitive analysis, switch to Slack, and get notified when it's done.

---

## Quick Reference

```
File:              .claude/settings.json
Events:            PreToolUse, PostToolUse, Stop, Notification
Matcher:           Regex to filter which tools trigger the hook
Block action:      Exit code 2 in the command
Key env vars:      $CLAUDE_TOOL_INPUT, $CLAUDE_PROJECT_DIR
macOS notify:      osascript -e 'display notification "msg" with title "title"'
Linux notify:      notify-send "msg"
See also:          Skills from Lesson 5 (skills/ folder) — hooks protect the workspace your skills operate in
```

---

## Checkpoint

- [ ] Session reminder hook working (shows sprint context)
- [ ] File protection hook blocking CLAUDE.md edits
- [ ] Desktop notification hook firing when Claude finishes
- [ ] All 3 hooks in `.claude/settings.json`

**Next:** Lesson 7 — Advanced Prompting Patterns
