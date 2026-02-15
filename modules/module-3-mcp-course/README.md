# Module 3: MCP Integrations Course

**Master MCP integrations in one weekend — zero prior knowledge required.**

Learn to connect Claude to Jira, Google Drive, Google Sheets, Figma, and any REST API. Build real PM automations that save hours every week.

## Two Ways to Learn

| Mode | Who it's for | How it works |
|------|-------------|--------------|
| **Teacher Mode** | New to MCP | Interactive lessons with exercises and quizzes. Start with "I want to learn MCP from scratch." |
| **Usage Mode** | Know the basics | Ready-to-use templates. Start with "Build me a Jira MCP server." |

## Course Structure (4-5 hours)

| # | Lesson | Duration | What You'll Learn |
|---|--------|----------|-------------------|
| 1 | Welcome to MCP | 10 min | What MCP is, why PMs should care |
| 2 | REST APIs for PMs | 30-60 min | HTTP methods, JSON, authentication |
| 3 | How MCP Works | 30 min | Architecture, tools, resources, prompts |
| 4 | Jira Integration | 45 min | Build an MCP server for Jira |
| 5 | Google Drive | 45 min | Connect Claude to Google Docs |
| 6 | Google Sheets | 45 min | Read/write spreadsheet data |
| 7 | Custom Servers | 90 min | Build an MCP server for ANY API |
| 8 | Figma (Optional) | 45 min | Design-to-development automation |

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for setup in under 10 minutes.

### Download Options

**Option A: Ask Claude (Easiest)**
```
Download the MCP Integrations Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-3-mcp-course/teacher-mode/mcp-server and run npm install && npm run build.
```

**Option B: Git Clone**
```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-3-mcp-course/teacher-mode/mcp-server
npm install
npm run build
```

**Option C: Download ZIP**
1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click **Code** → **Download ZIP**
3. Unzip and navigate to `modules/module-3-mcp-course/teacher-mode/mcp-server`
4. Run `npm install && npm run build`

## What's Included

```
module-3-mcp-course/
├── teacher-mode/          # Interactive learning system
│   ├── mcp-server/        # MCP server with 5 teaching tools
│   └── curriculum/        # 8 lesson guides (markdown)
├── usage-mode/            # Production-ready templates
│   └── templates/
│       └── jira-mcp/      # Ready-to-use Jira MCP server
├── examples/              # Real PM use case examples
├── README.md              # This file
├── QUICKSTART.md          # Setup guide
└── TROUBLESHOOTING.md     # Common issues + fixes
```

## Prerequisites

- Claude Code installed ([Module 0](../module-0-claude-basics/))
- Node.js 18 or higher
- No coding experience required

## Usage Mode Templates

Ready-to-use MCP servers you can install immediately:

| Template | Tools | Status |
|----------|-------|--------|
| **Jira** | Create, read, search, update issues | ✅ Available |
| Google Drive | Create, read, list, share files | 🔜 Coming soon |
| Google Sheets | Read/write ranges, create sheets | 🔜 Coming soon |
| Figma | Get frames, export images | 🔜 Coming soon |
| Generic REST API | Configurable for any API | 🔜 Coming soon |

## Real Use Cases You'll Build

1. **Automated Status Reports** — Read Jira tickets → Google Sheets capacity → Generate Google Doc report
2. **Design-to-Development** — Get Figma frames → Create Jira tickets → Generate design docs
3. **Capacity Planning** — Read team availability → Get backlog items → Suggest sprint allocation

## License

MIT — Free to use, modify, and share.
