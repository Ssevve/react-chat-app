import { useRef } from 'react';
import styled from 'styled-components/macro';
import breakpoints from '../breakpoints';
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';

const Section = styled.section`
  flex: 2.5;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 57px);

  @media ${breakpoints.medium} {
    position: relative;
    max-width: calc(100vw - 300px);
    left: 300px;
  }

  @media ${breakpoints.large} {
    max-width: calc(100vw - 600px);
  }
`;

const Messages = styled.section`
  padding: var(--padding);
  display: grid;
  align-content: flex-start;
  flex: 1;
  gap: 2rem;
  overflow-y: scroll;
  position: relative;
`;

const MessageForm = styled.form`
  display: flex;
  align-content: center;
  gap: 0.5rem;
  padding: var(--padding);
  border-top: 1px solid var(--clr-light-200);
  height: 4rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--clr-light-200);
  flex: 1;
  font-size: 1rem;
  color: var(--clr-dark);
`;

const Button = styled.button`
  border-radius: var(--border-radius);
  border: 1px solid var(--clr-accent);
  background: var(--clr-accent);
  color: var(--clr-light-400);
  padding: 1rem;
  font-weight: 700;
  font-size: 0.875rem;
  cursor: pointer;
  transition: opacity 0.1s ease-in-out;
  &:hover {
    opacity: var(--hover-opacity);
  }
`;

function Chatbox({ currentUser, currentChat, socket, messages }) {
  const inputRef = useRef('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();

    const message = {
      _id: uuidv4(),
      createdAt: date.toISOString(),
      content: inputRef.current.value,
      sender: currentUser._id,
      chatId: currentChat._id,
    };

    const receiver = currentChat.members.find((member) => member._id !== currentUser._id);

    socket.current.emit('sendMessage', { message, receiverId: receiver._id });
  };

  return (
    <Section>
      <Messages>
        {messages?.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </Messages>
      <MessageForm onSubmit={handleSubmit}>
        <Input ref={inputRef} type="text" placeholder="Write a message here..." />
        <Button type="submit">Send</Button>
      </MessageForm>
    </Section>
  );
}

export default Chatbox;
