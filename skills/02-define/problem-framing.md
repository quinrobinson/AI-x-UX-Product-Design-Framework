---
name: problem-framing
phase: 02 — Define
description: Frame design problems clearly using HMW statements, JTBD, and user stories. Use this skill when transitioning from research to design, when the user needs to articulate a problem statement, define scope, create a design brief, or when they're struggling to focus a project direction. Also triggers for journey mapping, requirements definition, and prioritization frameworks like MoSCoW or Impact/Effort matrices.
ai_leverage: medium
---

# Problem Framing & Definition

Transform research insights into clear problem definitions that guide design decisions.

## When to Use

- Transitioning from discovery research into active design
- The problem feels fuzzy and needs sharper focus
- Stakeholders disagree on what to solve
- You need to scope what's in and out for a design sprint or project phase
- Creating a design brief to align the team

## Problem Statement Workshop

### Step 1: Gather Inputs

Before framing, confirm you have:
- Research insights or user pain points
- Business context (goals, constraints, KPIs)
- Target user/persona
- Current state (what exists today)

### Step 2: Generate Multiple Framings

Create the problem statement in three frameworks to test which resonates:

**How Might We (HMW)**
```
How might we [action/improvement] for [user] so that [desired outcome]?
```
- Good for: brainstorming, keeping the problem open-ended
- Watch out for: too broad ("HMW make everything better") or too narrow ("HMW add a button")

**Jobs to Be Done (JTBD)**
```
When [situation/trigger], I want to [motivation/action], so I can [expected outcome].
```
- Good for: grounding in real user behavior, connecting to business value
- Watch out for: confusing the job with the solution

**User Story**
```
As a [user type], I need [capability] because [reason/value].
```
- Good for: development handoff, backlog items
- Watch out for: losing the emotional/strategic context

### Step 3: Identify Assumptions

For each framing, explicitly list:
- **Assumptions we're making** — What do we believe is true but haven't proven?
- **Risks if we're wrong** — What happens if this assumption fails?
- **How to validate** — Cheapest/fastest way to test each assumption

### Step 4: Select and Refine

Choose the framing that best balances:
- Specificity (focused enough to act on)
- Openness (broad enough to allow creative solutions)
- Measurability (can we tell if we've solved it?)

## Journey Mapping

### Current-State Journey Map

```
# Journey Map: [Persona] — [Scenario]

## Persona: [Name, role, key context]
## Goal: [What they're trying to accomplish]
## Scenario: [Specific situation being mapped]

| Stage       | [Stage 1]   | [Stage 2]   | [Stage 3]   | [Stage 4]   |
|-------------|-------------|-------------|-------------|-------------|
| Actions     |             |             |             |             |
| Thoughts    |             |             |             |             |
| Emotions    | 😊 😐 😤     |             |             |             |
| Touchpoints |             |             |             |             |
| Pain Points |             |             |             |             |
| Opportunities|            |             |             |             |

## Critical Moments
1. [Moment of highest friction] — Why: [explanation]
2. [Moment of highest opportunity] — Why: [explanation]
3. [Moment of truth / decision point] — Why: [explanation]

## Gaps Between Current and Ideal
- [Gap 1]: Current [state] → Ideal [state]
- [Gap 2]: ...
```

### Mapping Tips
- Map what users *actually* do, not what they *should* do
- Include emotional ups and downs — these reveal where to focus
- Capture workarounds — they indicate unmet needs
- Don't skip the mundane stages — friction often hides there

## Requirements Prioritization

### MoSCoW Framework

Categorize each requirement:
- **Must have** — The product fails without this. Non-negotiable for launch.
- **Should have** — Important but the product works without it. Next priority after Musts.
- **Could have** — Nice to have. Only if time/budget allows.
- **Won't have (this time)** — Explicitly out of scope. Documented for future consideration.

### Impact vs Effort Matrix

For each requirement, score:
- **Impact** (1-5): How much does this improve the user experience or business metrics?
- **Effort** (1-5): Engineering time, design complexity, dependencies

Then categorize:
- **Quick wins** — High impact, low effort → Do first
- **Big bets** — High impact, high effort → Plan carefully
- **Fill-ins** — Low impact, low effort → Do if time allows
- **Money pits** — Low impact, high effort → Avoid

### Phased Roadmap

```
# Requirements Roadmap

## v1 (MVP / Launch)
Must-haves only. The minimum that solves the core problem.
- [Requirement] — Rationale: [why it's essential]

## v2 (Fast Follow)
Should-haves that significantly improve the experience.
- [Requirement] — Rationale: [what it unlocks]

## Future
Could-haves and larger bets for later.
- [Requirement] — Rationale: [long-term value]

## Explicitly Out of Scope
- [Requirement] — Why not now: [reasoning]
```

## Design Brief Template

```
# Design Brief: [Project Name]

## Problem Statement
[The refined problem statement from Step 2]

## Background & Context
[Why this problem matters now. Business context, market pressure, user feedback volume.]

## Target Users
- Primary: [Persona with key characteristics]
- Secondary: [If applicable]

## Success Metrics
- [Metric 1]: Current [X] → Target [Y]
- [Metric 2]: Current [X] → Target [Y]

## Constraints
- Technical: [Platform limitations, tech stack, integrations]
- Business: [Timeline, budget, regulatory]
- Design: [Brand guidelines, existing patterns, accessibility requirements]

## Scope
- In scope: [What we're solving]
- Out of scope: [What we're NOT solving, and why]

## Timeline
- [Phase]: [Date]

## Stakeholders
- Decision maker: [Name]
- Design: [Name]
- Engineering: [Name]
- Other: [Names]

## Open Questions
- [Questions that still need answers before or during design]
```

## Quality Checklist

- [ ] Problem statement is specific enough to guide design but open enough for creative solutions
- [ ] Assumptions are explicitly stated and validation methods identified
- [ ] Journey map is based on research data, not assumptions
- [ ] Requirements are prioritized with clear rationale, not just gut feel
- [ ] Design brief has measurable success criteria
- [ ] Scope boundaries are explicit — what's in AND what's out

---

## Phase Handoff Block

At the close of Problem Framing, generate this block and paste it as the **opening message** when starting Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Problem Framing
### Project: [PROJECT NAME]
### Date: [DATE]

---

### Carried Forward from Discover
[1–2 sentence summary of the key research finding that drove this problem statement]

### Primary User
- Who: [Persona name or segment]
- Context: [When/where/why they encounter this problem]
- Goal: [What they're ultimately trying to accomplish]

### Validated Problem Statement
> [The selected HMW / JTBD / user story — the single agreed framing]

### Why This Framing (not the alternatives)
[1 sentence rationale for the chosen framing over other options considered]

### Key Constraints for Ideation
- Technical: [Platform, stack, integrations to design within]
- Business: [Timeline, budget, non-negotiables]
- User: [Accessibility, device, literacy, trust requirements]
- Brand: [Tone, visual language, existing system constraints]

### User Journey Friction Points (top 3)
1. [Stage]: [What frustrates the user here]
2. [Stage]: [What frustrates the user here]
3. [Stage]: [What frustrates the user here]

### Success Criteria (how we'll know we solved it)
1. [Measurable outcome]
2. [Measurable outcome]

### Scope
- In scope: [What concepts should address]
- Out of scope: [What to not design for in this round]

### Provocation for Ideate
[1 sentence challenge or "what if" to push ideation beyond the obvious]

---
*Paste this block as your first message when opening the Concept Generation skill.*
*Claude will use it to generate concepts that are grounded in the validated problem.*
```
