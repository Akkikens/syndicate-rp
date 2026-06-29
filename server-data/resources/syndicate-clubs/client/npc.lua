-- Spawns the Club Recruiter NPC and interaction target

local npcHandle = nil

CreateThread(function()
    local cfg = ClubConfig.RecruiterNPC

    -- Request model
    RequestModel(GetHashKey(cfg.model))
    while not HasModelLoaded(GetHashKey(cfg.model)) do Wait(100) end

    npcHandle = CreatePed(4, GetHashKey(cfg.model), cfg.coords.x, cfg.coords.y, cfg.coords.z - 1.0, cfg.coords.w, false, true)
    SetEntityInvincible(npcHandle, true)
    SetBlockingOfNonTemporaryEvents(npcHandle, true)
    FreezeEntityPosition(npcHandle, true)
    SetModelAsNoLongerNeeded(GetHashKey(cfg.model))

    -- ox_target interaction zone on the NPC
    exports.ox_target:addLocalEntity(npcHandle, {
        {
            name    = 'syndicate_clubs_npc',
            label   = cfg.label,
            icon    = 'fas fa-car',
            distance = 2.5,
            onSelect = function()
                TriggerEvent('syndicate-clubs:client:openUI')
            end,
        }
    })
end)
