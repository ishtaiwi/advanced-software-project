const db = require('../config/db');

exports.create = (data,cb)=> {
  db.query('INSERT INTO Volunteers (user_id,service_type,availability) VALUES (?,?,?)',data,cb);
};

exports.getAll = (cb)=>{
  db.query('SELECT * FROM Volunteers',cb);
};

exports.getById = (id,cb) => {
  db.query('SELECT * FROM Volunteers WHERE id = ?',[id],cb);
};