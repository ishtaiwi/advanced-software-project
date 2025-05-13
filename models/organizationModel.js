const db = require('../config/db');

exports.getAll = cb => {
  db.query('SELECT * FROM Organizations', cb);
};

exports.verify = (id, cb) => {
  db.query('UPDATE Organizations SET verified = TRUE WHERE id = ?', [id], cb);
};

exports.create = (data, cb) => {
  db.query('INSERT INTO Organizations (name, address) VALUES (?, ?)', data, cb);
};
exports.delete = (id, cb) => {
  db.query('DELETE FROM Organizations WHERE id = ?', [id], cb);
};
