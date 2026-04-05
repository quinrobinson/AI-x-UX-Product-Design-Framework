---
name: figma-ds-export
title: "Design System Export to Figma"
phase: all
description: >
  Export a design system built in the Design System Studio to Figma as variable
  collections, text styles, and component scaffolds via the Figma MCP. Use after
  configuring tokens in the Studio — this skill bridges the gap between the
  CSS token output and a working Figma design system file.
claude_surface: code
ai_leverage: high
figma_page: "07 — Design System"
depends_on:
  - figma-playbook.md
  - design-systems.md
tool_ref: design-system
---

# Design System Export to Figma

## Prerequisites

This skill requires **Claude Code** with the **Figma MCP** connected. See `figma-playbook.md` for setup instructions.

| Requirement | Check |
|---|---|
| Claude Code running | `claude --version` |
| Figma MCP connected | `claude mcp list` shows Figma entry |
| Figma desktop app open | File open with edit access |
| Studio CSS export ready | Copied from Design System Studio export tab |

---

## Overview

The Design System Studio produces `--apdf-*` CSS custom properties organized in three layers:

1. **Reference** (`--apdf-ref-*`) — raw palette values
2. **System** (`--apdf-sys-*`) — semantic roles (surface, on-surface, primary, etc.)
3. **Component** (`--apdf-comp-*`) — per-component token assignments

This skill translates that output into Figma's native structure:

| CSS Layer | Figma Equivalent |
|---|---|
| `--apdf-ref-*` | Variable collection: **"Reference"** |
| `--apdf-sys-*` | Variable collection: **"System"** |
| `--apdf-comp-*` | Variable collection: **"Component"** (aliases) |
| Typography tokens | Text styles |
| Spacing tokens | Number variables in System collection |
| Shape tokens | Number variables in System collection |

---

## Workflow

### Step 1 — Prepare the token payload

Copy the CSS export from the Design System Studio. Paste it into the Claude Code conversation with:

```
Here are my design system tokens from the Design System Studio.
Create Figma variable collections from these tokens in my file:
[FIGMA_FILE_URL]

Use the --apdf-* naming convention. Create three variable collections:
Reference, System, and Component.
```

### Step 2 — Claude creates variable collections

Claude will execute the following via `use_figma`:

**Reference Collection** — raw color values:
```
Collection: "Reference"
Mode: "Default"

Variables:
  ref/color/primary       → #[value from CSS]
  ref/color/secondary     → #[value]
  ref/color/accent        → #[value]
  ref/color/success       → #[value]
  ref/color/warning       → #[value]
  ref/color/error         → #[value]
  ref/color/info          → #[value]
```

**System Collection** — semantic mappings:
```
Collection: "System"
Modes: "Light", "Dark"

Color variables (aliased to Reference):
  sys/color/surface             → ref/color/[mapped]
  sys/color/surface-container   → ref/color/[mapped]
  sys/color/on-surface          → ref/color/[mapped]
  sys/color/on-surface-variant  → ref/color/[mapped]
  sys/color/primary             → ref/color/primary
  sys/color/on-primary          → [contrast color]
  sys/color/error               → ref/color/error
  sys/color/success             → ref/color/success
  sys/color/warning             → ref/color/warning
  sys/color/outline             → ref/color/[mapped]

Number variables:
  sys/spacing/050  → 2
  sys/spacing/100  → 4
  sys/spacing/200  → 8
  sys/spacing/300  → 12
  sys/spacing/400  → 16
  sys/spacing/600  → 24
  sys/spacing/800  → 32
  sys/spacing/1200 → 48
  sys/spacing/1600 → 64

  sys/shape/small       → [radiusSm]
  sys/shape/medium      → [radiusMd]
  sys/shape/large       → [radiusLg]
  sys/shape/full        → 9999
```

**Component Collection** — per-component aliases:
```
Collection: "Component"
Mode: "Default"

  comp/button/filled/container    → sys/color/primary
  comp/button/filled/label        → sys/color/on-primary
  comp/button/outlined/border     → sys/color/outline
  comp/button/ghost/label         → sys/color/primary
  comp/card/elevated/surface      → sys/color/surface
  comp/card/outlined/border       → sys/color/outline
  comp/input/border/default       → sys/color/outline
  comp/input/border/focus         → sys/color/primary
  comp/input/border/error         → sys/color/error
  [... for each Tier 1 component]
```

### Step 3 — Create text styles

Claude creates Figma text styles matching the typography tokens:

```
Text Styles:
  Display/Large    → [heading font], [display-large size], [heading weight]
  Display/Medium   → [heading font], [display-medium size], [heading weight]
  Headline/Large   → [heading font], [headline-large size], [heading weight]
  Headline/Medium  → [heading font], [headline-medium size], [heading weight]
  Title/Large      → [heading font], [title-large size], [heading weight]
  Title/Medium     → [body font], [title-medium size], 500
  Body/Large       → [body font], [body-large size], 400
  Body/Medium      → [body font], [body-medium size], 400
  Body/Small       → [body font], [body-small size], 400
  Label/Large      → [body font], [label-large size], 500
  Label/Medium     → [body font], [label-medium size], 500
```

### Step 4 — Scaffold component frames (optional)

If requested, Claude creates a "Component Inventory" frame on the Design System page with placeholder frames for each Tier 1 component:

```
Frame: "Component Inventory" (auto-layout, vertical, gap 48)
  ├─ Section: "Action"
  │   └─ Button (all variants: Filled, Outlined, Ghost, Danger, Disabled)
  ├─ Section: "Input"
  │   └─ Text Input (all states: Default, Focus, Error, Success, Disabled)
  │   └─ Select, Checkbox, Radio, Toggle
  ├─ Section: "Containment"
  │   └─ Card (Elevated, Outlined, Filled)
  ├─ Section: "Overlay"
  │   └─ Modal, Tooltip
  ├─ Section: "Feedback"
  │   └─ Toast (4 severities), Alert (4 severities)
  └─ Section: "Data Display"
      └─ Badge, Tag/Chip, Avatar
```

Each component frame uses the variable references — not hard-coded values — so changing a variable updates every instance.

### Step 5 — Verify

After export, Claude reads back the created variables and confirms:

```
✅ Reference collection: [N] variables
✅ System collection: [N] variables, 2 modes (Light/Dark)
✅ Component collection: [N] aliases
✅ Text styles: [N] styles created
✅ All variables reference the correct aliases (no hard-coded values)
```

---

## Prompt Templates

### Full export
```
Export my Design System Studio tokens to Figma. Here's the CSS:

[PASTE CSS EXPORT]

File: [FIGMA_FILE_URL]
Target page: "07 — Design System" (or create it if it doesn't exist)

Create:
1. Three variable collections (Reference, System, Component)
2. Text styles for the full type scale
3. Light and Dark modes on the System collection
```

### Variables only (no component scaffolding)
```
Create Figma variable collections from these --apdf-* tokens in my file:
[FIGMA_FILE_URL]

[PASTE CSS EXPORT]

Variables only — no component frames. Three collections: Reference, System, Component.
System collection needs Light and Dark modes.
```

### Add to existing file
```
I already have a Figma file with some variables. Read the current variables first,
then add the missing --apdf-* tokens without overwriting what exists:
[FIGMA_FILE_URL]
```

---

## Quality Checklist

- [ ] All color variables use aliases (System → Reference), not hard-coded hex
- [ ] System collection has both Light and Dark modes
- [ ] Typography text styles match the CSS type scale values
- [ ] Spacing variables follow the 4px base grid
- [ ] Component aliases point to System variables, not Reference directly
- [ ] Variable naming follows `layer/category/name` convention
- [ ] No orphaned variables (every variable is used by at least one alias or style)
