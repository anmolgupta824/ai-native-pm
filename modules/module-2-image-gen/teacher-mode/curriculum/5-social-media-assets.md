# Lesson 5: Social Media & Marketing Assets

**Estimated time: 15 minutes**
**Lesson type: Patterns + Practice**

---

## Visual Needs by Platform

PMs increasingly post on LinkedIn, write blog posts, and contribute to company social channels. Each platform has different visual requirements.

### Platform Requirements

| Platform | Format | Style |
|----------|--------|-------|
| **LinkedIn** | 1:1 (1024x1024) or 1.91:1 (1200x628) | Professional, bold text space, strong visual hierarchy |
| **Instagram** | 1:1 (1024x1024) or 4:5 (1024x1280) | Eye-catching, vibrant, clean design |
| **Twitter/X** | 16:9 (1024x576) or 1:1 | Bold, minimal, readable at small sizes |
| **Blog header** | Wide (1792x1024) | Thematic, space for title overlay |
| **Product Hunt** | Landscape (1270x760) | Product-focused, clean, demo-style |

### What Works on LinkedIn

LinkedIn is the primary channel for most PMs. Visuals that perform well:
- **Stat graphics** -- Bold numbers showing impact ("6 hrs to 45 min")
- **Comparison visuals** -- Side-by-side before/after or tool comparisons
- **Screenshot-style** -- Tool demos that look like real product screenshots
- **Quote cards** -- Key insights with attribution

### What Does NOT Work

- Generic stock photos (people shaking hands, laptops on desks)
- Overly corporate, polished graphics that feel like ads
- Images with too much text (save that for the caption)
- Unrelated decorative images that add no information

---

## Prompt Patterns for Social Media

### Pattern: Launch Announcement
```
A bold, modern social media graphic for a product launch.
Text area on the [side] for [text content].
[Side] shows [product visual].
[Background style], [color palette].
Square format (1:1), suitable for [platform].
```

**Example:**
"A bold social media graphic for a product launch. Left side has a large text area for the announcement title. Right side shows a stylized laptop screen with a clean dashboard interface. Blue gradient background, white text space on left, modern SaaS branding. Square format, suitable for LinkedIn."

### Pattern: Stat / Data Graphic
```
A data visualization graphic showing [key stat].
Large, bold [number/comparison] as the focal point.
[Supporting visual elements]. [Style], [colors].
Square format, clean background.
```

### Pattern: Comparison Visual
```
A side-by-side comparison graphic for social media.
Left: [option A] with [description]. Right: [option B] with [description].
Clean divider. [Style]. Bold labels. Square format.
```

### Pattern: Blog Header
```
A wide blog header image for an article about [topic].
[Thematic imagery]. [Style], [colors].
Space for title text overlay on the [side].
Landscape format (1792x1024).
```

### Pro Tip
For social media, use the `social-media` style preset -- it automatically adds "bold, eye-catching, strong visual hierarchy" to your prompt.

---

## Maintaining Visual Consistency

One-off images are fine for individual posts. But campaigns need visual consistency -- same colors, same style, same feel across multiple images.

### The Asset Pack Approach

Use `create_asset_pack` to generate coordinated sets:

**Social Campaign Pack (4 images):**
1. Announcement post -- Launch graphic with text space
2. Feature highlight -- One key feature showcased
3. Social proof -- Trust-building visual for testimonials
4. Call-to-action -- Action-oriented graphic with urgency

### Consistency Tips

1. **Use the same style guide for every prompt.** Add a standard suffix like: "Clean, minimal, blue (#2563EB) and white, flat design, modern SaaS branding."

2. **Generate all images in one session.** The same session tends to produce more consistent results than separate sessions.

3. **Use the same background treatment.** If your first image has a blue gradient, use "blue gradient background" in all subsequent prompts.

4. **Keep element count consistent.** If one post is minimal (3 elements), do not make another one complex (12 elements).

### Building a Prompt Library

Save your best prompts in a file alongside your project:
```
social-prompts/
  launch-announcement.txt
  stat-graphic.txt
  comparison-visual.txt
  blog-header.txt
```

Next time you need a similar visual, start from the saved prompt instead of from scratch.

---

## The Text Overlay Workflow

Since DALL-E does not render text reliably, the workflow for text-heavy social posts is:

### Step 1: Generate the Background
Create the image with designated text space but without actual text. Include "text area on the left" or "space for title overlay" in your prompt.

### Step 2: Add Text Manually
Use any of these tools (all free):
- **Canva** -- Easiest, drag-and-drop, free tier
- **Figma** -- More control, free for individual use
- **Preview (Mac)** -- Basic text overlay built into macOS
- **Paint (Windows)** -- Basic but functional

### Step 3: Export
Export at the platform's recommended resolution:
- LinkedIn: 1200x1200 (1:1) or 1200x628 (landscape)
- Instagram: 1080x1080 (1:1) or 1080x1350 (4:5)
- Blog: 1200x630 or wider

### What to Generate vs What to Add Manually

| Element | Generate with DALL-E | Add Manually |
|---------|---------------------|-------------|
| Background imagery | Yes | No |
| Color blocks / shapes | Yes | Yes |
| Icons and illustrations | Yes | No |
| Headlines and titles | No | Yes |
| Body text | No | Yes |
| Brand logo | No | Yes |
| Statistics and numbers | No | Yes |

### Pro Tip
When generating, include "with designated text area" or "with clear space on [side] for text overlay." This ensures the generated image has room for your manually added text.

---

## Exercise: Create a Social Media Launch Graphic

Generate a visual for a product launch or feature announcement post.

1. Pick a product, feature, or announcement you want to promote on LinkedIn or Instagram
2. Write a prompt using the launch announcement pattern -- specify square format
3. Use `generate_image` with the "social-media" style
4. Evaluate: is it bold enough for a social feed? Does it have space for text?
5. Bonus: use `create_asset_pack` with type "social-campaign" to generate a coordinated set of 4 visuals

**Completion check:** You have completed this exercise if: (1) You generated at least one social media graphic, (2) The image has clear space for text overlay, and (3) You can see yourself using it (with manual text added) on LinkedIn or Instagram.

---

## Quick Check

1. What format should you use for LinkedIn post images?
2. Why should you NOT include important text in DALL-E prompts for social media?
3. How do you maintain visual consistency across a social media campaign?
4. What is the purpose of a prompt library?

---

*Previous: [Lesson 4: Presentation & Pitch Visuals](4-presentation-visuals.md)*
*Next: [Lesson 6: Advanced Techniques & Workflows](6-advanced-techniques.md)*
