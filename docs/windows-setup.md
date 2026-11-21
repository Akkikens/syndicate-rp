# Running Syndicate RP on Windows (AMD/Intel x86_64) — Docker flow

This is the **Docker** flow: the database host in your connection string is `mariadb`.

Windows with WSL2 is the best local dev setup — native x86_64 Linux kernel, no emulation, no crashes.

---

## Step 1 — Install WSL2 + Ubuntu

Open **PowerShell as Administrator** (right-click Start → "Windows Terminal (Admin)" or "PowerShell (Admin)"):

```powershell
wsl --install -d Ubuntu-22.04
```

- Reboot when prompted
- After reboot, Ubuntu opens automatically — set a Unix username and password
- If Ubuntu doesn't open, find it in the Start Menu

---

## Step 2 — Install Docker inside WSL2

Open the **Ubuntu terminal** and run:

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

Verify it works:

```bash
docker run hello-world
```

You should see `Hello from Docker!`.

---

## Step 3 — Install tools and clone the repo

```bash
sudo apt update && sudo apt install -y git curl jq unzip
git clone https://github.com/Akkikens/syndicate-rp ~/syndicate-rp
cd ~/syndicate-rp
```

---

## Step 4 — Create your secrets files

> **Never commit these files.** Both are in `.gitignore`.

```bash
# Database passwords for Docker Compose. Generate each with: openssl rand -hex 24
cp .env.example .env && nano .env

# License key + connection string (same DB password as MARIADB_PASSWORD, host `mariadb`)
cp server-data/server.cfg.local.example server-data/server.cfg.local && nano server-data/server.cfg.local
```

Get your license key at [portal.cfx.re](https://portal.cfx.re/servers/registration-keys).
Use hex/alphanumeric passwords only (the connection-string parser breaks on `; = @ : / ? #`).

---

## Step 5 — Install dependencies

```bash
bash scripts/install.sh
```

This downloads the ox stack, Qbox, pma-voice, cfx-server-data pieces and DriveV into `server-data/resources/`, and copies the database schema into `server-data/sql/`. Takes ~2 minutes. It refuses to run until `server-data/server.cfg.local` exists.

> Run it **before** the first `docker compose up`: MariaDB imports `server-data/sql/` only when its data volume is empty.

---

## Step 6 — Start the server

```bash
docker compose up -d
```

Watch the logs:

```bash
docker compose logs -f fivem
```

You're looking for this line:

```
Server license key authentication succeeded. Welcome!
```

Followed by resources starting. Once you see that, the server is live.

---

## Step 7 — Connect from FiveM

1. Find your Windows LAN IP — open a new **PowerShell** window (not WSL) and run:
   ```powershell
   ipconfig
   ```
   Look for `IPv4 Address` under your active adapter (usually `192.168.x.x`)

2. Open FiveM → **Direct Connect** → enter:
   ```
   connect 192.168.x.x:30120
   ```

---

## Useful commands

```bash
# Stop the server
docker compose down

# Restart just FiveM (after config changes)
docker compose restart fivem

# View live logs
docker compose logs -f fivem

# Install anything missing (existing resources are kept); --force reinstalls them
bash scripts/install.sh

# Rebuild the Docker image (after Dockerfile changes)
docker compose build fivem
```

---

## Accessing files from Windows Explorer

Your WSL2 files are accessible in Windows Explorer at:

```
\\wsl$\Ubuntu-22.04\home\YOUR_USERNAME\syndicate-rp
```

Or open Explorer and look for **Linux** in the left sidebar.

---

## Troubleshooting

**`docker: permission denied`**
Run `newgrp docker` or log out and back into WSL2.

**Database port**
MariaDB is intentionally not published to the host; only the game container can reach it.

**`Could not authenticate server license key`**
Your license key in `server.cfg.local` is wrong or expired. Get a new one at [portal.cfx.re](https://portal.cfx.re/servers/registration-keys).

**Players cannot create a character / `Table 'players' doesn't exist`**
The schema was not imported (the database volume already existed when `install.sh` ran). See [setup.md](setup.md#docker-flow) for the manual import, or `docker compose down -v` to start the database fresh.

**Resources fail to start (ox_lib, oxmysql)**
Run `bash scripts/install.sh` again. It exits non-zero and names the resource if a download failed.
