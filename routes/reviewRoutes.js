const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/',
  auth,
  body('organization_id').isInt(),
  body('rating').isInt({ min: 1, max: 5 }),
  validate,
  reviewController.leaveReview
);

router.get('/:id', reviewController.getOrganizationReviews);

module.exports = router;
