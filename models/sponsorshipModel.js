const db = require('../config/db');

exports.create = (data, cb)=> {
  db.query('INSERT INTO Sponsorships (orphan_id,user_id,donation_model) VALUES (?,?,?)',data,cb);
};

exports.getByOrphanId = (id,cb)=> {
  db.query('SELECT * FROM Sponsorships WHERE orphan_id = ?',[id],cb);
};