# Syndicate RP — Car Pack Setup

## Step 1 — Download the packs

### IVPack (recommended first — all fictional, zero DMCA risk)
- **URL:** https://www.gta5-mods.com/vehicles/ivpack-gtaiv-vehicles-in-gtav
- **Rating:** 4.53/5 stars, 227k+ downloads
- **What it is:** GTA IV iconic cars ported to GTA V as add-ons
- Extract into: `server-data/resources/syndicate-cars/stream/ivpack/`

### chappmdq FiveM-Optimized-CarPack (189 cars, handling pre-tuned)
- **URL:** https://github.com/chappmdq/FiveM-Optimized-CarPack
- **What it is:** 189 cars/bikes with FiveM handling files already set
- Extract into: `server-data/resources/syndicate-cars/stream/optimized/`

### CFX Luxury Pack (4 premium hero cars)
- **URL:** https://forum.cfx.re/t/release-add-on-high-quality-luxury-car-pack/235479
- **What it is:** 4 high-quality luxury cars (Nissan GTR, BMW M5, Porsche Cayenne, Audi A4)
- Extract into: `server-data/resources/syndicate-cars/stream/premium/`

---

## Step 2 — Register each car

For every `.yft` file you add to `stream/`, you need to:

### 1. Add to `fxmanifest.lua` stream block
```lua
stream {
    ['sultan2.yft']    = 'stream/ivpack/sultan2.yft',
    ['sultan2.ytd']    = 'stream/ivpack/sultan2.ytd',
    ['sultan2_hi.yft'] = 'stream/ivpack/sultan2_hi.yft',
}
```

### 2. Add to `data/vehicles.meta`
Copy the template from the file and fill in `modelName`, `vehicleClass`, etc.

### 3. Add to `syndicate-config/config/cars.lua`
```lua
Config.Cars['sultan2'] = {
    label    = 'Sultan Classic',
    category = 'sports',
    price    = 45000,
    vipTier  = nil,  -- nil = everyone, 'vip' = VIP+ only
}
```

---

## VIP-Exclusive Cars

Set `vipTier = 'vip'` (or `'elite'`, `'founder'`) to lock a car behind a subscription tier.
These cars won't appear in the regular dealership — only in the VIP garage menu.

---

## DMCA Safety

| Pack | Risk level | Notes |
|---|---|---|
| IVPack | ✅ Safe | All GTA fictional names |
| chappmdq pack | ⚠️ Mixed | Some real-world models — use with caution |
| CFX Luxury | ⚠️ Real-world | BMW, Porsche, Audi, Nissan — monitor for DMCA |
| Your original cars | ✅ Safe | Commission originals for long-term safety |
