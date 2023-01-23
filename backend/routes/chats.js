const router = require('express').Router();
const chatsController = require('../controllers/chats');

router.get('/', chatsController.getChatsForCurrentUser);
router.post('/', chatsController.createNewChat);
router.patch('/:chatId', chatsController.updateLastMessage);

module.exports = router;
