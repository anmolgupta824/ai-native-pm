# Module 1: PRD Generator

**Generate production-ready PRDs in 30 minutes.**

An MCP server that acts as your AI product management assistant. It walks you through an interactive questionnaire, suggests edge cases, validates completeness, reviews from multiple stakeholder perspectives, and generates a structured PRD in Markdown.

## Two Ways to Use This Module

| Mode | What it does | Who it's for |
|------|-------------|-------------|
| **Teaching Mode** | 5-lesson interactive course — you build a complete PRD from scratch | PMs learning the techniques |
| **Usage Mode** | 9 MCP tools for generating, validating, and reviewing PRDs | PMs ready to use the tools |

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for step-by-step setup.

## Usage Mode: MCP Server Tools

The PRD Generator exposes 9 tools via MCP:

| Tool | Description |
|------|-------------|
| `list_templates` | Browse available PRD templates (Feature Launch, API Integration, Redesign, PRFAQ) |
| `get_questions` | Get the interactive questionnaire for a template |
| `generate_prd` | Generate a complete PRD from your answers |
| `generate_prd_custom` | Generate a PRD with your own custom section headings |
| `validate_prd` | Score your PRD for completeness (A-D grade) — pass full text |
| `validate_prd_file` | Score a PRD from a file path (reads the file for you) |
| `suggest_edge_cases` | Get edge cases specific to your PRD type |
| `review_prd` | Stakeholder review from 9 perspectives (or "all") |

### Reviewer Perspectives

| Reviewer | Focus |
|----------|-------|
| `backend_eng` | APIs, database, services, caching, scalability |
| `frontend_eng` | UI, state management, performance, browser compat |
| `designer` | UX, accessibility, consistency, user research |
| `qa` | Testability, acceptance criteria, edge cases, regression |
| `finance` | ROI, cost modeling, revenue impact, unit economics |
| `legal` | Privacy, compliance, liability, IP |
| `compliance` | Regulatory, SOC2, audit readiness, access controls |
| `pm` | Strategy alignment, scope, prioritization, competitive |
| `marketing` | Positioning, messaging, launch comms, growth |

## Teaching Mode: Interactive Course

5 lessons — you build a complete PRD from scratch:

| Lesson | Title | Duration |
|--------|-------|----------|
| 1 | Setup & First Draft | 20 min |
| 2 | Deepen with Questions | 15 min |
| 3 | Validate & Improve | 15 min |
| 4 | Stakeholder Review | 15 min |
| 5 | Polish & Export | 10 min |

Teaching Mode runs through CLAUDE.md + curriculum files — no separate MCP server needed.

## Project Structure

```
module-1-prd/
├── CLAUDE.md                   # Teaching system rules
├── mcp-server/                 # MCP server — 9 tools (shared by both modes)
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── teacher-mode/               # Teaching Mode
│   ├── curriculum/
│   │   ├── 1-setup-and-first-draft.md
│   │   ├── 2-deepen-with-questions.md
│   │   ├── 3-validate-and-improve.md
│   │   ├── 4-stakeholder-review.md
│   │   └── 5-polish-and-export.md
│   └── progress.json
├── templates/                  # PRD templates
│   ├── feature-launch.md
│   ├── api-integration.md
│   ├── redesign.md
│   └── prfaq.md
├── examples/                   # Example PRDs (2 per template type)
│   ├── feature-launch-notifications.md
│   ├── feature-launch-export-dashboard.md
│   ├── api-integration-stripe.md
│   ├── api-integration-analytics.md
│   ├── redesign-settings-page.md
│   └── redesign-onboarding-flow.md
├── references/                 # Dummy reference docs for @-mention practice
│   ├── product-strategy.md
│   ├── user-research.md
│   └── api-architecture.md
├── output/                     # Auto-saved PRD drafts
│   └── .gitkeep
├── EXPLAINER.md                # Deep-dive on techniques
├── QUICKSTART.md               # Setup guide
└── README.md                   # This file
```

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)
