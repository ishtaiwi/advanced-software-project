const express =require('express');
const { body } =require('express-validator');
const validate =require('../middleware/validate');
const auth = require('../middleware/auth');
const deliveryController = require('../controllers/deliveryController');

const router =express.Router();

router.post('/',
  auth(),
  body('donation_id').isInt(),
  body('current_location').notEmpty(),
  body('delivery_status').isIn(['pending_pickup','in_transit','delivered']),
  validate,
  deliveryController.createDelivery
);

router.get('/',auth(),deliveryController.getAllDeliveries);
router.get('/:id',auth(),deliveryController.getDeliveryById);
router.put('/:id',
  auth(),
  body('current_location').notEmpty(),
  body('delivery_status').isIn(['pending_pickup','in_transit','delivered']),
  validate,
  deliveryController.updateDelivery
);
router.delete('/:id',auth("admin"),deliveryController.deleteDelivery);

module.exports =router;
