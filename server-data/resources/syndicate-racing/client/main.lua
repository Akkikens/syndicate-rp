-- Racing client: commands and dialogs (ox_lib only, no NUI).
-- The client never decides anything about money or results; it only asks the server.

local function InVehicle()
    return GetVehiclePedIsIn(PlayerPedId(), false) ~= 0
end

-- /race [playerId] [bet]
RegisterCommand('race', function(_, args)
    if not InVehicle() then
        return lib.notify({ type = 'error', description = 'Get in a vehicle at a strip start line first.' })
    end

    local targetId = tonumber(args[1])
    local bet = tonumber(args[2])

    if not targetId or not bet then
        local input = lib.inputDialog('Drag race challenge', {
            { type = 'number', label = 'Player ID', required = true, min = 1 },
            { type = 'number', label = 'Bet ($)', required = true,
              min = RacingConfig.BetLimits.min, max = RacingConfig.BetLimits.max, default = RacingConfig.BetLimits.min },
        })
        if not input then return end
        targetId, bet = input[1], input[2]
    end

    TriggerServerEvent('syndicate-racing:server:challenge', targetId, bet)
end, false)

-- Incoming challenge: accept / decline dialog with the bet shown.
RegisterNetEvent('syndicate-racing:client:receiveChallenge', function(data)
    -- lib.alertDialog blocks until answered. With a timeout it raises, hence pcall.
    -- It returns nil if another dialog is already open: treat that as a decline.
    local ok, result = pcall(lib.alertDialog, {
        header = 'Drag race challenge',
        content = ('**%s** challenges you to a drag race at **%s**.\n\nBet: **$%s** each. Winner takes 90%% of the pot.\n\nAccept?'):format(
            data.challengerName, data.stripLabel, data.bet),
        centered = true,
        cancel = true,
        labels = { confirm = 'Accept', cancel = 'Decline' },
    }, (data.timeoutSecs or 30) * 1000)

    if ok and result == 'confirm' then
        TriggerServerEvent('syndicate-racing:server:acceptChallenge')
    else
        TriggerServerEvent('syndicate-racing:server:declineChallenge')
    end
end)

-- /leaderboard
RegisterCommand('leaderboard', function()
    local rows = lib.callback.await('syndicate-racing:getLeaderboard', false)
    if not rows or #rows == 0 then
        return lib.notify({ type = 'inform', description = 'No races recorded yet.' })
    end

    local options = {}
    for i, r in ipairs(rows) do
        options[#options + 1] = {
            title = ('%d. %s'):format(i, r.name),
            description = ('%d wins  |  best %.2fs  |  earned $%s'):format(r.wins, r.bestTime or 0, r.totalEarned or 0),
            readOnly = true,
        }
    end
    lib.registerContext({ id = 'syndicate_race_leaderboard', title = 'Drag Race Leaderboard', options = options })
    lib.showContext('syndicate_race_leaderboard')
end, false)

TriggerEvent('chat:addSuggestion', '/race', 'Challenge a player to a drag race', {
    { name = 'playerId', help = 'Server ID of the player (optional)' },
    { name = 'bet', help = 'Cash bet (optional)' },
})
TriggerEvent('chat:addSuggestion', '/leaderboard', 'Show the drag race leaderboard')
