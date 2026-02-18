# Example: Social Media Asset Pack — Feature Launch Campaign

This example shows how to use `create_asset_pack` to generate a coordinated set of 4 social media images for a product launch.

---

## The Goal

Generate a set of 4 LinkedIn/social media images for launching an "AI-Powered Analytics Dashboard" feature. All 4 images should share a consistent visual style for a cohesive campaign.

---

## Step 1: Define Your Style Guide

The style guide is the most important input. It gets appended to every prompt in the pack, ensuring visual consistency.

**Bad style guide:**
```
"Make it look nice and professional"
```

**Good style guide:**
```
"Clean, minimal design. Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements. Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy. Space for text overlay at top and bottom."
```

---

## Step 2: Generate the Asset Pack

```
create_asset_pack({
  theme: "AI-powered analytics dashboard launch for a B2B SaaS product",
  packType: "social-campaign",
  styleGuide: "Clean, minimal design. Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements. Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy. Space for text overlay at top and bottom.",
  generateImages: false
})
```

### Result: 4 Coordinated Prompts

**Image 1 — Launch Announcement:**
```
A bold announcement graphic. A glowing dashboard icon emerging from a gift box with
sparkle effects around it, centered on the canvas. Dark navy (#1E293B) background
with electric blue (#3B82F6) accents and white elements. Flat design, no gradients.
Modern SaaS aesthetic. Bold visual hierarchy. Space for text overlay at top and bottom.
```

**Image 2 — Feature Highlight:**
```
A feature showcase graphic. A clean analytics dashboard with 3 chart types (line, bar, pie)
floating in a grid arrangement, with subtle glow effects on the data points.
Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements.
Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy.
Space for text overlay at top and bottom.
```

**Image 3 — Social Proof / Testimonial:**
```
A testimonial-style graphic. A large quotation mark icon with a 5-star rating below it,
flanked by small user avatar circles on each side. Trust and credibility visual.
Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements.
Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy.
Space for text overlay at top and bottom.
```

**Image 4 — Call-to-Action:**
```
A call-to-action graphic. A large arrow icon pointing right toward a glowing portal or
doorway shape, suggesting moving forward. Energetic but clean composition.
Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements.
Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy.
Space for text overlay at top and bottom.
```

---

## Step 3: Review and Generate

Review the 4 prompts. If they look good, generate all images:

```
create_asset_pack({
  theme: "AI-powered analytics dashboard launch for a B2B SaaS product",
  packType: "social-campaign",
  styleGuide: "Clean, minimal design. Dark navy (#1E293B) background with electric blue (#3B82F6) accents and white elements. Flat design, no gradients. Modern SaaS aesthetic. Bold visual hierarchy. Space for text overlay at top and bottom.",
  generateImages: true
})
```

**Cost:** ~$0.16 total (4 images x $0.04 each at standard quality)

---

## Step 4: Add Text in Your Design Tool

DALL-E generates the visual backgrounds. You add the text overlays in Canva, Figma, or your preferred design tool.

**Suggested text for each image:**

| Image | Headline | Subtext |
|-------|----------|---------|
| 1. Announcement | "Introducing AI Analytics" | "Insights that find themselves." |
| 2. Feature | "3 Views. One Dashboard." | "Line, bar, and pie — all in real time." |
| 3. Social Proof | "Trusted by 500+ Teams" | "See what they're saying." |
| 4. CTA | "Try It Free Today" | "No credit card required. →" |

---

## Campaign Posting Schedule

| Day | Image | LinkedIn Post |
|-----|-------|--------------|
| Monday | Image 1 (Announcement) | Launch post with product details |
| Wednesday | Image 2 (Feature) | Deep-dive into the analytics features |
| Friday | Image 3 (Social Proof) | Customer quotes and results |
| Next Monday | Image 4 (CTA) | Final push with sign-up link |

---

## Other Pack Types

The same workflow applies to other pack types:

### Presentation Set
```
create_asset_pack({
  theme: "Q1 product roadmap review",
  packType: "presentation-set",
  styleGuide: "Minimal, blue and white, flat icons, clean backgrounds, professional corporate",
  generateImages: true
})
```
Generates: title slide background, problem visual, solution visual, results visual.

### Icon Set
```
create_asset_pack({
  theme: "Core product features for landing page",
  packType: "icon-set",
  styleGuide: "Flat design icons, blue (#2563EB) on white, 3px stroke, rounded corners, simple shapes",
  generateImages: true
})
```
Generates: 4 matching feature icons.

### Feature Highlights
```
create_asset_pack({
  theme: "Key benefits of the analytics dashboard",
  packType: "feature-highlights",
  styleGuide: "Isometric illustrations, purple and blue gradient, dark background, modern tech aesthetic",
  generateImages: true
})
```
Generates: main value prop visual, speed visual, collaboration visual, results visual.

---

## What Makes a Good Asset Pack

| Factor | Good | Bad |
|--------|------|-----|
| Style guide specificity | "Dark navy (#1E293B) with blue (#3B82F6) accents, flat design" | "Professional looking" |
| Theme clarity | "AI-powered analytics dashboard launch for B2B SaaS" | "New feature" |
| Color consistency | Hex codes in style guide | "Blue and white" (too vague) |
| Text space | "Space for text overlay at top and bottom" | Not mentioned |
| Pack type choice | Matches your actual use case | Random selection |

## Save for Reuse

Save your best style guides for future campaigns:

```
prompt-library/social/campaign-style-dark-navy.txt
---
Style Guide: "Clean, minimal design. Dark navy (#1E293B) background with electric blue
(#3B82F6) accents and white elements. Flat design, no gradients. Modern SaaS aesthetic.
Bold visual hierarchy. Space for text overlay at top and bottom."
Works best for: Launch campaigns, product announcements, B2B SaaS
Pack types tested: social-campaign, feature-highlights
```
