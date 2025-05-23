const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/register',
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  validate,
  authController.register
);


router.post('/login',
  body('email').isEmail(),
  body('password').notEmpty(),
  validate,
  authController.login
);
router.delete('/:id',auth('admin'),authController.deleteUser);
router.get('/allUsers',auth('admin'),authController.getAllUsers);
module.exports = router;
