const router = require('express').Router();
const authController = require('../controllers/auth');
const validateSignup = require('../middleware/validateSignup');

router.post('/signup', validateSignup, authController.handleSignup);

module.exports = router;
