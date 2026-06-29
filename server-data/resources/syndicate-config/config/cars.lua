-- Syndicate RP — Car Catalogue & VIP Gating
-- Add every custom car here so the dealership and garage systems know about it

Config.Cars = {}

--[[
  VIP tier access:
    nil      = everyone
    'crew'   = Crew ($5) and above
    'vip'    = VIP ($10) and above
    'elite'  = Elite ($25) and above
    'founder'= Founder ($50) only

  category: used for dealership filtering
    'sports', 'muscle', 'super', 'suv', 'sedan', 'classic', 'ivpack'

  price: in-server buy price (cash)
]]

-- ── IVPack — GTA IV Iconic Cars ──────────────────────────
-- All fictional names, zero DMCA risk, massive nostalgia factor
Config.Cars['sultan2']    = { label = 'Sultan Classic',  category = 'sports',  price = 45000,  vipTier = nil     }
Config.Cars['infernus2']  = { label = 'Infernus Classic', category = 'super',  price = 180000, vipTier = nil     }
Config.Cars['turismo2']   = { label = 'Turismo Classic', category = 'super',   price = 165000, vipTier = nil     }
Config.Cars['comet2']     = { label = 'Comet',           category = 'sports',  price = 75000,  vipTier = nil     }
Config.Cars['feltzer2']   = { label = 'Feltzer',         category = 'sports',  price = 55000,  vipTier = nil     }
Config.Cars['df8']        = { label = 'DF8-90',          category = 'sports',  price = 60000,  vipTier = nil     }
Config.Cars['coquette2']  = { label = 'Coquette Classic',category = 'classic', price = 120000, vipTier = 'crew'  }
Config.Cars['bullet2']    = { label = 'Bullet GT',       category = 'super',   price = 155000, vipTier = 'crew'  }
Config.Cars['banshee2']   = { label = 'Banshee',         category = 'sports',  price = 90000,  vipTier = nil     }
Config.Cars['uranus']     = { label = 'Uranus',          category = 'sports',  price = 38000,  vipTier = nil     }
Config.Cars['jester2']    = { label = 'Jester Classic',  category = 'sports',  price = 85000,  vipTier = nil     }
Config.Cars['cheetah2']   = { label = 'Cheetah Classic', category = 'super',   price = 195000, vipTier = 'vip'   }
Config.Cars['superd']     = { label = 'Super Diamond',   category = 'suv',     price = 98000,  vipTier = nil     }
Config.Cars['cognoscenti2'] = { label = 'Cognoscenti',   category = 'sedan',   price = 72000,  vipTier = nil     }

-- ── VIP Exclusive Cars ────────────────────────────────────
-- These show in the dealership but are locked behind VIP tier
Config.Cars['syndicategt']  = { label = 'Syndicate GT',  category = 'super',   price = 0,      vipTier = 'vip',     exclusive = true }
Config.Cars['syndicaterm']  = { label = 'Syndicate RM',  category = 'muscle',  price = 0,      vipTier = 'elite',   exclusive = true }
Config.Cars['syndicatefs']  = { label = 'Syndicate FS',  category = 'super',   price = 0,      vipTier = 'founder', exclusive = true }

-- ── Utility: get all cars accessible to a VIP tier ────────
local tierRank = { ['founder'] = 4, ['elite'] = 3, ['vip'] = 2, ['crew'] = 1, [false] = 0 }

function Config.GetAccessibleCars(vipTier)
    local rank = tierRank[vipTier] or 0
    local accessible = {}
    for model, data in pairs(Config.Cars) do
        local required = tierRank[data.vipTier or false] or 0
        if rank >= required then
            accessible[model] = data
        end
    end
    return accessible
end
