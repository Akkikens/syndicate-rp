-- Database layer (synchronous, oxmysql .await). Loaded BEFORE server/main.lua.

DB = {}

CreateThread(function()
    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `syndicate_meets` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `location_id` VARCHAR(50) NOT NULL,
            `label`       VARCHAR(100) NOT NULL,
            `started_by`  VARCHAR(50) DEFAULT 'scheduler',
            `status`      ENUM('open','voting','ended') DEFAULT 'open',
            `started_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `ended_at`    TIMESTAMP NULL,
            INDEX idx_status (`status`)
        )
    ]])

    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `syndicate_meet_attendance` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `meet_id`     INT NOT NULL,
            `citizen_id`  VARCHAR(50) NOT NULL,
            `vehicle`     VARCHAR(50) DEFAULT NULL,
            `checked_in`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uq_attend (`meet_id`, `citizen_id`),
            FOREIGN KEY (`meet_id`) REFERENCES `syndicate_meets`(`id`) ON DELETE CASCADE
        )
    ]])

    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `syndicate_meet_votes` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `meet_id`     INT NOT NULL,
            `voter_id`    VARCHAR(50) NOT NULL,
            `target_id`   VARCHAR(50) NOT NULL,
            `category`    VARCHAR(50) NOT NULL,
            `voted_at`    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE KEY uq_vote (`meet_id`, `voter_id`, `category`),
            FOREIGN KEY (`meet_id`) REFERENCES `syndicate_meets`(`id`) ON DELETE CASCADE
        )
    ]])

    MySQL.query.await([[
        CREATE TABLE IF NOT EXISTS `syndicate_meet_badges` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `citizen_id`  VARCHAR(50) NOT NULL,
            `badge`       VARCHAR(50) NOT NULL,
            `meet_id`     INT NOT NULL,
            `earned_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_citizen (`citizen_id`)
        )
    ]])

    -- Meets left 'open' or 'voting' by a crash/restart can never be closed (their
    -- in-memory voting state is gone). End them at boot.
    MySQL.update.await("UPDATE syndicate_meets SET status = 'ended', ended_at = NOW() WHERE status != 'ended'")

    DB.ready = true
end)

function DB.WaitReady()
    while not DB.ready do Wait(100) end
end

-- Returns the new meet id or nil
function DB.CreateMeet(locationId, label, startedBy)
    local id = MySQL.insert.await(
        'INSERT INTO syndicate_meets (location_id, label, started_by) VALUES (?, ?, ?)',
        { locationId, label, startedBy or 'scheduler' })
    if not id or id == 0 then return nil end
    return id
end

function DB.GetMeet(meetId)
    return MySQL.single.await('SELECT * FROM syndicate_meets WHERE id = ?', { meetId })
end

function DB.GetActiveMeetAt(locationId)
    return MySQL.single.await(
        "SELECT * FROM syndicate_meets WHERE location_id = ? AND status != 'ended' LIMIT 1", { locationId })
end

function DB.GetActiveMeets()
    return MySQL.query.await("SELECT id, location_id, label, status FROM syndicate_meets WHERE status != 'ended'") or {}
end

-- Moves open -> voting. Returns true only for the caller that changed the row.
function DB.SetVoting(meetId)
    return (MySQL.update.await(
        "UPDATE syndicate_meets SET status = 'voting' WHERE id = ? AND status = 'open'", { meetId }) or 0) > 0
end

-- Ends a meet from any non-ended state. Returns true only for the caller that changed the row.
function DB.EndMeet(meetId)
    return (MySQL.update.await(
        "UPDATE syndicate_meets SET status = 'ended', ended_at = NOW() WHERE id = ? AND status != 'ended'",
        { meetId }) or 0) > 0
end

-- Atomically ends a meet that is in the voting state (guards against double-close/double-pay).
function DB.EndVotingMeet(meetId)
    return (MySQL.update.await(
        "UPDATE syndicate_meets SET status = 'ended', ended_at = NOW() WHERE id = ? AND status = 'voting'",
        { meetId }) or 0) > 0
end

-- Returns true if a NEW row was inserted. INSERT IGNORE reports insertId 0 for a duplicate.
function DB.CheckIn(meetId, citizenId, vehicle)
    local id = MySQL.insert.await(
        'INSERT IGNORE INTO syndicate_meet_attendance (meet_id, citizen_id, vehicle) VALUES (?, ?, ?)',
        { meetId, citizenId, vehicle })
    return id ~= nil and id ~= 0
end

function DB.IsAttendee(meetId, citizenId)
    return (MySQL.scalar.await(
        'SELECT COUNT(*) FROM syndicate_meet_attendance WHERE meet_id = ? AND citizen_id = ?',
        { meetId, citizenId }) or 0) > 0
end

function DB.CountAttendees(meetId)
    return MySQL.scalar.await('SELECT COUNT(*) FROM syndicate_meet_attendance WHERE meet_id = ?', { meetId }) or 0
end

function DB.GetAttendees(meetId)
    -- charinfo is TEXT holding JSON; MariaDB has no ->> operator.
    return MySQL.query.await([[
        SELECT a.citizen_id, a.vehicle, a.checked_in,
               CONCAT(
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.firstname')), ' ',
                   JSON_UNQUOTE(JSON_EXTRACT(p.charinfo, '$.lastname'))) AS name
        FROM syndicate_meet_attendance a
        LEFT JOIN players p ON p.citizenid = a.citizen_id
        WHERE a.meet_id = ?
    ]], { meetId }) or {}
end

-- Returns true if a NEW vote row was inserted (one vote per voter per category).
function DB.CastVote(meetId, voterId, targetId, category)
    local id = MySQL.insert.await(
        'INSERT IGNORE INTO syndicate_meet_votes (meet_id, voter_id, target_id, category) VALUES (?, ?, ?, ?)',
        { meetId, voterId, targetId, category })
    return id ~= nil and id ~= 0
end

function DB.GetVoteResults(meetId)
    return MySQL.query.await([[
        SELECT target_id, category, COUNT(*) AS votes
        FROM syndicate_meet_votes
        WHERE meet_id = ?
        GROUP BY target_id, category
        ORDER BY category, votes DESC, target_id ASC
    ]], { meetId }) or {}
end

function DB.AwardBadge(citizenId, badge, meetId)
    MySQL.insert.await(
        'INSERT INTO syndicate_meet_badges (citizen_id, badge, meet_id) VALUES (?, ?, ?)',
        { citizenId, badge, meetId })
end
