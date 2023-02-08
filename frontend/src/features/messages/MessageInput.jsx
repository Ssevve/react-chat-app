import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import styled from 'styled-components';
import { selectUser } from 'features/auth/authSlice';
import { selectCurrentChat, setCurrentChat, updateChat } from 'features/chats/chatsSlice';
import { createNewMessage } from './messagesSlice';

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

function MessageInput() {
  const currentChat = useSelector(selectCurrentChat);
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const inputRef = useRef('');

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
    <MessageForm onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        aria-label="Write new message"
        placeholder="Write a message here..."
      />
      <Button type="submit">Send</Button>
    </MessageForm>
  );
}

export default MessageInput;
