RacingConfig = {}

-- Drag strip locations (vector4: x, y, z, heading)
-- NOTE: these coordinates are placeholders that have NOT been checked in-game.
-- Stand on each start line and use a coords tool to confirm them before launch.
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

RacingConfig.Countdown = 3             -- seconds before race start
RacingConfig.StartRadius = 25.0        -- both racers must be this close to a strip's start line
RacingConfig.FinishRadius = 30.0       -- server accepts a finish only this close to the finish line
RacingConfig.ChallengeTimeoutSecs = 30 -- pending challenge expires
RacingConfig.RaceTimeoutSecs = 120     -- race with no finisher is cancelled and bets refunded

RacingConfig.Rewards = {
    winnerPercent = 90,  -- winner gets 90% of pot (10% house cut)
}

-- Leaderboard: top N rows kept in the query; the in-game menu shows LeaderboardShown
RacingConfig.LeaderboardSize = 100
RacingConfig.LeaderboardShown = 15
