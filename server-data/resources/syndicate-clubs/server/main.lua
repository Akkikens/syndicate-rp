-- Server-authoritative car clubs.
-- Clients may only ask for an action; role, membership, invites and counts all come
-- from server state (database + the caches below).

local playerClubCache = {}   -- citizenId -> club row (with .role) for ONLINE players
local cidBySrc = {}          -- src -> citizenId (so we can clean up on disconnect)
local pendingInvites = {}    -- invitee citizenId -> { clubId, fromCid, expires }
local busy = {}              -- src -> true while a create is in flight
local lastOverview = {}      -- src -> GetGameTimer() of last overview request

local ROLE_RANK = { owner = 3, officer = 2, member = 1 }

local function RoleCfg(role)
    for _, r in ipairs(ClubConfig.Roles) do
        if r.id == role then return r end
    end
end

local function Notify(src, kind, msg)
    lib.notify(src, { type = kind, description = msg })
end

local function GetPlayer(src)
    return exports.qbx_core:GetPlayer(src)
end

local function GetCitizenId(src)
    local Player = GetPlayer(src)
    return Player and Player.PlayerData.citizenid or nil
end

local function GetSrcByCitizenId(citizenId)
    local Player = exports.qbx_core:GetPlayerByCitizenId(citizenId)
    return Player and Player.PlayerData.source or nil
end

local function PlayerName(src)
    local Player = GetPlayer(src)
    if not Player then return 'Someone' end
    local ci = Player.PlayerData.charinfo
    return ('%s %s'):format(ci.firstname, ci.lastname)
end

-- Cache + push ---------------------------------------------------------------

local function Push(src, club)
    TriggerClientEvent('syndicate-clubs:client:clubUpdated', src, club)
end

-- Reload a player's club from the database, update the cache and push it to the client.
local function Refresh(citizenId)
    local club = DB.GetPlayerClub(citizenId)
    playerClubCache[citizenId] = club
    local src = GetSrcByCitizenId(citizenId)
    if src then Push(src, club) end
    return club
end

local function ClearCache(citizenId)
    playerClubCache[citizenId] = nil
    local src = GetSrcByCitizenId(citizenId)
    if src then Push(src, nil) end
end

-- Validation -----------------------------------------------------------------

local function ValidName(name)
    if type(name) ~= 'string' then return nil end
    name = name:gsub('^%s+', ''):gsub('%s+$', '')
    if #name < ClubConfig.NameMinLength or #name > ClubConfig.NameMaxLength then return nil end
    if not name:match(ClubConfig.NameAllowedChars) then return nil end
    return name
end

local function ValidTag(tag)
    if type(tag) ~= 'string' then return nil end
    tag = tag:upper()
    if #tag < 1 or #tag > ClubConfig.TagMaxLength then return nil end
    if not tag:match(ClubConfig.TagAllowedChars) then return nil end
    return tag
end

local function ValidCitizenId(cid)
    if type(cid) ~= 'string' or #cid < 1 or #cid > 50 then return nil end
    if not cid:match('^[%w]+$') then return nil end
    return cid
end

local function ValidPlayerId(id)
    id = math.tointeger(tonumber(id))
    if not id or id < 1 then return nil end
    return id
end

-- Create ---------------------------------------------------------------------

RegisterNetEvent('syndicate-clubs:server:create', function(name, tag)
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    if busy[src] then return end
    busy[src] = true

    local function done(kind, msg)
        busy[src] = nil
        if msg then Notify(src, kind, msg) end
    end

    name, tag = ValidName(name), ValidTag(tag)
    if not name then
        return done('error', ('Club name must be %d-%d characters: letters, numbers, spaces, - _ .'):format(
            ClubConfig.NameMinLength, ClubConfig.NameMaxLength))
    end
    if not tag then
        return done('error', ('Tag must be 1-%d uppercase letters/numbers.'):format(ClubConfig.TagMaxLength))
    end

    if DB.GetPlayerClub(citizenId) then
        return done('error', 'You are already in a club. Leave first.')
    end
    if DB.CountClubs() >= ClubConfig.MaxClubs then
        return done('error', 'Server club limit reached.')
    end
    -- Check uniqueness BEFORE charging the fee
    if DB.ClubExists(name, tag) then
        return done('error', 'Club name or tag already taken.')
    end

    if (exports.qbx_core:GetMoney(src, 'cash') or 0) < ClubConfig.CreationCost then
        return done('error', ('You need $%s to found a club.'):format(ClubConfig.CreationCost))
    end
    if not exports.qbx_core:RemoveMoney(src, 'cash', ClubConfig.CreationCost, 'club-creation') then
        return done('error', 'Payment failed.')
    end

    local clubId = DB.CreateClub(name, tag, citizenId)
    if not clubId then
        -- Lost a race for the name/tag: refund by citizen id
        exports.qbx_core:AddMoney(citizenId, 'cash', ClubConfig.CreationCost, 'club-creation-refund')
        return done('error', 'Club name or tag already taken. You were refunded.')
    end

    Refresh(citizenId)
    done('success', ('Club "%s" [%s] founded!'):format(name, tag))
    print(('[syndicate-clubs] %s founded club "%s" [%s]'):format(citizenId, name, tag))
end)

-- Invite ---------------------------------------------------------------------

RegisterNetEvent('syndicate-clubs:server:invite', function(targetSrc)
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end

    targetSrc = ValidPlayerId(targetSrc)
    if not targetSrc then return Notify(src, 'error', 'Invalid player id.') end
    if targetSrc == src then return Notify(src, 'error', "You can't invite yourself.") end

    local club = playerClubCache[citizenId]
    if not club then return Notify(src, 'error', 'You are not in a club.') end
    local cfg = RoleCfg(club.role)
    if not cfg or not cfg.canInvite then
        return Notify(src, 'error', 'Only owners and officers can invite.')
    end

    local targetCid = GetCitizenId(targetSrc)
    if not targetCid then return Notify(src, 'error', 'Player not found.') end
    if playerClubCache[targetCid] then
        return Notify(src, 'error', 'That player is already in a club.')
    end
    if DB.CountMembers(club.id) >= ClubConfig.MaxMembers then
        return Notify(src, 'error', 'Club is full.')
    end

    pendingInvites[targetCid] = {
        clubId = club.id,
        fromCid = citizenId,
        expires = GetGameTimer() + ClubConfig.InviteTimeoutSecs * 1000,
    }
    TriggerClientEvent('syndicate-clubs:client:receiveInvite', targetSrc, {
        clubName = club.name,
        clubTag = club.tag,
        inviterName = PlayerName(src),
        timeoutSecs = ClubConfig.InviteTimeoutSecs,
    })
    Notify(src, 'success', 'Invite sent.')
end)

-- Accept reads the club from the pending invite - the client sends nothing.
RegisterNetEvent('syndicate-clubs:server:acceptInvite', function()
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end

    local invite = pendingInvites[citizenId]
    if not invite then return Notify(src, 'error', 'You have no pending invite.') end
    pendingInvites[citizenId] = nil     -- consume before any await

    if GetGameTimer() > invite.expires then
        return Notify(src, 'error', 'That invite expired.')
    end
    if playerClubCache[citizenId] or DB.GetPlayerClub(citizenId) then
        return Notify(src, 'error', 'You are already in a club.')
    end
    local club = DB.GetClubById(invite.clubId)
    if not club then return Notify(src, 'error', 'That club no longer exists.') end
    if DB.CountMembers(club.id) >= ClubConfig.MaxMembers then
        return Notify(src, 'error', 'That club is full.')
    end

    if not DB.AddMember(club.id, citizenId, 'member') then
        return Notify(src, 'error', 'Could not join the club.')
    end
    Refresh(citizenId)
    Notify(src, 'success', ('Welcome to %s!'):format(club.name))
end)

RegisterNetEvent('syndicate-clubs:server:declineInvite', function()
    local citizenId = GetCitizenId(source)
    if citizenId then pendingInvites[citizenId] = nil end
end)

-- Leave / Disband ------------------------------------------------------------

RegisterNetEvent('syndicate-clubs:server:leave', function()
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    local club = playerClubCache[citizenId]

    if not club then return Notify(src, 'error', 'You are not in a club.') end
    if club.role == 'owner' then
        return Notify(src, 'error', 'Transfer ownership (/transferclub [id]) or disband the club before leaving.')
    end

    DB.RemoveMember(club.id, citizenId)
    ClearCache(citizenId)
    Notify(src, 'success', 'You left the club.')
end)

-- Shared by the owner's disband button and the admin command.
function DisbandClubById(clubId, byWho)
    local club = DB.GetClubById(clubId)
    if not club then return false end

    for citizenId, cached in pairs(playerClubCache) do
        if cached.id == clubId then
            local memberSrc = GetSrcByCitizenId(citizenId)
            ClearCache(citizenId)
            if memberSrc then
                Notify(memberSrc, 'warning', ('Club "%s" has been disbanded.'):format(club.name))
            end
        end
    end
    for cid, invite in pairs(pendingInvites) do
        if invite.clubId == clubId then pendingInvites[cid] = nil end
    end

    DB.DisbandClub(clubId)   -- members are removed by ON DELETE CASCADE
    print(('[syndicate-clubs] Club "%s" disbanded by %s'):format(club.name, byWho))
    return true
end

RegisterNetEvent('syndicate-clubs:server:disband', function()
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    local club = playerClubCache[citizenId]
    local cfg = club and RoleCfg(club.role)
    if not club or not cfg or not cfg.canDisband then
        return Notify(src, 'error', 'Only the club owner can disband.')
    end
    DisbandClubById(club.id, citizenId)
end)

-- Kick / roles ---------------------------------------------------------------

RegisterNetEvent('syndicate-clubs:server:kick', function(targetCitizenId)
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    local club = playerClubCache[citizenId]
    if not club then return Notify(src, 'error', 'You are not in a club.') end

    local cfg = RoleCfg(club.role)
    if not cfg or not cfg.canKick then
        return Notify(src, 'error', 'Only owners and officers can kick.')
    end

    targetCitizenId = ValidCitizenId(targetCitizenId)
    if not targetCitizenId then return end
    if targetCitizenId == citizenId then return Notify(src, 'error', "Can't kick yourself.") end

    -- The target's role comes from the database, not from the client.
    local targetRole = DB.GetMemberRole(club.id, targetCitizenId)
    if not targetRole then return Notify(src, 'error', 'That player is not in your club.') end
    -- You can only kick someone ranked below you (officers cannot kick officers or the owner).
    if ROLE_RANK[targetRole] >= ROLE_RANK[club.role] then
        return Notify(src, 'error', 'You cannot remove someone of equal or higher rank.')
    end

    DB.RemoveMember(club.id, targetCitizenId)
    local targetSrc = GetSrcByCitizenId(targetCitizenId)
    ClearCache(targetCitizenId)
    if targetSrc then Notify(targetSrc, 'error', 'You were removed from the club.') end
    Notify(src, 'success', 'Member removed.')
end)

RegisterNetEvent('syndicate-clubs:server:setRole', function(targetCitizenId, newRole)
    local src = source
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    local club = playerClubCache[citizenId]

    local cfg = club and RoleCfg(club.role)
    if not club or not cfg or not cfg.canPromote then
        return Notify(src, 'error', 'Only the owner can change roles.')
    end
    if newRole == 'owner' then
        return Notify(src, 'error', 'Use /transferclub [id] to transfer ownership.')
    end
    if newRole ~= 'officer' and newRole ~= 'member' then return end

    targetCitizenId = ValidCitizenId(targetCitizenId)
    if not targetCitizenId or targetCitizenId == citizenId then return end

    local targetRole = DB.GetMemberRole(club.id, targetCitizenId)
    if not targetRole then return Notify(src, 'error', 'That player is not in your club.') end
    if targetRole == 'owner' then return end
    if targetRole == newRole then return end

    if newRole == 'officer' and DB.CountOfficers(club.id) >= ClubConfig.MaxOfficers then
        return Notify(src, 'error', ('A club can have at most %d officers.'):format(ClubConfig.MaxOfficers))
    end

    DB.UpdateMemberRole(club.id, targetCitizenId, newRole)
    if playerClubCache[targetCitizenId] then Refresh(targetCitizenId) end
    Notify(src, 'success', ('Role updated to %s.'):format(newRole))
end)

-- Ownership transfer (used by /transferclub) ---------------------------------

local function TransferOwnership(src, targetSrc)
    local citizenId = GetCitizenId(src)
    if not citizenId then return end
    local club = playerClubCache[citizenId]
    if not club or club.role ~= 'owner' then
        return Notify(src, 'error', 'Only the club owner can transfer ownership.')
    end

    targetSrc = ValidPlayerId(targetSrc)
    if not targetSrc or targetSrc == src then
        return Notify(src, 'error', 'Usage: /transferclub [player id of a club member]')
    end
    local targetCid = GetCitizenId(targetSrc)
    if not targetCid or DB.GetMemberRole(club.id, targetCid) == nil then
        return Notify(src, 'error', 'That player is not a member of your club.')
    end

    -- The old owner steps down to officer if there is room, otherwise member.
    local newRoleForOld = DB.CountOfficers(club.id) >= ClubConfig.MaxOfficers and 'member' or 'officer'
    local targetWasOfficer = DB.GetMemberRole(club.id, targetCid) == 'officer'
    if targetWasOfficer then newRoleForOld = 'officer' end   -- the officer slot the target frees up

    DB.UpdateMemberRole(club.id, targetCid, 'owner')
    DB.UpdateMemberRole(club.id, citizenId, newRoleForOld)
    DB.SetOwner(club.id, targetCid)
    Refresh(targetCid)
    Refresh(citizenId)
    Notify(src, 'success', 'Ownership transferred.')
    Notify(targetSrc, 'success', ('You are now the owner of %s.'):format(club.name))
end

RegisterCommand('transferclub', function(src, args)
    if src == 0 then return print('[syndicate-clubs] /transferclub is for players') end
    TransferOwnership(src, args[1])
end, false)

-- Overview for the UI --------------------------------------------------------

lib.callback.register('syndicate-clubs:getOverview', function(source)
    local now = GetGameTimer()
    if lastOverview[source] and now - lastOverview[source] < 500 then return nil end
    lastOverview[source] = now

    local citizenId = GetCitizenId(source)
    if not citizenId then return nil end

    local club = playerClubCache[citizenId]
    local members = club and DB.GetClubMembers(club.id) or {}
    return { clubs = DB.GetAllClubs(), club = club, members = members }
end)

-- Client asks for its state (e.g. after the client half of this resource restarted)
RegisterNetEvent('syndicate-clubs:server:requestState', function()
    local src = source
    local citizenId = GetCitizenId(src)
    if citizenId then Push(src, playerClubCache[citizenId]) end
end)

-- Lifecycle ------------------------------------------------------------------

AddEventHandler('QBCore:Server:PlayerLoaded', function(Player)
    local src = Player.PlayerData.source
    local citizenId = Player.PlayerData.citizenid
    cidBySrc[src] = citizenId
    DB.WaitReady()
    Refresh(citizenId)   -- also pushes the club to the client
end)

-- Fired when a character is logged out / switched (QBCore:Server:PlayerLogout is never fired)
AddEventHandler('QBCore:Server:OnPlayerUnload', function(src)
    local citizenId = cidBySrc[src]
    if citizenId then
        playerClubCache[citizenId] = nil
        pendingInvites[citizenId] = nil
    end
    cidBySrc[src] = nil
end)

AddEventHandler('playerDropped', function()
    local src = source
    local citizenId = cidBySrc[src]
    if citizenId then
        playerClubCache[citizenId] = nil
        pendingInvites[citizenId] = nil
    end
    cidBySrc[src] = nil
    busy[src] = nil
    lastOverview[src] = nil
end)

-- Rebuild the cache when this resource (re)starts while players are online
CreateThread(function()
    DB.WaitReady()
    for _, id in ipairs(GetPlayers()) do
        local src = tonumber(id)
        local citizenId = src and GetCitizenId(src)
        if citizenId then
            cidBySrc[src] = citizenId
            Refresh(citizenId)
        end
    end
end)

-- Export: get a player's club
exports('GetPlayerClub', function(src)
    local citizenId = GetCitizenId(src)
    return citizenId and playerClubCache[citizenId] or nil
end)
