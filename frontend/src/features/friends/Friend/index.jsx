import styled from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';
import { FiMessageCircle, FiUserMinus } from 'react-icons/fi';
import { selectUser } from 'features/auth/authSlice';
import { closeSettings } from 'features/settings/settingsSlice';
import { selectAllChats, setCurrentChat } from 'features/chats/chatsSlice';
import { removeFriendById } from '../friendsSlice';

import User from 'features/users/User';
import Button from 'components/common/Button';

const Wrapper = styled.section`
  display: flex;
  justify-content: space-between;
  position: relative;
  background: inherit;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

function Friend({ friend, setExpandRightPanel }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const chats = useSelector(selectAllChats);
  const removingFriend = useSelector((state) => state.friends.removingFriend);

  const handleChatChange = (friendId) => {
    let selectedChat;

    if (chats.length) {
      const chatsMembers = chats.map((chat) => chat.members);
      const chatIndex = chatsMembers.findIndex(
        (members) => members[0]._id === friendId || members[1]._id === friendId,
      );
      selectedChat = chats[chatIndex];
    }

    if (!selectedChat) selectedChat = { members: [loggedInUser, friend] };

    dispatch(closeSettings());
    dispatch(setCurrentChat(selectedChat));
    setExpandRightPanel(false);
  };

  return (
    <Wrapper>
      <User user={friend} />
      <Buttons>
        <Button
          aria-label={`Message ${friend.username}`}
          variant="primary"
          onClick={() => handleChatChange(friend._id)}
          disabled={removingFriend}
        >
          <FiMessageCircle aria-hidden="true" size="1.5rem" />
        </Button>
        <Button
          aria-label={`Remove ${friend.username}`}
          variant="danger"
          onClick={() => dispatch(removeFriendById(friend._id))}
          disabled={removingFriend}
        >
          <FiUserMinus aria-hidden="true" size="1.5rem" />
        </Button>
      </Buttons>
    </Wrapper>
  );
}

export default Friend;
