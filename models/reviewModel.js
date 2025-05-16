const db = require('../config/db');

exports.create = (data,cb) => {
  db.query(`INSERT INTO Reviews
     (user_id, organization_id, rating, feedback) 
     VALUES (?, ?, ?, ?)`,
     data, cb);
};

exports.getByOrganization = (id,cb) => {
  db.query('SELECT * FROM Reviews WHERE organization_id = ?',
    [id],cb);
};
