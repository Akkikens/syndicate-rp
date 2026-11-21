-- `Config` is a global of THIS resource only. Other resources read it through this export:
--   local cfg = exports['syndicate-config']:GetConfig()
exports('GetConfig', function()
    return Config
end)
