const router = require('express').Router();
const chatsController = require('../controllers/chats');

router.get('/', chatsController.getChatsForCurrentUser);
router.post('/', chatsController.createNewChat);

module.exports = router;
