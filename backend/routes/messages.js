const router = require('express').Router();
const messagesController = require('../controllers/messages');

// router.get('/single/:messageId', messagesController.getMessageById);
router.get('/chats', messagesController.getMessagesForChats);
router.post('/', messagesController.createNewMessage);

module.exports = router;
