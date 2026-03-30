import { useState } from "react";

const DS = {
  dark: "#0F172A", darkCard: "#1E293B", darkBorder: "#334155",
  white: "#FFFFFF", bodyLight: "#94A3B8", bodyDark: "#64748B",
  light: "#F8FAFC", lightBorder: "#E2E8F0",
};

const PATH_A_STEPS = [
  {
    n: "01",
    title: "Download Claude Desktop",
    body: "Claude Desktop is the app version of Claude — it supports MCP connections that claude.ai in the browser doesn't. Download it for Mac or Windows.",
    action: { label: "Download Claude Desktop ↗", href: "https://claude.ai/download" },
    check: "Claude Desktop is installed and you can open it",
  },
  {
    n: "02",
    title: "Install the Figma desktop app",
    body: "The Figma MCP works with the Figma desktop app, not the browser version. If you're already using Figma in the browser, download the desktop app.",
    action: { label: "Download Figma Desktop ↗", href: "https://www.figma.com/downloads/" },
    check: "Figma desktop app is installed and you're logged in",
  },
  {
    n: "03",
    title: "Connect Figma to Claude Desktop",
    body: "Open Claude Desktop. Go to Settings → Integrations. Find Figma in the list and click Connect. This links your Figma account so Claude can read and write to your files.",
    check: "Figma shows as Connected in Claude Desktop → Settings → Integrations",
  },
  {
    n: "04",
    title: "Open both apps side by side",
    body: "For Claude to execute actions in Figma, both apps need to be running at the same time. Open your Figma file in the desktop app, then switch to Claude Desktop to start your conversation.",
    check: "Both Figma desktop and Claude Desktop are open",
  },
  {
    n: "05",
    title: "Test the connection",
    body: "In Claude Desktop, start a new conversation and type: \"What files do I have open in Figma?\" — Claude should respond with your open file name. If it does, you're ready.",
    check: "Claude can see your open Figma file by name",
  },
];

const PATH_B_STEPS = [
  {
    n: "01",
    title: "Open claude.ai in your browser",
    body: "Go to claude.ai and sign in. No downloads, no installs — this works in any modern browser on any device.",
    action: { label: "Open Claude.ai ↗", href: "https://claude.ai" },
    check: "You're signed into Claude.ai",
  },
  {
    n: "02",
    title: "Download a skill file from GitHub",
    body: "Go to the framework's GitHub repo, open the /skills folder, find the skill file for your current phase, and copy the raw content.",
    action: { label: "Browse skill files ↗", href: "https://github.com/quinrobinson/Agentic-Product-Design-Framework/tree/main/skills" },
    check: "You have a skill file's content copied or the file downloaded",
  },
  {
    n: "03",
    title: "Paste the skill file into Claude",
    body: "Start a new conversation in Claude.ai. Paste the full skill file content as your first message, then describe your project. Claude will follow the structured workflow from the skill file.",
    check: "Claude has responded acknowledging the skill and asking about your project",
  },
  {
    n: "04",
    title: "Use Claude's output in Figma",
    body: "Claude will generate content — research findings, wireframe specs, component descriptions, copy. You apply it manually in your Figma file. The Figma Playbook skill file tells Claude what to suggest.",
    check: "You're working between Claude and your Figma file",
  },
];

const TROUBLESHOOT = [
  {
    q: "Claude can't see my Figma file",
    a: "Make sure you're using Claude Desktop (not claude.ai in the browser). The Figma MCP only works in the desktop app. Also confirm both Figma and Claude Desktop are open at the same time.",
  },
  {
    q: "The Figma integration isn't showing in Claude Desktop settings",
    a: "Update Claude Desktop to the latest version — MCP integrations were added in a recent release. Go to Help → Check for Updates.",
  },
  {
    q: "Claude can see my file but can't make changes",
    a: "Check that you have edit access to the Figma file (not just view access). Claude can only modify files you have permission to edit.",
  },
  {
    q: "I'm on the free Claude plan — does this work?",
    a: "The Figma MCP integration requires a Claude Pro or Team plan. Claude.ai (browser path) works on the free plan — you just apply Claude's output to Figma manually.",
  },
  {
    q: "I use Figma in the browser, not the desktop app",
    a: "The Figma MCP requires the Figma desktop app. Download it from figma.com/downloads — you can use both the browser and desktop versions with the same account.",
  },
];

function StepCard({ step, pathColor }) {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{
      background: DS.white, border: `1px solid ${checked ? pathColor + "44" : DS.lightBorder}`,
      borderRadius: 12, padding: "20px 22px", marginBottom: 10,
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, flexShrink: 0,
          background: checked ? pathColor : DS.dark,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11, fontWeight: 700, color: DS.white,
          fontFamily: "'JetBrains Mono', monospace", transition: "background 0.2s",
        }}>
          {checked ? "✓" : step.n}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0F172A", marginBottom: 6 }}>{step.title}</div>
          <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.65, marginBottom: step.action ? 12 : 14 }}>{step.body}</div>
          {step.action && (
            <a href={step.action.href} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: pathColor,
              textDecoration: "none", marginBottom: 14,
            }}>{step.action.label}</a>
          )}
          {/* Confirm checkbox */}
          <button
            onClick={() => setChecked(!checked)}
            style={{
              display: "flex", alignItems: "center", gap: 8, background: "none",
              border: "none", cursor: "pointer", padding: 0,
            }}
          >
            <div style={{
              width: 16, height: 16, borderRadius: 4, flexShrink: 0,
              border: `1.5px solid ${checked ? pathColor : DS.lightBorder}`,
              background: checked ? pathColor : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.15s",
            }}>
              {checked && <span style={{ color: DS.white, fontSize: 10, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 11, color: checked ? pathColor : DS.bodyDark, fontWeight: checked ? 600 : 400, transition: "color 0.15s" }}>
              {step.check}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FigmaSetupGuide({ onBack }) {
  const [activePath, setActivePath] = useState("a");
  const [openFaq, setOpenFaq] = useState(null);

  const pathAColor = "#3B82F6";
  const pathBColor = "#22C55E";
  const activeColor = activePath === "a" ? pathAColor : pathBColor;
  const activeSteps = activePath === "a" ? PATH_A_STEPS : PATH_B_STEPS;

  return (
    <div style={{ minHeight: "100vh", background: DS.light, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: DS.dark, borderBottom: `1px solid ${DS.darkBorder}`, padding: "0 40px", display: "flex", alignItems: "center", gap: 16, height: 56, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: DS.darkCard, border: `1px solid ${DS.darkBorder}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace" }}>← Back</button>
        <div style={{ width: 1, height: 20, background: DS.darkBorder }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: DS.white }}>Figma + Claude Setup Guide</span>
        <div style={{ marginLeft: "auto", fontSize: 11, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>Agentic Product Design Framework</div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 40px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4, textTransform: "uppercase", color: DS.bodyDark, marginBottom: 14 }}>Get started</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, color: "#0F172A", margin: "0 0 16px", lineHeight: 1.05 }}>
            Connect Claude to Figma
          </h1>
          <p style={{ fontSize: 15, color: DS.bodyDark, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 580 }}>
            There are two ways to use this framework. Pick the path that fits where you are — you can always upgrade from Path B to Path A later.
          </p>

          {/* Path selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              {
                id: "a", color: pathAColor,
                label: "Path A — Full MCP integration",
                sub: "Claude executes directly in Figma",
                badges: ["Most powerful", "Requires Claude Pro"],
                detail: "Claude Desktop + Figma desktop app. Claude can read your file, create frames, build components, and write annotations — all without you switching apps.",
              },
              {
                id: "b", color: pathBColor,
                label: "Path B — Claude.ai in the browser",
                sub: "Zero setup, works today",
                badges: ["No install needed", "Free plan compatible"],
                detail: "Use claude.ai in any browser. Upload skill files, get structured AI output, then apply it manually in Figma. All the framework's thinking tools work — just no direct Figma execution.",
              },
            ].map(path => (
              <button
                key={path.id}
                onClick={() => setActivePath(path.id)}
                style={{
                  textAlign: "left", padding: "20px 22px", borderRadius: 14, cursor: "pointer",
                  border: activePath === path.id ? `2px solid ${path.color}` : `1px solid ${DS.lightBorder}`,
                  background: activePath === path.id ? `${path.color}08` : DS.white,
                  transition: "all 0.2s", outline: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: path.color, display: "block", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{path.label}</span>
                </div>
                <div style={{ fontSize: 12, color: path.color, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>{path.sub}</div>
                <div style={{ fontSize: 12, color: DS.bodyDark, lineHeight: 1.6, marginBottom: 12 }}>{path.detail}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {path.badges.map(b => (
                    <span key={b} style={{ fontSize: 10, padding: "2px 9px", borderRadius: 20, background: `${path.color}12`, color: path.color, fontWeight: 600, border: `1px solid ${path.color}33` }}>{b}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: activeColor, display: "block" }} />
            <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyDark }}>
              {activePath === "a" ? "Path A — Step by step" : "Path B — Step by step"}
            </span>
          </div>
          {activeSteps.map(step => (
            <StepCard key={step.n} step={step} pathColor={activeColor} />
          ))}
        </div>

        {/* You're ready callout */}
        <div style={{ background: DS.dark, borderRadius: 14, padding: "24px 28px", marginBottom: 48, display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `${activeColor}22`, border: `1px solid ${activeColor}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: activeColor, fontSize: 18 }}>✦</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: DS.white, marginBottom: 6 }}>
              {activePath === "a" ? "You're ready when Claude can see your open Figma file by name." : "You're ready when Claude has responded to your uploaded skill file."}
            </div>
            <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.65 }}>
              {activePath === "a"
                ? "Once the connection is confirmed, open the Design Process System tool, pick your phase, and copy the Figma Playbook prompt. Paste it into Claude Desktop with your Figma file open — Claude will start executing."
                : "Once Claude acknowledges the skill file, describe your project context. Claude will follow the structured workflow and generate phase-specific content you can bring into Figma manually."}
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyDark, marginBottom: 18 }}>Troubleshooting</div>
          {TROUBLESHOOT.map((item, i) => (
            <div key={i} style={{ background: DS.white, border: `1px solid ${openFaq === i ? DS.darkBorder : DS.lightBorder}`, borderRadius: 10, marginBottom: 8, overflow: "hidden", transition: "border-color 0.15s" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16 }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{item.q}</span>
                <span style={{ color: DS.bodyDark, fontSize: 14, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 18px 16px", fontSize: 13, color: DS.bodyDark, lineHeight: 1.7 }}>{item.a}</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
