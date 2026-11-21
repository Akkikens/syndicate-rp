-- Syndicate RP — Main Config
-- Edit these values to configure your server

Config = {}

-- ── Server Identity ──────────────────────────────
Config.ServerName     = "Syndicate RP"
Config.DiscordUrl     = "https://discord.gg/REPLACE"
Config.TebexUrl       = "https://syndicaterp.tebex.io"
Config.WebsiteUrl     = "https://syndicaterp.gg"

-- ── Economy ───────────────────────────────────────
Config.StartingMoney  = 5000          -- Cash on new character
Config.StartingBank   = 2500          -- Bank on new character
Config.PaycheckTimer  = 10            -- Minutes between job paychecks

-- ── VIP Tiers ─────────────────────────────────────
-- Matches Tebex subscription tiers
Config.VIPTiers = {
    crew = {
        label       = "Crew",
        garageSlots = 10,
        platePrefixes = { "SYN" },
        queuePriority = 1,
    },
    vip = {
        label       = "VIP",
        garageSlots = 20,
        platePrefixes = { "VIP", "SYN" },
        queuePriority = 2,
        exclusiveCars = true,
    },
    elite = {
        label       = "Elite",
        garageSlots = 50,
        platePrefixes = { "ELITE", "VIP", "SYN" },
        queuePriority = 3,
        exclusiveCars = true,
        monthlyCarDrop = true,
    },
    founder = {
        label       = "Founder",
        garageSlots = 100,
        platePrefixes = { "FOUND", "ELITE", "VIP", "SYN" },
        queuePriority = 10,
        exclusiveCars = true,
        monthlyCarDrop = true,
        loadingScreenCredit = true,
    },
}

-- Racing, car clubs and car meets are configured inside their own resources
-- (syndicate-racing/shared/config.lua, syndicate-clubs/shared/config.lua,
-- syndicate-meets/shared/config.lua). They are deliberately NOT duplicated here so
-- there is a single source of truth.
