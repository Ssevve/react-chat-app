const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/friends/:userId', usersController.getFriendsByUserId);

module.exports = router;
