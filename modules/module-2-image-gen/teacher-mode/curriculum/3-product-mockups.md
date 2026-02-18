# Lesson 3: Product Mockups & Wireframes

**Estimated time: 20 minutes**
**Lesson type: Hands-on + Patterns**

---

## Why PMs Need Mockups

A mockup in a PRD does something text cannot: it gives everyone the same mental picture of what you are proposing.

### The Problem
When you write "a notifications center with a bell icon and dropdown panel," every stakeholder imagines something different. Your engineering lead pictures a full-page notifications view. Your designer imagines a small popover. Your VP sees a sidebar panel.

### The Solution
A generated mockup -- even an imperfect one -- aligns everyone instantly. It says "this is roughly what I mean" in a way that three paragraphs of requirements cannot.

### Important Boundaries

| Mockups ARE | Mockups ARE NOT |
|------------|----------------|
| Concept visuals for alignment | Pixel-perfect specifications |
| Starting points for design discussions | Final production assets |
| Visual context in PRDs and specs | Substitutes for professional design |
| Quick exploration of layouts | Design handoff documents |

The goal is communication speed, not design perfection.

---

## Prompt Patterns for Different Mockup Types

### Pattern: Mobile App Screen
```
A [device type] screen showing [feature name] with [specific UI elements].
[Design style], [color palette]. Modern [product type] aesthetic.
```

**Example:**
"A mobile app screen showing a notifications center. Bell icon in the top nav with a red badge showing '3'. Dropdown panel below showing 5 notifications with icon, title, and timestamp. Blue dot for unread items. Clean flat design, white background, blue and gray color palette. Modern SaaS app aesthetic."

### Pattern: Dashboard
```
A [platform] dashboard displaying [key metrics] with [chart types].
[Layout description]. [Design style], [color palette].
```

**Example:**
"A web analytics dashboard displaying monthly revenue, active users, and conversion rate in three metric cards at the top. Below: a line chart showing 6-month trend and a bar chart showing revenue by channel. Left sidebar with navigation. Clean flat design, dark sidebar with white main area, blue accent color."

### Pattern: Onboarding Flow
```
A [step count]-step onboarding flow for [product type].
Each step shows [elements]. [Style], [spacing/layout details].
```

### Pattern: Settings / Configuration Page
```
A settings page for [product] with sections for [categories].
Toggle switches, dropdown menus, text inputs. [Style], [layout].
```

### Pro Tips
- Include "UI design" or "app interface" to steer toward product visuals
- Specify the device: "mobile", "desktop", "tablet"
- Name specific UI elements: "toggle switch", "dropdown menu", "progress bar"
- Reference the product type: "SaaS", "fintech", "e-commerce"

---

## Using Mockups in Your PRDs

### Where Mockups Add the Most Value in PRDs

1. **Overview section** -- A hero visual of the feature gives immediate context
2. **User Stories** -- Show what the user sees at each step
3. **Design Considerations** -- Visual options for stakeholder discussion
4. **Edge Cases** -- Show empty states, error states, overflow scenarios

### Workflow with Module 1 (PRD Generator)

If you have already completed Module 1, combine the two workflows:

1. Write your PRD using the PRD Generator (Module 1)
2. At the design considerations section, generate a mockup
3. Include the mockup URL or downloaded image in your PRD
4. Use `generate_variations` to show 2-3 layout options

### File Organization

Save generated mockups alongside your PRD:
```
my-feature/
  prd.md
  mockups/
    main-screen.png
    empty-state.png
    mobile-view.png
  research/
    user-interviews.md
```

### Labeling Mockups in PRDs

Always label generated images clearly:
- "Concept mockup -- not a final design"
- "AI-generated visual for alignment purposes"

This sets expectations and prevents stakeholders from treating them as design specifications.

---

## Live Demo: Creating a Feature Mockup

Let's walk through generating a real mockup step by step.

### Step 1: Start with the Feature Description
"I need a mockup for an in-app notifications center for our B2B SaaS platform."

### Step 2: Apply the Prompt Pattern
Using the mobile app screen pattern:
"A mobile app screen showing a notifications center. Bell icon in top navigation bar with red unread badge showing '3'. Dropdown panel displaying 5 notifications grouped by 'Today' (3 items) and 'This Week' (2 items). Each notification has a colored icon, one-line title, timestamp, and blue dot for unread. Clean flat design, white background, gray card borders, blue accent color for unread indicators. Modern B2B SaaS aesthetic."

### Step 3: Review Before Generating
Run `review_prompt` -- this prompt should score 80+ because it has all four components.

### Step 4: Generate
Run `generate_image` with style "product-mockup".

### Step 5: Evaluate
- Does the layout match the concept? (Bell icon, dropdown, grouped notifications)
- Is the style right? (Clean, flat, SaaS)
- Are specific elements visible? (Badge, timestamps, unread indicators)

### Step 6: Iterate If Needed
Common adjustments:
- "Make the notification items larger and more spaced out"
- "Add more whitespace between the grouped sections"
- "Use a lighter gray for card backgrounds"

This process takes about 3-5 minutes for a usable result.

---

## Exercise: Generate a Mockup for a Real Feature

Create a product mockup for a feature you are working on or planning.

1. Pick a feature from your current work (or a feature you wish your product had)
2. Write a prompt using the appropriate mockup pattern (app screen, dashboard, or onboarding flow)
3. Use `review_prompt` to check your prompt -- aim for a score above 70
4. Generate the mockup with `generate_image` using the "product-mockup" style
5. Evaluate the result: does it convey the right concept? If not, iterate on the prompt and regenerate

**Completion check:** You have completed this exercise if: (1) You generated a mockup for a real feature, (2) The mockup conveys the general concept even if imperfect, and (3) You can explain what you would adjust in the next iteration.

---

## Quick Check

1. What is the primary purpose of AI-generated product mockups for PMs?
2. Which keywords should you include to steer DALL-E toward product interface visuals?
3. How should you label generated mockups in a PRD?
4. Which section of a PRD benefits most from generated mockups?

---

*Previous: [Lesson 2: Prompt Fundamentals](2-prompt-fundamentals.md)*
*Next: [Lesson 4: Presentation & Pitch Visuals](4-presentation-visuals.md)*
