import { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import DropdownList from './DropdownList';
import UserAvatar from './UserAvatar';

const Wrapper = styled.section`
  margin-top: 1rem;
`;

const Button = styled.button`
  display: flex;
  min-width: 100%;
  align-items: center;
  background: none;
  border: none;
  gap: 1rem;
  padding: var(--padding);
  transition: background 0.1s ease-in-out;
  border-radius: var(--border-radius);
  cursor: pointer;
  &:hover {
    background: var(--clr-light-200);
  }
`;

const Details = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
`;

const Username = styled.span`
  font-weight: 700;
  font-size: 0.875rem;
`;

const StatusText = styled.span`
  font-size: 0.8rem;
  opacity: 0.6;
`;

function Friends({ friends, chats, setCurrentChat }) {
  const [onlineFriends, setOnlineFriends] = useState(null);
  const [offlineFriends, setOfflineFriends] = useState(null);

  useEffect(() => {
    setOnlineFriends(friends);
    setOfflineFriends(friends);
  }, [friends]);

  const handleFriendClick = (friendId) => {
    const chatsMembers = chats.map((chat) => chat.members);
    const indexOfChat = chatsMembers.findIndex(
      (members) => members[0]._id === friendId || members[1]._id === friendId,
    );

    if (indexOfChat === -1) return console.log('no chat with this user found');

    setCurrentChat(chats[indexOfChat]);
  };

  return (
    <Wrapper>
      <DropdownList title="Online">
        {onlineFriends?.map((friend) => (
          <Button key={friend._id} type="button" onClick={() => handleFriendClick(friend._id)}>
            <UserAvatar user={friend.avatar.url} size="2.5rem" />
            <Details>
              <Username>{friend.username}</Username>
              <StatusText>{friend.statusText}</StatusText>
            </Details>
          </Button>
        ))}
      </DropdownList>
      <DropdownList title="Offline">
        {offlineFriends?.map((friend) => (
          <Button key={friend._id} type="button" onClick={() => handleFriendClick(friend._id)}>
            <UserAvatar user={friend.avatar.url} size="2.5rem" />
            <Details>
              <Username>{friend.username}</Username>
              <StatusText>{friend.statusText}</StatusText>
            </Details>
          </Button>
        ))}
      </DropdownList>
    </Wrapper>
  );
}

export default Friends;
