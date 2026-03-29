---
name: phase-handoff
phase: all
description: >
  Generate and use Phase Handoff Blocks to chain the six design phases into one continuous
  AI-assisted workflow. Use this skill when closing a phase and preparing to start the next,
  when a designer needs to re-brief Claude mid-project, when picking up a project after a break,
  or when onboarding a new collaborator onto an in-progress project. Also triggers when a user
  says "we're moving to the next phase," "start Define," "continue from where we left off," or
  pastes a handoff block as their first message. This skill solves context loss between
  conversations — the #1 failure mode in AI-assisted design workflows.
ai_leverage: high
---

# Phase Handoff — Skill Chaining System

Turn six separate AI conversations into one continuous design thread. Each phase closes
by generating a structured summary that becomes the opening context for the next phase.

---

## The Problem This Solves

Every new Claude conversation starts blank. Without a handoff block, a designer finishing
User Research has to mentally re-brief Claude when starting Problem Framing — recalling
participants, themes, pain points, constraints, and decisions from memory. Context gets lost.
Nuance gets dropped. The AI reverts to generic advice.

**The fix:** A Phase Handoff Block is a structured summary Claude generates at the close of
each phase. The designer pastes it as the first message of the next conversation. Claude
picks up with full project context — the same thread, continued.

---

## The Full Chain

```
01 Discover ──→ Handoff Block ──→ 02 Define
02 Define   ──→ Handoff Block ──→ 03 Ideate
03 Ideate   ──→ Handoff Block ──→ 04 Prototype
04 Prototype ─→ Handoff Block ──→ 05 Validate
05 Validate ──→ Handoff Block ──→ 06 Deliver
06 Deliver  ──→ Retrospective Block (project archive)
```

Each block carries forward only what the next phase needs — not everything, just the
signal without the noise.

---

## How to Use

### Closing a phase — generating a handoff block

At the end of any phase session, say:

> *"Generate the Phase Handoff Block for this session."*

Claude will fill in the structured template from that skill's **Phase Handoff Block** section,
using everything discussed in the conversation as context.

**Review the block before moving on:**
- Does it capture the most important finding or decision?
- Are the constraints accurate?
- Is the "what to focus on next" direction right?

Edit anything that's off. This block is the single source of truth for the next phase.

### Opening the next phase — using a handoff block

Start a new conversation, attach the next phase's skill file, and paste the handoff block
as your **first message** — before any other context or questions.

Claude will:
1. Acknowledge the incoming context
2. Confirm which phase is starting
3. Ask one clarifying question if anything is unclear
4. Begin the phase work with full context already loaded

### Mid-project re-entry

If you're picking up a project after a break, or a new collaborator is joining, paste
**all accumulated handoff blocks** as the opening message:

```
[Discover → Define handoff block]
[Define → Ideate handoff block]
[Ideate → Prototype handoff block]

We're now in Prototype phase. Here's where we left off: [brief status update].
```

Claude will reconstruct the full project context from the chain.

---

## What Each Handoff Block Contains

Every block follows the same structure: **what came before → what was decided → what comes next**.

| Block | From → To | Key Contents |
|-------|-----------|--------------|
| User Research | Discover → Define | Themes, pain points, unmet needs, key quote, assumptions to validate |
| Competitive Analysis | Discover → Define | Conventions, gaps, differentiation opportunity, positioning signal |
| Problem Framing | Define → Ideate | Validated problem statement, constraints, journey friction points, provocation |
| Concept Generation | Ideate → Prototype | Selected concept, rejected alternatives, visual direction, screens to build |
| Visual Design | Ideate → Prototype | Full token set (colors, type, spacing, shape, motion), style rules |
| Prototyping | Prototype → Validate | Prototype link, hypotheses to test, riskiest assumptions, draft tasks |
| Accessibility Audit | Prototype/Validate → Deliver | Critical issues, confirmed passing, engineer requirements |
| Usability Testing | Validate → Deliver | What worked, issues to fix, validated assumptions, metrics baseline |
| Design Delivery | Deliver → Archive/v2 | Full chain summary, design decisions, debt flagged, v2 backlog |

---

## Combining Multiple Blocks

When two skills run in the same phase (e.g., User Research + Competitive Analysis both in Discover),
combine their handoff blocks into one opening message for Define:

```
## Combined Handoff: Discover → Define

### From: User Research
[paste user research handoff block content]

### From: Competitive Analysis
[paste competitive analysis handoff block content]

### Synthesis
[1–2 sentences combining the most important signal from both]
```

Similarly, Concept Generation + Visual Design both hand off to Prototype — combine them
so the prototype has both the interaction concept and the visual system.

---

## Generating a Handoff Block Mid-Phase

You don't have to wait until the end of a session. Generate a handoff block any time you
want to save state:

> *"Generate a partial handoff block — we've completed research synthesis but haven't done
> journey mapping yet."*

Claude will generate a block marked `[PARTIAL]` so you know it's not the full phase output.

---

## The Retrospective Block (Project Archive)

The Design Delivery skill generates a final **Retrospective Block** — not a handoff to
another phase, but a permanent record of the full project:

- The discovery insight that drove everything
- The problem statement
- The concept chosen and why
- The key test finding that shaped delivery
- Design decisions and their rationale
- What was left out and why
- What to pick up in v2

Store this alongside the Figma file and repo. When the project comes back for v2, paste
it as the opening message. Claude picks up with complete institutional memory.

---

## Quick Reference — Handoff Prompts

Copy these into your workflow:

**Close a phase:**
> "We've finished [phase name]. Generate the Phase Handoff Block for this session."

**Open the next phase:**
> "Starting [next phase name]. Here's the handoff from [previous phase]: [paste block]"

**Re-enter after a break:**
> "Picking up [project name]. Here are the handoffs so far: [paste all blocks]. We're in [current phase]."

**Onboard a collaborator:**
> "New designer joining. Here's the project context: [paste all blocks]. They're taking over [phase]."

**Partial save:**
> "Generate a partial handoff block — we've done [X] but not yet [Y]."

**Combine blocks:**
> "Combine the User Research and Competitive Analysis handoffs into one opening context for Define."

---

## Quality Checklist

Before moving to the next phase, verify the handoff block:

- [ ] The single most important finding or decision is captured
- [ ] Constraints are specific (not generic — actual platform, timeline, business constraints)
- [ ] The "what to focus on next" direction is actionable, not vague
- [ ] No critical context was dropped that the next phase will need
- [ ] Block is dated and project-named (makes re-entry easier)
- [ ] If combining multiple blocks, the synthesis sentence is accurate
