import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import useAuth from '../../hooks/useAuth';
import useChats from '../../hooks/useChats';
import useConnectedUsers from '../../hooks/useConnectedUsers';

import fetchMessages from './api/fetchMessages';
import fetchFriends from './api/fetchFriends';
import fetchFriendInvites from './api/fetchFriendInvites';
import subscribeToSocketEvents from './subscribeToSocketEvents';

import Topbar from '../../components/Topbar';
import Leftbar from '../../components/Leftbar';
import Chatbox from '../../components/Chatbox';
import Rightbar from '../../components/Rightbar';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const { auth } = useAuth();
  const { setChats } = useChats();
  const { setConnectedUsers } = useConnectedUsers();
  const [expandLeftbar, setExpandLeftbar] = useState(false);
  const [expandRightbar, setExpandRightbar] = useState(false);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendInvites, setFriendInvites] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { auth: { userId: auth.user._id } });
    subscribeToSocketEvents({
      socket: socket.current,
      setMessages,
      friendInvites,
      setFriendInvites,
      setFriends,
      setChats,
      setConnectedUsers,
    });

    fetchMessages(auth.accessToken).then(setMessages);
    fetchFriends(auth.accessToken, auth.user._id).then(setFriends);
    fetchFriendInvites(auth.accessToken).then(setFriendInvites);

    return () => {
      socket.current.off();
      socket.current.disconnect();
    };
  }, []);

  return (
    <Wrapper>
      <Topbar setExpandLeftbar={setExpandLeftbar} setExpandRightbar={setExpandRightbar} />
      <Main>
        <Leftbar expanded={expandLeftbar} />
        <Chatbox
          expandRightbar={expandRightbar}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
        <Rightbar
          friends={friends}
          setFriends={setFriends}
          expanded={expandRightbar}
          friendInvites={friendInvites}
          setFriendInvites={setFriendInvites}
        />
      </Main>
    </Wrapper>
  );
}

export default Home;
