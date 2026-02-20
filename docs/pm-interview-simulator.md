# PM Interview Simulator — Product Idea

**Status:** Parked (thinking)
**Last updated:** Feb 21, 2026
**Where it lives:** `theainativepm.com/interview`

---

## Concept
AI-powered PM interview simulator. Users pick a company, round type, and duration. An AI interviewer conducts a realistic mock interview with follow-ups, pacing, and a scorecard at the end.

## Question Bank
- Google Sheet: https://docs.google.com/spreadsheets/d/1rz10oEeLx-eGnilahKczYPhGfCUzIEKL-xRnjoQ-SX4/edit?gid=1024620532#gid=1024620532

## User Flow

### Step 1: Setup (30 seconds)
- Pick company: Google, Meta, Stripe, Amazon, Careem, or custom
- Pick round: Product Sense, Execution, Strategy, Technical/API, RCA, Behavioral, AI/ML Product
- Pick duration: 15 / 30 / 45 min
- Pick level: PM, Senior PM, Group PM, Director

### Step 2: Interview (timed)
- AI interviewer introduces itself and the scenario
- Asks questions one at a time, waits for response
- Follow-ups based on answers (like a real interviewer)
- Timer visible at top with pacing guidance
- Hints available (optional, with penalty to score)

### Step 3: Scorecard
- Framework usage (did you structure your answer?)
- Depth vs breadth
- Metrics/success criteria quality
- Edge cases considered
- Communication clarity
- Overall: Strong Hire / Hire / Lean Hire / No Hire
- Specific improvement suggestions with examples

## Technical Plan

### Phase 1 — MVP (buildable in a session)
- Text-based chat interview on Next.js page
- Company + round + duration picker
- Claude API on backend for AI interviewer
- Timer with pacing alerts
- Scorecard generation at the end
- Free, no signup

### Phase 2 — If it gets traction
- Audio mode (browser Speech APIs)
- Video mock with AI avatar
- Screen share / whiteboard simulation
- Saved history, progress tracking
- Paid tier ($9/month for unlimited)

## Tech Stack
- Next.js page at `/interview` (inside existing website)
- Claude API (API route in Next.js)
- No new infrastructure needed
- Question bank from Google Sheet (import or API)

## Why This Idea Is Good
- Massive pain point — PMs pay $100-200/hr for mock interviews
- No good free alternative exists
- Perfect for brand — Anmol is senior PM at Careem/ex-Visa
- Viral potential — PMs share interview prep resources obsessively
- Can become a paid product later

## LinkedIn Story Angle
"I built a PM interview simulator in 2 hours with zero coding. Here's how."
→ Demonstrates vibe coding + provides real value
