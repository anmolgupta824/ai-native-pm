# AI Image Generator — Quick Start

Get up and running in under 15 minutes.

## Prerequisites

- [ ] Claude Code installed ([Install guide](../module-0-claude-basics/))
- [ ] Node.js 18+ installed (`node --version` to check)
- [ ] OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Setting Up Your OpenAI API Key

You need an OpenAI API key to use DALL-E image generation. Set it as an environment variable:

**Mac/Linux:**
```bash
export OPENAI_API_KEY="sk-your-key-here"
```

To make it permanent, add the line above to your `~/.zshrc` or `~/.bashrc` file.

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY = "sk-your-key-here"
```

> **Cost note:** DALL-E image generation costs ~$0.04 per standard image and ~$0.08 per HD image. A typical session generates 10-20 images (~$0.40-$1.60). Check your usage at [platform.openai.com/usage](https://platform.openai.com/usage).

---

## Choose Your Path

| Path | Who it's for | Time to first result |
|------|-------------|---------------------|
| **A: Learn Image Generation (Teacher Mode)** | New to AI image generation | ~10 min to first lesson |
| **B: Use Image Tools (Usage Mode)** | Already familiar with prompting | ~5 min to first image |

---

## Path A: Learn Image Generation (Teacher Mode)

Start here if you want to learn prompt craft and visual workflows for PM work.

### Step 1: Download the Module (~2 min)

Pick one of three options:

#### Option A: Ask Claude to do it (Easiest)

Open Claude Code and paste:

```
Download the AI Image Generation Course. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-4-image-gen/teacher-mode/mcp-server and run npm install && npm run build.
```

#### Option B: Git clone (Terminal)

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-4-image-gen/teacher-mode/mcp-server
npm install
npm run build
```

#### Option C: Download ZIP (No terminal needed)

1. Go to [github.com/anmolgupta824/ai-native-pm](https://github.com/anmolgupta824/ai-native-pm)
2. Click the green **"Code"** button → **"Download ZIP"**
3. Unzip and navigate to `modules/module-4-image-gen/teacher-mode/mcp-server`
4. Open Claude Code there and say: *"Run npm install && npm run build"*

### Step 2: Connect to Claude Code (~1 min)

Open Claude Code in the module folder and paste:

```
Add the Image Generation Teacher as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Your First Lesson (~10 min)

Open Claude Code and say:

```
I want to learn how to generate images with DALL-E for my PM work. Start me on Lesson 1.
```

The Teacher Mode will guide you through 6 lessons covering prompt fundamentals, product mockups, presentation visuals, social media assets, and advanced techniques.

### Teacher Mode Commands

| What to say | What happens |
|-------------|--------------|
| "Start Lesson 1" | Begin the Welcome & Setup lesson |
| "Continue" | Get the next section of the current lesson |
| "Start Lesson 3" | Jump to Product Mockups & Wireframes |
| "Resume my course" | Pick up where you left off after restarting |
| "Explain what prompt refinement is" | Get a PM-friendly explanation |
| "Give me an exercise for Lesson 2" | Hands-on practice |
| "Quiz me on Lesson 4" | Test your knowledge |
| "Show my progress" | See completed lessons with section-level detail |

---

## Path B: Jump Straight to Using Image Tools (Usage Mode)

Already know how to prompt? Skip the lessons and start generating images immediately.

### Step 1: Download & Build (~3 min)

#### Option A: Ask Claude (Easiest)

```
Download the AI Image Generator tools. Clone https://github.com/anmolgupta824/ai-native-pm.git, then go into modules/module-4-image-gen/mcp-server and run npm install && npx tsc.
```

#### Option B: Git clone

```bash
git clone https://github.com/anmolgupta824/ai-native-pm.git
cd ai-native-pm/modules/module-4-image-gen/mcp-server
npm install
npx tsc
```

### Step 2: Connect to Claude Code (~1 min)

```
Add the Image Generator as an MCP server. The server file is at ./dist/index.js in the current directory. Add it to my Claude Code MCP config with the command "node" and the full path to dist/index.js. Then restart to pick up the new server.
```

### Step 3: Start Using It

Try these prompts in Claude Code:

```
Show me the available image styles for product mockups.
```

```
Generate a mobile app screen showing a notifications center with a bell icon,
unread badge, and a dropdown panel of 5 notifications. Clean SaaS design,
blue and white color palette.
```

```
Refine this prompt: "a dashboard for analytics"
```

```
Create an asset pack of 4 LinkedIn post graphics for a product launch.
Blue gradient background, modern SaaS aesthetic.
```

### Available Image Tools

| Tool | What it does |
|------|-------------|
| `list_styles` | Browse image styles and presets |
| `generate_image` | Generate an image from a text prompt |
| `refine_prompt` | Improve a vague prompt with specificity |
| `generate_variations` | Create multiple versions of a concept |
| `create_asset_pack` | Generate a coordinated set of images |
| `review_prompt` | Analyze your prompt for issues before generating |

---

## Time Breakdown

| Path | Step | Time |
|------|------|------|
| **Teacher** | Download & install | 2 min |
| **Teacher** | Connect to Claude Code | 1 min |
| **Teacher** | Lesson 1 | 10 min |
| **Teacher** | Full course (6 lessons) | 2-3 hrs |
| **Usage** | Download, build, connect | 5 min |

---

## Resuming After Closing Claude Code

Your progress is automatically saved. When you come back:

1. **Open Claude Code** in the same project folder
2. **Say:** `Resume my image generation course`
3. The Teacher will tell you exactly where you left off

> **Note:** The MCP server config persists — you don't need to re-add it each time.

---

## Troubleshooting

**Server not connecting after restart?**
Re-add it:
```
Reconnect the Image Generation Teacher server. The server file is at ./dist/index.js in the teacher-mode/mcp-server directory. Add it to my Claude Code MCP config and restart.
```

**Build failed?**
Make sure you're in the correct directory and have Node.js 18+:
```bash
node --version  # Should be 18+
npm install
npm run build   # or npx tsc for usage mode
```

**OpenAI API key not working?**
Check that the environment variable is set:
```bash
echo $OPENAI_API_KEY  # Should print your key
```
If empty, set it: `export OPENAI_API_KEY="sk-your-key-here"`

**Images look wrong or generic?**
Use the `refine_prompt` tool to add specificity. Add style keywords like "flat design", "minimal", "SaaS aesthetic" to guide the output.

**Still stuck?**
Open an issue on GitHub or join the community discussion.
