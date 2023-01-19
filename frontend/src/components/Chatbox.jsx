import styled from 'styled-components/macro';
import breakpoints from '../breakpoints';
import Message from './Message';

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

const messages = [
  {
    _id: '1',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '123',
  },
  {
    _id: '2',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '160a656b-adfa-4770-8507-217e387bad38',
  },
  {
    _id: '3',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '123',
  },
  {
    _id: '4',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '160a656b-adfa-4770-8507-217e387bad38',
  },
  {
    _id: '5',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '160a656b-adfa-4770-8507-217e387bad38',
  },
  {
    _id: '6',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '123',
  },
  {
    _id: '7',
    content: 'Hi!',
    createdAt: Date.now(),
    senderId: '123',
  },
  {
    _id: '8',
    content: 'Hello hello Hello hello Hello hello Hello hello Hello hello Hello hello Hello hello',
    createdAt: Date.now(),
    senderId: '160a656b-adfa-4770-8507-217e387bad38',
  },
];

function Chatbox() {
  return (
    <Section>
      <Messages>
        {messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      </Messages>
      <MessageForm>
        <Input type="text" placeholder="Write a message here..." />
        <Button type="submit">Send</Button>
      </MessageForm>
    </Section>
  );
}

export default Chatbox;
