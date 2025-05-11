const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');
const ctrl = require('../controllers/volunteerController');
const role = require('../middleware/role');

const router = express.Router();

router.post('/register', auth,role('admin', 'volunteer'),
  body('service_type').isIn(['teaching', 'mentoring', 'healthcare']),
  body('availability').notEmpty(),
  validate,
  ctrl.registerVolunteer
);

router.get('/all', ctrl.getVolunteers);

router.post('/request',auth,role('admin', 'volunteer'),
  body('orphanage_name').notEmpty(),
  body('request_type').isIn(['medical_visit', 'educational_workshop']),
  body('details').notEmpty(),
  validate,
  ctrl.createRequest
);

router.get('/requests', ctrl.getRequests);

router.post('/match', auth,role('admin', 'volunteer'),
  body('volunteer_id').isInt(),
  body('request_id').isInt(),
  validate,
  ctrl.matchVolunteer
);

router.get('/matches', ctrl.getMatches);

module.exports = router;
