import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 5,
  title: "Social Media & Marketing Assets",
  duration: "15 min",
  objectives: [
    "Generate visuals for LinkedIn, Instagram, and blog posts",
    "Learn format and style requirements for different platforms",
    "Understand how to maintain visual consistency across a campaign",
    "Practice creating a social media graphic for a product launch",
  ],
  sections: [
    {
      id: "social-visual-needs",
      title: "Visual Needs by Platform",
      content: `## Social Media Visuals for PMs

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
- **Stat graphics** — Bold numbers showing impact ("6 hrs → 45 min")
- **Comparison visuals** — Side-by-side before/after or tool comparisons
- **Screenshot-style** — Tool demos that look like real product screenshots
- **Quote cards** — Key insights with attribution

### What Does NOT Work

- Generic stock photos (people shaking hands, laptops on desks)
- Overly corporate, polished graphics that feel like ads
- Images with too much text (save that for the caption)
- Unrelated decorative images that add no information`,
      teacherNotes: "Ask the student if they post on LinkedIn. If so, what kind of visuals do they currently use? If not, this lesson still applies to blog posts and company channels.",
      checkQuestion: "Do you currently post on LinkedIn or contribute visuals to company social channels?",
    },
    {
      id: "social-prompt-patterns",
      title: "Prompt Patterns for Social Media",
      content: `## Social Media Prompt Patterns

### Pattern: Launch Announcement
\`\`\`
A bold, modern social media graphic for a product launch.
Text area on the [side] for [text content].
[Side] shows [product visual].
[Background style], [color palette].
Square format (1:1), suitable for [platform].
\`\`\`

**Example:**
"A bold social media graphic for a product launch. Left side has a large text area for the announcement title. Right side shows a stylized laptop screen with a clean dashboard interface. Blue gradient background, white text space on left, modern SaaS branding. Square format, suitable for LinkedIn."

### Pattern: Stat / Data Graphic
\`\`\`
A data visualization graphic showing [key stat].
Large, bold [number/comparison] as the focal point.
[Supporting visual elements]. [Style], [colors].
Square format, clean background.
\`\`\`

### Pattern: Comparison Visual
\`\`\`
A side-by-side comparison graphic for social media.
Left: [option A] with [description]. Right: [option B] with [description].
Clean divider. [Style]. Bold labels. Square format.
\`\`\`

### Pattern: Blog Header
\`\`\`
A wide blog header image for an article about [topic].
[Thematic imagery]. [Style], [colors].
Space for title text overlay on the [side].
Landscape format (1792x1024).
\`\`\`

### Pro Tip
For social media, use the \`social-media\` style preset — it automatically adds "bold, eye-catching, strong visual hierarchy" to your prompt.`,
      checkQuestion: "What kind of social post would you create first — a launch announcement, a stat graphic, or a comparison?",
    },
    {
      id: "visual-consistency",
      title: "Maintaining Visual Consistency",
      content: `## Building a Consistent Visual Brand

One-off images are fine for individual posts. But campaigns need visual consistency — same colors, same style, same feel across multiple images.

### The Asset Pack Approach

Use \`create_asset_pack\` to generate coordinated sets:

**Social Campaign Pack (4 images):**
1. Announcement post — Launch graphic with text space
2. Feature highlight — One key feature showcased
3. Social proof — Trust-building visual for testimonials
4. Call-to-action — Action-oriented graphic with urgency

### Consistency Tips

1. **Use the same style guide for every prompt.** Add a standard suffix like: "Clean, minimal, blue (#2563EB) and white, flat design, modern SaaS branding."

2. **Generate all images in one session.** The same session tends to produce more consistent results than separate sessions.

3. **Use the same background treatment.** If your first image has a blue gradient, use "blue gradient background" in all subsequent prompts.

4. **Keep element count consistent.** If one post is minimal (3 elements), do not make another one complex (12 elements).

### Building a Prompt Library

Save your best prompts in a file alongside your project:
\`\`\`
social-prompts/
├── launch-announcement.txt
├── stat-graphic.txt
├── comparison-visual.txt
└── blog-header.txt
\`\`\`

Next time you need a similar visual, start from the saved prompt instead of from scratch.`,
      teacherNotes: "The asset pack concept is powerful. If the student has a product launch coming up, suggest creating a full campaign pack as the exercise.",
      checkQuestion: "Do you have a product launch or announcement coming up that could use a set of coordinated visuals?",
    },
    {
      id: "text-overlay-workflow",
      title: "The Text Overlay Workflow",
      content: `## Adding Text to Generated Images

Since DALL-E does not render text reliably, the workflow for text-heavy social posts is:

### Step 1: Generate the Background
Create the image with designated text space but without actual text. Include "text area on the left" or "space for title overlay" in your prompt.

### Step 2: Add Text Manually
Use any of these tools (all free):
- **Canva** — Easiest, drag-and-drop, free tier
- **Figma** — More control, free for individual use
- **Preview (Mac)** — Basic text overlay built into macOS
- **Paint (Windows)** — Basic but functional

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
When generating, include "with designated text area" or "with clear space on [side] for text overlay." This ensures the generated image has room for your manually added text.`,
    },
  ],
  exercise: {
    title: "Create a Social Media Launch Graphic",
    description: "Generate a visual for a product launch or feature announcement post.",
    steps: [
      "Pick a product, feature, or announcement you want to promote on LinkedIn or Instagram",
      "Write a prompt using the launch announcement pattern — specify square format",
      "Use generate_image with the 'social-media' style",
      "Evaluate: is it bold enough for a social feed? Does it have space for text?",
      "Bonus: use create_asset_pack with type 'social-campaign' to generate a coordinated set of 4 visuals",
    ],
    validation: "You have completed this exercise if: (1) You generated at least one social media graphic, (2) The image has clear space for text overlay, and (3) You can see yourself using it (with manual text added) on LinkedIn or Instagram.",
  },
  quiz: {
    questions: [
      {
        question: "What format should you use for LinkedIn post images?",
        options: [
          "Portrait (1024x1792)",
          "Square (1024x1024) or landscape (1200x628)",
          "Any size works equally well",
          "Thumbnail (256x256)",
        ],
        correctIndex: 1,
        explanation: "LinkedIn supports square (1:1) and landscape (1.91:1) formats best. Square images take up more feed space and tend to get more engagement. Portrait images get cropped in the feed.",
      },
      {
        question: "Why should you NOT include important text in DALL-E prompts for social media?",
        options: [
          "Text makes images load slower",
          "Social platforms strip text from images",
          "DALL-E renders text unreliably — add text manually with Canva or Figma",
          "Text is not allowed on social media images",
        ],
        correctIndex: 2,
        explanation: "DALL-E often garbles text — misspelled words, wrong fonts, missing letters. The reliable workflow is to generate the image without text, then add headlines and copy manually in Canva, Figma, or any image editor.",
      },
      {
        question: "How do you maintain visual consistency across a social media campaign?",
        options: [
          "Use different styles for each post to keep it interesting",
          "Use the same style guide, colors, and background treatment across all prompts",
          "Only post one image per campaign",
          "Use stock photos instead of generated images",
        ],
        correctIndex: 1,
        explanation: "Consistency comes from using the same style guide (colors, design style, background treatment) in every prompt. The create_asset_pack tool generates coordinated sets that share a visual language.",
      },
      {
        question: "What is the purpose of a prompt library?",
        options: [
          "To store generated images",
          "To save your best prompts for reuse, reducing creation time for recurring visual needs",
          "To track which images you have posted",
          "To train a custom AI model",
        ],
        correctIndex: 1,
        explanation: "A prompt library saves your best-performing prompts so you can reuse them with minor modifications. Instead of writing from scratch each time, you start from a proven prompt and adapt it. This cuts creation time significantly.",
      },
    ],
  },
};

export default lesson;
