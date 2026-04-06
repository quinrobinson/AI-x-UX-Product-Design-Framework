export const mapUserFlow = {
  schema: {
    name: "map_user_flow",
    description:
      "Map a detailed user flow from entry point to goal, including decision points, error states, and edge cases.",
    inputSchema: {
      type: "object",
      properties: {
        entry_point: {
          type: "string",
          description:
            "Where the user starts — the trigger or entry point for this flow",
        },
        goal: {
          type: "string",
          description: "What the user is trying to accomplish",
        },
        persona: {
          type: "string",
          description: "The user persona completing this flow",
        },
        constraints: {
          type: "string",
          description:
            "Technical, business, or platform constraints on the flow",
        },
        prototype_question: {
          type: "string",
          description:
            "The key design question this flow needs to answer or test",
        },
      },
      required: ["entry_point", "goal"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      entry_point,
      goal,
      persona = "not specified",
      constraints = "none specified",
      prototype_question = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a UX designer mapping user flows. Be systematic and specific — every step, decision, and error state matters.

## Input
- **Entry point:** ${entry_point}
- **Goal:** ${goal}
- **Persona:** ${persona}
- **Constraints:** ${constraints}
- **Prototype question:** ${prototype_question}

---

Generate a detailed user flow including:

### Happy Path
Step-by-step sequence from entry to goal. For each step:
- **Screen/state name**
- **User action**
- **System response**
- **What the user sees/hears**

### Decision Points
Each fork in the flow where the user makes a choice:
- The decision
- Each branch and where it leads
- Implications for back-navigation

### Error States & Edge Cases
For each step that can fail:
- What can go wrong
- The error state
- Recovery path

### Alternative Paths
Other ways a user might try to accomplish this goal (workarounds, shortcuts, non-obvious paths)

### Flow Diagram (Text Format)
A text-based flow diagram using arrows and indentation showing the full flow structure

### Prototype Scope Recommendation
Given the prototype question "${prototype_question}", which parts of this flow are critical to test vs. can be stubbed out?

Be thorough — missing an edge case in a flow document means missing it in the design.`,
        },
      ],
    };
  },
};
