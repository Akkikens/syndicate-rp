fx_version 'cerulean'
game 'gta5'

name 'syndicate-cars'
description 'Syndicate RP — Car pack streamer (IVPack + optimized packs)'
version '1.0.0'

--[[
  HOW TO ADD CARS:
  1. Download car files (.yft, .ytd) from gta5-mods.com or cfx.re
  2. Drop them into the correct subfolder below
  3. Add a stream{} entry pointing to the files
  4. Add the vehicle to vehicles.meta and handling.meta
  5. Add it to syndicate-config/config/cars.lua for VIP gating

  Folder structure:
    stream/ivpack/      — GTA IV ports (IVPack)
    stream/optimized/   — chappmdq optimized pack
    stream/premium/     — CFX luxury pack (4 hero cars)
    stream/syndicate/   — your own commissioned originals
]]

files {
    'data/vehicles.meta',
    'data/carvariations.meta',
    'data/vehiclelayouts.meta',
}

data_file 'VEHICLE_METADATA_FILE'   'data/vehicles.meta'
data_file 'CARVARIATIONS_FILE'      'data/carvariations.meta'
data_file 'VEHICLE_LAYOUTS_FILE'    'data/vehiclelayouts.meta'

-- Stream vehicle models
-- Add entries here as you add car files to the stream/ subfolders
-- Example:
-- stream {
--     ['sultan2.yft']     = 'stream/ivpack/sultan2.yft',
--     ['sultan2.ytd']     = 'stream/ivpack/sultan2.ytd',
--     ['sultan2_hi.yft']  = 'stream/ivpack/sultan2_hi.yft',
-- }
