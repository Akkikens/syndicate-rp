# Go-Live Checklist

The ordered steps only the owner can do, then the first-boot checks. Nothing in this repo
has been run against a live FiveM server yet, so treat the first boot as a test.

## A. Owner tasks (in order)

1. **Host.** An x86-64 Linux box (Ubuntu 22.04). See [deploy.md](deploy.md#1-pick-a-host).
   Open 30120 TCP+UDP only (plus SSH). Do not publish any database port.
2. **License key and slot tier.** Create a registration key at
   [portal.cfx.re](https://portal.cfx.re/servers/registration-keys) tied to this server's IP, and
   pick the slot tier you need (the config asks for 128 slots; the key tier limits what you actually get).
3. **Rotate the database passwords.** The previous Docker passwords were committed to this public
   repo and remain in git history. **Treat them as compromised**: never reuse them. Generate
   new ones with `openssl rand -hex 24` (hex/alphanumeric only: oxmysql's parser breaks on
   `; = @ : / ? #`).
4. **Create the secret files** on the server (both gitignored):
   - `cp .env.example .env`, then set `MARIADB_ROOT_PASSWORD` and `MARIADB_PASSWORD`.
   - `cp server-data/server.cfg.local.example server-data/server.cfg.local`, then set
     `sv_licenseKey` and the connection string (same password as `MARIADB_PASSWORD`; host `mariadb`
     for Docker, `localhost` for bare metal).
5. **Admin identifier.** After your first join run `status` in the server console, copy your
   `license:` identifier and add `add_principal identifier.license:... group.superadmin` to `server.cfg.local`.
6. **Discord invite.** Replace `https://discord.gg/REPLACE` in `server.cfg` (`syndicate_discordUrl`),
   in `syndicate-config/config/main.lua` (`Config.DiscordUrl`) and in the README.
7. **Tebex slug.** Replace `syndicaterp.tebex.io` in `server.cfg` (`syndicate_tebexUrl`) and
   `syndicate-config/config/main.lua`. Keep any Tebex secret in `server.cfg.local`, never in `server.cfg`.
8. **Banner images.** Replace the two `https://i.imgur.com/placeholder.png` URLs in `server.cfg`
   (`banner_detail`, `banner_connecting`).
9. **Manual map and car downloads** (not in the repo, not installed by `install.sh`):
   - Vice City map: [visual-setup.md](visual-setup.md), then uncomment `ensure VICECRY_FM_W`.
   - `burgershot`, `highfield_mansion`, `villa_jayway` into `resources/[maps]/`, then uncomment their `ensure` lines.
   - Cars: [cars.md](cars.md).
10. **GitHub secrets** for push-to-deploy (optional): `SERVER_HOST`, `SERVER_USER`, `SERVER_SSH_KEY` and the
    repository variable `DEPLOYMENT_ENABLED=true`.
11. **Install and start** (Docker flow), in this order:
    ```bash
    bash scripts/install.sh          # needs git curl jq unzip; fills resources + server-data/sql/
    docker compose up -d --build     # first start imports server-data/sql/ into the EMPTY db volume
    docker compose logs -f fivem
    ```
    The import happens only on an empty database volume. If the database already started
    empty, import by hand ([setup.md](setup.md#docker-flow)) or `docker compose down -v`.
12. **Placeholder coordinates.** The drag strip and meet-location coordinates in
    `syndicate-racing/shared/config.lua` and `syndicate-meets/shared/config.lua` have not been
    checked in-game. Stand on each location and confirm or correct them.

## B. First-boot checks

Run these and fix anything that fails before inviting players.

- [ ] `docker compose logs fivem`: no `Could not find resource` lines; no red errors from `qbx_core`,
      `ox_inventory`, `oxmysql`, `syndicate-*`.
- [ ] Console shows the license authenticating, and oxmysql connected (no `ECONNREFUSED`/access denied).
- [ ] Console shows OneSync enabled (qbx_core quits the server otherwise).
- [ ] Database has the tables:
      `docker compose exec mariadb sh -c 'mariadb -uroot -p"$MYSQL_ROOT_PASSWORD" syndicaterp -e "SHOW TABLES"'`
      should list `players`, `bans`, `player_groups`, `player_vehicles`, `ox_doorlock`, plus the
      `syndicate_*` tables once their resources have started.
- [ ] Join; create a character; the HUD appears only after the character loads and shows correct cash, bank, job.
- [ ] Chat works (`/` commands), voice works (pma-voice).
- [ ] `/clubs` opens the menu; create a club (costs $25,000 cash); `Esc` releases the mouse.
- [ ] Two players: `/race` at a strip start line (both in vehicles); accept; countdown; finish; payout is 90% of the pot; `/leaderboard`.
- [ ] Staff: `/meetopen ls_car_meet`, check in (the player must be near the meet), `/meetvote <id>` with 2+ checked-in players; the mouse is released afterwards.
- [ ] Restart the server (`docker compose restart fivem`) and confirm characters and clubs persist.
- [ ] `docker compose ps` shows MariaDB with no published host port.
