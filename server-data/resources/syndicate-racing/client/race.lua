-- Race flow: line-up, countdown, false-start detection, finish detection.
-- The server decides the result; this file only reports "false start" and "crossed".

local currentRace = nil   -- { raceId, finish (vector4), veh }

local function Release(veh)
    if veh and DoesEntityExist(veh) then
        FreezeEntityPosition(veh, false)
    end
end

RegisterNetEvent('syndicate-racing:client:raceStart', function(data)
    local ped = PlayerPedId()
    local veh = GetVehiclePedIsIn(ped, false)
    if veh == 0 then
        -- Server requires a vehicle; if we lost it, forfeit by doing nothing (server times out and refunds).
        return
    end

    currentRace = { raceId = data.raceId, finish = data.finish, veh = veh }

    -- Line the car up in its lane and hold it still for the countdown
    local slot = data.slot
    SetEntityCoordsNoOffset(veh, slot.x, slot.y, slot.z, false, false, false)
    SetEntityHeading(veh, slot.w)
    SetVehicleOnGroundProperly(veh)
    FreezeEntityPosition(veh, true)

    local race = currentRace
    CreateThread(function()
        local goAt = GetGameTimer() + data.countdown * 1000
        local lastShown = nil

        while GetGameTimer() < goAt and currentRace == race do
            local left = math.ceil((goAt - GetGameTimer()) / 1000)
            if left ~= lastShown then
                lastShown = left
                lib.notify({ type = 'inform', description = tostring(left), duration = 900 })
            end
            -- Holding the accelerator before GO is a false start (the car is frozen, so this is input only)
            if IsControlPressed(0, 71) then
                TriggerServerEvent('syndicate-racing:server:falseStart')
                Release(veh)
                currentRace = nil
                lib.notify({ type = 'error', description = 'False start!' })
                return
            end
            Wait(0)
        end

        if currentRace ~= race then return end
        Release(veh)
        lib.notify({ type = 'success', description = 'GO!', duration = 1500 })

        -- Finish detection: report once when we reach the line. The server re-checks position.
        local f = race.finish
        while currentRace == race do
            local c = GetEntityCoords(veh)
            local dx, dy = c.x - f.x, c.y - f.y
            if math.sqrt(dx * dx + dy * dy) <= RacingConfig.FinishRadius - 5.0 then
                TriggerServerEvent('syndicate-racing:server:finishLine')
                return
            end
            Wait(50)
        end
    end)
end)

RegisterNetEvent('syndicate-racing:client:raceResult', function(res)
    if currentRace then Release(currentRace.veh) end
    currentRace = nil
    if res.won then
        lib.notify({ type = 'success', title = 'You won!', description = ('Payout $%s'):format(res.payout) })
    else
        lib.notify({ type = 'error', title = 'You lost', description = 'Better luck next time.' })
    end
end)

RegisterNetEvent('syndicate-racing:client:raceAborted', function(reason)
    if currentRace then Release(currentRace.veh) end
    currentRace = nil
    lib.notify({ type = 'warning', description = reason or 'Race cancelled.' })
end)

AddEventHandler('onResourceStop', function(resource)
    if resource == GetCurrentResourceName() and currentRace then Release(currentRace.veh) end
end)
