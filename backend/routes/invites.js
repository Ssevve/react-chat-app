const router = require('express').Router();
const invitesController = require('../controllers/invites');

router.get('/:userId', invitesController.getFriendInvitesByUserId);
router.post('/', invitesController.createNewFriendInvite);
router.delete('/:id', invitesController.deleteFriendInvite);

module.exports = router;
