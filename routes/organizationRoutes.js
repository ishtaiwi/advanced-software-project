const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const orgController = require('../controllers/organizationController');

const router = express.Router();

router.get('/', orgController.getAllOrganizations);
router.post('/', 
  auth,
  body('name').notEmpty(),
  validate,
  orgController.createOrganization);
router.patch('/verify/:id', auth, orgController.verifyOrganization);

module.exports = router;
