---
name: persona-creation
phase: 02 — Define
description: Generate research-grounded personas that humanize user data and anchor design decisions. Use in Define to synthesize research into shared user archetypes before ideation. Triggers when a designer needs to create initial personas, refine proto-personas from research, align a team on who they're designing for, or brief Claude on user context for an Ideate session. Depends on outputs from research-synthesis.md. Outputs feed into problem-framing.md, journey-mapping.md, and Ideate.
ai_leverage: high
claude_surface: chat
---

# Persona Creation

Transform research into specific, believable user archetypes that make design decisions concrete and debates productive.

## When to Use

- You have research data and need to define who you're designing for
- The team is designing for "everyone" or using vague demographic labels
- Stakeholders keep debating user needs — a shared persona reference resolves this
- You need to brief Claude with user context before an Ideate or Prototype session
- You're refining proto-personas built before research with real data

---

## What Makes a Good Persona

Most personas fail because they're demographic profiles, not behavioral archetypes. A good persona answers design questions — a bad persona collects dust on a wall.

**Good persona:** Specific, behavioral, grounded in research, generates disagreement about design decisions
**Bad persona:** Generic, demographic, assembled from assumptions, everyone agrees with it immediately

The test: if your persona generates no design debates, it's not specific enough. A well-made persona makes some solutions obviously right and others obviously wrong.

---

## Types of Personas — Choose Before Building

| Type | When to Use | Build Time |
|---|---|---|
| **Research-grounded** | Post-research, primary method | 2–4 hours per persona |
| **Proto-persona** | Pre-research, assumption-based starting point | 30–60 minutes |
| **Jobs-based** | When outcomes matter more than demographics | 2–4 hours |
| **Spectrum persona** | When a range of users matters, not one archetype | Half day |

This skill file covers **research-grounded personas** — built from actual interview and observation data. For proto-personas, use the same structure but mark every field [assumed] until research validates it.

---

## What Claude Needs to Start

Before generating personas, Claude needs:

1. **Research synthesis outputs** — themes, pain points, behavioral patterns from `research-synthesis.md`
2. **Session summaries** — the more raw data Claude has, the more specific the persona
3. **Number of personas** — typically 2–4; more than 5 is usually too many to design for
4. **Primary design context** — what product or feature will these personas be used to design?

**Claude prompt to identify segments:**
> "Review these research findings and identify 2–4 meaningful user segments. For each segment, describe: the core behavioral difference that distinguishes them from the others, what goal or job drives their behavior, and which research sessions best represent them. Do not segment by demographics — segment by behavior, goal, or context.
>
> Research data: [paste research synthesis outputs]"

---

## Step 1: Identify Segments from Research

Segmentation comes before persona creation. Don't build personas and then decide how many — let the data reveal the natural groupings.

**Segmentation criteria (use these, not demographics):**

- **Goals** — what they're ultimately trying to accomplish
- **Behaviors** — how they actually work (workarounds, tools, habits)
- **Context** — where, when, and with whom they use the product
- **Attitude** — their relationship with the problem space (expert vs. novice, trusting vs. skeptical)
- **Pain severity** — how much the problem affects them (occasional friction vs. blocking their work)

**What not to segment by:** Age, gender, job title, company size — unless these directly produce meaningfully different behaviors in your research.

**Human review checkpoint:** Confirm segments before building personas. Changing segments later means rebuilding everything.

---

## Step 2: Generate the Persona

One persona per segment. Work through all sessions for that segment before generating.

**Claude prompt:**
> "Using the research sessions below, generate a detailed persona for the [segment name] segment. Ground every field in specific research data — cite session references where possible. Mark anything inferred rather than directly observed as [inferred]. Do not invent demographic details that weren't surfaced in research. The persona should be specific enough to make some design decisions obvious and others obviously wrong.
>
> Segment: [description]
> Research sessions for this segment: [paste relevant session summaries]
> Design context: [what product/feature this persona will be used to design]"

---

### Persona Template

```
# Persona: [Name]
### Segment: [Segment label] | Research basis: [N sessions] | Date: [DATE]

---

## Who They Are
**Name:** [First name — specific enough to feel real, not "User A"]
**Role:** [Job title or life context — specific to your research, not a generic title]
**Context:** [Where, when, and how they encounter the problem you're designing for]
**Experience level:** [Novice / Developing / Proficient / Expert — relative to this domain]

---

## Their Goal
**Primary goal:** [What they're ultimately trying to accomplish — the outcome, not the task]
**Secondary goals:** [Supporting things they're trying to achieve alongside the primary]
**Job to be done:** When [situation], I want to [motivation], so I can [outcome].

---

## Their Current Reality
**How they work today:** [Step-by-step description of their current process — based on research observation]
**Tools they use:** [Specific tools, workarounds, and systems — observed or reported]
**Workarounds they've invented:** [The things they do to compensate for what doesn't work — these reveal unmet needs]

---

## What Frustrates Them
**Top pain points (ranked by severity):**
1. [Pain point] — Severity: Critical / Major / Minor — Source: [Session ref]
2. [Pain point] — Severity: [level] — Source: [Session ref]
3. [Pain point] — Severity: [level] — Source: [Session ref]

**What they've tried that didn't work:** [Previous solutions they've attempted and why they failed]
**What they've given up on:** [Things they've stopped trying to do because it's not worth the effort]

---

## What They Need
**Unmet needs:** [What they need that doesn't exist or doesn't work well enough]
**Decision criteria:** [What they use to evaluate whether something is working]
**What "good" looks like to them:** [In their words — how they describe a successful outcome]

---

## How They Think
**Mental model:** [How they conceptualize the problem space — their terminology, analogies, frameworks]
**Attitudes:** [Their disposition toward technology, process, change — grounded in research]
**Trust signals:** [What makes them trust a tool, output, or process]
**Skepticism signals:** [What makes them doubt or disengage]

---

## Representative Quote
> "[Direct quote from research that captures their essential perspective]"
> — [Role, anonymized — e.g. "Senior Product Designer, 6 years experience"]

---

## Design Implications
**Design for this:** [What any solution for this persona must do]
**Never do this:** [What would immediately lose this persona's trust or engagement]
**Open questions:** [What we still don't know about this persona that matters for design]
```

---

## Step 3: Validate the Persona

A persona that everyone immediately agrees with is either brilliant or too vague. Use these tests before committing.

**Claude prompt:**
> "Review this persona and evaluate it against four criteria:
> 1. **Specificity** — Is every field specific enough to make design decisions? Flag any field that could apply to any user.
> 2. **Research grounding** — Is every claim traceable to research data? Flag anything that seems inferred without evidence.
> 3. **Design utility** — Does this persona generate meaningful design debates? Give an example of a design decision this persona would make obvious.
> 4. **Distinguishability** — Is this persona clearly different from the other personas? What's the core behavioral distinction?
>
> Persona: [paste]
> Other personas (if any): [paste]"

---

### The Five Persona Tests

Run these before finalizing:

**Test 1 — The design decision test**
Pick a feature your team is debating. Does this persona make the right answer obvious? If everyone still agrees, the persona isn't specific enough.

**Test 2 — The quote test**
Read the representative quote aloud. Does it sound like a specific person? Or a generic user type? A good quote makes a designer say "yes, I met this person."

**Test 3 — The workaround test**
Does the persona have at least one workaround? Workarounds are the clearest signal of unmet needs. No workarounds usually means the research wasn't deep enough or the persona is too generic.

**Test 4 — The "never do this" test**
Is the "Never do this" field specific? If it could apply to any user ("never make it confusing"), it's not useful. It should be specific to this user's context ("never show an empty state without a suggested next action — they'll assume the tool is broken").

**Test 5 — The disagreement test**
Show the persona to two team members and ask which design direction it supports. If they give identical answers, the persona isn't doing enough work.

---

## Step 4: Create a Persona Set Summary

When building multiple personas, generate a comparison that makes the distinctions legible.

**Claude prompt:**
> "Create a one-page persona set summary comparing these [N] personas. For each persona, provide: their one-sentence essence, their primary goal, their biggest pain, and the one design principle most important for them. Then identify: which personas have overlapping needs (design once, serve both), which have conflicting needs (must make a choice), and which is the primary persona for this project and why.
>
> Personas: [paste all persona documents]"

```
## Persona Set Summary

| | [Persona 1] | [Persona 2] | [Persona 3] |
|---|---|---|---|
| **Essence** | [One sentence] | [One sentence] | [One sentence] |
| **Primary goal** | [Goal] | [Goal] | [Goal] |
| **Biggest pain** | [Pain] | [Pain] | [Pain] |
| **Design principle** | [Principle] | [Principle] | [Principle] |

**Overlapping needs** (design once, serves both):
- [Need] — [Which personas share it]

**Conflicting needs** (must make a choice):
- [Tension] — [Which personas conflict and why]

**Primary persona for this project:** [Name]
**Rationale:** [Why this persona should drive primary design decisions]
```

---

## Using Personas to Brief Claude

One of the highest-value uses of a persona is briefing Claude before an Ideate or Prototype session. A well-structured persona brief dramatically improves Claude's output quality.

**Claude prompt template for briefing:**
> "I'm going to be designing for [Persona Name]. Here's their full context:
>
> [Paste persona document]
>
> For the rest of this session, keep this persona in mind for every response. When generating concepts or evaluating options, explicitly reference whether they would work for [Name] given their context, goals, and mental model. If I propose something that would frustrate or confuse [Name], tell me why."

---

## Quality Checklist

Before passing personas to Ideate:
- [ ] Every persona is grounded in at least 2–3 research sessions, not assumptions
- [ ] Every pain point has a severity rating and session reference
- [ ] Every persona has at least one specific workaround documented
- [ ] Representative quote sounds like a specific person, not a user type
- [ ] "Design for this" and "Never do this" fields are specific, not generic
- [ ] Personas pass the disagreement test — they generate different design directions
- [ ] Persona set summary identifies primary persona for this project
- [ ] Conflicting needs between personas are documented, not papered over

---

## Phase Handoff Block

Generate this block at the close of Persona Creation. Combine with Problem Framing and Journey Mapping handoffs when opening Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Persona Creation
### Project: [PROJECT NAME]
### Date: [DATE]

---

### What we completed
- Personas created: [N]
- Research basis: [N sessions total]
- Segments identified by: [behavior / goal / context / pain severity]

### Personas at a glance

**[Persona 1 Name]**
- Role/context: [One line]
- Primary goal: [One sentence]
- Biggest pain: [One sentence]
- Key mental model: [How they think about the problem]

**[Persona 2 Name]** (if applicable)
- Role/context: [One line]
- Primary goal: [One sentence]
- Biggest pain: [One sentence]
- Key mental model: [How they think about the problem]

### Primary persona for this project
**[Name]** — [1–2 sentence rationale for why this persona drives primary design decisions]

### Conflicting needs to navigate
- [Tension between personas — what ideation will need to resolve or choose between]

### Shared needs (design once, serve all)
- [Need that applies across all personas]

### Design constraints surfaced by personas
- [Constraint implied by persona context, mental model, or trust signals]

### Open questions about users
- [What we still don't know that matters for ideation]

---
*Combine with Problem Framing and Journey Mapping handoffs when opening Concept Generation.*
*Reference the primary persona explicitly when evaluating concept directions.*
```
