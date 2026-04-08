#!/bin/bash
# Stop — detects a phase handoff block in artifacts and prompts for /transition

ARTIFACTS_DIR=".apdf/artifacts"
MARKER="Phase Handoff Block"

# No artifacts directory — nothing to check
if [ ! -d "$ARTIFACTS_DIR" ]; then
  exit 0
fi

# Look for generate_handoff-*.md files modified in the last 5 minutes
# that contain the Phase Handoff Block marker
# macOS/Linux compatible: use -mmin -5
RECENT_HANDOFF=$(find "$ARTIFACTS_DIR" -name "generate_handoff-*.md" \
  -mmin -5 2>/dev/null | head -1)

if [ -z "$RECENT_HANDOFF" ]; then
  exit 0
fi

# Check if it's a Phase Handoff Block (not a prototype handoff)
if ! grep -q "$MARKER" "$RECENT_HANDOFF" 2>/dev/null; then
  exit 0
fi

# Read the "Next:" line to name the next phase
NEXT_PHASE=$(grep -m1 "^\*\*Next:\*\*" "$RECENT_HANDOFF" 2>/dev/null | \
  sed 's/\*\*Next:\*\* //' | xargs)

if [ -n "$NEXT_PHASE" ]; then
  echo "Phase handoff block detected. Run /transition to kick off: $NEXT_PHASE."
else
  echo "Phase handoff block detected. Run /transition to kick off the next phase."
fi

exit 0
