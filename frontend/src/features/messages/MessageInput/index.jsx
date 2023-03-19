import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import { selectAccessToken, selectUser } from 'features/auth/authSlice';
import {
  selectCurrentChat,
  updateChat,
  setCurrentChat,
} from 'features/chats/chatsSlice';
import styles from 'shared/styles';

import SubmitButton from 'components/common/SubmitButton';
import { createNewMessage } from '../messagesSlice';

const Wrapper = styled.section`
  padding: ${styles.padding.s} ${styles.padding.l};
`;

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${styles.gap.s};
  padding: ${styles.padding.s};
  background: ${({ theme }) => theme.background500};
  border-radius: var(--border-radius);
`;

const Input = styled.input`
  height: 100%;
  background: inherit;
  border: none;
  flex: 1;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  font-family: var(--font-family);
  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: ${styles.placeholderOpacity};
  }
  &:focus {
    outline: none;
  }
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

    const receiver = currentChat.members.find(
      (member) => member._id !== loggedInUser._id
    );
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
    <Wrapper>
      <MessageForm onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          type="text"
          aria-label="New message"
          placeholder="Write a message here..."
        />
        <SubmitButton ariaLabel="Send message">
          <FiSend aria-hidden="true" size="1.25rem" />
        </SubmitButton>
      </MessageForm>
    </Wrapper>
  );
}

export default MessageInput;
