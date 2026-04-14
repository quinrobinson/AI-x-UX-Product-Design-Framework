#!/bin/bash
# PreToolUse — one-time design system check on first APDF tool use
# Fires only when figma_file_key is set AND design_system_status is "unknown"

set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
CONTEXT_FILE=".apdf/context.json"

# Only fire for APDF tools
if [[ "$TOOL_NAME" != mcp__apdf__* ]]; then
  exit 0
fi

if [ ! -f "$CONTEXT_FILE" ]; then
  exit 0
fi

FIGMA_URL=$(jq -r '.figma_file_url // empty' "$CONTEXT_FILE")
FIGMA_KEY=$(jq -r '.figma_file_key // empty' "$CONTEXT_FILE")
DS_STATUS=$(jq -r '.design_system_status // "unknown"' "$CONTEXT_FILE")

# Only gate if a Figma file is configured AND design_system_status is unknown
if [ -z "$FIGMA_KEY" ] && [ -z "$FIGMA_URL" ] || [ "$DS_STATUS" != "unknown" ]; then
  exit 0
fi

jq -n '{
  additionalContext: "DESIGN SYSTEM CHECK REQUIRED: A Figma file is configured for this project but no design system status has been established yet. Before proceeding with this deliverable, ask the designer:\n\n1. Does a design system already exist in this Figma file? If so, use search_design_system and get_variable_defs to scan for existing variable collections, text styles, and color styles. If a system is found, set design_system_status to \"established\" in .apdf/context.json.\n\n2. Would they like to create one now? If yes, guide them through the figma-ds-export workflow to set up Reference, System, and Component variable collections. Then set design_system_status to \"established\".\n\n3. Are they using an external design system (e.g., a published Figma library)? If so, set design_system_status to \"external\".\n\n4. Would they like to proceed without one for now? If yes, set design_system_status to \"none\" — the framework will use default styling for Figma deliverables.\n\nAfter the designer responds, update .apdf/context.json design_system_status accordingly, then continue with the original tool request."
}'
