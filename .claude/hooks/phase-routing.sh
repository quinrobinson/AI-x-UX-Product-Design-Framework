#!/bin/bash
# Stop — detects a phase handoff block in artifacts and prompts for /transition
# Also cleans up session state at session end.

ARTIFACTS_DIR=".apdf/artifacts"
MARKER="Phase Handoff Block"

# ── Phase handoff detection ──────────────────────────────────────────────────
if [ -d "$ARTIFACTS_DIR" ]; then
  # Look for generate_handoff-*.md files modified in the last 5 minutes
  # that contain the Phase Handoff Block marker
  # macOS/Linux compatible: use -mmin -5
  RECENT_HANDOFF=$(find "$ARTIFACTS_DIR" -name "generate_handoff-*.md" \
    -mmin -5 2>/dev/null | head -1)

  if [ -n "$RECENT_HANDOFF" ]; then
    # Check if it's a Phase Handoff Block (not a prototype handoff)
    if grep -q "$MARKER" "$RECENT_HANDOFF" 2>/dev/null; then
      # Read the "Next:" line to name the next phase
      NEXT_PHASE=$(grep -m1 "^\*\*Next:\*\*" "$RECENT_HANDOFF" 2>/dev/null | \
        sed 's/\*\*Next:\*\* //' | xargs)

      if [ -n "$NEXT_PHASE" ]; then
        echo "Phase handoff block detected. Run /transition to kick off: $NEXT_PHASE."
      else
        echo "Phase handoff block detected. Run /transition to kick off the next phase."
      fi
    fi
  fi
fi

# ── Session cleanup (always runs) ────────────────────────────────────────────
rm -f ".apdf/session-id"

exit 0
