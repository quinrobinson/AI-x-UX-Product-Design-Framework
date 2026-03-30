import { useState } from "react";

const PHASES = [
  {
    id: "discover",
    number: "01",
    name: "Discover",
    subtitle: "Understand the problem space",
    color: "#E8F0E8",
    accent: "#2D5A27",
    skills: [
      { name: "User Research", level: "core", ai: "high" },
      { name: "Competitive Analysis", level: "core", ai: "high" },
      { name: "Stakeholder Interviews", level: "core", ai: "medium" },
      { name: "Data Synthesis", level: "core", ai: "high" },
      { name: "Contextual Inquiry", level: "supporting", ai: "low" },
    ],
    prompts: [
      {
        title: "Research Synthesis",
        prompt: `You are a UX research analyst. I'm going to share raw research data (interview transcripts, survey responses, analytics). Analyze this data and produce:\n\n1. Key themes (grouped by frequency and impact)\n2. User pain points ranked by severity\n3. Unmet needs & opportunities\n4. Contradictions or surprising findings\n5. Recommended areas for deeper investigation\n\nFormat as a structured research brief I can share with my team.`,
        when: "After collecting raw research data",
        output: "Research brief with themes & insights",
      },
      {
        title: "Competitive Landscape",
        prompt: `Act as a UX strategist. Analyze these competitors for [PRODUCT CATEGORY]:\n\n[LIST COMPETITORS]\n\nFor each, evaluate:\n- Core value proposition\n- Key UX patterns they use\n- Strengths and weaknesses\n- Unique differentiators\n- Gaps and opportunities they miss\n\nThen synthesize: What conventions exist in this space? Where is there room to innovate? What are users likely conditioned to expect?`,
        when: "Early in discovery to map the landscape",
        output: "Competitive analysis matrix",
      },
      {
        title: "Persona Generator",
        prompt: `Based on the following research insights, create 2-3 evidence-based user personas:\n\n[PASTE RESEARCH INSIGHTS]\n\nFor each persona include:\n- Name, role, and context\n- Goals (functional + emotional)\n- Frustrations & pain points\n- Current workarounds\n- Key quote that captures their mindset\n- Behavioral patterns relevant to [PRODUCT]\n\nAvoid stereotypes. Ground every detail in the research data provided.`,
        when: "After initial research synthesis",
        output: "Evidence-based personas",
      },
    ],
    templates: [
      {
        name: "Research Plan",
        fields: ["Objectives", "Methods", "Participants", "Timeline", "Key Questions", "Success Metrics"],
      },
      {
        name: "Interview Guide",
        fields: ["Warm-up Questions", "Core Topics", "Scenario Prompts", "Wrap-up", "Observer Notes Template"],
      },
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
    handoff: {
      direction: "Discover → Define",
      nextPhase: "Problem Framing",
      description: "Close User Research or Competitive Analysis by generating a handoff block. Paste it as the first message when opening Problem Framing — Claude picks up with full research context.",
      blocks: [
        {
          title: "User Research Handoff",
          subtitle: "Synthesized research findings for problem framing",
          from: "User Research", to: "Define",
          carries: "Top 3 themes, primary pain points ranked by severity, unmet needs, a key user quote, and the assumptions that still need validating in Define.",
          fields: ["Product / problem space", "Research method & participants", "Top 3 themes (with frequency)", "Pain points ranked by severity", "Unmet needs → opportunities", "Key user quote", "Assumptions to validate", "Constraints surfaced", "What Define should focus on"],
        },
        {
          title: "Competitive Analysis Handoff",
          subtitle: "Market context and differentiation signals for problem framing",
          from: "Competitive Analysis", to: "Define",
          carries: "Dominant UX conventions (what users expect), competitive gaps, standout patterns worth adopting, and the differentiation opportunity that should shape the problem statement.",
          fields: ["Competitive set (direct / indirect / aspirational)", "Dominant UX conventions", "Competitive gaps (opportunities)", "Standout patterns to adopt", "Differentiation opportunity", "Positioning signal for Define"],
        },
      ],
    },
    figmaActions: [
      { action: "Persona Cards", desc: "Structured persona layouts with name, role, goals, frustrations, and key quote", example: "\"Build persona cards for our 3 research personas on the Discover page\"" },
      { action: "Competitive Matrix", desc: "Color-coded comparison table with competitors as columns and evaluation dimensions as rows", example: "\"Create a competitive analysis matrix comparing these 4 competitors...\"" },
    ],
  },
  {
    id: "define",
    number: "02",
    name: "Define",
    subtitle: "Frame the right problem",
    color: "#E8E4F0",
    accent: "#4A3166",
    skills: [
      { name: "Problem Framing", level: "core", ai: "medium" },
      { name: "Information Architecture", level: "core", ai: "medium" },
      { name: "Journey Mapping", level: "core", ai: "high" },
      { name: "Requirements Definition", level: "core", ai: "medium" },
      { name: "Strategic Thinking", level: "supporting", ai: "low" },
    ],
    prompts: [
      {
        title: "Problem Statement Refiner",
        prompt: `I need to define a clear problem statement for a UX project. Here's what I know:\n\nUser: [WHO]\nContext: [SITUATION]\nPain: [PROBLEM]\nGoal: [DESIRED OUTCOME]\n\nGenerate 3 versions of a problem statement:\n1. A "How Might We" framing\n2. A Jobs-to-be-Done framing\n3. A user-story framing\n\nFor each, identify the assumptions being made and suggest how to validate them.`,
        when: "Transitioning from research to design",
        output: "Validated problem statement",
      },
      {
        title: "Journey Map Builder",
        prompt: `Create a detailed user journey map for this scenario:\n\nPersona: [PERSONA]\nGoal: [WHAT THEY'RE TRYING TO DO]\nContext: [CURRENT PRODUCT/PROCESS]\n\nMap each stage with:\n- Actions (what they do)\n- Thoughts (what they're thinking)\n- Emotions (how they feel, on a scale)\n- Touchpoints (what they interact with)\n- Pain points (what frustrates them)\n- Opportunities (where we can improve)\n\nIdentify the 3 biggest moments of friction and the 2 biggest opportunities.`,
        when: "When mapping current or future experiences",
        output: "Journey map with opportunity areas",
      },
      {
        title: "Requirements Prioritizer",
        prompt: `Help me prioritize these product/feature requirements using multiple frameworks:\n\n[LIST REQUIREMENTS]\n\nEvaluate using:\n1. MoSCoW (Must/Should/Could/Won't)\n2. Impact vs Effort matrix\n3. User value vs Business value\n\nThen recommend a phased approach: what ships in v1, v2, and future? Justify each decision.`,
        when: "When scoping what to build",
        output: "Prioritized requirements roadmap",
      },
    ],
    templates: [
      {
        name: "Design Brief",
        fields: ["Problem Statement", "Target Users", "Success Metrics", "Constraints", "Scope", "Timeline"],
      },
      {
        name: "Journey Map",
        fields: ["Persona", "Scenario", "Stages", "Actions", "Emotions", "Opportunities"],
      },
    ],
    aiTools: ["Claude — Problem framing & journey maps", "Miro AI — Visual mapping", "FigJam AI — Collaborative synthesis", "Whimsical — Flow diagramming"],
    skillDocs: [
      { name: "problem-framing", file: "02-define/problem-framing.md", title: "Problem Framing & Definition",
        summary: "Transform research insights into clear problem definitions that guide design decisions.",
        workflow: ["Gather inputs (research, business context, persona, current state)", "Generate multiple framings (HMW, JTBD, User Story)", "Identify assumptions and validation methods", "Select and refine the strongest framing"],
        outputs: ["Problem Statement", "Journey Map", "Requirements Roadmap", "Design Brief"],
        checklist: ["Problem specific enough to guide but open enough for creativity", "Assumptions explicitly stated", "Journey map based on research, not assumptions", "Requirements prioritized with rationale", "Scope boundaries explicit"] },
    ],
    handoff: {
      direction: "Define → Ideate",
      nextPhase: "Concept Generation",
      description: "Close Problem Framing by generating a handoff block. Paste it when opening Concept Generation — Claude generates concepts grounded in the validated problem, not generic ideas.",
      blocks: [
        {
          title: "Problem Framing Handoff",
          subtitle: "Validated problem statement and constraints for ideation",
          from: "Problem Framing", to: "Ideate",
          carries: "The selected problem statement (HMW/JTBD/user story), why it won over alternatives, specific constraints, top 3 journey friction points, success criteria, and a provocation to push ideation beyond the obvious.",
          fields: ["Carried forward from Discover", "Primary user (persona + context)", "Validated problem statement", "Why this framing (not alternatives)", "Key constraints (technical/business/user/brand)", "Journey friction points (top 3)", "Success criteria", "Scope (in / out)", "Provocation for Ideate"],
        },
      ],
    },
    figmaActions: [
      { action: "Journey Map", desc: "Stage columns with actions, thoughts, emotions (as colored dots), touchpoints, pain points, and opportunities", example: "\"Create a journey map for our primary persona on the Define page\"" },
      { action: "Design Brief Card", desc: "Structured layout with problem statement, users, metrics, constraints, and scope", example: "\"Build a design brief on the Define page with this problem statement...\"" },
      { action: "Requirements Board", desc: "Categorized requirements with MoSCoW tags and impact/effort indicators", example: "\"Create a prioritized requirements board with these features...\"" },
    ],
  },
  {
    id: "ideate",
    number: "03",
    name: "Ideate",
    subtitle: "Explore solutions broadly",
    color: "#FFF3E0",
    accent: "#8B5E00",
    skills: [
      { name: "Concept Generation", level: "core", ai: "high" },
      { name: "Sketching & Wireframing", level: "core", ai: "medium" },
      { name: "Design Patterns", level: "core", ai: "high" },
      { name: "Design Systems", level: "core", ai: "high" },
      { name: "Creative Direction", level: "supporting", ai: "low" },
      { name: "Systems Thinking", level: "core", ai: "medium" },
    ],
    prompts: [
      {
        title: "Concept Explorer",
        prompt: `I'm designing [FEATURE/PRODUCT]. The core problem is: [PROBLEM STATEMENT]\n\nGenerate 5 distinct concept directions, ranging from:\n1. Safe/conventional (what most competitors do)\n2. Incremental improvement (better version of existing patterns)\n3. Recombination (borrowing patterns from other domains)\n4. Paradigm shift (rethinking the core interaction model)\n5. Moonshot (if there were zero constraints)\n\nFor each concept:\n- Describe the core interaction in 2-3 sentences\n- Name the key UX pattern it relies on\n- List 1 strength and 1 risk\n- Suggest who this approach would resonate with most`,
        when: "Early ideation to generate range",
        output: "5 concept directions with tradeoffs",
      },
      {
        title: "UI Pattern Recommender",
        prompt: `I need to design a UI for this user task:\n\nTask: [WHAT THE USER NEEDS TO DO]\nContext: [PLATFORM, CONSTRAINTS, USER SKILL LEVEL]\nData: [WHAT INFORMATION IS INVOLVED]\n\nRecommend 3 different UI patterns that could solve this, drawing from:\n- Established design systems (Material, Apple HIG, Ant Design)\n- Patterns from analogous products in other industries\n- Emerging patterns in modern apps\n\nFor each pattern: describe the layout, explain why it works for this context, and note accessibility considerations.`,
        when: "When choosing interaction patterns",
        output: "Pattern recommendations with rationale",
      },
      {
        title: "Design System Scaffolder",
        prompt: `I'm building a design system for [PRODUCT TYPE]. The brand personality is [DESCRIBE TONE].\n\nPropose a foundational system using this exact structure (so I can paste it directly into my Design Token system):\n\n## Colors\n- Primary: [hex] — [why this color]\n- Primary Light: [hex]\n- Primary Dark: [hex]\n- Secondary: [hex] — [why]\n- Accent: [hex] — [why]\n- Success: [hex] | Warning: [hex] | Error: [hex] | Info: [hex]\n- Neutral scale: 50 through 900 (provide all 10 hex values)\n\n## Typography\n- Heading font: [font name] — [why this pairing]\n- Body font: [font name] — [why]\n- Mono font: [font name]\n- Base size: [px]\n- Scale ratio: [number, e.g. 1.25] — [why this ratio]\n\n## Spacing\n- Base unit: [4 or 8]px — [why]\n\n## Shape\n- Border radius SM: [px] — [personality rationale]\n- Border radius MD: [px]\n- Border radius LG: [px]\n- Philosophy: [sharp = corporate, round = friendly, mixed = modern]\n\n## Elevation\n- Shadow SM: [CSS shadow value]\n- Shadow MD: [CSS shadow value]\n- Shadow LG: [CSS shadow value]\n\n## Component Inventory (v1)\n[List the components needed for launch]\n\n## Motion\n- Easing: [ease-out for entries, ease-in for exits]\n- Fast: [ms] | Normal: [ms] | Slow: [ms]\n\nMake it opinionated. Every choice should reflect the brand personality.\n\nAFTER SCAFFOLDING:\n→ Paste color/type/spacing/shape values into the Design Tokens artifact to preview live\n→ Run the System Audit tab to verify coverage against Material/Atlassian/Carbon/Apple HIG\n→ Use the Figma Playbook to create token variables on page "07 — Design System"`,
        when: "Starting a new product or redesign",
        output: "Design system spec → paste into Design Tokens artifact",
      },
      {
        title: "Cross-System Comparison",
        prompt: `Compare how [COMPONENT NAME] is handled across the four major design systems:\n\n- Google Material Design 3 (m3.material.io/components)\n- Atlassian Design System (atlassian.design/components)\n- IBM Carbon (carbondesignsystem.com/components)\n- Apple HIG (developer.apple.com/design/human-interface-guidelines)\n\nFor each system, document:\n- Component name and variants available\n- Anatomy differences (structure, layers, sub-components)\n- Token / variable approach (naming convention)\n- Figma library availability\n- Accessibility implementation\n- Notable patterns we should adopt\n\nSynthesize into: what to borrow from each, and what to do differently for [PROJECT NAME].`,
        when: "Evaluating component approaches before building",
        output: "Cross-system comparison with recommendations",
      },
      {
        title: "M3 Token Documenter",
        prompt: `Document all design tokens for the [COMPONENT NAME] component following Material Design 3 token naming conventions:\n\nFor each token, provide:\n- Token name: md.comp.[component].[element].[property]\n- System token it maps to: md.sys.color.* | md.sys.elevation.* | md.sys.shape.*\n- States it applies to: default | hover | focus | pressed | disabled | error\n- Description of what it controls\n\nCover: color roles, elevation, shape/corner radius, typography, spacing.\n\nUse the M3 Token Reference artifact (m3-token-reference.jsx) as the reference format.`,
        when: "Documenting component tokens for Figma variables",
        output: "M3-format token spec → use to create Figma variables",
      },
    ],
    templates: [
      {
        name: "Concept Card",
        fields: ["Concept Name", "Core Idea", "Key Interaction", "Strengths", "Risks", "Open Questions"],
      },
      {
        name: "Wireframe Brief",
        fields: ["Screen Name", "User Goal", "Key Elements", "Interactions", "Edge Cases", "Notes"],
      },
      {
        name: "Design System Scaffold",
        fields: ["Primary Color (hex)", "Primary Light / Dark", "Secondary Color", "Accent Color", "Heading Font", "Body Font", "Base Size (px)", "Scale Ratio", "Spacing Base Unit", "Radius SM / MD / LG", "Radius Philosophy (sharp/round/mixed)", "Shadow SM / MD / LG", "Component Inventory (v1 list)", "Motion Durations"],
      },
    ],
    aiTools: [
      "Claude — Concept generation, scaffolding & critique",
      "Design Tokens artifact — Live token preview & tuning",
      "System Audit tab — Verify coverage vs Material/Atlassian/Carbon/HIG",
      "M3 Token Reference artifact — Component token documentation",
      "Figma MCP — Create token variables on Design System page",
      "Midjourney / DALL-E — Visual exploration",
      "Figma AI — Layout suggestions",
      "Relume — Sitemap & wireframe generation",
    ],
    skillDocs: [
      { name: "concept-generation", file: "03-ideate/concept-generation.md", title: "Concept Generation & Ideation",
        summary: "Generate design concepts, UI pattern recs, visual system directions, and chart type selections using the Five-Direction Method.",
        workflow: ["Generate 5 concept directions (convention → moonshot)", "Document each as a concept card with strengths, risks, and visual direction", "Select chart types matched to data relationships", "Recommend UI patterns for the selected direction", "Scaffold design system foundations"],
        outputs: ["Concept Cards", "Visual Direction Cards", "Chart Type Selection", "UI Pattern Recommendations", "Design System Scaffold", "Wireframe Briefs"],
        checklist: ["At least 3 directions explored", "Each concept has strengths AND risks", "Visual direction considered alongside interaction model", "Chart type justified against data relationship", "Pattern recs address accessibility", "Wireframes include all states and edge cases"] },
      { name: "visual-design-execution", file: "03-ideate/visual-design-execution.md", title: "Visual Design Execution",
        summary: "Translate a product brief into a cohesive visual system — style, color, typography, spacing, motion, and icons.",
        workflow: ["Select visual style matched to domain and audience", "Build semantic color token architecture with light/dark pairing", "Define typography pairings and type scale", "Establish 4pt spacing scale and shape tokens", "Set elevation and motion timing standards", "Define icon library and touch target rules"],
        outputs: ["Color Token System", "Typography Scale", "Spacing & Shape Tokens", "Motion Spec", "Icon Standards", "Pre-Delivery Visual QA"],
        checklist: ["One style system throughout — no mixing", "All colors reference semantic tokens", "Light and dark mode both tested", "Body text ≥ 4.5:1 contrast in both modes", "All spacing multiples of 4", "Animations ≤ 300ms, transform/opacity only", "Single icon library, consistent stroke width"] },
      { name: "design-systems", file: "design-systems.md", title: "Design System Audit & Token Documentation",
        summary: "Audit products against Material, Atlassian, Carbon, Apple HIG. Document tokens using M3 naming. Set up Figma variables.",
        workflow: ["Run design system audit using checklist artifact", "Document tokens following M3 naming conventions", "Set up Figma variable collections (Reference → System → Component)", "Create component anatomy documentation", "Compare approaches across the four major systems"],
        outputs: ["Audit Report", "M3 Token Specs", "Figma Variable Collections", "Component Anatomy Docs", "Cross-System Comparison"],
        checklist: ["All design decisions expressed as named tokens", "Light and dark mode variants for every color", "Typography scale uses M3 typescale names or equivalent", "Spacing follows 4px or 8px base grid", "Elevation documented with shadow + surface tint pairs"] },
    ],
    handoff: {
      direction: "Ideate → Prototype",
      nextPhase: "Prototyping",
      description: "Close Concept Generation (and Visual Design if run) by generating handoff blocks. Combine them when opening Prototyping — Claude builds a prototype that uses the right concept, visual system, and tokens from the start.",
      blocks: [
        {
          title: "Concept Generation Handoff",
          subtitle: "Selected concept, visual direction, and screens to build",
          from: "Concept Generation", to: "Prototype",
          carries: "The selected concept name and interaction model, why it won over rejected alternatives, visual direction (style + color + type), screens to prototype, key interactions to nail, platform and stack, and open questions to resolve through building.",
          fields: ["Carried forward from Define", "Selected concept (name + core idea + UX pattern)", "Why chosen over alternatives", "Rejected concepts + reasons", "Visual direction (style / color / type / density)", "Screens / flows to prototype", "Key interactions to nail", "Platform & stack", "Open questions for prototype phase"],
        },
        {
          title: "Visual Design Handoff",
          subtitle: "Full token set for prototype implementation",
          from: "Visual Design", to: "Prototype",
          carries: "The complete design token set — brand colors, surface colors, typography, spacing scale, shape tokens, motion timing — ready to paste directly into the prototype.",
          fields: ["Brand primary + secondary (hex + token name)", "Surface colors light + dark", "Text colors primary + secondary", "Heading font + body font", "Type scale (xs through 5xl)", "Spacing scale + shape tokens", "Motion timing (fast/normal/slow + easing)", "Icon library + stroke width", "Dark mode supported y/n"],
        },
      ],
    },
    figmaActions: [
      { action: "Concept Cards", desc: "Row of 5 concept cards using the Five-Direction Method with strength/risk tags", example: "\"Create concept exploration cards for these 5 directions on the Ideate page\"" },
      { action: "Wireframe Scaffolding", desc: "Frame structures at standard device widths (375, 768, 1280) with labeled content areas", example: "\"Scaffold wireframe frames for the dashboard and settings screens\"" },
      { action: "Pattern Reference Board", desc: "Collected UI patterns with source, description, and applicability notes", example: "\"Build a pattern reference board with these navigation approaches\"" },
      { action: "Design System Token Page", desc: "Create token swatches, type scale, spacing bars, and elevation cards on the Design System page from scaffolded values", example: "\"Take my scaffolded design system and build the token reference on page 07 — Design System\"" },
      { action: "Figma Variable Collections", desc: "Set up Reference, System, and Component variable collections following M3 conventions", example: "\"Create Figma variable collections for my color tokens with light and dark modes\"" },
    ],
  },
  {
    id: "prototype",
    number: "04",
    name: "Prototype",
    subtitle: "Make it real and testable",
    color: "#E3F2FD",
    accent: "#1A4B8C",
    skills: [
      { name: "Interaction Design", level: "core", ai: "medium" },
      { name: "Visual Design", level: "core", ai: "medium" },
      { name: "Prototyping Tools", level: "core", ai: "high" },
      { name: "Frontend Development", level: "supporting", ai: "high" },
      { name: "Micro-interactions", level: "supporting", ai: "medium" },
    ],
    prompts: [
      {
        title: "Functional Prototype",
        prompt: `Build a functional prototype for this screen/flow:\n\n[DESCRIBE THE SCREEN AND ITS PURPOSE]\n\nUser flow:\n1. [STEP 1]\n2. [STEP 2]\n3. [STEP 3]\n\nRequirements:\n- Use React with Tailwind CSS\n- Include realistic sample data\n- Handle loading, empty, and error states\n- Add meaningful micro-interactions\n- Make it responsive\n\nDesign direction: [DESCRIBE THE AESTHETIC]`,
        when: "When you need a working prototype fast",
        output: "Functional React prototype",
      },
      {
        title: "Copy & Content Generator",
        prompt: `Write UX copy for this interface:\n\nProduct: [PRODUCT]\nScreen: [SCREEN NAME]\nUser context: [WHAT BROUGHT THEM HERE]\n\nI need copy for:\n- Headlines and subheads\n- Button labels (primary & secondary actions)\n- Empty states\n- Error messages (be specific about what went wrong)\n- Success/confirmation messages\n- Tooltips and helper text\n- Onboarding microcopy\n\nTone: [DESCRIBE VOICE]. Be concise. Every word should earn its place.`,
        when: "When building out UI copy systematically",
        output: "Complete screen copy set",
      },
      {
        title: "Accessibility Audit",
        prompt: `Review this UI design/code for accessibility:\n\n[PASTE CODE OR DESCRIBE THE DESIGN]\n\nCheck against:\n- WCAG 2.1 AA compliance\n- Color contrast ratios\n- Keyboard navigation flow\n- Screen reader experience\n- Focus management\n- Touch target sizes\n- Motion sensitivity considerations\n- Semantic HTML structure\n\nFor each issue found: describe the problem, its severity (critical/major/minor), and provide the specific fix.`,
        when: "Before any user testing or handoff",
        output: "Accessibility audit with fixes",
      },
    ],
    templates: [
      {
        name: "Prototype Spec",
        fields: ["Screen", "User Story", "Interactions", "States", "Data Needed", "Design Tokens"],
      },
      {
        name: "Design QA Checklist",
        fields: ["Visual Consistency", "Responsive Behavior", "Accessibility", "Edge Cases", "Copy Review", "Performance"],
      },
    ],
    aiTools: ["Claude — Code prototypes & components", "v0 by Vercel — UI generation", "Figma Dev Mode — Design-to-code", "Cursor / Copilot — Code assistance"],
    skillDocs: [
      { name: "prototyping", file: "04-prototype/prototyping.md", title: "Prototyping & Production Design",
        summary: "Build functional prototypes with correct touch targets, interaction timing, gesture safety, and platform-specific QA.",
        workflow: ["Define prototype spec (purpose, fidelity, platform, states)", "Build structure → content → states → interactions", "Apply touch target standards (44×44pt iOS / 48×48dp Android)", "Specify interaction timing (80–300ms) and animation rules", "Write UX copy systematically per screen", "Run pre-delivery QA checklist (interaction, gesture, light/dark, layout, a11y)"],
        outputs: ["Functional Prototype", "Interaction Timing Spec", "UX Copy System", "Pre-Delivery QA Checklist"],
        checklist: ["All tappable elements have press feedback ≤ 150ms", "Touch targets ≥ 44×44pt (iOS) / 48×48dp (Android)", "Animation 80–300ms, transform/opacity only", "Gesture conflicts with system swipes checked", "Safe areas respected (notch, gesture bar)", "Primary text ≥ 4.5:1 contrast in light and dark mode", "Disabled states visually clear and non-interactive"] },
      { name: "accessibility-audit", file: "04-prototype/accessibility-audit.md", title: "Accessibility Audit",
        summary: "Systematic WCAG 2.1 AA audit for web and native mobile covering contrast, keyboard, screen readers, touch, and forms.",
        workflow: ["Define audit scope (platform, WCAG level, components in scope)", "Check visual: contrast ratios, color as sole indicator, text resize", "Check keyboard & focus: tab order, visible rings, skip links, no traps", "Check screen reader: semantic HTML, heading hierarchy, ARIA, alt text", "Check touch: target sizes, gesture alternatives, reduced motion", "Check forms: labels, error placement, focus management", "Produce audit report with severity levels and fixes"],
        outputs: ["Accessibility Audit Report", "Issue List with Severity", "Platform-Specific Notes", "Pre-Delivery a11y Checklist"],
        checklist: ["All body text ≥ 4.5:1 (light and dark mode)", "UI components and icons ≥ 3:1", "Color never sole indicator of meaning", "All interactive elements reachable by Tab", "Focus indicator visible on every interactive element", "Touch targets ≥ 44×44pt / 48×48dp", "prefers-reduced-motion respected", "One h1 per page, sequential heading hierarchy"] },
    ],
    handoff: {
      direction: "Prototype → Validate",
      nextPhase: "Usability Testing",
      description: "Close Prototyping by generating a handoff block. Paste it when opening Usability Testing — Claude writes a test plan with tasks matched to the actual prototype screens and your riskiest hypotheses.",
      blocks: [
        {
          title: "Prototyping Handoff",
          subtitle: "Prototype details, hypotheses, and draft test tasks",
          from: "Prototyping", to: "Validate",
          carries: "Prototype link and fidelity, all screens built, key design decisions made during building, known gaps and shortcuts testers should know, the 3 hypotheses to test ranked by risk, and draft task scenarios.",
          fields: ["Carried forward from Ideate", "Prototype link + fidelity", "Screens built + flows covered", "Key design decisions (+ rationale)", "Known gaps / shortcuts", "Hypotheses to test (with success criteria)", "Riskiest assumptions (top 2)", "Draft task scenarios", "Accessibility notes for testers"],
        },
      ],
    },
    figmaActions: [
      { action: "Component Creation", desc: "Build components with variants (default, hover, active, disabled, focus, error) and auto-layout", example: "\"Create a Button component with primary/secondary/outline variants\"" },
      { action: "Screen Layouts", desc: "Full screen designs at standard breakpoints with all states (default, loading, error, empty, success)", example: "\"Build the dashboard screen layout with default and empty states\"" },
      { action: "Design System Variables", desc: "Create Figma variables for color, spacing, and radius tokens", example: "\"Set up design system variables for our client's brand tokens\"" },
    ],
  },
  {
    id: "validate",
    number: "05",
    name: "Validate",
    subtitle: "Test with real people",
    color: "#FDE8E8",
    accent: "#8C1A1A",
    skills: [
      { name: "Usability Testing", level: "core", ai: "medium" },
      { name: "Data Analysis", level: "core", ai: "high" },
      { name: "A/B Testing", level: "supporting", ai: "high" },
      { name: "Heuristic Evaluation", level: "core", ai: "high" },
      { name: "Stakeholder Communication", level: "supporting", ai: "medium" },
    ],
    prompts: [
      {
        title: "Test Plan Generator",
        prompt: `Create a usability test plan for:\n\nProduct: [PRODUCT]\nFeature being tested: [FEATURE]\nKey hypothesis: [WHAT WE BELIEVE]\n\nGenerate:\n1. Test objectives (what we'll learn)\n2. Participant criteria (who to recruit, 5-8 participants)\n3. Task scenarios (5-7 realistic tasks, not leading)\n4. Success metrics (completion rate, time, errors, satisfaction)\n5. Discussion guide with probing questions\n6. Observer note-taking template\n\nTasks should feel natural, not like instructions. Frame them as scenarios.`,
        when: "Before running usability tests",
        output: "Complete test plan with scenarios",
      },
      {
        title: "Test Results Analyzer",
        prompt: `Analyze these usability test results:\n\n[PASTE RAW NOTES, OBSERVATIONS, METRICS]\n\nSynthesize into:\n1. Task completion summary (pass/fail/assist per task per participant)\n2. Top 5 usability issues ranked by severity × frequency\n3. Positive findings (what worked well)\n4. Patterns across participants\n5. Recommended fixes (quick wins vs. larger redesigns)\n6. Questions that need further investigation\n\nPresent severity using Nielsen's scale: Cosmetic / Minor / Major / Catastrophic`,
        when: "After completing usability sessions",
        output: "Structured findings report",
      },
      {
        title: "Heuristic Review",
        prompt: `Conduct a heuristic evaluation of this design using Nielsen's 10 heuristics:\n\n[DESCRIBE OR SHARE THE DESIGN]\n\nFor each heuristic:\n- Rate compliance: Strong / Adequate / Weak / Violated\n- Cite specific examples from the design\n- If violated: describe the issue, severity, and suggested fix\n\nThen provide an overall UX score and the 3 highest-priority improvements.`,
        when: "Quick quality check before testing",
        output: "Heuristic evaluation report",
      },
    ],
    templates: [
      {
        name: "Test Session Notes",
        fields: ["Participant ID", "Task", "Outcome", "Time", "Errors", "Observations", "Quotes"],
      },
      {
        name: "Findings Report",
        fields: ["Issue", "Severity", "Frequency", "Evidence", "Recommendation", "Priority"],
      },
    ],
    aiTools: ["Claude — Analysis & report generation", "Maze — Unmoderated testing", "Hotjar — Behavioral analytics", "Optimal Workshop — IA testing"],
    skillDocs: [
      { name: "usability-testing", file: "05-validate/usability-testing.md", title: "Usability Testing & Validation",
        summary: "Plan, run, and analyze usability tests and heuristic evaluations.",
        workflow: ["Create test plan with objectives, participant criteria, and metrics", "Write non-leading task scenarios with realistic context", "Facilitate sessions (or set up unmoderated tests)", "Synthesize results with severity × frequency ranking", "Conduct heuristic evaluation as quick quality check"],
        outputs: ["Test Plan", "Task Scenarios", "Session Notes", "Findings Report", "Heuristic Evaluation"],
        checklist: ["Task scenarios are realistic and non-leading", "Participant criteria specific enough to recruit right people", "Analysis uses severity × frequency, not opinion", "Every issue has an actionable recommendation", "Positive findings documented, not just problems"] },
    ],
    handoff: {
      direction: "Validate → Deliver",
      nextPhase: "Design Delivery",
      description: "Close Usability Testing by generating a handoff block. Paste it when opening Design Delivery — Claude writes specs and handoff docs grounded in what was actually tested and validated, not just what was designed.",
      blocks: [
        {
          title: "Usability Testing Handoff",
          subtitle: "Test findings, validated assumptions, and metrics baseline",
          from: "Usability Testing", to: "Deliver",
          carries: "Overall verdict (pass/conditional/fail), what worked and should be kept, issues ranked by priority with recommended fixes, which assumptions from Ideate were validated or invalidated, remaining open questions for engineering, and the metrics baseline for post-launch measurement.",
          fields: ["Carried forward from Prototype", "Test method + participants", "Overall verdict (pass/fail)", "What worked (keep in delivery)", "Issues to fix before delivery (ranked)", "Design changes made post-testing", "Validated / invalidated assumptions", "Remaining open questions", "Accessibility findings", "Metrics baseline (completion rate, time on task, SUS)"],
        },
      ],
    },
    figmaActions: [
      { action: "Task Completion Matrix", desc: "Table showing pass/fail/assist per task per participant with completion rates", example: "\"Create a task completion matrix with these 5 tasks and 6 participants\"" },
      { action: "Issue Cards", desc: "Severity-ranked cards with title, frequency, evidence quote, and recommendation", example: "\"Build issue cards for these 8 usability findings ranked by severity\"" },
      { action: "Heuristic Evaluation Board", desc: "10-row board (one per Nielsen heuristic) with ratings, evidence, and fixes", example: "\"Create a heuristic evaluation board for the checkout flow\"" },
    ],
  },
  {
    id: "deliver",
    number: "06",
    name: "Deliver",
    subtitle: "Ship with precision",
    color: "#E8F0F0",
    accent: "#1A5C5C",
    skills: [
      { name: "Design Documentation", level: "core", ai: "high" },
      { name: "Developer Handoff", level: "core", ai: "high" },
      { name: "Design QA", level: "core", ai: "medium" },
      { name: "Component Specification", level: "core", ai: "high" },
      { name: "Design Systems", level: "supporting", ai: "high" },
    ],
    prompts: [
      {
        title: "Component Spec Writer",
        prompt: `Write a complete component specification for:\n\nComponent: [NAME]\nPurpose: [WHAT IT DOES]\nContext: [WHERE IT'S USED]\n\nDocument:\n- Props/API (name, type, default, description)\n- Visual states (default, hover, active, disabled, focus, error, loading)\n- Responsive behavior (breakpoints and layout changes)\n- Accessibility requirements (ARIA, keyboard, screen reader)\n- Content guidelines (character limits, truncation rules)\n- Edge cases and constraints\n- Usage examples (do's and don'ts)\n\nWrite this so a developer can build it without asking questions.`,
        when: "Preparing specs for engineering handoff",
        output: "Complete component specification",
      },
      {
        title: "Release Notes & Changelog",
        prompt: `Write user-facing release notes for these design changes:\n\n[LIST CHANGES]\n\nCreate two versions:\n1. Internal changelog (detailed, for team reference)\n2. User-facing release notes (friendly, benefit-focused)\n\nFor each change: categorize as New / Improved / Fixed, describe what changed and why, and note any user action needed.`,
        when: "When shipping updates",
        output: "Release notes (internal + external)",
      },
      {
        title: "Design Decision Record",
        prompt: `Document this design decision:\n\nDecision: [WHAT WAS DECIDED]\nContext: [WHAT PROMPTED THIS]\nOptions considered: [LIST ALTERNATIVES]\n\nCreate a design decision record (DDR) with:\n- Status: Accepted\n- Context and problem statement\n- Options evaluated (with pros/cons of each)\n- Decision and rationale\n- Consequences (tradeoffs accepted)\n- Related decisions or dependencies\n\nThis should be clear enough that someone reading it in 6 months understands WHY this choice was made.`,
        when: "After any significant design decision",
        output: "Design decision record",
      },
    ],
    templates: [
      {
        name: "Handoff Checklist",
        fields: ["Specs Complete", "Assets Exported", "Redlines Done", "Edge Cases Documented", "A11y Annotated", "Dev Review"],
      },
      {
        name: "Design Decision Record",
        fields: ["Decision", "Context", "Options", "Rationale", "Tradeoffs", "Date"],
      },
    ],
    aiTools: ["Claude — Specs, docs & code generation", "Figma Dev Mode — Automated handoff", "Storybook — Component documentation", "Zeroheight — Design system docs"],
    skillDocs: [
      { name: "design-delivery", file: "06-deliver/design-delivery.md", title: "Design Delivery & Documentation",
        summary: "Ship designs with platform-specific precision — component specs, iOS/Android/Web handoff packages, DDRs, and release notes.",
        workflow: ["Write component specs (props, all states, responsive, a11y, content guidelines)", "Prepare platform-specific handoff: Web (breakpoints, performance, CSS arch), iOS (safe areas, Dynamic Type, VoiceOver), Android (WindowInsets, TalkBack, Material state layers)", "Document design decisions as DDRs with rationale", "Write release notes (internal changelog + user-facing)"],
        outputs: ["Component Specs", "Web Handoff Package", "iOS Handoff Package", "Android Handoff Package", "Design Decision Records", "Release Notes"],
        checklist: ["Specs complete enough for devs to build without questions", "Platform-specific rules addressed (iOS / Android / Web)", "All assets exported and organized", "Token names used throughout — no raw values", "Accessibility package included (tab order, aria, alt text, platform labels)", "Acceptance criteria defined for eng review"] },
    ],
    handoff: {
      direction: "Deliver → Archive / v2",
      nextPhase: "v2 Planning",
      description: "Design Delivery closes the chain. Generate the Retrospective Block to archive the full project — the discovery insight, problem statement, concept, and key decisions — all in one block. Paste it to re-enter this project at any point, or hand it to a new designer.",
      blocks: [
        {
          title: "Retrospective Block",
          subtitle: "Full project memory — archive, v2 brief, or collaborator onboarding",
          from: "Deliver", to: "Archive / v2",
          carries: "The complete project chain in one block: the discovery insight that drove everything, the problem statement, the winning concept, the test finding that shaped delivery, all significant design decisions with rationale, what was deliberately left out, technical/design debt flagged, post-launch metrics to watch, and a ready-made v2 re-entry prompt.",
          fields: ["Features built + shipped", "Figma + design system links", "Discovery insight that drove everything", "Problem statement", "Concept chosen + why", "Key test finding that shaped delivery", "Design decisions + DDR references", "What was left out (and why)", "Technical / design debt flagged", "Post-launch metrics to watch", "v2 / next sprint backlog", "Re-entry prompt for future work"],
        },
      ],
    },
    figmaActions: [
      { action: "Spec Annotations", desc: "Annotation cards connected to design elements with token references (spacing, color, type, radius)", example: "\"Annotate the card component with spacing and color specs\"" },
      { action: "Component Documentation", desc: "Doc frames with variants grid, props table, states row, usage guidelines, and a11y notes", example: "\"Create documentation frames for the Button and Input components\"" },
      { action: "Design Decision Records", desc: "Structured DDR cards with status badge, options with pros/cons, rationale, and consequences", example: "\"Document the navigation decision as a DDR on the Deliver page\"" },
    ],
  },
];

const AI_LEVERAGE = {
  high: { label: "High AI leverage", color: "#2D5A27", bg: "#E8F0E8" },
  medium: { label: "Medium AI leverage", color: "#8B5E00", bg: "#FFF3E0" },
  low: { label: "Low — your judgment", color: "#8C1A1A", bg: "#FDE8E8" },
};

export default function DesignProcessSystem() {
  const [activePhase, setActivePhase] = useState(null);
  const [activeTab, setActiveTab] = useState("prompts");
  const [expandedPrompt, setExpandedPrompt] = useState(null);
  const [copiedPrompt, setCopiedPrompt] = useState(null);
  const [kickoffOpen, setKickoffOpen] = useState(false);
  const [kickoffCopied, setKickoffCopied] = useState(false);

  const KICKOFF_PROMPT = `You are a UX design assistant trained on the Agentic Product Design Framework —
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

  const phase = activePhase ? PHASES.find((p) => p.id === activePhase) : null;

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#FAFAF8", minHeight: "100vh", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ padding: "48px 32px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#999", fontWeight: 400 }}>Living System</span>
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, fontWeight: 400, margin: "0 0 12px", lineHeight: 1.1, color: "#111" }}>
          Agentic Design Process
        </h1>
        <p style={{ fontSize: 16, color: "#666", maxWidth: 600, lineHeight: 1.6, margin: 0 }}>
          A scalable framework for integrating AI into every phase of product design — from research through delivery. Built to grow with your practice.
        </p>
      </div>

      {/* Process Map */}
      <div style={{ padding: "0 32px 16px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => { setActivePhase(activePhase === p.id ? null : p.id); setActiveTab("prompts"); setExpandedPrompt(null); }}
              style={{
                background: activePhase === p.id ? p.accent : p.color,
                color: activePhase === p.id ? "#fff" : p.accent,
                border: "none",
                borderRadius: 12,
                padding: "20px 16px",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.25s ease",
                transform: activePhase === p.id ? "translateY(-2px)" : "none",
                boxShadow: activePhase === p.id ? `0 8px 24px ${p.accent}33` : "none",
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, opacity: 0.6, marginBottom: 6 }}>{p.number}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.3 }}>{p.subtitle}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Phase Detail */}
      {phase && (
        <div style={{ padding: "16px 32px 48px", maxWidth: 1100, margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>

          {/* Skills Bar */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 24, marginBottom: 16, border: "1px solid #eee" }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 16 }}>Skills Matrix</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {phase.skills.map((s) => (
                <div key={s.name} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "8px 14px", borderRadius: 8,
                  background: AI_LEVERAGE[s.ai].bg,
                  border: `1px solid ${AI_LEVERAGE[s.ai].color}22`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{s.name}</span>
                  <span style={{
                    fontSize: 9, fontFamily: "'JetBrains Mono', monospace",
                    color: AI_LEVERAGE[s.ai].color, fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: 1,
                  }}>{s.ai}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
              {Object.entries(AI_LEVERAGE).map(([key, val]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: val.color }} />
                  <span style={{ fontSize: 11, color: "#888" }}>{val.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
            {[
              { id: "prompts", label: "AI Prompts & Workflows", count: phase.prompts.length },
              { id: "skills", label: "Skill Docs", count: phase.skillDocs ? phase.skillDocs.length : 0 },
              { id: "handoff", label: "Phase Handoff", count: phase.handoff ? phase.handoff.blocks.length : 0 },
              { id: "figma", label: "Figma Playbook", count: phase.figmaActions ? phase.figmaActions.length : 0 },
              { id: "templates", label: "Templates", count: phase.templates.length },
              { id: "tools", label: "Recommended Tools", count: phase.aiTools.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? phase.accent : "transparent",
                  color: activeTab === tab.id ? "#fff" : "#666",
                  border: activeTab === tab.id ? "none" : "1px solid #ddd",
                  borderRadius: 8,
                  padding: "10px 16px",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 500,
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                {tab.label}
                <span style={{
                  background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "#eee",
                  borderRadius: 10, padding: "2px 7px", fontSize: 11,
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Prompts Tab */}
          {activeTab === "prompts" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {phase.prompts.map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                  <button
                    onClick={() => setExpandedPrompt(expandedPrompt === i ? null : i)}
                    style={{
                      width: "100%", background: "none", border: "none", cursor: "pointer",
                      padding: "20px 24px", textAlign: "left",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 12, color: "#888" }}>{p.when}</div>
                    </div>
                    <div style={{
                      width: 28, height: 28, borderRadius: 14, background: phase.color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transform: expandedPrompt === i ? "rotate(180deg)" : "none",
                      transition: "transform 0.2s ease", fontSize: 14, color: phase.accent,
                    }}>▾</div>
                  </button>
                  {expandedPrompt === i && (
                    <div style={{ padding: "0 24px 20px" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: phase.color, color: phase.accent, padding: "4px 10px", borderRadius: 6, fontWeight: 500 }}>
                          Output → {p.output}
                        </span>
                      </div>
                      <pre style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5,
                        background: "#1a1a1a", color: "#e0e0e0", padding: 20, borderRadius: 12,
                        whiteSpace: "pre-wrap", lineHeight: 1.7, margin: "0 0 12px",
                        border: "1px solid #333", overflowX: "auto",
                      }}>
                        {p.prompt}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(p.prompt, `${phase.id}-${i}`)}
                        style={{
                          background: copiedPrompt === `${phase.id}-${i}` ? "#2D5A27" : phase.accent,
                          color: "#fff", border: "none", borderRadius: 8,
                          padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 500,
                          transition: "background 0.2s",
                        }}
                      >
                        {copiedPrompt === `${phase.id}-${i}` ? "✓ Copied to clipboard" : "Copy prompt"}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Skills Docs Tab */}
          {activeTab === "skills" && phase.skillDocs && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {phase.skillDocs.map((skill, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                  <div style={{ padding: "24px 24px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{skill.title}</div>
                        <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{skill.summary}</div>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: phase.color, color: phase.accent, padding: "4px 10px", borderRadius: 6, fontWeight: 500, whiteSpace: "nowrap" }}>
                        {skill.file}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Workflow</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {skill.workflow.map((step, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{
                            width: 22, height: 22, borderRadius: 11, background: phase.color,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 10, fontWeight: 700, color: phase.accent, flexShrink: 0, marginTop: 1,
                          }}>{j + 1}</div>
                          <div style={{ fontSize: 13, color: "#444", lineHeight: 1.5 }}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "0 24px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div style={{ background: "#FAFAF8", borderRadius: 10, padding: 16, border: "1px solid #eee" }}>
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Key Outputs</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {skill.outputs.map((out, j) => (
                          <span key={j} style={{
                            fontSize: 12, padding: "5px 12px", borderRadius: 20,
                            background: phase.color, color: phase.accent, fontWeight: 500,
                          }}>{out}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ background: "#FAFAF8", borderRadius: 10, padding: 16, border: "1px solid #eee" }}>
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Quality Checklist</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {skill.checklist.map((item, j) => (
                          <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#555", lineHeight: 1.4 }}>
                            <span style={{ color: phase.accent, flexShrink: 0 }}>☐</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "12px 24px", background: "#FAFAF8", borderTop: "1px solid #eee" }}>
                    <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'JetBrains Mono', monospace" }}>
                      Full skill → skills/{skill.file}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phase Handoff Tab */}
          {activeTab === "handoff" && phase.handoff && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Intro banner */}
              <div style={{ background: phase.color, borderRadius: 12, padding: "16px 20px", borderLeft: `4px solid ${phase.accent}` }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: phase.accent, marginBottom: 4 }}>
                  {phase.handoff.direction}
                </div>
                <div style={{ fontSize: 12, color: phase.accent, opacity: 0.75, lineHeight: 1.5 }}>
                  {phase.handoff.description}
                </div>
              </div>

              {/* How to use */}
              <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #eee" }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 12 }}>How to Use</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 6 }}>Close this phase</div>
                    <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                      <code style={{ fontSize: 12, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace" }}>
                        "Generate the Phase Handoff Block for this session."
                      </code>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 6 }}>Open the next phase</div>
                    <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "10px 14px" }}>
                      <code style={{ fontSize: 12, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace" }}>
                        "Starting {phase.handoff.nextPhase}. Here's the handoff: [paste block]"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Handoff blocks */}
              {phase.handoff.blocks.map((block, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                  <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid #f4f4f2" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{block.title}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{block.subtitle}</div>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: phase.color, color: phase.accent, padding: "4px 10px", borderRadius: 6, fontWeight: 500, whiteSpace: "nowrap" }}>
                        {block.from} → {block.to}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 10 }}>Key Fields</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {block.fields.map((field, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: "#FAFAF8", borderRadius: 8, border: "1px solid #eee" }}>
                          <span style={{ color: phase.accent, fontSize: 12, flexShrink: 0, marginTop: 1 }}>→</span>
                          <span style={{ fontSize: 12, color: "#555", lineHeight: 1.4 }}>{field}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding: "0 24px 16px" }}>
                    <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 8 }}>What it carries forward</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6, background: phase.color + "66", borderRadius: 8, padding: "10px 14px" }}>
                      {block.carries}
                    </div>
                  </div>
                </div>
              ))}

              {/* Skill file reference */}
              <div style={{ padding: "12px 16px", background: "#FAFAF8", borderRadius: 8, border: "1px solid #eee" }}>
                <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'JetBrains Mono', monospace" }}>
                  Full handoff templates → skills/phase-handoff.md and each phase skill file
                </span>
              </div>
            </div>
          )}

          {/* Figma Playbook Tab */}
          {activeTab === "figma" && phase.figmaActions && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ background: "#FFF3E0", borderRadius: 12, padding: "14px 20px", borderLeft: "3px solid #E85D04", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: "#9A5400" }}>
                  <strong>Figma MCP</strong> — Claude executes these actions directly in your Figma file. Describe what you need and which page to target.
                </span>
              </div>
              {phase.figmaActions.map((fa, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: "#E85D04", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>F</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{fa.action}</div>
                    </div>
                    <div style={{ fontSize: 13, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>{fa.desc}</div>
                    <div style={{ background: "#1a1a1a", borderRadius: 8, padding: "12px 16px" }}>
                      <div style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: "#E85D04", marginBottom: 6 }}>EXAMPLE PROMPT</div>
                      <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#e0e0e0", lineHeight: 1.5 }}>{fa.example}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ background: "#FAFAF8", borderRadius: 12, padding: "14px 20px", border: "1px solid #eee" }}>
                <span style={{ fontSize: 11, color: "#aaa", fontFamily: "'JetBrains Mono', monospace" }}>
                  Full playbook → skills/figma-playbook.md
                </span>
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === "templates" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 12 }}>
              {phase.templates.map((t, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #eee" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{t.name}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {t.fields.map((f, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 14px", background: "#FAFAF8", borderRadius: 8,
                        border: "1px solid #eee",
                      }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, background: phase.accent, opacity: 0.4 }} />
                        <span style={{ fontSize: 13 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: 16, fontSize: 11, color: "#999", fontFamily: "'JetBrains Mono', monospace" }}>
                    {t.fields.length} fields — expand as needed
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === "tools" && (
            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #eee" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {phase.aiTools.map((tool, i) => {
                  const [name, desc] = tool.split(" — ");
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 18px", background: i % 2 === 0 ? phase.color + "66" : "transparent",
                      borderRadius: 10,
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 8, background: phase.accent,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0,
                      }}>{name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{name}</div>
                        <div style={{ fontSize: 12, color: "#888" }}>{desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom guidance */}
      {!activePhase && (
        <div style={{ padding: "32px 32px 48px", maxWidth: 1100, margin: "0 auto" }}>

          {/* START HERE — Kickoff Prompt */}
          <div style={{ marginBottom: 16, background: "#0F172A", borderRadius: 16, border: "1px solid #334155", overflow: "hidden" }}>
            <button
              onClick={() => setKickoffOpen(!kickoffOpen)}
              style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ background: "#14B8A6", borderRadius: 6, padding: "3px 10px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: "#0F172A", letterSpacing: 2, textTransform: "uppercase" }}>Start Here</span>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#F8FAFC" }}>Kickoff Prompt</div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>New to the framework? Paste this into Claude before uploading any skill file.</div>
                </div>
              </div>
              <span style={{ fontSize: 18, color: "#334155", transform: kickoffOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>↓</span>
            </button>

            {kickoffOpen && (
              <div style={{ borderTop: "1px solid #1E293B", padding: "0 28px 24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
                  {/* Left: what it does */}
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Four questions Claude will ask</div>
                    {[
                      { n: "01", q: "What type of project is this?", hint: "New product, feature, redesign, internal tool, client work" },
                      { n: "02", q: "What phase are you entering?", hint: "Discover / Define / Ideate / Prototype / Validate / Deliver — or \"not sure\"" },
                      { n: "03", q: "What do you have so far?", hint: "Nothing yet / a brief / brief + research / existing designs" },
                      { n: "04", q: "Are you working solo or with a team?", hint: "" },
                    ].map(({ n, q, hint }) => (
                      <div key={n} style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#334155", marginTop: 2, flexShrink: 0 }}>{n}</span>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#F8FAFC", lineHeight: 1.4 }}>{q}</div>
                            {hint && <div style={{ fontSize: 11, color: "#64748B", marginTop: 3, lineHeight: 1.4 }}>{hint}</div>}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #1E293B" }}>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Claude responds with</div>
                      {["Recommended starting phase + reason why", "The exact skill file to upload next", "A specific first deliverable", "One prompt you can use right now"].map((r) => (
                        <div key={r} style={{ fontSize: 12, color: "#94A3B8", marginBottom: 6, display: "flex", gap: 8 }}>
                          <span style={{ color: "#14B8A6", flexShrink: 0 }}>→</span>{r}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: prompt code block */}
                  <div style={{ background: "#1E293B", borderRadius: 10, border: "1px solid #334155", padding: "18px 20px", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#14B8A6", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Copy &amp; paste into Claude</div>
                    <pre style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#94A3B8", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, flex: 1, overflowY: "auto", maxHeight: 320 }}>{KICKOFF_PROMPT}</pre>
                    <button
                      onClick={() => { navigator.clipboard.writeText(KICKOFF_PROMPT); setKickoffCopied(true); setTimeout(() => setKickoffCopied(false), 2000); }}
                      style={{ marginTop: 14, background: kickoffCopied ? "#0D9488" : "#14B8A6", color: "#0F172A", border: "none", borderRadius: 7, padding: "9px 0", fontWeight: 700, fontSize: 12, cursor: "pointer", width: "100%", transition: "background 0.2s" }}
                    >
                      {kickoffCopied ? "✓ Copied to clipboard" : "Copy Kickoff Prompt"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How to Use */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #eee", marginBottom: 0 }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#999", marginBottom: 16 }}>How to Use This System</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
              {[
                { num: "01", title: "Select a phase", desc: "Click any phase above to reveal its AI prompts, skills matrix, templates, and tool recommendations." },
                { num: "02", title: "Copy & customize prompts", desc: "Each prompt has placeholders in [BRACKETS]. Replace them with your project specifics and paste into Claude or your AI tool." },
                { num: "03", title: "Use templates as scaffolding", desc: "Templates show the essential fields. Expand them for your project's needs — they're starting points, not rigid forms." },
                { num: "04", title: "Scale over time", desc: "Add your own prompts that work. Remove what doesn't. This system grows with your practice and your projects." },
              ].map((item) => (
                <div key={item.num}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#ccc", marginBottom: 6 }}>{item.num}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Onboarding Guide */}
          <div style={{ marginTop: 16, background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #eee", borderLeft: "4px solid #0D9488", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#0D9488", marginBottom: 6 }}>Onboarding Guide</div>
              <div style={{ fontSize: 14, color: "#333", fontWeight: 600, marginBottom: 4 }}>New to the framework? Start here.</div>
              <div style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>A 21-slide deck covering the Agentic design philosophy, 6-phase framework, skill chaining, Figma setup, Claude integration, and per-phase prompt examples. Share with your team or use to onboard new collaborators.</div>
            </div>
            <a href="https://github.com/quinrobinson/Agentic-Product-Design-Framework/raw/main/artifacts/onboarding-deck.pptx"
              style={{ background: "#0D9488", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, marginLeft: 24 }}>
              Download PPTX
            </a>
          </div>

          {/* AI Philosophy */}
          <div style={{ marginTop: 16, background: "#1a1a1a", borderRadius: 16, padding: 32, color: "#e0e0e0" }}>
            <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#666", marginBottom: 16 }}>The AI × Design Philosophy</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 12, color: "#fff" }}>AI amplifies throughput.</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#999", margin: 0 }}>
                  Research that took days can be synthesized in minutes. Prototypes that needed a week can ship in hours. Documentation that was always skipped now gets written. AI removes the friction from the labor-intensive parts of design.
                </p>
              </div>
              <div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, marginBottom: 12, color: "#fff" }}>You provide judgment.</div>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: "#999", margin: 0 }}>
                  Taste, empathy, strategic thinking, stakeholder navigation, ethical consideration — these remain fundamentally human skills. AI generates options. You make decisions. The best designers will be those who wield AI as a power tool, not a replacement.
                </p>
              </div>
            </div>
          </div>

          {/* Skill Chaining */}
          <div style={{ marginTop: 16, background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #eee", borderTop: "3px solid #6366F1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#6366F1", marginBottom: 8 }}>Skill Chaining — Phase Handoff System</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#111", marginBottom: 6 }}>One continuous thread, not six separate conversations</div>
                <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5, maxWidth: 520 }}>
                  Each phase closes with a handoff block Claude generates from the session. Paste it as the first message of the next phase — Claude picks up with full context.
                </p>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "#EEF2FF", color: "#6366F1", padding: "6px 12px", borderRadius: 6, fontWeight: 500, whiteSpace: "nowrap" }}>
                skills/phase-handoff.md
              </span>
            </div>

            {/* Chain diagram */}
            <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
              {[
                { n: "01", name: "Discover", color: "#E8F0E8", accent: "#2D5A27", out: "Themes · Pain points · Opportunities" },
                { n: "02", name: "Define", color: "#E8E4F0", accent: "#4A3166", out: "Problem statement · Constraints · Scope" },
                { n: "03", name: "Ideate", color: "#FFF3E0", accent: "#8B5E00", out: "Selected concept · Visual tokens" },
                { n: "04", name: "Prototype", color: "#E3F2FD", accent: "#1A4B8C", out: "Prototype link · Hypotheses · Tasks" },
                { n: "05", name: "Validate", color: "#FDE8E8", accent: "#8C1A1A", out: "Findings · Validated assumptions · Metrics" },
                { n: "06", name: "Deliver", color: "#E8F0F0", accent: "#1A5C5C", out: "Retrospective · v2 backlog · Re-entry prompt" },
              ].map((p, i) => (
                <div key={p.n} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ background: p.color, borderRadius: 12, padding: "14px 16px", minWidth: 120 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: p.accent, opacity: 0.6, marginBottom: 4 }}>{p.n}</div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: p.accent, marginBottom: 6 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: p.accent, opacity: 0.7, lineHeight: 1.4 }}>{p.out}</div>
                  </div>
                  {i < 5 && (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 6px" }}>
                      <div style={{ fontSize: 16, color: "#6366F1" }}>→</div>
                      <div style={{ fontSize: 9, color: "#aaa", fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>handoff</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* How to use */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[
                { step: "01", title: "Close a phase", cmd: '"Generate the Phase Handoff Block for this session."', desc: "Ask Claude at the end of any phase session" },
                { step: "02", title: "Open the next phase", cmd: '"Starting [phase]. Here\'s the handoff: [paste block]"', desc: "First message in your next conversation" },
                { step: "03", title: "Re-enter mid-project", cmd: '"Here are all handoffs so far: [...]. We\'re in [phase]."', desc: "Paste the full chain to restore complete context" },
              ].map((item) => (
                <div key={item.step} style={{ padding: 16, borderRadius: 10, background: "#FAFAF8", border: "1px solid #eee" }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#6366F1", marginBottom: 6 }}>{item.step}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 8 }}>{item.title}</div>
                  <div style={{ background: "#1a1a1a", borderRadius: 6, padding: "8px 10px", marginBottom: 8 }}>
                    <code style={{ fontSize: 11, color: "#e0e0e0", fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.5 }}>{item.cmd}</code>
                  </div>
                  <div style={{ fontSize: 11, color: "#999", lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#EEF2FF", borderRadius: 8, borderLeft: "3px solid #6366F1" }}>
              <span style={{ fontSize: 12, color: "#4338CA" }}>
                <strong>Each phase has a "Phase Handoff" tab</strong> — click any phase above, then open that tab to see the block fields and copy the exact prompts.
              </span>
            </div>
          </div>

          {/* Figma Playbook */}
          <div style={{ marginTop: 16, background: "#fff", borderRadius: 16, padding: 32, border: "1px solid #eee", borderTop: "3px solid #E85D04" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase", letterSpacing: 2, color: "#E85D04", marginBottom: 8 }}>Figma Playbook — MCP Integration</div>
                <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: "#111", marginBottom: 6 }}>Claude builds directly in Figma</div>
                <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.5 }}>
                  The Figma Playbook is a companion skill that works alongside every phase. Phase skills define <em>what</em> to create. The playbook defines <em>how</em> to execute it in Figma via MCP.
                </p>
              </div>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "#FFF3E0", color: "#E85D04", padding: "6px 12px", borderRadius: 6, fontWeight: 500, whiteSpace: "nowrap" }}>
                figma-playbook.md
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {[
                { phase: "Discover", color: "#22C55E", actions: ["Research findings boards", "Persona cards", "Competitive matrices"] },
                { phase: "Define", color: "#8B5CF6", actions: ["Journey maps with emotion curves", "Design briefs", "Requirements boards"] },
                { phase: "Ideate", color: "#F59E0B", actions: ["Concept cards (5 directions)", "Wireframe scaffolding", "Pattern reference boards"] },
                { phase: "Prototype", color: "#3B82F6", actions: ["Components with variants", "Screen layouts (all states)", "Design system variables"] },
                { phase: "Validate", color: "#EF4444", actions: ["Task completion matrices", "Severity-ranked issue cards", "Heuristic eval boards"] },
                { phase: "Deliver", color: "#14B8A6", actions: ["Spec annotations + redlines", "Component doc frames", "Decision record cards"] },
              ].map((p) => (
                <div key={p.phase} style={{ padding: 16, borderRadius: 10, background: "#FAFAF8", border: "1px solid #eee", borderTop: `3px solid ${p.color}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: p.color, marginBottom: 10 }}>{p.phase}</div>
                  {p.actions.map((a, i) => (
                    <div key={i} style={{ fontSize: 12, color: "#666", marginBottom: 4, display: "flex", gap: 6 }}>
                      <span style={{ color: p.color }}>→</span> {a}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "12px 16px", background: "#FFF3E0", borderRadius: 8, borderLeft: "3px solid #E85D04" }}>
              <span style={{ fontSize: 12, color: "#9A5400" }}>
                <strong>How to use:</strong> Tell Claude what to create and which Figma page to target. Claude reads the phase skill + playbook together and executes directly in your file.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
