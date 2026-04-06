export const synthesizeFindings = {
  schema: {
    name: "synthesize_findings",
    description:
      "Synthesize raw usability test session notes into structured findings — themes, severity ratings, and design recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        tasks_tested: {
          type: "string",
          description:
            "The tasks participants were asked to complete in the test",
        },
        prototype_questions: {
          type: "string",
          description: "Key questions the prototype test was designed to answer",
        },
        pass_fail_summary: {
          type: "string",
          description:
            "High-level pass/fail or completion rate data per task (if available)",
        },
        session_notes: {
          type: "string",
          description:
            "Raw session notes from all participants — observations, quotes, behaviors",
        },
      },
      required: ["tasks_tested", "session_notes"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      tasks_tested,
      prototype_questions = "not specified",
      pass_fail_summary = "not provided",
      session_notes,
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a UX researcher organizing usability test session notes into structured, prioritized findings ready for a readout or report.

## Input
- **Tasks tested:** ${tasks_tested}
- **Prototype questions:** ${prototype_questions}
- **Pass/fail summary:** ${pass_fail_summary}

## Session Notes
${session_notes}

---

Synthesize these notes into:

### Findings by Task
For each task, provide:
- **Completion rate** (from notes/data)
- **Key observations** — what did participants do, where did they struggle?
- **Representative quotes** (verbatim)
- **Root cause** — why did the issue occur? (navigation label, mental model mismatch, missing affordance, etc.)
- **Severity** — Critical (blocks task) / Major (causes significant struggle) / Minor (friction but recoverable) / Positive (highlight)

### Cross-Task Themes
Patterns that appeared across multiple tasks:
| Theme | Evidence | Frequency | Severity |

### Answers to Prototype Questions
For each prototype question, what did the data say?

### Priority Issues (Top 5)
The 5 highest-priority issues to fix before the next round, with:
- Issue description
- Why it's high priority
- Recommended fix

### What Worked Well
Positive findings — don't skip these, they inform what to preserve in design iterations.

### Recommended Next Steps
What changes to make, what to test in the next round.

Be specific — use participant quotes and task numbers as evidence.`,
        },
      ],
    };
  },
};
