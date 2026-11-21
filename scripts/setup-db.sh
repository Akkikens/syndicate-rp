#!/usr/bin/env bash
# -----------------------------------------------------------------------------
#  Syndicate RP - Database Setup Script (BARE-METAL flow, MariaDB on localhost)
#
#  Docker users do NOT need this script: the mariadb container creates the
#  database and imports server-data/sql/ on first boot (see docs/deploy.md).
#
#  What it does:
#    1. creates database + user 'syndicaterp' (localhost only)
#    2. imports every file in server-data/sql/ (run scripts/install.sh first)
#    3. writes the mysql_connection_string line into server-data/server.cfg.local
#
#  Usage: bash scripts/setup-db.sh
#  Requires: MariaDB/MySQL root access and the `mysql` client.
# -----------------------------------------------------------------------------

set -euo pipefail

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[db]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }
err()  { echo -e "${RED}[error]${NC} $1"; exit 1; }

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SQL_DIR="$ROOT_DIR/server-data/sql"
CFG_LOCAL="$ROOT_DIR/server-data/server.cfg.local"
CFG_EXAMPLE="$ROOT_DIR/server-data/server.cfg.local.example"

command -v mysql >/dev/null 2>&1 || err "The 'mysql' client is not installed (apt install mariadb-client)."

ls "$SQL_DIR"/*.sql >/dev/null 2>&1 \
    || err "No schema files in server-data/sql/. Run: bash scripts/install.sh"

echo ""
echo "  Syndicate RP - Database Setup (bare metal)"
echo ""

read -rp "  MariaDB root password: " -s ROOT_PASS
echo ""
echo "  New password for the 'syndicaterp' DB user."
echo "  Letters and digits only."
echo "  Leave empty to generate one with openssl."
read -rp "  Password: " -s DB_PASS
echo ""
if [ -z "$DB_PASS" ]; then
    command -v openssl >/dev/null 2>&1 || err "openssl not found - enter a password instead."
    DB_PASS="$(openssl rand -hex 24)"
    log "Generated a random password (stored in server.cfg.local only)."
fi
# oxmysql's connection-string parser and the SQL below both break on special characters.
case "$DB_PASS" in
    *[!A-Za-z0-9]*|"") err "Password must contain only letters and digits." ;;
esac

export MYSQL_PWD="$ROOT_PASS"
mysql -uroot -e "SELECT 1;" > /dev/null 2>&1 \
    || err "Cannot connect to MariaDB as root. Is it running?"
log "Connected to MariaDB."

log "Creating database 'syndicaterp' and user..."
mysql -uroot <<SQL
CREATE DATABASE IF NOT EXISTS \`syndicaterp\`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'syndicaterp'@'localhost'
  IDENTIFIED BY '${DB_PASS}';
ALTER USER 'syndicaterp'@'localhost' IDENTIFIED BY '${DB_PASS}';

GRANT ALL PRIVILEGES ON \`syndicaterp\`.* TO 'syndicaterp'@'localhost';
FLUSH PRIVILEGES;
SQL

log "Importing schema (qbx_core players/bans/player_groups, qbx_vehicles player_vehicles, ox_doorlock)..."
for f in "$SQL_DIR"/*.sql; do
    log "  $(basename "$f")"
    mysql -uroot syndicaterp < "$f"
done

# -- Write the connection string into server.cfg.local -----------------------------
CONN="set mysql_connection_string \"server=localhost;uid=syndicaterp;password=${DB_PASS};database=syndicaterp\""
if [ ! -f "$CFG_LOCAL" ]; then
    cp "$CFG_EXAMPLE" "$CFG_LOCAL"
fi
TMP_CFG="$(mktemp)"
grep -v '^set mysql_connection_string' "$CFG_LOCAL" > "$TMP_CFG" || true
{ cat "$TMP_CFG"; echo ""; echo "# Written by scripts/setup-db.sh (bare-metal: DB host is localhost)"; echo "$CONN"; } > "$CFG_LOCAL"
rm -f "$TMP_CFG"
chmod 600 "$CFG_LOCAL"

log "Connection string written to server-data/server.cfg.local (gitignored - never commit it)."

grep -q 'exec "server.cfg.local"' "$ROOT_DIR/server-data/server.cfg" \
    || warn "server.cfg does not exec server.cfg.local - add: exec \"server.cfg.local\""

echo ""
log "Database setup complete."
echo ""
echo "  Next:"
echo "  1. Make sure server-data/server.cfg.local has your sv_licenseKey"
echo "  2. Start the server: bash scripts/start.sh"
echo ""
