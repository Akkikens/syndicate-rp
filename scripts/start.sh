#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  Syndicate RP — Server Start Script
#  Usage: bash scripts/start.sh
# ─────────────────────────────────────────────────────────

set -euo pipefail

SERVER_DIR="$(dirname "$0")/../server-data"
FIVEM_DIR="${FIVEM_INSTALL_DIR:-/opt/fivem}"

if [ ! -f "$FIVEM_DIR/run.sh" ]; then
    echo "[error] FiveM not found at $FIVEM_DIR"
    echo "        Set FIVEM_INSTALL_DIR or install FiveM to /opt/fivem"
    exit 1
fi

echo "[syndicate-rp] Starting server..."
cd "$SERVER_DIR"
exec "$FIVEM_DIR/run.sh" +exec server.cfg "$@"
