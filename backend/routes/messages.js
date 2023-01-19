const router = require('express').Router();
const messagesController = require('../controllers/messages');

router.get('/', messagesController.getMessageById);
router.get('/:chatId', messagesController.getMessagesByChatId);
router.post('/', messagesController.createNewMessage);

module.exports = router;
