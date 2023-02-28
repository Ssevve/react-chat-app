import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { updateChat, selectCurrentChat } from 'features/chats/chatsSlice';
import { addMessage, fetchMessages } from 'features/messages/messagesSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { addFriend } from 'features/friends/friendsSlice';
import { addFriendInvite, removeFriendInvite } from 'features/friendInvites/friendInvitesSlice';
import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from 'socketEvents';
import breakpoints from 'shared/breakpoints';
import styleConstants from 'shared/styleConstants';

import Topbar from './components/Topbar';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import MessagesBox from 'features/messages/MessagesBox';
import WelcomeMessage from './components/WelcomeMessage';
import Settings from 'features/settings/Settings';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  position: fixed;
  top: ${styleConstants.pageHeaderHeight};
  background: ${({ theme }) => theme.background300};
  color: ${({ theme }) => theme.text};
  width: 100vw;
  height: 100%;
  @media ${breakpoints.medium} {
    width: calc(100vw - 18.75rem);
    left: 18.75rem;
  }

  @media ${breakpoints.large} {
    right: 0;
    transition: right 0.1s ease-in-out, max-width 0.1s ease-in-out;
    ${({ expandRightPanel }) =>
      expandRightPanel && {
        maxWidth: 'calc(100vw - 37.5rem)',
      }};
  }

  @media ${breakpoints.xl} {
    max-width: calc(100vw - 37.5rem);
    right: 18.75rem;
    transition: none;
  }
`;

function Home() {
  const dispatch = useDispatch();
  const showSettings = useSelector((state) => state.settings.showSettings);
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages(loggedInUser._id));
    socket.current = io(process.env.REACT_APP_SOCKET_URL, { auth: { userId: loggedInUser._id } });
    subscribeToMessageEvents({ socket: socket.current, dispatch, addMessage, updateChat });
    subscribeToUserEvents({ socket: socket.current, setConnectedUsers });
    subscribeToFriendEvents({
      socket: socket.current,
      dispatch,
      addFriend,
      addFriendInvite,
      removeFriendInvite,
    });

    return () => {
      socket.current.off();
      socket.current.disconnect();
    };
  }, []);

  const sidePanelExpanded = expandLeftPanel || expandRightPanel;

  return (
    <Wrapper>
      <Topbar setExpandLeftPanel={setExpandLeftPanel} setExpandRightPanel={setExpandRightPanel} />
      <Main expandRightPanel={expandRightPanel}>
        <LeftPanel
          setExpandLeftPanel={setExpandLeftPanel}
          setExpandRightPanel={setExpandRightPanel}
          anchor="left"
          expanded={expandLeftPanel}
        />
        {currentChat ? (
          <MessagesBox sidePanelExpanded={sidePanelExpanded} expandRightPanel={expandRightPanel} />
        ) : (
          <WelcomeMessage />
        )}
        {showSettings && <Settings />}
        <RightPanel expanded={expandRightPanel} />
      </Main>
    </Wrapper>
  );
}

export default Home;
