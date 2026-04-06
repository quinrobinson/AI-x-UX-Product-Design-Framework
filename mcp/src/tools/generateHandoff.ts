export const generateHandoff = {
  schema: {
    name: "generate_handoff",
    description:
      "Generate a prototype handoff document — design decisions, open questions, scope, and developer notes from a prototype build.",
    inputSchema: {
      type: "object",
      properties: {
        prototype_link: {
          type: "string",
          description: "Link to the prototype (Figma, InVision, etc.)",
        },
        fidelity: {
          type: "string",
          description: "Prototype fidelity: low, mid, or high",
        },
        platform: {
          type: "string",
          description: "Target platform: web, iOS, Android",
        },
        screens_built: {
          type: "string",
          description: "List of screens included in the prototype",
        },
        flows_covered: {
          type: "string",
          description: "User flows covered by this prototype",
        },
        problem_statement: {
          type: "string",
          description: "The problem this prototype is solving",
        },
        concept_name: {
          type: "string",
          description: "Name of the concept or design direction being prototyped",
        },
      },
      required: ["screens_built", "flows_covered", "problem_statement"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      prototype_link = "not provided",
      fidelity = "mid",
      platform = "web",
      screens_built,
      flows_covered,
      problem_statement,
      concept_name = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior product designer documenting design decisions made during a prototype build. Create a handoff document that gives developers, stakeholders, and future designers full context on what was built, why, and what's still open.

## Input
- **Concept:** ${concept_name}
- **Fidelity:** ${fidelity}
- **Platform:** ${platform}
- **Prototype link:** ${prototype_link}
- **Problem:** ${problem_statement}

## Screens Built
${screens_built}

## Flows Covered
${flows_covered}

---

Generate a prototype handoff document including:

### Overview
- Concept summary (2–3 sentences)
- Problem this prototype addresses
- Prototype goals — what decisions or questions does this prototype answer?

### What's In Scope
- Flows fully designed (click-through, states included)
- Flows stubbed / placeholder
- Screens intentionally left out and why

### Design Decisions
For each major design decision made in this prototype:
- **Decision** — what was chosen
- **Alternatives considered**
- **Rationale** — why this approach
- **Risk** — what could go wrong

### Open Questions
Decisions that were deferred and need resolution before production:
| Question | Context | Who decides | Priority |

### Interaction Notes
Key micro-interactions, animations, or behaviors not obvious from static screens

### Content / Copy Notes
Placeholder copy that needs real content, and guidance on content requirements

### Developer Notes
Implementation gotchas, constraints to be aware of, third-party dependencies

### Next Steps
What needs to happen after testing/review of this prototype`,
        },
      ],
    };
  },
};
