const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/:userId', usersController.getUserById);
router.get('/search/:query', usersController.getUsersByQuery);
router.get('/friends/:userId', usersController.getFriendsByUserId);
router.put('/addFriend/:senderId', usersController.addFriend);

module.exports = router;
