# The AI-Native PM

**Build AI-powered PM workflows in 30 minutes.**

A practical upskilling program that teaches Product Managers to use Claude Code through hands-on modules they can use immediately on their projects.

## Modules

### Free
- **Module 0: Claude Code Basics** - Get comfortable with Claude Code
- **Module 1: PRD Generator** - Generate production-ready PRDs in 30 minutes
- **Module 2: AI Image Generation** - Create product mockups, presentations, and social assets
- **Module 3: MCP Integrations Course** - Automate Google Workspace workflows

## Quick Start

1. Pick a module from above
2. Follow the QUICKSTART.md in that module's folder
3. Be productive with AI in 30 minutes

## Project Structure

```
pm-ai-brand/
├── website/          # Next.js 14 + Tailwind site → theainativepm.com
├── modules/
│   ├── module-0-claude-basics/
│   ├── module-1-prd/
│   ├── module-2-image-gen/
│   └── module-3-mcp-course/
├── marketing/        # Brand voice, LinkedIn, email content
├── docs/             # Build log and dev notes
├── PROGRESS.md       # Project progress tracker
└── .tracker-state.json
```

## Tech Stack

- **Website:** Next.js 14, Tailwind CSS
- **Modules:** TypeScript MCP servers
- **Hosting:** Vercel → [theainativepm.com](https://theainativepm.com)
- **Newsletter:** Substack

## Git & Deployment

### Repos

| Repo | Visibility | What's in it |
|---|---|---|
| `pm-ai-brand-project` | **Private** | Everything — website, all modules, marketing, docs. Primary working repo. |
| `ai-native-pm` | **Public** | Modules (0-3) + README + LICENSE only. Uses orphan `public` branch. |

### Remotes

```
origin  → pm-ai-brand-project (private)   ← default push target
public  → ai-native-pm (public)           ← free modules only
```

### Day-to-Day Workflow

```bash
# All changes → push to private repo (everything lives here)
git add -A && git commit -m "your message"
git push                          # → private repo (version control only, no auto-deploy)

# When modules change → sync to public repo
git checkout public               # switch to orphan public branch
git checkout main -- modules/     # pull latest modules from main
git add -A && git commit -m "Sync modules"
git push public public:main       # → public repo (replaces its main)
git checkout main                 # back to working branch
```

### What goes where

| Change type | `git push` (private) | `git push public public:main` |
|---|---|---|
| Website code | ✅ (deploy separately via `npx vercel --prod`) | ❌ Not included |
| Modules (0-3) | ✅ | ✅ |
| Marketing, docs, progress | ✅ | ❌ Not included |

### Public branch (`public`)
The public repo uses a separate orphan branch called `public` that contains **only** modules, README, and LICENSE. No website, marketing, or internal files are exposed.

### Vercel Deployment

| Domain | Environment | Command |
|--------|-------------|---------|
| `theainativepm.com` | **Production** | `npx vercel --prod` |
| Unique preview URL | **Staging/Preview** | `npx vercel` |

```bash
# Deploy to production (theainativepm.com)
cd website
npx vercel --prod

# Deploy to staging (generates a unique preview URL like xxx.vercel.app)
cd website
npx vercel

# Typical workflow:
# 1. Make changes
# 2. Test locally:  npm run dev
# 3. Deploy to staging:  npx vercel        → check preview URL
# 4. If looks good:  npx vercel --prod     → live on theainativepm.com
```

**Notes:**
- Vercel CLI must be installed: `npm i -g vercel`
- Root directory is set to `website/` in Vercel project settings
- `git push` is for version control only — it does NOT auto-deploy
- `ai-native-pm.vercel.app` also points to production (can't be changed on Hobby plan)

## License

MIT
