# Example: Product Mockup — Notifications Center Dashboard

This example shows the full workflow for generating a product mockup, from first prompt to refined output.

---

## The Goal

Generate a mockup of an in-app notifications center for a B2B SaaS platform. This will be used in a PRD to show stakeholders the proposed design direction.

---

## Step 1: Review the Prompt First

Before generating, use `review_prompt` to check for issues:

```
review_prompt({
  prompt: "A notifications dashboard",
  style: "product-mockup",
  size: "1792x1024"
})
```

**Review Result:**
- Score: 35/100
- Issues found:
  - "Too vague — what kind of notifications? What UI elements?"
  - "No color palette specified"
  - "No device or context specified"
- Suggestions:
  - Add specific UI elements (bell icon, notification list, filters)
  - Specify colors and design system
  - Mention the device (web browser, mobile)

---

## Step 2: Refine the Prompt

Use `refine_prompt` to improve it:

```
refine_prompt({
  roughIdea: "A notifications dashboard for our B2B SaaS app, showing a list of notifications with different types like mentions, approvals, and status changes",
  purpose: "Product mockup for a PRD",
  style: "product-mockup"
})
```

**Refined Prompt:**
```
A web application notification center panel. A dropdown panel from a bell icon in the top
navigation bar showing a list of notifications grouped by time: "Today" and "This Week."
Each notification has an icon (mention @, approval checkmark, status arrow), a one-line
description, and a timestamp. Three notifications have a blue left border indicating unread.
Clean flat design UI with blue (#2563EB) primary, white background, gray (#6B7280) secondary text.
Modern SaaS aesthetic. Subtle shadows on the dropdown panel.
```

---

## Step 3: Review the Refined Prompt

```
review_prompt({
  prompt: "A web application notification center panel...",
  style: "product-mockup",
  size: "1792x1024"
})
```

**Review Result:**
- Score: 88/100
- Strengths: Specific UI elements, clear layout, defined color palette, appropriate style
- Minor suggestion: Could specify the number of notifications visible

---

## Step 4: Generate the Image

```
generate_image({
  prompt: "A web application notification center panel. A dropdown panel from a bell icon in the top navigation bar showing a list of notifications grouped by time: Today and This Week. Each notification has an icon (mention @, approval checkmark, status arrow), a one-line description, and a timestamp. Three notifications have a blue left border indicating unread. Clean flat design UI with blue (#2563EB) primary, white background, gray (#6B7280) secondary text. Modern SaaS aesthetic. Subtle shadows on the dropdown panel.",
  style: "product-mockup",
  size: "1792x1024",
  quality: "hd"
})
```

**Result:** A detailed web dashboard mockup with the notification panel open, showing grouped notifications with visual hierarchy.

**Cost:** ~$0.08 (HD quality, landscape)

---

## Step 5: Generate Variations

Not sure about the style? Generate 3 variations:

```
generate_variations({
  concept: "In-app notification center for a B2B SaaS platform with bell icon dropdown, grouped notifications, unread indicators",
  purpose: "PRD mockup for stakeholder review",
  generateImages: false
})
```

**Result:** 3 prompt variations:
- **Variation A (Minimal):** Clean, lots of whitespace, only 3 notifications visible, very stripped-down
- **Variation B (Bold):** Vibrant blue header, larger notification cards, colorful type icons
- **Variation C (Corporate):** Muted grays, compact list view, subtle borders, enterprise feel

You can then generate only the variation you like (~$0.04 instead of ~$0.12 for all three).

---

## What Worked

| Element | Why It Worked |
|---------|--------------|
| Specific UI elements | "bell icon", "dropdown panel", "blue left border" gave DALL-E clear direction |
| Color palette with hex codes | Produced consistent, on-brand colors |
| Layout description | "grouped by time: Today and This Week" organized the visual |
| Style keywords | "Clean flat design", "Modern SaaS aesthetic" set the right tone |
| Format choice | Landscape (1792x1024) gave enough horizontal space for the dashboard layout |

## What to Save in Your Prompt Library

```
prompt-library/mockups/notification-center.txt
---
Prompt: [the refined prompt above]
Style: product-mockup
Size: 1792x1024
Quality: hd
What worked: Specific UI elements + color hex codes + layout description
Use case: Notification center mockups, dropdown panel UIs, B2B SaaS feature previews
```

---

## Using This in a PRD

After generating, reference the mockup in your PRD's Design Considerations section:

```markdown
## Design Considerations

The notification center follows our existing design system. Key decisions:
- Bell icon in global nav (consistent with user expectations)
- Dropdown panel (not a full page) for quick scanning
- Unread notifications highlighted with blue left border
- Group by time period, not notification type (matches mental model)

**Visual reference:** [link to generated mockup image]
```

This gives stakeholders a visual anchor for the feature discussion.
