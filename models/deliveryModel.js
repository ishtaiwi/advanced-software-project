const db = require('../config/db');

exports.create = (data, cb) => {
  db.query('INSERT INTO Deliveries (donation_id, current_location, delivery_status) VALUES (?, ?, ?)', data, cb);
};

exports.getAll = cb => {
  db.query('SELECT * FROM Deliveries', cb);
};

exports.getById = (id, cb) => {
  db.query('SELECT * FROM Deliveries WHERE id = ?', [id], cb);
};

exports.updateStatus = (id, data, cb) => {
  db.query('UPDATE Deliveries SET current_location = ?, delivery_status = ? WHERE id = ?', [...data, id], cb);
};

exports.delete = (id, cb) => {
  db.query('DELETE FROM Deliveries WHERE id = ?', [id], cb);
};
