export const buildCompetitiveSnapshot = {
  schema: {
    name: "build_competitive_snapshot",
    description:
      "Build a structured competitive analysis snapshot — patterns, gaps, and strategic opportunities across competitor products.",
    inputSchema: {
      type: "object",
      properties: {
        product: {
          type: "string",
          description: "The product you are designing for",
        },
        design_question: {
          type: "string",
          description:
            "The specific design question or feature area to analyze (e.g., 'How do competitors handle empty states?')",
        },
        focus_area: {
          type: "string",
          description:
            "UX area to focus on: onboarding, navigation, checkout, notifications, search, etc.",
        },
        known_competitors: {
          type: "string",
          description:
            "Competitors to include in the analysis (names, comma-separated)",
        },
        audit_notes: {
          type: "string",
          description:
            "Your own notes, screenshots descriptions, or observations from competitor research",
        },
      },
      required: ["product", "design_question"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      product,
      design_question,
      focus_area = "general UX",
      known_competitors = "not specified",
      audit_notes = "none provided",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior UX strategist with deep knowledge of product markets. Analyze the competitive landscape and extract strategic insights — not just feature lists.

## Input
- **Product:** ${product}
- **Design question:** ${design_question}
- **Focus area:** ${focus_area}
- **Competitors to analyze:** ${known_competitors}

## Audit Notes / Observations
${audit_notes}

---

Generate a competitive snapshot:

### Competitive Landscape Overview
- Market positioning of each competitor relative to "${product}"
- The 2–3 design philosophies competing in this space

### Feature/Pattern Matrix
For the focus area "${focus_area}", compare competitors on key dimensions:
| Competitor | Approach | Strengths | Weaknesses | Notable |

### Design Patterns: What's Converged
Patterns that multiple competitors use — this represents industry convention. Users expect these.

### Design Patterns: Where They Diverge
Where competitors have taken meaningfully different approaches — these represent design bets and open territory.

### Gaps & Opportunities
What none of the competitors do well that "${product}" could own:
| Opportunity | Evidence | Risk | Potential impact |

### Answering the Design Question
Direct answer to: "${design_question}"
- What are competitors doing?
- What's working vs. not?
- What's the recommended approach for ${product}?

### Strategic Recommendation
Given this competitive landscape, what is the highest-leverage design direction for ${product}?

Be analytical. Go beyond "Competitor A has X, Competitor B has Y" — explain what it means.`,
        },
      ],
    };
  },
};
