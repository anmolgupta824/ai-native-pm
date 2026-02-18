# Lesson 4: Presentation & Pitch Visuals

**Estimated time: 15 minutes**
**Lesson type: Patterns + Practice**

---

## Why Visuals Transform Presentations

Most PM presentations are walls of text. A well-placed visual replaces three paragraphs of explanation and makes your argument more memorable.

### The Four Types of Presentation Visuals

| Visual Type | When to Use | Prompt Approach |
|-------------|-------------|-----------------|
| **Concept illustration** | Explaining abstract ideas | Metaphorical imagery representing your concept |
| **Before / After** | Showing impact or transformation | Split-view with contrasting states |
| **Process diagram** | Explaining workflows or systems | Step-by-step visual with numbered stages |
| **Hero background** | Title slides, section dividers | Abstract, atmospheric, with space for text |

### Format: Landscape (1792x1024)

For presentation slides, always use the landscape format:
- Size: 1792x1024
- Leave text space -- presentations need room for titles and captions
- Use "suitable for a presentation slide" in your prompts

### Quality: Standard vs HD

For presentations shown on projectors or large screens, consider HD quality ($0.08). For internal decks shared as PDFs, standard ($0.04) is sufficient.

---

## Creating Concept Illustrations

Concept illustrations visualize abstract ideas -- "fragmentation," "alignment," "scalability," "bottleneck."

### Prompt Pattern
```
An illustration representing [concept] in [style].
Visual metaphor: [metaphor]. [Color palette].
Professional, suitable for a corporate presentation.
Landscape format with space for text overlay.
```

### Examples

**"Siloed Communication"**
"An illustration representing organizational silos. Visual metaphor: five tall glass pillars, each containing a different team (icons of people, code, charts, design tools, megaphones). The pillars are separated by gaps. Muted, corporate illustration style. Blue and gray palette. Landscape format, space on the right for text."

**"Data-Driven Decision Making"**
"An illustration representing data-driven decisions. Visual metaphor: a compass whose needle is made of data streams and charts, pointing toward a glowing target. Professional, clean infographic style. Blue gradient background, white elements. Landscape format."

**"Breaking Down Barriers"**
"A split-view illustration. Left side: a wall of complex processes represented as tangled wires and red warning signs, muted gray tones. Right side: the same system simplified into clean, flowing lines with green checkmarks, bright blue tones. Professional corporate style, landscape format."

### Pro Tip
The best concept illustrations use a single, clear metaphor. Do not try to cram multiple ideas into one image.

---

## Before / After Comparison Visuals

Before/after visuals are powerful for showing impact, ROI, and transformation. They work for both product changes and process improvements.

### Prompt Pattern
```
A split-view comparison for a presentation slide.
Left side: [before state] -- [mood, colors].
Right side: [after state] -- [mood, colors].
Clear dividing line. [Style]. Landscape format.
```

### Examples

**Process Improvement**
"A split-view comparison for a presentation. Left: a cluttered desk with scattered papers, sticky notes, multiple browser tabs, and a frustrated person silhouette -- chaotic, muted gray and red tones. Right: a clean desk with a single laptop showing an organized dashboard, one cup of coffee, calm -- organized, bright blue and green tones. Professional infographic style. Landscape format, 1792x1024."

**Time Savings**
"A before-and-after visual showing time savings. Left side: a large clock showing 6 hours with calendar blocks filled with meetings and review cycles, muted tones. Right side: the same clock showing 45 minutes with a single focused work block, bright blue accent. Clean corporate style. Clear center dividing line. Landscape."

### Using the Style Preset
Use `generate_image` with style "comparison" to automatically add before/after framing keywords to your prompt.

### Pro Tip
Make the contrast dramatic. Use muted/gray tones for "before" and bright/blue tones for "after." The visual contrast reinforces the message.

---

## Hero Backgrounds and Section Dividers

Hero backgrounds set the mood for an entire presentation. They need to be atmospheric without competing with text.

### Prompt Pattern
```
A [mood] background image for a presentation about [topic].
Abstract, [style], [colors]. Professional.
Landscape format. Must have clear space for large white text overlay.
```

### Key Rules
1. **Leave text space** -- Include "space for text overlay" or "open area for title"
2. **Keep it abstract** -- Specific imagery competes with your title
3. **Match the mood** -- Innovation = blue/purple, Growth = green, Urgency = orange/red
4. **Low visual complexity** -- Gradients and simple shapes work better than detailed scenes

### Examples

**Technology / Innovation**
"An abstract background for a tech presentation. Subtle geometric network of connected nodes and lines, fading into a deep blue gradient. Futuristic, professional. Open space in the center-left for white title text. Landscape 1792x1024."

**Growth / Success**
"A hero background for a quarterly review presentation. Abstract upward-flowing lines and particles suggesting growth and momentum. Blue to teal gradient, professional, clean. Large open area in the upper half for white text overlay. Landscape."

### Pro Tip
Generate 2-3 variations of hero backgrounds and pick the one with the best text space. Use `generate_variations` for this.

---

## Exercise: Create a Presentation Visual

Generate a visual for a real presentation you are working on or plan to give.

1. Pick a slide from your next presentation that currently has only text
2. Decide what type of visual it needs (concept illustration, before/after, or hero background)
3. Write a prompt using the appropriate pattern -- include "landscape format, 1792x1024"
4. Use `generate_image` with the "presentation" style
5. Evaluate: does it enhance the slide's message? Would you use it in a real deck?

**Completion check:** You have completed this exercise if: (1) You generated a landscape-format visual, (2) The visual relates to a real presentation topic, and (3) You can explain how it would improve a specific slide.

---

## Quick Check

1. What image size should you use for presentation visuals?
2. What is the most important requirement for a hero background image?
3. How should you handle the color palette in before/after visuals?
4. What makes a good concept illustration for a presentation?

---

*Previous: [Lesson 3: Product Mockups & Wireframes](3-product-mockups.md)*
*Next: [Lesson 5: Social Media & Marketing Assets](5-social-media-assets.md)*
