# Content Publishing Automation Plan

**Status:** Parked (revisit later)
**Last updated:** Feb 21, 2026

---

## Goal
Automate publishing from `marketing/` markdown files to Medium, Substack, and LinkedIn so you don't have to copy-paste manually.

---

## Platform Breakdown

### 1. Medium (Easiest -- start here)
- **API:** Deprecated but still works (archived March 2023, endpoints still live)
- **Auth:** Self-issued integration token from Medium Settings > Security > Integration tokens
- **Supports:** Markdown content, draft/public/unlisted, tags (up to 5)
- **Limitations:** Create-only (can't update or delete via API), could be shut down anytime
- **Setup time:** ~15 minutes
- **Endpoint:** `POST https://api.medium.com/v1/users/{userId}/posts`

### 2. Substack (Doable -- unofficial)
- **API:** No official API. Community library `python-substack` (ma2za) reverse-engineered it
- **Auth:** Browser cookie (`substack.sid`) -- stays valid for months
- **Supports:** Full publish workflow (create draft > prepublish > publish), rich content
- **Limitations:** Unofficial, could break if Substack changes internals
- **Setup time:** ~30 minutes
- **Library:** `pip install python-substack`

### 3. LinkedIn (Hardest -- official but complex)
- **API:** Official, actively maintained (Posts API / Community Management)
- **Auth:** OAuth 2.0 -- tokens expire every 60 days, requires LinkedIn Developer app
- **Supports:** Text posts, articles, images, videos, polls
- **Limitations:** Need to create Developer app, associate with Company Page, 150 posts/day limit
- **Setup time:** ~1-2 hours

---

## Implementation Plan (when ready)

### Phase 1: Medium Script
1. Get Medium integration token
2. Build `scripts/publish.js` (Node.js) that:
   - Reads a markdown file from `marketing/`
   - Strips frontmatter (title, tags, etc.)
   - POSTs to Medium API as draft
3. Usage: `node scripts/publish.js medium marketing/substack/post-01.md --draft`

### Phase 2: Add Substack
1. Extract `substack.sid` cookie from browser
2. Add Substack publishing to the same script (via HTTP requests or Python bridge)
3. Usage: `node scripts/publish.js substack marketing/substack/post-01.md --draft`

### Phase 3: LinkedIn (optional)
1. Create LinkedIn Developer app
2. Implement OAuth 2.0 flow with token refresh
3. Add LinkedIn text post publishing
4. Usage: `node scripts/publish.js linkedin marketing/linkedin/posts/day3.md --publish`

---

## Quick Reference

| Platform | Auth Token Location | API Docs |
|----------|-------------------|----------|
| Medium | Settings > Security > Integration tokens | [GitHub (archived)](https://github.com/Medium/medium-api-docs) |
| Substack | Browser DevTools > Application > Cookies > `substack.sid` | [python-substack](https://github.com/ma2za/python-substack) |
| LinkedIn | [Developer Portal](https://developer.linkedin.com/) | [Microsoft Learn](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin) |
