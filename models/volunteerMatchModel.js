const db = require('../config/db');

exports.create = (data, cb) => {
  db.query('INSERT INTO Volunteer_Matches (volunteer_id, request_id, match_status) VALUES (?, ?, ?)', data, cb);
};

exports.getAll = (cb) => {
  db.query(`
    SELECT vm.*, v.user_id AS volunteer_user_id, vr.orphanage_name, vr.request_type
    FROM Volunteer_Matches vm
    JOIN Volunteers v ON vm.volunteer_id = v.id
    JOIN Volunteer_Requests vr ON vm.request_id = vr.id
  `, cb);
};

exports.getByVolunteerId = (id, cb) => {
  db.query(`
    SELECT vm.*, vr.orphanage_name, vr.request_type
    FROM Volunteer_Matches vm
    JOIN Volunteer_Requests vr ON vm.request_id = vr.id
    WHERE vm.volunteer_id = ?
  `, [id], cb);
};