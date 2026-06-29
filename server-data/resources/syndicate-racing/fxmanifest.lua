fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-racing'
description 'Syndicate RP — Drag Racing System'
version '1.0.0'

client_scripts {
    'client/main.lua',
    'client/ui.lua',
    'client/race.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/leaderboard.lua',
}

shared_scripts {
    '@ox_lib/init.lua',
    'shared/config.lua',
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

dependencies {
    'ox_lib',
    'oxmysql',
    'qbx_core',
    'syndicate-config',
}
