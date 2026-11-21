# Syndicate RP — Car Pack Setup

`syndicate-cars` ships **empty but valid**: `data/vehicles.meta` has no cars in it, and
the resource is **not ensured** in `server.cfg` until you add your first car (step 5).
The old placeholder car list in `syndicate-config` was removed because it named models
that are not installed.

## Step 1 — Download the packs

### IVPack (all fictional names)
- **URL:** https://www.gta5-mods.com/vehicles/ivpack-gtaiv-vehicles-in-gtav
- GTA IV cars ported to GTA V as add-ons.

### chappmdq FiveM-Optimized-CarPack (189 cars, handling pre-tuned)
- **URL:** https://github.com/chappmdq/FiveM-Optimized-CarPack

### CFX Luxury Pack (4 premium hero cars)
- **URL:** https://forum.cfx.re/t/release-add-on-high-quality-luxury-car-pack/235479
- Real-world brands: see the DMCA table below.

Check each pack's own README for its license and for which files it ships.

---

## Step 2 — Put the model files in `stream/`

FiveM streams everything inside a folder named `stream/` automatically. There is **no**
`stream { }` block in the manifest. Create the folder and drop the files in:

```
server-data/resources/syndicate-cars/stream/sultan2.yft
server-data/resources/syndicate-cars/stream/sultan2.ytd
server-data/resources/syndicate-cars/stream/sultan2_hi.yft
```

(Sub-folders inside `stream/` are fine, e.g. `stream/ivpack/`.)

## Step 3 — Register each car

1. **`data/vehicles.meta`** — copy the `<Item>` template from the comment at the top of
   the file into `<InitDatas>`, and set `modelName`, `txdName`, `handlingId`, `gameName`,
   `vehicleClass`. `modelName` must match the `.yft` file name.
2. **Handling / variations** — if the pack ships `handling.meta`, `carvariations.meta`
   or `carcols.meta`, copy them into `data/` and uncomment the matching lines in
   `fxmanifest.lua` (`files { }` and `data_file ...`). Each file you reference must exist,
   or the resource fails to load.
3. **`syndicate-config/config/cars.lua`**, for VIP gating and pricing:
   ```lua
   Config.Cars['sultan2'] = {
       label    = 'Sultan Classic',
       category = 'sports',
       price    = 45000,
       vipTier  = nil,  -- nil = everyone, or 'crew' / 'vip' / 'elite' / 'founder'
   }
   ```

## Step 4 — Enable the resource

Add this line to `server-data/server.cfg` (anywhere in the "Gameplay Core" area, after `qbx_core`):

```cfg
ensure syndicate-cars
```

## Step 5 — Restart and test

```bash
docker compose restart fivem
```

Spawn the car in-game with the admin vehicle command and drive it. Test **one** car before
adding the rest. The same advice applies to `syndicate-handling`, which is disabled in
`server.cfg` until a single car has been tested with it.

---

## VIP-exclusive cars

Set `vipTier = 'vip'` (or `'elite'`, `'founder'`) in `config/cars.lua` to mark a car as
tier-gated. Note that nothing in this repo yet *enforces* the gate; `Config.GetAccessibleCars(tier)`
is a helper for a future dealership resource.

---

## DMCA safety

| Pack | Risk level | Notes |
|---|---|---|
| IVPack | Low | GTA fictional names |
| chappmdq pack | Mixed | Some real-world models — use with caution |
| CFX Luxury | Real-world brands | BMW, Porsche, Audi, Nissan — monitor for DMCA |
| Your original cars | Safe | Commission originals for long-term safety |
