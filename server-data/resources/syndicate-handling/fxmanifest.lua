fx_version 'cerulean'
game 'gta5'

name 'syndicate-handling'
description 'Syndicate RP — Realistic handling overrides (Taira + Drive V blend)'
version '1.0.0'

-- NOT ensured in server.cfg: see the note there (partial handling entries are untested).
-- data_file loads handling overrides server-side for all players automatically
data_file 'HANDLING_FILE' 'data/handling_overrides.meta'

files {
    'data/handling_overrides.meta',
}
