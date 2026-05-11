# Agentic Design Process — Skills Library

A collection of Claude skills for every phase of the product design process. Each skill provides structured workflows, templates, and quality checklists that can be used directly with Claude or as reference documentation for your design practice.

## Skills by Phase

### 01 — Discover
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| User Research | `01-discover/user-research.md` | Chat | Synthesize raw research into structured insights, plan studies, create interview guides |
| Competitive Analysis | `01-discover/competitive-analysis.md` | Chat | Map competitive landscapes, benchmark features, identify differentiation opportunities |

### 02 — Define
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| Problem Framing | `02-define/problem-framing.md` | Chat | Frame problems with HMW/JTBD/user stories, journey mapping, requirements prioritization |

### 03 — Ideate
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| Concept Generation | `03-ideate/concept-generation.md` | Chat | Five-Direction concepts, UI patterns, visual system directions, chart type selection |
| Concept Proof | `03-ideate/concept-proof.md` | Chat | Figma Make prompts that turn concept cards into throwaway interactive prototypes for tangible concept selection |
| Visual Design Execution | `03-ideate/visual-design-execution.md` | Chat | Style selection, semantic color tokens, typography, spacing, motion, icon standards, design system instantiation via Figma Make + MCP |

### 04 — Prototype
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| Prototyping | `04-prototype/prototyping.md` | Chat + Code | Functional prototypes, touch targets, interaction timing, gesture safety, platform QA |
| Accessibility Audit | `04-prototype/accessibility-audit.md` | Chat | WCAG 2.1 AA audit: web, iOS VoiceOver, Android TalkBack, touch, forms |

### 05 — Validate
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| Usability Testing | `05-validate/usability-testing.md` | Chat | Plan tests, write scenarios, analyze results, heuristic evaluations |

### 06 — Deliver
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| Design Delivery | `06-deliver/design-delivery.md` | Chat + Code | Component specs, iOS/Android/Web handoff packages, DDRs, release notes |
| Design System Audit | `06-deliver/design-system-audit.md` | Chat | Pre-handoff design system validation against M3, Atlassian, Carbon, and Apple HIG |

### Cross-Phase
| Skill | File | Surface | Description |
|-------|------|---------|-------------|
| **Which Claude?** | `which-claude.md` | — | **START HERE** — Routes every task to the right Claude surface: Chat, Cowork, or Code |
| Design Systems | `design-systems.md` | Chat + Code | Design system audit & M3 token documentation — cross-system comparison, Figma variable setup |
| Figma Playbook | `figma-playbook.md` | Code + Figma MCP | Execute design work directly in Figma via MCP — patterns for every phase |
| Phase Handoff | `phase-handoff.md` | Chat | Skill chaining guide: generate close-of-phase summaries that become opening context for the next phase |
| Skill Chaining | `skill-chaining.md` | Chat | Chains all six phases into one continuous AI-assisted workflow using handoff blocks |

---

## Quick Start — Kickoff Prompt

**Don't know which skill file to upload first?** Paste this into a new Claude conversation. Claude will orient itself to the framework and tell you exactly where to begin.

```
You are a UX design assistant trained on the Agentic Product Design Framework —
a six-phase system (Discover → Define → Ideate → Prototype → Validate → Deliver)
with structured skill files and AI-ready prompts for each phase.

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

After Claude responds, upload the recommended skill file to the same conversation and continue from there.

---

## How to Use

### With Claude
1. Upload a skill file or paste its contents into your conversation
2. Describe your project context and what you need
3. Claude will follow the skill's workflow and output templates

### In Your Repo
```
skills/
├── README.md
├── design-systems.md
├── figma-playbook.md
├── 01-discover/
│   ├── user-research.md
│   └── competitive-analysis.md
├── 02-define/
│   └── problem-framing.md
├── 03-ideate/
│   ├── concept-generation.md
│   ├── concept-proof.md            ← NEW
│   └── visual-design-execution.md
├── 04-prototype/
│   ├── prototyping.md
│   └── accessibility-audit.md      ← NEW
├── 05-validate/
│   └── usability-testing.md
└── 06-deliver/
    └── design-delivery.md
```

## AI Leverage Levels

- **High** — AI handles the heavy lifting (synthesis, generation, documentation). You review, refine, and direct.
- **Medium** — AI assists with structure and drafts. You bring judgment, context, and strategic thinking.
- **Low** — Fundamentally human skills (empathy, taste, stakeholder navigation). AI can support but not replace.

## Contributing

To add or modify skills:
1. Follow the frontmatter format (`name`, `phase`, `description`, `ai_leverage`)
2. Include structured templates with clear placeholders
3. Add a quality checklist at the end of every skill
4. Keep skills actionable — workflows, not theory
