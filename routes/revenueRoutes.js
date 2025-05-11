const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const revenueController = require('../controllers/revenueController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const router = express.Router();

router.get('/summary', revenueController.getRevenueSummary);

router.post('/partner', auth, role('admin'),
  body('name').notEmpty(),
  body('address').notEmpty(),
  validate,
  revenueController.addPartner
);

// view verifieeeeeeeeeeed NGO partners
router.get('/partners', revenueController.getPartners);

module.exports = router;
