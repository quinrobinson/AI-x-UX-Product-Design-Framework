---
name: requirements-prioritization
phase: 02 — Define
description: Systematically prioritize design requirements and opportunities using structured frameworks — MoSCoW, RICE, Impact/Effort, and Kano. Use at the end of Define when moving from problem definition to scope decisions, or when stakeholders need to align on what gets built and in what order. Triggers when a team has more requirements than capacity, when stakeholders disagree on priorities, or when an MVP scope needs to be defined. Depends on outputs from problem-framing.md and assumption-mapping.md.
ai_leverage: high
claude_surface: chat
---

# Requirements Prioritization

Turn a long list of things to build into a defensible, stakeholder-aligned sequence — with rationale that holds up under pressure.

## When to Use

- You have more requirements, features, or opportunities than you can build
- Stakeholders disagree on what's most important
- You need to define an MVP scope and defend it
- You're transitioning from problem definition to a phased delivery plan
- A design sprint or cycle needs a focused scope — not everything at once

---

## Choose the Right Framework First

Different prioritization frameworks produce different decisions. Choose based on your situation — and consider combining them for the most defensible output.

| Framework | Best For | Time Required | Output |
|---|---|---|---|
| **MoSCoW** | Fixed deadlines, MVP scoping, quick alignment | 1–2 hours | Must / Should / Could / Won't |
| **RICE** | Data-driven cultures, large backlogs, cross-team alignment | 2–4 hours | Ranked score per item |
| **Impact/Effort** | Quick visual alignment, early-stage scoping | 1–2 hours | 2×2 quadrant map |
| **Kano** | Competitive differentiation, feature investment decisions | 1–2 weeks (survey) | Basic / Performance / Excitement |
| **Weighted Scoring** | Complex decisions with multiple competing criteria | 2–4 hours | Custom ranked list |

**NNg recommendation:** Use Kano during research to understand need types → RICE to score → MoSCoW to finalize scope. For most projects, **Impact/Effort + MoSCoW** is the fastest path to a defensible MVP.

---

## What Claude Needs to Start

1. **Requirements list** — the full set of features, opportunities, or user stories to prioritize
2. **Business context** — goals, success metrics, timeline, and budget constraints
3. **Research context** — which requirements are grounded in user research vs. stakeholder requests
4. **Framework choice** — which method(s) to apply (Claude can recommend if unsure)
5. **Constraints** — what's technically feasible, what's non-negotiable

**Claude prompt to generate a requirements list from research:**
> "Based on this research synthesis and problem frame, generate a complete requirements list. For each requirement, include: a user story format ('As a [user], I need [capability] so that [outcome]'), the research evidence that supports it, and which persona it primarily serves.
>
> Research context: [paste research synthesis + problem frame]"

---

## Framework 1 — MoSCoW

The fastest path to MVP scoping. Best when you have a deadline and need to cut scope decisively.

**The four categories:**
- **Must have** — the product fails without this. Non-negotiable for launch.
- **Should have** — important, but the product works without it. First priority after Musts.
- **Could have** — nice to have. Only if time and budget allow.
- **Won't have (this time)** — explicitly out of scope. Document why — this prevents scope creep.

**Claude prompt:**
> "Apply MoSCoW prioritization to these requirements. For each, assign a category and provide a one-sentence rationale grounded in user research or business need. Then:
> 1. Check that Must Haves alone represent a coherent, usable product — not a feature stub
> 2. Flag any Must Haves that are actually preferences in disguise (common failure mode)
> 3. List everything in Won't Have This Time with explicit rationale — this becomes the scope boundary
>
> Requirements: [paste list]
> Business context: [timeline, launch goal, constraints]
> Research context: [what users said they need vs. want]"

```
## MoSCoW Prioritization: [Project Name]
### Date: [DATE]

---

## Must Have — MVP fails without these
| Requirement | Rationale | Research support |
|---|---|---|
| [Requirement] | [Why non-negotiable] | [Session ref or data] |

## Should Have — Important, not critical for launch
| Requirement | Rationale | Target release |
|---|---|---|
| [Requirement] | [Why important] | [v1.1 / Phase 2 / etc.] |

## Could Have — Nice to have if time allows
| Requirement | Rationale | Condition to include |
|---|---|---|
| [Requirement] | [What it adds] | [Only if X is complete by Y] |

## Won't Have This Time — Explicitly out of scope
| Requirement | Why not now | When to revisit |
|---|---|---|
| [Requirement] | [Rationale — not just "deprioritized"] | [Trigger for re-evaluation] |

---

**Must Have count:** [N]
**Coherence check:** [Does Must Have alone produce a product users can accomplish their primary goal with? Yes / No — explain if No]
```

---

## Framework 2 — RICE Scoring

Best when you need a defensible ranked list and have enough data to estimate reach and confidence.

**The four components:**
- **Reach** — how many users are affected per period (e.g. per month)? Use actual data where possible.
- **Impact** — how much does this move the needle for each user? Scale: 3 = massive, 2 = significant, 1 = low, 0.5 = minimal
- **Confidence** — how confident are you in the Reach and Impact estimates? 100% = high evidence, 80% = moderate, 50% = low, 20% = gut feel
- **Effort** — how many person-months to build? Include design, engineering, QA.

**Formula:** `(Reach × Impact × Confidence) ÷ Effort = RICE Score`

**Claude prompt:**
> "Apply RICE scoring to these requirements. For each, estimate Reach (users/month), Impact (0.5–3), Confidence (20–100%), and Effort (person-months). Show your reasoning for each estimate — especially where you're extrapolating from limited data. Flag any estimates with low confidence so the team can validate them before finalizing.
>
> Then rank by RICE score and identify: the top 3 highest-scoring items, any items where high impact is undermined by low confidence (validate these first), and any quick wins (high score, low effort).
>
> Requirements: [paste list]
> Known data: [any analytics, user volume, or benchmark data you have]"

```
## RICE Scoring: [Project Name]
### Date: [DATE]

| Requirement | Reach | Impact | Confidence | Effort | RICE Score | Confidence flag |
|---|---|---|---|---|---|---|
| [Requirement] | [N/mo] | [0.5–3] | [%] | [person-mo] | [(R×I×C)÷E] | [High / Low] |

---

**Top 3 by RICE score:**
1. [Requirement] — Score: [X] — Why: [rationale]
2. [Requirement] — Score: [X] — Why: [rationale]
3. [Requirement] — Score: [X] — Why: [rationale]

**Low confidence flags (validate before committing):**
- [Requirement] — Confidence: [%] — What to validate: [specific question]

**Quick wins (high score, ≤1 person-month):**
- [Requirement] — Score: [X] — Effort: [X person-days]
```

---

## Framework 3 — Impact/Effort Matrix

The fastest visual alignment tool. Run this in 60–90 minutes with a cross-functional team.

**The four quadrants:**
- **Quick wins** — High impact, low effort → Do first
- **Big bets** — High impact, high effort → Plan carefully, build conviction before committing
- **Fill-ins** — Low impact, low effort → Do if time allows, never instead of quick wins or big bets
- **Money pits** — Low impact, high effort → Avoid, document why

**Scoring guidance:**
- **Impact (1–5):** Designers score user experience impact. Business stakeholders score business metric impact. Average or discuss discrepancies.
- **Effort (1–5):** Engineering scores technical effort. Design scores design complexity. Average or discuss discrepancies.

**Claude prompt:**
> "Apply Impact/Effort scoring to these requirements. Score each on Impact (1–5, user + business) and Effort (1–5, design + engineering). Place each in the 2×2 matrix. Then:
> 1. Rank Quick Wins by impact — which to do first?
> 2. Flag any Big Bets where impact is uncertain — these need validation before committing resources
> 3. List every Money Pit with explicit rationale — teams often argue to keep these
>
> Requirements: [paste list]
> Business context: [what metrics matter most]
> Technical context: [any known complexity constraints]"

---

## Framework 4 — Kano Model

Use when you need to understand *how* requirements affect user satisfaction — not just which are most important. Requires a survey to validate.

**The three categories:**
- **Basic (Must-be)** — expected features users don't mention until they're missing. Their absence causes dissatisfaction; their presence is neutral.
- **Performance (Linear)** — features where more is better. Directly correlated with satisfaction.
- **Excitement (Delighters)** — unexpected features users don't ask for but love. Their presence causes delight; their absence is neutral.

**When to use Kano:** When choosing between features that all score similarly on RICE or MoSCoW, Kano reveals which will differentiate the product.

**Claude prompt for Kano survey design:**
> "Design a Kano survey for these requirements. For each feature, generate:
> 1. A functional question: 'How would you feel if this feature existed?'
> 2. A dysfunctional question: 'How would you feel if this feature did NOT exist?'
>
> Use the standard 5-point scale: Delighted / Expect it / Neutral / Can tolerate / Dislike it.
>
> Then explain how to classify responses using the Kano evaluation table, and what each classification means for build priority.
>
> Requirements: [paste list]"

---

## Combining Frameworks — The Recommended Sequence

For most product design projects, this sequence produces the most defensible output:

**Step 1 — Impact/Effort** (1–2 hours)
Quick visual alignment. Removes obvious Money Pits and surfaces Quick Wins that don't need further analysis.

**Step 2 — MoSCoW** (1–2 hours)
Apply to the Quick Wins and Big Bets from Step 1. Defines MVP boundary. Creates explicit scope documentation.

**Step 3 — RICE** (2–4 hours, optional)
Apply to contested items where stakeholders disagree. Data-driven tiebreaker.

**Claude prompt for combined approach:**
> "We've completed Impact/Effort scoring. Now apply MoSCoW to the Quick Wins and Big Bets. For each Big Bet, recommend whether it's Must, Should, or Could — and what evidence or validation would move it from Should to Must.
>
> Quick Wins: [paste]
> Big Bets: [paste]
> Business context: [timeline, launch goal]"

---

## Generating the Phased Roadmap

Once priorities are set, package them into a release structure.

**Claude prompt:**
> "Based on this prioritized requirements list, generate a phased delivery plan. Structure it as:
> - v1 / MVP: Must Haves only — the minimum product that delivers the core user value
> - v1.1 / Fast Follow: Should Haves that significantly improve the experience — ideally within 4–6 weeks of v1
> - v2 / Future: Could Haves and Big Bets requiring more planning
> - Explicitly Out of Scope: Won't Haves with rationale
>
> For each phase, state: what user outcome it unlocks, what business metric it moves, and what must be true before this phase begins.
>
> Prioritized requirements: [paste MoSCoW output]
> Timeline constraint: [launch date or cycle length]"

```
## Phased Delivery Plan: [Project Name]
### Date: [DATE]

---

## v1 — MVP
**User outcome unlocked:** [What the primary persona can accomplish that they couldn't before]
**Business metric:** [What this moves and by how much]
**Gate condition:** [What must be true before launching v1]

| Requirement | Rationale |
|---|---|
| [Must Have] | [Why essential for v1] |

---

## v1.1 — Fast Follow (within [N] weeks)
**User outcome:** [What improves for existing users]
**Business metric:** [What this adds]

| Requirement | Rationale |
|---|---|
| [Should Have] | [Why important but not MVP] |

---

## v2 — Future
**Planned for:** [Timeframe or trigger]

| Requirement | Rationale | Dependency |
|---|---|---|
| [Could Have / Big Bet] | [Long-term value] | [What must exist first] |

---

## Explicitly Out of Scope
| Requirement | Why not | Trigger to revisit |
|---|---|---|
| [Won't Have] | [Rationale] | [Condition that changes this] |
```

---

## Presenting Priorities to Stakeholders

Prioritization decisions fail not because the logic is wrong but because the presentation doesn't land. Use Claude to package the output for the room.

**Claude prompt:**
> "Reframe this prioritized requirements plan as a stakeholder presentation. Structure it as:
> 1. The problem we're solving and for whom (one sentence)
> 2. What we're building in v1 and why (the user value it unlocks)
> 3. What we're explicitly not building in v1 and why (scope discipline)
> 4. The three biggest risks in the current plan and how we're managing them
> 5. What we need from this room today (decisions, approvals, or input)
>
> Prioritized plan: [paste]
> Audience: [role, priorities, known concerns]"

---

## Quality Checklist

Before passing to Ideate:
- [ ] Every Must Have has a research-grounded rationale — not just stakeholder preference
- [ ] Won't Haves are documented with explicit rationale — prevents scope creep re-entry
- [ ] MVP (Must Haves alone) produces a coherent, usable product — not a feature stub
- [ ] Big Bets with uncertain impact have validation plans before full commitment
- [ ] Framework choice is documented — stakeholders understand how decisions were made
- [ ] Phased roadmap has gate conditions — what must be true before the next phase begins
- [ ] Requirements that conflict with research findings are flagged and explained

---

## Phase Handoff Block

Generate this block at the close of Requirements Prioritization. Combine with Problem Framing handoff when opening Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Requirements Prioritization
### Project: [PROJECT NAME]
### Date: [DATE]

---

### What we completed
- Framework(s) used: [MoSCoW / RICE / Impact-Effort / Kano / Combined]
- Requirements evaluated: [N total]
- MVP scope defined: [N Must Haves]
- Stakeholder alignment: [Complete / Pending approval from X]

### MVP scope — Must Haves
1. [Requirement] — [one-line rationale]
2. [Requirement] — [one-line rationale]
3. [Requirement] — [one-line rationale]

### Fast Follow — Should Haves (post-launch)
1. [Requirement]
2. [Requirement]

### Explicitly out of scope
1. [Requirement] — [why not now]
2. [Requirement] — [why not now]

### Contested requirements (not yet resolved)
- [Requirement] — [what the disagreement is, who needs to decide]

### Design constraints from prioritization
- [Constraint implied by scope decisions — e.g. "Must work offline because X is Must Have"]

### What Ideate needs to design for
- Primary: [The Must Have requirements ideation should solve for]
- Secondary: [Should Haves to keep in mind without over-indexing]
- Hard constraints: [Anything Ideate must not violate]

---
*Combine with Problem Framing handoff when opening Concept Generation.*
*Ideation should generate concepts that address Must Haves completely before exploring Should Haves.*
```
