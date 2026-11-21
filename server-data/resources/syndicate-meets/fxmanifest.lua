fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-meets'
description 'Syndicate RP — Car Meets System'
version '1.1.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

-- main.lua defines the shared `Meets` table used by zone.lua
client_scripts {
    'client/main.lua',
    'client/zone.lua',
}

-- db.lua must load before main.lua (it defines DB); scheduler.lua uses Meets from main.lua
server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/db.lua',
    'server/main.lua',
    'server/scheduler.lua',
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/config.lua',
}

dependencies {
    'ox_lib',
    'oxmysql',
    'qbx_core',
    'ox_target',
}
