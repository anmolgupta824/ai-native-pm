# Lesson 2: REST API Primer -- How Apps Talk to Each Other

**Estimated reading time: 30-60 minutes**
**Lesson type: Foundational knowledge + Hands-on practice**

---

## What You'll Learn

By the end of this lesson, you will understand:

- What an API is and why it exists
- How HTTP requests work (the "verbs" of the internet)
- URLs, endpoints, and query parameters
- Headers and authentication
- Status codes (what the numbers mean)
- JSON (the language APIs speak)
- How to make your first API call using Claude Code

This is the longest foundational lesson in the course. Everything you learn here will be used in every subsequent lesson. Take your time.

---

## Why This Lesson Matters

Every MCP server you build in this course is essentially a translator. It takes your plain English request, converts it into an API call, sends it to a service like Jira or Google Sheets, and brings back the response.

If you do not understand what an API call looks like, the MCP server code will feel like magic. And magic is hard to debug when something goes wrong.

After this lesson, it will not be magic anymore. It will be a simple, repeatable pattern.

---

## What is an API?

### The Restaurant Analogy

Imagine you are at a restaurant.

- **You** are the customer (the application that needs something)
- **The kitchen** is the back-end system (Jira's database, Google's servers)
- **The menu** is the API documentation (it lists everything you can order)
- **The waiter** is the API itself (the go-between who takes your request and brings back the result)

Here is what happens:

1. You look at the **menu** (API documentation) to see what is available
2. You tell the **waiter** (API) what you want: "I'd like the grilled salmon with rice"
3. The waiter walks to the **kitchen** (server) and places your order
4. The kitchen prepares your dish
5. The waiter brings it back to your table

You never go into the kitchen yourself. You do not need to know how the salmon is cooked. You just need to know what is on the menu and how to place an order.

**APIs work exactly the same way.** When your MCP server wants to get a Jira ticket, it does not reach into Jira's database directly. It sends a request to Jira's API (the waiter), which goes to Jira's servers (the kitchen), and brings back the ticket data (your meal).

### Why Not Just Access the Database Directly?

Great question. Three reasons:

1. **Security.** The restaurant does not let customers wander into the kitchen for the same reason Jira does not let random programs access its database. The API controls what you can and cannot do.

2. **Simplicity.** You do not need to know SQL, database schemas, or server architecture. The API gives you a clean, simple interface.

3. **Stability.** Jira might completely rebuild their database next month, but if their API stays the same, your MCP server still works. The kitchen can renovate without changing the menu.

---

## HTTP Methods: The Verbs of the Internet

When you make an API call, you need to tell the API what kind of action you want to perform. These actions are called **HTTP methods** (or "verbs").

There are four you need to know:

### GET -- "Give me information"

Like asking the waiter: "What soups do you have today?"

You are not changing anything. You are just asking for data.

**Real PM examples:**
- Get a list of Jira issues in the current sprint
- Read a Google Sheet's contents
- Fetch comments from a Figma file

```
GET https://your-company.atlassian.net/rest/api/3/issue/PROJ-123
```
This asks Jira: "Give me the details of ticket PROJ-123."

### POST -- "Create something new"

Like telling the waiter: "I would like to place an order for the grilled salmon."

You are creating something that did not exist before.

**Real PM examples:**
- Create a new Jira ticket
- Create a new Google Doc
- Post a comment on a Figma design

```
POST https://your-company.atlassian.net/rest/api/3/issue
```
This tells Jira: "Create a new issue." (You also send along the details of the issue, which we will cover shortly.)

### PUT -- "Update something completely"

Like telling the waiter: "Actually, change my entire order to the pasta instead."

You are replacing something that already exists with new information.

**Real PM examples:**
- Update a Jira ticket's description entirely
- Replace the contents of a Google Doc

```
PUT https://your-company.atlassian.net/rest/api/3/issue/PROJ-123
```
This tells Jira: "Replace the details of PROJ-123 with this new information."

### DELETE -- "Remove something"

Like telling the waiter: "Cancel my dessert order."

**Real PM examples:**
- Delete a Jira ticket (rare, but possible)
- Remove a file from Google Drive
- Delete a comment from Figma

```
DELETE https://your-company.atlassian.net/rest/api/3/issue/PROJ-123
```
This tells Jira: "Delete ticket PROJ-123."

### Quick Reference

| Method | Action | Analogy | Changes Data? |
|--------|--------|---------|---------------|
| GET | Read | "What's on the menu?" | No |
| POST | Create | "I'd like to place an order" | Yes |
| PUT | Update | "Change my order to pasta" | Yes |
| DELETE | Remove | "Cancel my dessert" | Yes |

---

## URLs, Endpoints, and Query Parameters

### The Anatomy of an API URL

Let us break down a real Jira API URL:

```
https://your-company.atlassian.net/rest/api/3/issue/PROJ-123
```

| Part | Example | What It Means |
|------|---------|---------------|
| Protocol | `https://` | Secure communication (always use https) |
| Base URL | `your-company.atlassian.net` | The server's address (like a street address) |
| API path | `/rest/api/3` | The API version (like which floor of the building) |
| Endpoint | `/issue` | The specific resource type (like which office) |
| Parameter | `/PROJ-123` | The specific item (like which person in the office) |

### Endpoints

An **endpoint** is a specific URL path that does a specific thing. Think of it as a department in a company:

- `/issue` -- the Issues department (create, read, update tickets)
- `/project` -- the Projects department (list and manage projects)
- `/search` -- the Search department (find issues with complex queries)
- `/user` -- the Users department (look up team members)

Each endpoint supports different HTTP methods. The `/issue` endpoint might support GET (read a ticket), POST (create a ticket), PUT (update a ticket), and DELETE (remove a ticket).

### Query Parameters

Sometimes you need to be more specific about what you want. Query parameters let you filter, sort, and customize your request.

They go at the end of the URL after a `?` and are separated by `&`:

```
GET https://your-company.atlassian.net/rest/api/3/search?jql=sprint=42&maxResults=50
```

Breaking this down:

| Part | Value | Meaning |
|------|-------|---------|
| `?` | -- | Marks the start of parameters |
| `jql` | `sprint=42` | Filter: only issues in sprint 42 |
| `&` | -- | Separator between parameters |
| `maxResults` | `50` | Limit: return at most 50 results |

**PM analogy:** Query parameters are like telling your assistant "Get me the Q3 reports (parameter 1), but only the ones from the marketing team (parameter 2), sorted by date (parameter 3)."

---

## Headers: The Metadata of Your Request

When you send a letter, the letter itself is the content. But the envelope has metadata -- who it is from, who it is to, whether it needs a signature on delivery.

HTTP **headers** are the metadata of your API request. They travel alongside your request and tell the server important things about it.

### Content-Type

This header tells the server what format your data is in.

```
Content-Type: application/json
```

This means: "The data I am sending is in JSON format." (We will cover JSON shortly.)

For almost every API you will use in this course, the content type will be `application/json`. You can think of this as "I am writing my order in English" -- it is the expected language.

### Authorization

This header proves who you are. Without it, the API will reject your request, just like a bouncer checks IDs at a club.

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

or

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

We will cover the different types of authorization in the Authentication section below.

### Accept

This header tells the server what format you want the response in.

```
Accept: application/json
```

This means: "Please send your response back to me in JSON format."

### A Complete Request With Headers

Putting it all together, here is what a complete API request looks like:

```
GET https://your-company.atlassian.net/rest/api/3/issue/PROJ-123
Headers:
  Content-Type: application/json
  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  Accept: application/json
```

In plain English: "I want to READ issue PROJ-123. I am sending and expecting JSON. Here are my credentials."

---

## Status Codes: What the Server Tells You Back

After you send a request, the server sends back a response. That response always includes a **status code** -- a three-digit number that tells you what happened.

You have already seen these without knowing it. When you visit a broken webpage and see "404 Not Found" -- that is a status code.

### The Six Status Codes You Need to Know

#### 200 OK -- "Here you go"

Everything worked perfectly. The server is sending back the data you requested.

**PM translation:** "Your request was processed successfully. Here's your data."

#### 201 Created -- "Done, I made the thing"

Your POST request worked. A new resource was created.

**PM translation:** "The Jira ticket has been created. Here are its details."

#### 400 Bad Request -- "I don't understand your order"

Something was wrong with your request. Maybe you sent invalid data or forgot a required field.

**PM translation:** "You asked me to create a ticket but forgot to include the project key. Try again."

#### 401 Unauthorized -- "Who are you?"

Your authentication failed. Either you did not include credentials or they are wrong.

**PM translation:** "Your API key is invalid or expired. Check your credentials."

#### 404 Not Found -- "That doesn't exist"

The thing you asked for does not exist. Maybe the ticket was deleted or you have a typo in the URL.

**PM translation:** "There is no ticket called PROJ-999. Double-check the ticket number."

#### 500 Internal Server Error -- "Something broke on our end"

The server had a problem. This is not your fault.

**PM translation:** "Jira's servers are having issues. Try again in a few minutes."

### Status Code Families

Notice the pattern in the first digit:

| First Digit | Meaning | Your Reaction |
|-------------|---------|---------------|
| 2xx | Success | Everything is fine |
| 4xx | Client error | You did something wrong -- fix your request |
| 5xx | Server error | Their problem -- try again later |

---

## JSON: The Language APIs Speak

### What is JSON?

JSON (JavaScript Object Notation) is the format that almost every modern API uses to send and receive data. It is a way to structure information so both humans and computers can read it.

Think of JSON like a very organized filing system. Instead of a messy paragraph of text, information is stored in clear, labeled fields.

### JSON vs. Plain Text

**Plain text (like an email):**
```
Hey, the ticket PROJ-123 is a bug about the login page.
It's high priority and assigned to Sarah. It's currently
in progress.
```

**JSON (structured data):**
```json
{
  "key": "PROJ-123",
  "type": "Bug",
  "summary": "Login page not loading",
  "priority": "High",
  "assignee": "Sarah Chen",
  "status": "In Progress"
}
```

Both contain the same information, but the JSON version is:
- **Labeled** -- every piece of data has a clear name
- **Consistent** -- every ticket uses the same structure
- **Machine-readable** -- a program can instantly extract the priority without parsing a paragraph

### JSON Syntax Rules

JSON has a few simple rules:

**1. Curly braces `{}` hold objects (a collection of named fields)**
```json
{
  "name": "Sarah",
  "role": "Engineer"
}
```

**2. Square brackets `[]` hold arrays (a list of items)**
```json
{
  "team_members": ["Sarah", "James", "Priya"]
}
```

**3. Fields are always `"name": value` pairs**
```json
{
  "title": "Fix login bug",
  "story_points": 5,
  "is_blocker": true
}
```

**4. Values can be:**
- Strings (text): `"Hello"` -- always in double quotes
- Numbers: `42` or `3.14` -- no quotes
- Booleans: `true` or `false` -- no quotes
- Null: `null` -- represents "no value"
- Arrays: `[1, 2, 3]`
- Objects: `{"nested": "data"}`

### A Real Jira JSON Response

When you ask the Jira API for a ticket, here is a simplified version of what comes back:

```json
{
  "key": "PROJ-123",
  "fields": {
    "summary": "Login page not loading on mobile",
    "description": "Users report blank screen on iOS Safari",
    "issuetype": {
      "name": "Bug"
    },
    "priority": {
      "name": "High"
    },
    "status": {
      "name": "In Progress"
    },
    "assignee": {
      "displayName": "Sarah Chen",
      "emailAddress": "sarah@company.com"
    },
    "created": "2026-02-10T09:30:00.000Z",
    "updated": "2026-02-14T14:22:00.000Z"
  }
}
```

Notice how objects can contain other objects. The `assignee` field contains its own object with `displayName` and `emailAddress`. This nesting is common in real API responses.

**You do not need to memorize JSON syntax.** Claude will handle all the JSON formatting for you. But understanding what it looks like will help you read API responses and debug issues.

---

## Authentication: Proving Who You Are

APIs need to know who is making a request, both for security and to know what data you are allowed to access. There are three main authentication methods you will encounter in this course.

### 1. API Keys -- The Simple Approach

An API key is like a password that identifies your application. You generate it once and include it with every request.

**How it works:**
1. Go to the service's settings (e.g., Jira, Figma)
2. Generate an API key or token
3. Include it in your request headers

**Example:**
```
Authorization: Basic base64(email:api_token)
```

**Used by:** Jira, Figma, many simpler APIs

**PM analogy:** An API key is like your building access badge. You got it once when you joined the company, and you swipe it every time you enter the building. Anyone with the badge gets in, so do not share it.

### 2. Bearer Tokens -- The Common Standard

A Bearer token is similar to an API key but often has an expiration time and specific permissions attached.

**How it works:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Used by:** Many modern APIs, especially after OAuth authentication

**PM analogy:** A Bearer token is like a day pass at a conference. It works for a specific time period and gives you access to specific areas.

### 3. OAuth 2.0 -- The Secure Handshake

OAuth is the most complex but most secure method. It is what happens when you click "Sign in with Google" on a website.

**How it works (simplified):**
1. Your MCP server says to Google: "I'd like access to this user's Google Drive"
2. Google shows the user a consent screen: "This app wants to access your Drive. Allow?"
3. The user clicks "Allow"
4. Google gives your MCP server a special token
5. Your MCP server uses that token for all future requests

**Used by:** Google Drive, Google Sheets, and most Google/Microsoft services

**PM analogy:** OAuth is like a valet key for your car. You give the valet a key that can drive the car but cannot open the trunk or the glove box. You are granting limited, specific access rather than handing over your full set of keys.

We will set up OAuth step-by-step in Lessons 5 and 6 (Google Drive and Sheets). It looks intimidating on paper but is manageable with instructions.

### Which Authentication Does Each Service Use?

| Service | Auth Method | Difficulty |
|---------|-------------|------------|
| Jira | API Token (Basic) | Easy |
| Figma | Personal Access Token | Easy |
| Google Drive | OAuth 2.0 | Moderate |
| Google Sheets | OAuth 2.0 | Moderate |
| Slack | Bot Token / OAuth | Moderate |

---

## Hands-On: Making Your First API Call

Let us put all of this together by making a real API call using Claude Code. We will use a free, public API that requires no authentication -- perfect for practice.

### Step 1: Open Claude Code

```
claude
```

### Step 2: Ask Claude to Call a Public API

Type this:

```
Can you make a GET request to https://jsonplaceholder.typicode.com/todos/1
and explain the response?
```

### Step 3: Understand the Response

Claude will show you something like this:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

Let us break this down:
- We made a **GET** request (we asked for data)
- To the endpoint `/todos/1` (todo item number 1)
- The response is **JSON** with four fields
- The status code was **200** (success)

### Step 4: Try a Different Request

Now try:

```
Make a GET request to https://jsonplaceholder.typicode.com/todos?userId=1&completed=true
and tell me how many completed todos user 1 has.
```

This uses **query parameters** to filter the results. Claude will tell you the count and show you the filtered data.

### Step 5: Try Creating Something

```
Make a POST request to https://jsonplaceholder.typicode.com/todos with a
JSON body containing title "Review Q3 roadmap" and completed false.
Explain what happened.
```

This sends data TO the API instead of just requesting it. The API will respond with the "created" item (note: this is a test API, so nothing is actually saved permanently).

---

## Practice Exercises

Try these on your own to build confidence. All use the free JSONPlaceholder API.

### Exercise 1: GET a User
Ask Claude to fetch user data from `https://jsonplaceholder.typicode.com/users/1` and explain each field in the response.

### Exercise 2: List Posts with Parameters
Ask Claude to get all posts by user 2 from `https://jsonplaceholder.typicode.com/posts?userId=2`. How many posts does user 2 have?

### Exercise 3: Create a Post
Ask Claude to create a new post at `https://jsonplaceholder.typicode.com/posts` with a title, body, and userId. What status code did you get back?

### Exercise 4: Identify the Parts
Look at this URL and identify each component:

```
https://api.example.com/v2/projects/42/tasks?status=open&assignee=sarah&limit=10
```

- What is the base URL?
- What is the API version?
- What endpoint is being called?
- What are the query parameters?

<details>
<summary>Click for answers</summary>

- Base URL: `api.example.com`
- API version: `v2`
- Endpoint: `/projects/42/tasks` (tasks within project 42)
- Query parameters: `status=open`, `assignee=sarah`, `limit=10`

</details>

---

## Common Mistakes and How to Avoid Them

### Mistake 1: Forgetting Authentication
**Symptom:** Status code 401
**Fix:** Double-check your API key or token. Make sure it is in the Authorization header.

### Mistake 2: Wrong HTTP Method
**Symptom:** Status code 405 (Method Not Allowed)
**Fix:** Check the API docs. You might be sending a GET when you need a POST.

### Mistake 3: Invalid JSON
**Symptom:** Status code 400
**Fix:** Make sure your JSON is valid. Common errors include trailing commas, single quotes instead of double quotes, and missing closing braces.

### Mistake 4: Wrong Content-Type
**Symptom:** Status code 415 (Unsupported Media Type) or unexpected behavior
**Fix:** Include `Content-Type: application/json` in your headers when sending JSON data.

---

## Cheat Sheet

Save this for reference as you work through the rest of the course:

```
HTTP Methods:
  GET    = Read data
  POST   = Create data
  PUT    = Update data
  DELETE = Remove data

Status Codes:
  200 = OK (success)
  201 = Created (success, new thing made)
  400 = Bad Request (your fault -- fix the request)
  401 = Unauthorized (bad credentials)
  404 = Not Found (thing doesn't exist)
  500 = Server Error (their fault -- try again later)

Headers:
  Content-Type: application/json  (what you're sending)
  Authorization: Basic/Bearer ...  (who you are)
  Accept: application/json         (what you want back)

JSON Basics:
  {}     = object (named fields)
  []     = array (list of items)
  "key"  = string (text)
  42     = number
  true   = boolean
  null   = no value
```

---

## What is Next?

Now that you understand how APIs work, Lesson 3 will show you how MCP sits on top of this foundation. You will learn how Claude discovers tools, how MCP servers are structured, and how everything connects together.

The concepts from this lesson -- HTTP methods, URLs, headers, JSON, authentication -- will be used in every single lesson going forward. You do not need to memorize everything. Just know where to find this reference.

---

*Previous: [Lesson 1: Welcome to MCP](1-welcome.md)*
*Next: [Lesson 3: How MCP Works](3-how-mcp-works.md)*
