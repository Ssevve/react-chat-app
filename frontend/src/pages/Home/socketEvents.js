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

const subscribeToFriendEvents = ({ socket, setFriendInvites, setFriends, friendInvites }) => {
  socket.on('receiveFriendInvite', (newFriendInvite) => {
    setFriendInvites((prevInvites) => [newFriendInvite, ...prevInvites]);
  });

  socket.on('friendInviteAccepted', ({ newFriends, friendInviteId }) => {
    setFriends(newFriends);
    const newFriendInvites = friendInvites.filter((inv) => inv._id !== friendInviteId);
    setFriendInvites(newFriendInvites);
  });
};

export { subscribeToMessageEvents, subscribeToUserEvents, subscribeToFriendEvents };
