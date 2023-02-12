import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { setCurrentChat, selectAllChats } from 'features/chats/chatsSlice';

import User from 'components/common/User';

import { Wrapper, Button, DotsIcon, DropdownMenu, MenuItem, MenuButton } from './styles';

function Friend({ friend }) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectUser);
  const chats = useSelector(selectAllChats);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => setShowDropdown((prev) => !prev);
  const hideDropdown = () => setShowDropdown(false);
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

    setShowDropdown(false);
    dispatch(setCurrentChat(selectedChat));
  };

  return (
    <Wrapper onMouseLeave={hideDropdown}>
      <User user={friend} />
      <Button onClick={handleClick}>
        <DotsIcon size="1.25rem" />
      </Button>
      {showDropdown ? (
        <DropdownMenu>
          <MenuItem>
            <MenuButton onClick={() => handleChatChange(friend)}>Message</MenuButton>
          </MenuItem>
        </DropdownMenu>
      ) : null}
    </Wrapper>
  );
}

export default Friend;
