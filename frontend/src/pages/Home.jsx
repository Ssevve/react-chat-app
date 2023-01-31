import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import useChats from '../hooks/useChats';

import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Chatbox from '../components/Chatbox';
import Rightbar from '../components/Rightbar';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const { auth } = useAuth();
  const { setChats } = useChats();
  const [expandLeftbar, setExpandLeftbar] = useState(false);
  const [expandRightbar, setExpandRightbar] = useState(false);
  const socket = useRef(null);
  const [messages, setMessages] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendInvites, setFriendInvites] = useState([]);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { query: `userId=${auth.user._id}` });

    return () => {
      socket.current.removeAllListeners();
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(socket?.current);
    socket.current?.on('receiveMessage', ({ newMessage, newChats }) => {
      console.log(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setChats(newChats);
    });

    socket.current?.on('receiveFriendInvite', (newFriendInvite) => {
      console.log(newFriendInvite);
      setFriendInvites((prevInvites) => [newFriendInvite, ...prevInvites]);
    });

    socket.current?.on('friendInviteAccepted', ({ newFriends, friendInviteId }) => {
      setFriends(newFriends);
      const newFriendInvites = friendInvites.filter((inv) => inv._id !== friendInviteId);
      setFriendInvites(newFriendInvites);
    });
  }, [socket]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`/messages/chats`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setMessages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFriends = async () => {
      try {
        const res = await axios.get(`/users/friends/${auth.user._id}`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setFriends(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFriendInvites = async () => {
      try {
        const res = await axios.get(`/invites`, {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setFriendInvites(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
    fetchFriends();
    fetchFriendInvites();
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
