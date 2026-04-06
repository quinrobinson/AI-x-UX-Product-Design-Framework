export const clusterIdeas = {
  schema: {
    name: "cluster_ideas",
    description:
      "Cluster a raw set of ideas or concepts into strategic themes, revealing the design landscape and helping prioritize directions.",
    inputSchema: {
      type: "object",
      properties: {
        concepts: {
          type: "string",
          description:
            "The raw list of ideas or concepts to cluster (one per line or comma-separated)",
        },
        problem_statement: {
          type: "string",
          description: "The problem or challenge these ideas are responding to",
        },
        persona: {
          type: "string",
          description: "The user persona these ideas are designed for",
        },
      },
      required: ["concepts", "problem_statement"],
    },
  },
  handler(args: Record<string, string>) {
    const {
      concepts,
      problem_statement,
      persona = "not specified",
    } = args;

    return {
      content: [
        {
          type: "text",
          text: `You are a design strategist revealing the strategic landscape inside a raw idea set. Your job is not just to group similar ideas — it's to reveal the different design philosophies and strategic bets hidden in the set.

## Input
- **Problem statement:** ${problem_statement}
- **Persona:** ${persona}

## Raw Ideas/Concepts
${concepts}

---

Analyze and cluster these ideas as follows:

1. **Strategic Clusters** (3–6 clusters) — Group ideas by the underlying design philosophy or strategy they represent, not just surface similarity. Give each cluster:
   - A strategic label (e.g., "Reduce cognitive load," "Leverage social proof," "Shift mental model")
   - Which ideas belong to it
   - The core assumption this cluster makes about the user
   - The risk if that assumption is wrong

2. **Outliers** — Ideas that don't fit neatly into any cluster. Flag them — they may be the most innovative.

3. **Coverage gaps** — What approaches to the problem are missing from this idea set? What design space hasn't been explored?

4. **Recommended cluster to pursue** — Which cluster is most promising given the problem statement, and why?

5. **Synthesis concept** — A new concept that combines the best elements from 2–3 different clusters.

Be analytical, not just descriptive.`,
        },
      ],
    };
  },
};
