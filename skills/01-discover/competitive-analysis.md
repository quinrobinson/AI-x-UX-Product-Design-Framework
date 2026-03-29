---
name: competitive-analysis
phase: 01 — Discover
description: Analyze competitor products, identify UX patterns, gaps, and opportunities in a product category. Use this skill when the user wants to map a competitive landscape, compare features across products, evaluate competitor UX strengths and weaknesses, or identify differentiation opportunities. Also triggers for market analysis, feature benchmarking, or when the user mentions competitors, alternatives, or market positioning.
ai_leverage: high
---

# Competitive Analysis

Map the competitive landscape to understand conventions, identify gaps, and find opportunities for differentiation.

## When to Use

- Starting a new product or feature and need to understand the market
- Evaluating where your product sits relative to alternatives
- Looking for UX patterns that users expect (or that are ripe for innovation)
- Preparing a competitive brief for stakeholders

## Analysis Workflow

### Step 1: Define the Competitive Set

Identify competitors in three tiers:

1. **Direct competitors** — Same problem, same audience, similar solution
2. **Indirect competitors** — Same problem, different approach or audience
3. **Aspirational references** — Different category, but relevant UX patterns worth studying

For each competitor, capture: name, URL, category, target audience, and pricing model.

### Step 2: UX Audit Each Competitor

Evaluate each product across these dimensions:

**Value Proposition**
- What is their core promise?
- How do they communicate it (homepage, onboarding, marketing)?
- Is it clear within 5 seconds of landing?

**Core UX Patterns**
- Navigation model (tabs, sidebar, hamburger, bottom nav)
- Information density (minimal vs. data-rich)
- Interaction patterns (drag-and-drop, inline editing, modals, wizards)
- Onboarding flow (product tour, empty states, progressive disclosure)
- Mobile approach (responsive, native, mobile-first)

**Strengths**
- What do they do notably well?
- What would users miss if they switched away?

**Weaknesses**
- Where do they frustrate users? (Check app store reviews, G2, Reddit, Twitter)
- What common complaints appear?
- Where is the UX dated or clunky?

**Differentiators**
- What is unique to this product?
- What can't be easily copied?

### Step 3: Synthesize the Landscape

Create a competitive matrix:

```
# Competitive Analysis: [Product Category]

## Landscape Overview
[2-3 sentence summary of the market state]

## Competitive Matrix

| Dimension        | Competitor A | Competitor B | Competitor C | Our Product |
|------------------|-------------|-------------|-------------|-------------|
| Core value prop  |             |             |             |             |
| Target user      |             |             |             |             |
| Key UX pattern   |             |             |             |             |
| Strongest feature|             |             |             |             |
| Biggest weakness |             |             |             |             |
| Pricing model    |             |             |             |             |
| Mobile experience|             |             |             |             |

## Convention Map
Patterns that are standard across the category — users will expect these:
- [Pattern 1]: Used by [X of Y] competitors
- [Pattern 2]: ...

## Innovation Opportunities
Gaps no competitor addresses well:
1. [Gap] — Why it matters: [explanation]
2. ...

## Differentiation Strategy
Based on this analysis, the strongest opportunities to differentiate are:
1. [Opportunity] — Because [rationale]
2. ...

## Risks
Patterns to avoid or be cautious about:
- [Risk] — [Why]
```

### Step 4: Extract UX Patterns Library

For each notable UX pattern found, document:
- What it is (with screenshot reference if available)
- Which competitors use it
- Why it works (or doesn't)
- Whether to adopt, adapt, or avoid it

## Feature Benchmarking

When comparing specific features:

```
# Feature Benchmark: [Feature Name]

## Feature: [What we're comparing]

### Competitor A — [Product Name]
- Implementation: [How they built it]
- Entry point: [How users find/access it]
- Key interactions: [What users do]
- Edge cases handled: [How they deal with exceptions]
- What works: [Strengths]
- What doesn't: [Weaknesses]

### Competitor B — [Product Name]
...

### Synthesis
- Best-in-class implementation: [Who and why]
- Our recommended approach: [What to adopt/adapt]
- What to do differently: [Our opportunity]
```

## Using Web Search Effectively

When researching competitors with web search:
- Search for "[Competitor] UX review" or "[Competitor] user complaints"
- Check G2, Capterra, and app store reviews for real user feedback
- Look at "[Competitor] alternatives" to discover indirect competitors
- Search "[Product category] UX trends 2025/2026" for emerging patterns
- Check company blogs for product philosophy and roadmap signals

## Quality Checklist

- [ ] All three competitor tiers represented (direct, indirect, aspirational)
- [ ] Analysis based on actual product usage, not just marketing pages
- [ ] User sentiment included (reviews, forums, social media)
- [ ] Conventions clearly separated from opportunities
- [ ] Recommendations are actionable with clear rationale
- [ ] Analysis is current — products change rapidly

---

## Phase Handoff Block

At the close of Competitive Analysis, generate this block. It can be combined with the User Research handoff or used standalone when starting Problem Framing.

```
## Handoff: Discover → Define
### From: Competitive Analysis
### Project: [PROJECT NAME]
### Date: [DATE]

---

### Product Category & Scope
[What category was analyzed and the scope of the competitive set]

### Competitive Set
- Direct: [Competitor A, B, C — same problem, same audience]
- Indirect: [Competitor D, E — same problem, different approach]
- Aspirational: [Competitor F — different category, relevant patterns]

### Dominant UX Conventions
[2–3 patterns that every competitor uses — what users will expect]
1. [Convention + which competitors use it]
2. [Convention + which competitors use it]
3. [Convention + which competitors use it]

### Competitive Gaps (Opportunities)
1. [Gap] — [What nobody does well / what users complain about]
2. [Gap] — [What nobody does well / what users complain about]

### Standout Patterns Worth Adopting
- [Pattern] from [Competitor] — [Why it works]
- [Pattern] from [Competitor] — [Why it works]

### Our Differentiation Opportunity
[1–2 sentences on where we can genuinely be better or different]

### Positioning Signal for Define
[What problem statement angle the competitive landscape suggests we should pursue]

---
*Combine with User Research handoff when starting Problem Framing.*
*Claude will use it to ground the problem statement in real market context.*
```
