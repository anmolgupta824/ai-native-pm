# Lesson 1: Welcome & Setup

**Estimated time: 10 minutes**
**Lesson type: Introduction + Setup**

---

## Why PMs Need AI Image Generation

Product Managers create and consume more visual content than almost any other role. Mockups in PRDs, graphics in pitch decks, assets for launch posts, icons for feature specs.

Yet most PMs either wait for design resources, use outdated screenshots, or skip visuals entirely. The result: PRDs without visual context, presentations with bullet points instead of graphics, and launch posts without eye-catching visuals.

### What Changes with DALL-E?

| Situation | Without AI | With DALL-E |
|-----------|-----------|-------------|
| PRD needs a mockup | Wait 2-3 days for design, or use text | Generate a concept visual in 30 seconds |
| Pitch deck visual | Stock photos or blank slides | Custom illustrations matching your narrative |
| Launch social post | Request from marketing (1-2 week lead) | Generate branded assets on demand |
| Internal tool icons | Skip them or use emoji | Consistent icon sets in minutes |

**Key insight:** This is not about replacing your design team. It is about creating visuals for the dozens of situations where waiting for a designer was never an option.

---

## What Is DALL-E?

DALL-E is OpenAI's image generation AI. You give it a text description (a "prompt") and it creates an image.

### Key Facts

- **Current version:** DALL-E 3
- **How it works:** Text prompt in, image out
- **Image sizes:** 1024x1024 (square), 1792x1024 (landscape), 1024x1792 (portrait)
- **Quality levels:** Standard (~$0.04) or HD (~$0.08)
- **Access:** Via OpenAI API with an API key

### How This Module Works

This module connects DALL-E to Claude Code through an **MCP server** (the same pattern as the PRD Generator in Module 1). You talk to Claude Code in natural language, and it uses the Image Generator tools to create visuals for you.

The flow:
1. You describe what you want in plain English
2. Claude Code sends the prompt to DALL-E via the MCP server
3. DALL-E generates the image
4. You get back a URL to view and download the image

### Cost Expectations

A typical session generates 10-20 images. At ~$0.04 per image, that is $0.40-$1.60 per session. Check your usage at platform.openai.com/usage.

---

## Setting Up Your API Key

To use DALL-E, you need an OpenAI API key. Here is how to get one:

### Step 1: Create an OpenAI Account
Go to **platform.openai.com** and sign up (or log in if you have one).

### Step 2: Generate an API Key
Go to **platform.openai.com/api-keys** and click "Create new secret key". Copy it -- it starts with "sk-".

### Step 3: Save Your Key in the Terminal

1. If Claude Code is running, type `/exit` to leave it temporarily

**Mac / Linux:**

2. In the same terminal window, paste this command (replace `sk-your-key-here` with the real key you copied):

```
export OPENAI_API_KEY="sk-your-key-here"
```

3. Press **Enter**. **Nothing will appear -- that is normal.** It worked silently.

4. To save it permanently (so it survives when you close the terminal), first check which shell you are using:

```
echo $SHELL
```

If it says `/bin/zsh`, paste this:
```
echo 'export OPENAI_API_KEY="sk-your-key-here"' >> ~/.zshrc
```

If it says `/bin/bash`, paste this instead:
```
echo 'export OPENAI_API_KEY="sk-your-key-here"' >> ~/.bash_profile
```

Replace `sk-your-key-here` with your real key again. Press **Enter**.

**Windows (PowerShell):**

2. In the same terminal window, paste this command (replace `sk-your-key-here` with the real key you copied):

```
$env:OPENAI_API_KEY = "sk-your-key-here"
```

3. Press **Enter**.

4. To save it permanently, paste this:

```
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-your-key-here", "User")
```

Replace `sk-your-key-here` with your real key again. Press **Enter**.

**What did that do?** The first command told your current terminal your key. The second saved it permanently so every new terminal session has it -- you only need to do this once.

### Step 4: Verify It Worked

Paste this in your terminal:

**Mac / Linux:**
```
echo $OPENAI_API_KEY
```

**Windows (PowerShell):**
```
echo $env:OPENAI_API_KEY
```

**If you see your key printed** -- you are all set. Type `claude` to restart Claude Code.

**If you see nothing:**
- Make sure you ran the commands in the same terminal window
- Check that you included the quotes around your key
- Try closing the terminal completely, opening a new one, and running `echo $OPENAI_API_KEY` again (this tests if the permanent save worked)

### Step 5: Add Billing
Add a payment method at platform.openai.com/account/billing. Start with a $5-10 limit -- that is enough for hundreds of images.

---

## Your Toolkit: 6 Image Generation Tools

The Image Generator MCP server gives you 6 tools:

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `list_styles` | Shows available image styles and presets | Start here to pick a visual style |
| `generate_image` | Creates an image from your prompt | When you are ready to generate |
| `refine_prompt` | Improves a vague prompt with details | Before generating, to get better results |
| `generate_variations` | Creates 3 versions of a concept | After generating, to explore options |
| `create_asset_pack` | Generates a set of 4 related images | For campaigns, presentations, or icon sets |
| `review_prompt` | Analyzes your prompt for issues | Before generating, to catch problems |

### The Recommended Flow

1. Start with `list_styles` to pick a visual direction
2. Write your initial prompt
3. Use `review_prompt` to check it
4. Use `refine_prompt` to improve it
5. Use `generate_image` to create the visual
6. Use `generate_variations` to explore alternatives

### Styles Available

Six preset styles: Product Mockup, Presentation Visual, Social Media Asset, Icon Set, Concept Illustration, Before/After Comparison.

---

## Getting Started

You are all set. Here is what comes next:

### Course Overview

| Lesson | Topic | What You'll Learn |
|--------|-------|-------------------|
| 1 | Welcome & Setup (this lesson) | Overview, API key, tools |
| 2 | Prompt Fundamentals | Anatomy of a great prompt, style keywords |
| 3 | Product Mockups & Wireframes | Generating visuals for PRDs and specs |
| 4 | Presentation & Pitch Visuals | Creating graphics for decks |
| 5 | Social Media & Marketing Assets | Launch graphics, blog headers |
| 6 | Advanced Techniques & Workflows | Variations, iteration, asset packs |

Each lesson has sections, exercises, and quizzes.

### Quick Commands

| What to say | What happens |
|-------------|--------------|
| "Continue" | Next section of the current lesson |
| "Start Lesson 2" | Jump to the next lesson |
| "Resume my course" | Pick up where you left off |
| "Explain what prompt engineering is" | Deep-dive on any concept |
| "Quiz me on Lesson 1" | Test your knowledge |
| "Show my progress" | See completed lessons |

Ready? Lesson 2 is where you learn the most important skill: writing great prompts.

---

## Exercise: Explore the Image Generator Tools

Get familiar with the MCP tools by exploring styles and trying your first image.

1. Ask Claude to list the available image styles (`list_styles`)
2. Pick the style that best matches something you need visually right now
3. Write a one-sentence description of an image you would find useful for your work
4. Use `review_prompt` to check your description for issues
5. Use `refine_prompt` to improve it, then use `generate_image` to create your first image

**Completion check:** You have completed this exercise if: (1) You can see all six styles, (2) You have generated at least one image, and (3) You understand the difference between your original prompt and the refined version.

---

## Quick Check

1. What is the primary benefit of AI image generation for PMs?
2. How much does a standard DALL-E 3 image cost?
3. What should you do BEFORE generating an image?
4. How does this module connect DALL-E to Claude Code?

---

*Next: [Lesson 2: Prompt Fundamentals](2-prompt-fundamentals.md)*
