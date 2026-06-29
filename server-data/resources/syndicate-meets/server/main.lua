DB = {}

local activeVoting = {} -- meetId → { category → { citizenId → true } }

local function Notify(src, type, msg)
    TriggerClientEvent('ox_lib:notify', src, { type = type, description = msg })
end

local function BroadcastMeetChat(msg)
    TriggerClientEvent('chat:addMessage', -1, {
        color   = { 0, 230, 118 },
        multiline = true,
        args    = { MeetConfig.ChatPrefix, msg },
    })
end

-- ── Open a Meet ───────────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:open', function(locationId)
    local src = source
    if not IsPlayerAceAllowed(tostring(src), 'command.meetopen') and src ~= 0 then
        return Notify(src, 'error', 'No permission.')
    end

    local loc = nil
    for _, l in ipairs(MeetConfig.Locations) do
        if l.id == locationId then loc = l; break end
    end
    if not loc then return Notify(src, 'error', 'Invalid location.') end

    DB.GetActiveMeet(locationId, function(existing)
        if existing then
            return Notify(src, 'error', 'A meet is already active at that location.')
        end

        local startedBy = src == 0 and 'scheduler' or tostring(src)
        DB.CreateMeet(locationId, loc.label, startedBy, function(meetId)
            if not meetId then return Notify(src, 'error', 'Failed to create meet.') end

            BroadcastMeetChat(('A car meet is now open at %s! Head over to check in.'):format(loc.label))
            TriggerClientEvent('syndicate-meets:client:meetOpened', -1, {
                id         = meetId,
                locationId = locationId,
                label      = loc.label,
                coords     = loc.coords,
            })
            print(('[syndicate-meets] Meet opened: %s (id %d) by %s'):format(loc.label, meetId, startedBy))
        end)
    end)
end)

-- ── Check In ──────────────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:checkIn', function(meetId)
    local src    = source
    local Player = exports.qbx_core:GetPlayer(src)
    if not Player then return end

    local citizenId = Player.PlayerData.citizenid
    local ped       = GetPlayerPed(src)
    local vehNet    = GetVehiclePedIsIn(ped, false)
    local vehModel  = nil

    if vehNet ~= 0 then
        vehModel = GetDisplayNameFromVehicleModel(GetEntityModel(NetToVeh(vehNet)))
    end

    DB.CheckIn(meetId, citizenId, vehModel, function(id)
        if not id then
            return Notify(src, 'warning', 'Already checked in.')
        end

        -- Attendance reward
        Player.Functions.AddMoney('cash', MeetConfig.Rewards.attendanceCash, 'meet-attendance')
        Notify(src, 'success', ('Checked in! +$%s attendance reward.'):format(MeetConfig.Rewards.attendanceCash))

        -- Refresh attendee list for all nearby
        DB.GetAttendees(meetId, function(attendees)
            TriggerClientEvent('syndicate-meets:client:attendeesUpdated', -1, meetId, attendees)
        end)
    end)
end)

-- ── Start Voting ──────────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:startVoting', function(meetId)
    local src = source
    if not IsPlayerAceAllowed(tostring(src), 'command.meetvote') and src ~= 0 then
        return Notify(src, 'error', 'No permission.')
    end

    DB.GetAttendees(meetId, function(attendees)
        if #attendees < 2 then
            return Notify(src, 'error', 'Need at least 2 attendees to vote.')
        end

        activeVoting[meetId] = {}
        for _, cat in ipairs(MeetConfig.Voting.categoryes) do
            activeVoting[meetId][cat] = {}
        end

        exports.oxmysql:query(
            "UPDATE syndicate_meets SET status = 'voting' WHERE id = ?",
            { meetId }
        )

        TriggerClientEvent('syndicate-meets:client:votingStarted', -1, {
            meetId     = meetId,
            categories = MeetConfig.Voting.categoryes,
            attendees  = attendees,
            duration   = MeetConfig.Voting.voteDurationSecs,
        })

        BroadcastMeetChat(('Voting is open! %d seconds to vote for Best Build, Cleanest Color, Most Unique & Best Sound.'):format(MeetConfig.Voting.voteDurationSecs))

        -- Auto-close after duration
        SetTimeout(MeetConfig.Voting.voteDurationSecs * 1000, function()
            TriggerEvent('syndicate-meets:server:closeVoting', meetId)
        end)
    end)
end)

-- ── Cast Vote ─────────────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:vote', function(meetId, targetCitizenId, category)
    local src       = source
    local Player    = exports.qbx_core:GetPlayer(src)
    if not Player then return end

    local citizenId = Player.PlayerData.citizenid
    if citizenId == targetCitizenId then
        return Notify(src, 'error', "Can't vote for yourself.")
    end

    if not activeVoting[meetId] then
        return Notify(src, 'error', 'Voting is not open.')
    end

    DB.CastVote(meetId, citizenId, targetCitizenId, category, function(id)
        if not id then
            return Notify(src, 'warning', 'You already voted in that category.')
        end
        Notify(src, 'success', ('Vote cast in "%s".'):format(category))
    end)
end)

-- ── Close Voting & Award ──────────────────────────────────
AddEventHandler('syndicate-meets:server:closeVoting', function(meetId)
    activeVoting[meetId] = nil

    DB.GetVoteResults(meetId, function(results)
        if not results or #results == 0 then return end

        -- Winner per category
        local categoryWinners = {}
        local totalVotes      = {}

        for _, row in ipairs(results) do
            totalVotes[row.target_id] = (totalVotes[row.target_id] or 0) + row.votes
            if not categoryWinners[row.category] then
                categoryWinners[row.category] = row.target_id
            end
        end

        -- Best in show = most total votes
        local bestInShow, bestVotes = nil, 0
        for cid, votes in pairs(totalVotes) do
            if votes > bestVotes then
                bestInShow = cid
                bestVotes  = votes
            end
        end

        -- Pay category winners
        for category, winnerId in pairs(categoryWinners) do
            for _, playerSrc in ipairs(GetPlayers()) do
                local P = exports.qbx_core:GetPlayer(tonumber(playerSrc))
                if P and P.PlayerData.citizenid == winnerId then
                    P.Functions.AddMoney('cash', MeetConfig.Rewards.categoryWinCash, 'meet-category-win')
                    TriggerClientEvent('ox_lib:notify', tonumber(playerSrc), {
                        type = 'success',
                        description = ('You won "%s" at the car meet! +$%s'):format(category, MeetConfig.Rewards.categoryWinCash),
                    })
                end
            end
        end

        -- Pay best in show
        if bestInShow then
            for _, playerSrc in ipairs(GetPlayers()) do
                local P = exports.qbx_core:GetPlayer(tonumber(playerSrc))
                if P and P.PlayerData.citizenid == bestInShow then
                    P.Functions.AddMoney('cash', MeetConfig.Rewards.bestInShowCash, 'meet-best-in-show')
                    DB.AwardBadge(bestInShow, MeetConfig.Rewards.bestInShowBadge, meetId)
                    TriggerClientEvent('ox_lib:notify', tonumber(playerSrc), {
                        type = 'success',
                        description = ('You won Best in Show! +$%s + badge earned.'):format(MeetConfig.Rewards.bestInShowCash),
                    })
                    break
                end
            end
            BroadcastMeetChat(('Voting closed! Best in Show goes to citizen #%s — congrats!'):format(bestInShow))
        end

        DB.EndMeet(meetId, function()
            TriggerClientEvent('syndicate-meets:client:meetEnded', -1, meetId)
        end)
    end)
end)

-- ── Get Active Meets ──────────────────────────────────────
RegisterNetEvent('syndicate-meets:server:getActive', function()
    local src = source
    exports.oxmysql:fetch(
        "SELECT * FROM syndicate_meets WHERE status != 'ended'",
        {},
        function(rows)
            TriggerClientEvent('syndicate-meets:client:activeMeets', src, rows or {})
        end
    )
end)

-- ── Staff commands ────────────────────────────────────────
RegisterCommand('meetopen', function(src, args)
    local locationId = args[1]
    if not locationId then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = 'Usage: /meetopen [locationId]' })
        return
    end
    TriggerEvent('syndicate-meets:server:open', locationId)
    -- src=0 means console, otherwise it's a player
    if src ~= 0 then
        TriggerNetEvent('syndicate-meets:server:open', locationId)
    end
end, false)

RegisterCommand('meetvote', function(src, args)
    local meetId = tonumber(args[1])
    if not meetId then return end
    TriggerEvent('syndicate-meets:server:startVoting', meetId)
end, false)
