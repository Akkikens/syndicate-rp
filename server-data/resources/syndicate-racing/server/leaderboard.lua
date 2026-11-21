-- Schema (idempotent). Runs sequentially so later statements can rely on earlier ones.
CreateThread(function()
    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `syndicate_race_history` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `winner_id`   VARCHAR(50) NOT NULL,
            `loser_id`    VARCHAR(50) NOT NULL,
            `bet`         INT NOT NULL DEFAULT 0,
            `payout`      INT NOT NULL DEFAULT 0,
            `race_time`   FLOAT NOT NULL DEFAULT 0,
            `strip`       INT NOT NULL DEFAULT 1,
            `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_winner (`winner_id`),
            INDEX idx_created (`created_at`)
        )
    ]])
    -- Older installs created loser_id as INT; both ids are citizen ids (strings).
    MySQL.query.await('ALTER TABLE `syndicate_race_history` MODIFY `loser_id` VARCHAR(50) NOT NULL')
end)

-- Top racers by win count. A callback (not a free-form event) so only the caller gets the data.
-- Per-player cooldown stops a client hammering the database.
local lastRequest = {}

lib.callback.register('syndicate-racing:getLeaderboard', function(source)
    local now = GetGameTimer()
    if lastRequest[source] and now - lastRequest[source] < 3000 then return {} end
    lastRequest[source] = now

    local rows = MySQL.query.await([[
        SELECT h.winner_id AS citizenid,
               COUNT(*) AS wins,
               MIN(h.race_time) AS best_time,
               SUM(h.payout) AS total_earned,
               MAX(CONCAT(
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), ' ',
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname')))) AS name
        FROM syndicate_race_history h
        LEFT JOIN players p ON p.citizenid = h.winner_id
        GROUP BY h.winner_id
        ORDER BY wins DESC, best_time ASC
        LIMIT ?
    ]], { RacingConfig.LeaderboardSize })

    local shown = {}
    for i = 1, math.min(#(rows or {}), RacingConfig.LeaderboardShown) do
        local r = rows[i]
        shown[i] = {
            name = r.name or r.citizenid,
            wins = r.wins,
            bestTime = r.best_time,
            totalEarned = r.total_earned,
        }
    end
    return shown
end)

AddEventHandler('playerDropped', function()
    lastRequest[source] = nil
end)
