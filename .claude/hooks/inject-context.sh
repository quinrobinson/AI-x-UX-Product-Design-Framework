#!/bin/bash
# PreToolUse — injects project context into APDF tool inputs

set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
CONTEXT_FILE=".apdf/context.json"

if [[ "$TOOL_NAME" != mcp__apdf__* ]]; then
  exit 0
fi

if [ ! -f "$CONTEXT_FILE" ]; then
  exit 0
fi

PROJECT_NAME=$(jq -r '.project_name // empty' "$CONTEXT_FILE")
PHASE=$(jq -r '.phase // empty' "$CONTEXT_FILE")
PERSONA=$(jq -r '.persona // empty' "$CONTEXT_FILE")
PROBLEM=$(jq -r '.problem_statement // empty' "$CONTEXT_FILE")
CONSTRAINTS=$(jq -r '.constraints // empty' "$CONTEXT_FILE")
FIGMA_URL=$(jq -r '.figma_file_url // empty' "$CONTEXT_FILE")
FIGMA_KEY=$(jq -r '.figma_file_key // empty' "$CONTEXT_FILE")
DS_STATUS=$(jq -r '.design_system_status // "unknown"' "$CONTEXT_FILE")

CONTEXT_STRING="Project context from .apdf/context.json:
- Project: $PROJECT_NAME
- Current phase: $PHASE
- Primary persona: $PERSONA
- Problem statement: $PROBLEM
- Constraints: $CONSTRAINTS

Use this context to enrich the tool output where relevant."

# --- Figma dual-output appendix ---
# When a Figma file key is configured, instruct Claude to also create
# a visual representation of the deliverable in the Figma file.
if [ -n "$FIGMA_KEY" ] || [ -n "$FIGMA_URL" ]; then
  TOOL_SHORT="${TOOL_NAME#mcp__apdf__}"
  case "$TOOL_SHORT" in
    synthesize_research|build_competitive_snapshot|generate_service_blueprint) FIGMA_PAGE="01 — Discover" ;;
    frame_problem|map_journey) FIGMA_PAGE="02 — Define" ;;
    generate_concepts|cluster_ideas|generate_concept_proof) FIGMA_PAGE="03 — Ideate" ;;
    map_user_flow|write_ux_copy|specify_component_states) FIGMA_PAGE="04 — Prototype" ;;
    synthesize_findings|generate_insight_report|build_client_deck) FIGMA_PAGE="05 — Validate" ;;
    plan_component_architecture|generate_component_spec|generate_handoff|log_design_qa) FIGMA_PAGE="06 — Deliver" ;;
    *) FIGMA_PAGE="" ;;
  esac

  CONTEXT_STRING="$CONTEXT_STRING

--- FIGMA DUAL OUTPUT ---
After producing the markdown deliverable above, ALSO create a visual representation of this deliverable in the designer's Figma file.

Figma file URL: $FIGMA_URL
Figma file key: $FIGMA_KEY
Target page: $FIGMA_PAGE
Deliverable type: $TOOL_SHORT

Instructions:
1. Create a NEW page in the Figma file named: \"$FIGMA_PAGE / $TOOL_SHORT\" (e.g. \"01 — Discover / synthesize_research\"). Each deliverable gets its own page so the designer can review and iterate independently.
2. Use get_metadata on the file to confirm access and understand the existing page structure.
3. Use the Figma Playbook patterns (section headers, card layouts, phase color coding) to create the visualization. Structure the content to match the deliverable type — research boards for synthesis, journey maps for map_journey, concept cards for generate_concepts, etc.
4. If a design system is established (see below), apply its tokens. Otherwise use the Figma Playbook default styling.
5. Use figma.notify to confirm what was created.
6. If the Figma MCP is unavailable or the file cannot be accessed, skip this step silently and note in your response that the Figma visualization was skipped.

The markdown artifact is the primary deliverable. The Figma visualization is a companion for collaboration — both should always be produced when a Figma file is configured."
fi

# --- Design system token reuse ---
# When a design system is established, instruct Claude to use existing tokens.
if [ "$DS_STATUS" = "established" ]; then
  CONTEXT_STRING="$CONTEXT_STRING

--- DESIGN SYSTEM TOKENS ---
A design system has been established in this Figma file with variable collections (Reference, System, Component) using the --apdf-* naming convention.
When creating any Figma content:
- Use search_design_system to find and apply existing color, spacing, and typography tokens.
- Reference variable names like sys/color/primary, sys/color/surface, sys/color/on-surface, etc.
- Apply established text styles (Display, Headline, Title, Body, Label) instead of hardcoding font properties.
- Use the System collection's spacing and shape variables for consistent margins, padding, and corner radii.
All Figma deliverables should visually align with the established design system."
fi

jq -n --arg ctx "$CONTEXT_STRING" '{
  additionalContext: $ctx
}'
