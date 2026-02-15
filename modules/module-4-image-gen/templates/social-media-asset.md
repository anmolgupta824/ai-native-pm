# Social Media Asset Prompt Templates

Ready-to-use prompt templates for generating social media graphics with DALL-E. Replace the `[PLACEHOLDERS]` with your specifics.

---

## Template 1: Launch Announcement Post

```
A bold, eye-catching graphic for a [PLATFORM] post announcing [WHAT'S LAUNCHING].
[VISUAL CENTERPIECE] on a [BACKGROUND DESCRIPTION].
[COLOR PALETTE]. Modern, clean design with strong visual hierarchy.
Space at top and bottom for text overlay.
Aspect ratio: [RATIO].
```

**Variables:**
- `PLATFORM`: "LinkedIn", "Instagram", "Twitter/X"
- `WHAT'S LAUNCHING`: e.g., "a new AI-powered analytics feature"
- `VISUAL CENTERPIECE`: e.g., "A glowing rocket icon lifting off from a laptop screen"
- `BACKGROUND`: e.g., "dark gradient background with subtle grid pattern"
- `COLOR PALETTE`: e.g., "Electric blue and white on dark navy"
- `RATIO`: LinkedIn → "1200x627 landscape", Instagram → "1080x1080 square"

**Recommended settings:**
- Style: `social-media`
- Size: `1024x1024` (square, works for most platforms) or `1792x1024` (LinkedIn landscape)
- Quality: `standard`

**Example filled:**
```
A bold, eye-catching graphic for a LinkedIn post announcing a new AI-powered PRD generator tool.
A glowing document icon transforming into a structured blueprint, with sparkle effects around it,
on a dark gradient background with subtle grid pattern.
Electric blue (#2563EB) and white on dark navy. Modern, clean design with strong visual hierarchy.
Space at top and bottom for text overlay. Landscape format.
```

---

## Template 2: Stat / Data Highlight Post

```
A clean infographic-style visual highlighting the stat: [STAT WITH NUMBER].
[VISUAL REPRESENTATION OF THE DATA] as the focal point.
[COLOR PALETTE]. Bold, attention-grabbing design.
Minimal elements — the stat visualization should dominate.
Square format for social media.
```

**Variables:**
- `STAT WITH NUMBER`: e.g., "6 hours reduced to 45 minutes"
- `VISUAL REPRESENTATION`: e.g., "A large downward arrow showing time reduction, with clock icons"
- `COLOR PALETTE`: Your brand colors

**Recommended settings:**
- Style: `social-media`
- Size: `1024x1024` (square)
- Quality: `standard`

**Example filled:**
```
A clean infographic-style visual highlighting the stat: 6 hours reduced to 45 minutes.
A dramatic downward arrow from a large clock showing 6:00 to a small clock showing 0:45,
with a green checkmark at the bottom. The arrow is the dominant visual element.
Blue and green on white background. Bold, attention-grabbing design.
Minimal elements — the stat visualization should dominate. Square format.
```

---

## Template 3: Tip / How-To Post

```
A clean educational graphic for a [PLATFORM] post about [TOPIC].
[NUMBER] [SHAPE ICONS] arranged in a [LAYOUT], each representing one tip or step.
[COLOR PALETTE]. Clean, approachable design.
Consistent visual style across all [NUMBER] elements.
Space for text labels to be added separately. Square format.
```

**Variables:**
- `PLATFORM`: Target social platform
- `TOPIC`: e.g., "5 prompt engineering tips", "3 steps to better PRDs"
- `NUMBER`: How many tips/steps (3-5 works best)
- `SHAPE ICONS`: e.g., "rounded rectangle cards", "circular icons", "numbered badges"
- `LAYOUT`: e.g., "vertical stack", "2x2 grid", "horizontal row"
- `COLOR PALETTE`: Your brand colors

**Recommended settings:**
- Style: `social-media`
- Size: `1024x1024` (square) or `1024x1792` (portrait for Instagram stories)
- Quality: `standard`

---

## Template 4: Comparison Post (This vs That)

```
A side-by-side comparison graphic for a social media post: [OPTION A] vs [OPTION B].
Left side: [VISUAL FOR OPTION A] with [NEGATIVE/NEUTRAL TONE] colors.
Right side: [VISUAL FOR OPTION B] with [POSITIVE TONE] colors.
Clean divider in the middle. Bold visual contrast between the two sides.
[COLOR PALETTE]. Modern social media design. Square format.
```

**Variables:**
- `OPTION A` / `OPTION B`: What you're comparing
- `VISUAL FOR A`: Icon or metaphor for the less preferred option
- `VISUAL FOR B`: Icon or metaphor for the preferred option
- `NEGATIVE TONE`: e.g., "gray and muted"
- `POSITIVE TONE`: e.g., "vibrant blue and green"
- `COLOR PALETTE`: Overall color scheme

**Recommended settings:**
- Style: `social-media` or `comparison`
- Size: `1024x1024` (square)
- Quality: `standard`

---

## Platform Size Guide

| Platform | Recommended Size | DALL-E Size |
|----------|-----------------|-------------|
| LinkedIn feed post | 1200x627 | `1792x1024` |
| Instagram feed | 1080x1080 | `1024x1024` |
| Instagram story | 1080x1920 | `1024x1792` |
| Twitter/X post | 1200x675 | `1792x1024` |
| Facebook post | 1200x630 | `1792x1024` |

---

## Tips for Better Social Media Assets

1. **Leave space for text** — Always mention "space for text overlay" in your prompt
2. **Use bold colors** — Social feeds are noisy; muted designs get scrolled past
3. **One idea per image** — Don't cram too much into a single graphic
4. **Specify the format** — "square format" or "landscape format" affects composition
5. **Add text in Canva/Figma** — Generate the visual background in DALL-E, add text in a design tool
