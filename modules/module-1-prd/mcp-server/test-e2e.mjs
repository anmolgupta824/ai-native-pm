/**
 * End-to-end test for the PRD Generator MCP server.
 * Exercises all 5 tools in sequence, simulating what a PM would do.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ${GREEN}✓${RESET} ${label}`);
    passed++;
  } else {
    console.log(`  ${RED}✗${RESET} ${label}`);
    failed++;
  }
}

async function main() {
  console.log(`\n${BOLD}🧪 PRD Generator MCP Server — End-to-End Test${RESET}\n`);

  // Connect to server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["dist/index.js"],
  });

  const client = new Client({ name: "test-client", version: "1.0.0" }, {});
  await client.connect(transport);
  console.log(`${GREEN}Connected to MCP server${RESET}\n`);

  // ─── Test 1: list_templates ───────────────────────────────
  console.log(`${BOLD}Test 1: list_templates${RESET}`);
  const templatesResult = await client.callTool({ name: "list_templates", arguments: {} });
  const templates = JSON.parse(templatesResult.content[0].text);

  assert(templates.templates.length === 3, "Returns 3 templates");
  assert(
    templates.templates.map((t) => t.id).includes("feature-launch"),
    "Includes feature-launch template"
  );
  assert(
    templates.templates.map((t) => t.id).includes("api-integration"),
    "Includes api-integration template"
  );
  assert(
    templates.templates.map((t) => t.id).includes("redesign"),
    "Includes redesign template"
  );
  assert(templates.nextStep !== undefined, "Includes nextStep guidance");

  // ─── Test 2: get_questions ────────────────────────────────
  console.log(`\n${BOLD}Test 2: get_questions (feature-launch)${RESET}`);
  const questionsResult = await client.callTool({
    name: "get_questions",
    arguments: { template: "feature-launch" },
  });
  const questions = JSON.parse(questionsResult.content[0].text);

  assert(questions.questions.length === 10, "Returns 10 questions");
  assert(questions.templateName === "Feature Launch", "Correct template name");
  assert(questions.outputSections.length > 0, "Includes output sections list");
  assert(questions.instructions !== undefined, "Includes instructions for the agent");

  // Test invalid template
  console.log(`\n${BOLD}Test 2b: get_questions (invalid template)${RESET}`);
  const invalidResult = await client.callTool({
    name: "get_questions",
    arguments: { template: "nonexistent" },
  });
  assert(invalidResult.isError === true, "Returns error for invalid template");

  // ─── Test 3: generate_prd ─────────────────────────────────
  console.log(`\n${BOLD}Test 3: generate_prd${RESET}`);
  const questionTexts = questions.questions.map((q) => q.question);
  const answers = {};
  const sampleAnswers = [
    "A real-time notifications center for our B2B SaaS platform",
    "Users miss critical updates because notifications are scattered across email and Slack",
    "Team leads and approvers in mid-market B2B companies (50-500 employees)",
    "Reduce median response time from 18hrs to <4hrs. 80% of notifications read within 24hrs.",
    "Must-have: bell icon, real-time delivery, mark as read. Nice-to-have: notification preferences, daily digest",
    "Depends on WebSocket infrastructure. Must handle 50K concurrent connections.",
    "Beta by March 10, GA by March 24",
    "VP Product, Engineering Lead, Design Lead",
    "Phased rollout: internal → 10% beta → 100% GA with feature flags",
    "WebSocket scaling at 50K connections, notification fatigue, cross-tenant data leakage",
  ];

  questionTexts.forEach((q, i) => {
    answers[q] = sampleAnswers[i] || "TBD";
  });

  const prdResult = await client.callTool({
    name: "generate_prd",
    arguments: {
      template: "feature-launch",
      productName: "In-App Notifications Center",
      answers,
    },
  });
  const prdData = JSON.parse(prdResult.content[0].text);

  assert(prdData.prd.includes("# PRD: In-App Notifications Center"), "PRD has correct title");
  assert(prdData.prd.includes("Feature Launch"), "PRD references template type");
  assert(prdData.prd.includes("Pre-Ship Checklist"), "PRD includes pre-ship checklist");
  assert(prdData.validation !== undefined, "Includes validation results");
  assert(prdData.validation.score > 0, `Validation score: ${prdData.validation.score}%`);
  assert(prdData.nextSteps.length > 0, "Includes next steps");

  // ─── Test 4: validate_prd ─────────────────────────────────
  console.log(`\n${BOLD}Test 4: validate_prd${RESET}`);
  const validateResult = await client.callTool({
    name: "validate_prd",
    arguments: { prdContent: prdData.prd },
  });
  const validation = JSON.parse(validateResult.content[0].text);

  assert(typeof validation.score === "number", `Score is a number: ${validation.score}`);
  assert(["A", "B", "C", "D"].some((g) => validation.grade.startsWith(g)), `Grade assigned: ${validation.grade}`);
  assert(Array.isArray(validation.missing), "Missing sections is an array");
  assert(Array.isArray(validation.suggestions), "Suggestions is an array");
  assert(validation.message !== undefined, "Includes human-readable message");

  // Test with an incomplete PRD
  console.log(`\n${BOLD}Test 4b: validate_prd (incomplete PRD)${RESET}`);
  const incompleteValidation = await client.callTool({
    name: "validate_prd",
    arguments: { prdContent: "# My Feature\n\nThis is a feature." },
  });
  const incResult = JSON.parse(incompleteValidation.content[0].text);
  assert(incResult.score < 50, `Incomplete PRD scores low: ${incResult.score}%`);
  assert(incResult.missing.length > 3, `Identifies ${incResult.missing.length} missing sections`);

  // ─── Test 5: suggest_edge_cases ───────────────────────────
  console.log(`\n${BOLD}Test 5: suggest_edge_cases${RESET}`);
  const edgeCasesResult = await client.callTool({
    name: "suggest_edge_cases",
    arguments: {
      template: "feature-launch",
      productDescription: "Real-time notification center for B2B SaaS",
    },
  });
  const edgeCases = JSON.parse(edgeCasesResult.content[0].text);

  assert(edgeCases.edgeCases.length > 5, `Returns ${edgeCases.edgeCases.length} edge cases`);
  assert(edgeCases.tip !== undefined, "Includes a tip");
  assert(
    edgeCases.edgeCases.some((e) => e.toLowerCase().includes("scale") || e.toLowerCase().includes("traffic")),
    "Includes scalability edge case"
  );

  // Test edge cases for different template
  console.log(`\n${BOLD}Test 5b: suggest_edge_cases (api-integration)${RESET}`);
  const apiEdgeCases = await client.callTool({
    name: "suggest_edge_cases",
    arguments: {
      template: "api-integration",
      productDescription: "Stripe payment integration",
    },
  });
  const apiEC = JSON.parse(apiEdgeCases.content[0].text);
  assert(
    apiEC.edgeCases.some((e) => e.toLowerCase().includes("rate limit")),
    "API template includes rate limit edge case"
  );

  // ─── Test 6: Resources ───────────────────────────────────
  console.log(`\n${BOLD}Test 6: Resources (templates as files)${RESET}`);
  const resources = await client.listResources();
  assert(resources.resources.length === 3, `Lists ${resources.resources.length} resource templates`);

  const templateResource = await client.readResource({ uri: "prd://templates/feature-launch" });
  assert(
    templateResource.contents[0].text.includes("Feature Launch"),
    "Can read feature-launch template resource"
  );

  // ─── Summary ──────────────────────────────────────────────
  console.log(`\n${"─".repeat(50)}`);
  console.log(
    `\n${BOLD}Results: ${GREEN}${passed} passed${RESET}, ${failed > 0 ? RED : ""}${failed} failed${RESET}`
  );
  console.log(
    `${passed + failed} total tests\n`
  );

  await client.close();
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error(`${RED}Fatal error:${RESET}`, e);
  process.exit(1);
});
