export const writeUXCopy = {
  schema: {
    name: "write_ux_copy",
    description:
      "Define a voice brief and generate UX copy for a product flow — labels, microcopy, error messages, empty states, and CTAs.",
    inputSchema: {
      type: "object",
      properties: {
        product: {
          type: "string",
          description: "What the product is and what it does",
        },
        persona: {
          type: "string",
          description: "The user persona — who they are, what they care about",
        },
        flow: {
          type: "string",
          description:
            "The specific flow or screen(s) to write copy for (e.g., onboarding, empty state, checkout error)",
        },
        existing_voice: {
          type: "string",
          description:
            "Any existing brand voice guidelines, sample copy, or voice attributes to align with",
        },
      },
      required: ["product", "persona", "flow"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      product,
      persona,
      flow,
      existing_voice = "none provided",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a UX content strategist. Define a precise, usable voice brief — not aspirational brand fluff — and then generate specific copy for the flow described. Copy should be clear, specific, and feel human without being overly casual.

## Input
- **Product:** ${product}
- **Persona:** ${persona}
- **Flow / screens:** ${flow}
- **Existing voice:** ${existing_voice}

---

Deliver the following:

### Voice Brief
- **Tone attributes** (3–4 adjectives with brief explanations of what they mean in practice)
- **Tone to avoid** — what this voice is explicitly not
- **Writing principles** — 3–5 rules that guide copy decisions for this product/persona
- **Voice examples** — 2–3 before/after examples showing the voice in action

### Copy for "${flow}"
For each screen or moment in the flow, provide:
- **Context** — what's happening in the UI
- **Copy options** (2–3 per element) for: headlines, body copy, CTAs, labels, helper text, error messages, empty states (as applicable)
- **Recommended option** with brief rationale

### Copy Review Checklist
Quick checklist to evaluate copy quality for this product.

Be specific and practical. No filler copy like "Welcome back!" unless it's genuinely the right choice.`,
        },
      ],
    };
  },
};
