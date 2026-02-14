# Module 4: Ship Your First Prototype This Weekend

**Time:** 3–6 hours (one weekend) | **Prerequisites:** Claude Code installed, zero coding experience needed | **Cost:** $29

> The best way to understand engineering is to build something yourself. Not to become an engineer — but to become a PM who speaks their language and ships faster.

---

## Overview

"Vibe coding" means describing what you want in plain English and letting AI write the code. You don't need to know JavaScript, React, or databases. You need to know what you want to build and how to describe it clearly.

This module takes you through three progressive projects — from beginner to advanced — each deployed to a real production URL you can share with your team.

### Why PMs Should Vibe Code

| Reason | How It Helps |
|--------|-------------|
| **Speak engineering's language** | Understand why "it's a simple feature" takes 3 sprints |
| **Prototype faster** | Test ideas with users before writing a PRD |
| **Build internal tools** | Don't wait for eng to build your dashboard |
| **Career differentiation** | "PM who can ship prototypes" stands out in any interview |
| **Empathy** | Experience the build process → better collaboration |

### What You'll Build

| Project | Difficulty | Time | What You Get |
|---------|-----------|------|-------------|
| User Feedback Dashboard | Beginner | 1–2 hrs | Live dashboard to collect and view user feedback |
| A/B Test Calculator | Intermediate | 2–3 hrs | Statistical significance calculator with visualizations |
| Feature Flag Dashboard | Advanced | 3–4 hrs | Internal tool to manage feature rollouts |

Each project produces a **real, working app** deployed to a URL you can share.

---

## The Vibe Coding Philosophy

Traditional coding:
```
Learn syntax → understand frameworks → write code → debug → deploy
(Timeline: months)
```

Vibe coding:
```
Describe what you want → AI writes code → you refine → deploy
(Timeline: hours)
```

### The PM Advantage

PMs are actually better at vibe coding than most engineers learning a new framework. Why? Because vibe coding is about **describing requirements clearly** — and that's literally your job.

| Skill | How PMs Already Have It |
|-------|----------------------|
| Clear requirements | You write user stories and acceptance criteria every day |
| User empathy | You know what the end user needs, not just what's technically elegant |
| Prioritization | You know what to build first and what to skip |
| Feedback loops | You're used to iterating based on user input |

---

## Before You Start: Coding 101 for PMs

You don't need to learn programming. But knowing 5 concepts will make you 10x more effective at guiding AI:

| Concept | What It Means | PM Translation |
|---------|-------------- |----------------|
| **Frontend** | What the user sees and clicks | The UI — buttons, forms, layouts |
| **Backend** | Server logic that processes data | The engine — business rules, data storage |
| **Database** | Where data lives permanently | The memory — user records, settings, history |
| **API** | How frontend talks to backend | The contract — "send me X, I'll return Y" |
| **Deploy** | Making it live on the internet | The launch — going from localhost to a real URL |

That's it. With these 5 concepts, you can describe any app to Claude Code.

---

## Project 1: User Feedback Dashboard (Beginner)

### What You'll Build
A web app where users submit feedback (text + category + sentiment) and you view it in a dashboard with filtering and basic analytics.

### The Conversation Flow

**Step 1: Describe the app** (5 min)
```
I want to build a simple user feedback dashboard.

Users should be able to:
- Submit feedback with a text field, category dropdown (Bug, Feature Request,
  Improvement, Other), and a 1-5 star rating
- See a confirmation after submission

I (as admin) should be able to:
- See all feedback in a table, sorted newest first
- Filter by category and rating
- See summary stats: total feedback, average rating, feedback by category

Tech: Use Next.js, Tailwind CSS, and store data in a JSON file
(no database needed for now). Deploy to Vercel.
```

**Step 2: Review and refine** (10 min)
Claude generates the full app. Review it:
- Does the form look right?
- Are the filters working?
- Is the dashboard readable?

Common refinements:
```
"Make the table responsive on mobile"
"Add a date column to the feedback table"
"Change the star rating to emoji faces"
"Add an export-to-CSV button"
```

**Step 3: Deploy** (5 min)
```
"Deploy this to Vercel so I can share the URL with my team"
```

### What You'll Learn
- How to describe a full app in plain English
- How frontend and backend work together
- How to iterate on AI-generated code
- How to deploy a working app

---

## Project 2: A/B Test Calculator (Intermediate)

### What You'll Build
A statistical significance calculator for A/B tests. Input your control and variant metrics, get a clear yes/no answer with confidence intervals and a visualization.

### Why This Is Useful for PMs
Every PM runs A/B tests. Few PMs can confidently interpret the results without asking a data analyst. This tool makes you self-sufficient.

### The Conversation Flow

**Step 1: Describe the tool** (5 min)
```
Build me an A/B test significance calculator.

Input fields:
- Control: visitors and conversions
- Variant: visitors and conversions
- Confidence level dropdown (90%, 95%, 99%)

Output:
- Is the result statistically significant? (Yes/No with clear color)
- Confidence interval for both control and variant
- Relative improvement percentage
- A bar chart comparing conversion rates
- Sample size recommendation if not yet significant

Use Next.js, Tailwind, and run the stats calculations client-side
(no backend needed). Make it look professional — I'll share this
with my team.
```

**Step 2: Test with real data** (15 min)
Use data from a recent A/B test you ran. Does the calculator give the same answer as your data team's analysis?

Common refinements:
```
"Add a Bayesian analysis option alongside frequentist"
"Include a 'days to significance' estimator"
"Add a shareable URL with parameters so I can send results to my team"
"Make the chart animate when results load"
```

**Step 3: Deploy and share** (5 min)

### What You'll Learn
- How to build tools with real statistical logic
- How client-side computation works (no server needed)
- How to make data visualizations
- How to create shareable, professional internal tools

---

## Project 3: Feature Flag Dashboard (Advanced)

### What You'll Build
An internal tool to manage feature flag rollouts. Create flags, set rollout percentages, assign to user segments, and view rollout status — all through a clean UI.

### Why This Is Useful for PMs
Instead of asking engineering to check feature flag status or waiting for them to change a rollout percentage, you have your own dashboard.

### The Conversation Flow

**Step 1: Describe the system** (10 min)
```
Build a feature flag management dashboard.

Features:
- Create feature flags with: name, description, owner, created date
- Set rollout status: Off, Internal Only, Beta (%), GA (100%)
- Percentage rollout slider (0-100%)
- User segment targeting: free, pro, enterprise
- Audit log: who changed what and when
- Dashboard view: all flags in a table with status badges
- Detail view: click a flag to see full config and history

Use Next.js, Tailwind, and a SQLite database for persistence.
Include proper error handling and form validation.
I want this to look like a real internal tool, not a toy.
```

**Step 2: Iterate on the UI** (30 min)
This is the most complex project. Expect 3–5 rounds of refinement:
```
"The table is too wide on mobile — make it scroll horizontally"
"Add a search bar to filter flags by name"
"The rollout slider should show the percentage as I drag"
"Add a 'Kill Switch' button that sets any flag to 0% instantly"
"Make the audit log entries show relative time ('2 hours ago')"
```

**Step 3: Add polish** (20 min)
```
"Add keyboard shortcuts: 'n' for new flag, '/' to focus search"
"Add a confirmation dialog before changing rollout percentage"
"Color-code the status badges: red=off, yellow=beta, green=GA"
"Add a bulk action to disable all flags (for incident response)"
```

**Step 4: Deploy** (5 min)

### What You'll Learn
- How to build apps with persistent data (databases)
- How to think about data modeling (flags, segments, audit logs)
- How internal tools are structured
- Why "simple CRUD app" actually has a lot of edge cases

---

## The Vibe Coding Workflow

No matter which project you're building, the workflow is the same:

| Phase | You Do | Claude Does | Time |
|-------|--------|-------------|------|
| **Describe** | Write plain English requirements | Ask clarifying questions | 5–10 min |
| **Generate** | Review the initial output | Write all the code | 2–5 min |
| **Refine** | Test, find issues, request changes | Fix bugs, add features | 20–60 min |
| **Polish** | Decide it's good enough | Final tweaks | 10–20 min |
| **Deploy** | Confirm deployment | Push to Vercel | 5 min |

> **Pro tip:** The "describe" phase is the most important. A clear description saves 5 rounds of refinement. A vague description causes 15 rounds.

---

## Best Practices

### ✅ Do

- **Describe behavior, not implementation.** Say "when I click submit, show a success message" not "create an onClick handler that sets state to true"
- **Test after every change.** Don't ask for 5 features at once. Add one, test it, then add the next
- **Use real data.** Test with actual feedback, real A/B test numbers, or real feature names. Toy data hides real bugs
- **Deploy early.** Deploy after the basic version works. Then iterate on the live version
- **Save your project prompts.** You'll want to build more tools. A library of good prompts speeds up future projects

### ❌ Don't

- **Don't try to understand every line of code.** You're a PM, not an engineer. Focus on what the app does, not how
- **Don't build for scale.** These are internal tools and prototypes. JSON files and SQLite are fine. You don't need Postgres
- **Don't spend hours on pixel-perfect design.** "Good enough to share" is the goal. Ship, get feedback, then polish
- **Don't try to build everything in one session.** The beginner project takes 1–2 hours. The advanced project takes 3–4. Take breaks
- **Don't be afraid to start over.** If a project gets tangled, it's faster to re-describe from scratch than to untangle 50 refinements

---

## Troubleshooting

**Problem: The app looks broken on my screen**
- *Cause:* CSS isn't responsive
- *Fix:* Tell Claude: "Make this fully responsive. Test at 375px (mobile), 768px (tablet), and 1280px (desktop) widths."

**Problem: Data disappears after refreshing**
- *Cause:* Data is stored in memory, not persisted
- *Fix:* Tell Claude: "Persist data to a JSON file (Project 1) or SQLite database (Project 3) so it survives page refresh."

**Problem: Vercel deployment fails**
- *Cause:* Build error or missing environment variable
- *Fix:* Ask Claude: "The Vercel build failed with this error: [paste error]. Fix it." Claude will diagnose and fix 90% of deployment issues.

**Problem: I don't know what to build next**
- *Cause:* Feature paralysis
- *Fix:* Think about the tool you wish existed at work. A metrics dashboard? A sprint retrospective tool? A customer feedback tracker? If you can describe it, you can build it.

**Problem: The code feels like a mess**
- *Cause:* Too many incremental changes without restructuring
- *Fix:* Tell Claude: "Refactor this project. Clean up the code, organize files logically, and remove any dead code." AI is great at cleanup.

---

## What's Next?

After completing these projects, you can:

- **Build tools for your team.** Prototype internal tools, dashboards, or calculators and share them
- **Prototype before PRDs.** Build a clickable prototype to test with users before writing a full spec
- **Contribute to open source.** Fix documentation, add small features, or improve PM-relevant tools
- **Combine all modules.** Generate a PRD (Module 1) → build the rollout plan (Module 2) → automate the tracking (Module 3) → prototype the feature (Module 4)

---

## Quick Reference: Prompting Cheat Sheet

| Want to... | Say this... |
|-----------|------------|
| Start a new project | "Build me a [description] using Next.js and Tailwind" |
| Fix a visual bug | "The [element] is overlapping the [element] on mobile. Fix the layout" |
| Add a feature | "Add a [feature]. It should [behavior]" |
| Improve design | "Make this look more professional. Use clean typography and proper spacing" |
| Handle errors | "Add error handling for: empty form submission, network failure, invalid data" |
| Deploy | "Deploy this to Vercel" |
| Start over | "Let's rebuild this from scratch. Here's what I want: [fresh description]" |
