local activeRaces = {}

-- Challenge another player to a drag race
RegisterNetEvent('syndicate-racing:server:challenge', function(targetSrc, bet, stripIndex)
    local src = source
    local Player = exports.qbx_core:GetPlayer(src)
    local Target = exports.qbx_core:GetPlayer(targetSrc)

    if not Player or not Target then return end

    -- Validate bet
    local cash = Player.PlayerData.money.cash
    if bet < RacingConfig.BetLimits.min or bet > RacingConfig.BetLimits.max then
        TriggerClientEvent('ox_lib:notify', src, {
            type = 'error',
            description = ('Bet must be between $%s and $%s'):format(
                RacingConfig.BetLimits.min, RacingConfig.BetLimits.max
            )
        })
        return
    end

    if cash < bet then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = "Not enough cash." })
        return
    end

    -- Send challenge to target
    TriggerClientEvent('syndicate-racing:client:receiveChallenge', targetSrc, {
        challengerSrc = src,
        challengerName = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname,
        bet = bet,
        stripIndex = stripIndex,
    })
end)

-- Target accepts challenge
RegisterNetEvent('syndicate-racing:server:acceptChallenge', function(challengerSrc, bet, stripIndex)
    local src = source
    local Challenger = exports.qbx_core:GetPlayer(challengerSrc)
    local Acceptor   = exports.qbx_core:GetPlayer(src)

    if not Challenger or not Acceptor then return end

    -- Deduct bets from both
    Challenger.Functions.RemoveMoney('cash', bet, 'racing-bet')
    Acceptor.Functions.RemoveMoney('cash', bet, 'racing-bet')

    local raceId = tostring(challengerSrc) .. '_' .. tostring(src) .. '_' .. os.time()
    activeRaces[raceId] = {
        p1 = challengerSrc,
        p2 = src,
        bet = bet,
        strip = stripIndex,
        pot = bet * 2,
        startTime = nil,
    }

    -- Tell both clients to go to starting line
    TriggerClientEvent('syndicate-racing:client:raceStart', challengerSrc, { raceId = raceId, position = 1, strip = RacingConfig.Strips[stripIndex] })
    TriggerClientEvent('syndicate-racing:client:raceStart', src,           { raceId = raceId, position = 2, strip = RacingConfig.Strips[stripIndex] })
end)

-- Client reports finish
RegisterNetEvent('syndicate-racing:server:finishLine', function(raceId, time)
    local src = source
    local race = activeRaces[raceId]
    if not race then return end

    if not race.p1Finish then
        race.p1Finish = { src = src, time = time }
    elseif not race.p2Finish then
        race.p2Finish = { src = src, time = time }
    else
        return
    end

    -- Both finished — determine winner
    if race.p1Finish and race.p2Finish then
        local winner, loser
        if race.p1Finish.time < race.p2Finish.time then
            winner = race.p1Finish.src
            loser  = race.p2Finish.src
        else
            winner = race.p2Finish.src
            loser  = race.p1Finish.src
        end

        local payout = math.floor(race.pot * (RacingConfig.Rewards.winnerPercent / 100))
        local Winner = exports.qbx_core:GetPlayer(winner)
        if Winner then
            Winner.Functions.AddMoney('cash', payout, 'racing-win')
        end

        TriggerClientEvent('syndicate-racing:client:raceResult', winner, { won = true,  payout = payout })
        TriggerClientEvent('syndicate-racing:client:raceResult', loser,  { won = false, payout = 0 })

        -- Save to leaderboard
        exports.oxmysql:insert(
            'INSERT INTO syndicate_race_history (winner_id, loser_id, bet, payout, race_time, strip) VALUES (?, ?, ?, ?, ?, ?)',
            { Winner and Winner.PlayerData.citizenid or 'unknown', loser, race.bet, payout, math.min(race.p1Finish.time, race.p2Finish.time), race.strip }
        )

        activeRaces[raceId] = nil
    end
end)
