# GTA VI on PC — readiness

**Status as of 2026-11-20:** no PC version of GTA VI has been announced, and no multiplayer
platform (FiveM, RedM or any other) supports it. Re-check official Rockstar and Cfx.re
announcements before planning around this; this page records the project's assumptions, not
a prediction.

## What would carry over

| Asset | Why it carries over |
|---|---|
| Brand | Name, logo, identity and tone are platform-independent |
| Discord community | Players and staff follow the brand, not the game |
| Economy and club/meet design | Bet limits, club roles, weekly meet schedule, rewards and voting rules are game design, not code |
| Database data | Citizen ids, club membership, race history, badges are plain MariaDB rows and can be exported |
| Website | The site and its content are independent of the game server |

## What would not carry over

| Asset | Why |
|---|---|
| Lua resources (`syndicate-*`, Qbox, ox stack) | They target the GTA V natives and the FiveM runtime; a different game and platform means a rewrite |
| Handling files and vehicle meta | GTA V file formats and tuning values |
| Maps and streamed props (Vice City map, MLOs, ymaps) | GTA V asset formats |
| Third-party packs (cars, maps) | Licensed and built for GTA V |

## Practical advice

Keep game logic that is worth reusing (economy rules, role and permission models) documented
independently of the Lua, and keep player data exportable. Do not promise players a GTA VI
server on any date until a platform exists.
