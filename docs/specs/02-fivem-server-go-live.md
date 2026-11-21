# Spec 02 — FiveM server: make it bootable, safe and working

Status: ready to implement · Written 2026-11-20
Scope: `server-data/`, `scripts/`, `Dockerfile`, `docker-compose.yml`,
`.github/workflows/deploy.yml`, `README.md`, `docs/*.md` (not `docs/specs/`).
Out of scope: everything under `website/`.

## Why

A read-only audit found that the server cannot boot as written, the three
custom gameplay resources (racing, clubs, meets) do not work, and two of them
let any client mint unlimited money. The goal is a repo where
`bash scripts/install.sh` followed by `docker compose up` gives a booting Qbox
server on a fresh x86-64 Linux host once the owner adds a license key, with
custom resources that work and cannot be exploited.

## Ground rules

1. The audit findings below came from reading code and checking upstream
   repos. **Re-verify each upstream claim** (API names, repo URLs, event names,
   file locations) against the current upstream source before changing code.
   If upstream disagrees with this spec, follow upstream and say so in your
   report.
2. Nothing here can be run against a real FiveM server in this environment (no
   license key, no x86 Linux host). Do not claim runtime behaviour you did not
   observe. Verify what you can: Lua syntax, shell syntax, YAML validity,
   `docker compose config`, and a `docker build` if Docker is available.
3. Server authority: any event that moves money, membership or votes must take
   its inputs from server-side state, never from client arguments.
4. If a feature cannot be made correct, disable its `ensure` line with a
   comment explaining why. A disabled feature is acceptable; a broken or
   exploitable one is not.
5. No secrets in the repo. Do not commit or push. Stay on branch
   `post-launch-refresh`.

## P0 — Boot blockers

| # | Where | Problem | Fix |
|---|---|---|---|
| 1 | `Dockerfile:13-17` | Artifact listing now 301s with empty body; `curl -s` has no `-L`, so the download URL is empty and the build fails | Take the URL from `https://changelogs-live.fivem.net/api/changelog/versions/linux/server` (`.recommended_download`) with `curl -sL` + `jq`; fail the build if empty |
| 2 | `scripts/install.sh:39-42` | `ox_lib` release lookup 301s (repo moved); `curl -sf` without `-L` returns nothing, so `ox_lib` is silently skipped | Add `-L`. Make `install_release` return non-zero on failure and make the script exit non-zero if any core resource is missing |
| 3 | `scripts/install.sh` | No preflight for `git`, `curl`, `jq`, `unzip` | `command -v` checks at the top; add the `apt install` line to `docs/deploy.md` and `docs/windows-setup.md` |
| 4 | DB schema | `qbx_core.sql` (players, bans, player_groups) and `qbx_vehicles/vehicles.sql` (player_vehicles) are never imported, so nobody can create a character | `install.sh` copies both into `server-data/sql/`; mount it at `/docker-entrypoint-initdb.d` on the mariadb service; add imports to `setup-db.sh`. Document that initdb only runs on an empty volume |
| 5 | `server.cfg:76` | `ps-fuel` needs PolyZone, qb-target, qb-menu, qb-input, none installed | Replace with `ox_fuel` (install + ensure) |
| 6 | `server.cfg:77`, `install.sh:114` | `qbx_phone` is an archived port needing qb-* resources that are absent | Remove the ensure and the clone |
| 7 | `server.cfg:88`, `install.sh:119` | `Drive-V` clones to a folder whose `fxmanifest.lua` is in a `DriveV/` subfolder, so the resource is not found | Install the subfolder as `[handling]/DriveV` and `ensure DriveV`, or remove it |
| 8 | `server.cfg:95-97` | `burgershot`, `highfield_mansion`, `villa_jayway` are not in the repo or installed | Comment out with a note that they are manual downloads |
| 9 | `ox_target` | Used by clubs and meets clients but never installed or ensured | Install, `ensure ox_target` after `qbx_core`, add to both manifests' `dependencies` |
| 10 | `chat` | Not ensured, so players cannot type commands | `ensure mapmanager`, `chat`, `spawnmanager` as Qbox's recipe does |
| 11 | `install.sh:72-81` | Copies a non-existent `[defaultmaps]` folder and skips `[gameplay]` (which holds `chat`); lines 72-75 are dead code | Copy `[gameplay]`; delete the dead code |
| 12 | `docker-compose.yml:28` | If `server.cfg.local` is missing at first `up`, Docker creates a directory in its place | Ship `server-data/server.cfg.local.example`; `install.sh` stops with a clear message until the real file exists |
| 13 | OneSync | qbx_core requires `onesync_enableInfinity`; its own error says to pass `+set onesync on` on the command line | Add it to the `Dockerfile` CMD and `scripts/start.sh` |
| 14 | Voice | A voice convar is set but no voice resource is installed | Install and ensure `pma-voice` |

## P1 — Exploits and security

- **Racing unlimited money** (`syndicate-racing/server/main.lua:38-106`).
  `acceptChallenge` trusts the client's `challengerSrc` and `bet`;
  `RemoveMoney` results are ignored but the pot is credited; `finishLine`
  does not check the sender is a participant and trusts the client's time.
  Fix: record `pendingChallenges[target] = {from, bet, strip, expires}` in
  `challenge` (bet validated against `RacingConfig` limits there); `accept`
  reads everything from that record, re-checks both balances, and refunds and
  aborts unless both `RemoveMoney` calls succeed. `finishLine` requires the
  sender to be `p1` or `p2`, one finish per player, and computes elapsed time
  from a server-stamped start. Refund on `playerDropped` and on timeout.
- **Meets repeatable reward** (`syndicate-meets/server/main.lua:66-73`).
  `INSERT IGNORE` returns `insertId` 0 on a duplicate and `if not id` is false
  for 0, so every repeat check-in pays again. Fix: treat 0 as "already checked
  in"; also require the meet to be open and the player to be within range of
  the location, checked server-side.
- **Meets vote minting** (`server/main.lua:121-199`). `category` is not
  whitelisted and voter/target are not checked as attendees. Fix: whitelist
  against `MeetConfig`, require both to be checked in, one vote per voter per
  category, pay only configured categories.
- **Clubs join without invite** (`syndicate-clubs/server/main.lua:101-116`).
  Fix: server-side `pendingInvites[citizenId] = clubId`, re-check member count
  on accept, add `UNIQUE(citizen_id)` to `syndicate_club_members`.
- **Clubs role checks** (`server/main.lua:167-193`). Officers can kick the
  owner and other officers. Fix: target-role checks; enforce `MaxOfficers`.
- **Stored XSS in NUI** (`syndicate-clubs/html/app.js:33-42`,
  `syndicate-meets/html/app.js:30-35, 52-68, 116-121`). Names go into
  `innerHTML` and inline `onclick` strings. Fix: build DOM nodes with
  `textContent` and `addEventListener`; validate club name and tag on the
  server (type, length, character set).
- **Database exposed** (`docker-compose.yml:46-51`). MariaDB is published on
  `0.0.0.0:3307` with passwords committed to this public repo, and published
  Docker ports bypass ufw. Fix: remove the `ports:` block (or bind
  `127.0.0.1`), move all passwords to a gitignored `.env` with a committed
  `.env.example`, and remove the literal passwords from `docs/deploy.md` and
  `docs/windows-setup.md`. Use the `server=…;uid=…;password=…` connection
  string form so special characters are safe.
- **CI deploy** (`.github/workflows/deploy.yml`). Wrong path
  (`/srv/syndicaterp` vs the documented `~/syndicate-rp`), calls a txAdmin
  endpoint that does not exist, triggers on website-only pushes, secret check
  only greps one file. Fix: `git pull && bash scripts/install.sh &&
  docker compose restart fivem` in the documented path; add a `paths:` filter
  for server files; grep the whole repo for `cfxk_`; make the Lua lint step
  blocking only if you get it passing, otherwise leave `continue-on-error`.

## P2 — Make clubs, meets and the HUD work

Clubs
- `server/db.lua:47,54,61`: `exports.oxmysql:fetchSingle` does not exist. Use
  `MySQL.single` / `MySQL.query` (same bug in `syndicate-meets/server/db.lua:60`
  and `scheduler.lua:32`).
- `server/db.lua:72` and `syndicate-meets/server/db.lua:83`: `->>` is not
  supported by MariaDB. Use `JSON_UNQUOTE(JSON_EXTRACT(...))`.
- Create tables in order with `MySQL.query.await` so foreign keys do not race.
- `fxmanifest.lua:19` lists a missing `client/ui.lua`.
- Add a `/clubs` command as a fallback to the `ox_target` NPC.
- Invites have no UI or command; the member list is never rendered; kick and
  set-role callbacks are never called from `app.js`. Wire all of these.
- `client/main.lua:25-35`: `lib.alertDialog` returns a string, not a promise.
- `server/main.lua:58-60`: club data is sent before the async refresh finishes.
- `server/main.lua:232-237`: cache is refreshed on player load but never pushed
  to the client; it is not rebuilt on resource restart; the logout handler
  listens for an event qbx_core never fires (verify the correct unload event).
- `server/main.lua:51-56`: pre-check name/tag uniqueness before charging the
  creation fee. Line 205 mentions a `/transferclub` command that does not
  exist: implement it or change the message.

Meets
- `server/main.lua:20, 85, 229` and `scheduler.lua:28,37`: the permission
  guard assumes `source == 0` for server-triggered events, which never holds,
  and uses a non-existent `TriggerNetEvent`. So no meet can ever open. Extract
  `OpenMeet(locationId, startedBy)` and `StartVoting(meetId)` as local
  functions called by the scheduler and by ACE-restricted commands.
- `server/main.lua:63`: uses client-only natives on the server. Have the
  client send the vehicle model name and validate it as a short string.
- `client/zone.lua:26`: `exports.ox_zones` does not exist (use `lib.zones` or
  remove). Line 55 reads a variable that is `local` in another file. Line 10
  reads `locationId` but DB-loaded meets carry `location_id`.
- `client/main.lua:43-54`: voting is broadcast to every player with
  `SetNuiFocus(true,true)` and the voting view has no close control, so every
  player on the server loses input. Send only to attendees, add a close button
  and Esc handler, always release focus on close and on `meetEnded`.
- `server/main.lua:148`: zero votes leaves the meet stuck in `voting`. End it.
  Clear stale `open`/`voting` rows at boot.
- Scheduler timezone: the image has no `tzdata`, so `TZ` is likely ignored.
  Install `tzdata` in the image.

HUD
- `fxmanifest.lua` lists missing `client/events.lua` and `server/main.lua`.
- `client/main.lua:62`: listens for an event qbx_core does not fire, so job,
  needs and money never initialise. Lines 53-60 treat the money delta as the
  balance. Use qbx_core's player-data module and read balances from it.
- Line 31: NUI message every frame while driving. Throttle to ~100 ms. Hide
  the HUD until the player has loaded a character.

Housekeeping
- `syndicate-config`: its `Config` global is unreachable from other resources
  and its car list names models that do not exist. Either export it and have
  the other resources read it, or reduce it to what is used. Do not leave two
  sources of truth silently disagreeing.
- `syndicate-cars`: manifest references missing meta files and the resource is
  not ensured. Fix the manifest so it loads empty-but-valid, and make
  `docs/cars.md` complete (including the `ensure`).
- `syndicate-handling`: entries list ~10 fields each; a partial handling entry
  may zero the rest and make those cars undrivable. This cannot be confirmed
  here. Comment out its `ensure` with a note to test one car first.
- `scripts/update.sh:13`: wrong find depth, updates nothing. `install.sh:49`
  wipes resource folders on every run, destroying local config edits: skip
  resources that already exist unless `--force` is passed.
- Add a `.dockerignore` (`website`, `.git`, `server-data/resources`).

## P3 — Racing client (the site's headline feature)

`syndicate-racing` has a server but no client and no UI; its manifest lists
files that do not exist. Build a working client using `ox_lib` only (no NUI):
- `/race [playerId] [bet]` opens an `ox_lib` input dialog when args are
  omitted; the target gets an accept/decline dialog with the bet shown.
- Both players must be in a vehicle near a strip start from `RacingConfig`.
- Countdown, false-start detection, finish detection at the strip's end
  coordinate; the client reports "crossed", the server decides the result.
- `/leaderboard` shows the top results in an `ox_lib` context menu.
- Fix `leaderboard.lua:7` so winner and loser are both citizen ids.
- Remove the non-existent files from the manifest.
If this cannot be finished to the P1 security standard, leave
`ensure syndicate-racing` commented out and say so.

## P4 — Docs match reality

Fix every place the docs contradict the scripts:
- `docs/setup.md`: placeholders that no longer exist, no mention of
  `server.cfg.local` or `setup-db.sh`, a txAdmin URL although the scripts
  bypass txAdmin, a Tebex secret placed in the committed `server.cfg`, a
  directory tree listing folders that do not exist.
- `README.md`: clubs and meets marked "coming soon"; quick start edits the
  wrong file.
- `docs/deploy.md`: stray `</content></invoke>` text at the end; txAdmin
  references; missing SQL import and package install steps; the false claim
  that ufw restricts Docker-published ports; missing `DEPLOYMENT_ENABLED`.
- `docs/managed-host.md`: both SQL files are required.
- `docs/visual-setup.md`: says Vice Cry is already streamed; it is not.
- Label the two flows clearly everywhere: Docker (DB host `mariadb`) and bare
  metal (DB host `localhost`).
- Add `docs/go-live-checklist.md`: the ordered steps only the owner can do
  (host, license key and slot tier, DB passwords, admin identifier, Discord
  invite, Tebex slug, banner images, manual map/car downloads, GitHub
  secrets), then the first-boot checks to run.
- Add `docs/gta6-pc-readiness.md`, short and factual: as of 2026-11-20 no PC
  version of GTA VI is announced and no multiplayer platform supports it;
  which parts of this project carry over when that changes (brand, Discord
  community, economy and club/meet design, DB data, website) and which do not
  (Lua resources, handling, maps).

## Acceptance

- Every Lua file under `server-data/resources/syndicate-*` passes a syntax
  check (install `lua`/`luacheck` via Homebrew if absent; note any FiveM-only
  syntax the checker rejects).
- `bash -n` passes on every script; `docker compose config` is valid; the
  workflow YAML parses. If Docker is available, attempt `docker build` and
  report the result as observed.
- Every `ensure` in `server.cfg` names a resource that either lives in this
  repo or is installed by `install.sh`; every file named in a custom
  `fxmanifest.lua` exists.
- No client-supplied amount, player id, or category reaches a money or
  membership change unvalidated: list each net event and how it is guarded.
- No literal password or key in the repo (`git grep` for the old passwords and
  `cfxk_` is clean).
- Report: what was fixed per section, what was disabled and why, each upstream
  fact that differed from this spec, and a plain list of what is unverified
  because it needs a running server.
