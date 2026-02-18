#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";

// ── Image Styles / Presets ─────────────────────────────────────

interface ImageStyle {
  name: string;
  description: string;
  styleKeywords: string;
  bestFor: string[];
  defaultSize: string;
}

const IMAGE_STYLES: Record<string, ImageStyle> = {
  "product-mockup": {
    name: "Product Mockup",
    description: "Clean UI/UX mockups for app screens, dashboards, and feature previews",
    styleKeywords: "clean UI design, flat design, minimal, modern SaaS aesthetic, white background, professional interface mockup",
    bestFor: ["PRDs", "feature specs", "design briefs", "stakeholder presentations"],
    defaultSize: "1024x1024",
  },
  "presentation": {
    name: "Presentation Visual",
    description: "Illustrations and graphics for slide decks and stakeholder presentations",
    styleKeywords: "professional illustration, corporate presentation style, clean infographic, polished, business context",
    bestFor: ["pitch decks", "all-hands slides", "quarterly reviews", "board presentations"],
    defaultSize: "1792x1024",
  },
  "social-media": {
    name: "Social Media Asset",
    description: "Bold graphics for LinkedIn, Instagram, Twitter, and blog headers",
    styleKeywords: "bold, modern, eye-catching social media graphic, vibrant colors, strong visual hierarchy, suitable for social platforms",
    bestFor: ["LinkedIn posts", "Instagram posts", "Twitter/X cards", "blog headers"],
    defaultSize: "1024x1024",
  },
  "icon-set": {
    name: "Icon / Illustration Set",
    description: "Consistent icon sets and small illustrations for product features",
    styleKeywords: "flat icon, simple illustration, consistent style, minimal detail, clean lines, single color palette",
    bestFor: ["feature pages", "onboarding flows", "documentation", "email graphics"],
    defaultSize: "1024x1024",
  },
  "concept-art": {
    name: "Concept Illustration",
    description: "Abstract or metaphorical visuals representing product concepts",
    styleKeywords: "conceptual illustration, abstract, metaphorical visual, modern art style, thought-provoking imagery",
    bestFor: ["blog posts", "thought leadership", "landing pages", "brand storytelling"],
    defaultSize: "1792x1024",
  },
  "comparison": {
    name: "Before / After Comparison",
    description: "Split-view visuals showing transformation or improvement",
    styleKeywords: "split-view comparison, before and after, side-by-side, contrasting visuals, clear dividing line",
    bestFor: ["case studies", "ROI presentations", "launch announcements", "social proof"],
    defaultSize: "1792x1024",
  },
};

// ── Prompt Refinement ──────────────────────────────────────────

interface PromptReview {
  originalPrompt: string;
  issues: string[];
  suggestions: string[];
  refinedPrompt: string;
  score: number;
}

function reviewPrompt(prompt: string): PromptReview {
  const issues: string[] = [];
  const suggestions: string[] = [];
  const lower = prompt.toLowerCase();

  // Check for common problems
  if (prompt.length < 20) {
    issues.push("Prompt is too short — DALL-E performs better with detailed descriptions.");
    suggestions.push("Add subject, style, composition, and color details.");
  }

  if (!lower.match(/style|design|aesthetic|illustration|flat|minimal|realistic|modern/)) {
    issues.push("No style direction — output will be unpredictable.");
    suggestions.push("Add a style keyword: 'flat design', 'minimal', 'realistic', 'modern SaaS', 'corporate illustration'.");
  }

  if (!lower.match(/background|white|dark|gradient|color|palette|blue|gray|black/)) {
    issues.push("No background or color specified.");
    suggestions.push("Add background and color: 'white background', 'blue and gray palette', 'dark gradient background'.");
  }

  if (!lower.match(/layout|centered|left|right|top|bottom|split|grid|arranged/)) {
    issues.push("No composition or layout direction.");
    suggestions.push("Add layout: 'centered', 'left-aligned with text space on right', 'grid layout', 'split-view'.");
  }

  if (lower.match(/text|word|label|title|heading|button text/)) {
    suggestions.push("Warning: DALL-E often renders text inaccurately. Consider adding text overlays manually after generation.");
  }

  if (lower.match(/photo of.*person|face|portrait|headshot/)) {
    suggestions.push("Warning: Generating images of specific real people is not supported. Use illustrated or abstract representations instead.");
  }

  if (!lower.match(/for|suitable|format|size|ratio|square|wide|landscape/)) {
    suggestions.push("Consider specifying the intended use: 'suitable for LinkedIn post (square)', 'wide format for presentation slide'.");
  }

  // Score the prompt
  let score = 50; // base
  if (prompt.length >= 50) score += 10;
  if (prompt.length >= 100) score += 10;
  if (lower.match(/style|design|aesthetic/)) score += 10;
  if (lower.match(/background|color|palette/)) score += 10;
  if (lower.match(/layout|centered|composition/)) score += 5;
  if (lower.match(/for|suitable|format/)) score += 5;
  score = Math.min(score, 100);

  // Build refined prompt
  let refined = prompt;
  if (!lower.match(/style|design|aesthetic/)) {
    refined += ". Clean, modern design style.";
  }
  if (!lower.match(/background|color/)) {
    refined += " White background, blue and gray color palette.";
  }
  if (!lower.match(/layout|centered|composition/)) {
    refined += " Centered composition with balanced whitespace.";
  }

  return {
    originalPrompt: prompt,
    issues,
    suggestions,
    refinedPrompt: refined,
    score,
  };
}

// ── OpenAI Client ──────────────────────────────────────────────

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY environment variable is not set. " +
      "Get your key at https://platform.openai.com/api-keys and set it: " +
      "export OPENAI_API_KEY='sk-your-key-here'"
    );
  }
  return new OpenAI({ apiKey });
}

async function generateImageWithDALLE(
  prompt: string,
  size: string = "1024x1024",
  quality: string = "standard",
  n: number = 1
): Promise<{ urls: string[]; revisedPrompt: string }> {
  const client = getOpenAIClient();

  const response = await client.images.generate({
    model: "dall-e-3",
    prompt,
    n: Math.min(n, 1), // DALL-E 3 only supports n=1
    size: size as "1024x1024" | "1792x1024" | "1024x1792",
    quality: quality as "standard" | "hd",
  });

  const urls = response.data.map((img) => img.url).filter((url): url is string => !!url);
  const revisedPrompt = response.data[0]?.revised_prompt || prompt;

  return { urls, revisedPrompt };
}

// ── MCP Server ─────────────────────────────────────────────────

const server = new Server(
  {
    name: "image-generator",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ── Tools ──────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "list_styles",
      description:
        "List all available image styles and presets with descriptions. Use this first to help the PM choose the right visual style for their use case.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "generate_image",
      description:
        "Generate an image using DALL-E from a text prompt. Returns the image URL and the revised prompt DALL-E used. Optionally specify a style preset, size, and quality.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "Detailed text description of the image to generate. Be specific about subject, style, composition, and colors.",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional style preset to apply. Style keywords will be appended to your prompt.",
          },
          size: {
            type: "string",
            enum: ["1024x1024", "1792x1024", "1024x1792"],
            description: "Image dimensions. 1024x1024 (square, social media), 1792x1024 (landscape, presentations), 1024x1792 (portrait, mobile).",
          },
          quality: {
            type: "string",
            enum: ["standard", "hd"],
            description: "Image quality. 'standard' (~$0.04) or 'hd' (~$0.08) for finer detail.",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "refine_prompt",
      description:
        "Take a rough or vague image prompt and improve it with style, composition, and detail. Returns the refined prompt without generating an image. Use this before generate_image for better results.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The rough prompt to refine",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional target style to incorporate into refinement",
          },
          purpose: {
            type: "string",
            description: "What the image will be used for (e.g., 'PRD mockup', 'LinkedIn post', 'pitch deck slide')",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "generate_variations",
      description:
        "Generate multiple conceptual variations of an image prompt. Returns 3 distinct prompt variations and can optionally generate images for each. Useful for exploring different visual directions.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The base concept to create variations of",
          },
          style: {
            type: "string",
            enum: Object.keys(IMAGE_STYLES),
            description: "Optional style preset to apply to all variations",
          },
          generateImages: {
            type: "boolean",
            description: "If true, generate images for each variation (costs ~$0.12 for 3 standard images). Default: false (returns prompts only).",
          },
        },
        required: ["prompt"],
      },
    },
    {
      name: "create_asset_pack",
      description:
        "Generate a coordinated set of related images that share a consistent visual style. Ideal for social media campaigns, feature launch graphics, or icon sets. Returns prompts for 4 coordinated images and optionally generates them.",
      inputSchema: {
        type: "object" as const,
        properties: {
          theme: {
            type: "string",
            description: "The theme or subject tying the pack together (e.g., 'product launch', 'quarterly review', 'feature set')",
          },
          packType: {
            type: "string",
            enum: ["social-campaign", "presentation-set", "icon-set", "feature-highlights"],
            description: "Type of asset pack to generate",
          },
          styleGuide: {
            type: "string",
            description: "Style and brand instructions (e.g., 'blue and white, minimal, SaaS aesthetic')",
          },
          generateImages: {
            type: "boolean",
            description: "If true, generate all images (~$0.16 for 4 standard). Default: false (returns prompts only).",
          },
        },
        required: ["theme", "packType"],
      },
    },
    {
      name: "review_prompt",
      description:
        "Analyze an image prompt for common issues before generating. Returns a quality score, identified issues, and suggestions for improvement. Helps avoid wasted generations.",
      inputSchema: {
        type: "object" as const,
        properties: {
          prompt: {
            type: "string",
            description: "The image prompt to review",
          },
        },
        required: ["prompt"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "list_styles": {
      const styles = Object.entries(IMAGE_STYLES).map(([key, s]) => ({
        id: key,
        name: s.name,
        description: s.description,
        bestFor: s.bestFor,
        defaultSize: s.defaultSize,
      }));
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: "Available image styles. Help the PM choose the best style for their use case.",
                styles,
                nextStep: "Once the PM picks a style, use generate_image or refine_prompt to create visuals.",
                tip: "You can also use generate_image without a style — just include style keywords directly in the prompt.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "generate_image": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const size = args?.size as string || "1024x1024";
      const quality = args?.quality as string || "standard";

      // Combine prompt with style keywords if style specified
      let fullPrompt = prompt;
      if (style && IMAGE_STYLES[style]) {
        fullPrompt = `${prompt}. Style: ${IMAGE_STYLES[style].styleKeywords}`;
      }

      try {
        const result = await generateImageWithDALLE(fullPrompt, size, quality);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  message: "Image generated successfully. Show the URL to the user and offer to refine or create variations.",
                  imageUrl: result.urls[0],
                  revisedPrompt: result.revisedPrompt,
                  settings: { size, quality, style: style || "custom" },
                  cost: quality === "hd" ? "~$0.08" : "~$0.04",
                  nextSteps: [
                    "Use generate_variations to explore different visual directions",
                    "Modify the prompt and regenerate for different results",
                    "Use create_asset_pack to build a coordinated set of visuals",
                  ],
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  error: "Image generation failed",
                  message: errorMessage,
                  troubleshooting: errorMessage.includes("API key")
                    ? "Set your OpenAI API key: export OPENAI_API_KEY='sk-your-key-here'"
                    : errorMessage.includes("billing")
                    ? "Check your OpenAI billing at https://platform.openai.com/account/billing"
                    : "Check the prompt for content policy violations or try a simpler description.",
                },
                null,
                2
              ),
            },
          ],
          isError: true,
        };
      }
    }

    case "refine_prompt": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const purpose = args?.purpose as string | undefined;

      const review = reviewPrompt(prompt);

      // Build a refined version incorporating style and purpose
      let refinedPrompt = prompt;

      // Add style if specified
      if (style && IMAGE_STYLES[style]) {
        refinedPrompt += `. ${IMAGE_STYLES[style].styleKeywords}`;
      }

      // Add purpose-specific adjustments
      if (purpose) {
        const purposeLower = purpose.toLowerCase();
        if (purposeLower.includes("linkedin") || purposeLower.includes("social")) {
          refinedPrompt += ". Bold, eye-catching, suitable for social media feed. Strong visual hierarchy.";
        } else if (purposeLower.includes("presentation") || purposeLower.includes("deck") || purposeLower.includes("slide")) {
          refinedPrompt += ". Professional, suitable for corporate presentation. Clean composition with space for text overlay.";
        } else if (purposeLower.includes("prd") || purposeLower.includes("mockup") || purposeLower.includes("spec")) {
          refinedPrompt += ". Clean UI mockup style, realistic interface elements, suitable for product documentation.";
        } else if (purposeLower.includes("blog") || purposeLower.includes("header")) {
          refinedPrompt += ". Wide format, thematic, suitable as a blog post header image.";
        }
      }

      // Apply general refinements from review
      if (!prompt.toLowerCase().match(/background|color/)) {
        refinedPrompt += " White background, professional color palette.";
      }
      if (!prompt.toLowerCase().match(/layout|centered|composition/)) {
        refinedPrompt += " Balanced composition.";
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: "Prompt refined. Review the improved version and use generate_image when ready.",
                originalPrompt: prompt,
                refinedPrompt,
                promptScore: review.score,
                issues: review.issues,
                suggestions: review.suggestions,
                nextStep: "Use generate_image with the refined prompt to create the visual.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "generate_variations": {
      const prompt = args?.prompt as string;
      const style = args?.style as string | undefined;
      const generateImages = args?.generateImages as boolean || false;

      const styleKeywords = style && IMAGE_STYLES[style] ? IMAGE_STYLES[style].styleKeywords : "";

      // Create 3 conceptual variations
      const variations = [
        {
          name: "Variation A: Minimal & Clean",
          prompt: `${prompt}. Minimal, clean design with lots of whitespace. Subtle color accents. ${styleKeywords}`.trim(),
          approach: "Stripped-down, focused on core subject with maximum clarity",
        },
        {
          name: "Variation B: Bold & Vibrant",
          prompt: `${prompt}. Bold, vibrant design with strong colors and visual impact. Dynamic composition. ${styleKeywords}`.trim(),
          approach: "High-energy visual with saturated colors and strong contrast",
        },
        {
          name: "Variation C: Professional & Corporate",
          prompt: `${prompt}. Professional, corporate style with muted tones. Sophisticated layout, business-appropriate. ${styleKeywords}`.trim(),
          approach: "Polished and formal, suitable for executive audiences",
        },
      ];

      // Optionally generate images for each
      const results: Array<{ name: string; prompt: string; approach: string; imageUrl?: string }> = [];

      for (const variation of variations) {
        const result: { name: string; prompt: string; approach: string; imageUrl?: string } = {
          name: variation.name,
          prompt: variation.prompt,
          approach: variation.approach,
        };

        if (generateImages) {
          try {
            const imageResult = await generateImageWithDALLE(variation.prompt);
            result.imageUrl = imageResult.urls[0];
          } catch (error) {
            result.imageUrl = `Error: ${error instanceof Error ? error.message : String(error)}`;
          }
        }

        results.push(result);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: generateImages
                  ? "3 variations generated. Compare and pick the best direction."
                  : "3 prompt variations created. Review and use generate_image on the one you prefer.",
                variations: results,
                estimatedCost: generateImages ? "~$0.12 (3 standard images)" : "$0.00 (prompts only)",
                nextStep: generateImages
                  ? "Pick the best variation and iterate on it with generate_image."
                  : "Use generate_image with the prompt from the variation you like best.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "create_asset_pack": {
      const theme = args?.theme as string;
      const packType = args?.packType as string;
      const styleGuide = args?.styleGuide as string || "clean, modern, professional";
      const generateImages = args?.generateImages as boolean || false;

      // Build pack based on type
      const packTemplates: Record<string, Array<{ title: string; promptSuffix: string }>> = {
        "social-campaign": [
          { title: "Announcement Post", promptSuffix: "Bold announcement graphic with text space on left. Eye-catching, celebration feel." },
          { title: "Feature Highlight", promptSuffix: "Focused feature showcase. Single key visual with supporting details." },
          { title: "Testimonial / Social Proof", promptSuffix: "Trust-building visual. Clean, credible, with quote space." },
          { title: "Call-to-Action Post", promptSuffix: "Action-oriented graphic. Strong CTA area, urgency feel, clear visual hierarchy." },
        ],
        "presentation-set": [
          { title: "Title Slide Background", promptSuffix: "Hero background image, abstract, professional. Space for large title text." },
          { title: "Problem Slide Visual", promptSuffix: "Illustration representing the problem or pain point. Slightly chaotic, muted colors." },
          { title: "Solution Slide Visual", promptSuffix: "Illustration representing the solution. Organized, bright accents, clarity." },
          { title: "Results Slide Visual", promptSuffix: "Upward-trending visual, achievement, success. Charts or growth metaphor." },
        ],
        "icon-set": [
          { title: "Icon 1: Core Feature", promptSuffix: "Simple flat icon representing the primary feature. Single color, clean lines." },
          { title: "Icon 2: Integration", promptSuffix: "Simple flat icon representing connectivity or integration. Matching style." },
          { title: "Icon 3: Analytics", promptSuffix: "Simple flat icon representing data or analytics. Matching style." },
          { title: "Icon 4: Security / Trust", promptSuffix: "Simple flat icon representing security or reliability. Matching style." },
        ],
        "feature-highlights": [
          { title: "Feature 1: Main Value", promptSuffix: "Visual highlighting the primary value proposition. Product in action." },
          { title: "Feature 2: Speed / Efficiency", promptSuffix: "Visual emphasizing speed or efficiency gains. Before/after or time-saving." },
          { title: "Feature 3: Collaboration", promptSuffix: "Visual showing team collaboration or multi-user benefits." },
          { title: "Feature 4: Results / Impact", promptSuffix: "Visual showing measurable results or impact. Data-driven, impressive." },
        ],
      };

      const templates = packTemplates[packType] || packTemplates["social-campaign"];

      const assets: Array<{ title: string; prompt: string; imageUrl?: string }> = [];

      for (const template of templates) {
        const prompt = `${theme}. ${template.promptSuffix} Style: ${styleGuide}. Consistent with other images in this set.`;

        const asset: { title: string; prompt: string; imageUrl?: string } = {
          title: template.title,
          prompt,
        };

        if (generateImages) {
          try {
            const imageResult = await generateImageWithDALLE(prompt);
            asset.imageUrl = imageResult.urls[0];
          } catch (error) {
            asset.imageUrl = `Error: ${error instanceof Error ? error.message : String(error)}`;
          }
        }

        assets.push(asset);
      }

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: generateImages
                  ? `Asset pack generated: 4 coordinated ${packType} images for "${theme}".`
                  : `Asset pack prompts ready: 4 coordinated ${packType} prompts for "${theme}". Use generate_image on each when ready.`,
                packType,
                theme,
                styleGuide,
                assets,
                estimatedCost: generateImages ? "~$0.16 (4 standard images)" : "$0.00 (prompts only)",
                tip: "For maximum consistency, generate all 4 images in the same session and include the same style guide in each prompt.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    case "review_prompt": {
      const prompt = args?.prompt as string;
      const review = reviewPrompt(prompt);

      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                message: review.score >= 80
                  ? "This prompt is solid. You can generate an image directly."
                  : review.score >= 60
                  ? "This prompt is decent but could be improved. Consider the suggestions below."
                  : "This prompt needs work. Address the issues below for better results.",
                score: review.score,
                grade: review.score >= 80 ? "A - Ready to generate" : review.score >= 60 ? "B - Could be better" : "C - Needs refinement",
                issues: review.issues,
                suggestions: review.suggestions,
                refinedPrompt: review.refinedPrompt,
                nextStep: review.score >= 70
                  ? "Use generate_image to create the visual."
                  : "Use refine_prompt to improve this prompt before generating.",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      return {
        content: [
          { type: "text" as const, text: `Unknown tool: ${name}` },
        ],
        isError: true,
      };
  }
});

// ── Start server ───────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Image Generator MCP server running on stdio");
}

main().catch(console.error);
