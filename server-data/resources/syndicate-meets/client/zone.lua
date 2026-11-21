-- Blips and ox_target check-in / attendee-list interactions for each active meet.
-- (ox_zones does not exist; ox_target's sphere zone is used instead.)

local meetZones = {}   -- meetId -> ox_target zone id
local meetBlips = {}   -- meetId -> blip handle

AddEventHandler('syndicate-meets:client:registerZone', function(meet)
    -- DB-loaded and live meets both carry `locationId` (the server maps location_id for us)
    local locCfg
    for _, l in ipairs(MeetConfig.Locations) do
        if l.id == meet.locationId then locCfg = l; break end
    end
    if not locCfg then return end
    if meetBlips[meet.id] then return end   -- already registered

    local blip = AddBlipForCoord(locCfg.coords.x, locCfg.coords.y, locCfg.coords.z)
    SetBlipSprite(blip, locCfg.blip.sprite)
    SetBlipColour(blip, locCfg.blip.color)
    SetBlipScale(blip, locCfg.blip.scale)
    SetBlipAsShortRange(blip, false)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentSubstringPlayerName(('Car Meet: %s'):format(locCfg.label))
    EndTextCommandSetBlipName(blip)
    meetBlips[meet.id] = blip

    meetZones[meet.id] = exports.ox_target:addSphereZone({
        coords  = locCfg.coords,
        radius  = 6.0,
        name    = ('meet_checkin_%d'):format(meet.id),
        options = {
            {
                name     = 'meet_checkin',
                label    = ('Check In - %s'):format(locCfg.label),
                icon     = 'fas fa-flag-checkered',
                distance = 6.0,
                onSelect = function()
                    Meets.CheckIn(meet.id)
                end,
            },
            {
                name     = 'meet_view',
                label    = 'View Attendees',
                icon     = 'fas fa-users',
                distance = 6.0,
                onSelect = function()
                    local attendees = lib.callback.await('syndicate-meets:getAttendees', false, meet.id) or {}
                    Meets.uiOpen = true
                    SetNuiFocus(true, true)
                    SendNUIMessage({
                        action    = 'openMeet',
                        meet      = Meets.active[meet.id] or { id = meet.id, label = locCfg.label },
                        attendees = attendees,
                    })
                end,
            },
        },
    })
end)

local function Cleanup(meetId)
    if meetBlips[meetId] then
        RemoveBlip(meetBlips[meetId])
        meetBlips[meetId] = nil
    end
    if meetZones[meetId] then
        exports.ox_target:removeZone(meetZones[meetId])
        meetZones[meetId] = nil
    end
end

RegisterNetEvent('syndicate-meets:client:meetEnded', Cleanup)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    for meetId in pairs(meetBlips) do Cleanup(meetId) end
end)
