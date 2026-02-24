# Lesson 1: CLAUDE.md — Your Project Brain

**Time:** 15 minutes | **Type:** Hands-on | **You'll build:** Your personal CLAUDE.md file

---

## What You'll Learn

- What CLAUDE.md is and why every PM session should start with one
- How to write a CLAUDE.md that makes Claude feel like a teammate who's been on your project for months
- How to test that it actually works

---

## Concept (3 min read)

### The Problem

Every time you start a new Claude Code session, Claude has amnesia. It doesn't know what product you work on, what your role is, what tools your team uses, or how you like documents formatted. So you waste the first 5 minutes of every session re-explaining everything. And if you forget something, Claude makes assumptions that lead to bad output.

### The Solution: CLAUDE.md

Create a file called `CLAUDE.md` in your project folder. Claude Code reads it automatically at the start of every session. Think of it as a briefing doc for a new team member — except this team member reads it in 2 seconds and never forgets.

### The 5 Sections

Every good CLAUDE.md has:

1. **Who I Am** — Your role, company, experience level
2. **My Product** — What you're building, users, key metrics
3. **My Tools** — Jira, Notion, Slack, Figma, etc.
4. **My Preferences** — How you like docs formatted, terminology, date formats
5. **Rules** — What Claude should NEVER do (this is the most important section)

That's it. Let's build yours.

---

## Exercise 1: Build Your CLAUDE.md (7 min)

### Step 1: Create your workspace folder

This folder is where you'll build everything throughout this course:

```bash
mkdir -p ~/pm-workspace
```

### Step 2: Answer these questions about YOUR actual job

**Who I Am:**
- What's your exact title?
- What kind of PM are you? (Sprint/feature, Strategy, Platform, etc.)
- How many years experience?

**My Product:**
- What's the product name?
- Who are the users?
- What's the key metric you care about most?
- What's the tech stack? (even roughly)

**My Tools:**
- Where do you track work? (Jira, Linear, Asana?)
- Where do you write docs? (Notion, Google Docs, Confluence?)
- How does your team communicate? (Slack, Teams?)

**My Preferences:**
- Bullet points or paragraphs?
- How do you format dates?
- Any team-specific terminology?

**Rules — What should Claude NEVER do?**
- Never write code unless you explicitly ask
- Always ask clarifying questions before writing a PRD
- Never make up metrics or data

### Step 3: Create the file

Create `CLAUDE.md` in your workspace using this template — fill in YOUR answers:

```markdown
# CLAUDE.md

## Who I Am
- [Your title] at [Company]
- [Type of PM] — focused on [your area]
- [X] years in product

## My Product
- **Product:** [Name]
- **Users:** [Who uses it]
- **Key metric:** [The #1 metric you track]
- **Tech stack:** [Rough overview]
- **Current focus:** [What you're working on this quarter]

## My Tools
- **Project tracking:** [Jira/Linear/etc.]
- **Documentation:** [Notion/Confluence/etc.]
- **Communication:** [Slack/Teams/etc.]
- **Design:** [Figma/etc.]

## My Preferences
- Write in bullet points, not paragraphs
- Use [your date format] for dates
- Keep documents under [X] pages
- [Any team-specific terminology]

## Rules
- NEVER write code unless I explicitly ask
- ALWAYS ask clarifying questions before starting a document
- NEVER make up metrics, data, or user quotes
- NEVER use jargon the reader wouldn't understand
- [Add your own rules]
```

Save this as `CLAUDE.md` in your current directory.

---

## Exercise 2: Test It (5 min)

### Step 1: Ask Claude about your product

Try these prompts:

1. "What product am I working on?"
2. "Draft a one-paragraph stakeholder update about my product"
3. "What tools does my team use?"

**What to look for:** Claude should answer using details from your CLAUDE.md without you explaining anything.

### Step 2: Test the Rules

Try to make Claude break a rule:

- If your rule says "never write code," ask "build a quick script for X"
- If your rule says "always ask questions first," ask "write a PRD for a new feature"

Claude should follow your rules. If it doesn't, make your Rules section more specific.

---

## Quick Reference

```
File location:     Project root (CLAUDE.md in your working directory)
When it's read:    Automatically at session start
Sections:          Who I Am, My Product, My Tools, My Preferences, Rules
Most important:    Rules — prevents Claude from doing things you'll undo
Pro tip:           Keep it under 100 lines. Be specific, not verbose.
```

---

## Checkpoint

- [ ] Workspace folder created
- [ ] `CLAUDE.md` with all 5 sections filled with YOUR real info
- [ ] Tested — Claude knows your context from CLAUDE.md
- [ ] Tested Rules — Claude respects your boundaries

**Next:** Lesson 2 — Context Management
