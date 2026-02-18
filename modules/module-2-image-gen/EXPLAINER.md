# Module 2: AI Image Generation for Product Managers

**Time:** 2–3 hours (full course) | **Prerequisites:** Claude Code installed, OpenAI API key | **Cost:** Free

> PMs communicate through visuals every day — mockups in PRDs, graphics in pitch decks, assets for launch posts. This module teaches you to generate all of them from natural language prompts using DALL-E, directly inside Claude Code.

---

## Overview

Product Managers create and consume more visual content than almost any other role. Mockups for PRDs, visuals for stakeholder decks, graphics for launch announcements, icons for feature specs. Yet most PMs either wait for design resources, use outdated screenshots, or skip visuals entirely.

This module changes that. Using OpenAI's DALL-E image generation API connected to Claude Code via MCP, you can generate product-quality visuals from text descriptions in seconds. Not as a replacement for your design team — as a way to communicate ideas faster, iterate on concepts before involving designers, and create assets for the dozens of informal contexts where hiring a designer was never an option.

### What You'll Learn

- How to write effective image generation prompts (the anatomy of a great prompt)
- Generating product mockups and wireframe-style visuals for PRDs
- Creating presentation graphics for stakeholder decks and pitch materials
- Producing social media assets and marketing visuals for launches
- Advanced techniques: variations, iteration, asset packs, and building visual libraries

---

## Why PMs Need Image Generation

| Use Case | Without AI | With DALL-E |
|----------|-----------|-------------|
| PRD mockup | Wait 2-3 days for design, or use text descriptions | Generate a concept visual in 30 seconds |
| Pitch deck visuals | Stock photos or blank slides | Custom illustrations matching your narrative |
| Launch social posts | Request from marketing team (1-2 week lead time) | Generate branded assets on demand |
| Competitor mood board | Screenshot and crop manually | Generate comparison-style visuals |
| User persona illustrations | Generic clip art or stock photos | Custom illustrations matching your personas |
| Internal tool icons | Skip them or use emoji | Generate consistent icon sets |

### The PM Advantage

PMs are actually well-positioned for AI image generation because the skill is about describing what you want — which is what PMs do all day.

| PM Skill | How It Translates |
|----------|------------------|
| Writing requirements | Writing detailed image prompts |
| Describing user flows | Describing visual compositions |
| Giving design feedback | Iterating on generated images |
| Stakeholder communication | Choosing the right visual style for the audience |
| Product sense | Knowing what visual will land with users |

---

## The Five Core Techniques

### Technique 1: Prompt Anatomy

A great image prompt has four components:

| Component | What it does | Example |
|-----------|-------------|---------|
| **Subject** | What to generate | "A mobile app dashboard" |
| **Style** | Visual treatment | "Clean, minimal, flat design" |
| **Composition** | Layout and framing | "Top-down view, centered, white background" |
| **Details** | Specific elements | "Showing 3 metric cards, a line chart, and a navigation bar" |

**Weak prompt:** "A dashboard"
**Strong prompt:** "A clean, minimal mobile app dashboard in flat design style. Top-down view on white background. Shows 3 metric cards at the top (revenue, users, conversion rate) with a line chart below and a bottom navigation bar. Modern SaaS aesthetic, blue and gray color palette."

The difference between a vague and a specific prompt is the difference between a generic stock image and a visual that communicates your exact idea.

> **Pro tip:** Use the `refine_prompt` tool to transform vague prompts into detailed ones automatically. It adds style, composition, and detail layers.

### Technique 2: Product Mockups

Generate visual representations of features you are speccing, building, or pitching.

| Mockup Type | When to Use | Prompt Pattern |
|-------------|-------------|----------------|
| **App screen** | PRDs, feature specs | "A [device] screen showing [feature] with [specific elements]. [Style] design." |
| **Dashboard** | Analytics features, admin panels | "A [platform] dashboard displaying [metrics] with [chart types]. [Color palette]." |
| **Onboarding flow** | New user experience specs | "A [step count]-step onboarding flow for [product]. Each step shows [elements]." |
| **Settings page** | Configuration features | "A settings panel with [sections] organized as [layout]. [Design system]." |

These are not pixel-perfect designs. They are communication tools — visuals that help stakeholders, engineers, and designers understand what you are proposing before anyone opens Figma.

> **Pro tip:** Include "UI design" or "app interface" in your prompt to steer DALL-E toward interface-style outputs rather than artistic illustrations.

### Technique 3: Presentation Visuals

Create graphics for decks, all-hands presentations, and stakeholder updates.

| Visual Type | Use Case | Prompt Approach |
|-------------|----------|-----------------|
| **Concept illustration** | Explaining abstract ideas | "An illustration representing [concept] in [style]. Metaphor: [visual metaphor]." |
| **Before/after** | Showing impact | "A split-view comparison. Left: [before state]. Right: [after state]. [Style]." |
| **Process diagram** | Explaining workflows | "A visual diagram showing [process] with [steps]. [Color coding]. Clean infographic style." |
| **Hero image** | Slide backgrounds | "A [mood] background image for a presentation about [topic]. [Colors], abstract, professional." |

These visuals elevate presentations from bullet-point-heavy slides to visual stories. A well-placed concept illustration can replace three paragraphs of explanation.

### Technique 4: Social Media & Marketing Assets

Generate visuals for product launches, blog posts, and social media campaigns.

| Asset Type | Platform | Prompt Considerations |
|-----------|----------|----------------------|
| **Social post graphic** | LinkedIn, Instagram | Bold text area, brand colors, 1:1 or 4:5 ratio |
| **Blog header** | Medium, company blog | Wide format, thematic imagery, space for title overlay |
| **Launch banner** | Product Hunt, email | Horizontal, product-focused, celebration feel |
| **Feature highlight** | Twitter/X, LinkedIn | Single feature focus, before/after or demo feel |

> **Pro tip:** Use the `create_asset_pack` tool to generate a coordinated set of 4 social media visuals that share a consistent style, rather than generating them one at a time.

### Technique 5: Iteration and Variations

The first image is rarely the final one. The real workflow is:

1. **Generate** — Create an initial image from your prompt
2. **Evaluate** — What works? What does not?
3. **Refine** — Adjust the prompt based on what you see
4. **Vary** — Generate 2-3 variations of the best version
5. **Select** — Pick the winner

This cycle typically takes 3-5 iterations, or about 5 minutes. Compare that to 3 days of back-and-forth with a designer for a non-critical internal visual.

| Iteration | What to Adjust | Example |
|-----------|---------------|---------|
| **Too generic** | Add specific details | "Add a blue sidebar with 5 navigation items" |
| **Wrong style** | Change style keywords | Replace "realistic" with "flat design, minimal" |
| **Wrong mood** | Adjust color/tone | Replace "vibrant" with "muted, professional, corporate" |
| **Wrong composition** | Change layout terms | Replace "centered" with "left-aligned, with white space on right" |

---

## Real-World Walkthrough

Here is the full flow for a PM creating visuals for a feature launch:

**Scenario:** You are launching an in-app notifications center and need visuals for: the PRD, a stakeholder deck, and a LinkedIn launch post.

**Step 1: PRD mockup** (2 min)
```
Generate a mobile app screen showing a notifications center.
Bell icon in top nav with red badge showing "3". Dropdown panel
showing 5 notifications grouped by "Today" and "This Week".
Each notification has an icon, title, timestamp, and blue dot
for unread. Clean, minimal UI design, white background, gray
and blue color palette. Modern SaaS aesthetic.
```

**Step 2: Refine with tool** (1 min)
- Use `refine_prompt` to add composition and style details
- Result: sharper prompt with specific UI element sizes, spacing, typography references

**Step 3: Presentation concept visual** (2 min)
```
A split-view illustration for a presentation slide.
Left side: a cluttered desk with scattered email notifications,
Slack messages, sticky notes — chaos, muted colors.
Right side: a clean mobile screen with an organized notification
center — order, bright blue accents.
Professional infographic style, white background,
suitable for a corporate presentation.
```

**Step 4: LinkedIn launch graphic** (2 min)
```
A bold, modern social media graphic for a product launch.
Text area on the left reading "Notifications Center — Live".
Right side shows a stylized phone screen with a notification panel.
Blue gradient background, white text, clean SaaS branding.
Square format (1:1), suitable for LinkedIn post.
```

**Step 5: Generate variations** (3 min)
- Create 3 variations of the LinkedIn graphic with different color treatments
- Pick the one that matches your brand best

**Total: ~10 minutes for 3 visuals across 3 channels.**

Previously, this would have been: 1) no visuals at all, 2) a Figma request with 3-5 day turnaround, or 3) hours spent tweaking Canva templates.

---

## Best Practices

### Do

- **Start with the purpose, then the visual.** "I need a mockup for my PRD" leads to a better prompt than "generate a dashboard"
- **Be specific about style.** "Flat design, minimal, SaaS aesthetic" produces dramatically different results from "realistic, detailed"
- **Include composition details.** Where elements sit, what the background looks like, the color palette — these details matter
- **Iterate quickly.** Generate, evaluate, refine. Three rounds of 30-second generations beats one hour of prompt crafting
- **Use templates for repeated work.** If you create launch graphics monthly, save your best prompts as templates
- **Pair with your design team.** Use generated images as visual briefs for designers, not as final assets

### Don't

- **Don't use generated images as final production assets.** They are communication tools and starting points, not design deliverables
- **Don't expect pixel-perfect UI.** DALL-E generates approximate visual concepts, not production-ready screens
- **Don't skip the refinement step.** The first prompt rarely produces the best result
- **Don't forget your audience.** Stakeholder decks need polished visuals; internal PRDs can use rougher concepts
- **Don't generate images of real people.** Use illustrated or abstract representations for personas and user stories
- **Don't rely on text in images.** DALL-E often renders text inaccurately — add text overlays manually if needed

---

## Pro Tips

| Tip | How | Benefit |
|-----|-----|---------|
| **Build a prompt library** | Save your best prompts in a folder alongside your project files | 10-second generation for recurring visual needs |
| **Use style references** | Add "in the style of [brand aesthetic]" to prompts | Consistent visual language across all your assets |
| **Generate asset packs** | Use `create_asset_pack` for coordinated sets | Consistent social media campaigns in one command |
| **Review before generating** | Use `review_prompt` to catch issues | Fewer wasted generations, better first results |
| **Combine with PRD workflow** | Generate mockups during PRD creation (Module 1) | Richer PRDs with visual context |
| **Size matters** | Specify dimensions: "1024x1024" for social, "1792x1024" for presentations | Right format for every channel |

---

## Troubleshooting

**Problem: Images look too artistic, not product-like**
- *Cause:* Prompt lacks UI/product-specific keywords
- *Fix:* Add "UI design", "app interface", "flat design", "SaaS dashboard" to steer toward product aesthetics. Avoid "painting", "artistic", "creative" unless that is what you want.

**Problem: Text in images is garbled or misspelled**
- *Cause:* DALL-E does not reliably render text
- *Fix:* Generate the image without text, then add text overlays in Canva, Figma, or any image editor. Use placeholder text like "Lorem ipsum" in prompts if you need text areas.

**Problem: Colors do not match my brand**
- *Cause:* Prompt does not specify brand colors
- *Fix:* Include hex codes or color descriptions: "primary blue (#2563EB), white background, gray (#4B5563) accents." Be explicit about color palette.

**Problem: Images feel inconsistent across a set**
- *Cause:* Each image was prompted independently
- *Fix:* Use `create_asset_pack` to generate coordinated sets, or include consistent style instructions across all prompts: "Same style as: clean, minimal, blue and white, flat design, white background."

**Problem: API key errors**
- *Cause:* OpenAI API key not set or expired
- *Fix:* Set your API key as an environment variable: `export OPENAI_API_KEY="sk-..."`. Check your usage limits at platform.openai.com.

---

## What's Next?

Now that you can generate visuals on demand:

- **Combine with Module 1** — Add generated mockups directly into your PRDs
- **Combine with Module 3** — Use MCP automation to pull live data into your visual workflows
- **Build a visual library** — Generate and organize reusable assets for your product
- **Share with your team** — Use generated visuals as "visual briefs" for your design team

---

## Quick Reference

| Tool | What It Does | When to Use |
|------|-------------|-------------|
| `list_styles` | Shows available image styles and presets | Start here to pick a visual style |
| `generate_image` | Creates an image from your prompt | When you are ready to generate |
| `refine_prompt` | Improves a vague prompt with details | Before generating, to get better results |
| `generate_variations` | Creates multiple versions of a concept | After generating, to explore options |
| `create_asset_pack` | Generates a coordinated set of images | For social media campaigns or icon sets |
| `review_prompt` | Analyzes your prompt for common issues | Before generating, to catch problems |
