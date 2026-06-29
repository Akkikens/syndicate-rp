# Running Syndicate RP on Windows (AMD/Intel x86_64)

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

## Step 3 — Clone the repo

```bash
git clone https://github.com/Akkikens/syndicate-rp ~/syndicate-rp
cd ~/syndicate-rp
```

---

## Step 4 — Create your secrets file

> **Never commit this file.** It's already in `.gitignore`.

```bash
cat > server-data/server.cfg.local << 'EOF'
set mysql_connection_string "mysql://syndicaterp:Syndicate@2026!@mariadb/syndicaterp?charset=utf8mb4"
sv_licenseKey "YOUR_LICENSE_KEY_HERE"
EOF
```

Replace `YOUR_LICENSE_KEY_HERE` with your key from [keymaster.fivem.net](https://keymaster.fivem.net).

---

## Step 5 — Install dependencies

```bash
bash scripts/install.sh
```

This downloads ox stack, Qbox framework, cfx-server-data, and handling packs into `server-data/resources/`. Takes ~2 minutes.

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

# Update dependencies
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

**`port 3306 already in use`**
MariaDB is mapped to `3307` on the host to avoid conflicts. This is intentional.

**`Could not authenticate server license key`**
Your license key in `server.cfg.local` is wrong or expired. Get a new one at [keymaster.fivem.net](https://keymaster.fivem.net).

**Resources fail to start (ox_lib, oxmysql)**
Run `bash scripts/install.sh` again — the release zips may not have extracted correctly.
