const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const donationController = require('../controllers/donationController');

const router = express.Router();

router.post('/', auth,
  body('amount').isFloat({ min: 1 }),
  body('category').isIn(['General Fund', 'Education Support', 'Medical Aid']),
  body('payment_status').isIn(['pending', 'completed', 'failed']),
  body('payment_method').notEmpty(),
  validate,
  donationController.createDonation);

router.get('/my', auth, donationController.getMyDonations);
router.get('/', donationController.getAllDonations);

router.put('/:id', auth,
  body('amount').isFloat({ min: 1 }),
  body('category').isIn(['General Fund', 'Education Support', 'Medical Aid']),
  body('payment_status').isIn(['pending', 'completed', 'failed']),
  body('payment_method').notEmpty(),
  validate,
  donationController.updateDonation);

router.delete('/:id', auth, donationController.deleteDonation);

module.exports = router;
