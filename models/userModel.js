const db = require('../config/db');
exports.createUser =(data,cb)=> {
  db.query(`INSERT into Users (name,email,password,role)
    VALUES (?,?,?,?)`,
    data,cb);
};

exports.getAllUsers=(cb)=>{
  db.query('select * from Users',
    cb);
  };
  

exports.findByEmail =(email,cb) => {
  db.query(`SELECT * from Users where email =?`,[email],cb);
};
exports.deleteUser= (id,cb)=> {
  db.query(`DELETE from Users where id =?`,
    [id], cb);
};