export const specifyComponentStates = {
  schema: {
    name: "specify_component_states",
    description:
      "Generate a complete state inventory for a UI component — all variants, interaction states, edge cases, and accessibility requirements.",
    inputSchema: {
      type: "object",
      properties: {
        component_name: {
          type: "string",
          description: "Name of the component (e.g., 'Primary Button', 'Search Input', 'Data Table Row')",
        },
        component_type: {
          type: "string",
          description:
            "Category: input, button, navigation, data display, feedback, layout, etc.",
        },
        platform: {
          type: "string",
          description: "Target platform: web, iOS, Android, cross-platform",
        },
        variant_matrix: {
          type: "string",
          description:
            "Known variants or sizes (e.g., 'Primary/Secondary/Ghost, Small/Medium/Large')",
        },
        token_context: {
          type: "string",
          description: "Design token naming conventions or system in use",
        },
        usage_context: {
          type: "string",
          description: "Where and how this component is used in the product",
        },
      },
      required: ["component_name", "component_type"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      component_name,
      component_type,
      platform = "web",
      variant_matrix = "not specified",
      token_context = "none provided",
      usage_context = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior design systems engineer generating a complete state inventory for a UI component. Be exhaustive — missing states in specs means missing states in implementation.

## Input
- **Component:** ${component_name}
- **Type:** ${component_type}
- **Platform:** ${platform}
- **Variants:** ${variant_matrix}
- **Token context:** ${token_context}
- **Usage context:** ${usage_context}

---

Generate a complete state specification:

### State Matrix

For each variant × state combination, specify:
| Variant | State | Visual change | Token used | Behavior | Notes |

**Interaction states to cover:** default, hover, focus, active/pressed, disabled, loading, error, success, selected/checked, indeterminate (where applicable)

**Content states to cover:** empty, partial, full/overflow, loading, error, skeleton

### Accessibility Requirements
- ARIA role and attributes
- Focus management (tab order, focus trap if modal)
- Keyboard interactions (full key mapping)
- Screen reader announcements for state changes
- Color contrast requirements per state
- Touch target size (mobile)

### Animation & Motion
- State transition timing and easing
- Loading/skeleton animation spec
- Which transitions should respect prefers-reduced-motion

### Token Mapping
Map each state to specific design tokens:
| State | Color token | Spacing token | Typography token | Shadow token |

### Edge Cases
- Long text / overflow behavior
- RTL layout considerations
- High contrast mode
- Very small / very large viewport

### Developer Handoff Notes
Key implementation details that are easy to get wrong.`,
        },
      ],
    };
  },
};
