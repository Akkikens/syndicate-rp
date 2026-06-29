-- Automatic weekly meet scheduler
-- Fires every Saturday at the configured hour (server time)

if not MeetConfig.WeeklyMeet.enabled then return end

local function GetServerDayOfWeek()
    -- Lua's os.date: 0=Sunday … 6=Saturday
    return tonumber(os.date('%w'))
end

local function GetServerHour()
    return tonumber(os.date('%H'))
end

local scheduledThisWeek = false

CreateThread(function()
    while true do
        Wait(60 * 1000) -- check every minute

        local day  = GetServerDayOfWeek()
        local hour = GetServerHour()
        local cfg  = MeetConfig.WeeklyMeet

        if day == cfg.dayOfWeek and hour == cfg.startHour and not scheduledThisWeek then
            scheduledThisWeek = true
            print('[syndicate-meets] Scheduler: opening weekly meet at ' .. cfg.locationId)
            TriggerEvent('syndicate-meets:server:open', cfg.locationId)

            -- Auto-close after duration
            SetTimeout(cfg.durationMins * 60 * 1000, function()
                exports.oxmysql:fetchSingle(
                    "SELECT id FROM syndicate_meets WHERE location_id = ? AND status != 'ended' LIMIT 1",
                    { cfg.locationId },
                    function(meet)
                        if meet then
                            TriggerEvent('syndicate-meets:server:startVoting', meet.id)
                        end
                    end
                )
            end)
        end

        -- Reset flag when Saturday ends
        if day ~= cfg.dayOfWeek then
            scheduledThisWeek = false
        end
    end
end)
