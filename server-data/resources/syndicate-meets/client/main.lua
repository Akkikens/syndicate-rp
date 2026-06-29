local activeMeets   = {}   -- meetId → meet data
local votingOpen    = false
local currentVoting = nil

-- ── Receive active meets on join ──────────────────────────
RegisterNetEvent('syndicate-meets:client:activeMeets', function(meets)
    for _, meet in ipairs(meets) do
        activeMeets[meet.id] = meet
        TriggerEvent('syndicate-meets:client:registerZone', meet)
    end
end)

-- ── New meet opened ───────────────────────────────────────
RegisterNetEvent('syndicate-meets:client:meetOpened', function(meet)
    activeMeets[meet.id] = meet
    TriggerEvent('syndicate-meets:client:registerZone', meet)

    lib.notify({
        title       = 'Car Meet',
        description = ('A meet is open at %s!'):format(meet.label),
        type        = 'inform',
        duration    = 8000,
    })
end)

-- ── Meet ended ────────────────────────────────────────────
RegisterNetEvent('syndicate-meets:client:meetEnded', function(meetId)
    activeMeets[meetId] = nil
    votingOpen    = false
    currentVoting = nil
    SendNUIMessage({ action = 'closeMeet' })
end)

-- ── Attendees updated ─────────────────────────────────────
RegisterNetEvent('syndicate-meets:client:attendeesUpdated', function(meetId, attendees)
    if activeMeets[meetId] then
        activeMeets[meetId].attendees = attendees
        SendNUIMessage({ action = 'updateAttendees', meetId = meetId, attendees = attendees })
    end
end)

-- ── Voting started ────────────────────────────────────────
RegisterNetEvent('syndicate-meets:client:votingStarted', function(data)
    votingOpen    = true
    currentVoting = data
    SetNuiFocus(true, true)
    SendNUIMessage({
        action     = 'openVoting',
        meetId     = data.meetId,
        categories = data.categories,
        attendees  = data.attendees,
        duration   = data.duration,
    })
end)

-- ── NUI callbacks ─────────────────────────────────────────
RegisterNUICallback('checkIn', function(data, cb)
    TriggerServerEvent('syndicate-meets:server:checkIn', data.meetId)
    cb({})
end)

RegisterNUICallback('castVote', function(data, cb)
    TriggerServerEvent('syndicate-meets:server:vote', data.meetId, data.targetCitizenId, data.category)
    cb({})
end)

RegisterNUICallback('closeMeetUI', function(_, cb)
    SetNuiFocus(false, false)
    cb({})
end)

-- Fetch active meets on resource start
CreateThread(function()
    Wait(2000) -- wait for player data to load
    TriggerServerEvent('syndicate-meets:server:getActive')
end)
