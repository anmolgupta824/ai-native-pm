# Module 1: PRD Generator

**Generate production-ready PRDs in 30 minutes.**

An MCP server that acts as your AI product management assistant. It walks you through an interactive questionnaire, suggests edge cases, validates completeness, and generates a structured PRD in Markdown.

## What You Get

- **Interactive PRD Wizard** - 10 essential questions adapted to your PRD type
- **3 Templates** - Feature launch, API integration, and product redesign
- **Smart Validation** - Checks for missing sections and suggests improvements
- **Edge Case Generator** - Catches scenarios you might miss
- **Export to Markdown** - Ready for Notion, Confluence, or GitHub

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for step-by-step setup (30 minutes).

## Templates

| Template | Best For | Key Sections |
|----------|----------|-------------|
| Feature Launch | New features in existing products | Requirements, user stories, launch plan |
| API Integration | Third-party integrations | Auth, data flow, error handling, monitoring |
| Redesign | UX/UI overhauls | Current state analysis, migration plan, success metrics |

## MCP Server Tools

The PRD Generator exposes 5 tools via MCP:

| Tool | Description |
|------|-------------|
| `list_templates` | Browse available PRD templates |
| `get_questions` | Get the interactive questionnaire for a template |
| `generate_prd` | Generate a complete PRD from your answers |
| `validate_prd` | Score your PRD for completeness (A-D grade) |
| `suggest_edge_cases` | Get edge cases specific to your PRD type |

## How It Works

1. **Choose a template** - The agent helps you pick the right one
2. **Answer questions** - 10 questions asked conversationally, one at a time
3. **Generate PRD** - A structured document is created from your answers
4. **Validate & improve** - The agent scores your PRD and suggests improvements
5. **Export** - Copy the Markdown into your team's tool of choice

## Project Structure

```
module-1-prd/
├── mcp-server/
│   ├── index.ts          # MCP server with 5 tools
│   ├── package.json
│   └── tsconfig.json
├── templates/
│   ├── feature-launch.md # Feature launch PRD template
│   ├── api-integration.md# API integration PRD template
│   └── redesign.md       # Product redesign PRD template
├── examples/
│   └── example-prd.md    # Complete example PRD
├── QUICKSTART.md         # 0 to first PRD in 30 mins
└── README.md             # This file
```

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)

## License

MIT
