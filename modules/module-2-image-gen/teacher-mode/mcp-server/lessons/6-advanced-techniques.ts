import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 6,
  title: "Advanced Techniques & Workflows",
  duration: "20 min",
  objectives: [
    "Master the variation and iteration workflow for faster results",
    "Learn to use asset packs for coordinated visual campaigns",
    "Build a reusable prompt library for your recurring visual needs",
    "Combine image generation with other modules (PRD Generator, MCP Automation)",
  ],
  sections: [
    {
      id: "variation-mastery",
      title: "Mastering Variations",
      content: `## The Variation Workflow

The \`generate_variations\` tool creates 3 distinct versions of any concept. This is the fastest way to explore visual directions.

### How Variations Work

You provide a base concept. The tool creates three takes:
- **Variation A: Minimal & Clean** — Stripped-down, lots of whitespace
- **Variation B: Bold & Vibrant** — High-energy, saturated colors
- **Variation C: Professional & Corporate** — Polished, muted, business-appropriate

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

This two-phase approach (broad exploration → narrow refinement) is faster than iterating one prompt 10 times.

### Pro Tip
You can set \`generateImages: true\` to see all 3 variations as actual images (~$0.12 total). Or set it to \`false\` to see the prompts first and only generate the one you like (~$0.04).`,
      teacherNotes: "Emphasize the two-phase approach: broad exploration first, then narrow refinement. Ask the student to try generating variations for something they need.",
      checkQuestion: "Have you ever wished you could see multiple visual options before committing to one direction?",
    },
    {
      id: "asset-pack-mastery",
      title: "Building Asset Packs",
      content: `## Asset Packs: Coordinated Visual Sets

The \`create_asset_pack\` tool generates 4 related images that share a consistent visual style. This is essential for campaigns, presentations, and product pages.

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

The key parameter is \`styleGuide\`. This string is appended to every prompt in the pack:

Good: "Clean, minimal, blue (#2563EB) and white, flat design, modern SaaS aesthetic"
Bad: "Nice looking" (too vague)

The more specific your style guide, the more consistent the pack.

### Example

\`\`\`
create_asset_pack({
  theme: "AI-powered notifications center launch",
  packType: "social-campaign",
  styleGuide: "Clean, minimal, blue and white, flat design, SaaS branding, bold visual hierarchy",
  generateImages: true
})
\`\`\`

This generates 4 coordinated social media images for your launch campaign.`,
      checkQuestion: "Which pack type would be most useful for your current work?",
    },
    {
      id: "prompt-library",
      title: "Building Your Prompt Library",
      content: `## Your Personal Prompt Library

As you generate images, you will discover prompts that produce great results. Save them.

### What to Save

For each saved prompt, track:
- **The prompt text** — The full prompt that produced a good result
- **The style preset used** — Which of the 6 styles you selected
- **The size** — 1024x1024, 1792x1024, or 1024x1792
- **What worked** — Notes on why this prompt was effective
- **The use case** — When to use this prompt again

### Suggested Library Structure

\`\`\`
prompt-library/
├── mockups/
│   ├── mobile-app-screen.txt
│   ├── web-dashboard.txt
│   └── onboarding-flow.txt
├── presentations/
│   ├── concept-illustration.txt
│   ├── before-after.txt
│   └── hero-background.txt
├── social/
│   ├── launch-announcement.txt
│   ├── stat-graphic.txt
│   └── comparison.txt
└── icons/
    ├── feature-icon.txt
    └── icon-set-style-guide.txt
\`\`\`

### Template Prompt Format

Each saved prompt should be a template with placeholders:

\`\`\`
A [device] screen showing [FEATURE NAME] with [UI ELEMENTS].
Clean flat design, [COLOR PALETTE]. Modern SaaS aesthetic.
[SIZE] format.

Variables:
- FEATURE NAME: The feature being mocked up
- UI ELEMENTS: Specific buttons, cards, charts, etc.
- COLOR PALETTE: Brand colors or neutral palette
- SIZE: 1024x1024 for social, 1792x1024 for presentations
\`\`\`

### Starter Templates
The \`templates/\` directory in this module includes 4 pre-built prompt templates to get you started.`,
      teacherNotes: "Encourage the student to start their library today with at least one prompt from the exercises they have done in this course.",
    },
    {
      id: "cross-module-workflows",
      title: "Combining with Other Modules",
      content: `## Cross-Module Workflows

Image generation becomes even more powerful when combined with other modules.

### With Module 1: PRD Generator

1. Generate your PRD using Module 1's Socratic questioning workflow
2. At the Design Considerations section, generate mockups using this module
3. Include mockup URLs in your PRD
4. Run \`generate_variations\` to show 2-3 visual options for stakeholder discussion

**Result:** PRDs with visual context that align stakeholders faster.

### With Module 3: MCP Automation

1. Build custom MCP integrations using Module 3
2. Pull data from Jira, analytics, or internal tools into your prompts
3. Auto-generate weekly report graphics from dashboard data
4. Create visual summaries of sprint reviews using live data

**Result:** Automated visual workflows powered by real-time data.

### The Full PM Visual Workflow

\`\`\`
Feature Idea
    ↓
PRD (Module 1) + Mockups (Module 2)
    ↓
Launch Graphics (Module 2) + Data Dashboards (Module 3)
    ↓
Social Campaign (Module 2 Asset Pack)
    ↓
Ship & Measure
\`\`\`

This is what "AI-native PM" looks like in practice: every document has visuals, every launch has graphics, every presentation has concept illustrations — all generated in minutes, not days.`,
      teacherNotes: "This is the capstone section. Help the student see the full picture of how all modules work together. If they have completed other modules, help them plan a combined workflow.",
      checkQuestion: "Which combination of modules would be most valuable for your next project?",
    },
    {
      id: "course-wrap-up",
      title: "Course Complete: What's Next",
      content: `## Congratulations!

You have completed the AI Image Generation course. Here is what you now know:

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

1. **Start your prompt library** — Save the best prompts from your exercises
2. **Generate a mockup for your current PRD** — Apply Lesson 3 to real work
3. **Create your first asset pack** — Use \`create_asset_pack\` for your next launch
4. **Build a visual brief** — Generate concept images before your next design review

### Resources

- **Prompt templates:** Check the \`templates/\` directory for pre-built templates
- **Example outputs:** Check the \`examples/\` directory for real prompt-to-image examples
- **EXPLAINER.md:** Detailed reference for all techniques
- **QUICKSTART.md:** Quick setup guide to share with colleagues

### Share What You Build
If you create something useful, share it on LinkedIn! Tag @ainativepm and use the generated visuals as examples of what PMs can do with AI.

Thank you for completing this course. Now go generate some visuals.`,
      teacherNotes: "Celebrate the completion. Ask the student what their biggest takeaway was. Encourage them to start using the tools on real work immediately.",
    },
  ],
  exercise: {
    title: "Build Your First Asset Pack",
    description: "Create a coordinated set of visuals for a product launch or campaign.",
    steps: [
      "Pick a product feature or announcement you want to promote",
      "Decide on a pack type: social-campaign, presentation-set, icon-set, or feature-highlights",
      "Write a style guide string (colors, design style, mood)",
      "Use create_asset_pack with your theme, pack type, and style guide",
      "Review the 4 prompts — then set generateImages: true to create the full pack",
    ],
    validation: "You have completed this exercise if: (1) You generated a coordinated asset pack, (2) The 4 images share a consistent visual style, and (3) You saved the style guide for future use.",
  },
  quiz: {
    questions: [
      {
        question: "What is the recommended approach for exploring visual directions?",
        options: [
          "Generate 20 images with the same prompt and pick the best one",
          "Use generate_variations to see 3 distinct styles, then iterate on the best one",
          "Always use the first image generated",
          "Spend an hour perfecting the prompt before generating anything",
        ],
        correctIndex: 1,
        explanation: "The two-phase approach — broad exploration with variations first, then narrow refinement of the chosen direction — is faster than iterating one prompt many times. Variations show you 3 distinct takes (minimal, bold, corporate) so you can pick a direction quickly.",
      },
      {
        question: "What parameter controls visual consistency in asset packs?",
        options: [
          "The theme parameter",
          "The generateImages parameter",
          "The styleGuide parameter",
          "The packType parameter",
        ],
        correctIndex: 2,
        explanation: "The styleGuide string is appended to every prompt in the pack. A specific style guide like 'clean, minimal, blue and white, flat design, SaaS branding' produces much more consistent results than a vague one like 'nice looking'.",
      },
      {
        question: "What should you save in your prompt library?",
        options: [
          "Only the generated images",
          "The prompt text, style preset, size, what worked, and use case",
          "Just the image URLs",
          "Only prompts that scored 100 on review",
        ],
        correctIndex: 1,
        explanation: "A useful prompt library entry includes the full prompt, the style and size used, notes on what worked well, and when to reuse it. This turns individual successes into reusable templates.",
      },
      {
        question: "How does image generation combine with Module 1 (PRD Generator)?",
        options: [
          "They cannot be used together",
          "Generate the PRD first with Module 1, then create mockups with Module 2 for the Design Considerations section",
          "Module 2 replaces Module 1",
          "You must complete Module 2 before starting Module 1",
        ],
        correctIndex: 1,
        explanation: "The ideal workflow is: generate your PRD with Module 1's Socratic questioning, then at the Design Considerations section, create mockups with Module 2. This gives you PRDs with visual context that align stakeholders faster.",
      },
    ],
  },
};

export default lesson;
