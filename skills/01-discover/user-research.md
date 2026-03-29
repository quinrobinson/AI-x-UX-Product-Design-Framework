---
name: user-research
phase: 01 — Discover
description: Synthesize raw user research data into structured, actionable insights. Use this skill when working with interview transcripts, survey responses, analytics data, support tickets, or any raw qualitative/quantitative user data. Triggers include requests to analyze research, find patterns in user feedback, create research briefs, code transcripts, or extract themes from any form of user data. Also use when the user wants to plan research — creating interview guides, screeners, or research plans.
ai_leverage: high
---

# User Research Synthesis

Transform raw research data into structured insights that drive design decisions.

## When to Use

- You have raw interview transcripts, survey data, or analytics to analyze
- You need to create a research plan or interview guide
- You want to identify patterns across multiple data sources
- You need to create a research brief for stakeholders

## Research Synthesis Workflow

### Step 1: Assess the Data

Before analyzing, understand what you're working with:
- What type of data is this? (qualitative interviews, quantitative survey, behavioral analytics, support tickets, etc.)
- How many participants/respondents?
- What was the original research question or objective?
- Are there any known biases in the collection method?

### Step 2: Code and Categorize

For qualitative data, apply thematic coding:

1. **Open coding** — Read through and tag every meaningful statement with a descriptive code
2. **Axial coding** — Group related codes into categories
3. **Selective coding** — Identify the overarching themes that connect categories

For quantitative data:
1. Identify key metrics and their distributions
2. Segment by relevant user attributes
3. Look for correlations and outliers

### Step 3: Synthesize into a Research Brief

Structure the output as:

```
# Research Brief: [Study Name]

## Study Overview
- Objective: [What we set out to learn]
- Method: [How we collected data]
- Participants: [N participants, key demographics]
- Date: [When conducted]

## Key Themes
### Theme 1: [Name]
- Frequency: [How many participants mentioned this]
- Impact: [High/Medium/Low — how much this affects their experience]
- Evidence: [2-3 representative quotes or data points]

### Theme 2: [Name]
...

## User Pain Points (Ranked by Severity)
1. [Pain point] — Severity: Critical/Major/Minor — Frequency: X/N participants
2. ...

## Unmet Needs & Opportunities
- [Need] → [Potential opportunity]

## Contradictions & Surprises
- [Finding that contradicts assumptions or reveals something unexpected]

## Recommended Next Steps
- [What to investigate further]
- [What to act on immediately]
```

### Step 4: Validate Findings

Before finalizing, check:
- Are themes grounded in data, not assumptions?
- Have you avoided confirmation bias?
- Are there alternative interpretations?
- What questions remain unanswered?

## Research Planning

When asked to create a research plan, include:

```
# Research Plan: [Study Name]

## Objectives
- Primary: [Main question to answer]
- Secondary: [Supporting questions]

## Methodology
- Method: [Interviews / Survey / Diary Study / Contextual Inquiry / etc.]
- Why this method: [Justification]

## Participants
- Target: [N participants]
- Criteria: [Who qualifies]
- Recruitment: [How to find them]
- Screener questions: [3-5 qualifying questions]

## Timeline
- Recruitment: [Duration]
- Sessions: [Duration]
- Analysis: [Duration]
- Report: [Date]

## Interview Guide / Survey Design
[Structured questions organized by topic]

## Success Metrics
- [How we'll know the research was successful]
```

## Interview Guide Structure

When creating interview guides:

1. **Warm-up (5 min)** — Easy questions to build rapport. Ask about their role, context, typical day.
2. **Context setting (5 min)** — Understand their current situation before diving into the topic.
3. **Core exploration (20-30 min)** — Open-ended questions about the topic. Start broad, then narrow. Use "tell me about a time when..." to get stories, not opinions.
4. **Specific scenarios (10 min)** — Walk through concrete tasks or situations relevant to the design problem.
5. **Wrap-up (5 min)** — "Anything else?" / "What would you change if you could?" / "Who else should we talk to?"

Rules for good questions:
- Ask open-ended questions, never yes/no
- Ask about past behavior, not hypothetical future behavior
- Don't lead — "What was that experience like?" not "Was that frustrating?"
- Follow up with "Why?" and "Can you tell me more about that?"
- Silence is OK — let participants think

## Quality Checklist

Before delivering research outputs, verify:
- [ ] Every insight is traceable to specific data points
- [ ] Severity rankings use consistent criteria
- [ ] No leading language or confirmation bias
- [ ] Participant privacy is protected (anonymized quotes)
- [ ] Recommendations are actionable, not vague
- [ ] Limitations of the research are acknowledged

---

## Phase Handoff Block

At the close of User Research, generate this block and paste it as the **opening message** when starting Problem Framing (02 — Define).

```
## Handoff: Discover → Define
### From: User Research
### Project: [PROJECT NAME]
### Date: [DATE]

---

### Product / Problem Space
[1–2 sentences on what you're designing and for whom]

### Research Method & Participants
- Method: [Interviews / Survey / Analytics / Mixed]
- Participants: [N = X; roles/segments]
- Data collected: [Date range]

### Top 3 Themes
1. **[Theme name]** — [1 sentence summary. Frequency: X/N participants]
2. **[Theme name]** — [1 sentence summary. Frequency: X/N participants]
3. **[Theme name]** — [1 sentence summary. Frequency: X/N participants]

### Primary User Pain Points (ranked by severity)
1. [Pain point] — Severity: Critical/Major/Minor
2. [Pain point] — Severity: Critical/Major/Minor
3. [Pain point] — Severity: Critical/Major/Minor

### Unmet Needs & Opportunities
- [Need] → [Potential opportunity]
- [Need] → [Potential opportunity]

### Key User Quote
> "[Most representative quote that captures the core tension]"
> — [Role/segment, anonymized]

### Assumptions to Validate in Define
- [Assumption 1 — what we believe but haven't confirmed]
- [Assumption 2]

### Constraints Surfaced in Research
- Technical: [Any constraints users or stakeholders mentioned]
- Business: [Budget, timeline, regulatory signals]
- User: [Accessibility needs, device context, literacy level]

### What Define Should Focus On
[1–2 sentences directing the next phase — what problem statement to frame]

---
*Paste this block as your first message when opening the Problem Framing skill.*
*Claude will use it as full project context for the Define phase.*
```
