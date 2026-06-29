local hudVisible = true
local hudData = {
    health    = 100,
    armor     = 0,
    hunger    = 100,
    thirst    = 100,
    speed     = 0,
    cash      = 0,
    bank      = 0,
    job       = "Unemployed",
    vipTier   = nil,
    inVehicle = false,
}

-- Send updated data to NUI
local function UpdateHUD()
    SendNUIMessage({ action = "updateHUD", data = hudData })
end

-- Tick: update speed, health, armor every frame
CreateThread(function()
    while true do
        local sleep = 500
        local ped   = PlayerPedId()

        hudData.health = math.floor((GetEntityHealth(ped) - 100) / 1.0)
        hudData.armor  = math.floor(GetPedArmour(ped))

        local veh = GetVehiclePedIsIn(ped, false)
        if veh ~= 0 then
            sleep = 0
            hudData.inVehicle = true
            -- Convert m/s to mph
            hudData.speed = math.floor(GetEntitySpeed(veh) * 2.237)
        else
            hudData.inVehicle = false
            hudData.speed     = 0
        end

        UpdateHUD()
        Wait(sleep)
    end
end)

-- Toggle HUD visibility
RegisterNetEvent('syndicate-hud:toggle', function()
    hudVisible = not hudVisible
    SendNUIMessage({ action = "toggleHUD", visible = hudVisible })
end)

-- Update player money
RegisterNetEvent('QBCore:Client:OnMoneyChange', function(moneyType, amount, operation)
    if moneyType == "cash" then
        hudData.cash = amount
    elseif moneyType == "bank" then
        hudData.bank = amount
    end
    UpdateHUD()
end)

-- Update player job
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
