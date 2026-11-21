-- Shared client state for this resource (client/zone.lua reads it too: it is a global,
-- a `local` here would not be visible in the other file).
Meets = {
    active = {},        -- meetId -> { id, locationId, label, status }
    uiOpen = false,
}

local function ReleaseFocus()
    Meets.uiOpen = false
    SetNuiFocus(false, false)
end

-- ── Active meets on join / resource start ─────────────────
local function LoadActive()
    local meets = lib.callback.await('syndicate-meets:getActive', false)
    for _, meet in ipairs(meets or {}) do
        if not Meets.active[meet.id] then
            Meets.active[meet.id] = meet
            TriggerEvent('syndicate-meets:client:registerZone', meet)
        end
    end
end

CreateThread(function()
    Wait(3000) -- let the player finish loading
    LoadActive()
end)

-- A character finished loading (or switched): pick up meets that opened meanwhile
RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    Wait(1000)
    LoadActive()
end)

-- ── New meet opened ───────────────────────────────────────
RegisterNetEvent('syndicate-meets:client:meetOpened', function(meet)
    Meets.active[meet.id] = meet
    TriggerEvent('syndicate-meets:client:registerZone', meet)

    lib.notify({
        title       = 'Car Meet',
        description = ('A meet is open at %s!'):format(meet.label),
        type        = 'inform',
        duration    = 8000,
    })
end)

-- ── Meet ended ────────────────────────────────────────────
-- Always release NUI focus here so a player can never be left without input.
RegisterNetEvent('syndicate-meets:client:meetEnded', function(meetId)
    Meets.active[meetId] = nil
    SendNUIMessage({ action = 'closeMeet' })
    ReleaseFocus()
end)

-- ── Voting started (the server sends this to attendees only) ──
RegisterNetEvent('syndicate-meets:client:votingStarted', function(data)
    Meets.uiOpen = true
    SetNuiFocus(true, true)
    SendNUIMessage({
        action     = 'openVoting',
        meetId     = data.meetId,
        categories = data.categories,
        attendees  = data.attendees,
        duration   = data.duration,
    })
end)

-- ── Check-in (used by the ox_target option and /checkin) ──
function Meets.CheckIn(meetId)
    local veh = GetVehiclePedIsIn(PlayerPedId(), false)
    local model = nil
    if veh ~= 0 then
        -- The server validates this as a short plain string
        model = GetDisplayNameFromVehicleModel(GetEntityModel(veh))
    end
    TriggerServerEvent('syndicate-meets:server:checkIn', meetId, model)
end

-- Fallback command: check in to the nearest active meet
RegisterCommand('checkin', function()
    local here = GetEntityCoords(PlayerPedId())
    local best, bestDist
    for id, meet in pairs(Meets.active) do
        for _, loc in ipairs(MeetConfig.Locations) do
            if loc.id == meet.locationId then
                local d = #(here - loc.coords)
                if d <= loc.radius and (not bestDist or d < bestDist) then best, bestDist = id, d end
            end
        end
    end
    if not best then
        return lib.notify({ type = 'error', description = 'No open car meet nearby.' })
    end
    Meets.CheckIn(best)
end, false)
TriggerEvent('chat:addSuggestion', '/checkin', 'Check in to a nearby car meet')

-- ── NUI callbacks ─────────────────────────────────────────
RegisterNUICallback('castVote', function(data, cb)
    TriggerServerEvent('syndicate-meets:server:vote', data.meetId, data.targetCitizenId, data.category)
    cb({})
end)

RegisterNUICallback('closeMeetUI', function(_, cb)
    ReleaseFocus()
    cb({})
end)

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() then SetNuiFocus(false, false) end
end)
