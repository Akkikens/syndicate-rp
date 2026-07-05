# Syndicate RP — Going Live on a Managed FiveM Host

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

1. Upload the entire contents of `server-data/resources/` to the host's
   `resources/` folder. **Include the `[core]` folder** — it holds ox_lib,
   oxmysql, ox_inventory, and Qbox, which were installed locally by
   `scripts/install.sh` and are git-ignored (so a git clone alone won't have
   them). SFTP the whole folder up.
2. Upload `server-data/server.cfg`.

---

## 3. Set your secrets on the host

Create `server.cfg.local` on the host (never commit it) with:

```cfg
# Your Cfx.re license key (from keymaster.fivem.net) — the SAME key you use
# in your local server.cfg.local. Reusing it keeps cfx.re/join/dg3mgrq here.
sv_licenseKey "cfxk_YOUR_KEY"

# Use the MySQL credentials your host gives you (NOT the docker 'mariadb' host)
set mysql_connection_string "mysql://DB_USER:DB_PASS@DB_HOST/DB_NAME?charset=utf8mb4"
```

> ⚠️ Your local `server.cfg.local` points the DB at `mariadb` (the Docker
> service name). On a managed host you must swap it for the MySQL host/user/pass
> from your host's control panel.

---

## 4. Import the database

Qbox needs its tables. In the host's phpMyAdmin (or Adminer):
1. Create/select the database the host gave you.
2. Import the Qbox schema — `resources/[core]/qbx_core/qbx_core.sql` (and any
   `.sql` shipped by ox_inventory / other resources). Most Qbox resources
   auto-create their tables on first start via oxmysql, so this may be minimal.

---

## 5. Start it

In txAdmin: create a server, point it at your uploaded `server.cfg`, and hit
**Start**. Watch the live console:
- Resources should load without "couldn't find resource" errors (the 3 custom
  maps in `[maps]` are still empty — either upload the map files or comment out
  `ensure burgershot / highfield_mansion / villa_jayway` in `server.cfg`; a
  missing map only logs a warning, it won't stop the boot).
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
- **Custom maps**: `[maps]` is empty. Download burgershot / highfield_mansion /
  villa_jayway from gta5-mods and SFTP them in, or leave those `ensure` lines
  commented.
- **Keep the same license key** across any host move — that's what keeps your
  `dg3mgrq` join code (and the website button) stable.
