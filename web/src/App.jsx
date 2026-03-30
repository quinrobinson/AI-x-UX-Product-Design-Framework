import { useState, useEffect } from "react";
import DesignProcessSystem from "./DesignProcessSystem";
import UniversalDesignSystem from "./DesignTokensSystem";
import DesignSystemChecklist from "./DesignSystemChecklist";
import M3TokenReference from "./M3TokenReference";

// ── Design System Tokens (from Onboarding Deck) ────────────────────────────
const DS = {
  dark: "#0F172A",
  darkCard: "#1E293B",
  darkBorder: "#334155",
  white: "#FFFFFF",
  bodyLight: "#94A3B8",
  bodyDark: "#64748B",
  light: "#F8FAFC",
  lightCard: "#FFFFFF",
  lightBorder: "#E2E8F0",
  phases: {
    "01": { color: "#22C55E", bg: "#052E16", label: "Discover" },
    "02": { color: "#8B5CF6", bg: "#2E1065", label: "Define" },
    "03": { color: "#F59E0B", bg: "#2D1A00", label: "Ideate" },
    "04": { color: "#3B82F6", bg: "#0C1A40", label: "Prototype" },
    "05": { color: "#EF4444", bg: "#2D0A0A", label: "Validate" },
    "06": { color: "#14B8A6", bg: "#042F2E", label: "Deliver" },
  },
};

const TOOLS = [
  {
    id: "process",
    number: "01",
    phase: "01",
    primary: true,
    name: "Design Process System",
    subtitle: "Start here — the core framework",
    description: "Six-phase design process with AI prompts, skill docs, Figma playbook actions, templates, and tool recommendations. The entry point for every project.",
    tags: ["All phases", "AI prompts", "11 skills"],
    component: DesignProcessSystem,
  },
  {
    id: "tokens",
    number: "02",
    phase: "03",
    name: "Design Tokens System",
    subtitle: "Universal starter design system",
    description: "Live token editor with presets, component previews, system audit against Material/Atlassian/Carbon/HIG, and CSS export.",
    tags: ["Ideate", "Design system", "Live preview"],
    component: UniversalDesignSystem,
  },
  {
    id: "checklist",
    number: "03",
    phase: "06",
    name: "Design System Checklist",
    subtitle: "Audit against 4 major design systems",
    description: "Interactive audit checklist synthesized from Material Design 3, Atlassian, IBM Carbon, and Apple HIG — with Figma-ready prompts per item.",
    tags: ["Deliver", "Audit", "Figma prompts"],
    component: DesignSystemChecklist,
  },
  {
    id: "m3",
    number: "04",
    phase: "06",
    name: "M3 Token Reference",
    subtitle: "Material Design 3 token documentation",
    description: "Interactive token docs for Button, Card, Text Field, and Navigation Bar — color roles, elevation, shape, typography, and spacing.",
    tags: ["Deliver", "M3 tokens", "Figma variables"],
    component: M3TokenReference,
  },
];

const SKILL_META = {
  "user-research.md": {
    leverage: "high",
    desc: "Turns raw interview transcripts, surveys, and analytics into a structured research brief — themes, pain points, unmet needs, and recommendations your team can act on.",
  },
  "competitive-analysis.md": {
    leverage: "high",
    desc: "Maps your competitive landscape across direct, indirect, and aspirational competitors — UX patterns, strengths, gaps, and differentiation opportunities in one structured output.",
  },
  "problem-framing.md": {
    leverage: "medium",
    desc: "Converts fuzzy research into a sharp problem statement using HMW, JTBD, and user story framings — with assumptions surfaced and a prioritized requirements roadmap.",
  },
  "concept-generation.md": {
    leverage: "high",
    desc: "Generates five concept directions from conventional to moonshot, with chart type recommendations, UI pattern suggestions, and visual system scaffolding ready to paste into the Design Tokens tool.",
  },
  "visual-design-execution.md": {
    leverage: "high",
    desc: "Selects a visual style, builds a semantic color token architecture with light/dark pairing, defines type scale and spacing, and specifies motion timing and icon standards.",
  },
  "prototyping.md": {
    leverage: "high",
    desc: "Builds functional React or HTML prototypes with correct touch targets, interaction timing, gesture safety, UX copy, and a pre-delivery QA checklist across iOS, Android, and web.",
  },
  "accessibility-audit.md": {
    leverage: "high",
    desc: "Runs a systematic WCAG 2.1 AA audit — color contrast, keyboard navigation, focus management, screen reader behavior, and touch targets — with severity-ranked issues and specific fixes.",
  },
  "usability-testing.md": {
    leverage: "high",
    desc: "Plans moderated and unmoderated tests, writes non-leading task scenarios, and synthesizes raw session notes into a severity-ranked findings report with actionable recommendations.",
  },
  "design-delivery.md": {
    leverage: "high",
    desc: "Produces component specs, platform-specific handoff packages for iOS/Android/Web, design decision records, and release notes — everything a developer needs to build it right.",
  },
  "design-systems.md": {
    leverage: "high",
    desc: "Audits any product against Material Design 3, Atlassian, IBM Carbon, and Apple HIG — then documents tokens using M3 naming conventions and sets up Figma variable collections.",
  },
  "figma-playbook.md": {
    leverage: "high",
    desc: "Gives Claude step-by-step Figma MCP execution patterns for every phase — research boards, journey maps, wireframes, components, spec annotations, and decision records in your file.",
  },
  "phase-handoff.md": {
    leverage: "high",
    desc: "Generates a structured handoff block at the close of each phase that you paste into the next conversation — so Claude carries full project context across all six phases without re-briefing.",
  },
  "skill-chaining.md": {
    leverage: "high",
    desc: "Chains all six phases into one continuous AI-assisted workflow using handoff blocks — turning separate Claude conversations into a single thread from research through delivery.",
  },
};

const SKILLS = [
  { phase: "01", dir: "01-discover", files: ["user-research.md", "competitive-analysis.md"] },
  { phase: "02", dir: "02-define", files: ["problem-framing.md"] },
  { phase: "03", dir: "03-ideate", files: ["concept-generation.md", "visual-design-execution.md"] },
  { phase: "04", dir: "04-prototype", files: ["prototyping.md", "accessibility-audit.md"] },
  { phase: "05", dir: "05-validate", files: ["usability-testing.md"] },
  { phase: "06", dir: "06-deliver", files: ["design-delivery.md"] },
  { phase: null, dir: "", files: ["design-systems.md", "figma-playbook.md", "phase-handoff.md", "skill-chaining.md"] },
];

const REPO = "https://github.com/quinrobinson/AI-x-UX-Product-Design-Framework";
const FIGMA_URL = "https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE";
const PPTX_URL = `${REPO}/raw/main/artifacts/onboarding-deck.pptx`;

function PhaseChip({ phaseKey, small }) {
  const p = DS.phases[phaseKey];
  if (!p) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: p.bg, border: `1px solid ${p.color}30`, borderRadius: 999,
      padding: small ? "2px 8px" : "4px 12px",
      fontSize: small ? 10 : 11, fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500, color: p.color, whiteSpace: "nowrap",
    }}>
      <span style={{ width: small ? 5 : 6, height: small ? 5 : 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
      {phaseKey} — {p.label}
    </span>
  );
}

function ToolCard({ tool, onClick }) {
  const [hovered, setHovered] = useState(false);
  const p = DS.phases[tool.phase];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", width: "100%",
        background: DS.white,
        border: `1px solid ${hovered ? p.color + "88" : DS.lightBorder}`,
        borderRadius: 16, padding: "28px", cursor: "pointer", textAlign: "left",
        transition: "all 0.2s ease", outline: "none",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 12px 32px ${p.color}14` : "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
        {/* Light-mode phase chip — colored border + text, no dark bg */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          background: "transparent", border: `1px solid ${p.color}55`, borderRadius: 999,
          padding: "4px 12px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 500, color: p.color, whiteSpace: "nowrap",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
          {tool.phase} — {p.label}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: DS.bodyDark, opacity: 0.5 }}>{tool.number} / 04</span>
      </div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontWeight: 400, color: "#0F172A", marginBottom: 8, lineHeight: 1.2 }}>{tool.name}</div>
      <div style={{ fontSize: 12, color: p.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 14 }}>{tool.subtitle}</div>
      <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.65, marginBottom: 20 }}>{tool.description}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {tool.tags.map(tag => (
          <span key={tag} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "transparent", color: p.color, fontWeight: 500, border: `1px solid ${p.color}55` }}>{tag}</span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: p.color, fontSize: 13, fontWeight: 500, opacity: hovered ? 1 : 0.4, transition: "opacity 0.2s ease" }}>
        Open tool
        <span style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.2s ease", display: "inline-block" }}>→</span>
      </div>
    </button>
  );
}

function PrimaryToolCard({ tool, onClick }) {
  const [hovered, setHovered] = useState(false);
  const p = DS.phases[tool.phase];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", width: "100%",
        background: DS.white,
        border: `1px solid ${hovered ? p.color + "88" : p.color + "44"}`,
        borderRadius: 16, padding: "32px 36px", cursor: "pointer", textAlign: "left",
        transition: "all 0.2s ease", outline: "none",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? `0 16px 40px ${p.color}16` : `0 2px 8px ${p.color}0a`,
        marginBottom: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 40 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "transparent", border: `1px solid ${p.color}55`, borderRadius: 999,
              padding: "4px 12px", fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 500, color: p.color,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
              {tool.phase} — {p.label}
            </span>
            <span style={{
              fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
              background: `${p.color}12`, border: `1px solid ${p.color}40`,
              color: p.color, padding: "3px 10px", borderRadius: 999, fontWeight: 500,
            }}>
              Entry point
            </span>
          </div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#0F172A", marginBottom: 10, lineHeight: 1.15 }}>
            {tool.name}
          </div>
          <div style={{ fontSize: 14, color: DS.bodyDark, lineHeight: 1.7, marginBottom: 20, maxWidth: 480 }}>
            {tool.description}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tool.tags.map(tag => (
              <span key={tag} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "transparent", color: p.color, fontWeight: 500, border: `1px solid ${p.color}55` }}>{tag}</span>
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8, color: p.color, fontSize: 13, fontWeight: 500, opacity: hovered ? 1 : 0.4, transition: "opacity 0.2s ease" }}>
            Open tool
            <span style={{ transform: hovered ? "translateX(4px)" : "none", transition: "transform 0.2s ease", display: "inline-block" }}>→</span>
          </div>
        </div>
        <div style={{ flexShrink: 0, width: 220, background: DS.light, borderRadius: 12, padding: "20px 22px", border: `1px solid ${DS.lightBorder}` }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 14 }}>How to use</div>
          {[
            { n: "1", text: "Select a design phase" },
            { n: "2", text: "Copy an AI prompt" },
            { n: "3", text: "Run it in Claude" },
            { n: "4", text: "Build outputs in Figma" },
          ].map(step => (
            <div key={step.n} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
              <span style={{ width: 20, height: 20, borderRadius: "50%", background: "transparent", border: `1px solid ${p.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: p.color, flexShrink: 0 }}>{step.n}</span>
              <span style={{ fontSize: 12, color: DS.bodyDark, lineHeight: 1.5 }}>{step.text}</span>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function App() {
  const [activeTool, setActiveTool] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [kickoffOpen, setKickoffOpen] = useState(false);
  const [kickoffCopied, setKickoffCopied] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const KICKOFF_PROMPT = `You are a UX design assistant trained on the AI × UX Product Design Framework —
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
- One prompt I can use right now, before uploading anything, to get started`;

  const tool = activeTool ? TOOLS.find(t => t.id === activeTool) : null;
  const ToolComponent = tool?.component;

  if (ToolComponent) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: DS.dark }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: `${DS.dark}ee`, backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${DS.darkBorder}`,
          padding: "0 32px", display: "flex", alignItems: "center", gap: 16, height: 56,
        }}>
          <button onClick={() => setActiveTool(null)} style={{
            background: DS.darkCard, border: `1px solid ${DS.darkBorder}`, borderRadius: 8,
            padding: "6px 14px", cursor: "pointer", fontSize: 12, color: DS.bodyLight,
            fontFamily: "'JetBrains Mono', monospace",
          }}>← Back</button>
          <div style={{ width: 1, height: 20, background: DS.darkBorder }} />
          <PhaseChip phaseKey={tool.phase} small />
          <span style={{ fontSize: 14, fontWeight: 600, color: DS.white, fontFamily: "'DM Sans', sans-serif" }}>{tool.name}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {TOOLS.filter(t => t.id !== activeTool).map(t => (
              <button key={t.id} onClick={() => setActiveTool(t.id)} style={{
                background: "none", border: `1px solid ${DS.darkBorder}`, borderRadius: 8,
                padding: "5px 12px", cursor: "pointer", fontSize: 11, color: DS.bodyLight,
                fontFamily: "'JetBrains Mono', monospace",
              }}>{t.number} {t.name.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif", background: DS.dark,
      minHeight: "100vh", color: DS.white,
      opacity: mounted ? 1 : 0, transition: "opacity 0.4s ease",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* HERO — dark */}
      <div style={{ padding: "80px 60px 72px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4, textTransform: "uppercase", color: DS.bodyLight, marginBottom: 28, opacity: 0.7 }}>
          AI × UX Product Design Framework
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 60, alignItems: "end", marginBottom: 52 }}>
          <div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 60, fontWeight: 400, margin: "0 0 24px", lineHeight: 1.05, color: DS.white, letterSpacing: "-0.5px" }}>
              Design smarter.<br />
              <em style={{ fontStyle: "italic", color: DS.bodyLight }}>Ship with confidence.</em>
            </h1>
            <p style={{ fontSize: 16, color: DS.bodyLight, lineHeight: 1.75, margin: "0 0 36px", maxWidth: 480 }}>
              An AI-integrated framework covering every phase of product and UX design. Eleven skill files, four interactive tools, and a Figma template built to scale with your practice.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={PPTX_URL} style={{ background: DS.white, color: DS.dark, padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Download Onboarding Deck</a>
              <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: DS.white, padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", border: `1px solid ${DS.darkBorder}` }}>Figma Template ↗</a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ background: "transparent", color: DS.bodyLight, padding: "12px 24px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", border: `1px solid ${DS.darkBorder}` }}>GitHub ↗</a>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ n: "11", label: "Skills" }, { n: "6", label: "Phases" }, { n: "4", label: "Tools" }, { n: "∞", label: "Projects" }].map(s => (
              <div key={s.n} style={{ background: DS.darkCard, border: `1px solid ${DS.darkBorder}`, borderRadius: 14, padding: "22px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: DS.white, lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {Object.entries(DS.phases).map(([key, p]) => (
            <div key={key} style={{ background: "transparent", border: `1px solid ${p.color}55`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.color, marginBottom: 4, opacity: 0.6 }}>{key}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: p.color }}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* KICKOFF PROMPT — dark, between hero and tools */}
      <div style={{ background: DS.dark, padding: "0 60px 64px", maxWidth: 1160, margin: "0 auto" }}>
        <div
          style={{
            border: `1px solid ${kickoffOpen ? "#334155" : "#1E293B"}`,
            borderRadius: 16,
            overflow: "hidden",
            background: "#0B1120",
            transition: "border-color 0.2s",
          }}
        >
          {/* Header row — always visible */}
          <button
            onClick={() => setKickoffOpen(!kickoffOpen)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "20px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ background: "#14B8A6", borderRadius: 6, padding: "3px 10px", flexShrink: 0 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#0F172A", letterSpacing: 2, textTransform: "uppercase" }}>Start Here</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#F8FAFC", lineHeight: 1.3 }}>Kickoff Prompt</div>
                <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>New to the framework? Paste this into Claude before uploading any skill file.</div>
              </div>
            </div>
            <span style={{
              fontSize: 16, color: "#334155", display: "inline-block",
              transform: kickoffOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s",
            }}>↓</span>
          </button>

          {/* Expanded content */}
          {kickoffOpen && (
            <div style={{ borderTop: "1px solid #1E293B", padding: "28px 28px 32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>

                {/* Left: what Claude asks + responds with */}
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18 }}>Four questions Claude will ask</div>
                  {[
                    { n: "01", q: "What type of project is this?", hint: "New product, feature, redesign, internal tool, client work" },
                    { n: "02", q: "What phase are you entering?", hint: "Discover / Define / Ideate / Prototype / Validate / Deliver — or \"not sure\"" },
                    { n: "03", q: "What do you have so far?", hint: "Nothing yet / a brief / brief + research / existing designs" },
                    { n: "04", q: "Are you working solo or with a team?", hint: "" },
                  ].map(({ n, q, hint }) => (
                    <div key={n} style={{ marginBottom: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#334155", marginTop: 3, flexShrink: 0 }}>{n}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#F8FAFC", lineHeight: 1.4 }}>{q}</div>
                        {hint && <div style={{ fontSize: 11, color: "#64748B", marginTop: 3, lineHeight: 1.5 }}>{hint}</div>}
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #1E293B" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Claude responds with</div>
                    {[
                      "Recommended starting phase + reason why",
                      "The exact skill file to upload next",
                      "A specific first deliverable",
                      "One prompt you can use right now",
                    ].map(r => (
                      <div key={r} style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8, display: "flex", gap: 8 }}>
                        <span style={{ color: "#14B8A6", flexShrink: 0 }}>→</span>{r}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: prompt code block + copy button */}
                <div style={{ background: "#1E293B", borderRadius: 12, border: "1px solid #334155", padding: "20px 22px", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Copy &amp; paste into Claude</div>
                  <pre style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#94A3B8",
                    lineHeight: 1.75, whiteSpace: "pre-wrap", margin: 0, flex: 1,
                    overflowY: "auto", maxHeight: 300,
                  }}>{KICKOFF_PROMPT}</pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(KICKOFF_PROMPT);
                      setKickoffCopied(true);
                      setTimeout(() => setKickoffCopied(false), 2000);
                    }}
                    style={{
                      marginTop: 16, background: kickoffCopied ? "#0D9488" : "#14B8A6",
                      color: "#0F172A", border: "none", borderRadius: 8,
                      padding: "10px 0", fontWeight: 700, fontSize: 12,
                      cursor: "pointer", width: "100%", transition: "background 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {kickoffCopied ? "✓ Copied to clipboard" : "Copy Kickoff Prompt"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HOW IT WORKS — dark strip */}
      <div style={{ borderTop: `1px solid ${DS.darkBorder}`, borderBottom: `1px solid ${DS.darkBorder}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "26px 60px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {[
            { n: "01", label: "Pick a phase", desc: "Discover, Define, Ideate, Prototype, Validate, or Deliver" },
            { n: "02", label: "Run an AI prompt", desc: "Copy-ready prompts with [BRACKET] placeholders for your project" },
            { n: "03", label: "Build in Figma", desc: "Figma Playbook actions Claude executes directly in your file" },
            { n: "04", label: "Ship with specs", desc: "Component specs, handoff docs, and decision records" },
          ].map((step, i) => (
            <div key={step.n} style={{ paddingLeft: i === 0 ? 0 : 28, paddingRight: i === 3 ? 0 : 28, borderRight: i < 3 ? `1px solid ${DS.darkBorder}` : "none" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: DS.bodyLight, opacity: 0.4, marginBottom: 6 }}>{step.n}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: DS.white, marginBottom: 4 }}>{step.label}</div>
              <div style={{ fontSize: 12, color: DS.bodyLight, lineHeight: 1.55 }}>{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TOOLS — light */}
      <div style={{ background: DS.light }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyDark }}>
              Interactive Tools — 04
            </div>
            <span style={{ fontSize: 12, color: DS.bodyDark, opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>No install — runs in the browser</span>
          </div>
          <PrimaryToolCard tool={TOOLS.find(t => t.primary)} onClick={() => setActiveTool("process")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {TOOLS.filter(t => !t.primary).map(t => <ToolCard key={t.id} tool={t} onClick={() => setActiveTool(t.id)} />)}
          </div>
        </div>
      </div>

      {/* SKILLS — light */}
      <div style={{ background: DS.light, borderTop: `1px solid ${DS.lightBorder}` }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 60px" }}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyDark, marginBottom: 8 }}>Claude Skills Library — 13 files</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", marginBottom: 6 }}>Structured AI workflows for every design phase</div>
              <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.65, maxWidth: 540 }}>Each file loads a phase-specific workflow into Claude — structured prompts, templates, and quality checks. Upload it at the start of a conversation and Claude follows the process.</div>
            </div>
            <a href={`${REPO}/tree/main/skills`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: DS.bodyDark, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", opacity: 0.5, whiteSpace: "nowrap", marginLeft: 40 }}>
              View on GitHub ↗
            </a>
          </div>

          {/* How to use callout */}
          <div style={{ background: DS.dark, borderRadius: 12, padding: "15px 22px", marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: "#1E293B", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>↑</div>
            <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.55 }}>
              <span style={{ color: DS.white, fontWeight: 600 }}>How to use: </span>
              Open any skill file on GitHub → copy the raw content → paste into a new Claude conversation as your first message. Works in Claude.ai and Claude Desktop.
            </div>
          </div>

          {/* Skills table */}
          <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
            {SKILLS.map((row, i) => {
              const p = row.phase ? DS.phases[row.phase] : null;
              return (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: i < SKILLS.length - 1 ? `1px solid ${DS.lightBorder}` : "none" }}>
                  {/* Phase label */}
                  <div style={{ padding: "20px", borderRight: `1px solid ${DS.lightBorder}`, display: "flex", alignItems: "flex-start", paddingTop: 24, background: "#FAFAF8" }}>
                    {p ? (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "transparent", border: `1px solid ${p.color}55`, borderRadius: 999, padding: "2px 8px", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, color: p.color, whiteSpace: "nowrap" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                        {row.phase} — {p.label}
                      </span>
                    ) : (
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: DS.bodyDark, opacity: 0.5 }}>Cross-phase</span>
                    )}
                  </div>
                  {/* Files + descriptions */}
                  <div style={{ padding: "20px 24px" }}>
                    {row.files.map((file, fi) => {
                      const meta = SKILL_META[file];
                      return (
                        <div key={file} style={{ marginBottom: fi < row.files.length - 1 ? 18 : 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                            <a href={`${REPO}/tree/main/skills/${row.dir ? row.dir + "/" : ""}${file}`}
                              target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 11, padding: "3px 10px", borderRadius: 7, background: "transparent", color: p ? p.color : DS.bodyDark, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", border: `1px solid ${p ? p.color + "55" : DS.lightBorder}`, whiteSpace: "nowrap" }}>
                              {file}
                            </a>
                            {meta?.leverage && (
                              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: DS.bodyDark, opacity: 0.4 }}>
                                {meta.leverage === "high" ? "High AI leverage" : meta.leverage === "medium" ? "Medium AI leverage" : "Low AI leverage"}
                              </span>
                            )}
                          </div>
                          {meta?.desc && (
                            <div style={{ fontSize: 12, color: DS.bodyDark, lineHeight: 1.65, maxWidth: 680 }}>{meta.desc}</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: DS.dark }}>
      <div style={{ borderTop: `1px solid ${DS.darkBorder}`, maxWidth: 1160, margin: "0 auto", padding: "28px 60px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ fontSize: 11, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace", opacity: 0.4 }}>AI × UX Product Design Framework</div>
        <div style={{ display: "flex", gap: 24 }}>
          {[["GitHub", REPO], ["Figma Template", FIGMA_URL], ["Onboarding Deck", PPTX_URL]].map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: DS.bodyLight, textDecoration: "none", opacity: 0.5, fontFamily: "'JetBrains Mono', monospace" }}>{label}</a>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
