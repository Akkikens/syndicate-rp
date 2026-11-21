-- Spawns the Club Recruiter NPC and its ox_target interaction.
-- (The /clubs command in client/main.lua is the fallback if the NPC is missing.)

local npcHandle = nil

CreateThread(function()
    local cfg = ClubConfig.RecruiterNPC
    local hash = joaat(cfg.model)

    lib.requestModel(hash, 10000)

    npcHandle = CreatePed(4, hash, cfg.coords.x, cfg.coords.y, cfg.coords.z - 1.0, cfg.coords.w, false, true)
    SetEntityInvincible(npcHandle, true)
    SetBlockingOfNonTemporaryEvents(npcHandle, true)
    FreezeEntityPosition(npcHandle, true)
    SetModelAsNoLongerNeeded(hash)

    exports.ox_target:addLocalEntity(npcHandle, {
        {
            name     = 'syndicate_clubs_npc',
            label    = cfg.label,
            icon     = 'fas fa-car',
            distance = 2.5,
            onSelect = function()
                TriggerEvent('syndicate-clubs:client:openUI')
            end,
        }
    })
end)

AddEventHandler('onResourceStop', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    if npcHandle and DoesEntityExist(npcHandle) then
        exports.ox_target:removeLocalEntity(npcHandle)
        DeleteEntity(npcHandle)
    end
end)
