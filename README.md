# Agentic Product Design Framework

A scalable, AI-integrated framework for product and UX design — from research through delivery. Built as a living system that evolves with your practice and scales with any project.

## Live Website

The interactive tools are deployed as a website via GitHub Pages:

**[quinrobinson.github.io/Agentic-Product-Design-Framework](https://quinrobinson.github.io/Agentic-Product-Design-Framework)**

No install needed — open in any browser and share the URL with your team.

---

## How It Works

The framework is built around six phases — **Discover → Define → Ideate → Prototype → Validate → Deliver** — each backed by a structured skill file you upload to Claude.

1. **Pick your phase** — Start where your project is right now, or use the Kickoff Prompt below to get oriented
2. **Upload a skill file** — Drop the relevant `.md` file into a Claude conversation to activate phase-specific workflows, templates, and quality checklists
3. **Do the work** — Claude follows structured outputs; you review, direct, and decide
4. **Start designing** — Open any phase and create. Research, concepts, wireframes, specs — the framework meets you where you are. Use the Phase Handoff Block at the end of each phase to carry full context into the next conversation.

The [live site](https://quinrobinson.github.io/Agentic-Product-Design-Framework) has interactive tools for exploring the system, previewing design tokens, and auditing design systems. The [Figma template](https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE) gives you a dedicated workspace per project.

---

## Before You Start

- **Claude access** — A claude.ai account (free tier works; Pro recommended for longer sessions)
- **Figma** — Optional but recommended. For MCP integration (Claude working directly in Figma), you'll need Claude Desktop + the Figma desktop app
- **The Figma template** — [Duplicate it here](https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE) and fill in the Cover page with your project details
- **Skill files** — Available in `/skills`. Upload whichever phase you're starting in — or use the Kickoff Prompt below if you're not sure

---

## Claude Code Setup (MCP + Automation)

Claude Chat with a skill file gets you 80% of the framework. Claude Code with the MCP server gets you the rest — autonomous phase execution, automatic artifact persistence, and context injection across sessions.

**Three steps:**

```bash
# 1. Build the MCP server
cd mcp && npm install && npm run build && cd ..

# 2. Set up your project context
cp .apdf/context.json.example .apdf/context.json
# Fill in project_name, phase, persona, problem_statement

# 3. Make hooks executable
chmod +x .claude/hooks/*.sh
```

The `.claude/settings.json` already points Claude Code at `./mcp/dist/index.js` and wires up the four hooks. Once the server is built and `context.json` is filled in, open Claude Code in this directory — the 18 APDF tools will appear automatically and hooks will fire on every tool call.

### `.apdf/context.json` — Project Context Schema

Copy from `.apdf/context.json.example` and fill in before using MCP tools. The `inject-context.sh` hook injects this into every `mcp__apdf__*` tool call automatically.

| Field | Description |
|-------|-------------|
| `project_name` | Project identifier — used in artifact filenames and handoff blocks |
| `phase` | Current phase: `"01"` through `"06"` (or the phase name, e.g. `"Discover"`) |
| `persona` | Primary user persona — Claude references this when generating prompts |
| `problem_statement` | The core design problem being solved |
| `constraints` | Timeline, technical, business, or platform constraints |
| `open_questions` | What the team still needs to answer — focuses Claude's attention |
| `last_handoff` | Paste the Phase Handoff Block from the previous phase to carry context across sessions |

All fields are strings. Leave fields blank if not yet known — the hooks handle partial context gracefully.

See [`/mcp/README.md`](./mcp/README.md) for the full tool reference, verification steps, and troubleshooting.

---

## Kickoff Prompt

**Not sure where to start? Paste this into a new Claude conversation.**

No skill file needed yet — Claude will orient itself to the framework, ask you four questions, and tell you exactly where to start and what to do first.

```
You are a UX design assistant trained on the Agentic Product Design Framework —
a six-phase system (Discover → Define → Ideate → Prototype → Validate → Deliver)
with structured skill files, Figma templates, and AI-ready prompts for each phase.

The six phases and their skill files are:
- Discover → research-planning.md, research-synthesis.md, competitive-analysis.md, service-blueprint.md, insight-framing.md
- Define → problem-framing.md, journey-mapping.md, persona-creation.md, assumption-mapping.md, requirements-prioritization.md
- Ideate → concept-generation.md, concept-proof.md, visual-design-execution.md, concept-critique.md, idea-clustering.md, storyboarding.md
- Prototype → prototyping.md, user-flow-mapping.md, ux-copy-writing.md, prototype-scoping.md, heuristic-review.md, test-script-drafting.md, accessibility-audit.md
- Validate → usability-testing.md, usability-findings-synthesis.md, insight-report.md, recruitment-screener.md, stakeholder-presentation.md, iteration-brief.md
- Deliver → design-delivery.md, component-specs.md, design-qa.md, handoff-annotation.md, accessibility-annotation.md, design-decision-record.md, design-system-audit.md
- Cross-phase → design-systems.md, figma-playbook.md, phase-handoff.md, skill-chaining.md, which-claude.md

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

> **Also in Figma:** The Kickoff Prompt lives on the **AI Toolkit page** of the [Figma template](https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE) — the first block on that page. Duplicate the template per project and it's always one click away.

---

## What's Inside

### `/skills` — Claude Skill Files

43 structured `.md` skill files — organized by phase, covering the full design lifecycle from research through delivery. Browse, preview, and download from the [Skills Library](https://quinrobinson.github.io/Agentic-Product-Design-Framework) on the live site.

| Phase | Skills | Files |
|-------|--------|-------|
| 01 — Discover | 5 | `research-planning.md`, `research-synthesis.md`, `competitive-analysis.md`, `service-blueprint.md`, `insight-framing.md` |
| 02 — Define | 5 | `problem-framing.md`, `journey-mapping.md`, `persona-creation.md`, `assumption-mapping.md`, `requirements-prioritization.md` |
| 03 — Ideate | 6 | `concept-generation.md`, `concept-proof.md`, `visual-design-execution.md`, `concept-critique.md`, `idea-clustering.md`, `storyboarding.md` |
| 04 — Prototype | 7 | `prototyping.md`, `accessibility-audit.md`, `user-flow-mapping.md`, `ux-copy-writing.md`, `prototype-scoping.md`, `heuristic-review.md`, `test-script-drafting.md` |
| 05 — Validate | 6 | `usability-testing.md`, `usability-findings-synthesis.md`, `insight-report.md`, `recruitment-screener.md`, `stakeholder-presentation.md`, `iteration-brief.md` |
| 06 — Deliver | 7 | `design-delivery.md`, `component-specs.md`, `design-qa.md`, `handoff-annotation.md`, `accessibility-annotation.md`, `design-decision-record.md`, `design-system-audit.md` |
| Cross-phase | 7 | `design-systems.md`, `figma-playbook.md`, `figma-ds-export.md`, `figma-ds-audit.md`, `phase-handoff.md`, `skill-chaining.md`, `which-claude.md` |

### `/.claude/agents` — Specialist Agents

Six pre-configured Claude agents, each scoped to a role in the design process. Available in Claude Code as subagents (auto-spawned by the Orchestrator) or in any Claude conversation by uploading the agent file.

| Agent | File | Primary Surface | When to Invoke |
|-------|------|----------------|----------------|
| **Orchestrator** | `orchestrator.md` | Code + Chat | Start of a project, phase transitions, or when you're not sure which agent to use. Spawns specialist agents in Claude Code. |
| **Researcher** | `researcher.md` | Chat | Any research activity — planning a study, synthesizing transcripts, competitive analysis, or findings reports. |
| **Strategist** | `strategist.md` | Chat | Translating research into problem frames, journey maps, personas, and stakeholder presentations. |
| **Designer** | `designer.md` | Chat | Concept generation, idea clustering, flow mapping, UX copy, and concept proofs. |
| **Systems Designer** | `systems-designer.md` | Code | Component architecture, token systems, design system audits, and Figma variable scaffolding. |
| **Design Engineer** | `design-engineer.md` | Code + Cowork | Handoff docs, design QA, accessibility annotations, and building component code from specs. |

**In Claude Code:** The Orchestrator auto-spawns agents based on phase. Run `/kickoff`, `/discover`, or `/deliver` to trigger autonomous phase execution. Requires `.apdf/context.json` to be filled in first.

**In Claude Chat or any conversation:** Upload the agent's `.md` file, or copy the activation prompt from the [Agents page](https://quinrobinson.github.io/Agentic-Product-Design-Framework) on the live site.

### `/artifacts` — Interactive React Components & Onboarding Deck

Five JSX artifacts that render as interactive tools, plus a team onboarding presentation:

- **`design-process-system.jsx`** — Clickable phase-by-phase system with AI prompts, skill docs, templates, and tool recommendations per phase
- **`design-tokens-system.jsx`** — Universal starter design system with tunable tokens, live component previews, presets, and AI-powered customization export
- **`design-system-checklist.jsx`** — Comprehensive audit checklist synthesized from Material Design 3, Atlassian, IBM Carbon, and Apple HIG — with Figma-ready prompts per item
- **`m3-token-reference.jsx`** — Interactive M3 token documentation for Button, Card, Text Field, and Navigation Bar — covers color roles, elevation, shape, typography, and spacing with Figma variable spec prompts
- **`onboarding-deck.pptx`** — 18-slide team onboarding presentation covering the framework's value, structure, and step-by-step setup. Designed to match the Figma Cover aesthetic: dark/light slide balance, phase colors (01–06) used consistently throughout.

### Figma Template

**[Agentic Design Process Template](https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE)** — A 10-page Figma file you duplicate per project:
- Cover with project metadata
- Process Map overview
- 6 phase workspace pages (Discover → Deliver) with structured sections
- Design System token reference
- AI Toolkit with copy-ready prompts and skill file references

---

## The Design Process

```
Discover → Define → Ideate → Prototype → Validate → Deliver
   ↑                                              |
   └──────────── Iterate as needed ←──────────────┘
```

---

## AI Leverage Levels

Each skill is tagged with an AI leverage level:

- **High** — AI handles the heavy lifting (synthesis, generation, documentation). You review, refine, and direct.
- **Medium** — AI assists with structure and drafts. You bring judgment, context, and strategic thinking.
- **Low** — Fundamentally human skills (empathy, taste, stakeholder navigation). AI supports but doesn't replace.

## Contributing

To add or modify skills:
1. Follow the frontmatter format (`name`, `phase`, `description`, `ai_leverage`)
2. Include structured templates with clear `[PLACEHOLDERS]`
3. Add a quality checklist at the end of every skill
4. Keep skills actionable — workflows, not theory

## License

MIT
