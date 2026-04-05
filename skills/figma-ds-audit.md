---
name: figma-ds-audit
title: "Design System Audit via Figma MCP"
phase: all
description: >
  Audit an existing Figma design system by reading variables, styles, and
  components via MCP — then scoring them against the framework's audit criteria
  (Material, Atlassian, Carbon, HIG). Produces a structured gap analysis with
  severity levels and remediation prompts per finding. Use when a designer
  already has a design system in Figma and wants to evaluate its completeness
  before handoff or as a health check.
claude_surface: code
ai_leverage: high
figma_page: "07 — Design System"
depends_on:
  - figma-playbook.md
  - design-systems.md
  - figma-ds-export.md
tool_ref: design-system
---

# Design System Audit via Figma MCP

## Prerequisites

This skill requires **Claude Code** with the **Figma MCP** connected. See `figma-playbook.md` for setup instructions.

| Requirement | Check |
|---|---|
| Claude Code running | `claude --version` |
| Figma MCP connected | `claude mcp list` shows Figma entry |
| Figma file with design system | File URL with existing variables, styles, or components |

---

## Overview

This is **Mode B** of the Design System Studio. Where Mode A (Build) creates a system from scratch, Mode B reads an existing Figma design system and evaluates it against the same criteria — producing a gap analysis with specific remediation steps.

The audit covers six domains, scored against Material Design 3, Atlassian, IBM Carbon, and Apple HIG:

| Domain | What Claude reads from Figma | What it evaluates |
|---|---|---|
| **Foundations** | Variable collections, color/effect styles | Token architecture, naming, light/dark modes |
| **Typography** | Text styles | Scale coverage, naming, weight/size consistency |
| **Spacing & Shape** | Number variables, auto-layout usage | Grid adherence, radius consistency |
| **Components** | Component sets, variants, properties | Coverage, state completeness, variant naming |
| **Accessibility** | Color variables, component sizing | Contrast ratios, touch target sizes |
| **Documentation** | Component descriptions, layer naming | Usage guidelines, anatomy annotations |

---

## Workflow

### Step 1 — Connect and scan

Provide the Figma file URL:

```
Audit the design system in this Figma file:
[FIGMA_FILE_URL]

Read all variable collections, text styles, color styles, effect styles,
and component sets. Then run the audit against the APDF criteria.
```

Claude will use `get_design_context` and `search_design_system` to read:
- All variable collections (names, modes, variable count)
- All text styles (font, size, weight, line-height)
- All color styles
- All effect styles (shadows)
- All published components and their variant properties

### Step 2 — Foundations audit

Claude evaluates the token architecture:

```
FOUNDATIONS AUDIT

Token Architecture:
  ✅ | ⚠️ | ❌  Variable collections exist
  ✅ | ⚠️ | ❌  Reference → System → Component layering
  ✅ | ⚠️ | ❌  Semantic naming (not "Blue-500" but "color/primary")
  ✅ | ⚠️ | ❌  Light and Dark modes on System collection

Color System:
  ✅ | ⚠️ | ❌  Primary, secondary, accent defined
  ✅ | ⚠️ | ❌  Semantic colors (success, warning, error, info)
  ✅ | ⚠️ | ❌  Surface and on-surface pairs
  ✅ | ⚠️ | ❌  Neutral scale (at least 5 stops)

Elevation:
  ✅ | ⚠️ | ❌  Shadow/elevation styles defined
  ✅ | ⚠️ | ❌  Multiple levels (rest, raised, floating, overlay)
```

### Step 3 — Typography audit

Claude reads all text styles and evaluates coverage:

```
TYPOGRAPHY AUDIT

Scale Coverage:
  ✅ | ⚠️ | ❌  Display sizes defined
  ✅ | ⚠️ | ❌  Headline sizes defined
  ✅ | ⚠️ | ❌  Title sizes defined
  ✅ | ⚠️ | ❌  Body sizes defined (at least sm/md/lg)
  ✅ | ⚠️ | ❌  Label sizes defined

Consistency:
  ✅ | ⚠️ | ❌  Font family limited to 2-3 families
  ✅ | ⚠️ | ❌  Line heights proportional (1.2–1.6 range)
  ✅ | ⚠️ | ❌  Scale follows a mathematical ratio
  ✅ | ⚠️ | ❌  Naming convention consistent across all styles

Found: [N] text styles using [N] font families
Scale ratio detected: [ratio] ([name: Minor Third, Major Third, etc.])
```

### Step 4 — Component audit

Claude reads all component sets and evaluates coverage against the Tier 1 + Tier 2 inventory:

```
COMPONENT AUDIT

Tier 1 Coverage (14 required):
  ✅  Button          — [N] variants, [states found]
  ❌  Text Input      — missing
  ⚠️  Card           — 2 of 3 variants (missing: Filled)
  ...

Tier 2 Coverage (10 recommended):
  ✅  Tabs            — [N] variants
  ❌  Breadcrumb      — missing
  ...

Per-component detail:
  Button:
    Variants found: Filled, Outlined, Ghost
    Missing variants: Icon, Danger
    States found: Default, Hover, Disabled
    Missing states: Focus, Active, Loading
    Uses variables: ✅ (all fills reference sys/color/primary)
    Naming: ✅ consistent (Button/[Variant]/[State])

  [... for each component found]
```

### Step 5 — Accessibility audit

Claude evaluates contrast ratios using the color variables:

```
ACCESSIBILITY AUDIT

Contrast Ratios:
  Primary on Surface:        [ratio]:1  → [AA/AAA/Fail]
  On-surface on Surface:     [ratio]:1  → [AA/AAA/Fail]
  On-surface-variant:        [ratio]:1  → [AA/AAA/Fail]
  Error on Error-container:  [ratio]:1  → [AA/AAA/Fail]
  On-primary on Primary:     [ratio]:1  → [AA/AAA/Fail]

Component Sizing:
  ✅ | ❌  Button height ≥ 44px (touch target)
  ✅ | ❌  Input height ≥ 44px
  ✅ | ❌  Interactive elements have visible focus states

Color Independence:
  ✅ | ❌  Error states use icon + color (not color alone)
  ✅ | ❌  Status indicators have shape differentiation
```

### Step 6 — Gap analysis and remediation

Claude produces a prioritized report:

```
# Design System Audit Report
File: [file name]
Date: [date]
Audited against: Material Design 3, Atlassian, IBM Carbon, Apple HIG

## Summary
- Foundations:    [score]% complete ([N] of [N] criteria)
- Typography:    [score]% complete
- Components:    [score]% complete ([N] of 24 found)
- Accessibility: [score]% complete
- Documentation: [score]% complete

Overall: [score]% — [Ready for handoff / Needs work / Significant gaps]

## Critical Gaps (fix before handoff)
1. [Gap description] — Severity: Critical
   Remediation: [specific action + prompt to fix it]

2. [Gap description] — Severity: Critical
   Remediation: [specific action]

## Recommended Improvements
3. [Gap description] — Severity: Major
   Remediation: [specific action]

## Nice to Have
4. [Gap description] — Severity: Minor
   Remediation: [specific action]
```

---

## Prompt Templates

### Full audit
```
Run a complete design system audit on this Figma file:
[FIGMA_FILE_URL]

Read all variables, styles, and components. Score against the APDF
audit criteria (Material, Atlassian, Carbon, HIG). Produce a gap
analysis with severity levels and remediation prompts.
```

### Foundations only
```
Audit just the token architecture in this Figma file:
[FIGMA_FILE_URL]

Check: variable collections, naming convention, reference/system/component
layering, light/dark modes, color system completeness.
```

### Component coverage check
```
Check which components exist in this Figma file against the APDF
Tier 1 and Tier 2 component inventory:
[FIGMA_FILE_URL]

For each component found, list variants and states. Flag what's missing.
```

### Pre-handoff quick check
```
Quick pre-handoff audit of this design system:
[FIGMA_FILE_URL]

Focus on: contrast ratios, missing states, hard-coded values (should be
variables), and touch target compliance. Skip documentation scoring.
```

### Audit → Export remediation
```
Audit this Figma file, then fix the critical gaps automatically:
[FIGMA_FILE_URL]

1. Run the full audit
2. For each critical gap, create the missing variables/styles/components
3. Use --apdf-* naming for any new variables
4. Report what was created
```

---

## Scoring Criteria

Each audit domain uses a three-level scoring:

| Symbol | Meaning | Score |
|---|---|---|
| ✅ | Complete — meets all criteria | 1.0 |
| ⚠️ | Partial — exists but incomplete or inconsistent | 0.5 |
| ❌ | Missing — not found in the file | 0.0 |

**Overall readiness thresholds:**
- **≥ 85%** — Ready for handoff
- **60–84%** — Needs work — address critical gaps
- **< 60%** — Significant gaps — consider using Mode A (Build) to scaffold

---

## Quality Checklist

- [ ] All variable collections read and cataloged
- [ ] Text styles extracted with full property details
- [ ] Component sets scanned with variant and state inventory
- [ ] Contrast ratios calculated for all primary color pairs
- [ ] Gap report includes specific remediation per finding
- [ ] Severity levels assigned (Critical / Major / Minor)
- [ ] Report structured for designer consumption (not developer jargon)
- [ ] Remediation prompts are copy-paste ready for Claude Code
