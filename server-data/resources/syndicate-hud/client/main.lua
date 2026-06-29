local hudVisible = true
local hudData = {
    health    = 100,
    armor     = 0,
    hunger    = 100,
    thirst    = 100,
    speed     = 0,
    gear      = 1,
    rpm       = 0.0,
    cash      = 0,
    bank      = 0,
    job       = "Unemployed",
    inVehicle = false,
}

local function UpdateHUD()
    SendNUIMessage({ action = "updateHUD", data = hudData })
end

-- Main tick: vehicle telemetry
CreateThread(function()
    while true do
        local sleep = 500
        local ped   = PlayerPedId()

        hudData.health = math.max(0, math.floor(GetEntityHealth(ped) - 100))
        hudData.armor  = math.floor(GetPedArmour(ped))

        local veh = GetVehiclePedIsIn(ped, false)
        if veh ~= 0 then
            sleep = 0
            hudData.inVehicle = true
            hudData.speed = math.floor(GetEntitySpeed(veh) * 2.237)
            hudData.gear  = GetVehicleCurrentGear(veh)
            hudData.rpm   = GetVehicleCurrentRpm(veh)  -- 0.0–1.0
        else
            hudData.inVehicle = false
            hudData.speed     = 0
            hudData.gear      = 1
            hudData.rpm       = 0.0
        end

        UpdateHUD()
        Wait(sleep)
    end
end)

RegisterNetEvent('syndicate-hud:toggle', function()
    hudVisible = not hudVisible
    SendNUIMessage({ action = "toggleHUD", visible = hudVisible })
end)

RegisterNetEvent('QBCore:Client:OnMoneyChange', function(moneyType, amount)
    if moneyType == "cash" then
        hudData.cash = amount
    elseif moneyType == "bank" then
        hudData.bank = amount
    end
    UpdateHUD()
end)

RegisterNetEvent('QBCore:Client:SetPlayerData', function(data)
    if data.job then
        hudData.job = data.job.label or "Unemployed"
    end
    if data.metadata then
        hudData.hunger = data.metadata.hunger or 100
        hudData.thirst = data.metadata.thirst or 100
    end
    UpdateHUD()
end)
