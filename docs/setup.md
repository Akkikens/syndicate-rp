# Syndicate RP — Setup Guide

Two ways to run the server. Pick one and follow only that section.

| | Docker (recommended) | Bare metal |
|---|---|---|
| Needs | x86-64 Linux host with Docker | x86-64 Linux host, MariaDB installed |
| DB host in connection string | `mariadb` | `localhost` |
| Database created by | the `mariadb` container on first boot | `bash scripts/setup-db.sh` |
| Start with | `docker compose up -d --build` | `bash scripts/start.sh` |

Both flows bypass txAdmin: the scripts start FXServer directly with `+exec server.cfg`,
so there is **no txAdmin web panel** (nothing listens on port 40120). Admin tasks happen
in the server console or in-game.

## Prerequisites

- Ubuntu 22.04 LTS (recommended) or Debian 12, x86-64 (an Apple Silicon Mac cannot run FXServer)
- `sudo apt update && sudo apt install -y git curl jq unzip`
- A Cfx.re license key from [portal.cfx.re](https://portal.cfx.re/servers/registration-keys)
  (the older keymaster.fivem.net links redirect there)

---

## Docker flow

```bash
git clone https://github.com/Akkikens/syndicate-rp.git ~/syndicate-rp
cd ~/syndicate-rp

# 1. DB passwords for Docker Compose (generate with: openssl rand -hex 24)
cp .env.example .env && nano .env

# 2. Game-server secrets: license key + the SAME DB password, host `mariadb`
cp server-data/server.cfg.local.example server-data/server.cfg.local && nano server-data/server.cfg.local

# 3. Third-party resources + schema (writes server-data/sql/)
bash scripts/install.sh

# 4. Build and start
docker compose up -d --build
docker compose logs -f fivem
```

**Important:** MariaDB imports `server-data/sql/` only on the **first start with an empty
data volume**. Run `install.sh` *before* the first `docker compose up`. If the database
already started empty, either reset it (`docker compose down -v` — this deletes all DB
data) or import by hand:

```bash
for f in server-data/sql/*.sql; do
  docker compose exec -T mariadb sh -c 'mariadb -uroot -p"$MYSQL_ROOT_PASSWORD" syndicaterp' < "$f"
done
```

---

## Bare-metal flow

```bash
sudo apt install -y mariadb-server mariadb-client     # plus git curl jq unzip from above

# 1. FiveM server files
sudo mkdir -p /opt/fivem && cd /opt/fivem
URL="$(curl -fsSL https://changelogs-live.fivem.net/api/changelog/versions/linux/server | jq -r .recommended_download)"
sudo curl -fsSL "$URL" -o fx.tar.xz && sudo tar xf fx.tar.xz && sudo rm fx.tar.xz

# 2. Clone, create server.cfg.local, install resources
git clone https://github.com/Akkikens/syndicate-rp.git ~/syndicate-rp && cd ~/syndicate-rp
cp server-data/server.cfg.local.example server-data/server.cfg.local && nano server-data/server.cfg.local   # license key
bash scripts/install.sh

# 3. Create the database, import the schema, write the connection string (DB host: localhost)
bash scripts/setup-db.sh

# 4. Start
bash scripts/start.sh
```

`setup-db.sh` asks for the MariaDB root password, creates the `syndicaterp` user and
imports every file in `server-data/sql/` (qbx_core `players`/`bans`/`player_groups`,
qbx_vehicles `player_vehicles`, ox_doorlock).

---

## Configure

Secrets live in `server-data/server.cfg.local` (gitignored), **not** in the committed
`server.cfg`. That includes the license key, the DB connection string, your Tebex secret
if you use one, and your admin line:

```cfg
add_principal identifier.license:YOUR_ROCKSTAR_LICENSE group.superadmin
```

Join once and run `status` in the server console to see your license identifier.

Non-secret values in `server.cfg` that you should edit:

| Setting | What |
|---|---|
| `sv_hostname`, `sv_projectName`, banners | Your branding |
| `syndicate_discordUrl` | Your Discord invite (currently `https://discord.gg/REPLACE`) |
| `syndicate_tebexUrl` | Your Tebex store slug |

Everything the owner must do before launch is in [go-live-checklist.md](go-live-checklist.md).

---

## GitHub Actions CI/CD (optional)

Add repository **secrets** (`Settings → Secrets and variables → Actions`):

| Secret | Value |
|---|---|
| `SERVER_HOST` | Your server IP |
| `SERVER_USER` | SSH username |
| `SERVER_SSH_KEY` | Private SSH key (public key in `~/.ssh/authorized_keys` on the server) |

and a repository **variable** `DEPLOYMENT_ENABLED` = `true` (deploy is skipped without it).
A push to `main` that touches server files runs `git pull`, `bash scripts/install.sh` and
`docker compose restart fivem` in `~/syndicate-rp` on the server. The server needs
`server-data/server.cfg.local` and `.env` in place first.

---

## Tebex storefront

1. [tebex.io](https://tebex.io) → create a store and point it at your server.
2. Put the Tebex secret in **`server-data/server.cfg.local`** (never in `server.cfg`, which is committed), following Tebex's plugin instructions.

---

## Directory structure

```
syndicate-rp/
├── .env.example                # copy to .env (Docker DB passwords)
├── docker-compose.yml, Dockerfile
├── server-data/
│   ├── server.cfg              # committed config, no secrets
│   ├── server.cfg.local.example  # copy to server.cfg.local (gitignored)
│   ├── sql/                    # generated by install.sh (gitignored)
│   └── resources/
│       ├── [core] [managers] [system] [handling] [maps]   # installed by install.sh (gitignored)
│       ├── syndicate-config/   syndicate-hud/   syndicate-racing/
│       ├── syndicate-clubs/    syndicate-meets/
│       └── syndicate-cars/     syndicate-handling/   # not ensured by default
├── scripts/
│   ├── install.sh              # install resources + schema (--force to reinstall)
│   ├── setup-db.sh             # bare-metal DB setup
│   ├── start.sh                # bare-metal start
│   ├── update.sh               # git pull cloned resources
│   └── sql/                    # extra schema files copied by install.sh
├── docs/
└── .github/workflows/deploy.yml
```
