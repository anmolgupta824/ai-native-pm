# Email Platform Recommendation

## Decision: Stay on Substack

### Why Substack

1. **Already wired up.** The website's email capture form (`EmailCapture.tsx`) redirects to `ainativepm.substack.com`. Zero migration needed.
2. **Free.** No monthly cost. Substack only takes a cut if you enable paid subscriptions (10%).
3. **Built-in discovery.** Substack's recommendation algorithm surfaces your newsletter to readers of similar content. This is free growth.
4. **Notes feature.** Acts as a micro-blog. Cross-post LinkedIn content for additional reach.
5. **Good enough analytics.** Open rates, click rates, subscriber growth. Sufficient for a solo creator.
6. **Paid option later.** If you want to gate premium content (e.g., advanced modules, templates), Substack supports paid tiers natively.

### Alternatives Considered

| Platform | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Beehiiv** | Better automation, segmentation, referral program | $49/mo for features you need, migration effort | Revisit at 1,000 subscribers |
| **ConvertKit** | Industry standard for creators, visual automations | $29/mo, overkill for current scale | Not worth the cost yet |
| **Mailchimp** | Free tier generous | Clunky UX, no discovery, brand mismatch | No |

### When to Migrate

Consider migrating to Beehiiv or ConvertKit when:
- Subscriber list exceeds **1,000**
- You need **automated welcome sequences** beyond Substack's basic drip
- You want **segmentation** (e.g., Module 0 users vs Module 1 users)
- You need **A/B testing** on subject lines

### Substack Setup Checklist

- [ ] Customize publication name: "The AI-Native PM"
- [ ] Add subtitle: "Practical AI workflows for Product Managers. Free modules, weekly tips."
- [ ] Upload profile photo (professional headshot)
- [ ] Write "About" section (reuse from website About page)
- [ ] Enable "Welcome email" with link to Module 0
- [ ] Post first Note (cross-post from LinkedIn Week 1 post)
- [ ] Set up Sections if needed later (e.g., "Weekly Tips", "Module Updates")

### Welcome Sequence on Substack

Substack's native automation is limited. The welcome sequence will be:
1. **Automatic welcome email** (Substack built-in) — customize with Module 0 link
2. **Manual drip** — publish the 5 welcome emails as a scheduled series for new subscribers
3. **Alternative:** Write the welcome sequence as a pinned series of posts that new subscribers see first

For true automated drip sequences, migration to Beehiiv/ConvertKit will be needed.
