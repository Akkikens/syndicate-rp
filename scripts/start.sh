#!/usr/bin/env bash
# -----------------------------------------------------------------------------
#  Syndicate RP - Server Start Script (BARE-METAL flow; Docker uses the image CMD)
#  Usage: bash scripts/start.sh
# -----------------------------------------------------------------------------

set -euo pipefail

SERVER_DIR="$(cd "$(dirname "$0")/.." && pwd)/server-data"
FIVEM_DIR="${FIVEM_INSTALL_DIR:-/opt/fivem}"

if [ ! -f "$FIVEM_DIR/run.sh" ]; then
    echo "[error] FiveM not found at $FIVEM_DIR"
    echo "        Set FIVEM_INSTALL_DIR or install FiveM to /opt/fivem"
    exit 1
fi

echo "[syndicate-rp] Starting server..."
cd "$SERVER_DIR"
# qbx_core requires OneSync Infinity; it asks for `+set onesync on` on the command line.
exec "$FIVEM_DIR/run.sh" +set onesync on +exec server.cfg "$@"
