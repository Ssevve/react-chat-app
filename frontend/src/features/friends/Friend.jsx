import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { FiMessageCircle } from 'react-icons/fi';
import { selectUser } from 'features/auth/authSlice';
import { closeSettings } from 'features/settings/settingsSlice';
import { selectAllChats, setCurrentChat } from 'features/chats/chatsSlice';

import User from 'components/common/User';
import Button from 'components/common/Button';

export const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  background: inherit;
`;

function Friend({ friend }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const chats = useSelector(selectAllChats);

  const handleChatChange = (friend) => {
    let selectedChat;

    if (chats.length) {
      const chatsMembers = chats.map((chat) => chat.members);
      const chatIndex = chatsMembers.findIndex(
        (members) => members[0]._id === friend._id || members[1]._id === friend._id,
      );
      selectedChat = chats[chatIndex];
    }

    if (!selectedChat) selectedChat = { members: [loggedInUser, friend] };

    dispatch(closeSettings());
    dispatch(setCurrentChat(selectedChat));
  };
  return (
    <Wrapper>
      <User user={friend} />
      <Button variant="primary" onClick={() => handleChatChange(friend)}>
        <FiMessageCircle size="1.5rem" />
      </Button>
    </Wrapper>
  );
}

export default Friend;
