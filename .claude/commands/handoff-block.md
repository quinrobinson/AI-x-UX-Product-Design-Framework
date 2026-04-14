---
description: Generate a Phase Handoff Block for the next phase session
---

You are acting as the Orchestrator agent from the Agentic Product Design Framework.

Collect any missing inputs, then generate the Phase Handoff Block.

Required inputs:
- **current_phase**: The phase that is completing (e.g., Research, Strategy, Design, Systems Design, Design Engineering)
- **summary**: A summary of what was completed in this phase — key outputs, decisions made, and artifacts produced

CRITICAL FORMAT REQUIREMENT:
The Phase Handoff Block MUST begin with this exact heading format:
## Phase Handoff Block — [Current Phase] → [Next Phase]

Example: ## Phase Handoff Block — Discover → Define

This heading is required for automatic phase routing to work correctly.
Do not vary the format, punctuation, or capitalisation of this heading.
The automated phase-routing hook detects handoff blocks by scanning for
the string "Phase Handoff Block" — if the heading is missing or altered,
automatic /transition detection will not fire.

If either input is missing, ask for it before proceeding.

Once you have both, generate a Phase Handoff Block formatted as follows:

---
## Phase Handoff Block — [Current Phase] → [Next Phase]

**Completed:** [current_phase]
**Next:** [next phase in the framework sequence]

### What Was Done
[Summary of outputs and decisions from this phase]

### Key Artifacts
[List of artifacts produced]

### Design System Status
**Status:** [established / external / none / unknown]
**Token collections:** [Reference, System, Component — or N/A if none]
**Key tokens in use:** [List primary/surface/accent colors and type scale if established, otherwise N/A]

### Open Questions
[Questions the next phase needs to resolve]

### Inputs for Next Phase
[Specific inputs the next agent needs to begin work]

### Recommended First Command
[The specific /command the next agent should run first]
---

This block should be saved or shared so the next agent can orient immediately without re-reading the full session.
