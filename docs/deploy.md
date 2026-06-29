# Syndicate RP — Going Live (VPS Deploy Guide)

This takes the **exact same Docker stack** you run locally and puts it on a public
server so anyone on the internet can join. Nothing about the app changes — only
*where* it runs.

> **Why you can't skip this:** your local Docker setup is only reachable from your
> own PC/LAN. A public RP server needs a public IP, which means a VPS (or a
> dedicated game host). Don't try to run a real community off your home PC.

---

## 1. Pick a host

FiveM is **single-thread-heavy** — prioritize high CPU clock speed over core count.

| Need | Minimum | Comfortable (128 slots) |
|---|---|---|
| CPU | 2 vCPU @ 3.5GHz+ | 4 vCPU @ 4GHz+ (dedicated) |
| RAM | 4 GB | 8–16 GB |
| Disk | 30 GB SSD | 60 GB+ NVMe |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Network | 1 Gbps, unmetered-ish | DDoS protection (OVH/path.net) |

**Good options:** OVH "Game" range, Hetzner (cheap, EU), Contabo (cheap VPS),
ZAP-Hosting (FiveM-specific, easiest), or any cloud (Hetzner Cloud CPX31 is a
great $/perf pick). Avoid cheap oversold shared VPS — FiveM tick rate suffers.

---

## 2. Secure the box (do this first, once)

SSH in as root with the IP your host emails you, then:

```bash
# Create a non-root user and give it sudo
adduser syndicate && usermod -aG sudo syndicate

# (From your LOCAL machine) copy your SSH key up so you can disable passwords
ssh-copy-id syndicate@YOUR_SERVER_IP

# Back on the server: lock down SSH (optional but recommended)
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

---

## 3. Firewall — open the FiveM ports

FiveM needs **both TCP and UDP on 30120**. txAdmin's web UI is 40120 — keep it
restricted to your own IP.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 30120/tcp
sudo ufw allow 30120/udp
sudo ufw allow from YOUR_HOME_IP to any port 40120 proto tcp   # txAdmin, you only
sudo ufw enable
```

Also open 30120 TCP+UDP in your host's cloud firewall/security group if it has one.

---

## 4. Install Docker

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker
docker run hello-world      # verify
```

---

## 5. Deploy the stack

```bash
git clone https://github.com/Akkikens/syndicate-rp ~/syndicate-rp
cd ~/syndicate-rp

# Secrets (never committed) — same format as local
cat > server-data/server.cfg.local << 'EOF'
sv_licenseKey "YOUR_LICENSE_KEY_HERE"
set mysql_connection_string "server=mariadb;uid=syndicaterp;password=Syndicate@2026!;database=syndicaterp;charset=utf8mb4"
EOF

# Pull resources (ox, qbx, handling, etc.)
bash scripts/install.sh

# Build + run
docker compose up -d --build
docker compose logs -f fivem        # watch for "license key authentication succeeded"
```

> **Use a fresh license key** from https://keymaster.fivem.net tied to THIS server's
> IP. A key bound to a different IP, or hammered by restarts, returns `HTTP 429` /
> auth failures (exactly what we hit locally).

---

## 6. How players find & join

Once it boots and authenticates, the server **auto-registers** with Cfx and gets a
join link. Players install **nothing per-server** — FiveM streams all your resources
(cars, maps, HUD) on first connect.

- **Server browser:** they search `Syndicate RP` in FiveM's in-game list.
- **Join link:** find yours in the txAdmin panel or server console — it looks like
  `cfx.re/join/xxxxxx`. **This is the link you paste in Discord.**
- **Direct connect:** `connect YOUR_SERVER_IP` (or your domain).

### Optional: a domain instead of a bare IP
Point an `A` record (e.g. `play.syndicaterp.com`) at your server IP. Players then use
`connect play.syndicaterp.com`. Looks pro, and lets you change hosts without breaking
the address.

---

## 7. Fill in before launch (`server-data/server.cfg`)

Search the file for `TODO(launch)`:

- `syndicate_discordUrl` — your real Discord invite
- `syndicate_tebexUrl` — your Tebex store slug (for monetization)
- Owner admin — grant yourself superadmin in the **txAdmin web panel** (easiest), or
  uncomment the `add_principal` line with your Rockstar license id (run `status` in the
  console after joining to find it)
- `sv_hostname` / banners — your branding

Because `server.cfg` is now **volume-mounted**, edits only need a restart, not a rebuild:

```bash
docker compose restart fivem
```

---

## 8. Updating later

```bash
cd ~/syndicate-rp
git pull
bash scripts/install.sh          # refresh third-party resources
docker compose restart fivem     # cfg/resource changes
docker compose up -d --build     # only if Dockerfile changed
```

The repo also ships `.github/workflows/deploy.yml` for push-to-deploy via SSH —
add the `SERVER_HOST` / `SERVER_USER` / `SERVER_SSH_KEY` / `TXADMIN_TOKEN` secrets
in GitHub and every push to `main` auto-deploys.

---

## 9. Growing the community

| Channel | Action |
|---|---|
| **Discord** | Your hub. Pin the `cfx.re/join` link, run applications & support here. |
| **FiveM list** | Auto-listed when live; ranking rises with concurrent players + uptime. |
| **TikTok / YouTube / Twitch** | RP servers grow on clips — sponsor mid-size FiveM streamers. |
| **Reddit / forums** | Launch posts on r/FiveMServers and forum.cfx.re "Server Bazaar". |
| **Tebex** | Monetize once you have players (priority queue, VIP cars — already wired in). |
</content>
</invoke>
