-- luacheck config for the Syndicate custom resources (FiveM Lua 5.4 / CfxLua).
std = "lua54"
max_line_length = false
codes = true

-- Per-resource globals defined by our own scripts
globals = {
    "DB", "RacingConfig", "ClubConfig", "MeetConfig", "Meets", "Config",
    "DisbandClubById",
}

-- FiveM / ox_lib / oxmysql globals (read-only)
read_globals = {
    -- ox_lib + oxmysql + cfx
    "lib", "MySQL", "exports", "source", "json", "Citizen", "LocalPlayer", "QBX",
    "CreateThread", "Wait", "SetTimeout", "GetGameTimer", "GetCurrentResourceName",
    "RegisterNetEvent", "AddEventHandler", "TriggerEvent", "TriggerServerEvent",
    "TriggerClientEvent", "RegisterCommand", "RegisterNUICallback", "SendNUIMessage",
    "SetNuiFocus", "GetPlayers", "GetPlayerPed", "GetEntityCoords", "GetVehiclePedIsIn",
    "PlayerPedId", "joaat", "vector3", "vector4", "IsControlPressed", "DoesEntityExist",
    "FreezeEntityPosition", "SetEntityCoordsNoOffset", "SetEntityHeading",
    "SetVehicleOnGroundProperly", "GetEntityHealth", "GetPedArmour", "GetEntitySpeed",
    "GetVehicleCurrentGear", "GetVehicleCurrentRpm", "GetEntityModel",
    "GetDisplayNameFromVehicleModel", "AddBlipForCoord", "SetBlipSprite", "SetBlipColour",
    "SetBlipScale", "SetBlipAsShortRange", "BeginTextCommandSetBlipName",
    "AddTextComponentSubstringPlayerName", "EndTextCommandSetBlipName", "RemoveBlip",
    "CreatePed", "SetEntityInvincible", "SetBlockingOfNonTemporaryEvents",
    "SetModelAsNoLongerNeeded", "DeleteEntity",
}

exclude_files = { "**/fxmanifest.lua", "server-data/resources/[core]/**", "website/**" }
