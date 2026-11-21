local playerClub = nil   -- current player's club data or nil (pushed by the server)
local uiOpen = false

-- ── Open / refresh the management UI ──────────────────────
local function SendOverview(action)
    local overview = lib.callback.await('syndicate-clubs:getOverview', false)
    if not overview then return false end
    SendNUIMessage({
        action     = action,
        clubs      = overview.clubs,
        playerClub = overview.club,
        members    = overview.members,
    })
    return true
end

local function OpenUI()
    if uiOpen then return end
    if not SendOverview('openClubs') then return end
    uiOpen = true
    SetNuiFocus(true, true)
end

RegisterNetEvent('syndicate-clubs:client:openUI', OpenUI)

RegisterCommand('clubs', OpenUI, false)
TriggerEvent('chat:addSuggestion', '/clubs', 'Open the car clubs menu')
TriggerEvent('chat:addSuggestion', '/transferclub', 'Transfer club ownership to a member', {
    { name = 'playerId', help = 'Server ID of the new owner' },
})

-- ── Receive club state from server ────────────────────────
RegisterNetEvent('syndicate-clubs:client:clubUpdated', function(club)
    playerClub = club
    if uiOpen then SendOverview('refreshClubs') end
end)

-- ── Incoming invite ───────────────────────────────────────
RegisterNetEvent('syndicate-clubs:client:receiveInvite', function(data)
    -- lib.alertDialog blocks and returns 'confirm' | 'cancel' | nil (nil = another dialog open).
    -- With a timeout it raises, hence pcall. Anything but 'confirm' is a decline.
    local ok, result = pcall(lib.alertDialog, {
        header  = 'Club Invite',
        content = ('**%s** invites you to join **%s** [%s].\n\nAccept?'):format(
            data.inviterName, data.clubName, data.clubTag
        ),
        centered = true,
        cancel  = true,
    }, (data.timeoutSecs or 60) * 1000)

    if ok and result == 'confirm' then
        TriggerServerEvent('syndicate-clubs:server:acceptInvite')
    else
        TriggerServerEvent('syndicate-clubs:server:declineInvite')
    end
end)

-- ── NUI callbacks (they only forward intent; the server decides) ──
RegisterNUICallback('createClub', function(data, cb)
    TriggerServerEvent('syndicate-clubs:server:create', data.name, data.tag)
    cb({})
end)

RegisterNUICallback('leaveClub', function(_, cb)
    TriggerServerEvent('syndicate-clubs:server:leave')
    cb({})
end)

RegisterNUICallback('disbandClub', function(_, cb)
    TriggerServerEvent('syndicate-clubs:server:disband')
    cb({})
end)

RegisterNUICallback('kickMember', function(data, cb)
    TriggerServerEvent('syndicate-clubs:server:kick', data.citizenId)
    cb({})
end)

RegisterNUICallback('setRole', function(data, cb)
    TriggerServerEvent('syndicate-clubs:server:setRole', data.citizenId, data.role)
    cb({})
end)

RegisterNUICallback('inviteMember', function(data, cb)
    TriggerServerEvent('syndicate-clubs:server:invite', data.playerId)
    cb({})
end)

RegisterNUICallback('closeUI', function(_, cb)
    uiOpen = false
    SetNuiFocus(false, false)
    cb({})
end)

-- ── Export: get local player's club ───────────────────────
exports('GetMyClub', function()
    return playerClub
end)

-- Ask the server for our club (covers restarting only this resource while online)
CreateThread(function()
    Wait(2000)
    TriggerServerEvent('syndicate-clubs:server:requestState')
end)

-- Never leave the mouse captured if the resource stops while the UI is open
AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then SetNuiFocus(false, false) end
end)
