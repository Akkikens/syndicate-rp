-- Database layer. All functions are synchronous (oxmysql .await) and must be called
-- from a thread or event handler. Loaded BEFORE server/main.lua (see fxmanifest).

DB = {}

-- Create tables in order so foreign keys never race (club table before member table).
CreateThread(function()
    MySQL.query.await([[
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

    MySQL.query.await([[
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

    -- A citizen can belong to at most one club. Also applied to databases created
    -- by older versions of this resource (fails harmlessly if duplicate rows exist).
    MySQL.query.await(
        'ALTER TABLE `syndicate_club_members` ADD UNIQUE INDEX IF NOT EXISTS `uq_citizen` (`citizen_id`)')

    DB.ready = true
end)

function DB.WaitReady()
    while not DB.ready do Wait(100) end
end

function DB.GetClubByName(name)
    return MySQL.single.await('SELECT * FROM syndicate_clubs WHERE name = ?', { name })
end

function DB.ClubExists(name, tag)
    return MySQL.scalar.await(
        'SELECT COUNT(*) FROM syndicate_clubs WHERE name = ? OR tag = ?', { name, tag }) > 0
end

function DB.GetClubById(id)
    return MySQL.single.await('SELECT * FROM syndicate_clubs WHERE id = ?', { id })
end

function DB.GetPlayerClub(citizenId)
    return MySQL.single.await([[
        SELECT c.*, m.role
        FROM syndicate_clubs c
        JOIN syndicate_club_members m ON m.club_id = c.id
        WHERE m.citizen_id = ?
    ]], { citizenId })
end

function DB.GetMemberRole(clubId, citizenId)
    return MySQL.scalar.await(
        'SELECT role FROM syndicate_club_members WHERE club_id = ? AND citizen_id = ?',
        { clubId, citizenId })
end

function DB.CountMembers(clubId)
    return MySQL.scalar.await('SELECT COUNT(*) FROM syndicate_club_members WHERE club_id = ?', { clubId }) or 0
end

function DB.CountOfficers(clubId)
    return MySQL.scalar.await(
        "SELECT COUNT(*) FROM syndicate_club_members WHERE club_id = ? AND role = 'officer'", { clubId }) or 0
end

function DB.CountClubs()
    return MySQL.scalar.await('SELECT COUNT(*) FROM syndicate_clubs') or 0
end

function DB.GetClubMembers(clubId)
    -- charinfo is a TEXT column holding JSON; MariaDB has no ->> operator.
    return MySQL.query.await([[
        SELECT m.citizen_id, m.role, m.joined_at,
               CONCAT(
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), ' ',
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))) AS name
        FROM syndicate_club_members m
        LEFT JOIN players p ON p.citizenid = m.citizen_id
        WHERE m.club_id = ?
        ORDER BY FIELD(m.role, 'owner','officer','member'), m.joined_at ASC
    ]], { clubId }) or {}
end

-- Returns the new club id, or nil if the name/tag is taken or an insert failed.
function DB.CreateClub(name, tag, ownerId)
    local ok, clubId = pcall(MySQL.insert.await,
        'INSERT INTO syndicate_clubs (name, tag, owner_id) VALUES (?, ?, ?)',
        { name, tag, ownerId })
    if not ok or not clubId or clubId == 0 then return nil end

    local ok2, memberId = pcall(MySQL.insert.await,
        'INSERT INTO syndicate_club_members (club_id, citizen_id, role) VALUES (?, ?, ?)',
        { clubId, ownerId, 'owner' })
    if not ok2 or not memberId or memberId == 0 then
        MySQL.update.await('DELETE FROM syndicate_clubs WHERE id = ?', { clubId })
        return nil
    end
    return clubId
end

-- Returns true if a row was inserted (false if already in a club: UNIQUE(citizen_id)).
function DB.AddMember(clubId, citizenId, role)
    local ok, id = pcall(MySQL.insert.await,
        'INSERT IGNORE INTO syndicate_club_members (club_id, citizen_id, role) VALUES (?, ?, ?)',
        { clubId, citizenId, role or 'member' })
    return ok and id ~= nil and id ~= 0
end

function DB.RemoveMember(clubId, citizenId)
    return (MySQL.update.await(
        'DELETE FROM syndicate_club_members WHERE club_id = ? AND citizen_id = ?',
        { clubId, citizenId }) or 0) > 0
end

function DB.UpdateMemberRole(clubId, citizenId, role)
    return (MySQL.update.await(
        'UPDATE syndicate_club_members SET role = ? WHERE club_id = ? AND citizen_id = ?',
        { role, clubId, citizenId }) or 0) > 0
end

function DB.SetOwner(clubId, citizenId)
    MySQL.update.await('UPDATE syndicate_clubs SET owner_id = ? WHERE id = ?', { citizenId, clubId })
end

function DB.DisbandClub(clubId)
    MySQL.update.await('DELETE FROM syndicate_clubs WHERE id = ?', { clubId })
end

function DB.GetAllClubs()
    return MySQL.query.await([[
        SELECT c.id, c.name, c.tag, c.wins, COUNT(m.id) AS member_count
        FROM syndicate_clubs c
        LEFT JOIN syndicate_club_members m ON m.club_id = c.id
        GROUP BY c.id
        ORDER BY c.wins DESC, c.name ASC
    ]]) or {}
end
