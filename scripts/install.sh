#!/usr/bin/env bash
# -----------------------------------------------------------------------------
#  Syndicate RP - Resource Installer
#  Downloads the third-party resources the server needs into server-data/resources/
#  and copies the database schema into server-data/sql/.
#
#  Usage: bash scripts/install.sh [--force]
#    --force   re-download resources that are already installed (this wipes local
#              edits inside those resource folders)
#
#  Resources that already exist are skipped by default so local config edits
#  survive. Use scripts/update.sh to pull newer versions of git-cloned resources.
# -----------------------------------------------------------------------------

set -uo pipefail

FORCE=0
for arg in "$@"; do
    case "$arg" in
        --force) FORCE=1 ;;
        -h|--help) sed -n '2,13p' "$0"; exit 0 ;;
        *) echo "Unknown option: $arg"; exit 2 ;;
    esac
done

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SERVER_DIR="$ROOT_DIR/server-data"
RESOURCES_DIR="$SERVER_DIR/resources"
CORE_DIR="$RESOURCES_DIR/[core]"
HANDLING_DIR="$RESOURCES_DIR/[handling]"
MAPS_DIR="$RESOURCES_DIR/[maps]"
SQL_DIR="$SERVER_DIR/sql"
SQL_EXTRA_DIR="$ROOT_DIR/scripts/sql"

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[install]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }
err()  { echo -e "${RED}[error]${NC} $1"; }

# -- Preflight: required tools -------------------------------------------------
missing=""
for cmd in git curl jq unzip; do
    command -v "$cmd" >/dev/null 2>&1 || missing="$missing $cmd"
done
if [ -n "$missing" ]; then
    err "Missing required tools:$missing"
    echo "       Debian/Ubuntu:  sudo apt update && sudo apt install -y git curl jq unzip"
    exit 1
fi

# -- Preflight: secrets file ---------------------------------------------------
# docker-compose.yml bind-mounts server.cfg.local; if it is missing at first `up`
# Docker creates a DIRECTORY with that name. Refuse to go on without the real file.
if [ ! -f "$SERVER_DIR/server.cfg.local" ]; then
    err "server-data/server.cfg.local does not exist (or is a directory)."
    echo "       Create it first:"
    echo "         cp server-data/server.cfg.local.example server-data/server.cfg.local"
    echo "       then edit it (license key, database password) and re-run this script."
    exit 1
fi

mkdir -p "$CORE_DIR" "$HANDLING_DIR" "$MAPS_DIR" "$SQL_DIR"

TMP_ROOT="$(mktemp -d)"
trap 'rm -rf "$TMP_ROOT"' EXIT

FAILED=""
fail() { FAILED="$FAILED $1"; }

# Returns 0 if the resource dir exists and should be left alone.
already_installed() {
    local dest="$1"
    [ "$FORCE" -eq 0 ] && [ -f "$dest/fxmanifest.lua" ]
}

# Download and extract a GitHub release zip using the release-asset URL
# (no API call, so no rate limit). Returns non-zero on any failure.
install_release() {
    local repo="$1" name="$2" dest_dir="$3"
    local dest="$dest_dir/$name"

    if already_installed "$dest"; then
        log "$name already installed - skipping (use --force to reinstall)"
        return 0
    fi

    log "Installing $name (release)..."
    local zip="$TMP_ROOT/${name}.zip" stage="$TMP_ROOT/stage_$name"
    rm -rf "$stage"; mkdir -p "$stage"

    if ! curl -fsSL "https://github.com/$repo/releases/latest/download/$name.zip" -o "$zip"; then
        err "Download failed for $repo ($name.zip)"
        return 1
    fi
    if ! unzip -q -o "$zip" -d "$stage"; then
        err "Could not unzip $name.zip"
        return 1
    fi

    # Some zips nest everything in one top-level folder - flatten if so
    if [ ! -f "$stage/fxmanifest.lua" ]; then
        local inner
        inner=$(find "$stage" -mindepth 1 -maxdepth 1 -type d | head -1)
        if [ -n "$inner" ] && [ -f "$inner/fxmanifest.lua" ]; then
            stage="$inner"
        fi
    fi
    if [ ! -f "$stage/fxmanifest.lua" ]; then
        err "$name.zip does not contain an fxmanifest.lua"
        return 1
    fi

    rm -rf "$dest"
    mkdir -p "$dest"
    cp -R "$stage"/. "$dest"/
}

# Clone a git repo into <dir>/<name>. Skips if already present (unless --force).
clone_resource() {
    local repo="$1" name="$2" dir="$3"
    local dest="$dir/$name"

    if already_installed "$dest"; then
        log "$name already installed - skipping (use --force to reinstall)"
        return 0
    fi
    log "Cloning $name..."
    rm -rf "$dest"
    if ! git clone --depth 1 --quiet "https://github.com/$repo" "$dest"; then
        err "Failed to clone $repo"
        return 1
    fi
}

echo ""
echo "  =================================="
echo "    Syndicate RP - Installer"
echo "  =================================="
echo ""

# -- cfx-server-data: mapmanager, spawnmanager, baseevents ----------------------
# NOTE: `chat` is NOT in cfx-server-data any more - it ships inside the FiveM
# server artifact, so there is nothing to install for it.
if [ "$FORCE" -eq 0 ] && [ -d "$RESOURCES_DIR/[managers]/mapmanager" ] \
    && [ -d "$RESOURCES_DIR/[managers]/spawnmanager" ] && [ -d "$RESOURCES_DIR/[system]/baseevents" ]; then
    log "cfx-server-data resources already installed - skipping"
else
    log "Installing cfx-server-data (mapmanager, spawnmanager, baseevents)..."
    if git clone --depth 1 --quiet "https://github.com/citizenfx/cfx-server-data" "$TMP_ROOT/cfx"; then
        for folder in "[managers]" "[system]"; do
            rm -rf "$RESOURCES_DIR/$folder"
            cp -R "$TMP_ROOT/cfx/resources/$folder" "$RESOURCES_DIR/$folder"
            log "  Copied $folder"
        done
    else
        err "Failed to clone citizenfx/cfx-server-data"
        fail cfx-server-data
    fi
fi

# -- ox stack (compiled releases required) ----------------------------------------
log "Installing ox stack..."
install_release "overextended/oxmysql"      "oxmysql"      "$CORE_DIR" || fail oxmysql
install_release "overextended/ox_lib"       "ox_lib"       "$CORE_DIR" || fail ox_lib
install_release "overextended/ox_inventory" "ox_inventory" "$CORE_DIR" || fail ox_inventory
install_release "overextended/ox_target"    "ox_target"    "$CORE_DIR" || fail ox_target
install_release "overextended/ox_fuel"      "ox_fuel"      "$CORE_DIR" || fail ox_fuel
install_release "overextended/ox_doorlock"  "ox_doorlock"  "$CORE_DIR" || fail ox_doorlock

# -- Qbox framework + voice (source clones are fine - pure Lua) ------------------
log "Installing Qbox framework and voice..."
clone_resource "Qbox-project/qbx_core"     "qbx_core"     "$CORE_DIR" || fail qbx_core
clone_resource "Qbox-project/qbx_vehicles" "qbx_vehicles" "$CORE_DIR" || fail qbx_vehicles
clone_resource "Qbox-project/qbx_garages"  "qbx_garages"  "$CORE_DIR" || fail qbx_garages
clone_resource "AvarianKnight/pma-voice"   "pma-voice"    "$CORE_DIR" || fail pma-voice

# -- Handling: Drive-V ------------------------------------------------------------
# The repo keeps the resource in a DriveV/ subfolder, so install just that folder
# as [handling]/DriveV (the resource name is the folder name).
log "Installing handling packs..."
if already_installed "$HANDLING_DIR/DriveV"; then
    log "DriveV already installed - skipping (use --force to reinstall)"
elif git clone --depth 1 --quiet "https://github.com/Weilher420/Drive-V-Fivem-port" "$TMP_ROOT/drivev" \
    && [ -f "$TMP_ROOT/drivev/DriveV/fxmanifest.lua" ]; then
    rm -rf "$HANDLING_DIR/DriveV"
    cp -R "$TMP_ROOT/drivev/DriveV" "$HANDLING_DIR/DriveV"
    log "  Installed DriveV"
else
    err "Failed to install DriveV (clone failed or DriveV/fxmanifest.lua missing)"
    fail DriveV
fi

# -- Database schema ----------------------------------------------------------------
# MariaDB's docker-entrypoint-initdb.d runs files in name order, only on an EMPTY
# data volume. players must exist before player_vehicles (foreign key).
log "Copying database schema into server-data/sql/ ..."
if [ -f "$CORE_DIR/qbx_core/qbx_core.sql" ]; then
    cp "$CORE_DIR/qbx_core/qbx_core.sql" "$SQL_DIR/01-qbx_core.sql"
else
    err "qbx_core.sql not found"; fail qbx_core.sql
fi
if [ -f "$CORE_DIR/qbx_vehicles/vehicles.sql" ]; then
    cp "$CORE_DIR/qbx_vehicles/vehicles.sql" "$SQL_DIR/02-qbx_vehicles.sql"
else
    err "vehicles.sql not found"; fail vehicles.sql
fi
if [ -d "$SQL_EXTRA_DIR" ]; then
    cp "$SQL_EXTRA_DIR"/*.sql "$SQL_DIR"/ 2>/dev/null || true
fi

# -- Vice City map ---------------------------------------------------------------------
if [ ! -d "$MAPS_DIR/VICECRY_FM_W" ]; then
    warn "Vice Cry: Remastered must be downloaded manually."
    warn "Search forum.cfx.re for 'Vice City server side' and extract into:"
    warn "  $MAPS_DIR/VICECRY_FM_W"
    warn "Then uncomment 'ensure VICECRY_FM_W' in server.cfg"
fi

# -- Final verification: every resource server.cfg ensures must exist ---------------
for res in "$CORE_DIR/oxmysql" "$CORE_DIR/ox_lib" "$CORE_DIR/ox_inventory" "$CORE_DIR/ox_target" \
           "$CORE_DIR/ox_fuel" "$CORE_DIR/ox_doorlock" "$CORE_DIR/qbx_core" "$CORE_DIR/qbx_vehicles" \
           "$CORE_DIR/qbx_garages" "$CORE_DIR/pma-voice" "$HANDLING_DIR/DriveV" \
           "$RESOURCES_DIR/[managers]/mapmanager" "$RESOURCES_DIR/[managers]/spawnmanager" \
           "$RESOURCES_DIR/[system]/baseevents"; do
    if [ ! -f "$res/fxmanifest.lua" ]; then
        err "Missing resource: $res"
        fail "$(basename "$res")"
    fi
done

echo ""
if [ -n "$FAILED" ]; then
    err "Install incomplete. Failed:$FAILED"
    echo "       Fix the cause (network? GitHub down?) and re-run: bash scripts/install.sh"
    exit 1
fi

log "Done! Resources are live-mounted - no server rebuild needed."
echo ""
echo "  FIRST BOOT (Docker): make sure .env exists, then:  docker compose up -d --build"
echo "  The schema in server-data/sql/ is imported only when the database volume is"
echo "  empty. If you started the database before running this script, import by hand"
echo "  (see docs/deploy.md) or reset it with: docker compose down -v"
echo ""
echo "  Restart the server:  docker compose restart fivem"
echo "  Watch logs:          docker compose logs -f fivem"
echo ""
