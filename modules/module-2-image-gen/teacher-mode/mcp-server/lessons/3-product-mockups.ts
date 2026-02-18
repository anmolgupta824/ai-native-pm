import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 3,
  title: "Product Mockups & Wireframes",
  duration: "20 min",
  objectives: [
    "Generate product mockups for PRDs and feature specs",
    "Learn prompt patterns for different mockup types (app screens, dashboards, flows)",
    "Understand the limitations: communication tools, not design deliverables",
    "Practice creating a mockup for a real feature you are working on",
  ],
  sections: [
    {
      id: "mockups-for-pms",
      title: "Why PMs Need Mockups",
      content: `## Product Mockups: Communication Tools, Not Design Deliverables

A mockup in a PRD does something text cannot: it gives everyone the same mental picture of what you are proposing.

### The Problem
When you write "a notifications center with a bell icon and dropdown panel," every stakeholder imagines something different. Your engineering lead pictures a full-page notifications view. Your designer imagines a small popover. Your VP sees a sidebar panel.

### The Solution
A generated mockup — even an imperfect one — aligns everyone instantly. It says "this is roughly what I mean" in a way that three paragraphs of requirements cannot.

### Important Boundaries

| Mockups ARE | Mockups ARE NOT |
|------------|----------------|
| Concept visuals for alignment | Pixel-perfect specifications |
| Starting points for design discussions | Final production assets |
| Visual context in PRDs and specs | Substitutes for professional design |
| Quick exploration of layouts | Design handoff documents |

The goal is communication speed, not design perfection.`,
      teacherNotes: "Emphasize that these are communication tools. PMs sometimes worry about generating 'wrong' designs. The point is to align stakeholders quickly, not to deliver final designs.",
      checkQuestion: "Have you ever had a misunderstanding with engineers or designers because your PRD described something they pictured differently?",
    },
    {
      id: "mockup-patterns",
      title: "Prompt Patterns for Different Mockup Types",
      content: `## Mockup Prompt Patterns

### Pattern: Mobile App Screen
\`\`\`
A [device type] screen showing [feature name] with [specific UI elements].
[Design style], [color palette]. Modern [product type] aesthetic.
\`\`\`

**Example:**
"A mobile app screen showing a notifications center. Bell icon in the top nav with a red badge showing '3'. Dropdown panel below showing 5 notifications with icon, title, and timestamp. Blue dot for unread items. Clean flat design, white background, blue and gray color palette. Modern SaaS app aesthetic."

### Pattern: Dashboard
\`\`\`
A [platform] dashboard displaying [key metrics] with [chart types].
[Layout description]. [Design style], [color palette].
\`\`\`

**Example:**
"A web analytics dashboard displaying monthly revenue, active users, and conversion rate in three metric cards at the top. Below: a line chart showing 6-month trend and a bar chart showing revenue by channel. Left sidebar with navigation. Clean flat design, dark sidebar with white main area, blue accent color."

### Pattern: Onboarding Flow
\`\`\`
A [step count]-step onboarding flow for [product type].
Each step shows [elements]. [Style], [spacing/layout details].
\`\`\`

### Pattern: Settings / Configuration Page
\`\`\`
A settings page for [product] with sections for [categories].
Toggle switches, dropdown menus, text inputs. [Style], [layout].
\`\`\`

### Pro Tips
- Include "UI design" or "app interface" to steer toward product visuals
- Specify the device: "mobile", "desktop", "tablet"
- Name specific UI elements: "toggle switch", "dropdown menu", "progress bar"
- Reference the product type: "SaaS", "fintech", "e-commerce"`,
      checkQuestion: "Which mockup pattern would be most useful for something you are currently working on?",
    },
    {
      id: "prd-integration",
      title: "Using Mockups in Your PRDs",
      content: `## Integrating Generated Mockups into PRDs

### Where Mockups Add the Most Value in PRDs

1. **Overview section** — A hero visual of the feature gives immediate context
2. **User Stories** — Show what the user sees at each step
3. **Design Considerations** — Visual options for stakeholder discussion
4. **Edge Cases** — Show empty states, error states, overflow scenarios

### Workflow with Module 1 (PRD Generator)

If you have already completed Module 1, combine the two workflows:

1. Write your PRD using the PRD Generator (Module 1)
2. At the design considerations section, generate a mockup
3. Include the mockup URL or downloaded image in your PRD
4. Use \`generate_variations\` to show 2-3 layout options

### File Organization

Save generated mockups alongside your PRD:
\`\`\`
my-feature/
├── prd.md
├── mockups/
│   ├── main-screen.png
│   ├── empty-state.png
│   └── mobile-view.png
└── research/
    └── user-interviews.md
\`\`\`

### Labeling Mockups in PRDs

Always label generated images clearly:
- "Concept mockup — not a final design"
- "AI-generated visual for alignment purposes"

This sets expectations and prevents stakeholders from treating them as design specifications.`,
      teacherNotes: "If the student has completed Module 1, help them see the connection between PRD generation and mockup generation. If not, just focus on the standalone mockup use case.",
      checkQuestion: "Do you currently include any visuals in your PRDs?",
    },
    {
      id: "live-demo",
      title: "Live Demo: Creating a Feature Mockup",
      content: `## Live Demo: Notifications Center Mockup

Let's walk through generating a real mockup step by step.

### Step 1: Start with the Feature Description
"I need a mockup for an in-app notifications center for our B2B SaaS platform."

### Step 2: Apply the Prompt Pattern
Using the mobile app screen pattern:
"A mobile app screen showing a notifications center. Bell icon in top navigation bar with red unread badge showing '3'. Dropdown panel displaying 5 notifications grouped by 'Today' (3 items) and 'This Week' (2 items). Each notification has a colored icon, one-line title, timestamp, and blue dot for unread. Clean flat design, white background, gray card borders, blue accent color for unread indicators. Modern B2B SaaS aesthetic."

### Step 3: Review Before Generating
Run \`review_prompt\` — this prompt should score 80+ because it has all four components.

### Step 4: Generate
Run \`generate_image\` with style "product-mockup".

### Step 5: Evaluate
- Does the layout match the concept? (Bell icon, dropdown, grouped notifications)
- Is the style right? (Clean, flat, SaaS)
- Are specific elements visible? (Badge, timestamps, unread indicators)

### Step 6: Iterate If Needed
Common adjustments:
- "Make the notification items larger and more spaced out"
- "Add more whitespace between the grouped sections"
- "Use a lighter gray for card backgrounds"

This process takes about 3-5 minutes for a usable result.`,
      teacherNotes: "Walk the student through this step by step. If they want to try it themselves with a different feature, encourage that. The goal is hands-on practice.",
    },
  ],
  exercise: {
    title: "Generate a Mockup for a Real Feature",
    description: "Create a product mockup for a feature you are working on or planning.",
    steps: [
      "Pick a feature from your current work (or a feature you wish your product had)",
      "Write a prompt using the appropriate mockup pattern (app screen, dashboard, or onboarding flow)",
      "Use review_prompt to check your prompt — aim for a score above 70",
      "Generate the mockup with generate_image using the 'product-mockup' style",
      "Evaluate the result: does it convey the right concept? If not, iterate on the prompt and regenerate",
    ],
    validation: "You have completed this exercise if: (1) You generated a mockup for a real feature, (2) The mockup conveys the general concept even if imperfect, and (3) You can explain what you would adjust in the next iteration.",
  },
  quiz: {
    questions: [
      {
        question: "What is the primary purpose of AI-generated product mockups for PMs?",
        options: [
          "To replace the design team's work",
          "To create final production assets",
          "To align stakeholders on the visual concept quickly",
          "To generate pixel-perfect UI specifications",
        ],
        correctIndex: 2,
        explanation: "Generated mockups are communication tools for alignment, not design deliverables. They give everyone the same mental picture of what is being proposed, preventing misunderstandings that text descriptions often cause.",
      },
      {
        question: "Which keywords should you include to steer DALL-E toward product interface visuals?",
        options: [
          "Artistic, creative, beautiful, stunning",
          "UI design, app interface, flat design, SaaS aesthetic",
          "Photorealistic, detailed, high resolution, 8K",
          "Abstract, conceptual, symbolic, metaphorical",
        ],
        correctIndex: 1,
        explanation: "UI-specific keywords like 'UI design', 'app interface', 'flat design', and 'SaaS aesthetic' tell DALL-E to generate interface-style visuals rather than artistic illustrations or photographs.",
      },
      {
        question: "How should you label generated mockups in a PRD?",
        options: [
          "Final Design — Ready for Development",
          "Concept mockup — not a final design",
          "Designer Approved Layout",
          "No label needed",
        ],
        correctIndex: 1,
        explanation: "Always label generated images as concept visuals or alignment tools. This prevents stakeholders from treating them as design specifications and sets appropriate expectations.",
      },
      {
        question: "Which section of a PRD benefits most from generated mockups?",
        options: [
          "Risks & Mitigations",
          "Open Questions",
          "Overview and Design Considerations",
          "Launch Plan",
        ],
        correctIndex: 2,
        explanation: "The Overview section benefits from a hero visual that gives immediate context, and the Design Considerations section benefits from visual options that stakeholders can discuss. Mockups help turn abstract descriptions into concrete visual concepts.",
      },
    ],
  },
};

export default lesson;
