---
name: problem-framing
phase: 02 — Define
description: Transform research outputs into a focused, pressure-tested problem frame — including problem statement, HMW questions, and a design brief. Use when transitioning from Discover to Ideate, when the problem feels fuzzy, when stakeholders disagree on what to solve, or when you need to validate you're solving the right problem before committing to a design direction. Depends on outputs from Discover phase skills. Final output feeds directly into Ideate.
ai_leverage: high
claude_surface: chat
---

# Problem Framing

Turn research findings into a sharp, pressure-tested problem definition — and a prioritized set of HMW questions ready to seed ideation.

## When to Use

- You have research outputs and need to define what to design
- The problem feels too broad, too vague, or too solution-specific
- Stakeholders disagree on what the team should solve
- You need to validate your problem frame before committing to ideation
- You need to brief Claude on the design problem for an Ideate session

---

## What Claude Needs to Start

Before framing, Claude needs three inputs. If any are missing, ask:

1. **What did Discover reveal?** — paste the Research Synthesis handoff block, or summarize the top 3 themes and critical pain points
2. **Who is the primary user?** — persona name, role, context, goal
3. **What does the business need?** — the outcome or metric this design work is meant to move

With these three inputs, Claude can generate, pressure-test, and refine a problem frame in a single session.

---

## Step 1: Generate Multiple Problem Framings

Never commit to the first framing. Generate the problem statement in three formats, then compare — each reveals different assumptions and invites different solutions.

**Claude prompt:**
> "Using the research context below, generate the problem statement in three formats: HMW, JTBD, and User + Need + Insight. Then evaluate each: which is most specific? Which opens the most creative space? Which is most grounded in the research? Recommend one and explain why.
>
> Research context: [paste Discover handoff block or summary]"

---

### Format 1 — How Might We (HMW)
```
How might we [action] for [user] so that [outcome]?
```
Best for: ideation briefs, design sprints, team brainstorming
Watch out for: too broad ("HMW improve the experience") or solution-embedded ("HMW add a filter")

**Calibration test:** Can you think of 10 meaningfully different solutions to it?
- If yes → well-calibrated
- If no, solutions all look the same → too narrow
- If no solutions come to mind → too abstract

---

### Format 2 — Jobs to Be Done (JTBD)
```
When [situation/trigger], I want to [motivation], so I can [outcome].
```
Best for: grounding in real user behavior, connecting to business metrics
Watch out for: confusing the job with the solution, describing a feature instead of an outcome

**Calibration test:** Does the "so I can" describe user progress, not product usage?
- Good: "so I can make a confident decision"
- Bad: "so I can use the dashboard"

---

### Format 3 — User + Need + Insight
```
[User] needs a way to [verb/need] because [surprising insight].
```
Best for: stakeholder communication, POV statements, research-grounded briefs
Watch out for: insight that's obvious ("because it's hard") rather than revealing ("because they don't trust their own judgment")

**Calibration test:** Does the insight challenge an assumption your team held before the research?

---

## Step 2: Pressure-Test the Chosen Framing

A problem statement that feels good in the room often breaks under scrutiny. Run these tests before moving forward.

**Claude prompt:**
> "Act as a skeptical PM reviewing this problem statement: [statement]. Challenge it on four fronts:
> 1. Is this the right level of specificity — not too broad, not too narrow?
> 2. What assumptions are baked into this framing that we haven't validated?
> 3. What important problems does this framing exclude that we might regret ignoring?
> 4. Generate two alternative framings that would produce completely different solutions.
>
> Then recommend whether to proceed with the original, refine it, or reframe entirely."

---

### Common failure modes to check

**Too broad:** "HMW improve the research experience" — any solution qualifies, no creative constraint
**Too narrow:** "HMW make the export button more visible" — solution already embedded
**Solution-smuggling:** "HMW use AI to synthesize notes" — technology in the frame, not the problem
**Scope creep risk:** "HMW help designers throughout the entire design process" — too many problems at once
**Wrong user:** Framed around the business goal rather than the user need
**Unvalidated assumption:** Assumes users want X when research showed they want Y

---

## Step 3: Generate and Prioritize HMW Questions

Once the primary framing is locked, generate a set of HMW questions across different angles. These become the direct inputs to ideation.

**Claude prompt:**
> "From this problem statement: [statement], generate 10 HMW questions across five angles:
> 1. Root cause — address why the problem exists
> 2. Emotional dimension — address how users feel during the problem
> 3. Constraint reframe — use the constraint as an asset
> 4. Systemic angle — address an organizational or process root cause
> 5. Ambitious — what if we eliminated the problem entirely?
>
> Then score each against: user impact (1–3), design leverage (1–3), feasibility signal (1–3).
> Rank the top 5 and explain why they're the right starting points for ideation."

---

### HMW quality rules

- **Starts with "How might we"** — not "How do we" (implies we know the answer)
- **Contains an action verb** — not a noun or adjective
- **Names a user or context** — not abstract
- **Points toward an outcome** — not a feature
- **Generates multiple possible solutions** — if there's only one obvious answer, reframe

---

## Step 4: Document the Problem Frame

Package the output for stakeholder alignment and as the opening context for Ideate.

```
# Problem Frame: [Project Name]
### Date: [DATE] | Phase: Define

---

## Primary Problem Statement
[The selected HMW / JTBD / User + Need + Insight — one sentence]

## Why This Framing
[1–2 sentences: what research finding drove this framing, what alternatives were considered]

## Primary User
- Who: [Persona name or segment]
- Context: [When/where/why they encounter this problem]
- Goal: [What they're ultimately trying to accomplish]
- Key insight: [The surprising thing research revealed about them]

## Validated Assumptions
[What the research confirmed we believed correctly]

## Challenged Assumptions
[What the research overturned — what we thought was true but isn't]

## Open Assumptions (still unvalidated)
[What we still believe but haven't confirmed — highest risk]

## Top 5 HMW Questions (ranked)
1. HMW [statement] — Score: [X/9]
2. HMW [statement] — Score: [X/9]
3. HMW [statement] — Score: [X/9]
4. HMW [statement] — Score: [X/9]
5. HMW [statement] — Score: [X/9]

## Scope
- In scope: [What the design solution should address]
- Out of scope: [What we're explicitly not solving — and why]

## Success Criteria
- [Measurable outcome 1 — how we'll know we've solved it]
- [Measurable outcome 2]

## Constraints
- Technical: [Platform, stack, integrations]
- Business: [Timeline, budget, non-negotiables]
- User: [Accessibility, device, literacy, context]
```

---

## Using Claude to Align Stakeholders

Problem frames often fail not because they're wrong, but because they're not communicated for the right audience. Use Claude to package the same frame differently.

**Claude prompt:**
> "Rewrite this problem frame for three audiences:
> 1. Engineering lead — focus on technical feasibility and scope boundaries
> 2. Executive stakeholder — focus on business impact and risk of inaction
> 3. Design team — focus on user insight and creative space for ideation
>
> Problem frame: [paste document above]
> Keep each version under 150 words."

---

## Quality Checklist

Before passing to Ideate, verify:
- [ ] Problem statement passes the calibration test — 10 different solutions are imaginable
- [ ] Framing is grounded in research data, not team assumptions
- [ ] Assumptions are explicitly listed — validated, challenged, and open
- [ ] At least two alternative framings were considered and rejected with rationale
- [ ] Top 5 HMW questions are scored and ranked, not just listed
- [ ] Scope boundaries are explicit — what's in AND what's out
- [ ] Success criteria are measurable, not descriptive ("reduces time by 30%" not "feels faster")
- [ ] Constraints are specific to this project — not generic

---

## Phase Handoff Block

Generate this block at the close of Problem Framing. Paste it as the opening message when starting Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Problem Framing
### Project: [PROJECT NAME]
### Date: [DATE]

---

### What we completed
- Problem statement: [finalized / still debated]
- Alternative framings considered: [N]
- HMW questions generated: [N total, top 5 selected]
- Stakeholder alignment: [complete / pending]

### What the next phase needs to know
- Primary research finding that drove this frame: [one sentence]
- Primary user: [persona + goal]
- Core tension: [the central conflict or unmet need]

### Primary Problem Statement
> [The selected HMW / JTBD / User + Need + Insight]

### Why this framing (not the alternatives)
[1 sentence rationale]

### Top 5 HMW Questions (ranked)
1. HMW [statement]
2. HMW [statement]
3. HMW [statement]
4. HMW [statement]
5. HMW [statement]

### Key constraints for ideation
- Technical: [specific constraints]
- Business: [timeline, budget, non-negotiables]
- User: [accessibility, device, context]

### Validated assumptions (safe to build on)
- [Assumption confirmed by research]

### Open assumptions (test these in prototyping)
- [Assumption not yet validated — highest risk]

### Scope
- In: [what to solve]
- Out: [explicitly excluded — with rationale]

### Success criteria
1. [Measurable outcome]
2. [Measurable outcome]

### Provocation for Ideate
[One "what if" that pushes ideation beyond the obvious first solution]

---
*Paste this block as your first message when opening Concept Generation.*
*Claude will use it to generate concepts grounded in the validated problem frame.*
```
