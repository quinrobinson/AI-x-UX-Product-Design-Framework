# Figma Placement Spec — Kickoff Prompt on AI Toolkit Page

## Target
**File:** Agentic Design Process Template (`mrHuD7sY7h6uKSVndTSIQE`)
**Page:** `08 — AI Toolkit`
**Position:** Top of page — the first frame a designer sees when landing on this page

---

## Frame: `Kickoff Prompt`

### Layout
- **Width:** 960px (matches other content frames on this page)
- **Padding:** 40px all sides
- **Corner radius:** 12px
- **Background:** `#0F172A` (dark — this frame should stand out as the entry point)
- **Border:** 1px solid `#334155`

### Header block (inside frame, top)
- **Label:** `START HERE` — JetBrains Mono, 10px, `#14B8A6` (Deliver teal — represents the full arc), letter-spacing 3px, uppercase
- **Headline:** `Kickoff Prompt` — DM Serif Display, 28px, `#F8FAFC`
- **Subheading:** `Paste this into Claude before uploading any skill file. It orients Claude to the full framework and routes you to the right starting point.` — DM Sans, 14px, `#94A3B8`, line-height 1.6

### Prompt block (code frame)
- **Background:** `#1E293B`
- **Border:** 1px solid `#334155`
- **Corner radius:** 8px
- **Padding:** 24px
- **Font:** JetBrains Mono, 12px, `#94A3B8`, line-height 1.7
- **Content:** Full Kickoff Prompt text (see below)

### Phase routing legend (below prompt block)
A compact 2-column grid showing how answers map to skill files:

| Phase | Skill Files |
|-------|------------|
| Discover | user-research.md · competitive-analysis.md |
| Define | problem-framing.md |
| Ideate | concept-generation.md · visual-design-execution.md |
| Prototype | prototyping.md · accessibility-audit.md |
| Validate | usability-testing.md |
| Deliver | design-delivery.md |

- Each phase label uses its phase color (text only, no fill backgrounds)
- Skill file names in JetBrains Mono, 11px, `#64748B`
- Row background alternates: `#1E293B` / `#0F172A`

### Footer strip
- **Left:** `→ After Claude responds, upload the recommended skill file to the same conversation.`
- **Right:** Link label `skills/README.md` in teal (`#14B8A6`), pointing to the GitHub skills README
- DM Sans, 12px, `#64748B`

---

## Prompt content (exact copy for the frame)

```
You are a UX design assistant trained on the Agentic Product Design Framework —
a six-phase system (Discover → Define → Ideate → Prototype → Validate → Deliver)
with structured skill files, Figma templates, and AI-ready prompts for each phase.

The six phases and their skill files are:
- Discover → user-research.md, competitive-analysis.md
- Define → problem-framing.md
- Ideate → concept-generation.md, visual-design-execution.md
- Prototype → prototyping.md, accessibility-audit.md
- Validate → usability-testing.md
- Deliver → design-delivery.md
- Cross-phase → design-systems.md, figma-playbook.md

I'm starting a new design project and need help getting oriented.
Please ask me the following four questions (all at once is fine):

1. What type of project is this?
   (e.g., new product, feature addition, redesign, internal tool, client work)

2. What phase are you entering?
   (Discover / Define / Ideate / Prototype / Validate / Deliver — or "not sure")

3. What do you have so far?
   (nothing yet / a brief / a brief + research / existing designs)

4. Are you working solo or with a team?

Based on my answers, respond with:
- Recommended starting phase and a one-sentence reason why
- The specific skill file to upload next (exact filename)
- A suggested first deliverable — specific, not a category
- One prompt I can use right now, before uploading anything, to get started
```

---

## Page-level positioning

This `Kickoff Prompt` frame should sit at **Y: 80px** from the top of the page canvas, with a **section label** above it:

- Label: `01 — Entry Point` — JetBrains Mono, 10px, `#64748B`, uppercase, letter-spacing 2px
- Gap between label and frame: 12px

All existing AI Toolkit frames (phase-specific prompts, tool references) shift down below this block. Suggested Y offset for the next section: **Y: 80 + frame height + 64px gap**.

---

## Interaction note

If the Figma file uses interactive components or a prototype flow, this frame does **not** need a prototype connection. It's a reference/copy artifact, not a navigational element. The CTA is implicit: copy → paste into Claude → return to Figma to continue.
