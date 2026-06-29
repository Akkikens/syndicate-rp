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

-- ── Racing ────────────────────────────────────────
Config.Racing = {
    betMin       = 500,
    betMax       = 50000,
    stripLocations = {
        -- Add drag strip coords here
        vector4(-100.0, -1600.0, 30.0, 0.0),
    },
}

-- ── Car Clubs ─────────────────────────────────────
Config.CarClubs = {
    maxMembers   = 20,
    creationCost = 25000,
    maxPerServer = 30,
}

-- ── Car Meets ─────────────────────────────────────
Config.CarMeets = {
    locations = {
        { label = "LS Car Meet", coords = vector3(928.0, -2032.0, 30.0) },
        { label = "Vinewood Hills", coords = vector3(-435.0, 140.0, 65.0) },
        { label = "East LS Strip", coords = vector3(580.0, -1600.0, 28.0) },
    },
    weeklyEventDay = "saturday",
}
