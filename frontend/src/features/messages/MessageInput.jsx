import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from 'features/auth/authSlice';
import styled from 'styled-components';
import { selectUser } from 'features/auth/authSlice';
import { selectCurrentChat, setCurrentChat, updateChat } from 'features/chats/chatsSlice';
import { createNewMessage } from './messagesSlice';

import SubmitButton from 'components/common/SubmitButton';

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

function MessageInput() {
  const dispatch = useDispatch();
  const currentChat = useSelector(selectCurrentChat);
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
    inputRef.current.focus();
  };

  return (
    <MessageForm onSubmit={handleSubmit}>
      <Input
        ref={inputRef}
        type="text"
        aria-label="Write a new message here"
        placeholder="Write a message here..."
      />
      <SubmitButton>Send</SubmitButton>
    </MessageForm>
  );
}

export default MessageInput;
