#!/usr/bin/env bash
# -----------------------------------------------------------------------------
#  Syndicate RP - Update installed git-cloned resources
#  Usage: bash scripts/update.sh
#
#  Resources live at resources/[category]/<name>/.git, i.e. three levels below
#  the resources directory. Release-zip resources (oxmysql, ox_lib, ox_inventory,
#  ox_target, ox_fuel, ox_doorlock) have no .git folder; update those with:
#      bash scripts/install.sh --force
# -----------------------------------------------------------------------------

set -euo pipefail

RESOURCES_DIR="$(cd "$(dirname "$0")/.." && pwd)/server-data/resources"

echo "[update] Pulling latest for all git-cloned resources..."

find "$RESOURCES_DIR" -mindepth 3 -maxdepth 3 -name ".git" -type d | while read -r gitdir; do
    resource_dir="$(dirname "$gitdir")"
    resource_name="$(basename "$resource_dir")"
    echo "[update] $resource_name"
    git -C "$resource_dir" pull --quiet --ff-only || echo "[warn]   $resource_name - could not fast-forward, skipping"
done

echo "[update] Done. Release-zip resources are updated with: bash scripts/install.sh --force"
