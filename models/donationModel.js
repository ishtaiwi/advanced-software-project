const db = require('../config/db');

exports.create = (data,cb) => {
  db.query(
    `INSERT INTO Donations
     (user_id, amount, category, payment_status, payment_method)
      VALUES (?, ?, ?, ?, ?)`,
    data,cb
  );
};
exports.getByUserId = (userId,cb) => {
  db.query('SELECT * FROM Donations WHERE user_id =?', [userId],cb);
};
exports.getAll = (cb) => {
  
  db.query('SELECT * FROM Donations',cb);
};

exports.getById = (id,cb) => {
  db.query('SELECT * FROM Donations WHERE id =?', 
    [id],(err, results) => {
    if (err) return cb(err);
    cb(null,results[0]); // return single result
  });
};

exports.updateById = (id, data,cb) => {
  db.query(
    'UPDATE Donations SET amount =?, category =?,payment_status = ?,payment_method = ? WHERE id = ?',
    [...data, id],
    cb
  );
};

exports.updateStatus =(id, status,cb) => {
  db.query('UPDATE Donations SET payment_status = ? WHERE id = ?', 
    [status, id], cb);
};

exports.deleteById = (id, cb) => {
  db.query('DELETE FROM Donations WHERE id = ?', [id], cb);
};

exports.getAllWithFees = (cb) => {
  db.query(
    `SELECT *,
      amount * 0.05 AS platform_fee,
      amount * 0.95 AS final_amount
     FROM Donations`,
    cb
  );
};

