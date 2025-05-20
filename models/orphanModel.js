const db = require('../config/db');


exports.create =(data,cb) => {
  db.query(`INSERT into Orphans
    (name,age,education_status,health_condition)
    values(?,?,?,?)`,
    data,cb);
};
exports.findByName =(name,cb) => {
  db.query('SELECT * FROM Orphans where name =?',
    [name], cb);
};

exports.getAll =cb => {
  db.query('SELECT * from Orphans',
    cb);
};
exports.getById =(id,cb)=> {
  db.query('SELECT * from Orphans where id =?',
    [id], cb);
};
exports.deleteById = (id,cb)=> {
  db.query('DELETE FROM Orphans WHERE id =?',
    [id], cb);
};
exports.updateById = (id,data,cb) => {
  db.query('UPDATE Orphans SET name = ?,age = ?,education_status =?,health_condition =?where id =?', [...data,id],cb);
};