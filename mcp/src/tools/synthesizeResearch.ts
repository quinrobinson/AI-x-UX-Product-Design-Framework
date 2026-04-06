export const synthesizeResearch = {
  schema: {
    name: "synthesize_research",
    description:
      "Synthesize UX research sessions into themes, insights, and design directions. Provide raw session notes, transcripts, or observations and get back structured findings.",
    inputSchema: {
      type: "object",
      properties: {
        research_question: {
          type: "string",
          description: "The primary research question you are trying to answer",
        },
        method: {
          type: "string",
          description:
            "Research method used (e.g. moderated usability test, contextual inquiry, diary study)",
        },
        total_sessions: {
          type: "string",
          description: "Total number of sessions completed (e.g. '8 sessions')",
        },
        participant_context: {
          type: "string",
          description:
            "Who the participants are — role, experience level, context",
        },
        session_notes: {
          type: "string",
          description:
            "Raw session notes, quotes, observations, or transcripts to synthesize",
        },
      },
      required: ["research_question", "session_notes"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      research_question,
      method = "not specified",
      total_sessions = "not specified",
      participant_context = "not specified",
      session_notes,
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a senior UX research strategist. Respond in clean markdown. Be concise and precise.

## Research Context
- **Research question:** ${research_question}
- **Method:** ${method}
- **Sessions:** ${total_sessions}
- **Participants:** ${participant_context}

## Raw Session Data
${session_notes}

---

Synthesize the above research. Your output should include:

1. **Key Themes** (3–6) — each with a clear label, 1–2 sentence description, supporting evidence/quotes, and frequency signal (how many participants exhibited this)
2. **Top Insights** — specific, actionable observations about what users need, what frustrates them, what delights them, and surprising or counterintuitive findings
3. **Tensions & Contradictions** — places where participants disagreed or where behavior contradicted stated preference
4. **Design Directions** (3–5) — concrete directions grounded in the evidence, not generic UX advice
5. **Open Questions** — gaps this research didn't answer that follow-up work should address

Format with clear headers. Be specific — avoid generic platitudes like "users want it to be easy."`,
        },
      ],
    };
  },
};
