# Module 2: AI Image Generation for PMs

**Generate product visuals, mockups, and marketing assets in minutes with DALL-E.**

An MCP server that connects Claude Code to OpenAI's DALL-E image generation API. Create product mockups, presentation visuals, social media graphics, and icon sets — all from natural language prompts, right inside your terminal.

## Two Ways to Use This Module

| Mode | What it does | Who it's for |
|------|-------------|-------------|
| **Teacher Mode** | 6-lesson interactive course on AI image generation for PMs | PMs learning prompt craft and visual workflows |
| **Usage Mode** | 6 MCP tools for generating, refining, and reviewing images | PMs ready to create visuals on demand |

## Quick Start

See [QUICKSTART.md](./QUICKSTART.md) for step-by-step setup.

## Usage Mode: MCP Server Tools

The Image Generator exposes 6 tools via MCP:

| Tool | Description |
|------|-------------|
| `list_styles` | Browse available image styles and presets |
| `generate_image` | Generate an image via DALL-E from a prompt |
| `refine_prompt` | Improve a vague prompt with specificity and style direction |
| `generate_variations` | Create multiple variations of a concept |
| `create_asset_pack` | Generate a coordinated set of related images |
| `review_prompt` | Analyze a prompt for common issues before generating |

## Teacher Mode: Interactive Course

6 lessons covering the full image generation workflow for PMs:

| Lesson | Title | Duration |
|--------|-------|----------|
| 1 | Welcome & Setup | 10 min |
| 2 | Prompt Fundamentals | 20 min |
| 3 | Product Mockups & Wireframes | 20 min |
| 4 | Presentation & Pitch Visuals | 15 min |
| 5 | Social Media & Marketing Assets | 15 min |
| 6 | Advanced Techniques & Workflows | 20 min |

Teacher Mode tools: `start_lesson`, `continue_lesson`, `resume_course`, `explain_concept`, `get_exercise`, `check_progress`, `quiz`

## Project Structure

```
module-2-image-gen/
├── mcp-server/              # Usage Mode — 6 production tools
│   ├── src/
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── teacher-mode/            # Teacher Mode — 6-lesson course
│   └── mcp-server/
│       ├── src/
│       │   ├── index.ts
│       │   └── lessons/
│       │       ├── 1-welcome.ts
│       │       ├── 2-prompt-fundamentals.ts
│       │       ├── 3-product-mockups.ts
│       │       ├── 4-presentation-visuals.ts
│       │       ├── 5-social-media-assets.ts
│       │       └── 6-advanced-techniques.ts
│       ├── package.json
│       └── tsconfig.json
├── templates/               # Prompt templates for PM use cases
│   ├── product-mockup.md
│   ├── presentation-visual.md
│   ├── social-media-asset.md
│   └── icon-set.md
├── examples/
│   ├── example-product-mockup.md
│   └── example-social-pack.md
├── EXPLAINER.md             # Deep-dive on techniques
├── QUICKSTART.md            # Setup guide
└── README.md                # This file
```

## Requirements

- Node.js 18+
- Claude Code (or any MCP-compatible client)
- OpenAI API key (for DALL-E access)
