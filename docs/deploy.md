# Syndicate RP — Going Live (VPS Deploy Guide, Docker flow)

This puts the Docker stack on a public server so anyone on the internet can join.
DB host in this flow is **`mariadb`** (the Compose service name).

> Your local Docker setup is only reachable from your own PC/LAN. A public RP server
> needs a public IP, which means a VPS or dedicated game host.

---

## 1. Pick a host

FiveM is **single-thread-heavy** — prioritize high CPU clock speed over core count.
The image is **x86-64 only** (an ARM VPS will not work).

| Need | Minimum | Comfortable (128 slots) |
|---|---|---|
| CPU | 2 vCPU @ 3.5GHz+ | 4 vCPU @ 4GHz+ (dedicated) |
| RAM | 4 GB | 8–16 GB |
| Disk | 30 GB SSD | 60 GB+ NVMe |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| Network | 1 Gbps | DDoS protection |

Avoid oversold shared VPS plans — FiveM tick rate suffers.

---

## 2. Secure the box (once)

```bash
adduser syndicate && usermod -aG sudo syndicate
ssh-copy-id syndicate@YOUR_SERVER_IP                   # from your LOCAL machine
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sudo systemctl restart ssh
```

---

## 3. Firewall

FiveM needs **TCP and UDP on 30120**. Nothing else should be public: there is no txAdmin
panel in this setup, and the database is not published at all.

```bash
sudo ufw allow OpenSSH
sudo ufw allow 30120/tcp
sudo ufw allow 30120/udp
sudo ufw enable
```

> **Docker bypasses ufw for published ports.** A port in a `ports:` block of
> `docker-compose.yml` is reachable from the internet even if ufw says deny. That is why
> MariaDB has **no** `ports:` entry — never add one. If you ever must publish something
> privately, bind it to loopback (`"127.0.0.1:3306:3306"`).

Also open 30120 TCP+UDP in your host's cloud firewall if it has one.

---

## 4. Install Docker and the tools

```bash
sudo apt update && sudo apt install -y git curl jq unzip
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER && newgrp docker
docker run hello-world      # verify
```

---

## 5. Deploy the stack

```bash
git clone https://github.com/Akkikens/syndicate-rp ~/syndicate-rp
cd ~/syndicate-rp

# Docker Compose secrets (never committed). Generate each with: openssl rand -hex 24
cp .env.example .env && nano .env

# Game-server secrets: license key + the SAME DB password as MARIADB_PASSWORD, host `mariadb`
cp server-data/server.cfg.local.example server-data/server.cfg.local && nano server-data/server.cfg.local

# Third-party resources + database schema (creates server-data/sql/)
bash scripts/install.sh

# Build + run. The first start imports server-data/sql/ into the empty database volume.
docker compose up -d --build
docker compose logs -f fivem        # watch for "license key authentication succeeded"
```

> **The schema import runs only once, on an empty database volume.** Run `install.sh`
> before the first `up`. If the database was already created empty, import manually
> (see [setup.md](setup.md#docker-flow)) or reset with `docker compose down -v`
> (deletes all database data).

> Passwords must be hex/alphanumeric (`openssl rand -hex 24`). oxmysql's connection-string
> parser breaks on `; = @ : / ? #`.

> A license key bound to a different IP, or hammered by restarts, returns `HTTP 429` /
> auth failures. Get a key at [portal.cfx.re](https://portal.cfx.re/servers/registration-keys).

---

## 6. How players find & join

Once it authenticates, the server registers with Cfx and gets a join link. Players install
nothing per-server.

- **Server browser:** search `Syndicate RP` in FiveM.
- **Join link:** `cfx.re/join/xxxxxx`, shown in the server console / Cfx portal — paste it in Discord.
- **Direct connect:** `connect YOUR_SERVER_IP`.

Optionally point an `A` record (e.g. `play.syndicaterp.com`) at the server IP.

---

## 7. Fill in before launch

Everything the owner must do is in [go-live-checklist.md](go-live-checklist.md). In short,
in `server-data/server.cfg`: `syndicate_discordUrl`, `syndicate_tebexUrl`, branding; in
`server-data/server.cfg.local`: license key, DB connection string, your `add_principal` admin line.

`server.cfg` is volume-mounted, so edits only need a restart:

```bash
docker compose restart fivem
```

---

## 8. Updating later

```bash
cd ~/syndicate-rp
git pull
bash scripts/install.sh          # installs anything missing; existing resources are kept
docker compose restart fivem     # cfg/resource changes
docker compose up -d --build     # only if the Dockerfile changed
```

`install.sh` skips resources that already exist so your local edits survive. To refresh
third-party resources: `bash scripts/update.sh` (git-cloned ones) and
`bash scripts/install.sh --force` (release zips; this overwrites local edits in those folders).

### Push-to-deploy (GitHub Actions)

`.github/workflows/deploy.yml` runs on pushes to `main` that touch server files. Add the
secrets `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` **and** a repository *variable*
`DEPLOYMENT_ENABLED` = `true` (without it the deploy job is skipped). The job does
`git pull --ff-only`, `bash scripts/install.sh`, `docker compose restart fivem` in
`~/syndicate-rp`, so that checkout (with `.env` and `server.cfg.local`) must already exist.

---

## 9. Growing the community

| Channel | Action |
|---|---|
| **Discord** | Your hub. Pin the `cfx.re/join` link, run applications & support here. |
| **FiveM list** | Auto-listed when live; ranking rises with concurrent players + uptime. |
| **TikTok / YouTube / Twitch** | RP servers grow on clips — sponsor mid-size FiveM streamers. |
| **Reddit / forums** | Launch posts on r/FiveMServers and forum.cfx.re "Server Bazaar". |
| **Tebex** | Monetize once you have players. |
