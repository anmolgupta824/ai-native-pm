# PM AI Upskilling Program - Progress Tracker
Last Updated: 2026-02-24

## Overall Progress: 65%

```
Website:     [#########.] 95%  (Deployed: Yes)
Module 0:    [##########] 100% (Launched: Yes)
Module 0B:   [##########] 100% (Rewritten: Yes, Tested: Yes)
Module 1:    [#########.] 90%  (Launched: Yes)
Module 2:    [###.......] 30%  (Launched: No)
Module 3:    [#########.] 90%  (Built: Yes, MCP Course — Free)
Module 4:    [#.........] 10%  (Launched: No)
Marketing:   [###.......] 30%  (Posts: 0/10)
--------------------------------------------
Overall:     [######....] 65%
```

## Current Week: Week 1 (Feb 14-15, 2026)

### This Week's Goals:
- [x] Complete project folder structure
- [x] Build website landing page
- [x] Build pricing page
- [x] Build Module 1 MCP server
- [x] Create PRD templates
- [x] Write Module 1 documentation
- [x] Deploy website to Vercel
- [x] Test Module 1 end-to-end (29/29 tests pass)
- [x] Create explainer notes for all modules
- [x] Remove email gate from free modules
- [x] Create private repo for paid content
- [x] Build Module 0: Claude Code Basics
- [x] Create website explainer pages for all modules
- [x] Update QUICKSTART guides for beginners
- [x] Build Module 3: MCP Integrations Course (FREE)
- [ ] First beta tester

### Day 3 Accomplishments (Feb 15, Session 2):
- Built complete Module 3: MCP Integrations Course (FREE)
  - Replaced old paid Module 3 ($39) with comprehensive free MCP course
  - Teacher Mode MCP server: 5 tools (start_lesson, explain_concept, get_exercise, check_progress, quiz)
  - 8 lesson TypeScript files covering MCP from zero to expert
  - 8 curriculum markdown files (200-400+ lines each)
  - Production-ready Jira MCP template (usage mode) with 5 tools
  - Documentation: README, QUICKSTART, TROUBLESHOOTING
  - Progress tracker JSON for lesson completion
  - 3 example placeholders (Phase 2)
- Updated website for Module 3 changes
  - Full rewrite of Module 3 explainer page (free course, not paid preview)
  - Full rewrite of Module 3 get-started page (free setup flow)
  - Updated module listing page (Free badge, new features)
  - Updated pricing page FAQ
  - Updated PricingTable: Free tier now includes Modules 0-3, Pro at $29 for Module 4 only
- All builds pass: Teacher Mode MCP server, Jira template, Next.js (16 routes)

### Day 2 Accomplishments (Feb 15):
- Created Module 0: Claude Code Basics (EXPLAINER.md, QUICKSTART.md, README.md)
  - Installation guide for Mac/Windows/Linux
  - Terminal basics (5 commands)
  - First conversation walkthrough
  - Key concepts: @-mentions, tools, MCP, project memory
- Built 5 website explainer pages (modules 0-4)
  - Card-based, single-column design (distinct from ccforpms.com)
  - Full content for free modules (0, 1, 2)
  - Preview + purchase CTA for paid modules (3, 4)
  - Prev/next navigation between all modules
- Updated all module links to point to website (not GitHub)
  - Hero CTA → /modules/0-claude-basics
  - Nav CTA → /modules/0-claude-basics
  - Module cards → internal explainer pages
  - GitHub kept as secondary download option
- Updated Module 1 QUICKSTART with beginner-friendly setup
  - Added "Step 0: New to Claude Code?" with link to Module 0
  - Added terminal explanation for beginners
  - Added troubleshooting for common beginner errors

### Day 1 Accomplishments (Feb 14):
- Created complete project folder structure
- Built Next.js 14 website with Tailwind CSS
  - Landing page: Hero, module cards, email capture, social proof, how-it-works
  - Pricing page: tier comparison, individual modules, ROI calculator, FAQ
  - Module showcase page: detailed feature lists for all 4 modules
  - Responsive navigation and footer
- Built Module 1 PRD Generator MCP server
  - 5 MCP tools: list_templates, get_questions, generate_prd, validate_prd, suggest_edge_cases
  - 3 PRD templates: feature launch, API integration, redesign
  - Validation scoring system (A-D grades)
  - Edge case generator by template type
- Created 3 PRD templates (Markdown, ready to use)
- Wrote QUICKSTART.md (0 to first PRD in 30 min)
- Created example PRD (In-App Notifications Center)
- Set up marketing scaffolding (brand voice, visual identity, content calendar)
- Deployed website to Vercel
- Created public GitHub repo (anmolgupta824/ai-native-pm)
- Created private GitHub repo (anmolgupta824/ai-native-pm-paid)
- Tested Module 1 end-to-end (29/29 assertions pass)
- Created explainer notes for all 4 modules
- Removed email gate from free modules
- Separated free/paid content between repos

### Blockers:
None currently

### Module 0B Rewrite, Testing & Repo Organization (Feb 24):
- Rewrote all 8 Module 0B lessons from theory-based to hands-on (30% concept / 70% exercises)
- Created teaching CLAUDE.md (teacher brain) for Module 0B
- Extracted 4 skill files: standup, prd, retro, status (from inline code blocks to actual files)
- Created prompts/ directory for student CRAFT prompts
- Fixed terminal forking across all 8 lessons (removed cd/new session instructions)
- Fixed Plan Mode lesson: /plan command breaks teacher session — now simulates conversationally
- Fixed Lesson 7 to reference /prd skill for Socratic exercise
- Added Skills+Hooks cross-references in Lesson 6
- **Separated Module 0 and 0B into dedicated folders:**
  - Module 0 (`module-0-claude-basics/`): Basics only (EXPLAINER, QUICKSTART, README)
  - Module 0B (`module-0b-claude-mastery/`): Mastery + all 8 lessons, CLAUDE.md, skills, prompts
- **Created Module 0B get-started page** (`/modules/0b-claude-mastery/get-started/`)
  - 3 download options: Claude clone, git clone, download ZIP
  - Step-by-step setup instructions
  - Preview of all 8 lessons
  - FAQ and support info
- Updated Module 0 README to clarify Part 1 structure and link to Part 2
- Tested: Teacher mode delivers lessons section-by-section ✅
- Tested: Plan mode lesson works without /plan command ✅
- Tested: Skills files referenced correctly from lessons ✅
- Website deployed with all 19 pages including new get-started page ✅
- GitHub links now resolve correctly to `module-0b-claude-mastery/` ✅

### Next Steps:
1. Deploy Module 3 website updates to Vercel
2. Git commit Module 3 to public repo
3. Test Module 3 Teacher Mode end-to-end with Claude Code
4. Start building Module 2 MCP server
5. Recruit first beta testers

## Project Metrics
- Total Files: 70+
- Website Pages: 16 (landing, pricing, modules listing, 5 explainer pages, 5 get-started pages)
- MCP Tools: 15 (5 PRD + 5 Teacher Mode + 5 Jira template)
- PRD Templates: 3
- MCP Lessons: 8 (Module 3)
- Modules: 5 (0-4)
- Days Active: 3
- Git Commits: 5+
- Next Milestone: Deploy Module 3 to Vercel

## Milestones
- [x] Project structure created (Feb 14, 2026)
- [x] Website deployable (Feb 14, 2026) - builds successfully
- [x] Module 1 MCP server functional (Feb 14, 2026) - compiles and runs
- [x] Module 1 documentation complete (Feb 14, 2026)
- [x] Website live on Vercel (Feb 14, 2026)
- [x] Module 1 tested end-to-end (Feb 14, 2026) - 29/29 pass
- [x] Module 0 created (Feb 15, 2026)
- [x] Website explainer pages for all modules (Feb 15, 2026)
- [x] Module 3 MCP Integrations Course built (Feb 15, 2026) - 8 lessons, Teacher Mode + Jira template
- [x] Module 0B rewritten & tested (Feb 24, 2026) - 8 hands-on lessons, teaching CLAUDE.md, 4 skill files, plan mode fix
- [ ] Deploy Module 3 to Vercel (next session)
- [ ] First beta tester (Target: Week 2)
- [ ] Module 2 MCP server complete (Target: Week 3-4)
- [ ] Public launch (Target: Week 3)

## Repos
- Public: https://github.com/anmolgupta824/ai-native-pm
- Private: https://github.com/anmolgupta824/ai-native-pm-paid
- Website: https://ai-native-pm.vercel.app

## Risks & Issues
- No beta testers recruited yet (plan to start Week 2)
- Module 2 MCP server not yet built (planned for Week 3-4)

## Notes & Learnings
- Day 1: Massive progress - website + Module 1 MCP server + docs + marketing scaffolding all done
- Day 2: Module 0 + website explainer pages + beginner-friendly QUICKSTART updates
- Brand: "The AI-Native PM" (working name, easy to change later)
- Colors: Clean white + blue (Stripe aesthetic)
- Email: Substack integration
- Design: Card-based single-column (distinct from ccforpms.com docs-style layout)
- Website explainer pages are primary content delivery; GitHub is secondary
