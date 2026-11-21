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

-- No cars are listed yet. The previous placeholder list named models that are not
-- installed (and several that do not exist), so it was removed. Add an entry only
-- for a model you have actually streamed (see docs/cars.md), for example:
--
--   Config.Cars['mymodel'] = { label = 'My Car', category = 'sports', price = 45000, vipTier = nil }
--
-- Syndicate exclusives (price 0, VIP-gated) use `exclusive = true`.

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
