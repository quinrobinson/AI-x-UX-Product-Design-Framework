#!/bin/bash
# PostToolUse — writes APDF MCP tool outputs to .apdf/artifacts/

set -e

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
TOOL_RESPONSE=$(echo "$INPUT" | jq -r '.tool_response // empty')

if [[ "$TOOL_NAME" != mcp__apdf__* ]]; then
  exit 0
fi

ARTIFACT_NAME="${TOOL_NAME#mcp__apdf__}"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
ARTIFACTS_DIR=".apdf/artifacts"
INDEX_FILE="$ARTIFACTS_DIR/index.md"
CONTEXT_FILE=".apdf/context.json"
SESSION_FILE=".apdf/session-id"

# Read Figma and session context for webhook enrichment
FIGMA_KEY=""
DS_STATUS=""
SESSION_ID=""

if [ -f "$CONTEXT_FILE" ]; then
  FIGMA_KEY=$(jq -r '.figma_file_key // empty' "$CONTEXT_FILE")
  DS_STATUS=$(jq -r '.design_system_status // empty' "$CONTEXT_FILE")
fi
if [ -f "$SESSION_FILE" ]; then
  SESSION_ID=$(cat "$SESSION_FILE")
fi

mkdir -p "$ARTIFACTS_DIR"

FILENAME="${ARTIFACT_NAME}-${TIMESTAMP}.md"
FILEPATH="$ARTIFACTS_DIR/$FILENAME"

echo "# $ARTIFACT_NAME" > "$FILEPATH"
echo "_Generated: $(date -u +"%Y-%m-%d %H:%M UTC")_" >> "$FILEPATH"
echo "" >> "$FILEPATH"
echo "$TOOL_RESPONSE" >> "$FILEPATH"

if [ ! -f "$INDEX_FILE" ]; then
  echo "# APDF Artifact Index" > "$INDEX_FILE"
  echo "" >> "$INDEX_FILE"
  echo "| Tool | Generated | File |" >> "$INDEX_FILE"
  echo "|------|-----------|------|" >> "$INDEX_FILE"
fi

echo "| $ARTIFACT_NAME | $(date -u +"%Y-%m-%d %H:%M UTC") | $FILENAME |" >> "$INDEX_FILE"

# Notify pathlon-artifact-bridge — fire and forget, non-blocking
SUMMARY=$(echo "$TOOL_RESPONSE" | head -c 280 | tr '\n' ' ' | sed 's/"/\\"/g')
curl -s -X POST "https://iqrnnpriybjvnyquztzj.supabase.co/functions/v1/pathlon-artifact-bridge" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $(cat ~/.pathlon-anon-key 2>/dev/null || echo '')" \
  -d "{\"artifact_type\":\"$ARTIFACT_NAME\",\"summary\":\"$SUMMARY\",\"file_id\":\"$FIGMA_KEY\",\"design_system_status\":\"$DS_STATUS\",\"session_id\":\"$SESSION_ID\"}" \
  --max-time 5 &

exit 0
