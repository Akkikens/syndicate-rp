# Syndicate RP

> Premium GTA V FiveM server — car culture, drag racing, custom cars, and elite RP.

Built on [Qbox](https://github.com/Qbox-project/qbx_core) + [ox stack](https://github.com/overextended). Designed to monetize and scale.

---

## What's in this repo

| Resource | Description |
|---|---|
| `syndicate-hud` | Custom HUD — speed, health, armor, hunger, thirst, money |
| `syndicate-config` | Server identity, economy and VIP tiers (read via `exports['syndicate-config']:GetConfig()`) |
| `syndicate-racing` | Drag racing — `/race` challenges with bets, server-decided results, `/leaderboard` |
| `syndicate-clubs` | Car clubs — found, invite, roles, kick, disband, `/clubs`, `/transferclub` |
| `syndicate-meets` | Car meets — weekly scheduled meet, check-in rewards, attendee voting |
| `syndicate-cars` | Empty car-pack streamer, ready for your vehicles (see [docs/cars.md](docs/cars.md)) |
| `syndicate-handling` | Handling overrides — **disabled** until tested on one car (see `server.cfg`) |

> None of this has been run against a live FiveM server yet. Follow the
> [go-live checklist](docs/go-live-checklist.md) and its first-boot checks.

---

## Quick Start (Docker, x86-64 Linux host)

```bash
# 1. Clone
git clone https://github.com/Akkikens/syndicate-rp.git ~/syndicate-rp
cd ~/syndicate-rp

# 2. Secrets (both files are gitignored)
cp .env.example .env                                       # set the two DB passwords
cp server-data/server.cfg.local.example server-data/server.cfg.local   # license key + same DB password

# 3. Install third-party resources and the database schema
sudo apt install -y git curl jq unzip      # once
bash scripts/install.sh

# 4. Start (first boot imports the schema into the empty database volume)
docker compose up -d --build
docker compose logs -f fivem
```

The secrets go in `.env` (read by Docker Compose) and `server-data/server.cfg.local`
(read by the game server), **not** in `server.cfg`. Docker uses DB host `mariadb`.
Bare-metal (no Docker) uses DB host `localhost` and `scripts/setup-db.sh` + `scripts/start.sh`;
see [docs/setup.md](docs/setup.md).

Guides: [docs/setup.md](docs/setup.md) · [docs/deploy.md](docs/deploy.md) ·
[docs/go-live-checklist.md](docs/go-live-checklist.md) · [docs/windows-setup.md](docs/windows-setup.md)

---

## Tech Stack

- **Framework:** [Qbox](https://github.com/Qbox-project/qbx_core)
- **Libraries:** ox_lib, ox_inventory, ox_target, ox_fuel, ox_doorlock, oxmysql, pma-voice
- **Database:** MariaDB 10.11 (Docker) / 10.6+ (bare metal)
- **Server:** FiveM (OneSync Infinity, 128 slots)
- **Payments:** Tebex
- **CI/CD:** GitHub Actions → SSH → `git pull`, `scripts/install.sh`, `docker compose restart fivem`

---

## Monetization Tiers

| Tier | Price | Key Perk |
|---|---|---|
| Crew | $5/mo | Priority queue, custom plate prefix |
| VIP | $10/mo | Exclusive cars, VIP events |
| Elite | $25/mo | Monthly car drop, vote on content |
| Founder | $50/mo | In-world business, co-design a car |

Powered by Tebex. All perks are cosmetic/access — compliant with Rockstar's post-acquisition EULA.

---

## Discord

[discord.gg/REPLACE](#) — Join to get updates, apply for staff, and connect with the community.

---

## License

MIT — custom resources only. Third-party resources retain their own licenses.
