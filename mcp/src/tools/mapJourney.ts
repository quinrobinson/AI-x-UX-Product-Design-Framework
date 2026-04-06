export const mapJourney = {
  schema: {
    name: "map_journey",
    description:
      "Generate a structured journey map with stages, actions, thoughts, emotions, and opportunities for a specific user and goal.",
    inputSchema: {
      type: "object",
      properties: {
        persona: {
          type: "string",
          description: "The user persona — who they are, their context and goals",
        },
        goal: {
          type: "string",
          description: "The primary goal the user is trying to accomplish",
        },
        trigger: {
          type: "string",
          description: "What event or situation initiates this journey",
        },
        research_data: {
          type: "string",
          description:
            "Research findings, quotes, or observations to ground the journey in evidence",
        },
      },
      required: ["persona", "goal"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      persona,
      goal,
      trigger = "not specified",
      research_data = "none provided",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior UX researcher designing a journey map. Stage names should be specific to this user and scenario — not generic labels like "Awareness" or "Purchase." Ground every element in the research data provided.

## Input
- **Persona:** ${persona}
- **Goal:** ${goal}
- **Trigger:** ${trigger}

## Research Data
${research_data}

---

Generate a journey map with 5–7 stages. For each stage provide:

- **Stage name** — specific to this user's experience (not generic)
- **Actions** — what the user is literally doing
- **Thoughts** — what they're thinking, their mental model
- **Emotions** — emotional state on a scale (frustrated → neutral → delighted), with specific feeling words
- **Pain points** — specific friction points or failure moments
- **Opportunities** — design interventions that could improve this stage

After the stage-by-stage breakdown, include:
- **Peak/valley moments** — the highest emotional high and lowest low in the journey
- **Moments of truth** — the 2–3 moments where the user's trust and satisfaction are most at risk
- **Priority opportunities** — ranked list of the top 3 design interventions by impact

Format the output as a structured table or clear sections. Be specific — no generic journey map clichés.`,
        },
      ],
    };
  },
};
