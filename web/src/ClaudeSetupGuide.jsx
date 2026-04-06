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
    body: "Go to claude.com/download and install the app for Mac or Windows.",
    action: { label: "Download Claude Desktop ↗", href: "https://claude.com/download" },
    check: "Claude Desktop is installed and open",
  },
  {
    n: "02",
    title: "Sign in",
    body: "Open the app and sign in. You need a Pro, Max, Team, or Enterprise plan. The free plan does not include Claude Code access.",
    check: "You're signed in with a supported plan",
  },
  {
    n: "03",
    title: "Get the framework folder",
    body: "Go to the framework repo on GitHub → click Code → Download ZIP → unzip it somewhere easy to find. No Git knowledge required.",
    action: { label: "Open framework repo ↗", href: "https://github.com/quinrobinson/Agentic-Product-Design-Framework" },
    check: "Framework folder is unzipped and ready",
  },
  {
    n: "04",
    title: "Open the Code tab and select your folder",
    body: "In Claude Desktop, click the Code tab → click Select folder → point it at the unzipped framework folder. Claude reads CLAUDE.md automatically from this point forward.",
    check: "Claude Desktop shows the framework folder selected",
  },
  {
    n: "05",
    title: "Install the design skills (one time)",
    body: "In the chat, type: \"Set up my design skills by converting each .md file in the /skills folder into the correct ~/.claude/skills/skill-name/SKILL.md structure.\" Claude does the migration. You'll never need to repeat this.",
    check: "Skills are installed and Claude confirms the migration",
  },
  {
    n: "06",
    title: "Connect Figma (if using figma-playbook)",
    body: "Settings → Integrations → Figma → Connect. You'll also need the Figma desktop app open alongside Claude Desktop. Once connected, ask Claude: \"What files do I have open in Figma?\" — if it names your file, you're ready.",
    check: "Claude names your open Figma file correctly",
  },
];

const PATH_B_STEPS = [
  {
    n: "01",
    title: "Install Claude Code",
    body: "Mac/Linux — run in terminal: curl -fsSL https://claude.ai/install.sh | sh\n\nWindows (PowerShell): irm https://claude.ai/install.ps1 | iex",
    check: "Running 'claude --version' returns a version number",
  },
  {
    n: "02",
    title: "Sign in",
    body: "Run 'claude' in your terminal and follow the browser prompts to authenticate. Pro, Max, Team, or Enterprise plan required.",
    check: "You're signed in and Claude Code launches without errors",
  },
  {
    n: "03",
    title: "Clone the repo",
    body: "Run: git clone https://github.com/quinrobinson/Agentic-Product-Design-Framework.git\n\nThen: cd Agentic-Product-Design-Framework",
    action: { label: "Open framework repo ↗", href: "https://github.com/quinrobinson/Agentic-Product-Design-Framework" },
    check: "You're inside the framework directory",
  },
  {
    n: "04",
    title: "Launch Claude Code in the repo",
    body: "Run 'claude' from inside the framework directory. CLAUDE.md loads automatically — Claude is now context-aware of the full framework.",
    check: "Claude Code session is running with CLAUDE.md loaded",
  },
  {
    n: "05",
    title: "Install the design skills (one time)",
    body: "Inside the Claude Code session, ask: \"Set up my design skills by converting each .md file in the /skills folder into the correct ~/.claude/skills/skill-name/SKILL.md structure.\"",
    check: "Skills are installed and Claude confirms the migration",
  },
  {
    n: "06",
    title: "Connect Figma MCP",
    body: "Run /config → Integrations → Figma → Connect. The Figma desktop app must be open alongside your Claude Code session.",
    check: "Figma MCP is connected and Claude can see your open files",
  },
];

const PATH_C_STEPS = [
  {
    n: "01",
    title: "Go to claude.ai",
    body: "Open claude.ai in any modern browser. Free, Pro, and paid plans all work for this path. No install required.",
    action: { label: "Open claude.ai ↗", href: "https://claude.ai" },
    check: "You're signed into Claude.ai",
  },
  {
    n: "02",
    title: "Download the skill file for your current phase",
    body: "Go to the /skills folder in the framework repo on GitHub and download the .md file for the phase you're working in — for example, user-research.md or concept-generation.md.",
    action: { label: "Browse skill files ↗", href: "https://github.com/quinrobinson/Agentic-Product-Design-Framework/tree/main/skills" },
    check: "You have the relevant skill .md file downloaded",
  },
  {
    n: "03",
    title: "Paste the skill file into a new conversation",
    body: "Open a new Claude conversation, paste the full contents of the skill .md file, then describe your project. Claude will follow the skill's structured workflow for that session.",
    check: "Claude responds with a structured workflow output for your phase",
  },
  {
    n: "04",
    title: "Apply the output in Figma",
    body: "Take Claude's outputs — briefs, frameworks, copy, annotations — and apply them in Figma manually. This path gives you the thinking, not direct execution.",
    check: "You have content from Claude ready to bring into your Figma file",
  },
];

const TROUBLESHOOT = [
  {
    q: "I don't have a Pro plan — can I still use the framework?",
    a: "Path C (Claude Chat) works on the free plan. You paste skill files manually each session and apply Claude's outputs in Figma yourself. Paths A and B require a Pro, Max, Team, or Enterprise plan for Claude Code access.",
  },
  {
    q: "Desktop App vs Terminal — how do I choose?",
    a: "If you don't use the command line, use Path A (Desktop App). It has the same Claude Code capabilities in a GUI. Path B is better if you're already comfortable with terminals and want faster iteration or scripting.",
  },
  {
    q: "My Figma connection isn't working in the Desktop App",
    a: "Make sure the Figma desktop app is open (not just the browser). Then go to Settings → Integrations → Figma and reconnect. Ask Claude: \"What files do I have open in Figma?\" to confirm the connection.",
  },
  {
    q: "Skills aren't persisting between conversations",
    a: "If you're on Path C, this is expected — nothing persists. On Paths A or B, run the skill installation prompt again: \"Set up my design skills by converting each .md file in the /skills folder into the correct ~/.claude/skills/skill-name/SKILL.md structure.\"",
  },
  {
    q: "I started on Path C and want to switch to Path A",
    a: "Follow the Path A steps from the top. Your skill installation in step 05 will pick up the same skill files you've been using manually. Nothing from Path C transfers — but nothing is lost either.",
  },
  {
    q: "CLAUDE.md isn't loading automatically",
    a: "Make sure you launched Claude Code from inside the framework folder (not a parent directory). Run 'pwd' to confirm your location, then 'claude' again from the correct directory.",
  },
];

const DECISION_GUIDE = [
  { cue: "I'm a designer, I don't use the terminal", path: "Path A", color: "#3B82F6" },
  { cue: "I'm a developer or comfortable with command line", path: "Path B", color: "#8B5CF6" },
  { cue: "I just want to try one skill quickly", path: "Path C", color: "#F59E0B" },
  { cue: "I want Figma MCP to work", path: "Path A or B (Desktop App is easier)", color: "#3B82F6" },
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
          <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.65, marginBottom: step.action ? 12 : 14, whiteSpace: "pre-line" }}>{step.body}</div>
          {step.action && (
            <a href={step.action.href} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, fontWeight: 600, color: pathColor,
              textDecoration: "none", marginBottom: 14,
            }}>{step.action.label}</a>
          )}
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

export default function ClaudeSetupGuide({ onBack }) {
  const [activePath, setActivePath] = useState("a");
  const [openFaq, setOpenFaq] = useState(null);

  const pathAColor = "#3B82F6";
  const pathBColor = "#8B5CF6";
  const pathCColor = "#F59E0B";

  const activeColor = activePath === "a" ? pathAColor : activePath === "b" ? pathBColor : pathCColor;
  const activeSteps = activePath === "a" ? PATH_A_STEPS : activePath === "b" ? PATH_B_STEPS : PATH_C_STEPS;

  const readyMessage = {
    a: {
      title: "You're ready when Claude names your open Figma file correctly.",
      body: "Open the Design Process System tool, pick your phase, and run the relevant skill. If you skipped the Figma step, you're still ready — just start a conversation, describe your project and phase, and Claude will follow the framework.",
    },
    b: {
      title: "You're ready when Claude Code launches with CLAUDE.md loaded.",
      body: "Run the skill installation once, then start working. Pick your phase from the Design Process System, copy the relevant skill prompt, and paste it into your Claude Code session.",
    },
    c: {
      title: "You're ready when Claude responds with a structured workflow output.",
      body: "Remember: nothing persists on this path. Each session starts fresh. If you find yourself reusing the same skill often, consider switching to Path A for persistent setup.",
    },
  };

  const paths = [
    {
      id: "a", color: pathAColor,
      label: "Path A — Claude Code Desktop App",
      sub: "Recommended for designers",
      badges: ["No terminal needed", "Requires paid plan"],
      detail: "Download the Claude Desktop app, point it at the framework folder, install skills once, and connect Figma. Full Claude Code capabilities in a GUI.",
    },
    {
      id: "b", color: pathBColor,
      label: "Path B — Claude Code Terminal",
      sub: "For developers and technical designers",
      badges: ["Full control", "Requires paid plan"],
      detail: "Install Claude Code via the CLI, clone the repo, launch from the framework directory. CLAUDE.md loads automatically. Best if you're already comfortable with terminals.",
    },
    {
      id: "c", color: pathCColor,
      label: "Path C — Claude Chat",
      sub: "Lightweight, no setup",
      badges: ["No install", "All plans supported"],
      detail: "No installation. Paste a skill file into a new conversation, describe your project, and apply Claude's output in Figma manually. Nothing persists between sessions.",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: DS.light, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: DS.dark, borderBottom: `1px solid ${DS.darkBorder}`, padding: "0 40px", display: "flex", alignItems: "center", gap: 16, height: 56, position: "sticky", top: 0, zIndex: 100 }}>
        <button onClick={onBack} style={{ background: DS.darkCard, border: `1px solid ${DS.darkBorder}`, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 12, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace" }}>← Back</button>
        <div style={{ width: 1, height: 20, background: DS.darkBorder }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: DS.white }}>Claude Setup Guide</span>
        <div style={{ marginLeft: "auto", fontSize: 11, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>Agentic Product Design Framework</div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "56px 40px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 4, textTransform: "uppercase", color: DS.bodyDark, marginBottom: 14 }}>Get started</div>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 40, fontWeight: 400, color: "#0F172A", margin: "0 0 16px", lineHeight: 1.05 }}>
            Set up Claude
          </h1>
          <p style={{ fontSize: 15, color: DS.bodyDark, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 580 }}>
            Claude runs across multiple surfaces. This guide covers the ones that matter for design work right now. Pick the path that fits where you are — you can always move to a more powerful setup later.
          </p>

          {/* Quick decision guide */}
          <div style={{ background: DS.dark, borderRadius: 12, padding: "18px 22px", marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 3, color: DS.bodyLight, marginBottom: 14, opacity: 0.7 }}>Quick decision guide</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DECISION_GUIDE.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 12, color: DS.bodyLight, flex: 1, lineHeight: 1.5 }}>"{item.cue}"</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>→ {item.path}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Path selector */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {paths.map(path => (
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
              {activePath === "a" ? "Path A — Step by step" : activePath === "b" ? "Path B — Step by step" : "Path C — Step by step"}
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
              {readyMessage[activePath].title}
            </div>
            <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.65 }}>
              {readyMessage[activePath].body}
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
