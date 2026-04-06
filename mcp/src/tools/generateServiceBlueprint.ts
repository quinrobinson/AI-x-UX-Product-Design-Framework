export const generateServiceBlueprint = {
  schema: {
    name: "generate_service_blueprint",
    description:
      "Generate a service blueprint mapping the full service experience — frontstage, backstage, support processes, and pain points — for a persona and scenario.",
    inputSchema: {
      type: "object",
      properties: {
        persona: {
          type: "string",
          description: "The user persona experiencing the service",
        },
        goal: {
          type: "string",
          description: "What the user is trying to accomplish through the service",
        },
        trigger: {
          type: "string",
          description: "What initiates this service journey",
        },
        research_data: {
          type: "string",
          description:
            "Research findings, observations, or existing journey data to ground the blueprint",
        },
        service_context: {
          type: "string",
          description:
            "Industry, business model, or service type for context (e.g., 'B2B SaaS onboarding', 'healthcare appointment booking')",
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
      service_context = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior service designer. Create a service blueprint that maps the full system — what users experience, what employees do, and what systems enable it. Be clear and sequential.

## Input
- **Persona:** ${persona}
- **Goal:** ${goal}
- **Trigger:** ${trigger}
- **Service context:** ${service_context}

## Research Data
${research_data}

---

Generate a service blueprint with 5–8 sequential stages. For each stage provide:

### Journey Stages

For each stage:

**Stage [N]: [Specific stage name]**
| Layer | Content |
|-------|---------|
| **Physical evidence** | What tangible artifacts or environments does the user encounter? |
| **User actions** | What is the user doing? |
| **Frontstage** | What do users interact with directly? (staff, UI, touchpoints) |
| **Line of visibility** | — |
| **Backstage** | What staff/system actions happen invisibly to support this? |
| **Support processes** | What internal systems, tools, or 3rd parties are involved? |
| **Pain points** | Where does this stage break down? |
| **Opportunities** | How could this stage be improved? |

### Cross-Stage Analysis

**Bottlenecks** — Where does the service slow down or fail most often?

**Dependency Map** — What backstage processes are most critical to the frontstage experience?

**Moments of Truth** — The 2–3 moments where user trust is most at risk

**Failure Points** — Most likely places the service will break

### Recommendations

Top 5 improvements ranked by impact:
| Recommendation | Stage | Layer affected | Impact | Effort |

### Blueprint Gaps
What information is missing to complete this blueprint?`,
        },
      ],
    };
  },
};
