const router = require('express').Router();
const messagesController = require('../controllers/messages');

router.get('/:messageId', messagesController.getMessageById);
router.get('/chat/:chatId', messagesController.getMessagesByChatId);
router.post('/', messagesController.createNewMessage);

module.exports = router;
