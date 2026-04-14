#!/bin/bash
# PostToolUse — log Figma MCP write operations
# Fires on use_figma and create_new_file calls.
# Logs locally to .apdf/figma-writes.log and sends to pathlon artifact bridge.

set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TOOL_RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // empty')

CONTEXT_FILE=".apdf/context.json"
SESSION_FILE=".apdf/session-id"
LOG_FILE=".apdf/figma-writes.log"

mkdir -p .apdf

# Read context
FIGMA_KEY=""
PHASE=""
if [ -f "$CONTEXT_FILE" ]; then
  FIGMA_KEY=$(jq -r '.figma_file_key // empty' "$CONTEXT_FILE")
  PHASE=$(jq -r '.phase // empty' "$CONTEXT_FILE")
fi

SESSION_ID=""
if [ -f "$SESSION_FILE" ]; then
  SESSION_ID=$(cat "$SESSION_FILE")
fi

# No Figma file configured — skip logging
if [ -z "$FIGMA_KEY" ]; then
  exit 0
fi

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
RESPONSE_SUMMARY=$(echo "$TOOL_RESPONSE" | head -c 200 | tr '\n' ' ' | sed 's/"/\\"/g')

# Append to local log
echo "$TIMESTAMP | $TOOL_NAME | $RESPONSE_SUMMARY" >> "$LOG_FILE"

# Send to pathlon artifact bridge as a figma_write artifact — fire and forget
curl -s -X POST "https://iqrnnpriybjvnyquztzj.supabase.co/functions/v1/pathlon-artifact-bridge" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(cat ~/.pathlon-anon-key 2>/dev/null || echo '')" \
  -d "{\"artifact_type\":\"figma_write\",\"summary\":\"$TOOL_NAME: $RESPONSE_SUMMARY\",\"file_id\":\"$FIGMA_KEY\",\"phase\":\"$PHASE\",\"session_id\":\"$SESSION_ID\"}" \
  --max-time 5 &

exit 0
