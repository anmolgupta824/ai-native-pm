# Lesson 4: Stakeholder Review

**Time:** ~15 minutes
**Goal:** Get simulated stakeholder feedback, address top concerns, strengthen your PRD.

---

## Section 1: Meet Your Review Board

The PRD Generator includes 9 simulated stakeholder reviewers. Each reviews your PRD through their professional lens.

| Reviewer | Role | Focus Areas |
|----------|------|-------------|
| `backend_eng` | Backend Engineer | APIs, database design, services, caching, scalability |
| `frontend_eng` | Frontend Engineer | UI states, state management, performance, browser compat |
| `designer` | Design Lead | UX flows, accessibility, visual consistency, user research |
| `qa` | QA Lead | Testability, acceptance criteria, edge cases, regression |
| `finance` | Finance Lead | ROI, cost modeling, revenue impact, unit economics |
| `legal` | Legal Counsel | Privacy, terms of service, liability, IP, data governance |
| `compliance` | Compliance Officer | Regulatory (GDPR/SOC2), audit readiness, access controls |
| `pm` | Senior PM | Strategy alignment, scope, prioritization, competitive |
| `marketing` | Marketing Lead | Positioning, messaging, launch comms, growth impact |

You don't need all 9 for every PRD. Pick the ones most relevant to your project.

**Ask the student:** Which 3-4 reviewers are most important for your PRD? (You can also use `all` to get feedback from everyone.)

> **Guidance:** A feature launch usually needs: backend_eng + designer + qa + pm. A redesign might need: designer + pm + marketing. An API integration needs: backend_eng + qa + compliance.

---

## Section 2: Run Review

**Exercise:** Run `review_prd` with your full PRD text and each selected perspective (or use `all`).

Each reviewer returns:
- **Strengths** — What the PRD does well from their perspective
- **Concerns** — Gaps or risks they've identified
- **Suggestions** — Specific questions or additions to improve the PRD
- **Overall Assessment** — Summary judgment

Review the feedback. Don't try to address everything — focus on the most important concerns.

---

## Section 3: Address Top Concerns

**Exercise:** Across all the reviews, identify the top 3 concerns — especially any concerns that multiple reviewers share.

For each concern:
1. Decide: Is this a real gap you should fix, or a concern you can acknowledge in "Risks"?
2. If it's a gap: add the missing content to your PRD
3. If it's a risk: add it to the "Risks & Mitigations" section with your mitigation plan

Common patterns:
- If both `backend_eng` and `qa` flag the same issue → it's a real technical gap
- If `finance` questions ROI but `pm` confirms strategy alignment → add ROI data to strengthen the case
- If `legal` or `compliance` flag something → always address it (these aren't optional)

**Auto-save** the updated draft to `output/prd-draft-lesson-5.md`.

---

## Section 4: Quick Check

1. **Why should you pick specific reviewers rather than always using "all"?**
   → Different PRDs need different perspectives. A backend API integration doesn't need a marketing review. Selecting relevant reviewers keeps the feedback focused and actionable.

2. **When two reviewers flag the same concern, what does that signal?**
   → It's a high-priority gap. Cross-functional agreement on a concern means it will definitely come up in a real stakeholder review — better to address it now.

**Transition:** *"Your PRD has been validated and reviewed. In the final lesson, we'll do a last validation pass, see how far your PRD has come, and export the finished document."*
