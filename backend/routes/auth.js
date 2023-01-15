const router = require('express').Router();
const authController = require('../controllers/auth');
const validateLogin = require('../middleware/validateLogin');
const validateSignup = require('../middleware/validateSignup');

router.post('/login', validateLogin, authController.handleLogin);
router.post('/signup', validateSignup, authController.handleSignup);
router.get('/logout', authController.handleLogout);

module.exports = router;
