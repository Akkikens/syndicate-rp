-- Create tables on resource start
CreateThread(function()
    exports.oxmysql:query([[
        CREATE TABLE IF NOT EXISTS `syndicate_clubs` (
            `id`           INT AUTO_INCREMENT PRIMARY KEY,
            `name`         VARCHAR(50) NOT NULL UNIQUE,
            `tag`          VARCHAR(4)  NOT NULL UNIQUE,
            `owner_id`     VARCHAR(50) NOT NULL,
            `description`  VARCHAR(255) DEFAULT '',
            `plate_prefix` VARCHAR(3)   DEFAULT NULL,
            `territory`    VARCHAR(50)  DEFAULT NULL,
            `color`        VARCHAR(7)   DEFAULT '#00E676',
            `wins`         INT DEFAULT 0,
            `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_owner (`owner_id`)
        )
    ]])

    exports.oxmysql:query([[
        CREATE TABLE IF NOT EXISTS `syndicate_club_members` (
            `id`         INT AUTO_INCREMENT PRIMARY KEY,
            `club_id`    INT NOT NULL,
            `citizen_id` VARCHAR(50) NOT NULL,
            `role`       ENUM('owner','officer','member') DEFAULT 'member',
            `joined_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uq_member (`club_id`, `citizen_id`),
            INDEX idx_citizen (`citizen_id`),
            FOREIGN KEY (`club_id`) REFERENCES `syndicate_clubs`(`id`) ON DELETE CASCADE
        )
    ]])

    exports.oxmysql:query([[
        CREATE TABLE IF NOT EXISTS `syndicate_club_invites` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `club_id`     INT NOT NULL,
            `inviter_id`  VARCHAR(50) NOT NULL,
            `invitee_id`  VARCHAR(50) NOT NULL,
            `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_invitee (`invitee_id`)
        )
    ]])
end)

-- ── Query helpers ─────────────────────────────────────────

function DB.GetClubByName(name, cb)
    exports.oxmysql:fetchSingle(
        'SELECT * FROM syndicate_clubs WHERE name = ?',
        { name }, cb
    )
end

function DB.GetClubById(id, cb)
    exports.oxmysql:fetchSingle(
        'SELECT * FROM syndicate_clubs WHERE id = ?',
        { id }, cb
    )
end

function DB.GetPlayerClub(citizenId, cb)
    exports.oxmysql:fetchSingle([[
        SELECT c.*, m.role
        FROM syndicate_clubs c
        JOIN syndicate_club_members m ON m.club_id = c.id
        WHERE m.citizen_id = ?
    ]], { citizenId }, cb)
end

function DB.GetClubMembers(clubId, cb)
    exports.oxmysql:fetch([[
        SELECT m.citizen_id, m.role, m.joined_at,
               CONCAT(p.charinfo->>'$.firstname', ' ', p.charinfo->>'$.lastname') as name
        FROM syndicate_club_members m
        LEFT JOIN players p ON p.citizenid = m.citizen_id
        WHERE m.club_id = ?
        ORDER BY FIELD(m.role, 'owner','officer','member'), m.joined_at ASC
    ]], { clubId }, cb)
end

function DB.CreateClub(name, tag, ownerId, cb)
    exports.oxmysql:insert(
        'INSERT INTO syndicate_clubs (name, tag, owner_id) VALUES (?, ?, ?)',
        { name, tag:upper(), ownerId },
        function(id)
            if id then
                exports.oxmysql:insert(
                    'INSERT INTO syndicate_club_members (club_id, citizen_id, role) VALUES (?, ?, ?)',
                    { id, ownerId, 'owner' },
                    function() cb(id) end
                )
            else
                cb(nil)
            end
        end
    )
end

function DB.AddMember(clubId, citizenId, role, cb)
    exports.oxmysql:insert(
        'INSERT IGNORE INTO syndicate_club_members (club_id, citizen_id, role) VALUES (?, ?, ?)',
        { clubId, citizenId, role or 'member' }, cb
    )
end

function DB.RemoveMember(clubId, citizenId, cb)
    exports.oxmysql:query(
        'DELETE FROM syndicate_club_members WHERE club_id = ? AND citizen_id = ?',
        { clubId, citizenId }, cb
    )
end

function DB.UpdateMemberRole(clubId, citizenId, role, cb)
    exports.oxmysql:query(
        'UPDATE syndicate_club_members SET role = ? WHERE club_id = ? AND citizen_id = ?',
        { role, clubId, citizenId }, cb
    )
end

function DB.DisbandClub(clubId, cb)
    exports.oxmysql:query(
        'DELETE FROM syndicate_clubs WHERE id = ?',
        { clubId }, cb
    )
end

function DB.GetAllClubs(cb)
    exports.oxmysql:fetch([[
        SELECT c.*, COUNT(m.id) as member_count
        FROM syndicate_clubs c
        LEFT JOIN syndicate_club_members m ON m.club_id = c.id
        GROUP BY c.id
        ORDER BY c.wins DESC
    ]], {}, cb)
end

DB = DB or {}
