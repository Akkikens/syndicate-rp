DB = {}

-- Cache: citizenId → club data (refreshed on join/leave)
local playerClubCache = {}

local function GetCitizenId(src)
    local Player = exports.qbx_core:GetPlayer(src)
    return Player and Player.PlayerData.citizenid or nil
end

local function Notify(src, type, msg)
    TriggerClientEvent('ox_lib:notify', src, { type = type, description = msg })
end

local function RefreshCache(citizenId, cb)
    DB.GetPlayerClub(citizenId, function(club)
        playerClubCache[citizenId] = club
        if cb then cb(club) end
    end)
end

-- ── Create Club ───────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:create', function(name, tag)
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end

    -- Already in a club?
    if playerClubCache[citizenId] then
        return Notify(src, 'error', 'You are already in a club. Leave first.')
    end

    -- Validate tag
    if not tag:match(ClubConfig.TagAllowedChars) or #tag > ClubConfig.TagMaxLength then
        return Notify(src, 'error', ('Tag must be 1–%d uppercase letters/numbers.'):format(ClubConfig.TagMaxLength))
    end

    -- Server club cap
    DB.GetAllClubs(function(clubs)
        if #clubs >= ClubConfig.MaxClubs then
            return Notify(src, 'error', 'Server club limit reached.')
        end

        -- Charge creation fee
        local Player = exports.qbx_core:GetPlayer(src)
        if Player.PlayerData.money.cash < ClubConfig.CreationCost then
            return Notify(src, 'error', ('You need $%s to found a club.'):format(ClubConfig.CreationCost))
        end
        Player.Functions.RemoveMoney('cash', ClubConfig.CreationCost, 'club-creation')

        DB.CreateClub(name, tag, citizenId, function(clubId)
            if not clubId then
                -- Name or tag already taken — refund
                Player.Functions.AddMoney('cash', ClubConfig.CreationCost, 'club-creation-refund')
                return Notify(src, 'error', 'Club name or tag already taken.')
            end

            RefreshCache(citizenId)
            Notify(src, 'success', ('Club "%s" [%s] founded!'):format(name, tag))
            TriggerClientEvent('syndicate-clubs:client:clubUpdated', src, playerClubCache[citizenId])
            print(('[syndicate-clubs] %s founded club "%s" [%s]'):format(citizenId, name, tag))
        end)
    end)
end)

-- ── Invite Player ─────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:invite', function(targetSrc)
    local src       = source
    local citizenId = GetCitizenId(src)
    local club      = playerClubCache[citizenId]

    if not club then return Notify(src, 'error', 'You are not in a club.') end
    if club.role ~= 'owner' and club.role ~= 'officer' then
        return Notify(src, 'error', 'Only owners and officers can invite.')
    end

    DB.GetClubMembers(club.id, function(members)
        if #members >= ClubConfig.MaxMembers then
            return Notify(src, 'error', 'Club is full.')
        end

        local targetCitizenId = GetCitizenId(targetSrc)
        if not targetCitizenId then return Notify(src, 'error', 'Player not found.') end

        if playerClubCache[targetCitizenId] then
            return Notify(src, 'error', 'That player is already in a club.')
        end

        -- Send invite to target client
        TriggerClientEvent('syndicate-clubs:client:receiveInvite', targetSrc, {
            clubId   = club.id,
            clubName = club.name,
            clubTag  = club.tag,
            inviterSrc = src,
        })
        Notify(src, 'success', 'Invite sent.')
    end)
end)

-- ── Accept Invite ─────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:acceptInvite', function(clubId)
    local src       = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end

    if playerClubCache[citizenId] then
        return Notify(src, 'error', 'You are already in a club.')
    end

    DB.AddMember(clubId, citizenId, 'member', function()
        RefreshCache(citizenId, function(club)
            Notify(src, 'success', ('Welcome to %s!'):format(club and club.name or 'the club'))
            TriggerClientEvent('syndicate-clubs:client:clubUpdated', src, club)
        end)
    end)
end)

-- ── Leave Club ────────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:leave', function()
    local src       = source
    local citizenId = GetCitizenId(src)
    local club      = playerClubCache[citizenId]

    if not club then return Notify(src, 'error', 'You are not in a club.') end

    if club.role == 'owner' then
        return Notify(src, 'error', 'Transfer ownership or disband the club before leaving.')
    end

    DB.RemoveMember(club.id, citizenId, function()
        playerClubCache[citizenId] = nil
        Notify(src, 'success', 'You left the club.')
        TriggerClientEvent('syndicate-clubs:client:clubUpdated', src, nil)
    end)
end)

-- ── Disband Club ──────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:disband', function()
    local src       = source
    local citizenId = GetCitizenId(src)
    local club      = playerClubCache[citizenId]

    if not club or club.role ~= 'owner' then
        return Notify(src, 'error', 'Only the club owner can disband.')
    end

    -- Notify all online members before deleting
    local players = GetPlayers()
    for _, playerSrc in ipairs(players) do
        local cid = GetCitizenId(tonumber(playerSrc))
        if cid and playerClubCache[cid] and playerClubCache[cid].id == club.id then
            playerClubCache[cid] = nil
            TriggerClientEvent('ox_lib:notify', tonumber(playerSrc), {
                type = 'warning',
                description = ('Club "%s" has been disbanded.'):format(club.name),
            })
            TriggerClientEvent('syndicate-clubs:client:clubUpdated', tonumber(playerSrc), nil)
        end
    end

    DB.DisbandClub(club.id, function()
        print(('[syndicate-clubs] Club "%s" disbanded by %s'):format(club.name, citizenId))
    end)
end)

-- ── Kick Member ───────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:kick', function(targetCitizenId)
    local src       = source
    local citizenId = GetCitizenId(src)
    local club      = playerClubCache[citizenId]

    if not club then return Notify(src, 'error', 'You are not in a club.') end
    if club.role ~= 'owner' and club.role ~= 'officer' then
        return Notify(src, 'error', 'Only owners and officers can kick.')
    end
    if targetCitizenId == citizenId then return Notify(src, 'error', "Can't kick yourself.") end

    DB.RemoveMember(club.id, targetCitizenId, function()
        playerClubCache[targetCitizenId] = nil
        Notify(src, 'success', 'Member removed.')
        -- Notify the kicked player if online
        local players = GetPlayers()
        for _, playerSrc in ipairs(players) do
            if GetCitizenId(tonumber(playerSrc)) == targetCitizenId then
                TriggerClientEvent('ox_lib:notify', tonumber(playerSrc), {
                    type = 'error', description = 'You were removed from the club.',
                })
                TriggerClientEvent('syndicate-clubs:client:clubUpdated', tonumber(playerSrc), nil)
                break
            end
        end
    end)
end)

-- ── Promote/Demote ────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:setRole', function(targetCitizenId, newRole)
    local src       = source
    local citizenId = GetCitizenId(src)
    local club      = playerClubCache[citizenId]

    if not club or club.role ~= 'owner' then
        return Notify(src, 'error', 'Only the owner can change roles.')
    end
    if newRole == 'owner' then
        return Notify(src, 'error', 'Use /transferclub to transfer ownership.')
    end
    if not (newRole == 'officer' or newRole == 'member') then return end

    DB.UpdateMemberRole(club.id, targetCitizenId, newRole, function()
        -- Update cache for target if online
        for _, playerSrc in ipairs(GetPlayers()) do
            if GetCitizenId(tonumber(playerSrc)) == targetCitizenId then
                RefreshCache(targetCitizenId, function(updatedClub)
                    TriggerClientEvent('syndicate-clubs:client:clubUpdated', tonumber(playerSrc), updatedClub)
                end)
                break
            end
        end
        Notify(src, 'success', ('Role updated to %s.'):format(newRole))
    end)
end)

-- ── Get Club List ─────────────────────────────────────────
RegisterNetEvent('syndicate-clubs:server:getAll', function()
    local src = source
    DB.GetAllClubs(function(clubs)
        TriggerClientEvent('syndicate-clubs:client:receiveAll', src, clubs)
    end)
end)

-- ── Player Connect: hydrate cache ─────────────────────────
AddEventHandler('QBCore:Server:PlayerLoaded', function(Player)
    local citizenId = Player.PlayerData.citizenid
    RefreshCache(citizenId)
end)

AddEventHandler('QBCore:Server:PlayerLogout', function(src)
    local citizenId = GetCitizenId(src)
    if citizenId then playerClubCache[citizenId] = nil end
end)

-- ── Export: get a player's club (used by syndicate-meets) ─
exports('GetPlayerClub', function(src)
    local citizenId = GetCitizenId(src)
    return citizenId and playerClubCache[citizenId] or nil
end)
