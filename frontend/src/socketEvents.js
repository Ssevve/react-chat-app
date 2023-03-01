const subscribeToMessageEvents = ({ socket, dispatch, addMessage, updateChat }) => {
  socket.on('receiveMessage', ({ newMessage, updatedChat }) => {
    dispatch(addMessage(newMessage));
    dispatch(updateChat(updatedChat));
  });
};

const subscribeToUserEvents = ({ socket, setConnectedUsers }) => {
  socket.on('receiveConnectedUsers', ({ users }) => {
    setConnectedUsers(users);
  });
};

const subscribeToFriendEvents = ({
  socket,
  dispatch,
  addFriend,
  removeFriend,
  addFriendInvite,
  removeFriendInvite,
}) => {
  socket.on('receiveFriendInvite', (newFriendInvite) => {
    dispatch(addFriendInvite(newFriendInvite));
  });

  socket.on('cancelFriendInvite', (inviteId) => {
    dispatch(removeFriendInvite(inviteId));
  });

  socket.on('addFriend', (acceptingUser) => {
    dispatch(addFriend(acceptingUser));
  });

  socket.on('removeFriend', (friendId) => dispatch(removeFriend(friendId)));
};

export { subscribeToMessageEvents, subscribeToUserEvents, subscribeToFriendEvents };
