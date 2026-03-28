import { useState } from "react";
import DesignProcessSystem from "./DesignProcessSystem";
import UniversalDesignSystem from "./DesignTokensSystem";
import DesignSystemChecklist from "./DesignSystemChecklist";
import M3TokenReference from "./M3TokenReference";

const TOOLS = [
  {
    id: "process",
    number: "01",
    name: "Design Process System",
    subtitle: "AI-integrated phase-by-phase framework",
    description: "Six-phase design process with AI prompts, skill docs, Figma playbook actions, templates, and tool recommendations per phase.",
    color: "#E8F0E8",
    accent: "#2D5A27",
    tags: ["All phases", "AI prompts", "11 skills"],
    component: DesignProcessSystem,
  },
  {
    id: "tokens",
    number: "02",
    name: "Design Tokens System",
    subtitle: "Universal starter design system",
    description: "Live token editor with presets, component previews, system audit against Material/Atlassian/Carbon/HIG, and CSS export.",
    color: "#E8E4F0",
    accent: "#4A3166",
    tags: ["Ideate", "Design system", "Live preview"],
    component: UniversalDesignSystem,
  },
  {
    id: "checklist",
    number: "03",
    name: "Design System Checklist",
    subtitle: "Audit against 4 major design systems",
    description: "Interactive audit checklist synthesized from Material Design 3, Atlassian, IBM Carbon, and Apple HIG — with Figma-ready prompts per item.",
    color: "#E3F2FD",
    accent: "#1A4B8C",
    tags: ["Deliver", "Audit", "Figma prompts"],
    component: DesignSystemChecklist,
  },
  {
    id: "m3",
    number: "04",
    name: "M3 Token Reference",
    subtitle: "Material Design 3 token documentation",
    description: "Interactive token docs for Button, Card, Text Field, and Navigation Bar — color roles, elevation, shape, typography, and spacing with Figma variable prompts.",
    color: "#FDE8E8",
    accent: "#8C1A1A",
    tags: ["Deliver", "M3 tokens", "Figma variables"],
    component: M3TokenReference,
  },
];

const SKILLS = [
  { phase: "01 — Discover", dir: "01-discover", files: ["user-research.md", "competitive-analysis.md"] },
  { phase: "02 — Define", dir: "02-define", files: ["problem-framing.md"] },
  { phase: "03 — Ideate", dir: "03-ideate", files: ["concept-generation.md", "visual-design-execution.md"] },
  { phase: "04 — Prototype", dir: "04-prototype", files: ["prototyping.md", "accessibility-audit.md"] },
  { phase: "05 — Validate", dir: "05-validate", files: ["usability-testing.md"] },
  { phase: "06 — Deliver", dir: "06-deliver", files: ["design-delivery.md"] },
  { phase: "Cross-phase", dir: "", files: ["design-systems.md", "figma-playbook.md"] },
];

const REPO = "https://github.com/quinrobinson/AI-x-UX-Product-Design-Framework";
const FIGMA_URL = "https://www.figma.com/design/mrHuD7sY7h6uKSVndTSIQE";
const PPTX_URL = `${REPO}/raw/main/artifacts/onboarding-deck.pptx`;

export default function App() {
  const [activeTool, setActiveTool] = useState(null);
  const tool = activeTool ? TOOLS.find((t) => t.id === activeTool) : null;
  const ToolComponent = tool?.component;

  if (ToolComponent) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", minHeight: "100vh", background: "#FAFAF8" }}>
        <div style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(250,250,248,0.94)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid #eee", padding: "0 24px",
          display: "flex", alignItems: "center", gap: 16, height: 52,
        }}>
          <button onClick={() => setActiveTool(null)} style={{
            background: "none", border: "1px solid #ddd", borderRadius: 8,
            padding: "6px 14px", cursor: "pointer", fontSize: 13, color: "#555",
          }}>← Back</button>
          <span style={{ fontSize: 11, fontFamily: "monospace", color: "#aaa" }}>{tool.number}</span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#111" }}>{tool.name}</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            {TOOLS.filter((t) => t.id !== activeTool).map((t) => (
              <button key={t.id} onClick={() => setActiveTool(t.id)} style={{
                background: "none", border: "1px solid #ddd", borderRadius: 8,
                padding: "5px 12px", cursor: "pointer", fontSize: 12, color: "#666",
              }}>{t.number} {t.name.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        <ToolComponent />
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#FAFAF8", minHeight: "100vh", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "72px 48px 0", maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 48, marginBottom: 64 }}>
          <div style={{ maxWidth: 560 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, textTransform: "uppercase", color: "#aaa", marginBottom: 16 }}>AI × UX Product Design Framework</div>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 52, fontWeight: 400, margin: "0 0 20px", lineHeight: 1.05, color: "#111" }}>
              Design smarter.<br />Ship with confidence.
            </h1>
            <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, margin: "0 0 32px" }}>
              An AI-integrated framework covering every phase of product and UX design. Eleven skill files, four interactive tools, and a Figma template built to scale with your practice.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={PPTX_URL} style={{ background: "#111", color: "#fff", padding: "11px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>Download Onboarding Deck</a>
              <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#111", padding: "11px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", border: "1px solid #ddd" }}>Figma Template ↗</a>
              <a href={REPO} target="_blank" rel="noopener noreferrer" style={{ background: "#fff", color: "#666", padding: "11px 22px", borderRadius: 10, fontSize: 13, fontWeight: 500, textDecoration: "none", border: "1px solid #ddd" }}>GitHub ↗</a>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flexShrink: 0 }}>
            {[{ n: "11", label: "Skills" }, { n: "6", label: "Phases" }, { n: "4", label: "Tools" }, { n: "∞", label: "Projects" }].map((s) => (
              <div key={s.n} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 14, padding: "22px 28px", textAlign: "center", minWidth: 100 }}>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, color: "#111", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools grid */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#aaa", marginBottom: 20 }}>Interactive Tools</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {TOOLS.map((t) => (
              <button key={t.id} onClick={() => setActiveTool(t.id)}
                style={{ background: "#fff", border: "1px solid #eee", borderRadius: 16, padding: "28px", cursor: "pointer", textAlign: "left", transition: "all 0.18s ease", outline: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${t.accent}18`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ background: t.color, color: t.accent, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, padding: "4px 10px", borderRadius: 6 }}>{t.number}</div>
                  <span style={{ fontSize: 20, color: t.accent, lineHeight: 1 }}>→</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "#111" }}>{t.name}</div>
                <div style={{ fontSize: 13, color: "#888", marginBottom: 16, lineHeight: 1.55 }}>{t.description}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {t.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: t.color, color: t.accent, fontWeight: 500 }}>{tag}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Skills library */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#aaa" }}>Claude Skills Library — 11 files</div>
            <a href={`${REPO}/tree/main/skills`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#aaa", textDecoration: "none" }}>View on GitHub ↗</a>
          </div>
          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: 16, overflow: "hidden" }}>
            {SKILLS.map((phase, i) => (
              <div key={phase.phase} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderBottom: i < SKILLS.length - 1 ? "1px solid #f4f4f2" : "none" }}>
                <div style={{ padding: "15px 20px", background: "#FAFAF8", borderRight: "1px solid #f4f4f2", fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#777", display: "flex", alignItems: "center" }}>{phase.phase}</div>
                <div style={{ padding: "13px 20px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                  {phase.files.map((file) => (
                    <a key={file}
                      href={`${REPO}/tree/main/skills/${phase.dir ? phase.dir + "/" : ""}${file}`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: 12, padding: "5px 12px", borderRadius: 8, background: "#f4f4f2", color: "#444", textDecoration: "none", fontFamily: "'JetBrains Mono', monospace", border: "1px solid #eee" }}>
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process phases */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#aaa", marginBottom: 20 }}>The Design Process</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {[
              { n: "01", name: "Discover", color: "#E8F0E8", accent: "#2D5A27" },
              { n: "02", name: "Define", color: "#E8E4F0", accent: "#4A3166" },
              { n: "03", name: "Ideate", color: "#FFF3E0", accent: "#8B5E00" },
              { n: "04", name: "Prototype", color: "#E3F2FD", accent: "#1A4B8C" },
              { n: "05", name: "Validate", color: "#FDE8E8", accent: "#8C1A1A" },
              { n: "06", name: "Deliver", color: "#E8F0F0", accent: "#1A5C5C" },
            ].map((p) => (
              <div key={p.n} style={{ background: p.color, borderRadius: 12, padding: "20px 16px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: p.accent, opacity: 0.5, marginBottom: 6 }}>{p.n}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: p.accent }}>{p.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #eee", padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12, color: "#bbb", fontFamily: "'JetBrains Mono', monospace" }}>AI × UX Product Design Framework</div>
          <div style={{ display: "flex", gap: 20 }}>
            {[["GitHub", REPO], ["Figma Template", FIGMA_URL], ["Onboarding Deck", PPTX_URL]].map(([label, href]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ fontSize: 13, color: "#aaa", textDecoration: "none" }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
