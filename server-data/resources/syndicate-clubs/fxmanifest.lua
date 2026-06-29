fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-clubs'
description 'Syndicate RP — Car Clubs System'
version '1.0.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

client_scripts {
    'client/main.lua',
    'client/ui.lua',
    'client/npc.lua',
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/main.lua',
    'server/db.lua',
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
    'syndicate-config',
}
