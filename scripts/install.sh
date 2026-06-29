#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  Syndicate RP — Resource Installer
#  Downloads and installs all core dependencies into
#  server-data/resources/[core]/
#
#  Usage: bash scripts/install.sh
# ─────────────────────────────────────────────────────────

set -euo pipefail

RESOURCES_DIR="$(dirname "$0")/../server-data/resources"
CORE_DIR="$RESOURCES_DIR/[core]"
STANDALONE_DIR="$RESOURCES_DIR/[standalone]"

mkdir -p "$CORE_DIR" "$STANDALONE_DIR"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[install]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }

# ── Helper: clone or pull a GitHub repo ──────────────────
install_resource() {
    local repo="$1"   # e.g. "overextended/oxmysql"
    local name="$2"   # e.g. "oxmysql"
    local dir="$3"    # target parent dir

    local dest="$dir/$name"
    if [ -d "$dest/.git" ]; then
        log "Updating $name..."
        git -C "$dest" pull --quiet
    else
        log "Installing $name..."
        git clone --depth 1 "https://github.com/$repo" "$dest" --quiet
    fi
}

# ── Helper: download latest release asset ────────────────
install_release() {
    local repo="$1"
    local asset_pattern="$2"
    local dest_dir="$3"
    local name="$4"

    log "Downloading latest release: $name..."
    local url
    url=$(curl -s "https://api.github.com/repos/$repo/releases/latest" \
        | grep "browser_download_url" \
        | grep "$asset_pattern" \
        | head -1 \
        | cut -d '"' -f 4)

    if [ -z "$url" ]; then
        warn "Could not find release asset for $name — skipping."
        return
    fi

    mkdir -p "$dest_dir/$name"
    curl -sL "$url" -o "/tmp/${name}.zip"
    unzip -q -o "/tmp/${name}.zip" -d "$dest_dir/$name"
    rm "/tmp/${name}.zip"
}

echo ""
echo "  ╔═══════════════════════════════╗"
echo "  ║   Syndicate RP — Installer    ║"
echo "  ╚═══════════════════════════════╝"
echo ""

# ── Core Dependencies ─────────────────────────────────────
log "Installing core dependencies..."

install_resource "overextended/oxmysql"   "oxmysql"   "$CORE_DIR"
install_resource "overextended/ox_lib"    "ox_lib"    "$CORE_DIR"
install_resource "overextended/ox_inventory" "ox_inventory" "$CORE_DIR"
install_resource "overextended/ox_doorlock"  "ox_doorlock"  "$CORE_DIR"

# ── Qbox Framework ────────────────────────────────────────
log "Installing Qbox framework..."

install_resource "Qbox-project/qbx_core"     "qbx_core"     "$CORE_DIR"
install_resource "Qbox-project/qbx_vehicles" "qbx_vehicles" "$CORE_DIR"
install_resource "Qbox-project/qbx_garages"  "qbx_garages"  "$CORE_DIR"
install_resource "Qbox-project/qbx_fuel"     "qbx_fuel"     "$CORE_DIR"
install_resource "Qbox-project/qbx_phone"    "qbx_phone"    "$CORE_DIR"
install_resource "Qbox-project/qbx_banking"  "qbx_banking"  "$CORE_DIR"
install_resource "Qbox-project/qbx_shops"    "qbx_shops"    "$CORE_DIR"

# ── Voice ─────────────────────────────────────────────────
log "Installing voice..."
install_resource "AvarianKnight/mumble-voip" "mumble-voip" "$STANDALONE_DIR"

echo ""
log "All resources installed."
echo ""
echo "  Next steps:"
echo "  1. Edit server-data/server.cfg — fill in license key, DB string, owner license"
echo "  2. Run: bash scripts/start.sh"
echo ""
