import { useState, useRef, useCallback } from "react";

// ── Design tokens (matches site system) ─────────────────────────────────────
const DS = {
  dark: "#0F172A",
  darkCard: "#1E293B",
  darkBorder: "#334155",
  white: "#FFFFFF",
  bodyLight: "#94A3B8",
  bodyDark: "#64748B",
  light: "#F8FAFC",
  lightBorder: "#E2E8F0",
};

const PHASE_COLOR = "#F59E0B"; // Ideate phase

// ── Carbon component library (all 46) ────────────────────────────────────────
const CARBON_COMPONENTS = [
  { id:"accordion", name:"Accordion", category:"Navigation", variants:["Default","Flush","Align start/end"], sizes:["sm","md","lg"], tokens:[["$layer-01","Container bg"],["$border-subtle-01","Item dividers"],["$text-primary","Header text"],["$icon-primary","Chevron"]], rule:"Never nest accordions. Flush variant removes border-radius." },
  { id:"breadcrumb", name:"Breadcrumb", category:"Navigation", variants:["Default","With overflow menu"], sizes:["sm","md","lg"], tokens:[["$link-primary","Link color"],["$text-primary","Current page (non-link)"],["$text-secondary","Separator"]], rule:"Show only when 3+ levels of hierarchy exist. Current page is never a link." },
  { id:"button", name:"Button", category:"Actions", variants:["Primary","Secondary","Tertiary","Ghost","Danger","Danger tertiary","Danger ghost"], sizes:["sm (32px)","md (40px)","lg (48px)","xl (64px)","2xl (80px)"], tokens:[["$button-primary","Primary fill"],["$text-on-color","Label on filled"],["$button-secondary","Secondary fill"],["$button-tertiary","Tertiary border"],["$focus","Focus ring"]], rule:"One primary per visible context. Danger only for destructive operations." },
  { id:"checkbox", name:"Checkbox", category:"Forms", variants:["Default","Indeterminate","Disabled","Read-only"], sizes:["sm","md"], tokens:[["$interactive","Checked fill"],["$border-strong-01","Unchecked border"],["$text-primary","Label"]], rule:"Use for multiple selection. Single binary toggle use Toggle instead." },
  { id:"code-snippet", name:"Code Snippet", category:"Content", variants:["Single line","Multi-line","Inline"], sizes:["sm","md","lg"], tokens:[["$layer-01","Code bg"],["$text-primary","Code text"],["$border-subtle-01","Snippet border"]], rule:"Always include copy button. Inline variant lives within body text flow." },
  { id:"combo-box", name:"Combo Box", category:"Forms", variants:["Default","With filtering"], sizes:["sm","md","lg"], tokens:[["$field-01","Input bg"],["$border-strong-01","Active border"],["$layer-01","Menu bg"]], rule:"Use over Dropdown when list is 10+ items and type-ahead filtering helps." },
  { id:"contained-list", name:"Contained List", category:"Content", variants:["Default","Disclosed","Inset","On page"], sizes:["sm","md","lg"], tokens:[["$layer-01","List bg"],["$layer-accent-01","Header bg"],["$border-subtle-01","Row dividers"]], rule:"Use for dense data lists. Not a nav pattern." },
  { id:"content-switcher", name:"Content Switcher", category:"Navigation", variants:["Default","Icon only"], sizes:["sm","md","lg"], tokens:[["$layer-selected-01","Active segment bg"],["$text-primary","Active label"],["$border-strong-01","Container border"]], rule:"2 to 5 options max. Use for in-page view switching, not global navigation." },
  { id:"copy-button", name:"Copy Button", category:"Actions", variants:["Default","Icon only"], sizes:["sm","md","lg"], tokens:[["$icon-primary","Copy icon"],["$background-hover","Hover"],["$layer-01","Feedback tooltip bg"]], rule:"Always provide visual feedback on copy (checkmark and tooltip)." },
  { id:"data-table", name:"Data Table", category:"Data Display", variants:["Default","Sortable","Selectable","Expandable","With toolbar","Batch actions","Inline edit"], sizes:["xs (24px)","sm (32px)","md (40px)","lg (48px)","xl (64px)"], tokens:[["$layer-01","Table bg"],["$layer-accent-01","Header bg"],["$layer-hover-01","Row hover"],["$layer-selected-01","Selected row"],["$border-subtle-01","Row dividers"]], rule:"Header row never scrolls out of view. Batch actions appear above table." },
  { id:"date-picker", name:"Date Picker", category:"Forms", variants:["Simple","Single","Range"], sizes:["sm","md","lg"], tokens:[["$field-01","Input bg"],["$border-strong-01","Active border"],["$layer-02","Calendar bg"],["$interactive","Selected date fill"]], rule:"Range picker uses two inputs. Always show format mask." },
  { id:"definition-tooltip", name:"Definition Tooltip", category:"Overlays", variants:["Default"], sizes:["sm","md","lg"], tokens:[["$background-inverse","Tooltip bg"],["$text-inverse","Tooltip text"],["$border-interactive","Trigger underline"]], rule:"Triggered by hover or focus on underlined term only." },
  { id:"dropdown", name:"Dropdown", category:"Forms", variants:["Default","Inline"], sizes:["sm","md","lg"], tokens:[["$field-01","Trigger bg (layer-aware)"],["$border-strong-01","Trigger border"],["$layer-01","Menu bg"],["$layer-hover-01","Option hover"]], rule:"Menus float one layer above trigger. Use Combo Box for 10+ items." },
  { id:"file-uploader", name:"File Uploader", category:"Forms", variants:["Button","Drag and drop"], sizes:["sm","md","lg"], tokens:[["$field-01","Drop zone bg"],["$border-interactive","Drop zone border"],["$support-error","Error state"]], rule:"Show file list with status after upload. Always validate file type and size." },
  { id:"form", name:"Form", category:"Forms", variants:["Default","With sections","Inline"], sizes:["sm","md","lg"], tokens:[["$field-01","Field bg"],["$layer-01","Form bg"],["$support-error","Error"],["$text-helper","Helper text"]], rule:"Form is a layout container. Left-align labels above fields. 640px max-width." },
  { id:"inline-loading", name:"Inline Loading", category:"Feedback", variants:["Loading","Error","Finished","Inactive"], sizes:["sm","md"], tokens:[["$interactive","Spinner color"],["$support-error","Error state"],["$support-success","Finished state"]], rule:"Use for actions 1 to 9 seconds. Over 10s use Loading overlay." },
  { id:"link", name:"Link", category:"Navigation", variants:["Default","Inline","Standalone","Paired"], sizes:["sm","md","lg"], tokens:[["$link-primary","Default link"],["$link-primary-hover","Hover"],["$link-visited","Visited"]], rule:"External links need warning icon. Never use link color for non-link text." },
  { id:"list", name:"List", category:"Content", variants:["Unordered","Ordered","Nested"], sizes:["sm","md","lg"], tokens:[["$text-primary","List text"],["$text-secondary","Nested items"]], rule:"Max 2 nesting levels. For interactive items use Contained List." },
  { id:"loading", name:"Loading", category:"Feedback", variants:["Overlay","Small","Large"], sizes:["sm","lg"], tokens:[["$interactive","Spinner stroke"],["$overlay","Overlay backdrop"],["$layer-01","Inner circle fill"]], rule:"Small for inline context. Overlay for full page. Always label with text." },
  { id:"menu", name:"Menu", category:"Navigation", variants:["Default","With dividers","With icons"], sizes:["sm","md","lg"], tokens:[["$layer-01","Menu bg"],["$layer-hover-01","Item hover"],["$border-subtle-01","Dividers"]], rule:"Max 2 levels of nesting. Dividers group related actions." },
  { id:"menu-button", name:"Menu Button", category:"Actions", variants:["Default","Ghost","Tertiary"], sizes:["sm","md","lg"], tokens:[["$button-primary","Trigger fill"],["$layer-01","Menu bg"]], rule:"Use when a button reveals a set of actions. Not for navigation." },
  { id:"modal", name:"Modal", category:"Overlays", variants:["Passive","Transactional","Danger","Input/Form","Acknowledgment"], sizes:["xs (400px)","sm (520px)","md (672px)","lg (800px)","full-width"], tokens:[["$overlay","Backdrop"],["$layer-01","Modal bg"],["$layer-accent-01","Header area"],["$focus","Focus trap ring"]], rule:"Always implement focus trap. Danger modal uses red primary. Max 3 footer actions." },
  { id:"multiselect", name:"Multiselect", category:"Forms", variants:["Default","Filterable"], sizes:["sm","md","lg"], tokens:[["$field-01","Trigger bg"],["$layer-01","Menu bg"],["$interactive","Checkbox fill"]], rule:"Show selected count in trigger. Filterable variant for 10+ items." },
  { id:"notification", name:"Notification", category:"Feedback", variants:["Inline","Toast","Actionable"], sizes:["sm","lg"], tokens:[["$support-error","Error"],["$support-success","Success"],["$support-warning","Warning"],["$support-info","Info"]], rule:"Never use color alone, always pair with icon. Toast auto-dismisses after 5s." },
  { id:"number-input", name:"Number Input", category:"Forms", variants:["Default","With helper","Disabled","Read-only"], sizes:["sm","md","lg"], tokens:[["$field-01","Input bg"],["$border-strong-01","Border"],["$interactive","Stepper buttons"]], rule:"Always provide min, max, step values. Steppers do not replace keyboard input." },
  { id:"overflow-menu", name:"Overflow Menu", category:"Actions", variants:["Default","With icons","Danger items"], sizes:["sm","md","lg"], tokens:[["$layer-01","Menu bg"],["$layer-hover-01","Item hover"],["$support-error","Danger items"]], rule:"Use for 3+ secondary actions. Danger actions go last with a divider." },
  { id:"pagination", name:"Pagination", category:"Navigation", variants:["Default","With page size"], sizes:["sm","md","lg"], tokens:[["$layer-01","Control bg"],["$interactive","Active page"],["$border-subtle-01","Dividers"]], rule:"Always show total count. Allow user to set page size when data is large." },
  { id:"popover", name:"Popover", category:"Overlays", variants:["Default","With caret","Tab tip"], sizes:["sm","md","lg"], tokens:[["$layer-01","Popover bg"],["$border-subtle-01","Popover border"]], rule:"Non-modal. Closes on outside click. Use for rich non-tooltip content." },
  { id:"progress-bar", name:"Progress Bar", category:"Feedback", variants:["Default","Indeterminate","Finished","Error"], sizes:["sm","md"], tokens:[["$interactive","Fill color"],["$border-subtle-01","Track bg"],["$support-error","Error"],["$support-success","Finished"]], rule:"Show percentage or step label. Indeterminate for unknown duration." },
  { id:"progress-indicator", name:"Progress Indicator", category:"Navigation", variants:["Horizontal","Vertical"], sizes:["sm","md","lg"], tokens:[["$interactive","Active step"],["$border-subtle-01","Incomplete"],["$support-success","Complete"]], rule:"Use for multi-step workflows. Always show current step and total count." },
  { id:"radio-button", name:"Radio Button", category:"Forms", variants:["Default","Horizontal group","Vertical group","Disabled","Read-only"], sizes:["sm","md"], tokens:[["$interactive","Selected fill"],["$border-strong-01","Unselected ring"],["$text-primary","Label"]], rule:"One selected at all times in a group. Vertical layout for 4+ options." },
  { id:"search", name:"Search", category:"Forms", variants:["Default","Expandable","Toolbar"], sizes:["sm","md","lg"], tokens:[["$field-01","Search bg"],["$border-strong-01","Active border"],["$icon-primary","Search/clear icons"]], rule:"Clear button appears when input has value. Expandable for space-constrained toolbars." },
  { id:"select", name:"Select", category:"Forms", variants:["Default","With helper","Disabled","Read-only","Invalid"], sizes:["sm","md","lg"], tokens:[["$field-01","Select bg"],["$border-strong-01","Select border"],["$icon-primary","Chevron"]], rule:"Native HTML select. For custom styling use Dropdown instead." },
  { id:"slider", name:"Slider", category:"Forms", variants:["Default","Range","With input"], sizes:["sm","md","lg"], tokens:[["$interactive","Track fill + thumb"],["$border-subtle-01","Track bg"],["$field-01","Attached input bg"]], rule:"Always show current value. Range slider uses two thumbs for min/max." },
  { id:"stack", name:"Stack", category:"Layout", variants:["Horizontal","Vertical"], sizes:["sm","md","lg"], tokens:[["$spacing-01 through $spacing-13","Gap between children"]], rule:"Stack is a spacing utility. Use gap token, not margin on children." },
  { id:"structured-list", name:"Structured List", category:"Content", variants:["Default","Selectable","Flush"], sizes:["sm","md","lg"], tokens:[["$layer-01","Row bg"],["$layer-hover-01","Row hover"],["$interactive","Selected fill"],["$border-subtle-01","Row dividers"]], rule:"For simple key-value pairs. Use DataTable when sorting or filtering is needed." },
  { id:"tabs", name:"Tabs", category:"Navigation", variants:["Line","Contained","Vertical","Icon only"], sizes:["sm","md","lg"], tokens:[["$border-interactive","Active tab underline"],["$text-primary","Active label"],["$text-secondary","Inactive label"],["$layer-selected-01","Contained active bg"]], rule:"Never nest tabs. Line for most UI. Contained for dense toolbars." },
  { id:"tag", name:"Tag", category:"Content", variants:["Read-only","Dismissible","Selectable","Operational"], sizes:["sm (16px)","md (24px)","lg (32px)"], tokens:[["$tag-color-[type]","Tag fill"],["$tag-border-[type]","Tag border"],["$tag-hover-[type]","Tag hover"]], rule:"Document color-to-meaning mappings. Dismissible needs aria-label on close." },
  { id:"text-area", name:"Text Area", category:"Forms", variants:["Default","With helper","Disabled","Read-only","Invalid"], sizes:["md","lg"], tokens:[["$field-01","Input bg"],["$border-strong-01","Active border"],["$text-placeholder","Placeholder"],["$support-error","Error state"]], rule:"Layer-aware like Text Input. Show character count when a limit exists." },
  { id:"text-input", name:"Text Input", category:"Forms", variants:["Default","With helper","Password","Disabled","Read-only","Invalid"], sizes:["sm","md","lg"], tokens:[["$field-01 / $field-02","Input bg (layer-aware)"],["$border-strong-01","Active border"],["$text-placeholder","Placeholder"],["$support-error","Error border"]], rule:"Layer-aware: use $field-01 on $layer-01, $field-02 on $layer-02." },
  { id:"tile", name:"Tile", category:"Content", variants:["Default","Clickable","Selectable","Expandable"], sizes:["sm","md","lg"], tokens:[["$layer-01","Tile bg"],["$layer-hover-01","Clickable hover"],["$layer-selected-01","Selected state"],["$border-subtle-01","Tile border"]], rule:"Selectable tiles for choosing configurations. Clickable tiles navigate away." },
  { id:"toggle", name:"Toggle", category:"Forms", variants:["Default","Small","Read-only"], sizes:["sm","md"], tokens:[["$interactive","On fill"],["$ui-03","Off fill"],["$text-primary","Label"]], rule:"Immediate effect, no form submission needed. For deferred use Checkbox." },
  { id:"toggletip", name:"Toggletip", category:"Overlays", variants:["Default","With actions"], sizes:["sm","md","lg"], tokens:[["$background-inverse","Tooltip bg"],["$text-inverse","Tooltip text"]], rule:"Triggered by click, not hover. Keyboard accessible. For complex tips." },
  { id:"tooltip", name:"Tooltip", category:"Overlays", variants:["Default","Icon button tooltip"], sizes:["sm","md","lg"], tokens:[["$background-inverse","Tooltip bg"],["$text-inverse","Tooltip text"]], rule:"Hover and focus only. Never include interactive elements inside a tooltip." },
  { id:"tree-view", name:"Tree View", category:"Navigation", variants:["Default","With checkboxes","With icons"], sizes:["sm","md","lg"], tokens:[["$layer-01","Tree bg"],["$layer-selected-01","Selected node"],["$layer-hover-01","Hover"]], rule:"For hierarchical data navigation. Max 4 nesting levels recommended." },
  { id:"ui-shell", name:"UI Shell", category:"Navigation", variants:["Header","Side nav","Panel"], sizes:["sm","md","lg"], tokens:[["$background-brand","Shell header bg"],["$text-on-color","Header text"],["$layer-01","Side nav bg"],["$layer-selected-01","Active nav item"]], rule:"Always persistent. Header 48px. Side nav 256px. Never hide on desktop." },
];

const CATEGORIES = ["All", ...new Set(CARBON_COMPONENTS.map(c => c.category))].sort((a,b) => a==="All"?-1:b==="All"?1:a.localeCompare(b));


// ── Output generators ─────────────────────────────────────────────────────────
const buildMarkdown = (ds) => {
  const ids = ds.selectedComponents || CARBON_COMPONENTS.map(c => c.id);
  const selected = CARBON_COMPONENTS.filter(c => ids.includes(c.id));
  const sp = ds.spacing || 8;
  const r = ds.radius || 0;
  const fs = ds.baseFontSize || 14;
  const sc = ds.typeScale || 1.2;
  const sizes = Array.from({length:7},(_,i) => Math.round(fs * Math.pow(sc, i)));
  const h = {compact:32,regular:40,comfortable:48}[ds.density||"regular"];
  return `# ${ds.name || "Custom Design System"} — Claude Context Block
> Structured following the Carbon Design System schema for AI agent consumption.

## Agent Entry Point

**System:** ${ds.name || "Custom Design System"}
Read this file first. Then reference Tokens, Components, and Patterns below.

### Agent Rules (non-negotiable)
1. Use design tokens from this file never hardcode raw values
2. Font family: ${ds.fontFamily || "IBM Plex Sans"} for UI, monospace for code
3. Spacing: use the scale below, no arbitrary pixel values
4. All interactive elements must meet WCAG 2.1 AA (4.5:1 text, 3:1 UI)
5. Component decision: check Components then Patterns then custom
6. Figma MCP: bind all fills/strokes to variable collections, never hardcode

---

## Foundations

### Brand Colors
| Token | Value | Role |
|-------|-------|------|
| --color-primary | ${ds.primary || "#0f62fe"} | Primary actions, key UI |
| --color-accent | ${ds.accent || "#6929c4"} | Accent, secondary brand |
| --color-danger | ${ds.danger || "#da1e28"} | Destructive actions, errors |
| --color-success | ${ds.success || "#198038"} | Success states |
| --color-warning | ${ds.warning || "#f1c21b"} | Warning states |

### Surface and Layer
| Token | Value | Role |
|-------|-------|------|
| --background | ${ds.background || "#ffffff"} | Page background |
| --layer-01 | ${ds.layer01 || "#f4f4f4"} | First layer container |
| --layer-02 | ${ds.layer02 || "#ffffff"} | Second layer nested cards |
| --text-primary | ${ds.textPrimary || "#161616"} | Headings, labels, body |
| --text-secondary | ${ds.textSecondary || "#525252"} | Descriptions, captions |
| --border-subtle | ${ds.borderSubtle || "#e0e0e0"} | Dividers, row lines |
| --border-strong | ${ds.borderStrong || "#8d8d8d"} | Active input borders |

### Typography
| Token | Value |
|-------|-------|
| --font-family | "${ds.fontFamily || "IBM Plex Sans"}", system-ui |
| --font-size-base | ${fs}px |
| --type-scale | ${sc} |
| --text-xs | ${sizes[0]}px |
| --text-sm | ${sizes[1]}px |
| --text-base | ${fs}px |
| --text-lg | ${sizes[2]}px |
| --text-xl | ${sizes[3]}px |
| --text-2xl | ${sizes[4]}px |
| --text-3xl | ${sizes[5]}px |

### Spacing Scale (${sp}px base unit)
| Token | Value | Usage |
|-------|-------|-------|
| --spacing-1 | ${sp/2}px | Micro gaps |
| --spacing-2 | ${sp}px | Internal padding |
| --spacing-3 | ${Math.round(sp*1.5)}px | Small padding |
| --spacing-4 | ${sp*2}px | Standard padding |
| --spacing-6 | ${sp*3}px | Card padding |
| --spacing-8 | ${sp*4}px | Between sections |
| --spacing-12 | ${sp*6}px | Major breaks |
| --spacing-16 | ${sp*8}px | Page-level spacing |

### Shape and Density
| Token | Value |
|-------|-------|
| --radius | ${r}px |
| --radius-sm | ${Math.max(0,r-2)}px |
| --radius-lg | ${r+4}px |
| --height-sm | ${h-8}px |
| --height-md | ${h}px |
| --height-lg | ${h+8}px |

---

## Components (${selected.length} of ${CARBON_COMPONENTS.length})

${selected.map(c => `### ${c.name}
Category: ${c.category} | Variants: ${c.variants.join(", ")} | Sizes: ${c.sizes.join(", ")}

Tokens:
${c.tokens.map(([t,r]) => `- ${t}: ${r}`).join("\n")}

Rule: ${c.rule}
`).join("\n")}
---

## Patterns

### Forms
Use Form as layout container. Labels above fields, left-aligned. Max 640px width. Validate inline.

### Dialogs
Use Modal for focused tasks. Passive: no required action. Transactional: primary plus cancel. Danger: red primary.

### Notifications
Inline for contextual feedback. Toast for transient messages (auto-dismiss 5s). Always pair status color with icon.

### Empty States
Always include: icon or illustration, headline, body explanation, primary action.

### Loading
Inline Loading for 1 to 9 second actions. Overlay for full-page. Skeleton for initial data load.

---

## Accessibility
- Text contrast: 4.5:1 minimum (WCAG 2.1 AA)
- Large text and UI elements: 3:1 minimum
- All interactive elements keyboard-operable
- Focus ring visible on every interactive element
- Touch targets: 44x44px minimum
- Never communicate state by color alone

---

## Figma MCP Variable Bindings
Collection: Color — bind via setBoundVariableForPaint
Collection: Spacing — bind via setBoundVariable for padding and gap
Collection: Typography — bind fontFamily via setBoundVariable
Never hardcode any value in a layer property.
`;
};

const buildTokensJSON = (ds) => {
  const sp = ds.spacing || 8;
  const r = ds.radius || 0;
  const fs = ds.baseFontSize || 14;
  const sc = ds.typeScale || 1.2;
  const sizes = Array.from({length:7},(_,i) => Math.round(fs * Math.pow(sc,i)));
  const h = {compact:32,regular:40,comfortable:48}[ds.density||"regular"];
  return {
    color: { primary:ds.primary||"#0f62fe", accent:ds.accent||"#6929c4", danger:ds.danger||"#da1e28", success:ds.success||"#198038", warning:ds.warning||"#f1c21b", background:ds.background||"#ffffff", "layer-01":ds.layer01||"#f4f4f4", "layer-02":ds.layer02||"#ffffff", "text-primary":ds.textPrimary||"#161616", "text-secondary":ds.textSecondary||"#525252", "border-subtle":ds.borderSubtle||"#e0e0e0", "border-strong":ds.borderStrong||"#8d8d8d" },
    typography: { fontFamily:ds.fontFamily||"IBM Plex Sans", baseFontSize:`${fs}px`, typeScale:sc, "text-xs":`${sizes[0]}px`, "text-sm":`${sizes[1]}px`, "text-base":`${fs}px`, "text-lg":`${sizes[2]}px`, "text-xl":`${sizes[3]}px`, "text-2xl":`${sizes[4]}px` },
    spacing: { base:`${sp}px`, 1:`${sp/2}px`, 2:`${sp}px`, 3:`${Math.round(sp*1.5)}px`, 4:`${sp*2}px`, 6:`${sp*3}px`, 8:`${sp*4}px`, 12:`${sp*6}px`, 16:`${sp*8}px` },
    shape: { radius:`${r}px`, "radius-sm":`${Math.max(0,r-2)}px`, "radius-lg":`${r+4}px`, "radius-full":"9999px" },
    components: { density:ds.density||"regular", "height-sm":`${h-8}px`, "height-md":`${h}px`, "height-lg":`${h+8}px` },
  };
};

const buildCSS = (ds) => {
  const sp = ds.spacing || 8;
  const r = ds.radius || 0;
  const fs = ds.baseFontSize || 14;
  const sc = ds.typeScale || 1.2;
  const sizes = Array.from({length:7},(_,i) => Math.round(fs * Math.pow(sc,i)));
  const h = {compact:32,regular:40,comfortable:48}[ds.density||"regular"];
  return `:root {
  /* Brand */
  --color-primary:   ${ds.primary||"#0f62fe"};
  --color-accent:    ${ds.accent||"#6929c4"};
  --color-danger:    ${ds.danger||"#da1e28"};
  --color-success:   ${ds.success||"#198038"};
  --color-warning:   ${ds.warning||"#f1c21b"};
  /* Surfaces */
  --background:      ${ds.background||"#ffffff"};
  --layer-01:        ${ds.layer01||"#f4f4f4"};
  --layer-02:        ${ds.layer02||"#ffffff"};
  /* Text */
  --text-primary:    ${ds.textPrimary||"#161616"};
  --text-secondary:  ${ds.textSecondary||"#525252"};
  /* Borders */
  --border-subtle:   ${ds.borderSubtle||"#e0e0e0"};
  --border-strong:   ${ds.borderStrong||"#8d8d8d"};
  /* Typography */
  --font-family:     '${ds.fontFamily||"IBM Plex Sans"}', system-ui, sans-serif;
  --text-xs:         ${sizes[0]}px;
  --text-sm:         ${sizes[1]}px;
  --text-base:       ${fs}px;
  --text-lg:         ${sizes[2]}px;
  --text-xl:         ${sizes[3]}px;
  --text-2xl:        ${sizes[4]}px;
  /* Spacing */
  --spacing-1:       ${sp/2}px;
  --spacing-2:       ${sp}px;
  --spacing-3:       ${Math.round(sp*1.5)}px;
  --spacing-4:       ${sp*2}px;
  --spacing-6:       ${sp*3}px;
  --spacing-8:       ${sp*4}px;
  --spacing-12:      ${sp*6}px;
  --spacing-16:      ${sp*8}px;
  /* Shape */
  --radius:          ${r}px;
  --radius-sm:       ${Math.max(0,r-2)}px;
  --radius-lg:       ${r+4}px;
  --radius-full:     9999px;
  /* Component heights */
  --height-sm:       ${h-8}px;
  --height-md:       ${h}px;
  --height-lg:       ${h+8}px;
}`;
};

// ── Reusable UI components (all match site DS) ────────────────────────────────
function TabBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "10px 20px", fontSize: 13, fontWeight: active ? 600 : 400,
      fontFamily: "'DM Sans', sans-serif", cursor: "pointer", border: "none",
      background: "none", color: active ? "#0F172A" : DS.bodyDark,
      borderBottom: `2px solid ${active ? PHASE_COLOR : "transparent"}`,
      marginBottom: -1, transition: "all 0.15s",
    }}>{children}</button>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyDark, marginBottom: 12 }}>
      {children}
    </div>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "20px 22px", marginBottom: 14, ...style }}>
      {children}
    </div>
  );
}

function FieldRow({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <div style={{ fontSize: 12, color: DS.bodyDark, minWidth: 130, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>{children}</div>
    </div>
  );
}

function DSSelect({ value, onChange, children }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      flex: 1, fontSize: 13, padding: "7px 10px", border: `1px solid ${DS.lightBorder}`,
      borderRadius: 8, background: DS.white, color: "#0F172A",
      fontFamily: "'DM Sans', sans-serif", cursor: "pointer", outline: "none",
    }}>
      {children}
    </select>
  );
}

function Chip({ selected, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "7px 14px", borderRadius: 999, cursor: "pointer",
      fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500,
      border: selected ? `1.5px solid ${PHASE_COLOR}` : `1px solid ${DS.lightBorder}`,
      background: selected ? `${PHASE_COLOR}12` : DS.white,
      color: selected ? PHASE_COLOR : DS.bodyDark,
      transition: "all 0.15s", outline: "none",
    }}>{children}</button>
  );
}

function PrimaryBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? DS.lightBorder : DS.dark,
      color: disabled ? DS.bodyDark : DS.white,
      border: "none", borderRadius: 10, padding: "12px 24px",
      fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer",
      fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s",
    }}>{children}</button>
  );
}

function GhostBtn({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 10,
      padding: "12px 20px", fontSize: 13, fontWeight: 500, color: DS.bodyDark,
      cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    }}>{children}</button>
  );
}

function SliderRow({ label, min, max, step, value, onChange }) {
  return (
    <FieldRow label={label}>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))} style={{ flex: 1 }} />
      <span style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", minWidth: 42, fontFamily: "'JetBrains Mono', monospace" }}>{value}px</span>
    </FieldRow>
  );
}

function ColorRow({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${DS.lightBorder}` }}>
      <input type="color" value={value} onChange={e => onChange(e.target.value)}
        style={{ width: 28, height: 28, border: `1px solid ${DS.lightBorder}`, borderRadius: 6, padding: 2, cursor: "pointer", background: "none", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: "#0F172A", fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
        <input value={value} onChange={e => /^#[0-9a-fA-F]{0,6}$/.test(e.target.value) && onChange(e.target.value)}
          style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", border: "none", background: "transparent", color: DS.bodyDark, padding: 0, width: "100%", outline: "none" }} />
      </div>
    </div>
  );
}

function MonoBlock({ children }) {
  return (
    <div style={{ background: DS.light, border: `1px solid ${DS.lightBorder}`, borderRadius: 10, padding: "16px 18px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.8, color: "#0F172A", whiteSpace: "pre-wrap", wordBreak: "break-all", maxHeight: 340, overflowY: "auto", marginTop: 10 }}>
      {children}
    </div>
  );
}

function Badge({ color, children }) {
  const colors = { green:{ bg:"#F0FDF4",text:"#15803D",border:"#BBF7D0" }, amber:{ bg:"#FFFBEB",text:"#D97706",border:"#FDE68A" }, red:{ bg:"#FEF2F2",text:"#DC2626",border:"#FECACA" } };
  const c = colors[color] || colors.amber;
  return (
    <span style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontFamily: "'DM Sans', sans-serif" }}>{children}</span>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function DesignSystemBuilder() {
  const [tab, setTab] = useState("upload");
  const [uploadStage, setUploadStage] = useState("idle");
  const [uploadSummary, setUploadSummary] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [aiProcessing, setAiProcessing] = useState(false);
  const fileRef = useRef();

  const [bs, setBs] = useState({
    name:"My Design System",
    primary:"#0f62fe", accent:"#6929c4", danger:"#da1e28",
    success:"#198038", warning:"#f1c21b",
    background:"#ffffff", layer01:"#f4f4f4", layer02:"#ffffff",
    textPrimary:"#161616", textSecondary:"#525252",
    borderSubtle:"#e0e0e0", borderStrong:"#8d8d8d",
    fontFamily:"IBM Plex Sans", baseFontSize:14, typeScale:1.2,
    spacing:8, radius:0, density:"regular",
    selectedComponents: CARBON_COMPONENTS.map(c => c.id),
  });

  const [exportFormat, setExportFormat] = useState("markdown");
  const [copied, setCopied] = useState(false);
  const [catFilter, setCatFilter] = useState("All");
  const [compSearch, setCompSearch] = useState("");

  const upd = (k, v) => setBs(p => ({ ...p, [k]: v }));
  const toggleComp = (id) => setBs(p => ({
    ...p,
    selectedComponents: p.selectedComponents.includes(id)
      ? p.selectedComponents.filter(c => c !== id)
      : [...p.selectedComponents, id],
  }));

  const h = {compact:32,regular:40,comfortable:48}[bs.density];
  const fs = bs.baseFontSize;
  const sc = bs.typeScale;
  const sizes = Array.from({length:5},(_,i) => Math.round(fs * Math.pow(sc, i)));
  const filteredComps = CARBON_COMPONENTS.filter(c =>
    (catFilter === "All" || c.category === catFilter) &&
    c.name.toLowerCase().includes(compSearch.toLowerCase())
  );

  const handleFile = useCallback(async (file) => {
    if (!file) return;
    setUploadFile(file);
    setUploadStage("parsing");
    setAiProcessing(true);
    const isZip  = file.name.toLowerCase().endsWith(".zip");
    const sizeKB = Math.round(file.size / 1024);
    let rawText  = "";
    try { if (!isZip) rawText = await file.text(); } catch(e) {}
    try {
      const prompt = isZip
        ? `A designer uploaded a design system ZIP named "${file.name}" (${sizeKB}KB). Analyze what it likely contains and return ONLY JSON: { "name": string, "type": "zip", "detectedSections": string[], "detectedComponents": string[], "detectedTokens": string[], "missingVsCarbon": string[], "recommendations": string[], "confidence": "high|medium|low" }`
        : `A designer uploaded "${file.name}" (${sizeKB}KB). Content:\n\n${rawText.slice(0,3500)}\n\nAnalyze and return ONLY JSON: { "name": string, "type": string, "detectedSections": string[], "detectedComponents": string[], "detectedTokens": string[], "missingVsCarbon": string[], "recommendations": string[], "confidence": "high|medium|low" }`;
      const res  = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, messages:[{role:"user",content:prompt}] }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text||"").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      setUploadSummary({ ...parsed, fileName:file.name, sizeKB });
      upd("name", parsed.name || file.name.replace(/\.(zip|md|json|css)$/i,"").replace(/[-_]/g," "));
    } catch(e) {
      setUploadSummary({
        name: file.name.replace(/\.(zip|md|json|css)$/i,"").replace(/[-_]/g," "),
        type: isZip ? "zip" : "unknown",
        detectedSections: rawText ? ["Content detected — review manually"] : ["ZIP — contents not readable in browser"],
        detectedComponents:[], detectedTokens:[],
        missingVsCarbon:["Could not auto-detect — review manually"],
        recommendations:["Structure your ZIP with /tokens, /components, /patterns, /guidelines folders and a CLAUDE.md entry point"],
        confidence:"low", fileName:file.name, sizeKB,
      });
    }
    setAiProcessing(false);
    setUploadStage("review");
  }, []);

  const onDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  const exportContent = () => {
    if (exportFormat === "json") return JSON.stringify(buildTokensJSON(bs), null, 2);
    if (exportFormat === "css")  return buildCSS(bs);
    return buildMarkdown(bs);
  };

  const copy = () => { navigator.clipboard.writeText(exportContent()).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  const download = () => {
    const ext = exportFormat === "json" ? "json" : exportFormat === "css" ? "css" : "md";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([exportContent()], {type:"text/plain"}));
    a.download = `${(bs.name||"design-system").toLowerCase().replace(/\s+/g,"-")}.${ext}`;
    a.click();
  };

  return (
    <div style={{ minHeight:"100vh", background:DS.light, fontFamily:"'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } } input[type=range] { accent-color: ${PHASE_COLOR}; }`}</style>

      {/* Top bar — matches all other tools */}
      <div style={{ background:DS.dark, borderBottom:`1px solid #334155`, padding:"16px 40px", display:"flex", alignItems:"center", gap:14 }}>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:PHASE_COLOR, display:"block" }} />
          <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:10, color:PHASE_COLOR, letterSpacing:2, textTransform:"uppercase" }}>Ideate — Design System</span>
        </div>
        <div style={{ width:1, height:16, background:"#334155" }} />
        <span style={{ fontSize:14, fontWeight:600, color:DS.white }}>Design System Builder</span>
        <div style={{ marginLeft:"auto", fontSize:11, color:DS.bodyLight, fontFamily:"'JetBrains Mono', monospace", opacity:0.5 }}>Agentic Product Design Framework</div>
      </div>

      {/* Progress bar */}
      <div style={{ height:2, background:"#334155" }}>
        <div style={{ height:"100%", background:PHASE_COLOR, width: tab==="export" ? "100%" : tab==="bootstrap" ? "66%" : "33%", transition:"width 0.4s ease" }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth:800, margin:"0 auto", padding:"44px 40px" }}>

        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid ${DS.lightBorder}`, marginBottom:32 }}>
          <TabBtn active={tab==="upload"}    onClick={() => setTab("upload")}>Upload Design System</TabBtn>
          <TabBtn active={tab==="bootstrap"} onClick={() => setTab("bootstrap")}>Bootstrap Builder</TabBtn>
          <TabBtn active={tab==="export"}    onClick={() => setTab("export")}>Export for Claude</TabBtn>
        </div>

        {/* ── UPLOAD ── */}
        {tab === "upload" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            {uploadStage === "idle" && (
              <>
                <Card>
                  <SectionLabel>Upload your design system</SectionLabel>
                  <div
                    onClick={() => fileRef.current.click()} onDrop={onDrop} onDragOver={e=>e.preventDefault()}
                    style={{ border:`1.5px dashed ${DS.lightBorder}`, borderRadius:10, padding:"32px 24px", textAlign:"center", cursor:"pointer", transition:"all 0.15s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=PHASE_COLOR; e.currentTarget.style.background=`${PHASE_COLOR}08`; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=DS.lightBorder; e.currentTarget.style.background="transparent"; }}
                  >
                    <div style={{ fontFamily:"'DM Serif Display', serif", fontSize:20, color:"#0F172A", marginBottom:6 }}>Drop your file here</div>
                    <div style={{ fontSize:13, color:DS.bodyDark, marginBottom:16 }}>or click to browse</div>
                    <div style={{ display:"inline-flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
                      {["ZIP (recommended)",".md",".json",".css"].map(f => (
                        <span key={f} style={{ fontSize:11, fontFamily:"'JetBrains Mono', monospace", padding:"3px 10px", background:DS.light, border:`1px solid ${DS.lightBorder}`, borderRadius:6, color:DS.bodyDark }}>{f}</span>
                      ))}
                    </div>
                    <input ref={fileRef} type="file" accept=".zip,.md,.json,.css" style={{ display:"none" }} onChange={e=>handleFile(e.target.files[0])} />
                  </div>
                </Card>

                <Card>
                  <SectionLabel>Recommended ZIP structure</SectionLabel>
                  <p style={{ fontSize:13, color:DS.bodyDark, lineHeight:1.6, margin:"0 0 12px" }}>
                    For best results, structure your ZIP like this. The{" "}
                    <span style={{ fontFamily:"'JetBrains Mono', monospace", fontSize:11, background:DS.light, padding:"1px 6px", borderRadius:4 }}>CLAUDE.md</span>
                    {" "}entry point is the most important file — it is the AI agent starting point.
                  </p>
                  <MonoBlock>{`your-design-system/
├── CLAUDE.md          ← AI agent entry point (required)
├── tokens/
│   ├── color-tokens.md
│   ├── spacing-tokens.md
│   ├── type-tokens.md
│   └── motion-tokens.md
├── components/
│   ├── button.md
│   ├── text-input.md
│   └── modal.md
├── patterns/
│   ├── forms.md
│   └── notifications.md
└── guidelines/
    ├── accessibility.md
    └── typography.md`}</MonoBlock>
                </Card>

                <div style={{ background:DS.dark, borderRadius:12, padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:16 }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:600, color:DS.white, marginBottom:4 }}>Don't have a structured file yet?</div>
                    <div style={{ fontSize:13, color:DS.bodyLight, lineHeight:1.5 }}>Use the Bootstrap Builder to generate a fully structured design system — all 46 Carbon components pre-documented with your tokens.</div>
                  </div>
                  <button onClick={() => setTab("bootstrap")} style={{ background:PHASE_COLOR, color:DS.dark, border:"none", borderRadius:8, padding:"10px 20px", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'DM Sans', sans-serif", whiteSpace:"nowrap" }}>
                    Open Builder →
                  </button>
                </div>
              </>
            )}

            {uploadStage === "parsing" && (
              <Card style={{ textAlign:"center", padding:"48px 24px" }}>
                <div style={{ width:52, height:52, borderRadius:"50%", background:DS.dark, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                  <span style={{ color:PHASE_COLOR, fontFamily:"'JetBrains Mono', monospace", fontSize:16 }}>◈</span>
                </div>
                <div style={{ fontFamily:"'DM Serif Display', serif", fontSize:22, color:"#0F172A", marginBottom:6 }}>
                  {aiProcessing ? "Claude is analyzing your design system..." : "Reading file..."}
                </div>
                <div style={{ fontSize:13, color:DS.bodyDark }}>{uploadFile?.name}</div>
              </Card>
            )}

            {uploadStage === "review" && uploadSummary && (
              <div style={{ animation:"fadeIn 0.3s ease" }}>
                <Card>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
                    <div>
                      <SectionLabel>File analyzed</SectionLabel>
                      <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:24, fontWeight:400, color:"#0F172A", margin:"0 0 4px" }}>{uploadSummary.fileName}</h2>
                      <div style={{ fontSize:12, color:DS.bodyDark, fontFamily:"'JetBrains Mono', monospace" }}>{uploadSummary.sizeKB}KB · {uploadSummary.type?.toUpperCase()}</div>
                    </div>
                    <Badge color={uploadSummary.confidence==="high"?"green":uploadSummary.confidence==="medium"?"amber":"red"}>
                      {uploadSummary.confidence} confidence
                    </Badge>
                  </div>
                  <div style={{ marginBottom:14 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"#0F172A", marginBottom:6 }}>System name</div>
                    <input value={bs.name} onChange={e=>upd("name",e.target.value)}
                      style={{ width:"100%", boxSizing:"border-box", border:`1px solid ${DS.lightBorder}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"'DM Sans', sans-serif", color:"#0F172A", background:DS.white, outline:"none" }}
                      onFocus={e=>e.target.style.borderColor=PHASE_COLOR}
                      onBlur={e=>e.target.style.borderColor=DS.lightBorder} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", textTransform:"uppercase", letterSpacing:2, color:DS.bodyDark, marginBottom:8 }}>Detected sections</div>
                      {(uploadSummary.detectedSections||[]).map(s => (
                        <div key={s} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:5 }}>
                          <span style={{ width:6, height:6, borderRadius:"50%", background:"#22C55E", flexShrink:0, marginTop:4 }} />
                          <span style={{ fontSize:12, color:"#0F172A", lineHeight:1.5 }}>{s}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", textTransform:"uppercase", letterSpacing:2, color:DS.bodyDark, marginBottom:8 }}>Detected components</div>
                      {uploadSummary.detectedComponents?.length
                        ? uploadSummary.detectedComponents.map(s => (
                            <div key={s} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:5 }}>
                              <span style={{ width:6, height:6, borderRadius:"50%", background:PHASE_COLOR, flexShrink:0, marginTop:4 }} />
                              <span style={{ fontSize:12, color:"#0F172A", lineHeight:1.5 }}>{s}</span>
                            </div>
                          ))
                        : <div style={{ fontSize:12, color:DS.bodyDark }}>None auto-detected</div>}
                    </div>
                  </div>
                </Card>

                {uploadSummary.missingVsCarbon?.length > 0 && (
                  <Card style={{ borderColor:"#FDE68A" }}>
                    <SectionLabel>Gaps vs. Carbon structure</SectionLabel>
                    {uploadSummary.missingVsCarbon.map(m => (
                      <div key={m} style={{ display:"flex", gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:12, color:"#D97706" }}>⚠</span>
                        <span style={{ fontSize:12, color:"#0F172A", lineHeight:1.5 }}>{m}</span>
                      </div>
                    ))}
                  </Card>
                )}

                {uploadSummary.recommendations?.length > 0 && (
                  <Card>
                    <SectionLabel>Recommendations</SectionLabel>
                    {uploadSummary.recommendations.map((r,i) => (
                      <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom: i < uploadSummary.recommendations.length-1 ? `1px solid ${DS.lightBorder}` : "none" }}>
                        <span style={{ fontSize:12, color:PHASE_COLOR, fontWeight:600, flexShrink:0, fontFamily:"'JetBrains Mono', monospace" }}>→</span>
                        <span style={{ fontSize:12, color:"#0F172A", lineHeight:1.55 }}>{r}</span>
                      </div>
                    ))}
                  </Card>
                )}

                <div style={{ display:"flex", gap:10, marginTop:4 }}>
                  <PrimaryBtn onClick={() => setTab("export")}>Looks good — Export for Claude →</PrimaryBtn>
                  <GhostBtn onClick={() => { setUploadStage("idle"); setUploadSummary(null); }}>Upload different file</GhostBtn>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── BOOTSTRAP BUILDER ── */}
        {tab === "bootstrap" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:28, fontWeight:400, color:"#0F172A", margin:"0 0 6px" }}>Build your design system</h2>
            <p style={{ fontSize:14, color:DS.bodyDark, margin:"0 0 28px", lineHeight:1.6 }}>Dial in your tokens. All 46 Carbon components will be pre-documented with your values when you export.</p>

            <Card>
              <SectionLabel>System name</SectionLabel>
              <input value={bs.name} onChange={e=>upd("name",e.target.value)} placeholder="My Design System"
                style={{ width:"100%", boxSizing:"border-box", border:`1px solid ${DS.lightBorder}`, borderRadius:8, padding:"9px 12px", fontSize:13, fontFamily:"'DM Sans', sans-serif", color:"#0F172A", background:DS.white, outline:"none" }}
                onFocus={e=>e.target.style.borderColor=PHASE_COLOR} onBlur={e=>e.target.style.borderColor=DS.lightBorder} />
            </Card>

            <Card>
              <SectionLabel>Brand and surface colors</SectionLabel>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0 24px" }}>
                {[
                  ["primary","Primary action"],["accent","Accent / secondary"],["danger","Danger / error"],
                  ["success","Success states"],["warning","Warning states"],
                  ["background","Page background"],["layer01","Layer 01 (container)"],["layer02","Layer 02 (nested)"],
                  ["textPrimary","Text primary"],["textSecondary","Text secondary"],
                  ["borderSubtle","Border subtle"],["borderStrong","Border strong"],
                ].map(([k,label]) => <ColorRow key={k} label={label} value={bs[k]||"#000000"} onChange={v=>upd(k,v)} />)}
              </div>
            </Card>

            <Card>
              <SectionLabel>Typography</SectionLabel>
              <FieldRow label="Font family">
                <DSSelect value={bs.fontFamily} onChange={v=>upd("fontFamily",v)}>
                  {["IBM Plex Sans","Inter","DM Sans","Geist","Helvetica Neue","system-ui"].map(f=><option key={f} value={f}>{f}</option>)}
                </DSSelect>
              </FieldRow>
              <SliderRow label="Base size" min={12} max={18} step={1} value={bs.baseFontSize} onChange={v=>upd("baseFontSize",v)} />
              <FieldRow label="Scale ratio">
                <DSSelect value={bs.typeScale} onChange={v=>upd("typeScale",Number(v))}>
                  <option value={1.125}>Minor second — 1.125</option>
                  <option value={1.200}>Minor third — 1.200</option>
                  <option value={1.250}>Major third — 1.250</option>
                  <option value={1.333}>Perfect fourth — 1.333</option>
                </DSSelect>
              </FieldRow>
              <div style={{ display:"flex", gap:12, alignItems:"baseline", marginTop:12, padding:"12px 0", borderTop:`1px solid ${DS.lightBorder}`, flexWrap:"wrap" }}>
                {sizes.slice(0,5).reverse().map((sz,i) => (
                  <span key={i} style={{ fontSize:sz, fontFamily:`'${bs.fontFamily}', system-ui`, color:"#0F172A", lineHeight:1.1 }}>{sz}px</span>
                ))}
              </div>
            </Card>

            <Card>
              <SectionLabel>Spacing, shape and density</SectionLabel>
              <SliderRow label="Base unit" min={4} max={16} step={4} value={bs.spacing} onChange={v=>upd("spacing",v)} />
              <SliderRow label="Border radius" min={0} max={16} step={2} value={bs.radius} onChange={v=>upd("radius",v)} />
              <FieldRow label="Density">
                <DSSelect value={bs.density} onChange={v=>upd("density",v)}>
                  <option value="compact">Compact — 32px component height</option>
                  <option value="regular">Regular — 40px component height</option>
                  <option value="comfortable">Comfortable — 48px component height</option>
                </DSSelect>
              </FieldRow>
            </Card>

            <Card>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                <SectionLabel>{bs.selectedComponents.length} / {CARBON_COMPONENTS.length} components selected</SectionLabel>
                <div style={{ display:"flex", gap:6 }}>
                  <GhostBtn onClick={()=>upd("selectedComponents",CARBON_COMPONENTS.map(c=>c.id))}>All</GhostBtn>
                  <GhostBtn onClick={()=>upd("selectedComponents",[])}>None</GhostBtn>
                </div>
              </div>
              <input value={compSearch} onChange={e=>setCompSearch(e.target.value)} placeholder="Search components..."
                style={{ width:"100%", boxSizing:"border-box", border:`1px solid ${DS.lightBorder}`, borderRadius:8, padding:"8px 12px", fontSize:12, fontFamily:"'DM Sans', sans-serif", color:"#0F172A", background:DS.white, outline:"none", marginBottom:12 }} />
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
                {CATEGORIES.map(cat => <Chip key={cat} selected={catFilter===cat} onClick={()=>setCatFilter(cat)}>{cat}</Chip>)}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(172px, 1fr))", gap:6 }}>
                {filteredComps.map(c => {
                  const sel = bs.selectedComponents.includes(c.id);
                  return (
                    <div key={c.id} onClick={()=>toggleComp(c.id)} style={{ padding:"10px 12px", borderRadius:8, cursor:"pointer", border:`${sel?"1.5px":"1px"} solid ${sel?PHASE_COLOR:DS.lightBorder}`, background:sel?`${PHASE_COLOR}10`:DS.white, transition:"all 0.12s" }}>
                      <div style={{ fontSize:12, fontWeight:600, color:sel?PHASE_COLOR:"#0F172A" }}>{c.name}</div>
                      <div style={{ fontSize:10, color:DS.bodyDark, marginTop:2, fontFamily:"'JetBrains Mono', monospace" }}>{c.category}</div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card>
              <SectionLabel>Live preview</SectionLabel>
              <div style={{ background:bs.background, borderRadius:bs.radius, padding:bs.spacing*2, border:`1px solid ${bs.borderSubtle}`, fontFamily:`'${bs.fontFamily}', system-ui` }}>
                {sizes.slice(0,3).reverse().map((sz,i) => (
                  <div key={i} style={{ fontSize:sz, color:bs.textPrimary, lineHeight:1.25, marginBottom:4 }}>
                    {["Heading","Subheading","Body"][i]} — {sz}px
                  </div>
                ))}
                <div style={{ fontSize:fs, color:bs.textSecondary, lineHeight:1.6 }}>Secondary text — descriptions and captions.</div>
                <div style={{ height:1, background:bs.borderSubtle, margin:`${bs.spacing}px 0` }} />
                <div style={{ display:"flex", gap:bs.spacing/2, flexWrap:"wrap", marginBottom:bs.spacing }}>
                  {[{label:"Primary",bg:bs.primary,color:"#fff",border:bs.primary},{label:"Secondary",bg:"transparent",color:bs.primary,border:bs.primary},{label:"Accent",bg:bs.accent,color:"#fff",border:bs.accent},{label:"Danger",bg:bs.danger,color:"#fff",border:bs.danger}].map(({label,bg,color,border})=>(
                    <button key={label} style={{ height:h, padding:`0 ${bs.spacing*2}px`, background:bg, color, border:`1px solid ${border}`, borderRadius:bs.radius, fontSize:fs, cursor:"pointer", fontFamily:"inherit" }}>{label}</button>
                  ))}
                </div>
                <div style={{ marginBottom:bs.spacing }}>
                  <div style={{ fontSize:Math.round(fs*0.85), color:bs.textSecondary, marginBottom:4 }}>Input label</div>
                  <input readOnly placeholder="Placeholder text..." style={{ height:h, width:"100%", padding:`0 ${bs.spacing}px`, border:`1px solid ${bs.borderStrong}`, borderRadius:bs.radius, fontSize:fs, background:bs.layer01, color:bs.textPrimary, fontFamily:"inherit", boxSizing:"border-box", outline:"none" }} />
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {[["Default",bs.layer01,bs.textSecondary],["Primary",`${bs.primary}22`,bs.primary],["Success",`${bs.success}22`,bs.success],["Warning",`${bs.warning}33`,bs.warning],["Error",`${bs.danger}22`,bs.danger]].map(([label,bg,color])=>(
                    <span key={label} style={{ padding:`2px ${bs.spacing}px`, borderRadius:Math.max(bs.radius,12), background:bg, color, fontSize:Math.round(fs*0.8) }}>{label}</span>
                  ))}
                </div>
              </div>
            </Card>

            <PrimaryBtn onClick={() => setTab("export")}>Export for Claude →</PrimaryBtn>
          </div>
        )}

        {/* ── EXPORT ── */}
        {tab === "export" && (
          <div style={{ animation:"fadeIn 0.3s ease" }}>
            <h2 style={{ fontFamily:"'DM Serif Display', serif", fontSize:28, fontWeight:400, color:"#0F172A", margin:"0 0 6px" }}>Export for Claude</h2>
            <p style={{ fontSize:14, color:DS.bodyDark, margin:"0 0 28px", lineHeight:1.6 }}>Paste the Markdown export into a Claude Project system prompt and Claude will have full design system knowledge instantly — tokens, components, rules — no back-and-forth needed.</p>

            <Card>
              <SectionLabel>Export format</SectionLabel>
              <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
                {[["markdown","CLAUDE.md (recommended)"],["json","tokens.json"],["css","tokens.css"]].map(([f,label]) => (
                  <Chip key={f} selected={exportFormat===f} onClick={()=>setExportFormat(f)}>{label}</Chip>
                ))}
              </div>
              <div style={{ fontSize:12, color:DS.bodyDark, lineHeight:1.6, marginBottom:14, padding:"10px 14px", background:DS.light, borderRadius:8, borderLeft:`3px solid ${PHASE_COLOR}` }}>
                {exportFormat==="markdown" && "Full structured CLAUDE.md — foundations, all selected components documented, patterns, accessibility rules, and Figma MCP binding notes. Paste into a Claude Project system prompt."}
                {exportFormat==="json" && "Token values as structured JSON — compatible with Style Dictionary, Theo, and custom build pipelines."}
                {exportFormat==="css" && "CSS custom properties — drop into any codebase and reference via var(--color-primary) etc."}
              </div>
              <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginBottom:8 }}>
                <GhostBtn onClick={copy}>{copied ? "✓ Copied" : "Copy"}</GhostBtn>
                <PrimaryBtn onClick={download}>Download ↓</PrimaryBtn>
              </div>
              <MonoBlock>{exportContent()}</MonoBlock>
            </Card>

            <div style={{ background:DS.dark, borderRadius:12, padding:"24px 26px" }}>
              <div style={{ fontSize:10, fontFamily:"'JetBrains Mono', monospace", textTransform:"uppercase", letterSpacing:3, color:PHASE_COLOR, marginBottom:18 }}>How to use with Claude</div>
              {[
                ["01","Copy the Markdown export above","This is your CLAUDE.md — the AI agent entry point for your design system."],
                ["02","Paste into a Claude Project system prompt","Go to Project Instructions and paste. Claude now has full token and component context for every conversation."],
                ["03","Or upload alongside your design files","Start a conversation, attach CLAUDE.md, and begin designing. No back-and-forth on token values."],
                ["04","Design in Figma via MCP","Claude knows every token, every component rule, every spacing value. Ask it to build in Figma with no guessing."],
              ].map(([n,title,desc]) => (
                <div key={n} style={{ display:"flex", gap:14, marginBottom:16, alignItems:"flex-start" }}>
                  <div style={{ width:26, height:26, borderRadius:"50%", background:`${PHASE_COLOR}22`, border:`1px solid ${PHASE_COLOR}44`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:PHASE_COLOR, fontFamily:"'JetBrains Mono', monospace" }}>{n}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:DS.white, marginBottom:2 }}>{title}</div>
                    <div style={{ fontSize:12, color:DS.bodyLight, lineHeight:1.55 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
