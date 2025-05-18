const db = require('../config/db');

exports.create = (data,cb)=> {
  db.query('INSERT INTO Volunteer_Requests (orphanage_name,request_type,details) VALUES (?,?,?)',
    data,cb);
};

exports.getAll = (cb) => {
  db.query('SELECT * FROM Volunteer_Requests',cb);
};

exports.getById = (id,cb)=> {
  db.query('SELECT * FROM Volunteer_Requests WHERE id =?',[id],cb);
};