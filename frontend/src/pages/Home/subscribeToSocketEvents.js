const subscribeToSocketEvents = ({
  socket,
  setMessages,
  friendInvites,
  setFriendInvites,
  setFriends,
  setChats,
  setConnectedUsers,
}) => {
  socket.on('receiveMessage', ({ newMessage, newChats }) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setChats(newChats);
  });

  socket.on('receiveConnectedUsers', ({ users }) => {
    setConnectedUsers(users);
  });

  socket.on('receiveFriendInvite', (newFriendInvite) => {
    setFriendInvites((prevInvites) => [newFriendInvite, ...prevInvites]);
  });

  socket.on('friendInviteAccepted', ({ newFriends, friendInviteId }) => {
    setFriends(newFriends);
    const newFriendInvites = friendInvites.filter((inv) => inv._id !== friendInviteId);
    setFriendInvites(newFriendInvites);
  });
};

export default subscribeToSocketEvents;
