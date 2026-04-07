import { useState } from "react";

const DS = {
  dark: "#0F172A", darkCard: "#1E293B", darkBorder: "#334155",
  white: "#FFFFFF", bodyLight: "#94A3B8", bodyDark: "#64748B",
  light: "#F8FAFC", lightBorder: "#E2E8F0",
};

const PATH_A_STEPS = [
  {
    n: "01",
    title: "Install Claude Code",
    body: "Claude Code is a command-line tool that supports MCP connections — including Figma. It requires Node.js 18+ first. Once Node is ready, install Claude Code globally: npm install -g @anthropic-ai/claude-code",
    action: { label: "Claude Code docs ↗", href: "https://docs.anthropic.com/en/docs/claude-code/getting-started" },
    check: "Running 'claude --version' in your terminal returns a version number",
  },
  {
    n: "02",
    title: "Install the Figma desktop app",
    body: "The Figma MCP works with the Figma desktop app, not the browser version. If you're currently using Figma in the browser, download the desktop app — you can use both with the same account.",
    action: { label: "Download Figma Desktop ↗", href: "https://www.figma.com/downloads/" },
    check: "Figma desktop app is installed and you're logged in",
  },
  {
    n: "03",
    title: "Get your Figma personal access token",
    body: "In Figma, go to your profile icon → Settings → Security → Personal access tokens → Generate new token. Copy it — you'll need it in the next step. Keep it private, treat it like a password.",
    check: "You have a Figma personal access token copied",
  },
  {
    n: "04",
    title: "Add Figma MCP to Claude Code",
    body: "In your terminal, run: claude mcp add figma-developer-mcp --env FIGMA_API_KEY=your_token_here — replacing 'your_token_here' with the token from step 03. Then run 'claude mcp list' to confirm it was added.",
    check: "Figma MCP appears when you run 'claude mcp list' in your terminal",
  },
  {
    n: "05",
    title: "Test the connection",
    body: "Open your Figma file in the desktop app. In your terminal, start a Claude Code session by running 'claude'. Paste your Figma file URL and say: \"Read the structure of this Figma file: [URL]\" — Claude should respond with the file name and page list.",
    check: "Claude Code responds with the correct file name and pages from your Figma file",
  },
];

const PATH_B_STEPS = [
  {
    n: "01",
    title: "Sign into Claude.ai",
    body: "Go to claude.ai and sign in. No downloads, no installs — works in any modern browser. Free, Pro, and Team plans all support skill uploads.",
    action: { label: "Open Claude.ai ↗", href: "https://claude.ai" },
    check: "You're signed into Claude.ai",
  },
  {
    n: "02",
    title: "Enable Skills in settings",
    body: "Go to Settings → Customize → Skills. Make sure Code execution and file creation is enabled under Capabilities. This unlocks the ability to upload and use skill files persistently.",
    check: "Skills is enabled and you can see the Skills section in Customize",
  },
  {
    n: "03",
    title: "Download skill files from GitHub",
    body: "Go to the framework's GitHub repo and download the skill files for the phases you need. Each file is a .md file — download the ones relevant to your project. You'll package them as a ZIP in the next step.",
    action: { label: "Browse skill files ↗", href: "https://github.com/quinrobinson/Agentic-Product-Design-Framework/tree/main/skills" },
    check: "You have the skill .md files downloaded locally",
  },
  {
    n: "04",
    title: "Upload skills to Claude",
    body: "In Settings → Customize → Skills, click the + button and select Upload a skill. Each skill needs to be a ZIP file containing a folder with the .md file inside. Once uploaded, it's available in every conversation — no pasting required.",
    check: "Your uploaded skills appear in the Skills list and are toggled on",
  },
  {
    n: "05",
    title: "Start a conversation and use your skills",
    body: "Open a new Claude conversation. Your enabled skills are automatically active — just describe your project and the phase you're in. Claude will follow the framework's structured workflow and generate phase-specific content.",
    check: "Claude responds with a structured workflow output for your phase",
  },
];

const TROUBLESHOOT = [
  {
    q: "Claude Code can't see my Figma file",
    a: "Run 'claude mcp list' to confirm the Figma MCP is registered. Also make sure the Figma desktop app is open — the MCP needs it running, not the browser version.",
  },
  {
    q: "Figma MCP isn't showing in 'claude mcp list'",
    a: "Re-run the 'claude mcp add' command and make sure your API key is correct. You can also check ~/.claude.json to verify the entry was saved.",
  },
  {
    q: "Claude Code can see my file but can't make changes",
    a: "Check that you have edit access to the Figma file (not just view access). Claude can only modify files you have permission to edit.",
  },
  {
    q: "I'm on the free Claude plan — does this work?",
    a: "Claude Code requires a Claude Pro plan or API access. Claude.ai in the browser (Path B) works on the free plan — you just apply Claude's output to Figma manually.",
  },
  {
    q: "I don't use the command line — is there another way?",
    a: "Path B (claude.ai in the browser) requires no terminal or installation. You lose direct Figma execution, but all the skill files, AI Brief Generator, and Deck Builder work fully in the browser.",
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
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

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
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: 40, fontWeight: 600, color: "#0F172A", margin: "0 0 16px", lineHeight: 1.05 }}>
            Connect Claude to Figma
          </h1>
          <p style={{ fontSize: 15, color: DS.bodyDark, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 580 }}>
            Claude runs across multiple surfaces. This guide covers the ones that matter for design work right now. Pick the path that fits where you are — you can always upgrade from Path B to Path A later.
          </p>

          {/* Path selector */}
          <div className="setup-path-grid">
            {[
              {
                id: "a", color: pathAColor,
                label: "Path A — Full MCP integration",
                sub: "Claude Code executes directly in Figma",
                badges: ["Most powerful", "Requires Claude Pro"],
                detail: "Claude Code (CLI) + Figma desktop app. Claude can read your file, create frames, build components, and write annotations — all from your terminal alongside Figma.",
              },
              {
                id: "b", color: pathBColor,
                label: "Path B — Claude.ai in the browser",
                sub: "Upload skills once, use in every conversation",
                badges: ["No install needed", "All plans supported"],
                detail: "Upload skill files once in Claude settings — they persist across all conversations. Use the AI tools, generate structured design content, and apply it in Figma. No terminal, no config files.",
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
              {activePath === "a" ? "You're ready when Claude responds with the correct file name and pages from your Figma file." : "You're ready when your skills appear in Settings → Customize → Skills and are toggled on."}
            </div>
            <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.65 }}>
              {activePath === "a"
                ? "Once the connection is confirmed, open the Design Process System tool, pick your phase, and copy the Figma Playbook prompt. Paste it into your Claude Code session with your Figma file open — Claude will start executing."
                : "Open a new conversation — your uploaded skills are already active. Describe your project and the phase you're working in. Claude will follow the framework's structured workflow and generate content you can bring into Figma."}
            </div>
          </div>
        </div>

        {/* Figma Community Skills callout */}
        <div style={{ background: DS.white, border: `1px dashed #E2E8F0`, borderRadius: 14, padding: "22px 26px", marginBottom: 48, display: "flex", gap: 18, alignItems: "flex-start" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#9B59F712", border: "1px solid #9B59F740", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#9B59F7", fontSize: 16 }}>✦</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", marginBottom: 5 }}>Extend Claude's Figma capabilities</div>
            <div style={{ fontSize: 12, color: DS.bodyDark, lineHeight: 1.65, marginBottom: 12 }}>
              Once you're connected, browse Figma Community Skills for additional Claude-compatible actions built and approved by the community. These are Figma-native skills — they install in Figma and give Claude Code more ways to act directly on the canvas.
            </div>
            <a
              href="https://www.figma.com/community/skills"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 600, color: "#9B59F7", textDecoration: "none" }}
            >
              Browse Figma Community Skills ↗
            </a>
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
