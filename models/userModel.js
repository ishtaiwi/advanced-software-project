const db = require('../config/db');

exports.createUser = (data, cb) => {
  db.query(`INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)`, data, cb);
};

exports.findByEmail = (email, cb) => {
  db.query(`SELECT * FROM Users WHERE email = ?`, [email], cb);
};