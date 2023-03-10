import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import { selectAccessToken } from 'features/auth/authSlice';
import styled from 'styled-components';
import { selectUser } from 'features/auth/authSlice';
import { selectCurrentChat, setCurrentChat, updateChat } from 'features/chats/chatsSlice';
import { createNewMessage } from '../messagesSlice';
import styleConstants from 'shared/styleConstants';

import SubmitButton from 'components/common/SubmitButton';

const Wrapper = styled.section`
  padding: ${styleConstants.padding200} ${styleConstants.padding400};
`;

const MessageForm = styled.form`
  display: flex;
  align-items: center;
  gap: ${styleConstants.gap200};
  padding: ${styleConstants.padding200};
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
    opacity: ${styleConstants.placeholderOpacity};
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    const receiver = currentChat.members.find((member) => member._id !== loggedInUser._id);
    const data = {
      content: inputRef.current.value,
      chatId: currentChat._id,
      receiverId: receiver._id,
      accessToken,
    };

    console.log(dispatch);
    const { payload } = dispatch(createNewMessage(data));
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
          aria-label="Write a new message here"
          placeholder="Write a message here..."
        />
        <SubmitButton aria-label="Send message">
          <FiSend aria-hidden="true" size="1.25rem" />
        </SubmitButton>
      </MessageForm>
    </Wrapper>
  );
}

export default MessageInput;
