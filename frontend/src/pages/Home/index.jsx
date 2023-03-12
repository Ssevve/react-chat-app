import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { updateChat } from 'features/chats/chatsSlice';
import { addMessage, fetchMessages } from 'features/messages/messagesSlice';
import { setConnectedUsers } from 'features/users/usersSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { addFriend, removeFriend, fetchFriends } from 'features/friends/friendsSlice';
import {
  addFriendInvite,
  removeFriendInvite,
  fetchFriendInvites,
} from 'features/friendInvites/friendInvitesSlice';
import { fetchChats } from 'features/chats/chatsSlice';

import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from 'socketEvents';

import ChatPage from './ChatPage';
import Loading from './Loading';

function Home() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const fetchingChats = useSelector((state) => state.chats.loading);
  const fetchingFriends = useSelector((state) => state.friends.loading);
  const fetchingFriendInvites = useSelector((state) => state.friendInvites.loading);
  const fetchingMessages = useSelector((state) => state.messages.loading);
  const socket = useRef(null);
  const [appLoading, setAppLoading] = useState(true);

  const isFetchingData =
    fetchingChats || fetchingFriends || fetchingFriendInvites || fetchingMessages;

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchMessages(loggedInUser._id));
    dispatch(fetchChats());
    dispatch(fetchFriends(loggedInUser._id));
    dispatch(fetchFriendInvites(loggedInUser._id));

    socket.current = io(process.env.REACT_APP_SOCKET_URL, { auth: { userId: loggedInUser._id } });
    subscribeToMessageEvents({ socket: socket.current, dispatch, addMessage, updateChat });
    subscribeToUserEvents({ socket: socket.current, dispatch, setConnectedUsers });
    subscribeToFriendEvents({
      socket: socket.current,
      dispatch,
      addFriend,
      removeFriend,
      addFriendInvite,
      removeFriendInvite,
    });

    return () => {
      socket.current.off();
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isFetchingData) setAppLoading(true);
    if (!isFetchingData) {
      const timeout = setTimeout(() => setAppLoading(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isFetchingData]);

  return appLoading ? <Loading /> : <ChatPage />;
}

export default Home;
