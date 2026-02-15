# Module 1: PRD Generator

**Generate production-ready PRDs in 30 minutes.**

An MCP server that acts as your AI product management assistant. It walks you through an interactive questionnaire, suggests edge cases, validates completeness, reviews from multiple perspectives, and generates a structured PRD in Markdown.

## Two Ways to Use This Module

| Mode | What it does | Who it's for |
|------|-------------|-------------|
| **Teacher Mode** | 6-lesson interactive course on AI-assisted PRD writing | PMs learning the techniques |
| **Usage Mode** | 6 MCP tools for generating, validating, and reviewing PRDs | PMs ready to use the tools |

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for step-by-step setup.

## Usage Mode: MCP Server Tools

The PRD Generator exposes 6 tools via MCP:

| Tool | Description |
|------|-------------|
| `list_templates` | Browse available PRD templates |
| `get_template` | Get the interactive questionnaire for a template |
| `generate_prd` | Generate a complete PRD from your answers |
| `validate_prd` | Score your PRD for completeness (A-D grade) |
| `suggest_edge_cases` | Get edge cases specific to your PRD type |
| `review_prd` | Multi-perspective review (Engineer, Designer, QA) |

## Teacher Mode: Interactive Course

6 lessons covering the full PRD generation workflow:

| Lesson | Title | Duration |
|--------|-------|----------|
| 1 | Welcome to PRD Generation | 15 min |
| 2 | Context & Socratic Questioning | 20 min |
| 3 | PRD Structure & Templates | 20 min |
| 4 | Generating & Validating PRDs | 20 min |
| 5 | Multi-Perspective Review | 20 min |
| 6 | Edge Cases & Polish | 15 min |

Teacher Mode tools: `start_lesson`, `continue_lesson`, `resume_course`, `explain_concept`, `get_exercise`, `check_progress`, `quiz`

## Project Structure

```
module-1-prd/
├── mcp-server/              # Usage Mode — 6 production tools
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── teacher-mode/            # Teacher Mode — 6-lesson course
│   └── mcp-server/
│       ├── index.ts
│       ├── lessons/
│       │   ├── 1-welcome.ts
│       │   ├── 2-context-questioning.ts
│       │   ├── 3-prd-structure.ts
│       │   ├── 4-generating-validating.ts
│       │   ├── 5-multi-perspective-review.ts
│       │   └── 6-edge-cases-polish.ts
│       ├── package.json
│       └── tsconfig.json
├── templates/               # PRD templates
│   ├── feature-launch.md
│   ├── api-integration.md
│   └── redesign.md
├── examples/
│   └── example-prd.md
├── EXPLAINER.md             # Deep-dive on techniques
├── QUICKSTART.md            # Setup guide
└── README.md                # This file
```

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)
