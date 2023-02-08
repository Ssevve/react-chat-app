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

const subscribeToFriendEvents = ({ socket, dispatch, addFriend, addFriendInvite }) => {
  socket.on('receiveFriendInvite', (newFriendInvite) => {
    dispatch(addFriendInvite(newFriendInvite));
  });

  socket.on('addFriend', (acceptingUser) => {
    dispatch(addFriend(acceptingUser));
  });
};

export { subscribeToMessageEvents, subscribeToUserEvents, subscribeToFriendEvents };
