---
name: figma-playbook
phase: all
description: Execute design work directly in Figma using the Figma MCP. Use this skill whenever the user wants Claude to create, update, or organize content in a Figma file as part of the design process. Triggers include requests to build frames, lay out research findings, create wireframes, scaffold components, update design tokens, annotate specs, or structure any design phase deliverable in Figma. Also use when the user references their Figma project template or asks Claude to "put this in Figma," "update the file," "create a board," or any variation of working directly in Figma. This skill should be read alongside the relevant phase skill (e.g., user-research.md + figma-playbook.md together).
ai_leverage: high
---

# Figma Playbook

A comprehensive guide for Claude to execute design work directly in Figma via MCP. This playbook maps every phase of the design process to concrete Figma actions, patterns, and templates.

## Prerequisites — Read this before anything else

This skill requires **Claude Desktop** connected to the **Figma desktop app** via MCP. It will not work in claude.ai in a browser.

### What you need running

| Requirement | How to confirm |
|---|---|
| Claude Desktop (not claude.ai) | You're using the installed desktop app, not a browser |
| Figma desktop app (not browser) | Figma is open as an installed app, not figma.com |
| Figma MCP connected | Claude Desktop → Settings → Connectors → Figma shows **Connected** |
| Both apps open simultaneously | Claude Desktop and Figma are both running right now |
| Edit access to your Figma file | You can make changes to the file (not view-only) |

### Quick connection test

Open your Figma file in the desktop app. Copy the file URL, then in Claude Desktop paste it and say: **"Read the structure of this Figma file: [URL]"**

- ✅ Claude responds with the file name and page list → you're ready to use this playbook
- ❌ Claude says it can't access the file → check the setup guide at the framework site or follow the steps below

### Not set up yet?

**Option A — Set up Claude Desktop + Figma MCP** (5–10 minutes):
1. Download Claude Desktop from [claude.ai/download](https://claude.ai/download)
2. Download Figma desktop from [figma.com/downloads](https://www.figma.com/downloads)
3. Open Claude Desktop → Settings → Integrations → Connect Figma
4. Open both apps and run the connection test above

**Option B — Use claude.ai in the browser instead** (zero setup):
Upload this skill file to a claude.ai conversation. Claude will generate the same structured content — research boards, wireframe specs, component descriptions — but you'll apply it manually in Figma rather than Claude executing it directly. The Figma Playbook becomes a guide for what to build rather than an automated executor.

---

## How This Playbook Works

This skill is a **companion** to the phase-specific skills. It doesn't replace them — it extends them with Figma execution capabilities. The workflow is:

1. Read the relevant phase skill for the *what* (content, structure, quality criteria)
2. Read this playbook for the *how* (Figma implementation patterns)
3. Execute in Figma using `use_figma`, `get_design_context`, and `search_design_system`

## Before You Start

### File Context

Always begin by understanding the target file:

1. **Confirm the file** — Ask for or confirm the Figma file URL/key
2. **Read the structure** — Use `get_metadata` on the page to understand what exists
3. **Check the design system** — Use `search_design_system` to find existing components, variables, and styles before creating new ones
4. **Identify the target page** — Match the work to the correct page in the project template:
   - `01 — Discover` through `06 — Deliver` for phase work
   - `07 — Design System` for token and component updates
   - `08 — AI Toolkit` for prompt and workflow reference

### Core Figma Patterns

These patterns are reused across all phases. Master them first.

**Page Navigation**
```javascript
// Find and switch to the right page
const targetPage = figma.root.children.find(p => p.name.includes("01 — Discover"));
await figma.setCurrentPageAsync(targetPage);
```

**Color Helper**
```javascript
function hex(h) {
  return {
    r: parseInt(h.slice(1,3),16)/255,
    g: parseInt(h.slice(3,5),16)/255,
    b: parseInt(h.slice(5,7),16)/255
  };
}
```

**Text Creation**
```javascript
async function createText(x, y, content, size, style, color, width) {
  await figma.loadFontAsync({ family: "Inter", style: style });
  const t = figma.createText();
  t.x = x; t.y = y;
  t.fontName = { family: "Inter", style: style };
  t.fontSize = size;
  t.characters = content;
  if (color) t.fills = [{ type: 'SOLID', color: color }];
  if (width) { t.resize(width, t.height); t.textAutoResize = 'HEIGHT'; }
  return t;
}
```

**Section Header**
```javascript
async function sectionHeader(x, y, label, color) {
  const lbl = await createText(x, y, label.toUpperCase(), 11, "Semi Bold", hex(color || '#999999'));
  lbl.letterSpacing = { value: 3, unit: 'PIXELS' };
  return lbl;
}
```

**Card Pattern**
```javascript
function card(x, y, w, h, accentColor) {
  const bg = figma.createRectangle();
  bg.x = x; bg.y = y; bg.resize(w, h);
  bg.fills = [{ type: 'SOLID', color: hex('#FFFFFF') }];
  bg.cornerRadius = 12;
  bg.strokes = [{ type: 'SOLID', color: hex('#E5E5E5') }];
  bg.strokeWeight = 1;
  if (accentColor) {
    const accent = figma.createRectangle();
    accent.x = x; accent.y = y;
    accent.resize(w, 4);
    accent.fills = [{ type: 'SOLID', color: hex(accentColor) }];
  }
  return bg;
}
```

**Positioning Strategy**
- Start content at x=80 for consistent left margin
- Use y-tracking variable, incrementing as content is added
- Standard content width: 1400px (fits 1440 viewport with margins)
- Card gap: 24px vertical, 24px horizontal
- Section gap: 48px

---

## Phase 01 — Discover

### Research Findings Board

When the user has research insights to visualize:

**Structure:**
- Section: Key Themes (grouped cards with frequency/impact tags)
- Section: Pain Points (severity-ranked list with colored indicators)
- Section: Personas (card per persona with structured fields)
- Section: Opportunities (numbered list with supporting evidence)

**Figma Pattern:**
```
Page: 01 — Discover
├── Research Findings Header (phase color: #22C55E)
├── Key Themes Section
│   ├── Theme Card 1 (title, frequency badge, evidence quotes)
│   ├── Theme Card 2
│   └── ...
├── Pain Points Section
│   ├── Critical (red indicator)
│   ├── Major (orange indicator)
│   └── Minor (yellow indicator)
├── Personas Section
│   ├── Persona Card (name, role, goals, frustrations, quote)
│   └── ...
└── Opportunities Section
    ├── Opportunity 1 (description + supporting data)
    └── ...
```

**Key implementation details:**
- Use severity colors: Critical `#DC2626`, Major `#F59E0B`, Minor `#EAB308`
- Persona cards should be ~400px wide, arranged in a row
- Quote text should be italicized with a left accent bar
- Frequency badges: small rounded rectangles with count

### Competitive Analysis Matrix

When the user has competitor data:

**Structure:**
- Header row with competitor names/logos
- Row per evaluation dimension
- Color-coded cells (strength/neutral/weakness)
- Synthesis section below the matrix

**Figma Pattern:**
- Create as a table using rectangles and text
- Column width: 200px per competitor, 180px for dimension labels
- Cell colors: Strong `#DCFCE7`, Neutral `#F5F5F5`, Weak `#FEE2E2`
- Add a "Conventions" row and "Opportunities" row at the bottom with distinct styling

---

## Phase 02 — Define

### Journey Map

When the user has journey data:

**Structure:**
- Persona header with context
- Stage columns (4-6 stages)
- Rows: Actions, Thoughts, Emotions, Touchpoints, Pain Points, Opportunities
- Emotion curve as a visual line

**Figma Pattern:**
```
Page: 02 — Define
├── Journey Map Header (phase color: #8B5CF6)
├── Persona Strip (name, role, scenario)
├── Stage Columns
│   ├── Stage 1
│   │   ├── Actions (text)
│   │   ├── Thoughts (italic text, thought bubble style)
│   │   ├── Emotion (dot on scale + emoji)
│   │   ├── Touchpoints (tagged badges)
│   │   ├── Pain Points (red-tinted cell)
│   │   └── Opportunities (green-tinted cell)
│   ├── Stage 2
│   └── ...
└── Key Insights Strip (bottom summary)
```

**Key implementation details:**
- Stage columns: equal width, separated by 1px vertical lines
- Emotion row: use colored dots (green=positive, yellow=neutral, red=negative) connected by lines
- Pain point cells: background `#FEF2F2`, text in `#991B1B`
- Opportunity cells: background `#F0FDF4`, text in `#166534`
- Column width: ~220px per stage

### Design Brief

When creating or documenting a design brief:

**Structure:** Single card layout with structured sections
- Problem Statement (prominent, large text)
- Target Users, Success Metrics, Constraints, Scope (structured fields)
- Timeline and stakeholders at bottom

---

## Phase 03 — Ideate

### Concept Cards

When documenting concept explorations:

**Structure:** Row of cards, one per concept direction

**Figma Pattern:**
```
Page: 03 — Ideate
├── Concept Exploration Header (phase color: #F59E0B)
├── Concept Row
│   ├── Concept Card 1: "Convention" (labeled badge)
│   │   ├── Core Idea (paragraph)
│   │   ├── Key Interaction (highlighted)
│   │   ├── Strength (green tag)
│   │   └── Risk (red tag)
│   ├── Concept Card 2: "Improvement"
│   ├── Concept Card 3: "Recombination"
│   ├── Concept Card 4: "Paradigm Shift"
│   └── Concept Card 5: "Moonshot"
└── Evaluation Matrix (concepts vs criteria)
```

**Key implementation details:**
- Card width: 280px, height: auto (fit content)
- Direction badge at top with phase color
- Strength tags: bg `#DCFCE7`, text `#166534`
- Risk tags: bg `#FEE2E2`, text `#991B1B`

### Wireframe Scaffolding

When creating wireframe structures:

- Create frames at standard device widths (375, 768, 1280)
- Use placeholder rectangles with dashed borders for content areas
- Label each area with its purpose and priority
- Add flow arrows between screens using lines with arrowheads

---

## Phase 04 — Prototype

### Component Creation

When building UI components in Figma:

1. **Check existing components first:**
   ```
   Use search_design_system to find if a similar component exists.
   If found, use importComponentByKeyAsync to bring it in.
   Only create new components when nothing suitable exists.
   ```

2. **Component structure:**
   - Create as a Component (figma.createComponent)
   - Use auto-layout for responsive behavior
   - Include all variants (default, hover, active, disabled, focus, error)
   - Name using slash convention: `Button/Primary/Default`

3. **Design token application:**
   - Search for existing variables before hardcoding colors
   - Reference the Design System page (07) for current token values
   - Use consistent naming: `color/primary`, `space/4`, `radius/md`

### Screen Layouts

When building screen designs:

- Frame size: 1440×900 for desktop, 375×812 for mobile
- Use auto-layout where possible for responsive behavior
- Include all states as separate frames, labeled clearly
- Name frames descriptively: `Dashboard / Default`, `Dashboard / Loading`

---

## Phase 05 — Validate

### Findings Visualization

When documenting test results:

**Structure:**
```
Page: 05 — Validate
├── Findings Header (phase color: #EF4444)
├── Summary Strip (participants, completion rate, key finding)
├── Task Completion Matrix
│   ├── Header Row (Task names)
│   ├── Participant Rows (✅ ⚠️ ❌ per task)
│   └── Completion Rate Row
├── Issues by Severity
│   ├── Critical Issues (red cards)
│   ├── Major Issues (orange cards)
│   └── Minor Issues (yellow cards)
└── Recommendations
    ├── Quick Wins (green left border)
    └── Redesigns (blue left border)
```

**Key implementation details:**
- Completion indicators: ✅ = `#16A34A`, ⚠️ = `#F59E0B`, ❌ = `#DC2626`
- Issue cards include: title, frequency (X/N participants), evidence quote, recommendation
- Sort issues by severity × frequency, highest first

### Heuristic Evaluation Board

- 10 rows, one per Nielsen heuristic
- Rating column with color-coded cells (Strong/Adequate/Weak/Violated)
- Evidence and recommendation columns
- Overall score prominently displayed

---

## Phase 06 — Deliver

### Spec Annotations

When annotating designs for developer handoff:

**Pattern:**
- Create annotation frames adjacent to the design (right side or below)
- Use red lines (redlines) connecting annotations to elements
- Spec callouts: small cards with token references
  - Spacing: `space-4 (16px)`
  - Color: `color/primary (#2563EB)`
  - Typography: `text-lg / Semi Bold`
  - Radius: `radius-md (10px)`

**Annotation card style:**
- Background: `#1A1A1A`
- Text: `#E0E0E0`, mono font, 11px
- Corner radius: 6px
- Connected to element with 1px `#EF4444` line

### Component Documentation

When creating component doc frames:

**Structure per component:**
```
Component Doc Frame
├── Component Name (H2)
├── Description (body text)
├── Variants Grid (all variants displayed)
├── Props Table
│   ├── Header Row (Prop, Type, Default, Description)
│   └── Data Rows
├── States Row (Default, Hover, Active, Disabled, Focus, Error)
├── Usage Guidelines
│   ├── Do (green section)
│   └── Don't (red section)
└── Accessibility Notes
```

### Design Decision Records

When documenting decisions in Figma:

- Create as a structured card on the Deliver page
- Include: Decision title, Date, Status badge, Context, Options (with pros/cons), Selected option (highlighted), Rationale, Consequences
- Status badges: Accepted `#DCFCE7`, Superseded `#FEF3C7`, Deprecated `#FEE2E2`

---

## Design System Operations

### Updating Tokens (Page 07)

When the user wants to update the design system:

1. **Read current state** — `get_metadata` on the Design System page
2. **Identify what's changing** — Colors, typography, spacing, or shape
3. **Update visually** — Modify the swatch rectangles, type samples, spacing indicators
4. **Update variables** — If Figma variables exist, update those too via `use_figma`

### Creating Variables

When establishing design tokens as Figma variables:

```javascript
// Create a variable collection
const collection = figma.variables.createVariableCollection("Tokens");

// Create color variables
const primary = figma.variables.createVariable("color/primary", collection, "COLOR");
primary.setValueForMode(collection.defaultModeId, hex("#2563EB"));

// Create number variables (spacing, radius)
const space4 = figma.variables.createVariable("space/4", collection, "FLOAT");
space4.setValueForMode(collection.defaultModeId, 16);
```

### Client Customization Flow

When adapting the design system for a client:

1. User provides brand guidelines (colors, fonts, personality)
2. Generate new token values (using the design-tokens-system artifact or AI prompt)
3. Update the Design System page swatches and samples
4. Update Figma variables if they exist
5. Verify all components on other pages still look correct

---

## Quality Standards

### Before Creating Content

- [ ] Confirmed the correct Figma file and page
- [ ] Checked for existing design system components to reuse
- [ ] Understood the current page layout to avoid overlapping content

### While Creating Content

- [ ] Using consistent spacing (80px margins, 24px gaps)
- [ ] Applying design system tokens, not hardcoded values
- [ ] Loading fonts before creating text (`loadFontAsync`)
- [ ] Naming layers descriptively (not "Rectangle 47")
- [ ] Using `await figma.setCurrentPageAsync()` not `figma.currentPage =`

### After Creating Content

- [ ] Content is positioned logically, not overlapping
- [ ] All text is readable (contrast, size)
- [ ] Frames are named to match project template conventions
- [ ] Notify user of what was created: `figma.notify("✓ Description")`

---

## Error Handling

Common issues and fixes:

**"Setting figma.currentPage is not supported"**
→ Use `await figma.setCurrentPageAsync(page)` instead

**Font loading failures**
→ Always wrap font operations: `await figma.loadFontAsync({ family: "Inter", style: "Regular" })`
→ Load all needed styles before creating text (Regular, Medium, Semi Bold, Bold)

**Node positioning conflicts**
→ Read existing content positions first with `get_metadata`
→ Calculate safe starting Y position below existing content

**Large operations timing out**
→ Break into multiple `use_figma` calls
→ Create structure first, populate content in subsequent calls

---

## Extending the Playbook

As new Figma MCP capabilities become available, add them here under the relevant phase. The pattern is always:

1. **What** — The design deliverable being created
2. **Structure** — The Figma node hierarchy
3. **Pattern** — Reusable code patterns
4. **Details** — Colors, sizes, spacing, and naming conventions

This keeps the playbook as the single source of truth for all Figma operations across the framework.
