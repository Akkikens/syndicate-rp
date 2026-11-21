# Syndicate RP — Going Live on a Managed FiveM Host (bare-metal style flow)

No Docker here: the database host is whatever your host's control panel gives you (often `localhost`), **not** `mariadb`.

The fast path to a public server, no Linux/Docker knowledge needed. A managed
host runs FXServer for you on real x86 hardware (your M5 Mac can't — FiveM is
x86-only and crash-loops under emulation).

> **The payoff:** boot with your existing license key and your website's
> connect button (`cfx.re/join/dg3mgrq`) lights up automatically — the join
> code follows the license key, so players click Connect and land on the new
> host.

---

## 1. Pick a host

FiveM's main thread is **single-core-bound** — prioritize clock speed, not core
count. For a 128-slot server:

| Spec | Minimum | Comfortable |
|---|---|---|
| CPU single-core | 3.5 GHz+ | 4.5 GHz+ (Ryzen 5800X/7950X tier) |
| RAM | 4 GB | 8 GB |
| Database | MySQL/MariaDB included | dedicated MySQL |
| Must have | **txAdmin**, SFTP or web file manager | + auto-restart |

Reputable options (compare current pricing): **ZAP-Hosting**, **GTXGaming**,
**PingPerfect**, **Nodecraft**. Expect roughly $10–25/mo. Buy the slot count you
actually expect to fill — you can scale later.

---

## 2. Get your files onto the host

Most hosts give you **txAdmin** + an **SFTP** login or web file manager.

1. On a Linux machine (or WSL) run `bash scripts/install.sh` first
   (needs `sudo apt install -y git curl jq unzip`). It fills the git-ignored folders
   `[core]`, `[managers]`, `[system]` and `[handling]`, and creates `server-data/sql/`.
   It stops until `server-data/server.cfg.local` exists: copy `server.cfg.local.example`.
2. Upload the entire contents of `server-data/resources/` to the host's
   `resources/` folder, **including** `[core]`, `[managers]`, `[system]` and `[handling]`.
3. Upload `server-data/server.cfg`.

---

## 3. Set your secrets on the host

Create `server.cfg.local` on the host (never commit it) with:

```cfg
# Your Cfx.re license key (portal.cfx.re) — the SAME key you use
# in your local server.cfg.local. Reusing it keeps cfx.re/join/dg3mgrq here.
sv_licenseKey "YOUR_LICENSE_KEY"

# Use the MySQL credentials your host gives you (NOT the docker 'mariadb' host).
# The password must not contain ; = @ : / ? #
set mysql_connection_string "server=DB_HOST;uid=DB_USER;password=DB_PASS;database=DB_NAME"

# Your admin identifier
add_principal identifier.license:YOUR_ROCKSTAR_LICENSE group.superadmin
```

> ⚠️ A Docker-flow `server.cfg.local` points the DB at `mariadb` (the Docker
> service name). On a managed host you must swap it for the MySQL host/user/pass
> from your host's control panel.

---

## 4. Import the database

Qbox needs its tables, and **both** SQL files below are required: without them nobody can create a character.
In the host's phpMyAdmin (or Adminer):
1. Create/select the database the host gave you.
2. Import, in this order, the files in `server-data/sql/` (created by `install.sh`):
   1. `01-qbx_core.sql` (players, bans, player_groups)
   2. `02-qbx_vehicles.sql` (player_vehicles; depends on `players`)
   3. `03-ox_doorlock.sql`

The syndicate-* resources create their own tables on first start.

---

## 5. Start it

In txAdmin: create a server, point it at your uploaded `server.cfg`, and hit
**Start**. Watch the live console:
- Resources should load without "couldn't find resource" errors. The three
  manual map resources (`burgershot`, `highfield_mansion`, `villa_jayway`) are
  commented out in `server.cfg`; upload them to `[maps]` and uncomment to enable.
- Look for the server registering with Cfx.re. Within a minute,
  `https://cfx.re/join/dg3mgrq` should resolve and your site's Connect button
  works.

---

## 6. Verify

- Open FiveM → Direct Connect → your host's IP:30120, confirm you can join.
- Visit **gta6network.org/gta-v**, click **Connect via FiveM** — it should
  launch you into the server.

---

## Notes

- **Custom cars**: the `syndicate-cars/stream/` folders are empty. Follow
  [cars.md](cars.md) to add vehicle packs, or the dealership will only have
  base-game cars.
- **Custom maps**: `[maps]` is empty and the three `ensure` lines are commented
  out. Download burgershot / highfield_mansion / villa_jayway from gta5-mods, SFTP
  them in, then uncomment the lines.
- **Keep the same license key** across any host move — that's what keeps your
  `dg3mgrq` join code (and the website button) stable.
