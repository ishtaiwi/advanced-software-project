const db = require('../config/db');

exports.create = (data, cb) => {
  db.query('INSERT INTO Orphans (name, age, education_status, health_condition) VALUES (?, ?, ?, ?)', data, cb);
};

exports.getAll = cb => {
  db.query('SELECT * FROM Orphans', cb);
};

exports.getById = (id, cb) => {
  db.query('SELECT * FROM Orphans WHERE id = ?', [id], cb);
};
