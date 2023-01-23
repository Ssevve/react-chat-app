import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components/macro';
import { io } from 'socket.io-client';
import axios from 'axios';

import Topbar from '../components/Topbar';
import Leftbar from '../components/Leftbar';
import Chatbox from '../components/Chatbox';
import Rightbar from '../components/Rightbar';
import { AuthContext } from '../context/AuthContext';

const Wrapper = styled.div`
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
`;

function Home() {
  const { auth } = useContext(AuthContext);
  const [expandLeftbar, setExpandLeftbar] = useState(false);
  const [expandRightbar, setExpandRightbar] = useState(false);
  const socket = useRef(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    socket.current = io('ws://localhost:5000', { query: `userId=${auth.user._id}` });

    return () => {
      socket.current.removeAllListeners();
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current?.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, [socket]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get('/chats', {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setChats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

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

    fetchChats();
    fetchMessages();
    fetchFriends();
  }, []);

  return (
    <Wrapper>
      <Topbar
        currentChat={currentChat}
        setExpandLeftbar={setExpandLeftbar}
        setExpandRightbar={setExpandRightbar}
      />
      <Main>
        <Leftbar chats={chats} setCurrentChat={setCurrentChat} expanded={expandLeftbar} />
        <Chatbox
          expandRightbar={expandRightbar}
          currentChat={currentChat}
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
        <Rightbar
          friends={friends}
          expanded={expandRightbar}
          chats={chats}
          setCurrentChat={setCurrentChat}
        />
      </Main>
    </Wrapper>
  );
}

export default Home;
