fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-hud'
description 'Syndicate RP — Custom HUD'
version '1.0.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

client_scripts {
    'client/main.lua',
    'client/events.lua',
}

server_scripts {
    'server/main.lua',
}

shared_scripts {
    '@ox_lib/init.lua',
}

dependencies {
    'ox_lib',
    'qbx_core',
    'syndicate-config',
}
