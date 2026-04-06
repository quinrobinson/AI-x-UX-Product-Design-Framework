export const generateInsightReport = {
  schema: {
    name: "generate_insight_report",
    description:
      "Generate a polished usability test findings report ready for stakeholder presentation — executive summary, findings, and recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        prototype_name: {
          type: "string",
          description: "Name or description of the prototype tested",
        },
        participants: {
          type: "string",
          description:
            "Number and description of participants (e.g., '6 participants, mid-market SaaS buyers')",
        },
        synthesis: {
          type: "string",
          description:
            "Synthesized findings from the test sessions (paste output from synthesize_findings or your own notes)",
        },
        decision_needed: {
          type: "string",
          description:
            "The key business or design decision this report needs to inform",
        },
        prototype_questions: {
          type: "string",
          description: "The questions the prototype was designed to answer",
        },
      },
      required: ["prototype_name", "synthesis", "decision_needed"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      prototype_name,
      participants = "not specified",
      synthesis,
      decision_needed,
      prototype_questions = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior UX researcher writing a usability test findings report for stakeholder consumption. The report should be clear, scannable, and action-oriented — stakeholders should know exactly what to do after reading it.

## Input
- **Prototype:** ${prototype_name}
- **Participants:** ${participants}
- **Decision to inform:** ${decision_needed}
- **Prototype questions:** ${prototype_questions}

## Synthesized Findings
${synthesis}

---

Write a findings report with the following sections:

### Executive Summary (½ page max)
- What was tested and why
- Who participated
- Top 3 findings in plain language
- Clear recommendation for the decision: "${decision_needed}"

### Study Overview
- Prototype description and fidelity
- Participants and recruitment criteria
- Methodology (what tasks, what questions)
- Sessions conducted

### Key Findings
Organized by priority (Critical → Major → Minor → Positive):

For each finding:
- **Finding title** (specific, not generic)
- **Description** — what happened
- **Evidence** — quotes, completion rates, observations
- **Root cause** — why this happened
- **Recommendation** — specific design change
- **Severity** label

### Answers to Prototype Questions
Direct answers to each question the prototype was designed to test.

### Recommendations Summary
A prioritized table of all recommendations:
| Finding | Recommendation | Priority | Effort |

### What to Preserve
Design decisions that worked well and should be protected in the next iteration.

### Next Steps
Recommended path forward — what to fix, what to test next, what decisions are now unblocked.

Write in plain, clear language. Avoid jargon. Stakeholders should be able to act on this report without a follow-up meeting.`,
        },
      ],
    };
  },
};
