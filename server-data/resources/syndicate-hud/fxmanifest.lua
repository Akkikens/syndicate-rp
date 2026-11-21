fx_version 'cerulean'
game 'gta5'
lua54 'yes'

name 'syndicate-hud'
description 'Syndicate RP — Custom HUD'
version '1.1.0'

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
}

-- playerdata.lua keeps QBX.PlayerData in sync with qbx_core
client_scripts {
    '@qbx_core/modules/playerdata.lua',
    'client/main.lua',
}

shared_scripts {
    '@ox_lib/init.lua',
}

dependencies {
    'ox_lib',
    'qbx_core',
}
