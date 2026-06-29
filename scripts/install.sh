#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  Syndicate RP — Resource Installer
#  Downloads compiled release builds of all core dependencies
#  into server-data/resources/[core]/
#
#  Usage: bash scripts/install.sh
# ─────────────────────────────────────────────────────────

set -uo pipefail

RESOURCES_DIR="$(cd "$(dirname "$0")/.." && pwd)/server-data/resources"
CORE_DIR="$RESOURCES_DIR/[core]"
HANDLING_DIR="$RESOURCES_DIR/[handling]"
MAPS_DIR="$RESOURCES_DIR/[maps]"

mkdir -p "$CORE_DIR" "$HANDLING_DIR" "$MAPS_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[install]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }
err()  { echo -e "${RED}[error]${NC} $1"; }

# Download and extract the latest GitHub release zip
# Uses jq to reliably parse the GitHub API response
install_release() {
    local repo="$1"
    local name="$2"
    local dest_dir="$3"
    local dest="$dest_dir/$name"

    log "Installing $name (release)..."

    local url
    url=$(curl -sf \
        -H "Accept: application/vnd.github+json" \
        "https://api.github.com/repos/$repo/releases/latest" \
        | jq -r '[.assets[] | select(.name | endswith(".zip"))] | first | .browser_download_url // empty')

    if [ -z "$url" ] || [ "$url" = "null" ]; then
        err "No release zip found for $repo — skipping."
        return 0
    fi

    rm -rf "$dest"
    mkdir -p "$dest"
    curl -sL "$url" -o "/tmp/${name}_release.zip"
    unzip -q -o "/tmp/${name}_release.zip" -d "$dest"
    rm "/tmp/${name}_release.zip"

    # Some zips nest into a subdirectory — flatten if so
    local inner
    inner=$(find "$dest" -mindepth 1 -maxdepth 1 -type d | head -1)
    if [ -n "$inner" ] && [ "$(ls -A "$dest" | wc -l)" -eq 1 ]; then
        mv "$inner"/* "$dest/" 2>/dev/null || true
        rmdir "$inner" 2>/dev/null || true
    fi
}

echo ""
echo "  ╔═══════════════════════════════╗"
echo "  ║   Syndicate RP — Installer    ║"
echo "  ╚═══════════════════════════════╝"
echo ""

# ── cfx-server-data (base FiveM server resources) ────────
log "Installing cfx-server-data (sessionmanager, spawnmanager, etc.)..."
CFX_DIR="$RESOURCES_DIR/[cfx-default]"
mkdir -p "$CFX_DIR"
if [ -d "$RESOURCES_DIR/[system]/.git" ]; then
    git -C "$RESOURCES_DIR/[system]" pull --quiet
else
    # Clone and copy the system/default resource folders
    TMPDIR_CFX=$(mktemp -d)
    git clone --depth 1 "https://github.com/citizenfx/cfx-server-data" "$TMPDIR_CFX/cfx" --quiet 2>&1
    # Copy the resource category folders we need
    for folder in "[system]" "[managers]" "[gamemodes]" "[defaultmaps]"; do
        [ -d "$TMPDIR_CFX/cfx/resources/$folder" ] && \
            cp -r "$TMPDIR_CFX/cfx/resources/$folder" "$RESOURCES_DIR/" && \
            log "  Copied $folder"
    done
    rm -rf "$TMPDIR_CFX"
fi

# ── ox Stack (compiled releases required) ─────────────────
log "Installing ox stack..."
install_release "overextended/oxmysql"      "oxmysql"      "$CORE_DIR"
install_release "overextended/ox_lib"       "ox_lib"       "$CORE_DIR"
install_release "overextended/ox_inventory" "ox_inventory" "$CORE_DIR"
install_release "overextended/ox_doorlock"  "ox_doorlock"  "$CORE_DIR"

# ── Qbox Framework (source clones are fine — pure Lua) ────
log "Installing Qbox framework..."
_clone_or_pull() {
    local repo="$1" name="$2" dir="$3"
    local dest="$dir/$name"
    if [ -d "$dest/.git" ]; then
        log "  Updating $name..."
        git -C "$dest" pull --quiet
    else
        log "  Cloning $name..."
        git clone --depth 1 "https://github.com/$repo" "$dest" --quiet 2>&1 \
            || err "  Failed to clone $repo"
    fi
}

_clone_or_pull "Qbox-project/qbx_core"     "qbx_core"     "$CORE_DIR"
_clone_or_pull "Qbox-project/qbx_vehicles" "qbx_vehicles" "$CORE_DIR"
_clone_or_pull "Qbox-project/qbx_garages"  "qbx_garages"  "$CORE_DIR"
_clone_or_pull "Qbox-project/qbx_phone"    "qbx_phone"    "$CORE_DIR"
_clone_or_pull "Project-Sloth/ps-fuel"     "ps-fuel"       "$CORE_DIR"

# ── Handling (Drive-V is source Lua) ──────────────────────
log "Installing handling packs..."
_clone_or_pull "Weilher420/Drive-V-Fivem-port" "Drive-V" "$HANDLING_DIR"

# ── Vice City Map ─────────────────────────────────────────
if [ ! -d "$MAPS_DIR/VICECRY_FM_W" ]; then
    warn "Vice Cry: Remastered must be downloaded manually."
    warn "Search forum.cfx.re for 'Vice City server side' and extract into:"
    warn "  $MAPS_DIR/VICECRY_FM_W"
    warn "Then uncomment 'ensure VICECRY_FM_W' in server.cfg"
fi

echo ""
log "Done! Resources are live-mounted — no server rebuild needed."
echo ""
echo "  Restart the server:  docker compose restart fivem"
echo "  Watch logs:          docker compose logs -f fivem"
echo ""
