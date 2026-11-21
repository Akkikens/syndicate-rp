fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-clubs'
description 'Syndicate RP — Car Clubs System'
version '1.1.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

client_scripts {
    'client/main.lua',
    'client/npc.lua',
}

-- db.lua must load before main.lua (main.lua uses DB at runtime, db.lua defines it)
server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/db.lua',
    'server/main.lua',
    'server/commands.lua',
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
