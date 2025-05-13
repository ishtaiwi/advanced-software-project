const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const revenueController = require('../controllers/revenueController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/summary',auth('admin'), revenueController.getRevenueSummary);

router.post('/partner',auth('admin'),
  body('name').notEmpty(),
  body('address').notEmpty(),
  validate,
  revenueController.addPartner
);

// view verifieeeeeeeeeeed NGO partners
router.get('/partners', auth('admin'), revenueController.getPartners);

module.exports = router;
