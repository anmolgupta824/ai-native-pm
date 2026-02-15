# Lesson 6: Advanced Techniques & Workflows

**Estimated time: 20 minutes**
**Lesson type: Advanced + Capstone**

---

## Mastering Variations

The `generate_variations` tool creates 3 distinct versions of any concept. This is the fastest way to explore visual directions.

### How Variations Work

You provide a base concept. The tool creates three takes:
- **Variation A: Minimal & Clean** -- Stripped-down, lots of whitespace
- **Variation B: Bold & Vibrant** -- High-energy, saturated colors
- **Variation C: Professional & Corporate** -- Polished, muted, business-appropriate

### When to Use Variations

| Situation | Why Variations Help |
|-----------|-------------------|
| You are not sure what style you want | Compare 3 styles side-by-side |
| Stakeholders have different preferences | Present options and let them choose |
| You need multiple options for A/B testing | Generate alternatives in one step |
| The first result is close but not right | See if a different tone works better |

### Variation Strategy

1. **Start broad:** Generate variations of the overall concept
2. **Pick the direction:** Choose A, B, or C
3. **Iterate narrow:** Refine only the chosen direction
4. **Generate final:** Polish and generate the final version

This two-phase approach (broad exploration then narrow refinement) is faster than iterating one prompt 10 times.

### Pro Tip
You can set `generateImages: true` to see all 3 variations as actual images (~$0.12 total). Or set it to `false` to see the prompts first and only generate the one you like (~$0.04).

---

## Building Asset Packs

The `create_asset_pack` tool generates 4 related images that share a consistent visual style. This is essential for campaigns, presentations, and product pages.

### Four Pack Types

**1. Social Campaign (4 posts)**
- Announcement post
- Feature highlight
- Social proof / testimonial
- Call-to-action

**2. Presentation Set (4 slides)**
- Title slide hero background
- Problem slide visual
- Solution slide visual
- Results slide visual

**3. Icon Set (4 matching icons)**
- Core feature icon
- Integration icon
- Analytics icon
- Security / trust icon

**4. Feature Highlights (4 features)**
- Main value proposition
- Speed / efficiency
- Collaboration
- Results / impact

### Controlling Consistency

The key parameter is `styleGuide`. This string is appended to every prompt in the pack:

Good: "Clean, minimal, blue (#2563EB) and white, flat design, modern SaaS aesthetic"
Bad: "Nice looking" (too vague)

The more specific your style guide, the more consistent the pack.

### Example

```
create_asset_pack({
  theme: "AI-powered notifications center launch",
  packType: "social-campaign",
  styleGuide: "Clean, minimal, blue and white, flat design, SaaS branding, bold visual hierarchy",
  generateImages: true
})
```

This generates 4 coordinated social media images for your launch campaign.

---

## Building Your Prompt Library

As you generate images, you will discover prompts that produce great results. Save them.

### What to Save

For each saved prompt, track:
- **The prompt text** -- The full prompt that produced a good result
- **The style preset used** -- Which of the 6 styles you selected
- **The size** -- 1024x1024, 1792x1024, or 1024x1792
- **What worked** -- Notes on why this prompt was effective
- **The use case** -- When to use this prompt again

### Suggested Library Structure

```
prompt-library/
  mockups/
    mobile-app-screen.txt
    web-dashboard.txt
    onboarding-flow.txt
  presentations/
    concept-illustration.txt
    before-after.txt
    hero-background.txt
  social/
    launch-announcement.txt
    stat-graphic.txt
    comparison.txt
  icons/
    feature-icon.txt
    icon-set-style-guide.txt
```

### Template Prompt Format

Each saved prompt should be a template with placeholders:

```
A [device] screen showing [FEATURE NAME] with [UI ELEMENTS].
Clean flat design, [COLOR PALETTE]. Modern SaaS aesthetic.
[SIZE] format.

Variables:
- FEATURE NAME: The feature being mocked up
- UI ELEMENTS: Specific buttons, cards, charts, etc.
- COLOR PALETTE: Brand colors or neutral palette
- SIZE: 1024x1024 for social, 1792x1024 for presentations
```

### Starter Templates
The `templates/` directory in this module includes 4 pre-built prompt templates to get you started.

---

## Combining with Other Modules

Image generation becomes even more powerful when combined with other modules.

### With Module 1: PRD Generator

1. Generate your PRD using Module 1's Socratic questioning workflow
2. At the Design Considerations section, generate mockups using this module
3. Include mockup URLs in your PRD
4. Run `generate_variations` to show 2-3 visual options for stakeholder discussion

**Result:** PRDs with visual context that align stakeholders faster.

### With Module 2: Rollout Plan Generator

1. Create your rollout plan using Module 2
2. Generate launch announcement graphics for each phase
3. Create before/after visuals showing the expected impact
4. Build a social campaign asset pack for the launch

**Result:** Rollout plans with ready-to-use launch visuals.

### With Module 3: MCP Integrations

If you have built custom MCP servers (Module 3), you can:
- Pull data from Jira or analytics tools to inform your visuals
- Auto-generate weekly report graphics from dashboard data
- Create visual summaries of sprint reviews

### The Full PM Visual Workflow

```
Feature Idea
    |
PRD (Module 1) + Mockups (Module 4)
    |
Rollout Plan (Module 2) + Launch Graphics (Module 4)
    |
Social Campaign (Module 4 Asset Pack)
    |
Ship & Measure
```

This is what "AI-native PM" looks like in practice: every document has visuals, every launch has graphics, every presentation has concept illustrations -- all generated in minutes, not days.

---

## Course Complete: What's Next

Congratulations! You have completed the AI Image Generation course. Here is what you now know:

### Skills Acquired

| Lesson | Skill |
|--------|-------|
| 1. Welcome & Setup | API key setup, tool overview |
| 2. Prompt Fundamentals | Four-component prompts, style keywords, iteration |
| 3. Product Mockups | Feature mockups, PRD integration |
| 4. Presentation Visuals | Concept illustrations, before/after, hero backgrounds |
| 5. Social Media Assets | Platform-specific graphics, campaign consistency |
| 6. Advanced Techniques | Variations, asset packs, prompt library, cross-module workflows |

### Immediate Next Steps

1. **Start your prompt library** -- Save the best prompts from your exercises
2. **Generate a mockup for your current PRD** -- Apply Lesson 3 to real work
3. **Create your first asset pack** -- Use `create_asset_pack` for your next launch
4. **Build a visual brief** -- Generate concept images before your next design review

### Resources

- **Prompt templates:** Check the `templates/` directory for pre-built templates
- **Example outputs:** Check the `examples/` directory for real prompt-to-image examples
- **EXPLAINER.md:** Detailed reference for all techniques
- **QUICKSTART.md:** Quick setup guide to share with colleagues

Thank you for completing this course. Now go generate some visuals.

---

## Exercise: Build Your First Asset Pack

Create a coordinated set of visuals for a product launch or campaign.

1. Pick a product feature or announcement you want to promote
2. Decide on a pack type: social-campaign, presentation-set, icon-set, or feature-highlights
3. Write a style guide string (colors, design style, mood)
4. Use `create_asset_pack` with your theme, pack type, and style guide
5. Review the 4 prompts -- then set generateImages: true to create the full pack

**Completion check:** You have completed this exercise if: (1) You generated a coordinated asset pack, (2) The 4 images share a consistent visual style, and (3) You saved the style guide for future use.

---

## Quick Check

1. What is the recommended approach for exploring visual directions?
2. What parameter controls visual consistency in asset packs?
3. What should you save in your prompt library?
4. How does image generation combine with Module 1 (PRD Generator)?

---

*Previous: [Lesson 5: Social Media & Marketing Assets](5-social-media-assets.md)*
