import { useEffect, useState } from 'react';
import { fetchMessages } from 'features/messages/messagesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { fetchFriends } from 'features/friends/friendsSlice';
import { fetchFriendInvites } from 'features/friendInvites/friendInvitesSlice';
import { fetchChats } from 'features/chats/chatsSlice';

import ChatPage from './ChatPage';
import Loading from './Loading';

function Home() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const fetchingChats = useSelector((state) => state.chats.loading);
  const fetchingFriends = useSelector((state) => state.friends.loading);
  const fetchingFriendInvites = useSelector(
    (state) => state.friendInvites.loading
  );
  const fetchingMessages = useSelector((state) => state.messages.loading);
  const [appLoading, setAppLoading] = useState(true);

  const isFetchingData =
    fetchingChats ||
    fetchingFriends ||
    fetchingFriendInvites ||
    fetchingMessages;

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchMessages(loggedInUser._id));
    dispatch(fetchChats());
    dispatch(fetchFriends(loggedInUser._id));
    dispatch(fetchFriendInvites(loggedInUser._id));
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (isFetchingData) setAppLoading(true);
    if (!isFetchingData) {
      const timeout = setTimeout(() => setAppLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isFetchingData]);

  return appLoading ? <Loading /> : <ChatPage />;
}

export default Home;
