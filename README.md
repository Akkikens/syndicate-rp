# Syndicate RP

> Premium GTA V FiveM server — car culture, drag racing, custom cars, and elite RP.

Built on [Qbox](https://github.com/Qbox-project/qbx_core) + [ox stack](https://github.com/overextended). Designed to monetize and scale.

---

## What's in this repo

| Resource | Description |
|---|---|
| `syndicate-hud` | Custom HUD — speed, health, armor, hunger, thirst, money |
| `syndicate-config` | Centralized server config — VIP tiers, economy, locations |
| `syndicate-racing` | Drag racing system — challenges, bets, leaderboard |
| `syndicate-clubs` | Car clubs — create, join, territory (coming soon) |
| `syndicate-meets` | Scheduled car meets with events (coming soon) |

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/Akkikens/syndicate-rp.git
cd syndicate-rp

# 2. Install core dependencies
bash scripts/install.sh

# 3. Configure
#    Edit server-data/server.cfg — fill in license key, DB, Discord URL

# 4. Start
bash scripts/start.sh
```

Full setup guide: [docs/setup.md](docs/setup.md)

---

## Tech Stack

- **Framework:** [Qbox](https://github.com/Qbox-project/qbx_core)
- **Libraries:** ox_lib, ox_inventory, ox_doorlock, oxmysql
- **Database:** MariaDB 10.6+
- **Server:** FiveM (OneSync Infinity, 128+ slots)
- **Payments:** Tebex / Cfx Keymaster
- **CI/CD:** GitHub Actions → SSH deploy → txAdmin restart

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
