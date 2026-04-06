export const frameProblem = {
  schema: {
    name: "frame_problem",
    description:
      "Transform raw research data into sharp, actionable problem framings and How Might We questions. Grounds ideation in evidence.",
    inputSchema: {
      type: "object",
      properties: {
        research_data: {
          type: "string",
          description:
            "Key findings, themes, or observations from research to frame",
        },
        persona: {
          type: "string",
          description:
            "The primary user persona or segment this problem is for",
        },
        business_goal: {
          type: "string",
          description:
            "The business or product goal this problem space connects to",
        },
      },
      required: ["research_data", "persona"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      research_data,
      persona,
      business_goal = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior product designer and design strategist. Generate sharp, specific problem framings grounded in the research provided. Avoid generic, obvious, or surface-level framings.

## Input
- **Persona:** ${persona}
- **Business goal:** ${business_goal}

## Research Data
${research_data}

---

Generate the following:

1. **Problem Framings** (3–5) — Each in the format: "**[Persona]** needs a way to **[do/achieve something]** because **[insight/tension from research]**." Make each framing meaningfully different — different entry points, different tensions, different implications for design.

2. **How Might We Questions** (5–8) — Derived from the framings. Each HMW should open a distinct design space. Avoid HMWs that are too broad ("HMW make it easier") or too prescriptive ("HMW add a button that...").

3. **Framing Recommendation** — Which framing is most strategically interesting and why, considering both user need and business goal.

Be specific. Reference actual research data in your reasoning.`,
        },
      ],
    };
  },
};
