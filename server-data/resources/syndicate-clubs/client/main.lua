local playerClub = nil  -- current player's club data or nil

-- ── Receive club state from server ────────────────────────
RegisterNetEvent('syndicate-clubs:client:clubUpdated', function(club)
    playerClub = club
    SendNUIMessage({ action = 'setClub', club = club })
end)

-- ── Open club management UI ───────────────────────────────
RegisterNetEvent('syndicate-clubs:client:openUI', function()
    TriggerServerEvent('syndicate-clubs:server:getAll')
end)

RegisterNetEvent('syndicate-clubs:client:receiveAll', function(clubs)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action     = 'openClubs',
        clubs      = clubs,
        playerClub = playerClub,
    })
end)

-- ── Incoming invite ───────────────────────────────────────
RegisterNetEvent('syndicate-clubs:client:receiveInvite', function(data)
    lib.alertDialog({
        header  = 'Club Invite',
        content = ('**%s** invites you to join **%s** [%s].\nAccept?'):format(
            data.inviterSrc, data.clubName, data.clubTag
        ),
        cancel  = true,
    }):next(function(confirmed)
        if confirmed then
            TriggerServerEvent('syndicate-clubs:server:acceptInvite', data.clubId)
        end
    end)
end)

-- ── NUI callbacks ─────────────────────────────────────────
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

RegisterNUICallback('closeUI', function(_, cb)
    SetNuiFocus(false, false)
    cb({})
end)

-- ── Export: get local player's club ───────────────────────
exports('GetMyClub', function()
    return playerClub
end)
