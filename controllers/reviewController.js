const Review = require('../models/reviewModel');

const db = require('../config/db');

	exports.leaveReview = (req, res) => {
	  const { organization_id, rating, feedback } = req.body;
	  const user_id = req.user.id;

	  Review.create([user_id, organization_id, rating, feedback], (err, result) => {
		if (err) return res.status(500).json({ error: err.message });

		//  recalculate average rating
		const sql = `
		  UPDATE Organizations
		  SET rating = (
			SELECT ROUND(AVG(rating), 1)
			FROM Reviews
			WHERE organization_id = ?
		  )
		  WHERE id = ?
		`;
		db.query(sql, [organization_id, organization_id], (err2) => {
		  if (err2) return res.status(500).json({ error: err2.message });

		  res.status(201).json({ msg: 'Review added and rating updated', id: result.insertId });
		});
	  });
	};
exports.getOrganizationReviews = (req, res) => {
  const { id } = req.params;
  Review.getByOrganization(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
