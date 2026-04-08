import { useState } from "react";

const T = {
  bg: "#0F0F0F",
  surface: "#161616",
  card: "#1A1A1A",
  border: "#2C2C2C",
  borderHover: "#404040",
  text: "#F2F2F2",
  muted: "#999999",
  dim: "#787878",
};

const RAW_AGENTS = "https://raw.githubusercontent.com/quinrobinson/Agentic-Product-Design-Framework/main/.claude/agents";

// Surface colors — used only in the map, never on cards
const SURFACES = {
  chat:   { color: "#4ADE80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.15)",  label: "Claude Chat" },
  code:   { color: "#60A5FA", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.15)",  label: "Claude Code" },
  cowork: { color: "#F59E0B", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.15)",  label: "Claude Cowork" },
};

// Role accent colors — map only
const ROLES = {
  researcher:   "#C084FC",
  strategist:   "#F472B6",
  designer:     "#38BDF8",
  systems:      "#34D399",
  engineer:     "#FB923C",
  orchestrator: "#A8A29E",
};

const AGENTS = [
  {
    id: "researcher",
    name: "Researcher",
    role: "UX Research Agent",
    file: "researcher.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["cowork"],
    description: "Synthesizes interviews, plans research rounds, runs competitive analysis, and produces insight reports. Invoke when starting any research activity — planning a study, synthesizing transcripts, mapping competitors, or generating a findings report.",
    skills: ["research-synthesis", "research-planning", "competitive-analysis", "usability-testing", "recruitment-screener", "insight-framing"],
    mcpTools: ["synthesize_research", "build_competitive_snapshot", "synthesize_findings", "generate_insight_report"],
    activationPrompt: "You are the Researcher agent from the Agentic Product Design Framework. Your role is a senior UX researcher. You synthesize interviews, plan research, run competitive analysis, and produce insight reports. Ask me what phase of research we're in and what decisions this research needs to inform.",
    mapCells: {
      chat:   { type: "primary",    tools: ["synthesize_research", "build_competitive_snapshot", "synthesize_findings", "generate_insight_report"], skills: ["research-synthesis", "research-planning", "competitive-analysis", "usability-testing", "recruitment-screener"] },
      code:   { type: "empty" },
      cowork: { type: "occasional", note: "Observe live usability test sessions. Screen-aware note-taking alongside Maze, Lookback, or UserTesting recordings." },
    },
  },
  {
    id: "strategist",
    name: "Strategist",
    role: "Design Lead Agent",
    file: "strategist.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["code"],
    description: "Frames problems, maps journeys, defines personas, blueprints services, and builds stakeholder decks. Invoke when translating research into a defined problem space, or when preparing strategy artifacts for alignment.",
    skills: ["problem-framing", "journey-mapping", "assumption-mapping", "service-blueprint", "stakeholder-presentation", "persona-creation"],
    mcpTools: ["frame_problem", "map_journey", "generate_service_blueprint", "build_client_deck"],
    activationPrompt: "You are the Strategist agent from the Agentic Product Design Framework. Your role is a senior design lead. You frame problems, map journeys, define personas, blueprint services, and build stakeholder decks. Ask me what we're trying to define and who the key users are.",
    mapCells: {
      chat:   { type: "primary",    tools: ["frame_problem", "map_journey", "generate_service_blueprint", "build_client_deck"], skills: ["problem-framing", "journey-mapping", "assumption-mapping", "service-blueprint", "stakeholder-presentation", "persona-creation"] },
      code:   { type: "occasional", note: "Export journey maps and service blueprints to Figma boards via Figma MCP. Push structured outputs to repo." },
      cowork: { type: "empty" },
    },
  },
  {
    id: "designer",
    name: "Designer",
    role: "Product Design Agent",
    file: "designer.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["code", "cowork"],
    description: "Generates concepts, clusters ideas, maps flows, writes UX copy, and builds concept proofs. Invoke when moving from a defined problem into design exploration, or when generating and evaluating design directions.",
    skills: ["concept-generation", "concept-critique", "idea-clustering", "storyboarding", "prototype-scoping", "user-flow-mapping", "ux-copy"],
    mcpTools: ["generate_concepts", "cluster_ideas", "generate_concept_proof", "map_user_flow", "write_ux_copy"],
    activationPrompt: "You are the Designer agent from the Agentic Product Design Framework. Your role is a senior product designer. You generate concepts, cluster ideas, map flows, write UX copy, and build concept proofs. Ask me what problem we're designing for and what's already been defined.",
    mapCells: {
      chat:   { type: "primary",    tools: ["generate_concepts", "cluster_ideas", "generate_concept_proof", "map_user_flow", "write_ux_copy"], skills: ["concept-generation", "concept-critique", "idea-clustering", "storyboarding", "prototype-scoping", "user-flow-mapping", "ux-copy"] },
      code:   { type: "occasional", note: "Build wireframes and concept frames directly in Figma via MCP. Generate Figma Make prompts from session context." },
      cowork: { type: "occasional", note: "Review live prototypes in Figma or staging. Navigate complex design tools with Claude watching alongside." },
    },
  },
  {
    id: "systems",
    name: "Systems Designer",
    role: "Design Systems Agent",
    file: "systems-designer.md",
    primarySurfaces: ["code"],
    occasionalSurfaces: ["chat"],
    description: "Plans component architecture, specifies states and variants, generates component specs, and manages design tokens. Primary work — pushing token files, Figma MCP operations, Git — happens in Claude Code. Chat is for token strategy and audit analysis.",
    skills: ["design-systems", "design-system-audit", "figma-ds-audit", "figma-ds-export", "figma-playbook", "component-specs"],
    mcpTools: ["plan_component_architecture", "specify_component_states", "generate_component_spec"],
    activationPrompt: "You are the Systems Designer agent from the Agentic Product Design Framework. Your role is a senior design systems engineer. You plan component architecture, specify states, generate specs, and manage design tokens. Ask me what system we're building or auditing.",
    mapCells: {
      chat:   { type: "occasional", note: "Token strategy, naming conventions, component architecture decisions. Audit analysis and recommendations.", skills: ["design-systems", "design-system-audit", "figma-ds-audit"] },
      code:   { type: "primary",    tools: ["plan_component_architecture", "specify_component_states", "generate_component_spec"], skills: ["figma-ds-export", "figma-playbook", "component-specs"], note: "Push tokens.css / tokens.json to repo. Scaffold components in Figma via MCP. Sync design tokens." },
      cowork: { type: "empty" },
    },
  },
  {
    id: "engineer",
    name: "Design Engineer",
    role: "Handoff & QA Agent",
    file: "design-engineer.md",
    primarySurfaces: ["code", "cowork"],
    occasionalSurfaces: ["chat"],
    description: "Generates handoff docs, runs design QA, writes decision records, and annotates accessibility specs. The Claude Cowork use case — reviewing live staging implementations screen-aware, comparing to spec in real time — is the most novel capability this agent unlocks.",
    skills: ["accessibility-audit", "heuristic-review", "design-delivery", "design-qa", "design-decision-record", "handoff-annotation", "accessibility-annotation"],
    mcpTools: ["generate_handoff", "log_design_qa"],
    activationPrompt: "You are the Design Engineer agent from the Agentic Product Design Framework. Your role bridges design and engineering. You generate handoff docs, run design QA, write decision records, and annotate accessibility specs. Ask me what's being handed off and what the current state of implementation is.",
    mapCells: {
      chat:   { type: "occasional", note: "Accessibility audits and heuristic reviews before handoff. Annotation guidance for developers.", skills: ["accessibility-audit", "heuristic-review", "accessibility-annotation"] },
      code:   { type: "primary",    tools: ["generate_handoff", "log_design_qa"], skills: ["design-delivery", "design-qa", "design-decision-record", "handoff-annotation"], note: "Write handoff docs to disk. Run QA against live implementation. Git operations for delivery artifacts." },
      cowork: { type: "primary",    note: "Review live staging implementations. Click through built screens to verify against spec. Screen-aware QA that compares implementation to design intent in real time." },
    },
  },
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Project PM Agent",
    file: "orchestrator.md",
    primarySurfaces: ["code", "chat"],
    occasionalSurfaces: [],
    description: "Orients new projects, routes work to the right specialist agent, manages phase handoff blocks, and tracks what's been decided vs. what's still open. The only agent with a net-new system prompt — no existing skill file as its source. Invoke at the start of a project, when switching phases, or when you're not sure which agent to use.",
    skills: ["which-claude", "skill-chaining", "phase-handoff"],
    mcpTools: ["generate_handoff"],
    activationPrompt: "You are the Orchestrator agent from the Agentic Product Design Framework. Your role is a senior design program manager. You orient new projects, route work to the right specialist agent, manage phase handoff blocks, and track what's been decided vs. what's still open. Ask me what project we're starting and where we are in the process.",
    mapCells: {
      chat:   { type: "primary", note: "Kickoff orientation. Deciding which agent and surface to route to. Generating Phase Handoff Blocks for context transfer between sessions.", skills: ["which-claude", "skill-chaining", "phase-handoff"] },
      code:   { type: "primary",    tools: ["generate_handoff"], note: "Spawns subagents. Reads project state from disk. Routes tasks to the right specialist agent. Manages the handoff block as a living project file across the full six-phase lifecycle." },
      cowork: { type: "empty" },
    },
  },
];

// ── Surface Map ──────────────────────────────────────────────────────────────
function MapCell({ cell, surfaceKey }) {
  const s = SURFACES[surfaceKey];
  if (cell.type === "empty") {
    return (
      <div style={{
        borderRadius: 6, padding: 20, minHeight: 120,
        background: "#1a1a1a", border: "1px dashed #2C2C2C",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, opacity: 0.5 }}>not applicable</span>
      </div>
    );
  }

  const opacity = cell.type === "occasional" ? 0.6 : 1;
  return (
    <div style={{
      borderRadius: 6, padding: 20, minHeight: 120,
      background: s.bg, border: `1px solid ${s.border}`,
      display: "flex", flexDirection: "column", gap: 10,
      opacity,
    }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, color: s.color }}>
        {cell.type === "primary" ? "Primary Surface" : "Occasional"}
      </span>

      {cell.tools && cell.tools.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {cell.tools.map(tool => (
            <div key={tool} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, paddingBottom: 3, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
              {tool}
            </div>
          ))}
        </div>
      )}

      {cell.skills && cell.skills.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {cell.skills.map(sk => (
            <span key={sk} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "2px 7px", borderRadius: 3, background: "rgba(255,255,255,0.05)", color: T.dim, border: `1px solid ${T.border}` }}>{sk}</span>
          ))}
        </div>
      )}

      {cell.note && (
        <p style={{ fontSize: 11, color: T.dim, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>{cell.note}</p>
      )}
    </div>
  );
}

function AgentSurfaceMap() {
  const colStyle = { display: "grid", gridTemplateColumns: "200px 1fr 1fr 1fr", gap: 2 };

  return (
    <div style={{ overflowX: "auto" }}>
      {/* Column headers */}
      <div style={{ ...colStyle, marginBottom: 2, minWidth: 700 }}>
        <div style={{ padding: "14px 20px" }} />
        {["chat", "code", "cowork"].map(sk => {
          const s = SURFACES[sk];
          return (
            <div key={sk} style={{ padding: "14px 20px", borderRadius: "6px 6px 0 0", background: s.bg, border: `1px solid ${s.border}`, borderBottom: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: s.color }}>
              {s.label}
            </div>
          );
        })}
      </div>

      {/* Orchestration label */}
      <div style={{ minWidth: 700 }}>
        {AGENTS.map((agent, i) => {
          const roleColor = ROLES[agent.id];
          const isOrchestrator = agent.id === "orchestrator";

          return (
            <div key={agent.id}>
              {isOrchestrator && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0 6px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Orchestration layer
                  <div style={{ flex: 1, height: 1, background: T.border }} />
                </div>
              )}
              <div style={{ ...colStyle, marginBottom: 2 }}>
                {/* Role card */}
                <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 20, display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: roleColor }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: roleColor, marginTop: 2 }}>{agent.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim }}>{agent.role}</span>
                </div>
                {["chat", "code", "cowork"].map(sk => (
                  <MapCell key={sk} cell={agent.mapCells[sk]} surfaceKey={sk} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Map notes */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginTop: 32, minWidth: 700 }}>
        {[
          { title: "Primary vs Occasional", body: <><strong style={{ color: T.text, fontWeight: 500 }}>Primary</strong> means the agent lives here — it's where the bulk of its work happens and where it should be invoked first. <strong style={{ color: T.text, fontWeight: 500 }}>Occasional</strong> means the agent can extend into this surface for specific tasks, but it's not the home base.</> },
          { title: "What's not yet built", body: <>The agents themselves — <strong style={{ color: T.text, fontWeight: 500 }}>.claude/agents/</strong> directory with one <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>.md</code> per role. Each agent's system prompt is largely composed from its existing skill files. The orchestrator is net-new work. MCP tools already exist.</> },
          { title: "The key insight", body: <>Skills tell Claude <strong style={{ color: T.text, fontWeight: 500 }}>what to do</strong>. Tools give Claude <strong style={{ color: T.text, fontWeight: 500 }}>how to act</strong>. Agents define <strong style={{ color: T.text, fontWeight: 500 }}>who Claude is</strong> in a given context. The surface determines <strong style={{ color: T.text, fontWeight: 500 }}>where that work happens</strong>. Four layers, one framework.</> },
        ].map(n => (
          <div key={n.title} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 24 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{n.title}</p>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Agent Card ───────────────────────────────────────────────────────────────
function AgentCard({ agent }) {
  const [copied, setCopied] = useState(false);

  function copyPrompt() {
    navigator.clipboard.writeText(agent.activationPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  const surfaceLabel = (id) => ({ chat: "Chat", code: "Code", cowork: "Cowork" }[id]);

  return (
    <div
      style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.15s" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHover}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>{agent.name}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim }}>{agent.role}</div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {[...agent.primarySurfaces.map(s => ({ id: s, primary: true })), ...agent.occasionalSurfaces.map(s => ({ id: s, primary: false }))].map(({ id, primary }) => (
            <span key={id} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 3, background: T.card, border: `1px solid ${T.border}`, color: primary ? T.muted : T.dim }}>
              {primary ? "" : "↗ "}{surfaceLabel(id)}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.6, margin: 0 }}>{agent.description}</p>

      {/* Skills */}
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Skills</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {agent.skills.map(sk => (
            <span key={sk} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 99, background: T.card, border: `1px solid ${T.border}`, color: T.muted }}>{sk}</span>
          ))}
        </div>
      </div>

      {/* MCP Tools */}
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>MCP Tools</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {agent.mcpTools.map(t => (
            <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "3px 8px", borderRadius: 3, background: T.card, border: `1px solid ${T.border}`, color: T.muted }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Activation Prompt */}
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Activation Prompt</div>
        <div style={{ position: "relative", background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, padding: "12px 14px" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, lineHeight: 1.6, margin: 0, paddingRight: 64 }}>{agent.activationPrompt}</p>
          <button
            onClick={copyPrompt}
            style={{ position: "absolute", top: 10, right: 10, padding: "4px 10px", borderRadius: 4, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase", background: "transparent", border: `1px solid ${T.border}`, color: copied ? T.text : T.dim, cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { if (!copied) { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.color = T.muted; } }}
            onMouseLeave={e => { if (!copied) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.dim; } }}
          >{copied ? "Copied!" : "Copy"}</button>
        </div>
      </div>

      {/* Download */}
      <a
        href={`${RAW_AGENTS}/${agent.file}`}
        download
        style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: 6, fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase", background: "transparent", border: `1px solid ${T.border}`, color: T.muted, textDecoration: "none", transition: "all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.color = T.text; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
      >↓ Download .md</a>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AgentsPage({ onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'DM Sans', sans-serif", color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${T.border}`, padding: "0 clamp(24px, 5vw, 80px)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50, background: `${T.bg}f0`, backdropFilter: "blur(12px)" }}>
        <button
          onClick={onBack}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em", textTransform: "uppercase", color: T.muted, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.color = T.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
        >← Home</button>
        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", color: T.dim }}>6 agents</span>
      </div>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "56px clamp(24px, 5vw, 80px) 100px" }}>

        {/* ── Hero ── */}
        <section style={{ marginBottom: 72 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: T.dim, marginBottom: 20 }}>Agents</div>
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, lineHeight: 1.1, color: T.text, marginBottom: 20, letterSpacing: "-0.2px" }}>Six specialists. One orchestrator. One framework.</h1>
          <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, maxWidth: 600 }}>
            Agents are the orchestration layer that sits above skills, tools, and prompts. Six specialist agents handle the work — Researcher, Strategist, Designer, Systems Designer, Design Engineer, and a cross-cutting Orchestrator that routes tasks, manages handoff blocks, and coordinates the team. The framework's three artifact types stay unchanged — agents compose them.
          </p>
        </section>

        {/* ── Surface Map ── */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 6 }}>Agent × Surface Map</h2>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.6 }}>Six role-based agents × three Claude surfaces. Primary = where the agent lives. Occasional = where it can extend for specific tasks.</p>
          </div>
          <AgentSurfaceMap />
        </section>

        {/* ── Agent Cards ── */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 6 }}>Agent Definitions</h2>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.6 }}>Each agent ships as a single <code style={{ fontFamily: "'JetBrains Mono', monospace" }}>.md</code> file. Download and place in <code style={{ fontFamily: "'JetBrains Mono', monospace" }}>.claude/agents/</code> for Claude Code, or paste the activation prompt into Claude Chat.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 12 }}>
            {AGENTS.filter(a => a.id !== "orchestrator").map(agent => <AgentCard key={agent.id} agent={agent} />)}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "32px 0 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Orchestration layer
            <div style={{ flex: 1, height: 1, background: T.border }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: 12 }}>
            <AgentCard agent={AGENTS.find(a => a.id === "orchestrator")} />
          </div>
        </section>

        {/* ── Setup Instructions ── */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 6 }}>Setup for Claude Code</h2>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.6 }}>Agents in Claude Code are discovered automatically from <code style={{ fontFamily: "'JetBrains Mono', monospace" }}>.claude/agents/</code>. No configuration required beyond placing the files.</p>
          </div>

          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 10, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 24, maxWidth: 680 }}>
            {[
              { n: "1", label: "Create the agents directory", code: "mkdir -p .claude/agents" },
              { n: "2", label: "Download each agent .md file", note: "Use the download button on each card above." },
              { n: "3", label: "Place files in .claude/agents/", code: ".claude/\n  agents/\n    researcher.md\n    strategist.md\n    designer.md\n    systems-designer.md\n    design-engineer.md\n    orchestrator.md" },
              { n: "4", label: "Open Claude Code in your project root", code: "claude", note: "Agents are discovered automatically." },
              { n: "5", label: "Start with the Orchestrator on a new project", note: "It will read the project state and route work to the right specialist agent." },
            ].map(step => (
              <div key={step.n} style={{ display: "flex", gap: 16 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.dim, width: 20, flexShrink: 0, paddingTop: 1 }}>{step.n}.</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: T.text, fontFamily: "'DM Sans', sans-serif", marginBottom: step.code || step.note ? 8 : 0 }}>{step.label}</div>
                  {step.code && (
                    <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.muted, background: T.card, border: `1px solid ${T.border}`, borderRadius: 6, padding: "10px 14px", margin: 0, lineHeight: 1.6, overflowX: "auto" }}>{step.code}</pre>
                  )}
                  {step.note && (
                    <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.6, margin: step.code ? "6px 0 0" : 0 }}>{step.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Claude Chat Activation ── */}
        <section>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 20, fontWeight: 600, color: T.text, marginBottom: 6 }}>Using Agents in Claude Chat</h2>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.6 }}>No Claude Code required. Paste an activation prompt as your first message to activate an agent's role and behavior.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 680 }}>
            {[
              { n: "1", text: "Open a new conversation in Claude Chat (claude.ai)." },
              { n: "2", text: "Copy the activation prompt from any agent card above." },
              { n: "3", text: "Paste it as your first message. Claude will respond in that agent's role." },
              { n: "4", text: "Optionally upload the relevant skill .md files from the Skills Library. Drag them into the chat window before sending." },
            ].map(step => (
              <div key={step.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.dim, width: 20, flexShrink: 0, paddingTop: 1 }}>{step.n}.</div>
                <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            ))}

            <div style={{ marginTop: 8, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.18)", borderRadius: 8, padding: "14px 18px" }}>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>
                <span style={{ fontWeight: 600, color: T.text }}>For full agent capability</span> — including Figma MCP operations, file system access, and the ability to spawn subagents — use Claude Code. Chat activation gives you the role and reasoning; Code gives you the actions.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
