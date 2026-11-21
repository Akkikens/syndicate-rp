fx_version 'cerulean'
game 'gta5'

name 'syndicate-cars'
description 'Syndicate RP — Car pack streamer (IVPack + optimized packs)'
version '1.1.0'

--[[
  This resource loads EMPTY but valid: data/vehicles.meta contains no cars yet.
  It is not ensured in server.cfg until you add your first car - see docs/cars.md.

  HOW TO ADD CARS (summary - the full steps are in docs/cars.md):
  1. Put the car's .yft/.ytd files in a folder named `stream/` inside this resource.
     FiveM streams everything in `stream/` automatically - there is no stream{} block.
  2. Add an <Item> for the car to data/vehicles.meta.
  3. Add the car's handling and variation files (see below) if the pack ships them.
  4. Register the model in syndicate-config/config/cars.lua.
  5. Add `ensure syndicate-cars` to server.cfg and restart.
]]

files {
    'data/vehicles.meta',
    -- Uncomment once the file exists (create it or copy it from the car pack):
    -- 'data/handling.meta',
    -- 'data/carvariations.meta',
    -- 'data/carcols.meta',
}

data_file 'VEHICLE_METADATA_FILE' 'data/vehicles.meta'
-- data_file 'HANDLING_FILE'          'data/handling.meta'
-- data_file 'VEHICLE_VARIATION_FILE' 'data/carvariations.meta'
-- data_file 'CARCOLS_FILE'           'data/carcols.meta'
