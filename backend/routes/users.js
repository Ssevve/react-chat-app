const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/:userId', usersController.getUserById);
router.get('/search/:query', usersController.getUsersByQuery);
router.get('/friends/:userId', usersController.getFriendsByUserId);

module.exports = router;
