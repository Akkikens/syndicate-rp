-- Server-authoritative car meets.
-- Meets are opened/closed only by the scheduler or ACE-restricted staff commands via
-- Meets.Open / Meets.StartVoting (never by a client event). Check-in and votes are
-- validated against the database, the player's real position and MeetConfig.

Meets = {}

local activeVoting = {}   -- meetId -> true while voting is open
local busy = {}           -- src -> true while a check-in is in flight

local function Notify(src, kind, msg)
    lib.notify(src, { type = kind, description = msg })
end

local function BroadcastMeetChat(msg)
    TriggerClientEvent('chat:addMessage', -1, {
        color     = { 0, 230, 118 },
        multiline = true,
        args      = { MeetConfig.ChatPrefix, msg },
    })
end

local function GetPlayer(src)
    return exports.qbx_core:GetPlayer(src)
end

local function FindLocation(locationId)
    for _, l in ipairs(MeetConfig.Locations) do
        if l.id == locationId then return l end
    end
end

local function IsCategory(category)
    for _, c in ipairs(MeetConfig.Voting.categories) do
        if c == category then return true end
    end
    return false
end

-- Online sources for a list of citizen ids
local function SourcesFor(rows)
    local srcs = {}
    for _, row in ipairs(rows) do
        local P = exports.qbx_core:GetPlayerByCitizenId(row.citizen_id)
        if P then srcs[#srcs + 1] = P.PlayerData.source end
    end
    return srcs
end

-- Open a meet. Called by the scheduler and by /meetopen. Returns ok, message.
function Meets.Open(locationId, startedBy)
    DB.WaitReady()
    local loc = FindLocation(locationId)
    if not loc then return false, 'Invalid location.' end

    if DB.GetActiveMeetAt(locationId) then
        return false, 'A meet is already active at that location.'
    end

    local meetId = DB.CreateMeet(locationId, loc.label, startedBy)
    if not meetId then return false, 'Failed to create meet.' end

    BroadcastMeetChat(('A car meet is now open at %s! Head over to check in.'):format(loc.label))
    TriggerClientEvent('syndicate-meets:client:meetOpened', -1, {
        id         = meetId,
        locationId = locationId,
        label      = loc.label,
    })
    print(('[syndicate-meets] Meet opened: %s (id %d) by %s'):format(loc.label, meetId, startedBy))
    return true, meetId
end

-- ── Close voting & award ──────────────────────────────────
local function CloseVoting(meetId)
    activeVoting[meetId] = nil

    -- Atomic voting -> ended transition: only one caller proceeds, so rewards are paid once.
    if not DB.EndVotingMeet(meetId) then return end

    local results = DB.GetVoteResults(meetId)

    local categoryWinners, totalVotes = {}, {}
    for _, row in ipairs(results) do
        if IsCategory(row.category) then
            totalVotes[row.target_id] = (totalVotes[row.target_id] or 0) + row.votes
            if not categoryWinners[row.category] then
                categoryWinners[row.category] = row.target_id   -- rows are ordered by votes desc
            end
        end
    end

    local bestInShow, bestVotes = nil, 0
    for cid, votes in pairs(totalVotes) do
        if votes > bestVotes or (votes == bestVotes and bestInShow and cid < bestInShow) then
            bestInShow, bestVotes = cid, votes
        end
    end

    -- Pay by citizen id (works for players who went offline). Only configured categories pay.
    for category, winnerId in pairs(categoryWinners) do
        if exports.qbx_core:AddMoney(winnerId, 'cash', MeetConfig.Rewards.categoryWinCash, 'meet-category-win') then
            local P = exports.qbx_core:GetPlayerByCitizenId(winnerId)
            if P then
                Notify(P.PlayerData.source, 'success',
                    ('You won "%s" at the car meet! +$%s'):format(category, MeetConfig.Rewards.categoryWinCash))
            end
        end
    end

    if bestInShow then
        if exports.qbx_core:AddMoney(bestInShow, 'cash', MeetConfig.Rewards.bestInShowCash, 'meet-best-in-show') then
            DB.AwardBadge(bestInShow, MeetConfig.Rewards.bestInShowBadge, meetId)
            local P = exports.qbx_core:GetPlayerByCitizenId(bestInShow)
            if P then
                Notify(P.PlayerData.source, 'success',
                    ('You won Best in Show! +$%s + badge earned.'):format(MeetConfig.Rewards.bestInShowCash))
            end
        end
        BroadcastMeetChat(('Voting closed! Best in Show goes to citizen #%s - congrats!'):format(bestInShow))
    else
        BroadcastMeetChat('Voting closed with no votes. The meet has ended.')
    end

    TriggerClientEvent('syndicate-meets:client:meetEnded', -1, meetId)
end

-- Start voting for an open meet. Called by the scheduler and by /meetvote. Returns ok, message.
-- Always ends the meet if voting cannot run, so a meet is never stuck open.
function Meets.StartVoting(meetId)
    DB.WaitReady()
    local meet = DB.GetMeet(meetId)
    if not meet or meet.status ~= 'open' then return false, 'That meet is not open.' end

    local attendees = DB.GetAttendees(meetId)
    if not MeetConfig.Voting.enabled or #attendees < 2 then
        if DB.EndMeet(meetId) then
            BroadcastMeetChat(('The meet at %s has ended.'):format(meet.label))
            TriggerClientEvent('syndicate-meets:client:meetEnded', -1, meetId)
        end
        return false, 'Not enough attendees to vote - meet ended.'
    end

    if not DB.SetVoting(meetId) then return false, 'That meet is not open.' end
    activeVoting[meetId] = true

    -- Voting UI goes to attendees only
    local payload = {
        meetId     = meetId,
        categories = MeetConfig.Voting.categories,
        attendees  = attendees,
        duration   = MeetConfig.Voting.voteDurationSecs,
    }
    for _, src in ipairs(SourcesFor(attendees)) do
        TriggerClientEvent('syndicate-meets:client:votingStarted', src, payload)
    end

    BroadcastMeetChat(('Voting is open for attendees! %d seconds to vote: %s.'):format(
        MeetConfig.Voting.voteDurationSecs, table.concat(MeetConfig.Voting.categories, ', ')))

    SetTimeout(MeetConfig.Voting.voteDurationSecs * 1000, function()
        CloseVoting(meetId)
    end)
    return true
end

-- ── Check In ──────────────────────────────────────────────
-- Client sends: meet id, vehicle display name (string). Everything else is server state.
RegisterNetEvent('syndicate-meets:server:checkIn', function(meetId, vehicleName)
    local src = source
    if busy[src] then return end
    busy[src] = true

    local function done(kind, msg)
        busy[src] = nil
        if msg then Notify(src, kind, msg) end
    end

    local Player = GetPlayer(src)
    if not Player then return done() end
    local citizenId = Player.PlayerData.citizenid

    meetId = math.tointeger(tonumber(meetId))
    if not meetId then return done() end

    local meet = DB.GetMeet(meetId)
    if not meet or meet.status ~= 'open' then return done('error', 'That meet is not open.') end

    local loc = FindLocation(meet.location_id)
    if not loc then return done('error', 'Invalid location.') end

    -- Position check on the server
    local ped = GetPlayerPed(src)
    local coords = ped and ped ~= 0 and GetEntityCoords(ped) or nil
    if not coords then return done() end
    local dx, dy, dz = coords.x - loc.coords.x, coords.y - loc.coords.y, coords.z - loc.coords.z
    if math.sqrt(dx * dx + dy * dy + dz * dz) > loc.radius + MeetConfig.CheckInSlack then
        return done('error', 'You are too far from the meet to check in.')
    end

    if DB.CountAttendees(meetId) >= loc.capacity then
        return done('error', 'This meet is full.')
    end

    -- Vehicle name is client-supplied: accept only a short, plain model name
    if type(vehicleName) ~= 'string' or not vehicleName:match('^[%w_%-]+$') or #vehicleName > 32 then
        vehicleName = nil
    end

    -- Insert first; INSERT IGNORE returns insertId 0 for a repeat check-in, which pays nothing.
    if not DB.CheckIn(meetId, citizenId, vehicleName) then
        return done('warning', 'Already checked in.')
    end

    local paid = exports.qbx_core:AddMoney(src, 'cash', MeetConfig.Rewards.attendanceCash, 'meet-attendance')
    if paid then
        done('success', ('Checked in! +$%s attendance reward.'):format(MeetConfig.Rewards.attendanceCash))
    else
        done('success', 'Checked in!')
    end
end)

-- ── Cast Vote ─────────────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:vote', function(meetId, targetCitizenId, category)
    local src = source
    local Player = GetPlayer(src)
    if not Player then return end
    local citizenId = Player.PlayerData.citizenid

    meetId = math.tointeger(tonumber(meetId))
    if not meetId or not activeVoting[meetId] then
        return Notify(src, 'error', 'Voting is not open.')
    end
    -- Category must be one of the configured ones
    if type(category) ~= 'string' or not IsCategory(category) then return end
    if type(targetCitizenId) ~= 'string' or #targetCitizenId > 50 then return end
    if citizenId == targetCitizenId then return Notify(src, 'error', "Can't vote for yourself.") end

    -- Both voter and target must have checked in to this meet
    if not DB.IsAttendee(meetId, citizenId) then return Notify(src, 'error', 'You did not check in.') end
    if not DB.IsAttendee(meetId, targetCitizenId) then return Notify(src, 'error', 'That person is not at this meet.') end

    -- UNIQUE(meet, voter, category): one vote per voter per category
    if not DB.CastVote(meetId, citizenId, targetCitizenId, category) then
        return Notify(src, 'warning', 'You already voted in that category.')
    end
    Notify(src, 'success', ('Vote cast in "%s".'):format(category))
end)

-- ── Callbacks (only the caller gets the data) ─────────────
lib.callback.register('syndicate-meets:getActive', function()
    DB.WaitReady()
    local out = {}
    for _, row in ipairs(DB.GetActiveMeets()) do
        out[#out + 1] = { id = row.id, locationId = row.location_id, label = row.label, status = row.status }
    end
    return out
end)

lib.callback.register('syndicate-meets:getAttendees', function(_, meetId)
    meetId = math.tointeger(tonumber(meetId))
    if not meetId then return {} end
    local rows = DB.GetAttendees(meetId)
    local out = {}
    for _, r in ipairs(rows) do
        out[#out + 1] = { citizen_id = r.citizen_id, name = r.name, vehicle = r.vehicle }
    end
    return out
end)

AddEventHandler('playerDropped', function()
    busy[source] = nil
end)

-- ── Staff commands (restricted: ACE command.meetopen / command.meetvote) ──
local function Reply(src, kind, msg)
    if src == 0 then print('[syndicate-meets] ' .. msg) else Notify(src, kind, msg) end
end

RegisterCommand('meetopen', function(src, args)
    local locationId = args[1]
    if not locationId then return Reply(src, 'error', 'Usage: /meetopen [locationId]') end
    local ok, result = Meets.Open(locationId, src == 0 and 'console' or tostring(src))
    if not ok then Reply(src, 'error', result) end
end, true)

RegisterCommand('meetvote', function(src, args)
    local meetId = math.tointeger(tonumber(args[1]))
    if not meetId then return Reply(src, 'error', 'Usage: /meetvote [meetId]') end
    local ok, result = Meets.StartVoting(meetId)
    if not ok then Reply(src, 'error', result) end
end, true)
