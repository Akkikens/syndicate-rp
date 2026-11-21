fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-config'
description 'Syndicate RP — Centralized server configuration (identity, economy, VIP tiers, car catalogue)'
version '1.1.0'

-- Explicit order: main.lua creates `Config`, cars.lua adds to it. (A `config/*.lua`
-- glob loads alphabetically, so cars.lua would run first and hit a nil `Config`.)
shared_scripts {
    'config/main.lua',
    'config/cars.lua',
    'config/export.lua',
}
