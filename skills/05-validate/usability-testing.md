---
name: usability-testing
phase: 05 — Validate
description: Plan, run, and analyze usability tests and heuristic evaluations. Use this skill when the user needs to create test plans, write task scenarios, analyze test results, conduct heuristic reviews, or synthesize usability findings into actionable recommendations. Also triggers for A/B test planning, success metrics definition, severity ranking of issues, or when the user mentions user testing, validation, or evaluation of designs.
ai_leverage: high
---

# Usability Testing & Validation

Test designs with real people and evaluate against established heuristics to find and fix problems before launch.

## When to Use

- Planning a usability test (moderated or unmoderated)
- Writing task scenarios that don't lead participants
- Analyzing raw test session notes into structured findings
- Conducting a heuristic review as a quick quality check
- Prioritizing issues by severity and frequency

## Test Planning

### Usability Test Plan

```
# Usability Test Plan: [Feature/Product]

## Objectives
What we want to learn:
1. [Primary question — the most important thing to answer]
2. [Secondary question]
3. [Secondary question]

## Hypothesis
We believe [assumption]. This test will tell us if [what we'll observe if true vs. false].

## Methodology
- Type: [Moderated remote / Moderated in-person / Unmoderated]
- Tool: [Zoom + screen share / Maze / UserTesting / Lookback / etc.]
- Duration: [30-60 minutes per session]
- Recording: [Video + audio + screen / Notes only]

## Participants
- Number: [5-8 for qualitative, more for quantitative]
- Profile: [Key characteristics — role, experience level, demographics]
- Must have: [Critical criteria]
- Must NOT have: [Exclusion criteria]
- Recruitment: [How to find them]

## Screener Questions
1. [Question to verify they match the profile]
2. [Question to ensure they're not biased]
3. [Question to confirm relevant experience]

## Task Scenarios
[See task writing guidelines below]

## Success Metrics
- Task completion rate: [Target %]
- Time on task: [Benchmark in minutes]
- Error rate: [Acceptable threshold]
- Satisfaction: [SUS score / Likert scale target]

## Schedule
- Pilot test: [Date] — Run 1 session to catch issues with the plan itself
- Sessions: [Date range]
- Analysis: [Duration after last session]
- Readout: [Date for team presentation]
```

### Writing Good Task Scenarios

Tasks should feel natural, not like instructions. They should set a scenario, not dictate steps.

**Bad task:**
> "Click on Settings, then go to Account, then change your email address."

**Good task:**
> "You recently changed your email provider and need to update the email address associated with your account. Go ahead and do that."

**Task writing rules:**
- Set context with a realistic scenario, not a UI instruction
- Use the user's language, not your product's terminology
- Don't reveal the answer — "find the settings" vs "click the gear icon"
- Include the motivation — why would someone actually do this?
- Test one thing per task when possible
- Order tasks from easy to hard to build confidence

### Task Template

```
## Task [N]: [Short name for your notes]

### Scenario
[The realistic situation you describe to the participant]

### What we're testing
[The internal question this task answers — NOT shared with participant]

### Success criteria
- [ ] Completed without assistance
- [ ] Completed with minor hint
- [ ] Completed with significant help
- [ ] Not completed

### Metrics to capture
- Time to complete: [start → end]
- Errors: [wrong clicks, backtracking, confusion]
- Satisfaction: [post-task rating 1-5]

### Probing questions (after task)
- "How did that go?"
- "What did you expect to happen when you [action]?"
- "Was anything confusing?"
```

## Session Facilitation Guide

### Before the Session
- Test the prototype/product yourself — know where things break
- Test screen sharing, recording, and backup plans
- Have the discussion guide printed/visible
- Prepare consent form and compensation details

### During the Session

**Opening (5 min)**
- Thank them for participating
- Explain the purpose: "We're testing the design, not you"
- Ask them to think aloud
- Confirm recording consent

**Tasks (30-40 min)**
- Read each scenario naturally (don't recite robotically)
- Stay quiet — resist the urge to help
- Observe body language and hesitations
- Ask follow-up questions after each task, not during
- Use these recovery phrases:
  - "What are you looking for?" (when they're stuck)
  - "What would you normally do here?" (to understand expectations)
  - "Take your time" (to reduce performance anxiety)

**Wrap-up (5-10 min)**
- "What stood out to you about this experience?"
- "If you could change one thing, what would it be?"
- "Is there anything we didn't cover that you expected?"

### Key Facilitation Rules
- Never say "You're doing great" (it implies judgment)
- Never explain how something works (you're here to learn, not teach)
- If they ask "Am I doing this right?" say "There's no right or wrong"
- Note exact quotes — these are gold for stakeholder presentations

## Analyzing Results

### Session Notes Template

```
# Session: P[N] — [Participant description]
Date: [Date]
Duration: [Minutes]

## Task 1: [Task name]
- Outcome: Completed / Completed with help / Failed
- Time: [Minutes]
- Errors: [Description of wrong paths]
- Quotes: "[Exact quote]"
- Observations: [Body language, hesitation, confusion]
- Severity of issues found: [Critical / Major / Minor]

## Task 2: [Task name]
...

## General Observations
- [Overall impression]
- [Unexpected behaviors]
- [Feature requests or wishes expressed]

## Key Quotes
- "[Quote]" — Context: [When they said it]
```

### Synthesis Framework

After all sessions, synthesize:

```
# Usability Findings: [Feature/Product]

## Summary
- Participants: [N]
- Overall task completion: [X%]
- Key finding: [One sentence]

## Task Completion Matrix

| Task              | P1 | P2 | P3 | P4 | P5 | Rate |
|-------------------|----|----|----|----|----|----|
| [Task 1]          | ✅ | ✅ | ⚠️ | ✅ | ❌ | 60% |
| [Task 2]          | ✅ | ✅ | ✅ | ✅ | ✅ | 100%|
| [Task 3]          | ❌ | ⚠️ | ❌ | ⚠️ | ❌ | 0%  |

✅ = Completed  ⚠️ = Completed with help  ❌ = Failed

## Issues Ranked by Severity × Frequency

### Critical (blocks task completion)
1. [Issue]: [X/N participants affected]
   - Evidence: [What happened]
   - Quote: "[Participant quote]"
   - Recommendation: [Specific fix]

### Major (causes significant confusion)
2. [Issue]: [X/N participants affected]
   ...

### Minor (causes minor friction)
3. [Issue]: [X/N participants affected]
   ...

## What Worked Well
- [Positive finding with evidence]

## Recommendations

### Quick Wins (fix before next test)
1. [Fix] — Addresses: [Issue #]

### Redesigns (requires more work)
2. [Redesign] — Addresses: [Issues #, #]

### Needs More Research
3. [Question] — Suggested method: [How to investigate]
```

## Heuristic Evaluation

### Nielsen's 10 Heuristics Quick Review

```
# Heuristic Evaluation: [Screen/Feature]

## 1. Visibility of System Status
Rating: Strong / Adequate / Weak / Violated
Evidence: [What feedback does the system give?]
Issue: [If any]

## 2. Match Between System and Real World
Rating: ...
Evidence: [Does it use user language or system jargon?]

## 3. User Control and Freedom
Rating: ...
Evidence: [Can users undo, go back, escape?]

## 4. Consistency and Standards
Rating: ...
Evidence: [Are patterns consistent throughout?]

## 5. Error Prevention
Rating: ...
Evidence: [Does it prevent errors before they happen?]

## 6. Recognition Rather Than Recall
Rating: ...
Evidence: [Is information visible vs. requiring memory?]

## 7. Flexibility and Efficiency of Use
Rating: ...
Evidence: [Are there shortcuts for experts?]

## 8. Aesthetic and Minimalist Design
Rating: ...
Evidence: [Is irrelevant information removed?]

## 9. Help Users Recognize, Diagnose, and Recover from Errors
Rating: ...
Evidence: [Are error messages helpful and specific?]

## 10. Help and Documentation
Rating: ...
Evidence: [Is help available when needed?]

## Overall Score: [X/10 heuristics rated Adequate or Strong]
## Top 3 Priority Fixes:
1. [Fix]
2. [Fix]
3. [Fix]
```

## Quality Checklist

- [ ] Test plan has clear objectives and measurable success criteria
- [ ] Task scenarios are realistic and non-leading
- [ ] Participant criteria are specific enough to recruit the right people
- [ ] Analysis uses severity × frequency, not just opinion
- [ ] Every issue has a specific, actionable recommendation
- [ ] Positive findings are documented, not just problems
- [ ] Findings are supported by evidence (quotes, completion rates, observations)

---

## Phase Handoff Block

At the close of Usability Testing, generate this block and paste it as the **opening message** when starting Design Delivery (06 — Deliver).

```
## Handoff: Validate → Deliver
### From: Usability Testing
### Project: [PROJECT NAME]
### Date: [DATE]

---

### Carried Forward from Prototype
- Concept: [Name + 1 sentence]
- Prototype link: [URL / file]
- Primary user tested: [Persona / segment]

### Test Summary
- Method: [Moderated / Unmoderated]
- Participants: [N = X; roles/segments]
- Sessions: [Date range]
- Tasks tested: [N tasks]

### Overall Verdict
[Pass / Conditional pass / Fail] — [1 sentence explaining why]

### What Worked (keep in delivery)
1. [Finding] — [Evidence: completion rate or quote]
2. [Finding] — [Evidence]
3. [Finding] — [Evidence]

### Issues to Fix Before Delivery (ranked)
| Priority | Issue | Severity | Recommended Fix |
|----------|-------|----------|-----------------|
| 1 | [Issue] | Critical/Major/Minor | [Fix] |
| 2 | | | |
| 3 | | | |

### Design Changes Made Post-Testing
[List any iterations made to the prototype based on findings]

### Validated Assumptions
- [Assumption from Ideate] — Validated / Invalidated — [Evidence]
- [Assumption from Ideate] — Validated / Invalidated — [Evidence]

### Remaining Open Questions
[What testing didn't answer — to flag for the engineering team or next round]

### Accessibility Findings
[Summary of a11y issues discovered during testing — carry into handoff]

### Metrics Baseline (for post-launch measurement)
- Task completion rate: [X%] on [task]
- Time on task: [Xmin Xsec] for [task]
- Error rate: [X errors per session]
- SUS / satisfaction score: [X/10 or X/100]

---
*Paste this block as your first message when opening the Design Delivery skill.*
*Claude will use it to write specs and handoff docs grounded in tested, validated design.*
```
