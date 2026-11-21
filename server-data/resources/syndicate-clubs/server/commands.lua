-- Staff commands for club management.
-- Registered as restricted commands: FiveM checks the ACE `command.<name>` itself
-- (granted to group.admin in server.cfg). The console (source 0) is always allowed.

-- Admin: force-disband any club by name
RegisterCommand('clubdisband', function(_, args)
    local clubName = table.concat(args, ' ')
    local club = DB.GetClubByName(clubName)
    if not club then
        print('[clubs] Club not found: ' .. clubName)
        return
    end
    DisbandClubById(club.id, 'admin')
end, true)

-- Admin: list all clubs to console
RegisterCommand('clublist', function()
    local clubs = DB.GetAllClubs()
    print(('[clubs] %d clubs registered:'):format(#clubs))
    for _, c in ipairs(clubs) do
        print(('  [%s] %s - %d members, %d wins'):format(c.tag, c.name, c.member_count, c.wins))
    end
end, true)
