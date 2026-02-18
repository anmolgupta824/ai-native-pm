# Icon Set Prompt Templates

Ready-to-use prompt templates for generating icons and illustrations with DALL-E. Replace the `[PLACEHOLDERS]` with your specifics.

---

## Template 1: Feature Icon (Single)

```
A single [STYLE] icon representing [CONCEPT].
[VISUAL DESCRIPTION] centered on a [BACKGROUND].
[COLOR PALETTE]. Clean lines, consistent stroke weight.
Simple, recognizable at small sizes. No text.
Square format, icon fills 70% of the canvas.
```

**Variables:**
- `STYLE`: "flat design", "line art", "filled", "gradient", "isometric"
- `CONCEPT`: e.g., "real-time notifications", "data analytics", "team collaboration"
- `VISUAL DESCRIPTION`: e.g., "A bell icon with a small badge indicator"
- `BACKGROUND`: "white background", "transparent-style light gray background", "dark circle background"
- `COLOR PALETTE`: e.g., "Blue (#2563EB) with white details"

**Recommended settings:**
- Style: `icon-set`
- Size: `1024x1024` (square)
- Quality: `standard`

**Example filled:**
```
A single flat design icon representing real-time notifications.
A bell icon with a small red badge showing the number 3, with subtle sound wave lines
emanating from the top. Centered on a white background.
Blue (#2563EB) bell with red (#EF4444) badge. Clean lines, consistent stroke weight.
Simple, recognizable at small sizes. No text.
Square format, icon fills 70% of the canvas.
```

---

## Template 2: Matching Icon Set (4 Icons)

Use this with the `create_asset_pack` tool (packType: `icon-set`) for best results.

**Style Guide String (pass to styleGuide parameter):**
```
[STYLE] icons on [BACKGROUND]. [COLOR PALETTE].
Consistent [STROKE/FILL] weight across all icons.
Simple, recognizable at 64x64px. No text, no labels.
Each icon fills 70% of its canvas.
```

**Example style guides:**

For a SaaS product:
```
Flat design icons on white background. Blue (#2563EB) primary with gray (#6B7280) secondary.
Consistent 3px stroke weight across all icons. Rounded corners on all shapes.
Simple, recognizable at 64x64px. No text, no labels.
```

For a fintech product:
```
Minimal line art icons on dark (#1E293B) circular background. White icons with teal (#14B8A6) accent.
Consistent 2px stroke weight. Modern, trustworthy aesthetic.
Simple, recognizable at 64x64px. No text.
```

For a health tech product:
```
Soft gradient icons on white background. Green (#10B981) to teal (#14B8A6) gradient fills.
Rounded, friendly shapes. No sharp corners.
Simple, recognizable at 64x64px. No text.
```

---

## Template 3: Concept Illustration (Larger)

```
A [STYLE] illustration representing [CONCEPT] for a [USE CASE].
[DETAILED VISUAL DESCRIPTION].
[COLOR PALETTE]. [BACKGROUND DESCRIPTION].
Clean, professional. No text or labels.
Square format.
```

**Variables:**
- `STYLE`: "isometric", "flat", "minimal", "hand-drawn"
- `CONCEPT`: The abstract idea to visualize
- `USE CASE`: "product page", "feature card", "documentation"
- `DETAILED VISUAL DESCRIPTION`: 2-3 sentences describing exactly what to show
- `COLOR PALETTE`: 2-3 colors max
- `BACKGROUND`: Background treatment

**Recommended settings:**
- Style: `concept-art` or `icon-set`
- Size: `1024x1024` (square)
- Quality: `hd` (for illustrations that will be displayed large)

**Example filled:**
```
A flat illustration representing API integration for a product documentation page.
Two floating rectangles (representing systems) connected by a glowing bridge made of
small data dots flowing between them. Gears subtly visible inside each rectangle.
Blue (#2563EB) and purple (#7C3AED) on white background.
Clean, professional. No text or labels. Square format.
```

---

## Template 4: Badge / Achievement Icon

```
A [SHAPE] badge icon for [ACHIEVEMENT/STATUS].
[VISUAL ELEMENTS INSIDE THE BADGE].
[COLOR PALETTE]. [METALLIC/FLAT/GRADIENT] finish.
Centered on [BACKGROUND]. Bold and collectible-looking.
No text. Square format.
```

**Variables:**
- `SHAPE`: "circular", "shield-shaped", "hexagonal", "star-shaped"
- `ACHIEVEMENT/STATUS`: e.g., "course completion", "top contributor", "verified partner"
- `VISUAL ELEMENTS`: e.g., "A trophy with a star above it, laurel wreath border"
- `COLOR PALETTE`: e.g., "Gold and navy blue"
- `FINISH`: "metallic", "flat", "gradient"
- `BACKGROUND`: "white", "dark", "transparent-style"

**Recommended settings:**
- Style: `icon-set`
- Size: `1024x1024` (square)
- Quality: `hd`

---

## Consistency Tips for Icon Sets

1. **Use a style guide string** — Apply the same style guide to every icon in a set
2. **Specify stroke weight** — "2px stroke" or "3px stroke" keeps icons visually consistent
3. **Limit your palette** — 2-3 colors maximum for a cohesive set
4. **Same background treatment** — All icons should have the same background style
5. **Same fill style** — Don't mix flat and gradient icons in one set
6. **Test at small sizes** — If the concept needs too much detail, simplify it
7. **Generate together** — Use `create_asset_pack` with `icon-set` type to generate 4 at once with the same style guide
