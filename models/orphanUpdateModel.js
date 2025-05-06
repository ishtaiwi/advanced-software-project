const db = require('../config/db');

exports.create = (data, cb) => {
  db.query('INSERT INTO Orphan_Updates (orphan_id, update_type, description) VALUES (?, ?, ?)', data, cb);
};

exports.getByOrphanId = (id, cb) => {
  db.query('SELECT * FROM Orphan_Updates WHERE orphan_id = ?', [id], cb);
};
