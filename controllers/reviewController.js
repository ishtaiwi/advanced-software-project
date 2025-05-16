const review=require('../models/reviewModel');

const db =require('../config/db');

	exports.leaveReview=(req,res)=>{
	  const {organization_id,rating,feedback}= req.body;
	  const user_id=req.user.id;

	  review.create([user_id,organization_id,rating,feedback],(err,result)=>{
		if (err) return res.status(500).json({error:err.message});

		//  recalculate average rating
		const sql = `
		  UPDATE Organizations
		  set rating = (
			SELECT ROUND(AVG(rating), 1)
			from Reviews
			where organization_id =?
		  )
		  where id =?
		`;
		db.query(sql,[organization_id,organization_id],(e2)=>{
		  if (e2) return res.status(500).json({error:e2.message});

		  res.status(201).json({msg:'review added and rating updated',id:result.insertId});
		});
	  });
	};
exports.getOrganizationReviews=(req,res)=>{
  const {id}=req.params;
  review.getByOrganization(id,(err,results)=>{
    if (err) return res.status(500).json({error:err.message});
    res.json(results);
  });
};
