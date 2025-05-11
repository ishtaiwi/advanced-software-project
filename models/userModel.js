const db = require('../config/db');

exports.createUser = (data, cb) => {
  db.query(`INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`, data, cb);
};
exports.getAllUsers = (cb) => {
  db.query(`SELECT * FROM Users`, cb);
};

exports.findByEmail = (email, cb) => {
  db.query(`SELECT * FROM Users WHERE email = ?`, [email], cb);
};
exports.deleteUser = (id, cb) => {
  db.query(`DELETE FROM Users WHERE id = ?`, [id], cb);
};