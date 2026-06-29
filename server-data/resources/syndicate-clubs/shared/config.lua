ClubConfig = {}

-- ── Limits ────────────────────────────────────────────────
ClubConfig.MaxClubs        = 30    -- total clubs allowed on the server
ClubConfig.MaxMembers      = 20    -- members per club
ClubConfig.MaxOfficers     = 4     -- officers per club (below owner)
ClubConfig.CreationCost    = 25000 -- cash to found a club
ClubConfig.DisbandRefund   = 0     -- no refund on disband

-- ── Roles ─────────────────────────────────────────────────
-- Ordered highest → lowest authority
ClubConfig.Roles = {
    { id = 'owner',   label = 'Owner',   canInvite = true,  canKick = true,  canPromote = true,  canDisband = true  },
    { id = 'officer', label = 'Officer', canInvite = true,  canKick = true,  canPromote = false, canDisband = false },
    { id = 'member',  label = 'Member',  canInvite = false, canKick = false, canPromote = false, canDisband = false },
}

-- ── NPC Recruiter (where players create/manage clubs) ─────
ClubConfig.RecruiterNPC = {
    model  = 'a_m_y_musclbeac_01',
    coords = vector4(928.1, -2033.3, 30.1, 199.0), -- LS Car Meet area
    label  = 'Club Recruiter',
}

-- ── Club Tag ──────────────────────────────────────────────
ClubConfig.TagMaxLength   = 4   -- e.g. "[SYND]"
ClubConfig.TagAllowedChars = '^[A-Z0-9]+$'

-- ── Club Garage ───────────────────────────────────────────
ClubConfig.SharedGarageSlots = 5   -- shared cars all members can pull

-- ── Plate Prefix per rank ─────────────────────────────────
-- Clubs can reserve a 3-char prefix for member plates (cosmetic)
ClubConfig.PlatePrefix = {
    enabled    = true,
    maxLength  = 3,
}

-- ── Territory (visual only — no gameplay advantage) ───────
-- Each club can "claim" one meet location as their home turf
-- Shown on map as a colored blip
ClubConfig.TerritoryEnabled = true
