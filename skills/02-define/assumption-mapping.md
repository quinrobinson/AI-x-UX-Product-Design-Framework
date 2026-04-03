---
name: assumption-mapping
phase: 02 — Define
description: Surface, categorize, and prioritize the team's implicit assumptions before committing to a design direction. Use in Define after research synthesis and before ideation — when you need to understand what you know vs. what you're betting on. Triggers when a team is about to commit to a problem frame, feature scope, or design direction without explicitly examining the beliefs underneath it. Depends on outputs from research-synthesis.md and problem-framing.md.
ai_leverage: high
claude_surface: chat
---

# Assumption Mapping

Make the invisible visible — surface what the team believes, separate what's validated from what's a bet, and prioritize what to test before committing to a direction.

## When to Use

- Before committing to a problem statement or design direction
- When the team is moving fast and skipping the "but what if we're wrong?" conversation
- When stakeholders are pushing to build before validating key beliefs
- After research — to identify which of your assumptions research confirmed, challenged, or left unresolved
- Before a design sprint, MVP scope decision, or major pivot

---

## Why This Matters

Every design decision is built on a stack of assumptions. Some are validated by research. Some are reasonable bets. Some are quietly held beliefs that no one has examined — and those are the ones that kill projects.

Assumption mapping makes the stack visible so the team can decide:
- What's safe to build on (validated)
- What needs a quick test before proceeding (critical, unvalidated)
- What's a known bet (important but low feasibility to test right now)
- What's irrelevant (safe to ignore)

---

## Four Categories of Assumptions

Every assumption belongs to one of four categories. Map them before scoring.

**Desirability** — Does the user actually want this? Do they have the problem we think they have? Will they value the solution we're building?

**Feasibility** — Can we build this? Do we have the technical capability, data, integrations, or infrastructure required?

**Viability** — Is this good for the business? Does it fit the revenue model, regulatory environment, competitive position?

**Usability** — Can users accomplish their goals with this design? Is it learnable, navigable, accessible in their context?

---

## What Claude Needs to Start

1. **Project context** — what you're designing, for whom, and why
2. **Problem frame** — the problem statement from `problem-framing.md`
3. **Research outputs** — what Discover confirmed and what it left open
4. **Any known constraints** — technical, business, regulatory

---

## Step 1: Generate the Full Assumption Set

Start broad. The goal is to surface everything the team is implicitly believing — especially the things that seem so obvious no one thinks to question them.

**Claude prompt:**
> "We're designing [product/feature] for [user] to solve [problem]. Based on this context, generate a comprehensive assumption audit across four categories: Desirability, Feasibility, Viability, and Usability.
>
> For each category, generate 5–8 assumptions. Focus especially on:
> - Assumptions that seem obvious (these are often the most dangerous)
> - Assumptions about user behavior that haven't been directly tested
> - Assumptions baked into the problem statement itself
> - Assumptions about what research confirmed that it may only have suggested
>
> Frame every assumption as a declarative statement ('Users want X', 'The team can build Y') not a question.
>
> Project context: [paste problem frame + research summary]"

---

### Supplement with Team Input

Claude surfaces assumption categories well but misses org-specific and political assumptions. After generating the initial list, add:

- **Things the team has debated but not resolved** — "We've assumed users will switch from their current tool. Have we tested switching cost?"
- **Stakeholder beliefs** — "Leadership assumes this will increase retention. On what evidence?"
- **Technical bets** — "Engineering assumes the API can handle this load. Has that been stress-tested?"
- **Historical assumptions** — "This decision was made 6 months ago when the context was different. Is it still valid?"

---

## Step 2: Score Each Assumption

Score on two axes to create the 2×2 map.

**Axis 1 — Importance** (if this assumption is wrong, how badly does it hurt?)
- **High** — if wrong, the product fails, the feature is worthless, or users won't engage
- **Low** — if wrong, it's inconvenient or requires iteration, but the core still works

**Axis 2 — Evidence** (how well-validated is this assumption?)
- **Known** — research, data, or prior experience directly confirms this
- **Unknown** — we believe it, but we haven't tested it

**Claude prompt:**
> "Score each assumption on two dimensions:
> - Importance: High (product fails if wrong) or Low (recoverable if wrong)
> - Evidence: Known (validated by research/data) or Unknown (believed but untested)
>
> Then place each in the 2×2 matrix:
> - High importance + Unknown = **Test First** (critical risk)
> - High importance + Known = **Build On** (validated foundation)
> - Low importance + Unknown = **Monitor** (watch but don't block)
> - Low importance + Known = **Deprioritize** (safe to ignore)
>
> Rank the Test First quadrant by urgency — which assumption, if wrong, would most derail the current direction?
>
> Assumptions: [paste full assumption list]"

---

### The 2×2 Matrix

```
                    UNKNOWN ←————————→ KNOWN
                         ┌──────────┬──────────┐
              HIGH       │          │          │
                         │   TEST   │  BUILD   │
           IMPORTANCE    │  FIRST   │   ON     │
                         │   ⚠️     │   ✓     │
                         ├──────────┼──────────┤
              LOW        │          │          │
                         │  MONITOR │  DE-     │
                         │   👀     │ PRIORITIZE│
                         │          │   —      │
                         └──────────┴──────────┘
```

---

## Step 3: Document the Assumption Map

```
# Assumption Map: [Project Name]
### Date: [DATE] | Phase: Define

---

## TEST FIRST — High Importance, Unknown ⚠️
*These are your riskiest bets. Validate before committing to a direction.*

| # | Assumption | Category | Why It's Critical | How to Test |
|---|---|---|---|---|
| 1 | [Assumption] | [Desirability/Feasibility/Viability/Usability] | [What breaks if wrong] | [Cheapest, fastest test] |
| 2 | [Assumption] | | | |
| 3 | [Assumption] | | | |

---

## BUILD ON — High Importance, Known ✓
*Validated by research or data. Safe to design against — but note the evidence source.*

| # | Assumption | Category | Evidence Source |
|---|---|---|---|
| 1 | [Assumption] | [Category] | [Session refs / data source] |
| 2 | [Assumption] | | |

---

## MONITOR — Low Importance, Unknown 👀
*Not critical right now, but worth tracking. Escalate to Test First if scope expands.*

| # | Assumption | Category | Trigger for Re-evaluation |
|---|---|---|---|
| 1 | [Assumption] | [Category] | [What would make this important] |

---

## DEPRIORITIZE — Low Importance, Known —
*Validated and low-stakes. Document and move on.*

| # | Assumption | Category |
|---|---|---|
| 1 | [Assumption] | [Category] |

---

## Riskiest Assumption (Top Priority to Test)
**Assumption:** [The single assumption whose failure would most derail the current direction]
**Category:** [Desirability / Feasibility / Viability / Usability]
**Why it's the riskiest:** [What breaks, how badly, how likely]
**Proposed test:** [Cheapest, fastest way to validate — prototype, survey, interview, data pull]
**Test owner:** [Who runs this]
**Timeline:** [When it needs to be answered before the team proceeds]
```

---

## Step 4: Design Tests for Critical Assumptions

For every assumption in the Test First quadrant, identify the cheapest, fastest validation method.

**Claude prompt:**
> "For each assumption in the Test First quadrant, design a validation approach. For each one:
> - State what you're testing (the assumption in a testable form)
> - Recommend the cheapest, fastest method: prototype test / user interview / survey / data pull / competitive proxy / expert review
> - Describe what 'validated' looks like — what evidence would confirm this assumption?
> - Describe what 'invalidated' looks like — what would tell you you're wrong?
> - Estimate time to run the test
>
> Test First assumptions: [paste]"

```
## Validation Plan

### Assumption: [Statement]

**Testable form:** [Rephrase as a falsifiable hypothesis: 'We believe X. We'll know we're right when Y.']
**Method:** [Prototype test / Interview / Survey / Data / Competitive proxy / Expert]
**Validated if:** [Specific evidence that confirms]
**Invalidated if:** [Specific evidence that refutes]
**Time to run:** [Hours / Days / Weeks]
**Who runs it:** [Role]
**When needed:** [Before [milestone] to avoid [risk]]
```

---

## Step 5: Connect Assumptions to Design Decisions

Assumptions don't exist in isolation — they're load-bearing. Map them to the design decisions they underpin.

**Claude prompt:**
> "Review the Test First assumptions and identify which specific design decisions each one supports. For each assumption, state: what design decision is built on this assumption, what we'd do differently if the assumption were wrong, and whether we should pause, pivot, or proceed with a hedge given current evidence.
>
> Test First assumptions: [paste]
> Current design direction: [paste problem frame]"

---

## Using Assumption Mapping with Stakeholders

Assumption maps are one of the most effective tools for managing stakeholder pressure to build before validating. When a stakeholder says "just ship it" — show them the Test First quadrant.

**Claude prompt for stakeholder framing:**
> "Reframe this assumption map as a risk briefing for a senior stakeholder who wants to move faster. For each Test First assumption, describe the business risk in terms of: wasted investment if wrong, customer impact, and competitive exposure. Then propose a validation sprint timeline that addresses the highest-risk assumptions in [N] days without blocking the broader team.
>
> Assumption map: [paste]
> Stakeholder context: [role, priorities, typical concerns]"

---

## Quality Checklist

Before proceeding to Ideate:
- [ ] Assumptions cover all four categories — Desirability, Feasibility, Viability, Usability
- [ ] The Test First quadrant has no more than 5–7 assumptions — if more, re-score
- [ ] Every Test First assumption has a proposed validation method
- [ ] The riskiest assumption is identified and has a test owner and timeline
- [ ] Build On assumptions have evidence sources documented — not just "we know this"
- [ ] Team has explicitly agreed which assumptions to validate before vs. during design
- [ ] Conflicting assumptions between team members have been surfaced and discussed

---

## Phase Handoff Block

Generate this block at the close of Assumption Mapping. Combine with Problem Framing handoff when opening Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Assumption Mapping
### Project: [PROJECT NAME]
### Date: [DATE]

---

### What we completed
- Total assumptions mapped: [N]
- Test First: [N] | Build On: [N] | Monitor: [N] | Deprioritize: [N]
- Validation tests designed: [N of N Test First assumptions]

### What the next phase needs to know
- Riskiest assumption: [Statement]
- Validation status: [Being tested / Blocked / Completed]
- Design decision this assumption supports: [What changes if it's wrong]

### Safe to build on (validated foundations)
1. [Assumption] — Evidence: [Source]
2. [Assumption] — Evidence: [Source]
3. [Assumption] — Evidence: [Source]

### Active risks (Test First — not yet validated)
1. [Assumption] — Risk: [What breaks] — Test: [Method + timeline]
2. [Assumption] — Risk: [What breaks] — Test: [Method + timeline]
3. [Assumption] — Risk: [What breaks] — Test: [Method + timeline]

### Design hedge instructions
[If any Test First assumptions can't be validated before Ideate, what should the design hedge against? E.g. "Design the onboarding flow to work with or without social login until we validate assumption #2"]

### Open questions for Ideate
- [What assumption mapping surfaced that needs design exploration to answer]
- [Assumptions that prototyping will help validate]

---
*Combine with Problem Framing handoff when opening Concept Generation.*
*Ideation concepts should be evaluated against the Test First assumptions — concepts that reduce assumption risk are preferable to those that increase it.*
```
