MeetConfig = {}

-- ── Meet Locations ────────────────────────────────────────
MeetConfig.Locations = {
    {
        id      = 'ls_car_meet',
        label   = 'LS Car Meet',
        coords  = vector3(928.0, -2033.0, 30.1),
        radius  = 80.0,
        blip    = { sprite = 326, color = 2, scale = 0.8 },
        capacity = 32,
    },
    {
        id      = 'vinewood_hills',
        label   = 'Vinewood Hills Lookout',
        coords  = vector3(-435.0, 140.0, 65.4),
        radius  = 60.0,
        blip    = { sprite = 326, color = 5, scale = 0.8 },
        capacity = 20,
    },
    {
        id      = 'east_ls_strip',
        label   = 'East LS Industrial',
        coords  = vector3(580.0, -1600.0, 28.3),
        radius  = 70.0,
        blip    = { sprite = 326, color = 1, scale = 0.8 },
        capacity = 24,
    },
    {
        id      = 'chumash_pier',
        label   = 'Chumash Pier',
        coords  = vector3(-3173.0, 1095.0, 20.8),
        radius  = 50.0,
        blip    = { sprite = 326, color = 3, scale = 0.8 },
        capacity = 16,
    },
}

-- ── Scheduled Weekly Meet ────────────────────────────────
-- Automatically opens every Saturday at the featured location
MeetConfig.WeeklyMeet = {
    enabled      = true,
    dayOfWeek    = 6,      -- 0=Sun, 6=Sat
    startHour    = 20,     -- 8 PM server time
    durationMins = 120,
    locationId   = 'ls_car_meet',
    announcement = "The weekly Syndicate Car Meet is starting! Head to the LS Car Meet.",
}

-- ── Voting ────────────────────────────────────────────────
MeetConfig.Voting = {
    enabled         = true,
    categoryes      = { 'Best Build', 'Cleanest Color', 'Most Unique', 'Best Sound' },
    voteDurationSecs = 180,   -- voting open for 3 minutes
    cooldownMins    = 30,     -- player can't vote again for 30 mins
}

-- ── Rewards ───────────────────────────────────────────────
MeetConfig.Rewards = {
    -- Winner of each category at weekly meet
    categoryWinCash   = 5000,
    -- 'Best in Show' (most total votes across all categories)
    bestInShowCash    = 25000,
    bestInShowBadge   = 'best_in_show',  -- cosmetic badge identifier
    -- Attendance reward (just showing up)
    attendanceCash    = 500,
}

-- ── Announcements ─────────────────────────────────────────
MeetConfig.AnnounceRadius = 500.0    -- blips appear within this distance
MeetConfig.ChatPrefix     = "^2[Car Meet]^7"
