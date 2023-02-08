import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { updateChat } from 'features/chats/chatsSlice';
import { addMessage } from 'features/messages/messagesSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';
import { useSelector, useDispatch } from 'react-redux';
import { getMessagesByUserId } from 'features/messages/messagesSlice';
import { selectAccessToken, selectUser } from 'features/auth/authSlice';
import { selectFriends, getFriendsByUserId, setFriends } from 'features/friends/friendsSlice';

// import fetchFriends from './api/fetchFriends';
import fetchFriendInvites from './api/fetchFriendInvites';
import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from './socketEvents';

import Topbar from './components/Topbar';
import LeftPanel from './components/LeftPanel';
import Chatbox from 'features/messages/MessagesBox';
import RightPanel from './components/RightPanel';

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
  const friends = useSelector(selectFriends);
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [friendInvites, setFriendInvites] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { auth: { userId: loggedInUser._id } });
    subscribeToMessageEvents({ socket: socket.current, dispatch, addMessage, updateChat });
    subscribeToUserEvents({ socket: socket.current, setConnectedUsers });
    subscribeToFriendEvents({
      socket: socket.current,
      setFriendInvites,
      dispatch,
      setFriends,
      friendInvites,
    });

    dispatch(getMessagesByUserId({ userId: loggedInUser._id, accessToken }));
    dispatch(getFriendsByUserId({ userId: loggedInUser._id, accessToken }));

    fetchFriendInvites(accessToken)
      .then(setFriendInvites)
      .catch((err) => console.error(err));

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
        <RightPanel
          friends={friends}
          expanded={expandRightPanel}
          friendInvites={friendInvites}
          setFriendInvites={setFriendInvites}
        />
      </Main>
    </Wrapper>
  );
}

export default Home;
