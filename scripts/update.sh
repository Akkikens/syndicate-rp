#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  Syndicate RP — Update all installed resources
#  Usage: bash scripts/update.sh
# ─────────────────────────────────────────────────────────

set -euo pipefail

RESOURCES_DIR="$(dirname "$0")/../server-data/resources"

echo "[update] Pulling latest for all git-tracked resources..."

find "$RESOURCES_DIR" -mindepth 2 -maxdepth 2 -name ".git" -type d | while read -r gitdir; do
    resource_dir="$(dirname "$gitdir")"
    resource_name="$(basename "$resource_dir")"
    echo "[update] $resource_name"
    git -C "$resource_dir" pull --quiet --ff-only || echo "[warn]   $resource_name — could not fast-forward, skipping"
done

echo "[update] Done."
