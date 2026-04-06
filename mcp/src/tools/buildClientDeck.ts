export const buildClientDeck = {
  schema: {
    name: "build_client_deck",
    description:
      "Build a structured outline and talking points for a client presentation deck — project narrative, key decisions, findings, and recommended next steps.",
    inputSchema: {
      type: "object",
      properties: {
        project_name: {
          type: "string",
          description: "Project or client name",
        },
        deck_goal: {
          type: "string",
          description:
            "What this deck needs to accomplish (e.g., 'get sign-off on direction B', 'share research findings', 'present design system proposal')",
        },
        audience: {
          type: "string",
          description:
            "Who will be in the room — roles, decision-making authority, familiarity with the work",
        },
        phases_completed: {
          type: "string",
          description:
            "Design phases or milestones completed to date (e.g., 'discovery, synthesis, concept generation, prototype round 1')",
        },
        tone: {
          type: "string",
          description:
            "Presentation tone: formal/executive, collaborative/workshop, casual/update",
        },
        key_decisions: {
          type: "string",
          description: "Key design decisions made and their rationale",
        },
        key_findings: {
          type: "string",
          description: "Key research or testing findings to present",
        },
        desired_outcome: {
          type: "string",
          description:
            "What you want the client to do or decide after seeing this deck",
        },
        additional_context: {
          type: "string",
          description:
            "Any constraints, politics, sensitivities, or context the presenter should know",
        },
      },
      required: ["project_name", "deck_goal", "desired_outcome"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      project_name,
      deck_goal,
      audience = "not specified",
      phases_completed = "not specified",
      tone = "professional",
      key_decisions = "not specified",
      key_findings = "not specified",
      desired_outcome,
      additional_context = "none",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are an expert design strategist helping a UX designer build a client presentation deck. The deck should tell a clear story, build toward the desired outcome, and give the presenter confidence in every room.

## Input
- **Project:** ${project_name}
- **Deck goal:** ${deck_goal}
- **Audience:** ${audience}
- **Tone:** ${tone}
- **Phases completed:** ${phases_completed}
- **Desired outcome:** ${desired_outcome}
- **Additional context:** ${additional_context}

## Key Decisions
${key_decisions}

## Key Findings
${key_findings}

---

Generate:

### Deck Strategy
- The core narrative arc (what story does this deck tell?)
- The emotional journey you want the audience on (from opening to close)
- How to frame the desired outcome so it feels like the obvious conclusion

### Slide Outline
For each slide:

**Slide [N]: [Title]**
- **Purpose:** What this slide needs to do
- **Content:** Key points or data to include
- **Talking points:** What to say (not read verbatim)
- **Watch out for:** Likely questions or pushback on this slide

### Opening (First 2 minutes)
Word-for-word suggested opening that establishes context and primes the audience for the desired outcome.

### The Ask / Close
How to frame the desired outcome: "${desired_outcome}"
- Specific language to use
- How to handle "we need more time to decide"
- What a yes looks like vs. a no

### Anticipated Questions
| Question | How to answer | What NOT to say |

### Presenter Notes
Context-specific tips given the audience and sensitivities noted.

Be practical. This is a working document for a real presentation, not a generic deck template.`,
        },
      ],
    };
  },
};
