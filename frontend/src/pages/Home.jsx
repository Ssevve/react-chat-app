import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { updateChat } from 'features/chats/chatsSlice';
import { addMessage } from 'features/messages/messagesSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { addFriend, addFriendInvite, removeFriendInvite } from 'features/friends/friendsSlice';
import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from 'socketEvents';

import Topbar from 'components/Topbar';
import LeftPanel from 'components/LeftPanel';
import MessagesBox from 'features/messages/MessagesBox';
import RightPanel from 'components/RightPanel';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
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
      <Main>
        <LeftPanel expanded={expandLeftPanel} />
        <MessagesBox sidePanelExpanded={sidePanelExpanded} expandRightPanel={expandRightPanel} />
        <RightPanel expanded={expandRightPanel} />
      </Main>
    </Wrapper>
  );
}

export default Home;
