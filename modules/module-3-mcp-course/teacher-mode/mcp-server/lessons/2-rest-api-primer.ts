import { LessonContent } from "./1-welcome";

const lesson: LessonContent = {
  number: 2,
  title: "REST APIs for PMs",
  duration: "30-60 min",
  objectives: [
    "Understand what an API is and why it matters for MCP",
    "Know the four main HTTP methods: GET, POST, PUT, DELETE",
    "Read and understand a URL endpoint structure",
    "Understand HTTP status codes and what they mean",
    "Know the basics of authentication (API keys, tokens)",
    "Read and write basic JSON data structures",
  ],
  content: `# REST APIs for PMs

## Why This Lesson Matters

Every MCP server you build in this course will talk to a REST API. Jira has an API. Google Drive has an API. Sheets, Figma, Slack — they all have APIs. If you understand how APIs work, every MCP integration will feel familiar. If you skip this lesson, the rest of the course will feel like magic you cannot debug.

This is the foundation. Take your time with it.

---

## What Is an API?

API stands for **Application Programming Interface**. That is a mouthful, so let us use an analogy.

### The Restaurant Analogy

Imagine you are at a restaurant:

- **You** are the client (the one making requests)
- **The kitchen** is the server (where the work happens — the database, the logic, the data)
- **The waiter** is the API (the intermediary who takes your request, brings it to the kitchen, and returns with your food)

You do not walk into the kitchen yourself. You do not need to know how the food is prepared. You just tell the waiter what you want (your **request**), and the waiter brings back what you ordered (the **response**).

In software terms:
- **You (or Claude)** send a request to an API
- **The API** processes it and talks to the service (Jira, Google, etc.)
- **The API** sends back a response with the data or confirmation

### Why "REST"?

REST stands for **Representational State Transfer**. You do not need to memorize this. Just know that REST is a set of conventions for how APIs should be designed. Almost every modern API you will encounter follows REST conventions. When someone says "REST API," they mean "an API that follows standard web conventions."

---

## HTTP Methods: The Four Verbs

Every API request uses an HTTP method — a verb that tells the API what you want to do. There are four main ones:

### GET — Read Data

\`\`\`
GET https://api.example.com/issues/PROJ-123
\`\`\`

"Give me the data for issue PROJ-123."

GET requests **read** data. They do not change anything. You are just asking to see information. Think of it as opening a Jira ticket to read it — you are not modifying it, just looking.

**Real examples:**
- Get a Jira issue: \`GET /rest/api/3/issue/PROJ-123\`
- List Google Drive files: \`GET /drive/v3/files\`
- Read a Sheets range: \`GET /v4/spreadsheets/{id}/values/Sheet1!A1:D10\`

### POST — Create Something New

\`\`\`
POST https://api.example.com/issues
Body: { "title": "Fix login bug", "priority": "High" }
\`\`\`

"Create a new issue with this data."

POST requests **create** new things. You are sending data to the API and asking it to create a new resource. Think of it as clicking "Create Issue" in Jira and filling out the form.

**Real examples:**
- Create a Jira issue: \`POST /rest/api/3/issue\`
- Create a Google Doc: \`POST /drive/v3/files\`
- Add a comment: \`POST /rest/api/3/issue/PROJ-123/comment\`

### PUT — Update Something Existing

\`\`\`
PUT https://api.example.com/issues/PROJ-123
Body: { "status": "In Progress" }
\`\`\`

"Update issue PROJ-123 with this new data."

PUT requests **update** existing resources. You are changing something that already exists. Think of it as editing a Jira ticket — changing the status, updating the description, reassigning it.

**Real examples:**
- Update a Jira issue: \`PUT /rest/api/3/issue/PROJ-123\`
- Update a file name: \`PUT /drive/v3/files/{fileId}\`
- Update sheet data: \`PUT /v4/spreadsheets/{id}/values/Sheet1!A1\`

### DELETE — Remove Something

\`\`\`
DELETE https://api.example.com/issues/PROJ-123
\`\`\`

"Delete issue PROJ-123."

DELETE requests **remove** resources. This is permanent (usually). Think of it as deleting a Jira ticket.

**Real examples:**
- Delete a Jira issue: \`DELETE /rest/api/3/issue/PROJ-123\`
- Delete a Drive file: \`DELETE /drive/v3/files/{fileId}\`

### Quick Reference

| Method | Action | Changes Data? | Has a Body? |
|--------|--------|--------------|-------------|
| GET | Read | No | No |
| POST | Create | Yes | Yes |
| PUT | Update | Yes | Yes |
| DELETE | Remove | Yes | No |

---

## URLs and Endpoints

Every API request goes to a specific URL, called an **endpoint**. Let us break one down:

\`\`\`
https://your-domain.atlassian.net/rest/api/3/issue/PROJ-123
|____| |________________________| |___________| |________|
  |              |                      |            |
protocol    base URL              API path      resource ID
\`\`\`

### Base URL
The base URL is the root address of the API. Every request to this API starts with this.
- Jira: \`https://your-domain.atlassian.net/rest/api/3\`
- Google Drive: \`https://www.googleapis.com/drive/v3\`
- Figma: \`https://api.figma.com/v1\`

### Path
The path after the base URL specifies what resource you want.
- \`/issue\` — Jira issues
- \`/files\` — Google Drive files
- \`/projects\` — Jira projects

### Resource ID
When you want a specific item, you add its ID to the path.
- \`/issue/PROJ-123\` — a specific Jira issue
- \`/files/abc123def456\` — a specific Google Drive file

### Query Parameters
Sometimes you need to filter or modify your request. Query parameters go after a \`?\`:

\`\`\`
GET /rest/api/3/search?jql=project=PROJ&maxResults=50
                       |___________________________|
                            query parameters
\`\`\`

Multiple parameters are separated by \`&\`. Think of these as filters you apply to a search.

---

## Request and Response

### The Request

An API request has up to four parts:

1. **Method** — GET, POST, PUT, or DELETE
2. **URL** — where the request goes
3. **Headers** — metadata about the request (authentication, content type)
4. **Body** — the data you are sending (only for POST and PUT)

Here is what a full request looks like to create a Jira issue:

\`\`\`
POST https://your-domain.atlassian.net/rest/api/3/issue
Headers:
  Authorization: Basic base64(email:api_token)
  Content-Type: application/json
Body:
  {
    "fields": {
      "project": { "key": "PROJ" },
      "summary": "Fix the login page bug",
      "issuetype": { "name": "Bug" }
    }
  }
\`\`\`

### The Response

The API responds with:

1. **Status Code** — a number indicating success or failure
2. **Headers** — metadata about the response
3. **Body** — the data coming back (usually JSON)

### HTTP Status Codes

Status codes tell you what happened. You do not need to memorize all of them, but know these:

| Code | Meaning | What It Means for You |
|------|---------|----------------------|
| **200** | OK | Your request succeeded. Data is in the response. |
| **201** | Created | Your POST request succeeded. A new resource was created. |
| **204** | No Content | Your request succeeded, but there is no data to return (common for DELETE). |
| **400** | Bad Request | You sent something wrong. Check your request body or parameters. |
| **401** | Unauthorized | Your authentication is wrong or missing. Check your API key or token. |
| **403** | Forbidden | Your credentials are valid but you do not have permission for this action. |
| **404** | Not Found | The resource does not exist. Check the URL or resource ID. |
| **429** | Too Many Requests | You are sending requests too fast. Slow down (rate limiting). |
| **500** | Internal Server Error | Something broke on their end. Not your fault. Try again later. |

**The simple rule:** 2xx means success, 4xx means you did something wrong, 5xx means their server has a problem.

---

## Authentication

APIs need to know who you are. There are several common authentication methods:

### API Keys

The simplest method. You get a secret key from the service and include it in your requests.

\`\`\`
Headers:
  X-API-Key: your_secret_key_here
\`\`\`

**Used by:** Figma, many simpler APIs

### Basic Authentication

Your username and password (or email and API token) encoded together.

\`\`\`
Headers:
  Authorization: Basic base64encoded(email:api_token)
\`\`\`

**Used by:** Jira (with email + API token)

### Bearer Tokens (OAuth)

A token that represents your permission to access the API. Often obtained through an OAuth flow where you log in through a browser.

\`\`\`
Headers:
  Authorization: Bearer your_access_token_here
\`\`\`

**Used by:** Google APIs (Drive, Sheets), Slack

### The Key Takeaway

No matter which method, authentication always works the same way: you include credentials in the **headers** of your request, and the API checks them before processing your request.

In your MCP servers, you will store these credentials as environment variables (never hardcode them in your code) and include them in every request.

---

## JSON: The Language of APIs

Almost every API sends and receives data in **JSON** format (JavaScript Object Notation). JSON is simple — it is just a way to structure data using two basic building blocks:

### Objects (Curly Braces)

Objects hold key-value pairs. Think of them like a dictionary or a form:

\`\`\`json
{
  "name": "Sprint 23 Status Report",
  "status": "draft",
  "priority": "high",
  "assignee": "anmol@example.com"
}
\`\`\`

Each key is a string in quotes, followed by a colon, followed by a value. Values can be strings, numbers, booleans (\`true\`/\`false\`), or \`null\`.

### Arrays (Square Brackets)

Arrays hold lists of things:

\`\`\`json
{
  "labels": ["bug", "frontend", "P0"],
  "watchers": ["anmol@example.com", "sarah@example.com"]
}
\`\`\`

### Nested Structures

Objects can contain other objects and arrays. This is where it gets powerful (and sometimes confusing):

\`\`\`json
{
  "issue": {
    "key": "PROJ-123",
    "fields": {
      "summary": "Fix login page bug",
      "status": {
        "name": "In Progress"
      },
      "assignee": {
        "displayName": "Anmol Gupta",
        "emailAddress": "anmol@example.com"
      },
      "labels": ["bug", "frontend"]
    }
  }
}
\`\`\`

To access the assignee's name in this structure, you would navigate: \`issue.fields.assignee.displayName\`. This dot notation will show up frequently when you work with API responses.

### Reading JSON: The PM Skill

When you work with APIs, you will spend a lot of time reading JSON responses. The key is to look at the structure:
- Curly braces \`{}\` mean an object (a single thing with properties)
- Square brackets \`[]\` mean an array (a list of things)
- Follow the nesting to find the data you need

---

## Real Example: The Jira API

Let us put this all together with a real example. Here is how you would interact with the Jira API:

### 1. GET an Issue

\`\`\`
GET https://your-domain.atlassian.net/rest/api/3/issue/PROJ-123
Headers:
  Authorization: Basic base64(your-email:your-api-token)
  Accept: application/json
\`\`\`

Response (simplified):
\`\`\`json
{
  "key": "PROJ-123",
  "fields": {
    "summary": "Fix login page bug",
    "status": { "name": "In Progress" },
    "assignee": { "displayName": "Anmol Gupta" },
    "priority": { "name": "High" },
    "created": "2026-02-01T10:30:00.000+0000"
  }
}
\`\`\`

### 2. POST to Create an Issue

\`\`\`
POST https://your-domain.atlassian.net/rest/api/3/issue
Headers:
  Authorization: Basic base64(your-email:your-api-token)
  Content-Type: application/json
Body:
{
  "fields": {
    "project": { "key": "PROJ" },
    "summary": "Add dark mode to settings page",
    "description": {
      "type": "doc",
      "version": 1,
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Users have requested a dark mode toggle in the settings page."
            }
          ]
        }
      ]
    },
    "issuetype": { "name": "Story" },
    "priority": { "name": "Medium" }
  }
}
\`\`\`

Response:
\`\`\`json
{
  "id": "10042",
  "key": "PROJ-124",
  "self": "https://your-domain.atlassian.net/rest/api/3/issue/10042"
}
\`\`\`

The API created the issue and returned its key (\`PROJ-124\`) so you know it worked.

---

## Summary

Here is what you need to remember:

1. **APIs are intermediaries** between you (or Claude) and a service (Jira, Google, etc.)
2. **HTTP methods** tell the API what to do: GET (read), POST (create), PUT (update), DELETE (remove)
3. **URLs/endpoints** point to specific resources
4. **Status codes** tell you if it worked: 2xx = good, 4xx = your error, 5xx = their error
5. **Authentication** goes in headers — API keys, Basic auth, or Bearer tokens
6. **JSON** is the data format — objects use \`{}\`, arrays use \`[]\`

In the next lesson, we will see how MCP servers use all of these concepts to let Claude interact with your tools.
`,
  exercise: {
    title: "Make Your First API Request",
    description:
      "Use Claude Code to make a GET request to a free, public API and explore the response. This will give you hands-on experience with API requests before we start building MCP servers.",
    steps: [
      "Open Claude Code in your terminal by typing: claude",
      'Ask Claude: "Make a GET request to https://jsonplaceholder.typicode.com/todos/1 and show me the raw response."',
      "Look at the response. Identify: What is the URL? What HTTP method was used? What is the status code? What does the JSON body contain?",
      'Now ask Claude: "Make a GET request to https://jsonplaceholder.typicode.com/users/1 and explain each field in the JSON response to me."',
      "Compare the two responses. Notice how both are JSON objects with different fields. This is the same pattern every API follows.",
      'Try a list endpoint: "Make a GET request to https://jsonplaceholder.typicode.com/posts?userId=1 and tell me how many posts user 1 has."',
      "Notice that this response is a JSON array (starts with [) containing multiple objects. The query parameter ?userId=1 filtered the results.",
      'Finally, ask Claude: "What HTTP status code did we get back? What would a 404 look like? What would a 401 look like?"',
    ],
    validation:
      "You have successfully completed this exercise if: (1) You received a JSON response from the todos endpoint containing id, title, completed, and userId fields, (2) You received a JSON response from the users endpoint with name, email, and address fields, (3) You received an array of post objects from the posts endpoint, and (4) You can explain the difference between a 200, 404, and 401 status code.",
  },
  quiz: {
    questions: [
      {
        question:
          "You want to read data from Jira without changing anything. Which HTTP method should you use?",
        options: ["POST", "PUT", "GET", "DELETE"],
        correctIndex: 2,
        explanation:
          "GET is used to read data without modifying anything. It is the equivalent of opening a Jira ticket to look at it — you are just reading, not editing.",
      },
      {
        question:
          'You make an API request and receive a 401 status code. What does this mean?',
        options: [
          "The request was successful",
          "The resource was not found",
          "Your authentication is wrong or missing",
          "The server had an internal error",
        ],
        correctIndex: 2,
        explanation:
          "A 401 Unauthorized status code means your authentication credentials are wrong, missing, or expired. This is the most common error when setting up a new API integration. Double-check your API key or token.",
      },
      {
        question: "What is JSON?",
        options: [
          "A programming language used to build APIs",
          "A data format using objects (curly braces) and arrays (square brackets) to structure information",
          "A type of database used by Jira and Google",
          "A security protocol for encrypting API requests",
        ],
        correctIndex: 1,
        explanation:
          "JSON (JavaScript Object Notation) is a data format — a standardized way to structure information. It uses objects ({}) for key-value pairs and arrays ([]) for lists. Almost every modern API uses JSON to send and receive data.",
      },
      {
        question:
          "You want to create a new Jira ticket via the API. Which HTTP method should you use?",
        options: ["GET", "POST", "PUT", "DELETE"],
        correctIndex: 1,
        explanation:
          "POST is used to create new resources. When you want to create a new Jira issue, you send a POST request with the issue details in the request body.",
      },
      {
        question:
          "Where do you include your API key or authentication token in an API request?",
        options: [
          "In the URL path",
          "In the request body",
          "In the request headers",
          "In the query parameters",
        ],
        correctIndex: 2,
        explanation:
          "Authentication credentials go in the request headers. This is true for API keys (X-API-Key header), Basic auth (Authorization: Basic header), and Bearer tokens (Authorization: Bearer header). While some simple APIs accept keys in query parameters, headers are the standard and more secure approach.",
      },
    ],
  },
};

export default lesson;
