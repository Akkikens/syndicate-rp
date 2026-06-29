CreateThread(function()
    exports.oxmysql:query([[
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

    exports.oxmysql:query([[
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

    exports.oxmysql:query([[
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

    exports.oxmysql:query([[
        CREATE TABLE IF NOT EXISTS `syndicate_meet_badges` (
            `id`          INT AUTO_INCREMENT PRIMARY KEY,
            `citizen_id`  VARCHAR(50) NOT NULL,
            `badge`       VARCHAR(50) NOT NULL,
            `meet_id`     INT NOT NULL,
            `earned_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_citizen (`citizen_id`)
        )
    ]])
end)

function DB.CreateMeet(locationId, label, startedBy, cb)
    exports.oxmysql:insert(
        'INSERT INTO syndicate_meets (location_id, label, started_by) VALUES (?, ?, ?)',
        { locationId, label, startedBy or 'scheduler' }, cb
    )
end

function DB.GetActiveMeet(locationId, cb)
    exports.oxmysql:fetchSingle(
        "SELECT * FROM syndicate_meets WHERE location_id = ? AND status != 'ended' LIMIT 1",
        { locationId }, cb
    )
end

function DB.EndMeet(meetId, cb)
    exports.oxmysql:query(
        "UPDATE syndicate_meets SET status = 'ended', ended_at = NOW() WHERE id = ?",
        { meetId }, cb
    )
end

function DB.CheckIn(meetId, citizenId, vehicle, cb)
    exports.oxmysql:insert(
        'INSERT IGNORE INTO syndicate_meet_attendance (meet_id, citizen_id, vehicle) VALUES (?, ?, ?)',
        { meetId, citizenId, vehicle }, cb
    )
end

function DB.GetAttendees(meetId, cb)
    exports.oxmysql:fetch([[
        SELECT a.citizen_id, a.vehicle, a.checked_in,
               CONCAT(p.charinfo->>'$.firstname', ' ', p.charinfo->>'$.lastname') as name
        FROM syndicate_meet_attendance a
        LEFT JOIN players p ON p.citizenid = a.citizen_id
        WHERE a.meet_id = ?
    ]], { meetId }, cb)
end

function DB.CastVote(meetId, voterId, targetId, category, cb)
    exports.oxmysql:insert(
        'INSERT IGNORE INTO syndicate_meet_votes (meet_id, voter_id, target_id, category) VALUES (?, ?, ?, ?)',
        { meetId, voterId, targetId, category }, cb
    )
end

function DB.GetVoteResults(meetId, cb)
    exports.oxmysql:fetch([[
        SELECT target_id, category, COUNT(*) as votes
        FROM syndicate_meet_votes
        WHERE meet_id = ?
        GROUP BY target_id, category
        ORDER BY category, votes DESC
    ]], { meetId }, cb)
end

function DB.AwardBadge(citizenId, badge, meetId, cb)
    exports.oxmysql:insert(
        'INSERT INTO syndicate_meet_badges (citizen_id, badge, meet_id) VALUES (?, ?, ?)',
        { citizenId, badge, meetId }, cb
    )
end

function DB.GetPlayerBadges(citizenId, cb)
    exports.oxmysql:fetch(
        'SELECT badge, meet_id, earned_at FROM syndicate_meet_badges WHERE citizen_id = ? ORDER BY earned_at DESC',
        { citizenId }, cb
    )
end

DB = DB or {}
