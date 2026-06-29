-- Registers ox_zones entry zones for each active meet
-- and adds blips + check-in targets

local meetZones = {}
local meetBlips = {}

AddEventHandler('syndicate-meets:client:registerZone', function(meet)
    local locCfg = nil
    for _, l in ipairs(MeetConfig.Locations) do
        if l.id == meet.locationId then locCfg = l; break end
    end
    if not locCfg then return end

    -- Map blip
    local blip = AddBlipForCoord(locCfg.coords.x, locCfg.coords.y, locCfg.coords.z)
    SetBlipSprite(blip, locCfg.blip.sprite)
    SetBlipColour(blip, locCfg.blip.color)
    SetBlipScale(blip, locCfg.blip.scale)
    SetBlipAsShortRange(blip, false)
    BeginTextCommandSetBlipName('STRING')
    AddTextComponentSubstringPlayerName(('Car Meet: %s'):format(locCfg.label))
    EndTextCommandSetBlipName(blip)
    meetBlips[meet.id] = blip

    -- ox_zones sphere for check-in target
    local zone = exports.ox_zones:sphere({
        name   = ('syndicate_meet_%d'):format(meet.id),
        coords = locCfg.coords,
        radius = locCfg.radius,
        debug  = false,
    })
    meetZones[meet.id] = zone

    -- ox_target check-in interaction at zone center
    exports.ox_target:addSphereZone({
        coords   = locCfg.coords,
        radius   = 5.0,
        name     = ('meet_checkin_%d'):format(meet.id),
        options  = {
            {
                name     = 'meet_checkin',
                label    = ('Check In — %s'):format(locCfg.label),
                icon     = 'fas fa-flag-checkered',
                distance = 4.0,
                onSelect = function()
                    TriggerServerEvent('syndicate-meets:server:checkIn', meet.id)
                end,
            },
            {
                name     = 'meet_view',
                label    = 'View Attendees',
                icon     = 'fas fa-users',
                distance = 4.0,
                onSelect = function()
                    if activeMeets and activeMeets[meet.id] then
                        SetNuiFocus(true, true)
                        SendNUIMessage({
                            action    = 'openMeet',
                            meet      = activeMeets[meet.id],
                            attendees = activeMeets[meet.id].attendees or {},
                        })
                    end
                end,
            },
        }
    })
end)

-- Clean up blips/zones when a meet ends
RegisterNetEvent('syndicate-meets:client:meetEnded', function(meetId)
    if meetBlips[meetId] then
        RemoveBlip(meetBlips[meetId])
        meetBlips[meetId] = nil
    end
    if meetZones[meetId] then
        meetZones[meetId]:remove()
        meetZones[meetId] = nil
    end
    exports.ox_target:removeZone(('meet_checkin_%d'):format(meetId))
end)
