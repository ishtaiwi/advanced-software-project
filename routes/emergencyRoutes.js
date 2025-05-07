const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const emergencyController = require('../controllers/emergencyController');

const router = express.Router();

// Create campaign (admin)
router.post('/campaigns',
  auth,
  body('title').notEmpty(),
  body('description').notEmpty(),
  body('required_amount').isNumeric(),
  validate,
  emergencyController.createCampaign
);

// View all campaigns
router.get('/campaigns', emergencyController.getCampaigns);

// Donate to campaign (any authenticated user)
router.post('/donate',
  auth,
  body('campaign_id').isInt(),
  body('amount').isNumeric(),
  validate,
  emergencyController.donateToCampaign
);

module.exports = router;
