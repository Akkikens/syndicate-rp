-- Staff commands for club management

-- Admin: force-disband any club by name
RegisterCommand('clubdisband', function(src, args)
    if src ~= 0 and not IsPlayerAceAllowed(tostring(src), 'command.clubdisband') then return end
    local clubName = table.concat(args, ' ')
    DB.GetClubByName(clubName, function(club)
        if not club then
            print('[clubs] Club not found: ' .. clubName)
            return
        end
        DB.DisbandClub(club.id, function()
            print('[clubs] Admin disbanded club: ' .. clubName)
        end)
    end)
end, true)

-- Admin: list all clubs to console
RegisterCommand('clublist', function(src, args)
    if src ~= 0 and not IsPlayerAceAllowed(tostring(src), 'command.clublist') then return end
    DB.GetAllClubs(function(clubs)
        print(('[clubs] %d clubs registered:'):format(#clubs))
        for _, c in ipairs(clubs) do
            print(('  [%s] %s — %d members, %d wins, owner: %s'):format(
                c.tag, c.name, c.member_count, c.wins, c.owner_id
            ))
        end
    end)
end, true)

-- Add ACE permissions in server.cfg:
-- add_ace group.admin command.clubdisband allow
-- add_ace group.admin command.clublist allow
