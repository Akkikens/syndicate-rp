-- Create table on resource start if not exists
CreateThread(function()
    exports.oxmysql:query([[
        CREATE TABLE IF NOT EXISTS `syndicate_race_history` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `winner_id`   VARCHAR(50) NOT NULL,
            `loser_id`    INT NOT NULL,
            `bet`         INT NOT NULL DEFAULT 0,
            `payout`      INT NOT NULL DEFAULT 0,
            `race_time`   FLOAT NOT NULL DEFAULT 0,
            `strip`       INT NOT NULL DEFAULT 1,
            `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_winner (`winner_id`),
            INDEX idx_created (`created_at`)
        )
    ]])
end)

-- Return top N racers by win count
RegisterNetEvent('syndicate-racing:server:getLeaderboard', function()
    local src = source
    exports.oxmysql:fetch([[
        SELECT
            winner_id,
            COUNT(*) as wins,
            MIN(race_time) as best_time,
            SUM(payout) as total_earned
        FROM syndicate_race_history
        GROUP BY winner_id
        ORDER BY wins DESC
        LIMIT ?
    ]], { RacingConfig.LeaderboardSize }, function(rows)
        TriggerClientEvent('syndicate-racing:client:receiveLeaderboard', src, rows)
    end)
end)
