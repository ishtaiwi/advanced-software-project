const Donation =require('../models/donationModel');
const db =require('../config/db');

exports.getRevenueSummary =(req,res)=>{
  Donation.getAllWithFees((err,rows)=>{
    if (err) return res.status(500).json({error:err.message});

    const totalDonations=rows.reduce((sum,r)=> sum + parseFloat(r.amount),0);
    const totalFees=rows.reduce((sum,r)=> sum + parseFloat(r.platform_fee),0);

    res.json({
      totalDonations,
      totalFees,
      donations:rows
    });
  });
};

exports.addPartner =(req,res)=>{
  const{name,address} =
  req.body;
  db.query(
    'INSERT into Organizations (name,address,verified) VALUES (?,?,?)',
    [name,address,true],
    (err,result)=>{
      if (err) return res.status(500).json({error:err.message});
      res.status(201).json({msg:'Partner added',id:result.insertId});
    }
  );
};

exports.getPartners=(req,res)=>{
  db.query(
    'SELECT * from Organizations where verified = TRUE',
    (err,rows)=> {
      if (err) return res.status(500).json({error: err.message});
      res.json(rows);
    }
  );
};
