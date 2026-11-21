-- Automatic weekly meet scheduler.
-- Opens the configured meet on the configured weekday/hour (server local time) by
-- calling Meets.Open directly, then starts voting after the configured duration.

if not MeetConfig.WeeklyMeet.enabled then return end

local scheduledThisWeek = false

CreateThread(function()
    DB.WaitReady()
    while true do
        Wait(60 * 1000) -- check every minute

        local cfg  = MeetConfig.WeeklyMeet
        local day  = tonumber(os.date('%w'))   -- 0 = Sunday ... 6 = Saturday
        local hour = tonumber(os.date('%H'))

        if day == cfg.dayOfWeek and hour == cfg.startHour and not scheduledThisWeek then
            scheduledThisWeek = true
            print('[syndicate-meets] Scheduler: opening weekly meet at ' .. cfg.locationId)
            local ok, result = Meets.Open(cfg.locationId, 'scheduler')

            if ok then
                local meetId = result
                if cfg.announcement then
                    TriggerClientEvent('chat:addMessage', -1, {
                        color = { 0, 230, 118 },
                        args  = { MeetConfig.ChatPrefix, cfg.announcement },
                    })
                end
                SetTimeout(cfg.durationMins * 60 * 1000, function()
                    -- Starts voting, or ends the meet if too few people checked in
                    Meets.StartVoting(meetId)
                end)
            else
                print('[syndicate-meets] Scheduler could not open meet: ' .. tostring(result))
            end
        end

        -- Reset the flag once the scheduled day is over
        if day ~= cfg.dayOfWeek then
            scheduledThisWeek = false
        end
    end
end)
