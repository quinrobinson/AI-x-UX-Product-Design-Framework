import React, { useState } from "react";
import { IconCircleFilled, IconCircleHalf } from "@tabler/icons-react";

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

const SURFACES = {
  chat:   { color: "#4ADE80", bg: "rgba(74,222,128,0.07)",  border: "rgba(74,222,128,0.15)",  label: "Claude Chat" },
  code:   { color: "#60A5FA", bg: "rgba(96,165,250,0.07)",  border: "rgba(96,165,250,0.15)",  label: "Claude Code" },
  cowork: { color: "#F59E0B", bg: "rgba(245,158,11,0.07)",  border: "rgba(245,158,11,0.15)",  label: "Claude Cowork" },
};

const ROLES = {
  researcher:   "#C084FC",
  strategist:   "#F472B6",
  designer:     "#38BDF8",
  systems:      "#34D399",
  engineer:     "#FB923C",
  orchestrator: "#A8A29E",
};

const SURFACE_LABEL = { chat: "Chat", code: "Code", cowork: "Cowork" };

const AGENTS = [
  {
    id: "researcher",
    name: "Researcher",
    role: "UX Research Agent",
    file: "researcher.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["cowork"],
    description: "Synthesizes interviews, plans research rounds, runs competitive analysis, and produces insight reports. Invoke when starting any research activity — planning a study, synthesizing transcripts, mapping competitors, or generating a findings report.",
    howToUse: "Open Claude Chat and paste the activation prompt as your first message. Tell the agent what phase of research you're in and what decisions the research needs to inform. Upload relevant skill files (research-synthesis.md, competitive-analysis.md) from the Skills Library for deeper context.",
    skills: ["research-synthesis", "research-planning", "competitive-analysis", "usability-testing", "recruitment-screener", "insight-framing"],
    mcpTools: ["synthesize_research", "build_competitive_snapshot", "synthesize_findings", "generate_insight_report"],
    activationPrompt: "You are the Researcher agent from the Agentic Product Design Framework. Your role is a senior UX researcher. You synthesize interviews, plan research, run competitive analysis, and produce insight reports. Ask me what phase of research we're in and what decisions this research needs to inform.",
    mapCells: {
      chat:   { type: "primary",    tools: ["synthesize_research", "build_competitive_snapshot", "synthesize_findings", "generate_insight_report"], skills: ["research-synthesis", "research-planning", "competitive-analysis", "usability-testing", "recruitment-screener"] },
      code:   { type: "occasional", skills: ["figma-playbook", "competitive-analysis", "service-blueprint"], note: "Push research artifacts to Figma via MCP. Build Research Findings Boards and Competitive Analysis matrices from synthesized data." },
      cowork: { type: "occasional", note: "Observe live usability test sessions. Screen-aware note-taking alongside Maze, Lookback, or UserTesting recordings." },
    },
    commands: [
      { name: "/synthesize-research",  desc: "Synthesize sessions into themes, insights, directions",        inputs: ["research_question", "session_notes"] },
      { name: "/competitive-snapshot", desc: "Map the competitive landscape and surface opportunities",       inputs: ["product", "design_question"] },
      { name: "/synthesize-findings",  desc: "Consolidate usability test notes into structured findings",    inputs: ["tasks_tested", "session_notes"] },
      { name: "/insight-report",       desc: "Generate a stakeholder-ready insight report",                  inputs: ["prototype_name", "synthesis", "decision_needed"] },
    ],
  },
  {
    id: "strategist",
    name: "Strategist",
    role: "Design Lead Agent",
    file: "strategist.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["code"],
    description: "Frames problems, maps journeys, defines personas, blueprints services, and builds stakeholder decks. Invoke when translating research into a defined problem space, or when preparing strategy artifacts for alignment.",
    howToUse: "Open Claude Chat and paste the activation prompt. Share your research handoff block or insight summary first — this agent works from evidence, not assumptions. Upload problem-framing.md or journey-mapping.md from the Skills Library to extend its capabilities.",
    skills: ["problem-framing", "journey-mapping", "assumption-mapping", "service-blueprint", "stakeholder-presentation", "persona-creation"],
    mcpTools: ["frame_problem", "map_journey", "generate_service_blueprint", "build_client_deck"],
    activationPrompt: "You are the Strategist agent from the Agentic Product Design Framework. Your role is a senior design lead. You frame problems, map journeys, define personas, blueprint services, and build stakeholder decks. Ask me what we're trying to define and who the key users are.",
    mapCells: {
      chat:   { type: "primary",    tools: ["frame_problem", "map_journey", "generate_service_blueprint", "build_client_deck"], skills: ["problem-framing", "journey-mapping", "assumption-mapping", "service-blueprint", "stakeholder-presentation", "persona-creation"] },
      code:   { type: "occasional", note: "Export journey maps and service blueprints to Figma boards via Figma MCP. Push structured outputs to repo." },
      cowork: { type: "occasional", skills: ["journey-mapping", "service-blueprint"], note: "Walk through Figma journey maps and service blueprints in real time with stakeholders. Review and refine live strategy artifacts." },
    },
    commands: [
      { name: "/frame-problem",     desc: "Transform research into problem statements and HMW questions",        inputs: ["research_data", "persona"] },
      { name: "/map-journey",       desc: "Build a journey map across stages, emotions, and opportunities",      inputs: ["persona", "goal"] },
      { name: "/service-blueprint", desc: "Generate a service blueprint across all swim lanes",                  inputs: ["persona", "goal"] },
      { name: "/client-deck",       desc: "Build a structured client presentation with speaker notes",           inputs: ["project_name", "deck_goal", "desired_outcome"] },
    ],
  },
  {
    id: "designer",
    name: "Designer",
    role: "Product Design Agent",
    file: "designer.md",
    primarySurfaces: ["chat"],
    occasionalSurfaces: ["code", "cowork"],
    description: "Generates concepts, clusters ideas, maps flows, writes UX copy, and builds concept proofs. Invoke when moving from a defined problem into design exploration, or when generating and evaluating design directions.",
    howToUse: "Open Claude Chat and paste the activation prompt. Share the problem statement and HMW questions from the Strategist's handoff block. Upload concept-generation.md or user-flow-mapping.md from the Skills Library to extend its toolkit.",
    skills: ["concept-generation", "concept-critique", "idea-clustering", "storyboarding", "prototype-scoping", "user-flow-mapping", "ux-copy-writing"],
    mcpTools: ["generate_concepts", "cluster_ideas", "generate_concept_proof", "map_user_flow", "write_ux_copy"],
    activationPrompt: "You are the Designer agent from the Agentic Product Design Framework. Your role is a senior product designer. You generate concepts, cluster ideas, map flows, write UX copy, and build concept proofs. Ask me what problem we're designing for and what's already been defined.",
    mapCells: {
      chat:   { type: "primary",    tools: ["generate_concepts", "cluster_ideas", "generate_concept_proof", "map_user_flow", "write_ux_copy"], skills: ["concept-generation", "concept-critique", "idea-clustering", "storyboarding", "prototype-scoping", "user-flow-mapping", "ux-copy-writing"] },
      code:   { type: "occasional", note: "Build wireframes and concept frames directly in Figma via MCP. Generate Figma Make prompts from session context." },
      cowork: { type: "occasional", note: "Review live prototypes in Figma or staging. Navigate complex design tools with Claude watching alongside." },
    },
    commands: [
      { name: "/generate-concepts", desc: "Generate meaningfully distinct design concepts",                    inputs: ["problem_statement", "persona"] },
      { name: "/cluster-ideas",     desc: "Cluster raw ideas into strategic themes",                           inputs: ["concepts", "problem_statement"] },
      { name: "/concept-proof",     desc: "Generate a Figma Make prompt for a clickable concept proof",        inputs: ["concept_name", "user_perspective", "key_mechanism", "key_assumption"] },
      { name: "/map-flow",          desc: "Map a user flow including decision points and error states",        inputs: ["entry_point", "goal"] },
      { name: "/ux-copy",           desc: "Define voice and generate copy for a product flow",                 inputs: ["product", "persona", "flow"] },
    ],
  },
  {
    id: "systems",
    name: "Systems Designer",
    role: "Design Systems Agent",
    file: "systems-designer.md",
    primarySurfaces: ["code"],
    occasionalSurfaces: ["chat"],
    description: "Plans component architecture, specifies states and variants, generates component specs, and manages design tokens. Primary work — pushing token files, Figma MCP operations, Git — happens in Claude Code. Chat is for token strategy and audit analysis.",
    howToUse: "Open Claude Code in your project root and run the agent from .claude/agents/. For token strategy or audit analysis without file operations, use Claude Chat with the activation prompt. Upload design-systems.md or figma-playbook.md from the Skills Library.",
    skills: ["design-systems", "design-system-audit", "figma-ds-audit", "figma-ds-export", "figma-playbook", "component-specs"],
    mcpTools: ["plan_component_architecture", "specify_component_states", "generate_component_spec"],
    activationPrompt: "You are the Systems Designer agent from the Agentic Product Design Framework. Your role is a senior design systems engineer. You plan component architecture, specify states, generate specs, and manage design tokens. Ask me what system we're building or auditing.",
    mapCells: {
      chat:   { type: "occasional", note: "Token strategy, naming conventions, component architecture decisions. Audit analysis and recommendations.", skills: ["design-systems", "design-system-audit", "figma-ds-audit"] },
      code:   { type: "primary",    tools: ["plan_component_architecture", "specify_component_states", "generate_component_spec"], skills: ["figma-ds-export", "figma-playbook", "component-specs"], note: "Push tokens.css / tokens.json to repo. Scaffold components in Figma via MCP. Sync design tokens." },
      cowork: { type: "occasional", skills: ["design-systems", "figma-ds-audit"], note: "Review a live design system implementation alongside a developer. Spot token drift and component divergence in real time across a browser-based design tool." },
    },
    commands: [
      { name: "/component-architecture", desc: "Analyze screens and produce a component breakdown",               inputs: ["screen_inventory"] },
      { name: "/component-states",       desc: "Generate a complete state inventory for a component",             inputs: ["component_name", "component_type"] },
      { name: "/component-spec",         desc: "Generate full component documentation for handoff",               inputs: ["component_name", "description"] },
    ],
  },
  {
    id: "engineer",
    name: "Design Engineer",
    role: "Handoff & QA Agent",
    file: "design-engineer.md",
    primarySurfaces: ["code", "cowork"],
    occasionalSurfaces: ["chat"],
    description: "Generates handoff docs, runs design QA, writes decision records, and annotates accessibility specs. Use Claude Code to build prototype and production code from specs. Use Claude Cowork for screen-aware QA against live staging — reviewing implementations alongside the spec in real time.",
    howToUse: "Use Claude Code to translate component specs into working code and generate handoff artifacts to disk. Use Claude Cowork to review live staging implementations screen-aware, comparing against spec in real time. For pre-handoff accessibility audits or heuristic reviews, Claude Chat with the activation prompt works well.",
    skills: ["accessibility-audit", "heuristic-review", "design-delivery", "design-qa", "design-decision-record", "handoff-annotation", "accessibility-annotation"],
    mcpTools: ["generate_handoff", "log_design_qa"],
    activationPrompt: "You are the Design Engineer agent from the Agentic Product Design Framework. Your role bridges design and engineering. You generate handoff docs, run design QA, write decision records, and annotate accessibility specs. Ask me what's being handed off and what the current state of implementation is.",
    mapCells: {
      chat:   { type: "occasional", note: "Accessibility audits and heuristic reviews before handoff. Annotation guidance for developers.", skills: ["accessibility-audit", "heuristic-review", "accessibility-annotation"] },
      code:   { type: "primary",    tools: ["generate_handoff", "log_design_qa"], skills: ["prototyping", "design-delivery", "design-qa", "design-decision-record", "handoff-annotation", "component-specs"], note: "Build prototype and production code from component specs. Write handoff docs to disk. Translate design tokens to CSS custom properties. Generate all component states. Run QA artifacts and Git operations for delivery." },
      cowork: { type: "primary",    note: "Review live staging implementations. Click through built screens to verify against spec. Screen-aware QA that compares implementation to design intent in real time." },
    },
    commands: [
      { name: "/handoff",    desc: "Generate a prototype handoff document for engineering",        inputs: ["screens_built", "flows_covered", "problem_statement"] },
      { name: "/design-qa", desc: "Structure QA notes into a severity-rated issue log",            inputs: ["feature", "raw_notes"] },
    ],
  },
  {
    id: "orchestrator",
    name: "Orchestrator",
    role: "Project PM Agent",
    file: "orchestrator.md",
    primarySurfaces: ["code", "chat"],
    occasionalSurfaces: [],
    description: "Orients new projects, routes work to the right specialist agent, manages phase handoff blocks, and tracks what's been decided vs. what's still open. Invoke at the start of a project, when switching phases, or when you're not sure which agent to use.\n\nIn Claude Code, the Orchestrator runs in autonomous mode — spawning specialist agents without manual routing. Run /kickoff, /discover, or /deliver to trigger autonomous phase execution. Requires .apdf/context.json to be filled in first.",
    howToUse: "Start here on any new project. In Claude Code, it spawns specialist agents and manages the handoff block as a living file. In Claude Chat, paste the activation prompt and describe where you are in the project — it will tell you which agent to invoke next and on which surface.",
    skills: ["which-claude", "skill-chaining", "phase-handoff"],
    mcpTools: ["generate_handoff"],
    activationPrompt: "You are the Orchestrator agent from the Agentic Product Design Framework. Your role is a senior design program manager. You orient new projects, route work to the right specialist agent, manage phase handoff blocks, and track what's been decided vs. what's still open. Ask me what project we're starting and where we are in the process.",
    mapCells: {
      chat:   { type: "primary", note: "Kickoff orientation. Deciding which agent and surface to route to. Generating Phase Handoff Blocks for context transfer between sessions.", skills: ["which-claude", "skill-chaining", "phase-handoff"] },
      code:   { type: "primary", tools: ["generate_handoff"], note: "Spawns subagents. Reads project state from disk. Routes tasks to the right specialist agent. Manages the handoff block as a living project file across the full six-phase lifecycle." },
      cowork: { type: "occasional", skills: ["skill-chaining", "phase-handoff"], note: "Coordinate multi-agent workflows in a shared session. Review phase progress alongside a specialist agent. Hand off context between phases in real time." },
    },
    commands: [
      { name: "/handoff-block", desc: "Generate a Phase Handoff Block for the next phase session",                                                inputs: ["current_phase", "summary"] },
      { name: "/route",         desc: "Read project context and recommend which agent and command to run next",                                     inputs: [] },
      { name: "/transition",    desc: "Read the latest phase handoff block and propose the next phase plan — spawns agents after confirmation",    inputs: [] },
      { name: "/kickoff",       desc: "Read project state and autonomously kick off the current phase",                                            inputs: [] },
      { name: "/discover",      desc: "Run the full Discover phase in parallel — research synthesis, competitive analysis, optional blueprint",    inputs: ["session-notes.md in .apdf/inputs/"] },
      { name: "/deliver",       desc: "Run the full Deliver phase — parallel component architecture, handoff docs, and QA log",                   inputs: ["screen-inventory.md in .apdf/inputs/"] },
    ],
  },
];

// ── Map Cell ─────────────────────────────────────────────────────────────────
function MapCell({ cell }) {
  if (cell.type === "empty") {
    return (
      <div style={{ borderRadius: 6, padding: 20, minHeight: 120, background: "transparent", border: "1px dashed #2C2C2C" }} />
    );
  }

  const isPrimary = cell.type === "primary";
  const cellBg     = isPrimary ? "rgba(255,255,255,0.05)" : "transparent";
  const cellBorder = isPrimary ? "rgba(255,255,255,0.12)" : T.border;
  const labelColor = isPrimary ? T.muted : T.dim;
  const dotColor   = isPrimary ? T.muted : T.dim;
  const contentOpacity = isPrimary ? 1 : 0.5;

  return (
    <div style={{ borderRadius: 6, padding: 20, minHeight: 120, background: cellBg, border: `1px solid ${cellBorder}`, display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, color: labelColor, display: "flex", alignItems: "center", gap: 5 }}>
        {isPrimary
          ? <IconCircleFilled size={12} style={{ flexShrink: 0 }} />
          : <IconCircleHalf size={12} style={{ flexShrink: 0, opacity: 0.75 }} />}
        {isPrimary ? "Primary" : "Occasional"}
      </span>
      <div style={{ opacity: contentOpacity, display: "flex", flexDirection: "column", gap: 10 }}>
        {cell.tools && cell.tools.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {cell.tools.map(tool => (
              <div key={tool} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, paddingBottom: 3, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
                {tool}
              </div>
            ))}
          </div>
        )}
        {cell.skills && cell.skills.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {cell.skills.map(sk => (
              <span key={sk} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "2px 7px", borderRadius: 3, background: "rgba(255,255,255,0.04)", color: T.dim, border: `1px solid ${T.border}` }}>{sk}</span>
            ))}
          </div>
        )}
        {cell.note && <p style={{ fontSize: 11, color: T.dim, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>{cell.note}</p>}
      </div>
    </div>
  );
}

// ── Surface Map ──────────────────────────────────────────────────────────────
function AgentSurfaceMap({ onAgentClick, onSetupClick }) {
  const specialists = AGENTS.filter(a => a.id !== "orchestrator");
  const orchestrator = AGENTS.find(a => a.id === "orchestrator");
  const gridCols = "200px repeat(3, 1fr)";
  const minW = 800;

  return (
    <div style={{ overflowX: "auto" }}>

      {/* Column headers */}
      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 2, marginBottom: 2, minWidth: minW }}>
        <div />
        {["chat", "code", "cowork"].map(surface => (
          <div key={surface} style={{ padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: "6px 6px 0 0" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {SURFACES[surface].label}
            </span>
          </div>
        ))}
      </div>

      {/* Orchestrator row */}
      {(() => {
        const rc = ROLES[orchestrator.id];
        return (
          <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: 2, marginBottom: 2, minWidth: minW }}>
            <div
              onClick={() => onAgentClick(orchestrator)}
              style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "14px 16px", cursor: "pointer", transition: "border-color 0.15s", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHover}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
            >
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: rc }} />
              <div style={{ paddingLeft: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: rc, lineHeight: 1.3 }}>{orchestrator.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, marginTop: 3 }}>{orchestrator.role}</div>
              </div>
              <div style={{ paddingLeft: 8, marginTop: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: T.dim, opacity: 0.5, letterSpacing: "0.06em" }}>View →</div>
            </div>
            {["chat", "code", "cowork"].map(surface => (
              <MapCell key={surface} cell={orchestrator.mapCells[surface]} />
            ))}
          </div>
        );
      })()}

      {/* Specialist divider */}
      <div style={{ borderTop: `1px solid ${T.border}`, margin: "10px 0 10px", opacity: 0.4 }} />

      {/* Specialist rows */}
      {specialists.map(agent => {
        const rc = ROLES[agent.id];
        return (
          <div key={agent.id} style={{ display: "grid", gridTemplateColumns: gridCols, gap: 2, marginBottom: 2, minWidth: minW }}>
            <div
              onClick={() => onAgentClick(agent)}
              style={{ background: T.surface, border: `1px solid ${T.border}`, padding: "14px 16px", cursor: "pointer", transition: "border-color 0.15s", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHover}
              onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
            >
              <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: rc }} />
              <div style={{ paddingLeft: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: rc, lineHeight: 1.3 }}>{agent.name}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, marginTop: 3 }}>{agent.role}</div>
              </div>
              <div style={{ paddingLeft: 8, marginTop: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: T.dim, opacity: 0.5, letterSpacing: "0.06em" }}>View →</div>
            </div>
            {["chat", "code", "cowork"].map(surface => (
              <MapCell key={surface} cell={agent.mapCells[surface]} />
            ))}
          </div>
        );
      })}

      {/* Map note cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, marginTop: 32, minWidth: minW }}>
        {[
          { title: "Primary vs Occasional", body: <><strong style={{ color: T.text, fontWeight: 500 }}>Primary</strong> means the agent lives here — it's where the bulk of its work happens and where it should be invoked first. <strong style={{ color: T.text, fontWeight: 500 }}>Occasional</strong> means the agent can extend into this surface for specific tasks, but it's not the home base.</> },
          { title: "The key insight", body: <>Skills tell Claude <strong style={{ color: T.text, fontWeight: 500 }}>what to do</strong>. Tools give Claude <strong style={{ color: T.text, fontWeight: 500 }}>how to act</strong>. Agents define <strong style={{ color: T.text, fontWeight: 500 }}>who Claude is</strong> in a given context. The surface determines <strong style={{ color: T.text, fontWeight: 500 }}>where that work happens</strong>. Four layers, one framework.</> },
        ].map(n => (
          <div key={n.title} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 24 }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{n.title}</p>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>{n.body}</p>
          </div>
        ))}
        <div
          onClick={onSetupClick}
          style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 24, cursor: "pointer", transition: "border-color 0.15s", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = T.borderHover}
          onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
        >
          <div>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Setup & Activation</p>
            <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.7 }}>Install agents in Claude Code or activate via Claude Chat — no configuration required beyond placing the .md files.</p>
          </div>
          <div style={{ marginTop: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.6 }}>Open →</div>
        </div>
      </div>
    </div>
  );
}

// ── Drawer ───────────────────────────────────────────────────────────────────
function AgentDrawerContent({ agent }) {
  const [copied, setCopied] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const roleColor = ROLES[agent.id];

  function copyCmd(name) {
    navigator.clipboard.writeText(name).then(() => {
      setCopiedCmd(name);
      setTimeout(() => setCopiedCmd(null), 1500);
    });
  }

  function copyPrompt() {
    navigator.clipboard.writeText(agent.activationPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Role color bar */}
      <div style={{ height: 3, background: roleColor, margin: "-24px -24px 0", borderRadius: "0 0 0 0" }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: T.text, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>{agent.name}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim }}>{agent.role}</div>
        </div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {[...agent.primarySurfaces.map(s => ({ id: s, primary: true })), ...agent.occasionalSurfaces.map(s => ({ id: s, primary: false }))].map(({ id, primary }) => (
            <span key={id} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 3, background: T.card, border: `1px solid ${T.border}`, color: primary ? T.muted : T.dim }}>
              {primary ? "" : "↗ "}{SURFACE_LABEL[id]}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>{agent.description}</p>

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

      {/* Commands */}
      {agent.commands && agent.commands.length > 0 && (
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Commands</div>
          {agent.commands.map((cmd, i) => (
            <div
              key={cmd.name}
              style={{ padding: "8px 0", borderBottom: i < agent.commands.length - 1 ? `1px solid ${T.border}` : "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: cmd.inputs.length > 0 ? 5 : 0 }}>
                <button
                  onClick={() => copyCmd(cmd.name)}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, background: "transparent", border: "none", cursor: "pointer", color: copiedCmd === cmd.name ? T.muted : T.text, padding: 0, textAlign: "left", transition: "color 0.15s" }}
                >
                  {copiedCmd === cmd.name ? "Copied!" : cmd.name}
                </button>
              </div>
              <div style={{ fontSize: 12, color: T.dim, lineHeight: 1.5, marginBottom: cmd.inputs.length > 0 ? 6 : 0 }}>{cmd.desc}</div>
              {cmd.inputs.length > 0 && (
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {cmd.inputs.map(inp => (
                    <span key={inp} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, padding: "2px 7px", borderRadius: 99, background: T.card, border: `1px solid ${T.border}`, color: T.dim }}>
                      {inp}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: T.border }} />

      {/* How to use */}
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>How to use this agent</div>
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: "0 0 14px" }}>{agent.howToUse}</p>
        <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 6, padding: "10px 14px" }}>
          <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: T.muted, fontWeight: 500 }}>For MCP tool access and file operations</span>, use Claude Code. Paste the activation prompt as a Claude Code system prompt or place the .md file in <code style={{ fontFamily: "'JetBrains Mono', monospace" }}>.claude/agents/</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

function SetupDrawerContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Setup & Activation</div>
        <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.65, margin: 0 }}>Two ways to use agents — Claude Code for full capability, Claude Chat for reasoning and synthesis without file operations.</p>
      </div>

      {/* Claude Code */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: SURFACES.code.color, textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 3, background: SURFACES.code.bg, border: `1px solid ${SURFACES.code.border}` }}>Claude Code</span>
          <span style={{ fontSize: 12, color: T.dim }}>Full capability</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { n: "1", label: "Create the agents directory", code: "mkdir -p .claude/agents" },
            { n: "2", label: "Download each agent .md file", note: "Click any agent in the map to open its drawer, then use the download button." },
            { n: "3", label: "Place files in .claude/agents/", code: ".claude/\n  agents/\n    researcher.md\n    strategist.md\n    designer.md\n    systems-designer.md\n    design-engineer.md\n    orchestrator.md" },
            { n: "4", label: "Open Claude Code in your project root", code: "claude", note: "Agents are discovered automatically — no additional configuration needed." },
            { n: "5", label: "Start with the Orchestrator", note: "It reads the project state and routes work to the right specialist agent." },
          ].map(step => (
            <div key={step.n} style={{ display: "flex", gap: 14 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.dim, width: 18, flexShrink: 0, paddingTop: 1 }}>{step.n}.</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: T.text, fontFamily: "'DM Sans', sans-serif", marginBottom: step.code || step.note ? 6 : 0 }}>{step.label}</div>
                {step.code && <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.muted, background: T.card, border: `1px solid ${T.border}`, borderRadius: 5, padding: "8px 12px", margin: 0, lineHeight: 1.6, overflowX: "auto" }}>{step.code}</pre>}
                {step.note && <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.6, margin: step.code ? "6px 0 0" : 0 }}>{step.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: T.border }} />

      {/* Claude Chat */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: SURFACES.chat.color, textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 3, background: SURFACES.chat.bg, border: `1px solid ${SURFACES.chat.border}` }}>Claude Chat</span>
          <span style={{ fontSize: 12, color: T.dim }}>No setup required</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { n: "1", text: "Open a new conversation at claude.ai." },
            { n: "2", text: "Click any agent's role card in the map above to open its drawer." },
            { n: "3", text: "Copy the activation prompt and paste it as your first message." },
            { n: "4", text: "Optionally upload the relevant skill .md files from the Skills Library — drag them into the chat window before sending." },
          ].map(step => (
            <div key={step.n} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.dim, width: 18, flexShrink: 0, paddingTop: 1 }}>{step.n}.</div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6, margin: 0 }}>{step.text}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.15)", borderRadius: 6, padding: "12px 14px" }}>
          <p style={{ fontSize: 12, color: T.dim, lineHeight: 1.6, margin: 0 }}>
            <span style={{ color: T.muted, fontWeight: 500 }}>For full agent capability</span> — including Figma MCP operations, file system access, and the ability to spawn subagents — use Claude Code. Chat activation gives you the role and reasoning; Code gives you the actions.
          </p>
        </div>
      </div>
    </div>
  );
}

function Drawer({ content, onClose }) {
  if (!content) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Drawer header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "16px 24px", borderBottom: `1px solid ${T.border}`, flexShrink: 0 }}>
        <button
          onClick={onClose}
          style={{ background: "transparent", border: `1px solid ${T.border}`, borderRadius: 6, padding: "5px 10px", cursor: "pointer", fontSize: 14, color: T.muted, lineHeight: 1, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderHover; e.currentTarget.style.color = T.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
        >×</button>
      </div>
      {/* Drawer content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
        {content.type === "agent" ? <AgentDrawerContent agent={content.agent} /> : <SetupDrawerContent />}
      </div>
    </div>
  );
}

// ── Skills Data ──────────────────────────────────────────────────────────────
const SKILL_PHASES = [
  {
    phase: "01 — Discover",
    skills: [
      { name: "Research Planning",          desc: "Scaffold a research plan and interview guide from a project brief or business goal.",                                    leverage: "high" },
      { name: "Research Synthesis",         desc: "Transform raw research data into structured themes, ranked pain points, and actionable insights.",                      leverage: "high" },
      { name: "Competitive Analysis",       desc: "Map the competitive landscape, audit UX patterns across products, and identify differentiation opportunities.",         leverage: "high" },
      { name: "Insight Framing",            desc: "Transform synthesized research insights into sharp, actionable HMW statements that seed ideation.",                     leverage: "high" },
      { name: "Service Blueprint",          desc: "Generate current-state and future-state service blueprints that map the full end-to-end experience.",                  leverage: "high" },
    ],
  },
  {
    phase: "02 — Define",
    skills: [
      { name: "Problem Framing",            desc: "Transform research outputs into a focused, pressure-tested problem frame with HMW questions and a design brief.",       leverage: "high" },
      { name: "Journey Mapping",            desc: "Generate research-grounded journey maps visualizing actions, thoughts, emotions, and opportunities.",                   leverage: "high" },
      { name: "Persona Creation",           desc: "Generate research-grounded personas that humanize user data and anchor design decisions.",                              leverage: "high" },
      { name: "Assumption Mapping",         desc: "Surface, categorize, and prioritize the team's implicit assumptions before committing to a design direction.",          leverage: "high" },
      { name: "Requirements Prioritization",desc: "Systematically prioritize design requirements using MoSCoW, RICE, and Impact/Effort frameworks.",                      leverage: "high" },
    ],
  },
  {
    phase: "03 — Ideate",
    skills: [
      { name: "Concept Generation",         desc: "Generate a broad set of design concepts from a validated problem frame using structured brainstorming.",                leverage: "high" },
      { name: "Concept Critique",           desc: "Systematically evaluate concept directions before prototyping, surfacing weaknesses and hidden assumptions.",           leverage: "high" },
      { name: "Concept Proof",              desc: "Generate Figma Make prompts that turn written concept cards into throwaway interactive prototypes.",                    leverage: "high" },
      { name: "Idea Clustering",            desc: "Transform a large set of raw concepts into a navigable landscape of strategic directions.",                            leverage: "high" },
      { name: "Storyboarding",              desc: "Translate a selected concept into a narrative visualization of how a user experiences it before wireframing.",         leverage: "high" },
      { name: "Visual Design Execution",    desc: "Select visual styles, build color systems, pair typography, define spacing scales, and produce motion principles.",    leverage: "high" },
    ],
  },
  {
    phase: "04 — Prototype",
    skills: [
      { name: "Prototyping",                desc: "Build functional prototypes and validate interaction quality across web and native platforms.",                         leverage: "high" },
      { name: "User Flow Mapping",          desc: "Map the complete step-by-step path a user takes including decision points, branches, and error paths.",                leverage: "high" },
      { name: "UX Copy Writing",            desc: "Write all interface text — labels, CTAs, error messages, empty states, onboarding copy, and tooltips.",                leverage: "high" },
      { name: "Prototype Scoping",          desc: "Define exactly what to build and what to leave out before prototyping begins.",                                        leverage: "high" },
      { name: "Accessibility Audit",        desc: "Audit designs, prototypes, and code for WCAG 2.1 AA compliance across web and native mobile.",                        leverage: "high" },
      { name: "Heuristic Review",           desc: "Evaluate a prototype against Nielsen's 10 usability heuristics before user testing.",                                  leverage: "high" },
      { name: "Test Script Drafting",       desc: "Write a complete usability test script — scenarios, tasks, observation prompts, and post-test questions.",             leverage: "high" },
    ],
  },
  {
    phase: "05 — Validate",
    skills: [
      { name: "Usability Testing",          desc: "Plan, run, and analyze usability tests and heuristic evaluations.",                                                    leverage: "high" },
      { name: "Findings Synthesis",         desc: "Synthesize raw usability test notes into structured findings with themes, frequency, and severity.",                   leverage: "high" },
      { name: "Insight Report",             desc: "Generate a complete usability findings report — from raw synthesis to a structured stakeholder document.",             leverage: "high" },
      { name: "Iteration Brief",            desc: "Convert usability test findings into a precise, actionable iteration brief with prioritized changes.",                 leverage: "high" },
      { name: "Recruitment Screener",       desc: "Generate a participant recruitment screener with criteria, questions, and disqualifiers from a persona.",              leverage: "high" },
      { name: "Stakeholder Presentation",   desc: "Reframe test findings for executive, engineering, and design team audiences — each version tailored differently.",    leverage: "high" },
    ],
  },
  {
    phase: "06 — Deliver",
    skills: [
      { name: "Design Delivery",            desc: "Create component specifications, developer handoff docs, and platform-specific delivery packages.",                    leverage: "high" },
      { name: "Component Specs",            desc: "Generate complete component specifications — every state, variant, spacing value, and interaction behavior.",          leverage: "high" },
      { name: "Design QA",                  desc: "Structure, prioritize, and document QA issues comparing the built implementation to the design spec.",                 leverage: "high" },
      { name: "Accessibility Annotation",   desc: "Generate WCAG 2.1 AA accessibility annotations for design handoff — ARIA roles, focus order, and screen reader support.", leverage: "high" },
      { name: "Handoff Annotation",         desc: "Generate screen-by-screen annotation text for developer handoff — behaviors, edge cases, and interaction notes.",     leverage: "high" },
      { name: "Design Decision Record",     desc: "Document why specific design choices were made — context, alternatives considered, and rationale.",                   leverage: "high" },
      { name: "Design System Audit",        desc: "Audit a design system before handoff against Material, Atlassian, Carbon, and Apple HIG standards.",                  leverage: "high" },
    ],
  },
  {
    phase: "Cross-phase",
    skills: [
      { name: "Design Systems",             desc: "Audit a product against industry-leading design systems with token documentation and Figma variable setup.",           leverage: "high" },
      { name: "Figma Playbook",             desc: "Execute design work directly in Figma using the Figma MCP — frames, components, variables, and annotations.",         leverage: "high" },
      { name: "Figma DS Audit",             desc: "Audit an existing Figma design system by reading variables, styles, and components for gaps.",                        leverage: "high" },
      { name: "Figma DS Export",            desc: "Export a design system built in the Design System Studio to Figma as variables and text styles.",                     leverage: "high" },
      { name: "Phase Handoff",              desc: "Generate and use Phase Handoff Blocks to chain the six design phases into one continuous workflow.",                   leverage: "high" },
      { name: "Skill Chaining",             desc: "Connect design phases so outputs become inputs — structured handoff across all six phases.",                          leverage: "high" },
      { name: "Which Claude",               desc: "Route every design task to the right Claude surface — Chat, Cowork, or Code — based on task type and requirements.", leverage: "high" },
    ],
  },
];

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AgentsPage({ onBack }) {
  const [drawer, setDrawer] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: "'DM Sans', sans-serif", color: T.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }
      `}</style>

      {/* Backdrop */}
      {drawer && (
        <div
          onClick={() => setDrawer(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 199 }}
        />
      )}

      {/* Drawer panel */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: "clamp(320px, 480px, 100vw)",
        background: T.surface, borderLeft: `1px solid ${T.border}`,
        zIndex: 200,
        transform: drawer ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.25s ease",
      }}>
        <Drawer content={drawer} onClose={() => setDrawer(null)} />
      </div>

      {/* ── Sticky header ── */}
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
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 600, lineHeight: 1.1, color: T.text, marginBottom: 20, letterSpacing: "-0.2px", maxWidth: 700 }}>Six specialists. One orchestrator. One framework.</h1>
          <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, maxWidth: 600 }}>
            Agents are the orchestration layer that sits above skills, tools, and prompts. Six specialist agents handle the work — Researcher, Strategist, Designer, Systems Designer, Design Engineer, and a cross-cutting Orchestrator that routes tasks, manages handoff blocks, and coordinates the team. The framework's three artifact types stay unchanged — agents compose them.
          </p>
        </section>

        {/* ── Surface Map ── */}
        <section style={{ marginBottom: 80 }}>
          <AgentSurfaceMap
            onAgentClick={agent => setDrawer({ type: "agent", agent })}
            onSetupClick={() => setDrawer({ type: "setup" })}
          />
        </section>

        {/* ── Skills ── */}
        <section style={{ marginTop: 80 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 600, color: T.text, marginBottom: 12, letterSpacing: "-0.2px" }}>Skills</h2>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, maxWidth: 600 }}>
              43 structured skill files — one per workflow. Upload a skill to Claude to activate phase-specific templates, quality checklists, and AI-ready prompts.
            </p>
            <p style={{ marginTop: 8, fontSize: 12, color: T.dim, lineHeight: 1.6 }}>
              Skills are plain .md files. Upload to Claude Chat to extend any conversation, or place in your project for Claude Code access. Download all skills from the Skills Library.
            </p>
          </div>

          {SKILL_PHASES.map((group, gi) => (
            <div key={group.phase}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: T.dim, marginBottom: 8, marginTop: gi === 0 ? 0 : 28 }}>
                {group.phase}
              </div>
              {group.skills.map((skill, si) => (
                <div
                  key={skill.name}
                  style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "8px 0", borderBottom: `1px solid ${T.border}`, flexWrap: "wrap" }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: T.text, minWidth: 200, flexShrink: 0 }}>{skill.name}</span>
                  <span style={{ fontSize: 13, color: T.dim, flex: 1, minWidth: 200, lineHeight: 1.5 }}>{skill.desc}</span>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* ── Hooks ── */}
        <section style={{ marginTop: 80 }}>
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 600, color: T.text, marginBottom: 12, letterSpacing: "-0.2px" }}>Hooks</h2>
            <p style={{ fontSize: 15, color: T.muted, lineHeight: 1.7, maxWidth: 600 }}>
              Three deterministic triggers. Fire every time — no prompting required.
            </p>
            <p style={{ marginTop: 8, fontSize: 12, color: T.dim, lineHeight: 1.6, maxWidth: 600 }}>
              Unlike agents and commands, hooks don't rely on Claude choosing to act. They fire automatically every time the matching event occurs.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2 }}>
            {[
              {
                name: "Auto-persist",
                event: "PostToolUse",
                settings: "settings.json",
                settingsNote: "shared",
                script: ".claude/hooks/persist-artifact.sh",
                desc: "Every time an APDF MCP tool completes, its output is written automatically to .apdf/artifacts/ as a timestamped markdown file. An index.md tracks every artifact generated across the project lifecycle — a complete audit trail without any manual saving.",
              },
              {
                name: "Auto-inject context",
                event: "PreToolUse",
                settings: "settings.json",
                settingsNote: "shared",
                script: ".claude/hooks/inject-context.sh",
                desc: "Before any APDF MCP tool runs, this hook checks for a .apdf/context.json file in the project root. If found, it reads the current persona, problem statement, phase, and constraints and injects them as additional context. Tools run richer without the designer assembling context by hand each session.",
              },
              {
                name: "Session awareness",
                event: "Stop",
                settings: "settings.local.json",
                settingsNote: "personal — opt-in",
                script: ".claude/hooks/session-awareness.sh",
                desc: "When Claude finishes responding, this hook checks whether phase-level work was completed during the session. If yes and no handoff block was generated, it reminds the designer to run /handoff-block before closing. Fires once per session, then clears. Personal preference — opt in by copying settings.local.json.example and removing .example.",
              },
              {
                name: "Phase Routing",
                event: "Stop",
                settings: "settings.json",
                settingsNote: "shared",
                script: ".claude/hooks/phase-routing.sh",
                desc: "After every session, checks .apdf/artifacts/ for a newly written Phase Handoff Block. If one is detected, prompts the designer to run /transition to kick off the next phase automatically. Fires only when a real phase handoff block is present — silent on all other sessions.",
              },
            ].map(hook => (
              <div key={hook.name} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.text, fontFamily: "'Inter', sans-serif" }}>{hook.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "2px 8px", borderRadius: 3, background: T.card, border: `1px solid ${T.border}`, color: T.muted, letterSpacing: "0.04em" }}>{hook.event}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, padding: "2px 8px", borderRadius: 3, background: T.card, border: `1px solid ${T.border}`, color: T.dim, letterSpacing: "0.04em" }}>{hook.settings} — {hook.settingsNote}</span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.dim, letterSpacing: "0.04em" }}>{hook.script}</div>
                <p style={{ fontSize: 13, color: T.dim, lineHeight: 1.65, margin: 0 }}>{hook.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: "12px 16px" }}>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: T.dim, lineHeight: 1.7, margin: 0 }}>
              Make hook scripts executable after placing them: <span style={{ color: T.muted }}>chmod +x .claude/hooks/*.sh</span>
              <br />
              Copy <span style={{ color: T.muted }}>settings.local.json.example</span> to <span style={{ color: T.muted }}>settings.local.json</span> to activate the session awareness hook.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
