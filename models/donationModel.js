const db = require('../config/db');

exports.create = (data, cb) => {
  db.query('INSERT INTO Donations (user_id, amount, category, payment_status, payment_method) VALUES (?, ?, ?, ?, ?)', data, cb);
};

exports.getByUserId = (userId, cb) => {
  db.query('SELECT * FROM Donations WHERE user_id = ?', [userId], cb);
};

exports.getAll = (cb) => {
  db.query('SELECT * FROM Donations', cb);
};

exports.updateById = (id, data, cb) => {
  db.query('UPDATE Donations SET amount = ?, category = ?, payment_status = ?, payment_method = ? WHERE id = ?', [...data, id], cb);
};

exports.deleteById = (id, cb) => {
  db.query('DELETE FROM Donations WHERE id = ?', [id], cb);
};
