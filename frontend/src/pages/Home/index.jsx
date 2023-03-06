import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { updateChat, selectCurrentChat } from 'features/chats/chatsSlice';
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
import breakpoints from 'shared/breakpoints';

import Topbar from './components/Topbar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MessagesBox from 'features/messages/MessagesBox';
import WelcomeMessage from './components/WelcomeMessage';
import Settings from 'features/settings/Settings';
import Spinner from 'components/common/Spinner';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SpinnerWrapper = styled(Wrapper)`
  display: grid;
  place-items: center;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  position: relative;
  background: ${({ theme }) => theme.background300};
  color: ${({ theme }) => theme.text};
  overflow-x: hidden;
`;

const MidSection = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  flex: 1;
`;

function Home() {
  const dispatch = useDispatch();
  const showSettings = useSelector((state) => state.settings.showSettings);
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const fetchingChats = useSelector((state) => state.chats.loading);
  const fetchingFriends = useSelector((state) => state.friends.loading);
  const fetchingFriendInvites = useSelector((state) => state.friendInvites.loading);
  const fetchingMessages = useSelector((state) => state.messages.loading);
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const socket = useRef(null);
  const [appLoading, setAppLoading] = useState(true);

  const isAppLoading =
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
    if (isAppLoading) setAppLoading(true);
    if (!isAppLoading) {
      const timeout = setTimeout(() => setAppLoading(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isAppLoading]);

  if (appLoading) {
    return (
      <SpinnerWrapper>
        <Spinner text="Loading..." />
      </SpinnerWrapper>
    );
  }

  return (
    <Wrapper>
      <Topbar setExpandLeftPanel={setExpandLeftPanel} setExpandRightPanel={setExpandRightPanel} />
      <Main expandRightPanel={expandRightPanel}>
        <LeftPanel
          setExpandLeftPanel={setExpandLeftPanel}
          setExpandRightPanel={setExpandRightPanel}
          anchor="left"
          expanded={expandLeftPanel}
          forceExpandWidth={breakpoints.medium}
        />
        <MidSection>
          {currentChat ? <MessagesBox /> : <WelcomeMessage />}
          {showSettings && <Settings />}
        </MidSection>
        <RightPanel
          expanded={expandRightPanel}
          setExpandRightPanel={setExpandRightPanel}
          forceExpandWidth={breakpoints.xl}
        />
      </Main>
    </Wrapper>
  );
}

export default Home;
