const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const orphanController = require('../controllers/orphanController');
const admin = require('../middleware/admin'); 

const router = express.Router();

router.post('/', auth,admin,
  body('name').notEmpty(),
  body('age').isInt({ min: 1 }),
  validate,
  orphanController.createOrphan);

router.get('/', orphanController.getAllOrphans);
router.get('/:id', orphanController.getOrphanDetails);

router.post('/sponsor', auth,
  body('orphan_id').isInt(),
  body('donation_model').notEmpty(),
  validate,
  orphanController.sponsorOrphan);
  
  router.delete('/:id', auth,admin, orphanController.deleteOrphan);

  router.put('/:id', auth, admin,
    body('name').optional().notEmpty(),
    body('age').optional().isInt({ min: 1 }),
    body('education_status').optional().notEmpty(),
    body('health_condition').optional().notEmpty(),
    validate,
    orphanController.updateOrphan
  );


router.post('/update', auth,
  body('orphan_id').isInt(),
  body('update_type').isIn(['photo', 'progress_report', 'medical_update']),
  body('description').notEmpty(),
  validate,
  orphanController.addOrphanUpdate);

module.exports = router;