# Syndicate RP — Visual Setup Guide (GTA VI Aesthetic)

This guide turns GTA V into the GTA VI Vice City experience.
**Send this to every player who joins the server.**

---

## Overview

| Layer | What it does | Who installs |
|---|---|---|
| Vice Cry: Remastered | Adds the full Vice City map | Server (already streamed) |
| NaturalVision Evolved | Reworks lighting, weather, water | Each player |
| QuantV | Lighter visual overhaul (low-end PCs) | Each player (alternative) |
| Syndicate Handling | Cinematic vehicle physics | Automatic (server-side) |
| Syndicate HUD | GTA VI Vice City UI | Automatic (server-side) |

The map and handling are automatic — just join and they work.
The visual overhaul (NVE or QuantV) is your choice based on your PC.

---

## Step 1 — Vice City Map

Nothing to install. When you join Syndicate RP, Vice Cry: Remastered streams automatically. You'll see the full Vice City map added to the world: Ocean Beach, Downtown Vice City, Little Havana, Starfish Island, and more.

---

## Step 2 — Visual Overhaul (choose one)

### Option A — NaturalVision Evolved (high-end, recommended)

Best looking. Requires a mid-to-high-end GPU (GTX 1070 / RX 5700 or better).

1. Subscribe to [Razed's Patreon](https://www.patreon.com/razedmods) (Bronze tier, ~$5/mo — cancel after download)
2. Download the latest NVE package
3. Navigate to your FiveM application folder:
   ```
   %localappdata%\FiveM\FiveM.app\
   ```
4. Copy the `mods` and `plugins` folders from the NVE package into that directory
5. Launch FiveM and join Syndicate RP

> Do NOT install NVE into your base GTA V directory — FiveM uses its own mods folder.

### Option B — QuantV (free, works on lower-end PCs)

1. Download QuantV from [gta5-mods.com](https://www.gta5-mods.com) (search "QuantV")
2. Same install path: copy files into `%localappdata%\FiveM\FiveM.app\mods\`
3. Launch FiveM

> Do NOT use NVE and QuantV together — pick one.

---

## Step 3 — Verify it's working

Once in-game with NVE:
- Weather should look dramatically more realistic (volumetric clouds, god rays)
- Night should have proper light bloom and wet road reflections
- Water should have realistic wave simulation
- The Vice City map should be visible on your minimap to the southeast

---

## Troubleshooting

**Game crashes on launch after installing NVE:**
- Make sure you copied files to the FiveM mods folder, NOT the GTA V folder
- Remove `dinput8.dll` from your GTA V root if it exists (conflicts with FiveM)

**FPS drops significantly:**
- Switch to QuantV (lighter)
- In NVE settings, disable Volumetric Clouds and Extra Vegetation

**Vice City map not appearing:**
- Make sure you're connected to Syndicate RP (it's server-streamed, not local)
- Check that your FiveM cache is up to date: Settings → Clear cache

---

## GTA VI Color Reference

The Syndicate RP HUD is built around the official GTA VI Vice City palette:

| Role | Hex | Where you see it |
|---|---|---|
| Sunset coral | `#FF6B35` | Speedometer, health bar glow |
| Neon pink | `#FF2D78` | Health bar accent, notifications |
| Ocean teal | `#00D4C8` | Cash, thirst bar |
| Palm gold | `#FFB800` | Warnings, VIP tier labels |

---

*Credits: Vice Cry: Remastered by the Vice Cry team. NVE by Razed. QuantV by QuantV team.*
