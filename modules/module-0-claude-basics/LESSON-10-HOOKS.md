# Lesson 10: Hooks — Automate the Boring Stuff

**Time:** 20 minutes | **Prerequisites:** Lesson 9 (Skills) | **Cost:** Free

> Skills run when you ask. Hooks run automatically — every time, no matter what.

---

## Skills vs. Hooks

Quick distinction before we dive in:

| Feature | Skills | Hooks |
|---------|--------|-------|
| **Triggered by** | You typing `/skill-name` | Events (file saved, session starts, etc.) |
| **When it runs** | When you decide | Automatically, every time the event fires |
| **Purpose** | Run a workflow on demand | Enforce rules, automate side-effects |
| **Can block actions?** | No | Yes |

**Think of it this way:**
- **Skill** = "When I type `/standup`, generate my standup" (on demand)
- **Hook** = "Every time Claude edits a file, auto-format it with Prettier" (automatic)

Skills are buttons you press. Hooks are rules that always apply.

---

## The Problem Hooks Solve

You're generating PRDs with Claude Code. Every PRD needs to:
1. Follow your company's formatting standards
2. Include the last-modified date in the header
3. Not touch any files in the `contracts/` folder (legal owns those)

Without hooks, you'd have to:
- Remind Claude about formatting every session
- Manually add dates to every document
- Hope Claude remembers not to touch legal's files

With hooks, these rules are enforced automatically. Claude can't forget, skip, or override them.

---

## Where Hooks Live

Hooks are configured in settings files:

| Location | Scope |
|----------|-------|
| `~/.claude/settings.json` | All your projects (personal) |
| `.claude/settings.json` | This project only (shareable with team) |
| `.claude/settings.local.json` | This project, not committed to git |

The settings file is JSON. Hooks go inside a `"hooks"` key:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'A file was just edited!'"
          }
        ]
      }
    ]
  }
}
```

---

## Hook Events: When Do Hooks Fire?

Hooks fire at specific moments in Claude Code's lifecycle. Here are the ones that matter most for PMs:

| Event | When It Fires | PM Use Case |
|-------|---------------|-------------|
| **SessionStart** | When you start Claude Code | Load project context, show reminders |
| **PreToolUse** | Before Claude does something (edit, bash, etc.) | Block edits to protected files |
| **PostToolUse** | After Claude does something | Auto-format, add timestamps, log activity |
| **Stop** | When Claude finishes a response | Verify output quality, check completeness |
| **SessionEnd** | When you exit | Save session notes, update logs |

### How Events Work

Each event has three parts:

1. **Event** — What happened (e.g., "Claude edited a file")
2. **Matcher** — Which specific action? (e.g., "Only Edit or Write tools, not Bash")
3. **Hook handler** — What should happen (e.g., "Run this shell command")

```json
{
  "hooks": {
    "PostToolUse": [          ← Event: after Claude uses a tool
      {
        "matcher": "Edit|Write",  ← Matcher: only for Edit or Write tools
        "hooks": [
          {
            "type": "command",     ← Hook type: run a shell command
            "command": "echo 'File changed'"  ← The actual command
          }
        ]
      }
    ]
  }
}
```

---

## Your First Hook: Session Start Reminder

Let's start simple. This hook shows you a reminder every time you start Claude Code:

### Step 1: Create the Settings File

Ask Claude Code:

```
Create a file at .claude/settings.json with a SessionStart hook
that reminds me of my current sprint goals.
```

Or create it manually:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "echo '🎯 Current Sprint: Checkout Flow v2 | Deadline: March 15 | Key metric: Conversion rate > 85%'"
          }
        ]
      }
    ]
  }
}
```

### Step 2: Test It

Exit Claude Code (`/exit`) and restart (`claude`). You'll see your reminder before you even type anything.

### Step 3: Make It Dynamic

Instead of a hardcoded message, read from a file:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "cat \"$CLAUDE_PROJECT_DIR\"/sprint-goals.md 2>/dev/null || echo 'No sprint goals file found'"
          }
        ]
      }
    ]
  }
}
```

Now update `sprint-goals.md` whenever your sprint changes, and the hook always shows current goals.

---

## Practical Hooks for PMs

### Hook 1: Protect Sensitive Files

Prevent Claude from editing files it shouldn't touch:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "INPUT=$(cat); FILE=$(echo \"$INPUT\" | grep -o '\"file_path\":\"[^\"]*\"' | head -1 | cut -d'\"' -f4); case \"$FILE\" in *contracts/*|*.env|*credentials*) echo 'BLOCKED: Cannot edit protected file' >&2; exit 2;; *) exit 0;; esac"
          }
        ]
      }
    ]
  }
}
```

Now Claude Code will be blocked from editing anything in `contracts/`, any `.env` file, or any file with "credentials" in the name.

### Hook 2: Desktop Notification When Done

Get a macOS notification when Claude finishes a long task:

```json
{
  "hooks": {
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Start a long task, switch to another app, get a notification when Claude's done. No more constantly checking back.

### Hook 3: Auto-Format Markdown After Edits

Keep all your documents consistently formatted:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "INPUT=$(cat); FILE=$(echo \"$INPUT\" | grep -o '\"file_path\":\"[^\"]*\"' | head -1 | cut -d'\"' -f4); if [[ \"$FILE\" == *.md ]]; then npx prettier --write \"$FILE\" 2>/dev/null; fi",
            "async": true
          }
        ]
      }
    ]
  }
}
```

The `"async": true` means it runs in the background — Claude doesn't wait for formatting to finish before continuing.

### Hook 4: Log All Generated Files

Keep a log of everything Claude creates (useful for tracking your output):

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "INPUT=$(cat); FILE=$(echo \"$INPUT\" | grep -o '\"file_path\":\"[^\"]*\"' | head -1 | cut -d'\"' -f4); echo \"$(date '+%Y-%m-%d %H:%M') | Created: $FILE\" >> \"$CLAUDE_PROJECT_DIR\"/.claude/generation-log.txt",
            "async": true
          }
        ]
      }
    ]
  }
}
```

Now you have a running log at `.claude/generation-log.txt`:
```
2026-02-21 14:30 | Created: prd-checkout-v2.md
2026-02-21 14:45 | Created: stakeholder-update.md
2026-02-21 15:10 | Created: sprint-42-stories.md
```

### Hook 5: Quality Check Before Stopping

Use a prompt-based hook that asks Claude to verify its own work:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Before finishing, verify: Did you include success metrics? Did you address edge cases? Did you follow the format from CLAUDE.md? Respond with {\"decision\": \"approve\"} or {\"decision\": \"block\", \"reason\": \"what's missing\"}. Context: $ARGUMENTS",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

This hook runs every time Claude finishes a response. If the output is missing success metrics or edge cases, it will flag it and continue working.

---

## Combining Skills + Hooks

The real power is combining them. Here's an example workflow:

**Skill:** `/prd [feature]` — generates a PRD

**Hooks that fire during the PRD generation:**
1. **SessionStart** — loads sprint goals and team context
2. **PreToolUse** — blocks edits to any file outside the current project
3. **PostToolUse** — auto-formats the markdown after writing
4. **Stop** — verifies the PRD includes all required sections

The skill defines WHAT to do. The hooks enforce HOW to do it right.

---

## Managing Hooks

### View Active Hooks

Type `/hooks` in Claude Code to see all active hooks, toggle them on/off, or add new ones interactively.

### Disable All Hooks Temporarily

Add to your settings:

```json
{
  "disableAllHooks": true
}
```

Or use `/hooks` to toggle them off.

### Debugging Hooks

If a hook isn't working:

1. Test the command manually in your terminal
2. Check that the settings file is valid JSON (no trailing commas)
3. Run Claude with `claude --debug` to see hook execution details
4. Remember: changes to settings files require a session restart or review in `/hooks`

---

## Exercise: Set Up Your Safety Net

**Time: 10 minutes**

1. Start Claude Code in your pm-workspace folder
2. Ask Claude:

```
Create a .claude/settings.json file with these hooks:

1. SessionStart: show my current sprint focus from sprint-goals.md
2. PostToolUse (Write): log every file creation to .claude/generation-log.txt
3. Notification: send a macOS desktop notification when Claude needs attention

Also create a sprint-goals.md file with a placeholder sprint goal.
```

3. Exit and restart Claude Code
4. Verify the session start hook fires (you should see your sprint goal)
5. Ask Claude to create a test file, then check `.claude/generation-log.txt`

---

## Key Takeaways

1. **Hooks = automatic rules** — they fire on events, not on command
2. **Configured in `.claude/settings.json`** — JSON format, project or personal scope
3. **Key events:** SessionStart, PreToolUse (block), PostToolUse (react), Stop (verify), Notification
4. **Matchers filter events** — "only fire for Edit/Write, not for Bash"
5. **Three hook types:** command (shell), prompt (LLM check), agent (multi-turn verification)
6. **Skills + Hooks = powerful combo** — Skills define the workflow, Hooks enforce the rules
7. **Start simple** — a session reminder and a file logger are a great first setup

---

## What's Next?

You now have Skills (on-demand workflows) and Hooks (automatic rules). Next, we'll learn advanced prompting patterns — the techniques that separate "okay" Claude output from "this is exactly what I needed."

**Next:** [Lesson 11: Advanced Prompting Patterns](/modules/module-0-claude-basics/LESSON-11-ADVANCED-PROMPTING.md)
