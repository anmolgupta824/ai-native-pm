# Ideas: Course Extension & Monetization

*Created: Feb 17, 2026*
*Source: Nick Saraev's "Claude Code Full Course 4 Hours: Build & Sell (2026)" + own brainstorming*
*Video: https://www.youtube.com/watch?v=QoQBzR1NIqI*

> **Status: PARKED.** Revisit after all modules (0-4) are tested, launched, and we have initial traction from promotion. Focus now: finish testing → ship → promote → get feedback → then expand.

---

## What Nick Saraev Covers (4hr course, 85K views in 3 days)

His course is developer/freelancer-focused. Key topics:
1. **Setup & Basics** — Installing Claude Code, interface walkthrough, IDE setup
2. **CLAUDE.md (Project Brain)** — Steering AI with persistent context files
3. **Building Web Apps** — Replicating website designs, UI components
4. **Advanced Features** — .claude directory, sub-agents, hidden features
5. **Plan Mode & Skip Permissions** — Operational modes for complex tasks
6. **Context Management** — Avoiding "context rot", structuring prompts
7. **Slash Commands & Hooks** — Automation scripts that fire before/after tool calls
8. **MCP Tools** — Understanding Model Context Protocol
9. **Skills** — Creating reusable Claude Code skill files
10. **Deployment** — Using Modal to deploy to live URLs
11. **Lead Scraper Project** — Building a scraping tool + turning it into an API
12. **Monetization** — Selling AI automation services, Maker School (his paid program)

### His monetization angle:
- Build AI automation tools → sell to businesses as a freelancer/agency
- "Maker School" — $$$$ paid community (90-day framework to first paying customer)
- Lead gen as a service, rapid prototyping for clients, internal tooling for companies

---

## Gap Analysis: What We Cover vs. What He Covers

| Topic | Nick Saraev (Dev audience) | Our Course (PM audience) | Opportunity |
|-------|--------------------------|-------------------------|-------------|
| Setup & Basics | ✅ Module 0 | ✅ Module 0 | Already covered |
| CLAUDE.md | ✅ Deep dive | ❌ Not covered | **FREE module idea** |
| MCP Integrations | Brief mention | ✅ Module 3 (7 lessons) | **We go deeper** — our advantage |
| PRD Generation | ❌ | ✅ Module 1 | Unique to us |
| Rollout Planning | ❌ | ✅ Module 2 | Unique to us |
| Product Strategy | ❌ | 🔜 Module 5 (planned) | **Unique to us — senior PM magnet** |
| Image Generation | ❌ | ✅ Module 4 | Unique to us |
| Sub-agents | ✅ | ❌ | **Paid module idea** |
| Hooks & Automation | ✅ | ❌ | **Paid module idea** |
| Context Management | ✅ | ❌ | **Free add to Module 0** |
| Plan Mode | ✅ | ❌ | **Free add to Module 0** |
| Deployment/Hosting | ✅ Modal | ❌ | Less relevant for PMs |
| Skills (reusable) | ✅ | ❌ | **Paid module idea** |
| Selling AI services | ✅ Maker School | ❌ | Different audience |
| Chrome DevTools MCP | Mentioned | ❌ | **Interesting for PMs** |
| Email Manager | Project demo | ❌ | **Paid module idea** |
| Bookkeeping Automation | Project demo | ❌ | Less relevant for PMs |

---

## Ideas for FREE Modules/Extensions

### 1. CLAUDE.md Mastery for PMs (extend Module 0)
- How to write a good CLAUDE.md for PM workflows
- Templates: CLAUDE.md for PRD projects, sprint planning, research
- "Project brain" concept explained for non-coders
- **Why free:** Low effort, high value, attracts students to paid content

### 2. Context Management Tips (extend Module 0)
- How to avoid "context rot" in long sessions
- When to start fresh vs. continue
- Structuring prompts for better output
- Token conservation strategies
- **Why free:** Essential knowledge, makes all other modules work better

### 3. Plan Mode for PMs (extend Module 0)
- Using plan mode for complex PM tasks
- When to use plan mode vs. regular mode
- Example: Planning a product launch with plan mode
- **Why free:** Quick lesson, makes students more effective

### 4. Product Strategy Course (new free module — Module 5)
- **Teaching Mode:** Guided course to create a complete Product Strategy document
  - Lesson 1: Define vision, mission, and strategic pillars
  - Lesson 2: Market analysis — TAM/SAM/SOM, competitor mapping, positioning
  - Lesson 3: User segmentation, personas, and Jobs-to-be-Done
  - Lesson 4: Prioritization frameworks (RICE, ICE, MoSCoW) with your real backlog
  - Lesson 5: Roadmap creation — now/next/later, OKR alignment
  - Lesson 6: Strategy review — pressure-test from leadership, board, and investor perspectives
  - **End goal:** A polished, validated Product Strategy doc ready to share with leadership
- **Usage Mode:** Quick access to strategy tools
  - Generate strategy docs from templates (B2B SaaS, Marketplace, Platform, Consumer)
  - Validate existing strategy docs for completeness and gaps
  - Brainstorm new market opportunities with AI-powered ideation
  - Run competitive analysis (SWOT, Porter's Five Forces)
  - Prioritize features/initiatives with scoring frameworks
  - Stakeholder review from leadership, board, investor, eng-lead perspectives
- **MCP tools to build:**
  - `list_strategy_templates` — Browse strategy templates
  - `get_strategy_questions` — Guided questionnaire per template type
  - `generate_strategy` — Generate full strategy doc from answers
  - `validate_strategy` — Score strategy doc for completeness
  - `competitive_analysis` — SWOT / Porter's analysis
  - `prioritize_backlog` — Score initiatives with RICE/ICE/MoSCoW
  - `brainstorm_opportunities` — AI-powered market opportunity ideation
  - `review_strategy` — Feedback from leadership, board, investor, eng-lead personas
- **Why free:** Complements Module 1 (PRD = tactical, Strategy = strategic), attracts senior PMs
- **Effort:** Medium-high (new MCP server + 6-lesson curriculum)
- **Impact:** Very high — strategy is the #1 PM skill gap, fills a major course gap

### 5. Community Templates Library (new free resource)
- CLAUDE.md templates for different PM workflows
- Prompt templates for common PM tasks
- Shared by students, curated by us
- **Why free:** Builds community, keeps students engaged

---

## Ideas for PAID Modules

### 5. Module 5: Claude Code Hooks & Automation ($29-39)
- **What:** Teach PMs to set up automation hooks (scripts that fire before/after Claude actions)
- **PM use cases:**
  - Auto-format PRDs to company template after generation
  - Auto-save outputs to Google Drive after every session
  - Pre-load context from Jira before starting work
  - Notification hooks (Slack message when PRD is done)
- **Why paid:** Advanced, high value, saves recurring time
- **Effort:** Medium (need to build hook templates)

### 6. Module 6: Sub-Agents & Parallel Workflows ($29-39)
- **What:** Teach PMs to spin up multiple Claude instances for parallel work
- **PM use cases:**
  - Research 5 competitors simultaneously
  - Generate PRD + rollout plan + stakeholder email in parallel
  - Sprint planning: one agent analyzes velocity, another drafts stories
  - Multi-market launch: agents handle different regions simultaneously
- **Why paid:** Power-user feature, massive time savings
- **Effort:** Medium

### 7. Module 7: Custom Skills for PMs ($29-39)
- **What:** Create reusable "skills" (saved workflows) for common PM tasks
- **PM use cases:**
  - "/standup" — auto-generates daily standup from Jira + Sheets
  - "/prd" — launches PRD workflow with company template
  - "/retro" — pulls sprint data and generates retro doc
  - "/competitor" — runs competitive analysis workflow
- **Why paid:** Huge time-saver, very sticky (once set up, used daily)
- **Effort:** Medium-high (need to build skill templates)

### 8. Module 8: AI Email Manager for PMs ($19-29)
- **What:** Use Claude + MCP to triage, draft, and manage email
- **PM use cases:**
  - Auto-categorize emails (stakeholder updates, bug reports, feature requests)
  - Draft responses to common PM emails
  - Weekly email digest: summarize all stakeholder emails
  - Extract action items from email threads
- **Why paid:** High demand, daily use case
- **Effort:** High (need Gmail MCP server)

### 9. Module 9: Chrome DevTools + Web Research ($29-39)
- **What:** Use Claude with browser automation for PM research
- **PM use cases:**
  - Scrape competitor pricing pages automatically
  - Monitor competitor feature releases
  - Extract user reviews from app stores
  - Auto-fill forms and testing tools
- **Why paid:** Unique capability, hard to learn alone
- **Effort:** High (Chrome MCP setup is complex)

### 10. PM Toolkit Bundle ($79-99)
- **What:** Bundle of custom MCP servers pre-built for PM workflows
- **Includes:**
  - Jira + Sheets sprint dashboard
  - Automated weekly status report generator
  - Competitive intelligence collector
  - Stakeholder communication templates
  - Cross-tool workflows (Jira → Sheets → Drive → Slack)
- **Why paid:** Premium, saves weeks of setup
- **Effort:** Very high (but high margin)

---

## Pricing Strategy Ideas

### Option A: Module-by-Module
- Modules 0-4: FREE (current state)
- Modules 5-9: $29-39 each
- PM Toolkit Bundle: $79-99
- **Total addressable revenue per student: ~$250**

### Option B: Free + Premium Tier
- Free: Modules 0-4 (forever free)
- Premium ($49/month or $99 one-time): Access to Modules 5-9 + Templates + Community
- **Recurring revenue potential**

### Option C: Free Course + Paid Templates/Tools
- All modules free (maximum reach)
- Sell pre-built MCP server bundles, CLAUDE.md templates, skill files
- **Marketplace model**

---

## What to Build Next (Priority Order)

| Priority | Idea | Free/Paid | Effort | Impact |
|----------|------|-----------|--------|--------|
| 1 | Product Strategy Course (Module 5) | Free | Medium-high | Very high — attracts senior PMs, fills #1 skill gap |
| 2 | CLAUDE.md mastery (extend Module 0) | Free | Low | High — improves all modules |
| 3 | Context management tips (extend Module 0) | Free | Low | High — students need this |
| 4 | Module 6: Hooks & Automation | Paid $29 | Medium | High — unique, practical |
| 5 | Module 8: Custom Skills for PMs | Paid $39 | Medium | Very high — daily use |
| 6 | Module 7: Sub-Agents | Paid $29 | Medium | Medium — power users |
| 7 | PM Toolkit Bundle | Paid $99 | High | High — premium offering |
| 8 | Module 9: Email Manager | Paid $29 | High | Medium — niche |
| 9 | Module 10: Chrome/Web Research | Paid $39 | High | Medium — advanced |

---

## Competitive Positioning

**Nick Saraev:** Dev/freelancer audience → "Build & Sell AI services"
**Our course:** PM audience → "Be 10x more productive at your PM job"

**Our unique advantages:**
1. PM-specific workflows (PRDs, rollout plans, sprint management)
2. Deeper MCP integrations (7-lesson course vs. brief mention)
3. Non-coder friendly (no terminal fear, no code shown)
4. Tool-specific (Google Workspace, Jira, Figma — PM daily tools)

**His advantage over us:**
1. Deployment & hosting (not relevant for PMs)
2. Sub-agents & advanced features (we should add this)
3. Business/monetization angle (different audience)
4. 268K subscribers (massive reach)

---

## Notes to Revisit

- [ ] Watch the full video when rested — lots of implementation details
- [ ] Check his "Maker School" pricing/model for inspiration
- [ ] Look at comments section for what people are asking for
- [ ] Consider a "PM Maker School" equivalent — community + templates + coaching
- [ ] Nick uses Modal for deployment — explore if relevant for PM toolkit hosting
- [ ] His tools/affiliates: Instantly, Anymailfinder, Apify, n8n, Rize — some relevant for PM automation
