# Module 2: Rollout Plan Generator

**Plan your next launch in 1 hour.**

An MCP server that helps Product Managers build comprehensive rollout plans with AI as a co-pilot. Assess risks, map stakeholders, generate timelines, and build rollback procedures — all from the command line.

## Two Ways to Use This Module

| Mode | What it does | Who it's for |
|------|-------------|-------------|
| **Teacher Mode** | 6-lesson interactive course on rollout planning | PMs learning the framework |
| **Usage Mode** | 5 MCP tools for building rollout plans | PMs ready to plan a launch |

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for step-by-step setup.

## Usage Mode: MCP Server Tools

The Rollout Plan Generator exposes 5 tools via MCP:

| Tool | Description |
|------|-------------|
| `create_rollout_plan` | Generate a complete rollout plan from feature context |
| `assess_risks` | Structured risk matrix with likelihood, impact, and mitigations |
| `map_stakeholders` | Stakeholder map with RACI matrix and conflict detection |
| `generate_timeline` | Dependency-aware timeline with milestones and buffer |
| `build_rollback_plan` | Step-by-step rollback procedures with triggers |

## Teacher Mode: Interactive Course

6 lessons covering the full rollout planning workflow:

| Lesson | Title | Duration |
|--------|-------|----------|
| 1 | Welcome to Rollout Planning | 15 min |
| 2 | Risk Assessment | 20 min |
| 3 | Stakeholder Mapping | 20 min |
| 4 | Timeline Generation | 20 min |
| 5 | Rollback Planning | 15 min |
| 6 | Putting It All Together | 20 min |

Teacher Mode tools: `start_lesson`, `continue_lesson`, `resume_course`, `explain_concept`, `get_exercise`, `check_progress`, `quiz`

## Project Structure

```
module-2-rollout/
├── mcp-server/              # Usage Mode — 5 production tools
│   ├── index.ts
│   ├── package.json
│   └── tsconfig.json
├── teacher-mode/            # Teacher Mode — 6-lesson course
│   └── mcp-server/
│       ├── index.ts
│       ├── lessons/
│       │   ├── 1-welcome.ts
│       │   ├── 2-risk-assessment.ts
│       │   ├── 3-stakeholder-mapping.ts
│       │   ├── 4-timeline-generation.ts
│       │   ├── 5-rollback-planning.ts
│       │   └── 6-putting-it-together.ts
│       ├── package.json
│       └── tsconfig.json
├── templates/               # Rollout plan templates
│   ├── rollout-plan.md
│   ├── risk-matrix.md
│   ├── stakeholder-map.md
│   ├── timeline.md
│   └── rollback-plan.md
├── examples/
│   └── example-rollout-plan.md
├── EXPLAINER.md             # Deep-dive on techniques
├── QUICKSTART.md            # Setup guide
└── README.md                # This file
```

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)
