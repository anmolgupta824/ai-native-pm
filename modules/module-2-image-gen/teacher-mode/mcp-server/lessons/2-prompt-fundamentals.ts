import { LessonContent } from "../index.js";

const lesson: LessonContent = {
  number: 2,
  title: "Prompt Fundamentals",
  duration: "20 min",
  objectives: [
    "Learn the four components of a great image prompt (Subject, Style, Composition, Details)",
    "Understand style keywords and how they change output",
    "Learn common prompt mistakes and how to avoid them",
    "Practice transforming vague prompts into specific ones",
  ],
  sections: [
    {
      id: "anatomy-of-prompt",
      title: "Anatomy of a Great Image Prompt",
      content: `## The Four Components of a Great Image Prompt

Every strong image prompt has four parts:

### 1. Subject — What to generate
The main thing in the image. Be specific.
- Weak: "A dashboard"
- Strong: "A mobile app dashboard showing user analytics"

### 2. Style — Visual treatment
How it should look. This has the biggest impact on output quality.
- Weak: (nothing)
- Strong: "Clean, minimal, flat design, modern SaaS aesthetic"

### 3. Composition — Layout and framing
Where things are positioned.
- Weak: (nothing)
- Strong: "Centered layout, white background, top navigation bar"

### 4. Details — Specific elements
The small things that make it yours.
- Weak: (nothing)
- Strong: "3 metric cards at top (revenue, users, conversion), line chart below, blue and gray color palette"

### Example Transformation

**Weak prompt:** "A dashboard"

**Strong prompt:** "A clean, minimal mobile app dashboard in flat design style. Centered layout on white background. Shows 3 metric cards at the top (revenue, users, conversion rate) with a line chart below and a bottom navigation bar. Modern SaaS aesthetic, blue and gray color palette."

The difference is the difference between a generic stock image and a visual that communicates your exact idea.`,
      teacherNotes: "This is the most important lesson. Spend time here. Ask the student to practice transforming a weak prompt into a strong one using the four components.",
      checkQuestion: "Can you take something you need a visual for right now and describe it using all four components (Subject, Style, Composition, Details)?",
    },
    {
      id: "style-keywords",
      title: "Style Keywords That Change Everything",
      content: `## Style Keywords Reference

Style keywords dramatically change the output. Here are the most useful ones for PM work:

### For Product Mockups
- "UI design", "app interface", "flat design"
- "Material Design", "iOS style", "SaaS dashboard"
- "Wireframe style", "low-fidelity mockup"

### For Presentations
- "Professional illustration", "corporate infographic"
- "Abstract background", "hero image"
- "Data visualization", "process diagram"

### For Social Media
- "Bold", "vibrant", "eye-catching"
- "Modern social media graphic", "strong visual hierarchy"
- "Gradient background", "neon accents"

### For Icons
- "Flat icon", "line icon", "simple illustration"
- "Consistent style", "single color", "clean lines"
- "Isometric", "minimal detail"

### Color & Mood Keywords
| Keyword | Effect |
|---------|--------|
| "Professional" | Muted tones, corporate feel |
| "Vibrant" | Saturated, energetic colors |
| "Minimal" | Lots of whitespace, few elements |
| "Dark mode" | Dark background, light elements |
| "Pastel" | Soft, gentle colors |
| "High contrast" | Bold differences between elements |

### Pro Tip
Combine 2-3 style keywords for best results: "clean, minimal, flat design" is better than just "clean".`,
      checkQuestion: "Which style keywords would you use most often for your typical PM work?",
    },
    {
      id: "common-mistakes",
      title: "Common Prompt Mistakes",
      content: `## The Five Most Common Prompt Mistakes

### Mistake 1: Too Vague
- Bad: "A notification center"
- Good: "A mobile app notification panel with a bell icon, unread badge showing '3', and a dropdown of 5 notifications grouped by Today and This Week. Clean SaaS design."

### Mistake 2: No Style Direction
Without style keywords, DALL-E picks randomly. You might get a painting when you wanted a UI mockup.
- Bad: "A login page"
- Good: "A login page in flat design style, minimal, white background, centered form"

### Mistake 3: Expecting Perfect Text
DALL-E cannot reliably render text. Letters come out garbled.
- Solution: Generate the image without important text, then add text overlays in Canva or Figma.

### Mistake 4: Too Many Elements
Trying to put everything in one image creates a mess.
- Bad: "A dashboard with 12 charts, a sidebar, header, footer, settings panel, user list, and notification center"
- Good: Focus on 3-5 key elements per image.

### Mistake 5: No Color Specification
Without color guidance, results are unpredictable.
- Bad: "A button"
- Good: "A call-to-action button, blue (#2563EB), rounded corners, white text, on white background"

### The Review Tool
Use the \`review_prompt\` tool before generating. It catches these mistakes and scores your prompt for quality.`,
      teacherNotes: "Walk through each mistake with examples. Encourage the student to use review_prompt on their own prompts to catch issues before generating.",
      checkQuestion: "Which of these five mistakes do you think you would make most often?",
    },
    {
      id: "refine-workflow",
      title: "The Refine → Generate → Iterate Workflow",
      content: `## The Workflow: Refine, Generate, Iterate

The best results come from a cycle, not a single prompt:

### Step 1: Start with a rough idea
"I need a visual of our new onboarding flow"

### Step 2: Refine the prompt
Use \`refine_prompt\` to add specificity:
"A 3-step mobile onboarding flow for a fintech app. Step 1 shows account creation form, Step 2 shows ID verification, Step 3 shows success celebration. Flat design, blue and white, clean SaaS aesthetic."

### Step 3: Generate the image
Use \`generate_image\` with the refined prompt. Review the result.

### Step 4: Evaluate
- Is the overall concept right? If not, rewrite the prompt.
- Is the style right? If not, change style keywords.
- Are specific elements wrong? Add or remove detail.

### Step 5: Iterate
Adjust the prompt and regenerate. Typical: 2-4 iterations.

| Iteration Issue | What to Adjust |
|----------------|---------------|
| Too generic | Add specific details about elements |
| Wrong style | Change style keywords (e.g., "flat" → "realistic") |
| Wrong mood | Adjust color/tone (e.g., "vibrant" → "muted, professional") |
| Wrong layout | Change composition (e.g., "centered" → "left-aligned") |
| Too busy | Remove elements, add "minimal" or "clean" |

### Time Investment
This cycle takes 3-5 minutes for most visuals. Compare that to days of waiting for design resources.`,
      checkQuestion: "What is the first visual you would like to try creating with this workflow?",
    },
  ],
  exercise: {
    title: "Transform a Weak Prompt into a Strong One",
    description: "Practice the four-component framework by improving real prompts.",
    steps: [
      "Write a one-sentence description of a visual you need for your work right now",
      "Use review_prompt to analyze your description — note the score and issues",
      "Rewrite the prompt adding all four components: Subject, Style, Composition, Details",
      "Use review_prompt again — your score should improve",
      "Use refine_prompt for a final polish, then generate_image to create the visual",
    ],
    validation: "You have completed this exercise if: (1) Your initial prompt scored below 70, (2) Your rewritten prompt scored above 70, and (3) You generated an image that roughly matches what you had in mind.",
  },
  quiz: {
    questions: [
      {
        question: "What are the four components of a great image prompt?",
        options: [
          "Title, Description, Tags, Category",
          "Subject, Style, Composition, Details",
          "Prompt, Negative Prompt, Seed, Steps",
          "Context, Instructions, Format, Output",
        ],
        correctIndex: 1,
        explanation: "Subject (what to generate), Style (visual treatment), Composition (layout/framing), and Details (specific elements) are the four components. Each adds a layer of specificity that improves output quality.",
      },
      {
        question: "Why does DALL-E struggle with text in images?",
        options: [
          "It is a limitation of the API",
          "Text rendering requires understanding language structure, which image models do not reliably handle",
          "You need to use a special text parameter",
          "It only works with English text",
        ],
        correctIndex: 1,
        explanation: "Image generation models like DALL-E create visual patterns — they do not understand language structure the way text models do. This means text in images often appears garbled. The solution is to add text overlays manually after generation.",
      },
      {
        question: "What should you do when the first generated image does not match your vision?",
        options: [
          "Generate 20 more images with the same prompt",
          "Give up and use a stock photo",
          "Adjust the prompt based on what is wrong (style, details, composition) and regenerate",
          "Use the HD quality setting instead",
        ],
        correctIndex: 2,
        explanation: "The iterate cycle is: evaluate what is wrong, adjust the relevant component (style keywords, details, composition), and regenerate. Two to four iterations typically produces a good result.",
      },
      {
        question: "Which style keywords would you use for a PRD mockup?",
        options: [
          "Bold, vibrant, eye-catching, neon",
          "Watercolor, artistic, painterly, textured",
          "UI design, flat design, minimal, clean, SaaS aesthetic",
          "Photorealistic, detailed, cinematic, dramatic lighting",
        ],
        correctIndex: 2,
        explanation: "For product mockups, UI-specific style keywords like 'UI design', 'flat design', 'minimal', and 'SaaS aesthetic' steer DALL-E toward interface-style outputs rather than artistic illustrations or photos.",
      },
    ],
  },
};

export default lesson;
