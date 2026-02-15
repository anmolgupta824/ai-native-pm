# Weekly Newsletter Format Template

**Cadence:** Every Thursday
**From:** Anmol Gupta / The AI-Native PM
**Platform:** Substack (ainativepm.substack.com)

---

## Subject Line Formula

**Pattern:** [Number] [Action Verb] [Benefit]

**Example subject lines:**
- 3 prompts that fix vague PRD requirements
- 4 ways to load context without copy-pasting
- 2 MCP shortcuts I use every sprint
- 5 edge cases Claude catches that I miss
- 3 rollout plan mistakes AI helped me avoid
- 1 workflow that replaced my Monday morning prep

**Preview text:** First 90 characters. Should complement the subject, not repeat it.

---

## Template Structure

```
Subject: [Number] [action verb] [benefit]
Preview: [90-char complement to subject line]
```

### Section 1: One Practical Tip (150-200 words)

The core of the newsletter. One specific, actionable technique the reader can use today. Follow the brand content formula:

1. **Hook** -- A specific, relatable problem (1-2 sentences)
2. **Technique** -- What to do, with enough detail to act on it (the bulk)
3. **Result** -- What changes when you do this

Include code snippets, exact prompts, or screenshots when relevant. Keep it concrete.

### Section 2: What I Shipped (2-3 sentences)

Brief update on what's new with The AI-Native PM. New module content, website updates, things I'm working on. This builds transparency and keeps subscribers aware of progress.

### Section 3: Link of the Week

One link worth reading. Can be an article, tool, tweet thread, or video. Always include a 1-sentence reason why it's worth their time. Prioritize practical content over hype.

### Section 4: CTA

One clear call to action. Rotate between:
- Try a specific module
- Reply with feedback or questions
- Share with a PM friend
- Check out a new feature

---

## Example Newsletter

**Subject:** 3 prompts that fix vague PRD requirements
**Preview text:** Stop writing "the system should handle edge cases" and start writing specs engineers respect.

---

Hey,

**One Practical Tip: Getting Specific Requirements from Vague Ideas**

We've all written PRD requirements like "the system should handle errors gracefully" and hoped no one would ask what that means. Here's how I use Claude Code to turn vague requirements into specific ones.

After writing your initial requirements list, use this follow-up prompt:

```
Review each requirement above. For any requirement that uses
words like "should," "gracefully," "appropriate," or "properly,"
replace it with a specific, testable behavior. Include the exact
error message, retry count, timeout duration, or fallback state.
```

Claude will rewrite your requirements with actual numbers and behaviors. "Handle errors gracefully" becomes "Display error code and retry message after 3 failed attempts, with a 30-second cooldown before allowing retry. Log the failure reason to the error dashboard."

The output isn't always perfect. Sometimes Claude picks arbitrary numbers (why 30 seconds?). But now you're debating specific numbers instead of staring at vague language. That's a better problem to have.

**What I Shipped**

Updated Module 1 with a new section on format control -- getting Claude to match your team's specific PRD template instead of its default structure. Also fixed a bug in the Module 0 quickstart guide where a file path was wrong.

**Link of the Week**

[Anthropic's prompt engineering guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) -- If you want to go deeper on prompting technique beyond what the modules cover, this is the best reference. Written by the people who built Claude.

**That's it for this week.** If you tried the requirements prompt, reply and tell me what happened. I read every response.

Anmol

---

**CTA Button:** Try the PRD Generator → https://ai-native-pm.vercel.app/modules

---

## Newsletter Checklist

Before sending each issue:

- [ ] Subject line follows the [Number] [Action] [Benefit] formula
- [ ] Preview text complements (doesn't repeat) the subject line
- [ ] Practical tip is specific and actionable (not generic advice)
- [ ] Tip includes a code snippet, prompt, or concrete example
- [ ] "What I Shipped" section is current and honest
- [ ] Link of the week is genuinely useful (not filler)
- [ ] CTA is clear and singular
- [ ] Total read time is under 3 minutes
- [ ] No words from the "avoid" list (revolutionary, game-changing, simple, easy, just)
- [ ] Proofread for tone: direct, practical, human
