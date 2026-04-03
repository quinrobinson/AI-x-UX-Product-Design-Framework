---
name: journey-mapping
phase: 02 — Define
description: Generate research-grounded journey maps that visualize the end-to-end user experience — actions, thoughts, emotions, touchpoints, and opportunities across each stage. Use in Define to synthesize research into a shared experience narrative before ideation. Distinct from service blueprinting (which maps organizational delivery) — journey mapping focuses on the quality of the human experience. Depends on outputs from research-synthesis.md. Outputs feed into problem-framing.md and Ideate.
ai_leverage: high
claude_surface: chat
---

# Journey Mapping

Visualize what users actually experience — the full arc of actions, emotions, friction, and opportunity across every stage of their journey.

## When to Use

- You have research data and need to synthesize it into a shared experience narrative
- The team disagrees about where the real problems are in the user flow
- You're preparing for ideation and need to identify which moments to design against
- You need to communicate user pain points to stakeholders in a compelling format
- The problem involves multiple touchpoints, stages, or decision points

---

## Journey Map vs. Service Blueprint

These are complementary, not interchangeable.

| | Journey Map | Service Blueprint |
|---|---|---|
| **Focus** | Human experience — what users feel and do | System delivery — what the organization does |
| **Audience** | Design team, stakeholders, product | Design, engineering, ops, leadership |
| **Primary input** | User research (interviews, observation) | Research + organizational process data |
| **Primary output** | Emotional arc + opportunity moments | Frontstage/backstage gap analysis |
| **When to use** | Experience quality problems | Multi-team, operational, or systemic problems |

Use both when: the user experience is poor AND the root cause is organizational. Start with the journey map to diagnose what users feel, then use the service blueprint to diagnose why.

---

## What Claude Needs to Start

Before generating a journey map, Claude needs four inputs:

1. **Persona** — who is this map about? (name, role, context, goal)
2. **Scenario** — what specific task or experience are they trying to complete? One scenario per map.
3. **Research data** — paste session summaries, synthesized themes, or pain points from `research-synthesis.md`
4. **Stage count** — roughly how many phases does this experience have? (Can be approximate — Claude will refine)

**One scenario per map.** If you try to map everything at once, the map becomes unreadable. A designer managing a complex system might have 3–4 separate journey maps — each one a specific scenario.

---

## Step 1: Define the Scenario

Lock the scenario before generating anything. A well-defined scenario makes everything else more specific.

**Claude prompt:**
> "Based on this research data, help me define the journey map scenario. Suggest: the persona name and role, their specific goal in this scenario, what triggers the start of the journey, what signals the end, and 5–7 stage names that structure the journey in between. Be specific — avoid generic stage names like 'Awareness' unless the research specifically supports that framing.
>
> Research data: [paste research synthesis or key themes]"

```
## Scenario Definition

**Persona:** [Name — Role / Context]
**Goal:** [What they're trying to accomplish in this scenario]
**Trigger:** [What initiates this experience — specific event or decision]
**End point:** [What signals completion or abandonment]

**Stages:**
1. [Stage name — specific, grounded in research]
2. [Stage name]
3. [Stage name]
4. [Stage name]
5. [Stage name]
```

**Human review checkpoint:** Confirm or adjust stage names before generating the full map. Stages are the hardest thing to change later.

---

## Step 2: Generate the Journey Map

**Claude prompt:**
> "Generate a research-grounded journey map for this scenario. For each stage, populate all six lanes using the research data provided. Mark pain points with ⚠️ and cite which research session each came from (e.g. 'S3 — Senior Designer'). Mark workarounds with 🔧. Flag emotional low points with 📉 and high points with 📈. Do not invent data — if research doesn't support a lane entry, mark it as [assumed] or [unknown].
>
> Persona: [name + context]
> Scenario: [goal + trigger + end point]
> Stages: [list]
> Research data: [paste]"

---

### The Six Lanes

Every journey map has the same six lanes. Complete all six — gaps reveal where more research is needed.

**Lane 1 — Actions**
What the user actually does at each stage — specific behaviors observed in research, not what they should do. Include workarounds (🔧) — these are often the most revealing data.

**Lane 2 — Thoughts**
What the user is thinking — questions, doubts, mental models. Use direct quotes where possible. These reveal cognitive load and unmet information needs.

**Lane 3 — Emotions**
How the user feels — captured as an emotional curve that rises and falls across stages. Use research-grounded emotional language ("frustrated," "confused," "relieved") not generic descriptors. The curve shape is as important as individual data points.

**Lane 4 — Touchpoints**
Every interface, person, tool, or channel the user interacts with at this stage. Includes digital (app, email, notification), physical (paper, device), and human (support rep, colleague).

**Lane 5 — Pain Points** ⚠️
Specific friction, failure, or unmet need at this stage. Every pain point should cite the research source. Severity: Critical (blocks progress) / Major (significant friction) / Minor (noticeable).

**Lane 6 — Opportunities**
Where design intervention could meaningfully change the experience. Generated from pain points — but don't generate opportunities prematurely. Map the pain first, then identify where intervention has the most leverage.

---

### Journey Map Output Format

```
# Journey Map: [Persona] — [Scenario]
### Research basis: [N sessions] | Date: [DATE]

---

## Stage 1: [Stage Name]

**Actions**
[What the user does — specific, research-grounded. Note workarounds with 🔧]

**Thoughts**
[What they're thinking — questions, doubts, mental model assumptions. Use quotes where possible]

**Emotions** [📈 / 📉 / neutral]
[Emotional state + intensity — what drives it at this stage]

**Touchpoints**
[Every interface, person, or channel they interact with]

**Pain Points** ⚠️
| Pain | Severity | Source |
|---|---|---|
| [Specific pain point] | Critical / Major / Minor | [Session reference] |

**Opportunities**
[Leave blank until all pain points are mapped — fill in Step 3]

---

## Stage 2: [Stage Name]
[Repeat structure]

---

[Continue for all stages]
```

---

## Step 3: Identify Critical Moments

After all stages are mapped, synthesize across the full journey to identify the moments that matter most.

**Claude prompt:**
> "Review the complete journey map above. Identify:
> 1. The moment of highest emotional friction — where does the user feel worst and why?
> 2. The moment of highest opportunity — where would a design intervention create the most user value?
> 3. The moment of truth — the decision point where the user either commits or abandons
> 4. The systemic gap — where does a backstage or organizational failure cause a frontstage user problem?
>
> For each moment, name the stage, describe what happens, cite the research evidence, and explain the design implication."

```
## Critical Moments

### Moment of Highest Friction
- **Stage:** [Stage name]
- **What happens:** [Description]
- **Evidence:** [Research citations]
- **Design implication:** [What this means for ideation]

### Moment of Highest Opportunity
- **Stage:** [Stage name]
- **What happens:** [Description]
- **Evidence:** [Research citations]
- **Design implication:** [Where to focus creative energy]

### Moment of Truth
- **Stage:** [Stage name]
- **What happens:** [The decision — commit or abandon]
- **Evidence:** [Research citations]
- **Design implication:** [What must be true here for the user to continue]

### Systemic Gap (if applicable)
- **Stage:** [Stage name]
- **What happens:** [Disconnect between what user experiences and what causes it]
- **Evidence:** [Research citations]
- **Design implication:** [Organizational or process change required]
```

---

## Step 4: Generate Opportunities

Only generate opportunities after all pain points and critical moments are mapped. Premature opportunity generation produces generic, obvious solutions.

**Claude prompt:**
> "Using the journey map pain points and critical moments above, generate design opportunities. For each opportunity:
> - Name the stage it addresses
> - State which pain point or critical moment it responds to
> - Frame it as an HMW question (not a solution)
> - Rate design leverage: High (addresses critical moment or systemic gap) / Medium / Low
>
> Prioritize opportunities that address the moment of highest friction and the moment of highest opportunity. Generate 8–12 opportunities total, then identify the top 3 based on leverage."

---

## Step 5: Emotional Curve Summary

The emotional curve is often the most communicative artifact from a journey map — especially for stakeholder presentations.

**Claude prompt:**
> "Generate a text-based emotional arc summary for this journey map. For each stage, describe the user's emotional state in one sentence — including what specifically causes the emotion (not just the feeling). Then write a 2–3 sentence narrative that captures the overall shape of the experience — where it starts, where it bottoms out, and where (if anywhere) it recovers."

```
## Emotional Arc

| Stage | Emotional State | What Drives It |
|---|---|---|
| [Stage 1] | [Emotion + intensity] | [Specific cause from research] |
| [Stage 2] | [Emotion + intensity] | [Specific cause] |
| [Stage 3] | [Emotion + intensity] | [Specific cause] |

**Arc narrative:**
[2–3 sentences describing the shape of the emotional journey — where it peaks, troughs, and what that means for design]
```

---

## Common Mistakes to Avoid

**Mapping what should happen, not what does**
Journey maps grounded in assumptions rather than research produce comfortable lies. Every data point should trace to a source. Mark anything assumed as [assumed].

**Generic stage names**
"Awareness → Consideration → Purchase" applies to every product. Stage names should be specific to this user and scenario — "Realizes synthesis is taking too long," "Tries to make sense of 200 sticky notes," "Gives up and writes the report from memory."

**Skipping the mundane**
Friction hides in the unremarkable moments between obvious stages. The email the user didn't receive. The tab they had to open for reference. Map the boring parts.

**Adding opportunities too early**
Opportunities written before all pain points are mapped are just feature ideas. Map the full arc first.

**One map for everything**
A designer's journey from research through delivery is not one journey — it's six. Scope to one persona, one goal, one context.

---

## Quality Checklist

Before passing to Ideate:
- [ ] Every action in the map traces to observed research behavior, not assumption
- [ ] Every pain point has a severity rating and research citation
- [ ] Workarounds are captured — each one reveals an unmet need
- [ ] Emotional lane shows a curve — not a flat row of "frustrated"
- [ ] All six lanes are populated — gaps marked [unknown] not left blank
- [ ] Critical moments are identified: friction, opportunity, truth, systemic gap
- [ ] Opportunities are framed as HMW questions, not solutions
- [ ] Top 3 opportunities are ranked by design leverage

---

## Phase Handoff Block

Generate this block at the close of Journey Mapping. Combine with the Problem Framing handoff when opening Concept Generation (03 — Ideate).

```
## Handoff: Define → Ideate
### From: Journey Mapping
### Project: [PROJECT NAME]
### Date: [DATE]

---

### What we completed
- Scenario mapped: [persona + goal + trigger + end point]
- Stages: [N — list names]
- Research basis: [N sessions]
- Critical moments identified: [Yes / Partial]

### What the next phase needs to know
- Persona: [name + context + goal]
- Journey scope: [what this map covers and what it doesn't]

### Moment of highest friction
- Stage: [Name]
- What happens: [One sentence]
- Design implication: [What ideation needs to address]

### Moment of highest opportunity
- Stage: [Name]
- What happens: [One sentence]
- Design implication: [Where to focus creative energy]

### Moment of truth
- Stage: [Name]
- The decision: [Commit or abandon — what makes the difference]

### Top 3 opportunities (ranked by design leverage)
1. HMW [statement] — Leverage: High / Medium
2. HMW [statement] — Leverage: High / Medium
3. HMW [statement] — Leverage: High / Medium

### Emotional arc summary
[2–3 sentences — where the experience starts, where it breaks down, where it recovers]

### Open questions for Ideate
- [What the journey map surfaced but couldn't resolve]
- [Moments we lack research data for — marked [unknown]]
- [Systemic gaps that may require organizational change]

---
*Combine with Problem Framing handoff when opening Concept Generation.*
*The journey map opportunities become the ideation brief — the moments to design against.*
```
