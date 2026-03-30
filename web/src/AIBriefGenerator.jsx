import { useState, useRef, useEffect } from "react";

// ── Design tokens (matches site system) ─────────────────────────────────────
const DS = {
  dark: "#0F172A",
  darkCard: "#1E293B",
  darkBorder: "#334155",
  white: "#FFFFFF",
  bodyLight: "#94A3B8",
  bodyDark: "#64748B",
  light: "#F8FAFC",
  lightBorder: "#E2E8F0",
  phases: {
    "01": { color: "#22C55E", label: "Discover" },
    "02": { color: "#8B5CF6", label: "Define" },
    "03": { color: "#F59E0B", label: "Ideate" },
    "04": { color: "#3B82F6", label: "Prototype" },
    "05": { color: "#EF4444", label: "Validate" },
    "06": { color: "#14B8A6", label: "Deliver" },
  },
};

// ── Form config ──────────────────────────────────────────────────────────────
const PROJECT_TYPES = [
  { id: "new-product", label: "New Product", icon: "✦", desc: "Building from scratch" },
  { id: "feature", label: "Feature Addition", icon: "◈", desc: "Adding to an existing product" },
  { id: "redesign", label: "Redesign", icon: "◎", desc: "Rethinking what exists" },
  { id: "internal-tool", label: "Internal Tool", icon: "◧", desc: "Built for a team or ops" },
  { id: "client-work", label: "Client Work", icon: "◆", desc: "External engagement" },
];

const PHASE_OPTIONS = [
  { id: "discover", label: "Discover", color: "#22C55E", desc: "Research & insights" },
  { id: "define", label: "Define", color: "#8B5CF6", desc: "Problem framing" },
  { id: "ideate", label: "Ideate", color: "#F59E0B", desc: "Concepts & direction" },
  { id: "prototype", label: "Prototype", color: "#3B82F6", desc: "Build & test" },
  { id: "validate", label: "Validate", color: "#EF4444", desc: "User testing" },
  { id: "deliver", label: "Deliver", color: "#14B8A6", desc: "Handoff & ship" },
  { id: "unsure", label: "Not sure yet", color: "#64748B", desc: "Claude will recommend" },
];

const WHAT_YOU_HAVE = [
  { id: "nothing", label: "Nothing yet", desc: "Starting completely fresh" },
  { id: "brief", label: "A project brief", desc: "Some direction or goals" },
  { id: "brief-research", label: "Brief + research", desc: "Goals and user data" },
  { id: "existing-designs", label: "Existing designs", desc: "Something to work from" },
];

const TEAM_OPTIONS = [
  { id: "solo", label: "Solo", desc: "Just me" },
  { id: "small", label: "Small team", desc: "2–5 people" },
  { id: "larger", label: "Larger team", desc: "6+ cross-functional" },
  { id: "client", label: "With a client", desc: "External stakeholders involved" },
];

const TIMELINE_OPTIONS = [
  { id: "sprint", label: "Sprint", desc: "1–2 weeks" },
  { id: "month", label: "Month", desc: "3–4 weeks" },
  { id: "quarter", label: "Quarter", desc: "3 months" },
  { id: "ongoing", label: "Ongoing", desc: "No fixed end" },
];

// ── Build the AI prompt ──────────────────────────────────────────────────────
function buildPrompt(form) {
  return `You are an expert UX design strategist trained on the Agentic Product Design Framework — a six-phase system (Discover → Define → Ideate → Prototype → Validate → Deliver).

A designer has provided the following project context:

PROJECT NAME: ${form.projectName || "Untitled Project"}
PROJECT TYPE: ${form.projectType}
CURRENT PHASE: ${form.phase}
WHAT THEY HAVE: ${form.whatYouHave}
TEAM SETUP: ${form.team}
TIMELINE: ${form.timeline}
PRODUCT/AUDIENCE: ${form.productDescription || "Not specified"}
GOALS & SUCCESS METRICS: ${form.goals || "Not specified"}
KNOWN CONSTRAINTS: ${form.constraints || "None specified"}

Generate a structured Project Design Brief in the following exact JSON format. Be specific, strategic, and actionable — not generic. Every field should feel like it was written by a senior design strategist who deeply understands this project.

Return ONLY valid JSON, no markdown, no backticks, no explanation:

{
  "projectName": "refined project name",
  "oneLiner": "one punchy sentence describing what this project is and who it's for (max 20 words)",
  "recommendedPhase": {
    "phase": "phase name",
    "color": "hex color for that phase",
    "reason": "1–2 sentences on why this is the right starting point given what they have"
  },
  "problemStatement": "A sharp HMW or JTBD framing of the core design problem (2–3 sentences)",
  "targetUser": "Who this is designed for — specific, not generic (1–2 sentences)",
  "successMetrics": ["metric 1", "metric 2", "metric 3"],
  "constraints": ["constraint 1", "constraint 2", "constraint 3"],
  "firstSkillFile": {
    "filename": "exact-skill-filename.md",
    "reason": "why this skill file should be uploaded first"
  },
  "phaseRoadmap": [
    { "phase": "Discover", "color": "#22C55E", "focus": "what to do in this phase for this specific project", "duration": "time estimate" },
    { "phase": "Define", "color": "#8B5CF6", "focus": "what to do", "duration": "time estimate" },
    { "phase": "Ideate", "color": "#F59E0B", "focus": "what to do", "duration": "time estimate" },
    { "phase": "Prototype", "color": "#3B82F6", "focus": "what to do", "duration": "time estimate" },
    { "phase": "Validate", "color": "#EF4444", "focus": "what to do", "duration": "time estimate" },
    { "phase": "Deliver", "color": "#14B8A6", "focus": "what to do", "duration": "time estimate" }
  ],
  "firstPrompt": "A ready-to-paste Claude prompt specific to this project and starting phase. Should be 3–5 sentences with [BRACKET] placeholders where appropriate. Start with 'You are a UX design assistant...'"
}`;
}

// ── Selectable chip ──────────────────────────────────────────────────────────
function Chip({ selected, onClick, children, color }) {
  const [hovered, setHovered] = useState(false);
  const accent = color || "#22C55E";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "9px 16px", borderRadius: 999, cursor: "pointer",
        fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
        border: selected ? `1.5px solid ${accent}` : `1px solid ${DS.lightBorder}`,
        background: selected ? `${accent}12` : DS.white,
        color: selected ? accent : DS.bodyDark,
        transition: "all 0.15s ease",
        transform: (hovered && !selected) ? "translateY(-1px)" : "none",
        outline: "none",
      }}
    >
      {children}
    </button>
  );
}

// ── Step indicator ───────────────────────────────────────────────────────────
function StepDot({ n, active, done }) {
  return (
    <div style={{
      width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      background: done ? "#22C55E" : active ? DS.dark : DS.light,
      border: active ? `none` : done ? "none" : `1px solid ${DS.lightBorder}`,
      fontSize: 11, fontWeight: 700,
      color: done ? DS.white : active ? DS.white : DS.bodyDark,
      flexShrink: 0, transition: "all 0.2s",
    }}>
      {done ? "✓" : n}
    </div>
  );
}

// ── Text input ───────────────────────────────────────────────────────────────
function Field({ label, hint, value, onChange, multiline, placeholder }) {
  const base = {
    width: "100%", boxSizing: "border-box",
    border: `1px solid ${DS.lightBorder}`, borderRadius: 10,
    padding: "11px 14px", fontSize: 13, fontFamily: "'DM Sans', sans-serif",
    color: "#0F172A", background: DS.white, outline: "none",
    lineHeight: 1.6, resize: "vertical",
    transition: "border-color 0.15s",
  };
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 4 }}>{label}</label>
      {hint && <div style={{ fontSize: 11, color: DS.bodyDark, marginBottom: 8, lineHeight: 1.5 }}>{hint}</div>}
      {multiline
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={base} onFocus={e => e.target.style.borderColor = "#22C55E"} onBlur={e => e.target.style.borderColor = DS.lightBorder} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...base, resize: undefined }} onFocus={e => e.target.style.borderColor = "#22C55E"} onBlur={e => e.target.style.borderColor = DS.lightBorder} />
      }
    </div>
  );
}

// ── Result view ──────────────────────────────────────────────────────────────
function BriefResult({ brief, onReset, onCopy, copied }) {
  return (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:none } }`}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, textTransform: "uppercase", color: DS.bodyDark, marginBottom: 10 }}>Project Brief Generated</div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, color: "#0F172A", margin: "0 0 8px", lineHeight: 1.1 }}>{brief.projectName}</h2>
        <p style={{ fontSize: 14, color: DS.bodyDark, margin: 0, lineHeight: 1.6 }}>{brief.oneLiner}</p>
      </div>

      {/* Recommended phase */}
      <div style={{ background: DS.dark, borderRadius: 12, padding: "18px 22px", marginBottom: 16, display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${brief.recommendedPhase.color}22`, border: `1px solid ${brief.recommendedPhase.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: brief.recommendedPhase.color, display: "block" }} />
        </div>
        <div>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: brief.recommendedPhase.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Start here → {brief.recommendedPhase.phase}</div>
          <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.6 }}>{brief.recommendedPhase.reason}</div>
        </div>
      </div>

      {/* Two-col: problem + user */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 10 }}>Problem Statement</div>
          <p style={{ fontSize: 13, color: "#0F172A", lineHeight: 1.7, margin: 0 }}>{brief.problemStatement}</p>
        </div>
        <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 10 }}>Target User</div>
          <p style={{ fontSize: 13, color: "#0F172A", lineHeight: 1.7, margin: 0 }}>{brief.targetUser}</p>
        </div>
      </div>

      {/* Success metrics + constraints */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
        <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 12 }}>Success Metrics</div>
          {brief.successMetrics.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 12, color: "#0F172A", lineHeight: 1.55 }}>{m}</span>
            </div>
          ))}
        </div>
        <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 12 }}>Constraints</div>
          {brief.constraints.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#EF4444", flexShrink: 0, marginTop: 5 }} />
              <span style={{ fontSize: 12, color: "#0F172A", lineHeight: 1.55 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Phase roadmap */}
      <div style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 16 }}>Phase Roadmap</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {brief.phaseRoadmap.map((p, i) => (
            <div key={i} style={{ borderTop: `2px solid ${p.color}`, paddingTop: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: p.color, marginBottom: 4, fontFamily: "'JetBrains Mono', monospace" }}>{p.phase}</div>
              <div style={{ fontSize: 11, color: "#0F172A", lineHeight: 1.5, marginBottom: 6 }}>{p.focus}</div>
              <div style={{ fontSize: 10, color: DS.bodyDark, fontFamily: "'JetBrains Mono', monospace" }}>{p.duration}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill file recommendation */}
      <div style={{ background: `${brief.firstSkillFile?.filename?.includes("research") ? "#22C55E" : "#8B5CF6"}0d`, border: `1px solid ${brief.firstSkillFile?.filename?.includes("research") ? "#22C55E" : "#8B5CF6"}33`, borderRadius: 12, padding: "16px 20px", marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, background: DS.dark, color: "#22C55E", padding: "6px 12px", borderRadius: 6, whiteSpace: "nowrap", flexShrink: 0 }}>{brief.firstSkillFile?.filename}</div>
        <div style={{ fontSize: 12, color: DS.bodyDark, lineHeight: 1.55 }}>
          <span style={{ fontWeight: 600, color: "#0F172A" }}>Upload this skill file first. </span>
          {brief.firstSkillFile?.reason}
        </div>
      </div>

      {/* First prompt */}
      <div style={{ background: DS.dark, borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2, textTransform: "uppercase", color: "#14B8A6" }}>First Prompt — Ready to paste</div>
          <button
            onClick={onCopy}
            style={{
              background: copied ? "#0D9488" : "#14B8A6", color: DS.dark, border: "none",
              borderRadius: 6, padding: "6px 14px", fontSize: 11, fontWeight: 700,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s",
            }}
          >{copied ? "✓ Copied" : "Copy prompt"}</button>
        </div>
        <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: DS.bodyLight, lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>{brief.firstPrompt}</pre>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onReset} style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 500, color: DS.bodyDark, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          ← Start a new brief
        </button>
      </div>
    </div>
  );
}

// ── Loading state ────────────────────────────────────────────────────────────
function LoadingState() {
  const [dotCount, setDotCount] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDotCount(d => d === 3 ? 1 : d + 1), 500);
    return () => clearInterval(t);
  }, []);
  const steps = ["Analyzing project context", "Framing the design problem", "Building your phase roadmap", "Writing your first prompt"];
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => Math.min(s + 1, steps.length - 1)), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ padding: "48px 0", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: DS.dark, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <span style={{ fontSize: 20 }}>◈</span>
      </div>
      <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#0F172A", marginBottom: 8 }}>Generating your brief{".".repeat(dotCount)}</div>
      <div style={{ fontSize: 13, color: DS.bodyDark, marginBottom: 32 }}>Claude is building a project brief tailored to your context</div>
      <div style={{ maxWidth: 300, margin: "0 auto" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, opacity: i <= activeStep ? 1 : 0.3, transition: "opacity 0.4s" }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: i < activeStep ? "#22C55E" : i === activeStep ? DS.dark : DS.light, border: i < activeStep ? "none" : `1px solid ${DS.lightBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: i < activeStep ? DS.white : DS.bodyDark, fontWeight: 700 }}>{i < activeStep ? "✓" : i + 1}</div>
            <span style={{ fontSize: 12, color: i <= activeStep ? "#0F172A" : DS.bodyDark, fontWeight: i === activeStep ? 600 : 400 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AIBriefGenerator() {
  const [step, setStep] = useState(1); // 1: project info, 2: context, 3: goals
  const [form, setForm] = useState({
    projectName: "", projectType: "", phase: "", whatYouHave: "",
    team: "", timeline: "", productDescription: "", goals: "", constraints: "",
  });
  const [loading, setLoading] = useState(false);
  const [brief, setBrief] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  const TOTAL_STEPS = 3;
  const canNext1 = form.projectType && form.phase;
  const canNext2 = form.whatYouHave && form.team && form.timeline;
  const canSubmit = form.projectName.trim().length > 0;

  async function generate() {
    setLoading(true);
    setError(null);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt(form) }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setBrief(parsed);
    } catch (e) {
      setError("Something went wrong generating your brief. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() { setBrief(null); setStep(1); setForm({ projectName: "", projectType: "", phase: "", whatYouHave: "", team: "", timeline: "", productDescription: "", goals: "", constraints: "" }); }
  function copyPrompt() { if (brief?.firstPrompt) { navigator.clipboard.writeText(brief.firstPrompt); setCopied(true); setTimeout(() => setCopied(false), 2000); } }

  const progress = loading ? 100 : brief ? 100 : ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div style={{ minHeight: "100vh", background: DS.light, fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{ background: DS.dark, borderBottom: `1px solid ${DS.darkBorder}`, padding: "16px 40px", display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", display: "block" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#3B82F6", letterSpacing: 2, textTransform: "uppercase" }}>Discover → Define</span>
        </div>
        <div style={{ width: 1, height: 16, background: DS.darkBorder }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: DS.white }}>AI Brief Generator</span>
        <div style={{ marginLeft: "auto", fontSize: 11, color: DS.bodyLight, fontFamily: "'JetBrains Mono', monospace", opacity: 0.5 }}>Agentic Product Design Framework</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: DS.darkBorder }}>
        <div style={{ height: "100%", background: "#3B82F6", width: `${progress}%`, transition: "width 0.4s ease" }} />
      </div>

      {/* Main */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 40px" }} ref={topRef}>

        {loading && <LoadingState />}

        {!loading && brief && (
          <BriefResult brief={brief} onReset={reset} onCopy={copyPrompt} copied={copied} />
        )}

        {!loading && !brief && (
          <>
            {/* Step indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
              {[
                { n: 1, label: "Project type" },
                { n: 2, label: "Your context" },
                { n: 3, label: "Goals & details" },
              ].map((s, i) => (
                <div key={s.n} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <StepDot n={s.n} active={step === s.n} done={step > s.n} />
                    <span style={{ fontSize: 12, fontWeight: step === s.n ? 600 : 400, color: step === s.n ? "#0F172A" : DS.bodyDark }}>{s.label}</span>
                  </div>
                  {i < 2 && <div style={{ width: 32, height: 1, background: DS.lightBorder, margin: "0 12px" }} />}
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {step === 1 && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:none } }`}</style>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#0F172A", margin: "0 0 6px" }}>What kind of project is this?</h2>
                <p style={{ fontSize: 14, color: DS.bodyDark, margin: "0 0 28px", lineHeight: 1.6 }}>This helps Claude frame the right problem and recommend the best starting point.</p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 12 }}>Project type</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PROJECT_TYPES.map(t => (
                      <Chip key={t.id} selected={form.projectType === t.id} onClick={() => set("projectType", t.id)} color="#3B82F6">
                        <span style={{ fontSize: 14 }}>{t.icon}</span>
                        <span>{t.label}</span>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 6 }}>Which phase are you entering?</div>
                  <div style={{ fontSize: 11, color: DS.bodyDark, marginBottom: 12 }}>Pick your starting point — or choose "Not sure yet" and Claude will recommend.</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {PHASE_OPTIONS.map(p => (
                      <Chip key={p.id} selected={form.phase === p.id} onClick={() => set("phase", p.id)} color={p.color}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.color, display: "block" }} />
                        {p.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: 32 }}>
                  <button
                    onClick={() => setStep(2)}
                    disabled={!canNext1}
                    style={{ background: canNext1 ? "#0F172A" : DS.lightBorder, color: canNext1 ? DS.white : DS.bodyDark, border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: canNext1 ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}
                  >Continue →</button>
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#0F172A", margin: "0 0 6px" }}>What's your context?</h2>
                <p style={{ fontSize: 14, color: DS.bodyDark, margin: "0 0 28px", lineHeight: 1.6 }}>A few quick details help Claude give you a more specific, useful brief.</p>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 12 }}>What do you have so far?</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {WHAT_YOU_HAVE.map(w => (
                      <Chip key={w.id} selected={form.whatYouHave === w.id} onClick={() => set("whatYouHave", w.id)} color="#8B5CF6">
                        {w.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 12 }}>Team setup</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TEAM_OPTIONS.map(t => (
                      <Chip key={t.id} selected={form.team === t.id} onClick={() => set("team", t.id)} color="#F59E0B">
                        {t.label}
                        <span style={{ fontSize: 11, color: DS.bodyDark, fontWeight: 400 }}> — {t.desc}</span>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", marginBottom: 12 }}>Timeline</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {TIMELINE_OPTIONS.map(t => (
                      <Chip key={t.id} selected={form.timeline === t.id} onClick={() => set("timeline", t.id)} color="#EF4444">
                        {t.label}
                        <span style={{ fontSize: 11, color: DS.bodyDark, fontWeight: 400 }}> — {t.desc}</span>
                      </Chip>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 32 }}>
                  <button onClick={() => setStep(1)} style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 10, padding: "13px 22px", fontSize: 14, fontWeight: 500, color: DS.bodyDark, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
                  <button onClick={() => setStep(3)} disabled={!canNext2} style={{ background: canNext2 ? "#0F172A" : DS.lightBorder, color: canNext2 ? DS.white : DS.bodyDark, border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: canNext2 ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>Continue →</button>
                </div>
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, fontWeight: 400, color: "#0F172A", margin: "0 0 6px" }}>Goals & details</h2>
                <p style={{ fontSize: 14, color: DS.bodyDark, margin: "0 0 28px", lineHeight: 1.6 }}>The more specific you are, the better Claude can tailor the brief.</p>

                <Field label="Project name *" placeholder="e.g. Healthtrack Mobile Redesign" value={form.projectName} onChange={v => set("projectName", v)} />
                <Field label="What are you designing? Who is it for?" hint="Describe the product or feature and the people who will use it." placeholder="e.g. A mobile app for nurses to track patient vitals during shift handoff" value={form.productDescription} onChange={v => set("productDescription", v)} multiline />
                <Field label="Goals & success metrics" hint="What does success look like? Include business and user outcomes." placeholder="e.g. Reduce handoff errors by 30%, get nurses to complete check-ins in under 2 minutes" value={form.goals} onChange={v => set("goals", v)} multiline />
                <Field label="Known constraints" hint="Technical limitations, timeline pressure, stakeholder requirements, budget." placeholder="e.g. Must work on hospital-issued iPads, integrate with Epic EHR, ship by Q3" value={form.constraints} onChange={v => set("constraints", v)} multiline />

                {error && (
                  <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: "#991B1B" }}>{error}</div>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                  <button onClick={() => setStep(2)} style={{ background: DS.white, border: `1px solid ${DS.lightBorder}`, borderRadius: 10, padding: "13px 22px", fontSize: 14, fontWeight: 500, color: DS.bodyDark, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
                  <button onClick={generate} disabled={!canSubmit} style={{ background: canSubmit ? "#3B82F6" : DS.lightBorder, color: canSubmit ? DS.white : DS.bodyDark, border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: canSubmit ? "pointer" : "default", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>
                    Generate Brief ✦
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
