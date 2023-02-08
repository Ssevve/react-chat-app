import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateChat, selectCurrentChat } from 'features/chats/chatsSlice';
import { createNewMessage } from 'features/messages/messagesSlice';
import { selectUser, selectAccessToken } from 'features/auth/authSlice';
import styled from 'styled-components/macro';
import breakpoints from 'utils/breakpoints';
import { selectCurrentChatMessages } from 'features/messages/messagesSlice';
import Message from 'features/messages/Message';
import { setCurrentChat } from 'features/chats/chatsSlice';

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
    max-width: ${({ expandRightPanel }) =>
      expandRightPanel ? 'calc(100vw - 600px)' : 'calc(100vw - 300px)'};
    left: 300px;
    right: ${({ expandRightPanel }) => (expandRightPanel ? '300px' : '0')};
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

function Chatbox({ expandRightPanel }) {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
  const loggedInUser = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const currentChatMessages = useSelector((state) =>
    state.messages.messages.filter((message) => message.chatId === currentChat?._id),
  );
  const scrollRef = useRef(null);
  const inputRef = useRef('');

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
  }, [currentChatMessages, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    const receiver = currentChat.members.find((member) => member._id !== loggedInUser._id);
    const data = {
      content: inputRef.current.value,
      chatId: currentChat._id,
      receiverId: receiver._id,
      accessToken,
    };

    const { payload } = await dispatch(createNewMessage(data));
    const { updatedChat } = payload;

    dispatch(updateChat(updatedChat));
    dispatch(setCurrentChat(updatedChat));

    inputRef.current.value = '';
  };
  return (
    <Section expandRightPanel={expandRightPanel}>
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
