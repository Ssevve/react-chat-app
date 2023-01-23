import styled from 'styled-components/macro';

import UserAvatar from './UserAvatar';

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

function Friend({ chats, setCurrentChat, friend }) {
  const handleFriendClick = (friendId) => {
    const chatsMembers = chats.map((chat) => chat.members);
    const indexOfChat = chatsMembers.findIndex(
      (members) => members[0]._id === friendId || members[1]._id === friendId,
    );

    if (indexOfChat === -1) {
      //TODO
      // Create new chat with:
      // uuid
      // members array
      // set current chat to newly created chat

      return console.log('no chat with this user found');
    }

    setCurrentChat(chats[indexOfChat]);
  };

  return (
    <Button type="button" onClick={() => handleFriendClick(friend._id)}>
      <UserAvatar user={friend} />
      <Details>
        <Username>{friend.username}</Username>
        <StatusText>{friend.statusText}</StatusText>
      </Details>
    </Button>
  );
}

export default Friend;
