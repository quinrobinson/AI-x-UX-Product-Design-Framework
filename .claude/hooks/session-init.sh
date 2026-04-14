#!/bin/bash
# PreToolUse — generate session UUID on first tool invocation
# Fires on all tools (not just mcp__apdf__*) so the session ID
# is available for Figma MCP write tracking too.

set -e

SESSION_FILE=".apdf/session-id"
mkdir -p .apdf

if [ ! -f "$SESSION_FILE" ]; then
  uuidgen | tr '[:upper:]' '[:lower:]' > "$SESSION_FILE"
fi

exit 0
