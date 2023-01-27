const router = require('express').Router();
const invitesController = require('../controllers/invites');

router.get('/', invitesController.getFriendInvitesForCurrentUser);
router.post('/', invitesController.createNewFriendInvite);
router.delete('/:id', invitesController.deleteFriendInvite);

module.exports = router;
