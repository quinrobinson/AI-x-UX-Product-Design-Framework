export const planComponentArchitecture = {
  schema: {
    name: "plan_component_architecture",
    description:
      "Analyze a screen inventory and produce a structured component breakdown — atoms, molecules, organisms — with reuse opportunities and design system implications.",
    inputSchema: {
      type: "object",
      properties: {
        screen_inventory: {
          type: "string",
          description:
            "List of screens or features to analyze (names, descriptions, or paste Figma layer names)",
        },
        platform: {
          type: "string",
          description: "Target platform(s): web, iOS, Android, cross-platform",
        },
        product_context: {
          type: "string",
          description:
            "What the product does and who uses it — context for component decisions",
        },
        token_context: {
          type: "string",
          description:
            "Existing design token structure or naming conventions, if any",
        },
      },
      required: ["screen_inventory"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      screen_inventory,
      platform = "web",
      product_context = "not specified",
      token_context = "none provided",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior design systems architect. Analyze a screen inventory and produce a structured component breakdown that maximizes reuse and aligns with atomic design principles.

## Input
- **Platform:** ${platform}
- **Product context:** ${product_context}
- **Token context:** ${token_context}

## Screen Inventory
${screen_inventory}

---

Produce the following:

### Component Inventory

**Atoms** — Primitive, single-responsibility components:
| Component | Variants | Props/States | Notes |

**Molecules** — Composed of 2–4 atoms:
| Component | Composed of | Variants | Notes |

**Organisms** — Complex, reusable sections:
| Component | Composed of | Screen uses | Notes |

**Page-level Templates** — Full layout patterns that appear across multiple screens

### Reuse Analysis
- Components with highest reuse potential (appear in 3+ screens)
- Components that look similar but may diverge over time (watch list)
- Components that are screen-specific and should NOT be generalized

### Design Token Needs
Based on the component inventory, what token categories are needed:
- Color tokens (roles, not values)
- Spacing tokens
- Typography tokens
- Elevation/shadow tokens
- Motion tokens (if interactive)

### Implementation Priority
Suggested build order for a design system sprint:
1. Foundation tokens first
2. [ordered component list with rationale]

### Open Questions
Decisions that need alignment before building.

Be specific — use the actual screen and feature names from the inventory.`,
        },
      ],
    };
  },
};
