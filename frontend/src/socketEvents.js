const subscribeToMessageEvents = ({ socket, dispatch, addMessage, updateChat }) => {
  socket.on('receiveMessage', ({ newMessage, updatedChat }) => {
    dispatch(addMessage(newMessage));
    dispatch(updateChat(updatedChat));
  });
};

const subscribeToUserEvents = ({ socket, dispatch, setConnectedUsers }) => {
  socket.on('receiveConnectedUsers', ({ users }) => {
    dispatch(setConnectedUsers(users));
  });
};

const subscribeToFriendEvents = ({ socket, dispatch, addFriend, removeFriend }) => {
  socket.on('addFriend', (acceptingUser) => {
    dispatch(addFriend(acceptingUser));
  });

  socket.on('removeFriend', (friendId) => dispatch(removeFriend(friendId)));
};

const subscribeToFriendInviteEvents = ({
  socket,
  dispatch,
  addFriendInvite,
  removeFriendInvite,
}) => {
  socket.on('receiveFriendInvite', (newFriendInvite) => {
    dispatch(addFriendInvite(newFriendInvite));
  });

  socket.on('cancelFriendInvite', (inviteId) => {
    dispatch(removeFriendInvite(inviteId));
  });
};

export {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
  subscribeToFriendInviteEvents,
};
