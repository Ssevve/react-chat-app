const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/:userId', usersController.getUserById);
router.get('/search/:query', usersController.getUsersByQuery);
router.get('/friends/:userId', usersController.getFriendsByUserId);
router.put('/addFriend/:senderId', usersController.addFriend);
router.delete('/deleteFriend/:friendId', usersController.deleteFriend);

module.exports = router;
