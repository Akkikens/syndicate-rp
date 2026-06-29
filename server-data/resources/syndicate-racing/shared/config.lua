RacingConfig = {}

-- Drag strip locations (vector4: x, y, z, heading)
RacingConfig.Strips = {
    {
        label   = "LS International Strip",
        start1  = vector4(-2325.0, 3138.0, 32.7, 180.0),
        start2  = vector4(-2329.0, 3138.0, 32.7, 180.0),
        finish  = vector4(-2327.0, 3450.0, 32.7, 0.0),
        length  = "Quarter Mile",
    },
    {
        label   = "East Vinewood Strip",
        start1  = vector4(580.0, -1600.0, 28.3, 0.0),
        start2  = vector4(586.0, -1600.0, 28.3, 0.0),
        finish  = vector4(583.0, -1200.0, 28.3, 0.0),
        length  = "Quarter Mile",
    },
}

RacingConfig.BetLimits = {
    min = 500,
    max = 50000,
}

RacingConfig.Countdown = 3       -- seconds before race start
RacingConfig.MaxLaunchTime = 10  -- seconds to make launch before forfeit
RacingConfig.ReactionWindowMs = 500  -- perfect launch window in ms

RacingConfig.Rewards = {
    winnerPercent = 90,  -- winner gets 90% of pot (10% house cut)
}

-- Leaderboard: top N per category
RacingConfig.LeaderboardSize = 100
