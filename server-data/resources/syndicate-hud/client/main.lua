-- Syndicate HUD. Player data comes from qbx_core's player-data module
-- (QBX.PlayerData, loaded via the manifest). Balances are read from it - never
-- derived from OnMoneyChange, which only carries the delta.

local hudVisible = true
local loaded = false          -- true once a character is loaded
local lastSent = nil          -- last payload as JSON, to skip duplicate NUI messages

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

-- Read job, money and needs from qbx_core's PlayerData
local function ReadPlayerData()
    local pd = QBX and QBX.PlayerData
    if not pd or not pd.citizenid then return end

    hudData.cash = (pd.money and pd.money.cash) or 0
    hudData.bank = (pd.money and pd.money.bank) or 0
    hudData.job  = (pd.job and pd.job.label) or "Unemployed"

    -- hunger/thirst live in player state bags (metadata is only synced on save)
    local state = LocalPlayer.state
    hudData.hunger = state.hunger or (pd.metadata and pd.metadata.hunger) or 100
    hudData.thirst = state.thirst or (pd.metadata and pd.metadata.thirst) or 100
end

local function SetLoaded(value)
    loaded = value
    SendNUIMessage({ action = "toggleHUD", visible = loaded and hudVisible })
    if loaded then
        ReadPlayerData()
        UpdateHUD()
    end
end

-- Hidden until a character is loaded; hidden again on logout/character switch
RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function() SetLoaded(true) end)
RegisterNetEvent('QBCore:Client:OnPlayerUnload', function() SetLoaded(false) end)

-- Fires on every PlayerData change (money, job, metadata) with the full table
RegisterNetEvent('QBCore:Player:SetPlayerData', function()
    if not loaded then return end
    ReadPlayerData()
    UpdateHUD()
end)

-- Resource restarted while already in game
CreateThread(function()
    Wait(500)
    if LocalPlayer.state.isLoggedIn then SetLoaded(true) else SetLoaded(false) end
end)

-- Main tick: telemetry. Fast (every frame) only in a vehicle, and NUI messages are
-- throttled to ~100 ms and skipped when nothing changed.
CreateThread(function()
    local lastPost = 0
    while true do
        if not loaded then
            Wait(1000)
        else
            local ped = PlayerPedId()
            local sleep = 500

            hudData.health = math.max(0, math.floor(GetEntityHealth(ped) - 100))
            hudData.armor  = math.floor(GetPedArmour(ped))

            local veh = GetVehiclePedIsIn(ped, false)
            if veh ~= 0 then
                sleep = 50
                hudData.inVehicle = true
                hudData.speed = math.floor(GetEntitySpeed(veh) * 2.237)
                hudData.gear  = GetVehicleCurrentGear(veh)
                hudData.rpm   = GetVehicleCurrentRpm(veh)  -- 0.0-1.0
            else
                hudData.inVehicle = false
                hudData.speed     = 0
                hudData.gear      = 1
                hudData.rpm       = 0.0
            end

            local now = GetGameTimer()
            if now - lastPost >= 100 then
                local encoded = json.encode(hudData)
                if encoded ~= lastSent then
                    lastSent = encoded
                    lastPost = now
                    UpdateHUD()
                end
            end
            Wait(sleep)
        end
    end
end)

RegisterNetEvent('syndicate-hud:toggle', function()
    hudVisible = not hudVisible
    SendNUIMessage({ action = "toggleHUD", visible = loaded and hudVisible })
end)

RegisterCommand('togglehud', function()
    TriggerEvent('syndicate-hud:toggle')
end, false)
