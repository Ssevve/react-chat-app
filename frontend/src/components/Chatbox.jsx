import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAuth from '../hooks/useAuth';
import useChats from '../hooks/useChats';
import styled from 'styled-components/macro';
import breakpoints from '../lib/breakpoints';
import Message from './Message';

const Section = styled.section`
  flex: 2.5;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: calc(100% - 4rem);
  top: 4rem;

  @media ${breakpoints.medium} {
    max-width: ${({ expandRightbar }) =>
      expandRightbar ? 'calc(100vw - 600px)' : 'calc(100vw - 300px)'};
    left: 300px;
    right: ${({ expandRightbar }) => (expandRightbar ? '300px' : '0')};
    transition: right 0.1s ease-in-out, max-width 0.1s ease-in-out;
  }

  @media ${breakpoints.large} {
    max-width: calc(100vw - 600px);
    right: 300px;
    transition: none;
  }
`;

const Messages = styled.section`
  padding: var(--padding);
  max-height: calc(100% - 4rem);
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 4rem;
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: 2rem;
  overflow-y: auto;
`;

const MessageForm = styled.form`
  display: flex;
  align-content: center;
  gap: 0.5rem;
  padding: var(--padding);
  height: 4rem;
  background: var(--clr-light-400);
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--clr-light-200);
  flex: 1;
  font-size: 1rem;
  color: var(--clr-dark);
  font-family: var(--font-family);
`;

const Button = styled.button`
  border-radius: var(--border-radius);
  border: 1px solid var(--clr-accent);
  background: var(--clr-accent);
  color: var(--clr-light-400);
  display: flex;
  align-items: center;
  padding: 1rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: var(--hover-opacity);
  }
`;

function Chatbox({ socket, messages, setMessages, expandRightbar }) {
  const scrollRef = useRef(null);
  const inputRef = useRef('');
  const { auth } = useAuth();
  const { chats, setChats, currentChat, setCurrentChat } = useChats();
  const [currentChatMessages, setCurrentChatMessages] = useState([]);

  useEffect(() => {
    const filteredMessages = messages.filter((msg) => msg.chatId === currentChat?._id);
    setCurrentChatMessages(filteredMessages);
  }, [currentChat, messages]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentChatMessages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    const date = new Date();

    const message = {
      _id: uuidv4(),
      createdAt: date.toISOString(),
      content: inputRef.current.value,
      sender: auth.user._id,
      chatId: currentChat._id,
    };

    const receiver = currentChat.members.find((member) => member._id !== auth.user._id);
    socket.current.emit('sendMessage', { message, receiverId: receiver._id });

    setMessages((prevMessages) => [...prevMessages, message]);
    setCurrentChat({ ...currentChat, lastMessage: message });

    let updatedChat = chats.find((chat) => chat._id === currentChat._id);
    if (!updatedChat) updatedChat = currentChat;
    updatedChat.lastMessage = message;

    const filteredChats = chats.filter((chat) => chat._id !== currentChat._id);
    setChats([updatedChat, ...filteredChats]);

    inputRef.current.value = '';
  };

  return (
    <Section expandRightbar={expandRightbar}>
      {currentChatMessages && (
        <>
          <Messages ref={scrollRef}>
            {currentChatMessages.map((message) => (
              <Message key={message._id} message={message} />
            ))}
          </Messages>
          <MessageForm onSubmit={handleSubmit}>
            <Input
              ref={inputRef}
              type="text"
              aria-label="Write new message"
              placeholder="Write a message here..."
            />
            <Button type="submit">Send</Button>
          </MessageForm>
        </>
      )}
    </Section>
  );
}

export default Chatbox;
