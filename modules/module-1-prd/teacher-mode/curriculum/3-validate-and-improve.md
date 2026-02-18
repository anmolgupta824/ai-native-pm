# Lesson 3: Validate & Improve

**Time:** ~15 minutes
**Goal:** Score your PRD, fix the top gaps, add edge cases, reach Grade B+.

---

## Section 1: Run Validation

The MCP server has a built-in PRD validator that checks for 10 essential elements. Here's how scoring works:

| Grade | Score | Meaning |
|-------|-------|---------|
| A - Excellent | 90%+ | Ready for stakeholder review |
| B - Good | 80-89% | Solid foundation, minor gaps |
| C - Needs Work | 60-79% | Several important sections missing |
| D - Incomplete | Below 60% | Major sections missing, not ready to share |

**Exercise:** Run `validate_prd` with your full PRD text (or use `validate_prd_file` with the path to your latest draft).

> **Important:** Pass the actual PRD text to `validate_prd`, not a file path. If your PRD is saved as a file, use `validate_prd_file` instead — it reads the file for you.

Note your score and the list of missing elements. Don't worry if it's a C or D right now — that's expected at this stage.

---

## Section 2: Fix Top 3 Gaps

Look at the "missing" list from validation. The validator checks for:

| Element | What It Looks For |
|---------|-------------------|
| Problem statement | Words like "problem," "pain point," "challenge" |
| Success metrics | Words like "metric," "KPI," "measure" |
| User stories | Words like "as a," "user," "persona" |
| Requirements | Words like "must," "shall," "requirement" |
| Edge cases | Words like "edge case," "error," "failure" |
| Timeline | Words like "timeline," "deadline," "milestone" |
| Risks | Words like "risk," "mitigation," "contingency" |
| Stakeholders | Words like "stakeholder," "owner," "sign-off" |
| Rollout plan | Words like "rollout," "deploy," "launch plan" |
| Open questions | Words like "open question," "TBD" |

**Exercise:** Pick the top 3 missing elements from your validation results. For each one:
1. Claude provides a template/example for that section
2. Student writes content for their PRD
3. Add it to the appropriate section

---

## Section 3: Add Edge Cases

Edge cases are where good PRDs become great ones. They show engineering you've thought about what could go wrong.

**Exercise:** Run `suggest_edge_cases` with your template type and a brief description of your feature. Review the suggestions and:

1. Pick the 5 most relevant edge cases for your specific feature
2. For each one, write a brief response: how will your product handle it?
3. Add them to the "Edge Cases" section of your PRD

> **Teaching moment:** The best PRDs anticipate problems before engineering finds them. Every edge case you document now is a "gotcha" meeting you avoid later.

---

## Section 4: Re-Validate & Save

**Exercise:** Run `validate_prd` again with your updated PRD.

Compare your scores:
- Lesson 1 draft: probably Grade C or D
- Now: goal is Grade B+ or better

If you're still below B, look at the remaining missing elements and add brief content for each. Even a single sentence that mentions the right keywords will improve your score.

**Auto-save** the updated draft to `output/prd-draft-lesson-4.md`.

Tell the student: *"Your PRD went from a skeleton to a solid document. In Lesson 4, we'll get feedback from simulated stakeholder reviewers — engineering, design, finance, legal, and more."*
