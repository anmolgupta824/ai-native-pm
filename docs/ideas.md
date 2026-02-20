# Ideas: Strategy & Product Roadmap

*Created: Feb 17, 2026 | Updated: Feb 21, 2026*
*Source: Nick Saraev's "Claude Code Full Course 4 Hours: Build & Sell (2026)" + brainstorming sessions*
*Video: https://www.youtube.com/watch?v=QoQBzR1NIqI*

> **Strategy: Audience first. Monetize later.**
> Everything free (gated behind free newsletter signup). OpenClaw model — give away genuinely useful tools, build reputation, become the go-to PM in the AI-native space. Money follows: consulting, job offers, speaking, partnerships, SaaS product later.
>
> No one pays for courses. PMs pay for tools that save time. But right now, we give even the tools away free to build audience. The subscriber list is the real asset.

---

## The Big Picture

```
PM finds you on LinkedIn / Google / word of mouth
    → Signs up for free newsletter (Substack)
    → Gets access to PM Career Toolkit (private repo)
    → Uses it, loves it, tells other PMs
    → They share "sign up to get this free toolkit"
    → More subscribers → bigger audience → credibility → opportunities
```

**What we give away:** Claude Code Mastery course, PM Career Toolkit (Interview Simulator + Resume Kit), templates, skills
**What we gate:** Everything requires free Substack/email signup (captures emails = moat)
**What we monetize later:** Consulting, coaching, sponsored content, premium community, hosted SaaS products

---

## What to Build Next (Priority Order)

| Priority | Idea | Free/Gated | Effort | Impact |
|----------|------|------------|--------|--------|
| **0** | **PM Career Toolkit** (Interview Sim + Resume Kit) | **Free (gated behind newsletter)** | **Medium-high** | **Very high — viral, builds audience, tangible value** |
| 1 | Claude Code Mastery (2-3 hrs, extend Module 0) | Free (public) | Medium | Very high — improves all modules, foundational |
| 2 | Product Strategy Course (Module 5) | Free (public) | Medium-high | High — attracts senior PMs |
| 3 | Community Templates Library | Free (public) | Low | Medium — engagement, community building |

---

## Priority 0: PM Career Toolkit (FREE, gated)

> **Status:** Brainstormed. Ready to build.
> **Delivery:** Private GitHub repo or zip download. Access via free Substack signup.
> **Question bank:** https://docs.google.com/spreadsheets/d/1rz10oEeLx-eGnilahKczYPhGfCUzIEKL-xRnjoQ-SX4/edit?gid=1024620532#gid=1024620532

The PM Career Toolkit is a Claude Code package that PMs download, run with their own Claude token, and get a complete job search companion. Two modules:

### Module A: PM Interview Simulator

AI-powered mock interview practice. Users pick company, round type, duration, and level. Claude conducts the interview with realistic follow-ups, pacing awareness, and generates a detailed scorecard.

**How it works:**
- PM downloads the package, `cd`s into the folder, types `claude`
- CLAUDE.md turns Claude into a PM interviewer
- PM picks: Company (Google, Meta, Amazon, Stripe, etc.) + Round type + Duration (15/30/45 min) + Level (PM/Senior/Director)
- Claude asks questions, does realistic follow-ups, tracks pacing
- At the end: detailed scorecard with ratings + specific feedback + "what a better answer looks like"

**Package structure:**
```
pm-interview-simulator/
  CLAUDE.md              ← The brain (interviewer persona, scoring rules, pacing logic)
  questions/
    product-sense.md     ← 20+ questions with follow-up trees
    execution.md         ← Metric drop scenarios
    strategy.md          ← Market entry, compete, build vs buy
    behavioral.md        ← Tell me about a time...
    analytical.md        ← Metrics & estimation
    rca.md               ← Root cause analysis
    ai-ml.md             ← AI product questions
    technical.md         ← System design, API design, eng tradeoffs
  companies/
    google.md            ← Google interviewer style + expectations
    meta.md
    amazon.md
    stripe.md
    generic.md
  rubrics/
    scoring.md           ← What makes a Hire vs No Hire
    level-calibration.md ← PM vs Senior PM vs Director expectations
  README.md              ← Setup: cd here, type 'claude', start practicing
```

**8 round types supported:**

| Round | What Happens | Example |
|-------|-------------|---------|
| Product Sense | Design a product for X | "Design a parking app for a university campus" |
| Execution | Metric dropped, diagnose and fix | "YouTube watch time dropped 10% WoW" |
| Strategy | Enter new market, compete, build vs buy | "Should Spotify enter podcast advertising?" |
| Behavioral | Tell me about a time... | "A decision you made with incomplete data" |
| Analytical / Metrics | Define success metrics, estimation | "How would you measure success for IG Stories?" |
| Technical / API | System design, tradeoffs | "Design the API for ride-sharing matching" |
| RCA | Something broke, figure out why | "Uber rides dropped 15% in NYC this morning" |
| AI/ML Product | Build an AI feature, data tradeoffs | "Add AI recommendations to Notion" |

**What makes it feel real (not a ChatGPT wrapper):**
- Follow-up pressure ("Why that metric?" "Reprioritize with 2 engineers and 4 weeks")
- Pacing feedback ("You've spent 8 min on problem definition, move to solutions")
- Company-specific style (Google = frameworks, Amazon = customer obsession, Meta = scale)
- Level calibration (PM vs Senior PM vs Director expectations)
- Detailed scorecard (not just "good job" — specific 1-10 ratings per dimension)

**Scorecard dimensions:**
- Framework & Structure
- User Empathy
- Prioritization & Tradeoffs
- Metrics & Success Criteria
- Edge Cases & Risks
- Communication Clarity
- Depth vs Breadth
- Overall: Strong Hire / Hire / Lean Hire / Lean No Hire / No Hire
- 3 specific things to improve with examples

**Scope:** Text-only for now. Voice/video = explore later (would need to be a hosted web app, brings back API cost problem).

**Key advantage:** Zero cost for us. PM uses their own Claude Pro/Max subscription. No server, no infrastructure, no maintenance.

### Module B: PM Resume & Application Kit

AI-powered resume building, tailoring, and application management. Same model — Claude Code package, runs locally.

**Features:**
- Build resume from scratch (guided Q&A about experience)
- Generate 3-4 resume variations (strategy-focused, technical, execution, leadership)
- JD tailoring — paste a job description, Claude rewrites resume to match keywords
- Cover letter generation — reads resume + JD, generates tailored letter
- ATS optimization — keyword matching, formatting for applicant tracking systems
- PM achievement rewriter — turns "managed a project" into "drove 40% revenue increase by..."
- Company research brief — generates a 1-pager about the company before interviews
- Application tracker — generates CSV/Excel file (user uploads to Google Sheets themselves)

**Package structure:**
```
pm-resume-kit/
  CLAUDE.md              ← Brain (resume rules, ATS optimization, formatting standards)
  my-profile/
    experience.md        ← User fills once (work history, skills, achievements)
    education.md
    projects.md
  templates/
    resume-classic.md    ← Clean, traditional format
    resume-modern.md     ← Startup-friendly
    resume-technical.md  ← PM-meets-technical emphasis
    cover-letter.md      ← Cover letter template
  output/                ← Generated files go here
  README.md
```

**Why this works without integrations:**
- All local files — no Jira, no Google API, no OAuth
- User fills in experience.md once, then pastes JDs as needed
- Output is markdown files they can copy into any format
- Application tracker is a CSV they open in Excel/Google Sheets

**Privacy angle (actually a selling point):** Your entire career history stays on YOUR machine. Never uploaded to random resume-builder websites.

### Why the Career Toolkit is Priority 0

1. **Wider audience** — every PM preparing for jobs, not just Claude Code learners
2. **Tangible value** — saves $150-300/hr vs human mock interviewers + career coaches
3. **Viral potential** — PMs obsessively share interview prep resources
4. **Zero cost** — they use their own Claude token
5. **Credibility** — "Built by a senior PM at Careem/ex-Visa who's done 50+ interviews"
6. **LinkedIn story** — "I built a PM career toolkit and gave it away for free" = viral post
7. **Subscriber magnet** — gated behind free newsletter = grows email list

### Key Decisions Still Open

1. **Question bank format** — Need to export/structure the Google Sheet questions into markdown files tagged by round type, company, difficulty, and level
2. **Video/audio later?** — Text-only works for Claude Code package. If we want voice/video, it becomes a hosted web app (brings back API cost problem). Park for later.
3. **One repo or two?** — Interview Simulator and Resume Kit could be separate repos or one combined "PM Career Toolkit" repo. Leaning toward one combined repo for simplicity.

---

## Priority 1: Claude Code Mastery (FREE, extend Module 0)

> **Status:** 2 lessons written (Lesson 5: CLAUDE.md, Lesson 6: Context Management). 2 more to go.

Expand Module 0 from 20 min basics → add Part 2: Mastery (2-3 hours). Covers everything a PM needs to become a Claude Code power user.

**Module 0 Structure:**
- **Part 1: Basics** (20 min) — existing content (install, terminal, first conversation, @-mentions)
- **Part 2: Mastery** (2-3 hours) — new content:

**Mastery Topics:**

| Lesson | Topic | Duration | Description |
|--------|-------|----------|-------------|
| 5 | CLAUDE.md / Project Brain | 15 min | How to write a CLAUDE.md for PM workflows, templates for different PM roles | ✅ WRITTEN |
| 6 | Context Management | 15 min | Avoiding context rot, one task per session, CRAFT framework, prompt structuring | ✅ WRITTEN |
| 7 | Plan Mode for PMs | 15 min | When to use plan mode, complex PM task planning, product launch example |
| 8 | Sub-agents & Parallel Workflows | 15 min | Research 5 competitors simultaneously, generate docs in parallel |
| 9 | Skills (Slash Commands) | 20 min | Create reusable /prd, /standup, /retro, /competitor commands |
| 10 | Hooks & Automation | 20 min | Auto-format PRDs, auto-save outputs, notification hooks |
| 11 | Advanced Prompting Patterns | 20 min | Socratic method, chain-of-thought, before-you-write pattern |
| 12 | Building Your PM Workspace | 30 min | End-to-end: set up a complete PM workspace from scratch |

**Why all free:** These are Claude Code features, not proprietary tools. Better as education that builds credibility. Makes every other module work better for students.

**Why skills & hooks moved from paid to free:** No one would pay $29-39 for a lesson. But teaching them for free builds massive goodwill and positions you as the expert.

---

## Priority 2: Product Strategy Course (FREE, Module 5)

- **Teaching Mode:** Guided course to create a complete Product Strategy document
  - Lesson 1: Define vision, mission, and strategic pillars
  - Lesson 2: Market analysis — TAM/SAM/SOM, competitor mapping, positioning
  - Lesson 3: User segmentation, personas, and Jobs-to-be-Done
  - Lesson 4: Prioritization frameworks (RICE, ICE, MoSCoW) with your real backlog
  - Lesson 5: Roadmap creation — now/next/later, OKR alignment
  - Lesson 6: Strategy review — pressure-test from leadership, board, and investor perspectives
- **Usage Mode:** Quick access to strategy tools (generate docs, validate, brainstorm, competitive analysis)
- **MCP tools:** list_strategy_templates, get_strategy_questions, generate_strategy, validate_strategy, competitive_analysis, prioritize_backlog, brainstorm_opportunities, review_strategy
- **Why free:** Attracts senior PMs, complements Module 1 (PRD = tactical, Strategy = strategic)
- **Effort:** Medium-high (new MCP server + 6-lesson curriculum)

---

## Priority 3: Community Templates Library (FREE)

- CLAUDE.md templates for different PM workflows
- Prompt templates for common PM tasks
- Shared by students, curated by us
- **Why free:** Builds community, keeps students engaged
- **Effort:** Low

---

## Future Ideas (Explore Later)

These are parked for when we have audience + bandwidth:

| Idea | What It Is | Notes |
|------|-----------|-------|
| AI Email Manager | Claude + MCP to triage, draft, manage email | Needs Gmail MCP, high effort |
| Chrome DevTools + Web Research | Browser automation for PM research (competitor scraping, review extraction) | Chrome MCP, complex setup |
| Hosted Interview Simulator (with audio/video) | Web app version with voice interviews via browser Speech APIs | Brings back API cost problem, needs infrastructure, but high moat if done right |
| PM Maker School / Community | Paid community + coaching + templates | Only makes sense at 5000+ subscribers |
| Consulting/Coaching | 1:1 PM coaching on AI tools | Monetize at 1000+ followers |

---

## Monetization Strategy

### Phase 1: NOW (0-1000 subscribers)
- **Everything free.** Build audience. OpenClaw model.
- Free newsletter, free course, free Career Toolkit (gated behind signup)
- LinkedIn content driving traffic
- Goal: become known as "the AI-Native PM" in the PM community

### Phase 2: LATER (1000+ subscribers)
- Consulting/coaching ($150-300/hr)
- Sponsored content / partnerships
- Premium community or Slack group

### Phase 3: SCALE (5000+ subscribers)
- Hosted SaaS products (Interview Simulator with audio/video)
- Enterprise training for PM teams
- Speaking engagements, workshops
- Partnership with companies (Anthropic, Atlassian, etc.)

---

## Competitive Positioning

**Nick Saraev:** Dev/freelancer audience → "Build & Sell AI services"
**Our course:** PM audience → "Be 10x more productive at your PM job"

**Our unique advantages:**
1. PM-specific workflows (PRDs, rollout plans, sprint management, interviews)
2. Deeper MCP integrations (7-lesson course vs. brief mention)
3. Non-coder friendly (no terminal fear, no code shown)
4. Tool-specific (Google Workspace, Jira, Figma — PM daily tools)
5. Free tools with real value (not just education)

**His advantage over us:**
1. 268K subscribers (massive reach)
2. Deployment & hosting (not relevant for PMs)
3. Business/monetization angle (different audience)

---

## What Nick Saraev Covers (reference)

His 4hr course is developer/freelancer-focused:
1. Setup & Basics
2. CLAUDE.md (Project Brain)
3. Building Web Apps
4. Advanced Features (.claude directory, sub-agents)
5. Plan Mode & Skip Permissions
6. Context Management
7. Slash Commands & Hooks
8. MCP Tools
9. Skills
10. Deployment (Modal)
11. Lead Scraper Project
12. Monetization (Maker School)

---

## Notes to Revisit

- [ ] Export/structure the Google Sheet question bank into markdown files for Interview Simulator
- [ ] Watch Nick Saraev's full video for implementation details
- [ ] Check his "Maker School" pricing/model for inspiration
- [ ] Look at comments section for what people are asking for
- [ ] Consider voice/audio interview simulator as a future hosted product
- [ ] His tools/affiliates: Instantly, Anymailfinder, Apify, n8n, Rize — some relevant for PM automation
