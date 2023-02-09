import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { updateChat } from 'features/chats/chatsSlice';
import { addMessage } from 'features/messages/messagesSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUserId } from 'features/messages/messagesSlice';
import { selectAccessToken, selectUser } from 'features/auth/authSlice';
import {
  getFriendsByUserId,
  addFriend,
  addFriendInvite,
  removeFriendInvite,
} from 'features/friends/friendsSlice';
import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from 'socketEvents';

import Topbar from 'components/Topbar';
import LeftPanel from 'components/LeftPanel';
import Chatbox from 'features/messages/MessagesBox';
import RightPanel from 'components/RightPanel';
import { getFriendInvitesByUserId } from 'features/friends/friendsSlice';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const loggedInUser = useSelector(selectUser);
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { auth: { userId: loggedInUser._id } });
    subscribeToMessageEvents({ socket: socket.current, dispatch, addMessage, updateChat });
    subscribeToUserEvents({ socket: socket.current, setConnectedUsers });
    // Move to friends list
    subscribeToFriendEvents({
      socket: socket.current,
      dispatch,
      addFriend,
      addFriendInvite,
      removeFriendInvite,
    });

    const authData = {
      userId: loggedInUser._id,
      accessToken,
    };

    dispatch(getMessagesByUserId(authData));
    dispatch(getFriendsByUserId(authData));
    dispatch(getFriendInvitesByUserId(authData));

    return () => {
      socket.current.off();
      socket.current.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Topbar setExpandLeftPanel={setExpandLeftPanel} setExpandRightPanel={setExpandRightPanel} />
      <Main>
        <LeftPanel expanded={expandLeftPanel} />
        <Chatbox expandRightPanel={expandRightPanel} />
        <RightPanel expanded={expandRightPanel} />
      </Main>
    </Wrapper>
  );
}

export default Home;
