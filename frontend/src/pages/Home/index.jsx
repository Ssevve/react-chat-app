import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import { setChats } from 'features/chats/chatsSlice';
import useConnectedUsers from 'hooks/useConnectedUsers';
import { useSelector } from 'react-redux';

import fetchMessages from 'features/messages/fetchMessages';
import fetchFriends from './api/fetchFriends';
import fetchFriendInvites from './api/fetchFriendInvites';
import {
  subscribeToMessageEvents,
  subscribeToUserEvents,
  subscribeToFriendEvents,
} from './socketEvents';

import Topbar from './components/Topbar';
import LeftPanel from './components/LeftPanel';
import Chatbox from './components/Chatbox';
import RightPanel from './components/RightPanel';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const auth = useSelector((state) => state.auth);
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftPanel, setExpandLeftPanel] = useState(false);
  const [expandRightPanel, setExpandRightPanel] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendInvites, setFriendInvites] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { auth: { userId: auth.user._id } });
    subscribeToMessageEvents({ socket: socket.current, setMessages, setChats });
    subscribeToUserEvents({ socket: socket.current, setConnectedUsers });
    subscribeToFriendEvents({
      socket: socket.current,
      setFriendInvites,
      setFriends,
      friendInvites,
    });

    fetchMessages(auth.accessToken)
      .then(setMessages)
      .catch((err) => console.error(err));

    fetchFriends(auth.accessToken, auth.user._id)
      .then(setFriends)
      .catch((err) => console.error(err));

    fetchFriendInvites(auth.accessToken)
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
        <Chatbox
          expandRightPanel={expandRightPanel}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
        <RightPanel
          friends={friends}
          setFriends={setFriends}
          expanded={expandRightPanel}
          friendInvites={friendInvites}
          setFriendInvites={setFriendInvites}
        />
      </Main>
    </Wrapper>
  );
}

export default Home;
