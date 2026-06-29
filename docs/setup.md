# Syndicate RP — Setup Guide

## Prerequisites

- Ubuntu 22.04 LTS (recommended) or Debian 12
- Root or sudo access
- Domain name (optional but recommended)
- MariaDB 10.6+
- A [Cfx.re Keymaster](https://keymaster.fivem.net) license key

---

## 1. Install FiveM Server

```bash
# Create directory
mkdir -p /opt/fivem && cd /opt/fivem

# Download latest FiveM artifact (check https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/)
# Replace BUILD_NUMBER with the latest
wget https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/BUILD_NUMBER-HASH/fx.tar.xz

tar xf fx.tar.xz && rm fx.tar.xz
```

---

## 2. Set Up Database

```sql
-- Run as root in MariaDB
CREATE DATABASE syndicaterp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'syndicaterp'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON syndicaterp.* TO 'syndicaterp'@'localhost';
FLUSH PRIVILEGES;
```

---

## 3. Clone & Install

```bash
cd /srv
git clone https://github.com/Akkikens/syndicate-rp.git syndicaterp
cd syndicaterp

# Install all core resources
bash scripts/install.sh
```

---

## 4. Configure server.cfg

Edit `server-data/server.cfg` and fill in all `REPLACE_` values:

| Placeholder | Where to get it |
|---|---|
| `REPLACE_WITH_YOUR_LICENSE_KEY` | [keymaster.fivem.net](https://keymaster.fivem.net) |
| `REPLACE_PASSWORD` | The MariaDB password you set above |
| `REPLACE_OWNER_LICENSE` | Your Rockstar license — join the server and run `status` in console |
| `REPLACE` in Discord URL | Your Discord invite |

---

## 5. Start the Server

```bash
bash scripts/start.sh
```

txAdmin will be available at `http://YOUR_SERVER_IP:40120`

---

## 6. GitHub Actions CI/CD (Optional)

Add these secrets to your GitHub repo (`Settings → Secrets`):

| Secret | Value |
|---|---|
| `SERVER_HOST` | Your server IP |
| `SERVER_USER` | SSH username (e.g. `ubuntu`) |
| `SERVER_SSH_KEY` | Private SSH key (the public key must be in `~/.ssh/authorized_keys` on the server) |
| `TXADMIN_TOKEN` | txAdmin master action token |

Every push to `main` will auto-deploy and restart the server.

---

## 7. Tebex Storefront

1. Go to [tebex.io](https://tebex.io) → Create a store
2. Set your server's IP and port in Tebex dashboard
3. Add your Tebex secret key to `server.cfg`:
   ```
   set tebex_secret "YOUR_TEBEX_SECRET"
   ```
4. Install the Tebex FiveM plugin from Keymaster

---

## Directory Structure

```
syndicate-rp/
├── server-data/
│   ├── server.cfg              # Main server config (DO NOT commit secrets)
│   └── resources/
│       ├── [core]/             # Auto-installed by install.sh (gitignored)
│       ├── [standalone]/       # Auto-installed (gitignored)
│       ├── [cars]/             # Your car packs
│       ├── syndicate-config/   # Server-wide config
│       ├── syndicate-hud/      # Custom HUD
│       ├── syndicate-racing/   # Drag racing system
│       ├── syndicate-clubs/    # Car clubs (TODO)
│       └── syndicate-meets/    # Car meets (TODO)
├── scripts/
│   ├── install.sh              # Install all dependencies
│   ├── start.sh                # Start the server
│   └── update.sh               # Update all resources
├── docs/
│   ├── setup.md                # This file
│   └── resources.md            # Resource list & licenses
└── .github/workflows/
    └── deploy.yml              # CI/CD deploy on push to main
```
