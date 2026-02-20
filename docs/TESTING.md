# Testing Tracker

*Last updated: Feb 19, 2026*

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
- [x] "Next module" link points to Module 2: AI Image Generation

---

## Module 2: AI Image Generation — ✅ FULLY TESTED

### Teaching Mode ✅
| Lesson | Topic | Status |
|--------|-------|--------|
| 1 | Welcome & DALL-E intro, API key setup | ✅ Tested |
| 2 | Prompt fundamentals & engineering | ✅ Tested |
| 3 | Product mockups | ✅ Tested |
| 4 | Presentation visuals | ✅ Tested |
| 5 | Social media assets | ✅ Tested |
| 6 | Advanced techniques & cross-module workflows | ✅ Tested |

### Usage Mode ✅
- [x] `generate_image` — saves locally, auto-opens in Preview, shows DALL-E URL + local path
- [x] `generate_variations` — multiple images saved, each with DALL-E URL + local path
- [x] `create_asset_pack` — coordinated assets saved, each with DALL-E URL + local path
- [x] `review_prompt` — scores prompts without generating
- [x] `refine_prompt` — improves prompts with suggestions
- [x] `explain_concept` — explains image gen concepts
- [x] Response format: plain text summary (visible) + JSON metadata (collapses)
- [x] `generateImages: false` — text-only output works correctly

### Image Display ✅
- [x] Images save to `generated-images/` directory
- [x] Auto-open in macOS Preview via `exec("open")`
- [x] Clickable DALL-E CDN URL in response
- [x] Local file path shown in response
- [x] JSON metadata collapses behind `+N lines` in terminal
- [x] No MCP ImageContent blocks (removed — didn't render, exceeded 25K token limit)

### Module References ✅
- [x] All "Module 4" references updated to "Module 2"
- [x] All "Rollout Plan Generator" references removed
- [x] Cross-module section in Lesson 6 references Module 3: MCP Automation
- [x] Workflow diagram uses correct module numbers
- [x] Quiz questions use correct module numbers

### Setup & Config ✅
- [x] `.mcp.json` auto-detected by Claude Code (no manual MCP config needed)
- [x] MCP trust prompt works on first launch
- [x] Website get-started page simplified: clone → `cd && claude` → start
- [x] Website deployed to Vercel with updated content

### Branding ✅
- [x] Welcome message shows "Created by Anmol Gupta" with LinkedIn URL
- [x] CLAUDE.md updated: Module 2 (not Module 4)
- [x] EXPLAINER.md updated: Module 2 (not Module 4)

### Auto-Save Progress ✅
- [x] `.claude/settings.json` with `Edit(/teacher-mode/progress.json)` permission
- [x] No user prompts for progress.json writes

---

## Module 3: MCP Course — ⚠️ PARTIALLY TESTED

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

## Rollout Planner — MOVED TO future-modules/

Not actively tested. Moved from Module 2 to `future-modules/module-rollout/` during module renumbering.

---

## Cross-Module Fixes Applied

| Fix | M1 | M2 | M3 |
|-----|----|----|-----|
| Branding in CLAUDE.md | ✅ | ✅ | ✅ |
| Auto-save settings.json (Edit format) | ✅ | ✅ | ✅ |
| Rule #10 mandatory branding | ✅ | ✅ | ❌ |
| QUICKSTART.md updated | ✅ | ✅ | ❌ |
| Website get-started synced | ✅ | ✅ | ❌ |
| MCP trust notice in docs | ✅ | ✅ | ❌ |
| .mcp.json for auto-trust | N/A | ✅ | ❌ |

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
| Images showed `[Image]` placeholder | MCP ImageContent doesn't render in Claude Code | Save to file + auto-open + DALL-E URL |
| Base64 images exceeded token limit | DALL-E PNGs are 1-4MB, MCP limit is 25K tokens | Switched to URL format, download to file |
| Stale "Module 4" references in Lesson 6 | Module renumbered from 4 → 2 but lesson not updated | Updated all refs in .ts, .md, CLAUDE.md, EXPLAINER.md |
| "Rollout Plan" references in cross-module | Rollout Plan moved to future-modules | Replaced with Module 3: MCP Automation |
| Get-started page had manual npm/build steps | Students just need `cd && claude` | Simplified to 3-step: clone, open Claude Code, start |
| Module 1 "Next module" link pointed to Rollout | Old link to `/modules/2-rollout-planner` | Fixed to `/modules/2-image-gen` |
