-- Server-authoritative drag racing.
-- Clients only say "I challenge X for $N", "I accept", "I crossed the line" and
-- "I false-started". Everything else (strip, bet, balances, positions, timing,
-- result, payout) comes from server state.

local pendingChallenges = {}  -- targetSrc -> { from, fromCid, bet, strip, expires }
local activeRaces = {}        -- raceId -> race
local playerRace = {}         -- src -> raceId
local nextRaceId = 0

local function Notify(src, kind, msg)
    lib.notify(src, { type = kind, description = msg })
end

local function GetPlayer(src)
    return exports.qbx_core:GetPlayer(src)
end

local function Dist(a, b)
    local dx, dy, dz = a.x - b.x, a.y - b.y, a.z - b.z
    return math.sqrt(dx * dx + dy * dy + dz * dz)
end

local function PedCoords(src)
    local ped = GetPlayerPed(src)
    if not ped or ped == 0 then return nil end
    return GetEntityCoords(ped)
end

local function InVehicle(src)
    local ped = GetPlayerPed(src)
    return ped and ped ~= 0 and GetVehiclePedIsIn(ped, false) ~= 0
end

local function IsBusy(src)
    if playerRace[src] then return true end
    if pendingChallenges[src] then return true end
    for _, c in pairs(pendingChallenges) do
        if c.from == src then return true end
    end
    return false
end

-- Strip whose start line both racers are standing at, or nil.
local function FindStrip(srcA, srcB)
    local a, b = PedCoords(srcA), PedCoords(srcB)
    if not a or not b then return nil end
    for index, strip in ipairs(RacingConfig.Strips) do
        local near = function(c)
            return Dist(c, strip.start1) <= RacingConfig.StartRadius
                or Dist(c, strip.start2) <= RacingConfig.StartRadius
        end
        if near(a) and near(b) then return index end
    end
    return nil
end

-- Money -----------------------------------------------------------------------

local function Cash(src)
    return exports.qbx_core:GetMoney(src, 'cash') or 0
end

local function Refund(race)
    for _, p in ipairs(race.players) do
        if p.charged then
            -- By citizen id so the refund also reaches players who just disconnected.
            exports.qbx_core:AddMoney(p.cid, 'cash', race.bet, 'racing-refund')
            p.charged = false
        end
    end
end

local function EndRace(raceId)
    local race = activeRaces[raceId]
    if not race then return end
    for _, p in ipairs(race.players) do
        if playerRace[p.src] == raceId then playerRace[p.src] = nil end
    end
    activeRaces[raceId] = nil
end

local function AbortRace(raceId, reason)
    local race = activeRaces[raceId]
    if not race or race.state == 'done' then return end
    race.state = 'done'
    Refund(race)
    for _, p in ipairs(race.players) do
        TriggerClientEvent('syndicate-racing:client:raceAborted', p.src, reason)
    end
    EndRace(raceId)
end

local function FinishRace(raceId, winnerIdx, elapsed)
    local race = activeRaces[raceId]
    if not race or race.state == 'done' then return end
    race.state = 'done'

    local winner = race.players[winnerIdx]
    local loser = race.players[winnerIdx == 1 and 2 or 1]
    local payout = math.floor(race.pot * (RacingConfig.Rewards.winnerPercent / 100))

    local paid = exports.qbx_core:AddMoney(winner.cid, 'cash', payout, 'racing-win')
    if not paid then
        -- Could not pay out: give everyone their stake back instead of eating it.
        Refund(race)
        for _, p in ipairs(race.players) do
            TriggerClientEvent('syndicate-racing:client:raceAborted', p.src, 'Payout failed - bets refunded.')
        end
        EndRace(raceId)
        return
    end
    winner.charged, loser.charged = false, false

    TriggerClientEvent('syndicate-racing:client:raceResult', winner.src, { won = true, payout = payout, time = elapsed })
    TriggerClientEvent('syndicate-racing:client:raceResult', loser.src, { won = false, payout = 0, time = elapsed })

    MySQL.insert(
        'INSERT INTO syndicate_race_history (winner_id, loser_id, bet, payout, race_time, strip) VALUES (?, ?, ?, ?, ?, ?)',
        { winner.cid, loser.cid, race.bet, payout, elapsed, race.strip }
    )
    EndRace(raceId)
end

-- Challenge -------------------------------------------------------------------

-- Client sends: target player id, bet. The strip is chosen by the server from where both stand.
RegisterNetEvent('syndicate-racing:server:challenge', function(targetSrc, bet)
    local src = source
    local Player = GetPlayer(src)
    if not Player then return end

    targetSrc = math.tointeger(tonumber(targetSrc))
    bet = math.tointeger(tonumber(bet))   -- rejects NaN, inf, fractions, non-numbers
    if not targetSrc or not bet then return end
    if targetSrc == src then return Notify(src, 'error', "You can't race yourself.") end

    local Target = GetPlayer(targetSrc)
    if not Target then return Notify(src, 'error', 'Player not found.') end

    if bet < RacingConfig.BetLimits.min or bet > RacingConfig.BetLimits.max then
        return Notify(src, 'error', ('Bet must be between $%s and $%s'):format(
            RacingConfig.BetLimits.min, RacingConfig.BetLimits.max))
    end
    if Cash(src) < bet then return Notify(src, 'error', 'Not enough cash.') end
    if Cash(targetSrc) < bet then return Notify(src, 'error', 'They do not have enough cash.') end
    if IsBusy(src) or IsBusy(targetSrc) then
        return Notify(src, 'error', 'You or they are already in a challenge or race.')
    end
    if not InVehicle(src) or not InVehicle(targetSrc) then
        return Notify(src, 'error', 'Both racers must be in a vehicle.')
    end
    local strip = FindStrip(src, targetSrc)
    if not strip then
        return Notify(src, 'error', 'Both racers must be at the same strip start line.')
    end

    pendingChallenges[targetSrc] = {
        from = src,
        fromCid = Player.PlayerData.citizenid,
        bet = bet,
        strip = strip,
        expires = GetGameTimer() + RacingConfig.ChallengeTimeoutSecs * 1000,
    }

    TriggerClientEvent('syndicate-racing:client:receiveChallenge', targetSrc, {
        challengerName = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname,
        bet = bet,
        stripLabel = RacingConfig.Strips[strip].label,
        timeoutSecs = RacingConfig.ChallengeTimeoutSecs,
    })
    Notify(src, 'inform', 'Challenge sent.')

    local sent = pendingChallenges[targetSrc]
    SetTimeout(RacingConfig.ChallengeTimeoutSecs * 1000 + 1000, function()
        if pendingChallenges[targetSrc] == sent then
            pendingChallenges[targetSrc] = nil
            Notify(src, 'inform', 'Challenge expired.')
        end
    end)
end)

RegisterNetEvent('syndicate-racing:server:declineChallenge', function()
    local src = source
    local c = pendingChallenges[src]
    if not c then return end
    pendingChallenges[src] = nil
    Notify(c.from, 'inform', 'Challenge declined.')
end)

-- Accept: every input comes from the pending record, never from the client.
RegisterNetEvent('syndicate-racing:server:acceptChallenge', function()
    local src = source
    local c = pendingChallenges[src]
    if not c then return end
    pendingChallenges[src] = nil          -- consume first so a double-fire cannot run twice

    if GetGameTimer() > c.expires then return Notify(src, 'error', 'That challenge expired.') end

    local Challenger, Acceptor = GetPlayer(c.from), GetPlayer(src)
    if not Challenger or not Acceptor or Challenger.PlayerData.citizenid ~= c.fromCid then
        return Notify(src, 'error', 'The challenger is no longer available.')
    end
    if playerRace[c.from] or playerRace[src] then return end
    if not InVehicle(c.from) or not InVehicle(src) then
        Notify(c.from, 'error', 'Both racers must be in a vehicle.')
        return Notify(src, 'error', 'Both racers must be in a vehicle.')
    end
    if FindStrip(c.from, src) ~= c.strip then
        Notify(c.from, 'error', 'Both racers must stay at the start line.')
        return Notify(src, 'error', 'Both racers must stay at the start line.')
    end

    local bet = c.bet
    if Cash(c.from) < bet or Cash(src) < bet then
        Notify(c.from, 'error', 'Not enough cash to cover the bet.')
        return Notify(src, 'error', 'Not enough cash to cover the bet.')
    end

    -- Charge both. If either fails, refund the one that was charged and abort.
    local acceptorCid = Acceptor.PlayerData.citizenid
    if not exports.qbx_core:RemoveMoney(c.from, 'cash', bet, 'racing-bet') then
        Notify(c.from, 'error', 'Could not take your bet.')
        return Notify(src, 'error', 'Race cancelled.')
    end
    if not exports.qbx_core:RemoveMoney(src, 'cash', bet, 'racing-bet') then
        exports.qbx_core:AddMoney(c.fromCid, 'cash', bet, 'racing-refund')
        Notify(c.from, 'error', 'Race cancelled - bet refunded.')
        return Notify(src, 'error', 'Could not take your bet.')
    end

    nextRaceId = nextRaceId + 1
    local raceId = nextRaceId
    local startAt = GetGameTimer() + RacingConfig.Countdown * 1000
    local race = {
        id = raceId,
        bet = bet,
        pot = bet * 2,
        strip = c.strip,
        state = 'countdown',
        startAt = startAt,
        players = {
            { src = c.from, cid = c.fromCid, charged = true, finished = false },
            { src = src, cid = acceptorCid, charged = true, finished = false },
        },
    }
    activeRaces[raceId] = race
    playerRace[c.from], playerRace[src] = raceId, raceId

    local strip = RacingConfig.Strips[c.strip]
    for position, p in ipairs(race.players) do
        TriggerClientEvent('syndicate-racing:client:raceStart', p.src, {
            raceId = raceId,
            position = position,
            slot = position == 1 and strip.start1 or strip.start2,
            finish = strip.finish,
            label = strip.label,
            countdown = RacingConfig.Countdown,
        })
    end

    SetTimeout(RacingConfig.Countdown * 1000, function()
        local r = activeRaces[raceId]
        if r and r.state == 'countdown' then r.state = 'running' end
    end)
    SetTimeout(RacingConfig.RaceTimeoutSecs * 1000, function()
        AbortRace(raceId, 'Race timed out - bets refunded.')
    end)
end)

-- A false start forfeits the race: the opponent wins. Only counts for the sender.
RegisterNetEvent('syndicate-racing:server:falseStart', function()
    local src = source
    local race = activeRaces[playerRace[src]]
    if not race or race.state ~= 'countdown' then return end
    local winnerIdx = race.players[1].src == src and 2 or 1
    FinishRace(race.id, winnerIdx, 0.0)
end)

-- The client reports it crossed the line; the server checks participation, race state,
-- one finish per player and the player's real position, and stamps the time itself.
RegisterNetEvent('syndicate-racing:server:finishLine', function()
    local src = source
    local race = activeRaces[playerRace[src]]
    if not race or race.state ~= 'running' then return end

    local idx
    for i, p in ipairs(race.players) do
        if p.src == src then idx = i end
    end
    if not idx or race.players[idx].finished then return end

    local coords = PedCoords(src)
    local finish = RacingConfig.Strips[race.strip].finish
    if not coords or Dist(coords, finish) > RacingConfig.FinishRadius then return end

    race.players[idx].finished = true
    local elapsed = (GetGameTimer() - race.startAt) / 1000.0
    if elapsed < 0 then elapsed = 0.0 end
    FinishRace(race.id, idx, elapsed)   -- first valid crossing wins a drag race
end)

-- Disconnects ----------------------------------------------------------------

AddEventHandler('playerDropped', function()
    local src = source
    pendingChallenges[src] = nil
    for target, c in pairs(pendingChallenges) do
        if c.from == src then pendingChallenges[target] = nil end
    end
    local raceId = playerRace[src]
    if raceId then AbortRace(raceId, 'Your opponent left - bets refunded.') end
end)

-- Character switch/logout also ends the player's race and challenges.
AddEventHandler('QBCore:Server:OnPlayerUnload', function(src)
    pendingChallenges[src] = nil
    for target, c in pairs(pendingChallenges) do
        if c.from == src then pendingChallenges[target] = nil end
    end
    local raceId = playerRace[src]
    if raceId then AbortRace(raceId, 'Your opponent left - bets refunded.') end
end)

-- Refund anything in flight if the resource is stopped.
AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    for raceId in pairs(activeRaces) do
        AbortRace(raceId, 'Racing was restarted - bets refunded.')
    end
end)
