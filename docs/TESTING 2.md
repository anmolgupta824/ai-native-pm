# Testing Tracker

*Last updated: Feb 17, 2026*

---

## Module 1: PRD Generator — ✅ FULLY TESTED

### Teaching Mode ✅
| Lesson | Topic | Status |
|--------|-------|--------|
| 1 | Pick template, answer questions, generate first draft | ✅ Tested |
| 2 | Socratic questioning, add alternative approaches | ✅ Tested |
| 3 | Automated scoring, fix gaps, add edge cases | ✅ Tested |
| 4 | Simulated stakeholder review (9 perspectives) | ✅ Tested |
| 5 | Final validation, compare journey, export | ✅ Tested |

### Usage Mode ✅
- [x] Quick reference tools card shows (no wizard)
- [x] All 8 tools accessible: list_templates, get_questions, generate_prd, generate_prd_custom, validate_prd, validate_prd_file, suggest_edge_cases, review_prd
- [x] Drag & drop hint visible
- [x] Direct tool access works ("just tell Claude what you need")

### Branding ✅
- [x] New student welcome — "Created by Anmol Gupta — linkedin URL"
- [x] Returning student welcome — branding present
- [x] Course completed — follow CTA ("Enjoyed this course? Follow Anmol Gupta...")
- [x] Usage mode tools card — "Built by Anmol Gupta" at bottom
- [x] Rule #10 mandatory enforcement in CLAUDE.md

### Auto-Save Progress ✅
- [x] `.claude/settings.json` with `Edit(/teacher-mode/progress.json)` permission
- [x] No user prompts for progress.json writes

### Docs ✅
- [x] QUICKSTART.md updated (tools table, MCP trust notice, "Usage mode" prompt)
- [x] Website get-started page synced (5 lessons, correct tools, usage mode flow)

---

## Module 3: MCP Course — PARTIALLY TESTED

### Teaching Mode — Lessons 1-4 tested, 5-7 remaining
| Lesson | Topic | Status |
|--------|-------|--------|
| 1 | Welcome / MCP Fundamentals | ✅ Tested |
| 2 | REST API Primer | ✅ Tested |
| 3 | How MCP Works | ✅ Tested |
| 4 | Google Drive | ✅ Tested |
| 5 | Google Sheets | ❌ Not tested |
| 6 | Jira Integration | ❌ Not tested |
| 7 | Figma | ❌ Not tested |

### Usage Mode — ❌ NOT TESTED
- [ ] Tools accessible without guided flow
- [ ] Can use MCP tools directly

### Branding — ❌ NOT TESTED
- [ ] Welcome message shows branding
- [ ] Course completed shows follow CTA
- [ ] Usage mode shows branding

### Auto-Save Progress — ❌ NOT TESTED
- [ ] `.claude/settings.json` present with correct `Edit()` format
- [ ] No user prompts for progress.json writes

### Rule #10 — ❌ NOT ADDED
- [ ] Mandatory branding enforcement rule not yet in Module 3 CLAUDE.md

---

## Module 2: Rollout Planner — ❌ NOT TESTED

### Teaching Mode
- [ ] All lessons need testing (lesson count TBD)

### Usage Mode
- [ ] Not tested

### Branding
- [ ] Branding templates added to CLAUDE.md (not tested)
- [ ] Rule #10 not yet added

### Auto-Save Progress
- [ ] `.claude/settings.json` present with correct `Edit()` format (not tested)

---

## Module 4: Image Generation — ❌ NOT TESTED

### Teaching Mode
- [ ] All lessons need testing (lesson count TBD)

### Usage Mode
- [ ] Not tested

### Branding
- [ ] Branding templates added to CLAUDE.md (not tested)
- [ ] Rule #10 not yet added

### Auto-Save Progress
- [ ] `.claude/settings.json` present with correct `Edit()` format (not tested)

---

## Cross-Module Fixes Applied (This Session)

| Fix | M1 | M2 | M3 | M4 |
|-----|----|----|----|----|
| Branding in CLAUDE.md | ✅ | ✅ | ✅ | ✅ |
| Auto-save settings.json (Edit format) | ✅ | ✅ | ✅ | ✅ |
| Rule #10 mandatory branding | ✅ | ❌ | ❌ | ❌ |
| QUICKSTART.md updated | ✅ | ❌ | ❌ | ❌ |
| Website get-started synced | ✅ | ❌ | ❌ | ❌ |
| MCP trust notice in docs | ✅ | ❌ | ❌ | ❌ |

---

## Issues Found & Fixed During Testing

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| Usage mode was a forced wizard | CLAUDE.md had 3-step guided flow | Replaced with quick reference tools card |
| Website showed 6 lessons, old tool names | page.tsx not synced | Updated to 5 lessons, correct tools |
| Progress save prompted every time | No auto-allow permissions | Added `.claude/settings.json` |
| Permission format wrong | Used `Write(path:...)` instead of `Edit(/)` | Fixed to `Edit(/teacher-mode/progress.json)` |
| Markdown links don't render in terminal | Claude Code terminal is plain text | Switched to plain text URLs |
| Haiku model skipped branding | No enforcement rule | Added Rule #10 as mandatory instruction |
| Branding missing from some touchpoints | Only in new student welcome | Added to returning, completed, usage mode |
| MCP trust prompt surprised users | Expected first-launch behavior | Added notice to QUICKSTART.md |
