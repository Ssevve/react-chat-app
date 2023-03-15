import { io } from 'socket.io-client';
import { addMessage } from 'features/messages/messagesSlice';
import { updateChat } from 'features/chats/chatsSlice';
import { setConnectedUsers } from 'features/users/usersSlice';
import { addFriend, removeFriend } from 'features/friends/friendsSlice';
import { addFriendInvite, removeFriendInvite } from 'features/friendInvites/friendInvitesSlice';

const socketMiddleware = (store) => {
  let socket = null;

  return (next) => (action) => {
    if (store.getState().auth.isLoggedIn && !socket) {
      socket = io(process.env.REACT_APP_SOCKET_URL, {
        auth: {
          accessToken: store.getState().auth.accessToken,
        },
      });

      socket.on('receiveConnectedUsers', (connectedUsers) => {
        store.dispatch(setConnectedUsers(connectedUsers));
      });

      socket.on('receiveMessage', ({ newMessage, updatedChat }) => {
        store.dispatch(addMessage(newMessage));
        store.dispatch(updateChat(updatedChat));
      });

      socket.on('addFriend', (acceptingUser) => {
        store.dispatch(addFriend(acceptingUser));
      });

      socket.on('removeFriend', (friendId) => store.dispatch(removeFriend(friendId)));

      socket.on('receiveFriendInvite', (newFriendInvite) => {
        store.dispatch(addFriendInvite(newFriendInvite));
      });

      socket.on('cancelFriendInvite', (inviteId) => {
        store.dispatch(removeFriendInvite(inviteId));
      });
    }

    if (action.type === 'auth/logout') {
      socket.disconnect();
      socket = null;
    }

    next(action);
  };
};
export default socketMiddleware;
