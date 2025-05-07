const Review = require('../models/reviewModel');

exports.leaveReview = (req, res) => {
  const { organization_id, rating, feedback } = req.body;
  const user_id = req.user.id;

  Review.create([user_id, organization_id, rating, feedback], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ msg: 'Review added', id: result.insertId });
  });
};

exports.getOrganizationReviews = (req, res) => {
  const { id } = req.params;
  Review.getByOrganization(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
