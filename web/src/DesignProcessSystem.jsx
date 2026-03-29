import { useState } from "react";

// ── Design System Tokens ───────────────────────────────────────────────────
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
    "01": { color: "#22C55E", label: "Discover", id: "discover" },
    "02": { color: "#8B5CF6", label: "Define",   id: "define"   },
    "03": { color: "#F59E0B", label: "Ideate",   id: "ideate"   },
    "04": { color: "#3B82F6", label: "Prototype",id: "prototype"},
    "05": { color: "#EF4444", label: "Validate", id: "validate" },
    "06": { color: "#14B8A6", label: "Deliver",  id: "deliver"  },
  },
};

const PHASE_BY_ID = Object.fromEntries(
  Object.entries(DS.phases).map(([num, p]) => [p.id, { ...p, number: num }])
);

const PHASES = [
  {
    id: "discover", number: "01",
    subtitle: "Understand the problem space",
    skills: [
      { name: "User Research", ai: "high" }, { name: "Competitive Analysis", ai: "high" },
      { name: "Stakeholder Interviews", ai: "medium" }, { name: "Data Synthesis", ai: "high" },
      { name: "Contextual Inquiry", ai: "low" },
    ],
    prompts: [
      { title: "Research Synthesis", when: "After collecting raw research data", output: "Research brief with themes & insights",
        prompt: `You are a UX research analyst. I'm going to share raw research data (interview transcripts, survey responses, analytics). Analyze this data and produce:\n\n1. Key themes (grouped by frequency and impact)\n2. User pain points ranked by severity\n3. Unmet needs & opportunities\n4. Contradictions or surprising findings\n5. Recommended areas for deeper investigation\n\nFormat as a structured research brief I can share with my team.` },
      { title: "Competitive Landscape", when: "Early in discovery to map the landscape", output: "Competitive analysis matrix",
        prompt: `Act as a UX strategist. Analyze these competitors for [PRODUCT CATEGORY]:\n\n[LIST COMPETITORS]\n\nFor each, evaluate:\n- Core value proposition\n- Key UX patterns they use\n- Strengths and weaknesses\n- Unique differentiators\n- Gaps and opportunities they miss\n\nThen synthesize: What conventions exist in this space? Where is there room to innovate?` },
      { title: "Persona Generator", when: "After initial research synthesis", output: "Evidence-based personas",
        prompt: `Based on the following research insights, create 2-3 evidence-based user personas:\n\n[PASTE RESEARCH INSIGHTS]\n\nFor each persona include:\n- Name, role, and context\n- Goals (functional + emotional)\n- Frustrations & pain points\n- Current workarounds\n- Key quote that captures their mindset\n- Behavioral patterns relevant to [PRODUCT]\n\nAvoid stereotypes. Ground every detail in the research data provided.` },
    ],
    templates: [
      { name: "Research Plan", fields: ["Objectives", "Methods", "Participants", "Timeline", "Key Questions", "Success Metrics"] },
      { name: "Interview Guide", fields: ["Warm-up Questions", "Core Topics", "Scenario Prompts", "Wrap-up", "Observer Notes Template"] },
    ],
    aiTools: ["Claude — Research synthesis & analysis", "Dovetail / Claude — Transcript coding", "Perplexity — Rapid domain research", "NotebookLM — Source-grounded exploration"],
    skillDocs: [
      { name: "user-research", file: "01-discover/user-research.md", title: "User Research Synthesis",
        summary: "Transform raw research data into structured, actionable insights.",
        workflow: ["Assess the data type and collection method", "Apply thematic coding (open → axial → selective)", "Synthesize into a research brief with themes, pain points, and opportunities", "Validate findings against bias and alternative interpretations"],
        outputs: ["Research Brief", "Interview Guide", "Screener Questions", "Research Plan"],
        checklist: ["Every insight traceable to data", "Severity rankings use consistent criteria", "No leading language or confirmation bias", "Participant privacy protected", "Recommendations are actionable", "Limitations acknowledged"] },
      { name: "competitive-analysis", file: "01-discover/competitive-analysis.md", title: "Competitive Analysis",
        summary: "Map the competitive landscape to understand conventions, gaps, and differentiation opportunities.",
        workflow: ["Define competitive set (direct, indirect, aspirational)", "UX audit each competitor across value prop, patterns, strengths, weaknesses", "Synthesize into a competitive matrix", "Extract a reusable UX patterns library"],
        outputs: ["Competitive Matrix", "Feature Benchmark", "Convention Map", "Innovation Opportunities"],
        checklist: ["All three competitor tiers represented", "Analysis based on actual product usage", "User sentiment included", "Conventions separated from opportunities", "Analysis is current"] },
    ],
    figmaActions: [
      { action: "Research Findings Board", desc: "Themed cards with key themes, frequency badges, and evidence quotes organized on the Discover page", example: '"Create a research findings board on the Discover page with these 5 themes..."' },
      { action: "Persona Cards", desc: "Structured persona layouts with name, role, goals, frustrations, and key quote", example: '"Build persona cards for our 3 research personas on the Discover page"' },
      { action: "Competitive Matrix", desc: "Color-coded comparison table with competitors as columns and evaluation dimensions as rows", example: '"Create a competitive analysis matrix comparing these 4 competitors..."' },
    ],
  },
  {
    id: "define", number: "02",
    subtitle: "Frame the right problem",
    skills: [
      { name: "Problem Framing", ai: "medium" }, { name: "Information Architecture", ai: "medium" },
      { name: "Journey Mapping", ai: "high" }, { name: "Requirements Definition", ai: "medium" },
      { name: "Strategic Thinking", ai: "low" },
    ],
    prompts: [
      { title: "Problem Statement Refiner", when: "Transitioning from research to design", output: "Validated problem statement",
        prompt: `I need to define a clear problem statement for a UX project. Here's what I know:\n\nUser: [WHO]\nContext: [SITUATION]\nPain: [PROBLEM]\nGoal: [DESIRED OUTCOME]\n\nGenerate 3 versions of a problem statement:\n1. A "How Might We" framing\n2. A Jobs-to-be-Done framing\n3. A user-story framing\n\nFor each, identify the assumptions being made and suggest how to validate them.` },
      { title: "Journey Map Builder", when: "When mapping current or future experiences", output: "Journey map with opportunity areas",
        prompt: `Create a detailed user journey map for this scenario:\n\nPersona: [PERSONA]\nGoal: [WHAT THEY'RE TRYING TO DO]\nContext: [CURRENT PRODUCT/PROCESS]\n\nMap each stage with:\n- Actions (what they do)\n- Thoughts (what they're thinking)\n- Emotions (how they feel, on a scale)\n- Touchpoints (what they interact with)\n- Pain points (what frustrates them)\n- Opportunities (where we can improve)\n\nIdentify the 3 biggest moments of friction and the 2 biggest opportunities.` },
      { title: "Requirements Prioritizer", when: "When scoping what to build", output: "Prioritized requirements roadmap",
        prompt: `Help me prioritize these product/feature requirements using multiple frameworks:\n\n[LIST REQUIREMENTS]\n\nEvaluate using:\n1. MoSCoW (Must/Should/Could/Won't)\n2. Impact vs Effort matrix\n3. User value vs Business value\n\nThen recommend a phased approach: what ships in v1, v2, and future? Justify each decision.` },
    ],
    templates: [
      { name: "Design Brief", fields: ["Problem Statement", "Target Users", "Success Metrics", "Constraints", "Scope", "Timeline"] },
      { name: "Journey Map", fields: ["Persona", "Scenario", "Stages", "Actions", "Emotions", "Opportunities"] },
    ],
    aiTools: ["Claude — Problem framing & journey maps", "Miro AI — Visual mapping", "FigJam AI — Collaborative synthesis", "Whimsical — Flow diagramming"],
    skillDocs: [
      { name: "problem-framing", file: "02-define/problem-framing.md", title: "Problem Framing & Definition",
        summary: "Transform research insights into clear problem definitions that guide design decisions.",
        workflow: ["Gather inputs (research, business context, persona, current state)", "Generate multiple framings (HMW, JTBD, User Story)", "Identify assumptions and validation methods", "Select and refine the strongest framing"],
        outputs: ["Problem Statement", "Journey Map", "Requirements Roadmap", "Design Brief"],
        checklist: ["Problem specific enough to guide but open enough for creativity", "Assumptions explicitly stated", "Journey map based on research, not assumptions", "Requirements prioritized with rationale", "Scope boundaries explicit"] },
    ],
    figmaActions: [
      { action: "Journey Map", desc: "Stage columns with actions, thoughts, emotions, touchpoints, pain points, and opportunities", example: '"Create a journey map for our primary persona on the Define page"' },
      { action: "Design Brief Card", desc: "Structured layout with problem statement, users, metrics, constraints, and scope", example: '"Build a design brief on the Define page with this problem statement..."' },
      { action: "Requirements Board", desc: "Categorized requirements with MoSCoW tags and impact/effort indicators", example: '"Create a prioritized requirements board with these features..."' },
    ],
  },
  {
    id: "ideate", number: "03",
    subtitle: "Explore solutions broadly",
    skills: [
      { name: "Concept Generation", ai: "high" }, { name: "Sketching & Wireframing", ai: "medium" },
      { name: "Design Patterns", ai: "high" }, { name: "Design Systems", ai: "high" },
      { name: "Creative Direction", ai: "low" }, { name: "Systems Thinking", ai: "medium" },
    ],
    prompts: [
      { title: "Concept Explorer", when: "Early ideation to generate range", output: "5 concept directions with tradeoffs",
        prompt: `I'm designing [FEATURE/PRODUCT]. The core problem is: [PROBLEM STATEMENT]\n\nGenerate 5 distinct concept directions, ranging from:\n1. Safe/conventional (what most competitors do)\n2. Incremental improvement (better version of existing patterns)\n3. Recombination (borrowing patterns from other domains)\n4. Paradigm shift (rethinking the core interaction model)\n5. Moonshot (if there were zero constraints)\n\nFor each concept:\n- Describe the core interaction in 2-3 sentences\n- Name the key UX pattern it relies on\n- List 1 strength and 1 risk\n- Suggest who this approach would resonate with most` },
      { title: "UI Pattern Recommender", when: "When choosing interaction patterns", output: "Pattern recommendations with rationale",
        prompt: `I need to design a UI for this user task:\n\nTask: [WHAT THE USER NEEDS TO DO]\nContext: [PLATFORM, CONSTRAINTS, USER SKILL LEVEL]\nData: [WHAT INFORMATION IS INVOLVED]\n\nRecommend 3 different UI patterns that could solve this, drawing from:\n- Established design systems (Material, Apple HIG, Ant Design)\n- Patterns from analogous products in other industries\n- Emerging patterns in modern apps\n\nFor each pattern: describe the layout, explain why it works for this context, and note accessibility considerations.` },
      { title: "Design System Scaffolder", when: "Starting a new product or redesign", output: "Design system spec → paste into Design Tokens artifact",
        prompt: `I'm building a design system for [PRODUCT TYPE]. The brand personality is [DESCRIBE TONE].\n\nPropose a foundational system:\n\n## Colors\n- Primary: [hex] — [why this color]\n- Primary Light: [hex]\n- Primary Dark: [hex]\n- Secondary: [hex]\n- Accent: [hex]\n- Success/Warning/Error/Info: [hex each]\n- Neutral scale: 50 through 900\n\n## Typography\n- Heading font: [font name] — [why]\n- Body font: [font name]\n- Base size: [px]\n- Scale ratio: [number]\n\n## Spacing\n- Base unit: [4 or 8]px\n\n## Shape\n- Border radius SM/MD/LG: [px]\n- Philosophy: [sharp/round/mixed]\n\nMake it opinionated. Every choice should reflect the brand personality.` },
    ],
    templates: [
      { name: "Concept Card", fields: ["Concept Name", "Core Idea", "Key Interaction", "Strengths", "Risks", "Open Questions"] },
      { name: "Wireframe Brief", fields: ["Screen Name", "User Goal", "Key Elements", "Interactions", "Edge Cases", "Notes"] },
    ],
    aiTools: ["Claude — Concept generation, scaffolding & critique", "Design Tokens artifact — Live token preview & tuning", "System Audit tab — Verify coverage vs Material/Atlassian/Carbon/HIG", "M3 Token Reference artifact — Component token documentation", "Figma MCP — Create token variables on Design System page"],
    skillDocs: [
      { name: "concept-generation", file: "03-ideate/concept-generation.md", title: "Concept Generation & Ideation",
        summary: "Generate design concepts, UI pattern recs, visual system directions using the Five-Direction Method.",
        workflow: ["Generate 5 concept directions (convention → moonshot)", "Document each as a concept card with strengths, risks, and visual direction", "Select chart types matched to data relationships", "Recommend UI patterns for the selected direction", "Scaffold design system foundations"],
        outputs: ["Concept Cards", "Visual Direction Cards", "Chart Type Selection", "UI Pattern Recommendations", "Design System Scaffold"],
        checklist: ["At least 3 directions explored", "Each concept has strengths AND risks", "Visual direction considered alongside interaction model", "Pattern recs address accessibility", "Wireframes include all states and edge cases"] },
      { name: "visual-design-execution", file: "03-ideate/visual-design-execution.md", title: "Visual Design Execution",
        summary: "Translate a product brief into a cohesive visual system — style, color, typography, spacing, motion, and icons.",
        workflow: ["Select visual style matched to domain and audience", "Build semantic color token architecture with light/dark pairing", "Define typography pairings and type scale", "Establish 4pt spacing scale and shape tokens", "Set elevation and motion timing standards"],
        outputs: ["Color Token System", "Typography Scale", "Spacing & Shape Tokens", "Motion Spec", "Icon Standards"],
        checklist: ["One style system throughout — no mixing", "All colors reference semantic tokens", "Light and dark mode both tested", "Body text ≥ 4.5:1 contrast in both modes", "All spacing multiples of 4", "Animations ≤ 300ms, transform/opacity only"] },
    ],
    figmaActions: [
      { action: "Concept Cards", desc: "Row of 5 concept cards using the Five-Direction Method with strength/risk tags", example: '"Create concept exploration cards for these 5 directions on the Ideate page"' },
      { action: "Wireframe Scaffolding", desc: "Frame structures at standard device widths (375, 768, 1280) with labeled content areas", example: '"Scaffold wireframe frames for the dashboard and settings screens"' },
      { action: "Design System Token Page", desc: "Create token swatches, type scale, spacing bars, and elevation cards on the Design System page", example: '"Take my scaffolded design system and build the token reference on page 07"' },
    ],
  },
  {
    id: "prototype", number: "04",
    subtitle: "Make it real and testable",
    skills: [
      { name: "Interaction Design", ai: "medium" }, { name: "Visual Design", ai: "medium" },
      { name: "Prototyping Tools", ai: "high" }, { name: "Frontend Development", ai: "high" },
      { name: "Micro-interactions", ai: "medium" },
    ],
    prompts: [
      { title: "Functional Prototype", when: "When you need a working prototype fast", output: "Functional React prototype",
        prompt: `Build a functional prototype for this screen/flow:\n\n[DESCRIBE THE SCREEN AND ITS PURPOSE]\n\nUser flow:\n1. [STEP 1]\n2. [STEP 2]\n3. [STEP 3]\n\nRequirements:\n- Use React with Tailwind CSS\n- Include realistic sample data\n- Handle loading, empty, and error states\n- Add meaningful micro-interactions\n- Make it responsive\n\nDesign direction: [DESCRIBE THE AESTHETIC]` },
      { title: "Copy & Content Generator", when: "When building out UI copy systematically", output: "Complete screen copy set",
        prompt: `Write UX copy for this interface:\n\nProduct: [PRODUCT]\nScreen: [SCREEN NAME]\nUser context: [WHAT BROUGHT THEM HERE]\n\nI need copy for:\n- Headlines and subheads\n- Button labels (primary & secondary actions)\n- Empty states\n- Error messages (be specific about what went wrong)\n- Success/confirmation messages\n- Tooltips and helper text\n- Onboarding microcopy\n\nTone: [DESCRIBE VOICE]. Be concise. Every word should earn its place.` },
      { title: "Accessibility Audit", when: "Before any user testing or handoff", output: "Accessibility audit with fixes",
        prompt: `Review this UI design/code for accessibility:\n\n[PASTE CODE OR DESCRIBE THE DESIGN]\n\nCheck against:\n- WCAG 2.1 AA compliance\n- Color contrast ratios\n- Keyboard navigation flow\n- Screen reader experience\n- Focus management\n- Touch target sizes\n- Motion sensitivity considerations\n- Semantic HTML structure\n\nFor each issue found: describe the problem, its severity (critical/major/minor), and provide the specific fix.` },
    ],
    templates: [
      { name: "Prototype Spec", fields: ["Screen", "User Story", "Interactions", "States", "Data Needed", "Design Tokens"] },
      { name: "Design QA Checklist", fields: ["Visual Consistency", "Responsive Behavior", "Accessibility", "Edge Cases", "Copy Review", "Performance"] },
    ],
    aiTools: ["Claude — Code prototypes & components", "v0 by Vercel — UI generation", "Figma Dev Mode — Design-to-code", "Cursor / Copilot — Code assistance"],
    skillDocs: [
      { name: "prototyping", file: "04-prototype/prototyping.md", title: "Prototyping & Production Design",
        summary: "Build functional prototypes with correct touch targets, interaction timing, gesture safety, and platform-specific QA.",
        workflow: ["Define prototype spec (purpose, fidelity, platform, states)", "Build structure → content → states → interactions", "Apply touch target standards (44×44pt iOS / 48×48dp Android)", "Specify interaction timing (80–300ms) and animation rules", "Run pre-delivery QA checklist"],
        outputs: ["Functional Prototype", "Interaction Timing Spec", "UX Copy System", "Pre-Delivery QA Checklist"],
        checklist: ["All tappable elements have press feedback ≤ 150ms", "Touch targets ≥ 44×44pt (iOS) / 48×48dp (Android)", "Animation 80–300ms, transform/opacity only", "Gesture conflicts with system swipes checked", "Primary text ≥ 4.5:1 contrast in light and dark mode"] },
      { name: "accessibility-audit", file: "04-prototype/accessibility-audit.md", title: "Accessibility Audit",
        summary: "Systematic WCAG 2.1 AA audit for web and native mobile covering contrast, keyboard, screen readers, touch, and forms.",
        workflow: ["Define audit scope (platform, WCAG level, components in scope)", "Check visual: contrast ratios, color as sole indicator, text resize", "Check keyboard & focus: tab order, visible rings, skip links, no traps", "Check screen reader: semantic HTML, heading hierarchy, ARIA, alt text", "Produce audit report with severity levels and fixes"],
        outputs: ["Accessibility Audit Report", "Issue List with Severity", "Platform-Specific Notes", "Pre-Delivery a11y Checklist"],
        checklist: ["All body text ≥ 4.5:1 (light and dark mode)", "UI components and icons ≥ 3:1", "Color never sole indicator of meaning", "All interactive elements reachable by Tab", "Touch targets ≥ 44×44pt / 48×48dp", "prefers-reduced-motion respected"] },
    ],
    figmaActions: [
      { action: "Component Creation", desc: "Build components with variants (default, hover, active, disabled, focus, error) and auto-layout", example: '"Create a Button component with primary/secondary/outline variants"' },
      { action: "Screen Layouts", desc: "Full screen designs at standard breakpoints with all states (default, loading, error, empty, success)", example: '"Build the dashboard screen layout with default and empty states"' },
      { action: "Design System Variables", desc: "Create Figma variables for color, spacing, and radius tokens", example: '"Set up design system variables for our client\'s brand tokens"' },
    ],
  },
  {
    id: "validate", number: "05",
    subtitle: "Test with real people",
    skills: [
      { name: "Usability Testing", ai: "medium" }, { name: "Data Analysis", ai: "high" },
      { name: "A/B Testing", ai: "high" }, { name: "Heuristic Evaluation", ai: "high" },
      { name: "Stakeholder Communication", ai: "medium" },
    ],
    prompts: [
      { title: "Test Plan Generator", when: "Before running usability tests", output: "Complete test plan with scenarios",
        prompt: `Create a usability test plan for:\n\nProduct: [PRODUCT]\nFeature being tested: [FEATURE]\nKey hypothesis: [WHAT WE BELIEVE]\n\nGenerate:\n1. Test objectives (what we'll learn)\n2. Participant criteria (who to recruit, 5-8 participants)\n3. Task scenarios (5-7 realistic tasks, not leading)\n4. Success metrics (completion rate, time, errors, satisfaction)\n5. Discussion guide with probing questions\n6. Observer note-taking template` },
      { title: "Test Results Analyzer", when: "After completing usability sessions", output: "Structured findings report",
        prompt: `Analyze these usability test results:\n\n[PASTE RAW NOTES, OBSERVATIONS, METRICS]\n\nSynthesize into:\n1. Task completion summary (pass/fail/assist per task per participant)\n2. Top 5 usability issues ranked by severity × frequency\n3. Positive findings (what worked well)\n4. Patterns across participants\n5. Recommended fixes (quick wins vs. larger redesigns)\n\nPresent severity using Nielsen's scale: Cosmetic / Minor / Major / Catastrophic` },
      { title: "Heuristic Review", when: "Quick quality check before testing", output: "Heuristic evaluation report",
        prompt: `Conduct a heuristic evaluation of this design using Nielsen's 10 heuristics:\n\n[DESCRIBE OR SHARE THE DESIGN]\n\nFor each heuristic:\n- Rate compliance: Strong / Adequate / Weak / Violated\n- Cite specific examples from the design\n- If violated: describe the issue, severity, and suggested fix\n\nThen provide an overall UX score and the 3 highest-priority improvements.` },
    ],
    templates: [
      { name: "Test Session Notes", fields: ["Participant ID", "Task", "Outcome", "Time", "Errors", "Observations", "Quotes"] },
      { name: "Findings Report", fields: ["Issue", "Severity", "Frequency", "Evidence", "Recommendation", "Priority"] },
    ],
    aiTools: ["Claude — Analysis & report generation", "Maze — Unmoderated testing", "Hotjar — Behavioral analytics", "Optimal Workshop — IA testing"],
    skillDocs: [
      { name: "usability-testing", file: "05-validate/usability-testing.md", title: "Usability Testing & Validation",
        summary: "Plan, run, and analyze usability tests and heuristic evaluations.",
        workflow: ["Create test plan with objectives, participant criteria, and metrics", "Write non-leading task scenarios with realistic context", "Facilitate sessions (or set up unmoderated tests)", "Synthesize results with severity × frequency ranking", "Conduct heuristic evaluation as quick quality check"],
        outputs: ["Test Plan", "Task Scenarios", "Session Notes", "Findings Report", "Heuristic Evaluation"],
        checklist: ["Task scenarios are realistic and non-leading", "Participant criteria specific enough to recruit right people", "Analysis uses severity × frequency, not opinion", "Every issue has an actionable recommendation", "Positive findings documented, not just problems"] },
    ],
    figmaActions: [
      { action: "Task Completion Matrix", desc: "Table showing pass/fail/assist per task per participant with completion rates", example: '"Create a task completion matrix with these 5 tasks and 6 participants"' },
      { action: "Issue Cards", desc: "Severity-ranked cards with title, frequency, evidence quote, and recommendation", example: '"Build issue cards for these 8 usability findings ranked by severity"' },
      { action: "Heuristic Evaluation Board", desc: "10-row board (one per Nielsen heuristic) with ratings, evidence, and fixes", example: '"Create a heuristic evaluation board for the checkout flow"' },
    ],
  },
  {
    id: "deliver", number: "06",
    subtitle: "Ship with precision",
    skills: [
      { name: "Design Documentation", ai: "high" }, { name: "Developer Handoff", ai: "high" },
      { name: "Design QA", ai: "medium" }, { name: "Component Specification", ai: "high" },
      { name: "Design Systems", ai: "high" },
    ],
    prompts: [
      { title: "Component Spec Writer", when: "Preparing specs for engineering handoff", output: "Complete component specification",
        prompt: `Write a complete component specification for:\n\nComponent: [NAME]\nPurpose: [WHAT IT DOES]\nContext: [WHERE IT'S USED]\n\nDocument:\n- Props/API (name, type, default, description)\n- Visual states (default, hover, active, disabled, focus, error, loading)\n- Responsive behavior (breakpoints and layout changes)\n- Accessibility requirements (ARIA, keyboard, screen reader)\n- Content guidelines (character limits, truncation rules)\n- Edge cases and constraints\n- Usage examples (do's and don'ts)\n\nWrite this so a developer can build it without asking questions.` },
      { title: "Release Notes & Changelog", when: "When shipping updates", output: "Release notes (internal + external)",
        prompt: `Write user-facing release notes for these design changes:\n\n[LIST CHANGES]\n\nCreate two versions:\n1. Internal changelog (detailed, for team reference)\n2. User-facing release notes (friendly, benefit-focused)\n\nFor each change: categorize as New / Improved / Fixed, describe what changed and why, and note any user action needed.` },
      { title: "Design Decision Record", when: "After any significant design decision", output: "Design decision record",
        prompt: `Document this design decision:\n\nDecision: [WHAT WAS DECIDED]\nContext: [WHAT PROMPTED THIS]\nOptions considered: [LIST ALTERNATIVES]\n\nCreate a design decision record (DDR) with:\n- Status: Accepted\n- Context and problem statement\n- Options evaluated (with pros/cons of each)\n- Decision and rationale\n- Consequences (tradeoffs accepted)\n- Related decisions or dependencies` },
    ],
    templates: [
      { name: "Handoff Checklist", fields: ["Specs Complete", "Assets Exported", "Redlines Done", "Edge Cases Documented", "A11y Annotated", "Dev Review"] },
      { name: "Design Decision Record", fields: ["Decision", "Context", "Options", "Rationale", "Tradeoffs", "Date"] },
    ],
    aiTools: ["Claude — Specs, docs & code generation", "Figma Dev Mode — Automated handoff", "Storybook — Component documentation", "Zeroheight — Design system docs"],
    skillDocs: [
      { name: "design-delivery", file: "06-deliver/design-delivery.md", title: "Design Delivery & Documentation",
        summary: "Ship designs with platform-specific precision — component specs, handoff packages, DDRs, and release notes.",
        workflow: ["Write component specs (props, all states, responsive, a11y, content guidelines)", "Prepare platform-specific handoff: Web, iOS, Android", "Document design decisions as DDRs with rationale", "Write release notes (internal changelog + user-facing)"],
        outputs: ["Component Specs", "Web Handoff Package", "iOS Handoff Package", "Android Handoff Package", "Design Decision Records", "Release Notes"],
        checklist: ["Specs complete enough for devs to build without questions", "Platform-specific rules addressed (iOS / Android / Web)", "All assets exported and organized", "Token names used throughout — no raw values", "Accessibility package included", "Acceptance criteria defined for eng review"] },
    ],
    figmaActions: [
      { action: "Spec Annotations", desc: "Annotation cards connected to design elements with token references (spacing, color, type, radius)", example: '"Annotate the card component with spacing and color specs"' },
      { action: "Component Documentation", desc: "Doc frames with variants grid, props table, states row, usage guidelines, and a11y notes", example: '"Create documentation frames for the Button and Input components"' },
      { action: "Design Decision Records", desc: "Structured DDR cards with status badge, options with pros/cons, rationale, and consequences", example: '"Document the navigation decision as a DDR on the Deliver page"' },
    ],
  },
];

const AI_LEVERAGE_COLOR = { high: "#22C55E", medium: "#F59E0B", low: "#EF4444" };
const AI_LEVERAGE_LABEL = { high: "High AI leverage", medium: "Medium AI leverage", low: "Low — your judgment" };

export default function DesignProcessSystem() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeTab, setActiveTab] = useState("prompts");
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(null);

  const phase = activePhase ? PHASES.find(p => p.id === activePhase) : null;
  const phaseDS = phase ? PHASE_BY_ID[phase.id] : null;
  const phaseColor = phaseDS?.color || "#94A3B8";

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: DS.dark, minHeight: "100vh", color: DS.white }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ── HERO — dark ── */}
      <div style={{ padding: "48px 40px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 3, textTransform: "uppercase", color: DS.bodyLight, marginBottom: 16, opacity: 0.7 }}>Living System</div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, margin: "0 0 12px", lineHeight: 1.1, color: DS.white }}>
          AI × UX Design Process
        </h1>
        <p style={{ fontSize: 15, color: DS.bodyLight, maxWidth: 560, lineHeight: 1.65, margin: "0 0 32px" }}>
          A scalable framework for integrating AI into every phase of product design — from research through delivery.
        </p>

        {/* Phase strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {PHASES.map(p => {
            const pds = PHASE_BY_ID[p.id];
            const isActive = activePhase === p.id;
            return (
              <button key={p.id}
                onClick={() => { setActivePhase(activePhase === p.id ? null : p.id); setActiveTab("prompts"); setExpandedPrompt(null); }}
                style={{
                  background: "transparent",
                  border: `1px solid ${isActive ? pds.color : pds.color + "55"}`,
                  borderRadius: 10, padding: "16px 14px", cursor: "pointer", textAlign: "left",
                  transition: "all 0.2s ease", outline: "none",
                  boxShadow: isActive ? `0 0 0 1px ${pds.color}` : "none",
                }}
              >
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: pds.color, marginBottom: 5, opacity: 0.7 }}>{p.number}</div>
                <div style={{ fontWeight: 600, fontSize: 13, color: pds.color }}>{pds.label}</div>
                <div style={{ fontSize: 11, color: pds.color, opacity: 0.6, marginTop: 3, lineHeight: 1.3 }}>{p.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PHASE DETAIL — light ── */}
      {phase && (
        <div style={{ background: DS.light }}>
          <div style={{ padding: "32px 40px 48px", maxWidth: 1100, margin: "0 auto" }}>

            {/* Skills Bar */}
            <div style={{ background: DS.white, borderRadius: 16, padding: 24, marginBottom: 16, border: `1px solid ${DS.lightBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 16 }}>Skills Matrix</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {phase.skills.map(s => (
                  <div key={s.name} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 13px", borderRadius: 8, background: "transparent", border: `1px solid ${AI_LEVERAGE_COLOR[s.ai]}55` }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#0F172A" }}>{s.name}</span>
                    <span style={{ fontSize: 9, fontFamily: "'JetBrains Mono', monospace", color: AI_LEVERAGE_COLOR[s.ai], fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 }}>{s.ai}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                {Object.entries(AI_LEVERAGE_COLOR).map(([key, color]) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 4, background: "transparent", border: `1.5px solid ${color}` }} />
                    <span style={{ fontSize: 11, color: DS.bodyDark }}>{AI_LEVERAGE_LABEL[key]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {[
                { id: "prompts", label: "AI Prompts & Workflows", count: phase.prompts.length },
                { id: "skills", label: "Skill Docs", count: phase.skillDocs?.length || 0 },
                { id: "figma", label: "Figma Playbook", count: phase.figmaActions?.length || 0 },
                { id: "templates", label: "Templates", count: phase.templates.length },
                { id: "tools", label: "Recommended Tools", count: phase.aiTools.length },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  background: activeTab === tab.id ? "#0F172A" : "transparent",
                  color: activeTab === tab.id ? DS.white : DS.bodyDark,
                  border: activeTab === tab.id ? "none" : `1px solid ${DS.lightBorder}`,
                  borderRadius: 8, padding: "9px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {tab.label}
                  <span style={{ background: activeTab === tab.id ? "rgba(255,255,255,0.15)" : DS.light, borderRadius: 10, padding: "2px 7px", fontSize: 11, color: activeTab === tab.id ? DS.white : DS.bodyDark }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Prompts Tab */}
            {activeTab === "prompts" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {phase.prompts.map((p, i) => (
                  <div key={i} style={{ background: DS.white, borderRadius: 16, border: `1px solid ${DS.lightBorder}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <button onClick={() => setExpandedPrompt(expandedPrompt === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", cursor: "pointer", padding: "18px 22px", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "#0F172A" }}>{p.title}</div>
                        <div style={{ fontSize: 12, color: DS.bodyDark }}>{p.when}</div>
                      </div>
                      <div style={{ width: 28, height: 28, borderRadius: 14, background: "transparent", border: `1px solid ${phaseColor}55`, display: "flex", alignItems: "center", justifyContent: "center", transform: expandedPrompt === i ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", fontSize: 14, color: phaseColor }}>▾</div>
                    </button>
                    {expandedPrompt === i && (
                      <div style={{ padding: "0 22px 20px" }}>
                        <div style={{ marginBottom: 12 }}>
                          <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "transparent", border: `1px solid ${phaseColor}55`, color: phaseColor, padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>
                            Output → {p.output}
                          </span>
                        </div>
                        <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, background: DS.dark, color: "#e0e0e0", padding: 20, borderRadius: 12, whiteSpace: "pre-wrap", lineHeight: 1.7, margin: "0 0 12px", border: `1px solid ${DS.darkBorder}`, overflowX: "auto" }}>
                          {p.prompt}
                        </pre>
                        <button onClick={() => copyToClipboard(p.prompt, `${phase.id}-${i}`)}
                          style={{ background: copiedPrompt === `${phase.id}-${i}` ? "#22C55E" : "#0F172A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 500, transition: "background 0.2s" }}>
                          {copiedPrompt === `${phase.id}-${i}` ? "✓ Copied to clipboard" : "Copy prompt"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Skill Docs Tab */}
            {activeTab === "skills" && phase.skillDocs && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {phase.skillDocs.map((skill, i) => (
                  <div key={i} style={{ background: DS.white, borderRadius: 16, border: `1px solid ${DS.lightBorder}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "24px 24px 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4, color: "#0F172A" }}>{skill.title}</div>
                          <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.5 }}>{skill.summary}</div>
                        </div>
                        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "transparent", border: `1px solid ${phaseColor}55`, color: phaseColor, padding: "4px 10px", borderRadius: 6, fontWeight: 500, whiteSpace: "nowrap" }}>
                          {skill.file}
                        </span>
                      </div>
                    </div>
                    <div style={{ padding: "16px 24px" }}>
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 10 }}>Workflow</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {skill.workflow.map((step, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <div style={{ width: 22, height: 22, borderRadius: 11, background: "transparent", border: `1px solid ${phaseColor}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: phaseColor, flexShrink: 0, marginTop: 1 }}>{j + 1}</div>
                            <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{step}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "0 24px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div style={{ background: DS.light, borderRadius: 10, padding: 16, border: `1px solid ${DS.lightBorder}` }}>
                        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 10 }}>Key Outputs</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {skill.outputs.map((out, j) => (
                            <span key={j} style={{ fontSize: 12, padding: "4px 11px", borderRadius: 20, background: "transparent", border: `1px solid ${phaseColor}55`, color: phaseColor, fontWeight: 500 }}>{out}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ background: DS.light, borderRadius: 10, padding: 16, border: `1px solid ${DS.lightBorder}` }}>
                        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyDark, marginBottom: 10 }}>Quality Checklist</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                          {skill.checklist.map((item, j) => (
                            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#555", lineHeight: 1.4 }}>
                              <span style={{ color: phaseColor, flexShrink: 0 }}>☐</span>{item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "12px 24px", background: DS.light, borderTop: `1px solid ${DS.lightBorder}` }}>
                      <span style={{ fontSize: 11, color: DS.bodyDark, fontFamily: "'JetBrains Mono', monospace", opacity: 0.6 }}>Full skill → skills/{skill.file}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Figma Playbook Tab */}
            {activeTab === "figma" && phase.figmaActions && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ background: DS.white, borderRadius: 12, padding: "14px 20px", border: `1px solid #F59E0B55`, marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: "#92400E" }}>
                    <strong>Figma MCP</strong> — Claude executes these actions directly in your Figma file. Describe what you need and which page to target.
                  </span>
                </div>
                {phase.figmaActions.map((fa, i) => (
                  <div key={i} style={{ background: DS.white, borderRadius: 16, border: `1px solid ${DS.lightBorder}`, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ padding: "20px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 8, background: "#0F172A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>F</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "#0F172A" }}>{fa.action}</div>
                      </div>
                      <div style={{ fontSize: 13, color: DS.bodyDark, lineHeight: 1.5, marginBottom: 12 }}>{fa.desc}</div>
                      <div style={{ background: DS.dark, borderRadius: 8, padding: "12px 16px" }}>
                        <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: DS.bodyLight, marginBottom: 6, opacity: 0.6 }}>EXAMPLE PROMPT</div>
                        <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#e0e0e0", lineHeight: 1.5 }}>{fa.example}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === "templates" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
                {phase.templates.map((t, i) => (
                  <div key={i} style={{ background: DS.white, borderRadius: 16, padding: 24, border: `1px solid ${DS.lightBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#0F172A" }}>{t.name}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {t.fields.map((f, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: DS.light, borderRadius: 8, border: `1px solid ${DS.lightBorder}` }}>
                          <div style={{ width: 6, height: 6, borderRadius: 3, background: "transparent", border: `1.5px solid ${phaseColor}` }} />
                          <span style={{ fontSize: 13, color: "#0F172A" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 16, fontSize: 11, color: DS.bodyDark, fontFamily: "'JetBrains Mono', monospace" }}>{t.fields.length} fields — expand as needed</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tools Tab */}
            {activeTab === "tools" && (
              <div style={{ background: DS.white, borderRadius: 16, padding: 24, border: `1px solid ${DS.lightBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {phase.aiTools.map((tool, i) => {
                    const [name, desc] = tool.split(" — ");
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", background: i % 2 === 0 ? DS.light : "transparent", borderRadius: 10, border: `1px solid ${i % 2 === 0 ? DS.lightBorder : "transparent"}` }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: `1px solid ${phaseColor}55`, display: "flex", alignItems: "center", justifyContent: "center", color: phaseColor, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{name.charAt(0)}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, color: "#0F172A" }}>{name}</div>
                          <div style={{ fontSize: 12, color: DS.bodyDark }}>{desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── BOTTOM GUIDANCE — dark ── */}
      {!activePhase && (
        <div style={{ padding: "32px 40px 64px", maxWidth: 1100, margin: "0 auto" }}>

          {/* How to Use */}
          <div style={{ background: DS.darkCard, borderRadius: 16, padding: 32, border: `1px solid ${DS.darkBorder}`, marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyLight, opacity: 0.6, marginBottom: 20 }}>How to Use This System</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
              {[
                { num: "01", title: "Select a phase", desc: "Click any phase above to reveal its AI prompts, skills matrix, templates, and tool recommendations." },
                { num: "02", title: "Copy & customize prompts", desc: "Each prompt has placeholders in [BRACKETS]. Replace them with your project specifics and paste into Claude." },
                { num: "03", title: "Use templates as scaffolding", desc: "Templates show the essential fields. Expand them for your project's needs — they're starting points, not rigid forms." },
                { num: "04", title: "Scale over time", desc: "Add your own prompts that work. Remove what doesn't. This system grows with your practice and your projects." },
              ].map(item => (
                <div key={item.num}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: DS.bodyLight, opacity: 0.4, marginBottom: 6 }}>{item.num}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: DS.white }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Onboarding + Figma Playbook side-by-side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            {/* Onboarding card */}
            <div style={{ background: DS.darkCard, borderRadius: 16, padding: 24, border: `1px solid ${DS.phases["06"].color}33`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.phases["06"].color, marginBottom: 10, opacity: 0.8 }}>Onboarding Guide</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: DS.white, marginBottom: 8 }}>New to the framework?</div>
                <div style={{ fontSize: 13, color: DS.bodyLight, lineHeight: 1.5 }}>An 18-slide deck covering the framework's value, use cases, and step-by-step Figma + Claude setup.</div>
              </div>
              <a href="https://github.com/quinrobinson/AI-x-UX-Product-Design-Framework/raw/main/artifacts/onboarding-deck.pptx"
                style={{ display: "inline-block", marginTop: 20, background: "transparent", border: `1px solid ${DS.phases["06"].color}55`, color: DS.phases["06"].color, padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                Download PPTX
              </a>
            </div>

            {/* Figma Playbook card */}
            <div style={{ background: DS.darkCard, borderRadius: 16, padding: 24, border: `1px solid ${DS.phases["03"].color}33` }}>
              <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.phases["03"].color, marginBottom: 10, opacity: 0.8 }}>Figma Playbook — MCP Integration</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: DS.white, marginBottom: 8 }}>Claude builds directly in Figma</div>
              <p style={{ fontSize: 13, color: DS.bodyLight, margin: "0 0 16px", lineHeight: 1.5 }}>
                Phase skills define <em>what</em> to create. The playbook defines <em>how</em> to execute it in Figma via MCP.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[
                  { phase: "01", actions: ["Research findings boards", "Persona cards"] },
                  { phase: "02", actions: ["Journey maps", "Design briefs"] },
                  { phase: "03", actions: ["Concept cards", "Wireframe scaffolding"] },
                  { phase: "04", actions: ["Components with variants", "Screen layouts"] },
                  { phase: "05", actions: ["Task completion matrices", "Issue cards"] },
                  { phase: "06", actions: ["Spec annotations", "Component doc frames"] },
                ].slice(0, 4).map(p => (
                  <div key={p.phase} style={{ padding: 10, borderRadius: 8, background: "transparent", border: `1px solid ${DS.phases[p.phase].color}33` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: DS.phases[p.phase].color, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>{DS.phases[p.phase].label}</div>
                    {p.actions.map((a, i) => (
                      <div key={i} style={{ fontSize: 11, color: DS.bodyLight, marginBottom: 2, display: "flex", gap: 5 }}>
                        <span style={{ color: DS.phases[p.phase].color, opacity: 0.7 }}>→</span> {a}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Philosophy */}
          <div style={{ background: DS.darkCard, borderRadius: 16, padding: 32, border: `1px solid ${DS.darkBorder}` }}>
            <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: DS.bodyLight, opacity: 0.5, marginBottom: 20 }}>The AI × Design Philosophy</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 12, color: DS.white }}>AI amplifies throughput.</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: DS.bodyLight, margin: 0 }}>Research that took days can be synthesized in minutes. Prototypes that needed a week can ship in hours. AI removes the friction from the labor-intensive parts of design.</p>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, marginBottom: 12, color: DS.white }}>You provide judgment.</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: DS.bodyLight, margin: 0 }}>Taste, empathy, strategic thinking, stakeholder navigation — these remain fundamentally human skills. AI generates options. You make decisions.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
