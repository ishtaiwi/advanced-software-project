const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const donationController = require('../controllers/donationController');

const router = express.Router();

router.post('/',
  auth('admin', 'donor'),
  body('amount').isFloat({ min: 1 }),
  body('category').isIn(['General Fund', 'Education Support', 'Medical Aid']),
  body('payment_status').isIn(['pending', 'completed', 'failed']),
  body('payment_method').notEmpty(),
  validate,
  donationController.createDonation
);

// Donor view their donations
router.get('/my', auth('donor'),donationController.getMyDonations);

router.get('/',auth('admin'),donationController.getAllDonations);


router.put('/:id',
  auth('admin', 'donor'),
  body('amount').isFloat({ min: 1 }),
  body('category').isIn(['General Fund','Education Support','Medical Aid']),
  body('payment_status').isIn(['pending','completed','failed']),
  body('payment_method').notEmpty(),
  validate,
  donationController.updateDonation
);

router.put('/updateStatus/:id',auth('admin'),donationController.updateDonationStatus);

router.delete('/:id',auth('admin'),donationController.deleteDonation);

module.exports = router;
