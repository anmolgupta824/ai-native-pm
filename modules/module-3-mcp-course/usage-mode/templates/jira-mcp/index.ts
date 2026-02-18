#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── Environment & Auth ──────────────────────────────────────────

function getConfig() {
  const baseUrl = process.env.JIRA_BASE_URL;
  const email = process.env.JIRA_EMAIL;
  const apiToken = process.env.JIRA_API_TOKEN;

  if (!baseUrl || !email || !apiToken) {
    const missing: string[] = [];
    if (!baseUrl) missing.push("JIRA_BASE_URL");
    if (!email) missing.push("JIRA_EMAIL");
    if (!apiToken) missing.push("JIRA_API_TOKEN");
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}. ` +
        `Set these before starting the server.\n\n` +
        `Example:\n` +
        `  export JIRA_BASE_URL="https://yourcompany.atlassian.net"\n` +
        `  export JIRA_EMAIL="you@company.com"\n` +
        `  export JIRA_API_TOKEN="your-api-token"`
    );
  }

  // Strip trailing slash from base URL
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

  return {
    baseUrl: cleanBaseUrl,
    email,
    apiToken,
    authHeader: `Basic ${Buffer.from(`${email}:${apiToken}`).toString("base64")}`,
  };
}

// ── Jira API Helper ─────────────────────────────────────────────

interface JiraRequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: Record<string, unknown>;
}

async function jiraRequest(options: JiraRequestOptions): Promise<unknown> {
  const config = getConfig();
  const url = `${config.baseUrl}${options.path}`;

  console.error(`[jira-mcp] ${options.method} ${url}`);

  const fetchOptions: RequestInit = {
    method: options.method,
    headers: {
      Authorization: config.authHeader,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  if (options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Network error connecting to Jira at ${config.baseUrl}: ${message}. ` +
        `Check that JIRA_BASE_URL is correct and you have internet access.`
    );
  }

  if (!response.ok) {
    let errorBody = "";
    try {
      errorBody = await response.text();
    } catch {
      // Ignore read errors
    }

    if (response.status === 401) {
      throw new Error(
        `Authentication failed (401). Check that JIRA_EMAIL and JIRA_API_TOKEN are correct. ` +
          `Generate a new token at: https://id.atlassian.com/manage-profile/security/api-tokens`
      );
    }
    if (response.status === 403) {
      throw new Error(
        `Permission denied (403). Your Jira account may not have access to this resource. ` +
          `Check your project permissions in Jira. Response: ${errorBody}`
      );
    }
    if (response.status === 404) {
      throw new Error(
        `Resource not found (404). Check that the issue key or project key is correct. ` +
          `Response: ${errorBody}`
      );
    }

    throw new Error(
      `Jira API error (${response.status}): ${errorBody || response.statusText}`
    );
  }

  // Some endpoints return 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// ── Tool Implementations ────────────────────────────────────────

async function listProjects() {
  const data = (await jiraRequest({
    method: "GET",
    path: "/rest/api/3/project",
  })) as Array<{ key: string; name: string; projectTypeKey: string; style: string }>;

  const projects = data.map((p) => ({
    key: p.key,
    name: p.name,
    type: p.projectTypeKey,
    style: p.style,
  }));

  return {
    message: `Found ${projects.length} Jira project(s).`,
    data: projects,
    nextSteps: [
      "Use jira_search_issues to find issues in a specific project (e.g., JQL: project = PROJ)",
      "Use jira_create_issue to create a new issue in one of these projects",
    ],
  };
}

async function getIssue(issueKey: string) {
  const data = (await jiraRequest({
    method: "GET",
    path: `/rest/api/3/issue/${encodeURIComponent(issueKey)}`,
  })) as {
    key: string;
    fields: {
      summary: string;
      status: { name: string };
      issuetype: { name: string };
      priority: { name: string } | null;
      assignee: { displayName: string } | null;
      reporter: { displayName: string } | null;
      description: unknown;
      created: string;
      updated: string;
      labels: string[];
    };
  };

  const fields = data.fields;

  // Extract plain text from Atlassian Document Format (ADF)
  let descriptionText = "";
  if (fields.description && typeof fields.description === "object") {
    descriptionText = extractTextFromADF(fields.description);
  } else if (typeof fields.description === "string") {
    descriptionText = fields.description;
  }

  return {
    message: `Issue ${data.key}: ${fields.summary}`,
    data: {
      key: data.key,
      summary: fields.summary,
      status: fields.status?.name || "Unknown",
      type: fields.issuetype?.name || "Unknown",
      priority: fields.priority?.name || "None",
      assignee: fields.assignee?.displayName || "Unassigned",
      reporter: fields.reporter?.displayName || "Unknown",
      description: descriptionText || "(No description)",
      labels: fields.labels || [],
      created: fields.created,
      updated: fields.updated,
    },
    nextSteps: [
      "Use jira_update_issue to modify this issue",
      "Use jira_search_issues with JQL to find related issues",
    ],
  };
}

async function createIssue(
  projectKey: string,
  issueType: string,
  summary: string,
  description?: string
) {
  const fields: Record<string, unknown> = {
    project: { key: projectKey },
    issuetype: { name: issueType },
    summary,
  };

  if (description) {
    // Use Atlassian Document Format (ADF) for description
    fields.description = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: description,
            },
          ],
        },
      ],
    };
  }

  const data = (await jiraRequest({
    method: "POST",
    path: "/rest/api/3/issue",
    body: { fields },
  })) as { key: string; id: string; self: string };

  const config = getConfig();

  return {
    message: `Issue ${data.key} created successfully.`,
    data: {
      key: data.key,
      id: data.id,
      url: `${config.baseUrl}/browse/${data.key}`,
      summary,
      type: issueType,
      project: projectKey,
    },
    nextSteps: [
      `View in Jira: ${config.baseUrl}/browse/${data.key}`,
      `Use jira_get_issue with key "${data.key}" to see full details`,
      "Use jira_update_issue to add more details or change status",
    ],
  };
}

async function searchIssues(jql: string, maxResults: number) {
  const data = (await jiraRequest({
    method: "POST",
    path: "/rest/api/3/search",
    body: {
      jql,
      maxResults,
      fields: [
        "summary",
        "status",
        "issuetype",
        "priority",
        "assignee",
        "created",
        "updated",
      ],
    },
  })) as {
    total: number;
    issues: Array<{
      key: string;
      fields: {
        summary: string;
        status: { name: string };
        issuetype: { name: string };
        priority: { name: string } | null;
        assignee: { displayName: string } | null;
        created: string;
        updated: string;
      };
    }>;
  };

  const issues = data.issues.map((issue) => ({
    key: issue.key,
    summary: issue.fields.summary,
    status: issue.fields.status?.name || "Unknown",
    type: issue.fields.issuetype?.name || "Unknown",
    priority: issue.fields.priority?.name || "None",
    assignee: issue.fields.assignee?.displayName || "Unassigned",
    created: issue.fields.created,
    updated: issue.fields.updated,
  }));

  return {
    message: `Found ${data.total} issue(s) matching your query. Showing ${issues.length}.`,
    data: {
      total: data.total,
      showing: issues.length,
      jql,
      issues,
    },
    nextSteps: [
      "Use jira_get_issue with a specific key to see full details",
      data.total > maxResults
        ? `There are more results. Increase max_results or refine your JQL.`
        : "All matching results are shown.",
    ],
  };
}

async function updateIssue(
  issueKey: string,
  summary?: string,
  description?: string,
  status?: string
) {
  const fields: Record<string, unknown> = {};
  const updates: string[] = [];

  if (summary) {
    fields.summary = summary;
    updates.push(`summary -> "${summary}"`);
  }

  if (description) {
    fields.description = {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: description,
            },
          ],
        },
      ],
    };
    updates.push("description updated");
  }

  // Update fields if any were provided
  if (Object.keys(fields).length > 0) {
    await jiraRequest({
      method: "PUT",
      path: `/rest/api/3/issue/${encodeURIComponent(issueKey)}`,
      body: { fields },
    });
  }

  // Handle status transition separately
  if (status) {
    // First, get available transitions
    const transitionsData = (await jiraRequest({
      method: "GET",
      path: `/rest/api/3/issue/${encodeURIComponent(issueKey)}/transitions`,
    })) as { transitions: Array<{ id: string; name: string }> };

    const transition = transitionsData.transitions.find(
      (t) => t.name.toLowerCase() === status.toLowerCase()
    );

    if (transition) {
      await jiraRequest({
        method: "POST",
        path: `/rest/api/3/issue/${encodeURIComponent(issueKey)}/transitions`,
        body: { transition: { id: transition.id } },
      });
      updates.push(`status -> "${transition.name}"`);
    } else {
      const available = transitionsData.transitions.map((t) => t.name).join(", ");
      updates.push(
        `status change failed: "${status}" is not a valid transition. Available: ${available}`
      );
    }
  }

  if (updates.length === 0) {
    return {
      message: `No changes provided for ${issueKey}. Provide at least one of: summary, description, status.`,
      data: { key: issueKey, changes: [] },
      nextSteps: [
        "Provide summary, description, or status to update",
        "Use jira_get_issue to see current values",
      ],
    };
  }

  const config = getConfig();

  return {
    message: `Issue ${issueKey} updated: ${updates.join("; ")}`,
    data: {
      key: issueKey,
      changes: updates,
      url: `${config.baseUrl}/browse/${issueKey}`,
    },
    nextSteps: [
      `View in Jira: ${config.baseUrl}/browse/${issueKey}`,
      `Use jira_get_issue with key "${issueKey}" to verify changes`,
    ],
  };
}

// ── Helpers ─────────────────────────────────────────────────────

function extractTextFromADF(adf: unknown): string {
  if (!adf || typeof adf !== "object") return "";

  const node = adf as { type?: string; text?: string; content?: unknown[] };

  if (node.type === "text" && typeof node.text === "string") {
    return node.text;
  }

  if (Array.isArray(node.content)) {
    return node.content.map((child) => extractTextFromADF(child)).join("");
  }

  return "";
}

// ── MCP Server ──────────────────────────────────────────────────

const server = new Server(
  {
    name: "jira-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ── Tool Definitions ────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "jira_list_projects",
      description:
        "List all accessible Jira projects. Use this to discover available projects before creating or searching issues.",
      inputSchema: {
        type: "object" as const,
        properties: {},
      },
    },
    {
      name: "jira_get_issue",
      description:
        "Get full details of a specific Jira issue including summary, status, assignee, description, and more.",
      inputSchema: {
        type: "object" as const,
        properties: {
          issue_key: {
            type: "string",
            description:
              'The issue key (e.g., "PROJ-123"). Must include project prefix and number.',
          },
        },
        required: ["issue_key"],
      },
    },
    {
      name: "jira_create_issue",
      description:
        "Create a new Jira issue in a specified project. Supports Bug, Story, Task, and Epic types.",
      inputSchema: {
        type: "object" as const,
        properties: {
          project_key: {
            type: "string",
            description:
              'The project key (e.g., "PROJ"). Use jira_list_projects to find available keys.',
          },
          issue_type: {
            type: "string",
            enum: ["Bug", "Story", "Task", "Epic"],
            description: "The type of issue to create.",
          },
          summary: {
            type: "string",
            description: "A short summary/title for the issue.",
          },
          description: {
            type: "string",
            description: "Detailed description of the issue. Optional but recommended.",
          },
        },
        required: ["project_key", "issue_type", "summary"],
      },
    },
    {
      name: "jira_search_issues",
      description:
        'Search Jira issues using JQL (Jira Query Language). Examples: "project = PROJ AND status = Open", "assignee = currentUser() ORDER BY updated DESC".',
      inputSchema: {
        type: "object" as const,
        properties: {
          jql: {
            type: "string",
            description:
              'JQL query string. Examples: "project = PROJ", "status = \'In Progress\'", "assignee = currentUser()".',
          },
          max_results: {
            type: "number",
            description: "Maximum number of results to return (default: 10, max: 50).",
          },
        },
        required: ["jql"],
      },
    },
    {
      name: "jira_update_issue",
      description:
        "Update an existing Jira issue. Can modify summary, description, and/or transition the status.",
      inputSchema: {
        type: "object" as const,
        properties: {
          issue_key: {
            type: "string",
            description: 'The issue key to update (e.g., "PROJ-123").',
          },
          summary: {
            type: "string",
            description: "New summary/title for the issue. Optional.",
          },
          description: {
            type: "string",
            description: "New description for the issue. Optional.",
          },
          status: {
            type: "string",
            description:
              'Transition the issue to this status (e.g., "In Progress", "Done"). Must be a valid transition from current status.',
          },
        },
        required: ["issue_key"],
      },
    },
  ],
}));

// ── Tool Handler ────────────────────────────────────────────────

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result: { message: string; data: unknown; nextSteps: string[] };

    switch (name) {
      case "jira_list_projects": {
        result = await listProjects();
        break;
      }

      case "jira_get_issue": {
        const issueKey = args?.issue_key as string;
        if (!issueKey) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  message: "Error: issue_key is required.",
                  data: null,
                  nextSteps: [
                    'Provide an issue_key like "PROJ-123"',
                    "Use jira_search_issues to find issue keys",
                  ],
                }),
              },
            ],
            isError: true,
          };
        }
        result = await getIssue(issueKey);
        break;
      }

      case "jira_create_issue": {
        const projectKey = args?.project_key as string;
        const issueType = args?.issue_type as string;
        const summary = args?.summary as string;
        const description = args?.description as string | undefined;

        if (!projectKey || !issueType || !summary) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  message:
                    "Error: project_key, issue_type, and summary are all required.",
                  data: null,
                  nextSteps: [
                    "Use jira_list_projects to find your project key",
                    'issue_type must be one of: Bug, Story, Task, Epic',
                  ],
                }),
              },
            ],
            isError: true,
          };
        }
        result = await createIssue(projectKey, issueType, summary, description);
        break;
      }

      case "jira_search_issues": {
        const jql = args?.jql as string;
        const maxResults = Math.min((args?.max_results as number) || 10, 50);

        if (!jql) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  message: "Error: jql query string is required.",
                  data: null,
                  nextSteps: [
                    'Try: "project = PROJ"',
                    'Try: "assignee = currentUser() AND status != Done"',
                    'Try: "created >= -7d ORDER BY created DESC"',
                  ],
                }),
              },
            ],
            isError: true,
          };
        }
        result = await searchIssues(jql, maxResults);
        break;
      }

      case "jira_update_issue": {
        const issueKey = args?.issue_key as string;
        if (!issueKey) {
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({
                  message: "Error: issue_key is required.",
                  data: null,
                  nextSteps: ['Provide an issue_key like "PROJ-123"'],
                }),
              },
            ],
            isError: true,
          };
        }
        result = await updateIssue(
          issueKey,
          args?.summary as string | undefined,
          args?.description as string | undefined,
          args?.status as string | undefined
        );
        break;
      }

      default:
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                message: `Unknown tool: ${name}`,
                data: null,
                nextSteps: [
                  "Available tools: jira_list_projects, jira_get_issue, jira_create_issue, jira_search_issues, jira_update_issue",
                ],
              }),
            },
          ],
          isError: true,
        };
    }

    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(result, null, 2),
        },
      ],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[jira-mcp] Error in ${name}: ${message}`);
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify({
            message: `Error: ${message}`,
            data: null,
            nextSteps: [
              "Check your environment variables (JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN)",
              "Verify you have network access to your Jira instance",
              "Check Jira permissions for your account",
            ],
          }),
        },
      ],
      isError: true,
    };
  }
});

// ── Start Server ────────────────────────────────────────────────

async function main() {
  // Validate env vars early so the user gets a clear error on startup
  try {
    getConfig();
  } catch (error) {
    console.error(`[jira-mcp] Configuration error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[jira-mcp] Jira MCP server running on stdio");
}

main().catch((error) => {
  console.error("[jira-mcp] Fatal error:", error);
  process.exit(1);
});
