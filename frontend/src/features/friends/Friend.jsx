import { useState } from 'react';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'features/auth/authSlice';
import { setCurrentChat, selectAllChats } from 'features/chats/chatsSlice';

import User from 'components/common/User';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding-block: var(--padding);
  position: relative;
`;

const Button = styled.button`
  padding: var(--padding);
  color: var(--clr-light-200);
  background: none;
  border: none;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  background: var(--clr-light-400);
  list-style: none;
  position: absolute;
  right: 1rem;
  top: 3.5rem;
  width: 75%;
  padding: var(--padding);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: var(--border-radius);
  z-index: 1;
`;

const MenuItem = styled.li`
  background: var(--clr-light-400);
  color: var(--clr-accent);
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  &:hover {
    background: var(--clr-accent);
    color: var(--clr-light-400);
  }
`;

const MenuButton = styled.button`
  background: inherit;
  color: inherit;
  font: inherit;
  padding: var(--padding);
  border-radius: var(--border-radius);
  flex: 1;
  height: 100%;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

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

    dispatch(setCurrentChat(selectedChat));
  };

  return (
    <Wrapper onMouseLeave={hideDropdown}>
      <User user={friend} />
      <Button onClick={handleClick}>
        <BsThreeDotsVertical size="1.25rem" />
      </Button>
      {showDropdown ? (
        <DropdownMenu>
          <MenuItem>
            <MenuButton onClick={() => handleChatChange(friend)}>Message</MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton>Remove friend</MenuButton>
          </MenuItem>
        </DropdownMenu>
      ) : null}
    </Wrapper>
  );
}

export default Friend;
