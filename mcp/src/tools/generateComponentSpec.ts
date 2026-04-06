export const generateComponentSpec = {
  schema: {
    name: "generate_component_spec",
    description:
      "Generate detailed component documentation — props, variants, tokens, usage guidelines, and do/don't examples.",
    inputSchema: {
      type: "object",
      properties: {
        component_name: {
          type: "string",
          description: "Name of the component (e.g., 'Toast Notification', 'Tag', 'Navigation Rail')",
        },
        description: {
          type: "string",
          description: "What the component does and when to use it",
        },
        variants: {
          type: "string",
          description:
            "List of variants, sizes, and states (e.g., 'success/warning/error/info, dismissible/persistent')",
        },
        tokens: {
          type: "string",
          description:
            "Design tokens used or relevant token categories for this component",
        },
      },
      required: ["component_name", "description"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      component_name,
      description,
      variants = "not specified",
      tokens = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a design systems expert generating component documentation that serves both designers and engineers. Documentation should be specific, practical, and answer the questions that come up during implementation.

## Input
- **Component:** ${component_name}
- **Description:** ${description}
- **Variants:** ${variants}
- **Tokens:** ${tokens}

---

Generate complete component documentation:

### Overview
- What it is and what problem it solves
- When to use it
- When NOT to use it (and what to use instead)

### Anatomy
Label each part of the component:
| Part | Description | Required/Optional |

### Variants & States
For each variant:
- Visual description
- When to use this variant (not just what it looks like)
- Required vs. optional

For each state:
- Trigger condition
- Visual change
- Token used

### Props / API
| Prop | Type | Default | Description | Required |

### Design Token Mapping
| Part/State | Token name | Value role |

### Usage Guidelines
**Do:**
- (3–5 specific, concrete examples of correct use)

**Don't:**
- (3–5 specific, concrete examples of incorrect use)

### Accessibility
- ARIA role and required attributes
- Keyboard navigation
- Screen reader behavior
- Color contrast requirements

### Content Guidelines
- Character limits or length recommendations
- Tone guidance for labels/copy
- Localization considerations

### Related Components
What to use instead for adjacent use cases.`,
        },
      ],
    };
  },
};
