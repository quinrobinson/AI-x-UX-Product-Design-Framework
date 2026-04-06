export const generateConcepts = {
  schema: {
    name: "generate_concepts",
    description:
      "Generate genuinely distinct design concepts for a problem statement. Each concept should produce a different wireframe — not variations on the same idea.",
    inputSchema: {
      type: "object",
      properties: {
        problem_statement: {
          type: "string",
          description:
            "The problem framing or HMW question to generate concepts for",
        },
        persona: {
          type: "string",
          description: "The primary user this solution is for",
        },
        hmw_questions: {
          type: "string",
          description:
            "How Might We questions to explore (comma-separated or one per line)",
        },
        constraints: {
          type: "string",
          description:
            "Technical, business, or design constraints to work within",
        },
      },
      required: ["problem_statement", "persona"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      problem_statement,
      persona,
      hmw_questions = "not specified",
      constraints = "none specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior product designer running an ideation session. Generate concepts that are genuinely distinct from each other — not variations of the same idea. No two concepts should produce the same wireframe. Be specific and concrete.

## Input
- **Problem statement:** ${problem_statement}
- **Persona:** ${persona}
- **HMW questions:** ${hmw_questions}
- **Constraints:** ${constraints}

---

Generate 5 distinct design concepts. For each concept provide:

1. **Concept name** — a memorable, specific name (not "Option A")
2. **Core idea** — 1–2 sentences explaining the central design bet this concept makes
3. **How it works** — a concrete description of the user experience (what does the user see, tap, do?)
4. **Key screens / entry points** — what are the 2–3 main UI moments?
5. **Design bet** — what assumption is this concept testing?
6. **Risk** — what's most likely to fail or confuse users?

After the 5 concepts, include:
- **Concept matrix** — quick comparison across: novelty, feasibility, user effort, business alignment
- **Recommended starting point** — which concept to prototype first and why

Make each concept take a genuinely different approach to the problem. Push beyond the obvious first idea.`,
        },
      ],
    };
  },
};
