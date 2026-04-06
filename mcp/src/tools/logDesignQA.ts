export const logDesignQA = {
  schema: {
    name: "log_design_qa",
    description:
      "Structure raw design QA notes from an implementation review into a prioritized issue log with severity ratings and clear reproduction steps.",
    inputSchema: {
      type: "object",
      properties: {
        feature: {
          type: "string",
          description: "Feature or screen being reviewed",
        },
        screens: {
          type: "string",
          description: "Screens or flows included in this QA pass",
        },
        environment: {
          type: "string",
          description:
            "Environment and device details (e.g., 'Chrome 120, macOS, staging branch')",
        },
        raw_notes: {
          type: "string",
          description:
            "Raw QA notes — unstructured observations, issues found during review",
        },
      },
      required: ["feature", "raw_notes"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      feature,
      screens = "not specified",
      environment = "not specified",
      raw_notes,
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a design QA specialist structuring implementation review notes into a clear, actionable issue log that engineers can act on immediately.

## Input
- **Feature:** ${feature}
- **Screens:** ${screens}
- **Environment:** ${environment}

## Raw QA Notes
${raw_notes}

---

Structure these notes into a QA issue log:

### QA Summary
- Feature reviewed
- Environment / build
- Date of review
- Total issues found by severity
- Overall assessment: Ready to ship / Needs fixes / Major rework required

### Issue Log

For each issue found:

**Issue #[N]: [Short title]**
- **Severity:** Critical (breaks functionality) / Major (visible design defect) / Minor (polish/pixel issue) / Enhancement (nice to have)
- **Screen/Component:** Where it occurs
- **Description:** What's wrong
- **Expected:** What it should look like/do (reference Figma link or spec if possible)
- **Actual:** What's implemented
- **Reproduction steps:** How to see the issue
- **Suggested fix:** Specific guidance for the engineer

### Issues by Severity
Summarize the issue log by severity tier for prioritization.

### What's Looking Good
Positive callouts — things implemented well that should be acknowledged.

### Recommended Ship Criteria
The minimum set of issues that must be resolved before this feature ships.

Be specific in every issue description. Vague QA notes slow down engineers.`,
        },
      ],
    };
  },
};
