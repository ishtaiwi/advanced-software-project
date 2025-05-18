const db = require('../config/db');

exports.createCampaign =(data,cb) => {
  db.query('INSERT INTO Emergency_Campaigns (title, description, required_amount) VALUES (?, ?, ?)',
    data,cb);
};

exports.getAll =(cb)=> {
  db.query('SELECT * FROM Emergency_Campaigns',cb);
};

exports.getById = (id,cb)=> {
  db.query('SELECT * FROM Emergency_Campaigns WHERE id = ?',
    [id],cb);
};



exports.addDonation = (data,cb)=>{
  db.query('INSERT INTO Campaign_Donations (campaign_id,user_id,amount,payment_status) VALUES (?,?,?,?)',
    data,cb);
};

exports.getAllDonors =(cb)=>{
  db.query('SELECT email FROM Users WHERE role ="donor"',cb);
};
exports.incrementRaisedAmount = (campaign_id,amount,cb) => {
  db.query(
    'UPDATE Emergency_Campaigns SET raised_amount = raised_amount + ? WHERE id =?',
    [amount,campaign_id],
    cb
  );
};
exports.updateStatus = (id,status,cb)=> {
  db.query('UPDATE Emergency_Campaigns SET status =? WHERE id =?',[status,id],cb);
};